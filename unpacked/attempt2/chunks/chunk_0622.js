/* chunk:622 bytes:[14220105, 14236478) size:16373 source:unpacked-cli.js */
async function* KmB(A, B, Q, Z, D, G, F, I, Y, W, J) {
    let X = [],
        V = !1,
        C, K = Date.now();
    try {
        let H = djB(F.abortController.signal, void 0, W ?? !1, F.agentId !== CB());
        for await (let z of H) {
            if (z.message) yield z.message;
            if (z.blockingErrors) X = z.blockingErrors;
            if (z.preventContinuation) {
                if (V = !0, z.stopReason) C = z.stopReason
            }
        }
        if (F.abortController.signal.aborted) {
            X1("tengu_pre_stop_hooks_cancelled", {}), yield Wg1(!1, F);
            return
        }
        if (V) {
            yield q3(C || "Stop hook prevented continuation", "warning", void 0, !0);
            return
        }
        if (X.length > 0) {
            let z = D2({
                content: bjB(X)
            });
            yield z, yield* wR({
                messages: [...A, ...B, z],
                systemPrompt: Q,
                userContext: Z,
                systemContext: D,
                canUseTool: G,
                toolUseContext: F,
                autoCompactTracking: I,
                fallbackModel: Y,
                stopHookActive: !0,
                promptCategory: J
            });
            return
        }
    } catch (H) {
        let z = Date.now() - K;
        X1("tengu_stop_hook_error", {
            duration: z
        }), yield q3(`Stop hook failed: ${H instanceof Error?H.message:String(H)}`, "warning")
    }
}
async function* JL8(A, B, Q, Z) {
    for (let {
            isConcurrencySafe: D,
            blocks: G
        }
        of XL8(A, Z))
        if (D) yield* CL8(G, B, Q, Z);
        else yield* VL8(G, B, Q, Z)
}

function XL8(A, B) {
    return A.reduce((Q, Z) => {
        let D = B.options.tools.find((I) => I.name === Z.name),
            G = D?.inputSchema.safeParse(Z.input),
            F = G?.success ? Boolean(D?.isConcurrencySafe(G.data)) : !1;
        if (F && Q[Q.length - 1]?.isConcurrencySafe) Q[Q.length - 1].blocks.push(Z);
        else Q.push({
            isConcurrencySafe: F,
            blocks: [Z]
        });
        return Q
    }, [])
}
async function* VL8(A, B, Q, Z) {
    for (let D of A) yield* zmB(D, B.find((G) => G.message.content.some((F) => F.type === "tool_use" && F.id === D.id)), Q, Z)
}
async function* CL8(A, B, Q, Z) {
    yield* nTB(A.map((D) => zmB(D, B.find((G) => G.message.content.some((F) => F.type === "tool_use" && F.id === D.id)), Q, Z)), YL8)
}

