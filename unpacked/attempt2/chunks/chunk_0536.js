/* chunk:536 bytes:[12612572, 12632475) size:19903 source:unpacked-cli.js */
var aR2 = {
        OP: "f1",
        OQ: "f2",
        OR: "f3",
        OS: "f4",
        "[11~": "f1",
        "[12~": "f2",
        "[13~": "f3",
        "[14~": "f4",
        "[[A": "f1",
        "[[B": "f2",
        "[[C": "f3",
        "[[D": "f4",
        "[[E": "f5",
        "[15~": "f5",
        "[17~": "f6",
        "[18~": "f7",
        "[19~": "f8",
        "[20~": "f9",
        "[21~": "f10",
        "[23~": "f11",
        "[24~": "f12",
        "[A": "up",
        "[B": "down",
        "[C": "right",
        "[D": "left",
        "[E": "clear",
        "[F": "end",
        "[H": "home",
        OA: "up",
        OB: "down",
        OC: "right",
        OD: "left",
        OE: "clear",
        OF: "end",
        OH: "home",
        "[1~": "home",
        "[2~": "insert",
        "[3~": "delete",
        "[4~": "end",
        "[5~": "pageup",
        "[6~": "pagedown",
        "[[5~": "pageup",
        "[[6~": "pagedown",
        "[7~": "home",
        "[8~": "end",
        "[a": "up",
        "[b": "down",
        "[c": "right",
        "[d": "left",
        "[e": "clear",
        "[2$": "insert",
        "[3$": "delete",
        "[5$": "pageup",
        "[6$": "pagedown",
        "[7$": "home",
        "[8$": "end",
        Oa: "up",
        Ob: "down",
        Oc: "right",
        Od: "left",
        Oe: "clear",
        "[2^": "insert",
        "[3^": "delete",
        "[5^": "pageup",
        "[6^": "pagedown",
        "[7^": "home",
        "[8^": "end",
        "[Z": "tab"
    },
    sR2 = [...Object.values(aR2), "backspace"],
    jr4 = (A) => {
        return ["[a", "[b", "[c", "[d", "[e", "[2$", "[3$", "[5$", "[6$", "[7$", "[8$", "[Z"].includes(A)
    },
    kr4 = (A) => {
        return ["Oa", "Ob", "Oc", "Od", "Oe", "[2^", "[3^", "[5^", "[6^", "[7^", "[8^"].includes(A)
    },
    pR2 = (A = "") => {
        let B, Q = {
            name: "",
            fn: !1,
            ctrl: !1,
            meta: !1,
            shift: !1,
            option: !1,
            sequence: A,
            raw: A,
            isPasted: !1
        };
        if (Q.sequence = Q.sequence || A || Q.name, A === "\r") Q.raw = void 0, Q.name = "return";
        else if (A === `
`) Q.name = "enter";
        else if (A === "\t") Q.name = "tab";
        else if (A === "\b" || A === "\x1B\b") Q.name = "backspace", Q.meta = A.charAt(0) === "\x1B";
        else if (A === "" || A === "\x1B") Q.name = "backspace", Q.meta = A.charAt(0) === "\x1B";
        else if (A === "\x1B" || A === "\x1B\x1B") Q.name = "escape", Q.meta = A.length === 2;
        else if (A === " " || A === "\x1B ") Q.name = "space", Q.meta = A.length === 2;
        else if (A === "\x1F") Q.name = "_", Q.ctrl = !0;
        else if (A <= "\x1A" && A.length === 1) Q.name = String.fromCharCode(A.charCodeAt(0) + 97 - 1), Q.ctrl = !0;
        else if (A.length === 1 && A >= "0" && A <= "9") Q.name = "number";
        else if (A.length === 1 && A >= "a" && A <= "z") Q.name = A;
        else if (A.length === 1 && A >= "A" && A <= "Z") Q.name = A.toLowerCase(), Q.shift = !0;
        else if (B = Lr4.exec(A)) Q.meta = !0, Q.shift = /^[A-Z]$/.test(B[1]);
        else if (B = Mr4.exec(A)) {
            let Z = [...A];
            if (Z[0] === "\x1B" && Z[1] === "\x1B") Q.option = !0;
            let D = [B[1], B[2], B[4], B[6]].filter(Boolean).join(""),
                G = (B[3] || B[5] || 1) - 1;
            Q.ctrl = !!(G & 4), Q.meta = !!(G & 10), Q.shift = !!(G & 1), Q.code = D, Q.name = aR2[D], Q.shift = jr4(D) || Q.shift, Q.ctrl = kr4(D) || Q.ctrl
        }
        if (Q.raw === "\x1Bb") Q.meta = !0, Q.name = "left";
        else if (Q.raw === "\x1Bf") Q.meta = !0, Q.name = "right";
        switch (A) {
            case "\x1B[1~":
                return {
                    name: "home", ctrl: !1, meta: !1, shift: !1, option: !1, fn: !1, sequence: A, raw: A, isPasted: !1
                };
            case "\x1B[4~":
                return {
                    name: "end", ctrl: !1, meta: !1, shift: !1, option: !1, fn: !1, sequence: A, raw: A, isPasted: !1
                };
            case "\x1B[5~":
                return {
                    name: "pageup", ctrl: !1, meta: !1, shift: !1, option: !1, fn: !1, sequence: A, raw: A, isPasted: !1
                };
            case "\x1B[6~":
                return {
                    name: "pagedown", ctrl: !1, meta: !1, shift: !1, option: !1, fn: !1, sequence: A, raw: A, isPasted: !1
                };
            case "\x1B[1;5D":
                return {
                    name: "left", ctrl: !0, meta: !1, shift: !1, option: !1, fn: !1, sequence: A, raw: A, isPasted: !1
                };
            case "\x1B[1;5C":
                return {
                    name: "right", ctrl: !0, meta: !1, shift: !1, option: !1, fn: !1, sequence: A, raw: A, isPasted: !1
                };
            case "\x1B[1~":
                return {
                    name: "left", ctrl: !0, fn: !0, meta: !1, shift: !1, option: !1, sequence: A, raw: A, isPasted: !1
                };
            case "\x1B[4~":
                return {
                    name: "right", ctrl: !0, fn: !0, meta: !1, shift: !1, option: !1, sequence: A, raw: A, isPasted: !1
                }
        }
        return Q
    };
