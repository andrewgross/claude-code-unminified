/* chunk:532 bytes:[12538653, 12558060) size:19407 source:unpacked-cli.js */
async function KL2(A) {
    let B = await yn4({
        instantiateWasm(Q, Z) {
            WebAssembly.instantiate(A, Q).then((D) => {
                D instanceof WebAssembly.Instance ? Z(D) : Z(D.instance)
            })
        }
    });
    return CL2(B)
}
import {
    readFile as _n4
} from "node:fs/promises";
import {
    createRequire as xn4
} from "node:module";
var YO1 = await KL2(await _n4(xn4(import.meta.url).resolve("./yoga.wasm")));

function YF0({
    onlyFirst: A = !1
} = {}) {
    let Q = ["[\\u001B\\u009B][[\\]()#;?]*(?:(?:(?:(?:;[-a-zA-Z\\d\\/#&.:=?%@~_]+)*|[a-zA-Z\\d]+(?:;[-a-zA-Z\\d\\/#&.:=?%@~_]*)*)?(?:\\u0007|\\u001B\\u005C|\\u009C))", "(?:(?:\\d{1,4}(?:;\\d{0,4})*)?[\\dA-PR-TZcf-nq-uy=><~]))"].join("|");
    return new RegExp(Q, A ? void 0 : "g")
}
var vn4 = YF0();

function eG(A) {
    if (typeof A !== "string") throw new TypeError(`Expected a \`string\`, got \`${typeof A}\``);
    return A.replace(vn4, "")
}

function HL2(A) {
    return A === 161 || A === 164 || A === 167 || A === 168 || A === 170 || A === 173 || A === 174 || A >= 176 && A <= 180 || A >= 182 && A <= 186 || A >= 188 && A <= 191 || A === 198 || A === 208 || A === 215 || A === 216 || A >= 222 && A <= 225 || A === 230 || A >= 232 && A <= 234 || A === 236 || A === 237 || A === 240 || A === 242 || A === 243 || A >= 247 && A <= 250 || A === 252 || A === 254 || A === 257 || A === 273 || A === 275 || A === 283 || A === 294 || A === 295 || A === 299 || A >= 305 && A <= 307 || A === 312 || A >= 319 && A <= 322 || A === 324 || A >= 328 && A <= 331 || A === 333 || A === 338 || A === 339 || A === 358 || A === 359 || A === 363 || A === 462 || A === 464 || A === 466 || A === 468 || A === 470 || A === 472 || A === 474 || A === 476 || A === 593 || A === 609 || A === 708 || A === 711 || A >= 713 && A <= 715 || A === 717 || A === 720 || A >= 728 && A <= 731 || A === 733 || A === 735 || A >= 768 && A <= 879 || A >= 913 && A <= 929 || A >= 931 && A <= 937 || A >= 945 && A <= 961 || A >= 963 && A <= 969 || A === 1025 || A >= 1040 && A <= 1103 || A === 1105 || A === 8208 || A >= 8211 && A <= 8214 || A === 8216 || A === 8217 || A === 8220 || A === 8221 || A >= 8224 && A <= 8226 || A >= 8228 && A <= 8231 || A === 8240 || A === 8242 || A === 8243 || A === 8245 || A === 8251 || A === 8254 || A === 8308 || A === 8319 || A >= 8321 && A <= 8324 || A === 8364 || A === 8451 || A === 8453 || A === 8457 || A === 8467 || A === 8470 || A === 8481 || A === 8482 || A === 8486 || A === 8491 || A === 8531 || A === 8532 || A >= 8539 && A <= 8542 || A >= 8544 && A <= 8555 || A >= 8560 && A <= 8569 || A === 8585 || A >= 8592 && A <= 8601 || A === 8632 || A === 8633 || A === 8658 || A === 8660 || A === 8679 || A === 8704 || A === 8706 || A === 8707 || A === 8711 || A === 8712 || A === 8715 || A === 8719 || A === 8721 || A === 8725 || A === 8730 || A >= 8733 && A <= 8736 || A === 8739 || A === 8741 || A >= 8743 && A <= 8748 || A === 8750 || A >= 8756 && A <= 8759 || A === 8764 || A === 8765 || A === 8776 || A === 8780 || A === 8786 || A === 8800 || A === 8801 || A >= 8804 && A <= 8807 || A === 8810 || A === 8811 || A === 8814 || A === 8815 || A === 8834 || A === 8835 || A === 8838 || A === 8839 || A === 8853 || A === 8857 || A === 8869 || A === 8895 || A === 8978 || A >= 9312 && A <= 9449 || A >= 9451 && A <= 9547 || A >= 9552 && A <= 9587 || A >= 9600 && A <= 9615 || A >= 9618 && A <= 9621 || A === 9632 || A === 9633 || A >= 9635 && A <= 9641 || A === 9650 || A === 9651 || A === 9654 || A === 9655 || A === 9660 || A === 9661 || A === 9664 || A === 9665 || A >= 9670 && A <= 9672 || A === 9675 || A >= 9678 && A <= 9681 || A >= 9698 && A <= 9701 || A === 9711 || A === 9733 || A === 9734 || A === 9737 || A === 9742 || A === 9743 || A === 9756 || A === 9758 || A === 9792 || A === 9794 || A === 9824 || A === 9825 || A >= 9827 && A <= 9829 || A >= 9831 && A <= 9834 || A === 9836 || A === 9837 || A === 9839 || A === 9886 || A === 9887 || A === 9919 || A >= 9926 && A <= 9933 || A >= 9935 && A <= 9939 || A >= 9941 && A <= 9953 || A === 9955 || A === 9960 || A === 9961 || A >= 9963 && A <= 9969 || A === 9972 || A >= 9974 && A <= 9977 || A === 9979 || A === 9980 || A === 9982 || A === 9983 || A === 10045 || A >= 10102 && A <= 10111 || A >= 11094 && A <= 11097 || A >= 12872 && A <= 12879 || A >= 57344 && A <= 63743 || A >= 65024 && A <= 65039 || A === 65533 || A >= 127232 && A <= 127242 || A >= 127248 && A <= 127277 || A >= 127280 && A <= 127337 || A >= 127344 && A <= 127373 || A === 127375 || A === 127376 || A >= 127387 && A <= 127404 || A >= 917760 && A <= 917999 || A >= 983040 && A <= 1048573 || A >= 1048576 && A <= 1114109
}

