/* chunk:521 bytes:[12312235, 12331354) size:19119 source:unpacked-cli.js */
function xs(A, B, Q, Z) {
    let D = HD(A),
        G = aeA(B, Q, Z);
    for (let [F, I] of G.entries()) {
        let Y = ieA.default().add(Array.from(I.keys())),
            W;
        if (L9() === "windows") {
            let X = Js(D ?? t0()),
                V = Js(F ?? t0());
            W = xg.relative(V, X)
        } else W = xg.relative(F ?? t0(), D);
        if (W.startsWith(`..${MT}`)) continue;
        if (!W) continue;
        let J = Y.test(W);
        if (J.ignored && J.rule) return I.get(J.rule.pattern) ?? null
    }
    return null
}

function ty(A, B, Q) {
    if (typeof A.getPath !== "function") return {
        behavior: "ask",
        message: `Claude requested permissions to use ${A.name}, but you haven't granted it yet.`
    };
    let Z = A.getPath(B),
        D = vg(A, B, Q);
    if (D.behavior === "allow") return D;
    let G = xs(Z, Q, "read", "deny");
    if (G) return {
        behavior: "deny",
        message: `Permission to read ${Z} has been denied.`,
        decisionReason: {
            type: "rule",
            rule: G
        }
    };
    let F = xs(Z, Q, "read", "ask");
    if (F) return {
        behavior: "ask",
        message: `Claude requested permissions to read from ${Z}, but you haven't granted it yet.`,
        decisionReason: {
            type: "rule",
            rule: F
        }
    };
    if (EK(Z, Q)) return {
        behavior: "allow",
        updatedInput: B,
        decisionReason: {
            type: "mode",
            mode: "default"
        }
    };
    let I = HD(Z),
        Y = GG4(CL(_9()), "bash-outputs", CB());
    if (I.startsWith(Y)) return {
        behavior: "allow",
        updatedInput: B,
        decisionReason: {
            type: "other",
            reason: "Bash output files from current session are allowed for reading"
        }
    };
    let W = xs(Z, Q, "read", "allow");
    if (W) return {
        behavior: "allow",
        updatedInput: B,
        decisionReason: {
            type: "rule",
            rule: W
        }
    };
    return {
        behavior: "ask",
        message: `Claude requested permissions to read from ${Z}, but you haven't granted it yet.`
    }
}

function vg(A, B, Q) {
    if (typeof A.getPath !== "function") return {
        behavior: "ask",
        message: `Claude requested permissions to use ${A.name}, but you haven't granted it yet.`
    };
    let Z = A.getPath(B),
        D = xs(Z, Q, "edit", "deny");
    if (D) return {
        behavior: "deny",
        message: `Permission to edit ${Z} has been denied.`,
        decisionReason: {
            type: "rule",
            rule: D
        }
    };
    let G = xs(Z, Q, "edit", "ask");
    if (G) return {
        behavior: "ask",
        message: `Claude requested permissions to write to ${Z}, but you haven't granted it yet.`,
        decisionReason: {
            type: "rule",
            rule: G
        }
    };
    if (WG4(Z)) return {
        behavior: "ask",
        message: `Claude requested permissions to write to ${Z}, but you haven't granted it yet.`,
        decisionReason: {
            type: "other",
            reason: "Ask for permission to edit Claude Code settings files or slash commands"
        }
    };
    if (Q.mode === "acceptEdits" && EK(Z, Q)) return {
        behavior: "allow",
        updatedInput: B,
        decisionReason: {
            type: "mode",
            mode: "acceptEdits"
        }
    };
    let F = xs(Z, Q, "edit", "allow");
    if (F) return {
        behavior: "allow",
        updatedInput: B,
        decisionReason: {
            type: "rule",
            rule: F
        }
    };
    return {
        behavior: "ask",
        message: `Claude requested permissions to write to ${Z}, but you haven't granted it yet.`
    }
}
async function eeA(A, B, {
    limit: Q,
    offset: Z
}, D, G) {
    let F = Mq1(bs(G), B),
        Y = (await tw1([A], {
            cwd: B,
            nocase: !0,
            nodir: !0,
            signal: D,
            stat: !0,
            withFileTypes: !0,
            ignore: F
        })).sort((J, X) => (J.mtimeMs ?? 0) - (X.mtimeMs ?? 0)),
        W = Y.length > Z + Q;
    return {
        files: Y.slice(Z, Z + Q).map((J) => J.fullpath()),
        truncated: W
    }
}

