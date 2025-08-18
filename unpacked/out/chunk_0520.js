/* chunk:520 bytes:[12292449, 12312233) size:19784 source:unpacked-cli.js */
(function(A) {
    A.ZodString = "ZodString", A.ZodNumber = "ZodNumber", A.ZodNaN = "ZodNaN", A.ZodBigInt = "ZodBigInt", A.ZodBoolean = "ZodBoolean", A.ZodDate = "ZodDate", A.ZodSymbol = "ZodSymbol", A.ZodUndefined = "ZodUndefined", A.ZodNull = "ZodNull", A.ZodAny = "ZodAny", A.ZodUnknown = "ZodUnknown", A.ZodNever = "ZodNever", A.ZodVoid = "ZodVoid", A.ZodArray = "ZodArray", A.ZodObject = "ZodObject", A.ZodUnion = "ZodUnion", A.ZodDiscriminatedUnion = "ZodDiscriminatedUnion", A.ZodIntersection = "ZodIntersection", A.ZodTuple = "ZodTuple", A.ZodRecord = "ZodRecord", A.ZodMap = "ZodMap", A.ZodSet = "ZodSet", A.ZodFunction = "ZodFunction", A.ZodLazy = "ZodLazy", A.ZodLiteral = "ZodLiteral", A.ZodEnum = "ZodEnum", A.ZodEffects = "ZodEffects", A.ZodNativeEnum = "ZodNativeEnum", A.ZodOptional = "ZodOptional", A.ZodNullable = "ZodNullable", A.ZodDefault = "ZodDefault", A.ZodCatch = "ZodCatch", A.ZodPromise = "ZodPromise", A.ZodBranded = "ZodBranded", A.ZodPipeline = "ZodPipeline", A.ZodReadonly = "ZodReadonly"
})(A2 || (A2 = {}));
var zD4 = (A, B = {
        message: `Input not instance of ${A.name}`
    }) => veA((Q) => Q instanceof A, B),
    JQ = mw.create,
    kg = ay.create,
    ED4 = m61.create,
    UD4 = sy.create,
    UL = ws.create,
    wD4 = Tg.create,
    $D4 = f61.create,
    qD4 = $s.create,
    ND4 = qs.create,
    LD4 = Pg.create,
    MD4 = ny.create,
    RD4 = zL.create,
    OD4 = h61.create,
    pw = dw.create,
    HK = lZ.create,
    TD4 = lZ.strictCreate,
    Kq1 = Ns.create,
    PD4 = Vq1.create,
    SD4 = Ls.create,
    jD4 = EL.create,
    js = g61.create,
    kD4 = u61.create,
    yD4 = Sg.create,
    _D4 = Us.create,
    xD4 = Ms.create,
    vD4 = Rs.create,
    ks = ry.create,
    bD4 = Os.create,
    fD4 = jg.create,
    hD4 = lw.create,
    gD4 = KK.create,
    uD4 = LT.create,
    mD4 = lw.createWithPreprocess,
    dD4 = d61.create,
    cD4 = () => JQ().optional(),
    lD4 = () => kg().optional(),
    pD4 = () => UL().optional(),
    iD4 = {
        string: (A) => mw.create({
            ...A,
            coerce: !0
        }),
        number: (A) => ay.create({
            ...A,
            coerce: !0
        }),
        boolean: (A) => ws.create({
            ...A,
            coerce: !0
        }),
        bigint: (A) => sy.create({
            ...A,
            coerce: !0
        }),
        date: (A) => Tg.create({
            ...A,
            coerce: !0
        })
    };
var nD4 = AQ;
var yV = h;
var W40 = h.enum(["local", "user", "project", "dynamic"]),
    LC5 = h.enum(["stdio", "sse", "sse-ide", "http"]),
    J40 = h.object({
        type: h.literal("stdio").optional(),
        command: h.string().min(1, "Command cannot be empty"),
        args: h.array(h.string()).default([]),
        env: h.record(h.string()).optional()
    }),
    sD4 = h.object({
        type: h.literal("sse"),
        url: h.string(),
        headers: h.record(h.string()).optional()
    }),
    rD4 = h.object({
        type: h.literal("sse-ide"),
        url: h.string(),
        ideName: h.string(),
        ideRunningInWindows: h.boolean().optional()
    }),
    oD4 = h.object({
        type: h.literal("ws-ide"),
        url: h.string(),
        ideName: h.string(),
        authToken: h.string().optional(),
        ideRunningInWindows: h.boolean().optional()
    }),
    tD4 = h.object({
        type: h.literal("http"),
        url: h.string(),
        headers: h.record(h.string()).optional()
    }),
    X40 = h.union([J40, sD4, rD4, oD4, tD4]);
