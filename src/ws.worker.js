/* eslint-disable no-undef */
/* eslint-disable no-restricted-globals */
importScripts("https://cdn.jsdelivr.net/pyodide/v0.23.0/full/pyodide.js");
async function loadPyodideAndPackages() {
    self.pyodide = await loadPyodide();
  await self.pyodide.loadPackage(["numpy", "pytz"]);
}
let pyodideReadyPromise = loadPyodideAndPackages();
let behaveReadyPromise = null;

const runFeatures = (args) => {
    self.pyodide.runPython(`
    import sys
    import io
    sys.stdout = io.StringIO()
    from behave.__main__ import main as behave_main
    behave_main(${args})
    `);
    return self.pyodide.runPython("sys.stdout.getvalue()");
}

const getFeatureJson = (feature) => {
    runFeatures(`["-i", "/working/${feature}", "--f=json", "--dry-run", "--no-summary",
    "--no-snippets", "-o", "/working/reports/feature.json"]`);
self.pyodide.FS.syncfs(true, function (err) {
});
    self.pyodide.runPython(`import json
import ast
import time
def get_json_step_report():
    with open("/working/reports/feature.json", "r") as file:
        data = file.read()
    return json.loads(data)

def get_step_locations():
    report = get_json_step_report()
    locations = []
    if len(report) > 0:
        for element in report[0]["elements"]: 
            for step in element["steps"]:
                if "match" in step:
                    locations.append(step["match"]["location"])
    return locations

def get_function_source(filename, step_decorator):
    with open(filename, encoding="utf-8") as file:
        file_contents = file.read()
    node = None
    try:
        node = ast.parse(file_contents, "file", "exec")
    except:
        pass
    if node:
        for body in node.body:
            if type(body) == ast.FunctionDef:
                step_text = None
                try:
                    step_text = body.decorator_list[0].args[0].value
                except Exception:
                    pass
                if step_text and step_text in step_decorator:
                    source_snippet = ""
                    for decorator in body.decorator_list:
                        source_snippet += ast.get_source_segment(file_contents, decorator)
                        source_snippet += "\\n"
                    source_snippet += ast.get_source_segment(file_contents, body)
                    return source_snippet

def get_snippets():
    locations = get_step_locations()
    snippets = []
    for location in locations:
        parts = location.split(":")
        filename = parts[0]
        line_no = parts[1]
        with open(filename, "r") as source_file:
            file_lines = source_file.readlines()
        step_decorator = file_lines[int(line_no) -1:int(line_no)][0]
        function_source = get_function_source(filename, step_decorator)
        existing_records = [rec for rec in snippets if rec["location"]==location and rec["file_lines"]==function_source]
        if len(existing_records) == 0:
            snippets.append({"location": location, "file_lines": function_source})
    return snippets

snippets = get_snippets()
global snippet_json
snippet_json = json.dumps(snippets)
`);
    return self.pyodide.globals.get("snippet_json");

}

