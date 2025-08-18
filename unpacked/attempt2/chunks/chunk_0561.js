/* chunk:561 bytes:[13083520, 13092868) size:9348 source:unpacked-cli.js */
async function RMB(A, B, Q) {
    let D = (await jI({
        systemPrompt: [`Extract any file paths that this command reads or modifies. For commands like "git diff" and "cat", include the paths of files being shown. Use paths verbatim -- don't add any slashes or try to resolve them. Do not try to infer paths that were not explicitly listed in the command output.

IMPORTANT: Commands that do not display the contents of the files should not return any filepaths. For eg. "ls", pwd", "find". Even more complicated commands that don't display the contents should not be considered: eg "find . -type f -exec ls -la {} + | sort -k5 -nr | head -5"

First, determine if the command displays the contents of the files. If it does, then <is_displaying_contents> tag should be true. If it does not, then <is_displaying_contents> tag should be false.

Format your response as:
<is_displaying_contents>
true
</is_displaying_contents>

<filepaths>
path/to/file1
path/to/file2
</filepaths>

If no files are read or modified, return empty filepaths tags:
<filepaths>
</filepaths>

Do not include any other text in your response.`],
        userPrompt: `Command: ${A}
Output: ${B}`,
        enablePromptCaching: !0,
        isNonInteractiveSession: Q,
        promptCategory: "command_paths"
    })).message.content.filter((G) => G.type === "text").map((G) => G.text).join("");
    return l4(D, "filepaths")?.trim().split(`
`).filter(Boolean) || []
}

function OMB() {
    return `You are analyzing output from a bash command to determine if it should be summarized.

Your task is to:
1. Determine if the output contains mostly repetitive logs, verbose build output, or other "log spew"
2. If it does, extract only the relevant information (errors, test results, completion status, etc.)
3. Consider the conversation context - if the user specifically asked to see detailed output, preserve it

You MUST output your response using XML tags in the following format:
<should_summarize>true/false</should_summarize>
<reason>reason for why you decided to summarize or not summarize the output</reason>
<summary>markdown summary as described below (only if should_summarize is true)</summary>

If should_summarize is true, include all three tags with a comprehensive summary.
If should_summarize is false, include only the first two tags and omit the summary tag.

Summary: The summary should be extremely comprehensive and detailed in markdown format. Especially consider the converstion context to determine what to focus on.
Freely copy parts of the output verbatim into the summary if you think it is relevant to the conversation context or what the user is asking for.
It's fine if the summary is verbose. The summary should contain the following sections: (Make sure to include all of these sections)
1. Overview: An overview of the output including the most interesting information summarized.
2. Detailed summary: An extremely detailed summary of the output.
3. Errors: List of relevant errors that were encountered. Include snippets of the output wherever possible.
4. Verbatim output: Copy any parts of the provided output verbatim that are relevant to the conversation context. This is critical. Make sure to include ATLEAST 3 snippets of the output verbatim. 
5. DO NOT provide a recommendation. Just summarize the facts.

Reason: If providing a reason, it should comprehensively explain why you decided not to summarize the output.

Examples of when to summarize:
- Verbose build logs with only the final status being important. Eg. if we are running npm run build to test if our code changes build.
- Test output where only the pass/fail results matter
- Repetitive debug logs with a few key errors

Examples of when NOT to summarize:
- User explicitly asked to see the full output
- Output contains unique, non-repetitive information
- Error messages that need full stack traces for debugging


CRITICAL: You MUST start your response with the <should_summarize> tag as the very first thing. Do not include any other text before the first tag. The summary tag can contain markdown format, but ensure all XML tags are properly closed.`
}

function TMB(A, B, Q) {
    return `Command executed: \`${A}\`

Recent conversation context:
${B||"No recent conversation context"}

Bash output to analyze:
${Q}

Should this output be summarized? If yes, provide a summary focusing on the most relevant information.`
}
var U68 = 5000,
    w68 = 10,
    $68 = "bash-outputs";

function q68(A) {
    let B = new Date().toISOString().replace(/[:.]/g, "-"),
        Q = E68("sha256").update(A).digest("hex").slice(0, 8);
    return `${B}-${Q}.txt`
}

function N68(A, B, Q) {
    return `COMMAND: ${A}

STDOUT:
${B}

STDERR:
${Q}`
}

function L68(A, B, Q) {
    let Z = j1(),
        D = CB(),
        G = PMB(CL(_9()), $68, D),
        F = PMB(G, q68(Q));
    if (!Z12(G)) return R1(new Error(`Failed to create directory for bash output: ${G}`)), "";
    try {
        return Z.writeFileSync(F, N68(Q, A, B), {
            encoding: "utf-8",
            flush: !0
        }), F
    } catch (I) {
        return R1(I instanceof Error ? I : new Error(String(I))), ""
    }
}

