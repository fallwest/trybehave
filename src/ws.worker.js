import config from "./config/config.json"
/* eslint-disable no-undef */
/* eslint-disable no-restricted-globals */
importScripts("https://cdn.jsdelivr.net/pyodide/v0.23.0/full/pyodide.js");

async function loadPyodideAndPackages() {
    self.pyodide = await loadPyodide({homedir: "/working"});
}
let pyodideReadyPromise = loadPyodideAndPackages();
let behaveReadyPromise = null;

// See: https://pyodide.org/en/stable/usage/api/js-api.html#pyodide.setInterruptBuffer
const interruptBuffer = () => {
    let interrupt_buffer = new Uint8Array(new SharedArrayBuffer(1));
    interrupt_buffer[0] = 2;
    self.pyodide.setInterruptBuffer(interrupt_buffer);
}

const runFeatures = (args) => {
    console.log("Called runFeatures()")
    self.pyodide.runPython(`
    if "behave_main" in locals():
        del behave_main
    import sys
    import io
    sys.stdout = io.StringIO()
    from behave.__main__ import main as behave_main
    behave_main(${args})
    if "behave_main" in locals():
        del behave_main
    global locals_copy
    locals_copy = locals()
    `,{homedir: "/working"});
    const stdout = self.pyodide.runPython("sys.stdout.getvalue()");
    console.log(self.pyodide.globals.get("locals_copy"));
    interruptBuffer()
    try {
        self.pyodide.checkInterrupt()
    } catch (error) {
        console.log("Got interrupt in runFeatures()")
    }
    return stdout;
}

const getFeatureJson = (feature) => {
    console.log("Feature path: " + feature)
    runFeatures(`["-i", "/working/${feature}", "--f=json", "--dry-run", "--no-summary",
    "--no-snippets"]`);
    const stdout = self.pyodide.runPython("sys.stdout.getvalue()");
    self.pyodide.FS.writeFile("/working/reports/feature.json", stdout);
    self.pyodide.runPython(`
    import json
    import ast
    import time

    #if "behave_main" in locals():
    #    del behave_main

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
`,{homedir: "/working"});
    const snippet_json = self.pyodide.globals.get("snippet_json");
    return snippet_json;
}

self.onmessage = async (e) => {
    if(e.data.type === "init" & !self.initializing) {
        self.initializing = true;
        await pyodideReadyPromise;
        await self.pyodide.loadPackage("micropip");
        const micropip = self.pyodide.pyimport("micropip");
        await micropip.install(`${e.data.baseurl}/trybehave/parse-1.19.0-py3-none-any.whl`);
        await micropip.install("behave");
        console.log("behave installed")
        // make sure loading is done
        behaveReadyPromise = new Promise((resolve) => {
            const mountDir = "/working"
            console.log("making mount dir")
            try {
                self.pyodide.FS.mkdir(mountDir);
            } catch (error) {
                
            }
            console.log("made mount dir")
            //self.pyodide.FS.mount(self.pyodide.FS.filesystems.IDBFS, { root: "." }, mountDir)
            console.log("mounted fs")
            self.pyodide.FS.mkdir("/working/reports");
            self.pyodide.FS.mkdir("/working/features");
            self.pyodide.FS.mkdir("/working/features/steps");
            postMessage({ type: "log", msg: "initialization done!" });
            postMessage({ type: "init" });
            resolve();
        });
    }
    if (e.data.type === "file") {
        self.pyodide.FS.writeFile(e.data.filename, e.data.content);
        if(e.data.filename === config.fileOptions.slice(-1)[0]){
            postMessage({ type: "ready" });
        }
    }
    if (e.data.type === "update_file") {
        self.pyodide.FS.writeFile(e.data.filename, e.data.content);
        if(e.data.filename.endsWith(".py")) {
            self.pyodide.FS.syncfs(true, function (err) {
                //handle callback
                console.log(`Reloaded: ${e.data.filename}`);
                const directory_parts = e.data.filename.split("/");
                let mod_name = directory_parts.slice(-1)[0]
                mod_name = mod_name.replace(".py", "");
                console.log(`mod_name: ${mod_name}`)
                const directory_paths = directory_parts.slice(0, -1);
                let module_id = directory_paths.join(".")
                module_id += "."
                module_id += mod_name
                console.log(`Reloading module: ${module_id} as ${mod_name}`)
                // interruptBuffer()
                // try {
                //     self.pyodide.checkInterrupt()
                // } catch (error) {
                //     console.log("Got interrupt in `update_file`")
                // }
                //Se: https://pyodide.org/en/stable/usage/faq.html#why-can-t-i-import-a-file-i-just-wrote-to-the-file-system
                self.pyodide.runPython(`
                from pyodide.code import eval_code
                eval_code("""
                import importlib
                importlib.invalidate_caches()
                import ${module_id} as ${mod_name}
                """, globals={"behave_main": None}, locals={"behave_main": None})
                #if "context" in locals():
                #    del context
                #if "behave_main" in locals():
                #    del behave_main
                #import importlib
                #import importlib.util
                #spec = importlib.util.spec_from_file_location("${mod_name}", "${e.data.filename}")
                #test = importlib.util.module_from_spec(spec)
                #spec.loader.exec_module(test)
                #importlib.invalidate_caches()
                #import ${module_id} as ${mod_name}
                # import ${module_id}
                #importlib.reload(test)
                #importlib.reload(${mod_name})
                #importlib.reload(${module_id})
                global succeded
                succeeded="yes"`);
                console.log(`Module reload succeeded: ${self.pyodide.globals.get("succeeded")}`);
                postMessage({ type: "ready" });
            });
            console.log("line after sync");
        } else {
            postMessage({ type: "ready" });
        }
    }
    if (e.data.type === "run") {
        await behaveReadyPromise;
        const stdout = runFeatures(`["--no-capture", "-i", "/working/${e.data.filename}"]`);
        postMessage({ type: "terminal", msg: stdout });

    }
    if (e.data.type === "snippets") {
        await behaveReadyPromise;
        const step_impls = getFeatureJson(e.data.filename);
        postMessage({ type: "snippet", msg: step_impls });
    }
};
