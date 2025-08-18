/* chunk:496 bytes:[11851821, 11871298) size:19477 source:unpacked-cli.js */
var peB = () => ({
        contents: new ArrayBuffer(0)
    }),
    ieB = (A) => neB.encode(A),
    neB = new TextEncoder,
    W_0 = (A) => new Uint8Array(A),
    J_0 = (A) => new Uint8Array(A.buffer, A.byteOffset, A.byteLength),
    aeB = (A, B) => A.slice(0, B),
    seB = (A, {
        contents: B,
        length: Q
    }, Z) => {
        let D = C_0() ? oeB(B, Z) : reB(B, Z);
        return new Uint8Array(D).set(A, Q), D
    },
    reB = (A, B) => {
        if (B <= A.byteLength) return A;
        let Q = new ArrayBuffer(V_0(B));
        return new Uint8Array(Q).set(new Uint8Array(A), 0), Q
    },
    oeB = (A, B) => {
        if (B <= A.maxByteLength) return A.resize(B), A;
        let Q = new ArrayBuffer(B, {
            maxByteLength: V_0(B)
        });
        return new Uint8Array(Q).set(new Uint8Array(A), 0), Q
    },
    V_0 = (A) => X_0 ** Math.ceil(Math.log(A) / Math.log(X_0)),
    X_0 = 2,
    teB = ({
        contents: A,
        length: B
    }) => C_0() ? A : A.slice(0, B),
    C_0 = () => ("resize" in ArrayBuffer.prototype),
    eeB = {
        init: peB,
        convertChunk: {
            string: ieB,
            buffer: W_0,
            arrayBuffer: W_0,
            dataView: J_0,
            typedArray: J_0,
            others: tW1
        },
        getSize: eW1,
        truncateChunk: aeB,
        addChunk: seB,
        getFinalChunk: im1,
        finalize: teB
    };
async function AJ1(A, B) {
    if (!("Buffer" in globalThis)) throw new Error("getStreamAsBuffer() is only supported in Node.js");
    try {
        return K_0(await am1(A, B))
    } catch (Q) {
        if (Q.bufferedData !== void 0) Q.bufferedData = K_0(Q.bufferedData);
        throw Q
    }
}
var K_0 = (A) => globalThis.Buffer.from(A);
async function sm1(A, B) {
    return S21(A, D19, B)
}
var A19 = () => ({
        contents: "",
        textDecoder: new TextDecoder
    }),
    BJ1 = (A, {
        textDecoder: B
    }) => B.decode(A, {
        stream: !0
    }),
    B19 = (A, {
        contents: B
    }) => B + A,
    Q19 = (A, B) => A.slice(0, B),
    Z19 = ({
        textDecoder: A
    }) => {
        let B = A.decode();
        return B === "" ? void 0 : B
    },
    D19 = {
        init: A19,
        convertChunk: {
            string: pm1,
            buffer: BJ1,
            arrayBuffer: BJ1,
            dataView: BJ1,
            typedArray: BJ1,
            others: tW1
        },
        getSize: eW1,
        truncateChunk: Q19,
        addChunk: B19,
        getFinalChunk: Z19,
        finalize: nm1
    };
