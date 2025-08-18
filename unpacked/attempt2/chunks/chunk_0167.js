/* chunk:167 bytes:[3631949, 3649603) size:17654 source:unpacked-cli.js */
var VQ0 = E((JK) => {
    var __dirname = "/home/runner/code/tmp/claude-cli-external-build-2232/node_modules/spawn-rx/lib/src",
        xz = JK && JK.__assign || function() {
            return xz = Object.assign || function(A) {
                for (var B, Q = 1, Z = arguments.length; Q < Z; Q++) {
                    B = arguments[Q];
                    for (var D in B)
                        if (Object.prototype.hasOwnProperty.call(B, D)) A[D] = B[D]
                }
                return A
            }, xz.apply(this, arguments)
        },
        r94 = JK && JK.__rest || function(A, B) {
            var Q = {};
            for (var Z in A)
                if (Object.prototype.hasOwnProperty.call(A, Z) && B.indexOf(Z) < 0) Q[Z] = A[Z];
            if (A != null && typeof Object.getOwnPropertySymbols === "function") {
                for (var D = 0, Z = Object.getOwnPropertySymbols(A); D < Z.length; D++)
                    if (B.indexOf(Z[D]) < 0 && Object.prototype.propertyIsEnumerable.call(A, Z[D])) Q[Z[D]] = A[Z[D]]
            }
            return Q
        },
        o94 = JK && JK.__spreadArray || function(A, B, Q) {
            if (Q || arguments.length === 2) {
                for (var Z = 0, D = B.length, G; Z < D; Z++)
                    if (G || !(Z in B)) {
                        if (!G) G = Array.prototype.slice.call(B, 0, Z);
                        G[Z] = B[Z]
                    }
            }
            return A.concat(G || Array.prototype.slice.call(B))
        };
    Object.defineProperty(JK, "__esModule", {
        value: !0
    });
    JK.findActualExecutable = _$1;
    JK.spawnDetached = XQ0;
    JK.spawn = w61;
    JK.spawnDetachedPromise = BQ4;
    JK.spawnPromise = QQ4;
    var E61 = W1("path"),
        t94 = W1("net"),
        U61 = W1("fs"),
        dy = DlA(),
        XlA = JlA(),
        e94 = W1("child_process"),
        AQ4 = mB1(),
        KlA = process.platform === "win32",
        Bs = AQ4.default("spawn-rx");

    function VlA(A) {
        try {
            return U61.statSync(A)
        } catch (B) {
            return null
        }
    }

    function ClA(A) {
        if (A.match(/[\\/]/)) return Bs("Path has slash in directory, bailing"), A;
        var B = E61.join(".", A);
        if (VlA(B)) return Bs("Found executable in currect directory: ".concat(B)), U61.realpathSync(B);
        var Q = process.env.PATH.split(KlA ? ";" : ":");
        for (var Z = 0, D = Q; Z < D.length; Z++) {
            var G = D[Z],
                F = E61.join(G, A);
            if (VlA(F)) return U61.realpathSync(F)
        }
        return Bs("Failed to find executable anywhere in path"), A
    }

    function _$1(A, B) {
        if (process.platform !== "win32") return {
            cmd: ClA(A),
            args: B
        };
        if (!U61.existsSync(A)) {
            var Q = [".exe", ".bat", ".cmd", ".ps1"];
            for (var Z = 0, D = Q; Z < D.length; Z++) {
                var G = D[Z],
                    F = ClA("".concat(A).concat(G));
                if (U61.existsSync(F)) return _$1(F, B)
            }
        }
        if (A.match(/\.ps1$/i)) {
            var I = E61.join(process.env.SYSTEMROOT, "System32", "WindowsPowerShell", "v1.0", "PowerShell.exe"),
                Y = ["-ExecutionPolicy", "Unrestricted", "-NoLogo", "-NonInteractive", "-File", A];
            return {
                cmd: I,
                args: Y.concat(B)
            }
        }
        if (A.match(/\.(bat|cmd)$/i)) {
            var I = E61.join(process.env.SYSTEMROOT, "System32", "cmd.exe"),
                W = o94(["/C", A], B, !0);
            return {
                cmd: I,
                args: W
            }
        }
        if (A.match(/\.(js)$/i)) {
            var I = process.execPath,
                J = [A];
            return {
                cmd: I,
                args: J.concat(B)
            }
        }
        return {
            cmd: A,
            args: B
        }
    }

    function XQ0(A, B, Q) {
        var Z = _$1(A, B !== null && B !== void 0 ? B : []),
            D = Z.cmd,
            G = Z.args;
        if (!KlA) return w61(D, G, Object.assign({}, Q || {}, {
            detached: !0
        }));
        var F = [D].concat(G),
            I = E61.join(__dirname, "..", "..", "vendor", "jobber", "Jobber.exe"),
            Y = xz(xz({}, Q !== null && Q !== void 0 ? Q : {}), {
                detached: !0,
                jobber: !0
            });
        return Bs("spawnDetached: ".concat(I, ", ").concat(F)), w61(I, F, Y)
    }

    function w61(A, B, Q) {
        Q = Q !== null && Q !== void 0 ? Q : {};
        var Z = new dy.Observable(function(D) {
            var {
                stdin: G,
                jobber: F,
                split: I,
                encoding: Y
            } = Q, W = r94(Q, ["stdin", "jobber", "split", "encoding"]), J = _$1(A, B), X = J.cmd, V = J.args;
            Bs("spawning process: ".concat(X, " ").concat(V.join(), ", ").concat(JSON.stringify(W)));
            var C = e94.spawn(X, V, W),
                K = function(N) {
                    return function(R) {
                        if (R.length < 1) return;
                        if (Q.echoOutput)(N === "stdout" ? process.stdout : process.stderr).write(R);
                        var O = "<< String sent back was too long >>";
                        try {
                            if (typeof R === "string") O = R.toString();
                            else O = R.toString(Y || "utf8")
                        } catch (P) {
                            O = "<< Lost chunk of process output for ".concat(A, " - length was ").concat(R.length, ">>")
                        }
                        D.next({
                            source: N,
                            text: O
                        })
                    }
                },
                H = new dy.Subscription;
            if (Q.stdin)
                if (C.stdin) H.add(Q.stdin.subscribe({
                    next: function(N) {
                        return C.stdin.write(N)
                    },
                    error: D.error.bind(D),
                    complete: function() {
                        return C.stdin.end()
                    }
                }));
                else D.error(new Error("opts.stdio conflicts with provided spawn opts.stdin observable, 'pipe' is required"));
            var z = null,
                $ = null,
                L = !1;
            if (C.stdout) $ = new dy.AsyncSubject, C.stdout.on("data", K("stdout")), C.stdout.on("close", function() {
                $.next(!0), $.complete()
            });
            else $ = dy.of(!0);
            if (C.stderr) z = new dy.AsyncSubject, C.stderr.on("data", K("stderr")), C.stderr.on("close", function() {
                z.next(!0), z.complete()
            });
            else z = dy.of(!0);
            return C.on("error", function(N) {
                L = !0, D.error(N)
            }), C.on("close", function(N) {
                L = !0;
                var R = dy.merge($, z).pipe(XlA.reduce(function(O) {
                    return O
                }, !0));
                if (N === 0) R.subscribe(function() {
                    return D.complete()
                });
                else R.subscribe(function() {
                    var O = new Error("Failed with exit code: ".concat(N));
                    O.exitCode = N, O.code = N, D.error(O)
                })
            }), H.add(new dy.Subscription(function() {
                if (L) return;
                if (Bs("Killing process: ".concat(X, " ").concat(V.join())), Q.jobber) t94.connect("\\\\.\\pipe\\jobber-".concat(C.pid)), setTimeout(function() {
                    return C.kill()
                }, 5000);
                else C.kill()
            })), H
        });
        return Q.split ? Z : Z.pipe(XlA.map(function(D) {
            return D === null || D === void 0 ? void 0 : D.text
        }))
    }

    function HlA(A) {
        return new Promise(function(B, Q) {
            var Z = "";
            A.subscribe({
                next: function(D) {
                    return Z += D
                },
                error: function(D) {
                    var G = new Error("".concat(Z, `
`).concat(D.message));
                    if ("exitCode" in D) G.exitCode = D.exitCode, G.code = D.exitCode;
                    Q(G)
                },
                complete: function() {
                    return B(Z)
                }
            })
        })
    }

    function zlA(A) {
        return new Promise(function(B, Q) {
            var Z = "",
                D = "";
            A.subscribe({
                next: function(G) {
                    return G.source === "stdout" ? Z += G.text : D += G.text
                },
                error: function(G) {
                    var F = new Error("".concat(Z, `
`).concat(G.message));
                    if ("exitCode" in G) F.exitCode = G.exitCode, F.code = G.exitCode, F.stdout = Z, F.stderr = D;
                    Q(F)
                },
                complete: function() {
                    return B([Z, D])
                }
            })
        })
    }

    function BQ4(A, B, Q) {
        if (Q === null || Q === void 0 ? void 0 : Q.split) return zlA(XQ0(A, B, xz(xz({}, Q !== null && Q !== void 0 ? Q : {}), {
            split: !0
        })));
        else return HlA(XQ0(A, B, xz(xz({}, Q !== null && Q !== void 0 ? Q : {}), {
            split: !1
        })))
    }

    function QQ4(A, B, Q) {
        if (Q === null || Q === void 0 ? void 0 : Q.split) return zlA(w61(A, B, xz(xz({}, Q !== null && Q !== void 0 ? Q : {}), {
            split: !0
        })));
        else return HlA(w61(A, B, xz(xz({}, Q !== null && Q !== void 0 ? Q : {}), {
            split: !1
        })))
    }
});
var q61 = E((KY5, h$1) => {
    function NlA(A) {
        return Array.isArray(A) ? A : [A]
    }
    var WQ4 = void 0,
        HQ0 = "",
        $lA = " ",
        KQ0 = "\\",
        JQ4 = /^\s+$/,
        XQ4 = /(?:[^\\]|^)\\$/,
        VQ4 = /^\\!/,
        CQ4 = /^\\#/,
        KQ4 = /\r?\n/g,
        HQ4 = /^\.{0,2}\/|^\.{1,2}$/,
        zQ4 = /\/$/,
        Zs = "/",
        LlA = "node-ignore";
    if (typeof Symbol !== "undefined") LlA = Symbol.for("node-ignore");
    var MlA = LlA,
        Ds = (A, B, Q) => {
            return Object.defineProperty(A, B, {
                value: Q
            }), Q
        },
        EQ4 = /([0-z])-([0-z])/g,
        RlA = () => !1,
        UQ4 = (A) => A.replace(EQ4, (B, Q, Z) => Q.charCodeAt(0) <= Z.charCodeAt(0) ? B : HQ0),
        wQ4 = (A) => {
            let {
                length: B
            } = A;
            return A.slice(0, B - B % 2)
        },
        $Q4 = [
            [/^\uFEFF/, () => HQ0],
            [/((?:\\\\)*?)(\\?\s+)$/, (A, B, Q) => B + (Q.indexOf("\\") === 0 ? $lA : HQ0)],
            [/(\\+?)\s/g, (A, B) => {
                let {
                    length: Q
                } = B;
                return B.slice(0, Q - Q % 2) + $lA
            }],
            [/[\\$.|*+(){^]/g, (A) => `\\${A}`],
            [/(?!\\)\?/g, () => "[^/]"],
            [/^\//, () => "^"],
            [/\//g, () => "\\/"],
            [/^\^*\\\*\\\*\\\//, () => "^(?:.*\\/)?"],
            [/^(?=[^^])/, function A() {
                return !/\/(?!$)/.test(this) ? "(?:^|\\/)" : "^"
            }],
            [/\\\/\\\*\\\*(?=\\\/|$)/g, (A, B, Q) => B + 6 < Q.length ? "(?:\\/[^\\/]+)*" : "\\/.+"],
            [/(^|[^\\]+)(\\\*)+(?=.+)/g, (A, B, Q) => {
                let Z = Q.replace(/\\\*/g, "[^\\/]*");
                return B + Z
            }],
            [/\\\\\\(?=[$.|*+(){^])/g, () => KQ0],
            [/\\\\/g, () => KQ0],
            [/(\\)?\[([^\]/]*?)(\\*)($|\])/g, (A, B, Q, Z, D) => B === KQ0 ? `\\[${Q}${wQ4(Z)}${D}` : D === "]" ? Z.length % 2 === 0 ? `[${UQ4(Q)}${Z}]` : "[]" : "[]"],
            [/(?:[^*])$/, (A) => /\/$/.test(A) ? `${A}$` : `${A}(?=$|\\/$)`]
        ],
        qQ4 = /(^|\\\/)?\\\*$/,
        $61 = "regex",
        b$1 = "checkRegex",
        qlA = "_",
        NQ4 = {
            [$61](A, B) {
                return `${B?`${B}[^/]+`:"[^/]*"}(?=$|\\/$)`
            },
            [b$1](A, B) {
                return `${B?`${B}[^/]*`:"[^/]*"}(?=$|\\/$)`
            }
        },
        LQ4 = (A) => $Q4.reduce((B, [Q, Z]) => B.replace(Q, Z.bind(A)), A),
        f$1 = (A) => typeof A === "string",
        MQ4 = (A) => A && f$1(A) && !JQ4.test(A) && !XQ4.test(A) && A.indexOf("#") !== 0,
        RQ4 = (A) => A.split(KQ4).filter(Boolean);
    class OlA {
        constructor(A, B, Q, Z, D, G) {
            this.pattern = A, this.mark = B, this.negative = D, Ds(this, "body", Q), Ds(this, "ignoreCase", Z), Ds(this, "regexPrefix", G)
        }
        get regex() {
            let A = qlA + $61;
            if (this[A]) return this[A];
            return this._make($61, A)
        }
        get checkRegex() {
            let A = qlA + b$1;
            if (this[A]) return this[A];
            return this._make(b$1, A)
        }
        _make(A, B) {
            let Q = this.regexPrefix.replace(qQ4, NQ4[A]),
                Z = this.ignoreCase ? new RegExp(Q, "i") : new RegExp(Q);
            return Ds(this, B, Z)
        }
    }
    var OQ4 = ({
        pattern: A,
        mark: B
    }, Q) => {
        let Z = !1,
            D = A;
        if (D.indexOf("!") === 0) Z = !0, D = D.substr(1);
        D = D.replace(VQ4, "!").replace(CQ4, "#");
        let G = LQ4(D);
        return new OlA(A, B, D, Q, Z, G)
    };
    class TlA {
        constructor(A) {
            this._ignoreCase = A, this._rules = []
        }
        _add(A) {
            if (A && A[MlA]) {
                this._rules = this._rules.concat(A._rules._rules), this._added = !0;
                return
            }
            if (f$1(A)) A = {
                pattern: A
            };
            if (MQ4(A.pattern)) {
                let B = OQ4(A, this._ignoreCase);
                this._added = !0, this._rules.push(B)
            }
        }
        add(A) {
            return this._added = !1, NlA(f$1(A) ? RQ4(A) : A).forEach(this._add, this), this._added
        }
        test(A, B, Q) {
            let Z = !1,
                D = !1,
                G;
            this._rules.forEach((I) => {
                let {
                    negative: Y
                } = I;
                if (D === Y && Z !== D || Y && !Z && !D && !B) return;
                if (!I[Q].test(A)) return;
                Z = !Y, D = Y, G = Y ? WQ4 : I
            });
            let F = {
                ignored: Z,
                unignored: D
            };
            if (G) F.rule = G;
            return F
        }
    }
    var TQ4 = (A, B) => {
            throw new B(A)
        },
        UT = (A, B, Q) => {
            if (!f$1(A)) return Q(`path must be a string, but got \`${B}\``, TypeError);
            if (!A) return Q("path must not be empty", TypeError);
            if (UT.isNotRelative(A)) return Q(`path should be a \`path.relative()\`d string, but got "${B}"`, RangeError);
            return !0
        },
        PlA = (A) => HQ4.test(A);
    UT.isNotRelative = PlA;
    UT.convert = (A) => A;
    class SlA {
        constructor({
            ignorecase: A = !0,
            ignoreCase: B = A,
            allowRelativePaths: Q = !1
        } = {}) {
            Ds(this, MlA, !0), this._rules = new TlA(B), this._strictPathCheck = !Q, this._initCache()
        }
        _initCache() {
            this._ignoreCache = Object.create(null), this._testCache = Object.create(null)
        }
        add(A) {
            if (this._rules.add(A)) this._initCache();
            return this
        }
        addPattern(A) {
            return this.add(A)
        }
        _test(A, B, Q, Z) {
            let D = A && UT.convert(A);
            return UT(D, A, this._strictPathCheck ? TQ4 : RlA), this._t(D, B, Q, Z)
        }
        checkIgnore(A) {
            if (!zQ4.test(A)) return this.test(A);
            let B = A.split(Zs).filter(Boolean);
            if (B.pop(), B.length) {
                let Q = this._t(B.join(Zs) + Zs, this._testCache, !0, B);
                if (Q.ignored) return Q
            }
            return this._rules.test(A, !1, b$1)
        }
        _t(A, B, Q, Z) {
            if (A in B) return B[A];
            if (!Z) Z = A.split(Zs).filter(Boolean);
            if (Z.pop(), !Z.length) return B[A] = this._rules.test(A, Q, $61);
            let D = this._t(Z.join(Zs) + Zs, B, Q, Z);
            return B[A] = D.ignored ? D : this._rules.test(A, Q, $61)
        }
        ignores(A) {
            return this._test(A, this._ignoreCache, !1).ignored
        }
        createFilter() {
            return (A) => !this.ignores(A)
        }
        filter(A) {
            return NlA(A).filter(this.createFilter())
        }
        test(A) {
            return this._test(A, this._testCache, !0)
        }
    }
    var zQ0 = (A) => new SlA(A),
        PQ4 = (A) => UT(A && UT.convert(A), A, RlA),
        jlA = () => {
            let A = (Q) => /^\\\\\?\\/.test(Q) || /["<>|\u0000-\u001F]+/u.test(Q) ? Q : Q.replace(/\\/g, "/");
            UT.convert = A;
            let B = /^[a-z]:\//i;
            UT.isNotRelative = (Q) => B.test(Q) || PlA(Q)
        };
    if (typeof process !== "undefined" && process.platform === "win32") jlA();
    h$1.exports = zQ0;
    zQ0.default = zQ0;
    h$1.exports.isPathValid = PQ4;
    Ds(h$1.exports, Symbol.for("setupWindows"), jlA)
});