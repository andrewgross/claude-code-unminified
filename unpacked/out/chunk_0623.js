/* chunk:623 bytes:[14236479, 14255346) size:18867 source:unpacked-cli.js */
var Xg1 = {
        HIGHEST: 31999,
        MIDDLE: 1e4,
        BASIC: 4000,
        NONE: 0
    },
    zL8 = {
        english: {
            HIGHEST: [{
                pattern: "think harder",
                needsWordBoundary: !0
            }, {
                pattern: "think intensely",
                needsWordBoundary: !0
            }, {
                pattern: "think longer",
                needsWordBoundary: !0
            }, {
                pattern: "think really hard",
                needsWordBoundary: !0
            }, {
                pattern: "think super hard",
                needsWordBoundary: !0
            }, {
                pattern: "think very hard",
                needsWordBoundary: !0
            }, {
                pattern: "ultrathink",
                needsWordBoundary: !0
            }],
            MIDDLE: [{
                pattern: "think about it",
                needsWordBoundary: !0
            }, {
                pattern: "think a lot",
                needsWordBoundary: !0
            }, {
                pattern: "think deeply",
                needsWordBoundary: !0
            }, {
                pattern: "think hard",
                needsWordBoundary: !0
            }, {
                pattern: "think more",
                needsWordBoundary: !0
            }, {
                pattern: "megathink",
                needsWordBoundary: !0
            }],
            BASIC: [{
                pattern: "think",
                needsWordBoundary: !0
            }],
            NONE: []
        },
        japanese: {
            HIGHEST: [{
                pattern: "熟考"
            }, {
                pattern: "深く考えて"
            }, {
                pattern: "しっかり考えて"
            }],
            MIDDLE: [{
                pattern: "もっと考えて"
            }, {
                pattern: "たくさん考えて"
            }, {
                pattern: "よく考えて"
            }, {
                pattern: "長考"
            }],
            BASIC: [{
                pattern: "考えて"
            }],
            NONE: []
        },
        chinese: {
            HIGHEST: [{
                pattern: "多想一会"
            }, {
                pattern: "深思"
            }, {
                pattern: "仔细思考"
            }],
            MIDDLE: [{
                pattern: "多想想"
            }, {
                pattern: "好好想"
            }],
            BASIC: [{
                pattern: "想"
            }, {
                pattern: "思考"
            }],
            NONE: []
        },
        spanish: {
            HIGHEST: [{
                pattern: "piensa más",
                needsWordBoundary: !0
            }, {
                pattern: "piensa mucho",
                needsWordBoundary: !0
            }, {
                pattern: "piensa profundamente",
                needsWordBoundary: !0
            }],
            MIDDLE: [{
                pattern: "piensa",
                needsWordBoundary: !0
            }],
            BASIC: [{
                pattern: "pienso",
                needsWordBoundary: !0
            }, {
                pattern: "pensando",
                needsWordBoundary: !0
            }],
            NONE: []
        },
        french: {
            HIGHEST: [{
                pattern: "réfléchis plus",
                needsWordBoundary: !0
            }, {
                pattern: "réfléchis beaucoup",
                needsWordBoundary: !0
            }, {
                pattern: "réfléchis profondément",
                needsWordBoundary: !0
            }],
            MIDDLE: [{
                pattern: "réfléchis",
                needsWordBoundary: !0
            }],
            BASIC: [{
                pattern: "pense",
                needsWordBoundary: !0
            }, {
                pattern: "réfléchir",
                needsWordBoundary: !0
            }],
            NONE: []
        },
        german: {
            HIGHEST: [{
                pattern: "denk mehr",
                needsWordBoundary: !0
            }, {
                pattern: "denk gründlich",
                needsWordBoundary: !0
            }, {
                pattern: "denk tief",
                needsWordBoundary: !0
            }],
            MIDDLE: [{
                pattern: "denk nach",
                needsWordBoundary: !0
            }, {
                pattern: "denk",
                needsWordBoundary: !0
            }],
            BASIC: [{
                pattern: "denke",
                needsWordBoundary: !0
            }, {
                pattern: "nachdenken",
                needsWordBoundary: !0
            }],
            NONE: []
        },
        korean: {
            HIGHEST: [{
                pattern: "더 오래 생각"
            }, {
                pattern: "깊이 생각"
            }, {
                pattern: "심사숙고"
            }, {
                pattern: "곰곰이 생각"
            }],
            MIDDLE: [{
                pattern: "많이 생각"
            }, {
                pattern: "더 생각"
            }, {
                pattern: "잘 생각"
            }],
            BASIC: [{
                pattern: "생각"
            }],
            NONE: []
        },
        italian: {
            HIGHEST: [{
                pattern: "pensa di più",
                needsWordBoundary: !0
            }, {
                pattern: "pensa a lungo",
                needsWordBoundary: !0
            }, {
                pattern: "pensa profondamente",
                needsWordBoundary: !0
            }, {
                pattern: "rifletti a fondo",
                needsWordBoundary: !0
            }],
            MIDDLE: [{
                pattern: "pensa",
                needsWordBoundary: !0
            }, {
                pattern: "pensa molto",
                needsWordBoundary: !0
            }, {
                pattern: "rifletti",
                needsWordBoundary: !0
            }],
            BASIC: [{
                pattern: "penso",
                needsWordBoundary: !0
            }, {
                pattern: "pensare",
                needsWordBoundary: !0
            }, {
                pattern: "pensando",
                needsWordBoundary: !0
            }, {
                pattern: "riflettere",
                needsWordBoundary: !0
            }],
            NONE: []
        }
    };

