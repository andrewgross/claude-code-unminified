/* chunk:494 bytes:[11814653, 11831939) size:17286 source:unpacked-cli.js */
function doB(A, B, Q) {
    if (Q !== void 0 && !mq(A[B], Q) || Q === void 0 && !(B in A)) hj(A, B, Q)
}
var q21 = doB;

function coB(A) {
    return RF(A) && dq(A)
}
var tj0 = coB;

function loB(A, B) {
    if (B === "constructor" && typeof A[B] === "function") return;
    if (B == "__proto__") return;
    return A[B]
}
var N21 = loB;

function poB(A) {
    return dH(A, pq(A))
}
var ej0 = poB;

function ioB(A, B, Q, Z, D, G, F) {
    var I = N21(A, Q),
        Y = N21(B, Q),
        W = F.get(Y);
    if (W) {
        q21(A, Q, W);
        return
    }
    var J = G ? G(I, Y, Q + "", A, B, F) : void 0,
        X = J === void 0;
    if (X) {
        var V = x5(Y),
            C = !V && cq(Y),
            K = !V && !C && Fl(Y);
        if (J = Y, V || C || K)
            if (x5(I)) J = I;
            else if (tj0(I)) J = oY1(I);
        else if (C) X = !1, J = U21(Y, !0);
        else if (K) X = !1, J = UW1(Y, !0);
        else J = [];
        else if (wf(Y) || YO(Y)) {
            if (J = I, YO(I)) J = ej0(I);
            else if (!QZ(I) || Bl(I)) J = wW1(Y)
        } else X = !1
    }
    if (X) F.set(Y, J), D(J, Y, Z, G, F), F.delete(Y);
    q21(A, Q, J)
}
var Ak0 = ioB;

function Bk0(A, B, Q, Z, D) {
    if (A === B) return;
    jW1(B, function(G, F) {
        if (D || (D = new iq), QZ(G)) Ak0(A, B, F, Q, Bk0, Z, D);
        else {
            var I = Z ? Z(N21(A, F), G, F + "", A, B, D) : void 0;
            if (I === void 0) I = G;
            q21(A, F, I)
        }
    }, pq)
}
var Qk0 = Bk0;
var noB = aP0(function(A, B, Q, Z) {
        Qk0(A, B, Q, Z)
    }),
    _W1 = noB;

function aoB(A, B, Q) {
    var Z = -1,
        D = A == null ? 0 : A.length;
    while (++Z < D)
        if (Q(B, A[Z])) return !0;
    return !1
}
var Zk0 = aoB;

function soB(A) {
    var B = A == null ? 0 : A.length;
    return B ? A[B - 1] : void 0
}
var ZI = soB;

function roB(A, B) {
    var Q = [];
    return yW1(A, function(Z, D, G) {
        if (B(Z, D, G)) Q.push(Z)
    }), Q
}
var Dk0 = roB;

function ooB(A, B) {
    return ec(B, function(Q) {
        return A[Q]
    })
}
var Gk0 = ooB;

function toB(A) {
    return A == null ? [] : Gk0(A, cH(A))
}
var Fk0 = toB;

function eoB(A, B) {
    return B.length < 2 ? A : lj(A, IW1(B, 0, -1))
}
var Ik0 = eoB;

function AtB(A, B) {
    return wl(A, B)
}
var xW1 = AtB;

function BtB(A, B) {
    var Q = {};
    return B = nq(B, 3), kW1(A, function(Z, D, G) {
        hj(Q, D, B(Z, D, G))
    }), Q
}
var ij = BtB;

function QtB(A, B) {
    var Q, Z = -1,
        D = A.length;
    while (++Z < D) {
        var G = B(A[Z]);
        if (G !== void 0) Q = Q === void 0 ? G : Q + G
    }
    return Q
}
var Yk0 = QtB;
var ZtB = "Expected a function";

function DtB(A) {
    if (typeof A != "function") throw new TypeError(ZtB);
    return function() {
        var B = arguments;
        switch (B.length) {
            case 0:
                return !A.call(this);
            case 1:
                return !A.call(this, B[0]);
            case 2:
                return !A.call(this, B[0], B[1]);
            case 3:
                return !A.call(this, B[0], B[1], B[2])
        }
        return !A.apply(this, B)
    }
}
var Wk0 = DtB;

