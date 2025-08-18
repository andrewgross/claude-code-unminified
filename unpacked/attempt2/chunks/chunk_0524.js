/* chunk:524 bytes:[12366596, 12386599) size:20003 source:unpacked-cli.js */
var l12 = (A, B, Q) => {
    switch (B) {
        case A2.ZodString:
            return yq1(A, Q);
        case A2.ZodNumber:
            return x12(A, Q);
        case A2.ZodObject:
            return v12(A, Q);
        case A2.ZodBigInt:
            return U12(A, Q);
        case A2.ZodBoolean:
            return w12();
        case A2.ZodDate:
            return k40(A, Q);
        case A2.ZodUndefined:
            return m12();
        case A2.ZodNull:
            return j12(Q);
        case A2.ZodArray:
            return E12(A, Q);
        case A2.ZodUnion:
        case A2.ZodDiscriminatedUnion:
            return y12(A, Q);
        case A2.ZodIntersection:
            return M12(A, Q);
        case A2.ZodTuple:
            return u12(A, Q);
        case A2.ZodRecord:
            return _q1(A, Q);
        case A2.ZodLiteral:
            return R12(A, Q);
        case A2.ZodEnum:
            return L12(A);
        case A2.ZodNativeEnum:
            return P12(A);
        case A2.ZodNullable:
            return _12(A, Q);
        case A2.ZodOptional:
            return b12(A, Q);
        case A2.ZodMap:
            return T12(A, Q);
        case A2.ZodSet:
            return g12(A, Q);
        case A2.ZodLazy:
            return () => A.getter()._def;
        case A2.ZodPromise:
            return h12(A, Q);
        case A2.ZodNaN:
        case A2.ZodNever:
            return S12();
        case A2.ZodEffects:
            return N12(A, Q);
        case A2.ZodAny:
            return z12();
        case A2.ZodUnknown:
            return d12();
        case A2.ZodDefault:
            return q12(A, Q);
        case A2.ZodBranded:
            return kq1(A, Q);
        case A2.ZodReadonly:
            return c12(A, Q);
        case A2.ZodCatch:
            return $12(A, Q);
        case A2.ZodPipeline:
            return f12(A, Q);
        case A2.ZodFunction:
        case A2.ZodVoid:
        case A2.ZodSymbol:
            return;
        default:
            return ((Z) => {
                return
            })(B)
    }
};

function wQ(A, B, Q = !1) {
    let Z = B.seen.get(A);
    if (B.override) {
        let I = B.override?.(A, B, Z, Q);
        if (I !== C12) return I
    }
    if (Z && !Q) {
        let I = SG4(Z, B);
        if (I !== void 0) return I
    }
    let D = {
        def: A,
        path: B.currentPath,
        jsonSchema: void 0
    };
    B.seen.set(A, D);
    let G = l12(A, A.typeName, B),
        F = typeof G === "function" ? wQ(G(), B) : G;
    if (F) kG4(A, B, F);
    if (B.postProcess) {
        let I = B.postProcess(F, A, B);
        return D.jsonSchema = F, I
    }
    return D.jsonSchema = F, F
}
var SG4 = (A, B) => {
        switch (B.$refStrategy) {
            case "root":
                return {
                    $ref: A.path.join("/")
                };
            case "relative":
                return {
                    $ref: jG4(B.currentPath, A.path)
                };
            case "none":
            case "seen": {
                if (A.path.length < B.currentPath.length && A.path.every((Q, Z) => B.currentPath[Z] === Q)) return console.warn(`Recursive reference detected at ${B.currentPath.join("/")}! Defaulting to any`), {};
                return B.$refStrategy === "seen" ? {} : void 0
            }
        }
    },
    jG4 = (A, B) => {
        let Q = 0;
        for (; Q < A.length && Q < B.length; Q++)
            if (A[Q] !== B[Q]) break;
        return [(A.length - Q).toString(), ...B.slice(Q)].join("/")
    },
    kG4 = (A, B, Q) => {
        if (A.description) {
            if (Q.description = A.description, B.markdownDescription) Q.markdownDescription = A.description
        }
        return Q
    };
