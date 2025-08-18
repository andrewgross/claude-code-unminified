/* chunk:497 bytes:[11871300, 11889637) size:18337 source:unpacked-cli.js */
function AO9(A, {
    streamIsTTY: B,
    sniffFlags: Q = !0
} = {}) {
    let Z = tR9();
    if (Z !== void 0) ZV1 = Z;
    let D = Q ? ZV1 : Z;
    if (D === 0) return 0;
    if (Q) {
        if (eH("color=16m") || eH("color=full") || eH("color=truecolor")) return 3;
        if (eH("color=256")) return 2
    }
    if ("TF_BUILD" in YD && "AGENT_NAME" in YD) return 1;
    if (A && !B && D === void 0) return 0;
    let G = D || 0;
    if (YD.TERM === "dumb") return G;
    if (Qp1.platform === "win32") {
        let F = oR9.release().split(".");
        if (Number(F[0]) >= 10 && Number(F[2]) >= 10586) return Number(F[2]) >= 14931 ? 3 : 2;
        return 1
    }
    if ("CI" in YD) {
        if (["GITHUB_ACTIONS", "GITEA_ACTIONS", "CIRCLECI"].some((F) => (F in YD))) return 3;
        if (["TRAVIS", "APPVEYOR", "GITLAB_CI", "BUILDKITE", "DRONE"].some((F) => (F in YD)) || YD.CI_NAME === "codeship") return 1;
        return G
    }
    if ("TEAMCITY_VERSION" in YD) return /^(9\.(0*[1-9]\d*)\.|\d{2,}\.)/.test(YD.TEAMCITY_VERSION) ? 1 : 0;
    if (YD.COLORTERM === "truecolor") return 3;
    if (YD.TERM === "xterm-kitty") return 3;
    if ("TERM_PROGRAM" in YD) {
        let F = Number.parseInt((YD.TERM_PROGRAM_VERSION || "").split(".")[0], 10);
        switch (YD.TERM_PROGRAM) {
            case "iTerm.app":
                return F >= 3 ? 3 : 2;
            case "Apple_Terminal":
                return 2
        }
    }
    if (/-256(color)?$/i.test(YD.TERM)) return 2;
    if (/^screen|^xterm|^vt100|^vt220|^rxvt|color|ansi|cygwin|linux/i.test(YD.TERM)) return 1;
    if ("COLORTERM" in YD) return 1;
    return G
}

function op0(A, B = {}) {
    let Q = AO9(A, {
        streamIsTTY: A && A.isTTY,
        ...B
    });
    return eR9(Q)
}
var BO9 = {
        stdout: op0({
            isTTY: rp0.isatty(1)
        }),
        stderr: op0({
            isTTY: rp0.isatty(2)
        })
    },
    tp0 = BO9;

function ep0(A, B, Q) {
    let Z = A.indexOf(B);
    if (Z === -1) return A;
    let D = B.length,
        G = 0,
        F = "";
    do F += A.slice(G, Z) + B + Q, G = Z + D, Z = A.indexOf(B, G); while (Z !== -1);
    return F += A.slice(G), F
}

function Ai0(A, B, Q, Z) {
    let D = 0,
        G = "";
    do {
        let F = A[Z - 1] === "\r";
        G += A.slice(D, F ? Z - 1 : Z) + B + (F ? `\r
` : `
`) + Q, D = Z + 1, Z = A.indexOf(`
`, D)
    } while (Z !== -1);
    return G += A.slice(D), G
}
var {
    stdout: Bi0,
    stderr: Qi0
} = tp0, Zp1 = Symbol("GENERATOR"), Dp = Symbol("STYLER"), OB1 = Symbol("IS_EMPTY"), Zi0 = ["ansi", "ansi", "ansi256", "ansi16m"], Gp = Object.create(null), QO9 = (A, B = {}) => {
    if (B.level && !(Number.isInteger(B.level) && B.level >= 0 && B.level <= 3)) throw new Error("The `level` option should be an integer from 0 to 3");
    let Q = Bi0 ? Bi0.level : 0;
    A.level = B.level === void 0 ? Q : B.level
};
var ZO9 = (A) => {
    let B = (...Q) => Q.join(" ");
    return QO9(B, A), Object.setPrototypeOf(B, TB1.prototype), B
};

