/* chunk:627 bytes:[14302489, 14317972) size:15483 source:unpacked-cli.js */
function lL8({
    width: A = "auto",
    dividerChar: B,
    dividerColor: Q = "secondaryText",
    boxProps: Z
}) {
    return Ac.default.createElement(v, {
        width: A,
        borderStyle: {
            topLeft: "",
            top: "",
            topRight: "",
            right: "",
            bottomRight: "",
            bottom: B || "─",
            bottomLeft: "",
            left: ""
        },
        borderColor: Q,
        flexGrow: 1,
        borderBottom: !0,
        borderTop: !1,
        borderLeft: !1,
        borderRight: !1,
        ...Z
    })
}

function pL8({
    title: A,
    width: B = "auto",
    padding: Q = 0,
    titlePadding: Z = 1,
    titleColor: D = "text",
    dividerChar: G = "─",
    dividerColor: F = "secondaryText",
    boxProps: I
}) {
    let Y = Ac.default.createElement(lL8, {
        dividerChar: G,
        dividerColor: F,
        boxProps: I
    });
    if (!A) return Ac.default.createElement(v, {
        paddingLeft: Q,
        paddingRight: Q
    }, Y);
    return Ac.default.createElement(v, {
        width: B,
        paddingLeft: Q,
        paddingRight: Q,
        gap: Z
    }, Y, Ac.default.createElement(v, null, Ac.default.createElement(T, {
        color: D
    }, A)), Y)
}
var Bc = pL8;
var Zq = G1(z1(), 1);

function JF({
    title: A,
    titleColor: B = "text",
    borderColor: Q = "suggestion",
    children: Z,
    subtitle: D
}) {
    return Zq.createElement(v, {
        borderStyle: "round",
        borderColor: Q,
        flexDirection: "column"
    }, Zq.createElement(v, {
        flexDirection: "column",
        paddingX: 1
    }, Zq.createElement(T, {
        bold: !0,
        color: B
    }, A), D && Zq.createElement(T, {
        color: "secondaryText"
    }, D)), Zq.createElement(v, {
        paddingX: 1,
        flexDirection: "column"
    }, Z))
}