var E_0 = G1(z_0(), 1),
    U_0 = (A) => {
        if (A !== void 0) throw new TypeError("The `input` and `inputFile` options cannot be both set.")
    },
    W19 = ({
        input: A,
        inputFile: B
    }) => {
        if (typeof B !== "string") return A;
        return U_0(A), I19(B)
    },
    w_0 = (A) => {
        let B = W19(A);
        if (oW1(B)) throw new TypeError("The `input` option cannot be a stream in sync mode");
        return B
    },
    J19 = ({
        input: A,
        inputFile: B
    }) => {
        if (typeof B !== "string") return A;
        return U_0(A), F19(B)
    },
    $_0 = (A, B) => {
        let Q = J19(B);
        if (Q === void 0) return;
        if (oW1(Q)) Q.pipe(A.stdin);
        else A.stdin.end(Q)
    },
    q_0 = (A, {
        all: B
    }) => {
        if (!B || !A.stdout && !A.stderr) return;
        let Q = E_0.default();
        if (A.stdout) Q.add(A.stdout);
        if (A.stderr) Q.add(A.stderr);
        return Q
    },
    rm1 = async (A, B) => {
        if (!A || B === void 0) return;
        await Y19(0), A.destroy();
        try {
            return await B
        } catch (Q) {
            return Q.bufferedData
        }
    }, om1 = (A, {
        encoding: B,
        buffer: Q,
        maxBuffer: Z
    }) => {
        if (!A || !Q) return;
        if (B === "utf8" || B === "utf-8") return sm1(A, {
            maxBuffer: Z
        });
        if (B === null || B === "buffer") return AJ1(A, {
            maxBuffer: Z
        });
        return X19(A, Z, B)
    }, X19 = async (A, B, Q) => {
        return (await AJ1(A, {
            maxBuffer: B
        })).toString(Q)
    }, N_0 = async ({
        stdout: A,
        stderr: B,
        all: Q
    }, {
        encoding: Z,
        buffer: D,
        maxBuffer: G
    }, F) => {
        let I = om1(A, {
                encoding: Z,
                buffer: D,
                maxBuffer: G
            }),
            Y = om1(B, {
                encoding: Z,
                buffer: D,
                maxBuffer: G
            }),
            W = om1(Q, {
                encoding: Z,
                buffer: D,
                maxBuffer: G * 2
            });
        try {
            return await Promise.all([F, I, Y, W])
        } catch (J) {
            return Promise.all([{
                error: J,
                signal: J.signal,
                timedOut: J.timedOut
            }, rm1(A, I), rm1(B, Y), rm1(Q, W)])
        }
    };
var V19 = (async () => {})().constructor.prototype,
    C19 = ["then", "catch", "finally"].map((A) => [A, Reflect.getOwnPropertyDescriptor(V19, A)]),
    tm1 = (A, B) => {
        for (let [Q, Z] of C19) {
            let D = typeof B === "function" ? (...G) => Reflect.apply(Z.value, B(), G) : Z.value.bind(B);
            Reflect.defineProperty(A, Q, {
                ...Z,
                value: D
            })
        }
    },
    L_0 = (A) => new Promise((B, Q) => {
        if (A.on("exit", (Z, D) => {
                B({
                    exitCode: Z,
                    signal: D
                })
            }), A.on("error", (Z) => {
                Q(Z)
            }), A.stdin) A.stdin.on("error", (Z) => {
            Q(Z)
        })
    });
import {
    Buffer as K19
} from "node:buffer";
import {
    ChildProcess as H19
} from "node:child_process";
var O_0 = (A, B = []) => {
        if (!Array.isArray(B)) return [A];
        return [A, ...B]
    },
    z19 = /^[\w.-]+$/,
    E19 = (A) => {
        if (typeof A !== "string" || z19.test(A)) return A;
        return `"${A.replaceAll('"',"\\\"")}"`
    },
    em1 = (A, B) => O_0(A, B).join(" "),
    Ad1 = (A, B) => O_0(A, B).map((Q) => E19(Q)).join(" "),
    U19 = / +/g;
var M_0 = (A) => {
        let B = typeof A;
        if (B === "string") return A;
        if (B === "number") return String(A);
        if (B === "object" && A !== null && !(A instanceof H19) && "stdout" in A) {
            let Q = typeof A.stdout;
            if (Q === "string") return A.stdout;
            if (K19.isBuffer(A.stdout)) return A.stdout.toString();
            throw new TypeError(`Unexpected "${Q}" stdout in template expression`)
        }
        throw new TypeError(`Unexpected "${B}" in template expression`)
    },
    R_0 = (A, B, Q) => Q || A.length === 0 || B.length === 0 ? [...A, ...B] : [...A.slice(0, -1), `${A.at(-1)}${B[0]}`, ...B.slice(1)],
    w19 = ({
        templates: A,
        expressions: B,
        tokens: Q,
        index: Z,
        template: D
    }) => {
        let G = D ?? A.raw[Z],
            F = G.split(U19).filter(Boolean),
            I = R_0(Q, F, G.startsWith(" "));
        if (Z === B.length) return I;
        let Y = B[Z],
            W = Array.isArray(Y) ? Y.map((J) => M_0(J)) : [M_0(Y)];
        return R_0(I, W, G.endsWith(" "))
    },
    Bd1 = (A, B) => {
        let Q = [];
        for (let [Z, D] of A.entries()) Q = w19({
            templates: A,
            expressions: B,
            tokens: Q,
            index: Z,
            template: D
        });
        return Q
    };