var beA = h.object({
    mcpServers: h.record(h.string(), X40)
});
import {
    join as eD4
} from "path";

function Hq1(A) {
    return A.replace(/[^a-zA-Z0-9_-]/g, "_")
}

function c61(A, B) {
    let Q = `mcp__${B}__`;
    return A.filter((Z) => Z.name?.startsWith(Q))
}

function zq1(A, B) {
    let Q = `mcp__${B}__`;
    return A.filter((Z) => Z.name?.startsWith(Q))
}

function feA(A, B) {
    let Q = `mcp__${B}__`;
    return A.filter((Z) => !Z.name?.startsWith(Q))
}

function heA(A, B) {
    let Q = `mcp__${B}__`;
    return A.filter((Z) => !Z.name?.startsWith(Q))
}

function geA(A, B) {
    let Q = {
        ...A
    };
    return delete Q[B], Q
}

function ueA(A) {
    return `mcp__${A}__`
}

function V40(A) {
    return A.name?.startsWith("mcp__") || A.isMcp === !0
}

function oy(A) {
    let B = A.split("__"),
        [Q, Z, ...D] = B;
    if (Q !== "mcp" || !Z) return null;
    let G = D.length > 0 ? D.join("__") : void 0;
    return {
        serverName: Z,
        toolName: G
    }
}

function Eq1(A, B) {
    let Q = `mcp__${Hq1(B)}__`;
    return A.replace(Q, "")
}

function Uq1(A) {
    let B = A.replace(/\s*\(MCP\)\s*$/, "");
    B = B.trim();
    let Q = B.indexOf(" - ");
    if (Q !== -1) return B.substring(Q + 3).trim();
    return B
}

function zK(A) {
    let B = j1();
    switch (A) {
        case "user": {
            let Q = vY(),
                Z = B.existsSync(Q);
            return `${Q}${Z?"":" (file does not exist)"}`
        }
        case "project": {
            let Q = eD4(t0(), ".mcp.json"),
                Z = B.existsSync(Q);
            return `${Q}${Z?"":" (file does not exist)"}`
        }
        case "local":
            return `${vY()} [project: ${t0()}]`;
        case "dynamic":
            return "Dynamically configured";
        default:
            return A
    }
}

function yg(A) {
    switch (A) {
        case "local":
            return "Local config (private to you in this project)";
        case "project":
            return "Project config (shared via .mcp.json)";
        case "user":
            return "User config (available in all your projects)";
        default:
            return A
    }
}

function l61(A) {
    if (!A) return "local";
    if (!W40.options.includes(A)) throw new Error(`Invalid scope: ${A}. Must be one of: ${W40.options.join(", ")}`);
    return A
}

function meA(A) {
    if (!A) return "stdio";
    if (A !== "stdio" && A !== "sse" && A !== "http") throw new Error(`Invalid transport type: ${A}. Must be one of: stdio, sse, http`);
    return A
}

function C40(A) {
    let B = {};
    for (let Q of A) {
        let Z = Q.indexOf(":");
        if (Z === -1) throw new Error(`Invalid header format: "${Q}". Expected format: "Header-Name: value"`);
        let D = Q.substring(0, Z).trim(),
            G = Q.substring(Z + 1).trim();
        if (!D) throw new Error(`Invalid header: "${Q}". Header name cannot be empty.`);
        B[D] = G
    }
    return B
}

function wq1(A) {
    let B = GB();
    if (B?.disabledMcpjsonServers?.includes(A)) return "rejected";
    if (B?.enabledMcpjsonServers?.includes(A) || B?.enableAllProjectMcpServers) return "approved";
    return "pending"
}
var $q1 = ["acceptEdits", "bypassPermissions", "default", "plan"];

function deA(A) {
    switch (A) {
        case "bypassPermissions":
            return "bypassPermissions";
        case "acceptEdits":
            return "acceptEdits";
        case "plan":
            return "plan";
        case "default":
            return "default";
        default:
            return "default"
    }
}