function TB1(A) {
    return ZO9(A)
}
Object.setPrototypeOf(TB1.prototype, Function.prototype);
for (let [A, B] of Object.entries(Fw)) Gp[A] = {
    get() {
        let Q = DV1(this, Gp1(B.open, B.close, this[Dp]), this[OB1]);
        return Object.defineProperty(this, A, {
            value: Q
        }), Q
    }
};
Gp.visible = {
    get() {
        let A = DV1(this, this[Dp], !0);
        return Object.defineProperty(this, "visible", {
            value: A
        }), A
    }
};
var Dp1 = (A, B, Q, ...Z) => {
        if (A === "rgb") {
            if (B === "ansi16m") return Fw[Q].ansi16m(...Z);
            if (B === "ansi256") return Fw[Q].ansi256(Fw.rgbToAnsi256(...Z));
            return Fw[Q].ansi(Fw.rgbToAnsi(...Z))
        }
        if (A === "hex") return Dp1("rgb", B, Q, ...Fw.hexToRgb(...Z));
        return Fw[Q][A](...Z)
    },
    DO9 = ["rgb", "hex", "ansi256"];
for (let A of DO9) {
    Gp[A] = {
        get() {
            let {
                level: Q
            } = this;
            return function(...Z) {
                let D = Gp1(Dp1(A, Zi0[Q], "color", ...Z), Fw.color.close, this[Dp]);
                return DV1(this, D, this[OB1])
            }
        }
    };
    let B = "bg" + A[0].toUpperCase() + A.slice(1);
    Gp[B] = {
        get() {
            let {
                level: Q
            } = this;
            return function(...Z) {
                let D = Gp1(Dp1(A, Zi0[Q], "bgColor", ...Z), Fw.bgColor.close, this[Dp]);
                return DV1(this, D, this[OB1])
            }
        }
    }
}
var GO9 = Object.defineProperties(() => {}, {
        ...Gp,
        level: {
            enumerable: !0,
            get() {
                return this[Zp1].level
            },
            set(A) {
                this[Zp1].level = A
            }
        }
    }),
    Gp1 = (A, B, Q) => {
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
    DV1 = (A, B, Q) => {
        let Z = (...D) => FO9(Z, D.length === 1 ? "" + D[0] : D.join(" "));
        return Object.setPrototypeOf(Z, GO9), Z[Zp1] = A, Z[Dp] = B, Z[OB1] = Q, Z
    },
    FO9 = (A, B) => {
        if (A.level <= 0 || !B) return A[OB1] ? "" : B;
        let Q = A[Dp];
        if (Q === void 0) return B;
        let {
            openAll: Z,
            closeAll: D
        } = Q;
        if (B.includes("\x1B"))
            while (Q !== void 0) B = ep0(B, Q.close, Q.open), Q = Q.parent;
        let G = B.indexOf(`
`);
        if (G !== -1) B = Ai0(B, D, Z, G);
        return Z + B + D
    };
Object.defineProperties(TB1.prototype, Gp);
var IO9 = TB1(),
    cp8 = TB1({
        level: Qi0 ? Qi0.level : 0
    });
var e1 = IO9;

function lD(A) {
    for (let B = 0; B < A.length; B += 2000) process.stdout.write(A.substring(B, B + 2000))
}

function Di0(A) {
    for (let B = 0; B < A.length; B += 2000) process.stderr.write(A.substring(B, B + 2000))
}
var GV1 = EA(() => {
        return process.argv.includes("--debug") || process.argv.includes("-d") || Fp1()
    }),
    Fp1 = EA(() => {
        return process.argv.includes("--debug-to-stderr") || process.argv.includes("-d2e")
    }),
    Ip1 = !1;

function Gi0(A) {
    Ip1 = A
}

function n1(A) {
    if (!GV1()) return;
    if (Ip1 && A.includes(`
`)) A = JSON.stringify(A);
    let B = `[DEBUG] ${A.trim()}`;
    if (Fp1()) console.error(B);
    else console.log(e1.dim(B))
}

function SA(A) {
    if (!GV1()) return;
    if (Ip1 && A.includes(`
`)) A = JSON.stringify(A);
    let B = `[ERROR] ${A.trim()}
`;
    if (Fp1()) Di0(B);
    else lD(e1.red(B))
}

function Fi0(A) {
    return
}
import {
    setMaxListeners as YO9
} from "events";
var WO9 = 50,
    JO9 = 500;

function h4(A = WO9) {
    let B = new AbortController;
    return YO9(A, B.signal), B
}

function Ii0() {
    return h4(JO9)
}
var E20 = G1(z1(), 1);

function SB1(A, B) {
    return function Q() {
        return A.apply(B, arguments)
    }
}
var {
    toString: WT9
} = Object.prototype, {
    getPrototypeOf: Kp1
} = Object, JV1 = ((A) => (B) => {
    let Q = WT9.call(B);
    return A[Q] || (A[Q] = Q.slice(8, -1).toLowerCase())
})(Object.create(null)), Iw = (A) => {
    return A = A.toLowerCase(), (B) => JV1(B) === A
}, XV1 = (A) => (B) => typeof B === A, {
    isArray: Ip
} = Array, jB1 = XV1("undefined");

function JT9(A) {
    return A !== null && !jB1(A) && A.constructor !== null && !jB1(A.constructor) && iC(A.constructor.isBuffer) && A.constructor.isBuffer(A)
}
var $i0 = Iw("ArrayBuffer");

function XT9(A) {
    let B;
    if (typeof ArrayBuffer !== "undefined" && ArrayBuffer.isView) B = ArrayBuffer.isView(A);
    else B = A && A.buffer && $i0(A.buffer);
    return B
}
var VT9 = XV1("string"),
    iC = XV1("function"),
    qi0 = XV1("number"),
    VV1 = (A) => A !== null && typeof A === "object",
    CT9 = (A) => A === !0 || A === !1,
    WV1 = (A) => {
        if (JV1(A) !== "object") return !1;
        let B = Kp1(A);
        return (B === null || B === Object.prototype || Object.getPrototypeOf(B) === null) && !(Symbol.toStringTag in A) && !(Symbol.iterator in A)
    },
    KT9 = Iw("Date"),
    HT9 = Iw("File"),
    zT9 = Iw("Blob"),
    ET9 = Iw("FileList"),
    UT9 = (A) => VV1(A) && iC(A.pipe),
    wT9 = (A) => {
        let B;
        return A && (typeof FormData === "function" && A instanceof FormData || iC(A.append) && ((B = JV1(A)) === "formdata" || B === "object" && iC(A.toString) && A.toString() === "[object FormData]"))
    },
    $T9 = Iw("URLSearchParams"),
    [qT9, NT9, LT9, MT9] = ["ReadableStream", "Request", "Response", "Headers"].map(Iw),
    RT9 = (A) => A.trim ? A.trim() : A.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, "");

