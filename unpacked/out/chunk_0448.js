/* chunk:448 bytes:[10715693, 10733086) size:17393 source:unpacked-cli.js */
var QTB = E((nZ8) => {
    var lZ8 = tOB(),
        {
            DOCUMENT_MODE: pZ8
        } = rq0(),
        eOB = {
            element: 1,
            text: 3,
            cdata: 4,
            comment: 8
        },
        ATB = {
            tagName: "name",
            childNodes: "children",
            parentNode: "parent",
            previousSibling: "prev",
            nextSibling: "next",
            nodeValue: "data"
        };
    class _v {
        constructor(A) {
            for (let B of Object.keys(A)) this[B] = A[B]
        }
        get firstChild() {
            let A = this.children;
            return A && A[0] || null
        }
        get lastChild() {
            let A = this.children;
            return A && A[A.length - 1] || null
        }
        get nodeType() {
            return eOB[this.type] || eOB.element
        }
    }
    Object.keys(ATB).forEach((A) => {
        let B = ATB[A];
        Object.defineProperty(_v.prototype, A, {
            get: function() {
                return this[B] || null
            },
            set: function(Q) {
                return this[B] = Q, Q
            }
        })
    });
    nZ8.createDocument = function() {
        return new _v({
            type: "root",
            name: "root",
            parent: null,
            prev: null,
            next: null,
            children: [],
            "x-mode": pZ8.NO_QUIRKS
        })
    };
    nZ8.createDocumentFragment = function() {
        return new _v({
            type: "root",
            name: "root",
            parent: null,
            prev: null,
            next: null,
            children: []
        })
    };
    nZ8.createElement = function(A, B, Q) {
        let Z = Object.create(null),
            D = Object.create(null),
            G = Object.create(null);
        for (let F = 0; F < Q.length; F++) {
            let I = Q[F].name;
            Z[I] = Q[F].value, D[I] = Q[F].namespace, G[I] = Q[F].prefix
        }
        return new _v({
            type: A === "script" || A === "style" ? A : "tag",
            name: A,
            namespace: B,
            attribs: Z,
            "x-attribsNamespace": D,
            "x-attribsPrefix": G,
            children: [],
            parent: null,
            prev: null,
            next: null
        })
    };
    nZ8.createCommentNode = function(A) {
        return new _v({
            type: "comment",
            data: A,
            parent: null,
            prev: null,
            next: null
        })
    };
    var BTB = function(A) {
            return new _v({
                type: "text",
                data: A,
                parent: null,
                prev: null,
                next: null
            })
        },
        oq0 = nZ8.appendChild = function(A, B) {
            let Q = A.children[A.children.length - 1];
            if (Q) Q.next = B, B.prev = Q;
            A.children.push(B), B.parent = A
        },
        iZ8 = nZ8.insertBefore = function(A, B, Q) {
            let Z = A.children.indexOf(Q),
                D = Q.prev;
            if (D) D.next = B, B.prev = D;
            Q.prev = B, B.next = Q, A.children.splice(Z, 0, B), B.parent = A
        };
    nZ8.setTemplateContent = function(A, B) {
        oq0(A, B)
    };
    nZ8.getTemplateContent = function(A) {
        return A.children[0]
    };
    nZ8.setDocumentType = function(A, B, Q, Z) {
        let D = lZ8.serializeContent(B, Q, Z),
            G = null;
        for (let F = 0; F < A.children.length; F++)
            if (A.children[F].type === "directive" && A.children[F].name === "!doctype") {
                G = A.children[F];
                break
            } if (G) G.data = D, G["x-name"] = B, G["x-publicId"] = Q, G["x-systemId"] = Z;
        else oq0(A, new _v({
            type: "directive",
            name: "!doctype",
            data: D,
            "x-name": B,
            "x-publicId": Q,
            "x-systemId": Z
        }))
    };
    nZ8.setDocumentMode = function(A, B) {
        A["x-mode"] = B
    };
    nZ8.getDocumentMode = function(A) {
        return A["x-mode"]
    };
    nZ8.detachNode = function(A) {
        if (A.parent) {
            let B = A.parent.children.indexOf(A),
                Q = A.prev,
                Z = A.next;
            if (A.prev = null, A.next = null, Q) Q.next = Z;
            if (Z) Z.prev = Q;
            A.parent.children.splice(B, 1), A.parent = null
        }
    };
    nZ8.insertText = function(A, B) {
        let Q = A.children[A.children.length - 1];
        if (Q && Q.type === "text") Q.data += B;
        else oq0(A, BTB(B))
    };
    nZ8.insertTextBefore = function(A, B, Q) {
        let Z = A.children[A.children.indexOf(Q) - 1];
        if (Z && Z.type === "text") Z.data += B;
        else iZ8(A, BTB(B), Q)
    };
    nZ8.adoptAttributes = function(A, B) {
        for (let Q = 0; Q < B.length; Q++) {
            let Z = B[Q].name;
            if (typeof A.attribs[Z] === "undefined") A.attribs[Z] = B[Q].value, A["x-attribsNamespace"][Z] = B[Q].namespace, A["x-attribsPrefix"][Z] = B[Q].prefix
        }
    };
    nZ8.getFirstChild = function(A) {
        return A.children[0]
    };
    nZ8.getChildNodes = function(A) {
        return A.children
    };
    nZ8.getParentNode = function(A) {
        return A.parent
    };
    nZ8.getAttrList = function(A) {
        let B = [];
        for (let Q in A.attribs) B.push({
            name: Q,
            value: A.attribs[Q],
            namespace: A["x-attribsNamespace"][Q],
            prefix: A["x-attribsPrefix"][Q]
        });
        return B
    };
    nZ8.getTagName = function(A) {
        return A.name
    };
    nZ8.getNamespaceURI = function(A) {
        return A.namespace
    };
    nZ8.getTextNodeContent = function(A) {
        return A.data
    };
    nZ8.getCommentNodeContent = function(A) {
        return A.data
    };
    nZ8.getDocumentTypeNodeName = function(A) {
        return A["x-name"]
    };
    nZ8.getDocumentTypeNodePublicId = function(A) {
        return A["x-publicId"]
    };
    nZ8.getDocumentTypeNodeSystemId = function(A) {
        return A["x-systemId"]
    };
    nZ8.isTextNode = function(A) {
        return A.type === "text"
    };
    nZ8.isCommentNode = function(A) {
        return A.type === "comment"
    };
    nZ8.isDocumentTypeNode = function(A) {
        return A.type === "directive" && A.name === "!doctype"
    };
    nZ8.isElementNode = function(A) {
        return !!A.attribs
    };
    nZ8.setNodeSourceCodeLocation = function(A, B) {
        A.sourceCodeLocation = B
    };
    nZ8.getNodeSourceCodeLocation = function(A) {
        return A.sourceCodeLocation
    };
    nZ8.updateNodeSourceCodeLocation = function(A, B) {
        A.sourceCodeLocation = Object.assign(A.sourceCodeLocation, B)
    }
});
var YTB = E((fF3, ITB) => {
    var ZTB = (A, B) => (...Q) => {
            return `\x1B[${A(...Q)+B}m`
        },
        DTB = (A, B) => (...Q) => {
            let Z = A(...Q);
            return `\x1B[${38+B};5;${Z}m`
        },
        GTB = (A, B) => (...Q) => {
            let Z = A(...Q);
            return `\x1B[${38+B};2;${Z[0]};${Z[1]};${Z[2]}m`
        },
        nv1 = (A) => A,
        FTB = (A, B, Q) => [A, B, Q],
        D01 = (A, B, Q) => {
            Object.defineProperty(A, B, {
                get: () => {
                    let Z = Q();
                    return Object.defineProperty(A, B, {
                        value: Z,
                        enumerable: !0,
                        configurable: !0
                    }), Z
                },
                enumerable: !0,
                configurable: !0
            })
        },
        tq0, G01 = (A, B, Q, Z) => {
            if (tq0 === void 0) tq0 = DK0();
            let D = Z ? 10 : 0,
                G = {};
            for (let [F, I] of Object.entries(tq0)) {
                let Y = F === "ansi16" ? "ansi" : F;
                if (F === B) G[Y] = A(Q, D);
                else if (typeof I === "object") G[Y] = A(I[B], D)
            }
            return G
        };

    function RD8() {
        let A = new Map,
            B = {
                modifier: {
                    reset: [0, 0],
                    bold: [1, 22],
                    dim: [2, 22],
                    italic: [3, 23],
                    underline: [4, 24],
                    inverse: [7, 27],
                    hidden: [8, 28],
                    strikethrough: [9, 29]
                },
                color: {
                    black: [30, 39],
                    red: [31, 39],
                    green: [32, 39],
                    yellow: [33, 39],
                    blue: [34, 39],
                    magenta: [35, 39],
                    cyan: [36, 39],
                    white: [37, 39],
                    blackBright: [90, 39],
                    redBright: [91, 39],
                    greenBright: [92, 39],
                    yellowBright: [93, 39],
                    blueBright: [94, 39],
                    magentaBright: [95, 39],
                    cyanBright: [96, 39],
                    whiteBright: [97, 39]
                },
                bgColor: {
                    bgBlack: [40, 49],
                    bgRed: [41, 49],
                    bgGreen: [42, 49],
                    bgYellow: [43, 49],
                    bgBlue: [44, 49],
                    bgMagenta: [45, 49],
                    bgCyan: [46, 49],
                    bgWhite: [47, 49],
                    bgBlackBright: [100, 49],
                    bgRedBright: [101, 49],
                    bgGreenBright: [102, 49],
                    bgYellowBright: [103, 49],
                    bgBlueBright: [104, 49],
                    bgMagentaBright: [105, 49],
                    bgCyanBright: [106, 49],
                    bgWhiteBright: [107, 49]
                }
            };
        B.color.gray = B.color.blackBright, B.bgColor.bgGray = B.bgColor.bgBlackBright, B.color.grey = B.color.blackBright, B.bgColor.bgGrey = B.bgColor.bgBlackBright;
        for (let [Q, Z] of Object.entries(B)) {
            for (let [D, G] of Object.entries(Z)) B[D] = {
                open: `\x1B[${G[0]}m`,
                close: `\x1B[${G[1]}m`
            }, Z[D] = B[D], A.set(G[0], G[1]);
            Object.defineProperty(B, Q, {
                value: Z,
                enumerable: !1
            })
        }
        return Object.defineProperty(B, "codes", {
            value: A,
            enumerable: !1
        }), B.color.close = "\x1B[39m", B.bgColor.close = "\x1B[49m", D01(B.color, "ansi", () => G01(ZTB, "ansi16", nv1, !1)), D01(B.color, "ansi256", () => G01(DTB, "ansi256", nv1, !1)), D01(B.color, "ansi16m", () => G01(GTB, "rgb", FTB, !1)), D01(B.bgColor, "ansi", () => G01(ZTB, "ansi16", nv1, !0)), D01(B.bgColor, "ansi256", () => G01(DTB, "ansi256", nv1, !0)), D01(B.bgColor, "ansi16m", () => G01(GTB, "rgb", FTB, !0)), B
    }
    Object.defineProperty(ITB, "exports", {
        enumerable: !0,
        get: RD8
    })
});
var XTB = E((hF3, JTB) => {
    var OD8 = W1("os"),
        WTB = W1("tty"),
        BU = uB1(),
        {
            env: yI
        } = process,
        xv;
    if (BU("no-color") || BU("no-colors") || BU("color=false") || BU("color=never")) xv = 0;
    else if (BU("color") || BU("colors") || BU("color=true") || BU("color=always")) xv = 1;
    if ("FORCE_COLOR" in yI)
        if (yI.FORCE_COLOR === "true") xv = 1;
        else if (yI.FORCE_COLOR === "false") xv = 0;
    else xv = yI.FORCE_COLOR.length === 0 ? 1 : Math.min(parseInt(yI.FORCE_COLOR, 10), 3);

    function eq0(A) {
        if (A === 0) return !1;
        return {
            level: A,
            hasBasic: !0,
            has256: A >= 2,
            has16m: A >= 3
        }
    }

    function AN0(A, B) {
        if (xv === 0) return 0;
        if (BU("color=16m") || BU("color=full") || BU("color=truecolor")) return 3;
        if (BU("color=256")) return 2;
        if (A && !B && xv === void 0) return 0;
        let Q = xv || 0;
        if (yI.TERM === "dumb") return Q;
        if (process.platform === "win32") {
            let Z = OD8.release().split(".");
            if (Number(Z[0]) >= 10 && Number(Z[2]) >= 10586) return Number(Z[2]) >= 14931 ? 3 : 2;
            return 1
        }
        if ("CI" in yI) {
            if (["TRAVIS", "CIRCLECI", "APPVEYOR", "GITLAB_CI", "GITHUB_ACTIONS", "BUILDKITE"].some((Z) => (Z in yI)) || yI.CI_NAME === "codeship") return 1;
            return Q
        }
        if ("TEAMCITY_VERSION" in yI) return /^(9\.(0*[1-9]\d*)\.|\d{2,}\.)/.test(yI.TEAMCITY_VERSION) ? 1 : 0;
        if (yI.COLORTERM === "truecolor") return 3;
        if ("TERM_PROGRAM" in yI) {
            let Z = parseInt((yI.TERM_PROGRAM_VERSION || "").split(".")[0], 10);
            switch (yI.TERM_PROGRAM) {
                case "iTerm.app":
                    return Z >= 3 ? 3 : 2;
                case "Apple_Terminal":
                    return 2
            }
        }
        if (/-256(color)?$/i.test(yI.TERM)) return 2;
        if (/^screen|^xterm|^vt100|^vt220|^rxvt|color|ansi|cygwin|linux/i.test(yI.TERM)) return 1;
        if ("COLORTERM" in yI) return 1;
        return Q
    }

    function TD8(A) {
        let B = AN0(A, A && A.isTTY);
        return eq0(B)
    }
    JTB.exports = {
        supportsColor: TD8,
        stdout: eq0(AN0(!0, WTB.isatty(1))),
        stderr: eq0(AN0(!0, WTB.isatty(2)))
    }
});
var CTB = E((gF3, VTB) => {
    var PD8 = (A, B, Q) => {
            let Z = A.indexOf(B);
            if (Z === -1) return A;
            let D = B.length,
                G = 0,
                F = "";
            do F += A.substr(G, Z - G) + B + Q, G = Z + D, Z = A.indexOf(B, G); while (Z !== -1);
            return F += A.substr(G), F
        },
        SD8 = (A, B, Q, Z) => {
            let D = 0,
                G = "";
            do {
                let F = A[Z - 1] === "\r";
                G += A.substr(D, (F ? Z - 1 : Z) - D) + B + (F ? `\r
` : `
`) + Q, D = Z + 1, Z = A.indexOf(`
`, D)
            } while (Z !== -1);
            return G += A.substr(D), G
        };
    VTB.exports = {
        stringReplaceAll: PD8,
        stringEncaseCRLFWithFirstIndex: SD8
    }
});
var UTB = E((uF3, ETB) => {
    var jD8 = /(?:\\(u(?:[a-f\d]{4}|\{[a-f\d]{1,6}\})|x[a-f\d]{2}|.))|(?:\{(~)?(\w+(?:\([^)]*\))?(?:\.\w+(?:\([^)]*\))?)*)(?:[ \t]|(?=\r?\n)))|(\})|((?:.|[\r\n\f])+?)/gi,
        KTB = /(?:^|\.)(\w+)(?:\(([^)]*)\))?/g,
        kD8 = /^(['"])((?:\\.|(?!\1)[^\\])*)\1$/,
        yD8 = /\\(u(?:[a-f\d]{4}|{[a-f\d]{1,6}})|x[a-f\d]{2}|.)|([^\\])/gi,
        _D8 = new Map([
            ["n", `
`],
            ["r", "\r"],
            ["t", "\t"],
            ["b", "\b"],
            ["f", "\f"],
            ["v", "\v"],
            ["0", "\x00"],
            ["\\", "\\"],
            ["e", "\x1B"],
            ["a", "\x07"]
        ]);

    function zTB(A) {
        let B = A[0] === "u",
            Q = A[1] === "{";
        if (B && !Q && A.length === 5 || A[0] === "x" && A.length === 3) return String.fromCharCode(parseInt(A.slice(1), 16));
        if (B && Q) return String.fromCodePoint(parseInt(A.slice(2, -1), 16));
        return _D8.get(A) || A
    }

    function xD8(A, B) {
        let Q = [],
            Z = B.trim().split(/\s*,\s*/g),
            D;
        for (let G of Z) {
            let F = Number(G);
            if (!Number.isNaN(F)) Q.push(F);
            else if (D = G.match(kD8)) Q.push(D[2].replace(yD8, (I, Y, W) => Y ? zTB(Y) : W));
            else throw new Error(`Invalid Chalk template style argument: ${G} (in style '${A}')`)
        }
        return Q
    }

    function vD8(A) {
        KTB.lastIndex = 0;
        let B = [],
            Q;
        while ((Q = KTB.exec(A)) !== null) {
            let Z = Q[1];
            if (Q[2]) {
                let D = xD8(Z, Q[2]);
                B.push([Z].concat(D))
            } else B.push([Z])
        }
        return B
    }

    function HTB(A, B) {
        let Q = {};
        for (let D of B)
            for (let G of D.styles) Q[G[0]] = D.inverse ? null : G.slice(1);
        let Z = A;
        for (let [D, G] of Object.entries(Q)) {
            if (!Array.isArray(G)) continue;
            if (!(D in Z)) throw new Error(`Unknown Chalk style: ${D}`);
            Z = G.length > 0 ? Z[D](...G) : Z[D]
        }
        return Z
    }
    ETB.exports = (A, B) => {
        let Q = [],
            Z = [],
            D = [];
        if (B.replace(jD8, (G, F, I, Y, W, J) => {
                if (F) D.push(zTB(F));
                else if (Y) {
                    let X = D.join("");
                    D = [], Z.push(Q.length === 0 ? X : HTB(A, Q)(X)), Q.push({
                        inverse: I,
                        styles: vD8(Y)
                    })
                } else if (W) {
                    if (Q.length === 0) throw new Error("Found extraneous } in Chalk template literal");
                    Z.push(HTB(A, Q)(D.join(""))), D = [], Q.pop()
                } else D.push(J)
            }), Z.push(D.join("")), Q.length > 0) {
            let G = `Chalk template literal is missing ${Q.length} closing bracket${Q.length===1?"":"s"} (\`}\`)`;
            throw new Error(G)
        }
        return Z.join("")
    }
});