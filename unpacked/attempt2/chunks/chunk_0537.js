/* chunk:537 bytes:[12632476, 12652221) size:19745 source:unpacked-cli.js */
var hr4 = (A, B) => {
        let Q = gr4(B),
            Z = {
                stdout: process.stdout,
                stdin: process.stdin,
                stderr: process.stderr,
                debug: !1,
                exitOnCtrlC: !0,
                patchConsole: !0,
                theme: Q.theme ?? H0().theme,
                ...Q
            },
            D = ur4(Z.stdout, () => new sO1(Z));
        return D.render(A), {
            rerender: D.render,
            unmount() {
                D.unmount()
            },
            waitUntilExit: D.waitUntilExit,
            cleanup: () => vu.delete(Z.stdout),
            clear: D.clear
        }
    },
    S8 = hr4,
    gr4 = (A = {}) => {
        if (A instanceof fr4) return {
            stdout: A,
            stdin: process.stdin
        };
        return A
    },
    ur4 = (A, B) => {
        let Q = vu.get(A);
        if (!Q) Q = B(), vu.set(A, Q);
        return Q
    };
var rL = G1(z1(), 1);
var GI0 = G1(z1(), 1),
    tR2 = G1(z1(), 1),
    eR2 = GI0.default.createContext(!1);

function AO2({
    children: A
}) {
    return GI0.default.createElement(eR2.Provider, {
        value: !0
    }, A)
}

function rO1() {
    return tR2.useContext(eR2)
}

function oO1(A) {
    let {
        items: B,
        children: Q,
        style: Z
    } = A, [D, G] = rL.useState(0), F = rL.useMemo(() => {
        return B.slice(D)
    }, [B, D]);
    rL.useLayoutEffect(() => {
        G(B.length)
    }, [B.length]);
    let I = F.map((W, J) => {
            return Q(W, D + J)
        }),
        Y = rL.useMemo(() => ({
            position: "absolute",
            flexDirection: "column",
            ...Z
        }), [Z]);
    return rL.default.createElement(AO2, null, rL.default.createElement("ink-box", {
        internal_static: !0,
        style: Y
    }, I))
}
var BO2 = G1(z1(), 1);

function tO1({
    children: A,
    transform: B
}) {
    if (A === void 0 || A === null) return null;
    return BO2.default.createElement("ink-text", {
        style: {
            flexGrow: 0,
            flexShrink: 1,
            flexDirection: "row"
        },
        internal_transform: B
    }, A)
}
var QO2 = G1(z1(), 1);

function S7({
    count: A = 1
}) {
    return QO2.default.createElement("ink-text", null, `
`.repeat(A))
}
var mr4 = G1(z1(), 1);
var FI0 = G1(z1(), 1);
var ZO2 = G1(z1(), 1);
var dr4 = () => ZO2.useContext(dO1),
    a_ = dr4;
var cr4 = (A, B = {}) => {
        let {
            stdin: Q,
            setRawMode: Z,
            internal_exitOnCtrlC: D,
            internal_eventEmitter: G
        } = a_();
        FI0.useEffect(() => {
            if (B.isActive === !1) return;
            return Z(!0), () => {
                Z(!1)
            }
        }, [B.isActive, Z]), FI0.useEffect(() => {
            if (B.isActive === !1) return;
            let F = (I) => {
                let Y = {
                        upArrow: I.name === "up",
                        downArrow: I.name === "down",
                        leftArrow: I.name === "left",
                        rightArrow: I.name === "right",
                        pageDown: I.name === "pagedown",
                        pageUp: I.name === "pageup",
                        home: I.name === "home",
                        end: I.name === "end",
                        return: I.name === "return",
                        escape: I.name === "escape",
                        fn: I.fn,
                        ctrl: I.ctrl,
                        shift: I.shift,
                        tab: I.name === "tab",
                        backspace: I.name === "backspace",
                        delete: I.name === "delete",
                        meta: I.meta || I.name === "escape" || I.option
                    },
                    W = I.ctrl ? I.name : I.sequence;
                if (W === void 0) return;
                if (I.name && sR2.includes(I.name)) W = "";
                if (W.startsWith("\x1B")) W = W.slice(1);
                if (W.length === 1 && typeof W[0] === "string" && W[0].toUpperCase() === W[0]) Y.shift = !0;
                if (!(W === "c" && Y.ctrl) || !D) ku.batchedUpdates(() => {
                    A(W, Y)
                })
            };
            return G?.on("input", F), () => {
                G?.removeListener("input", F)
            }
        }, [B.isActive, Q, D, A])
    },
    DA = cr4;