function kB1(A, B, {
    allOwnKeys: Q = !1
} = {}) {
    if (A === null || typeof A === "undefined") return;
    let Z, D;
    if (typeof A !== "object") A = [A];
    if (Ip(A))
        for (Z = 0, D = A.length; Z < D; Z++) B.call(null, A[Z], Z, A);
    else {
        let G = Q ? Object.getOwnPropertyNames(A) : Object.keys(A),
            F = G.length,
            I;
        for (Z = 0; Z < F; Z++) I = G[Z], B.call(null, A[I], I, A)
    }
}

function Ni0(A, B) {
    B = B.toLowerCase();
    let Q = Object.keys(A),
        Z = Q.length,
        D;
    while (Z-- > 0)
        if (D = Q[Z], B === D.toLowerCase()) return D;
    return null
}
var rf = (() => {
        if (typeof globalThis !== "undefined") return globalThis;
        return typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : global
    })(),
    Li0 = (A) => !jB1(A) && A !== rf;

function Cp1() {
    let {
        caseless: A
    } = Li0(this) && this || {}, B = {}, Q = (Z, D) => {
        let G = A && Ni0(B, D) || D;
        if (WV1(B[G]) && WV1(Z)) B[G] = Cp1(B[G], Z);
        else if (WV1(Z)) B[G] = Cp1({}, Z);
        else if (Ip(Z)) B[G] = Z.slice();
        else B[G] = Z
    };
    for (let Z = 0, D = arguments.length; Z < D; Z++) arguments[Z] && kB1(arguments[Z], Q);
    return B
}
var OT9 = (A, B, Q, {
        allOwnKeys: Z
    } = {}) => {
        return kB1(B, (D, G) => {
            if (Q && iC(D)) A[G] = SB1(D, Q);
            else A[G] = D
        }, {
            allOwnKeys: Z
        }), A
    },
    TT9 = (A) => {
        if (A.charCodeAt(0) === 65279) A = A.slice(1);
        return A
    },
    PT9 = (A, B, Q, Z) => {
        A.prototype = Object.create(B.prototype, Z), A.prototype.constructor = A, Object.defineProperty(A, "super", {
            value: B.prototype
        }), Q && Object.assign(A.prototype, Q)
    },
    ST9 = (A, B, Q, Z) => {
        let D, G, F, I = {};
        if (B = B || {}, A == null) return B;
        do {
            D = Object.getOwnPropertyNames(A), G = D.length;
            while (G-- > 0)
                if (F = D[G], (!Z || Z(F, A, B)) && !I[F]) B[F] = A[F], I[F] = !0;
            A = Q !== !1 && Kp1(A)
        } while (A && (!Q || Q(A, B)) && A !== Object.prototype);
        return B
    },
    jT9 = (A, B, Q) => {
        if (A = String(A), Q === void 0 || Q > A.length) Q = A.length;
        Q -= B.length;
        let Z = A.indexOf(B, Q);
        return Z !== -1 && Z === Q
    },
    kT9 = (A) => {
        if (!A) return null;
        if (Ip(A)) return A;
        let B = A.length;
        if (!qi0(B)) return null;
        let Q = new Array(B);
        while (B-- > 0) Q[B] = A[B];
        return Q
    },
    yT9 = ((A) => {
        return (B) => {
            return A && B instanceof A
        }
    })(typeof Uint8Array !== "undefined" && Kp1(Uint8Array)),
    _T9 = (A, B) => {
        let Z = (A && A[Symbol.iterator]).call(A),
            D;
        while ((D = Z.next()) && !D.done) {
            let G = D.value;
            B.call(A, G[0], G[1])
        }
    },
    xT9 = (A, B) => {
        let Q, Z = [];
        while ((Q = A.exec(B)) !== null) Z.push(Q);
        return Z
    },
    vT9 = Iw("HTMLFormElement"),
    bT9 = (A) => {
        return A.toLowerCase().replace(/[-_\s]([a-z\d])(\w*)/g, function B(Q, Z, D) {
            return Z.toUpperCase() + D
        })
    },
    wi0 = (({
        hasOwnProperty: A
    }) => (B, Q) => A.call(B, Q))(Object.prototype),
    fT9 = Iw("RegExp"),
    Mi0 = (A, B) => {
        let Q = Object.getOwnPropertyDescriptors(A),
            Z = {};
        kB1(Q, (D, G) => {
            let F;
            if ((F = B(D, G, A)) !== !1) Z[G] = F || D
        }), Object.defineProperties(A, Z)
    },
    hT9 = (A) => {
        Mi0(A, (B, Q) => {
            if (iC(A) && ["arguments", "caller", "callee"].indexOf(Q) !== -1) return !1;
            let Z = A[Q];
            if (!iC(Z)) return;
            if (B.enumerable = !1, "writable" in B) {
                B.writable = !1;
                return
            }
            if (!B.set) B.set = () => {
                throw Error("Can not rewrite read-only method '" + Q + "'")
            }
        })
    },
    gT9 = (A, B) => {
        let Q = {},
            Z = (D) => {
                D.forEach((G) => {
                    Q[G] = !0
                })
            };
        return Ip(A) ? Z(A) : Z(String(A).split(B)), Q
    },
    uT9 = () => {},
    mT9 = (A, B) => {
        return A != null && Number.isFinite(A = +A) ? A : B
    };