function A12(A, B = 0, Q) {
    let G = j1().readFileSync(A, {
            encoding: "utf8"
        }).split(/\r?\n/),
        F = Q !== void 0 && G.length - B > Q ? G.slice(B, B + Q) : G.slice(B);
    return {
        content: F.join(`
`),
        lineCount: F.length,
        totalLines: G.length
    }
}

function ey(A, B, Q, Z) {
    let D = B;
    if (Z === "CRLF") D = B.split(`
`).join(`\r
`);
    wL(A, D, {
        encoding: Q
    })
}
var B12 = EA(async () => {
    let A = h4();
    setTimeout(() => {
        A.abort()
    }, 1000);
    let B = await wlA(t0(), A.signal, 15),
        Q = 0;
    for (let Z of B)
        if (OT(Z) === "CRLF") Q++;
    return Q > 3 ? "CRLF" : "LF"
});

function jY(A) {
    try {
        let Q = j1(),
            {
                resolvedPath: Z
            } = XV(Q, A),
            {
                buffer: D,
                bytesRead: G
            } = Q.readSync(Z, {
                length: 4096
            });
        if (G >= 2) {
            if (D[0] === 255 && D[1] === 254) return "utf16le"
        }
        if (G >= 3 && D[0] === 239 && D[1] === 187 && D[2] === 191) return "utf8";
        return D.slice(0, G).toString("utf8").length > 0 ? "utf8" : "ascii"
    } catch (Q) {
        return R1(Q), "utf8"
    }
}

function OT(A, B = "utf8") {
    try {
        let Q = j1(),
            {
                resolvedPath: Z
            } = XV(Q, A),
            {
                buffer: D,
                bytesRead: G
            } = Q.readSync(Z, {
                length: 4096
            }),
            F = D.toString(B, 0, G);
        return CG4(F)
    } catch (Q) {
        return R1(Q), "LF"
    }
}

function CG4(A) {
    let B = 0,
        Q = 0;
    for (let Z = 0; Z < A.length; Z++)
        if (A[Z] === `
`)
            if (Z > 0 && A[Z - 1] === "\r") B++;
            else Q++;
    return B > Q ? "CRLF" : "LF"
}

function bg(A) {
    let B = s61(A) ? A : r61(t0(), A),
        Q = j1(),
        Z = String.fromCharCode(8239),
        D = /^(.+)([ \u202F])(AM|PM)(\.png)$/,
        G = N40(B).match(D);
    if (G) {
        if (Q.existsSync(B)) return B;
        let F = G[2],
            I = F === " " ? Z : " ",
            Y = B.replace(`${F}${G[3]}${G[4]}`, `${I}${G[3]}${G[4]}`);
        if (Q.existsSync(Y)) return Y
    }
    return B
}

function gs(A) {
    return A.replace(/^\t+/gm, (B) => "  ".repeat(B.length))
}

function fg(A) {
    return A ? s61(A) ? A : r61(t0(), A) : void 0
}

function R40(A) {
    let B = fg(A),
        Q = B ? seA(t0(), B) : void 0;
    return {
        absolutePath: B,
        relativePath: Q
    }
}

function xV(A) {
    let {
        relativePath: B
    } = R40(A);
    if (B && !B.startsWith("..")) return B;
    let Q = teA();
    if (A.startsWith(Q + VG4)) return "~" + A.slice(Q.length);
    return A
}

function Pq1(A) {
    let B = j1();
    try {
        let Q = M40(A),
            Z = N40(A, L40(A));
        if (!B.existsSync(Q)) return;
        let F = B.readdirSync(Q).filter((I) => N40(I.name, L40(I.name)) === Z && hs(Q, I.name) !== A)[0];
        if (F) return F.name;
        return
    } catch (Q) {
        R1(Q);
        return
    }
}

