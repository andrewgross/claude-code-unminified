/* chunk:591 bytes:[13647261, 13666965) size:19704 source:unpacked-cli.js */
var jL0 = {
        agentType: "general-purpose",
        whenToUse: "General-purpose agent for researching complex questions, searching for code, and executing multi-step tasks. When you are searching for a keyword or file and are not confident that you will find the right match in the first few tries use this agent to perform the search for you.",
        tools: ["*"],
        systemPrompt: `You are an agent for Claude Code, Anthropic's official CLI for Claude. Given the user's message, you should use the tools available to complete the task. Do what has been asked; nothing more, nothing less. When you complete the task simply respond with a detailed writeup.

Your strengths:
- Searching for code, configurations, and patterns across large codebases
- Analyzing multiple files to understand system architecture
- Investigating complex questions that require exploring many files
- Performing multi-step research tasks

Guidelines:
- For file searches: Use Grep or Glob when you need to search broadly. Use Read when you know the specific file path.
- For analysis: Start broad and narrow down. Use multiple search strategies if the first doesn't yield results.
- Be thorough: Check multiple locations, consider different naming conventions, look for related files.
- NEVER create files unless they're absolutely necessary for achieving your goal. ALWAYS prefer editing an existing file to creating a new one.
- NEVER proactively create documentation files (*.md) or README files. Only create documentation files if explicitly requested.
- In your final response always share relevant file names and code snippets. Any file paths you return in your response MUST be absolute. Do NOT use relative paths.
- For clear communication, avoid using emojis.`,
        source: "built-in",
        baseDir: "built-in",
        model: "sonnet"
    },
    XJ8 = {
        agentType: "statusline-setup",
        whenToUse: "Use this agent to configure the user's Claude Code status line setting.",
        tools: ["Read", "Edit"],
        systemPrompt: `You are a status line setup agent for Claude Code. Your job is to create or update the statusLine command in the user's Claude Code settings.

When asked to convert the user's shell PS1 configuration, follow these steps:
1. Read the user's shell configuration files in this order of preference:
   - ~/.zshrc
   - ~/.bashrc  
   - ~/.bash_profile
   - ~/.profile

2. Extract the PS1 value using this regex pattern: /(?:^|\\n)\\s*(?:export\\s+)?PS1\\s*=\\s*["']([^"']+)["']/m

3. Convert PS1 escape sequences to shell commands:
   - \\u → $(whoami)
   - \\h → $(hostname -s)  
   - \\H → $(hostname)
   - \\w → $(pwd)
   - \\W → $(basename "$(pwd)")
   - \\$ → $
   - \\n → \\n
   - \\t → $(date +%H:%M:%S)
   - \\d → $(date "+%a %b %d")
   - \\@ → $(date +%I:%M%p)
   - \\# → #
   - \\! → !

4. When using ANSI color codes, be sure to use \`printf\`. Do not remove colors. Note that the status line will be printed in a terminal using dimmed colors.

5. If the imported PS1 would have trailing "$" or ">" characters in the output, you MUST remove them.

6. If no PS1 is found and user did not provide other instructions, ask for further instructions.

How to use the statusLine command:
1. The statusLine command will receive the following JSON input via stdin:
   {
     "session_id": "string", // Unique session ID
     "transcript_path": "string", // Path to the conversation transcript
     "cwd": "string",         // Current working directory
     "model": {
       "id": "string",           // Model ID (e.g., "claude-3-5-sonnet-20241022")
       "display_name": "string"  // Display name (e.g., "Claude 3.5 Sonnet")
     },
     "workspace": {
       "current_dir": "string",  // Current working directory path
       "project_dir": "string"   // Project root directory path
     },
     "version": "string",        // Claude Code app version (e.g., "1.0.71")
     "output_style": {
       "name": "string",         // Output style name (e.g., "default", "Explanatory", "Learning")
     }
   }
   
   You can use this JSON data in your command like:
   - $(cat | jq -r '.model.display_name')
   - $(cat | jq -r '.workspace.current_dir')
   - $(cat | jq -r '.output_style.name')
   
   Or store it in a variable first:
   - input=$(cat); echo "$(echo "$input" | jq -r '.model.display_name') in $(echo "$input" | jq -r '.workspace.current_dir')"

2. For longer commands, you can save a new file in the user's ~/.claude directory, e.g.:
   - ~/.claude/statusline-command.sh and reference that file in the settings.

3. Update the user's ~/.claude/settings.json with:
   {
     "statusLine": {
       "type": "command", 
       "command": "your_command_here"
     }
   }

4. If ~/.claude/settings.json is a symlink, update the target file instead.

Guidelines:
- Preserve existing settings when updating
- Return a summary of what was configured, including the name of the script file if used
- If the script includes git commands, they should skip optional locks
- IMPORTANT: At the end of your response, inform the parent agent that this "statusline-setup" agent must be used for further status line changes.
  Also ensure that the user is informed that they can ask Claude to continue to make changes to the status line.
`,
        source: "built-in",
        baseDir: "built-in",
        model: "sonnet",
        color: "orange"
    },
    VJ8 = {
        agentType: "output-style-setup",
        whenToUse: "Use this agent to create a Claude Code output style.",
        tools: [QG, wv, eJ, zv, Ev, pM],
        systemPrompt: `Your job is to create a custom output style, which modifies the Claude Code system prompt, based on the user's description.

For example, Claude Code's default output style directs Claude to focus "on software engineering tasks", giving Claude guidance like "When you have completed a task, you MUST run the lint and typecheck commands".

# Step 1: Understand Requirements
Extract preferences from the user's request such as:
- Response length (concise, detailed, comprehensive, etc)
- Tone (formal, casual, educational, professional, etc)
- Output display (bullet points, numbered lists, sections, etc)
- Focus areas (task completion, learning, quality, speed, etc)
- Workflow (sequence of specific tools to use, steps to follow, etc)

If the user's request is underspecified, use your best judgment of what the
requirements should be.

# Step 2: Generate Configuration
Create a configuration with:
- A short name that is properly capitalized for display (e.g. "Insights")
- A brief description explaining the benefit to display to the user
- The additional content for the system prompt 

# Step 3: Choose File Location
Default to the user-level output styles directory (~/.claude/output-styles/) unless the user specifies to save to the project-level directory (.claude/output-styles/). Generate a filename based on the style name (e.g., "code-reviewer.md" for "Code Reviewer" style).

# Step 4: Save the File
Format as markdown with frontmatter:
\`\`\`markdown
---
name: Style Name
description: Brief description for the picker
---

[The additional content that will be added to the system prompt]
\`\`\`

After creating the file, ALWAYS:
1. **Validate the file**: Use Read tool to verify the file was created correctly with valid frontmatter and proper markdown formatting
2. **Check file length**: Report the file size in characters/tokens to ensure it's reasonable for a system prompt (aim for under 2000 characters)
3. **Verify frontmatter**: Ensure the YAML frontmatter can be parsed correctly and contains required 'name' and 'description' fields

## Output Style Examples

**Concise**:
- Keep responses brief and to the point
- Focus on actionable steps over explanations
- Use bullet points for clarity
- Minimize context unless requested

**Educational**:
- Include learning explanations
- Explain the "why" behind decisions
- Add insights about best practices
- Balance education with task completion

**Code Reviewer**:
- Provide structured feedback
- Include specific analysis criteria
- Use consistent formatting
- Focus on code quality and improvements

# Step 5: Report the result
Inform the user that the style has been created, including:
- The file path where it was saved
- Confirmation that validation passed (file format is correct and parseable)
- The file length in characters for reference

# General Guidelines
- Include concrete examples when they would clarify behavior
- Balance comprehensiveness with clarity - every instruction should add value. The system prompt itself should not take up too much context.
`,
        source: "built-in",
        baseDir: "built-in",
        model: "sonnet",
        color: "blue",
        callback: () => {
            O5B()
        }
    };