function dT9(A) {
    return !!(A && iC(A.append) && A[Symbol.toStringTag] === "FormData" && A[Symbol.iterator])
}
var cT9 = (A) => {
        let B = new Array(10),
            Q = (Z, D) => {
                if (VV1(Z)) {
                    if (B.indexOf(Z) >= 0) return;
                    if (!("toJSON" in Z)) {
                        B[D] = Z;
                        let G = Ip(Z) ? [] : {};
                        return kB1(Z, (F, I) => {
                            let Y = Q(F, D + 1);
                            !jB1(Y) && (G[I] = Y)
                        }), B[D] = void 0, G
                    }
                }
                return Z
            };
        return Q(A, 0)
    },
    lT9 = Iw("AsyncFunction"),
    pT9 = (A) => A && (VV1(A) || iC(A)) && iC(A.then) && iC(A.catch),
    Ri0 = ((A, B) => {
        if (A) return setImmediate;
        return B ? ((Q, Z) => {
            return rf.addEventListener("message", ({
                source: D,
                data: G
            }) => {
                if (D === rf && G === Q) Z.length && Z.shift()()
            }, !1), (D) => {
                Z.push(D), rf.postMessage(Q, "*")
            }
        })(`axios@${Math.random()}`, []) : (Q) => setTimeout(Q)
    })(typeof setImmediate === "function", iC(rf.postMessage)),
    iT9 = typeof queueMicrotask !== "undefined" ? queueMicrotask.bind(rf) : typeof process !== "undefined" && process.nextTick || Ri0,
    O0 = {
        isArray: Ip,
        isArrayBuffer: $i0,
        isBuffer: JT9,
        isFormData: wT9,
        isArrayBufferView: XT9,
        isString: VT9,
        isNumber: qi0,
        isBoolean: CT9,
        isObject: VV1,
        isPlainObject: WV1,
        isReadableStream: qT9,
        isRequest: NT9,
        isResponse: LT9,
        isHeaders: MT9,
        isUndefined: jB1,
        isDate: KT9,
        isFile: HT9,
        isBlob: zT9,
        isRegExp: fT9,
        isFunction: iC,
        isStream: UT9,
        isURLSearchParams: $T9,
        isTypedArray: yT9,
        isFileList: ET9,
        forEach: kB1,
        merge: Cp1,
        extend: OT9,
        trim: RT9,
        stripBOM: TT9,
        inherits: PT9,
        toFlatObject: ST9,
        kindOf: JV1,
        kindOfTest: Iw,
        endsWith: jT9,
        toArray: kT9,
        forEachEntry: _T9,
        matchAll: xT9,
        isHTMLForm: vT9,
        hasOwnProperty: wi0,
        hasOwnProp: wi0,
        reduceDescriptors: Mi0,
        freezeMethods: hT9,
        toObjectSet: gT9,
        toCamelCase: bT9,
        noop: uT9,
        toFiniteNumber: mT9,
        findKey: Ni0,
        global: rf,
        isContextDefined: Li0,
        isSpecCompliantForm: dT9,
        toJSONObject: cT9,
        isAsyncFn: lT9,
        isThenable: pT9,
        setImmediate: Ri0,
        asap: iT9
    };