function A_({
    content: A,
    startLine: B
}) {
    if (!A) return "";
    return A.split(/\r?\n/).map((Z, D) => {
        let G = D + B,
            F = String(G);
        if (F.length >= 6) return `${F}→${Z}`;
        return `${F.padStart(6," ")}→${Z}`
    }).join(`
`)
}

function Q12(A) {
    let B = j1();
    if (!B.existsSync(A)) return !0;
    return B.isDirEmptySync(A)
}

function hz(A, B = jq1()) {
    let Q = UQ();
    if (!Q.ignorePatterns || Q.ignorePatterns.length === 0) return !1;
    let Z = s61(A) ? A : r61(B, A),
        D = seA(B, Z);
    if (!D) return !1;
    let G = Q.ignorePatterns.length > 0 ? reA.default().add(Q.ignorePatterns) : null;
    if (!G) return !1;
    return G.ignores(D)
}

function AX(A) {
    let B = j1(),
        {
            resolvedPath: Q,
            isSymlink: Z
        } = XV(B, A);
    if (Z) n1(`Reading through symlink: ${A} -> ${Q}`);
    let D = jY(Q);
    return B.readFileSync(Q, {
        encoding: D
    }).replaceAll(`\r
`, `
`)
}

function O40(A) {
    let {
        content: B
    } = vtA.readFile(A);
    return B
}

function wL(A, B, Q = {
    encoding: "utf-8"
}) {
    let Z = j1(),
        D = A;
    if (Z.existsSync(A)) try {
        let F = Z.readlinkSync(A);
        D = s61(F) ? F : r61(M40(A), F), n1(`Writing through symlink: ${A} -> ${D}`)
    } catch (F) {
        D = A
    }
    let G = `${D}.tmp.${process.pid}.${Date.now()}`;
    try {
        n1(`Writing to temp file: ${G}`);
        let F;
        if (Z.existsSync(D)) F = Z.statSync(D).mode, n1(`Preserving file permissions: ${F.toString(8)}`);
        if (Z.writeFileSync(G, B, {
                encoding: Q.encoding,
                flush: !0
            }), n1(`Temp file written successfully, size: ${B.length} bytes`), F !== void 0) Z.chmodSync(G, F), n1("Applied original permissions to temp file");
        n1(`Renaming ${G} to ${D}`), Z.renameSync(G, D), n1(`File ${D} written atomically`)
    } catch (F) {
        SA(`Failed to write file atomically: ${F}`), R1(F), X1("tengu_atomic_write_error", {});
        try {
            if (Z.existsSync(G)) n1(`Cleaning up temp file: ${G}`), Z.unlinkSync(G)
        } catch (I) {
            SA(`Failed to clean up temp file: ${I}`)
        }
        n1(`Falling back to non-atomic write for ${D}`);
        try {
            Z.writeFileSync(D, B, {
                encoding: Q.encoding,
                flush: !0
            }), n1(`File ${D} written successfully with non-atomic fallback`)
        } catch (I) {
            throw SA(`Non-atomic write also failed: ${I}`), I
        }
    }
}
var Oq1 = $20("claude-cli");

function Tq1(A) {
    return A.replace(/[^a-zA-Z0-9]/g, "-")
}

function yY(A) {
    let B = A / 1024;
    if (B < 1) return `${A} bytes`;
    if (B < 1024) return `${B.toFixed(1).replace(/\.0$/,"")}KB`;
    let Q = B / 1024;
    if (Q < 1024) return `${Q.toFixed(1).replace(/\.0$/,"")}MB`;
    return `${(Q/1024).toFixed(1).replace(/\.0$/,"")}GB`
}
var $L = {
    baseLogs: () => hs(Oq1.cache, Tq1(j1().cwd())),
    errors: () => hs(Oq1.cache, Tq1(j1().cwd()), "errors"),
    messages: () => hs(Oq1.cache, Tq1(j1().cwd()), "messages"),
    mcpLogs: (A) => hs(Oq1.cache, Tq1(j1().cwd()), `mcp-logs-${A}`)
};

function B_(A) {
    let B = L40(A);
    if (!B) return "unknown";
    return oeA.getLanguage(B.slice(1))?.name ?? "unknown"
}