var lr4 = G1(z1(), 1);
var pr4 = G1(z1(), 1);
var ir4 = G1(z1(), 1);
var II0 = G1(z1(), 1);
var nr4 = G1(z1(), 1);
var ar4 = (A) => ({
        width: A.yogaNode?.getComputedWidth() ?? 0,
        height: A.yogaNode?.getComputedHeight() ?? 0
    }),
    eO1 = ar4;
var fu = G1(z1(), 1);
import DO2 from "node:process";

function YI0() {
    let {
        env: A
    } = DO2, {
        TERM: B,
        TERM_PROGRAM: Q
    } = A;
    if (DO2.platform !== "win32") return B !== "linux";
    return Boolean(A.WT_SESSION) || Boolean(A.TERMINUS_SUBLIME) || A.ConEmuTask === "{cmd::Cmder}" || Q === "Terminus-Sublime" || Q === "vscode" || B === "xterm-256color" || B === "alacritty" || B === "rxvt-unicode" || B === "rxvt-unicode-256color" || A.TERMINAL_EMULATOR === "JetBrains-JediTerm"
}
var GO2 = {
        circleQuestionMark: "(?)",
        questionMarkPrefix: "(?)",
        square: "█",
        squareDarkShade: "▓",
        squareMediumShade: "▒",
        squareLightShade: "░",
        squareTop: "▀",
        squareBottom: "▄",
        squareLeft: "▌",
        squareRight: "▐",
        squareCenter: "■",
        bullet: "●",
        dot: "․",
        ellipsis: "…",
        pointerSmall: "›",
        triangleUp: "▲",
        triangleUpSmall: "▴",
        triangleDown: "▼",
        triangleDownSmall: "▾",
        triangleLeftSmall: "◂",
        triangleRightSmall: "▸",
        home: "⌂",
        heart: "♥",
        musicNote: "♪",
        musicNoteBeamed: "♫",
        arrowUp: "↑",
        arrowDown: "↓",
        arrowLeft: "←",
        arrowRight: "→",
        arrowLeftRight: "↔",
        arrowUpDown: "↕",
        almostEqual: "≈",
        notEqual: "≠",
        lessOrEqual: "≤",
        greaterOrEqual: "≥",
        identical: "≡",
        infinity: "∞",
        subscriptZero: "₀",
        subscriptOne: "₁",
        subscriptTwo: "₂",
        subscriptThree: "₃",
        subscriptFour: "₄",
        subscriptFive: "₅",
        subscriptSix: "₆",
        subscriptSeven: "₇",
        subscriptEight: "₈",
        subscriptNine: "₉",
        oneHalf: "½",
        oneThird: "⅓",
        oneQuarter: "¼",
        oneFifth: "⅕",
        oneSixth: "⅙",
        oneEighth: "⅛",
        twoThirds: "⅔",
        twoFifths: "⅖",
        threeQuarters: "¾",
        threeFifths: "⅗",
        threeEighths: "⅜",
        fourFifths: "⅘",
        fiveSixths: "⅚",
        fiveEighths: "⅝",
        sevenEighths: "⅞",
        line: "─",
        lineBold: "━",
        lineDouble: "═",
        lineDashed0: "┄",
        lineDashed1: "┅",
        lineDashed2: "┈",
        lineDashed3: "┉",
        lineDashed4: "╌",
        lineDashed5: "╍",
        lineDashed6: "╴",
        lineDashed7: "╶",
        lineDashed8: "╸",
        lineDashed9: "╺",
        lineDashed10: "╼",
        lineDashed11: "╾",
        lineDashed12: "−",
        lineDashed13: "–",
        lineDashed14: "‐",
        lineDashed15: "⁃",
        lineVertical: "│",
        lineVerticalBold: "┃",
        lineVerticalDouble: "║",
        lineVerticalDashed0: "┆",
        lineVerticalDashed1: "┇",
        lineVerticalDashed2: "┊",
        lineVerticalDashed3: "┋",
        lineVerticalDashed4: "╎",
        lineVerticalDashed5: "╏",
        lineVerticalDashed6: "╵",
        lineVerticalDashed7: "╷",
        lineVerticalDashed8: "╹",
        lineVerticalDashed9: "╻",
        lineVerticalDashed10: "╽",
        lineVerticalDashed11: "╿",
        lineDownLeft: "┐",
        lineDownLeftArc: "╮",
        lineDownBoldLeftBold: "┓",
        lineDownBoldLeft: "┒",
        lineDownLeftBold: "┑",
        lineDownDoubleLeftDouble: "╗",
        lineDownDoubleLeft: "╖",
        lineDownLeftDouble: "╕",
        lineDownRight: "┌",
        lineDownRightArc: "╭",
        lineDownBoldRightBold: "┏",
        lineDownBoldRight: "┎",
        lineDownRightBold: "┍",
        lineDownDoubleRightDouble: "╔",
        lineDownDoubleRight: "╓",
        lineDownRightDouble: "╒",
        lineUpLeft: "┘",
        lineUpLeftArc: "╯",
        lineUpBoldLeftBold: "┛",
        lineUpBoldLeft: "┚",
        lineUpLeftBold: "┙",
        lineUpDoubleLeftDouble: "╝",
        lineUpDoubleLeft: "╜",
        lineUpLeftDouble: "╛",
        lineUpRight: "└",
        lineUpRightArc: "╰",
        lineUpBoldRightBold: "┗",
        lineUpBoldRight: "┖",
        lineUpRightBold: "┕",
        lineUpDoubleRightDouble: "╚",
        lineUpDoubleRight: "╙",
        lineUpRightDouble: "╘",
        lineUpDownLeft: "┤",
        lineUpBoldDownBoldLeftBold: "┫",
        lineUpBoldDownBoldLeft: "┨",
        lineUpDownLeftBold: "┥",
        lineUpBoldDownLeftBold: "┩",
        lineUpDownBoldLeftBold: "┪",
        lineUpDownBoldLeft: "┧",
        lineUpBoldDownLeft: "┦",
        lineUpDoubleDownDoubleLeftDouble: "╣",
        lineUpDoubleDownDoubleLeft: "╢",
        lineUpDownLeftDouble: "╡",
        lineUpDownRight: "├",
        lineUpBoldDownBoldRightBold: "┣",
        lineUpBoldDownBoldRight: "┠",
        lineUpDownRightBold: "┝",
        lineUpBoldDownRightBold: "┡",
        lineUpDownBoldRightBold: "┢",
        lineUpDownBoldRight: "┟",
        lineUpBoldDownRight: "┞",
        lineUpDoubleDownDoubleRightDouble: "╠",
        lineUpDoubleDownDoubleRight: "╟",
        lineUpDownRightDouble: "╞",
        lineDownLeftRight: "┬",
        lineDownBoldLeftBoldRightBold: "┳",
        lineDownLeftBoldRightBold: "┯",
        lineDownBoldLeftRight: "┰",
        lineDownBoldLeftBoldRight: "┱",
        lineDownBoldLeftRightBold: "┲",
        lineDownLeftRightBold: "┮",
        lineDownLeftBoldRight: "┭",
        lineDownDoubleLeftDoubleRightDouble: "╦",
        lineDownDoubleLeftRight: "╥",
        lineDownLeftDoubleRightDouble: "╤",
        lineUpLeftRight: "┴",
        lineUpBoldLeftBoldRightBold: "┻",
        lineUpLeftBoldRightBold: "┷",
        lineUpBoldLeftRight: "┸",
        lineUpBoldLeftBoldRight: "┹",
        lineUpBoldLeftRightBold: "┺",
        lineUpLeftRightBold: "┶",
        lineUpLeftBoldRight: "┵",
        lineUpDoubleLeftDoubleRightDouble: "╩",
        lineUpDoubleLeftRight: "╨",
        lineUpLeftDoubleRightDouble: "╧",
        lineUpDownLeftRight: "┼",
        lineUpBoldDownBoldLeftBoldRightBold: "╋",
        lineUpDownBoldLeftBoldRightBold: "╈",
        lineUpBoldDownLeftBoldRightBold: "╇",
        lineUpBoldDownBoldLeftRightBold: "╊",
        lineUpBoldDownBoldLeftBoldRight: "╉",
        lineUpBoldDownLeftRight: "╀",
        lineUpDownBoldLeftRight: "╁",
        lineUpDownLeftBoldRight: "┽",
        lineUpDownLeftRightBold: "┾",
        lineUpBoldDownBoldLeftRight: "╂",
        lineUpDownLeftBoldRightBold: "┿",
        lineUpBoldDownLeftBoldRight: "╃",
        lineUpBoldDownLeftRightBold: "╄",
        lineUpDownBoldLeftBoldRight: "╅",
        lineUpDownBoldLeftRightBold: "╆",
        lineUpDoubleDownDoubleLeftDoubleRightDouble: "╬",
        lineUpDoubleDownDoubleLeftRight: "╫",
        lineUpDownLeftDoubleRightDouble: "╪",
        lineCross: "╳",
        lineBackslash: "╲",
        lineSlash: "╱"
    },
    FO2 = {
        tick: "✔",
        info: "ℹ",
        warning: "⚠",
        cross: "✘",
        squareSmall: "◻",
        squareSmallFilled: "◼",
        circle: "◯",
        circleFilled: "◉",
        circleDotted: "◌",
        circleDouble: "◎",
        circleCircle: "ⓞ",
        circleCross: "ⓧ",
        circlePipe: "Ⓘ",
        radioOn: "◉",
        radioOff: "◯",
        checkboxOn: "☒",
        checkboxOff: "☐",
        checkboxCircleOn: "ⓧ",
        checkboxCircleOff: "Ⓘ",
        pointer: "❯",
        triangleUpOutline: "△",
        triangleLeft: "◀",
        triangleRight: "▶",
        lozenge: "◆",
        lozengeOutline: "◇",
        hamburger: "☰",
        smiley: "㋡",
        mustache: "෴",
        star: "★",
        play: "▶",
        nodejs: "⬢",
        oneSeventh: "⅐",
        oneNinth: "⅑",
        oneTenth: "⅒"
    },
    sr4 = {
        tick: "√",
        info: "i",
        warning: "‼",
        cross: "×",
        squareSmall: "□",
        squareSmallFilled: "■",
        circle: "( )",
        circleFilled: "(*)",
        circleDotted: "( )",
        circleDouble: "( )",
        circleCircle: "(○)",
        circleCross: "(×)",
        circlePipe: "(│)",
        radioOn: "(*)",
        radioOff: "( )",
        checkboxOn: "[×]",
        checkboxOff: "[ ]",
        checkboxCircleOn: "(×)",
        checkboxCircleOff: "( )",
        pointer: ">",
        triangleUpOutline: "∆",
        triangleLeft: "◄",
        triangleRight: "►",
        lozenge: "♦",
        lozengeOutline: "◊",
        hamburger: "≡",
        smiley: "☺",
        mustache: "┌─┐",
        star: "✶",
        play: "►",
        nodejs: "♦",
        oneSeventh: "1/7",
        oneNinth: "1/9",
        oneTenth: "1/10"
    },
    rr4 = {
        ...GO2,
        ...FO2
    },
    or4 = {
        ...GO2,
        ...sr4
    },
    tr4 = YI0(),
    er4 = tr4 ? rr4 : or4,
    s0 = er4,
    ty5 = Object.entries(FO2);
