/* chunk:579 bytes:[13441450, 13461331) size:19881 source:unpacked-cli.js */
var pPB = h.strictObject({
        old_string: h.string().describe("The text to replace"),
        new_string: h.string().describe("The text to replace it with"),
        replace_all: h.boolean().default(!1).optional().describe("Replace all occurences of old_string (default false).")
    }),
    iF8 = h.strictObject({
        file_path: h.string().describe("The absolute path to the file to modify"),
        edits: h.array(pPB).min(1, "At least one edit is required").describe("Array of edit operations to perform sequentially on the file")
    }),
    eJ3 = h.object({
        filePath: h.string().describe("The file path that was edited"),
        originalFileContents: h.string().describe("The original file contents before edits"),
        structuredPatch: h.array(pG1).describe("Array of diff hunks showing changes"),
        edits: h.array(pPB).describe("The edits that were applied"),
        userModified: h.boolean().describe("Whether user modified the changes")
    }),
    m$ = {
        name: Wv1,
        description: FF.description,
        async prompt() {
            return kLB
        },
        userFacingName(A) {
            if (!A || !A.edits) return "Update";
            if (lPB(A.edits)) return "Create";
            return "Update"
        },
        isEnabled() {
            return !0
        },
        inputSchema: iF8,
        isConcurrencySafe() {
            return !1
        },
        isReadOnly() {
            return !1
        },
        getPath(A) {
            return A.file_path
        },
        async checkPermissions(A, B) {
            return FF.checkPermissions({
                file_path: A.file_path,
                old_string: "",
                new_string: ""
            }, B)
        },
        renderToolUseMessage({
            file_path: A
        }, {
            theme: B,
            verbose: Q
        }) {
            return FF.renderToolUseMessage({
                file_path: A,
                old_string: "",
                new_string: ""
            }, {
                theme: B,
                verbose: Q
            })
        },
        renderToolUseProgressMessage() {
            return null
        },
        renderToolResultMessage({
            filePath: A,
            originalFileContents: B,
            structuredPatch: Q,
            userModified: Z
        }, D, G) {
            return FF.renderToolResultMessage({
                filePath: A,
                originalFile: B,
                structuredPatch: Q,
                oldString: "",
                newString: "",
                userModified: Z,
                replaceAll: !1
            }, D, G)
        },
        renderToolUseRejectedMessage({
            file_path: A,
            edits: B
        }, {
            style: Q,
            verbose: Z
        }) {
            try {
                let D = j1().existsSync(A) ? j1().readFileSync(A, {
                        encoding: "utf8"
                    }) : "",
                    {
                        patch: G
                    } = wS({
                        filePath: A,
                        fileContents: D,
                        edits: lG1(B)
                    });
                return zd.createElement(zb1, {
                    file_path: A,
                    operation: lPB(B) ? "write" : "update",
                    patch: G,
                    style: Q,
                    verbose: Z
                })
            } catch (D) {
                return R1(D), zd.createElement(OA, {
                    height: 1
                }, zd.createElement(T, null, "(No changes)"))
            }
        },
        async validateInput({
            file_path: A,
            edits: B
        }, Q) {
            for (let G of B) {
                let F = await FF.validateInput({
                    file_path: A,
                    old_string: G.old_string,
                    new_string: G.new_string,
                    replace_all: G.replace_all
                }, Q);
                if (!F.result) return F
            }
            let Z = HD(A),
                D = j1();
            if (D.existsSync(Z)) {
                let G = D.readFileSync(Z, {
                        encoding: "utf8"
                    }),
                    F = Eb1(Z, G, () => {
                        let {
                            updatedFile: I
                        } = wS({
                            filePath: Z,
                            fileContents: G,
                            edits: lG1(B)
                        });
                        return I
                    });
                if (F !== null) return F
            }
            return {
                result: !0
            }
        },
        inputsEquivalent(A, B) {
            let Q = (Z) => ({
                file_path: Z.file_path,
                edits: lG1(Z.edits)
            });
            return Hb1(Q(A), Q(B))
        },
        async * call({
            file_path: A,
            edits: B
        }, {
            readFileState: Q,
            userModified: Z
        }) {
            let D = lG1(B),
                G = j1(),
                F = HD(A),
                I = G.existsSync(F) ? AX(F) : "";
            await u$.beforeFileEdited(F);
            let {
                patch: Y,
                updatedFile: W
            } = wS({
                filePath: F,
                fileContents: I,
                edits: D
            }), J = lF8(F);
            G.mkdirSync(J);
            let X = G.existsSync(F) ? OT(F) : "LF",
                V = G.existsSync(F) ? jY(F) : "utf8";
            if (ey(F, W, V, X), Q.set(F, {
                    content: W,
                    timestamp: G.statSync(F).mtimeMs
                }), F.endsWith(`${pF8}CLAUDE.md`)) X1("tengu_write_claudemd", {});
            Hd(Y), yield {
                type: "result",
                data: {
                    filePath: A,
                    edits: D,
                    originalFileContents: I,
                    structuredPatch: Y,
                    userModified: Z ?? !1
                }
            }
        },
        mapToolResultToToolResultBlockParam({
            filePath: A,
            edits: B,
            userModified: Q
        }, Z) {
            let D = Q ? ".  The user modified your proposed changes before accepting them." : "";
            return {
                tool_use_id: Z,
                type: "tool_result",
                content: `Applied ${B.length} edit${B.length===1?"":"s"} to ${A}${D}:
${B.map((G,F)=>`${F+1}. Replaced "${G.old_string.substring(0,50)}${G.old_string.length>50?"...":""}" with "${G.new_string.substring(0,50)}${G.new_string.length>50?"...":""}"`).join(`
`)}`
            }
        },
        renderToolUseErrorMessage(A, B) {
            return FF.renderToolUseErrorMessage(A, B)
        }
    };

