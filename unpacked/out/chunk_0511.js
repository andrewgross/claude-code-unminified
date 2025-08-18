/* chunk:511 bytes:[12130184, 12150193) size:20009 source:unpacked-cli.js */
function IQ4(A, B, Q, Z) {
    let {
        rgPath: D,
        rgArgs: G
    } = CQ0();
    return DQ4(D, [...G, ...A, B], {
        maxBuffer: 20000000,
        signal: Q,
        timeout: 1e4
    }, Z)
}
async function cy(A, B, Q) {
    if (!vz()) await YQ4();
    return new Promise((Z) => {
        IQ4(A, B, Q, (D, G, F) => {
            if (D)
                if (D.code !== 1 && D.code !== 2) n1("rg spawn failed: " + D), R1(D), Z([]);
                else if (D.code === 2 && G && G.trim().length > 0) Z(G.trim().split(`
`).filter(Boolean));
            else {
                if (D.code === 2) n1("rg error (2) with no stdout: " + JSON.stringify(D) + F);
                Z([])
            } else Z(G.trim().split(`
`).filter(Boolean))
        })
    })
}
async function wlA(A, B, Q) {
    try {
        return (await cy(["-l", "."], A, B)).slice(0, Q)
    } catch {
        return []
    }
}
var v$1 = EA(async (A, B, Q = []) => {
        try {
            let Z = ["--files", "--hidden"];
            Q.forEach((Y) => {
                Z.push("--glob", `!${Y}`)
            });
            let G = (await cy(Z, A, B)).length;
            if (G === 0) return 0;
            let F = Math.floor(Math.log10(G)),
                I = Math.pow(10, F);
            return Math.round(G / I) * I
        } catch (Z) {
            R1(Z instanceof Error ? Z : new Error(String(Z)))
        }
    }),
    ElA = !1;
async function YQ4() {
    if (process.platform !== "darwin" || ElA) return;
    if (ElA = !0, !(await F2("codesign", ["-vv", "-d", x$1()], {
            preserveOutputOnError: !1
        })).stdout.split(`
`).find((Q) => Q.includes("linker-signed"))) return;
    try {
        let Q = await F2("codesign", ["--sign", "-", "--force", "--preserve-metadata=entitlements,requirements,flags,runtime", x$1()]);
        if (Q.code !== 0) R1(new Error(`Failed to sign ripgrep: ${Q.stdout} ${Q.stderr}`));
        let Z = await F2("xattr", ["-d", "com.apple.quarantine", x$1()]);
        if (Z.code !== 0) R1(new Error(`Failed to remove quarantine: ${Z.stdout} ${Z.stderr}`))
    } catch (Q) {
        R1(Q)
    }
}
var reA = G1(q61(), 1);
var oeA = G1(cQ0(), 1);
import {
    homedir as teA
} from "os";
class xtA {
    cache = new Map;
    maxCacheSize = 1000;
    readFile(A) {
        let B = j1(),
            Q;
        try {
            Q = B.statSync(A)
        } catch (I) {
            throw this.cache.delete(A), I
        }
        let Z = A,
            D = this.cache.get(Z);
        if (D && D.mtime === Q.mtimeMs) return {
            content: D.content,
            encoding: D.encoding
        };
        let G = jY(A),
            F = B.readFileSync(A, {
                encoding: G
            }).replaceAll(`\r
`, `
`);
        if (this.cache.set(Z, {
                content: F,
                encoding: G,
                mtime: Q.mtimeMs
            }), this.cache.size > this.maxCacheSize) {
            let I = this.cache.keys().next().value;
            if (I) this.cache.delete(I)
        }
        return {
            content: F,
            encoding: G
        }
    }
    clear() {
        this.cache.clear()
    }
    invalidate(A) {
        this.cache.delete(A)
    }
    getStats() {
        return {
            size: this.cache.size,
            entries: Array.from(this.cache.keys())
        }
    }
}
var vtA = new xtA;
import {
    isAbsolute as DG4,
    join as GG4,
    posix as xg,
    resolve as $40,
    sep as FG4
} from "path";
import {
    execSync as iQ0
} from "node:child_process";
import * as ptA from "node:path/win32";
var itA = G1(gw(), 1);

function pQ0(A) {
    try {
        return iQ0(`dir "${A}"`, {
            stdio: "pipe"
        }), !0
    } catch {
        return !1
    }
}

