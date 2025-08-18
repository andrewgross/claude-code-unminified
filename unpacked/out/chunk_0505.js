/* chunk:505 bytes:[12024927, 12043818) size:18891 source:unpacked-cli.js */
var Uy = __A.homedir(),
    w20 = __A.tmpdir(),
    {
        env: za
    } = U20,
    vhQ = (A) => {
        let B = cZ.join(Uy, "Library");
        return {
            data: cZ.join(B, "Application Support", A),
            config: cZ.join(B, "Preferences", A),
            cache: cZ.join(B, "Caches", A),
            log: cZ.join(B, "Logs", A),
            temp: cZ.join(w20, A)
        }
    },
    bhQ = (A) => {
        let B = za.APPDATA || cZ.join(Uy, "AppData", "Roaming"),
            Q = za.LOCALAPPDATA || cZ.join(Uy, "AppData", "Local");
        return {
            data: cZ.join(Q, A, "Data"),
            config: cZ.join(B, A, "Config"),
            cache: cZ.join(Q, A, "Cache"),
            log: cZ.join(Q, A, "Log"),
            temp: cZ.join(w20, A)
        }
    },
    fhQ = (A) => {
        let B = cZ.basename(Uy);
        return {
            data: cZ.join(za.XDG_DATA_HOME || cZ.join(Uy, ".local", "share"), A),
            config: cZ.join(za.XDG_CONFIG_HOME || cZ.join(Uy, ".config"), A),
            cache: cZ.join(za.XDG_CACHE_HOME || cZ.join(Uy, ".cache"), A),
            log: cZ.join(za.XDG_STATE_HOME || cZ.join(Uy, ".local", "state"), A),
            temp: cZ.join(w20, B, A)
        }
    };

function $20(A, {
    suffix: B = "nodejs"
} = {}) {
    if (typeof A !== "string") throw new TypeError(`Expected a string, got ${typeof A}`);
    if (B) A += `-${B}`;
    if (U20.platform === "darwin") return vhQ(A);
    if (U20.platform === "win32") return bhQ(A);
    return fhQ(A)
}
var AxA = G1(i_A(), 1);
var i41 = (A) => {
    if (typeof A !== "string") throw new TypeError("invalid pattern");
    if (A.length > 65536) throw new TypeError("pattern is too long")
};
var phQ = {
        "[:alnum:]": ["\\p{L}\\p{Nl}\\p{Nd}", !0],
        "[:alpha:]": ["\\p{L}\\p{Nl}", !0],
        "[:ascii:]": ["\\x00-\\x7f", !1],
        "[:blank:]": ["\\p{Zs}\\t", !0],
        "[:cntrl:]": ["\\p{Cc}", !0],
        "[:digit:]": ["\\p{Nd}", !0],
        "[:graph:]": ["\\p{Z}\\p{C}", !0, !0],
        "[:lower:]": ["\\p{Ll}", !0],
        "[:print:]": ["\\p{C}", !0],
        "[:punct:]": ["\\p{P}", !0],
        "[:space:]": ["\\p{Z}\\t\\r\\n\\v\\f", !0],
        "[:upper:]": ["\\p{Lu}", !0],
        "[:word:]": ["\\p{L}\\p{Nl}\\p{Nd}\\p{Pc}", !0],
        "[:xdigit:]": ["A-Fa-f0-9", !1]
    },
    n41 = (A) => A.replace(/[[\]\\-]/g, "\\$&"),
    ihQ = (A) => A.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&"),
    n_A = (A) => A.join(""),
    a_A = (A, B) => {
        let Q = B;
        if (A.charAt(Q) !== "[") throw new Error("not in a brace expression");
        let Z = [],
            D = [],
            G = Q + 1,
            F = !1,
            I = !1,
            Y = !1,
            W = !1,
            J = Q,
            X = "";
        A: while (G < A.length) {
            let H = A.charAt(G);
            if ((H === "!" || H === "^") && G === Q + 1) {
                W = !0, G++;
                continue
            }
            if (H === "]" && F && !Y) {
                J = G + 1;
                break
            }
            if (F = !0, H === "\\") {
                if (!Y) {
                    Y = !0, G++;
                    continue
                }
            }
            if (H === "[" && !Y) {
                for (let [z, [$, L, N]] of Object.entries(phQ))
                    if (A.startsWith(z, G)) {
                        if (X) return ["$.", !1, A.length - Q, !0];
                        if (G += z.length, N) D.push($);
                        else Z.push($);
                        I = I || L;
                        continue A
                    }
            }
            if (Y = !1, X) {
                if (H > X) Z.push(n41(X) + "-" + n41(H));
                else if (H === X) Z.push(n41(H));
                X = "", G++;
                continue
            }
            if (A.startsWith("-]", G + 1)) {
                Z.push(n41(H + "-")), G += 2;
                continue
            }
            if (A.startsWith("-", G + 1)) {
                X = H, G += 2;
                continue
            }
            Z.push(n41(H)), G++
        }
        if (J < G) return ["", !1, 0, !1];
        if (!Z.length && !D.length) return ["$.", !1, A.length - Q, !0];
        if (D.length === 0 && Z.length === 1 && /^\\?.$/.test(Z[0]) && !W) {
            let H = Z[0].length === 2 ? Z[0].slice(-1) : Z[0];
            return [ihQ(H), !1, J - Q, !1]
        }
        let V = "[" + (W ? "^" : "") + n_A(Z) + "]",
            C = "[" + (W ? "" : "^") + n_A(D) + "]";
        return [Z.length && D.length ? "(" + V + "|" + C + ")" : Z.length ? V : C, I, J - Q, !0]
    };