function GtB(A, B) {
    return B = lH(B, A), A = Ik0(A, B), A == null || delete A[pH(ZI(B))]
}
var Jk0 = GtB;

function FtB(A) {
    return wf(A) ? void 0 : A
}
var Xk0 = FtB;
var ItB = 1,
    YtB = 2,
    WtB = 4,
    JtB = FW1(function(A, B) {
        var Q = {};
        if (A == null) return Q;
        var Z = !1;
        if (B = ec(B, function(G) {
                return G = lH(G, A), Z || (Z = G.length > 1), G
            }), dH(A, HW1(A), Q), Z) Q = qW1(Q, ItB | YtB | WtB, Xk0);
        var D = B.length;
        while (D--) Jk0(Q, B[D]);
        return Q
    }),
    Vm1 = JtB;

function XtB(A, B, Q, Z) {
    if (!QZ(A)) return A;
    B = lH(B, A);
    var D = -1,
        G = B.length,
        F = G - 1,
        I = A;
    while (I != null && ++D < G) {
        var Y = pH(B[D]),
            W = Q;
        if (Y === "__proto__" || Y === "constructor" || Y === "prototype") return A;
        if (D != F) {
            var J = I[Y];
            if (W = Z ? Z(J, Y, I) : void 0, W === void 0) W = QZ(J) ? J : fj(B[D + 1]) ? [] : {}
        }
        gj(I, Y, W), I = I[Y]
    }
    return A
}
var vW1 = XtB;

function VtB(A, B, Q) {
    var Z = -1,
        D = B.length,
        G = {};
    while (++Z < D) {
        var F = B[Z],
            I = lj(A, F);
        if (Q(I, F)) vW1(G, lH(F, A), I)
    }
    return G
}
var Vk0 = VtB;
var CtB = oj0(function(A, B, Q) {
        A[Q ? 0 : 1].push(B)
    }, function() {
        return [
            [],
            []
        ]
    }),
    Cm1 = CtB;

function KtB(A, B) {
    return Vk0(A, B, function(Q, Z) {
        return SW1(A, Z)
    })
}
var Ck0 = KtB;
var HtB = FW1(function(A, B) {
        return A == null ? {} : Ck0(A, B)
    }),
    bW1 = HtB;
var {
    floor: ztB,
    random: EtB
} = Math;

function UtB(A, B) {
    return A + ztB(EtB() * (B - A + 1))
}
var Kk0 = UtB;

function wtB(A, B) {
    var Q = x5(A) ? XW1 : Dk0;
    return Q(A, Wk0(nq(B, 3)))
}
var fW1 = wtB;

function $tB(A) {
    var B = A.length;
    return B ? A[Kk0(0, B - 1)] : void 0
}
var hW1 = $tB;

function qtB(A) {
    return hW1(Fk0(A))
}
var Hk0 = qtB;

function NtB(A) {
    var B = x5(A) ? hW1 : Hk0;
    return B(A)
}
var qf = NtB;

function LtB(A, B, Q, Z) {
    return Z = typeof Z == "function" ? Z : void 0, A == null ? A : vW1(A, B, Q, Z)
}
var Km1 = LtB;

function MtB(A, B) {
    return A && A.length ? Yk0(A, nq(B, 2)) : 0
}
var Nf = MtB;
var RtB = 1 / 0,
    OtB = !(pj && 1 / Ul(new pj([, -0]))[1] == RtB) ? vP0 : function(A) {
        return new pj(A)
    },
    zk0 = OtB;
var TtB = 200;

function PtB(A, B, Q) {
    var Z = -1,
        D = lP0,
        G = A.length,
        F = !0,
        I = [],
        Y = I;
    if (Q) F = !1, D = Zk0;
    else if (G >= TtB) {
        var W = B ? null : zk0(A);
        if (W) return Ul(W);
        F = !1, D = MW1, Y = new LW1
    } else Y = B ? [] : I;
    A: while (++Z < G) {
        var J = A[Z],
            X = B ? B(J) : J;
        if (J = Q || J !== 0 ? J : 0, F && X === X) {
            var V = Y.length;
            while (V--)
                if (Y[V] === X) continue A;
            if (B) Y.push(X);
            I.push(J)
        } else if (!D(Y, X, Q)) {
            if (Y !== I) Y.push(X);
            I.push(J)
        }
    }
    return I
}
var Ek0 = PtB;