import {
    debuglog as $19
} from "node:util";
import q19 from "node:process";
var T_0 = $19("execa").enabled,
    QJ1 = (A, B) => String(A).padStart(B, "0"),
    N19 = () => {
        let A = new Date;
        return `${QJ1(A.getHours(),2)}:${QJ1(A.getMinutes(),2)}:${QJ1(A.getSeconds(),2)}.${QJ1(A.getMilliseconds(),3)}`
    },
    Qd1 = (A, {
        verbose: B
    }) => {
        if (!B) return;
        q19.stderr.write(`[${N19()}] ${A}
`)
    };
var R19 = 1e8,
    O19 = ({
        env: A,
        extendEnv: B,
        preferLocal: Q,
        localDir: Z,
        execPath: D
    }) => {
        let G = B ? {
            ...ZJ1.env,
            ...A
        } : A;
        if (Q) return cy0({
            env: G,
            cwd: Z,
            execPath: D
        });
        return G
    },
    j_0 = (A, B, Q = {}) => {
        let Z = S_0.default._parse(A, B, Q);
        if (A = Z.command, B = Z.args, Q = Z.options, Q = {
                maxBuffer: R19,
                buffer: !0,
                stripFinalNewline: !0,
                extendEnv: !0,
                preferLocal: !1,
                localDir: Q.cwd || ZJ1.cwd(),
                execPath: ZJ1.execPath,
                encoding: "utf8",
                reject: !0,
                cleanup: !0,
                all: !1,
                windowsHide: !0,
                verbose: T_0,
                ...Q
            }, Q.env = O19(Q), Q.stdio = ry0(Q), ZJ1.platform === "win32" && M19.basename(A, ".exe") === "cmd") B.unshift("/q");
        return {
            file: A,
            args: B,
            options: Q,
            parsed: Z
        }
    },
    j21 = (A, B, Q) => {
        if (typeof B !== "string" && !L19.isBuffer(B)) return Q === void 0 ? void 0 : "";
        if (A.stripFinalNewline) return xm1(B);
        return B
    };

function Dd1(A, B, Q) {
    let Z = j_0(A, B, Q),
        D = em1(A, B),
        G = Ad1(A, B);
    Qd1(G, Z.options), Z_0(Z.options);
    let F;
    try {
        F = Zd1.spawn(Z.file, Z.args, Z.options)
    } catch (C) {
        let K = new Zd1.ChildProcess,
            H = Promise.reject(P21({
                error: C,
                stdout: "",
                stderr: "",
                all: "",
                command: D,
                escapedCommand: G,
                parsed: Z,
                timedOut: !1,
                isCanceled: !1,
                killed: !1
            }));
        return tm1(K, H), K
    }
    let I = L_0(F),
        Y = Q_0(F, Z.options, I),
        W = D_0(F, Z.options, Y),
        J = {
            isCanceled: !1
        };
    F.kill = A_0.bind(null, F.kill.bind(F)), F.cancel = B_0.bind(null, F, J);
    let V = py0(async () => {
        let [{
            error: C,
            exitCode: K,
            signal: H,
            timedOut: z
        }, $, L, N] = await N_0(F, Z.options, W), R = j21(Z.options, $), O = j21(Z.options, L), P = j21(Z.options, N);
        if (C || K !== 0 || H !== null) {
            let j = P21({
                error: C,
                exitCode: K,
                signal: H,
                stdout: R,
                stderr: O,
                all: P,
                command: D,
                escapedCommand: G,
                parsed: Z,
                timedOut: z,
                isCanceled: J.isCanceled || (Z.options.signal ? Z.options.signal.aborted : !1),
                killed: F.killed
            });
            if (!Z.options.reject) return j;
            throw j
        }
        return {
            command: D,
            escapedCommand: G,
            exitCode: 0,
            stdout: R,
            stderr: O,
            all: P,
            failed: !1,
            timedOut: !1,
            isCanceled: !1,
            killed: !1
        }
    });
    return $_0(F, Z.options), F.all = q_0(F, Z.options), G_0(F), tm1(F, V), F
}