function Sq1(A, B) {
    if (A.startsWith("~/")) return hs(teA(), A.substring(2));
    else if (s61(A)) return A;
    else {
        let Q = A.startsWith("./") ? A : `./${A}`;
        return r61(M40(B), Q)
    }
}

function Z12(A) {
    let B = j1();
    try {
        if (!B.existsSync(A)) B.mkdirSync(A);
        return !0
    } catch (Q) {
        return R1(Q instanceof Error ? Q : new Error(String(Q))), !1
    }
}
var D12 = ["PreToolUse", "PostToolUse", "Notification", "UserPromptSubmit", "SessionStart", "Stop", "SubagentStop", "PreCompact"];
var G12 = h.object({
    continue: h.boolean().optional(),
    suppressOutput: h.boolean().optional(),
    stopReason: h.string().optional(),
    decision: h.enum(["approve", "block"]).optional(),
    reason: h.string().optional(),
    systemMessage: h.string().optional(),
    hookSpecificOutput: h.union([h.object({
        hookEventName: h.literal("PreToolUse"),
        permissionDecision: h.enum(["allow", "deny", "ask"]).optional(),
        permissionDecisionReason: h.string().optional()
    }), h.object({
        hookEventName: h.literal("UserPromptSubmit"),
        additionalContext: h.string().optional()
    }), h.object({
        hookEventName: h.literal("SessionStart"),
        additionalContext: h.string().optional()
    }), h.object({
        hookEventName: h.literal("PostToolUse"),
        additionalContext: h.string().optional()
    })]).optional()
});
var T40 = {
    filePatternTools: ["Read", "Write", "Edit", "Glob", "MultiEdit", "NotebookRead", "NotebookEdit"],
    bashPrefixTools: ["Bash"],
    customValidation: {
        WebSearch: (A) => {
            if (A.includes("*") || A.includes("?")) return {
                valid: !1,
                error: "WebSearch does not support wildcards",
                suggestion: "Use exact search terms without * or ?",
                examples: ["WebSearch(claude ai)", "WebSearch(typescript tutorial)"]
            };
            return {
                valid: !0
            }
        },
        WebFetch: (A) => {
            if (A.includes("://") || A.startsWith("http")) return {
                valid: !1,
                error: "WebFetch permissions use domain format, not URLs",
                suggestion: 'Use "domain:hostname" format',
                examples: ["WebFetch(domain:example.com)", "WebFetch(domain:github.com)"]
            };
            if (!A.startsWith("domain:")) return {
                valid: !1,
                error: 'WebFetch permissions must use "domain:" prefix',
                suggestion: 'Use "domain:hostname" format',
                examples: ["WebFetch(domain:example.com)", "WebFetch(domain:*.google.com)"]
            };
            return {
                valid: !0
            }
        }
    }
};

function F12(A) {
    return T40.filePatternTools.includes(A)
}

function I12(A) {
    return T40.bashPrefixTools.includes(A)
}

function Y12(A) {
    return T40.customValidation[A]
}