function $b(A, B) {
    if (process.env.MAX_THINKING_TOKENS) {
        let Q = parseInt(process.env.MAX_THINKING_TOKENS, 10);
        if (Q > 0) X1("tengu_thinking", {
            provider: HN(),
            tokenCount: Q
        });
        return Q
    }
    return Math.max(...A.filter((Q) => Q.type === "user" && !Q.isMeta).map(EL8), B ?? 0)
}

function EL8(A) {
    if (A.isMeta) return 0;
    let B = UL8(A).toLowerCase().replaceAll("i think", "").replaceAll("we think", ""),
        Q = wL8(B);
    if (Q > 0) X1("tengu_thinking", {
        provider: HN(),
        tokenCount: Q
    });
    return Q
}

function UL8(A) {
    if (typeof A.message.content === "string") return A.message.content;
    return A.message.content.map((B) => B.type === "text" ? B.text : "").join("")
}

function wL8(A) {
    let B = [
        ["HIGHEST", Xg1.HIGHEST],
        ["MIDDLE", Xg1.MIDDLE],
        ["BASIC", Xg1.BASIC]
    ];
    for (let [Q, Z] of B)
        if ($L8(A, Q)) return Z;
    return Xg1.NONE
}

function $L8(A, B) {
    for (let Q of Object.values(zL8)) {
        let Z = Q[B];
        for (let {
                pattern: D,
                needsWordBoundary: G
            }
            of Z)
            if ((G ? new RegExp(`\\b${D}\\b`) : new RegExp(D)).test(A)) return !0
    }
    return !1
}
async function EmB(A) {
    return `Launch a new agent to handle complex, multi-step tasks autonomously. 

Available agent types and the tools they have access to:
${(await OS()).map((Z)=>`- ${Z.agentType}: ${Z.whenToUse} (Tools: ${Z.tools.join(", ")})`).join(`
`)}

When using the Task tool, you must specify a subagent_type parameter to select which agent type to use.



When NOT to use the Agent tool:
- If you want to read a specific file path, use the ${x8.name} or ${p$.name} tool instead of the Agent tool, to find the match more quickly
- If you are searching for a specific class definition like "class Foo", use the ${p$.name} tool instead, to find the match more quickly
- If you are searching for code within a specific file or set of 2-3 files, use the ${x8.name} tool instead of the Agent tool, to find the match more quickly
- Other tasks that are not related to the agent descriptions above


Usage notes:
1. Launch multiple agents concurrently whenever possible, to maximize performance; to do that, use a single message with multiple tool uses
2. When the agent is done, it will return a single message back to you. The result returned by the agent is not visible to the user. To show the user the result, you should send a text message back to the user with a concise summary of the result.
3. Each agent invocation is stateless. You will not be able to send additional messages to the agent, nor will the agent be able to communicate with you outside of its final report. Therefore, your prompt should contain a highly detailed task description for the agent to perform autonomously and you should specify exactly what information the agent should return back to you in its final and only message to you.
4. The agent's outputs should generally be trusted
5. Clearly tell the agent whether you expect it to write code or just to do research (search, file reads, web fetches, etc.), since it is not aware of the user's intent
6. If the agent description mentions that it should be used proactively, then you should try your best to use it without the user having to ask for it first. Use your judgement.

Example usage:

<example_agent_descriptions>
"code-reviewer": use this agent after you are done writing a signficant piece of code
"greeting-responder": use this agent when to respond to user greetings with a friendly joke
</example_agent_description>

<example>
user: "Please write a function that checks if a number is prime"
assistant: Sure let me write a function that checks if a number is prime
assistant: First let me use the ${BH.name} tool to write a function that checks if a number is prime
assistant: I'm going to use the ${BH.name} tool to write the following code:
<code>
function isPrime(n) {
  if (n <= 1) return false
  for (let i = 2; i * i <= n; i++) {
    if (n % i === 0) return false
  }
  return true
}
</code>
<commentary>
Since a signficant piece of code was written and the task was completed, now use the code-reviewer agent to review the code
</commentary>
assistant: Now let me use the code-reviewer agent to review the code
assistant: Uses the ${SI1.name} tool to launch the with the code-reviewer agent 
</example>

<example>
user: "Hello"
<commentary>
Since the user is greeting, use the greeting-responder agent to respond with a friendly joke
</commentary>
assistant: "I'm going to use the ${SI1.name} tool to launch the with the greeting-responder agent"
</example>
`
}