function StB(A, B) {
    return A && A.length ? Ek0(A, nq(B, 2)) : []
}
var Lf = StB;

function jtB(A, B, Q) {
    var Z = -1,
        D = A.length,
        G = B.length,
        F = {};
    while (++Z < D) {
        var I = Z < G ? B[Z] : void 0;
        Q(F, A[Z], I)
    }
    return F
}
var Uk0 = jtB;

function ktB(A, B) {
    return Uk0(A || [], B || [], gj)
}
var Hm1 = ktB;

function ytB() {
    return {
        originalCwd: wk0(),
        totalCostUSD: 0,
        totalAPIDuration: 0,
        totalAPIDurationWithoutRetries: 0,
        startTime: Date.now(),
        lastInteractionTime: Date.now(),
        totalLinesAdded: 0,
        totalLinesRemoved: 0,
        hasUnknownModelCost: !1,
        cwd: wk0(),
        modelUsage: {},
        mainLoopModelOverride: void 0,
        maxRateLimitFallbackActive: !1,
        initialMainLoopModel: null,
        modelStrings: null,
        isNonInteractiveSession: !0,
        isInteractive: !1,
        clientType: "cli",
        flagSettingsPath: void 0,
        meter: null,
        sessionCounter: null,
        locCounter: null,
        prCounter: null,
        commitCounter: null,
        costCounter: null,
        tokenCounter: null,
        codeEditToolDecisionCounter: null,
        activeTimeCounter: null,
        sessionId: $k0(),
        loggerProvider: null,
        eventLogger: null,
        agentColorMap: new Map,
        agentColorIndex: 0,
        backgroundShells: new Map,
        backgroundShellCounter: 0,
        backgroundShellSubscribers: new Set
    }
}
var i2 = ytB();

function CB() {
    return i2.sessionId
}

function qk0() {
    return i2.sessionId = $k0(), i2.sessionId
}

function Nk0(A) {
    i2.sessionId = A
}

function _9() {
    return i2.originalCwd
}

function Lk0() {
    return i2.cwd
}

function Mk0(A) {
    i2.cwd = A
}
async function Rk0(A, B, Q, Z, D) {
    i2.totalCostUSD += A, i2.totalAPIDuration += B, i2.totalAPIDurationWithoutRetries += Q;
    let G = i2.modelUsage[D] ?? {
        inputTokens: 0,
        outputTokens: 0,
        cacheReadInputTokens: 0,
        cacheCreationInputTokens: 0,
        webSearchRequests: 0
    };
    G.inputTokens += Z.input_tokens, G.outputTokens += Z.output_tokens, G.cacheReadInputTokens += Z.cache_read_input_tokens ?? 0, G.cacheCreationInputTokens += Z.cache_creation_input_tokens ?? 0, G.webSearchRequests += Z.server_tool_use?.web_search_requests ?? 0, i2.modelUsage[D] = G
}

function aq() {
    return i2.totalCostUSD
}

function nj() {
    return i2.totalAPIDuration
}

function zm1() {
    return Date.now() - i2.startTime
}

function L21() {
    i2.lastInteractionTime = Date.now()
}

function Em1(A, B) {
    i2.totalLinesAdded += A, i2.totalLinesRemoved += B
}

function gW1() {
    return i2.totalLinesAdded
}

function uW1() {
    return i2.totalLinesRemoved
}

function Ok0() {
    return Nf(Object.values(i2.modelUsage), "inputTokens")
}

function Tk0() {
    return Nf(Object.values(i2.modelUsage), "outputTokens")
}

function Pk0() {
    return Nf(Object.values(i2.modelUsage), "cacheReadInputTokens")
}

function Sk0() {
    return Nf(Object.values(i2.modelUsage), "cacheCreationInputTokens")
}

function jk0() {
    return Nf(Object.values(i2.modelUsage), "webSearchRequests")
}

function Um1() {
    i2.hasUnknownModelCost = !0
}