function $Z4(A) {
    if (A === "git") {
        let B = ["C:\\Program Files\\Git\\cmd\\git.exe", "C:\\Program Files (x86)\\Git\\cmd\\git.exe"];
        for (let Q of B)
            if (pQ0(Q)) return Q
    }
    try {
        return iQ0(`where.exe ${A}`, {
            stdio: "pipe",
            encoding: "utf8"
        }).trim().split(`\r
`)[0] || null
    } catch {
        return null
    }
}
var ntA = () => {
        if (L9() === "windows") {
            let A = atA();
            process.env.SHELL = A, n1(`Using bash path: "${A}"`)
        }
    },
    atA = EA(() => {
        if (process.env.CLAUDE_CODE_GIT_BASH_PATH) {
            if (pQ0(process.env.CLAUDE_CODE_GIT_BASH_PATH)) return process.env.CLAUDE_CODE_GIT_BASH_PATH;
            console.error(`Claude Code was unable to find CLAUDE_CODE_GIT_BASH_PATH path "${process.env.CLAUDE_CODE_GIT_BASH_PATH}"`), process.exit(1)
        }
        let A = $Z4("git");
        if (A) {
            let B = ptA.join(A, "..", "..", "bin", "bash.exe");
            if (pQ0(B)) return B
        }
        console.error("Claude Code on Windows requires git-bash (https://git-scm.com/downloads/win). If installed but not in PATH, set environment variable pointing to your bash.exe, similar to: CLAUDE_CODE_GIT_BASH_PATH=C:\\Program Files\\Git\\bin\\bash.exe"), process.exit(1)
    }),
    Js = (A) => {
        let B = itA.quote([A]);
        return iQ0(`cygpath -u ${B}`, {
            shell: atA()
        }).toString().trim()
    };
import {
    join as Cs
} from "path";
import {
    basename as kZ4
} from "path";
import {
    readFile as PZ4
} from "fs/promises";