var hg = (A, B) => {
    let Q = H12(B),
        Z = typeof B === "object" && B.definitions ? Object.entries(B.definitions).reduce((Y, [W, J]) => ({
            ...Y,
            [W]: wQ(J._def, {
                ...Q,
                currentPath: [...Q.basePath, Q.definitionPath, W]
            }, !0) ?? {}
        }), {}) : void 0,
        D = typeof B === "string" ? B : B?.nameStrategy === "title" ? void 0 : B?.name,
        G = wQ(A._def, D === void 0 ? Q : {
            ...Q,
            currentPath: [...Q.basePath, Q.definitionPath, D]
        }, !1) ?? {},
        F = typeof B === "object" && B.name !== void 0 && B.nameStrategy === "title" ? B.name : void 0;
    if (F !== void 0) G.title = F;
    let I = D === void 0 ? Z ? {
        ...G,
        [Q.definitionPath]: Z
    } : G : {
        $ref: [...Q.$refStrategy === "relative" ? [] : Q.basePath, Q.definitionPath, D].join("/"),
        [Q.definitionPath]: {
            ...Z,
            [D]: G
        }
    };
    if (Q.target === "jsonSchema7") I.$schema = "http://json-schema.org/draft-07/schema#";
    else if (Q.target === "jsonSchema2019-09" || Q.target === "openAi") I.$schema = "https://json-schema.org/draft/2019-09/schema#";
    if (Q.target === "openAi" && (("anyOf" in I) || ("oneOf" in I) || ("allOf" in I) || ("type" in I) && Array.isArray(I.type))) console.warn("Warning: OpenAI may not support schemas with unions as roots! Try wrapping it in an object property.");
    return I
};

function x40() {
    let A = hg(us, {
        name: "ClaudeCodeSettings",
        $refStrategy: "none"
    });
    return JSON.stringify(A, null, 2)
}

function p12(A) {
    return A.code === "invalid_type"
}

function i12(A) {
    return A.code === "invalid_literal"
}

function n12(A) {
    return A.code === "invalid_enum_value"
}

function yG4(A) {
    return A.code === "unrecognized_keys"
}

function a12(A) {
    return A.code === "too_small"
}

function v40(A, B) {
    return A.issues.map((Q) => {
        let Z = Q.path.join("."),
            D = Q.message,
            G, F, I, Y;
        if (n12(Q)) F = Q.options.map((J) => String(J)), Y = Q.received;
        else if (i12(Q)) I = String(Q.expected), Y = Q.received;
        else if (p12(Q)) I = Q.expected, Y = Q.received;
        else if (a12(Q)) I = String(Q.minimum);
        else if (Q.code === "custom" && "params" in Q) Y = Q.params.received;
        let W = X12({
            path: Z,
            code: Q.code,
            expected: I,
            received: Y,
            enumValues: F,
            message: Q.message,
            value: Y
        });
        if (i12(Q)) G = `"${Q.expected}"`, D = `"${Q.received}" is not valid. Expected: ${G}`;
        else if (n12(Q)) G = F?.map((J) => `"${J}"`).join(", "), D = `"${Q.received}" is not valid. Expected one of: ${G}`;
        else if (p12(Q))
            if (Q.expected === "object" && Q.received === "null" && Z === "") D = "Invalid or malformed JSON";
            else D = `Expected ${Q.expected}, but received ${Q.received}`;
        else if (yG4(Q)) {
            let J = Q.keys.join(", ");
            D = `Unrecognized field${Q.keys.length>1?"s":""}: ${J}`
        } else if (a12(Q)) D = `Number must be greater than or equal to ${Q.minimum}`, G = String(Q.minimum);
        return {
            file: B,
            path: Z,
            message: D,
            expected: G,
            invalidValue: Y,
            suggestion: W?.suggestion,
            docLink: W?.docLink
        }
    })
}