function lPB(A) {
    return A.some((B) => B.old_string === "")
}
async function iPB(A, B) {
    return {
        name: A.name,
        description: await A.prompt({
            getToolPermissionContext: B.getToolPermissionContext,
            tools: B.tools
        }),
        input_schema: "inputJSONSchema" in A && A.inputJSONSchema ? A.inputJSONSchema : hg(A.inputSchema)
    }
}

function nPB(A) {
    let [B] = vN0(A);
    X1("tengu_sysprompt_block", {
        snippet: B?.slice(0, 20),
        length: B?.length ?? 0,
        hash: B ? nF8("sha256").update(B).digest("hex") : ""
    })
}

function vN0(A) {
    let B = A[0] || "",
        Q = A.slice(1);
    return [B, Q.join(`
`)].filter(Boolean)
}

function bN0(A, B) {
    return [...A, Object.entries(B).map(([Q, Z]) => `${Q}: ${Z}`).join(`
`)]
}

function iG1(A, B) {
    if (Object.entries(B).length === 0) return A;
    return aF8(B), [D2({
        content: `<system-reminder>
As you answer the user's questions, you can use the following context:
${Object.entries(B).map(([Q,Z])=>`# ${Q}
${Z}`).join(`
`)}
      
      IMPORTANT: this context may or may not be relevant to your tasks. You should not respond to this context unless it is highly relevant to your task.
</system-reminder>
`,
        isMeta: !0
    }), ...A]
}
async function aF8(A) {
    let B = A.directoryStructure?.length ?? 0,
        Q = A.gitStatus?.length ?? 0,
        Z = A.claudeMd?.length ?? 0,
        D = B + Q + Z,
        G = UQ(),
        F = h4();
    setTimeout(() => F.abort(), 1000);
    let I = await v$1(t0(), F.signal, G.ignorePatterns ?? []);
    X1("tengu_context_size", {
        directory_structure_size: B,
        git_status_size: Q,
        claude_md_size: Z,
        total_context_size: D,
        project_file_count_rounded: I
    })
}

function fN0(A, B) {
    try {
        let Q = A.message.content.map((Z) => {
            if (Z.type !== "tool_use") return Z;
            if (typeof Z.input !== "object" || Z.input === null) return Z;
            let D = B.find((G) => G.name === Z.name);
            if (!D) return Z;
            return {
                ...Z,
                input: sF8(D, Z.input)
            }
        });
        return {
            ...A,
            message: {
                ...A.message,
                content: Q
            }
        }
    } catch (Q) {
        return R1(new Error("Error normalizing tool input:" + Q)), A
    }
}