function kk0() {
    return i2.hasUnknownModelCost
}

function mW1() {
    return i2.lastInteractionTime
}

function yk0() {
    return i2.modelUsage
}

function M21() {
    return i2.mainLoopModelOverride
}

function dW1() {
    return i2.initialMainLoopModel
}

function R21(A) {
    i2.mainLoopModelOverride = A
}

function $l() {
    return i2.maxRateLimitFallbackActive
}

function _k0(A) {
    i2.maxRateLimitFallbackActive = A
}

function xk0(A) {
    i2.initialMainLoopModel = A
}

function cW1() {
    return i2.modelStrings
}

function wm1(A) {
    i2.modelStrings = A
}

function vk0(A, B) {
    i2.meter = A, i2.sessionCounter = B("claude_code.session.count", {
        description: "Count of CLI sessions started"
    }), i2.locCounter = B("claude_code.lines_of_code.count", {
        description: "Count of lines of code modified, with the 'type' attribute indicating whether lines were added or removed"
    }), i2.prCounter = B("claude_code.pull_request.count", {
        description: "Number of pull requests created"
    }), i2.commitCounter = B("claude_code.commit.count", {
        description: "Number of git commits created"
    }), i2.costCounter = B("claude_code.cost.usage", {
        description: "Cost of the Claude Code session",
        unit: "USD"
    }), i2.tokenCounter = B("claude_code.token.usage", {
        description: "Number of tokens used",
        unit: "tokens"
    }), i2.codeEditToolDecisionCounter = B("claude_code.code_edit_tool.decision", {
        description: "Count of code editing tool permission decisions (accept/reject) for Edit, MultiEdit, Write, and NotebookEdit tools"
    }), i2.activeTimeCounter = B("claude_code.active_time.total", {
        description: "Total active time in seconds",
        unit: "s"
    })
}

function bk0() {
    return i2.sessionCounter
}

function $m1() {
    return i2.locCounter
}

function fk0() {
    return i2.prCounter
}

function hk0() {
    return i2.commitCounter
}

function gk0() {
    return i2.costCounter
}

function O21() {
    return i2.tokenCounter
}

function ql() {
    return i2.codeEditToolDecisionCounter
}

function qm1() {
    return i2.activeTimeCounter
}

function uk0() {
    return i2.loggerProvider
}

function mk0(A) {
    i2.loggerProvider = A
}

function dk0() {
    return i2.eventLogger
}

function ck0(A) {
    i2.eventLogger = A
}

function Nl() {
    return i2.isNonInteractiveSession
}

function lk0(A) {
    i2.isNonInteractiveSession = A
}

function pk0() {
    return i2.isInteractive
}

function ik0(A) {
    i2.isInteractive = A
}

function nk0() {
    return i2.clientType
}

function ak0(A) {
    i2.clientType = A
}

function Nm1() {
    return i2.agentColorMap
}

function sk0() {
    return i2.agentColorIndex
}

function rk0() {
    i2.agentColorIndex++
}

function Lm1() {
    return i2.flagSettingsPath
}

function ok0(A) {
    i2.flagSettingsPath = A
}

function sq() {
    return i2.backgroundShells
}

function tk0(A, B) {
    i2.backgroundShells.set(A, B)
}

function ek0(A) {
    return i2.backgroundShells.delete(A)
}

function Ll() {
    return i2.backgroundShellSubscribers
}

function Ay0() {
    return ++i2.backgroundShellCounter
}
import {
    resolve as QN2,
    dirname as ZN2,
    normalize as Si4,
    join as y51
} from "path";
var S_0 = G1(_m1(), 1);
import {
    Buffer as L19
} from "node:buffer";
import M19 from "node:path";
import Zd1 from "node:child_process";
import ZJ1 from "node:process";

function xm1(A) {
    let B = typeof A === "string" ? `
` : `
`.charCodeAt(),
        Q = typeof A === "string" ? "\r" : "\r".charCodeAt();
    if (A[A.length - 1] === B) A = A.slice(0, -1);
    if (A[A.length - 1] === Q) A = A.slice(0, -1);
    return A
}
import iW1 from "node:process";
import T21 from "node:path";
import {
    fileURLToPath as dy0
} from "node:url";

