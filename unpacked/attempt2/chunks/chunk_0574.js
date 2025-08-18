/* chunk:574 bytes:[13347998, 13367991) size:19993 source:unpacked-cli.js */
function NG8(A, B, Q, Z) {
    let D = {
        id: A,
        command: B,
        status: "running",
        startTime: Date.now(),
        shellCommand: Q,
        completionStatusSentInAttachment: !1,
        stdout: "",
        stderr: ""
    };
    n1(`BackgroundShell ${A} created for command: ${B}`);
    let G = () => {
        if (D.status === "running") sTB(D), rTB(D)
    };
    D.unregisterCleanup = oL(G);
    let F = Q.background(A);
    if (!F) D.status = "failed", D.result = {
        code: 1,
        interrupted: !1
    };
    else F.stdoutStream.on("data", (I) => {
        D.stdout += I.toString()
    }), F.stderrStream.on("data", (I) => {
        D.stderr += I.toString()
    }), Q.result.then((I) => {
        if (D.status === "killed") return;
        if (I.code === 0) D.status = "completed";
        else D.status = "failed";
        D.result = {
            code: I.code,
            interrupted: I.interrupted
        }, n1(`BackgroundShell ${A} completed with code ${I.code} (interrupted: ${I.interrupted})`), Z(I)
    });
    return D
}

function LG8(A) {
    return tk0(A.id, A), Fb1(Ll()), A.id
}

function MG8(A, B) {
    let Z = sq().get(A);
    if (!Z) return;
    if (Z.status = B.code === 0 ? "completed" : "failed", n1(`Shell ${A} completed: status=${Z.status}, code=${B.code}, interrupted=${B.interrupted}`), B.code === 143) n1(`Shell ${A} exited with code 143 (SIGTERM) - likely terminated by timeout or explicit kill`);
    Z.result = {
        code: B.code,
        interrupted: B.interrupted
    }, Fb1(Ll())
}

function RG8() {
    return `bash_${Ay0()}`
}

function sTB(A) {
    try {
        return n1(`BackgroundShell ${A.id} kill requested`), A.status = "killed", A.shellCommand?.kill(), !0
    } catch (B) {
        return R1(B instanceof Error ? B : new Error(String(B))), !1
    }
}

function rTB(A) {
    if (A.unregisterCleanup) A.unregisterCleanup(), A.unregisterCleanup = void 0;
    if (A.cleanupTimeoutId) clearTimeout(A.cleanupTimeoutId), A.cleanupTimeoutId = void 0;
    A.shellCommand = null
}

function CN0(A, B) {
    let Q = RG8();
    n1(`Moving command to background: ${A} (shellId: ${Q})`);
    let Z = NG8(Q, A, B, (D) => {
        MG8(Q, D)
    });
    return LG8(Z), Q
}

function oTB() {
    return Array.from(sq().values())
}

function OG8() {
    return Array.from(sq().values()).filter((A) => A.status === "running")
}

function gG1(A) {
    return sq().get(A)
}

function Ib1(A) {
    let Q = sq().get(A);
    if (!Q) return {
        shellId: A,
        command: "",
        status: "failed",
        exitCode: null,
        stdout: "",
        stderr: "Shell not found"
    };
    let Z = Q.result ? Q.result.code : null,
        {
            stdout: D,
            stderr: G
        } = TG8(Q);
    return {
        shellId: A,
        command: Q.command,
        status: Q.status,
        exitCode: Z,
        stdout: D.trimEnd(),
        stderr: G.trimEnd()
    }
}

function TG8(A) {
    let B = {
        stdout: A.stdout,
        stderr: A.stderr
    };
    return A.stdout = "", A.stderr = "", B
}

function KN0(A) {
    return !!A.stdout
}

function tTB() {
    return OG8().map((A) => {
        let B = KN0(A);
        return {
            id: A.id,
            command: A.command,
            hasNewOutput: B
        }
    })
}

function Yb1(A) {
    let Q = sq().get(A);
    if (Q && Q.status === "running") {
        if (n1(`Killing shell ${A} (command: ${Q.command})`), sTB(Q), Q.cleanupTimeoutId) clearTimeout(Q.cleanupTimeoutId);
        let Z = setTimeout(() => {
            let D = sq().get(A);
            if (D) rTB(D), ek0(A), Fb1(Ll())
        }, 1800000);
        return Q.cleanupTimeoutId = Z, Fb1(Ll()), !0
    }
    return !1
}