self.onmessage = async (e) => {
    if(e.data.type === "init" & !self.initializing) {
        self.initializing = true;
        await pyodideReadyPromise;
        await self.pyodide.loadPackage("micropip");
        const micropip = self.pyodide.pyimport("micropip");
        await micropip.install(`${e.data.baseurl}/trybehave/parse-1.19.0-py3-none-any.whl`);
        await micropip.install("behave");
        // make sure loading is done
        behaveReadyPromise = new Promise((resolve) => {
            const mountDir = "/working"
            self.pyodide.FS.mkdir(mountDir);
            self.pyodide.FS.mount(self.pyodide.FS.filesystems.IDBFS, { root: "." }, mountDir);
            self.pyodide.FS.mkdir("/working/reports");
            self.pyodide.FS.mkdir("/working/features");
            self.pyodide.FS.mkdir("/working/features/steps");
            postMessage({ type: "log", msg: "initialization done!" });
            postMessage({ type: "init" });
            resolve();
        });
    }
    if (e.data.type === "update_file") {
        //self.pyodide.FS.truncate(e.data.filename, 0);
        // self.pyodide.FS.unlink(e.data.filename)
        // self.pyodide.FS.writeFile(e.data.filename, e.data.content);
        // self.pyodide.FS.utime(e.data.filename, Date.now(), Date.now());
        // let directory_parts = e.data.filename.split("/");
        // const file_name = directory_parts.slice(-1);
        // directory_parts = directory_parts.slice(0, -1);
        // directory = directory_parts.join("/");
        // directory_files = self.pyodide.FS.readdir(directory);
        // feature_files = self.pyodide.FS.readdir("features/");
        // console.log(feature_files)
        // step_files = self.pyodide.FS.readdir("features/steps/");
        // console.log(step_files)
        //if(e.data.filename.endsWith(".py")){
//         console.log("reloading module")
//         self.pyodide.FS.truncate(e.data.filename, 0);
//         self.pyodide.runPython(`from importlib.machinery import SourceFileLoader
// module = SourceFileLoader("steps", "${e.data.filename}").load_module()`);
//         console.log("file truncated")
        self.pyodide.FS.writeFile(`/working/${e.data.filename}`, e.data.content);
        console.log(self.pyodide.FS.stat(`/working/${e.data.filename}`))
//         self.pyodide.runPython(`from time import sleep
// sleep(4)`);
//         self.pyodide.runPython(`from importlib.machinery import SourceFileLoader
// module = SourceFileLoader("steps", "${e.data.filename}").load_module()`);
//         console.log("reloaded module")
        //}
        const directory_parts = e.data.filename.split("/");
        let mod_name = directory_parts.slice(-1)[0]
        mod_name = mod_name.replace(".py", "");
        console.log(`mod_name: ${mod_name}`)
        const directory_paths = directory_parts.slice(0, -1);
        let module_id = directory_paths.join(".")
        module_id += "."
        module_id += mod_name
        console.log(`Reloading module: ${module_id}`)
        self.pyodide.runPython(`import importlib
# import ${module_id} as mod_name
global succeded
try:
    importlib.reload(${mod_name})
except:
    pass
    # importlib.load(${mod_name})
succeded = "yes"`);
        console.log(`Module reload succeeded: ${self.pyodide.globals.get("succeded")}`);
        self.pyodide.FS.syncfs(true, function (err) {
            // handle callback
            postMessage({ type: "ready" });
        });
        //postMessage({ type: "ready" });
        // self.pyodide.runPython(`global globs\nglobs=globals()`)
        // console.log(self.pyodide.globals.get("globs"));
//         self.pyodide.runPython(`import types
// import sys
// global curr_imports
// def get_all_imports():
//     modulenames = set(sys.modules) & set(globals())
//     allmodules = [sys.modules[name] for name in modulenames]
//     return allmodules

// def get_imports():
//     imp_list = []
//     for name, val in globals().items():
//         if isinstance(val, types.ModuleType):
//             imp_list.append(val.__name__)
//     return imp_list
// curr_imports = get_all_imports()`);
// console.log(self.pyodide.globals.get("curr_imports"));
    }
    if (e.data.type === "file") {
        self.pyodide.FS.writeFile(`/working/${e.data.filename}`, e.data.content);
        console.log(self.pyodide.FS.stat(`/working/${e.data.filename}`))
//         self.pyodide.runPython(`import importlib.util
// spec = importlib.util.spec_from_file_location("steps", "/home/pyodide/${e.data.filename}")
// module = importlib.util.module_from_spec(spec)`);
//         try{
//             if(e.data.filename.endsWith(".py")){
//                 self.pyodide.runPython(`from importlib.machinery import SourceFileLoader
// module = SourceFileLoader("steps", "/home/pyodide/${e.data.filename}").load_module()`);    
//         }
//         } catch(error){

//         }
        postMessage({ type: "ready" });
    }
    if (e.data.type === "run") {
        await behaveReadyPromise;
        const stdout = runFeatures(`["--no-capture", "-i", "${e.data.filename}"]`);
        postMessage({ type: "terminal", msg: stdout });

    }
    if (e.data.type === "snippets") {
        await behaveReadyPromise;
        const step_impls = getFeatureJson(e.data.filename);
        postMessage({ type: "snippet", msg: step_impls });
    }
};