var _r4 = "\t",
    xr4 = "\x1B[Z",
    vr4 = "\x1B",
    br4 = process.platform !== "win32";
class aO1 extends sL.PureComponent {
    static displayName = "InternalApp";
    static getDerivedStateFromError(A) {
        return {
            error: A
        }
    }
    state = {
        isFocusEnabled: !0,
        activeFocusId: void 0,
        focusables: [],
        error: void 0
    };
    rawModeEnabledCount = 0;
    internal_eventEmitter = new yr4;
    keyParseState = iR2;
    incompleteEscapeTimer = null;
    NORMAL_TIMEOUT = 50;
    PASTE_TIMEOUT = 500;
    isRawModeSupported() {
        return this.props.stdin.isTTY
    }
    render() {
        return sL.default.createElement(aF0.Provider, {
            value: {
                exit: this.handleExit
            }
        }, sL.default.createElement(BI0, {
            initialState: this.props.initialTheme
        }, sL.default.createElement(dO1.Provider, {
            value: {
                stdin: this.props.stdin,
                setRawMode: this.handleSetRawMode,
                isRawModeSupported: this.isRawModeSupported(),
                internal_exitOnCtrlC: this.props.exitOnCtrlC,
                internal_eventEmitter: this.internal_eventEmitter,
                internal_resetLineCount: this.props.resetLineCount
            }
        }, sL.default.createElement(sF0.Provider, {
            value: {
                stdout: this.props.stdout,
                write: this.props.writeToStdout
            }
        }, sL.default.createElement(rF0.Provider, {
            value: {
                stderr: this.props.stderr,
                write: this.props.writeToStderr
            }
        }, sL.default.createElement(cO1.Provider, {
            value: {
                activeId: this.state.activeFocusId,
                add: this.addFocusable,
                remove: this.removeFocusable,
                activate: this.activateFocusable,
                deactivate: this.deactivateFocusable,
                enableFocus: this.enableFocus,
                disableFocus: this.disableFocus,
                focusNext: this.focusNext,
                focusPrevious: this.focusPrevious,
                focus: this.focus
            }
        }, this.state.error ? sL.default.createElement(DI0, {
            error: this.state.error
        }) : this.props.children))))))
    }
    componentDidMount() {
        i_.hide(this.props.stdout)
    }
    componentWillUnmount() {
        if (i_.show(this.props.stdout), this.incompleteEscapeTimer) clearTimeout(this.incompleteEscapeTimer), this.incompleteEscapeTimer = null;
        if (this.isRawModeSupported()) this.handleSetRawMode(!1)
    }
    componentDidCatch(A) {
        this.handleExit(A)
    }
    handleSetRawMode = (A) => {
        let {
            stdin: B
        } = this.props;
        if (!this.isRawModeSupported())
            if (B === process.stdin) throw new Error(`Raw mode is not supported on the current process.stdin, which Ink uses as input stream by default.
Read about how to prevent this error on https://github.com/vadimdemedes/ink/#israwmodesupported`);
            else throw new Error(`Raw mode is not supported on the stdin provided to Ink.
Read about how to prevent this error on https://github.com/vadimdemedes/ink/#israwmodesupported`);
        if (B.setEncoding("utf8"), A) {
            if (this.rawModeEnabledCount === 0) B.ref(), B.setRawMode(!0), B.addListener("readable", this.handleReadable), this.props.stdout.write("\x1B[?2004h");
            this.rawModeEnabledCount++;
            return
        }
        if (--this.rawModeEnabledCount === 0) this.props.stdout.write("\x1B[?2004l"), B.setRawMode(!1), B.removeListener("readable", this.handleReadable), B.unref()
    };
    flushIncomplete = () => {
        if (this.incompleteEscapeTimer = null, !this.keyParseState.incomplete) return;
        this.processInput(null)
    };
    processInput = (A) => {
        let [B, Q] = nR2(this.keyParseState, A);
        this.keyParseState = Q;
        for (let Z of B) this.handleInput(Z.sequence), this.internal_eventEmitter.emit("input", Z);
        if (this.keyParseState.incomplete) {
            if (this.incompleteEscapeTimer) clearTimeout(this.incompleteEscapeTimer);
            this.incompleteEscapeTimer = setTimeout(this.flushIncomplete, this.keyParseState.mode === "IN_PASTE" ? this.PASTE_TIMEOUT : this.NORMAL_TIMEOUT)
        }
    };
    handleReadable = () => {
        let A;
        while ((A = this.props.stdin.read()) !== null) this.processInput(A)
    };
    handleInput = (A) => {
        if (A === "\x03" && this.props.exitOnCtrlC) this.handleExit();
        if (A === "\x1A" && br4) this.handleSuspend();
        if (A === vr4 && this.state.activeFocusId) this.setState({
            activeFocusId: void 0
        });
        if (this.state.isFocusEnabled && this.state.focusables.length > 0) {
            if (A === _r4) this.focusNext();
            if (A === xr4) this.focusPrevious()
        }
    };
    handleExit = (A) => {
        if (this.isRawModeSupported()) this.handleSetRawMode(!1);
        this.props.onExit(A)
    };
    handleSuspend = () => {
        if (!this.isRawModeSupported()) return;
        let A = this.rawModeEnabledCount;
        while (this.rawModeEnabledCount > 0) this.handleSetRawMode(!1);
        i_.show(this.props.stdout), this.internal_eventEmitter.emit("suspend");
        let B = () => {
            for (let Q = 0; Q < A; Q++)
                if (this.isRawModeSupported()) this.handleSetRawMode(!0);
            i_.hide(this.props.stdout), this.internal_eventEmitter.emit("resume"), process.removeListener("SIGCONT", B)
        };
        process.on("SIGCONT", B), process.kill(process.pid, "SIGSTOP")
    };
    enableFocus = () => {
        this.setState({
            isFocusEnabled: !0
        })
    };
    disableFocus = () => {
        this.setState({
            isFocusEnabled: !1
        })
    };
    focus = (A) => {
        this.setState((B) => {
            if (!B.focusables.some((Z) => Z?.id === A)) return B;
            return {
                activeFocusId: A
            }
        })
    };
    focusNext = () => {
        this.setState((A) => {
            let B = A.focusables.find((Z) => Z.isActive)?.id;
            return {
                activeFocusId: this.findNextFocusable(A) ?? B
            }
        })
    };
    focusPrevious = () => {
        this.setState((A) => {
            let B = A.focusables.findLast((Z) => Z.isActive)?.id;
            return {
                activeFocusId: this.findPreviousFocusable(A) ?? B
            }
        })
    };
    addFocusable = (A, {
        autoFocus: B
    }) => {
        this.setState((Q) => {
            let Z = Q.activeFocusId;
            if (!Z && B) Z = A;
            return {
                activeFocusId: Z,
                focusables: [...Q.focusables, {
                    id: A,
                    isActive: !0
                }]
            }
        })
    };
    removeFocusable = (A) => {
        this.setState((B) => ({
            activeFocusId: B.activeFocusId === A ? void 0 : B.activeFocusId,
            focusables: B.focusables.filter((Q) => {
                return Q.id !== A
            })
        }))
    };
    activateFocusable = (A) => {
        this.setState((B) => ({
            focusables: B.focusables.map((Q) => {
                if (Q.id !== A) return Q;
                return {
                    id: A,
                    isActive: !0
                }
            })
        }))
    };
    deactivateFocusable = (A) => {
        this.setState((B) => ({
            activeFocusId: B.activeFocusId === A ? void 0 : B.activeFocusId,
            focusables: B.focusables.map((Q) => {
                if (Q.id !== A) return Q;
                return {
                    id: A,
                    isActive: !1
                }
            })
        }))
    };
    findNextFocusable = (A) => {
        let B = A.focusables.findIndex((Q) => {
            return Q.id === A.activeFocusId
        });
        for (let Q = B + 1; Q < A.focusables.length; Q++) {
            let Z = A.focusables[Q];
            if (Z?.isActive) return Z.id
        }
        return
    };
    findPreviousFocusable = (A) => {
        let B = A.focusables.findIndex((Q) => {
            return Q.id === A.activeFocusId
        });
        for (let Q = B - 1; Q >= 0; Q--) {
            let Z = A.focusables[Q];
            if (Z?.isActive) return Z.id
        }
        return
    }
}
var bu = Boolean(!1),
    rR2 = () => {};