function pW1(A = {}) {
    let {
        env: B = process.env,
        platform: Q = process.platform
    } = A;
    if (Q !== "win32") return "PATH";
    return Object.keys(B).reverse().find((Z) => Z.toUpperCase() === "PATH") || "Path"
}
var YeB = ({
        cwd: A = iW1.cwd(),
        path: B = iW1.env[pW1()],
        preferLocal: Q = !0,
        execPath: Z = iW1.execPath,
        addExecPath: D = !0
    } = {}) => {
        let G = A instanceof URL ? dy0(A) : A,
            F = T21.resolve(G),
            I = [];
        if (Q) WeB(I, F);
        if (D) JeB(I, Z, F);
        return [...I, B].join(T21.delimiter)
    },
    WeB = (A, B) => {
        let Q;
        while (Q !== B) A.push(T21.join(B, "node_modules/.bin")), Q = B, B = T21.resolve(B, "..")
    },
    JeB = (A, B, Q) => {
        let Z = B instanceof URL ? dy0(B) : B;
        A.push(T21.resolve(Q, Z, ".."))
    },
    cy0 = ({
        env: A = iW1.env,
        ...B
    } = {}) => {
        A = {
            ...A
        };
        let Q = pW1({
            env: A
        });
        return B.path = A[Q], A[Q] = YeB(B), A
    };
var XeB = (A, B, Q, Z) => {
        if (Q === "length" || Q === "prototype") return;
        if (Q === "arguments" || Q === "caller") return;
        let D = Object.getOwnPropertyDescriptor(A, Q),
            G = Object.getOwnPropertyDescriptor(B, Q);
        if (!VeB(D, G) && Z) return;
        Object.defineProperty(A, Q, G)
    },
    VeB = function(A, B) {
        return A === void 0 || A.configurable || A.writable === B.writable && A.enumerable === B.enumerable && A.configurable === B.configurable && (A.writable || A.value === B.value)
    },
    CeB = (A, B) => {
        let Q = Object.getPrototypeOf(B);
        if (Q === Object.getPrototypeOf(A)) return;
        Object.setPrototypeOf(A, Q)
    },
    KeB = (A, B) => `/* Wrapped ${A}*/
${B}`,
    HeB = Object.getOwnPropertyDescriptor(Function.prototype, "toString"),
    zeB = Object.getOwnPropertyDescriptor(Function.prototype.toString, "name"),
    EeB = (A, B, Q) => {
        let Z = Q === "" ? "" : `with ${Q.trim()}() `,
            D = KeB.bind(null, Z, B.toString());
        Object.defineProperty(D, "name", zeB), Object.defineProperty(A, "toString", {
            ...HeB,
            value: D
        })
    };

function vm1(A, B, {
    ignoreNonConfigurable: Q = !1
} = {}) {
    let {
        name: Z
    } = A;
    for (let D of Reflect.ownKeys(B)) XeB(A, B, D, Q);
    return CeB(A, B), EeB(A, B, Z), A
}
var nW1 = new WeakMap,
    ly0 = (A, B = {}) => {
        if (typeof A !== "function") throw new TypeError("Expected a function");
        let Q, Z = 0,
            D = A.displayName || A.name || "<anonymous>",
            G = function(...F) {
                if (nW1.set(G, ++Z), Z === 1) Q = A.apply(this, F), A = null;
                else if (B.throw === !0) throw new Error(`Function \`${D}\` can only be called once`);
                return Q
            };
        return vm1(G, A), nW1.set(G, Z), G
    };
ly0.callCount = (A) => {
    if (!nW1.has(A)) throw new Error(`The given function \`${A.name}\` is not wrapped by the \`onetime\` package`);
    return nW1.get(A)
};
var py0 = ly0;
import TeB from "node:process";
import {
    constants as qeB
} from "node:os";
var iy0 = () => {
        let A = bm1 - ny0 + 1;
        return Array.from({
            length: A
        }, UeB)
    },
    UeB = (A, B) => ({
        name: `SIGRT${B+1}`,
        number: ny0 + B,
        action: "terminate",
        description: "Application-specific signal (realtime)",
        standard: "posix"
    }),
    ny0 = 34,
    bm1 = 64;
import {
    constants as weB
} from "node:os";