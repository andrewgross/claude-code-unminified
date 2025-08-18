/* chunk:590 bytes:[13631054, 13647260) size:16206 source:unpacked-cli.js */
function UkB(A) {
    if (!A || A.trim() === "") return `Your task is to create a detailed summary of the conversation so far, paying close attention to the user's explicit requests and your previous actions.
This summary should be thorough in capturing technical details, code patterns, and architectural decisions that would be essential for continuing development work without losing context.

Before providing your final summary, wrap your analysis in <analysis> tags to organize your thoughts and ensure you've covered all necessary points. In your analysis process:

1. Chronologically analyze each message and section of the conversation. For each section thoroughly identify:
   - The user's explicit requests and intents
   - Your approach to addressing the user's requests
   - Key decisions, technical concepts and code patterns
   - Specific details like:
     - file names
     - full code snippets
     - function signatures
     - file edits
  - Errors that you ran into and how you fixed them
  - Pay special attention to specific user feedback that you received, especially if the user told you to do something differently.
2. Double-check for technical accuracy and completeness, addressing each required element thoroughly.

Your summary should include the following sections:

1. Primary Request and Intent: Capture all of the user's explicit requests and intents in detail
2. Key Technical Concepts: List all important technical concepts, technologies, and frameworks discussed.
3. Files and Code Sections: Enumerate specific files and code sections examined, modified, or created. Pay special attention to the most recent messages and include full code snippets where applicable and include a summary of why this file read or edit is important.
4. Errors and fixes: List all errors that you ran into, and how you fixed them. Pay special attention to specific user feedback that you received, especially if the user told you to do something differently.
5. Problem Solving: Document problems solved and any ongoing troubleshooting efforts.
6. All user messages: List ALL user messages that are not tool results. These are critical for understanding the users' feedback and changing intent.
6. Pending Tasks: Outline any pending tasks that you have explicitly been asked to work on.
7. Current Work: Describe in detail precisely what was being worked on immediately before this summary request, paying special attention to the most recent messages from both user and assistant. Include file names and code snippets where applicable.
8. Optional Next Step: List the next step that you will take that is related to the most recent work you were doing. IMPORTANT: ensure that this step is DIRECTLY in line with the user's explicit requests, and the task you were working on immediately before this summary request. If your last task was concluded, then only list next steps if they are explicitly in line with the users request. Do not start on tangential requests without confirming with the user first.
                       If there is a next step, include direct quotes from the most recent conversation showing exactly what task you were working on and where you left off. This should be verbatim to ensure there's no drift in task interpretation.

Here's an example of how your output should be structured:

<example>
<analysis>
[Your thought process, ensuring all points are covered thoroughly and accurately]
</analysis>

<summary>
1. Primary Request and Intent:
   [Detailed description]

2. Key Technical Concepts:
   - [Concept 1]
   - [Concept 2]
   - [...]

3. Files and Code Sections:
   - [File Name 1]
      - [Summary of why this file is important]
      - [Summary of the changes made to this file, if any]
      - [Important Code Snippet]
   - [File Name 2]
      - [Important Code Snippet]
   - [...]

4. Errors and fixes:
    - [Detailed description of error 1]:
      - [How you fixed the error]
      - [User feedback on the error if any]
    - [...]

5. Problem Solving:
   [Description of solved problems and ongoing troubleshooting]

6. All user messages: 
    - [Detailed non tool use user message]
    - [...]

7. Pending Tasks:
   - [Task 1]
   - [Task 2]
   - [...]

8. Current Work:
   [Precise description of current work]

9. Optional Next Step:
   [Optional Next step to take]

</summary>
</example>

Please provide your summary based on the conversation so far, following this structure and ensuring precision and thoroughness in your response. 

There may be additional summarization instructions provided in the included context. If so, remember to follow these instructions when creating the above summary. Examples of instructions include:
<example>
## Compact Instructions
When summarizing the conversation focus on typescript code changes and also remember the mistakes you made and how you fixed them.
</example>

<example>
# Summary instructions
When you are using compact - please focus on test output and code changes. Include file reads verbatim.
</example>
`;
    return `Your task is to create a detailed summary of the conversation so far, paying close attention to the user's explicit requests and your previous actions.
This summary should be thorough in capturing technical details, code patterns, and architectural decisions that would be essential for continuing development work without losing context.

Before providing your final summary, wrap your analysis in <analysis> tags to organize your thoughts and ensure you've covered all necessary points. In your analysis process:

1. Chronologically analyze each message and section of the conversation. For each section thoroughly identify:
   - The user's explicit requests and intents
   - Your approach to addressing the user's requests
   - Key decisions, technical concepts and code patterns
   - Specific details like:
     - file names
     - full code snippets
     - function signatures
     - file edits
  - Errors that you ran into and how you fixed them
  - Pay special attention to specific user feedback that you received, especially if the user told you to do something differently.
2. Double-check for technical accuracy and completeness, addressing each required element thoroughly.

Your summary should include the following sections:

1. Primary Request and Intent: Capture all of the user's explicit requests and intents in detail
2. Key Technical Concepts: List all important technical concepts, technologies, and frameworks discussed.
3. Files and Code Sections: Enumerate specific files and code sections examined, modified, or created. Pay special attention to the most recent messages and include full code snippets where applicable and include a summary of why this file read or edit is important.
4. Errors and fixes: List all errors that you ran into, and how you fixed them. Pay special attention to specific user feedback that you received, especially if the user told you to do something differently.
5. Problem Solving: Document problems solved and any ongoing troubleshooting efforts.
6. All user messages: List ALL user messages that are not tool results. These are critical for understanding the users' feedback and changing intent.
6. Pending Tasks: Outline any pending tasks that you have explicitly been asked to work on.
7. Current Work: Describe in detail precisely what was being worked on immediately before this summary request, paying special attention to the most recent messages from both user and assistant. Include file names and code snippets where applicable.
8. Optional Next Step: List the next step that you will take that is related to the most recent work you were doing. IMPORTANT: ensure that this step is DIRECTLY in line with the user's explicit requests, and the task you were working on immediately before this summary request. If your last task was concluded, then only list next steps if they are explicitly in line with the users request. Do not start on tangential requests without confirming with the user first.
                       If there is a next step, include direct quotes from the most recent conversation showing exactly what task you were working on and where you left off. This should be verbatim to ensure there's no drift in task interpretation.

Here's an example of how your output should be structured:

<example>
<analysis>
[Your thought process, ensuring all points are covered thoroughly and accurately]
</analysis>

<summary>
1. Primary Request and Intent:
   [Detailed description]

2. Key Technical Concepts:
   - [Concept 1]
   - [Concept 2]
   - [...]

3. Files and Code Sections:
   - [File Name 1]
      - [Summary of why this file is important]
      - [Summary of the changes made to this file, if any]
      - [Important Code Snippet]
   - [File Name 2]
      - [Important Code Snippet]
   - [...]

4. Errors and fixes:
    - [Detailed description of error 1]:
      - [How you fixed the error]
      - [User feedback on the error if any]
    - [...]

5. Problem Solving:
   [Description of solved problems and ongoing troubleshooting]

6. All user messages: 
    - [Detailed non tool use user message]
    - [...]

7. Pending Tasks:
   - [Task 1]
   - [Task 2]
   - [...]

8. Current Work:
   [Precise description of current work]

9. Optional Next Step:
   [Optional Next step to take]

</summary>
</example>

Please provide your summary based on the conversation so far, following this structure and ensuring precision and thoroughness in your response. 

There may be additional summarization instructions provided in the included context. If so, remember to follow these instructions when creating the above summary. Examples of instructions include:
<example>
## Compact Instructions
When summarizing the conversation focus on typescript code changes and also remember the mistakes you made and how you fixed them.
</example>

<example>
# Summary instructions
When you are using compact - please focus on test output and code changes. Include file reads verbatim.
</example>


Additional Instructions:
${A}`
}

