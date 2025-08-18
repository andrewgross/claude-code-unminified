/* chunk:495 bytes:[11831940, 11851820) size:19880 source:unpacked-cli.js */
var ay0 = [{
    name: "SIGHUP",
    number: 1,
    action: "terminate",
    description: "Terminal closed",
    standard: "posix"
}, {
    name: "SIGINT",
    number: 2,
    action: "terminate",
    description: "User interruption with CTRL-C",
    standard: "ansi"
}, {
    name: "SIGQUIT",
    number: 3,
    action: "core",
    description: "User interruption with CTRL-\\",
    standard: "posix"
}, {
    name: "SIGILL",
    number: 4,
    action: "core",
    description: "Invalid machine instruction",
    standard: "ansi"
}, {
    name: "SIGTRAP",
    number: 5,
    action: "core",
    description: "Debugger breakpoint",
    standard: "posix"
}, {
    name: "SIGABRT",
    number: 6,
    action: "core",
    description: "Aborted",
    standard: "ansi"
}, {
    name: "SIGIOT",
    number: 6,
    action: "core",
    description: "Aborted",
    standard: "bsd"
}, {
    name: "SIGBUS",
    number: 7,
    action: "core",
    description: "Bus error due to misaligned, non-existing address or paging error",
    standard: "bsd"
}, {
    name: "SIGEMT",
    number: 7,
    action: "terminate",
    description: "Command should be emulated but is not implemented",
    standard: "other"
}, {
    name: "SIGFPE",
    number: 8,
    action: "core",
    description: "Floating point arithmetic error",
    standard: "ansi"
}, {
    name: "SIGKILL",
    number: 9,
    action: "terminate",
    description: "Forced termination",
    standard: "posix",
    forced: !0
}, {
    name: "SIGUSR1",
    number: 10,
    action: "terminate",
    description: "Application-specific signal",
    standard: "posix"
}, {
    name: "SIGSEGV",
    number: 11,
    action: "core",
    description: "Segmentation fault",
    standard: "ansi"
}, {
    name: "SIGUSR2",
    number: 12,
    action: "terminate",
    description: "Application-specific signal",
    standard: "posix"
}, {
    name: "SIGPIPE",
    number: 13,
    action: "terminate",
    description: "Broken pipe or socket",
    standard: "posix"
}, {
    name: "SIGALRM",
    number: 14,
    action: "terminate",
    description: "Timeout or timer",
    standard: "posix"
}, {
    name: "SIGTERM",
    number: 15,
    action: "terminate",
    description: "Termination",
    standard: "ansi"
}, {
    name: "SIGSTKFLT",
    number: 16,
    action: "terminate",
    description: "Stack is empty or overflowed",
    standard: "other"
}, {
    name: "SIGCHLD",
    number: 17,
    action: "ignore",
    description: "Child process terminated, paused or unpaused",
    standard: "posix"
}, {
    name: "SIGCLD",
    number: 17,
    action: "ignore",
    description: "Child process terminated, paused or unpaused",
    standard: "other"
}, {
    name: "SIGCONT",
    number: 18,
    action: "unpause",
    description: "Unpaused",
    standard: "posix",
    forced: !0
}, {
    name: "SIGSTOP",
    number: 19,
    action: "pause",
    description: "Paused",
    standard: "posix",
    forced: !0
}, {
    name: "SIGTSTP",
    number: 20,
    action: "pause",
    description: 'Paused using CTRL-Z or "suspend"',
    standard: "posix"
}, {
    name: "SIGTTIN",
    number: 21,
    action: "pause",
    description: "Background process cannot read terminal input",
    standard: "posix"
}, {
    name: "SIGBREAK",
    number: 21,
    action: "terminate",
    description: "User interruption with CTRL-BREAK",
    standard: "other"
}, {
    name: "SIGTTOU",
    number: 22,
    action: "pause",
    description: "Background process cannot write to terminal output",
    standard: "posix"
}, {
    name: "SIGURG",
    number: 23,
    action: "ignore",
    description: "Socket received out-of-band data",
    standard: "bsd"
}, {
    name: "SIGXCPU",
    number: 24,
    action: "core",
    description: "Process timed out",
    standard: "bsd"
}, {
    name: "SIGXFSZ",
    number: 25,
    action: "core",
    description: "File too big",
    standard: "bsd"
}, {
    name: "SIGVTALRM",
    number: 26,
    action: "terminate",
    description: "Timeout or timer",
    standard: "bsd"
}, {
    name: "SIGPROF",
    number: 27,
    action: "terminate",
    description: "Timeout or timer",
    standard: "bsd"
}, {
    name: "SIGWINCH",
    number: 28,
    action: "ignore",
    description: "Terminal window size changed",
    standard: "bsd"
}, {
    name: "SIGIO",
    number: 29,
    action: "terminate",
    description: "I/O is available",
    standard: "other"
}, {
    name: "SIGPOLL",
    number: 29,
    action: "terminate",
    description: "Watched event",
    standard: "other"
}, {
    name: "SIGINFO",
    number: 29,
    action: "ignore",
    description: "Request for process information",
    standard: "other"
}, {
    name: "SIGPWR",
    number: 30,
    action: "terminate",
    description: "Device running out of power",
    standard: "systemv"
}, {
    name: "SIGSYS",
    number: 31,
    action: "core",
    description: "Invalid system call",
    standard: "other"
}, {
    name: "SIGUNUSED",
    number: 31,
    action: "terminate",
    description: "Invalid system call",
    standard: "other"
}];
var fm1 = () => {
        let A = iy0();
        return [...ay0, ...A].map($eB)
    },
    $eB = ({
        name: A,
        number: B,
        description: Q,
        action: Z,
        forced: D = !1,
        standard: G
    }) => {
        let {
            signals: {
                [A]: F
            }
        } = weB, I = F !== void 0;
        return {
            name: A,
            number: I ? F : B,
            description: Q,
            supported: I,
            action: Z,
            forced: D,
            standard: G
        }
    };