function kL0() {
    return [jL0, XJ8, VJ8]
}
import {
    join as UJ8,
    basename as wJ8
} from "path";
import {
    join as $F1
} from "path";
var CJ8 = h.object({
        name: h.string().min(1, "Author name cannot be empty"),
        email: h.string().optional(),
        url: h.string().optional()
    }),
    OkB = h.object({
        name: h.string().min(1, "Plugin name cannot be empty"),
        version: h.string().optional(),
        description: h.string().optional(),
        author: CJ8.optional()
    });
import {
    join as wF1
} from "path";
var _L0 = wF1(e9(), "plugins"),
    xL0 = wF1(_L0, "repos"),
    yL0 = wF1(_L0, "config.json");
async function KJ8() {
    let A = j1();
    A.mkdirSync(_L0), A.mkdirSync(xL0)
}
async function vL0() {
    let A = j1();
    try {
        if (!A.existsSync(yL0)) return {
            repositories: {}
        };
        let B = A.readFileSync(yL0, {
            encoding: "utf-8"
        });
        return JSON.parse(B)
    } catch (B) {
        return SA(`Failed to load plugin config: ${B}`), {
            repositories: {}
        }
    }
}
async function HJ8(A) {
    await KJ8(), j1().writeFileSync(yL0, JSON.stringify(A, null, 2), {
        encoding: "utf-8",
        flush: !0
    })
}
async function TkB() {
    let A = await vL0(),
        B = j1();
    for (let Q of Object.keys(A.repositories)) try {
        let [Z, D] = Q.split("/");
        if (!Z || !D) {
            SA(`Invalid repository key format: ${Q}`);
            continue
        }
        let G = wF1(xL0, Z, D);
        if (!B.existsSync(G)) {
            SA(`Repository directory not found for ${Q}, skipping update`);
            continue
        }
        n1(`Auto-updating repository ${Q}...`);
        let {
            code: F,
            stderr: I,
            stdout: Y
        } = await F2("git", ["-C", G, "pull", "--ff-only"]);
        if (F !== 0) {
            SA(`Failed to auto-update repository ${Q}: ${I}`);
            continue
        }
        let {
            stdout: W
        } = await F2("git", ["-C", G, "rev-parse", "HEAD"]), J = A.repositories[Q];
        if (J) J.lastUpdated = new Date().toISOString(), J.commitSha = W.trim();
        n1(`Successfully auto-updated repository ${Q}: ${Y.trim()}`)
    } catch (Z) {
        SA(`Error auto-updating repository ${Q}: ${Z}`)
    }
    await HJ8(A)
}