var _w = (A, {
    windowsPathsNoEscape: B = !1
} = {}) => {
    return B ? A.replace(/\[([^\/\\])\]/g, "$1") : A.replace(/((?!\\).|^)\[([^\/\\])\]/g, "$1$2").replace(/\\([^\/])/g, "$1")
};
var nhQ = new Set(["!", "?", "+", "*", "@"]),
    s_A = (A) => nhQ.has(A),
    ahQ = "(?!(?:^|/)\\.\\.?(?:$|/))",
    hw1 = "(?!\\.)",
    shQ = new Set(["[", "."]),
    rhQ = new Set(["..", "."]),
    ohQ = new Set("().*{}+?[]^$\\!"),
    thQ = (A) => A.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&"),
    L20 = "[^/]",
    r_A = L20 + "*?",
    o_A = L20 + "+?";
class RY {
    type;
    #A;
    #B;
    #Q = !1;
    #Z = [];
    #D;
    #Y;
    #G;
    #J = !1;
    #W;
    #X;
    #I = !1;
    constructor(A, B, Q = {}) {
        if (this.type = A, A) this.#B = !0;
        if (this.#D = B, this.#A = this.#D ? this.#D.#A : this, this.#W = this.#A === this ? Q : this.#A.#W, this.#G = this.#A === this ? [] : this.#A.#G, A === "!" && !this.#A.#J) this.#G.push(this);
        this.#Y = this.#D ? this.#D.#Z.length : 0
    }
    get hasMagic() {
        if (this.#B !== void 0) return this.#B;
        for (let A of this.#Z) {
            if (typeof A === "string") continue;
            if (A.type || A.hasMagic) return this.#B = !0
        }
        return this.#B
    }
    toString() {
        if (this.#X !== void 0) return this.#X;
        if (!this.type) return this.#X = this.#Z.map((A) => String(A)).join("");
        else return this.#X = this.type + "(" + this.#Z.map((A) => String(A)).join("|") + ")"
    }
    #E() {
        if (this !== this.#A) throw new Error("should only call on root");
        if (this.#J) return this;
        this.toString(), this.#J = !0;
        let A;
        while (A = this.#G.pop()) {
            if (A.type !== "!") continue;
            let B = A,
                Q = B.#D;
            while (Q) {
                for (let Z = B.#Y + 1; !Q.type && Z < Q.#Z.length; Z++)
                    for (let D of A.#Z) {
                        if (typeof D === "string") throw new Error("string part in extglob AST??");
                        D.copyIn(Q.#Z[Z])
                    }
                B = Q, Q = B.#D
            }
        }
        return this
    }
    push(...A) {
        for (let B of A) {
            if (B === "") continue;
            if (typeof B !== "string" && !(B instanceof RY && B.#D === this)) throw new Error("invalid part: " + B);
            this.#Z.push(B)
        }
    }
    toJSON() {
        let A = this.type === null ? this.#Z.slice().map((B) => typeof B === "string" ? B : B.toJSON()) : [this.type, ...this.#Z.map((B) => B.toJSON())];
        if (this.isStart() && !this.type) A.unshift([]);
        if (this.isEnd() && (this === this.#A || this.#A.#J && this.#D?.type === "!")) A.push({});
        return A
    }
    isStart() {
        if (this.#A === this) return !0;
        if (!this.#D?.isStart()) return !1;
        if (this.#Y === 0) return !0;
        let A = this.#D;
        for (let B = 0; B < this.#Y; B++) {
            let Q = A.#Z[B];
            if (!(Q instanceof RY && Q.type === "!")) return !1
        }
        return !0
    }
    isEnd() {
        if (this.#A === this) return !0;
        if (this.#D?.type === "!") return !0;
        if (!this.#D?.isEnd()) return !1;
        if (!this.type) return this.#D?.isEnd();
        let A = this.#D ? this.#D.#Z.length : 0;
        return this.#Y === A - 1
    }
    copyIn(A) {
        if (typeof A === "string") this.push(A);
        else this.push(A.clone(this))
    }
    clone(A) {
        let B = new RY(this.type, A);
        for (let Q of this.#Z) B.copyIn(Q);
        return B
    }
    static #U(A, B, Q, Z) {
        let D = !1,
            G = !1,
            F = -1,
            I = !1;
        if (B.type === null) {
            let V = Q,
                C = "";
            while (V < A.length) {
                let K = A.charAt(V++);
                if (D || K === "\\") {
                    D = !D, C += K;
                    continue
                }
                if (G) {
                    if (V === F + 1) {
                        if (K === "^" || K === "!") I = !0
                    } else if (K === "]" && !(V === F + 2 && I)) G = !1;
                    C += K;
                    continue
                } else if (K === "[") {
                    G = !0, F = V, I = !1, C += K;
                    continue
                }
                if (!Z.noext && s_A(K) && A.charAt(V) === "(") {
                    B.push(C), C = "";
                    let H = new RY(K, B);
                    V = RY.#U(A, H, V, Z), B.push(H);
                    continue
                }
                C += K
            }
            return B.push(C), V
        }
        let Y = Q + 1,
            W = new RY(null, B),
            J = [],
            X = "";
        while (Y < A.length) {
            let V = A.charAt(Y++);
            if (D || V === "\\") {
                D = !D, X += V;
                continue
            }
            if (G) {
                if (Y === F + 1) {
                    if (V === "^" || V === "!") I = !0
                } else if (V === "]" && !(Y === F + 2 && I)) G = !1;
                X += V;
                continue
            } else if (V === "[") {
                G = !0, F = Y, I = !1, X += V;
                continue
            }
            if (s_A(V) && A.charAt(Y) === "(") {
                W.push(X), X = "";
                let C = new RY(V, W);
                W.push(C), Y = RY.#U(A, C, Y, Z);
                continue
            }
            if (V === "|") {
                W.push(X), X = "", J.push(W), W = new RY(null, B);
                continue
            }
            if (V === ")") {
                if (X === "" && B.#Z.length === 0) B.#I = !0;
                return W.push(X), X = "", B.push(...J, W), Y
            }
            X += V
        }
        return B.type = null, B.#B = void 0, B.#Z = [A.substring(Q - 1)], Y
    }
    static fromGlob(A, B = {}) {
        let Q = new RY(null, void 0, B);
        return RY.#U(A, Q, 0, B), Q
    }
    toMMPattern() {
        if (this !== this.#A) return this.#A.toMMPattern();
        let A = this.toString(),
            [B, Q, Z, D] = this.toRegExpSource();
        if (!(Z || this.#B || this.#W.nocase && !this.#W.nocaseMagicOnly && A.toUpperCase() !== A.toLowerCase())) return Q;
        let F = (this.#W.nocase ? "i" : "") + (D ? "u" : "");
        return Object.assign(new RegExp(`^${B}$`, F), {
            _src: B,
            _glob: A
        })
    }
    get options() {
        return this.#W
    }
    toRegExpSource(A) {
        let B = A ?? !!this.#W.dot;
        if (this.#A === this) this.#E();
        if (!this.type) {
            let I = this.isStart() && this.isEnd(),
                Y = this.#Z.map((V) => {
                    let [C, K, H, z] = typeof V === "string" ? RY.#C(V, this.#B, I) : V.toRegExpSource(A);
                    return this.#B = this.#B || H, this.#Q = this.#Q || z, C
                }).join(""),
                W = "";
            if (this.isStart()) {
                if (typeof this.#Z[0] === "string") {
                    if (!(this.#Z.length === 1 && rhQ.has(this.#Z[0]))) {
                        let C = shQ,
                            K = B && C.has(Y.charAt(0)) || Y.startsWith("\\.") && C.has(Y.charAt(2)) || Y.startsWith("\\.\\.") && C.has(Y.charAt(4)),
                            H = !B && !A && C.has(Y.charAt(0));
                        W = K ? ahQ : H ? hw1 : ""
                    }
                }
            }
            let J = "";
            if (this.isEnd() && this.#A.#J && this.#D?.type === "!") J = "(?:$|\\/)";
            return [W + Y + J, _w(Y), this.#B = !!this.#B, this.#Q]
        }
        let Q = this.type === "*" || this.type === "+",
            Z = this.type === "!" ? "(?:(?!(?:" : "(?:",
            D = this.#K(B);
        if (this.isStart() && this.isEnd() && !D && this.type !== "!") {
            let I = this.toString();
            return this.#Z = [I], this.type = null, this.#B = void 0, [I, _w(this.toString()), !1, !1]
        }
        let G = !Q || A || B || !hw1 ? "" : this.#K(!0);
        if (G === D) G = "";
        if (G) D = `(?:${D})(?:${G})*?`;
        let F = "";
        if (this.type === "!" && this.#I) F = (this.isStart() && !B ? hw1 : "") + o_A;
        else {
            let I = this.type === "!" ? "))" + (this.isStart() && !B && !A ? hw1 : "") + r_A + ")" : this.type === "@" ? ")" : this.type === "?" ? ")?" : this.type === "+" && G ? ")" : this.type === "*" && G ? ")?" : `)${this.type}`;
            F = Z + D + I
        }
        return [F, _w(D), this.#B = !!this.#B, this.#Q]
    }
    #K(A) {
        return this.#Z.map((B) => {
            if (typeof B === "string") throw new Error("string type in extglob ast??");
            let [Q, Z, D, G] = B.toRegExpSource(A);
            return this.#Q = this.#Q || G, Q
        }).filter((B) => !(this.isStart() && this.isEnd()) || !!B).join("|")
    }
    static #C(A, B, Q = !1) {
        let Z = !1,
            D = "",
            G = !1;
        for (let F = 0; F < A.length; F++) {
            let I = A.charAt(F);
            if (Z) {
                Z = !1, D += (ohQ.has(I) ? "\\" : "") + I;
                continue
            }
            if (I === "\\") {
                if (F === A.length - 1) D += "\\\\";
                else Z = !0;
                continue
            }
            if (I === "[") {
                let [Y, W, J, X] = a_A(A, F);
                if (J) {
                    D += Y, G = G || W, F += J - 1, B = B || X;
                    continue
                }
            }
            if (I === "*") {
                if (Q && A === "*") D += o_A;
                else D += r_A;
                B = !0;
                continue
            }
            if (I === "?") {
                D += L20, B = !0;
                continue
            }
            D += thQ(I)
        }
        return [D, _w(A), !!B, G]
    }
}
var Ea = (A, {
    windowsPathsNoEscape: B = !1
} = {}) => {
    return B ? A.replace(/[?*()[\]]/g, "[$&]") : A.replace(/[?*()[\]\\]/g, "\\$&")
};
var aJ = (A, B, Q = {}) => {
        if (i41(B), !Q.nocomment && B.charAt(0) === "#") return !1;
        return new jz(B, Q).match(A)
    },
    ehQ = /^\*+([^+@!?\*\[\(]*)$/,
    AgQ = (A) => (B) => !B.startsWith(".") && B.endsWith(A),
    BgQ = (A) => (B) => B.endsWith(A),
    QgQ = (A) => {
        return A = A.toLowerCase(), (B) => !B.startsWith(".") && B.toLowerCase().endsWith(A)
    },
    ZgQ = (A) => {
        return A = A.toLowerCase(), (B) => B.toLowerCase().endsWith(A)
    },
    DgQ = /^\*+\.\*+$/,
    GgQ = (A) => !A.startsWith(".") && A.includes("."),
    FgQ = (A) => A !== "." && A !== ".." && A.includes("."),
    IgQ = /^\.\*+$/,
    YgQ = (A) => A !== "." && A !== ".." && A.startsWith("."),
    WgQ = /^\*+$/,
    JgQ = (A) => A.length !== 0 && !A.startsWith("."),
    XgQ = (A) => A.length !== 0 && A !== "." && A !== "..",
    VgQ = /^\?+([^+@!?\*\[\(]*)?$/,
    CgQ = ([A, B = ""]) => {
        let Q = BxA([A]);
        if (!B) return Q;
        return B = B.toLowerCase(), (Z) => Q(Z) && Z.toLowerCase().endsWith(B)
    },
    KgQ = ([A, B = ""]) => {
        let Q = QxA([A]);
        if (!B) return Q;
        return B = B.toLowerCase(), (Z) => Q(Z) && Z.toLowerCase().endsWith(B)
    },
    HgQ = ([A, B = ""]) => {
        let Q = QxA([A]);
        return !B ? Q : (Z) => Q(Z) && Z.endsWith(B)
    },
    zgQ = ([A, B = ""]) => {
        let Q = BxA([A]);
        return !B ? Q : (Z) => Q(Z) && Z.endsWith(B)
    },
    BxA = ([A]) => {
        let B = A.length;
        return (Q) => Q.length === B && !Q.startsWith(".")
    },
    QxA = ([A]) => {
        let B = A.length;
        return (Q) => Q.length === B && Q !== "." && Q !== ".."
    },
    ZxA = typeof process === "object" && process ? typeof process.env === "object" && process.env && process.env.__MINIMATCH_TESTING_PLATFORM__ || process.platform : "posix",
    t_A = {
        win32: {
            sep: "\\"
        },
        posix: {
            sep: "/"
        }
    },
    EgQ = ZxA === "win32" ? t_A.win32.sep : t_A.posix.sep;
aJ.sep = EgQ;
var OY = Symbol("globstar **");
aJ.GLOBSTAR = OY;
var UgQ = "[^/]",
    wgQ = UgQ + "*?",
    $gQ = "(?:(?!(?:\\/|^)(?:\\.{1,2})($|\\/)).)*?",
    qgQ = "(?:(?!(?:\\/|^)\\.).)*?",
    NgQ = (A, B = {}) => (Q) => aJ(Q, A, B);
aJ.filter = NgQ;
var Sz = (A, B = {}) => Object.assign({}, A, B),
    LgQ = (A) => {
        if (!A || typeof A !== "object" || !Object.keys(A).length) return aJ;
        let B = aJ;
        return Object.assign((Z, D, G = {}) => B(Z, D, Sz(A, G)), {
            Minimatch: class Z extends B.Minimatch {
                constructor(D, G = {}) {
                    super(D, Sz(A, G))
                }
                static defaults(D) {
                    return B.defaults(Sz(A, D)).Minimatch
                }
            },
            AST: class Z extends B.AST {
                constructor(D, G, F = {}) {
                    super(D, G, Sz(A, F))
                }
                static fromGlob(D, G = {}) {
                    return B.AST.fromGlob(D, Sz(A, G))
                }
            },
            unescape: (Z, D = {}) => B.unescape(Z, Sz(A, D)),
            escape: (Z, D = {}) => B.escape(Z, Sz(A, D)),
            filter: (Z, D = {}) => B.filter(Z, Sz(A, D)),
            defaults: (Z) => B.defaults(Sz(A, Z)),
            makeRe: (Z, D = {}) => B.makeRe(Z, Sz(A, D)),
            braceExpand: (Z, D = {}) => B.braceExpand(Z, Sz(A, D)),
            match: (Z, D, G = {}) => B.match(Z, D, Sz(A, G)),
            sep: B.sep,
            GLOBSTAR: OY
        })
    };
aJ.defaults = LgQ;
var DxA = (A, B = {}) => {
    if (i41(A), B.nobrace || !/\{(?:(?!\{).)*\}/.test(A)) return [A];
    return AxA.default(A)
};
aJ.braceExpand = DxA;
var MgQ = (A, B = {}) => new jz(A, B).makeRe();
aJ.makeRe = MgQ;
var RgQ = (A, B, Q = {}) => {
    let Z = new jz(B, Q);
    if (A = A.filter((D) => Z.match(D)), Z.options.nonull && !A.length) A.push(B);
    return A
};
aJ.match = RgQ;
var e_A = /[?*]|[+@!]\(.*?\)|\[|\]/,
    OgQ = (A) => A.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");