function zL2(A) {
    return A === 12288 || A >= 65281 && A <= 65376 || A >= 65504 && A <= 65510
}

function EL2(A) {
    return A >= 4352 && A <= 4447 || A === 8986 || A === 8987 || A === 9001 || A === 9002 || A >= 9193 && A <= 9196 || A === 9200 || A === 9203 || A === 9725 || A === 9726 || A === 9748 || A === 9749 || A >= 9776 && A <= 9783 || A >= 9800 && A <= 9811 || A === 9855 || A >= 9866 && A <= 9871 || A === 9875 || A === 9889 || A === 9898 || A === 9899 || A === 9917 || A === 9918 || A === 9924 || A === 9925 || A === 9934 || A === 9940 || A === 9962 || A === 9970 || A === 9971 || A === 9973 || A === 9978 || A === 9981 || A === 9989 || A === 9994 || A === 9995 || A === 10024 || A === 10060 || A === 10062 || A >= 10067 && A <= 10069 || A === 10071 || A >= 10133 && A <= 10135 || A === 10160 || A === 10175 || A === 11035 || A === 11036 || A === 11088 || A === 11093 || A >= 11904 && A <= 11929 || A >= 11931 && A <= 12019 || A >= 12032 && A <= 12245 || A >= 12272 && A <= 12287 || A >= 12289 && A <= 12350 || A >= 12353 && A <= 12438 || A >= 12441 && A <= 12543 || A >= 12549 && A <= 12591 || A >= 12593 && A <= 12686 || A >= 12688 && A <= 12773 || A >= 12783 && A <= 12830 || A >= 12832 && A <= 12871 || A >= 12880 && A <= 42124 || A >= 42128 && A <= 42182 || A >= 43360 && A <= 43388 || A >= 44032 && A <= 55203 || A >= 63744 && A <= 64255 || A >= 65040 && A <= 65049 || A >= 65072 && A <= 65106 || A >= 65108 && A <= 65126 || A >= 65128 && A <= 65131 || A >= 94176 && A <= 94180 || A === 94192 || A === 94193 || A >= 94208 && A <= 100343 || A >= 100352 && A <= 101589 || A >= 101631 && A <= 101640 || A >= 110576 && A <= 110579 || A >= 110581 && A <= 110587 || A === 110589 || A === 110590 || A >= 110592 && A <= 110882 || A === 110898 || A >= 110928 && A <= 110930 || A === 110933 || A >= 110948 && A <= 110951 || A >= 110960 && A <= 111355 || A >= 119552 && A <= 119638 || A >= 119648 && A <= 119670 || A === 126980 || A === 127183 || A === 127374 || A >= 127377 && A <= 127386 || A >= 127488 && A <= 127490 || A >= 127504 && A <= 127547 || A >= 127552 && A <= 127560 || A === 127568 || A === 127569 || A >= 127584 && A <= 127589 || A >= 127744 && A <= 127776 || A >= 127789 && A <= 127797 || A >= 127799 && A <= 127868 || A >= 127870 && A <= 127891 || A >= 127904 && A <= 127946 || A >= 127951 && A <= 127955 || A >= 127968 && A <= 127984 || A === 127988 || A >= 127992 && A <= 128062 || A === 128064 || A >= 128066 && A <= 128252 || A >= 128255 && A <= 128317 || A >= 128331 && A <= 128334 || A >= 128336 && A <= 128359 || A === 128378 || A === 128405 || A === 128406 || A === 128420 || A >= 128507 && A <= 128591 || A >= 128640 && A <= 128709 || A === 128716 || A >= 128720 && A <= 128722 || A >= 128725 && A <= 128727 || A >= 128732 && A <= 128735 || A === 128747 || A === 128748 || A >= 128756 && A <= 128764 || A >= 128992 && A <= 129003 || A === 129008 || A >= 129292 && A <= 129338 || A >= 129340 && A <= 129349 || A >= 129351 && A <= 129535 || A >= 129648 && A <= 129660 || A >= 129664 && A <= 129673 || A >= 129679 && A <= 129734 || A >= 129742 && A <= 129756 || A >= 129759 && A <= 129769 || A >= 129776 && A <= 129784 || A >= 131072 && A <= 196605 || A >= 196608 && A <= 262141
}