function ys(A) {
    switch (A) {
        case "default":
            return "Default";
        case "plan":
            return "Plan Mode";
        case "acceptEdits":
            return "Accept Edits";
        case "bypassPermissions":
            return "Bypass Permissions"
    }
}

function K40(A) {
    return A === "default" || A === void 0
}

function ceA(A) {
    switch (A) {
        case "default":
            return "Default";
        case "plan":
            return "Plan";
        case "acceptEdits":
            return "Accept";
        case "bypassPermissions":
            return "Bypass"
    }
}

function H40(A) {
    switch (A) {
        case "default":
            return "";
        case "plan":
            return "⏸";
        case "acceptEdits":
            return "⏵⏵";
        case "bypassPermissions":
            return "⏵⏵"
    }
}

function p61(A) {
    switch (A) {
        case "default":
            return "text";
        case "plan":
            return "planMode";
        case "acceptEdits":
            return "autoAccept";
        case "bypassPermissions":
            return "error"
    }
}
var z40 = [...uw, "cliArg", "command"];

function i61(A) {
    switch (A) {
        case "cliArg":
            return "CLI argument";
        case "command":
            return "command configuration";
        case "localSettings":
            return "project local settings";
        case "projectSettings":
            return "project settings";
        case "policySettings":
            return "policy settings";
        case "userSettings":
            return "user settings";
        case "flagSettings":
            return "flag settings"
    }
}

function CK(A) {
    let B = A.match(/^([^(]+)\(([^)]+)\)$/);
    if (!B) return {
        toolName: A
    };
    let Q = B[1],
        Z = B[2];
    if (!Q || !Z) return {
        toolName: A
    };
    return {
        toolName: Q,
        ruleContent: Z
    }
}

function r8(A) {
    return A.ruleContent ? `${A.toolName}(${A.ruleContent})` : A.toolName
}

function _g(A) {
    return z40.flatMap((B) => (A.alwaysAllowRules[B] || []).map((Q) => ({
        source: B,
        ruleBehavior: "allow",
        ruleValue: CK(Q)
    })))
}

function AG4(A, B) {
    return _g(A).filter((D) => D.ruleValue.toolName === B).map((D) => {
        if (D.ruleValue.ruleContent) return D.ruleValue.ruleContent;
        return B
    })
}

function _V(A, B, Q) {
    if (Q) switch (Q.type) {
        case "hook":
            return Q.reason ? `Hook '${Q.hookName}' blocked this action: ${Q.reason}` : `Hook '${Q.hookName}' requires approval for this ${B} command`;
        case "rule": {
            let G = r8(Q.rule.ruleValue),
                F = i61(Q.rule.source);
            return `Permission rule '${G}' from ${F} requires approval for this ${B} command`
        }
        case "subcommandResults": {
            let G = [];
            for (let [F, I] of Q.reasons)
                if (I.behavior === "ask" || I.behavior === "passthrough") G.push(F);
            if (G.length > 0) return `This ${B} command contains multiple operations. The following part${G.length>1?"s":""} require${G.length>1?"":"s"} approval: ${G.join(", ")}`;
            return `This ${B} command contains multiple operations that require approval`
        }
        case "permissionPromptTool":
            return `Tool '${Q.permissionPromptToolName}' requires approval for this ${B} command`;
        case "other":
            return Q.reason;
        case "mode":
            return `Current permission mode (${ys(Q.mode)}) requires approval for this ${B} command`
    }
    let Z = `Claude requested permissions to use ${B}, but you haven't granted it yet.`,
        D = AG4(A, B);
    if (D.length > 0) Z += `

As a reminder, Claude can use these ${B} commands without approval: ${D.join(", ")}`;
    return Z
}

function _s(A) {
    return z40.flatMap((B) => (A.alwaysDenyRules[B] || []).map((Q) => ({
        source: B,
        ruleBehavior: "deny",
        ruleValue: CK(Q)
    })))
}

function qq1(A) {
    return z40.flatMap((B) => (A.alwaysAskRules[B] || []).map((Q) => ({
        source: B,
        ruleBehavior: "ask",
        ruleValue: CK(Q)
    })))
}

function E40(A, B) {
    if (B.ruleValue.ruleContent !== void 0) return !1;
    if (B.ruleValue.toolName === A.name) return !0;
    let Q = oy(B.ruleValue.toolName),
        Z = oy(A.name);
    return Q !== null && Z !== null && Q.toolName === void 0 && Q.serverName === Z.serverName
}

