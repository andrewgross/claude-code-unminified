/* chunk:428 bytes:[10229459, 10243604) size:14145 source:unpacked-cli.js */
var mwB = E((K83, uwB) => {
    var hwB = Ew0(),
        gwB = K83;
    (function() {
        function A(W) {
            return W < 10 ? "0" + W : W
        }
        var B = /[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
            Q = /[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
            Z, D, G = {
                "\b": "\\b",
                "\t": "\\t",
                "\n": "\\n",
                "\f": "\\f",
                "\r": "\\r",
                '"': "\\\"",
                "\\": "\\\\"
            },
            F;

        function I(W) {
            return Q.lastIndex = 0, Q.test(W) ? '"' + W.replace(Q, function(J) {
                var X = G[J];
                return typeof X === "string" ? X : "\\u" + ("0000" + J.charCodeAt(0).toString(16)).slice(-4)
            }) + '"' : '"' + W + '"'
        }

        function Y(W, J) {
            var X, V, C, K, H = Z,
                z, $ = J[W],
                L = $ != null && ($ instanceof hwB || hwB.isBigNumber($));
            if ($ && typeof $ === "object" && typeof $.toJSON === "function") $ = $.toJSON(W);
            if (typeof F === "function") $ = F.call(J, W, $);
            switch (typeof $) {
                case "string":
                    if (L) return $;
                    else return I($);
                case "number":
                    return isFinite($) ? String($) : "null";
                case "boolean":
                case "null":
                case "bigint":
                    return String($);
                case "object":
                    if (!$) return "null";
                    if (Z += D, z = [], Object.prototype.toString.apply($) === "[object Array]") {
                        K = $.length;
                        for (X = 0; X < K; X += 1) z[X] = Y(X, $) || "null";
                        return C = z.length === 0 ? "[]" : Z ? `[
` + Z + z.join(`,
` + Z) + `
` + H + "]" : "[" + z.join(",") + "]", Z = H, C
                    }
                    if (F && typeof F === "object") {
                        K = F.length;
                        for (X = 0; X < K; X += 1)
                            if (typeof F[X] === "string") {
                                if (V = F[X], C = Y(V, $), C) z.push(I(V) + (Z ? ": " : ":") + C)
                            }
                    } else Object.keys($).forEach(function(N) {
                        var R = Y(N, $);
                        if (R) z.push(I(N) + (Z ? ": " : ":") + R)
                    });
                    return C = z.length === 0 ? "{}" : Z ? `{
` + Z + z.join(`,
` + Z) + `
` + H + "}" : "{" + z.join(",") + "}", Z = H, C
            }
        }
        if (typeof gwB.stringify !== "function") gwB.stringify = function(W, J, X) {
            var V;
            if (Z = "", D = "", typeof X === "number")
                for (V = 0; V < X; V += 1) D += " ";
            else if (typeof X === "string") D = X;
            if (F = J, J && typeof J !== "function" && (typeof J !== "object" || typeof J.length !== "number")) throw new Error("JSON.stringify");
            return Y("", {
                "": W
            })
        }
    })()
});
var cwB = E((H83, dwB) => {
    var bx1 = null,
        D28 = /(?:_|\\u005[Ff])(?:_|\\u005[Ff])(?:p|\\u0070)(?:r|\\u0072)(?:o|\\u006[Ff])(?:t|\\u0074)(?:o|\\u006[Ff])(?:_|\\u005[Ff])(?:_|\\u005[Ff])/,
        G28 = /(?:c|\\u0063)(?:o|\\u006[Ff])(?:n|\\u006[Ee])(?:s|\\u0073)(?:t|\\u0074)(?:r|\\u0072)(?:u|\\u0075)(?:c|\\u0063)(?:t|\\u0074)(?:o|\\u006[Ff])(?:r|\\u0072)/,
        F28 = function(A) {
            var B = {
                strict: !1,
                storeAsString: !1,
                alwaysParseAsBig: !1,
                useNativeBigInt: !1,
                protoAction: "error",
                constructorAction: "error"
            };
            if (A !== void 0 && A !== null) {
                if (A.strict === !0) B.strict = !0;
                if (A.storeAsString === !0) B.storeAsString = !0;
                if (B.alwaysParseAsBig = A.alwaysParseAsBig === !0 ? A.alwaysParseAsBig : !1, B.useNativeBigInt = A.useNativeBigInt === !0 ? A.useNativeBigInt : !1, typeof A.constructorAction !== "undefined")
                    if (A.constructorAction === "error" || A.constructorAction === "ignore" || A.constructorAction === "preserve") B.constructorAction = A.constructorAction;
                    else throw new Error(`Incorrect value for constructorAction option, must be "error", "ignore" or undefined but passed ${A.constructorAction}`);
                if (typeof A.protoAction !== "undefined")
                    if (A.protoAction === "error" || A.protoAction === "ignore" || A.protoAction === "preserve") B.protoAction = A.protoAction;
                    else throw new Error(`Incorrect value for protoAction option, must be "error", "ignore" or undefined but passed ${A.protoAction}`)
            }
            var Q, Z, D = {
                    '"': '"',
                    "\\": "\\",
                    "/": "/",
                    b: "\b",
                    f: "\f",
                    n: `
`,
                    r: "\r",
                    t: "\t"
                },
                G, F = function(H) {
                    throw {
                        name: "SyntaxError",
                        message: H,
                        at: Q,
                        text: G
                    }
                },
                I = function(H) {
                    if (H && H !== Z) F("Expected '" + H + "' instead of '" + Z + "'");
                    return Z = G.charAt(Q), Q += 1, Z
                },
                Y = function() {
                    var H, z = "";
                    if (Z === "-") z = "-", I("-");
                    while (Z >= "0" && Z <= "9") z += Z, I();
                    if (Z === ".") {
                        z += ".";
                        while (I() && Z >= "0" && Z <= "9") z += Z
                    }
                    if (Z === "e" || Z === "E") {
                        if (z += Z, I(), Z === "-" || Z === "+") z += Z, I();
                        while (Z >= "0" && Z <= "9") z += Z, I()
                    }
                    if (H = +z, !isFinite(H)) F("Bad number");
                    else {
                        if (bx1 == null) bx1 = Ew0();
                        if (z.length > 15) return B.storeAsString ? z : B.useNativeBigInt ? BigInt(z) : new bx1(z);
                        else return !B.alwaysParseAsBig ? H : B.useNativeBigInt ? BigInt(H) : new bx1(H)
                    }
                },
                W = function() {
                    var H, z, $ = "",
                        L;
                    if (Z === '"') {
                        var N = Q;
                        while (I()) {
                            if (Z === '"') {
                                if (Q - 1 > N) $ += G.substring(N, Q - 1);
                                return I(), $
                            }
                            if (Z === "\\") {
                                if (Q - 1 > N) $ += G.substring(N, Q - 1);
                                if (I(), Z === "u") {
                                    L = 0;
                                    for (z = 0; z < 4; z += 1) {
                                        if (H = parseInt(I(), 16), !isFinite(H)) break;
                                        L = L * 16 + H
                                    }
                                    $ += String.fromCharCode(L)
                                } else if (typeof D[Z] === "string") $ += D[Z];
                                else break;
                                N = Q
                            }
                        }
                    }
                    F("Bad string")
                },
                J = function() {
                    while (Z && Z <= " ") I()
                },
                X = function() {
                    switch (Z) {
                        case "t":
                            return I("t"), I("r"), I("u"), I("e"), !0;
                        case "f":
                            return I("f"), I("a"), I("l"), I("s"), I("e"), !1;
                        case "n":
                            return I("n"), I("u"), I("l"), I("l"), null
                    }
                    F("Unexpected '" + Z + "'")
                },
                V, C = function() {
                    var H = [];
                    if (Z === "[") {
                        if (I("["), J(), Z === "]") return I("]"), H;
                        while (Z) {
                            if (H.push(V()), J(), Z === "]") return I("]"), H;
                            I(","), J()
                        }
                    }
                    F("Bad array")
                },
                K = function() {
                    var H, z = Object.create(null);
                    if (Z === "{") {
                        if (I("{"), J(), Z === "}") return I("}"), z;
                        while (Z) {
                            if (H = W(), J(), I(":"), B.strict === !0 && Object.hasOwnProperty.call(z, H)) F('Duplicate key "' + H + '"');
                            if (D28.test(H) === !0)
                                if (B.protoAction === "error") F("Object contains forbidden prototype property");
                                else if (B.protoAction === "ignore") V();
                            else z[H] = V();
                            else if (G28.test(H) === !0)
                                if (B.constructorAction === "error") F("Object contains forbidden constructor property");
                                else if (B.constructorAction === "ignore") V();
                            else z[H] = V();
                            else z[H] = V();
                            if (J(), Z === "}") return I("}"), z;
                            I(","), J()
                        }
                    }
                    F("Bad object")
                };
            return V = function() {
                    switch (J(), Z) {
                        case "{":
                            return K();
                        case "[":
                            return C();
                        case '"':
                            return W();
                        case "-":
                            return Y();
                        default:
                            return Z >= "0" && Z <= "9" ? Y() : X()
                    }
                },
                function(H, z) {
                    var $;
                    if (G = H + "", Q = 0, Z = " ", $ = V(), J(), Z) F("Syntax error");
                    return typeof z === "function" ? function L(N, R) {
                        var O, P, j = N[R];
                        if (j && typeof j === "object") Object.keys(j).forEach(function(f) {
                            if (P = L(j, f), P !== void 0) j[f] = P;
                            else delete j[f]
                        });
                        return z.call(N, R, j)
                    }({
                        "": $
                    }, "") : $
                }
        };
    dwB.exports = F28
});
var iwB = E((z83, fx1) => {
    var lwB = mwB().stringify,
        pwB = cwB();
    fx1.exports = function(A) {
        return {
            parse: pwB(A),
            stringify: lwB
        }
    };
    fx1.exports.parse = pwB();
    fx1.exports.stringify = lwB
});
var Uw0 = E((ewB) => {
    Object.defineProperty(ewB, "__esModule", {
        value: !0
    });
    ewB.GCE_LINUX_BIOS_PATHS = void 0;
    ewB.isGoogleCloudServerless = swB;
    ewB.isGoogleComputeEngineLinux = rwB;
    ewB.isGoogleComputeEngineMACAddress = owB;
    ewB.isGoogleComputeEngine = twB;
    ewB.detectGCPResidency = Y28;
    var nwB = W1("fs"),
        awB = W1("os");
    ewB.GCE_LINUX_BIOS_PATHS = {
        BIOS_DATE: "/sys/class/dmi/id/bios_date",
        BIOS_VENDOR: "/sys/class/dmi/id/bios_vendor"
    };
    var I28 = /^42:01/;

    function swB() {
        return !!(process.env.CLOUD_RUN_JOB || process.env.FUNCTION_NAME || process.env.K_SERVICE)
    }

    function rwB() {
        if (awB.platform() !== "linux") return !1;
        try {
            nwB.statSync(ewB.GCE_LINUX_BIOS_PATHS.BIOS_DATE);
            let A = nwB.readFileSync(ewB.GCE_LINUX_BIOS_PATHS.BIOS_VENDOR, "utf8");
            return /Google/.test(A)
        } catch (A) {
            return !1
        }
    }

    function owB() {
        let A = awB.networkInterfaces();
        for (let B of Object.values(A)) {
            if (!B) continue;
            for (let {
                    mac: Q
                }
                of B)
                if (I28.test(Q)) return !0
        }
        return !1
    }

    function twB() {
        return rwB() || owB()
    }

    function Y28() {
        return swB() || twB()
    }
});
var Q$B = E((A$B) => {
    Object.defineProperty(A$B, "__esModule", {
        value: !0
    });
    A$B.Colours = void 0;
    class c4 {
        static isEnabled(A) {
            return A.isTTY && (typeof A.getColorDepth === "function" ? A.getColorDepth() > 2 : !0)
        }
        static refresh() {
            if (c4.enabled = c4.isEnabled(process.stderr), !this.enabled) c4.reset = "", c4.bright = "", c4.dim = "", c4.red = "", c4.green = "", c4.yellow = "", c4.blue = "", c4.magenta = "", c4.cyan = "", c4.white = "", c4.grey = "";
            else c4.reset = "\x1B[0m", c4.bright = "\x1B[1m", c4.dim = "\x1B[2m", c4.red = "\x1B[31m", c4.green = "\x1B[32m", c4.yellow = "\x1B[33m", c4.blue = "\x1B[34m", c4.magenta = "\x1B[35m", c4.cyan = "\x1B[36m", c4.white = "\x1B[37m", c4.grey = "\x1B[90m"
        }
    }
    A$B.Colours = c4;
    c4.enabled = !1;
    c4.reset = "";
    c4.bright = "";
    c4.dim = "";
    c4.red = "";
    c4.green = "";
    c4.yellow = "";
    c4.blue = "";
    c4.magenta = "";
    c4.cyan = "";
    c4.white = "";
    c4.grey = "";
    c4.refresh()
});