/* chunk:646 bytes:[14627340, 14645981) size:18641 source:unpacked-cli.js */
async function UT8(A, B) {
    let {
        code: Q,
        stderr: Z
    } = await F2("git", ["checkout", A]);
    if (Q !== 0) {
        n1(`Local checkout failed, trying to checkout from origin: ${Z}`);
        let D = await F2("git", ["checkout", "-b", A, `origin/${A}`]);
        if (Q = D.code, Z = D.stderr, Q !== 0) {
            n1(`Remote checkout with -b failed, trying without -b: ${Z}`);
            let G = await F2("git", ["checkout", "--track", `origin/${A}`]);
            Q = G.code, Z = G.stderr
        }
    }
    if (Q !== 0) {
        let D = new kY(`Failed to checkout branch '${A}': ${Z}`, e1.red(`Error: Failed to checkout branch '${A}': ${Z}
`));
        if (B) throw await B(D), D;
        await P4(1)
    }
}
async function CP0() {
    let {
        stdout: A
    } = await F2("git", ["branch", "--show-current"]);
    return A.trim()
}
async function wT8(A, B, Q) {
    let Z = await CP0();
    if (n1(`Current branch before teleport: '${Z}'`), B) {
        n1(`Switching to branch '${B}'...`), await ET8(B), await UT8(B);
        let I = await CP0();
        n1(`Branch after checkout: '${I}'`)
    } else n1("No branch specified, staying on current branch");
    if (!A || !Array.isArray(A)) throw new Error("Invalid conversation data: messages is not an array");
    n1(`Converting ${A.length} SDK messages to internal format...`);
    let D = JP0(A);
    n1(`Successfully converted ${D.length} messages from ${A.length} original`);
    let G = await CP0();
    return {
        messages: [...D, VT8(), XT8()],
        branchName: G
    }
}
async function VP0(A, B) {
    n1(`Resuming code session ID: ${A}`);
    try {
        let Q = process.env.TELEPORT_RESUME_URL;
        if (Q) return n1("Using TELEPORT_RESUME_URL from environment"), await KP0(Q, void 0, B);
        let Z = CZ()?.accessToken;
        if (!Z) throw X1("tengu_teleport_resume_error", {
            error_type: "no_access_token"
        }), new Error("No access token found. Please authenticate first.");
        let D = await lq1();
        if (!D) throw X1("tengu_teleport_resume_error", {
            error_type: "no_org_uuid"
        }), new Error("Unable to get organization UUID for constructing session URL");
        let G = `${p8().BASE_API_URL}/api/oauth/organizations/${D}/code/sessions/${A}/resume`,
            F = HP0(Z);
        return await KP0(G, F, B)
    } catch (Q) {
        let Z = Q instanceof Error ? Q : new Error(String(Q));
        R1(Z), SA(`Error during code session resume: ${Z.message}`), X1("tengu_teleport_resume_error", {
            error_type: "resume_session_id_catch"
        });
        let D = new kY(Z.message, e1.red(`Error: ${Z.message}
`));
        if (B) throw await B(D), D;
        throw await P4(1), Q
    }
}
async function KP0(A, B, Q) {
    n1(`Teleporting from URL: ${A}`);
    let Z = {};
    if (process.env.TELEPORT_HEADERS) {
        n1("Parsing TELEPORT_HEADERS from environment...");
        try {
            Z = JSON.parse(process.env.TELEPORT_HEADERS), n1(`Parsed ${Object.keys(Z).length} headers from TELEPORT_HEADERS`)
        } catch (D) {
            let G = D instanceof Error ? D : new Error(String(D));
            R1(G), SA(`Failed to parse TELEPORT_HEADERS: ${G.message}`);
            let F = new kY(`Invalid JSON in TELEPORT_HEADERS: ${G.message}`, e1.red(`Error: Invalid JSON in TELEPORT_HEADERS: ${G.message}
`));
            if (Q) throw await Q(F), F;
            await P4(1)
        }
    } else n1("No TELEPORT_HEADERS environment variable found");
    if (B) {
        for (let [D, G] of Object.entries(B))
            if (typeof G !== "string") {
                let F = new Error(`Invalid header value for "${D}": headers must be strings, got ${typeof G}`);
                throw R1(F), F
            } Z = {
            ...Z,
            ...B
        }, n1(`Added ${Object.keys(B).length} additional headers`)
    }
    try {
        n1("Fetching conversation from remote URL...");
        let D = await UcB(A, Z);
        if (!D) {
            SA("Remote URL returned empty response"), X1("tengu_teleport_resume_error", {
                error_type: "empty_response",
                url_type: A.startsWith("http") ? "http(s)" : "other"
            });
            let G = new kY("Failed to load conversation from remote URL", e1.red(`Error: Failed to load conversation from remote URL
`));
            if (Q) throw await Q(G), G;
            throw await P4(1), new Error("Failed to load conversation")
        }
        return n1("Successfully loaded conversation from remote URL"), n1(`Response contains ${D.log?.length||0} messages`), n1(`Response branch: ${D.branch||"none specified"}`), X1("tengu_teleport_resume_success", {
            messages_count: D.log?.length || 0,
            has_branch: !!D.branch
        }), await wT8(D.log, D.branch, Q)
    } catch (D) {
        let G = D instanceof Error ? D : new Error(String(D));
        R1(G), SA(`Error during remote URL teleport: ${G.message}`), X1("tengu_teleport_resume_error", {
            error_type: "teleport_from_url_catch"
        });
        let F = new kY(G.message, e1.red(`Error: ${G.message}
`));
        if (Q) throw await Q(F), F;
        throw await P4(1), D
    }
}
async function zP0(A, B) {
    if (await zT8(B), !A) throw new Error("No URL or session ID provided for teleport");
    if (A.startsWith("http:") || A.startsWith("https:")) return KP0(A, void 0, B);
    return VP0(A, B)
}
async function XP0() {
    let A = new Set,
        [B, Q] = await Promise.all([Zq1(), KB() ? Po() : Promise.resolve(!0)]);
    if (Q) A.add("needsLogin");
    if (!B) A.add("needsGitStash");
    return A
}
async function blB(A) {
    let B = await XP0();
    if (B.size > 0) X1("tengu_teleport_errors_detected", {
        error_types: Array.from(B).join(","),
        errors_ignored: Array.from(A || []).join(",")
    }), await new Promise((Q) => {
        let {
            unmount: Z
        } = S8(rI1.default.createElement(F7, null, rI1.default.createElement(sg1, {
            errorsToIgnore: A,
            onComplete: () => {
                X1("tengu_teleport_errors_resolved", {
                    error_types: Array.from(B).join(",")
                }), Z(), Q()
            }
        })), {
            exitOnCtrlC: !1
        })
    })
}
async function flB(A, B) {
    return await blB(), zP0(A, B)
}
async function hlB(A) {
    return await blB(new Set(["needsGitStash"])), $T8(A)
}
async function glB() {
    return n1("selectAndResumeTeleportTask: Starting teleport flow..."), new Promise((A) => {
        let {
            unmount: B
        } = S8(rI1.default.createElement(F7, null, rI1.default.createElement(xlB, {
            onComplete: (Q) => {
                B(), A(Q)
            },
            onCancel: () => {
                B(), A(null)
            },
            onError: (Q, Z) => {
                process.stderr.write(Z || `Error: ${Q}
`), B(), A(null)
            },
            source: "cliArg"
        })), {
            exitOnCtrlC: !1
        })
    })
}
async function $T8(A) {
    n1(`teleportToRemote: Creating remote session with description: ${A.slice(0,100)}...`);
    try {
        await Po();
        let B = CZ()?.accessToken;
        if (!B) return SA("No access token found for remote session creation"), null;
        let Q = await lq1();
        if (!Q) return SA("Unable to get organization UUID for remote session creation"), null;
        let Z = await rg1(),
            D = null;
        if (Z) {
            n1(`Detected repository: ${Z}`);
            let [V, C] = Z.split("/");
            if (V && C) {
                let K = await IeA();
                D = {
                    name: C,
                    owner: {
                        login: V
                    },
                    default_branch: K
                }, n1(`Repository data prepared: ${JSON.stringify(D)}`)
            } else SA(`Invalid repository format: ${Z} - expected 'owner/name'`)
        } else n1("No repository detected, creating session without repo context");
        n1("Generating title for session...");
        let G = await HT8(A);
        n1(`Generated title: ${G}`);
        let F = `${p8().BASE_API_URL}/api/oauth/organizations/${Q}/code/sessions`,
            I = HP0(B),
            Y = {
                description: A,
                title: G,
                repo: D
            };
        n1(`Making API request to: ${F}`), n1(`Request body: ${JSON.stringify(Y)}`);
        let W = await J9.post(F, Y, {
            headers: I
        });
        if (W.status !== 200 && W.status !== 201) return SA(`API request failed with status ${W.status}: ${W.statusText}

Response data: ${JSON.stringify(W.data,null,2)}`), null;
        let J = vlB.safeParse(W.data);
        if (J.success) {
            let V = J.data;
            return n1(`Successfully created remote session: ${V.id}`), {
                id: V.id,
                title: V.title
            }
        }
        let X = W.data;
        if (typeof X === "object" && X !== null) {
            let {
                id: V,
                title: C
            } = X;
            if (typeof V === "string") return {
                id: V,
                title: typeof C === "string" ? C : G
            }
        }
        return SA(`Cannot determine session ID from API response: ${JSON.stringify(W.data)}`), null
    } catch (B) {
        let Q = B instanceof Error ? B : new Error(String(B));
        if (R1(Q), Q instanceof J9.AxiosError) SA(`Error data: ${JSON.stringify(Q.response?.data,null,2)}`);
        return SA(`Error creating remote session: ${Q.message}`), null
    }
}
async function ulB(A, B, Q, Z, D, G, F, I) {
    let Y = [];
    if (I.continue) try {
        X1("tengu_continue_print", {});
        let $ = await Rb(void 0, G.concat(F));
        if ($) Y = $.messages
    } catch ($) {
        R1($ instanceof Error ? $ : new Error(String($))), O5(1);
        return
    }
    if (I.teleport) try {
        X1("tengu_teleport_print", {});
        let $ = typeof I.teleport === "string" ? I.teleport : null;
        Y = (await zP0($)).messages
    } catch ($) {
        R1($ instanceof Error ? $ : new Error(String($))), O5(1);
        return
    }
    if (I.resume) try {
        X1("tengu_resume_print", {});
        let $ = VK(I.resume);
        if (!$) {
            if (process.stderr.write(`Error: --resume requires a valid session ID when used with --print
`), process.stderr.write(`Usage: claude -p --resume <session-id>
`), typeof I.resume === "string" && !$) process.stderr.write(`Session IDs must be in UUID format (e.g., 550e8400-e29b-41d4-a716-446655440000)
`), process.stderr.write(`Provided value "${I.resume}" is not a valid UUID
`);
            O5(1);
            return
        }
        let L = await Rb($, G.concat(F));
        if (!L) {
            process.stderr.write(`No conversation found with session ID: ${$}
`), O5(1);
            return
        }
        Y = L.messages
    } catch ($) {
        R1($ instanceof Error ? $ : new Error(String($))), process.stderr.write(`Failed to resume session with --print mode
`), O5(1);
        return
    }
    let W;
    if (typeof A === "string")
        if (A.trim() !== "") W = VN0([JSON.stringify({
            type: "user",
            session_id: "",
            message: {
                role: "user",
                content: A
            },
            parent_tool_use_id: null
        })]);
        else W = VN0([]);
    else W = A;
    let J = I.sdkUrl ? new YP0(I.sdkUrl, W) : new sI1(W),
        X = Boolean(VK(I.resume)),
        V = Boolean(I.sdkUrl);
    if (!A && !X && !V) {
        process.stderr.write(`Error: Input must be provided either through stdin or as a prompt argument when using --print
`), O5(1);
        return
    }
    if (I.outputFormat === "stream-json" && !I.verbose) {
        process.stderr.write(`Error: When using --print, --output-format=stream-json requires --verbose
`), O5(1);
        return
    }
    let C = [...G, ...F],
        K = MT8(I.permissionPromptToolName, J, F);
    if (I.permissionPromptToolName) C = C.filter(($) => $.name !== I.permissionPromptToolName);
    if (Y.length === 0 && !I.continue && !I.resume && !I.teleport) Y = [...await WU("startup"), ...Y];
    let H = [];
    for await (let $ of NT8(J.structuredInput, B, Q, [...Z, ...D], C, Y, K, I)) {
        if (I.outputFormat === "stream-json" && I.verbose) J.write($);
        if ($.type !== "control_response" && $.type !== "control_request" && $.type !== "control_cancel_request") H.push($)
    }
    let z = ZI(H);
    switch (I.outputFormat) {
        case "json":
            if (!z || z.type !== "result") throw new Error("No messages returned");
            if (I.verbose) {
                lD(JSON.stringify(H) + `
`);
                break
            }
            lD(JSON.stringify(z) + `
`);
            break;
        case "stream-json":
            break;
        default:
            if (!z || z.type !== "result") throw new Error("No messages returned");
            switch (z.subtype) {
                case "success":
                    lD(z.result.endsWith(`
`) ? z.result : z.result + `
`);
                    break;
                case "error_during_execution":
                    lD("Execution error");
                    break;
                case "error_max_turns":
                    lD(`Error: Reached max turns (${I.maxTurns})`)
            }
    }
    O5(z?.type === "result" && z?.is_error ? 1 : 0)
}

