/* chunk:558 bytes:[13028175, 13045495) size:17320 source:unpacked-cli.js */
class pLB {
    profilePath;
    defaultProfile = `(version 1)
;; Default deny (whitelist approach)
(deny default)

;; Essential filesystem operations
(allow file-read*)
(allow file-read-metadata)
(allow file-ioctl)

;; Allow writes to /dev/null
(allow file-write* (literal "/dev/null"))
(allow file-read-data (subpath "/dev/fd"))

;; Limited sys operations needed for basic functionality
(allow sysctl-read)
(allow mach-lookup)
(allow process-exec)
(allow process-fork)

;; Allow signals to self and process group (descendants)
(allow signal (target pgrp))`;
    constructor() {
        let A = Math.floor(Math.random() * 65536).toString(16).padStart(4, "0");
        this.profilePath = lLB.join(cLB.tmpdir(), `claude-sandbox-${A}.sb`), this.writeProfile(this.defaultProfile)
    }
    getProfilePath() {
        return this.profilePath
    }
    writeProfile(A) {
        try {
            j1().writeFileSync(this.profilePath, A, {
                encoding: "utf8",
                flush: !1
            })
        } catch (B) {
            throw R1(new Error(`Failed to write sandbox profile: ${B}`)), B
        }
    }
    cleanup() {
        try {
            if (j1().existsSync(this.profilePath)) j1().unlinkSync(this.profilePath)
        } catch (A) {
            R1(new Error(`Failed to clean up sandbox profile: ${A}`))
        }
    }
    wrapCommand(A) {
        let B = Vv1.default.quote([this.profilePath]),
            Q = `set -o pipefail; ${A}`;
        return Vv1.default.quote([`/usr/bin/sandbox-exec -f ${B} bash -c ${Vv1.default.quote([Q])}`])
    }
}

function Cv1() {
    return !1
}

function v48() {
    return !1
}

function iLB(A) {
    if (!v48()) throw new Error("Sandbox mode requested but not available on this system");
    try {
        let B = new pLB;
        return {
            finalCommand: B.wrapCommand(A),
            cleanup: () => B.cleanup()
        }
    } catch (B) {
        throw new Error("Sandbox mode requested but not available on this system")
    }
}
var om = G1(z1(), 1);
import {
    join as Kv1
} from "path";
var b48 = h.enum(["pending", "in_progress", "completed"]),
    f48 = h.object({
        content: h.string().min(1, "Content cannot be empty"),
        status: b48,
        id: h.string()
    }),
    m11 = h.array(f48);

function s$0() {
    let A = Kv1(e9(), "todos");
    if (!j1().existsSync(A)) j1().mkdirSync(A);
    return A
}

function $v(A) {
    let B = `${CB()}-agent-${A}.json`;
    return Kv1(s$0(), B)
}

function sE(A) {
    return sLB($v(A))
}

function Hv1(A, B) {
    rLB(A, $v(B))
}
var nLB = {
    completed: 0,
    in_progress: 1,
    pending: 2
};

function aLB(A, B) {
    return nLB[A.status] - nLB[B.status]
}

function zv1(A) {
    if (A.messages.length > 0) {
        let B = A.messages[0];
        if (B && "sessionId" in B) h48(B.sessionId, CB())
    }
}

function h48(A, B) {
    let Q = Kv1(s$0(), `${A}-agent-${A}.json`),
        Z = Kv1(s$0(), `${B}-agent-${B}.json`);
    try {
        let D = sLB(Q);
        if (D.length === 0) return !1;
        return rLB(D, Z), !0
    } catch (D) {
        return R1(D instanceof Error ? D : new Error(String(D))), !1
    }
}

function sLB(A) {
    if (!j1().existsSync(A)) return [];
    try {
        let B = JSON.parse(j1().readFileSync(A, {
            encoding: "utf-8"
        }));
        return m11.parse(B)
    } catch (B) {
        return R1(B instanceof Error ? B : new Error(String(B))), []
    }
}