function PkB(A) {
    let [B, Q] = A.split("/");
    if (!B || !Q) throw new Error(`Invalid repository key format: ${A}`);
    return wF1(xL0, B, Q)
}

function zJ8(A, B) {
    let Q = [],
        Z = j1(),
        G = GB().enabledPlugins?.[B] || [];
    try {
        let F = Z.readdirSync(A);
        for (let I of F) {
            if (!I.isDirectory()) continue;
            if (I.name.startsWith(".")) continue;
            let Y = $F1(A, I.name),
                W = $F1(Y, "plugin.json"),
                J;
            if (Z.existsSync(W)) try {
                let z = Z.readFileSync(W, {
                        encoding: "utf-8"
                    }),
                    $ = JSON.parse(z),
                    L = OkB.safeParse($);
                if (L.success) J = L.data;
                else {
                    let N = L.error.errors.map((R) => `${R.path.join(".")}: ${R.message}`).join(", ");
                    SA(`Invalid manifest for ${I.name}: ${N}`), J = {
                        name: I.name,
                        description: `Plugin from ${B}`
                    }
                }
            } catch (z) {
                SA(`Failed to parse manifest for ${I.name}: ${z}`), J = {
                    name: I.name,
                    description: `Plugin from ${B}`
                }
            } else J = {
                name: I.name,
                description: `Plugin from ${B}`
            };
            let X = G.includes(J.name),
                V = {
                    name: J.name,
                    manifest: J,
                    path: Y,
                    repository: B,
                    enabled: X
                },
                C = $F1(Y, "commands");
            if (Z.existsSync(C)) V.commandsPath = C;
            let K = $F1(Y, "agents");
            if (Z.existsSync(K)) V.agentsPath = K;
            let H = $F1(Y, "hooks", "hooks.json");
            if (Z.existsSync(H)) try {
                let z = Z.readFileSync(H, {
                        encoding: "utf-8"
                    }),
                    $ = JSON.parse(z),
                    L = S40.parse($);
                V.hooksConfig = EJ8(L, Y)
            } catch (z) {
                SA(`Failed to parse hooks config for ${I.name}: ${z}`)
            }
            if (Q.push(V), X) n1(`Loaded plugin: ${J.name} from ${B}`);
            else n1(`Found disabled plugin: ${J.name} from ${B}`)
        }
    } catch (F) {
        SA(`Failed to scan repository ${B}: ${F}`)
    }
    return Q
}
var Md = EA(async () => {
    TkB();
    let A = await vL0(),
        B = [],
        Q = [],
        Z = [],
        D = j1();
    for (let G of Object.keys(A.repositories)) {
        let F;
        try {
            F = PkB(G)
        } catch {
            Z.push({
                repository: G,
                error: `Invalid repository key format: ${G}`
            });
            continue
        }
        if (!D.existsSync(F)) {
            Z.push({
                repository: G,
                error: `Repository directory not found: ${F}`
            });
            continue
        }
        try {
            let I = zJ8(F, G);
            for (let Y of I)
                if (Y.enabled) B.push(Y);
                else Q.push(Y)
        } catch (I) {
            Z.push({
                repository: G,
                error: I instanceof Error ? I.message : String(I)
            })
        }
    }
    return n1(`Found ${B.length+Q.length} plugins (${B.length} enabled, ${Q.length} disabled) from ${Object.keys(A.repositories).length} repositories`), {
        enabled: B,
        disabled: Q,
        errors: Z
    }
});