function Gd1(A, B, Q) {
    let Z = j_0(A, B, Q),
        D = em1(A, B),
        G = Ad1(A, B);
    Qd1(G, Z.options);
    let F = w_0(Z.options),
        I;
    try {
        I = Zd1.spawnSync(Z.file, Z.args, {
            ...Z.options,
            input: F
        })
    } catch (J) {
        throw P21({
            error: J,
            stdout: "",
            stderr: "",
            all: "",
            command: D,
            escapedCommand: G,
            parsed: Z,
            timedOut: !1,
            isCanceled: !1,
            killed: !1
        })
    }
    let Y = j21(Z.options, I.stdout, I.error),
        W = j21(Z.options, I.stderr, I.error);
    if (I.error || I.status !== 0 || I.signal !== null) {
        let J = P21({
            stdout: Y,
            stderr: W,
            error: I.error,
            signal: I.signal,
            exitCode: I.status,
            command: D,
            escapedCommand: G,
            parsed: Z,
            timedOut: I.error && I.error.code === "ETIMEDOUT",
            isCanceled: !1,
            killed: I.signal !== null
        });
        if (!Z.options.reject) return J;
        throw J
    }
    return {
        command: D,
        escapedCommand: G,
        exitCode: 0,
        stdout: Y,
        stderr: W,
        failed: !1,
        timedOut: !1,
        isCanceled: !1,
        killed: !1
    }
}
var T19 = ({
        input: A,
        inputFile: B,
        stdio: Q
    }) => A === void 0 && B === void 0 && Q === void 0 ? {
        stdin: "inherit"
    } : {},
    P_0 = (A = {}) => ({
        preferLocal: !0,
        ...T19(A),
        ...A
    });

function k_0(A) {
    function B(Q, ...Z) {
        if (!Array.isArray(Q)) return k_0({
            ...A,
            ...Q
        });
        let [D, ...G] = Bd1(Q, Z);
        return Dd1(D, G, P_0(A))
    }
    return B.sync = (Q, ...Z) => {
        if (!Array.isArray(Q)) throw new TypeError("Please use $(options).sync`command` instead of $.sync(options)`command`.");
        let [D, ...G] = Bd1(Q, Z);
        return Gd1(D, G, P_0(A))
    }, B
}
var dm8 = k_0();

function Fd1() {
    return Lk0()
}

function t0() {
    try {
        return Fd1()
    } catch {
        return _9()
    }
}
import {
    dirname as Ki4,
    join as bG0
} from "path";
var dL = G1(Bp1(), 1);
import {
    execSync as Vi4
} from "child_process";
import {
    dirname as R02,
    join as D81,
    resolve as Q81
} from "path";
var O02 = G1(Bp1(), 1);
var np0 = (A = 0) => (B) => `\x1B[${B+A}m`,
    ap0 = (A = 0) => (B) => `\x1B[${38+A};5;${B}m`,
    sp0 = (A = 0) => (B, Q, Z) => `\x1B[${38+A};2;${B};${Q};${Z}m`,
    ZZ = {
        modifier: {
            reset: [0, 0],
            bold: [1, 22],
            dim: [2, 22],
            italic: [3, 23],
            underline: [4, 24],
            overline: [53, 55],
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
            gray: [90, 39],
            grey: [90, 39],
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
            bgGray: [100, 49],
            bgGrey: [100, 49],
            bgRedBright: [101, 49],
            bgGreenBright: [102, 49],
            bgYellowBright: [103, 49],
            bgBlueBright: [104, 49],
            bgMagentaBright: [105, 49],
            bgCyanBright: [106, 49],
            bgWhiteBright: [107, 49]
        }
    },
    yp8 = Object.keys(ZZ.modifier),
    nR9 = Object.keys(ZZ.color),
    aR9 = Object.keys(ZZ.bgColor),
    _p8 = [...nR9, ...aR9];