function T61(A, B = !1) {
    let Q = A.length,
        Z = 0,
        D = "",
        G = 0,
        F = 16,
        I = 0,
        Y = 0,
        W = 0,
        J = 0,
        X = 0;

    function V(N, R) {
        let O = 0,
            P = 0;
        while (O < N || !R) {
            let j = A.charCodeAt(Z);
            if (j >= 48 && j <= 57) P = P * 16 + j - 48;
            else if (j >= 65 && j <= 70) P = P * 16 + j - 65 + 10;
            else if (j >= 97 && j <= 102) P = P * 16 + j - 97 + 10;
            else break;
            Z++, O++
        }
        if (O < N) P = -1;
        return P
    }

    function C(N) {
        Z = N, D = "", G = 0, F = 16, X = 0
    }

    function K() {
        let N = Z;
        if (A.charCodeAt(Z) === 48) Z++;
        else {
            Z++;
            while (Z < A.length && Xs(A.charCodeAt(Z))) Z++
        }
        if (Z < A.length && A.charCodeAt(Z) === 46)
            if (Z++, Z < A.length && Xs(A.charCodeAt(Z))) {
                Z++;
                while (Z < A.length && Xs(A.charCodeAt(Z))) Z++
            } else return X = 3, A.substring(N, Z);
        let R = Z;
        if (Z < A.length && (A.charCodeAt(Z) === 69 || A.charCodeAt(Z) === 101)) {
            if (Z++, Z < A.length && A.charCodeAt(Z) === 43 || A.charCodeAt(Z) === 45) Z++;
            if (Z < A.length && Xs(A.charCodeAt(Z))) {
                Z++;
                while (Z < A.length && Xs(A.charCodeAt(Z))) Z++;
                R = Z
            } else X = 3
        }
        return A.substring(N, R)
    }

    function H() {
        let N = "",
            R = Z;
        while (!0) {
            if (Z >= Q) {
                N += A.substring(R, Z), X = 2;
                break
            }
            let O = A.charCodeAt(Z);
            if (O === 34) {
                N += A.substring(R, Z), Z++;
                break
            }
            if (O === 92) {
                if (N += A.substring(R, Z), Z++, Z >= Q) {
                    X = 2;
                    break
                }
                switch (A.charCodeAt(Z++)) {
                    case 34:
                        N += '"';
                        break;
                    case 92:
                        N += "\\";
                        break;
                    case 47:
                        N += "/";
                        break;
                    case 98:
                        N += "\b";
                        break;
                    case 102:
                        N += "\f";
                        break;
                    case 110:
                        N += `
`;
                        break;
                    case 114:
                        N += "\r";
                        break;
                    case 116:
                        N += "\t";
                        break;
                    case 117:
                        let j = V(4, !0);
                        if (j >= 0) N += String.fromCharCode(j);
                        else X = 4;
                        break;
                    default:
                        X = 5
                }
                R = Z;
                continue
            }
            if (O >= 0 && O <= 31)
                if (O61(O)) {
                    N += A.substring(R, Z), X = 2;
                    break
                } else X = 6;
            Z++
        }
        return N
    }

    function z() {
        if (D = "", X = 0, G = Z, Y = I, J = W, Z >= Q) return G = Q, F = 17;
        let N = A.charCodeAt(Z);
        if (nQ0(N)) {
            do Z++, D += String.fromCharCode(N), N = A.charCodeAt(Z); while (nQ0(N));
            return F = 15
        }
        if (O61(N)) {
            if (Z++, D += String.fromCharCode(N), N === 13 && A.charCodeAt(Z) === 10) Z++, D += `
`;
            return I++, W = Z, F = 14
        }
        switch (N) {
            case 123:
                return Z++, F = 1;
            case 125:
                return Z++, F = 2;
            case 91:
                return Z++, F = 3;
            case 93:
                return Z++, F = 4;
            case 58:
                return Z++, F = 6;
            case 44:
                return Z++, F = 5;
            case 34:
                return Z++, D = H(), F = 10;
            case 47:
                let R = Z - 1;
                if (A.charCodeAt(Z + 1) === 47) {
                    Z += 2;
                    while (Z < Q) {
                        if (O61(A.charCodeAt(Z))) break;
                        Z++
                    }
                    return D = A.substring(R, Z), F = 12
                }
                if (A.charCodeAt(Z + 1) === 42) {
                    Z += 2;
                    let O = Q - 1,
                        P = !1;
                    while (Z < O) {
                        let j = A.charCodeAt(Z);
                        if (j === 42 && A.charCodeAt(Z + 1) === 47) {
                            Z += 2, P = !0;
                            break
                        }
                        if (Z++, O61(j)) {
                            if (j === 13 && A.charCodeAt(Z) === 10) Z++;
                            I++, W = Z
                        }
                    }
                    if (!P) Z++, X = 1;
                    return D = A.substring(R, Z), F = 13
                }
                return D += String.fromCharCode(N), Z++, F = 16;
            case 45:
                if (D += String.fromCharCode(N), Z++, Z === Q || !Xs(A.charCodeAt(Z))) return F = 16;
            case 48:
            case 49:
            case 50:
            case 51:
            case 52:
            case 53:
            case 54:
            case 55:
            case 56:
            case 57:
                return D += K(), F = 11;
            default:
                while (Z < Q && $(N)) Z++, N = A.charCodeAt(Z);
                if (G !== Z) {
                    switch (D = A.substring(G, Z), D) {
                        case "true":
                            return F = 8;
                        case "false":
                            return F = 9;
                        case "null":
                            return F = 7
                    }
                    return F = 16
                }
                return D += String.fromCharCode(N), Z++, F = 16
        }
    }

    function $(N) {
        if (nQ0(N) || O61(N)) return !1;
        switch (N) {
            case 125:
            case 93:
            case 123:
            case 91:
            case 34:
            case 58:
            case 44:
            case 47:
                return !1
        }
        return !0
    }

    function L() {
        let N;
        do N = z(); while (N >= 12 && N <= 15);
        return N
    }
    return {
        setPosition: C,
        getPosition: () => Z,
        scan: B ? L : z,
        getToken: () => F,
        getTokenValue: () => D,
        getTokenOffset: () => G,
        getTokenLength: () => Z - G,
        getTokenStartLine: () => Y,
        getTokenStartCharacter: () => G - J,
        getTokenError: () => X
    }
}

function nQ0(A) {
    return A === 32 || A === 9
}

function O61(A) {
    return A === 10 || A === 13
}