function b40(A) {
    try {
        let B = JSON.parse(A),
            Q = us.strict().safeParse(B);
        if (Q.success) return {
            isValid: !0
        };
        return {
            isValid: !1,
            error: `Settings validation failed:
` + v40(Q.error, "settings").map((G) => `- ${G.path}: ${G.message}`).join(`
`),
            fullSchema: x40()
        }
    } catch (B) {
        return {
            isValid: !1,
            error: `Invalid JSON: ${B instanceof Error?B.message:"Unknown parsing error"}`,
            fullSchema: x40()
        }
    }
}
import {
    join as s12
} from "path";

function f40(A, B) {
    if (!A) return {};
    let Q = {};
    for (let [Z, D] of Object.entries(A)) Q[Z] = {
        ...D,
        scope: B
    };
    return Q
}

function r12(A) {
    let B = s12(t0(), ".mcp.json");
    wL(B, JSON.stringify(A, null, 2), {
        encoding: "utf8"
    })
}

function _G4(A) {
    let B = [];

    function Q(D) {
        return D.replace(/\$\{([^}]+)\}/g, (G, F) => {
            let [I, Y] = F.split(":-"), W = process.env[I];
            if (W !== void 0) return W;
            if (Y !== void 0) return Y;
            return B.push(I), G
        })
    }
    let Z;
    switch (A.type) {
        case void 0:
        case "stdio": {
            let D = A;
            Z = {
                ...D,
                command: Q(D.command),
                args: D.args.map(Q),
                env: D.env ? ij(D.env, Q) : void 0
            };
            break
        }
        case "sse":
        case "http": {
            let D = A;
            Z = {
                ...D,
                url: Q(D.url),
                headers: D.headers ? ij(D.headers, Q) : void 0
            };
            break
        }
        case "sse-ide":
        case "ws-ide":
            Z = A;
            break
    }
    return {
        expanded: Z,
        missingVars: [...new Set(B)]
    }
}

function gg(A, B, Q) {
    if (A.match(/[^a-zA-Z0-9_-]/)) throw new Error(`Invalid name ${A}. Names can only contain letters, numbers, hyphens, and underscores.`);
    let Z = X40.safeParse(B);
    if (!Z.success) {
        let G = Z.error.errors.map((F) => `${F.path.join(".")}: ${F.message}`).join(", ");
        throw new Error(`Invalid configuration: ${G}`)
    }
    switch (Q) {
        case "project": {
            let {
                servers: G
            } = ZG("project");
            if (G[A]) throw new Error(`MCP server ${A} already exists in .mcp.json`);
            break
        }
        case "user": {
            if (H0().mcpServers?.[A]) throw new Error(`MCP server ${A} already exists in user config`);
            break
        }
        case "local": {
            if (UQ().mcpServers?.[A]) throw new Error(`MCP server ${A} already exists in local config`);
            break
        }
        case "dynamic":
            throw new Error("Cannot add MCP server to scope: dynamic")
    }
    let D = Z.data;
    switch (Q) {
        case "project": {
            let {
                servers: G
            } = ZG("project"), F = {};
            for (let [Y, W] of Object.entries(G)) {
                let {
                    scope: J,
                    ...X
                } = W;
                F[Y] = X
            }
            F[A] = D;
            let I = {
                mcpServers: F
            };
            try {
                r12(I)
            } catch (Y) {
                throw new Error(`Failed to write to mcp.json: ${Y}`)
            }
            break
        }
        case "user": {
            let G = H0();
            if (!G.mcpServers) G.mcpServers = {};
            G.mcpServers[A] = D, gA(G);
            break
        }
        case "local": {
            let G = UQ();
            if (!G.mcpServers) G.mcpServers = {};
            G.mcpServers[A] = D, r5(G);
            break
        }
        default:
            throw new Error(`Cannot add MCP server to scope: ${Q}`)
    }
}