function Jg1(A, B) {
    A.setInProgressToolUseIDs((Q) => new Set([...Q].filter((Z) => Z !== B)))
}
async function* zmB(A, B, Q, Z) {
    let D = A.name,
        G = Z.options.tools.find((I) => I.name === D);
    if (Z.setInProgressToolUseIDs((I) => new Set([...I, A.id])), !G) {
        X1("tengu_tool_use_error", {
            error: `No such tool available: ${D}`,
            toolName: D,
            toolUseID: A.id,
            isMcp: !1
        }), yield D2({
            content: [{
                type: "tool_result",
                content: `<tool_use_error>Error: No such tool available: ${D}</tool_use_error>`,
                is_error: !0,
                tool_use_id: A.id
            }],
            toolUseResult: `Error: No such tool available: ${D}`
        }), Jg1(Z, A.id);
        return
    }
    let F = A.input;
    try {
        if (Z.abortController.signal.aborted) {
            X1("tengu_tool_use_cancelled", {
                toolName: G.name,
                toolUseID: A.id,
                isMcp: G.isMcp ?? !1
            });
            let I = ub1(A.id);
            yield D2({
                content: [I],
                toolUseResult: lv
            }), Jg1(Z, A.id);
            return
        }
        for await (let I of KL8(G, A.id, F, Z, Q, B)) yield I
    } catch (I) {
        R1(I instanceof Error ? I : new Error(String(I)));
        let Y = I instanceof Error ? I.message : String(I),
            J = `Error calling tool${G?` (${G.name})`:""}: ${Y}`;
        yield D2({
            content: [{
                type: "tool_result",
                content: `<tool_use_error>${J}</tool_use_error>`,
                is_error: !0,
                tool_use_id: A.id
            }],
            toolUseResult: J
        })
    }
    Jg1(Z, A.id)
}
async function* KL8(A, B, Q, Z, D, G) {
    let F = A.inputSchema.safeParse(Q);
    if (!F.success) {
        let R = HmB(A.name, F.error);
        X1("tengu_tool_use_error", {
            error: "InputValidationError",
            messageID: G.message.id,
            toolName: A.name
        }), yield D2({
            content: [{
                type: "tool_result",
                content: `<tool_use_error>InputValidationError: ${R}</tool_use_error>`,
                is_error: !0,
                tool_use_id: B
            }],
            toolUseResult: `InputValidationError: ${F.error.message}`
        });
        return
    }
    let I = A.inputSchema.safeParse(Q);
    if (!I.success) {
        let R = HmB(A.name, I.error);
        yield D2({
            content: [{
                type: "tool_result",
                content: `<tool_use_error>InputValidationError: ${R}</tool_use_error>`,
                is_error: !0,
                tool_use_id: B
            }],
            toolUseResult: `InputValidationError: ${I.error.message}`
        });
        return
    }
    let Y = await A.validateInput?.(I.data, Z);
    if (Y?.result === !1) {
        X1("tengu_tool_use_error", {
            messageID: G.message.id,
            toolName: A.name,
            errorCode: Y.errorCode
        }), yield D2({
            content: [{
                type: "tool_result",
                content: `<tool_use_error>${Y.message}</tool_use_error>`,
                is_error: !0,
                tool_use_id: B
            }],
            toolUseResult: `Error: ${Y.message}`
        });
        return
    }
    let W = I.data,
        J = !1,
        X, V, C = Date.now();
    try {
        let R = gjB(A.name, B, W, Z.abortController.signal),
            O = [];
        for await (let P of R) {
            if (P.message) yield P.message;
            if (P.blockingErrors) O = P.blockingErrors;
            if (P.preventContinuation) {
                if (J = !0, P.stopReason) X = P.stopReason
            }
            if (P.permissionBehavior !== void 0) {
                n1(`Hook result has permissionBehavior=${P.permissionBehavior}`);
                let j = {
                    type: "hook",
                    hookName: `PreToolUse:${A.name}`,
                    reason: P.hookPermissionDecisionReason
                };
                if (P.permissionBehavior === "allow") V = {
                    behavior: "allow",
                    updatedInput: W,
                    decisionReason: j
                };
                else V = {
                    behavior: P.permissionBehavior,
                    message: `Hook requested permission behavior: ${P.permissionBehavior}`,
                    decisionReason: j,
                    ...P.permissionBehavior === "ask" && {
                        ruleSuggestions: void 0
                    }
                }
            }
        }
        if (Z.abortController.signal.aborted) {
            X1("tengu_pre_tool_hooks_cancelled", {
                toolName: A.name
            }), yield D2({
                content: [ub1(B)],
                toolUseResult: lv
            });
            return
        }
        if (O.length > 0) {
            let P = xjB(A.name, O);
            V = {
                behavior: "deny",
                message: P,
                decisionReason: {
                    type: "hook",
                    hookName: `PreToolUse:${A.name}`,
                    reason: P
                }
            }
        }
    } catch (R) {
        let O = Date.now() - C;
        X1("tengu_pre_tool_hook_error", {
            messageID: G.message.id,
            toolName: A.name,
            isMcp: A.isMcp ?? !1,
            duration: O
        }), yield q3(`Pre-tool hook failed: ${zT0(R)}`, "warning", B), yield D2({
            content: [ub1(B)],
            toolUseResult: lv
        }), Jg1(Z, B);
        return
    }
    let K;
    if (V !== void 0 && V.behavior === "allow") n1(`Hook approved tool use for ${A.name}, bypassing permission check`), K = V;
    else if (V !== void 0 && V.behavior === "deny") n1(`Hook denied tool use for ${A.name}`), K = V;
    else {
        let R = V?.behavior === "ask" ? V : void 0;
        K = await D(A, W, Z, G, B, R)
    }
    if (K.behavior !== "allow") {
        let R = K.message;
        if (J) R = `Execution stopped by PreToolUse hook${X?`: ${X}`:""}`;
        yield D2({
            content: [{
                type: "tool_result",
                content: R,
                is_error: !0,
                tool_use_id: B
            }],
            toolUseResult: `Error: ${R}`
        });
        return
    }
    if (W = K.updatedInput, A.name === "Bash" && W) {
        let R = W;
        if (R.command) {
            if (n1(`Bash tool invoked with command: ${R.command}`), R.description) n1(`Bash tool description: ${R.description}`);
            if (R.timeout) n1(`Bash tool timeout: ${R.timeout}ms`);
            if (R.sandbox !== void 0) n1(`Bash tool sandbox mode: ${R.sandbox}`)
        }
    }
    let H = {};
    if (A.name === "Bash" && "command" in W) {
        let R = W;
        H = {
            bash_command: R.command.trim().split(/\s+/)[0] || "",
            full_command: R.command,
            ...R.timeout !== void 0 && {
                timeout: R.timeout
            },
            ...R.description !== void 0 && {
                description: R.description
            },
            ...R.sandbox !== void 0 && {
                sandbox: R.sandbox
            }
        }
    }
    let z = Date.now(),
        $ = null,
        L = Z.toolDecisions?.get(B);
    try {
        let R = A.call(W, {
            ...Z,
            userModified: K.userModified ?? !1
        }, D, G);
        for await (let O of R) switch (O.type) {
            case "result": {
                let P = Date.now() - z;
                if ($ = O.data, X1("tengu_tool_use_success", {
                        messageID: G.message.id,
                        toolName: A.name,
                        isMcp: A.isMcp ?? !1,
                        durationMs: P
                    }), d$("tool_result", {
                        tool_name: A.name,
                        success: "true",
                        duration_ms: String(P),
                        ...Object.keys(H).length > 0 && {
                            tool_parameters: JSON.stringify(H)
                        },
                        ...L && {
                            decision_source: L.source,
                            decision_type: L.decision
                        }
                    }), yield D2({
                        content: [A.mapToolResultToToolResultBlockParam(O.data, B)],
                        toolUseResult: O.data
                    }), O.supplementalContent && O.supplementalContent.length > 0) yield D2({
                    content: O.supplementalContent,
                    isMeta: !0
                });
                if (J) yield q3(X || "Execution stopped by hook", "warning", B, !0);
                break
            }
            case "progress":
                X1("tengu_tool_use_progress", {
                    messageID: G.message.id,
                    toolName: A.name,
                    isMcp: A.isMcp ?? !1
                }), yield MjB({
                    toolUseID: O.toolUseID,
                    parentToolUseID: B,
                    data: O.data
                });
                break
        }
    } catch (R) {
        let O = Date.now() - z;
        if (!(R instanceof tJ)) {
            if (!(R instanceof KL)) R1(R instanceof Error ? R : new Error(String(R)));
            X1("tengu_tool_use_error", {
                messageID: G.message.id,
                toolName: A.name,
                isMcp: A.isMcp ?? !1
            }), d$("tool_result", {
                tool_name: A.name,
                use_id: B,
                success: "false",
                duration_ms: String(O),
                error: R instanceof Error ? R.message : String(R),
                ...Object.keys(H).length > 0 && {
                    tool_parameters: JSON.stringify(H)
                },
                ...L && {
                    decision_source: L.source,
                    decision_type: L.decision
                }
            })
        }
        let P = zT0(R);
        yield D2({
            content: [{
                type: "tool_result",
                content: P,
                is_error: !0,
                tool_use_id: B
            }],
            toolUseResult: `Error: ${P}`
        });
        return
    } finally {
        if (L) Z.toolDecisions?.delete(B)
    }
    let N = Date.now();
    try {
        let R = ujB(A.name, B, K.updatedInput, $, Z.abortController.signal),
            O = [],
            P = !1,
            j, f = [];
        for await (let k of R) {
            if (k.message) yield k.message;
            if (k.blockingErrors) O = k.blockingErrors;
            if (k.preventContinuation) {
                if (P = !0, k.stopReason) j = k.stopReason
            }
            if (k.additionalContexts && k.additionalContexts.length > 0) f.push(...k.additionalContexts)
        }
        if (Z.abortController.signal.aborted) {
            X1("tengu_post_tool_hooks_cancelled", {
                toolName: A.name
            }), yield q3(`PostToolUse:${A.name} hook execution cancelled`, "warning", B);
            return
        }
        if (P) {
            yield q3(j || "Execution stopped by PostToolUse hook", "warning", B, !0);
            return
        }
        if (O.length > 0) {
            let k = vjB(A.name, O);
            yield D2({
                content: k
            })
        }
        if (f.length > 0) yield D2({
            content: `<post-tool-use-hook>${f.join(`

`)}</post-tool-use-hook>`
        })
    } catch (R) {
        let O = Date.now() - N;
        X1("tengu_post_tool_hook_error", {
            messageID: G.message.id,
            toolName: A.name,
            isMcp: A.isMcp ?? !1,
            duration: O
        }), yield q3(`PostToolUse hook failed: ${zT0(R)}`, "warning", B)
    }
}

