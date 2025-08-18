/* chunk:490 bytes:[11715141, 11734349) size:19208 source:unpacked-cli.js */
var WgB = E((Sy3, YgB) => {
    var YF = j4();
    Fb();
    o01();
    Hh1();
    BA1();
    b8();
    var gh1 = YgB.exports = YF.ssh = YF.ssh || {};
    gh1.privateKeyToPutty = function(A, B, Q) {
        Q = Q || "", B = B || "";
        var Z = "ssh-rsa",
            D = B === "" ? "none" : "aes256-cbc",
            G = "PuTTY-User-Key-File-2: " + Z + `\r
`;
        G += "Encryption: " + D + `\r
`, G += "Comment: " + Q + `\r
`;
        var F = YF.util.createBuffer();
        JA1(F, Z), HR(F, A.e), HR(F, A.n);
        var I = YF.util.encode64(F.bytes(), 64),
            Y = Math.floor(I.length / 66) + 1;
        G += "Public-Lines: " + Y + `\r
`, G += I;
        var W = YF.util.createBuffer();
        HR(W, A.d), HR(W, A.p), HR(W, A.q), HR(W, A.qInv);
        var J;
        if (!B) J = YF.util.encode64(W.bytes(), 64);
        else {
            var X = W.length() + 16 - 1;
            X -= X % 16;
            var V = hh1(W.bytes());
            V.truncate(V.length() - X + W.length()), W.putBuffer(V);
            var C = YF.util.createBuffer();
            C.putBuffer(hh1("\x00\x00\x00\x00", B)), C.putBuffer(hh1("\x00\x00\x00\x01", B));
            var K = YF.aes.createEncryptionCipher(C.truncate(8), "CBC");
            K.start(YF.util.createBuffer().fillWithByte(0, 16)), K.update(W.copy()), K.finish();
            var H = K.output;
            H.truncate(16), J = YF.util.encode64(H.bytes(), 64)
        }
        Y = Math.floor(J.length / 66) + 1, G += `\r
Private-Lines: ` + Y + `\r
`, G += J;
        var z = hh1("putty-private-key-file-mac-key", B),
            $ = YF.util.createBuffer();
        JA1($, Z), JA1($, D), JA1($, Q), $.putInt32(F.length()), $.putBuffer(F), $.putInt32(W.length()), $.putBuffer(W);
        var L = YF.hmac.create();
        return L.start("sha1", z), L.update($.bytes()), G += `\r
Private-MAC: ` + L.digest().toHex() + `\r
`, G
    };
    gh1.publicKeyToOpenSSH = function(A, B) {
        var Q = "ssh-rsa";
        B = B || "";
        var Z = YF.util.createBuffer();
        return JA1(Z, Q), HR(Z, A.e), HR(Z, A.n), Q + " " + YF.util.encode64(Z.bytes()) + " " + B
    };
    gh1.privateKeyToOpenSSH = function(A, B) {
        if (!B) return YF.pki.privateKeyToPem(A);
        return YF.pki.encryptRsaPrivateKey(A, B, {
            legacy: !0,
            algorithm: "aes128"
        })
    };
    gh1.getPublicKeyFingerprint = function(A, B) {
        B = B || {};
        var Q = B.md || YF.md.md5.create(),
            Z = "ssh-rsa",
            D = YF.util.createBuffer();
        JA1(D, Z), HR(D, A.e), HR(D, A.n), Q.start(), Q.update(D.getBytes());
        var G = Q.digest();
        if (B.encoding === "hex") {
            var F = G.toHex();
            if (B.delimiter) return F.match(/.{2}/g).join(B.delimiter);
            return F
        } else if (B.encoding === "binary") return G.getBytes();
        else if (B.encoding) throw new Error('Unknown encoding "' + B.encoding + '".');
        return G
    };

    function HR(A, B) {
        var Q = B.toString(16);
        if (Q[0] >= "8") Q = "00" + Q;
        var Z = YF.util.hexToBytes(Q);
        A.putInt32(Z.length), A.putBytes(Z)
    }

    function JA1(A, B) {
        A.putInt32(B.length), A.putString(B)
    }

    function hh1() {
        var A = YF.md.sha1.create(),
            B = arguments.length;
        for (var Q = 0; Q < B; ++Q) A.update(arguments[Q]);
        return A.digest()
    }
});
var XgB = E((jy3, JgB) => {
    JgB.exports = j4();
    Fb();
    _hB();
    t$();
    Yh1();
    YI1();
    rhB();
    o01();
    AgB();
    QgB();
    DgB();
    WO0();
    wh1();
    ud();
    QO0();
    VO0();
    IgB();
    KO0();
    DO0();
    aR0();
    Oh1();
    EU();
    oR0();
    WgB();
    $O0();
    b8()
});
var ZcB = {};
bj(ZcB, {
    generateTempFilePath: () => QcB
});
import {
    join as RR8
} from "path";
import {
    tmpdir as OR8
} from "os";
import {
    randomUUID as TR8
} from "crypto";