function ZJ8(A) {
    let B = A,
        Q = B.match(/<analysis>([\s\S]*?)<\/analysis>/);
    if (Q) {
        let D = Q[1] || "";
        B = B.replace(/<analysis>[\s\S]*?<\/analysis>/, `Analysis:
${D.trim()}`)
    }
    let Z = B.match(/<summary>([\s\S]*?)<\/summary>/);
    if (Z) {
        let D = Z[1] || "";
        B = B.replace(/<summary>[\s\S]*?<\/summary>/, `Summary:
${D.trim()}`)
    }
    return B = B.replace(/\n\n+/g, `

`), B.trim()
}

function wkB(A, B) {
    let Z = `This session is being continued from a previous conversation that ran out of context. The conversation is summarized below:
${ZJ8(A)}.`;
    if (B) return `${Z}
Please continue the conversation from where we left it off without asking the user any further questions. Continue with the last task that you were asked to work on.`;
    return Z
}
var DJ8 = EA(() => {
        return null
    }),
    GJ8 = EA(() => {
        return null
    }),
    FJ8 = EA(async () => {
        return null
    });
async function nb1(A, B) {
    return
}
import {
    join as TL0,
    parse as $kB,
    dirname as PL0,
    resolve as IJ8
} from "path";
var YJ8 = "Codebase and user instructions are shown below. Be sure to adhere to these instructions. IMPORTANT: These instructions OVERRIDE any default behavior and you MUST follow them exactly as written.",
    zF1 = 40000,
    L01 = 1000;

function qkB(A) {
    return vs(A, _9())
}

function NkB(A, B) {
    try {
        if (j1().existsSync(A)) {
            if (!j1().statSync(A).isFile()) return null;
            let Z = j1().readFileSync(A, {
                encoding: "utf-8"
            });
            return {
                path: A,
                type: B,
                content: Z
            }
        }
    } catch (Q) {
        if (Q instanceof Error && Q.message.includes("EACCES")) X1("tengu_claude_md_permission_error", {
            is_access_error: 1,
            has_home_dir: A.includes(e9()) ? 1 : 0
        })
    }
    return null
}