function NT8(A, B, Q, Z, D, G, F, I) {
    let Y = [],
        W = () => Y,
        J = ($) => {
            Y = Y.filter((L) => !$.includes(L))
        },
        X = !1,
        V = !1,
        C = new WP0,
        K = PlB(G),
        H, z = async () => {
            X = !0;
            try {
                while (Y.length > 0) {
                    let $ = Y.shift();
                    if ($.mode !== "prompt") throw new Error("only prompt commands are supported in streaming mode");
                    let L = $.value;
                    H = h4();
                    for await (let N of TlB({
                        commands: Z,
                        prompt: L,
                        cwd: qT8(),
                        tools: D,
                        permissionContext: B,
                        verbose: I.verbose,
                        mcpClients: Q,
                        maxTurns: I.maxTurns,
                        canUseTool: F,
                        userSpecifiedModel: I.userSpecifiedModel,
                        fallbackModel: I.fallbackModel,
                        mutableMessages: K,
                        customSystemPrompt: I.systemPrompt,
                        appendSystemPrompt: I.appendSystemPrompt,
                        getQueuedCommands: W,
                        removeQueuedCommands: J,
                        abortController: H
                    })) {
                        if (!((N.type === "assistant" || N.type === "user") && N.parent_tool_use_id)) K.push(N);
                        C.enqueue(N)
                    }
                }
            } finally {
                X = !1
            }
            if (V) C.done()
        };
    return (async () => {
        let $ = !1;
        for await (let L of A) {
            if (L.type === "control_request") {
                if (L.request.subtype === "interrupt") {
                    if (H) H.abort();
                    C.enqueue({
                        type: "control_response",
                        response: {
                            subtype: "success",
                            request_id: L.request_id
                        }
                    })
                } else if (L.request.subtype === "initialize") RT8(L.request, L.request_id, $, C, Z), $ = !0;
                continue
            } else if (L.type === "control_response") continue;
            if ($ = !0, Y.push({
                    mode: "prompt",
                    value: L.message.content
                }), !X) z()
        }
        if (V = !0, !X) C.done()
    })(), C
}