var r_ = G1(z1(), 1);
var ko4 = G1(z1(), 1);
var C31 = G1(z1(), 1),
    Po4 = G1(JO2(), 1);
var XO2 = {
        info: "blue",
        success: "green",
        error: "red",
        warning: "yellow"
    },
    Co4 = {
        styles: {
            container: ({
                variant: A
            }) => ({
                flexGrow: 1,
                borderStyle: "round",
                borderColor: XO2[A],
                gap: 1,
                paddingX: 1
            }),
            iconContainer: () => ({
                flexShrink: 0
            }),
            icon: ({
                variant: A
            }) => ({
                color: XO2[A]
            }),
            content: () => ({
                flexShrink: 1,
                flexGrow: 1,
                minWidth: 0,
                flexDirection: "column",
                gap: 1
            }),
            title: () => ({
                bold: !0
            }),
            message: () => ({})
        },
        config({
            variant: A
        }) {
            let B;
            if (A === "info") B = s0.info;
            if (A === "success") B = s0.tick;
            if (A === "error") B = s0.cross;
            if (A === "warning") B = s0.warning;
            return {
                icon: B
            }
        }
    },
    VO2 = Co4;
var Ko4 = {
        styles: {
            container: ({
                color: A
            }) => ({
                backgroundColor: A
            }),
            label: () => ({
                color: "black"
            })
        }
    },
    CO2 = Ko4;
