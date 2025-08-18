/* chunk:564 bytes:[13118446, 13206426) size:87980 source:unpacked-cli.js */
var x68 = class {
        static {
            i0(this, "Query")
        } [0] = 0;
        exceededMatchLimit;
        textPredicates;
        captureNames;
        captureQuantifiers;
        predicates;
        setProperties;
        assertedProperties;
        refutedProperties;
        matchLimit;
        constructor(A, B) {
            let Q = s1.lengthBytesUTF8(B),
                Z = s1._malloc(Q + 1);
            s1.stringToUTF8(B, Z, Q + 1);
            let D = s1._ts_query_new(A[0], Z, Q, hB, hB + C9);
            if (!D) {
                let z = s1.getValue(hB + C9, "i32"),
                    $ = s1.getValue(hB, "i32"),
                    L = s1.UTF8ToString(Z, $).length,
                    N = B.slice(L, L + 100).split(`
`)[0],
                    R = N.match(_68)?.[0] ?? "";
                switch (s1._free(Z), z) {
                    case v$.Syntax:
                        throw new XG1(v$.Syntax, {
                            suffix: `${L}: '${N}'...`
                        }, L, 0);
                    case v$.NodeName:
                        throw new XG1(z, {
                            word: R
                        }, L, R.length);
                    case v$.FieldName:
                        throw new XG1(z, {
                            word: R
                        }, L, R.length);
                    case v$.CaptureName:
                        throw new XG1(z, {
                            word: R
                        }, L, R.length);
                    case v$.PatternStructure:
                        throw new XG1(z, {
                            suffix: `${L}: '${N}'...`
                        }, L, 0)
                }
            }
            let G = s1._ts_query_string_count(D),
                F = s1._ts_query_capture_count(D),
                I = s1._ts_query_pattern_count(D),
                Y = new Array(F),
                W = new Array(I),
                J = new Array(G);
            for (let z = 0; z < F; z++) {
                let $ = s1._ts_query_capture_name_for_id(D, z, hB),
                    L = s1.getValue(hB, "i32");
                Y[z] = s1.UTF8ToString($, L)
            }
            for (let z = 0; z < I; z++) {
                let $ = new Array(F);
                for (let L = 0; L < F; L++) {
                    let N = s1._ts_query_capture_quantifier_for_id(D, z, L);
                    $[L] = N
                }
                W[z] = $
            }
            for (let z = 0; z < G; z++) {
                let $ = s1._ts_query_string_value_for_id(D, z, hB),
                    L = s1.getValue(hB, "i32");
                J[z] = s1.UTF8ToString($, L)
            }
            let X = new Array(I),
                V = new Array(I),
                C = new Array(I),
                K = new Array(I),
                H = new Array(I);
            for (let z = 0; z < I; z++) {
                let $ = s1._ts_query_predicates_for_pattern(D, z, hB),
                    L = s1.getValue(hB, "i32");
                K[z] = [], H[z] = [];
                let N = new Array,
                    R = $;
                for (let O = 0; O < L; O++) {
                    let P = s1.getValue(R, "i32");
                    R += C9;
                    let j = s1.getValue(R, "i32");
                    R += C9, mMB(z, P, j, Y, J, N, H, K, X, V, C)
                }
                Object.freeze(H[z]), Object.freeze(K[z]), Object.freeze(X[z]), Object.freeze(V[z]), Object.freeze(C[z])
            }
            s1._free(Z), this[0] = D, this.captureNames = Y, this.captureQuantifiers = W, this.textPredicates = H, this.predicates = K, this.setProperties = X, this.assertedProperties = V, this.refutedProperties = C, this.exceededMatchLimit = !1
        }
        delete() {
            s1._ts_query_delete(this[0]), this[0] = 0
        }
        matches(A, B = {}) {
            let Q = B.startPosition ?? qv,
                Z = B.endPosition ?? qv,
                D = B.startIndex ?? 0,
                G = B.endIndex ?? 0,
                F = B.matchLimit ?? 4294967295,
                I = B.maxStartDepth ?? 4294967295,
                Y = B.timeoutMicros ?? 0,
                W = B.progressCallback;
            if (typeof F !== "number") throw new Error("Arguments must be numbers");
            if (this.matchLimit = F, G !== 0 && D > G) throw new Error("`startIndex` cannot be greater than `endIndex`");
            if (Z !== qv && (Q.row > Z.row || Q.row === Z.row && Q.column > Z.column)) throw new Error("`startPosition` cannot be greater than `endPosition`");
            if (W) s1.currentQueryProgressCallback = W;
            B4(A), s1._ts_query_matches_wasm(this[0], A.tree[0], Q.row, Q.column, Z.row, Z.column, D, G, F, I, Y);
            let J = s1.getValue(hB, "i32"),
                X = s1.getValue(hB + C9, "i32"),
                V = s1.getValue(hB + 2 * C9, "i32"),
                C = new Array(J);
            this.exceededMatchLimit = Boolean(V);
            let K = 0,
                H = X;
            for (let z = 0; z < J; z++) {
                let $ = s1.getValue(H, "i32");
                H += C9;
                let L = s1.getValue(H, "i32");
                H += C9;
                let N = new Array(L);
                if (H = Yq0(this, A.tree, H, $, N), this.textPredicates[$].every((R) => R(N))) {
                    C[K] = {
                        pattern: $,
                        patternIndex: $,
                        captures: N
                    };
                    let R = this.setProperties[$];
                    C[K].setProperties = R;
                    let O = this.assertedProperties[$];
                    C[K].assertedProperties = O;
                    let P = this.refutedProperties[$];
                    C[K].refutedProperties = P, K++
                }
            }
            return C.length = K, s1._free(X), s1.currentQueryProgressCallback = null, C
        }
        captures(A, B = {}) {
            let Q = B.startPosition ?? qv,
                Z = B.endPosition ?? qv,
                D = B.startIndex ?? 0,
                G = B.endIndex ?? 0,
                F = B.matchLimit ?? 4294967295,
                I = B.maxStartDepth ?? 4294967295,
                Y = B.timeoutMicros ?? 0,
                W = B.progressCallback;
            if (typeof F !== "number") throw new Error("Arguments must be numbers");
            if (this.matchLimit = F, G !== 0 && D > G) throw new Error("`startIndex` cannot be greater than `endIndex`");
            if (Z !== qv && (Q.row > Z.row || Q.row === Z.row && Q.column > Z.column)) throw new Error("`startPosition` cannot be greater than `endPosition`");
            if (W) s1.currentQueryProgressCallback = W;
            B4(A), s1._ts_query_captures_wasm(this[0], A.tree[0], Q.row, Q.column, Z.row, Z.column, D, G, F, I, Y);
            let J = s1.getValue(hB, "i32"),
                X = s1.getValue(hB + C9, "i32"),
                V = s1.getValue(hB + 2 * C9, "i32"),
                C = new Array;
            this.exceededMatchLimit = Boolean(V);
            let K = new Array,
                H = X;
            for (let z = 0; z < J; z++) {
                let $ = s1.getValue(H, "i32");
                H += C9;
                let L = s1.getValue(H, "i32");
                H += C9;
                let N = s1.getValue(H, "i32");
                if (H += C9, K.length = L, H = Yq0(this, A.tree, H, $, K), this.textPredicates[$].every((R) => R(K))) {
                    let R = K[N],
                        O = this.setProperties[$];
                    R.setProperties = O;
                    let P = this.assertedProperties[$];
                    R.assertedProperties = P;
                    let j = this.refutedProperties[$];
                    R.refutedProperties = j, C.push(R)
                }
            }
            return s1._free(X), s1.currentQueryProgressCallback = null, C
        }
        predicatesForPattern(A) {
            return this.predicates[A]
        }
        disableCapture(A) {
            let B = s1.lengthBytesUTF8(A),
                Q = s1._malloc(B + 1);
            s1.stringToUTF8(A, Q, B + 1), s1._ts_query_disable_capture(this[0], Q, B), s1._free(Q)
        }
        disablePattern(A) {
            if (A >= this.predicates.length) throw new Error(`Pattern index is ${A} but the pattern count is ${this.predicates.length}`);
            s1._ts_query_disable_pattern(this[0], A)
        }
        didExceedMatchLimit() {
            return this.exceededMatchLimit
        }
        startIndexForPattern(A) {
            if (A >= this.predicates.length) throw new Error(`Pattern index is ${A} but the pattern count is ${this.predicates.length}`);
            return s1._ts_query_start_byte_for_pattern(this[0], A)
        }
        endIndexForPattern(A) {
            if (A >= this.predicates.length) throw new Error(`Pattern index is ${A} but the pattern count is ${this.predicates.length}`);
            return s1._ts_query_end_byte_for_pattern(this[0], A)
        }
        patternCount() {
            return s1._ts_query_pattern_count(this[0])
        }
        captureIndexForName(A) {
            return this.captureNames.indexOf(A)
        }
        isPatternRooted(A) {
            return s1._ts_query_is_pattern_rooted(this[0], A) === 1
        }
        isPatternNonLocal(A) {
            return s1._ts_query_is_pattern_non_local(this[0], A) === 1
        }
        isPatternGuaranteedAtStep(A) {
            return s1._ts_query_is_pattern_guaranteed_at_step(this[0], A) === 1
        }
    },
    v68 = /^tree_sitter_\w+$/,
    dMB = class A {
        static {
            i0(this, "Language")
        } [0] = 0;
        types;
        fields;
        constructor(B, Q) {
            i11(B), this[0] = Q, this.types = new Array(s1._ts_language_symbol_count(this[0]));
            for (let Z = 0, D = this.types.length; Z < D; Z++)
                if (s1._ts_language_symbol_type(this[0], Z) < 2) this.types[Z] = s1.UTF8ToString(s1._ts_language_symbol_name(this[0], Z));
            this.fields = new Array(s1._ts_language_field_count(this[0]) + 1);
            for (let Z = 0, D = this.fields.length; Z < D; Z++) {
                let G = s1._ts_language_field_name_for_id(this[0], Z);
                if (G !== 0) this.fields[Z] = s1.UTF8ToString(G);
                else this.fields[Z] = null
            }
        }
        get name() {
            let B = s1._ts_language_name(this[0]);
            if (B === 0) return null;
            return s1.UTF8ToString(B)
        }
        get version() {
            return s1._ts_language_version(this[0])
        }
        get abiVersion() {
            return s1._ts_language_abi_version(this[0])
        }
        get metadata() {
            s1._ts_language_metadata(this[0]);
            let B = s1.getValue(hB, "i32"),
                Q = s1.getValue(hB + C9, "i32");
            if (B === 0) return null;
            return vMB(Q)
        }
        get fieldCount() {
            return this.fields.length - 1
        }
        get stateCount() {
            return s1._ts_language_state_count(this[0])
        }
        fieldIdForName(B) {
            let Q = this.fields.indexOf(B);
            return Q !== -1 ? Q : null
        }
        fieldNameForId(B) {
            return this.fields[B] ?? null
        }
        idForNodeType(B, Q) {
            let Z = s1.lengthBytesUTF8(B),
                D = s1._malloc(Z + 1);
            s1.stringToUTF8(B, D, Z + 1);
            let G = s1._ts_language_symbol_for_name(this[0], D, Z, Q ? 1 : 0);
            return s1._free(D), G || null
        }
        get nodeTypeCount() {
            return s1._ts_language_symbol_count(this[0])
        }
        nodeTypeForId(B) {
            let Q = s1._ts_language_symbol_name(this[0], B);
            return Q ? s1.UTF8ToString(Q) : null
        }
        nodeTypeIsNamed(B) {
            return s1._ts_language_type_is_named_wasm(this[0], B) ? !0 : !1
        }
        nodeTypeIsVisible(B) {
            return s1._ts_language_type_is_visible_wasm(this[0], B) ? !0 : !1
        }
        get supertypes() {
            s1._ts_language_supertypes_wasm(this[0]);
            let B = s1.getValue(hB, "i32"),
                Q = s1.getValue(hB + C9, "i32"),
                Z = new Array(B);
            if (B > 0) {
                let D = Q;
                for (let G = 0; G < B; G++) Z[G] = s1.getValue(D, "i16"), D += jMB
            }
            return Z
        }
        subtypes(B) {
            s1._ts_language_subtypes_wasm(this[0], B);
            let Q = s1.getValue(hB, "i32"),
                Z = s1.getValue(hB + C9, "i32"),
                D = new Array(Q);
            if (Q > 0) {
                let G = Z;
                for (let F = 0; F < Q; F++) D[F] = s1.getValue(G, "i16"), G += jMB
            }
            return D
        }
        nextState(B, Q) {
            return s1._ts_language_next_state(this[0], B, Q)
        }
        lookaheadIterator(B) {
            let Q = s1._ts_lookahead_iterator_new(this[0], B);
            if (Q) return new T68(Nv, Q, this);
            return null
        }
        query(B) {
            return console.warn("Language.query is deprecated. Use new Query(language, source) instead."), new x68(this, B)
        }
        static async load(B) {
            let Q;
            if (B instanceof Uint8Array) Q = Promise.resolve(B);
            else if (globalThis.process?.versions.node) Q = (await import("fs/promises")).readFile(B);
            else Q = fetch(B).then((I) => I.arrayBuffer().then((Y) => {
                if (I.ok) return new Uint8Array(Y);
                else {
                    let W = new TextDecoder("utf-8").decode(Y);
                    throw new Error(`Language.load failed with status ${I.status}.

${W}`)
                }
            }));
            let Z = await s1.loadWebAssemblyModule(await Q, {
                    loadAsync: !0
                }),
                D = Object.keys(Z),
                G = D.find((I) => v68.test(I) && !I.includes("external_scanner_"));
            if (!G) throw console.log(`Couldn't find language function in WASM file. Symbols:
${JSON.stringify(D,null,2)}`), new Error("Language.load failed: no language function found in WASM file");
            let F = Z[G]();
            return new A(Nv, F)
        }
    },
    b68 = (() => {
        var _scriptName = import.meta.url;
        return async function(moduleArg = {}) {
            var moduleRtn, Module = moduleArg,
                readyPromiseResolve, readyPromiseReject, readyPromise = new Promise((A, B) => {
                    readyPromiseResolve = A, readyPromiseReject = B
                }),
                ENVIRONMENT_IS_WEB = typeof window == "object",
                ENVIRONMENT_IS_WORKER = typeof WorkerGlobalScope != "undefined",
                ENVIRONMENT_IS_NODE = typeof process == "object" && typeof process.versions == "object" && typeof process.versions.node == "string" && process.type != "renderer",
                ENVIRONMENT_IS_SHELL = !ENVIRONMENT_IS_WEB && !ENVIRONMENT_IS_NODE && !ENVIRONMENT_IS_WORKER;
            if (ENVIRONMENT_IS_NODE) {
                let {
                    createRequire: A
                } = await import("module");
                var require = A(import.meta.url)
            }
            Module.currentQueryProgressCallback = null, Module.currentProgressCallback = null, Module.currentLogCallback = null, Module.currentParseCallback = null;
            var moduleOverrides = Object.assign({}, Module),
                arguments_ = [],
                thisProgram = "./this.program",
                quit_ = i0((A, B) => {
                    throw B
                }, "quit_"),
                scriptDirectory = "";

            function locateFile(A) {
                if (Module.locateFile) return Module.locateFile(A, scriptDirectory);
                return scriptDirectory + A
            }
            i0(locateFile, "locateFile");
            var readAsync, readBinary;
            if (ENVIRONMENT_IS_NODE) {
                var fs = require("fs"),
                    nodePath = require("path");
                if (!import.meta.url.startsWith("data:")) scriptDirectory = nodePath.dirname(require("url").fileURLToPath(import.meta.url)) + "/";
                if (readBinary = i0((A) => {
                        A = isFileURI(A) ? new URL(A) : A;
                        var B = fs.readFileSync(A);
                        return B
                    }, "readBinary"), readAsync = i0(async (A, B = !0) => {
                        A = isFileURI(A) ? new URL(A) : A;
                        var Q = fs.readFileSync(A, B ? void 0 : "utf8");
                        return Q
                    }, "readAsync"), !Module.thisProgram && process.argv.length > 1) thisProgram = process.argv[1].replace(/\\/g, "/");
                arguments_ = process.argv.slice(2), quit_ = i0((A, B) => {
                    throw process.exitCode = A, B
                }, "quit_")
            } else if (ENVIRONMENT_IS_WEB || ENVIRONMENT_IS_WORKER) {
                if (ENVIRONMENT_IS_WORKER) scriptDirectory = self.location.href;
                else if (typeof document != "undefined" && document.currentScript) scriptDirectory = document.currentScript.src;
                if (_scriptName) scriptDirectory = _scriptName;
                if (scriptDirectory.startsWith("blob:")) scriptDirectory = "";
                else scriptDirectory = scriptDirectory.slice(0, scriptDirectory.replace(/[?#].*/, "").lastIndexOf("/") + 1);
                {
                    if (ENVIRONMENT_IS_WORKER) readBinary = i0((A) => {
                        var B = new XMLHttpRequest;
                        return B.open("GET", A, !1), B.responseType = "arraybuffer", B.send(null), new Uint8Array(B.response)
                    }, "readBinary");
                    readAsync = i0(async (A) => {
                        if (isFileURI(A)) return new Promise((Q, Z) => {
                            var D = new XMLHttpRequest;
                            D.open("GET", A, !0), D.responseType = "arraybuffer", D.onload = () => {
                                if (D.status == 200 || D.status == 0 && D.response) {
                                    Q(D.response);
                                    return
                                }
                                Z(D.status)
                            }, D.onerror = Z, D.send(null)
                        });
                        var B = await fetch(A, {
                            credentials: "same-origin"
                        });
                        if (B.ok) return B.arrayBuffer();
                        throw new Error(B.status + " : " + B.url)
                    }, "readAsync")
                }
            }
            var out = Module.print || console.log.bind(console),
                err = Module.printErr || console.error.bind(console);
            if (Object.assign(Module, moduleOverrides), moduleOverrides = null, Module.arguments) arguments_ = Module.arguments;
            if (Module.thisProgram) thisProgram = Module.thisProgram;
            var dynamicLibraries = Module.dynamicLibraries || [],
                wasmBinary = Module.wasmBinary,
                wasmMemory, ABORT = !1,
                EXITSTATUS;

            function assert(A, B) {
                if (!A) abort(B)
            }
            i0(assert, "assert");
            var HEAP, HEAP8, HEAPU8, HEAP16, HEAPU16, HEAP32, HEAPU32, HEAPF32, HEAP64, HEAPU64, HEAPF64, HEAP_DATA_VIEW, runtimeInitialized = !1,
                isFileURI = i0((A) => A.startsWith("file://"), "isFileURI");

            function updateMemoryViews() {
                var A = wasmMemory.buffer;
                Module.HEAP_DATA_VIEW = HEAP_DATA_VIEW = new DataView(A), Module.HEAP8 = HEAP8 = new Int8Array(A), Module.HEAP16 = HEAP16 = new Int16Array(A), Module.HEAPU8 = HEAPU8 = new Uint8Array(A), Module.HEAPU16 = HEAPU16 = new Uint16Array(A), Module.HEAP32 = HEAP32 = new Int32Array(A), Module.HEAPU32 = HEAPU32 = new Uint32Array(A), Module.HEAPF32 = HEAPF32 = new Float32Array(A), Module.HEAPF64 = HEAPF64 = new Float64Array(A), Module.HEAP64 = HEAP64 = new BigInt64Array(A), Module.HEAPU64 = HEAPU64 = new BigUint64Array(A)
            }
            if (i0(updateMemoryViews, "updateMemoryViews"), Module.wasmMemory) wasmMemory = Module.wasmMemory;
            else {
                var INITIAL_MEMORY = Module.INITIAL_MEMORY || 33554432;
                wasmMemory = new WebAssembly.Memory({
                    initial: INITIAL_MEMORY / 65536,
                    maximum: 32768
                })
            }
            updateMemoryViews();
            var __RELOC_FUNCS__ = [];

            function preRun() {
                if (Module.preRun) {
                    if (typeof Module.preRun == "function") Module.preRun = [Module.preRun];
                    while (Module.preRun.length) addOnPreRun(Module.preRun.shift())
                }
                callRuntimeCallbacks(onPreRuns)
            }
            i0(preRun, "preRun");

            function initRuntime() {
                runtimeInitialized = !0, callRuntimeCallbacks(__RELOC_FUNCS__), wasmExports.__wasm_call_ctors(), callRuntimeCallbacks(onPostCtors)
            }
            i0(initRuntime, "initRuntime");

            function preMain() {}
            i0(preMain, "preMain");

            function postRun() {
                if (Module.postRun) {
                    if (typeof Module.postRun == "function") Module.postRun = [Module.postRun];
                    while (Module.postRun.length) addOnPostRun(Module.postRun.shift())
                }
                callRuntimeCallbacks(onPostRuns)
            }
            i0(postRun, "postRun");
            var runDependencies = 0,
                dependenciesFulfilled = null;

            function getUniqueRunDependency(A) {
                return A
            }
            i0(getUniqueRunDependency, "getUniqueRunDependency");

            function addRunDependency(A) {
                runDependencies++, Module.monitorRunDependencies?.(runDependencies)
            }
            i0(addRunDependency, "addRunDependency");

            function removeRunDependency(A) {
                if (runDependencies--, Module.monitorRunDependencies?.(runDependencies), runDependencies == 0) {
                    if (dependenciesFulfilled) {
                        var B = dependenciesFulfilled;
                        dependenciesFulfilled = null, B()
                    }
                }
            }
            i0(removeRunDependency, "removeRunDependency");

            function abort(A) {
                Module.onAbort?.(A), A = "Aborted(" + A + ")", err(A), ABORT = !0, A += ". Build with -sASSERTIONS for more info.";
                var B = new WebAssembly.RuntimeError(A);
                throw readyPromiseReject(B), B
            }
            i0(abort, "abort");
            var wasmBinaryFile;

            function findWasmBinary() {
                if (Module.locateFile) return locateFile("tree-sitter.wasm");
                return new URL("tree-sitter.wasm", import.meta.url).href
            }
            i0(findWasmBinary, "findWasmBinary");

            function getBinarySync(A) {
                if (A == wasmBinaryFile && wasmBinary) return new Uint8Array(wasmBinary);
                if (readBinary) return readBinary(A);
                throw "both async and sync fetching of the wasm failed"
            }
            i0(getBinarySync, "getBinarySync");
            async function getWasmBinary(A) {
                if (!wasmBinary) try {
                    var B = await readAsync(A);
                    return new Uint8Array(B)
                } catch {}
                return getBinarySync(A)
            }
            i0(getWasmBinary, "getWasmBinary");
            async function instantiateArrayBuffer(A, B) {
                try {
                    var Q = await getWasmBinary(A),
                        Z = await WebAssembly.instantiate(Q, B);
                    return Z
                } catch (D) {
                    err(`failed to asynchronously prepare wasm: ${D}`), abort(D)
                }
            }
            i0(instantiateArrayBuffer, "instantiateArrayBuffer");
            async function instantiateAsync(A, B, Q) {
                if (!A && typeof WebAssembly.instantiateStreaming == "function" && !isFileURI(B) && !ENVIRONMENT_IS_NODE) try {
                    var Z = fetch(B, {
                            credentials: "same-origin"
                        }),
                        D = await WebAssembly.instantiateStreaming(Z, Q);
                    return D
                } catch (G) {
                    err(`wasm streaming compile failed: ${G}`), err("falling back to ArrayBuffer instantiation")
                }
                return instantiateArrayBuffer(B, Q)
            }
            i0(instantiateAsync, "instantiateAsync");

            function getWasmImports() {
                return {
                    env: wasmImports,
                    wasi_snapshot_preview1: wasmImports,
                    "GOT.mem": new Proxy(wasmImports, GOTHandler),
                    "GOT.func": new Proxy(wasmImports, GOTHandler)
                }
            }
            i0(getWasmImports, "getWasmImports");
            async function createWasm() {
                function A(G, F) {
                    wasmExports = G.exports, wasmExports = relocateExports(wasmExports, 1024);
                    var I = getDylinkMetadata(F);
                    if (I.neededDynlibs) dynamicLibraries = I.neededDynlibs.concat(dynamicLibraries);
                    return mergeLibSymbols(wasmExports, "main"), LDSO.init(), loadDylibs(), __RELOC_FUNCS__.push(wasmExports.__wasm_apply_data_relocs), removeRunDependency("wasm-instantiate"), wasmExports
                }
                i0(A, "receiveInstance"), addRunDependency("wasm-instantiate");

                function B(G) {
                    return A(G.instance, G.module)
                }
                i0(B, "receiveInstantiationResult");
                var Q = getWasmImports();
                if (Module.instantiateWasm) return new Promise((G, F) => {
                    Module.instantiateWasm(Q, (I, Y) => {
                        A(I, Y), G(I.exports)
                    })
                });
                wasmBinaryFile ??= findWasmBinary();
                try {
                    var Z = await instantiateAsync(wasmBinary, wasmBinaryFile, Q),
                        D = B(Z);
                    return D
                } catch (G) {
                    return readyPromiseReject(G), Promise.reject(G)
                }
            }
            i0(createWasm, "createWasm");
            var ASM_CONSTS = {};
            class ExitStatus {
                static {
                    i0(this, "ExitStatus")
                }
                name = "ExitStatus";
                constructor(A) {
                    this.message = `Program terminated with exit(${A})`, this.status = A
                }
            }
            var GOT = {},
                currentModuleWeakSymbols = new Set([]),
                GOTHandler = {
                    get(A, B) {
                        var Q = GOT[B];
                        if (!Q) Q = GOT[B] = new WebAssembly.Global({
                            value: "i32",
                            mutable: !0
                        });
                        if (!currentModuleWeakSymbols.has(B)) Q.required = !0;
                        return Q
                    }
                },
                LE_HEAP_LOAD_F32 = i0((A) => HEAP_DATA_VIEW.getFloat32(A, !0), "LE_HEAP_LOAD_F32"),
                LE_HEAP_LOAD_F64 = i0((A) => HEAP_DATA_VIEW.getFloat64(A, !0), "LE_HEAP_LOAD_F64"),
                LE_HEAP_LOAD_I16 = i0((A) => HEAP_DATA_VIEW.getInt16(A, !0), "LE_HEAP_LOAD_I16"),
                LE_HEAP_LOAD_I32 = i0((A) => HEAP_DATA_VIEW.getInt32(A, !0), "LE_HEAP_LOAD_I32"),
                LE_HEAP_LOAD_U16 = i0((A) => HEAP_DATA_VIEW.getUint16(A, !0), "LE_HEAP_LOAD_U16"),
                LE_HEAP_LOAD_U32 = i0((A) => HEAP_DATA_VIEW.getUint32(A, !0), "LE_HEAP_LOAD_U32"),
                LE_HEAP_STORE_F32 = i0((A, B) => HEAP_DATA_VIEW.setFloat32(A, B, !0), "LE_HEAP_STORE_F32"),
                LE_HEAP_STORE_F64 = i0((A, B) => HEAP_DATA_VIEW.setFloat64(A, B, !0), "LE_HEAP_STORE_F64"),
                LE_HEAP_STORE_I16 = i0((A, B) => HEAP_DATA_VIEW.setInt16(A, B, !0), "LE_HEAP_STORE_I16"),
                LE_HEAP_STORE_I32 = i0((A, B) => HEAP_DATA_VIEW.setInt32(A, B, !0), "LE_HEAP_STORE_I32"),
                LE_HEAP_STORE_U16 = i0((A, B) => HEAP_DATA_VIEW.setUint16(A, B, !0), "LE_HEAP_STORE_U16"),
                LE_HEAP_STORE_U32 = i0((A, B) => HEAP_DATA_VIEW.setUint32(A, B, !0), "LE_HEAP_STORE_U32"),
                callRuntimeCallbacks = i0((A) => {
                    while (A.length > 0) A.shift()(Module)
                }, "callRuntimeCallbacks"),
                onPostRuns = [],
                addOnPostRun = i0((A) => onPostRuns.unshift(A), "addOnPostRun"),
                onPreRuns = [],
                addOnPreRun = i0((A) => onPreRuns.unshift(A), "addOnPreRun"),
                UTF8Decoder = typeof TextDecoder != "undefined" ? new TextDecoder : void 0,
                UTF8ArrayToString = i0((A, B = 0, Q = NaN) => {
                    var Z = B + Q,
                        D = B;
                    while (A[D] && !(D >= Z)) ++D;
                    if (D - B > 16 && A.buffer && UTF8Decoder) return UTF8Decoder.decode(A.subarray(B, D));
                    var G = "";
                    while (B < D) {
                        var F = A[B++];
                        if (!(F & 128)) {
                            G += String.fromCharCode(F);
                            continue
                        }
                        var I = A[B++] & 63;
                        if ((F & 224) == 192) {
                            G += String.fromCharCode((F & 31) << 6 | I);
                            continue
                        }
                        var Y = A[B++] & 63;
                        if ((F & 240) == 224) F = (F & 15) << 12 | I << 6 | Y;
                        else F = (F & 7) << 18 | I << 12 | Y << 6 | A[B++] & 63;
                        if (F < 65536) G += String.fromCharCode(F);
                        else {
                            var W = F - 65536;
                            G += String.fromCharCode(55296 | W >> 10, 56320 | W & 1023)
                        }
                    }
                    return G
                }, "UTF8ArrayToString"),
                getDylinkMetadata = i0((A) => {
                    var B = 0,
                        Q = 0;

                    function Z() {
                        return A[B++]
                    }
                    i0(Z, "getU8");

                    function D() {
                        var l = 0,
                            y = 1;
                        while (!0) {
                            var t = A[B++];
                            if (l += (t & 127) * y, y *= 128, !(t & 128)) break
                        }
                        return l
                    }
                    i0(D, "getLEB");

                    function G() {
                        var l = D();
                        return B += l, UTF8ArrayToString(A, B - l, l)
                    }
                    i0(G, "getString");

                    function F(l, y) {
                        if (l) throw new Error(y)
                    }
                    i0(F, "failIf");
                    var I = "dylink.0";
                    if (A instanceof WebAssembly.Module) {
                        var Y = WebAssembly.Module.customSections(A, I);
                        if (Y.length === 0) I = "dylink", Y = WebAssembly.Module.customSections(A, I);
                        F(Y.length === 0, "need dylink section"), A = new Uint8Array(Y[0]), Q = A.length
                    } else {
                        var W = new Uint32Array(new Uint8Array(A.subarray(0, 24)).buffer),
                            J = W[0] == 1836278016 || W[0] == 6386541;
                        F(!J, "need to see wasm magic number"), F(A[8] !== 0, "need the dylink section to be first"), B = 9;
                        var X = D();
                        Q = B + X, I = G()
                    }
                    var V = {
                        neededDynlibs: [],
                        tlsExports: new Set,
                        weakImports: new Set
                    };
                    if (I == "dylink") {
                        V.memorySize = D(), V.memoryAlign = D(), V.tableSize = D(), V.tableAlign = D();
                        var C = D();
                        for (var K = 0; K < C; ++K) {
                            var H = G();
                            V.neededDynlibs.push(H)
                        }
                    } else {
                        F(I !== "dylink.0");
                        var z = 1,
                            $ = 2,
                            L = 3,
                            N = 4,
                            R = 256,
                            O = 3,
                            P = 1;
                        while (B < Q) {
                            var j = Z(),
                                f = D();
                            if (j === z) V.memorySize = D(), V.memoryAlign = D(), V.tableSize = D(), V.tableAlign = D();
                            else if (j === $) {
                                var C = D();
                                for (var K = 0; K < C; ++K) H = G(), V.neededDynlibs.push(H)
                            } else if (j === L) {
                                var k = D();
                                while (k--) {
                                    var c = G(),
                                        u = D();
                                    if (u & R) V.tlsExports.add(c)
                                }
                            } else if (j === N) {
                                var k = D();
                                while (k--) {
                                    var a = G(),
                                        c = G(),
                                        u = D();
                                    if ((u & O) == P) V.weakImports.add(c)
                                }
                            } else B += f
                        }
                    }
                    return V
                }, "getDylinkMetadata");

            function getValue(A, B = "i8") {
                if (B.endsWith("*")) B = "*";
                switch (B) {
                    case "i1":
                        return HEAP8[A];
                    case "i8":
                        return HEAP8[A];
                    case "i16":
                        return LE_HEAP_LOAD_I16((A >> 1) * 2);
                    case "i32":
                        return LE_HEAP_LOAD_I32((A >> 2) * 4);
                    case "i64":
                        return HEAP64[A >> 3];
                    case "float":
                        return LE_HEAP_LOAD_F32((A >> 2) * 4);
                    case "double":
                        return LE_HEAP_LOAD_F64((A >> 3) * 8);
                    case "*":
                        return LE_HEAP_LOAD_U32((A >> 2) * 4);
                    default:
                        abort(`invalid type for getValue: ${B}`)
                }
            }
            i0(getValue, "getValue");
            var newDSO = i0((A, B, Q) => {
                    var Z = {
                        refcount: 1 / 0,
                        name: A,
                        exports: Q,
                        global: !0
                    };
                    if (LDSO.loadedLibsByName[A] = Z, B != null) LDSO.loadedLibsByHandle[B] = Z;
                    return Z
                }, "newDSO"),
                LDSO = {
                    loadedLibsByName: {},
                    loadedLibsByHandle: {},
                    init() {
                        newDSO("__main__", 0, wasmImports)
                    }
                },
                ___heap_base = 78224,
                alignMemory = i0((A, B) => Math.ceil(A / B) * B, "alignMemory"),
                getMemory = i0((A) => {
                    if (runtimeInitialized) return _calloc(A, 1);
                    var B = ___heap_base,
                        Q = B + alignMemory(A, 16);
                    return ___heap_base = Q, GOT.__heap_base.value = Q, B
                }, "getMemory"),
                isInternalSym = i0((A) => ["__cpp_exception", "__c_longjmp", "__wasm_apply_data_relocs", "__dso_handle", "__tls_size", "__tls_align", "__set_stack_limits", "_emscripten_tls_init", "__wasm_init_tls", "__wasm_call_ctors", "__start_em_asm", "__stop_em_asm", "__start_em_js", "__stop_em_js"].includes(A) || A.startsWith("__em_js__"), "isInternalSym"),
                uleb128Encode = i0((A, B) => {
                    if (A < 128) B.push(A);
                    else B.push(A % 128 | 128, A >> 7)
                }, "uleb128Encode"),
                sigToWasmTypes = i0((A) => {
                    var B = {
                            i: "i32",
                            j: "i64",
                            f: "f32",
                            d: "f64",
                            e: "externref",
                            p: "i32"
                        },
                        Q = {
                            parameters: [],
                            results: A[0] == "v" ? [] : [B[A[0]]]
                        };
                    for (var Z = 1; Z < A.length; ++Z) Q.parameters.push(B[A[Z]]);
                    return Q
                }, "sigToWasmTypes"),
                generateFuncType = i0((A, B) => {
                    var Q = A.slice(0, 1),
                        Z = A.slice(1),
                        D = {
                            i: 127,
                            p: 127,
                            j: 126,
                            f: 125,
                            d: 124,
                            e: 111
                        };
                    B.push(96), uleb128Encode(Z.length, B);
                    for (var G = 0; G < Z.length; ++G) B.push(D[Z[G]]);
                    if (Q == "v") B.push(0);
                    else B.push(1, D[Q])
                }, "generateFuncType"),
                convertJsFunctionToWasm = i0((A, B) => {
                    if (typeof WebAssembly.Function == "function") return new WebAssembly.Function(sigToWasmTypes(B), A);
                    var Q = [1];
                    generateFuncType(B, Q);
                    var Z = [0, 97, 115, 109, 1, 0, 0, 0, 1];
                    uleb128Encode(Q.length, Z), Z.push(...Q), Z.push(2, 7, 1, 1, 101, 1, 102, 0, 0, 7, 5, 1, 1, 102, 0, 0);
                    var D = new WebAssembly.Module(new Uint8Array(Z)),
                        G = new WebAssembly.Instance(D, {
                            e: {
                                f: A
                            }
                        }),
                        F = G.exports.f;
                    return F
                }, "convertJsFunctionToWasm"),
                wasmTableMirror = [],
                wasmTable = new WebAssembly.Table({
                    initial: 31,
                    element: "anyfunc"
                }),
                getWasmTableEntry = i0((A) => {
                    var B = wasmTableMirror[A];
                    if (!B) {
                        if (A >= wasmTableMirror.length) wasmTableMirror.length = A + 1;
                        wasmTableMirror[A] = B = wasmTable.get(A)
                    }
                    return B
                }, "getWasmTableEntry"),
                updateTableMap = i0((A, B) => {
                    if (functionsInTableMap)
                        for (var Q = A; Q < A + B; Q++) {
                            var Z = getWasmTableEntry(Q);
                            if (Z) functionsInTableMap.set(Z, Q)
                        }
                }, "updateTableMap"),
                functionsInTableMap, getFunctionAddress = i0((A) => {
                    if (!functionsInTableMap) functionsInTableMap = new WeakMap, updateTableMap(0, wasmTable.length);
                    return functionsInTableMap.get(A) || 0
                }, "getFunctionAddress"),
                freeTableIndexes = [],
                getEmptyTableSlot = i0(() => {
                    if (freeTableIndexes.length) return freeTableIndexes.pop();
                    try {
                        wasmTable.grow(1)
                    } catch (A) {
                        if (!(A instanceof RangeError)) throw A;
                        throw "Unable to grow wasm table. Set ALLOW_TABLE_GROWTH."
                    }
                    return wasmTable.length - 1
                }, "getEmptyTableSlot"),
                setWasmTableEntry = i0((A, B) => {
                    wasmTable.set(A, B), wasmTableMirror[A] = wasmTable.get(A)
                }, "setWasmTableEntry"),
                addFunction = i0((A, B) => {
                    var Q = getFunctionAddress(A);
                    if (Q) return Q;
                    var Z = getEmptyTableSlot();
                    try {
                        setWasmTableEntry(Z, A)
                    } catch (G) {
                        if (!(G instanceof TypeError)) throw G;
                        var D = convertJsFunctionToWasm(A, B);
                        setWasmTableEntry(Z, D)
                    }
                    return functionsInTableMap.set(A, Z), Z
                }, "addFunction"),
                updateGOT = i0((A, B) => {
                    for (var Q in A) {
                        if (isInternalSym(Q)) continue;
                        var Z = A[Q];
                        if (GOT[Q] ||= new WebAssembly.Global({
                                value: "i32",
                                mutable: !0
                            }), B || GOT[Q].value == 0)
                            if (typeof Z == "function") GOT[Q].value = addFunction(Z);
                            else if (typeof Z == "number") GOT[Q].value = Z;
                        else err(`unhandled export type for '${Q}': ${typeof Z}`)
                    }
                }, "updateGOT"),
                relocateExports = i0((A, B, Q) => {
                    var Z = {};
                    for (var D in A) {
                        var G = A[D];
                        if (typeof G == "object") G = G.value;
                        if (typeof G == "number") G += B;
                        Z[D] = G
                    }
                    return updateGOT(Z, Q), Z
                }, "relocateExports"),
                isSymbolDefined = i0((A) => {
                    var B = wasmImports[A];
                    if (!B || B.stub) return !1;
                    return !0
                }, "isSymbolDefined"),
                dynCall = i0((A, B, Q = []) => {
                    var Z = getWasmTableEntry(B)(...Q);
                    return Z
                }, "dynCall"),
                stackSave = i0(() => _emscripten_stack_get_current(), "stackSave"),
                stackRestore = i0((A) => __emscripten_stack_restore(A), "stackRestore"),
                createInvokeFunction = i0((A) => (B, ...Q) => {
                    var Z = stackSave();
                    try {
                        return dynCall(A, B, Q)
                    } catch (D) {
                        if (stackRestore(Z), D !== D + 0) throw D;
                        if (_setThrew(1, 0), A[0] == "j") return 0n
                    }
                }, "createInvokeFunction"),
                resolveGlobalSymbol = i0((A, B = !1) => {
                    var Q;
                    if (isSymbolDefined(A)) Q = wasmImports[A];
                    else if (A.startsWith("invoke_")) Q = wasmImports[A] = createInvokeFunction(A.split("_")[1]);
                    return {
                        sym: Q,
                        name: A
                    }
                }, "resolveGlobalSymbol"),
                onPostCtors = [],
                addOnPostCtor = i0((A) => onPostCtors.unshift(A), "addOnPostCtor"),
                UTF8ToString = i0((A, B) => A ? UTF8ArrayToString(HEAPU8, A, B) : "", "UTF8ToString"),
                loadWebAssemblyModule = i0((binary, flags, libName, localScope, handle) => {
                    var metadata = getDylinkMetadata(binary);
                    currentModuleWeakSymbols = metadata.weakImports;

                    function loadModule() {
                        var memAlign = Math.pow(2, metadata.memoryAlign),
                            memoryBase = metadata.memorySize ? alignMemory(getMemory(metadata.memorySize + memAlign), memAlign) : 0,
                            tableBase = metadata.tableSize ? wasmTable.length : 0;
                        if (handle) HEAP8[handle + 8] = 1, LE_HEAP_STORE_U32((handle + 12 >> 2) * 4, memoryBase), LE_HEAP_STORE_I32((handle + 16 >> 2) * 4, metadata.memorySize), LE_HEAP_STORE_U32((handle + 20 >> 2) * 4, tableBase), LE_HEAP_STORE_I32((handle + 24 >> 2) * 4, metadata.tableSize);
                        if (metadata.tableSize) wasmTable.grow(metadata.tableSize);
                        var moduleExports;

                        function resolveSymbol(A) {
                            var B = resolveGlobalSymbol(A).sym;
                            if (!B && localScope) B = localScope[A];
                            if (!B) B = moduleExports[A];
                            return B
                        }
                        i0(resolveSymbol, "resolveSymbol");
                        var proxyHandler = {
                                get(A, B) {
                                    switch (B) {
                                        case "__memory_base":
                                            return memoryBase;
                                        case "__table_base":
                                            return tableBase
                                    }
                                    if (B in wasmImports && !wasmImports[B].stub) {
                                        var Q = wasmImports[B];
                                        return Q
                                    }
                                    if (!(B in A)) {
                                        var Z;
                                        A[B] = (...D) => {
                                            return Z ||= resolveSymbol(B), Z(...D)
                                        }
                                    }
                                    return A[B]
                                }
                            },
                            proxy = new Proxy({}, proxyHandler),
                            info = {
                                "GOT.mem": new Proxy({}, GOTHandler),
                                "GOT.func": new Proxy({}, GOTHandler),
                                env: proxy,
                                wasi_snapshot_preview1: proxy
                            };

                        function postInstantiation(module, instance) {
                            if (updateTableMap(tableBase, metadata.tableSize), moduleExports = relocateExports(instance.exports, memoryBase), !flags.allowUndefined) reportUndefinedSymbols();

                            function addEmAsm(addr, body) {
                                var args = [],
                                    arity = 0;
                                for (; arity < 16; arity++)
                                    if (body.indexOf("$" + arity) != -1) args.push("$" + arity);
                                    else break;
                                args = args.join(",");
                                var func = `(${args}) => { ${body} };`;
                                ASM_CONSTS[start] = eval(func)
                            }
                            if (i0(addEmAsm, "addEmAsm"), "__start_em_asm" in moduleExports) {
                                var {
                                    __start_em_asm: start,
                                    __stop_em_asm: stop
                                } = moduleExports;
                                while (start < stop) {
                                    var jsString = UTF8ToString(start);
                                    addEmAsm(start, jsString), start = HEAPU8.indexOf(0, start) + 1
                                }
                            }

                            function addEmJs(name, cSig, body) {
                                var jsArgs = [];
                                if (cSig = cSig.slice(1, -1), cSig != "void") {
                                    cSig = cSig.split(",");
                                    for (var i in cSig) {
                                        var jsArg = cSig[i].split(" ").pop();
                                        jsArgs.push(jsArg.replace("*", ""))
                                    }
                                }
                                var func = `(${jsArgs}) => ${body};`;
                                moduleExports[name] = eval(func)
                            }
                            i0(addEmJs, "addEmJs");
                            for (var name in moduleExports)
                                if (name.startsWith("__em_js__")) {
                                    var start = moduleExports[name],
                                        jsString = UTF8ToString(start),
                                        parts = jsString.split("<::>");
                                    addEmJs(name.replace("__em_js__", ""), parts[0], parts[1]), delete moduleExports[name]
                                } var applyRelocs = moduleExports.__wasm_apply_data_relocs;
                            if (applyRelocs)
                                if (runtimeInitialized) applyRelocs();
                                else __RELOC_FUNCS__.push(applyRelocs);
                            var init = moduleExports.__wasm_call_ctors;
                            if (init)
                                if (runtimeInitialized) init();
                                else addOnPostCtor(init);
                            return moduleExports
                        }
                        if (i0(postInstantiation, "postInstantiation"), flags.loadAsync) {
                            if (binary instanceof WebAssembly.Module) {
                                var instance = new WebAssembly.Instance(binary, info);
                                return Promise.resolve(postInstantiation(binary, instance))
                            }
                            return WebAssembly.instantiate(binary, info).then((A) => postInstantiation(A.module, A.instance))
                        }
                        var module = binary instanceof WebAssembly.Module ? binary : new WebAssembly.Module(binary),
                            instance = new WebAssembly.Instance(module, info);
                        return postInstantiation(module, instance)
                    }
                    if (i0(loadModule, "loadModule"), flags.loadAsync) return metadata.neededDynlibs.reduce((A, B) => A.then(() => loadDynamicLibrary(B, flags, localScope)), Promise.resolve()).then(loadModule);
                    return metadata.neededDynlibs.forEach((A) => loadDynamicLibrary(A, flags, localScope)), loadModule()
                }, "loadWebAssemblyModule"),
                mergeLibSymbols = i0((A, B) => {
                    for (var [Q, Z] of Object.entries(A)) {
                        let D = i0((F) => {
                            if (!isSymbolDefined(F)) wasmImports[F] = Z
                        }, "setImport");
                        D(Q);
                        let G = "__main_argc_argv";
                        if (Q == "main") D(G);
                        if (Q == G) D("main")
                    }
                }, "mergeLibSymbols"),
                asyncLoad = i0(async (A) => {
                    var B = await readAsync(A);
                    return new Uint8Array(B)
                }, "asyncLoad");

            function loadDynamicLibrary(A, B = {
                global: !0,
                nodelete: !0
            }, Q, Z) {
                var D = LDSO.loadedLibsByName[A];
                if (D) {
                    if (!B.global) {
                        if (Q) Object.assign(Q, D.exports)
                    } else if (!D.global) D.global = !0, mergeLibSymbols(D.exports, A);
                    if (B.nodelete && D.refcount !== 1 / 0) D.refcount = 1 / 0;
                    if (D.refcount++, Z) LDSO.loadedLibsByHandle[Z] = D;
                    return B.loadAsync ? Promise.resolve(!0) : !0
                }
                D = newDSO(A, Z, "loading"), D.refcount = B.nodelete ? 1 / 0 : 1, D.global = B.global;

                function G() {
                    if (Z) {
                        var Y = LE_HEAP_LOAD_U32((Z + 28 >> 2) * 4),
                            W = LE_HEAP_LOAD_U32((Z + 32 >> 2) * 4);
                        if (Y && W) {
                            var J = HEAP8.slice(Y, Y + W);
                            return B.loadAsync ? Promise.resolve(J) : J
                        }
                    }
                    var X = locateFile(A);
                    if (B.loadAsync) return asyncLoad(X);
                    if (!readBinary) throw new Error(`${X}: file not found, and synchronous loading of external files is not available`);
                    return readBinary(X)
                }
                i0(G, "loadLibData");

                function F() {
                    if (B.loadAsync) return G().then((Y) => loadWebAssemblyModule(Y, B, A, Q, Z));
                    return loadWebAssemblyModule(G(), B, A, Q, Z)
                }
                i0(F, "getExports");

                function I(Y) {
                    if (D.global) mergeLibSymbols(Y, A);
                    else if (Q) Object.assign(Q, Y);
                    D.exports = Y
                }
                if (i0(I, "moduleLoaded"), B.loadAsync) return F().then((Y) => {
                    return I(Y), !0
                });
                return I(F()), !0
            }
            i0(loadDynamicLibrary, "loadDynamicLibrary");
            var reportUndefinedSymbols = i0(() => {
                    for (var [A, B] of Object.entries(GOT))
                        if (B.value == 0) {
                            var Q = resolveGlobalSymbol(A, !0).sym;
                            if (!Q && !B.required) continue;
                            if (typeof Q == "function") B.value = addFunction(Q, Q.sig);
                            else if (typeof Q == "number") B.value = Q;
                            else throw new Error(`bad export type for '${A}': ${typeof Q}`)
                        }
                }, "reportUndefinedSymbols"),
                loadDylibs = i0(() => {
                    if (!dynamicLibraries.length) {
                        reportUndefinedSymbols();
                        return
                    }
                    addRunDependency("loadDylibs"), dynamicLibraries.reduce((A, B) => A.then(() => loadDynamicLibrary(B, {
                        loadAsync: !0,
                        global: !0,
                        nodelete: !0,
                        allowUndefined: !0
                    })), Promise.resolve()).then(() => {
                        reportUndefinedSymbols(), removeRunDependency("loadDylibs")
                    })
                }, "loadDylibs"),
                noExitRuntime = Module.noExitRuntime || !0;

            function setValue(A, B, Q = "i8") {
                if (Q.endsWith("*")) Q = "*";
                switch (Q) {
                    case "i1":
                        HEAP8[A] = B;
                        break;
                    case "i8":
                        HEAP8[A] = B;
                        break;
                    case "i16":
                        LE_HEAP_STORE_I16((A >> 1) * 2, B);
                        break;
                    case "i32":
                        LE_HEAP_STORE_I32((A >> 2) * 4, B);
                        break;
                    case "i64":
                        HEAP64[A >> 3] = BigInt(B);
                        break;
                    case "float":
                        LE_HEAP_STORE_F32((A >> 2) * 4, B);
                        break;
                    case "double":
                        LE_HEAP_STORE_F64((A >> 3) * 8, B);
                        break;
                    case "*":
                        LE_HEAP_STORE_U32((A >> 2) * 4, B);
                        break;
                    default:
                        abort(`invalid type for setValue: ${Q}`)
                }
            }
            i0(setValue, "setValue");
            var ___memory_base = new WebAssembly.Global({
                    value: "i32",
                    mutable: !1
                }, 1024),
                ___stack_pointer = new WebAssembly.Global({
                    value: "i32",
                    mutable: !0
                }, 78224),
                ___table_base = new WebAssembly.Global({
                    value: "i32",
                    mutable: !1
                }, 1),
                __abort_js = i0(() => abort(""), "__abort_js");
            __abort_js.sig = "v";
            var _emscripten_get_now = i0(() => performance.now(), "_emscripten_get_now");
            _emscripten_get_now.sig = "d";
            var _emscripten_date_now = i0(() => Date.now(), "_emscripten_date_now");
            _emscripten_date_now.sig = "d";
            var nowIsMonotonic = 1,
                checkWasiClock = i0((A) => A >= 0 && A <= 3, "checkWasiClock"),
                INT53_MAX = 9007199254740992,
                INT53_MIN = -9007199254740992,
                bigintToI53Checked = i0((A) => A < INT53_MIN || A > INT53_MAX ? NaN : Number(A), "bigintToI53Checked");

            function _clock_time_get(A, B, Q) {
                if (B = bigintToI53Checked(B), !checkWasiClock(A)) return 28;
                var Z;
                if (A === 0) Z = _emscripten_date_now();
                else if (nowIsMonotonic) Z = _emscripten_get_now();
                else return 52;
                var D = Math.round(Z * 1000 * 1000);
                return HEAP64[Q >> 3] = BigInt(D), 0
            }
            i0(_clock_time_get, "_clock_time_get"), _clock_time_get.sig = "iijp";
            var getHeapMax = i0(() => 2147483648, "getHeapMax"),
                growMemory = i0((A) => {
                    var B = wasmMemory.buffer,
                        Q = (A - B.byteLength + 65535) / 65536 | 0;
                    try {
                        return wasmMemory.grow(Q), updateMemoryViews(), 1
                    } catch (Z) {}
                }, "growMemory"),
                _emscripten_resize_heap = i0((A) => {
                    var B = HEAPU8.length;
                    A >>>= 0;
                    var Q = getHeapMax();
                    if (A > Q) return !1;
                    for (var Z = 1; Z <= 4; Z *= 2) {
                        var D = B * (1 + 0.2 / Z);
                        D = Math.min(D, A + 100663296);
                        var G = Math.min(Q, alignMemory(Math.max(A, D), 65536)),
                            F = growMemory(G);
                        if (F) return !0
                    }
                    return !1
                }, "_emscripten_resize_heap");
            _emscripten_resize_heap.sig = "ip";
            var _fd_close = i0((A) => 52, "_fd_close");
            _fd_close.sig = "ii";

            function _fd_seek(A, B, Q, Z) {
                return B = bigintToI53Checked(B), 70
            }
            i0(_fd_seek, "_fd_seek"), _fd_seek.sig = "iijip";
            var printCharBuffers = [null, [],
                    []
                ],
                printChar = i0((A, B) => {
                    var Q = printCharBuffers[A];
                    if (B === 0 || B === 10)(A === 1 ? out : err)(UTF8ArrayToString(Q)), Q.length = 0;
                    else Q.push(B)
                }, "printChar"),
                flush_NO_FILESYSTEM = i0(() => {
                    if (printCharBuffers[1].length) printChar(1, 10);
                    if (printCharBuffers[2].length) printChar(2, 10)
                }, "flush_NO_FILESYSTEM"),
                SYSCALLS = {
                    varargs: void 0,
                    getStr(A) {
                        var B = UTF8ToString(A);
                        return B
                    }
                },
                _fd_write = i0((A, B, Q, Z) => {
                    var D = 0;
                    for (var G = 0; G < Q; G++) {
                        var F = LE_HEAP_LOAD_U32((B >> 2) * 4),
                            I = LE_HEAP_LOAD_U32((B + 4 >> 2) * 4);
                        B += 8;
                        for (var Y = 0; Y < I; Y++) printChar(A, HEAPU8[F + Y]);
                        D += I
                    }
                    return LE_HEAP_STORE_U32((Z >> 2) * 4, D), 0
                }, "_fd_write");
            _fd_write.sig = "iippp";

            function _tree_sitter_log_callback(A, B) {
                if (Module.currentLogCallback) {
                    let Q = UTF8ToString(B);
                    Module.currentLogCallback(Q, A !== 0)
                }
            }
            i0(_tree_sitter_log_callback, "_tree_sitter_log_callback");

            function _tree_sitter_parse_callback(A, B, Q, Z, D) {
                let F = Module.currentParseCallback(B, {
                    row: Q,
                    column: Z
                });
                if (typeof F === "string") setValue(D, F.length, "i32"), stringToUTF16(F, A, 10240);
                else setValue(D, 0, "i32")
            }
            i0(_tree_sitter_parse_callback, "_tree_sitter_parse_callback");

            function _tree_sitter_progress_callback(A, B) {
                if (Module.currentProgressCallback) return Module.currentProgressCallback({
                    currentOffset: A,
                    hasError: B
                });
                return !1
            }
            i0(_tree_sitter_progress_callback, "_tree_sitter_progress_callback");

            function _tree_sitter_query_progress_callback(A) {
                if (Module.currentQueryProgressCallback) return Module.currentQueryProgressCallback({
                    currentOffset: A
                });
                return !1
            }
            i0(_tree_sitter_query_progress_callback, "_tree_sitter_query_progress_callback");
            var runtimeKeepaliveCounter = 0,
                keepRuntimeAlive = i0(() => noExitRuntime || runtimeKeepaliveCounter > 0, "keepRuntimeAlive"),
                _proc_exit = i0((A) => {
                    if (EXITSTATUS = A, !keepRuntimeAlive()) Module.onExit?.(A), ABORT = !0;
                    quit_(A, new ExitStatus(A))
                }, "_proc_exit");
            _proc_exit.sig = "vi";
            var exitJS = i0((A, B) => {
                    EXITSTATUS = A, _proc_exit(A)
                }, "exitJS"),
                handleException = i0((A) => {
                    if (A instanceof ExitStatus || A == "unwind") return EXITSTATUS;
                    quit_(1, A)
                }, "handleException"),
                lengthBytesUTF8 = i0((A) => {
                    var B = 0;
                    for (var Q = 0; Q < A.length; ++Q) {
                        var Z = A.charCodeAt(Q);
                        if (Z <= 127) B++;
                        else if (Z <= 2047) B += 2;
                        else if (Z >= 55296 && Z <= 57343) B += 4, ++Q;
                        else B += 3
                    }
                    return B
                }, "lengthBytesUTF8"),
                stringToUTF8Array = i0((A, B, Q, Z) => {
                    if (!(Z > 0)) return 0;
                    var D = Q,
                        G = Q + Z - 1;
                    for (var F = 0; F < A.length; ++F) {
                        var I = A.charCodeAt(F);
                        if (I >= 55296 && I <= 57343) {
                            var Y = A.charCodeAt(++F);
                            I = 65536 + ((I & 1023) << 10) | Y & 1023
                        }
                        if (I <= 127) {
                            if (Q >= G) break;
                            B[Q++] = I
                        } else if (I <= 2047) {
                            if (Q + 1 >= G) break;
                            B[Q++] = 192 | I >> 6, B[Q++] = 128 | I & 63
                        } else if (I <= 65535) {
                            if (Q + 2 >= G) break;
                            B[Q++] = 224 | I >> 12, B[Q++] = 128 | I >> 6 & 63, B[Q++] = 128 | I & 63
                        } else {
                            if (Q + 3 >= G) break;
                            B[Q++] = 240 | I >> 18, B[Q++] = 128 | I >> 12 & 63, B[Q++] = 128 | I >> 6 & 63, B[Q++] = 128 | I & 63
                        }
                    }
                    return B[Q] = 0, Q - D
                }, "stringToUTF8Array"),
                stringToUTF8 = i0((A, B, Q) => stringToUTF8Array(A, HEAPU8, B, Q), "stringToUTF8"),
                stackAlloc = i0((A) => __emscripten_stack_alloc(A), "stackAlloc"),
                stringToUTF8OnStack = i0((A) => {
                    var B = lengthBytesUTF8(A) + 1,
                        Q = stackAlloc(B);
                    return stringToUTF8(A, Q, B), Q
                }, "stringToUTF8OnStack"),
                AsciiToString = i0((A) => {
                    var B = "";
                    while (!0) {
                        var Q = HEAPU8[A++];
                        if (!Q) return B;
                        B += String.fromCharCode(Q)
                    }
                }, "AsciiToString"),
                stringToUTF16 = i0((A, B, Q) => {
                    if (Q ??= 2147483647, Q < 2) return 0;
                    Q -= 2;
                    var Z = B,
                        D = Q < A.length * 2 ? Q / 2 : A.length;
                    for (var G = 0; G < D; ++G) {
                        var F = A.charCodeAt(G);
                        LE_HEAP_STORE_I16((B >> 1) * 2, F), B += 2
                    }
                    return LE_HEAP_STORE_I16((B >> 1) * 2, 0), B - Z
                }, "stringToUTF16"),
                wasmImports = {
                    __heap_base: ___heap_base,
                    __indirect_function_table: wasmTable,
                    __memory_base: ___memory_base,
                    __stack_pointer: ___stack_pointer,
                    __table_base: ___table_base,
                    _abort_js: __abort_js,
                    clock_time_get: _clock_time_get,
                    emscripten_resize_heap: _emscripten_resize_heap,
                    fd_close: _fd_close,
                    fd_seek: _fd_seek,
                    fd_write: _fd_write,
                    memory: wasmMemory,
                    tree_sitter_log_callback: _tree_sitter_log_callback,
                    tree_sitter_parse_callback: _tree_sitter_parse_callback,
                    tree_sitter_progress_callback: _tree_sitter_progress_callback,
                    tree_sitter_query_progress_callback: _tree_sitter_query_progress_callback
                },
                wasmExports = await createWasm(),
                ___wasm_call_ctors = wasmExports.__wasm_call_ctors,
                _malloc = Module._malloc = wasmExports.malloc,
                _calloc = Module._calloc = wasmExports.calloc,
                _realloc = Module._realloc = wasmExports.realloc,
                _free = Module._free = wasmExports.free,
                _memcmp = Module._memcmp = wasmExports.memcmp,
                _ts_language_symbol_count = Module._ts_language_symbol_count = wasmExports.ts_language_symbol_count,
                _ts_language_state_count = Module._ts_language_state_count = wasmExports.ts_language_state_count,
                _ts_language_version = Module._ts_language_version = wasmExports.ts_language_version,
                _ts_language_abi_version = Module._ts_language_abi_version = wasmExports.ts_language_abi_version,
                _ts_language_metadata = Module._ts_language_metadata = wasmExports.ts_language_metadata,
                _ts_language_name = Module._ts_language_name = wasmExports.ts_language_name,
                _ts_language_field_count = Module._ts_language_field_count = wasmExports.ts_language_field_count,
                _ts_language_next_state = Module._ts_language_next_state = wasmExports.ts_language_next_state,
                _ts_language_symbol_name = Module._ts_language_symbol_name = wasmExports.ts_language_symbol_name,
                _ts_language_symbol_for_name = Module._ts_language_symbol_for_name = wasmExports.ts_language_symbol_for_name,
                _strncmp = Module._strncmp = wasmExports.strncmp,
                _ts_language_symbol_type = Module._ts_language_symbol_type = wasmExports.ts_language_symbol_type,
                _ts_language_field_name_for_id = Module._ts_language_field_name_for_id = wasmExports.ts_language_field_name_for_id,
                _ts_lookahead_iterator_new = Module._ts_lookahead_iterator_new = wasmExports.ts_lookahead_iterator_new,
                _ts_lookahead_iterator_delete = Module._ts_lookahead_iterator_delete = wasmExports.ts_lookahead_iterator_delete,
                _ts_lookahead_iterator_reset_state = Module._ts_lookahead_iterator_reset_state = wasmExports.ts_lookahead_iterator_reset_state,
                _ts_lookahead_iterator_reset = Module._ts_lookahead_iterator_reset = wasmExports.ts_lookahead_iterator_reset,
                _ts_lookahead_iterator_next = Module._ts_lookahead_iterator_next = wasmExports.ts_lookahead_iterator_next,
                _ts_lookahead_iterator_current_symbol = Module._ts_lookahead_iterator_current_symbol = wasmExports.ts_lookahead_iterator_current_symbol,
                _ts_parser_delete = Module._ts_parser_delete = wasmExports.ts_parser_delete,
                _ts_parser_reset = Module._ts_parser_reset = wasmExports.ts_parser_reset,
                _ts_parser_set_language = Module._ts_parser_set_language = wasmExports.ts_parser_set_language,
                _ts_parser_timeout_micros = Module._ts_parser_timeout_micros = wasmExports.ts_parser_timeout_micros,
                _ts_parser_set_timeout_micros = Module._ts_parser_set_timeout_micros = wasmExports.ts_parser_set_timeout_micros,
                _ts_parser_set_included_ranges = Module._ts_parser_set_included_ranges = wasmExports.ts_parser_set_included_ranges,
                _ts_query_new = Module._ts_query_new = wasmExports.ts_query_new,
                _ts_query_delete = Module._ts_query_delete = wasmExports.ts_query_delete,
                _iswspace = Module._iswspace = wasmExports.iswspace,
                _iswalnum = Module._iswalnum = wasmExports.iswalnum,
                _ts_query_pattern_count = Module._ts_query_pattern_count = wasmExports.ts_query_pattern_count,
                _ts_query_capture_count = Module._ts_query_capture_count = wasmExports.ts_query_capture_count,
                _ts_query_string_count = Module._ts_query_string_count = wasmExports.ts_query_string_count,
                _ts_query_capture_name_for_id = Module._ts_query_capture_name_for_id = wasmExports.ts_query_capture_name_for_id,
                _ts_query_capture_quantifier_for_id = Module._ts_query_capture_quantifier_for_id = wasmExports.ts_query_capture_quantifier_for_id,
                _ts_query_string_value_for_id = Module._ts_query_string_value_for_id = wasmExports.ts_query_string_value_for_id,
                _ts_query_predicates_for_pattern = Module._ts_query_predicates_for_pattern = wasmExports.ts_query_predicates_for_pattern,
                _ts_query_start_byte_for_pattern = Module._ts_query_start_byte_for_pattern = wasmExports.ts_query_start_byte_for_pattern,
                _ts_query_end_byte_for_pattern = Module._ts_query_end_byte_for_pattern = wasmExports.ts_query_end_byte_for_pattern,
                _ts_query_is_pattern_rooted = Module._ts_query_is_pattern_rooted = wasmExports.ts_query_is_pattern_rooted,
                _ts_query_is_pattern_non_local = Module._ts_query_is_pattern_non_local = wasmExports.ts_query_is_pattern_non_local,
                _ts_query_is_pattern_guaranteed_at_step = Module._ts_query_is_pattern_guaranteed_at_step = wasmExports.ts_query_is_pattern_guaranteed_at_step,
                _ts_query_disable_capture = Module._ts_query_disable_capture = wasmExports.ts_query_disable_capture,
                _ts_query_disable_pattern = Module._ts_query_disable_pattern = wasmExports.ts_query_disable_pattern,
                _ts_tree_copy = Module._ts_tree_copy = wasmExports.ts_tree_copy,
                _ts_tree_delete = Module._ts_tree_delete = wasmExports.ts_tree_delete,
                _ts_init = Module._ts_init = wasmExports.ts_init,
                _ts_parser_new_wasm = Module._ts_parser_new_wasm = wasmExports.ts_parser_new_wasm,
                _ts_parser_enable_logger_wasm = Module._ts_parser_enable_logger_wasm = wasmExports.ts_parser_enable_logger_wasm,
                _ts_parser_parse_wasm = Module._ts_parser_parse_wasm = wasmExports.ts_parser_parse_wasm,
                _ts_parser_included_ranges_wasm = Module._ts_parser_included_ranges_wasm = wasmExports.ts_parser_included_ranges_wasm,
                _ts_language_type_is_named_wasm = Module._ts_language_type_is_named_wasm = wasmExports.ts_language_type_is_named_wasm,
                _ts_language_type_is_visible_wasm = Module._ts_language_type_is_visible_wasm = wasmExports.ts_language_type_is_visible_wasm,
                _ts_language_supertypes_wasm = Module._ts_language_supertypes_wasm = wasmExports.ts_language_supertypes_wasm,
                _ts_language_subtypes_wasm = Module._ts_language_subtypes_wasm = wasmExports.ts_language_subtypes_wasm,
                _ts_tree_root_node_wasm = Module._ts_tree_root_node_wasm = wasmExports.ts_tree_root_node_wasm,
                _ts_tree_root_node_with_offset_wasm = Module._ts_tree_root_node_with_offset_wasm = wasmExports.ts_tree_root_node_with_offset_wasm,
                _ts_tree_edit_wasm = Module._ts_tree_edit_wasm = wasmExports.ts_tree_edit_wasm,
                _ts_tree_included_ranges_wasm = Module._ts_tree_included_ranges_wasm = wasmExports.ts_tree_included_ranges_wasm,
                _ts_tree_get_changed_ranges_wasm = Module._ts_tree_get_changed_ranges_wasm = wasmExports.ts_tree_get_changed_ranges_wasm,
                _ts_tree_cursor_new_wasm = Module._ts_tree_cursor_new_wasm = wasmExports.ts_tree_cursor_new_wasm,
                _ts_tree_cursor_copy_wasm = Module._ts_tree_cursor_copy_wasm = wasmExports.ts_tree_cursor_copy_wasm,
                _ts_tree_cursor_delete_wasm = Module._ts_tree_cursor_delete_wasm = wasmExports.ts_tree_cursor_delete_wasm,
                _ts_tree_cursor_reset_wasm = Module._ts_tree_cursor_reset_wasm = wasmExports.ts_tree_cursor_reset_wasm,
                _ts_tree_cursor_reset_to_wasm = Module._ts_tree_cursor_reset_to_wasm = wasmExports.ts_tree_cursor_reset_to_wasm,
                _ts_tree_cursor_goto_first_child_wasm = Module._ts_tree_cursor_goto_first_child_wasm = wasmExports.ts_tree_cursor_goto_first_child_wasm,
                _ts_tree_cursor_goto_last_child_wasm = Module._ts_tree_cursor_goto_last_child_wasm = wasmExports.ts_tree_cursor_goto_last_child_wasm,
                _ts_tree_cursor_goto_first_child_for_index_wasm = Module._ts_tree_cursor_goto_first_child_for_index_wasm = wasmExports.ts_tree_cursor_goto_first_child_for_index_wasm,
                _ts_tree_cursor_goto_first_child_for_position_wasm = Module._ts_tree_cursor_goto_first_child_for_position_wasm = wasmExports.ts_tree_cursor_goto_first_child_for_position_wasm,
                _ts_tree_cursor_goto_next_sibling_wasm = Module._ts_tree_cursor_goto_next_sibling_wasm = wasmExports.ts_tree_cursor_goto_next_sibling_wasm,
                _ts_tree_cursor_goto_previous_sibling_wasm = Module._ts_tree_cursor_goto_previous_sibling_wasm = wasmExports.ts_tree_cursor_goto_previous_sibling_wasm,
                _ts_tree_cursor_goto_descendant_wasm = Module._ts_tree_cursor_goto_descendant_wasm = wasmExports.ts_tree_cursor_goto_descendant_wasm,
                _ts_tree_cursor_goto_parent_wasm = Module._ts_tree_cursor_goto_parent_wasm = wasmExports.ts_tree_cursor_goto_parent_wasm,
                _ts_tree_cursor_current_node_type_id_wasm = Module._ts_tree_cursor_current_node_type_id_wasm = wasmExports.ts_tree_cursor_current_node_type_id_wasm,
                _ts_tree_cursor_current_node_state_id_wasm = Module._ts_tree_cursor_current_node_state_id_wasm = wasmExports.ts_tree_cursor_current_node_state_id_wasm,
                _ts_tree_cursor_current_node_is_named_wasm = Module._ts_tree_cursor_current_node_is_named_wasm = wasmExports.ts_tree_cursor_current_node_is_named_wasm,
                _ts_tree_cursor_current_node_is_missing_wasm = Module._ts_tree_cursor_current_node_is_missing_wasm = wasmExports.ts_tree_cursor_current_node_is_missing_wasm,
                _ts_tree_cursor_current_node_id_wasm = Module._ts_tree_cursor_current_node_id_wasm = wasmExports.ts_tree_cursor_current_node_id_wasm,
                _ts_tree_cursor_start_position_wasm = Module._ts_tree_cursor_start_position_wasm = wasmExports.ts_tree_cursor_start_position_wasm,
                _ts_tree_cursor_end_position_wasm = Module._ts_tree_cursor_end_position_wasm = wasmExports.ts_tree_cursor_end_position_wasm,
                _ts_tree_cursor_start_index_wasm = Module._ts_tree_cursor_start_index_wasm = wasmExports.ts_tree_cursor_start_index_wasm,
                _ts_tree_cursor_end_index_wasm = Module._ts_tree_cursor_end_index_wasm = wasmExports.ts_tree_cursor_end_index_wasm,
                _ts_tree_cursor_current_field_id_wasm = Module._ts_tree_cursor_current_field_id_wasm = wasmExports.ts_tree_cursor_current_field_id_wasm,
                _ts_tree_cursor_current_depth_wasm = Module._ts_tree_cursor_current_depth_wasm = wasmExports.ts_tree_cursor_current_depth_wasm,
                _ts_tree_cursor_current_descendant_index_wasm = Module._ts_tree_cursor_current_descendant_index_wasm = wasmExports.ts_tree_cursor_current_descendant_index_wasm,
                _ts_tree_cursor_current_node_wasm = Module._ts_tree_cursor_current_node_wasm = wasmExports.ts_tree_cursor_current_node_wasm,
                _ts_node_symbol_wasm = Module._ts_node_symbol_wasm = wasmExports.ts_node_symbol_wasm,
                _ts_node_field_name_for_child_wasm = Module._ts_node_field_name_for_child_wasm = wasmExports.ts_node_field_name_for_child_wasm,
                _ts_node_field_name_for_named_child_wasm = Module._ts_node_field_name_for_named_child_wasm = wasmExports.ts_node_field_name_for_named_child_wasm,
                _ts_node_children_by_field_id_wasm = Module._ts_node_children_by_field_id_wasm = wasmExports.ts_node_children_by_field_id_wasm,
                _ts_node_first_child_for_byte_wasm = Module._ts_node_first_child_for_byte_wasm = wasmExports.ts_node_first_child_for_byte_wasm,
                _ts_node_first_named_child_for_byte_wasm = Module._ts_node_first_named_child_for_byte_wasm = wasmExports.ts_node_first_named_child_for_byte_wasm,
                _ts_node_grammar_symbol_wasm = Module._ts_node_grammar_symbol_wasm = wasmExports.ts_node_grammar_symbol_wasm,
                _ts_node_child_count_wasm = Module._ts_node_child_count_wasm = wasmExports.ts_node_child_count_wasm,
                _ts_node_named_child_count_wasm = Module._ts_node_named_child_count_wasm = wasmExports.ts_node_named_child_count_wasm,
                _ts_node_child_wasm = Module._ts_node_child_wasm = wasmExports.ts_node_child_wasm,
                _ts_node_named_child_wasm = Module._ts_node_named_child_wasm = wasmExports.ts_node_named_child_wasm,
                _ts_node_child_by_field_id_wasm = Module._ts_node_child_by_field_id_wasm = wasmExports.ts_node_child_by_field_id_wasm,
                _ts_node_next_sibling_wasm = Module._ts_node_next_sibling_wasm = wasmExports.ts_node_next_sibling_wasm,
                _ts_node_prev_sibling_wasm = Module._ts_node_prev_sibling_wasm = wasmExports.ts_node_prev_sibling_wasm,
                _ts_node_next_named_sibling_wasm = Module._ts_node_next_named_sibling_wasm = wasmExports.ts_node_next_named_sibling_wasm,
                _ts_node_prev_named_sibling_wasm = Module._ts_node_prev_named_sibling_wasm = wasmExports.ts_node_prev_named_sibling_wasm,
                _ts_node_descendant_count_wasm = Module._ts_node_descendant_count_wasm = wasmExports.ts_node_descendant_count_wasm,
                _ts_node_parent_wasm = Module._ts_node_parent_wasm = wasmExports.ts_node_parent_wasm,
                _ts_node_child_with_descendant_wasm = Module._ts_node_child_with_descendant_wasm = wasmExports.ts_node_child_with_descendant_wasm,
                _ts_node_descendant_for_index_wasm = Module._ts_node_descendant_for_index_wasm = wasmExports.ts_node_descendant_for_index_wasm,
                _ts_node_named_descendant_for_index_wasm = Module._ts_node_named_descendant_for_index_wasm = wasmExports.ts_node_named_descendant_for_index_wasm,
                _ts_node_descendant_for_position_wasm = Module._ts_node_descendant_for_position_wasm = wasmExports.ts_node_descendant_for_position_wasm,
                _ts_node_named_descendant_for_position_wasm = Module._ts_node_named_descendant_for_position_wasm = wasmExports.ts_node_named_descendant_for_position_wasm,
                _ts_node_start_point_wasm = Module._ts_node_start_point_wasm = wasmExports.ts_node_start_point_wasm,
                _ts_node_end_point_wasm = Module._ts_node_end_point_wasm = wasmExports.ts_node_end_point_wasm,
                _ts_node_start_index_wasm = Module._ts_node_start_index_wasm = wasmExports.ts_node_start_index_wasm,
                _ts_node_end_index_wasm = Module._ts_node_end_index_wasm = wasmExports.ts_node_end_index_wasm,
                _ts_node_to_string_wasm = Module._ts_node_to_string_wasm = wasmExports.ts_node_to_string_wasm,
                _ts_node_children_wasm = Module._ts_node_children_wasm = wasmExports.ts_node_children_wasm,
                _ts_node_named_children_wasm = Module._ts_node_named_children_wasm = wasmExports.ts_node_named_children_wasm,
                _ts_node_descendants_of_type_wasm = Module._ts_node_descendants_of_type_wasm = wasmExports.ts_node_descendants_of_type_wasm,
                _ts_node_is_named_wasm = Module._ts_node_is_named_wasm = wasmExports.ts_node_is_named_wasm,
                _ts_node_has_changes_wasm = Module._ts_node_has_changes_wasm = wasmExports.ts_node_has_changes_wasm,
                _ts_node_has_error_wasm = Module._ts_node_has_error_wasm = wasmExports.ts_node_has_error_wasm,
                _ts_node_is_error_wasm = Module._ts_node_is_error_wasm = wasmExports.ts_node_is_error_wasm,
                _ts_node_is_missing_wasm = Module._ts_node_is_missing_wasm = wasmExports.ts_node_is_missing_wasm,
                _ts_node_is_extra_wasm = Module._ts_node_is_extra_wasm = wasmExports.ts_node_is_extra_wasm,
                _ts_node_parse_state_wasm = Module._ts_node_parse_state_wasm = wasmExports.ts_node_parse_state_wasm,
                _ts_node_next_parse_state_wasm = Module._ts_node_next_parse_state_wasm = wasmExports.ts_node_next_parse_state_wasm,
                _ts_query_matches_wasm = Module._ts_query_matches_wasm = wasmExports.ts_query_matches_wasm,
                _ts_query_captures_wasm = Module._ts_query_captures_wasm = wasmExports.ts_query_captures_wasm,
                _memset = Module._memset = wasmExports.memset,
                _memcpy = Module._memcpy = wasmExports.memcpy,
                _memmove = Module._memmove = wasmExports.memmove,
                _iswalpha = Module._iswalpha = wasmExports.iswalpha,
                _iswblank = Module._iswblank = wasmExports.iswblank,
                _iswdigit = Module._iswdigit = wasmExports.iswdigit,
                _iswlower = Module._iswlower = wasmExports.iswlower,
                _iswupper = Module._iswupper = wasmExports.iswupper,
                _iswxdigit = Module._iswxdigit = wasmExports.iswxdigit,
                _memchr = Module._memchr = wasmExports.memchr,
                _strlen = Module._strlen = wasmExports.strlen,
                _strcmp = Module._strcmp = wasmExports.strcmp,
                _strncat = Module._strncat = wasmExports.strncat,
                _strncpy = Module._strncpy = wasmExports.strncpy,
                _towlower = Module._towlower = wasmExports.towlower,
                _towupper = Module._towupper = wasmExports.towupper,
                _setThrew = wasmExports.setThrew,
                __emscripten_stack_restore = wasmExports._emscripten_stack_restore,
                __emscripten_stack_alloc = wasmExports._emscripten_stack_alloc,
                _emscripten_stack_get_current = wasmExports.emscripten_stack_get_current,
                ___wasm_apply_data_relocs = wasmExports.__wasm_apply_data_relocs;
            Module.setValue = setValue, Module.getValue = getValue, Module.UTF8ToString = UTF8ToString, Module.stringToUTF8 = stringToUTF8, Module.lengthBytesUTF8 = lengthBytesUTF8, Module.AsciiToString = AsciiToString, Module.stringToUTF16 = stringToUTF16, Module.loadWebAssemblyModule = loadWebAssemblyModule;

            function callMain(A = []) {
                var B = resolveGlobalSymbol("main").sym;
                if (!B) return;
                A.unshift(thisProgram);
                var Q = A.length,
                    Z = stackAlloc((Q + 1) * 4),
                    D = Z;
                A.forEach((F) => {
                    LE_HEAP_STORE_U32((D >> 2) * 4, stringToUTF8OnStack(F)), D += 4
                }), LE_HEAP_STORE_U32((D >> 2) * 4, 0);
                try {
                    var G = B(Q, Z);
                    return exitJS(G, !0), G
                } catch (F) {
                    return handleException(F)
                }
            }
            i0(callMain, "callMain");

            function run(A = arguments_) {
                if (runDependencies > 0) {
                    dependenciesFulfilled = run;
                    return
                }
                if (preRun(), runDependencies > 0) {
                    dependenciesFulfilled = run;
                    return
                }

                function B() {
                    if (Module.calledRun = !0, ABORT) return;
                    initRuntime(), preMain(), readyPromiseResolve(Module), Module.onRuntimeInitialized?.();
                    var Q = Module.noInitialRun;
                    if (!Q) callMain(A);
                    postRun()
                }
                if (i0(B, "doRun"), Module.setStatus) Module.setStatus("Running..."), setTimeout(() => {
                    setTimeout(() => Module.setStatus(""), 1), B()
                }, 1);
                else B()
            }
            if (i0(run, "run"), Module.preInit) {
                if (typeof Module.preInit == "function") Module.preInit = [Module.preInit];
                while (Module.preInit.length > 0) Module.preInit.pop()()
            }
            return run(), moduleRtn = readyPromise, moduleRtn
        }
    })(),
    f68 = b68,
    Mv1 = null;