function M68(A) {
    let B = A.slice(-w68),
        Q = AW(B);
    return JSON.stringify(Q)
}
async function SMB(A, B, Q, Z = []) {
    let D = [A, B].filter(Boolean).join(`
`),
        {
            isImage: G
        } = iM(KS(A));
    if (G) return {
        shouldSummarize: !1,
        reason: "image_data"
    };
    if (D.length < U68) return {
        shouldSummarize: !1,
        reason: "below_threshold"
    };
    try {
        let F = M68(Z),
            I = OMB(),
            Y = TMB(Q, F, D),
            W = Date.now(),
            J = await jI({
                systemPrompt: [I],
                userPrompt: Y,
                enablePromptCaching: !0,
                isNonInteractiveSession: !1,
                promptCategory: "bash_output_summarization"
            }),
            X = Date.now() - W,
            V = J.message.content.filter(($) => $.type === "text").map(($) => $.text).join(""),
            C = l4(V, "should_summarize"),
            K = l4(V, "reason"),
            H = l4(V, "summary")?.trim() || "";
        if (!C) return {
            shouldSummarize: !1,
            reason: "parse_error",
            queryDurationMs: X
        };
        if (C === "true" && H) {
            let $ = L68(A, B, Q);
            return {
                shouldSummarize: !0,
                summary: R68(H, $),
                rawOutputPath: $,
                queryDurationMs: X,
                ...K ? {
                    modelReason: K
                } : {}
            }
        }
        return {
            shouldSummarize: !1,
            reason: "model_decided_user_needs_full_output",
            queryDurationMs: X,
            ...K ? {
                modelReason: K
            } : {}
        }
    } catch (F) {
        return R1(F instanceof Error ? F : new Error(String(F))), {
            shouldSummarize: !1,
            reason: "summarization_error"
        }
    }
}

function R68(A, B) {
    let Z = B ? `

Note: The complete bash output is available at ${B}. You can use Read or Grep tools to search for specific information not included in this summary.` : "";
    return `[Summarized output]
${A}${Z}`
}
var $q0 = G1(gw(), 1);
var O68 = Object.defineProperty,
    i0 = (A, B) => O68(A, "name", {
        value: B,
        configurable: !0
    }),
    jMB = 2,
    C9 = 4,
    Gq0 = 4 * C9,
    ZC = 5 * C9,
    nM = 2 * C9,
    CG1 = 2 * C9 + 2 * nM,
    qv = {
        row: 0,
        column: 0
    },
    Nv = Symbol("INTERNAL");

function i11(A) {
    if (A !== Nv) throw new Error("Illegal constructor")
}
i0(i11, "assertInternal");

function VG1(A) {
    return !!A && typeof A.row === "number" && typeof A.column === "number"
}
i0(VG1, "isPoint");

function yMB(A) {
    s1 = A
}
i0(yMB, "setModule");
var s1, T68 = class {
    static {
        i0(this, "LookaheadIterator")
    } [0] = 0;
    language;
    constructor(A, B, Q) {
        i11(A), this[0] = B, this.language = Q
    }
    get currentTypeId() {
        return s1._ts_lookahead_iterator_current_symbol(this[0])
    }
    get currentType() {
        return this.language.types[this.currentTypeId] || "ERROR"
    }
    delete() {
        s1._ts_lookahead_iterator_delete(this[0]), this[0] = 0
    }
    reset(A, B) {
        if (s1._ts_lookahead_iterator_reset(this[0], A[0], B)) return this.language = A, !0;
        return !1
    }
    resetState(A) {
        return Boolean(s1._ts_lookahead_iterator_reset_state(this[0], A))
    } [Symbol.iterator]() {
        return {
            next: i0(() => {
                if (s1._ts_lookahead_iterator_next(this[0])) return {
                    done: !1,
                    value: this.currentType
                };
                return {
                    done: !0,
                    value: ""
                }
            }, "next")
        }
    }
};

function Wq0(A, B, Q, Z) {
    let D = Q - B,
        G = A.textCallback(B, Z);
    if (G) {
        B += G.length;
        while (B < Q) {
            let F = A.textCallback(B, Z);
            if (F && F.length > 0) B += F.length, G += F;
            else break
        }
        if (B > Q) G = G.slice(0, D)
    }
    return G ?? ""
}
i0(Wq0, "getText");