function QcB(A = "claude-prompt", B = ".md") {
    let Q = TR8();
    return RR8(OR8(), `${A}-${Q}${B}`)
}
var mT0 = () => {};
var pI1 = E((nR8) => {
    class iT0 extends Error {
        constructor(A, B, Q) {
            super(Q);
            Error.captureStackTrace(this, this.constructor), this.name = this.constructor.name, this.code = B, this.exitCode = A, this.nestedError = void 0
        }
    }
    class ycB extends iT0 {
        constructor(A) {
            super(1, "commander.invalidArgument", A);
            Error.captureStackTrace(this, this.constructor), this.name = this.constructor.name
        }
    }
    nR8.CommanderError = iT0;
    nR8.InvalidArgumentError = ycB
});
var lg1 = E((tR8) => {
    var {
        InvalidArgumentError: rR8
    } = pI1();
    class _cB {
        constructor(A, B) {
            switch (this.description = B || "", this.variadic = !1, this.parseArg = void 0, this.defaultValue = void 0, this.defaultValueDescription = void 0, this.argChoices = void 0, A[0]) {
                case "<":
                    this.required = !0, this._name = A.slice(1, -1);
                    break;
                case "[":
                    this.required = !1, this._name = A.slice(1, -1);
                    break;
                default:
                    this.required = !0, this._name = A;
                    break
            }
            if (this._name.length > 3 && this._name.slice(-3) === "...") this.variadic = !0, this._name = this._name.slice(0, -3)
        }
        name() {
            return this._name
        }
        _concatValue(A, B) {
            if (B === this.defaultValue || !Array.isArray(B)) return [A];
            return B.concat(A)
        }
        default (A, B) {
            return this.defaultValue = A, this.defaultValueDescription = B, this
        }
        argParser(A) {
            return this.parseArg = A, this
        }
        choices(A) {
            return this.argChoices = A.slice(), this.parseArg = (B, Q) => {
                if (!this.argChoices.includes(B)) throw new rR8(`Allowed choices are ${this.argChoices.join(", ")}.`);
                if (this.variadic) return this._concatValue(B, Q);
                return B
            }, this
        }
        argRequired() {
            return this.required = !0, this
        }
        argOptional() {
            return this.required = !1, this
        }
    }

    function oR8(A) {
        let B = A.name() + (A.variadic === !0 ? "..." : "");
        return A.required ? "<" + B + ">" : "[" + B + "]"
    }
    tR8.Argument = _cB;
    tR8.humanReadableArgName = oR8
});
var nT0 = E((QO8) => {
    var {
        humanReadableArgName: BO8
    } = lg1();
    class xcB {
        constructor() {
            this.helpWidth = void 0, this.sortSubcommands = !1, this.sortOptions = !1, this.showGlobalOptions = !1
        }
        visibleCommands(A) {
            let B = A.commands.filter((Z) => !Z._hidden),
                Q = A._getHelpCommand();
            if (Q && !Q._hidden) B.push(Q);
            if (this.sortSubcommands) B.sort((Z, D) => {
                return Z.name().localeCompare(D.name())
            });
            return B
        }
        compareOptions(A, B) {
            let Q = (Z) => {
                return Z.short ? Z.short.replace(/^-/, "") : Z.long.replace(/^--/, "")
            };
            return Q(A).localeCompare(Q(B))
        }
        visibleOptions(A) {
            let B = A.options.filter((Z) => !Z.hidden),
                Q = A._getHelpOption();
            if (Q && !Q.hidden) {
                let Z = Q.short && A._findOption(Q.short),
                    D = Q.long && A._findOption(Q.long);
                if (!Z && !D) B.push(Q);
                else if (Q.long && !D) B.push(A.createOption(Q.long, Q.description));
                else if (Q.short && !Z) B.push(A.createOption(Q.short, Q.description))
            }
            if (this.sortOptions) B.sort(this.compareOptions);
            return B
        }
        visibleGlobalOptions(A) {
            if (!this.showGlobalOptions) return [];
            let B = [];
            for (let Q = A.parent; Q; Q = Q.parent) {
                let Z = Q.options.filter((D) => !D.hidden);
                B.push(...Z)
            }
            if (this.sortOptions) B.sort(this.compareOptions);
            return B
        }
        visibleArguments(A) {
            if (A._argsDescription) A.registeredArguments.forEach((B) => {
                B.description = B.description || A._argsDescription[B.name()] || ""
            });
            if (A.registeredArguments.find((B) => B.description)) return A.registeredArguments;
            return []
        }
        subcommandTerm(A) {
            let B = A.registeredArguments.map((Q) => BO8(Q)).join(" ");
            return A._name + (A._aliases[0] ? "|" + A._aliases[0] : "") + (A.options.length ? " [options]" : "") + (B ? " " + B : "")
        }
        optionTerm(A) {
            return A.flags
        }
        argumentTerm(A) {
            return A.name()
        }
        longestSubcommandTermLength(A, B) {
            return B.visibleCommands(A).reduce((Q, Z) => {
                return Math.max(Q, B.subcommandTerm(Z).length)
            }, 0)
        }
        longestOptionTermLength(A, B) {
            return B.visibleOptions(A).reduce((Q, Z) => {
                return Math.max(Q, B.optionTerm(Z).length)
            }, 0)
        }
        longestGlobalOptionTermLength(A, B) {
            return B.visibleGlobalOptions(A).reduce((Q, Z) => {
                return Math.max(Q, B.optionTerm(Z).length)
            }, 0)
        }
        longestArgumentTermLength(A, B) {
            return B.visibleArguments(A).reduce((Q, Z) => {
                return Math.max(Q, B.argumentTerm(Z).length)
            }, 0)
        }
        commandUsage(A) {
            let B = A._name;
            if (A._aliases[0]) B = B + "|" + A._aliases[0];
            let Q = "";
            for (let Z = A.parent; Z; Z = Z.parent) Q = Z.name() + " " + Q;
            return Q + B + " " + A.usage()
        }
        commandDescription(A) {
            return A.description()
        }
        subcommandDescription(A) {
            return A.summary() || A.description()
        }
        optionDescription(A) {
            let B = [];
            if (A.argChoices) B.push(`choices: ${A.argChoices.map((Q)=>JSON.stringify(Q)).join(", ")}`);
            if (A.defaultValue !== void 0) {
                if (A.required || A.optional || A.isBoolean() && typeof A.defaultValue === "boolean") B.push(`default: ${A.defaultValueDescription||JSON.stringify(A.defaultValue)}`)
            }
            if (A.presetArg !== void 0 && A.optional) B.push(`preset: ${JSON.stringify(A.presetArg)}`);
            if (A.envVar !== void 0) B.push(`env: ${A.envVar}`);
            if (B.length > 0) return `${A.description} (${B.join(", ")})`;
            return A.description
        }
        argumentDescription(A) {
            let B = [];
            if (A.argChoices) B.push(`choices: ${A.argChoices.map((Q)=>JSON.stringify(Q)).join(", ")}`);
            if (A.defaultValue !== void 0) B.push(`default: ${A.defaultValueDescription||JSON.stringify(A.defaultValue)}`);
            if (B.length > 0) {
                let Q = `(${B.join(", ")})`;
                if (A.description) return `${A.description} ${Q}`;
                return Q
            }
            return A.description
        }
        formatHelp(A, B) {
            let Q = B.padWidth(A, B),
                Z = B.helpWidth || 80,
                D = 2,
                G = 2;

            function F(C, K) {
                if (K) {
                    let H = `${C.padEnd(Q+2)}${K}`;
                    return B.wrap(H, Z - 2, Q + 2)
                }
                return C
            }

            function I(C) {
                return C.join(`
`).replace(/^/gm, " ".repeat(2))
            }
            let Y = [`Usage: ${B.commandUsage(A)}`, ""],
                W = B.commandDescription(A);
            if (W.length > 0) Y = Y.concat([B.wrap(W, Z, 0), ""]);
            let J = B.visibleArguments(A).map((C) => {
                return F(B.argumentTerm(C), B.argumentDescription(C))
            });
            if (J.length > 0) Y = Y.concat(["Arguments:", I(J), ""]);
            let X = B.visibleOptions(A).map((C) => {
                return F(B.optionTerm(C), B.optionDescription(C))
            });
            if (X.length > 0) Y = Y.concat(["Options:", I(X), ""]);
            if (this.showGlobalOptions) {
                let C = B.visibleGlobalOptions(A).map((K) => {
                    return F(B.optionTerm(K), B.optionDescription(K))
                });
                if (C.length > 0) Y = Y.concat(["Global Options:", I(C), ""])
            }
            let V = B.visibleCommands(A).map((C) => {
                return F(B.subcommandTerm(C), B.subcommandDescription(C))
            });
            if (V.length > 0) Y = Y.concat(["Commands:", I(V), ""]);
            return Y.join(`
`)
        }
        padWidth(A, B) {
            return Math.max(B.longestOptionTermLength(A, B), B.longestGlobalOptionTermLength(A, B), B.longestSubcommandTermLength(A, B), B.longestArgumentTermLength(A, B))
        }
        wrap(A, B, Q, Z = 40) {
            let G = new RegExp(`[\\n][${" \\f\\t\\v   -   　\uFEFF"}]+`);
            if (A.match(G)) return A;
            let F = B - Q;
            if (F < Z) return A;
            let I = A.slice(0, Q),
                Y = A.slice(Q).replace(`\r
`, `
`),
                W = " ".repeat(Q),
                X = `\\s${"​"}`,
                V = new RegExp(`
|.{1,${F-1}}([${X}]|$)|[^${X}]+?([${X}]|$)`, "g"),
                C = Y.match(V) || [];
            return I + C.map((K, H) => {
                if (K === `
`) return "";
                return (H > 0 ? W : "") + K.trimEnd()
            }).join(`
`)
        }
    }
    QO8.Help = xcB
});
var aT0 = E((IO8) => {
    var {
        InvalidArgumentError: DO8
    } = pI1();
    class vcB {
        constructor(A, B) {
            this.flags = A, this.description = B || "", this.required = A.includes("<"), this.optional = A.includes("["), this.variadic = /\w\.\.\.[>\]]$/.test(A), this.mandatory = !1;
            let Q = FO8(A);
            if (this.short = Q.shortFlag, this.long = Q.longFlag, this.negate = !1, this.long) this.negate = this.long.startsWith("--no-");
            this.defaultValue = void 0, this.defaultValueDescription = void 0, this.presetArg = void 0, this.envVar = void 0, this.parseArg = void 0, this.hidden = !1, this.argChoices = void 0, this.conflictsWith = [], this.implied = void 0
        }
        default (A, B) {
            return this.defaultValue = A, this.defaultValueDescription = B, this
        }
        preset(A) {
            return this.presetArg = A, this
        }
        conflicts(A) {
            return this.conflictsWith = this.conflictsWith.concat(A), this
        }
        implies(A) {
            let B = A;
            if (typeof A === "string") B = {
                [A]: !0
            };
            return this.implied = Object.assign(this.implied || {}, B), this
        }
        env(A) {
            return this.envVar = A, this
        }
        argParser(A) {
            return this.parseArg = A, this
        }
        makeOptionMandatory(A = !0) {
            return this.mandatory = !!A, this
        }
        hideHelp(A = !0) {
            return this.hidden = !!A, this
        }
        _concatValue(A, B) {
            if (B === this.defaultValue || !Array.isArray(B)) return [A];
            return B.concat(A)
        }
        choices(A) {
            return this.argChoices = A.slice(), this.parseArg = (B, Q) => {
                if (!this.argChoices.includes(B)) throw new DO8(`Allowed choices are ${this.argChoices.join(", ")}.`);
                if (this.variadic) return this._concatValue(B, Q);
                return B
            }, this
        }
        name() {
            if (this.long) return this.long.replace(/^--/, "");
            return this.short.replace(/^-/, "")
        }
        attributeName() {
            return GO8(this.name().replace(/^no-/, ""))
        }
        is(A) {
            return this.short === A || this.long === A
        }
        isBoolean() {
            return !this.required && !this.optional && !this.negate
        }
    }
    class bcB {
        constructor(A) {
            this.positiveOptions = new Map, this.negativeOptions = new Map, this.dualOptions = new Set, A.forEach((B) => {
                if (B.negate) this.negativeOptions.set(B.attributeName(), B);
                else this.positiveOptions.set(B.attributeName(), B)
            }), this.negativeOptions.forEach((B, Q) => {
                if (this.positiveOptions.has(Q)) this.dualOptions.add(Q)
            })
        }
        valueFromOption(A, B) {
            let Q = B.attributeName();
            if (!this.dualOptions.has(Q)) return !0;
            let Z = this.negativeOptions.get(Q).presetArg,
                D = Z !== void 0 ? Z : !1;
            return B.negate === (D === A)
        }
    }

    function GO8(A) {
        return A.split("-").reduce((B, Q) => {
            return B + Q[0].toUpperCase() + Q.slice(1)
        })
    }

    function FO8(A) {
        let B, Q, Z = A.split(/[ |,]+/);
        if (Z.length > 1 && !/^[[<]/.test(Z[1])) B = Z.shift();
        if (Q = Z.shift(), !B && /^-[^-]$/.test(Q)) B = Q, Q = void 0;
        return {
            shortFlag: B,
            longFlag: Q
        }
    }
    IO8.Option = vcB;
    IO8.DualOptions = bcB
});
var fcB = E((VO8) => {
    function JO8(A, B) {
        if (Math.abs(A.length - B.length) > 3) return Math.max(A.length, B.length);
        let Q = [];
        for (let Z = 0; Z <= A.length; Z++) Q[Z] = [Z];
        for (let Z = 0; Z <= B.length; Z++) Q[0][Z] = Z;
        for (let Z = 1; Z <= B.length; Z++)
            for (let D = 1; D <= A.length; D++) {
                let G = 1;
                if (A[D - 1] === B[Z - 1]) G = 0;
                else G = 1;
                if (Q[D][Z] = Math.min(Q[D - 1][Z] + 1, Q[D][Z - 1] + 1, Q[D - 1][Z - 1] + G), D > 1 && Z > 1 && A[D - 1] === B[Z - 2] && A[D - 2] === B[Z - 1]) Q[D][Z] = Math.min(Q[D][Z], Q[D - 2][Z - 2] + 1)
            }
        return Q[A.length][B.length]
    }

    function XO8(A, B) {
        if (!B || B.length === 0) return "";
        B = Array.from(new Set(B));
        let Q = A.startsWith("--");
        if (Q) A = A.slice(2), B = B.map((F) => F.slice(2));
        let Z = [],
            D = 3,
            G = 0.4;
        if (B.forEach((F) => {
                if (F.length <= 1) return;
                let I = JO8(A, F),
                    Y = Math.max(A.length, F.length);
                if ((Y - I) / Y > G) {
                    if (I < D) D = I, Z = [F];
                    else if (I === D) Z.push(F)
                }
            }), Z.sort((F, I) => F.localeCompare(I)), Q) Z = Z.map((F) => `--${F}`);
        if (Z.length > 1) return `
(Did you mean one of ${Z.join(", ")}?)`;
        if (Z.length === 1) return `
(Did you mean ${Z[0]}?)`;
        return ""
    }
    VO8.suggestSimilar = XO8
});