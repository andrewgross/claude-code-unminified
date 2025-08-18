/* chunk:449 bytes:[10733087, 10744836) size:11749 source:unpacked-cli.js */
var OTB = E((mF3, RTB) => {
    var vG1 = YTB(),
        {
            stdout: QN0,
            stderr: ZN0
        } = XTB(),
        {
            stringReplaceAll: bD8,
            stringEncaseCRLFWithFirstIndex: fD8
        } = CTB(),
        {
            isArray: av1
        } = Array,
        $TB = ["ansi", "ansi", "ansi256", "ansi16m"],
        F01 = Object.create(null),
        hD8 = (A, B = {}) => {
            if (B.level && !(Number.isInteger(B.level) && B.level >= 0 && B.level <= 3)) throw new Error("The `level` option should be an integer from 0 to 3");
            let Q = QN0 ? QN0.level : 0;
            A.level = B.level === void 0 ? Q : B.level
        };
    class qTB {
        constructor(A) {
            return NTB(A)
        }
    }
    var NTB = (A) => {
        let B = {};
        return hD8(B, A), B.template = (...Q) => MTB(B.template, ...Q), Object.setPrototypeOf(B, sv1.prototype), Object.setPrototypeOf(B.template, B), B.template.constructor = () => {
            throw new Error("`chalk.constructor()` is deprecated. Use `new chalk.Instance()` instead.")
        }, B.template.Instance = qTB, B.template
    };

    function sv1(A) {
        return NTB(A)
    }
    for (let [A, B] of Object.entries(vG1)) F01[A] = {
        get() {
            let Q = rv1(this, DN0(B.open, B.close, this._styler), this._isEmpty);
            return Object.defineProperty(this, A, {
                value: Q
            }), Q
        }
    };
    F01.visible = {
        get() {
            let A = rv1(this, this._styler, !0);
            return Object.defineProperty(this, "visible", {
                value: A
            }), A
        }
    };
    var LTB = ["rgb", "hex", "keyword", "hsl", "hsv", "hwb", "ansi", "ansi256"];
    for (let A of LTB) F01[A] = {
        get() {
            let {
                level: B
            } = this;
            return function(...Q) {
                let Z = DN0(vG1.color[$TB[B]][A](...Q), vG1.color.close, this._styler);
                return rv1(this, Z, this._isEmpty)
            }
        }
    };
    for (let A of LTB) {
        let B = "bg" + A[0].toUpperCase() + A.slice(1);
        F01[B] = {
            get() {
                let {
                    level: Q
                } = this;
                return function(...Z) {
                    let D = DN0(vG1.bgColor[$TB[Q]][A](...Z), vG1.bgColor.close, this._styler);
                    return rv1(this, D, this._isEmpty)
                }
            }
        }
    }
    var gD8 = Object.defineProperties(() => {}, {
            ...F01,
            level: {
                enumerable: !0,
                get() {
                    return this._generator.level
                },
                set(A) {
                    this._generator.level = A
                }
            }
        }),
        DN0 = (A, B, Q) => {
            let Z, D;
            if (Q === void 0) Z = A, D = B;
            else Z = Q.openAll + A, D = B + Q.closeAll;
            return {
                open: A,
                close: B,
                openAll: Z,
                closeAll: D,
                parent: Q
            }
        },
        rv1 = (A, B, Q) => {
            let Z = (...D) => {
                if (av1(D[0]) && av1(D[0].raw)) return wTB(Z, MTB(Z, ...D));
                return wTB(Z, D.length === 1 ? "" + D[0] : D.join(" "))
            };
            return Object.setPrototypeOf(Z, gD8), Z._generator = A, Z._styler = B, Z._isEmpty = Q, Z
        },
        wTB = (A, B) => {
            if (A.level <= 0 || !B) return A._isEmpty ? "" : B;
            let Q = A._styler;
            if (Q === void 0) return B;
            let {
                openAll: Z,
                closeAll: D
            } = Q;
            if (B.indexOf("\x1B") !== -1)
                while (Q !== void 0) B = bD8(B, Q.close, Q.open), Q = Q.parent;
            let G = B.indexOf(`
`);
            if (G !== -1) B = fD8(B, D, Z, G);
            return Z + B + D
        },
        BN0, MTB = (A, ...B) => {
            let [Q] = B;
            if (!av1(Q) || !av1(Q.raw)) return B.join(" ");
            let Z = B.slice(1),
                D = [Q.raw[0]];
            for (let G = 1; G < Q.length; G++) D.push(String(Z[G - 1]).replace(/[{}\\]/g, "\\$&"), String(Q.raw[G]));
            if (BN0 === void 0) BN0 = UTB();
            return BN0(A, D.join(""))
        };
    Object.defineProperties(sv1.prototype, F01);
    var ov1 = sv1();
    ov1.supportsColor = QN0;
    ov1.stderr = sv1({
        level: ZN0 ? ZN0.level : 0
    });
    ov1.stderr.supportsColor = ZN0;
    RTB.exports = ov1
});
var GN0 = E((p4) => {
    var uD8 = p4 && p4.__importDefault || function(A) {
        return A && A.__esModule ? A : {
            default: A
        }
    };
    Object.defineProperty(p4, "__esModule", {
        value: !0
    });
    p4.parse = p4.stringify = p4.toJson = p4.fromJson = p4.DEFAULT_THEME = p4.plain = void 0;
    var qD = uD8(OTB()),
        mD8 = function(A) {
            return A
        };
    p4.plain = mD8;
    p4.DEFAULT_THEME = {
        keyword: qD.default.blue,
        built_in: qD.default.cyan,
        type: qD.default.cyan.dim,
        literal: qD.default.blue,
        number: qD.default.green,
        regexp: qD.default.red,
        string: qD.default.red,
        subst: p4.plain,
        symbol: p4.plain,
        class: qD.default.blue,
        function: qD.default.yellow,
        title: p4.plain,
        params: p4.plain,
        comment: qD.default.green,
        doctag: qD.default.green,
        meta: qD.default.grey,
        "meta-keyword": p4.plain,
        "meta-string": p4.plain,
        section: p4.plain,
        tag: qD.default.grey,
        name: qD.default.blue,
        "builtin-name": p4.plain,
        attr: qD.default.cyan,
        attribute: p4.plain,
        variable: p4.plain,
        bullet: p4.plain,
        code: p4.plain,
        emphasis: qD.default.italic,
        strong: qD.default.bold,
        formula: p4.plain,
        link: qD.default.underline,
        quote: p4.plain,
        "selector-tag": p4.plain,
        "selector-id": p4.plain,
        "selector-class": p4.plain,
        "selector-attr": p4.plain,
        "selector-pseudo": p4.plain,
        "template-tag": p4.plain,
        "template-variable": p4.plain,
        addition: qD.default.green,
        deletion: qD.default.red,
        default: p4.plain
    };

    function TTB(A) {
        var B = {};
        for (var Q = 0, Z = Object.keys(A); Q < Z.length; Q++) {
            var D = Z[Q],
                G = A[D];
            if (Array.isArray(G)) B[D] = G.reduce(function(F, I) {
                return I === "plain" ? p4.plain : F[I]
            }, qD.default);
            else B[D] = qD.default[G]
        }
        return B
    }
    p4.fromJson = TTB;

    function PTB(A) {
        var B = {};
        for (var Q = 0, Z = Object.keys(B); Q < Z.length; Q++) {
            var D = Z[Q],
                G = B[D];
            B[D] = G._styles
        }
        return B
    }
    p4.toJson = PTB;

    function dD8(A) {
        return JSON.stringify(PTB(A))
    }
    p4.stringify = dD8;

    function cD8(A) {
        return TTB(JSON.parse(A))
    }
    p4.parse = cD8
});
var IN0 = E((GF) => {
    var STB = GF && GF.__createBinding || (Object.create ? function(A, B, Q, Z) {
            if (Z === void 0) Z = Q;
            Object.defineProperty(A, Z, {
                enumerable: !0,
                get: function() {
                    return B[Q]
                }
            })
        } : function(A, B, Q, Z) {
            if (Z === void 0) Z = Q;
            A[Z] = B[Q]
        }),
        lD8 = GF && GF.__setModuleDefault || (Object.create ? function(A, B) {
            Object.defineProperty(A, "default", {
                enumerable: !0,
                value: B
            })
        } : function(A, B) {
            A.default = B
        }),
        jTB = GF && GF.__importStar || function(A) {
            if (A && A.__esModule) return A;
            var B = {};
            if (A != null) {
                for (var Q in A)
                    if (Q !== "default" && Object.prototype.hasOwnProperty.call(A, Q)) STB(B, A, Q)
            }
            return lD8(B, A), B
        },
        pD8 = GF && GF.__exportStar || function(A, B) {
            for (var Q in A)
                if (Q !== "default" && !Object.prototype.hasOwnProperty.call(B, Q)) STB(B, A, Q)
        },
        iD8 = GF && GF.__importDefault || function(A) {
            return A && A.__esModule ? A : {
                default: A
            }
        };
    Object.defineProperty(GF, "__esModule", {
        value: !0
    });
    GF.supportsLanguage = GF.listLanguages = GF.highlight = void 0;
    var ev1 = jTB(cQ0()),
        nD8 = jTB(nOB()),
        aD8 = iD8(QTB()),
        tv1 = GN0();

    function FN0(A, B, Q) {
        if (B === void 0) B = {};
        switch (A.type) {
            case "text": {
                var Z = A.data;
                if (Q === void 0) return (B.default || tv1.DEFAULT_THEME.default || tv1.plain)(Z);
                return Z
            }
            case "tag": {
                var D = /hljs-(\w+)/.exec(A.attribs.class);
                if (D) {
                    var G = D[1],
                        F = A.childNodes.map(function(I) {
                            return FN0(I, B, G)
                        }).join("");
                    return (B[G] || tv1.DEFAULT_THEME[G] || tv1.plain)(F)
                }
                return A.childNodes.map(function(I) {
                    return FN0(I, B)
                }).join("")
            }
        }
        throw new Error("Invalid node type " + A.type)
    }

    function sD8(A, B) {
        if (B === void 0) B = {};
        var Q = nD8.parseFragment(A, {
            treeAdapter: aD8.default
        });
        return Q.childNodes.map(function(Z) {
            return FN0(Z, B)
        }).join("")
    }

    function kTB(A, B) {
        if (B === void 0) B = {};
        var Q;
        if (B.language) Q = ev1.highlight(A, {
            language: B.language,
            ignoreIllegals: B.ignoreIllegals
        }).value;
        else Q = ev1.highlightAuto(A, B.languageSubset).value;
        return sD8(Q, B.theme)
    }
    GF.highlight = kTB;

    function rD8() {
        return ev1.listLanguages()
    }
    GF.listLanguages = rD8;

    function oD8(A) {
        return !!ev1.getLanguage(A)
    }
    GF.supportsLanguage = oD8;
    GF.default = kTB;
    pD8(GN0(), GF)
});
var _TB = {};
bj(_TB, {
    sharp: () => yTB,
    default: () => ZG8
});
import {
    createRequire as BG8
} from "module";

function yTB(A) {
    let B = null,
        Q = [];
    async function Z() {
        if (!B) B = (async () => {
            let {
                processImage: G
            } = QG8("./image-processor.node"), F = await G(A);
            for (let I of Q) I(F);
            return F
        })();
        return B
    }
    let D = {
        async metadata() {
            return (await Z()).metadata()
        },
        resize(G, F, I) {
            return Q.push((Y) => {
                Y.resize(G, F, I)
            }), D
        },
        jpeg(G) {
            return Q.push((F) => {
                F.jpeg(G?.quality)
            }), D
        },
        png(G) {
            return Q.push((F) => {
                F.png(G)
            }), D
        },
        webp(G) {
            return Q.push((F) => {
                F.webp(G?.quality)
            }), D
        },
        async toBuffer() {
            return (await Z()).toBuffer()
        }
    };
    return D
}
var QG8, ZG8;
var xTB = K21(() => {
    QG8 = BG8(import.meta.url);
    ZG8 = yTB
});