function zT0(A) {
    if (A instanceof tJ) return A.message || IU;
    if (!(A instanceof Error)) return String(A);
    let Q = HL8(A).filter(Boolean).join(`
`).trim() || "Error";
    if (Q.length <= 1e4) return Q;
    let Z = 5000,
        D = Q.slice(0, Z),
        G = Q.slice(-Z);
    return `${D}

... [${Q.length-1e4} characters truncated] ...

${G}`
}

function HL8(A) {
    if (A instanceof KL) return [A.interrupted ? IU : "", A.stderr, A.stdout];
    let B = [A.message];
    if ("stderr" in A && typeof A.stderr === "string") B.push(A.stderr);
    if ("stdout" in A && typeof A.stdout === "string") B.push(A.stdout);
    return B
}

function HmB(A, B) {
    let Q = B.errors.filter((I) => I.code === "invalid_type" && I.received === "undefined" && I.message === "Required").map((I) => String(I.path[0])),
        Z = B.errors.filter((I) => I.code === "unrecognized_keys").flatMap((I) => I.keys),
        D = B.errors.filter((I) => I.code === "invalid_type" && ("received" in I) && I.received !== "undefined" && I.message !== "Required").map((I) => {
            let Y = I;
            return {
                param: String(I.path[0]),
                expected: Y.expected,
                received: Y.received
            }
        }),
        G = B.message,
        F = [];
    if (Q.length > 0) {
        let I = Q.map((Y) => `The required parameter \`${Y}\` is missing`);
        F.push(...I)
    }
    if (Z.length > 0) {
        let I = Z.map((Y) => `An unexpected parameter \`${Y}\` was provided`);
        F.push(...I)
    }
    if (D.length > 0) {
        let I = D.map(({
            param: Y,
            expected: W,
            received: J
        }) => `The parameter \`${Y}\` type is expected as \`${W}\` but provided as \`${J}\``);
        F.push(...I)
    }
    if (F.length > 0) G = `${A} failed due to the following ${F.length>1?"issues":"issue"}:
${F.join(`
`)}`;
    return G
}