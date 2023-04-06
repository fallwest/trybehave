/*! For license information please see 670.eef79d50.chunk.worker.js.LICENSE.txt */
!function(){"use strict";function t(e){return t="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},t(e)}function e(){e=function(){return n};var n={},r=Object.prototype,o=r.hasOwnProperty,i=Object.defineProperty||function(t,e,n){t[e]=n.value},a="function"==typeof Symbol?Symbol:{},s=a.iterator||"@@iterator",c=a.asyncIterator||"@@asyncIterator",u=a.toStringTag||"@@toStringTag";function l(t,e,n){return Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}),t[e]}try{l({},"")}catch(Z){l=function(t,e,n){return t[e]=n}}function p(t,e,n,r){var o=e&&e.prototype instanceof h?e:h,a=Object.create(o.prototype),s=new L(r||[]);return i(a,"_invoke",{value:I(t,n,s)}),a}function f(t,e,n){try{return{type:"normal",arg:t.call(e,n)}}catch(Z){return{type:"throw",arg:Z}}}n.wrap=p;var d={};function h(){}function y(){}function m(){}var v={};l(v,s,(function(){return this}));var g=Object.getPrototypeOf,w=g&&g(g(S([])));w&&w!==r&&o.call(w,s)&&(v=w);var _=m.prototype=h.prototype=Object.create(v);function b(t){["next","throw","return"].forEach((function(e){l(t,e,(function(t){return this._invoke(e,t)}))}))}function x(e,n){function r(i,a,s,c){var u=f(e[i],e,a);if("throw"!==u.type){var l=u.arg,p=l.value;return p&&"object"==t(p)&&o.call(p,"__await")?n.resolve(p.__await).then((function(t){r("next",t,s,c)}),(function(t){r("throw",t,s,c)})):n.resolve(p).then((function(t){l.value=t,s(l)}),(function(t){return r("throw",t,s,c)}))}c(u.arg)}var a;i(this,"_invoke",{value:function(t,e){function o(){return new n((function(n,o){r(t,e,n,o)}))}return a=a?a.then(o,o):o()}})}function I(t,e,n){var r="suspendedStart";return function(o,i){if("executing"===r)throw new Error("Generator is already running");if("completed"===r){if("throw"===o)throw i;return E()}for(n.method=o,n.arg=i;;){var a=n.delegate;if(a){var s=G(a,n);if(s){if(s===d)continue;return s}}if("next"===n.method)n.sent=n._sent=n.arg;else if("throw"===n.method){if("suspendedStart"===r)throw r="completed",n.arg;n.dispatchException(n.arg)}else"return"===n.method&&n.abrupt("return",n.arg);r="executing";var c=f(t,e,n);if("normal"===c.type){if(r=n.done?"completed":"suspendedYield",c.arg===d)continue;return{value:c.arg,done:n.done}}"throw"===c.type&&(r="completed",n.method="throw",n.arg=c.arg)}}}function G(t,e){var n=e.method,r=t.iterator[n];if(void 0===r)return e.delegate=null,"throw"===n&&t.iterator.return&&(e.method="return",e.arg=void 0,G(t,e),"throw"===e.method)||"return"!==n&&(e.method="throw",e.arg=new TypeError("The iterator does not provide a '"+n+"' method")),d;var o=f(r,t.iterator,e.arg);if("throw"===o.type)return e.method="throw",e.arg=o.arg,e.delegate=null,d;var i=o.arg;return i?i.done?(e[t.resultName]=i.value,e.next=t.nextLoc,"return"!==e.method&&(e.method="next",e.arg=void 0),e.delegate=null,d):i:(e.method="throw",e.arg=new TypeError("iterator result is not an object"),e.delegate=null,d)}function k(t){var e={tryLoc:t[0]};1 in t&&(e.catchLoc=t[1]),2 in t&&(e.finallyLoc=t[2],e.afterLoc=t[3]),this.tryEntries.push(e)}function j(t){var e=t.completion||{};e.type="normal",delete e.arg,t.completion=e}function L(t){this.tryEntries=[{tryLoc:"root"}],t.forEach(k,this),this.reset(!0)}function S(t){if(t){var e=t[s];if(e)return e.call(t);if("function"==typeof t.next)return t;if(!isNaN(t.length)){var n=-1,r=function e(){for(;++n<t.length;)if(o.call(t,n))return e.value=t[n],e.done=!1,e;return e.value=void 0,e.done=!0,e};return r.next=r}}return{next:E}}function E(){return{value:void 0,done:!0}}return y.prototype=m,i(_,"constructor",{value:m,configurable:!0}),i(m,"constructor",{value:y,configurable:!0}),y.displayName=l(m,u,"GeneratorFunction"),n.isGeneratorFunction=function(t){var e="function"==typeof t&&t.constructor;return!!e&&(e===y||"GeneratorFunction"===(e.displayName||e.name))},n.mark=function(t){return Object.setPrototypeOf?Object.setPrototypeOf(t,m):(t.__proto__=m,l(t,u,"GeneratorFunction")),t.prototype=Object.create(_),t},n.awrap=function(t){return{__await:t}},b(x.prototype),l(x.prototype,c,(function(){return this})),n.AsyncIterator=x,n.async=function(t,e,r,o,i){void 0===i&&(i=Promise);var a=new x(p(t,e,r,o),i);return n.isGeneratorFunction(e)?a:a.next().then((function(t){return t.done?t.value:a.next()}))},b(_),l(_,u,"Generator"),l(_,s,(function(){return this})),l(_,"toString",(function(){return"[object Generator]"})),n.keys=function(t){var e=Object(t),n=[];for(var r in e)n.push(r);return n.reverse(),function t(){for(;n.length;){var r=n.pop();if(r in e)return t.value=r,t.done=!1,t}return t.done=!0,t}},n.values=S,L.prototype={constructor:L,reset:function(t){if(this.prev=0,this.next=0,this.sent=this._sent=void 0,this.done=!1,this.delegate=null,this.method="next",this.arg=void 0,this.tryEntries.forEach(j),!t)for(var e in this)"t"===e.charAt(0)&&o.call(this,e)&&!isNaN(+e.slice(1))&&(this[e]=void 0)},stop:function(){this.done=!0;var t=this.tryEntries[0].completion;if("throw"===t.type)throw t.arg;return this.rval},dispatchException:function(t){if(this.done)throw t;var e=this;function n(n,r){return a.type="throw",a.arg=t,e.next=n,r&&(e.method="next",e.arg=void 0),!!r}for(var r=this.tryEntries.length-1;r>=0;--r){var i=this.tryEntries[r],a=i.completion;if("root"===i.tryLoc)return n("end");if(i.tryLoc<=this.prev){var s=o.call(i,"catchLoc"),c=o.call(i,"finallyLoc");if(s&&c){if(this.prev<i.catchLoc)return n(i.catchLoc,!0);if(this.prev<i.finallyLoc)return n(i.finallyLoc)}else if(s){if(this.prev<i.catchLoc)return n(i.catchLoc,!0)}else{if(!c)throw new Error("try statement without catch or finally");if(this.prev<i.finallyLoc)return n(i.finallyLoc)}}}},abrupt:function(t,e){for(var n=this.tryEntries.length-1;n>=0;--n){var r=this.tryEntries[n];if(r.tryLoc<=this.prev&&o.call(r,"finallyLoc")&&this.prev<r.finallyLoc){var i=r;break}}i&&("break"===t||"continue"===t)&&i.tryLoc<=e&&e<=i.finallyLoc&&(i=null);var a=i?i.completion:{};return a.type=t,a.arg=e,i?(this.method="next",this.next=i.finallyLoc,d):this.complete(a)},complete:function(t,e){if("throw"===t.type)throw t.arg;return"break"===t.type||"continue"===t.type?this.next=t.arg:"return"===t.type?(this.rval=this.arg=t.arg,this.method="return",this.next="end"):"normal"===t.type&&e&&(this.next=e),d},finish:function(t){for(var e=this.tryEntries.length-1;e>=0;--e){var n=this.tryEntries[e];if(n.finallyLoc===t)return this.complete(n.completion,n.afterLoc),j(n),d}},catch:function(t){for(var e=this.tryEntries.length-1;e>=0;--e){var n=this.tryEntries[e];if(n.tryLoc===t){var r=n.completion;if("throw"===r.type){var o=r.arg;j(n)}return o}}throw new Error("illegal catch attempt")},delegateYield:function(t,e,n){return this.delegate={iterator:S(t),resultName:e,nextLoc:n},"next"===this.method&&(this.arg=void 0),d}},n}function n(t,e,n,r,o,i,a){try{var s=t[i](a),c=s.value}catch(u){return void n(u)}s.done?e(c):Promise.resolve(c).then(r,o)}function r(t){return function(){var e=this,r=arguments;return new Promise((function(o,i){var a=t.apply(e,r);function s(t){n(a,o,i,s,c,"next",t)}function c(t){n(a,o,i,s,c,"throw",t)}s(void 0)}))}}function o(){return(o=r(e().mark((function t(){return e().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,loadPyodide();case 2:return self.pyodide=t.sent,t.next=5,self.pyodide.loadPackage(["numpy","pytz"]);case 5:case"end":return t.stop()}}),t)})))).apply(this,arguments)}importScripts("https://cdn.jsdelivr.net/pyodide/v0.23.0/full/pyodide.js");var i=function(){return o.apply(this,arguments)}(),a=null;runFeatures=function(t){return self.pyodide.runPython("\n    import sys\n    import io\n    sys.stdout = io.StringIO()\n    from behave.__main__ import main as behave_main\n    behave_main(".concat(t,")\n    ")),self.pyodide.runPython("sys.stdout.getvalue()")},getFeatureJson=function(t){return runFeatures('["-i", "features/'.concat(t,'", "--f=json", "--dry-run", "--no-summary",\n    "--no-snippets", "-o", "reports/feature.json"]')),self.pyodide.runPython('import json\ndef get_json_step_report():\n    json_file = open("reports/feature.json")\n    with open("reports/feature.json", "r") as file:\n        data = file.read()\n    return json.loads(data)\n\ndef get_step_locations():\n    report = get_json_step_report()\n    locations = []\n    for step in report[0]["elements"][0]["steps"]:\n        locations.append(step["match"]["location"])\n    return locations\n\ndef is_empty_line(line):\n    return len(line.strip()) == 0\n\ndef get_snippets():\n    locations = get_step_locations()\n    snippets = []\n    for location in locations:\n        parts = location.split(":")\n        filename = parts[0]\n        line_no = parts[1]\n        file_lines = []\n        with open(filename, "r") as source_file:\n            file_lines = source_file.readlines()\n        func_to_end = file_lines[int(line_no) -1:]\n        func_lines = []\n        for i in range(len(func_to_end) -1):\n            if is_empty_line(func_to_end[i]):\n                if i + 1 < len(func_to_end):\n                    if is_empty_line(func_to_end[i + 1]):\n                        break\n            func_lines.append(func_to_end[i])\n        snippets.append({"location": location, "file_lines": "".join(func_lines)})\n    return snippets\n\nsnippets = get_snippets()\nglobal snippet_json\nsnippet_json = json.dumps(snippets)\n'),self.pyodide.globals.get("snippet_json")},self.onmessage=function(){var t=r(e().mark((function t(n){var r,o,s;return e().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if("init"!==n.data.type){t.next=11;break}return t.next=3,i;case 3:return t.next=5,self.pyodide.loadPackage("micropip");case 5:return r=self.pyodide.pyimport("micropip"),t.next=8,r.install("".concat(n.data.baseurl,"/parse-1.19.0-py3-none-any.whl"));case 8:return t.next=10,r.install("behave");case 10:a=new Promise((function(t){self.pyodide.FS.mkdir("reports"),self.pyodide.FS.mkdir("features"),self.pyodide.FS.mkdir("features/steps"),self.pyodide.runPython('\n        import base64\n        encoded_steps = "ZnJvbSBiZWhhdmUgaW1wb3J0IHN0ZXAKZnJvbSB1cmxsaWIucmVxdWVzdCBpbXBvcnQgdXJsb3BlbgoKQHN0ZXAodSdJIGRvIG5vdCBkbyBtdWNoJykKZGVmIHN0ZXBfaW1wbChjb250ZXh0KToKICAgIHByaW50KCJOb3RoaW5nIG11Y2ggaGFwcGVuaW5nIGhlcmUiKQoKCkBzdGVwKHUnSSBkbyBhIGxvdCcpCmRlZiBzdGVwX2ltcGwoY29udGV4dCk6CiAgICBwcmludCgiVG9vIG11Y2ggaGFwcGVuaW5nIGhlcmUiKQoKCkBzdGVwKHUnSSByZWFkIHRoZSByZWFkbWUnKQpkZWYgc3RlcF9pbXBsKGNvbnRleHQpOgogICAgdXJsID0gImh0dHBzOi8vcmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbS9iZWhhdmUvYmVoYXZlL21hc3Rlci9SRUFETUUucnN0IgogICAgcmVhZG1lID0gdXJsb3Blbih1cmwpCiAgICBtc2cgPSAiIi5qb2luKG5leHQocmVhZG1lKS5kZWNvZGUoInV0Zi04IikgZm9yIF94IGluIHJhbmdlKDEwKSkKICAgIHByaW50KG1zZykK"\n        with open("features/steps/documentation.py", "w") as fh:\n            fh.write(base64.b64decode(encoded_steps).decode("utf-8"))\n        '),self.pyodide.runPython('\n        with open("features/documentation.feature", "w") as fh:\n            fh.write("""@example\n                Feature: Documentation feature\n\n                    As a tester, I read the documentation so that I can get things done\n\n                    Scenario: Read Behave documentation\n                        Given I do not do much\n                        Then I do a lot\n                """)\n        '),t(),postMessage({type:"log",msg:"initialization done!"}),postMessage({type:"ready"})}));case 11:if("run"!==n.data.type){t.next=16;break}return t.next=14,a;case 14:o=runFeatures('["--no-capture", "-i", "features/documentation.feature"]'),postMessage({type:"terminal",msg:o});case 16:if("snippets"!==n.data.type){t.next=21;break}return t.next=19,a;case 19:s=getFeatureJson("documentation.feature"),postMessage({type:"snippet",msg:s});case 21:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}()}();
//# sourceMappingURL=670.eef79d50.chunk.worker.js.map