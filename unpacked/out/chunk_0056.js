/* chunk:56 bytes:[1389395, 1404555) size:15160 source:unpacked-cli.js */
var R7 = E((U15, VBA) => {
    var {
        defineProperty: XK1,
        getOwnPropertyDescriptor: Rc9,
        getOwnPropertyNames: Oc9
    } = Object, Tc9 = Object.prototype.hasOwnProperty, p5 = (A, B) => XK1(A, "name", {
        value: B,
        configurable: !0
    }), Pc9 = (A, B) => {
        for (var Q in B) XK1(A, Q, {
            get: B[Q],
            enumerable: !0
        })
    }, Sc9 = (A, B, Q, Z) => {
        if (B && typeof B === "object" || typeof B === "function") {
            for (let D of Oc9(B))
                if (!Tc9.call(A, D) && D !== Q) XK1(A, D, {
                    get: () => B[D],
                    enumerable: !(Z = Rc9(B, D)) || Z.enumerable
                })
        }
        return A
    }, jc9 = (A) => Sc9(XK1({}, "__esModule", {
        value: !0
    }), A), DBA = {};
    Pc9(DBA, {
        EndpointCache: () => kc9,
        EndpointError: () => HV,
        customEndpointFunctions: () => Za1,
        isIpAddress: () => GBA,
        isValidHostLabel: () => Ga1,
        resolveEndpoint: () => rc9
    });
    VBA.exports = jc9(DBA);
    var kc9 = class {
            constructor({
                size: A,
                params: B
            }) {
                if (this.data = new Map, this.parameters = [], this.capacity = A ?? 50, B) this.parameters = B
            }
            static {
                p5(this, "EndpointCache")
            }
            get(A, B) {
                let Q = this.hash(A);
                if (Q === !1) return B();
                if (!this.data.has(Q)) {
                    if (this.data.size > this.capacity + 10) {
                        let Z = this.data.keys(),
                            D = 0;
                        while (!0) {
                            let {
                                value: G,
                                done: F
                            } = Z.next();
                            if (this.data.delete(G), F || ++D > 10) break
                        }
                    }
                    this.data.set(Q, B())
                }
                return this.data.get(Q)
            }
            size() {
                return this.data.size
            }
            hash(A) {
                let B = "",
                    {
                        parameters: Q
                    } = this;
                if (Q.length === 0) return !1;
                for (let Z of Q) {
                    let D = String(A[Z] ?? "");
                    if (D.includes("|;")) return !1;
                    B += D + "|;"
                }
                return B
            }
        },
        yc9 = new RegExp("^(?:25[0-5]|2[0-4]\\d|1\\d\\d|[1-9]\\d|\\d)(?:\\.(?:25[0-5]|2[0-4]\\d|1\\d\\d|[1-9]\\d|\\d)){3}$"),
        GBA = p5((A) => yc9.test(A) || A.startsWith("[") && A.endsWith("]"), "isIpAddress"),
        _c9 = new RegExp("^(?!.*-$)(?!-)[a-zA-Z0-9-]{1,63}$"),
        Ga1 = p5((A, B = !1) => {
            if (!B) return _c9.test(A);
            let Q = A.split(".");
            for (let Z of Q)
                if (!Ga1(Z)) return !1;
            return !0
        }, "isValidHostLabel"),
        Za1 = {},
        N91 = "endpoints";

    function yO(A) {
        if (typeof A !== "object" || A == null) return A;
        if ("ref" in A) return `$${yO(A.ref)}`;
        if ("fn" in A) return `${A.fn}(${(A.argv||[]).map(yO).join(", ")})`;
        return JSON.stringify(A, null, 2)
    }
    p5(yO, "toDebugString");
    var HV = class extends Error {
            static {
                p5(this, "EndpointError")
            }
            constructor(A) {
                super(A);
                this.name = "EndpointError"
            }
        },
        xc9 = p5((A, B) => A === B, "booleanEquals"),
        vc9 = p5((A) => {
            let B = A.split("."),
                Q = [];
            for (let Z of B) {
                let D = Z.indexOf("[");
                if (D !== -1) {
                    if (Z.indexOf("]") !== Z.length - 1) throw new HV(`Path: '${A}' does not end with ']'`);
                    let G = Z.slice(D + 1, -1);
                    if (Number.isNaN(parseInt(G))) throw new HV(`Invalid array index: '${G}' in path: '${A}'`);
                    if (D !== 0) Q.push(Z.slice(0, D));
                    Q.push(G)
                } else Q.push(Z)
            }
            return Q
        }, "getAttrPathList"),
        FBA = p5((A, B) => vc9(B).reduce((Q, Z) => {
            if (typeof Q !== "object") throw new HV(`Index '${Z}' in '${B}' not found in '${JSON.stringify(A)}'`);
            else if (Array.isArray(Q)) return Q[parseInt(Z)];
            return Q[Z]
        }, A), "getAttr"),
        bc9 = p5((A) => A != null, "isSet"),
        fc9 = p5((A) => !A, "not"),
        Da1 = ZBA(),
        Qa1 = {
            [Da1.EndpointURLScheme.HTTP]: 80,
            [Da1.EndpointURLScheme.HTTPS]: 443
        },
        hc9 = p5((A) => {
            let B = (() => {
                try {
                    if (A instanceof URL) return A;
                    if (typeof A === "object" && "hostname" in A) {
                        let {
                            hostname: V,
                            port: C,
                            protocol: K = "",
                            path: H = "",
                            query: z = {}
                        } = A, $ = new URL(`${K}//${V}${C?`:${C}`:""}${H}`);
                        return $.search = Object.entries(z).map(([L, N]) => `${L}=${N}`).join("&"), $
                    }
                    return new URL(A)
                } catch (V) {
                    return null
                }
            })();
            if (!B) return console.error(`Unable to parse ${JSON.stringify(A)} as a whatwg URL.`), null;
            let Q = B.href,
                {
                    host: Z,
                    hostname: D,
                    pathname: G,
                    protocol: F,
                    search: I
                } = B;
            if (I) return null;
            let Y = F.slice(0, -1);
            if (!Object.values(Da1.EndpointURLScheme).includes(Y)) return null;
            let W = GBA(D),
                J = Q.includes(`${Z}:${Qa1[Y]}`) || typeof A === "string" && A.includes(`${Z}:${Qa1[Y]}`),
                X = `${Z}${J?`:${Qa1[Y]}`:""}`;
            return {
                scheme: Y,
                authority: X,
                path: G,
                normalizedPath: G.endsWith("/") ? G : `${G}/`,
                isIp: W
            }
        }, "parseURL"),
        gc9 = p5((A, B) => A === B, "stringEquals"),
        uc9 = p5((A, B, Q, Z) => {
            if (B >= Q || A.length < Q) return null;
            if (!Z) return A.substring(B, Q);
            return A.substring(A.length - Q, A.length - B)
        }, "substring"),
        mc9 = p5((A) => encodeURIComponent(A).replace(/[!*'()]/g, (B) => `%${B.charCodeAt(0).toString(16).toUpperCase()}`), "uriEncode"),
        dc9 = {
            booleanEquals: xc9,
            getAttr: FBA,
            isSet: bc9,
            isValidHostLabel: Ga1,
            not: fc9,
            parseURL: hc9,
            stringEquals: gc9,
            substring: uc9,
            uriEncode: mc9
        },
        IBA = p5((A, B) => {
            let Q = [],
                Z = {
                    ...B.endpointParams,
                    ...B.referenceRecord
                },
                D = 0;
            while (D < A.length) {
                let G = A.indexOf("{", D);
                if (G === -1) {
                    Q.push(A.slice(D));
                    break
                }
                Q.push(A.slice(D, G));
                let F = A.indexOf("}", G);
                if (F === -1) {
                    Q.push(A.slice(G));
                    break
                }
                if (A[G + 1] === "{" && A[F + 1] === "}") Q.push(A.slice(G + 1, F)), D = F + 2;
                let I = A.substring(G + 1, F);
                if (I.includes("#")) {
                    let [Y, W] = I.split("#");
                    Q.push(FBA(Z[Y], W))
                } else Q.push(Z[I]);
                D = F + 1
            }
            return Q.join("")
        }, "evaluateTemplate"),
        cc9 = p5(({
            ref: A
        }, B) => {
            return {
                ...B.endpointParams,
                ...B.referenceRecord
            } [A]
        }, "getReferenceValue"),
        VK1 = p5((A, B, Q) => {
            if (typeof A === "string") return IBA(A, Q);
            else if (A.fn) return YBA(A, Q);
            else if (A.ref) return cc9(A, Q);
            throw new HV(`'${B}': ${String(A)} is not a string, function or reference.`)
        }, "evaluateExpression"),
        YBA = p5(({
            fn: A,
            argv: B
        }, Q) => {
            let Z = B.map((G) => ["boolean", "number"].includes(typeof G) ? G : VK1(G, "arg", Q)),
                D = A.split(".");
            if (D[0] in Za1 && D[1] != null) return Za1[D[0]][D[1]](...Z);
            return dc9[A](...Z)
        }, "callFunction"),
        lc9 = p5(({
            assign: A,
            ...B
        }, Q) => {
            if (A && A in Q.referenceRecord) throw new HV(`'${A}' is already defined in Reference Record.`);
            let Z = YBA(B, Q);
            return Q.logger?.debug?.(`${N91} evaluateCondition: ${yO(B)} = ${yO(Z)}`), {
                result: Z === "" ? !0 : !!Z,
                ...A != null && {
                    toAssign: {
                        name: A,
                        value: Z
                    }
                }
            }
        }, "evaluateCondition"),
        Fa1 = p5((A = [], B) => {
            let Q = {};
            for (let Z of A) {
                let {
                    result: D,
                    toAssign: G
                } = lc9(Z, {
                    ...B,
                    referenceRecord: {
                        ...B.referenceRecord,
                        ...Q
                    }
                });
                if (!D) return {
                    result: D
                };
                if (G) Q[G.name] = G.value, B.logger?.debug?.(`${N91} assign: ${G.name} := ${yO(G.value)}`)
            }
            return {
                result: !0,
                referenceRecord: Q
            }
        }, "evaluateConditions"),
        pc9 = p5((A, B) => Object.entries(A).reduce((Q, [Z, D]) => ({
            ...Q,
            [Z]: D.map((G) => {
                let F = VK1(G, "Header value entry", B);
                if (typeof F !== "string") throw new HV(`Header '${Z}' value '${F}' is not a string`);
                return F
            })
        }), {}), "getEndpointHeaders"),
        WBA = p5((A, B) => {
            if (Array.isArray(A)) return A.map((Q) => WBA(Q, B));
            switch (typeof A) {
                case "string":
                    return IBA(A, B);
                case "object":
                    if (A === null) throw new HV(`Unexpected endpoint property: ${A}`);
                    return JBA(A, B);
                case "boolean":
                    return A;
                default:
                    throw new HV(`Unexpected endpoint property type: ${typeof A}`)
            }
        }, "getEndpointProperty"),
        JBA = p5((A, B) => Object.entries(A).reduce((Q, [Z, D]) => ({
            ...Q,
            [Z]: WBA(D, B)
        }), {}), "getEndpointProperties"),
        ic9 = p5((A, B) => {
            let Q = VK1(A, "Endpoint URL", B);
            if (typeof Q === "string") try {
                return new URL(Q)
            } catch (Z) {
                throw console.error(`Failed to construct URL with ${Q}`, Z), Z
            }
            throw new HV(`Endpoint URL must be a string, got ${typeof Q}`)
        }, "getEndpointUrl"),
        nc9 = p5((A, B) => {
            let {
                conditions: Q,
                endpoint: Z
            } = A, {
                result: D,
                referenceRecord: G
            } = Fa1(Q, B);
            if (!D) return;
            let F = {
                    ...B,
                    referenceRecord: {
                        ...B.referenceRecord,
                        ...G
                    }
                },
                {
                    url: I,
                    properties: Y,
                    headers: W
                } = Z;
            return B.logger?.debug?.(`${N91} Resolving endpoint from template: ${yO(Z)}`), {
                ...W != null && {
                    headers: pc9(W, F)
                },
                ...Y != null && {
                    properties: JBA(Y, F)
                },
                url: ic9(I, F)
            }
        }, "evaluateEndpointRule"),
        ac9 = p5((A, B) => {
            let {
                conditions: Q,
                error: Z
            } = A, {
                result: D,
                referenceRecord: G
            } = Fa1(Q, B);
            if (!D) return;
            throw new HV(VK1(Z, "Error", {
                ...B,
                referenceRecord: {
                    ...B.referenceRecord,
                    ...G
                }
            }))
        }, "evaluateErrorRule"),
        sc9 = p5((A, B) => {
            let {
                conditions: Q,
                rules: Z
            } = A, {
                result: D,
                referenceRecord: G
            } = Fa1(Q, B);
            if (!D) return;
            return XBA(Z, {
                ...B,
                referenceRecord: {
                    ...B.referenceRecord,
                    ...G
                }
            })
        }, "evaluateTreeRule"),
        XBA = p5((A, B) => {
            for (let Q of A)
                if (Q.type === "endpoint") {
                    let Z = nc9(Q, B);
                    if (Z) return Z
                } else if (Q.type === "error") ac9(Q, B);
            else if (Q.type === "tree") {
                let Z = sc9(Q, B);
                if (Z) return Z
            } else throw new HV(`Unknown endpoint rule: ${Q}`);
            throw new HV("Rules evaluation failed")
        }, "evaluateRules"),
        rc9 = p5((A, B) => {
            let {
                endpointParams: Q,
                logger: Z
            } = B, {
                parameters: D,
                rules: G
            } = A;
            B.logger?.debug?.(`${N91} Initial EndpointParams: ${yO(Q)}`);
            let F = Object.entries(D).filter(([, W]) => W.default != null).map(([W, J]) => [W, J.default]);
            if (F.length > 0)
                for (let [W, J] of F) Q[W] = Q[W] ?? J;
            let I = Object.entries(D).filter(([, W]) => W.required).map(([W]) => W);
            for (let W of I)
                if (Q[W] == null) throw new HV(`Missing required parameter: '${W}'`);
            let Y = XBA(G, {
                endpointParams: Q,
                logger: Z,
                referenceRecord: {}
            });
            return B.logger?.debug?.(`${N91} Resolved endpoint: ${yO(Y)}`), Y
        }, "resolveEndpoint")
});