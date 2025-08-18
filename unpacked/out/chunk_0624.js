/* chunk:624 bytes:[14255347, 14264448) size:9101 source:unpacked-cli.js */
async function OL8(A, B, Q, Z, D, G, F, I) {
    let Y = Kg1(A);
    if (!Y) return X1("tengu_input_slash_missing", {}), {
        messages: [qb(), ...Z, D2({
            content: $S({
                inputString: "Commands are in the form `/command [args]`",
                precedingInputBlocks: B
            })
        })],
        shouldQuery: !1
    };
    let {
        commandName: W,
        args: J,
        isMcp: X
    } = Y, V = X ? "mcp" : !qmB().has(W) ? "custom" : W;
    if (!Hg1(W, D.options.commands)) return X1("tengu_input_prompt", {}), d$("user_prompt", {
        prompt_length: String(A.length),
        prompt: pN0(A)
    }), {
        messages: [D2({
            content: $S({
                inputString: A,
                precedingInputBlocks: B
            })
        }), ...Z],
        shouldQuery: !0
    };
    G(!0);
    let {
        messages: C,
        shouldQuery: K,
        allowedTools: H,
        skipHistory: z,
        maxThinkingTokens: $,
        model: L
    } = await PL8(W, J, F, D, B, Q, I);
    if (C.length === 0) return X1("tengu_input_command", {
        input: V
    }), {
        messages: [],
        shouldQuery: !1,
        skipHistory: z,
        maxThinkingTokens: $,
        model: L
    };
    if (C.length === 2 && C[1].type === "user" && typeof C[1].message.content === "string" && C[1].message.content.startsWith("Unknown command:")) return X1("tengu_input_slash_invalid", {
        input: W
    }), {
        messages: [qb(), ...C],
        shouldQuery: K,
        allowedTools: H,
        maxThinkingTokens: $,
        model: L
    };
    return X1("tengu_input_command", {
        input: V
    }), {
        messages: K ? C : [qb(), ...C],
        shouldQuery: K,
        allowedTools: H,
        maxThinkingTokens: $,
        model: L
    }
}