function BG4(A, B) {
    return _g(A).find((Q) => E40(B, Q)) || null
}

function QG4(A, B) {
    return _s(A).find((Q) => E40(B, Q)) || null
}

function ZG4(A, B) {
    return qq1(A).find((Q) => E40(B, Q)) || null
}

function fz(A, B, Q) {
    return U40(A, B.name, Q)
}

function U40(A, B, Q) {
    let Z = new Map,
        D = [];
    switch (Q) {
        case "allow":
            D = _g(A);
            break;
        case "deny":
            D = _s(A);
            break;
        case "ask":
            D = qq1(A);
            break
    }
    for (let G of D)
        if (G.ruleValue.toolName === B && G.ruleValue.ruleContent !== void 0 && G.ruleBehavior === Q) Z.set(G.ruleValue.ruleContent, G);
    return Z
}
var iw = async (A, B, Q) => {
    if (Q.abortController.signal.aborted) throw new tJ;
    let Z = QG4(Q.getToolPermissionContext(), A);
    if (Z) return {
        behavior: "deny",
        decisionReason: {
            type: "rule",
            rule: Z
        },
        message: `Permission to use ${A.name} has been denied.`
    };
    let D = ZG4(Q.getToolPermissionContext(), A);
    if (D) return {
        behavior: "ask",
        decisionReason: {
            type: "rule",
            rule: D
        },
        message: _V(Q.getToolPermissionContext(), A.name)
    };
    let G = void 0;
    try {
        let I = A.inputSchema.parse(B);
        G = await A.checkPermissions(I, Q)
    } catch (I) {
        return R1(I), {
            behavior: "ask",
            message: "Error checking permissions"
        }
    }
    if (G?.behavior === "deny") return G;
    if (Q.getToolPermissionContext().mode === "bypassPermissions") return {
        behavior: "allow",
        updatedInput: B,
        decisionReason: {
            type: "mode",
            mode: Q.getToolPermissionContext().mode
        }
    };
    let F = BG4(Q.getToolPermissionContext(), A);
    if (F) return {
        behavior: "allow",
        updatedInput: B,
        decisionReason: {
            type: "rule",
            rule: F
        }
    };
    if (G.behavior === "allow") return G;
    return G.behavior === "passthrough" ? {
        ...G,
        behavior: "ask",
        message: _V(Q.getToolPermissionContext(), A.name, G.decisionReason)
    } : G
};

function leA(A) {
    switch (A) {
        case "allow":
            return "alwaysAllowRules";
        case "deny":
            return "alwaysDenyRules";
        case "ask":
            return "alwaysAskRules"
    }
}
async function Nq1(A) {
    return n61({
        ...A,
        ruleValues: [A.rule.ruleValue],
        ruleBehavior: A.rule.ruleBehavior,
        destination: A.rule.source
    })
}
async function n61({
    ruleBehavior: A,
    destination: B,
    initialContext: Q,
    setToolPermissionContext: Z,
    ruleValues: D
}) {
    let G = new Set(D.map(r8)),
        F = leA(A),
        I = {
            ...Q,
            [F]: {
                ...Q[F],
                [B]: [...Q[F][B] || [], ...G]
            }
        };
    Yq1({
        ruleValues: D,
        ruleBehavior: A
    }, B), Z(I)
}
async function peA({
    rule: A,
    initialContext: B,
    setToolPermissionContext: Q
}) {
    if (A.source === "policySettings") throw new Error("Cannot delete permission rules from managed settings");
    let Z = r8(A.ruleValue),
        D = leA(A.ruleBehavior),
        G = A.source,
        F = {
            ...B,
            [D]: {
                ...B[D],
                [A.source]: B[D][G]?.filter((I) => I !== Z) || []
            }
        };
    switch (G) {
        case "localSettings":
        case "userSettings":
        case "projectSettings": {
            TeA(A);
            break
        }
        case "cliArg":
        case "command":
        case "flagSettings":
            break
    }
    Q(F)
}