function vmB({
    source: A,
    agents: B,
    onBack: Q,
    onSelect: Z,
    onCreateNew: D,
    changes: G
}) {
    let [F, I] = tA.useState(null), [Y, W] = tA.useState(!0), J = (L) => {
        return {
            isOverridden: !!L.overriddenBy,
            overriddenBy: L.overriddenBy || null
        }
    }, X = () => {
        return tA.createElement(v, null, tA.createElement(T, {
            color: Y ? "suggestion" : void 0
        }, Y ? `${s0.pointer} ` : "  "), tA.createElement(T, {
            color: Y ? "suggestion" : void 0
        }, "Create new agent"))
    }, V = (L) => {
        let N = L.source === "built-in",
            R = !N && !Y && F?.agentType === L.agentType && F?.source === L.source,
            {
                isOverridden: O,
                overriddenBy: P
            } = J(L),
            j = N || O,
            f = !N && R ? "suggestion" : void 0,
            k = L.model || H20;
        return tA.createElement(v, {
            key: `${L.agentType}-${L.source}`
        }, tA.createElement(T, {
            dimColor: j && !R,
            color: f
        }, N ? "" : R ? `${s0.pointer} ` : "  "), tA.createElement(T, {
            dimColor: j && !R,
            color: f
        }, L.agentType), k && tA.createElement(T, {
            dimColor: !0,
            color: f
        }, " · ", k === "inherit" ? "inherit" : k), P && tA.createElement(T, {
            dimColor: !R,
            color: R ? "warning" : void 0
        }, " ", s0.warning, " overridden by ", P))
    }, C = tA.useMemo(() => {
        let L = B.filter((N) => N.source !== "built-in");
        if (A === "all") return [...L.filter((N) => N.source === "userSettings"), ...L.filter((N) => N.source === "projectSettings"), ...L.filter((N) => N.source === "policySettings")];
        return L
    }, [B, A]);
    tA.useEffect(() => {
        if (!F && !Y && C.length > 0)
            if (D) W(!0);
            else I(C[0] || null)
    }, [C, F, Y, D]), DA((L, N) => {
        if (N.escape) {
            Q();
            return
        }
        if (N.return) {
            if (Y && D) D();
            else if (F) Z(F);
            return
        }
        if (!N.upArrow && !N.downArrow) return;
        let R = !!D,
            O = C.length + (R ? 1 : 0);
        if (O === 0) return;
        let P = 0;
        if (!Y && F) {
            let f = C.findIndex((k) => k.agentType === F.agentType && k.source === F.source);
            if (f >= 0) P = R ? f + 1 : f
        }
        let j = N.upArrow ? Math.max(0, P - 1) : Math.min(O - 1, P + 1);
        if (R && j === 0) W(!0), I(null);
        else {
            let f = R ? j - 1 : j,
                k = C[f];
            if (k) W(!1), I(k)
        }
    });
    let K = (L = "Built-in (always available):") => {
            let N = B.filter((R) => R.source === "built-in");
            return tA.createElement(v, {
                flexDirection: "column",
                marginBottom: 1,
                paddingLeft: 2
            }, tA.createElement(T, {
                bold: !0,
                color: "secondaryText"
            }, L), N.map(V))
        },
        H = (L, N) => {
            if (!N.length) return null;
            let R = N[0]?.baseDir;
            return tA.createElement(v, {
                flexDirection: "column",
                marginBottom: 1
            }, tA.createElement(v, {
                paddingLeft: 2
            }, tA.createElement(T, {
                bold: !0,
                color: "secondaryText"
            }, L), R && tA.createElement(T, {
                color: "secondaryText"
            }, " (", R, ")")), N.map((O) => V(O)))
        },
        z = Zb(A);
    if (!B.length || A !== "built-in" && !B.some((L) => L.source !== "built-in")) return tA.createElement(JF, {
        title: z,
        subtitle: "No agents found"
    }, D && tA.createElement(v, {
        marginY: 1
    }, X()), tA.createElement(T, {
        dimColor: !0
    }, "No agents found. Create specialized subagents that Claude can delegate to."), tA.createElement(T, {
        dimColor: !0
    }, "Each subagent has its own context window, custom system prompt, and specific tools."), tA.createElement(T, {
        dimColor: !0
    }, "Try creating: Code Reviewer, Code Simplifier, Security Reviewer, Tech Lead, or UX Reviewer."), A !== "built-in" && B.some((L) => L.source === "built-in") && tA.createElement(tA.Fragment, null, tA.createElement(v, {
        marginTop: 1
    }, tA.createElement(Bc, null)), K()));
    return tA.createElement(JF, {
        title: z,
        subtitle: `${B.filter((L)=>!L.overriddenBy).length} agents`
    }, G && G.length > 0 && tA.createElement(v, {
        marginTop: 1
    }, tA.createElement(T, {
        dimColor: !0
    }, G[G.length - 1])), tA.createElement(v, {
        flexDirection: "column",
        marginTop: 1
    }, D && tA.createElement(v, {
        marginBottom: 1
    }, X()), A === "all" ? tA.createElement(tA.Fragment, null, H("User agents", B.filter((L) => L.source === "userSettings")), H("Project agents", B.filter((L) => L.source === "projectSettings")), H("Managed agents", B.filter((L) => L.source === "policySettings")), H("Plugin agents", B.filter((L) => L.source === "plugin")), (() => {
        let L = B.filter((N) => N.source === "built-in");
        return L.length > 0 ? tA.createElement(v, {
            flexDirection: "column",
            marginBottom: 1,
            paddingLeft: 2
        }, tA.createElement(T, {
            color: "secondaryText"
        }, tA.createElement(T, {
            bold: !0
        }, "Built-in agents"), " (always available)"), L.map(V)) : null
    })()) : A === "built-in" ? tA.createElement(tA.Fragment, null, tA.createElement(T, {
        dimColor: !0,
        italic: !0
    }, "Built-in agents are provided by default and cannot be modified."), tA.createElement(v, {
        marginTop: 1,
        flexDirection: "column"
    }, B.map((L) => V(L)))) : tA.createElement(tA.Fragment, null, B.filter((L) => L.source !== "built-in").map((L) => V(L)), B.some((L) => L.source === "built-in") && tA.createElement(tA.Fragment, null, tA.createElement(v, {
        marginTop: 1
    }, tA.createElement(Bc, null)), K()))))
}
var g0 = G1(z1(), 1),
    pF = G1(z1(), 1);