function TL8(A, B, Q, Z) {
    if (Z(!0), X1("tengu_input_prompt", {}), typeof A === "string") d$("user_prompt", {
        prompt_length: String(A.length),
        prompt: pN0(A)
    });
    if (B.length > 0) return {
        messages: [D2({
            content: [...B, ...typeof A === "string" ? [{
                type: "text",
                text: A
            }] : A]
        }), ...Q],
        shouldQuery: !0
    };
    return {
        messages: [D2({
            content: A
        }), ...Q],
        shouldQuery: !0
    }
}
async function RA1({
    input: A,
    mode: B,
    setIsLoading: Q,
    setToolJSX: Z,
    context: D,
    pastedContents: G,
    ideSelection: F,
    memoryType: I,
    autocheckpoint: Y,
    messages: W,
    setUserInputOnProcessing: J
}) {
    let X = typeof A === "string" ? A : null;
    if (B === "prompt" && X !== null && !X.startsWith("/")) J?.(X);
    let V = await LL8(A, B, Q, Z, D, G, F, I, Y, W);
    if (!V.shouldQuery) return J?.(void 0), V;
    let C = [],
        K = [],
        H = !1,
        z, $ = YF1(A) || "";
    for await (let L of cjB($)) {
        if (L.blockingErrors && L.blockingErrors.length > 0) C.push(...L.blockingErrors);
        if (L.preventContinuation) {
            if (H = !0, L.stopReason) z = L.stopReason
        }
        if (L.additionalContexts && L.additionalContexts.length > 0) K.push(...L.additionalContexts)
    }
    if (C.length > 0) {
        let L = fjB(C);
        return J?.(void 0), {
            messages: [q3(`${L}

Original prompt: ${A}`, "warning")],
            shouldQuery: !1,
            allowedTools: V.allowedTools,
            skipHistory: V.skipHistory,
            maxThinkingTokens: V.maxThinkingTokens
        }
    }
    if (H) {
        let L = z ? `Operation stopped by hook: ${z}` : "Operation stopped by hook";
        return V.messages.push(D2({
            content: L
        })), V.shouldQuery = !1, J?.(void 0), V
    }
    if (K.length > 0) {
        let L = K.join(`

`),
            N = 1e4,
            R;
        if (L.length > 1e4) R = `<user-prompt-submit-hook>${L.substring(0,1e4)}

[output truncated - exceeded 10000 characters]</user-prompt-submit-hook>`;
        else R = `<user-prompt-submit-hook>${L}</user-prompt-submit-hook>`;
        V.messages.push(D2({
            content: R,
            isVisibleInTranscriptOnly: !0
        }))
    }
    return J?.(void 0), V
}
async function PL8(A, B, Q, Z, D, G, F) {
    let I = zg1(A, Z.options.commands);
    try {
        switch (I.type) {
            case "local-jsx":
                return new Promise((Y) => {
                    I.call((W, J) => {
                        if (Q(null), J?.skipMessage) {
                            Y({
                                messages: [],
                                shouldQuery: !1,
                                skipHistory: !0
                            });
                            return
                        }
                        Y({
                            messages: [D2({
                                content: $S({
                                    inputString: wT0(I, B),
                                    precedingInputBlocks: D
                                })
                            }), W ? D2({
                                content: `<local-command-stdout>${W}</local-command-stdout>`
                            }) : D2({
                                content: `<local-command-stdout>${rV}</local-command-stdout>`
                            }), ...qF1(F)],
                            shouldQuery: !1
                        })
                    }, Z, B).then((W) => {
                        if (Z.options.isNonInteractiveSession) {
                            Y({
                                messages: [],
                                shouldQuery: !1,
                                skipHistory: !0
                            });
                            return
                        }
                        Q({
                            jsx: W,
                            shouldHidePromptInput: !0,
                            showSpinner: !1
                        })
                    })
                });
            case "local": {
                let Y = D2({
                    content: $S({
                        inputString: wT0(I, B),
                        precedingInputBlocks: D
                    })
                });
                try {
                    let W = await I.call(B, Z);
                    return {
                        messages: [Y, D2({
                            content: `<local-command-stdout>${W}</local-command-stdout>`
                        }), ...qF1(F)],
                        shouldQuery: !1
                    }
                } catch (W) {
                    return R1(W), {
                        messages: [Y, D2({
                            content: `<local-command-stderr>${String(W)}</local-command-stderr>`
                        })],
                        shouldQuery: !1
                    }
                }
            }
            case "prompt":
                try {
                    return await SL8(I, B, Z, D, G, F)
                } catch (Y) {
                    return {
                        messages: [D2({
                            content: $S({
                                inputString: wT0(I, B),
                                precedingInputBlocks: D
                            })
                        }), D2({
                            content: `<local-command-stderr>${String(Y)}</local-command-stderr>`
                        }), ...qF1(F)],
                        shouldQuery: !1
                    }
                }
        }
    } catch (Y) {
        if (Y instanceof $T) return {
            messages: [D2({
                content: $S({
                    inputString: Y.message,
                    precedingInputBlocks: D
                })
            }), ...qF1(F)],
            shouldQuery: !1
        };
        throw Y
    }
}

function wT0(A, B) {
    return `<command-name>/${A.userFacingName()}</command-name>
          <command-message>${A.userFacingName()}</command-message>
          <command-args>${B}</command-args>`
}
async function SL8(A, B, Q, Z = [], D = [], G) {
    let F = await A.getPromptForCommand(B, Q),
        I = [`<command-message>${A.userFacingName()} is ${A.progressMessage}…</command-message>`, `<command-name>/${A.userFacingName()}</command-name>`, B ? `<command-args>${B}</command-args>` : null].filter(Boolean).join(`
`),
        Y = Oe(A.allowedTools ?? []),
        W = D.length > 0 || Z.length > 0 ? [...D, ...Z, ...F] : F,
        J = $b([D2({
            content: W
        })]),
        X = await XN0(LF1(F.filter((V) => V.type === "text").map((V) => V.text).join(" "), Q, null, [], G, Q.messages));
    return {
        messages: [D2({
            content: I
        }), D2({
            content: W,
            isMeta: !0
        }), ...X, ...Y.length ? [Rd({
            type: "command_permissions",
            allowedTools: Y
        })] : []],
        shouldQuery: !0,
        allowedTools: Y,
        maxThinkingTokens: J > 0 ? J : void 0,
        model: A.useSmallFastModel ? WT() : A.model
    }
}