function h40(A, B) {
    switch (B) {
        case "project": {
            let {
                servers: Q
            } = ZG("project");
            if (!Q[A]) throw new Error(`No MCP server found with name: ${A} in .mcp.json`);
            let Z = {};
            for (let [G, F] of Object.entries(Q))
                if (G !== A) {
                    let {
                        scope: I,
                        ...Y
                    } = F;
                    Z[G] = Y
                } let D = {
                mcpServers: Z
            };
            try {
                r12(D)
            } catch (G) {
                throw new Error(`Failed to remove from .mcp.json: ${G}`)
            }
            break
        }
        case "user": {
            let Q = H0();
            if (!Q.mcpServers?.[A]) throw new Error(`No user-scoped MCP server found with name: ${A}`);
            delete Q.mcpServers[A], gA(Q);
            break
        }
        case "local": {
            let Q = UQ();
            if (!Q.mcpServers?.[A]) throw new Error(`No project-local MCP server found with name: ${A}`);
            delete Q.mcpServers[A], r5(Q);
            break
        }
        default:
            throw new Error(`Cannot remove MCP server from scope: ${B}`)
    }
}

function ZG(A) {
    switch (A) {
        case "project": {
            let B = s12(t0(), ".mcp.json");
            if (!j1().existsSync(B)) return {
                servers: {},
                errors: []
            };
            let {
                config: Z,
                errors: D
            } = g40({
                filePath: B,
                expandVars: !0,
                scope: "project"
            });
            return {
                servers: f40(Z?.mcpServers, A),
                errors: D
            }
        }
        case "user": {
            let B = H0().mcpServers;
            if (!B) return {
                servers: {},
                errors: []
            };
            let {
                config: Q,
                errors: Z
            } = t61({
                configObject: {
                    mcpServers: B
                },
                expandVars: !0,
                scope: "user"
            });
            return {
                servers: f40(Q?.mcpServers, A),
                errors: Z
            }
        }
        case "local": {
            let B = UQ().mcpServers;
            if (!B) return {
                servers: {},
                errors: []
            };
            let {
                config: Q,
                errors: Z
            } = t61({
                configObject: {
                    mcpServers: B
                },
                expandVars: !0,
                scope: "local"
            });
            return {
                servers: f40(Q?.mcpServers, A),
                errors: Z
            }
        }
    }
}

function ds(A) {
    let {
        servers: B
    } = ZG("user"), {
        servers: Q
    } = ZG("project"), {
        servers: Z
    } = ZG("local");
    if (Z[A]) return Z[A];
    if (Q[A]) return Q[A];
    if (B[A]) return B[A];
    return null
}

function gz() {
    let {
        servers: A
    } = ZG("user"), {
        servers: B
    } = ZG("project"), {
        servers: Q
    } = ZG("local"), Z = {};
    for (let [G, F] of Object.entries(B))
        if (wq1(G) === "approved") Z[G] = F;
    let D = Object.assign({}, A, Z, Q);
    return X1("tengu_mcp_servers", {
        global: Object.keys(A).length,
        project: Object.keys(Z).length,
        user: Object.keys(Q).length
    }), D
}

function t61(A) {
    let {
        configObject: B,
        expandVars: Q,
        scope: Z,
        filePath: D
    } = A, G = beA.safeParse(B);
    if (!G.success) return {
        config: null,
        errors: G.error.issues.map((Y) => ({
            ...D && {
                file: D
            },
            path: Y.path.join("."),
            message: "Does not adhere to MCP server configuration schema",
            mcpErrorMetadata: {
                scope: Z,
                severity: "fatal"
            }
        }))
    };
    let F = [],
        I = {};
    for (let [Y, W] of Object.entries(G.data.mcpServers)) {
        let J = W;
        if (Q) {
            let {
                expanded: X,
                missingVars: V
            } = _G4(W);
            if (V.length > 0) F.push({
                ...D && {
                    file: D
                },
                path: `mcpServers.${Y}`,
                message: `Missing environment variables: ${V.join(", ")}`,
                suggestion: `Set the following environment variables: ${V.join(", ")}`,
                mcpErrorMetadata: {
                    scope: Z,
                    serverName: Y,
                    severity: "warning"
                }
            });
            J = X
        }
        if (L9() === "windows" && (!J.type || J.type === "stdio") && (J.command === "npx" || J.command.endsWith("\\npx") || J.command.endsWith("/npx"))) F.push({
            ...D && {
                file: D
            },
            path: `mcpServers.${Y}`,
            message: "Windows requires 'cmd /c' wrapper to execute npx",
            suggestion: 'Change command to "cmd" with args ["/c", "npx", ...]. See: https://docs.anthropic.com/en/docs/claude-code/mcp#configure-mcp-servers',
            mcpErrorMetadata: {
                scope: Z,
                serverName: Y,
                severity: "warning"
            }
        });
        I[Y] = J
    }
    return {
        config: {
            mcpServers: I
        },
        errors: F
    }
}