function EJ8(A, B) {
    let Z = JSON.stringify(A).replace(/\$\{CLAUDE_PLUGIN_ROOT\}/g, B);
    return JSON.parse(Z)
}

function $J8(A, B, Q) {
    let Z = [],
        D = j1();

    function G(F, I = []) {
        try {
            let Y = D.readdirSync(F);
            for (let W of Y) {
                let J = UJ8(F, W.name);
                if (W.isDirectory()) G(J, [...I, W.name]);
                else if (W.isFile() && W.name.endsWith(".md")) {
                    let X = qJ8(J, B, I, Q);
                    if (X) Z.push(X)
                }
            }
        } catch (Y) {
            SA(`Failed to scan agents directory ${F}: ${Y}`)
        }
    }
    return G(A), Z
}

function qJ8(A, B, Q, Z) {
    let D = j1();
    try {
        let G = D.readFileSync(A, {
                encoding: "utf-8"
            }),
            {
                frontmatter: F,
                content: I
            } = Sx(G),
            Y = F.name || wJ8(A).replace(/\.md$/, ""),
            J = [B, ...Q, Y].join(":"),
            X = F.description || F["when-to-use"] || `Agent from ${B} plugin`,
            V = aj1(F.tools),
            C = F.color,
            K = F.model;
        return {
            agentType: J,
            whenToUse: X,
            tools: V,
            systemPrompt: I.trim(),
            source: "plugin",
            color: C,
            model: K,
            filename: Y,
            plugin: Z
        }
    } catch (G) {
        return SA(`Failed to load agent from ${A}: ${G}`), null
    }
}
var O01 = EA(async () => {
    let {
        enabled: A,
        errors: B
    } = await Md(), Q = [];
    if (B.length > 0) n1(`Plugin loading errors: ${B.map((Z)=>Z.error).join(", ")}`);
    for (let Z of A) {
        if (!Z.agentsPath) continue;
        try {
            let D = $J8(Z.agentsPath, Z.name, Z.repository);
            if (Q.push(...D), D.length > 0) n1(`Loaded ${D.length} agents from plugin ${Z.name}`)
        } catch (D) {
            SA(`Failed to load agents from plugin ${Z.name}: ${D}`)
        }
    }
    return n1(`Total plugin agents loaded: ${Q.length}`), Q
});

function bL0() {
    O01.cache?.clear?.()
}
var OS = EA(async () => {
        return (await av()).activeAgents
    }),
    av = EA(async () => {
        try {
            let A = await Se("agents"),
                B = [],
                Q = A.map(({
                    filePath: V,
                    baseDir: C,
                    frontmatter: K,
                    content: H,
                    source: z
                }) => {
                    let $ = MJ8(V, C, K, H, z);
                    if (!$) {
                        let L = LJ8(K);
                        return B.push({
                            path: V,
                            error: L
                        }), n1(`Failed to parse agent from ${V}: ${L}`), X1("tengu_agent_parse_error", {
                            error: L,
                            location: z
                        }), null
                    }
                    return $
                }).filter((V) => V !== null),
                Z = process.env.ENABLE_PLUGINS ? await O01() : [],
                D = new Map,
                G = [],
                F = kL0(),
                I = Q.filter((V) => V.source === "policySettings"),
                Y = Q.filter((V) => V.source === "userSettings"),
                W = Q.filter((V) => V.source === "projectSettings"),
                J = [F, Z, Y, W, I];
            for (let V of J)
                for (let C of V) D.set(C.agentType, C), G.push(C);
            let X = Array.from(D.values());
            for (let V of X)
                if (V.color) R01(V.agentType, V.color);
            return {
                activeAgents: X,
                allAgents: G,
                failedFiles: B.length > 0 ? B : void 0
            }
        } catch (A) {
            let B = A instanceof Error ? A.message : String(A);
            n1(`Error loading agent definitions: ${B}`), R1(A instanceof Error ? A : new Error(String(A)));
            let Q = kL0();
            return {
                activeAgents: Q,
                allAgents: Q,
                failedFiles: [{
                    path: "unknown",
                    error: B
                }]
            }
        }
    });

function T01() {
    OS.cache?.clear?.(), av.cache?.clear?.(), bL0()
}

function LJ8(A) {
    let {
        name: B,
        description: Q,
        model: Z
    } = A;
    if (!B || typeof B !== "string") return 'Missing required "name" field in frontmatter';
    if (!Q || typeof Q !== "string") return 'Missing required "description" field in frontmatter';
    if (Z && typeof Z === "string" && !l41.includes(Z)) return `Invalid model "${Z}". Valid options: ${l41.join(", ")}`;
    return "Unknown parsing error"
}