var NeB = () => {
        let A = fm1();
        return Object.fromEntries(A.map(LeB))
    },
    LeB = ({
        name: A,
        number: B,
        description: Q,
        supported: Z,
        action: D,
        forced: G,
        standard: F
    }) => [A, {
        name: A,
        number: B,
        description: Q,
        supported: Z,
        action: D,
        forced: G,
        standard: F
    }],
    sy0 = NeB(),
    MeB = () => {
        let A = fm1(),
            B = bm1 + 1,
            Q = Array.from({
                length: B
            }, (Z, D) => ReB(D, A));
        return Object.assign({}, ...Q)
    },
    ReB = (A, B) => {
        let Q = OeB(A, B);
        if (Q === void 0) return {};
        let {
            name: Z,
            description: D,
            supported: G,
            action: F,
            forced: I,
            standard: Y
        } = Q;
        return {
            [A]: {
                name: Z,
                number: A,
                description: D,
                supported: G,
                action: F,
                forced: I,
                standard: Y
            }
        }
    },
    OeB = (A, B) => {
        let Q = B.find(({
            name: Z
        }) => qeB.signals[Z] === A);
        if (Q !== void 0) return Q;
        return B.find((Z) => Z.number === A)
    },
    Tu8 = MeB();
var PeB = ({
        timedOut: A,
        timeout: B,
        errorCode: Q,
        signal: Z,
        signalDescription: D,
        exitCode: G,
        isCanceled: F
    }) => {
        if (A) return `timed out after ${B} milliseconds`;
        if (F) return "was canceled";
        if (Q !== void 0) return `failed with ${Q}`;
        if (Z !== void 0) return `was killed with ${Z} (${D})`;
        if (G !== void 0) return `failed with exit code ${G}`;
        return "failed"
    },
    P21 = ({
        stdout: A,
        stderr: B,
        all: Q,
        error: Z,
        signal: D,
        exitCode: G,
        command: F,
        escapedCommand: I,
        timedOut: Y,
        isCanceled: W,
        killed: J,
        parsed: {
            options: {
                timeout: X,
                cwd: V = TeB.cwd()
            }
        }
    }) => {
        G = G === null ? void 0 : G, D = D === null ? void 0 : D;
        let C = D === void 0 ? void 0 : sy0[D].description,
            K = Z && Z.code,
            z = `Command ${PeB({timedOut:Y,timeout:X,errorCode:K,signal:D,signalDescription:C,exitCode:G,isCanceled:W})}: ${F}`,
            $ = Object.prototype.toString.call(Z) === "[object Error]",
            L = $ ? `${z}
${Z.message}` : z,
            N = [L, B, A].filter(Boolean).join(`
`);
        if ($) Z.originalMessage = Z.message, Z.message = N;
        else Z = new Error(N);
        if (Z.shortMessage = L, Z.command = F, Z.escapedCommand = I, Z.exitCode = G, Z.signal = D, Z.signalDescription = C, Z.stdout = A, Z.stderr = B, Z.cwd = V, Q !== void 0) Z.all = Q;
        if ("bufferedData" in Z) delete Z.bufferedData;
        return Z.failed = !0, Z.timedOut = Boolean(Y), Z.isCanceled = W, Z.killed = J && !Y, Z
    };