function Lq1(A, B) {
    let Q = {
            ...A.alwaysAllowRules
        },
        Z = {
            ...A.alwaysDenyRules
        },
        D = {
            ...A.alwaysAskRules
        };
    for (let G of B) {
        let F = r8(G.ruleValue),
            I = G.source,
            Y = (() => {
                switch (G.ruleBehavior) {
                    case "allow":
                        return Q;
                    case "deny":
                        return Z;
                    case "ask":
                        return D
                }
            })();
        if (!Y[I]) Y[I] = [];
        if (Y[I]) Y[I].push(F)
    }
    return {
        ...A,
        alwaysAllowRules: Q,
        alwaysDenyRules: Z,
        alwaysAskRules: D
    }
}
var ieA = G1(q61(), 1);
import {
    homedir as IG4
} from "os";
var eJ = "Edit";
var MT = xg.sep;

function YG4() {
    return uw.map((A) => RT(A)).filter((A) => A !== void 0)
}

function q40(A) {
    if (A.endsWith("/.claude/settings.json") || A.endsWith("/.claude/settings.local.json")) return !0;
    return YG4().some((B) => B === A)
}

function WG4(A) {
    if (q40(A)) return !0;
    let B = $40(_9(), ".claude/commands");
    return vs(A, B)
}

function HD(A) {
    return DG4(A) ? $40(A) : $40(t0(), A)
}

function a61(A) {
    return new Set([_9(), ...A.additionalWorkingDirectories.keys()])
}

function EK(A, B) {
    return Array.from(a61(B)).some((Q) => vs(A, Q))
}

function vs(A, B) {
    let Q = HD(A),
        Z = HD(B),
        D = Q.replace(/^\/private\/var\//, "/var/").replace(/^\/private\/tmp(\/|$)/, "/tmp$1"),
        G = Z.replace(/^\/private\/var\//, "/var/").replace(/^\/private\/tmp(\/|$)/, "/tmp$1");
    if (!D.startsWith(G)) return !1;
    let F = D[G.length];
    if (F === void 0 || F === FG4) return !0;
    return !1
}

function JG4(A) {
    switch (A) {
        case "cliArg":
        case "command":
            return HD(_9());
        case "userSettings":
        case "policySettings":
        case "projectSettings":
        case "localSettings":
        case "flagSettings":
            return Rq1(A)
    }
}

function w40(A) {
    return xg.join(MT, A)
}

function XG4({
    patternRoot: A,
    pattern: B,
    rootPath: Q
}) {
    let Z = xg.join(A, B);
    if (A === Q) return w40(B);
    else if (Z.startsWith(`${Q}${MT}`)) {
        let D = Z.slice(Q.length);
        return w40(D)
    } else {
        let D = xg.relative(Q, A);
        if (!D || D.startsWith(`..${MT}`) || D === "..") return null;
        else {
            let G = xg.join(D, B);
            return w40(G)
        }
    }
}

function Mq1(A, B) {
    let Q = new Set(A.get(null) ?? []);
    for (let [Z, D] of A.entries()) {
        if (Z === null) continue;
        for (let G of D) {
            let F = XG4({
                patternRoot: Z,
                pattern: G,
                rootPath: B
            });
            if (F) Q.add(F)
        }
    }
    return Array.from(Q)
}

function bs(A) {
    let B = aeA(A, "read", "deny"),
        Q = new Map;
    for (let [D, G] of B.entries()) Q.set(D, Array.from(G.keys()));
    let Z = UQ().ignorePatterns;
    if (Z && Z.length > 0)
        for (let D of Z) {
            let {
                relativePattern: G,
                root: F
            } = neA(D, "projectSettings"), I = Q.get(F);
            if (I === void 0) I = [G], Q.set(F, I);
            else I.push(G)
        }
    return Q
}

function neA(A, B) {
    if (A.startsWith(`${MT}${MT}`)) return {
        relativePattern: A.slice(1),
        root: MT
    };
    else if (A.startsWith(`~${MT}`)) return {
        relativePattern: A.slice(1),
        root: IG4()
    };
    else if (A.startsWith(MT)) return {
        relativePattern: A,
        root: JG4(B)
    };
    return {
        relativePattern: A,
        root: null
    }
}

function aeA(A, B, Q) {
    let Z = (() => {
            switch (B) {
                case "edit":
                    return eJ;
                case "read":
                    return QG
            }
        })(),
        D = U40(A, Z, Q),
        G = new Map;
    for (let [F, I] of D.entries()) {
        let {
            relativePattern: Y,
            root: W
        } = neA(F, I.source), J = G.get(W);
        if (J === void 0) J = new Map, G.set(W, J);
        J.set(Y, I)
    }
    return G
}