function rLB(A, B) {
    try {
        wL(B, JSON.stringify(A, null, 2))
    } catch (Q) {
        R1(Q instanceof Error ? Q : new Error(String(Q)))
    }
}
var oLB = `Use this tool to create and manage a structured task list for your current coding session. This helps you track progress, organize complex tasks, and demonstrate thoroughness to the user.
It also helps the user understand the progress of the task and overall progress of their requests.

## When to Use This Tool
Use this tool proactively in these scenarios:

1. Complex multi-step tasks - When a task requires 3 or more distinct steps or actions
2. Non-trivial and complex tasks - Tasks that require careful planning or multiple operations
3. User explicitly requests todo list - When the user directly asks you to use the todo list
4. User provides multiple tasks - When users provide a list of things to be done (numbered or comma-separated)
5. After receiving new instructions - Immediately capture user requirements as todos
6. When you start working on a task - Mark it as in_progress BEFORE beginning work. Ideally you should only have one todo as in_progress at a time
7. After completing a task - Mark it as completed and add any new follow-up tasks discovered during implementation

## When NOT to Use This Tool

Skip using this tool when:
1. There is only a single, straightforward task
2. The task is trivial and tracking it provides no organizational benefit
3. The task can be completed in less than 3 trivial steps
4. The task is purely conversational or informational

NOTE that you should not use this tool if there is only one trivial task to do. In this case you are better off just doing the task directly.

## Examples of When to Use the Todo List

<example>
User: I want to add a dark mode toggle to the application settings. Make sure you run the tests and build when you're done!
Assistant: I'll help add a dark mode toggle to your application settings. Let me create a todo list to track this implementation.
*Creates todo list with the following items:*
1. Create dark mode toggle component in Settings page
2. Add dark mode state management (context/store)
3. Implement CSS-in-JS styles for dark theme
4. Update existing components to support theme switching
5. Run tests and build process, addressing any failures or errors that occur
*Begins working on the first task*

<reasoning>
The assistant used the todo list because:
1. Adding dark mode is a multi-step feature requiring UI, state management, and styling changes
2. The user explicitly requested tests and build be run afterward
3. The assistant inferred that tests and build need to pass by adding "Ensure tests and build succeed" as the final task
</reasoning>
</example>

<example>
User: Help me rename the function getCwd to getCurrentWorkingDirectory across my project
Assistant: Let me first search through your codebase to find all occurrences of 'getCwd'.
*Uses grep or search tools to locate all instances of getCwd in the codebase*
Assistant: I've found 15 instances of 'getCwd' across 8 different files. Let me create a todo list to track these changes.
*Creates todo list with specific items for each file that needs updating*

<reasoning>
The assistant used the todo list because:
1. First, the assistant searched to understand the scope of the task
2. Upon finding multiple occurrences across different files, it determined this was a complex task with multiple steps
3. The todo list helps ensure every instance is tracked and updated systematically
4. This approach prevents missing any occurrences and maintains code consistency
</reasoning>
</example>


<example>
User: I need to implement these features for my e-commerce site: user registration, product catalog, shopping cart, and checkout flow.
Assistant: I'll help implement these features. First, let's add all the features to the todo list.
*Creates a todo list breaking down each feature into specific tasks based on the project architecture*
Assistant: Let's start with user registration. This will involve creating database models, API endpoints, and frontend forms that integrate with your existing authentication system.

<reasoning>
The assistant used the todo list because:
1. The user provided multiple complex features to implement in a comma separated list
2. The todo list helps organize these large features into manageable tasks
3. This approach allows for tracking progress across the entire implementation
</reasoning>
</example>

<example>
User: Can you help optimize my React application? It's rendering slowly and has performance issues.</user>
Assistant: I'll help optimize your React application. First, let me examine your codebase to identify potential performance bottlenecks.
*Reviews component structure, render patterns, state management, and data fetching*
Assistant: After analyzing your codebase, I've identified several performance issues. Let me create a todo list to track our optimization efforts.
*Creates todo list with items like: 1) Implement memoization for expensive calculations in ProductList, 2) Add virtualization for long lists in Dashboard, 3) Optimize image loading in Gallery component, 4) Fix state update loops in ShoppingCart, 5) Review bundle size and implement code splitting*
Let's start by implementing memoization for the expensive calculations in your ProductList component.</assistant>

<reasoning>
The assistant used the todo list because:
1. First, the assistant examined the codebase to identify specific performance issues
2. Based on this analysis, it identified multiple optimization opportunities
3. Performance optimization is a non-trivial task requiring multiple steps
4. The todo list helps methodically track improvements across different components
5. This systematic approach ensures all performance bottlenecks are addressed
</reasoning>
</example>

## Examples of When NOT to Use the Todo List

<example>
User: How do I print 'Hello World' in Python?
Assistant: In Python, you can print "Hello World" with this simple code:

python
print("Hello World")

This will output the text "Hello World" to the console when executed.</assistant>

<reasoning>
The assistant did not use the todo list because this is a single, trivial task that can be completed in one step. There's no need to track multiple tasks or steps for such a straightforward request.
</reasoning>
</example>

<example>
User: What does the git status command do?
Assistant: The git status command shows the current state of your working directory and staging area. It displays which changes have been staged, which haven't, and which files aren't being tracked by Git. This is a fundamental command for understanding the current state of your repository before making commits.

<reasoning>
The assistant did not use the todo list because this is an informational request with no actual coding task to complete. The user is simply asking for an explanation, not for the assistant to perform multiple steps or tasks.
</reasoning>
</example>

<example>
User: Can you add a comment to the calculateTotal function to explain what it does?
Assistant: Sure, let me add a comment to the calculateTotal function to explain what it does.
* Uses the ${eJ} tool to add a comment to the calculateTotal function *

<reasoning>
The assistant did not use the todo list because this is a single, straightforward task confined to one location in the code. Adding a comment doesn't require tracking multiple steps or systematic organization.
</reasoning>
</example>

<example>
User: Run npm install for me and tell me what happens.
Assistant: I'll run the npm install command for you.

*Executes: npm install*

The command completed successfully. Here's the output:
[Output of npm install command]

All dependencies have been installed according to your package.json file.

<reasoning>
The assistant did not use the todo list because this is a single command execution with immediate results. There are no multiple steps to track or organize, making the todo list unnecessary for this straightforward task.
</reasoning>
</example>

## Task States and Management

1. **Task States**: Use these states to track progress:
   - pending: Task not yet started
   - in_progress: Currently working on (limit to ONE task at a time)
   - completed: Task finished successfully

2. **Task Management**:
   - Update task status in real-time as you work
   - Mark tasks complete IMMEDIATELY after finishing (don't batch completions)
   - Only have ONE task in_progress at any time
   - Complete current tasks before starting new ones
   - Remove tasks that are no longer relevant from the list entirely

3. **Task Completion Requirements**:
   - ONLY mark a task as completed when you have FULLY accomplished it
   - If you encounter errors, blockers, or cannot finish, keep the task as in_progress
   - When blocked, create a new task describing what needs to be resolved
   - Never mark a task as completed if:
     - Tests are failing
     - Implementation is partial
     - You encountered unresolved errors
     - You couldn't find necessary files or dependencies

4. **Task Breakdown**:
   - Create specific, actionable items
   - Break complex tasks into smaller, manageable steps
   - Use clear, descriptive task names

When in doubt, use this tool. Being proactive with task management demonstrates attentiveness and ensures you complete all requirements successfully.
`,
    tLB = "Update the todo list for the current session. To be used proactively and often to track progress and pending tasks.";