var aW1 = ["stdin", "stdout", "stderr"],
    SeB = (A) => aW1.some((B) => A[B] !== void 0),
    ry0 = (A) => {
        if (!A) return;
        let {
            stdio: B
        } = A;
        if (B === void 0) return aW1.map((Z) => A[Z]);
        if (SeB(A)) throw new Error(`It's not possible to provide \`stdio\` in combination with one of ${aW1.map((Z)=>`\`${Z}\``).join(", ")}`);
        if (typeof B === "string") return B;
        if (!Array.isArray(B)) throw new TypeError(`Expected \`stdio\` to be of type \`string\` or \`Array\`, got \`${typeof B}\``);
        let Q = Math.max(B.length, aW1.length);
        return Array.from({
            length: Q
        }, (Z, D) => B[D])
    };
import yeB from "node:os";
var Mf = [];
Mf.push("SIGHUP", "SIGINT", "SIGTERM");
if (process.platform !== "win32") Mf.push("SIGALRM", "SIGABRT", "SIGVTALRM", "SIGXCPU", "SIGXFSZ", "SIGUSR2", "SIGTRAP", "SIGSYS", "SIGQUIT", "SIGIOT");
if (process.platform === "linux") Mf.push("SIGIO", "SIGPOLL", "SIGPWR", "SIGSTKFLT");
var sW1 = (A) => !!A && typeof A === "object" && typeof A.removeListener === "function" && typeof A.emit === "function" && typeof A.reallyExit === "function" && typeof A.listeners === "function" && typeof A.kill === "function" && typeof A.pid === "number" && typeof A.on === "function",
    hm1 = Symbol.for("signal-exit emitter"),
    gm1 = globalThis,
    jeB = Object.defineProperty.bind(Object);