function LT8(A) {
    let B = async (Q, Z, D, G, F) => {
        let I = await iw(Q, Z, D, G, F);
        if (I.behavior === "allow" || I.behavior === "deny") return I;
        for await (let Y of A.call({
            tool_name: Q.name,
            input: Z,
            tool_use_id: F
        }, D, B, G)) {
            if (Y.type !== "result") continue;
            if (D.abortController.signal.aborted) return {
                behavior: "deny",
                message: "Permission prompt was aborted.",
                decisionReason: {
                    type: "permissionPromptTool",
                    permissionPromptToolName: Q.name,
                    toolResult: Y
                }
            };
            let W = A.mapToolResultToToolResultBlockParam(Y.data, "1");
            if (!W.content || !Array.isArray(W.content) || !W.content[0] || W.content[0].type !== "text" || typeof W.content[0].text !== "string") throw new Error('Permission prompt tool returned an invalid result. Expected a single text block param with type="text" and a string text value.');
            return Fc(ag1.parse(T7(W.content[0].text)), A.name)
        }
        return I
    };
    return B
}

function MT8(A, B, Q) {
    if (A === "stdio") return B.createCanUseTool();
    else if (A) {
        let Z = Q.find((D) => D.name === A);
        if (!Z) {
            let D = `Error: MCP tool ${A} (passed via --permission-prompt-tool) not found. Available MCP tools: ${Q.map((G)=>G.name).join(", ")||"none"}`;
            throw process.stderr.write(`${D}
`), O5(1), new Error(D)
        }
        if (!Z.inputJSONSchema) {
            let D = `Error: tool ${A} (passed via --permission-prompt-tool) must be an MCP tool`;
            throw process.stderr.write(`${D}
`), O5(1), new Error(D)
        }
        return LT8(Z)
    }
    return iw
}

function RT8(A, B, Q, Z, D) {
    if (Q) {
        Z.enqueue({
            type: "control_response",
            response: {
                subtype: "error",
                error: "Already initialized",
                request_id: B
            }
        });
        return
    }
    Z.enqueue({
        type: "control_response",
        response: {
            subtype: "success",
            request_id: B,
            response: {
                commands: D.map((G) => ({
                    name: G.userFacingName(),
                    description: G.description,
                    argumentHint: G.argumentHint || ""
                }))
            }
        }
    })
}