function Yp(A, B, Q, Z, D) {
    if (Error.call(this), Error.captureStackTrace) Error.captureStackTrace(this, this.constructor);
    else this.stack = new Error().stack;
    if (this.message = A, this.name = "AxiosError", B && (this.code = B), Q && (this.config = Q), Z && (this.request = Z), D) this.response = D, this.status = D.status ? D.status : null
}
O0.inherits(Yp, Error, {
    toJSON: function A() {
        return {
            message: this.message,
            name: this.name,
            description: this.description,
            number: this.number,
            fileName: this.fileName,
            lineNumber: this.lineNumber,
            columnNumber: this.columnNumber,
            stack: this.stack,
            config: O0.toJSONObject(this.config),
            code: this.code,
            status: this.status
        }
    }
});
var Oi0 = Yp.prototype,
    Ti0 = {};
["ERR_BAD_OPTION_VALUE", "ERR_BAD_OPTION", "ECONNABORTED", "ETIMEDOUT", "ERR_NETWORK", "ERR_FR_TOO_MANY_REDIRECTS", "ERR_DEPRECATED", "ERR_BAD_RESPONSE", "ERR_BAD_REQUEST", "ERR_CANCELED", "ERR_NOT_SUPPORT", "ERR_INVALID_URL"].forEach((A) => {
    Ti0[A] = {
        value: A
    }
});
Object.defineProperties(Yp, Ti0);
Object.defineProperty(Oi0, "isAxiosError", {
    value: !0
});
Yp.from = (A, B, Q, Z, D, G) => {
    let F = Object.create(Oi0);
    return O0.toFlatObject(A, F, function I(Y) {
        return Y !== Error.prototype
    }, (I) => {
        return I !== "isAxiosError"
    }), Yp.call(F, A.message, B, Q, Z, D), F.cause = A, F.name = A.name, G && Object.assign(F, G), F
};
var c2 = Yp;
var ya0 = G1(ka0(), 1),
    NV1 = ya0.default;

function hp1(A) {
    return O0.isPlainObject(A) || O0.isArray(A)
}

function xa0(A) {
    return O0.endsWith(A, "[]") ? A.slice(0, -2) : A
}

function _a0(A, B, Q) {
    if (!A) return B;
    return A.concat(B).map(function Z(D, G) {
        return D = xa0(D), !Q && G ? "[" + D + "]" : D
    }).join(Q ? "." : "")
}

function xS9(A) {
    return O0.isArray(A) && !A.some(hp1)
}
var vS9 = O0.toFlatObject(O0, {}, null, function A(B) {
    return /^is[A-Z]/.test(B)
});