function MA1(A, B, Q = "userSettings") {
    let Z = B.filter((W) => {
        if (W.name === k7) return !1;
        if (Q !== "built-in" && ET0.has(W.name)) return !1;
        return !0
    });
    if (A.includes("*")) return {
        hasWildcard: !0,
        validTools: [],
        invalidTools: [],
        resolvedTools: Z
    };
    let D = new Map;
    for (let W of Z) D.set(W.name, W);
    let G = [],
        F = [],
        I = [],
        Y = new Set;
    for (let W of A) {
        let {
            toolName: J
        } = CK(W);
        if (J === k7) {
            G.push(W);
            continue
        }
        let X = D.get(J);
        if (X) {
            if (G.push(W), !Y.has(X)) I.push(X), Y.add(X)
        } else F.push(W)
    }
    return {
        hasWildcard: !1,
        validTools: G,
        invalidTools: F,
        resolvedTools: I
    }
}

function UmB(A, B) {
    if (B) return A ? `agent:${A}` : "agent:default";
    else return "agent:custom"
}

function jI1() {
    let B = GB()?.outputStyle ?? sV;
    if (B === sV) return;
    return B in km ? `outputStyle:${B}` : "outputStyle:custom"
}
import {
    randomUUID as jL8
} from "crypto";
var td = G1(z1(), 1);
var Vg1 = G1(z1(), 1);

function Cg1({
    input: A,
    progress: B
}) {
    return Vg1.default.createElement(v, {
        flexDirection: "column",
        marginTop: 1
    }, Vg1.default.createElement(ob1, {
        addMargin: !1,
        param: {
            text: `<bash-input>${A}</bash-input>`,
            type: "text"
        }
    }), B ? Vg1.default.createElement(Ab1, {
        lastLines: B.output,
        elapsedTimeSeconds: B.elapsedTimeSeconds,
        totalLines: B.totalLines
    }) : VQ.renderToolUseProgressMessage([]))
}
var UT0 = G1(z1(), 1);
import {
    dirname as wmB
} from "path";

function qL8(A) {
    let B = A.trim();
    if (!B) return "";
    if (B.startsWith("- ")) return B;
    if (B.startsWith("-")) return `- ${B.slice(1).trim()}`;
    return `- ${B}`
}
var $mB = Lw1(async function(A, B, Q = "User") {
    let Z = HE(Q);
    if (Q === "Local" && !j1().existsSync(Z)) await dh1(Z);
    B.addNotification?.({
        text: `Saving ${ab1(Q)} memory…`
    }, {
        timeoutMs: 30000
    }), X1("tengu_add_memory_start", {
        memory_type: Q
    }), NL8();
    let D = mh1(Z);
    if (!j1().existsSync(wmB(Z))) try {
        j1().mkdirSync(wmB(Z))
    } catch (G) {
        R1(G instanceof Error ? G : new Error(String(G)))
    }
    try {
        let G = qL8(A),
            F = D ? `
${G}` : G;
        j1().appendFileSync(Z, F);
        let I = D ? `${D}
${G}` : G;
        B.readFileState.set(Z, {
            content: I,
            timestamp: j1().statSync(Z).mtimeMs
        }), X1("tengu_add_memory_success", {}), B.addNotification?.({
            jsx: UT0.createElement(EgB, {
                memoryType: Q,
                memoryPath: Z
            })
        }, {
            timeoutMs: 1e4
        })
    } catch (G) {
        throw X1("tengu_add_memory_failure", {}), B.addNotification?.({
            text: "Failed to save memory: " + (G instanceof Error ? G.message : String(G)),
            color: "error"
        }), G
    }
});