function sR9() {
    let A = new Map;
    for (let [B, Q] of Object.entries(ZZ)) {
        for (let [Z, D] of Object.entries(Q)) ZZ[Z] = {
            open: `\x1B[${D[0]}m`,
            close: `\x1B[${D[1]}m`
        }, Q[Z] = ZZ[Z], A.set(D[0], D[1]);
        Object.defineProperty(ZZ, B, {
            value: Q,
            enumerable: !1
        })
    }
    return Object.defineProperty(ZZ, "codes", {
        value: A,
        enumerable: !1
    }), ZZ.color.close = "\x1B[39m", ZZ.bgColor.close = "\x1B[49m", ZZ.color.ansi = np0(), ZZ.color.ansi256 = ap0(), ZZ.color.ansi16m = sp0(), ZZ.bgColor.ansi = np0(10), ZZ.bgColor.ansi256 = ap0(10), ZZ.bgColor.ansi16m = sp0(10), Object.defineProperties(ZZ, {
        rgbToAnsi256: {
            value(B, Q, Z) {
                if (B === Q && Q === Z) {
                    if (B < 8) return 16;
                    if (B > 248) return 231;
                    return Math.round((B - 8) / 247 * 24) + 232
                }
                return 16 + 36 * Math.round(B / 255 * 5) + 6 * Math.round(Q / 255 * 5) + Math.round(Z / 255 * 5)
            },
            enumerable: !1
        },
        hexToRgb: {
            value(B) {
                let Q = /[a-f\d]{6}|[a-f\d]{3}/i.exec(B.toString(16));
                if (!Q) return [0, 0, 0];
                let [Z] = Q;
                if (Z.length === 3) Z = [...Z].map((G) => G + G).join("");
                let D = Number.parseInt(Z, 16);
                return [D >> 16 & 255, D >> 8 & 255, D & 255]
            },
            enumerable: !1
        },
        hexToAnsi256: {
            value: (B) => ZZ.rgbToAnsi256(...ZZ.hexToRgb(B)),
            enumerable: !1
        },
        ansi256ToAnsi: {
            value(B) {
                if (B < 8) return 30 + B;
                if (B < 16) return 90 + (B - 8);
                let Q, Z, D;
                if (B >= 232) Q = ((B - 232) * 10 + 8) / 255, Z = Q, D = Q;
                else {
                    B -= 16;
                    let I = B % 36;
                    Q = Math.floor(B / 36) / 5, Z = Math.floor(I / 6) / 5, D = I % 6 / 5
                }
                let G = Math.max(Q, Z, D) * 2;
                if (G === 0) return 30;
                let F = 30 + (Math.round(D) << 2 | Math.round(Z) << 1 | Math.round(Q));
                if (G === 2) F += 60;
                return F
            },
            enumerable: !1
        },
        rgbToAnsi: {
            value: (B, Q, Z) => ZZ.ansi256ToAnsi(ZZ.rgbToAnsi256(B, Q, Z)),
            enumerable: !1
        },
        hexToAnsi: {
            value: (B) => ZZ.ansi256ToAnsi(ZZ.hexToAnsi256(B)),
            enumerable: !1
        }
    }), ZZ
}
var rR9 = sR9(),
    Fw = rR9;
import Qp1 from "node:process";
import oR9 from "node:os";
import rp0 from "node:tty";

function eH(A, B = globalThis.Deno ? globalThis.Deno.args : Qp1.argv) {
    let Q = A.startsWith("-") ? "" : A.length === 1 ? "-" : "--",
        Z = B.indexOf(Q + A),
        D = B.indexOf("--");
    return Z !== -1 && (D === -1 || Z < D)
}
var {
    env: YD
} = Qp1, ZV1;
if (eH("no-color") || eH("no-colors") || eH("color=false") || eH("color=never")) ZV1 = 0;
else if (eH("color") || eH("colors") || eH("color=true") || eH("color=always")) ZV1 = 1;

function tR9() {
    if ("FORCE_COLOR" in YD) {
        if (YD.FORCE_COLOR === "true") return 1;
        if (YD.FORCE_COLOR === "false") return 0;
        return YD.FORCE_COLOR.length === 0 ? 1 : Math.min(Number.parseInt(YD.FORCE_COLOR, 10), 3)
    }
}

function eR9(A) {
    if (A === 0) return !1;
    return {
        level: A,
        hasBasic: !0,
        has256: A >= 2,
        has16m: A >= 3
    }
}