function WJ8(A, B) {
    let Q = new Set,
        D = new DC().lex(A);

    function G(F) {
        for (let I of F) {
            if (I.type === "code" || I.type === "codespan") continue;
            if (I.type === "text") {
                let Y = I.text || "",
                    W = /(?:^|\s)@((?:[^\s\\]|\\ )+)/g,
                    J;
                while ((J = W.exec(Y)) !== null) {
                    let X = J[1];
                    if (!X) continue;
                    if (X = X.replace(/\\ /g, " "), X) {
                        if (X.startsWith("./") || X.startsWith("~/") || X.startsWith("/") && X !== "/" || !X.startsWith("@") && !X.match(/^[#%^&*()]+/) && X.match(/^[a-zA-Z0-9._-]/)) {
                            let C = Sq1(X, B);
                            Q.add(C)
                        }
                    }
                }
            }
            if (I.tokens) G(I.tokens);
            if (I.items) G(I.items)
        }
    }
    return G(D), [...Q]
}
var JJ8 = 5;

function N01(A, B, Q, Z, D = 0, G) {
    if (Q.has(A) || D >= JJ8) return [];
    let F = NkB(A, B);
    if (!F || !F.content.trim()) return [];
    if (G) F.parent = G;
    Q.add(A);
    let I = [];
    I.push(F);
    let Y = WJ8(F.content, A);
    for (let W of Y) {
        if (!qkB(W) && !Z) continue;
        let X = N01(W, B, Q, Z, D + 1, A);
        I.push(...X)
    }
    return I
}
var DW = EA((A = !1) => {
    let B = [],
        Q = new Set,
        Z = UQ(),
        D = A || Z.hasClaudeMdExternalIncludesApproved || !1,
        G = HE("Managed");
    B.push(...N01(G, "Managed", Q, D));
    let F = HE("User");
    B.push(...N01(F, "User", Q, !0));
    let I = [],
        Y = _9();
    while (Y !== $kB(Y).root) I.push(Y), Y = PL0(Y);
    for (let W of I.reverse()) {
        let J = TL0(W, "CLAUDE.md");
        B.push(...N01(J, "Project", Q, D));
        let X = TL0(W, "CLAUDE.local.md");
        B.push(...N01(X, "Local", Q, D))
    }
    return B
});

function EF1() {
    return DW().filter((A) => A.content.length > zF1)
}
var LkB = () => {
    let A = DW(),
        B = [];
    for (let Q of A)
        if (Q.content) {
            let Z = Q.type === "Project" ? " (project instructions, checked into the codebase)" : Q.type === "Local" ? " (user's private project instructions, not checked in)" : " (user's private global instructions for all projects)";
            B.push(`Contents of ${Q.path}${Z}:

${Q.content}`)
        } if (B.length === 0) return "";
    return `${YJ8}

${B.join(`

`)}`
};

function RS() {
    return null
}

function MkB(A, B) {
    let Q = [];
    if (!EK(A, B)) return Q;
    let Z = new Set,
        D = _9(),
        G = PL0(IJ8(A)),
        F = [],
        I = G;
    while (I !== D && I !== $kB(I).root) {
        if (I.startsWith(D)) F.push(I);
        I = PL0(I)
    }
    for (let Y of F.reverse()) {
        let W = TL0(Y, "CLAUDE.md");
        Q.push(...N01(W, "Project", Z, !1))
    }
    return Q
}

function SL0() {
    for (let A of DW(!0))
        if (A.type !== "User" && A.parent && !qkB(A.path)) return !0;
    return !1
}
async function RkB() {
    let A = UQ();
    if (A.hasClaudeMdExternalIncludesApproved || A.hasClaudeMdExternalIncludesWarningShown) return !1;
    return SL0()
}
import {
    randomUUID as RJ8
} from "node:crypto";
import {
    basename as NJ8
} from "path";
var iv = ["red", "blue", "green", "yellow", "purple", "orange", "pink", "cyan"],
    UF1 = {
        red: "red_FOR_SUBAGENTS_ONLY",
        blue: "blue_FOR_SUBAGENTS_ONLY",
        green: "green_FOR_SUBAGENTS_ONLY",
        yellow: "yellow_FOR_SUBAGENTS_ONLY",
        purple: "purple_FOR_SUBAGENTS_ONLY",
        orange: "orange_FOR_SUBAGENTS_ONLY",
        pink: "pink_FOR_SUBAGENTS_ONLY",
        cyan: "cyan_FOR_SUBAGENTS_ONLY"
    };

function M01(A) {
    if (A === "general-purpose") return;
    let B = Nm1(),
        Q = B.get(A);
    if (Q && iv.includes(Q)) return UF1[Q];
    let Z = sk0(),
        D = iv[Z % iv.length];
    if (rk0(), D) return B.set(A, D), UF1[D];
    return
}

function R01(A, B) {
    let Q = Nm1();
    if (!B) {
        Q.delete(A);
        return
    }
    if (iv.includes(B)) Q.set(A, B)
}