var iL8 = `You are an elite AI agent architect specializing in crafting high-performance agent configurations. Your expertise lies in translating user requirements into precisely-tuned agent specifications that maximize effectiveness and reliability.

**Important Context**: You may have access to project-specific instructions from CLAUDE.md files and other context that may include coding standards, project structure, and custom requirements. Consider this context when creating agents to ensure they align with the project's established patterns and practices.

When a user describes what they want an agent to do, you will:

1. **Extract Core Intent**: Identify the fundamental purpose, key responsibilities, and success criteria for the agent. Look for both explicit requirements and implicit needs. Consider any project-specific context from CLAUDE.md files. For agents that are meant to review code, you should assume that the user is asking to review recently written code and not the whole codebase, unless the user has explicitly instructed you otherwise.

2. **Design Expert Persona**: Create a compelling expert identity that embodies deep domain knowledge relevant to the task. The persona should inspire confidence and guide the agent's decision-making approach.

3. **Architect Comprehensive Instructions**: Develop a system prompt that:
   - Establishes clear behavioral boundaries and operational parameters
   - Provides specific methodologies and best practices for task execution
   - Anticipates edge cases and provides guidance for handling them
   - Incorporates any specific requirements or preferences mentioned by the user
   - Defines output format expectations when relevant
   - Aligns with project-specific coding standards and patterns from CLAUDE.md

4. **Optimize for Performance**: Include:
   - Decision-making frameworks appropriate to the domain
   - Quality control mechanisms and self-verification steps
   - Efficient workflow patterns
   - Clear escalation or fallback strategies

5. **Create Identifier**: Design a concise, descriptive identifier that:
   - Uses lowercase letters, numbers, and hyphens only
   - Is typically 2-4 words joined by hyphens
   - Clearly indicates the agent's primary function
   - Is memorable and easy to type
   - Avoids generic terms like "helper" or "assistant"

6 **Example agent descriptions**:
  - in the 'whenToUse' field of the JSON object, you should include examples of when this agent should be used.
  - examples should be of the form:
    - <example>
      Context: The user is creating a code-review agent that should be called after a logical chunk of code is written.
      user: "Please write a function that checks if a number is prime"
      assistant: "Here is the relevant function: "
      <function call omitted for brevity only for this example>
      <commentary>
      Since the user is greeting, use the ${k7} tool to launch the greeting-responder agent to respond with a friendly joke. 
      </commentary>
      assistant: "Now let me use the code-reviewer agent to review the code"
    </example>
    - <example>
      Context: User is creating an agent to respond to the word "hello" with a friendly jok.
      user: "Hello"
      assistant: "I'm going to use the ${k7} tool to launch the greeting-responder agent to respond with a friendly joke"
      <commentary>
      Since the user is greeting, use the greeting-responder agent to respond with a friendly joke. 
      </commentary>
    </example>
  - If the user mentioned or implied that the agent should be used proactively, you should include examples of this.
- NOTE: Ensure that in the examples, you are making the assistant use the Agent tool and not simply respond directly to the task.

Your output must be a valid JSON object with exactly these fields:
{
  "identifier": "A unique, descriptive identifier using lowercase letters, numbers, and hyphens (e.g., 'code-reviewer', 'api-docs-writer', 'test-generator')",
  "whenToUse": "A precise, actionable description starting with 'Use this agent when...' that clearly defines the triggering conditions and use cases. Ensure you include examples as described above.",
  "systemPrompt": "The complete system prompt that will govern the agent's behavior, written in second person ('You are...', 'You will...') and structured for maximum clarity and effectiveness"
}

Key principles for your system prompts:
- Be specific rather than generic - avoid vague instructions
- Include concrete examples when they would clarify behavior
- Balance comprehensiveness with clarity - every instruction should add value
- Ensure the agent has enough context to handle variations of the core task
- Make the agent proactive in seeking clarification when needed
- Build in quality assurance and self-correction mechanisms

Remember: The agents you create should be autonomous experts capable of handling their designated tasks with minimal additional guidance. Your system prompts are their complete operational manual.
`;
async function bmB(A, B, Q) {
    let Z = Q.length > 0 ? `

IMPORTANT: The following identifiers already exist and must NOT be used: ${Q.join(", ")}` : "",
        D = `Create an agent configuration based on this request: "${A}".${Z}
  Return ONLY the JSON object, no other text.`,
        G = D2({
            content: D
        }),
        F = await PX(),
        I = iG1([G], F),
        J = (await Rb1(AW(I), [iL8], 0, [], h4().signal, {
            getToolPermissionContext: () => hV(),
            model: B,
            prependCLISysprompt: !0,
            toolChoice: void 0,
            isNonInteractiveSession: !1,
            temperature: 0.3
        })).message.content.filter((V) => V.type === "text").map((V) => V.text).join(`
`),
        X;
    try {
        X = JSON.parse(J.trim())
    } catch {
        let V = J.match(/\{[\s\S]*\}/);
        if (!V) throw new Error("No JSON object found in response");
        X = JSON.parse(V[0])
    }
    if (!X.identifier || !X.whenToUse || !X.systemPrompt) throw new Error("Invalid agent configuration generated");
    return X1("tengu_agent_definition_generated", {
        agent_identifier: X.identifier
    }), {
        identifier: X.identifier,
        whenToUse: X.whenToUse,
        systemPrompt: X.systemPrompt
    }
}
var XF = G1(z1(), 1);
var fmB = () => ({
    READ_ONLY: {
        name: "Read-only tools",
        toolNames: new Set([p$.name, jS.name, GU.name, tK.name, x8.name, vI.name, hF.name, JH.name, Eg1.name, Ug1.name, C01.name, K01.name])
    },
    EDIT: {
        name: "Edit tools",
        toolNames: new Set([FF.name, m$.name, BH.name, QR.name])
    },
    EXECUTION: {
        name: "Execution tools",
        toolNames: new Set([VQ.name])
    },
    MCP: {
        name: "MCP tools",
        toolNames: new Set,
        isMcp: !0
    },
    OTHER: {
        name: "Other tools",
        toolNames: new Set
    }
});

function nL8(A) {
    let B = new Map;
    return A.forEach((Q) => {
        if (V40(Q)) {
            let Z = oy(Q.name);
            if (Z?.serverName) {
                let D = B.get(Z.serverName) || [];
                D.push(Q), B.set(Z.serverName, D)
            }
        }
    }), Array.from(B.entries()).map(([Q, Z]) => ({
        serverName: Q,
        tools: Z
    })).sort((Q, Z) => Q.serverName.localeCompare(Z.serverName))
}