function sF8(A, B) {
    switch (A.name) {
        case VQ.name: {
            let {
                command: Q,
                sandbox: Z,
                timeout: D,
                description: G,
                run_in_background: F
            } = VQ.inputSchema.parse(B), I = Q.replace(`cd ${t0()} && `, "");
            if (I = I.replace(/\\\\;/g, "\\;"), /^echo\s+["']?[^|&;><]*["']?$/i.test(I.trim())) X1("tengu_bash_tool_simple_echo", {});
            return {
                command: I,
                ...D ? {
                    timeout: D
                } : {},
                ...Z !== void 0 ? {
                    sandbox: Z
                } : {},
                ...G ? {
                    description: G
                } : {},
                ...F ? {
                    run_in_background: F
                } : {}
            }
        }
        case FF.name: {
            let Q = FF.inputSchema.parse(B),
                {
                    file_path: Z,
                    edits: D
                } = xN0({
                    file_path: Q.file_path,
                    edits: [{
                        old_string: Q.old_string,
                        new_string: Q.new_string,
                        replace_all: Q.replace_all
                    }]
                });
            return {
                replace_all: D[0].replace_all,
                file_path: Z,
                old_string: D[0].old_string,
                new_string: D[0].new_string
            }
        }
        case m$.name: {
            let Q = m$.inputSchema.parse(B);
            return xN0(Q)
        }
        default:
            return B
    }
}

function rF8(A) {
    if (A?.type === "assistant" && "usage" in A.message && !(A.message.content[0]?.type === "text" && hN0.has(A.message.content[0].text)) && A.message.model !== "<synthetic>") return A.message.usage;
    return
}

function oF8(A) {
    return A.input_tokens + (A.cache_creation_input_tokens ?? 0) + (A.cache_read_input_tokens ?? 0) + A.output_tokens
}

function UJ(A) {
    let B = A.length - 1;
    while (B >= 0) {
        let Q = A[B],
            Z = Q ? rF8(Q) : void 0;
        if (Z) return oF8(Z);
        B--
    }
    return 0
}
var wb1 = G1(z1(), 1);
var nG1 = {
        status: "allowed",
        unifiedRateLimitFallbackAvailable: !1
    },
    gN0 = new Set;

function aPB(A) {
    nG1 = A, gN0.forEach((Q) => Q(A));
    let B = Math.round((A.resetsAt ? A.resetsAt - Date.now() / 1000 : 0) / 3600);
    X1("tengu_claudeai_limits_status_changed", {
        status: A.status,
        unifiedRateLimitFallbackAvailable: A.unifiedRateLimitFallbackAvailable,
        hoursTillReset: B
    })
}
async function tF8() {
    let A = WT(),
        B = await y$({
            maxRetries: 0,
            model: A,
            isNonInteractiveSession: !1
        }),
        Q = [{
            role: "user",
            content: "quota"
        }],
        Z = VV(A);
    return B.beta.messages.create({
        model: A,
        max_tokens: 1,
        messages: Q,
        metadata: aG1(),
        ...Z.length > 0 ? {
            betas: Z
        } : {}
    }).asResponse()
}
async function sPB() {
    if (!KB()) return;
    try {
        let A = await tF8();
        uN0(A.headers)
    } catch (A) {
        if (A instanceof D6) mN0(A)
    }
}

function X01() {
    let [A, B] = wb1.useState({
        ...nG1
    });
    return wb1.useEffect(() => {
        let Q = (Z) => {
            B({
                ...Z
            })
        };
        return gN0.add(Q), () => {
            gN0.delete(Q)
        }
    }, []), A
}

function rPB(A) {
    let B = A.get("anthropic-ratelimit-unified-status") || "allowed",
        Q = A.get("anthropic-ratelimit-unified-reset"),
        Z = Q ? Number(Q) : void 0,
        D = A.get("anthropic-ratelimit-unified-fallback") === "available";
    return {
        status: B,
        resetsAt: Z,
        unifiedRateLimitFallbackAvailable: D
    }
}

function uN0(A) {
    if (!KB()) return;
    let B = rPB(A);
    if (!xW1(nG1, B)) aPB(B)
}

function mN0(A) {
    if (!KB() || A.status !== 429) return;
    try {
        let B = {
            ...nG1
        };
        if (A.headers) B = rPB(A.headers);
        if (B.status = "rejected", !xW1(nG1, B)) aPB(B)
    } catch (B) {
        R1(B)
    }
}

function oPB(A, B, Q, Z) {
    if (!Q.resetsAt) return;
    let D = Sw1();
    if (!A && Q.unifiedRateLimitFallbackAvailable && (D === void 0 || D === null) && iq2()) {
        Z(!0), X1("tengu_claude_ai_limits_enable_fallback", {});
        return
    }
    if (A && B !== void 0 && Q.resetsAt !== void 0 && Q.resetsAt > B) Z(!1), X1("tengu_claude_ai_limits_disable_fallback", {})
}
import {
    createHash as eF8
} from "crypto";
import {
    dirname as tPB,
    join as AI8
} from "path";
import * as BSB from "path";
async function dN0(A, B) {
    return await B()
}

function BI8(A, B) {
    return A.map((Q) => {
        if (typeof Q === "string") return B(Q);
        return Q.map((Z) => {
            switch (Z.type) {
                case "tool_result":
                    if (typeof Z.content === "string") return {
                        ...Z,
                        content: B(Z.content)
                    };
                    if (Array.isArray(Z.content)) return {
                        ...Z,
                        content: Z.content.map((D) => {
                            switch (D.type) {
                                case "text":
                                    return {
                                        ...D, text: B(D.text)
                                    };
                                case "image":
                                    return D;
                                default:
                                    return
                            }
                        })
                    };
                    return Z;
                case "text":
                    return {
                        ...Z, text: B(Z.text)
                    };
                case "tool_use":
                    return {
                        ...Z, input: $b1(Z.input, B)
                    };
                case "image":
                    return Z;
                default:
                    return
            }
        })
    })
}

function $b1(A, B) {
    return ij(A, (Q, Z) => {
        if (Array.isArray(Q)) return Q.map((D) => $b1(D, B));
        if (wf(Q)) return $b1(Q, B);
        return B(Q, Z, A)
    })
}

function ePB(A, B) {
    return {
        uuid: "UUID",
        requestId: "REQUEST_ID",
        timestamp: A.timestamp,
        message: {
            ...A.message,
            content: A.message.content.map((Q) => {
                switch (Q.type) {
                    case "text":
                        return {
                            ...Q, text: B(Q.text), citations: Q.citations || []
                        };
                    case "tool_use":
                        return {
                            ...Q, input: $b1(Q.input, B)
                        };
                    default:
                        return Q
                }
            }).filter(Boolean)
        },
        type: "assistant"
    }
}

function ASB(A) {
    if (typeof A !== "string") return A;
    let B = A.replace(/num_files="\d+"/g, 'num_files="[NUM]"').replace(/duration_ms="\d+"/g, 'duration_ms="[DURATION]"').replace(/cost_usd="\d+"/g, 'cost_usd="[COST]"').replace(/\//g, BSB.sep).replaceAll(t0(), "[CWD]");
    if (B.includes("Files modified by user:")) return "Files modified by user: [FILES]";
    return B
}

function QI8(A) {
    if (typeof A !== "string") return A;
    return A.replaceAll("[NUM]", "1").replaceAll("[DURATION]", "100").replaceAll("[CWD]", t0())
}
async function* cN0(A, B) {
    return yield* B()
}
var mF = G1(z1(), 1);
var lN0 = G1(z1(), 1);
var qb1 = !1,
    ZI8 = EA(async function(A) {
        let B = await y$({
                apiKey: A,
                maxRetries: 0,
                isNonInteractiveSession: !0
            }),
            {
                response: Q
            } = await B.models.list({
                limit: 1
            }).withResponse();
        return Q.headers.get("anthropic-organization-id")
    });
async function Nb1() {
    let A = await DI8();
    if (H0().isQualifiedForDataSharing !== A) gA({
        ...H0(),
        isQualifiedForDataSharing: A
    }), qb1 = !1;
    return A
}
async function DI8() {
    try {
        if (KB()) return !1;
        let A = H0().oauthAccount;
        if (!A) return !1;
        let B = LY(!1);
        if (!B) return !1;
        let Q = A.organizationUuid;
        if (!Q) {
            if (Q = await ZI8(B), !Q) return !1
        }
        let Z = await J9.get(`https://api.anthropic.com/api/organizations/${Q}/claude_code_data_sharing`, {
            headers: {
                "Content-Type": "application/json",
                "User-Agent": Cy(),
                "x-api-key": B
            }
        });
        if (Z.status === 200) return Z.data.claude_code_data_sharing_enabled;
        return X1("tengu_data_sharing_response_err", {
            responseStatus: Z.status
        }), !1
    } catch (A) {
        return R1(A), !1
    }
}

function Ed() {
    if (process.env.IS_DEMO) return !1;
    return H0().isQualifiedForDataSharing ?? !1
}

function GI8() {
    qb1 = !0;
    let A = H0();
    if (A.initialDataSharingMessageSeen) return;
    gA({
        ...A,
        initialDataSharingMessageSeen: !0
    })
}

function QSB() {
    if (qb1) return !1;
    return Ed()
}

function FI8() {
    return lN0.useEffect(() => {
        GI8()
    }, []), mF.createElement(v, {
        flexDirection: "column",
        gap: 1,
        paddingLeft: 1,
        paddingTop: 1
    }, mF.createElement(T, {
        color: "text"
    }, "Your organization has enrolled in the", " ", mF.createElement(C3, {
        url: "https://support.anthropic.com/en/articles/11174108-about-the-development-partner-program"
    }, "Development Partner Program"), ". Your Claude Code sessions are being shared with Anthropic to improve our services including model training. Questions? Contact your account", " ", mF.createElement(C3, {
        url: "https://console.anthropic.com/settings/members"
    }, "admin"), "."))
}

function ZSB(A) {
    if (process.env.CLAUDE_CODE_USE_BEDROCK || process.env.CLAUDE_CODE_USE_VERTEX) return !1;
    return [Kh.firstParty, Hh.firstParty, jO.firstParty, Vh.firstParty, Ch.firstParty].includes(A)
}