var x$ = G1(z1(), 1);
var _$ = G1(z1(), 1);

function eLB({
    todo: {
        status: A,
        content: B
    },
    isCurrent: Q = !1,
    previousStatus: Z
}) {
    let D = Z !== "completed" && A === "completed" ? "success" : Z !== "in_progress" && A === "in_progress" ? "suggestion" : void 0;
    return _$.createElement(v, {
        flexDirection: "row"
    }, _$.createElement(v, {
        minWidth: 2
    }, _$.createElement(T, {
        color: D,
        bold: Q
    }, A === "completed" ? s0.checkboxOn : s0.checkboxOff, " ")), _$.createElement(v, null, _$.createElement(T, {
        bold: Q,
        color: D,
        strikethrough: A === "completed"
    }, B)))
}

function AMB({
    oldTodos: A,
    newTodos: B
}) {
    if (B.length === 0) return x$.createElement(OA, {
        height: 1
    }, x$.createElement(T, {
        dimColor: !0
    }, "(Empty todo list)"));
    return x$.createElement(OA, null, x$.createElement(v, {
        flexDirection: "column"
    }, B.sort(aLB).map((Q) => {
        let Z = A.find((D) => D.id === Q.id);
        return x$.createElement(eLB, {
            key: Q.id,
            todo: Q,
            isCurrent: Q.status === "in_progress",
            previousStatus: Z?.status
        })
    })))
}
var g48 = h.strictObject({
        todos: m11.describe("The updated todo list")
    }),
    a73 = h.object({
        oldTodos: m11.describe("The todo list before the update"),
        newTodos: m11.describe("The todo list after the update")
    }),
    hF = {
        name: "TodoWrite",
        async description() {
            return tLB
        },
        async prompt() {
            return oLB
        },
        inputSchema: g48,
        userFacingName() {
            return "Update Todos"
        },
        isEnabled() {
            return !0
        },
        isConcurrencySafe() {
            return !1
        },
        isReadOnly() {
            return !1
        },
        async checkPermissions(A) {
            return {
                behavior: "allow",
                updatedInput: A
            }
        },
        renderToolUseMessage() {
            return ""
        },
        renderToolUseProgressMessage() {
            return null
        },
        renderToolUseRejectedMessage() {
            return om.createElement(P5, null)
        },
        renderToolUseErrorMessage(A, {
            verbose: B
        }) {
            return om.createElement(f6, {
                result: A,
                verbose: B
            })
        },
        renderToolResultMessage({
            oldTodos: A,
            newTodos: B
        }) {
            return om.createElement(AMB, {
                oldTodos: A,
                newTodos: B
            })
        },
        async * call({
            todos: A
        }, B) {
            let Q = sE(B.agentId),
                Z = A;
            Hv1(Z, B.agentId), yield {
                type: "result",
                data: {
                    oldTodos: Q,
                    newTodos: Z
                }
            }
        },
        mapToolResultToToolResultBlockParam(A, B) {
            return {
                tool_use_id: B,
                type: "tool_result",
                content: "Todos have been modified successfully. Ensure that you continue to use the todo list to track your progress. Please proceed with the current tasks if applicable"
            }
        }
    };
var u48 = 120000,
    m48 = 600000,
    d48 = 30000;

function IG1() {
    let A = process.env.BASH_MAX_OUTPUT_LENGTH;
    if (A) {
        let B = parseInt(A, 10);
        if (!isNaN(B) && B > 0) return B
    }
    return d48
}

function d11() {
    let A = process.env.BASH_DEFAULT_TIMEOUT_MS;
    if (A) {
        let B = parseInt(A, 10);
        if (!isNaN(B) && B > 0) return B
    }
    return u48
}

function Ev1() {
    let A = process.env.BASH_MAX_TIMEOUT_MS;
    if (A) {
        let B = parseInt(A, 10);
        if (!isNaN(B) && B > 0) return Math.max(B, d11())
    }
    return Math.max(m48, d11())
}

function c48() {
    if (!((GB() || {}).includeCoAuthoredBy ?? !0)) return {
        commit: "",
        pr: ""
    };
    let Q = `\uD83E\uDD16 Generated with [Claude Code](${dLB})`;
    return {
        commit: `${Q}

   Co-Authored-By: Claude <noreply@anthropic.com>`,
        pr: Q
    }
}