function Xs(A) {
    return A >= 48 && A <= 57
}
var stA;
(function(A) {
    A[A.lineFeed = 10] = "lineFeed", A[A.carriageReturn = 13] = "carriageReturn", A[A.space = 32] = "space", A[A._0 = 48] = "_0", A[A._1 = 49] = "_1", A[A._2 = 50] = "_2", A[A._3 = 51] = "_3", A[A._4 = 52] = "_4", A[A._5 = 53] = "_5", A[A._6 = 54] = "_6", A[A._7 = 55] = "_7", A[A._8 = 56] = "_8", A[A._9 = 57] = "_9", A[A.a = 97] = "a", A[A.b = 98] = "b", A[A.c = 99] = "c", A[A.d = 100] = "d", A[A.e = 101] = "e", A[A.f = 102] = "f", A[A.g = 103] = "g", A[A.h = 104] = "h", A[A.i = 105] = "i", A[A.j = 106] = "j", A[A.k = 107] = "k", A[A.l = 108] = "l", A[A.m = 109] = "m", A[A.n = 110] = "n", A[A.o = 111] = "o", A[A.p = 112] = "p", A[A.q = 113] = "q", A[A.r = 114] = "r", A[A.s = 115] = "s", A[A.t = 116] = "t", A[A.u = 117] = "u", A[A.v = 118] = "v", A[A.w = 119] = "w", A[A.x = 120] = "x", A[A.y = 121] = "y", A[A.z = 122] = "z", A[A.A = 65] = "A", A[A.B = 66] = "B", A[A.C = 67] = "C", A[A.D = 68] = "D", A[A.E = 69] = "E", A[A.F = 70] = "F", A[A.G = 71] = "G", A[A.H = 72] = "H", A[A.I = 73] = "I", A[A.J = 74] = "J", A[A.K = 75] = "K", A[A.L = 76] = "L", A[A.M = 77] = "M", A[A.N = 78] = "N", A[A.O = 79] = "O", A[A.P = 80] = "P", A[A.Q = 81] = "Q", A[A.R = 82] = "R", A[A.S = 83] = "S", A[A.T = 84] = "T", A[A.U = 85] = "U", A[A.V = 86] = "V", A[A.W = 87] = "W", A[A.X = 88] = "X", A[A.Y = 89] = "Y", A[A.Z = 90] = "Z", A[A.asterisk = 42] = "asterisk", A[A.backslash = 92] = "backslash", A[A.closeBrace = 125] = "closeBrace", A[A.closeBracket = 93] = "closeBracket", A[A.colon = 58] = "colon", A[A.comma = 44] = "comma", A[A.dot = 46] = "dot", A[A.doubleQuote = 34] = "doubleQuote", A[A.minus = 45] = "minus", A[A.openBrace = 123] = "openBrace", A[A.openBracket = 91] = "openBracket", A[A.plus = 43] = "plus", A[A.slash = 47] = "slash", A[A.formFeed = 12] = "formFeed", A[A.tab = 9] = "tab"
})(stA || (stA = {}));
var XK = new Array(20).fill(0).map((A, B) => {
    return " ".repeat(B)
});
var aQ0 = {
        " ": {
            "\n": new Array(200).fill(0).map((A, B) => {
                return `
` + " ".repeat(B)
            }),
            "\r": new Array(200).fill(0).map((A, B) => {
                return "\r" + " ".repeat(B)
            }),
            "\r\n": new Array(200).fill(0).map((A, B) => {
                return `\r
` + " ".repeat(B)
            })
        },
        "\t": {
            "\n": new Array(200).fill(0).map((A, B) => {
                return `
` + "\t".repeat(B)
            }),
            "\r": new Array(200).fill(0).map((A, B) => {
                return "\r" + "\t".repeat(B)
            }),
            "\r\n": new Array(200).fill(0).map((A, B) => {
                return `\r
` + "\t".repeat(B)
            })
        }
    },
    rtA = [`
`, "\r", `\r
`];