var Ho4 = {
        styles: {
            input: ({
                isFocused: A
            }) => ({
                dimColor: !A
            })
        }
    },
    KO2 = Ho4;
var zo4 = {
        styles: {
            container: () => ({
                flexDirection: "column"
            }),
            option: ({
                isFocused: A
            }) => ({
                gap: 1,
                paddingLeft: A ? 0 : 2
            }),
            selectedIndicator: () => ({
                color: "green"
            }),
            focusIndicator: () => ({
                color: "blue"
            }),
            label({
                isFocused: A,
                isSelected: B
            }) {
                let Q;
                if (B) Q = "green";
                if (A) Q = "blue";
                return {
                    color: Q
                }
            },
            highlightedText: () => ({
                bold: !0
            })
        }
    },
    HO2 = zo4;
var Eo4 = {
        styles: {
            list: () => ({
                flexDirection: "column"
            }),
            listItem: () => ({
                gap: 1
            }),
            marker: () => ({
                dimColor: !0
            }),
            content: () => ({
                flexDirection: "column"
            })
        }
    },
    zO2 = Eo4;
var Uo4 = {
        styles: {
            container: () => ({
                flexGrow: 1,
                minWidth: 0
            }),
            completed: () => ({
                color: "magenta"
            }),
            remaining: () => ({
                dimColor: !0
            })
        },
        config: () => ({
            completedCharacter: s0.square,
            remainingCharacter: s0.squareLightShade
        })
    },
    EO2 = Uo4;