function eTB() {
    let A = sq();
    return Array.from(A.values()).filter((B) => B.status !== "running" && !B.completionStatusSentInAttachment)
}

function APB(A) {
    let Q = sq().get(A);
    if (Q) Q.completionStatusSentInAttachment = !0
}

function Y01(A) {
    return new jw({
        max: A
    })
}

function BPB(A) {
    return Object.fromEntries(A.entries())
}

function hv(A) {
    return Array.from(A.keys())
}
async function PG8(A, B, Q, Z, D) {
    let G = B.join(" ").trim(),
        F = await Z({
            ...A,
            command: G
        }),
        I = Nq0(Q).every((K) => {
            return VQ.isReadOnly({
                ...A,
                command: K.trim()
            })
        }),
        Y = Q.join(" ").trim(),
        W = {
            type: "other",
            reason: I ? "Pipe right-hand command is read-only" : "The piped command sequence requires approval"
        },
        J = I ? {
            behavior: "allow",
            updatedInput: A,
            decisionReason: W
        } : {
            behavior: "ask",
            message: _V(D, VQ.name, W),
            decisionReason: W
        },
        X = new Map([
            [G, F],
            [Y, J]
        ]);
    if (F.behavior === "deny") return {
        behavior: "deny",
        message: F.message,
        decisionReason: {
            type: "subcommandResults",
            reasons: X
        }
    };
    if (F.behavior === "allow" && J.behavior === "allow") return {
        behavior: "allow",
        updatedInput: A,
        decisionReason: {
            type: "subcommandResults",
            reasons: X
        }
    };
    let V = J.behavior === "allow" ? F.behavior !== "allow" ? F.ruleSuggestions : void 0 : void 0,
        C = {
            type: "subcommandResults",
            reasons: X
        };
    return {
        behavior: "ask",
        message: _V(D, VQ.name, C),
        decisionReason: C,
        ruleSuggestions: V
    }
}
async function QPB(A, B, Q) {
    if (JRB(A.command)) {
        let G = Tv(A.command),
            F = {
                type: "other",
                reason: G.behavior === "ask" && G.message ? G.message : "This command uses shell operators that require approval for safety"
            };
        return {
            behavior: "ask",
            message: _V(Q, VQ.name, F),
            decisionReason: F
        }
    }
    let Z = qq0(A.command),
        D = Z.findIndex((G) => G === "|");
    if (D >= 0) {
        let G = Z.slice(0, D),
            F = Z.slice(D + 1);
        return PG8(A, G, F, B, Q)
    }
    return {
        behavior: "passthrough",
        message: "No special operators found in command",
        ruleSuggestions: []
    }
}
import {
    isAbsolute as zN0,
    resolve as EN0
} from "path";
import {
    homedir as ZPB
} from "os";
var DPB = G1(gw(), 1);
var HN0 = 5,
    GPB = /[*?[\]{}]/;

function SG8(A) {
    let B = A.length;
    if (B <= HN0) return A.map((Z) => `'${Z}'`).join(", ");
    return `${A.slice(0,HN0).map((Z)=>`'${Z}'`).join(", ")}, and ${B-HN0} more`
}

function jG8(A) {
    let B = A.match(GPB);
    if (!B || B.index === void 0) return A;
    let Q = A.substring(0, B.index),
        Z = Q.lastIndexOf("/");
    if (Z === -1) return ".";
    return Q.substring(0, Z) || "/"
}

function kG8(A, B, Q) {
    if (A.includes("..")) {
        let I = zN0(A) ? A : EN0(B, A),
            {
                resolvedPath: Y
            } = XV(j1(), I);
        return {
            allowed: EK(Y, Q),
            resolvedPath: Y
        }
    }
    let Z = jG8(A),
        D = zN0(Z) ? Z : EN0(B, Z),
        {
            resolvedPath: G
        } = XV(j1(), D);
    return {
        allowed: EK(G, Q),
        resolvedPath: G
    }
}