function sQ0(A, B, Q) {
    let Z, D, G, F, I;
    if (B) {
        F = B.offset, I = F + B.length, G = F;
        while (G > 0 && !P61(A, G - 1)) G--;
        let O = I;
        while (O < A.length && !P61(A, O)) O++;
        D = A.substring(G, O), Z = NZ4(D, Q)
    } else D = A, Z = 0, G = 0, F = 0, I = A.length;
    let Y = LZ4(Q, A),
        W = rtA.includes(Y),
        J = 0,
        X = 0,
        V;
    if (Q.insertSpaces) V = XK[Q.tabSize || 4] ?? Vs(XK[1], Q.tabSize || 4);
    else V = "\t";
    let C = V === "\t" ? "\t" : " ",
        K = T61(D, !1),
        H = !1;

    function z() {
        if (J > 1) return Vs(Y, J) + Vs(V, Z + X);
        let O = V.length * (Z + X);
        if (!W || O > aQ0[C][Y].length) return Y + Vs(V, Z + X);
        if (O <= 0) return Y;
        return aQ0[C][Y][O]
    }

    function $() {
        let O = K.scan();
        J = 0;
        while (O === 15 || O === 14) {
            if (O === 14 && Q.keepLines) J += 1;
            else if (O === 14) J = 1;
            O = K.scan()
        }
        return H = O === 16 || K.getTokenError() !== 0, O
    }
    let L = [];

    function N(O, P, j) {
        if (!H && (!B || P < I && j > F) && A.substring(P, j) !== O) L.push({
            offset: P,
            length: j - P,
            content: O
        })
    }
    let R = $();
    if (Q.keepLines && J > 0) N(Vs(Y, J), 0, 0);
    if (R !== 17) {
        let O = K.getTokenOffset() + G,
            P = V.length * Z < 20 && Q.insertSpaces ? XK[V.length * Z] : Vs(V, Z);
        N(P, G, O)
    }
    while (R !== 17) {
        let O = K.getTokenOffset() + K.getTokenLength() + G,
            P = $(),
            j = "",
            f = !1;
        while (J === 0 && (P === 12 || P === 13)) {
            let c = K.getTokenOffset() + G;
            N(XK[1], O, c), O = K.getTokenOffset() + K.getTokenLength() + G, f = P === 12, j = f ? z() : "", P = $()
        }
        if (P === 2) {
            if (R !== 1) X--;
            if (Q.keepLines && J > 0 || !Q.keepLines && R !== 1) j = z();
            else if (Q.keepLines) j = XK[1]
        } else if (P === 4) {
            if (R !== 3) X--;
            if (Q.keepLines && J > 0 || !Q.keepLines && R !== 3) j = z();
            else if (Q.keepLines) j = XK[1]
        } else {
            switch (R) {
                case 3:
                case 1:
                    if (X++, Q.keepLines && J > 0 || !Q.keepLines) j = z();
                    else j = XK[1];
                    break;
                case 5:
                    if (Q.keepLines && J > 0 || !Q.keepLines) j = z();
                    else j = XK[1];
                    break;
                case 12:
                    j = z();
                    break;
                case 13:
                    if (J > 0) j = z();
                    else if (!f) j = XK[1];
                    break;
                case 6:
                    if (Q.keepLines && J > 0) j = z();
                    else if (!f) j = XK[1];
                    break;
                case 10:
                    if (Q.keepLines && J > 0) j = z();
                    else if (P === 6 && !f) j = "";
                    break;
                case 7:
                case 8:
                case 9:
                case 11:
                case 2:
                case 4:
                    if (Q.keepLines && J > 0) j = z();
                    else if ((P === 12 || P === 13) && !f) j = XK[1];
                    else if (P !== 5 && P !== 17) H = !0;
                    break;
                case 16:
                    H = !0;
                    break
            }
            if (J > 0 && (P === 12 || P === 13)) j = z()
        }
        if (P === 17)
            if (Q.keepLines && J > 0) j = z();
            else j = Q.insertFinalNewline ? Y : "";
        let k = K.getTokenOffset() + G;
        N(j, O, k), R = P
    }
    return L
}

function Vs(A, B) {
    let Q = "";
    for (let Z = 0; Z < B; Z++) Q += A;
    return Q
}

function NZ4(A, B) {
    let Q = 0,
        Z = 0,
        D = B.tabSize || 4;
    while (Q < A.length) {
        let G = A.charAt(Q);
        if (G === XK[1]) Z++;
        else if (G === "\t") Z += D;
        else break;
        Q++
    }
    return Math.floor(Z / D)
}

function LZ4(A, B) {
    for (let Q = 0; Q < B.length; Q++) {
        let Z = B.charAt(Q);
        if (Z === "\r") {
            if (Q + 1 < B.length && B.charAt(Q + 1) === `
`) return `\r
`;
            return "\r"
        } else if (Z === `
`) return `
`
    }
    return A && A.eol || `
`
}

function P61(A, B) {
    return `\r
`.indexOf(A.charAt(B)) !== -1
}
var S61;