var wo4 = {
        styles: {
            container: () => ({
                flexDirection: "column"
            }),
            option: ({
                isFocused: A
            }) => ({
                gap: 1,
                paddingLeft: A ? 0 : 2
            }),
            selectedIndicator: () => ({
                color: "green"
            }),
            focusIndicator: () => ({
                color: "blue"
            }),
            label({
                isFocused: A,
                isSelected: B
            }) {
                let Q;
                if (B) Q = "green";
                if (A) Q = "blue";
                return {
                    color: Q
                }
            },
            highlightedText: () => ({
                bold: !0
            })
        }
    },
    UO2 = wo4;
var $o4 = {
        styles: {
            container: () => ({
                gap: 1
            }),
            frame: () => ({
                color: "blue"
            }),
            label: () => ({})
        }
    },
    wO2 = $o4;
var qo4 = {
        success: "green",
        error: "red",
        warning: "yellow",
        info: "blue"
    },
    No4 = {
        success: s0.tick,
        error: s0.cross,
        warning: s0.warning,
        info: s0.info
    },
    Lo4 = {
        styles: {
            container: () => ({
                gap: 1
            }),
            iconContainer: () => ({
                flexShrink: 0
            }),
            icon: ({
                variant: A
            }) => ({
                color: qo4[A]
            }),
            message: () => ({})
        },
        config: ({
            variant: A
        }) => ({
            icon: No4[A]
        })
    },
    $O2 = Lo4;
var Mo4 = {
        styles: {
            list: () => ({
                flexDirection: "column"
            }),
            listItem: () => ({
                gap: 1
            }),
            marker: () => ({
                dimColor: !0
            }),
            content: () => ({
                flexDirection: "column"
            })
        },
        config: () => ({
            marker: s0.line
        })
    },
    qO2 = Mo4;
var Ro4 = {
        styles: {
            value: () => ({})
        }
    },
    NO2 = Ro4;
var Oo4 = {
        styles: {
            value: () => ({})
        }
    },
    LO2 = Oo4;
var To4 = {
        styles: {
            value: () => ({})
        }
    },
    MO2 = To4;