function NL8() {
    let A = H0(),
        B = (A.memoryUsageCount || 0) + 1;
    gA({
        ...A,
        memoryUsageCount: B
    })
}

function Kg1(A) {
    let B = A.trim();
    if (!B.startsWith("/")) return null;
    let Z = B.slice(1).split(" ");
    if (!Z[0]) return null;
    let D = Z[0],
        G = !1,
        F = 1;
    if (Z.length > 1 && Z[1] === "(MCP)") D = D + " (MCP)", G = !0, F = 2;
    let I = Z.slice(F).join(" ");
    return {
        commandName: D,
        args: I,
        isMcp: G
    }
}

function qb() {
    return D2({
        content: "Caveat: The messages below were generated by the user while running local commands. DO NOT respond to these messages or otherwise consider them in your response unless the user explicitly asks you to.",
        isMeta: !0
    })
}
async function LL8(A, B, Q, Z, D, G, F, I, Y, W) {
    let J = null,
        X = [];
    if (typeof A === "string") J = A;
    else if (A.length > 0) {
        let H = A[A.length - 1];
        if (H?.type === "text") J = H.text, X = [...A.slice(0, -1)];
        else X = A
    }
    if (J === null && B !== "prompt") throw new Error(`Mode: ${B} requires a string input.`);
    let V = G ? Object.values(G).filter((H) => H.type === "image").map((H) => ({
            type: "image",
            source: {
                type: "base64",
                media_type: H.mediaType || "image/png",
                data: H.content
            }
        })) : [],
        K = J !== null && (B !== "prompt" || !J.startsWith("/")) ? await XN0(LF1(J, D, F ?? null, [], Y, W)) : [];
    if (J !== null && B === "bash") return await ML8(J, X, K, D, Z, Q);
    if (J !== null && B === "memorySelect") return RL8(J, X, K, D, I);
    if (J !== null && J.startsWith("/")) return await OL8(J, X, V, K, D, Q, Z, Y);
    return TL8(A, V, K, Q)
}
async function ML8(A, B, Q, Z, D, G) {
    X1("tengu_input_bash", {}), G(!0);
    let F = D2({
        content: $S({
            inputString: `<bash-input>${A}</bash-input>`,
            precedingInputBlocks: B
        })
    });
    D({
        jsx: td.createElement(Cg1, {
            input: A,
            progress: null
        }),
        shouldHidePromptInput: !1
    });
    try {
        let I = {
                ...Z,
                setToolJSX: () => {}
            },
            Y = VQ.call({
                command: A
            }, I),
            W;
        D({
            jsx: td.createElement(Cg1, {
                input: A,
                progress: null
            }),
            shouldHidePromptInput: !1,
            showSpinner: !1
        });
        for await (let X of Y) if (X.type === "progress") D({
            jsx: td.createElement(Cg1, {
                input: A,
                progress: X.data
            }),
            shouldHidePromptInput: !1,
            showSpinner: !1
        });
        else if (X.type === "result") W = X.data;
        if (!W) throw new Error("No result received from bash command");
        let J = W.stderr;
        if (Lv1(Z.getToolPermissionContext())) J = Nv1(J);
        return {
            messages: [qb(), F, ...Q, D2({
                content: `<bash-stdout>${W.stdout}</bash-stdout><bash-stderr>${J}</bash-stderr>`
            })],
            shouldQuery: !1
        }
    } catch (I) {
        if (I instanceof KL) {
            if (I.interrupted) return {
                messages: [qb(), F, D2({
                    content: E01
                }), ...Q],
                shouldQuery: !1
            };
            return {
                messages: [qb(), F, ...Q, D2({
                    content: `<bash-stdout>${I.stdout}</bash-stdout><bash-stderr>${I.stderr}</bash-stderr>`
                })],
                shouldQuery: !1
            }
        }
        return {
            messages: [qb(), F, ...Q, D2({
                content: `<bash-stderr>Command failed: ${I instanceof Error?I.message:String(I)}</bash-stderr>`
            })],
            shouldQuery: !1
        }
    } finally {
        D(null)
    }
}

function RL8(A, B, Q, Z, D) {
    X1("tengu_input_memory", {});
    let G = D2({
        content: $S({
            inputString: `<user-memory-input>${A}</user-memory-input>`,
            precedingInputBlocks: B
        })
    });
    return $mB(A, Z, D), {
        messages: [qb(), G, ...Q, D2({
            content: rV
        })],
        shouldQuery: !1
    }
}