function bn4(A) {
    if (!Number.isSafeInteger(A)) throw new TypeError(`Expected a code point, got \`${typeof A}\`.`)
}

function u_(A, {
    ambiguousAsWide: B = !1
} = {}) {
    if (bn4(A), zL2(A) || EL2(A) || B && HL2(A)) return 2;
    return 1
}
var $L2 = G1(wL2(), 1),
    fn4 = new Intl.Segmenter,
    hn4 = /^\p{Default_Ignorable_Code_Point}$/u;

function n51(A, B = {}) {
    if (typeof A !== "string" || A.length === 0) return 0;
    let {
        ambiguousIsNarrow: Q = !0,
        countAnsiEscapeCodes: Z = !1
    } = B;
    if (!Z) A = eG(A);
    if (A.length === 0) return 0;
    let D = 0,
        G = {
            ambiguousAsWide: !Q
        };
    for (let {
            segment: F
        }
        of fn4.segment(A)) {
        let I = F.codePointAt(0);
        if (I <= 31 || I >= 127 && I <= 159) continue;
        if (I >= 8203 && I <= 8207 || I === 65279) continue;
        if (I >= 768 && I <= 879 || I >= 6832 && I <= 6911 || I >= 7616 && I <= 7679 || I >= 8400 && I <= 8447 || I >= 65056 && I <= 65071) continue;
        if (I >= 55296 && I <= 57343) continue;
        if (I >= 65024 && I <= 65039) continue;
        if (hn4.test(F)) continue;
        if ($L2.default().test(F)) {
            D += 2;
            continue
        }
        D += u_(I, G)
    }
    return D
}

function ho(A) {
    let B = 0;
    for (let Q of A.split(`
`)) B = Math.max(B, n51(Q));
    return B
}
var qL2 = {},
    gn4 = (A) => {
        if (A.length === 0) return {
            width: 0,
            height: 0
        };
        let B = qL2[A];
        if (B) return B;
        let Q = ho(A),
            Z = A.split(`
`).length;
        return qL2[A] = {
            width: Q,
            height: Z
        }, {
            width: Q,
            height: Z
        }
    },
    WF0 = gn4;