class oy0 {
    emitted = {
        afterExit: !1,
        exit: !1
    };
    listeners = {
        afterExit: [],
        exit: []
    };
    count = 0;
    id = Math.random();
    constructor() {
        if (gm1[hm1]) return gm1[hm1];
        jeB(gm1, hm1, {
            value: this,
            writable: !1,
            enumerable: !1,
            configurable: !1
        })
    }
    on(A, B) {
        this.listeners[A].push(B)
    }
    removeListener(A, B) {
        let Q = this.listeners[A],
            Z = Q.indexOf(B);
        if (Z === -1) return;
        if (Z === 0 && Q.length === 1) Q.length = 0;
        else Q.splice(Z, 1)
    }
    emit(A, B, Q) {
        if (this.emitted[A]) return !1;
        this.emitted[A] = !0;
        let Z = !1;
        for (let D of this.listeners[A]) Z = D(B, Q) === !0 || Z;
        if (A === "exit") Z = this.emit("afterExit", B, Q) || Z;
        return Z
    }
}
class mm1 {}
var keB = (A) => {
    return {
        onExit(B, Q) {
            return A.onExit(B, Q)
        },
        load() {
            return A.load()
        },
        unload() {
            return A.unload()
        }
    }
};
class ty0 extends mm1 {
    onExit() {
        return () => {}
    }
    load() {}
    unload() {}
}
class ey0 extends mm1 {
    #A = um1.platform === "win32" ? "SIGINT" : "SIGHUP";
    #B = new oy0;
    #Q;
    #Z;
    #D;
    #Y = {};
    #G = !1;
    constructor(A) {
        super();
        this.#Q = A, this.#Y = {};
        for (let B of Mf) this.#Y[B] = () => {
            let Q = this.#Q.listeners(B),
                {
                    count: Z
                } = this.#B,
                D = A;
            if (typeof D.__signal_exit_emitter__ === "object" && typeof D.__signal_exit_emitter__.count === "number") Z += D.__signal_exit_emitter__.count;
            if (Q.length === Z) {
                this.unload();
                let G = this.#B.emit("exit", null, B),
                    F = B === "SIGHUP" ? this.#A : B;
                if (!G) A.kill(A.pid, F)
            }
        };
        this.#D = A.reallyExit, this.#Z = A.emit
    }
    onExit(A, B) {
        if (!sW1(this.#Q)) return () => {};
        if (this.#G === !1) this.load();
        let Q = B?.alwaysLast ? "afterExit" : "exit";
        return this.#B.on(Q, A), () => {
            if (this.#B.removeListener(Q, A), this.#B.listeners.exit.length === 0 && this.#B.listeners.afterExit.length === 0) this.unload()
        }
    }
    load() {
        if (this.#G) return;
        this.#G = !0, this.#B.count += 1;
        for (let A of Mf) try {
            let B = this.#Y[A];
            if (B) this.#Q.on(A, B)
        } catch (B) {}
        this.#Q.emit = (A, ...B) => {
            return this.#W(A, ...B)
        }, this.#Q.reallyExit = (A) => {
            return this.#J(A)
        }
    }
    unload() {
        if (!this.#G) return;
        this.#G = !1, Mf.forEach((A) => {
            let B = this.#Y[A];
            if (!B) throw new Error("Listener not defined for signal: " + A);
            try {
                this.#Q.removeListener(A, B)
            } catch (Q) {}
        }), this.#Q.emit = this.#Z, this.#Q.reallyExit = this.#D, this.#B.count -= 1
    }
    #J(A) {
        if (!sW1(this.#Q)) return 0;
        return this.#Q.exitCode = A || 0, this.#B.emit("exit", this.#Q.exitCode, null), this.#D.call(this.#Q, this.#Q.exitCode)
    }
    #W(A, ...B) {
        let Q = this.#Z;
        if (A === "exit" && sW1(this.#Q)) {
            if (typeof B[0] === "number") this.#Q.exitCode = B[0];
            let Z = Q.call(this.#Q, A, ...B);
            return this.#B.emit("exit", this.#Q.exitCode, null), Z
        } else return Q.call(this.#Q, A, ...B)
    }
}
var um1 = globalThis.process,
    {
        onExit: rW1,
        load: vu8,
        unload: bu8
    } = keB(sW1(um1) ? new ey0(um1) : new ty0);
var _eB = 5000,
    A_0 = (A, B = "SIGTERM", Q = {}) => {
        let Z = A(B);
        return xeB(A, B, Q, Z), Z
    },
    xeB = (A, B, Q, Z) => {
        if (!veB(B, Q, Z)) return;
        let D = feB(Q),
            G = setTimeout(() => {
                A("SIGKILL")
            }, D);
        if (G.unref) G.unref()
    },
    veB = (A, {
        forceKillAfterTimeout: B
    }, Q) => beB(A) && B !== !1 && Q,
    beB = (A) => A === yeB.constants.signals.SIGTERM || typeof A === "string" && A.toUpperCase() === "SIGTERM",
    feB = ({
        forceKillAfterTimeout: A = !0
    }) => {
        if (A === !0) return _eB;
        if (!Number.isFinite(A) || A < 0) throw new TypeError(`Expected the \`forceKillAfterTimeout\` option to be a non-negative integer, got \`${A}\` (${typeof A})`);
        return A
    },
    B_0 = (A, B) => {
        if (A.kill()) B.isCanceled = !0
    },
    heB = (A, B, Q) => {
        A.kill(B), Q(Object.assign(new Error("Timed out"), {
            timedOut: !0,
            signal: B
        }))
    },
    Q_0 = (A, {
        timeout: B,
        killSignal: Q = "SIGTERM"
    }, Z) => {
        if (B === 0 || B === void 0) return Z;
        let D, G = new Promise((I, Y) => {
                D = setTimeout(() => {
                    heB(A, Q, Y)
                }, B)
            }),
            F = Z.finally(() => {
                clearTimeout(D)
            });
        return Promise.race([G, F])
    },
    Z_0 = ({
        timeout: A
    }) => {
        if (A !== void 0 && (!Number.isFinite(A) || A < 0)) throw new TypeError(`Expected the \`timeout\` option to be a non-negative integer, got \`${A}\` (${typeof A})`)
    },
    D_0 = async (A, {
        cleanup: B,
        detached: Q
    }, Z) => {
        if (!B || Q) return Z;
        let D = rW1(() => {
            A.kill()
        });
        return Z.finally(() => {
            D()
        })
    };
import {
    createWriteStream as geB
} from "node:fs";
import {
    ChildProcess as ueB
} from "node:child_process";

function oW1(A) {
    return A !== null && typeof A === "object" && typeof A.pipe === "function"
}

function dm1(A) {
    return oW1(A) && A.writable !== !1 && typeof A._write === "function" && typeof A._writableState === "object"
}
var meB = (A) => A instanceof ueB && typeof A.then === "function",
    cm1 = (A, B, Q) => {
        if (typeof Q === "string") return A[B].pipe(geB(Q)), A;
        if (dm1(Q)) return A[B].pipe(Q), A;
        if (!meB(Q)) throw new TypeError("The second argument must be a string, a stream or an Execa child process.");
        if (!dm1(Q.stdin)) throw new TypeError("The target child process's stdin must be available.");
        return A[B].pipe(Q.stdin), Q
    },
    G_0 = (A) => {
        if (A.stdout !== null) A.pipeStdout = cm1.bind(void 0, A, "stdout");
        if (A.stderr !== null) A.pipeStderr = cm1.bind(void 0, A, "stderr");
        if (A.all !== void 0) A.pipeAll = cm1.bind(void 0, A, "all")
    };
import {
    createReadStream as F19,
    readFileSync as I19
} from "node:fs";
import {
    setTimeout as Y19
} from "node:timers/promises";
var S21 = async (A, {
    init: B,
    convertChunk: Q,
    getSize: Z,
    truncateChunk: D,
    addChunk: G,
    getFinalChunk: F,
    finalize: I
}, {
    maxBuffer: Y = Number.POSITIVE_INFINITY
} = {}) => {
    if (!ceB(A)) throw new Error("The first argument must be a Readable, a ReadableStream, or an async iterable.");
    let W = B();
    W.length = 0;
    try {
        for await (let J of A) {
            let X = leB(J),
                V = Q[X](J, W);
            Y_0({
                convertedChunk: V,
                state: W,
                getSize: Z,
                truncateChunk: D,
                addChunk: G,
                maxBuffer: Y
            })
        }
        return deB({
            state: W,
            convertChunk: Q,
            getSize: Z,
            truncateChunk: D,
            addChunk: G,
            getFinalChunk: F,
            maxBuffer: Y
        }), I(W)
    } catch (J) {
        throw J.bufferedData = I(W), J
    }
}, deB = ({
    state: A,
    getSize: B,
    truncateChunk: Q,
    addChunk: Z,
    getFinalChunk: D,
    maxBuffer: G
}) => {
    let F = D(A);
    if (F !== void 0) Y_0({
        convertedChunk: F,
        state: A,
        getSize: B,
        truncateChunk: Q,
        addChunk: Z,
        maxBuffer: G
    })
}, Y_0 = ({
    convertedChunk: A,
    state: B,
    getSize: Q,
    truncateChunk: Z,
    addChunk: D,
    maxBuffer: G
}) => {
    let F = Q(A),
        I = B.length + F;
    if (I <= G) {
        F_0(A, B, D, I);
        return
    }
    let Y = Z(A, G - B.length);
    if (Y !== void 0) F_0(Y, B, D, G);
    throw new lm1
}, F_0 = (A, B, Q, Z) => {
    B.contents = Q(A, B, Z), B.length = Z
}, ceB = (A) => typeof A === "object" && A !== null && typeof A[Symbol.asyncIterator] === "function", leB = (A) => {
    let B = typeof A;
    if (B === "string") return "string";
    if (B !== "object" || A === null) return "others";
    if (globalThis.Buffer?.isBuffer(A)) return "buffer";
    let Q = I_0.call(A);
    if (Q === "[object ArrayBuffer]") return "arrayBuffer";
    if (Q === "[object DataView]") return "dataView";
    if (Number.isInteger(A.byteLength) && Number.isInteger(A.byteOffset) && I_0.call(A.buffer) === "[object ArrayBuffer]") return "typedArray";
    return "others"
}, {
    toString: I_0
} = Object.prototype;
class lm1 extends Error {
    name = "MaxBufferError";
    constructor() {
        super("maxBuffer exceeded")
    }
}
var pm1 = (A) => A,
    im1 = () => {
        return
    },
    nm1 = ({
        contents: A
    }) => A,
    tW1 = (A) => {
        throw new Error(`Streams in object mode are not supported: ${String(A)}`)
    },
    eW1 = (A) => A.length;
async function am1(A, B) {
    return S21(A, eeB, B)
}