function yG8(A) {
    if (A === "~" || A.startsWith("~/")) return ZPB() + A.slice(1);
    return A
}

function _G8(A, B, Q) {
    let Z = yG8(A.replace(/^['"]|['"]$/g, ""));
    if (GPB.test(Z)) return kG8(Z, B, Q);
    let D = zN0(Z) ? Z : EN0(B, Z),
        {
            resolvedPath: G
        } = XV(j1(), D);
    return {
        allowed: EK(G, Q),
        resolvedPath: G
    }
}
var FPB = {
        cd: (A) => A.length === 0 ? [ZPB()] : [A.join(" ")],
        ls: (A) => {
            let B = A.filter((Q) => !Q.startsWith("-"));
            return B.length === 0 ? ["."] : B
        },
        find: (A) => {
            let B = [],
                Q = new Set(["-newer", "-anewer", "-cnewer", "-mnewer", "-samefile", "-path", "-wholename", "-ilname", "-lname", "-ipath", "-iwholename"]),
                Z = /^-newer[acmBt][acmtB]$/;
            for (let D = 0; D < A.length; D++) {
                let G = A[D];
                if (!G) continue;
                if (G === "-H" || G === "-L" || G === "-P") continue;
                if (G.startsWith("-") && (Q.has(G) || Z.test(G))) {
                    if (D + 1 < A.length) {
                        let F = A[D + 1];
                        if (F) B.push(F), D++
                    }
                    continue
                }
                if (G.startsWith("-")) break;
                B.push(G)
            }
            return B.length === 0 ? ["."] : B
        }
    },
    xG8 = Object.keys(FPB);

function vG8(A, B, Q, Z) {
    let D = FPB[A],
        G = D(B);
    for (let F of G) {
        let {
            allowed: I,
            resolvedPath: Y
        } = _G8(F, Q, Z);
        if (!I) {
            let W = Array.from(a61(Z)),
                J = SG8(W),
                X = {
                    cd: "change directories to",
                    ls: "list files in",
                    find: "search files in"
                } [A] || "access";
            return {
                valid: !1,
                message: `${A} in '${Y}' was blocked. For security, Claude Code may only ${X} the allowed working directories for this session: ${J}.`,
                blockedPath: Y
            }
        }
    }
    return {
        valid: !0
    }
}

function bG8(A) {
    return (B, Q, Z) => {
        let D = vG8(A, B, Q, Z);
        return D.valid ? {
            behavior: "passthrough",
            message: `Path validation passed for ${A} command`
        } : {
            behavior: "ask",
            message: D.message,
            blockedPath: D.blockedPath
        }
    }
}

function fG8(A) {
    let B = DPB.parse(A, (Z) => `$${Z}`),
        Q = [];
    for (let Z of B)
        if (typeof Z === "string") Q.push(Z);
        else if (typeof Z === "object" && Z !== null && "op" in Z && Z.op === "glob" && "pattern" in Z) Q.push(String(Z.pattern));
    return Q
}

function hG8(A, B, Q) {
    let Z = fG8(A);
    if (Z.length === 0) return {
        behavior: "passthrough",
        message: "Empty command - no paths to validate"
    };
    let [D, ...G] = Z;
    if (!D || !xG8.includes(D)) return {
        behavior: "passthrough",
        message: `Command '${D}' is not a path-restricted command`
    };
    return bG8(D)(G, B, Q)
}

function IPB(A, B, Q) {
    let Z = aM(A.command);
    for (let D of Z) {
        let G = hG8(D, B, Q);
        if (G.behavior === "ask" || G.behavior === "deny") return G
    }
    return {
        behavior: "passthrough",
        message: "All path commands validated successfully"
    }
}
var gG8 = (A) => `${A}:*`;

function wN0(A) {
    return [{
        toolName: VQ.name,
        ruleContent: A
    }]
}

function uG8(A) {
    return [{
        toolName: VQ.name,
        ruleContent: gG8(A)
    }]
}
var $N0 = (A) => {
    return A.match(/^(.+):\*$/)?.[1] ?? null
};

function mG8(A) {
    let B = $N0(A);
    if (B !== null) return {
        type: "prefix",
        prefix: B
    };
    else return {
        type: "exact",
        command: A
    }
}

function UN0(A, B, Q) {
    let Z = A.command.trim();
    return Array.from(B.entries()).filter(([D]) => {
        let G = mG8(D);
        switch (G.type) {
            case "exact":
                return G.command === Z;
            case "prefix":
                switch (Q) {
                    case "exact":
                        return G.prefix === Z;
                    case "prefix":
                        return Z.startsWith(G.prefix)
                }
        }
    }).map(([, D]) => D)
}

function WPB(A, B, Q) {
    let Z = fz(B, VQ, "deny"),
        D = UN0(A, Z, Q),
        G = fz(B, VQ, "ask"),
        F = UN0(A, G, Q),
        I = fz(B, VQ, "allow"),
        Y = UN0(A, I, Q);
    return {
        matchingDenyRules: D,
        matchingAskRules: F,
        matchingAllowRules: Y
    }
}
var qN0 = (A, B) => {
        let Q = A.command.trim(),
            {
                matchingDenyRules: Z,
                matchingAskRules: D,
                matchingAllowRules: G
            } = WPB(A, B, "exact");
        if (Z[0] !== void 0) return {
            behavior: "deny",
            message: `Permission to use ${VQ.name} with command ${Q} has been denied.`,
            decisionReason: {
                type: "rule",
                rule: Z[0]
            }
        };
        if (D[0] !== void 0) return {
            behavior: "ask",
            message: _V(B, VQ.name),
            decisionReason: {
                type: "rule",
                rule: D[0]
            }
        };
        if (G[0] !== void 0) return {
            behavior: "allow",
            updatedInput: A,
            decisionReason: {
                type: "rule",
                rule: G[0]
            }
        };
        let F = {
            type: "other",
            reason: "This command requires approval"
        };
        return {
            behavior: "passthrough",
            message: _V(B, VQ.name, F),
            decisionReason: F,
            ruleSuggestions: wN0(Q)
        }
    },
    JPB = (A, B) => {
        let Q = A.command.trim(),
            Z = qN0(A, B);
        if (Z.behavior === "deny" || Z.behavior === "ask") return Z;
        let {
            matchingDenyRules: D,
            matchingAskRules: G,
            matchingAllowRules: F
        } = WPB(A, B, "prefix");
        if (D[0] !== void 0) return {
            behavior: "deny",
            message: `Permission to use ${VQ.name} with command ${Q} has been denied.`,
            decisionReason: {
                type: "rule",
                rule: D[0]
            }
        };
        if (G[0] !== void 0) return {
            behavior: "ask",
            message: _V(B, VQ.name),
            decisionReason: {
                type: "rule",
                rule: G[0]
            }
        };
        if (Z.behavior === "allow") return Z;
        if (F[0] !== void 0) return {
            behavior: "allow",
            updatedInput: A,
            decisionReason: {
                type: "rule",
                rule: F[0]
            }
        };
        let I = IPB(A, t0(), B);
        if (I.behavior !== "passthrough") return I;
        if (VQ.isReadOnly(A)) return {
            behavior: "allow",
            updatedInput: A,
            decisionReason: {
                type: "other",
                reason: "Read-only command is allowed"
            }
        };
        let Y = {
            type: "other",
            reason: "This command requires approval"
        };
        return {
            behavior: "passthrough",
            message: _V(B, VQ.name, Y),
            decisionReason: Y,
            ruleSuggestions: wN0(Q)
        }
    };

function YPB(A, B, Q) {
    let Z = qN0(A, B);
    if (Z.behavior !== "passthrough") return Z;
    let D = JPB(A, B);
    if (D.behavior === "deny" || D.behavior === "ask") return D;
    if (!IQ(process.env.CLAUDE_CODE_DISABLE_COMMAND_INJECTION_CHECK)) {
        let F = Tv(A.command);
        if (Q?.commandInjectionDetected || F.behavior !== "passthrough") {
            let I = {
                type: "other",
                reason: F.behavior === "ask" && F.message ? F.message : "This command contains patterns that could pose security risks and requires approval"
            };
            return {
                behavior: "ask",
                message: _V(B, VQ.name, I),
                decisionReason: I
            }
        }
    }
    if (D.behavior === "allow") return D;
    let G = Q && !Q.commandInjectionDetected && Q.commandPrefix ? uG8(Q.commandPrefix) : wN0(A.command);
    return {
        ...D,
        ruleSuggestions: G
    }
}
var NN0 = async (A, B, Q = YRB) => {
    let Z = qN0(A, B.getToolPermissionContext());
    if (Z.behavior === "deny") return Z;
    let D = await QPB(A, ($) => NN0($, B, Q), B.getToolPermissionContext());
    if (D.behavior !== "passthrough") return D;
    let G = aM(A.command).filter(($) => {
        if ($ === `cd ${t0()}`) return !1;
        return !0
    });
    if (G.filter(($) => $.startsWith("cd ")).length > 1) {
        let $ = {
            type: "other",
            reason: "Multiple directory changes in one command require approval for clarity"
        };
        return {
            behavior: "ask",
            decisionReason: $,
            message: _V(B.getToolPermissionContext(), VQ.name, $)
        }
    }
    let I = G.map(($) => JPB({
        command: $
    }, B.getToolPermissionContext()));
    if (I.find(($) => $.behavior === "deny") !== void 0) return {
        behavior: "deny",
        message: `Permission to use ${VQ.name} with command ${A.command} has been denied.`,
        decisionReason: {
            type: "subcommandResults",
            reasons: new Map(I.map(($, L) => [G[L], $]))
        }
    };
    let W = I.find(($) => $.behavior === "ask");
    if (W !== void 0) return W;
    if (Z.behavior === "allow") return Z;
    let J = IQ(process.env.CLAUDE_CODE_DISABLE_COMMAND_INJECTION_CHECK) ? !1 : G.some(($) => Tv($).behavior !== "passthrough");
    if (I.every(($) => $.behavior === "allow") && !J) return {
        behavior: "allow",
        updatedInput: A,
        decisionReason: {
            type: "subcommandResults",
            reasons: new Map(I.map(($, L) => [G[L], $]))
        }
    };
    let X = await Q(A.command, B.abortController.signal, B.options.isNonInteractiveSession);
    if (B.abortController.signal.aborted) throw new tJ;
    let V = B.getToolPermissionContext();
    if (G.length === 1) return YPB({
        command: G[0]
    }, V, X);
    let C = new Map;
    for (let $ of G) C.set($, YPB({
        ...A,
        command: $
    }, V, X?.subcommandPrefixes.get($)));
    if (G.every(($) => {
            return C.get($)?.behavior === "allow"
        })) return {
        behavior: "allow",
        updatedInput: A,
        decisionReason: {
            type: "subcommandResults",
            reasons: C
        }
    };
    let K = new Map;
    for (let $ of C.values())
        if ($.behavior === "ask" || $.behavior === "passthrough") {
            let L = $.ruleSuggestions;
            if (L === void 0) continue;
            else
                for (let N of L) {
                    let R = r8(N);
                    K?.set(R, N)
                }
        } let H = K ? Array.from(K.values()) : void 0,
        z = {
            type: "subcommandResults",
            reasons: C
        };
    return {
        behavior: "passthrough",
        message: _V(V, VQ.name, z),
        decisionReason: z,
        ruleSuggestions: H
    }
};
var dG8 = (A, B, Q) => ({
        isError: A !== 0,
        message: A !== 0 ? `Command failed with exit code ${A}` : void 0
    }),
    cG8 = new Map([
        ["grep", (A, B, Q) => ({
            isError: A >= 2,
            message: A === 1 ? "No matches found" : void 0
        })],
        ["rg", (A, B, Q) => ({
            isError: A >= 2,
            message: A === 1 ? "No matches found" : void 0
        })],
        ["find", (A, B, Q) => ({
            isError: A >= 2,
            message: A === 1 ? "Some directories were inaccessible" : void 0
        })],
        ["diff", (A, B, Q) => ({
            isError: A >= 2,
            message: A === 1 ? "Files differ" : void 0
        })],
        ["test", (A, B, Q) => ({
            isError: A >= 2,
            message: A === 1 ? "Condition is false" : void 0
        })],
        ["[", (A, B, Q) => ({
            isError: A >= 2,
            message: A === 1 ? "Condition is false" : void 0
        })]
    ]);