function g40(A) {
    let {
        filePath: B,
        expandVars: Q,
        scope: Z
    } = A, D = j1();
    if (!D.existsSync(B)) return {
        config: null,
        errors: [{
            file: B,
            path: "",
            message: `MCP config file not found: ${B}`,
            suggestion: "Check that the file path is correct",
            mcpErrorMetadata: {
                scope: Z,
                severity: "fatal"
            }
        }]
    };
    let G;
    try {
        G = D.readFileSync(B, {
            encoding: "utf8"
        })
    } catch (I) {
        return {
            config: null,
            errors: [{
                file: B,
                path: "",
                message: `Failed to read file: ${I}`,
                suggestion: "Check file permissions and ensure the file exists",
                mcpErrorMetadata: {
                    scope: Z,
                    severity: "fatal"
                }
            }]
        }
    }
    let F = T7(G);
    if (!F) return {
        config: null,
        errors: [{
            file: B,
            path: "",
            message: "MCP config is not a valid JSON",
            suggestion: "Fix the JSON syntax errors in the file",
            mcpErrorMetadata: {
                scope: Z,
                severity: "fatal"
            }
        }]
    };
    return t61({
        configObject: F,
        expandVars: Q,
        scope: Z,
        filePath: B
    })
}
import {
    stat as WF4
} from "fs";
import {
    stat as JF4,
    readdir as XF4
} from "fs/promises";
import {
    EventEmitter as VF4
} from "events";
import * as K6 from "path";
import {
    stat as xG4,
    lstat as o12,
    readdir as vG4,
    realpath as bG4
} from "node:fs/promises";
import {
    Readable as fG4
} from "node:stream";
import {
    resolve as t12,
    relative as hG4,
    join as gG4,
    sep as uG4
} from "node:path";
var UK = {
        FILE_TYPE: "files",
        DIR_TYPE: "directories",
        FILE_DIR_TYPE: "files_directories",
        EVERYTHING_TYPE: "all"
    },
    u40 = {
        root: ".",
        fileFilter: (A) => !0,
        directoryFilter: (A) => !0,
        type: UK.FILE_TYPE,
        lstat: !1,
        depth: 2147483648,
        alwaysStat: !1,
        highWaterMark: 4096
    };
Object.freeze(u40);
var Q02 = "READDIRP_RECURSIVE_ERROR",
    mG4 = new Set(["ENOENT", "EPERM", "EACCES", "ELOOP", Q02]),
    e12 = [UK.DIR_TYPE, UK.EVERYTHING_TYPE, UK.FILE_DIR_TYPE, UK.FILE_TYPE],
    dG4 = new Set([UK.DIR_TYPE, UK.EVERYTHING_TYPE, UK.FILE_DIR_TYPE]),
    cG4 = new Set([UK.EVERYTHING_TYPE, UK.FILE_DIR_TYPE, UK.FILE_TYPE]),
    lG4 = (A) => mG4.has(A.code),
    pG4 = process.platform === "win32",
    A02 = (A) => !0,
    B02 = (A) => {
        if (A === void 0) return A02;
        if (typeof A === "function") return A;
        if (typeof A === "string") {
            let B = A.trim();
            return (Q) => Q.basename === B
        }
        if (Array.isArray(A)) {
            let B = A.map((Q) => Q.trim());
            return (Q) => B.some((Z) => Q.basename === Z)
        }
        return A02
    };