class sO1 {
    options;
    log;
    throttledLog;
    isUnmounted;
    lastOutput;
    lastOutputHeight;
    container;
    rootNode = null;
    fullStaticOutput;
    exitPromise;
    restoreConsole;
    unsubscribeResize;
    constructor(A) {
        this.options = A;
        if (aG0(this), this.log = NR2.create(A.stdout), this.throttledLog = A.debug ? this.log : jR1(this.log, void 0, {
                leading: !0,
                trailing: !0
            }), this.isUnmounted = !1, this.lastOutput = "", this.lastOutputHeight = 0, this.fullStaticOutput = "", this.unsubscribeExit = rW1(this.unmount, {
                alwaysLast: !1
            }), A.patchConsole) this.patchConsole();
        if (!bu) A.stdout.on("resize", this.resized), this.unsubscribeResize = () => {
            A.stdout.off("resize", this.resized)
        };
        if (this.rootNode = KO1("ink-root"), this.rootNode.onComputeLayout = this.calculateLayout, this.rootNode.onRender = A.debug ? this.onRender : jR1(this.onRender, 32, {
                leading: !0,
                trailing: !0
            }), this.rootNode.onImmediateRender = this.onRender, this.container = ku.createContainer(this.rootNode, 0, null, !1, null, "id", () => {}, null), process.env.DEV === "true") ku.injectIntoDevTools({
            bundleType: 0,
            version: "16.13.1",
            rendererPackageName: "ink"
        })
    }
    resized = () => {
        this.calculateLayout(), this.onRender(!0)
    };
    resolveExitPromise = () => {};
    rejectExitPromise = () => {};
    unsubscribeExit = () => {};
    calculateLayout = () => {
        let A = this.options.stdout.columns || 80;
        if (!this.rootNode) return;
        this.rootNode.yogaNode.setWidth(A), this.rootNode.yogaNode.calculateLayout(void 0, void 0, YO1.DIRECTION_LTR)
    };
    setTheme(A) {
        this.options.theme = A
    }
    onRender(A = !1) {
        if (this.isUnmounted) return;
        if (!this.rootNode) return;
        let {
            output: B,
            outputHeight: Q,
            staticOutput: Z
        } = XR2(this.rootNode, this.options.theme), D = Z && Z !== `
`;
        if (this.options.debug) {
            if (D) this.fullStaticOutput += Z;
            this.options.stdout.write(this.fullStaticOutput + B);
            return
        }
        if (bu) {
            if (D) this.options.stdout.write(Z);
            this.lastOutput = B, this.lastOutputHeight = Q;
            return
        }
        if (D) this.fullStaticOutput += Z;
        if (Q >= this.options.stdout.rows || this.lastOutputHeight >= this.options.stdout.rows) {
            if (this.options.onFlicker) this.options.onFlicker(Q, this.options.stdout.rows);
            this.options.stdout.write(v_.clearTerminal + this.fullStaticOutput + B + `
`), this.lastOutput = B, this.lastOutputHeight = Q, this.log.updateLineCount(B + `
`);
            return
        }
        if (A) {
            this.options.stdout.write(v_.clearTerminal + this.fullStaticOutput + B + `
`), this.lastOutput = B, this.lastOutputHeight = Q, this.log.updateLineCount(B + `
`);
            return
        }
        if (D) this.log.clear(), this.options.stdout.write(Z), this.throttledLog(B);
        if (!D && B !== this.lastOutput) this.throttledLog(B);
        this.lastOutput = B, this.lastOutputHeight = Q
    }
    render(A) {
        let B = oR2.default.createElement(aO1, {
            initialTheme: this.options.theme,
            stdin: this.options.stdin,
            stdout: this.options.stdout,
            stderr: this.options.stderr,
            writeToStdout: this.writeToStdout,
            writeToStderr: this.writeToStderr,
            exitOnCtrlC: this.options.exitOnCtrlC,
            onExit: this.unmount,
            resetLineCount: this.resetLineCount
        }, A);
        ku.updateContainer(B, this.container, null, rR2)
    }
    writeToStdout(A) {
        if (this.isUnmounted) return;
        if (this.options.debug) {
            this.options.stdout.write(A + this.fullStaticOutput + this.lastOutput);
            return
        }
        if (bu) {
            this.options.stdout.write(A);
            return
        }
        this.log.clear(), this.options.stdout.write(A), this.log(this.lastOutput)
    }
    writeToStderr(A) {
        if (this.isUnmounted) return;
        if (this.options.debug) {
            this.options.stderr.write(A), this.options.stdout.write(this.fullStaticOutput + this.lastOutput);
            return
        }
        if (bu) {
            this.options.stderr.write(A);
            return
        }
        this.log.clear(), this.options.stderr.write(A), this.log(this.lastOutput)
    }
    unmount(A) {
        if (this.isUnmounted) return;
        if (this.calculateLayout(), this.onRender(), this.unsubscribeExit(), typeof this.restoreConsole === "function") this.restoreConsole();
        if (typeof this.unsubscribeResize === "function") this.unsubscribeResize();
        if (bu) this.options.stdout.write(this.lastOutput + `
`);
        else if (!this.options.debug) this.log.done();
        if (this.isUnmounted = !0, ku.updateContainer(null, this.container, null, rR2), vu.delete(this.options.stdout), A instanceof Error) this.rejectExitPromise(A);
        else this.resolveExitPromise()
    }
    async waitUntilExit() {
        return this.exitPromise ||= new Promise((A, B) => {
            this.resolveExitPromise = A, this.rejectExitPromise = B
        }), this.exitPromise
    }
    clear() {
        if (!bu && !this.options.debug) this.log.clear()
    }
    resetLineCount() {
        if (!bu && !this.options.debug) this.log.resetLineCount()
    }
    patchConsole() {
        if (this.options.debug) return;
        this.restoreConsole = MN2((A, B) => {
            if (A === "stdout") this.writeToStdout(B);
            if (A === "stderr") {
                if (!B.startsWith("The above error occurred")) this.writeToStderr(B)
            }
        })
    }
}

function eF0(A) {
    vu.forEach((B) => {
        B.setTheme(A)
    })
}