var ML2 = G1(LL2(), 1),
    un4 = new Intl.Segmenter,
    mn4 = /^\p{Default_Ignorable_Code_Point}$/u;

function Ou(A, B = {}) {
    if (typeof A !== "string" || A.length === 0) return 0;
    let {
        ambiguousIsNarrow: Q = !0,
        countAnsiEscapeCodes: Z = !1
    } = B;
    if (!Z) A = eG(A);
    if (A.length === 0) return 0;
    let D = 0,
        G = {
            ambiguousAsWide: !Q
        };
    for (let {
            segment: F
        }
        of un4.segment(A)) {
        let I = F.codePointAt(0);
        if (I <= 31 || I >= 127 && I <= 159) continue;
        if (I >= 8203 && I <= 8207 || I === 65279) continue;
        if (I >= 768 && I <= 879 || I >= 6832 && I <= 6911 || I >= 7616 && I <= 7679 || I >= 8400 && I <= 8447 || I >= 65056 && I <= 65071) continue;
        if (I >= 55296 && I <= 57343) continue;
        if (I >= 65024 && I <= 65039) continue;
        if (mn4.test(F)) continue;
        if (ML2.default().test(F)) {
            D += 2;
            continue
        }
        D += u_(I, G)
    }
    return D
}
var RL2 = (A = 0) => (B) => `\x1B[${B+A}m`,
    OL2 = (A = 0) => (B) => `\x1B[${38+A};5;${B}m`,
    TL2 = (A = 0) => (B, Q, Z) => `\x1B[${38+A};2;${B};${Q};${Z}m`,
    RZ = {
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
    uP5 = Object.keys(RZ.modifier),
    dn4 = Object.keys(RZ.color),
    cn4 = Object.keys(RZ.bgColor),
    mP5 = [...dn4, ...cn4];

function ln4() {
    let A = new Map;
    for (let [B, Q] of Object.entries(RZ)) {
        for (let [Z, D] of Object.entries(Q)) RZ[Z] = {
            open: `\x1B[${D[0]}m`,
            close: `\x1B[${D[1]}m`
        }, Q[Z] = RZ[Z], A.set(D[0], D[1]);
        Object.defineProperty(RZ, B, {
            value: Q,
            enumerable: !1
        })
    }
    return Object.defineProperty(RZ, "codes", {
        value: A,
        enumerable: !1
    }), RZ.color.close = "\x1B[39m", RZ.bgColor.close = "\x1B[49m", RZ.color.ansi = RL2(), RZ.color.ansi256 = OL2(), RZ.color.ansi16m = TL2(), RZ.bgColor.ansi = RL2(10), RZ.bgColor.ansi256 = OL2(10), RZ.bgColor.ansi16m = TL2(10), Object.defineProperties(RZ, {
        rgbToAnsi256: {
            value: (B, Q, Z) => {
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
            value: (B) => {
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
            value: (B) => RZ.rgbToAnsi256(...RZ.hexToRgb(B)),
            enumerable: !1
        },
        ansi256ToAnsi: {
            value: (B) => {
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
            value: (B, Q, Z) => RZ.ansi256ToAnsi(RZ.rgbToAnsi256(B, Q, Z)),
            enumerable: !1
        },
        hexToAnsi: {
            value: (B) => RZ.ansi256ToAnsi(RZ.hexToAnsi256(B)),
            enumerable: !1
        }
    }), RZ
}
var pn4 = ln4(),
    OZ = pn4;
var JO1 = new Set(["\x1B", ""]),
    in4 = 39,
    XF0 = "\x07",
    jL2 = "[",
    nn4 = "]",
    kL2 = "m",
    WO1 = `${nn4}8;;`,
    PL2 = (A) => `${JO1.values().next().value}${jL2}${A}${kL2}`,
    SL2 = (A) => `${JO1.values().next().value}${WO1}${A}${XF0}`,
    an4 = (A) => A.split(" ").map((B) => Ou(B)),
    JF0 = (A, B, Q) => {
        let Z = [...B],
            D = !1,
            G = !1,
            F = Ou(eG(A.at(-1)));
        for (let [I, Y] of Z.entries()) {
            let W = Ou(Y);
            if (F + W <= Q) A[A.length - 1] += Y;
            else A.push(Y), F = 0;
            if (JO1.has(Y)) D = !0, G = Z.slice(I + 1, I + 1 + WO1.length).join("") === WO1;
            if (D) {
                if (G) {
                    if (Y === XF0) D = !1, G = !1
                } else if (Y === kL2) D = !1;
                continue
            }
            if (F += W, F === Q && I < Z.length - 1) A.push(""), F = 0
        }
        if (!F && A.at(-1).length > 0 && A.length > 1) A[A.length - 2] += A.pop()
    },
    sn4 = (A) => {
        let B = A.split(" "),
            Q = B.length;
        while (Q > 0) {
            if (Ou(B[Q - 1]) > 0) break;
            Q--
        }
        if (Q === B.length) return A;
        return B.slice(0, Q).join(" ") + B.slice(Q).join("")
    },
    rn4 = (A, B, Q = {}) => {
        if (Q.trim !== !1 && A.trim() === "") return "";
        let Z = "",
            D, G, F = an4(A),
            I = [""];
        for (let [X, V] of A.split(" ").entries()) {
            if (Q.trim !== !1) I[I.length - 1] = I.at(-1).trimStart();
            let C = Ou(I.at(-1));
            if (X !== 0) {
                if (C >= B && (Q.wordWrap === !1 || Q.trim === !1)) I.push(""), C = 0;
                if (C > 0 || Q.trim === !1) I[I.length - 1] += " ", C++
            }
            if (Q.hard && F[X] > B) {
                let K = B - C,
                    H = 1 + Math.floor((F[X] - K - 1) / B);
                if (Math.floor((F[X] - 1) / B) < H) I.push("");
                JF0(I, V, B);
                continue
            }
            if (C + F[X] > B && C > 0 && F[X] > 0) {
                if (Q.wordWrap === !1 && C < B) {
                    JF0(I, V, B);
                    continue
                }
                I.push("")
            }
            if (C + F[X] > B && Q.wordWrap === !1) {
                JF0(I, V, B);
                continue
            }
            I[I.length - 1] += V
        }
        if (Q.trim !== !1) I = I.map((X) => sn4(X));
        let Y = I.join(`
`),
            W = [...Y],
            J = 0;
        for (let [X, V] of W.entries()) {
            if (Z += V, JO1.has(V)) {
                let {
                    groups: K
                } = new RegExp(`(?:\\${jL2}(?<code>\\d+)m|\\${WO1}(?<uri>.*)${XF0})`).exec(Y.slice(J)) || {
                    groups: {}
                };
                if (K.code !== void 0) {
                    let H = Number.parseFloat(K.code);
                    D = H === in4 ? void 0 : H
                } else if (K.uri !== void 0) G = K.uri.length === 0 ? void 0 : K.uri
            }
            let C = OZ.codes.get(Number(D));
            if (W[X + 1] === `
`) {
                if (G) Z += SL2("");
                if (D && C) Z += PL2(C)
            } else if (V === `
`) {
                if (D && C) Z += PL2(D);
                if (G) Z += SL2(G)
            }
            J += V.length
        }
        return Z
    };

function a51(A, B, Q) {
    return String(A).normalize().replaceAll(`\r
`, `
`).split(`
`).map((Z) => rn4(Z, B, Q)).join(`
`)
}

function s51(A) {
    if (!Number.isInteger(A)) return !1;
    return A >= 4352 && (A <= 4447 || A === 9001 || A === 9002 || 11904 <= A && A <= 12871 && A !== 12351 || 12880 <= A && A <= 19903 || 19968 <= A && A <= 42182 || 43360 <= A && A <= 43388 || 44032 <= A && A <= 55203 || 63744 <= A && A <= 64255 || 65040 <= A && A <= 65049 || 65072 <= A && A <= 65131 || 65281 <= A && A <= 65376 || 65504 <= A && A <= 65510 || 110592 <= A && A <= 110593 || 127488 <= A && A <= 127569 || 131072 <= A && A <= 262141)
}