function KG4(A) {
    if (!A || A.trim() === "") return {
        valid: !1,
        error: "Permission rule cannot be empty"
    };
    let B = (A.match(/\(/g) || []).length,
        Q = (A.match(/\)/g) || []).length;
    if (B !== Q) return {
        valid: !1,
        error: "Mismatched parentheses",
        suggestion: "Ensure all opening parentheses have matching closing parentheses"
    };
    if (A.includes("()")) {
        let F = A.substring(0, A.indexOf("("));
        if (!F) return {
            valid: !1,
            error: "Empty parentheses with no tool name",
            suggestion: "Specify a tool name before the parentheses"
        };
        return {
            valid: !1,
            error: "Empty parentheses",
            suggestion: `Either specify a pattern or use just "${F}" without parentheses`,
            examples: [`${F}`, `${F}(some-pattern)`]
        }
    }
    let Z = CK(A),
        D = oy(Z.toolName);
    if (D) {
        if (Z.ruleContent !== void 0) return {
            valid: !1,
            error: "MCP rules do not support patterns",
            suggestion: `Use "${Z.toolName}" without parentheses`,
            examples: [`mcp__${D.serverName}`, D.toolName ? `mcp__${D.serverName}__${D.toolName}` : void 0].filter(Boolean)
        };
        return {
            valid: !0
        }
    }
    if (!Z.toolName || Z.toolName.length === 0) return {
        valid: !1,
        error: "Tool name cannot be empty"
    };
    if (Z.toolName[0] !== Z.toolName[0]?.toUpperCase()) return {
        valid: !1,
        error: "Tool names must start with uppercase",
        suggestion: `Use "${String(Z.toolName).charAt(0).toUpperCase()+String(Z.toolName).slice(1)}"`
    };
    let G = Y12(Z.toolName);
    if (G && Z.ruleContent !== void 0) {
        let F = G(Z.ruleContent);
        if (!F.valid) return F
    }
    if (I12(Z.toolName) && Z.ruleContent !== void 0) {
        let F = Z.ruleContent;
        if (F.includes(":*") && !F.endsWith(":*")) return {
            valid: !1,
            error: "The :* pattern must be at the end",
            suggestion: "Move :* to the end for prefix matching",
            examples: ["Bash(npm run:*)", "Bash(git commit:*)"]
        };
        if (F.includes(" * ") && !F.endsWith(":*")) return {
            valid: !1,
            error: "Wildcards in the middle of commands are not supported",
            suggestion: 'Use prefix matching with ":*" or specify exact commands',
            examples: ["Bash(npm run:*) - allows any npm run command", "Bash(npm install express) - allows exact command", "Bash - allows all commands"]
        };
        if (F === ":*") return {
            valid: !1,
            error: "Prefix cannot be empty before :*",
            suggestion: "Specify a command prefix before :*",
            examples: ["Bash(npm:*)", "Bash(git:*)"]
        };
        let I = ['"', "'"];
        for (let W of I)
            if ((F.match(new RegExp(W, "g")) || []).length % 2 !== 0) return {
                valid: !1,
                error: `Unmatched ${W} in Bash pattern`,
                suggestion: "Ensure all quotes are properly paired"
            };
        if (F === "*") return {
            valid: !1,
            error: 'Use "Bash" without parentheses to allow all commands',
            suggestion: "Remove the parentheses or specify a command pattern",
            examples: ["Bash", "Bash(npm:*)", "Bash(npm install)"]
        };
        let Y = F.indexOf("*");
        if (Y !== -1 && !F.includes("/")) {
            if (!F.substring(0, Y).endsWith(":")) return {
                valid: !1,
                error: 'Use ":*" for prefix matching, not just "*"',
                suggestion: `Change to "Bash(${String(F).replace(/\*/g,":*")})" for prefix matching`,
                examples: ["Bash(npm run:*)", "Bash(git:*)"]
            }
        }
    }
    if (F12(Z.toolName) && Z.ruleContent !== void 0) {
        let F = Z.ruleContent;
        if (F.includes(":*")) return {
            valid: !1,
            error: 'The ":*" syntax is only for Bash prefix rules',
            suggestion: 'Use glob patterns like "*" or "**" for file matching',
            examples: [`${Z.toolName}(*.ts) - matches .ts files`, `${Z.toolName}(src/**) - matches all files in src`, `${Z.toolName}(**/*.test.ts) - matches test files`]
        };
        if (F.includes("*") && !F.match(/^\*|\*$|\*\*|\/\*|\*\.|\*\)/) && !F.includes("**")) return {
            valid: !1,
            error: "Wildcard placement might be incorrect",
            suggestion: "Wildcards are typically used at path boundaries",
            examples: [`${Z.toolName}(*.js) - all .js files`, `${Z.toolName}(src/*) - all files directly in src`, `${Z.toolName}(src/**) - all files recursively in src`]
        }
    }
    return {
        valid: !0
    }
}
var OK5 = h.string().superRefine((A, B) => {
    let Q = KG4(A);
    if (!Q.valid) {
        let Z = Q.error;
        if (Q.suggestion) Z += `. ${Q.suggestion}`;
        if (Q.examples && Q.examples.length > 0) Z += `. Examples: ${Q.examples.join(", ")}`;
        B.addIssue({
            code: h.ZodIssueCode.custom,
            message: Z,
            params: {
                received: A
            }
        })
    }
});
var HG4 = h.record(h.coerce.string());

function P40() {
    return h.string()
}