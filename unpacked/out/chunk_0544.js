/* chunk:544 bytes:[12765482, 12785431) size:19949 source:unpacked-cli.js */
function ij6({
    message: A,
    args: B,
    onDone: Q
}) {
    return cP.useEffect(() => {
        let Z = setTimeout(Q, 0);
        return () => clearTimeout(Z)
    }, [Q]), cP.default.createElement(v, {
        flexDirection: "column"
    }, cP.default.createElement(T, {
        color: "secondaryText"
    }, "> /add-dir ", B), cP.default.createElement(OA, null, cP.default.createElement(T, null, A)))
}

function HZ1(A, B) {
    if (!A) return {
        resultType: "emptyPath"
    };
    let Q = bC0(A),
        Z = j1();
    if (!Z.existsSync(Q)) return {
        resultType: "pathNotFound",
        directoryPath: A,
        absolutePath: Q
    };
    if (!Z.statSync(Q).isDirectory()) return {
        resultType: "notADirectory",
        directoryPath: A,
        absolutePath: Q
    };
    let D = a61(B);
    for (let F of D)
        if (vs(Q, F)) return {
            resultType: "alreadyInWorkingDirectory",
            directoryPath: A,
            workingDir: F
        };
    let G = EZ1(B, Q, "session");
    return {
        resultType: "success",
        absolutePath: Q,
        updatedPermissionContext: G
    }
}

function zZ1(A) {
    switch (A.resultType) {
        case "emptyPath":
            return "Please provide a directory path.";
        case "pathNotFound":
            return `Path ${e1.bold(A.absolutePath)} was not found.`;
        case "notADirectory": {
            let B = pj6(A.absolutePath);
            return `${e1.bold(A.directoryPath)} is not a directory. Did you mean to add the parent directory ${e1.bold(B)}?`
        }
        case "alreadyInWorkingDirectory":
            return `${e1.bold(A.directoryPath)} is already accessible within the existing working directory ${e1.bold(A.workingDir)}.`;
        case "success":
            return `Added ${e1.bold(A.absolutePath)} as a working directory.`
    }
}
var nj6 = {
        type: "local-jsx",
        name: "add-dir",
        description: "Add a new working directory",
        argumentHint: "<path>",
        isEnabled: () => !0,
        isHidden: !1,
        async call(A, B, Q) {
            let Z = Q.trim(),
                D = HZ1(Z, B.getToolPermissionContext());
            if (D.resultType !== "success") {
                let G = zZ1(D);
                return cP.default.createElement(ij6, {
                    message: G,
                    args: Q,
                    onDone: () => A(G)
                })
            }
            return cP.default.createElement(nj1, {
                directoryPath: D.absolutePath,
                permissionContext: B.getToolPermissionContext(),
                setPermissionContext: B.setToolPermissionContext,
                onAddDirectory: (G, F) => {
                    B.setToolPermissionContext(D.updatedPermissionContext);
                    let I = `Added ${e1.bold(G)} as a working directory`;
                    if (F) try {
                        OK0(G, "localSettings"), I += " and saved to local settings"
                    } catch (Y) {
                        I += `. Failed to save to local settings: ${Y instanceof Error?Y.message:"Unknown error"}`
                    } else I += " for this session";
                    A(I)
                },
                onCancel: () => {
                    A(`Did not add ${e1.bold(D.absolutePath)} as a working directory.`)
                }
            })
        },
        userFacingName() {
            return "add-dir"
        }
    },
    N5B = nj6;
import {
    resolve as aj6
} from "path";

function sj6({
    processPwd: A,
    originalCwd: B
}) {
    let {
        resolvedPath: Q,
        isSymlink: Z
    } = XV(j1(), A);
    return Z ? Q === aj6(B) : !1
}

function L5B({
    permissionModeCli: A,
    dangerouslySkipPermissions: B
}) {
    let Q = GB() || {},
        Z = Q.permissions?.disableBypassPermissionsMode === "disable",
        D = [];
    if (B) D.push("bypassPermissions");
    if (A) D.push(deA(A));
    if (Q.permissions?.defaultMode) D.push(Q.permissions.defaultMode);
    for (let G of D)
        if (G === "bypassPermissions" && Z) {
            SA("bypassPermissions mode is disabled by settings");
            continue
        } else return G;
    return "default"
}

function Oe(A) {
    if (A.length === 0) return [];
    let B = [];
    for (let Q of A) {
        if (!Q) continue;
        let Z = "",
            D = !1;
        for (let G of Q) switch (G) {
            case "(":
                D = !0, Z += G;
                break;
            case ")":
                D = !1, Z += G;
                break;
            case ",":
                if (D) Z += G;
                else {
                    if (Z.trim()) B.push(Z.trim());
                    Z = ""
                }
                break;
            case " ":
                if (D) Z += G;
                else if (Z.trim()) B.push(Z.trim()), Z = "";
                break;
            default:
                Z += G
        }
        if (Z.trim()) B.push(Z.trim())
    }
    return B
}

function M5B({
    allowedToolsCli: A,
    disallowedToolsCli: B,
    permissionMode: Q,
    addDirs: Z
}) {
    let D = Oe(A),
        G = Oe(B),
        F = [],
        I = new Map,
        Y = process.env.PWD;
    if (Y && Y !== _9() && sj6({
            originalCwd: _9(),
            processPwd: Y
        })) I.set(Y, {
        path: Y,
        source: "session"
    });
    let W = Lq1({
            mode: Q,
            additionalWorkingDirectories: I,
            alwaysAllowRules: {
                cliArg: D
            },
            alwaysDenyRules: {
                cliArg: G
            },
            alwaysAskRules: {},
            isBypassPermissionsModeAvailable: Q === "bypassPermissions"
        }, Wq1()),
        X = [...(GB() || {}).permissions?.additionalDirectories || [], ...Z];
    for (let V of X) {
        let C = HZ1(V, W);
        if (C.resultType === "success") W = C.updatedPermissionContext;
        else if (C.resultType !== "alreadyInWorkingDirectory") F.push(zZ1(C))
    }
    return {
        toolPermissionContext: W,
        warnings: F
    }
}
import {
    join as TK0
} from "path";

function Te(A, B = "Custom item") {
    let Q = A.split(`
`);
    for (let Z of Q) {
        let D = Z.trim();
        if (D) {
            let F = D.match(/^#+\s+(.+)$/)?.[1] ?? D;
            return F.length > 100 ? F.substring(0, 97) + "..." : F
        }
    }
    return B
}

function R5B(A) {
    if (A === void 0 || A === null) return null;
    if (!A) return [];
    let B = [];
    if (typeof A === "string") B = [A];
    else if (Array.isArray(A)) B = A.filter((Z) => typeof Z === "string");
    if (B.length === 0) return [];
    let Q = Oe(B);
    if (Q.includes("*")) return ["*"];
    return Q
}

function aj1(A) {
    let B = R5B(A);
    if (B === null) return A === void 0 ? ["*"] : [];
    return B
}

function Pe(A) {
    let B = R5B(A);
    if (B === null) return [];
    return B
}
async function Se(A) {
    let B = Date.now(),
        Q = TK0(e9(), A),
        Z = TK0(t0(), ".claude", A),
        D = TK0(mg(), ".claude", A),
        [G, F, I] = await Promise.all([PK0(D).then((Y) => Y.map((W) => ({
            ...W,
            baseDir: D,
            source: "policySettings"
        }))), PK0(Q).then((Y) => Y.map((W) => ({
            ...W,
            baseDir: Q,
            source: "userSettings"
        }))), PK0(Z).then((Y) => Y.map((W) => ({
            ...W,
            baseDir: Z,
            source: "projectSettings"
        })))]);
    return X1("tengu_dir_search", {
        durationMs: Date.now() - B,
        managedFilesFound: G.length,
        userFilesFound: F.length,
        projectFilesFound: I.length,
        subdir: A
    }), [...G, ...F, ...I]
}
async function PK0(A) {
    let B = h4(),
        Q = setTimeout(() => B.abort(), 3000);
    try {
        return (j1().existsSync(A) ? await cy(["--files", "--hidden", "--follow", "--glob", "*.md"], A, B.signal) : []).map((D) => {
            try {
                let G = j1().readFileSync(D, {
                        encoding: "utf-8"
                    }),
                    {
                        frontmatter: F,
                        content: I
                    } = Sx(G);
                return {
                    filePath: D,
                    frontmatter: F,
                    content: I
                }
            } catch (G) {
                let F = G instanceof Error ? G.message : String(G);
                return n1(`Failed to read/parse markdown file:  ${D}: ${F}`), R1(G instanceof Error ? new Error(`Markdown read error: ${G.message}`) : new Error(`Markdown read error: ${String(G)}`)), null
            }
        }).filter((D) => D !== null)
    } finally {
        clearTimeout(Q)
    }
}
var SK0 = EA(async () => {
    try {
        return (await Se("output-styles")).map(({
            filePath: Q,
            frontmatter: Z,
            content: D,
            source: G
        }) => {
            try {
                let I = rj6(Q).replace(/\.md$/, ""),
                    Y = Z.name || I,
                    W = Z.description || Te(D, `Custom ${I} output style`);
                return {
                    name: Y,
                    description: W,
                    prompt: D.trim(),
                    source: G
                }
            } catch (F) {
                return R1(F instanceof Error ? F : new Error(String(F))), null
            }
        }).filter((Q) => Q !== null)
    } catch (A) {
        return R1(A instanceof Error ? A : new Error(String(A))), []
    }
});

function O5B() {
    SK0.cache?.clear?.()
}
var T5B = `
## Insights
In order to encourage learning, before and after writing code, always provide brief educational explanations about implementation choices using (with backticks):
"\`${s0.star} Insight ─────────────────────────────────────\`
[2-3 key educational points]
\`─────────────────────────────────────────────────\`"

These insights should be included in the conversation, not in the codebase. You should generally focus on interesting insights that are specific to the codebase or the code you just wrote, rather than general programming concepts.`,
    sV = "default",
    km = {
        [sV]: null,
        Explanatory: {
            name: "Explanatory",
            source: "built-in",
            description: "Claude explains its implementation choices and codebase patterns",
            isCodingRelated: !0,
            prompt: `You are an interactive CLI tool that helps users with software engineering tasks. In addition to software engineering tasks, you should provide educational insights about the codebase along the way.

You should be clear and educational, providing helpful explanations while remaining focused on the task. Balance educational content with task completion. When providing insights, you may exceed typical length constraints, but remain focused and relevant.

# Explanatory Style Active
${T5B}`
        },
        Learning: {
            name: "Learning",
            source: "built-in",
            description: "Claude pauses and asks you to write small pieces of code for hands-on practice",
            isCodingRelated: !0,
            prompt: `You are an interactive CLI tool that helps users with software engineering tasks. In addition to software engineering tasks, you should help users learn more about the codebase through hands-on practice and educational insights.

You should be collaborative and encouraging. Balance task completion with learning by requesting user input for meaningful design decisions while handling routine implementation yourself.   

# Learning Style Active
## Requesting Human Contributions
In order to encourage learning, ask the human to contribute 2-10 line code pieces when generating 20+ lines involving:
- Design decisions (error handling, data structures)
- Business logic with multiple valid approaches  
- Key algorithms or interface definitions

**TodoList Integration**: If using a TodoList for the overall task, include a specific todo item like "Request human input on [specific decision]" when planning to request human input. This ensures proper task tracking. Note: TodoList is not required for all tasks.

Example TodoList flow:
   ✓ "Set up component structure with placeholder for logic"
   ✓ "Request human collaboration on decision logic implementation"
   ✓ "Integrate contribution and complete feature"

### Request Format
\`\`\`
${s0.bullet} **Learn by Doing**
**Context:** [what's built and why this decision matters]
**Your Task:** [specific function/section in file, mention file and TODO(human) but do not include line numbers]
**Guidance:** [trade-offs and constraints to consider]
\`\`\`

### Key Guidelines
- Frame contributions as valuable design decisions, not busy work
- You must first add a TODO(human) section into the codebase with your editing tools before making the Learn by Doing request      
- Make sure there is one and only one TODO(human) section in the code
- Don't take any action or output anything after the Learn by Doing request. Wait for human implementation before proceeding.

### Example Requests

**Whole Function Example:**
\`\`\`
${s0.bullet} **Learn by Doing**

**Context:** I've set up the hint feature UI with a button that triggers the hint system. The infrastructure is ready: when clicked, it calls selectHintCell() to determine which cell to hint, then highlights that cell with a yellow background and shows possible values. The hint system needs to decide which empty cell would be most helpful to reveal to the user.

**Your Task:** In sudoku.js, implement the selectHintCell(board) function. Look for TODO(human). This function should analyze the board and return {row, col} for the best cell to hint, or null if the puzzle is complete.

**Guidance:** Consider multiple strategies: prioritize cells with only one possible value (naked singles), or cells that appear in rows/columns/boxes with many filled cells. You could also consider a balanced approach that helps without making it too easy. The board parameter is a 9x9 array where 0 represents empty cells.
\`\`\`

**Partial Function Example:**
\`\`\`
${s0.bullet} **Learn by Doing**

**Context:** I've built a file upload component that validates files before accepting them. The main validation logic is complete, but it needs specific handling for different file type categories in the switch statement.

**Your Task:** In upload.js, inside the validateFile() function's switch statement, implement the 'case "document":' branch. Look for TODO(human). This should validate document files (pdf, doc, docx).

**Guidance:** Consider checking file size limits (maybe 10MB for documents?), validating the file extension matches the MIME type, and returning {valid: boolean, error?: string}. The file object has properties: name, size, type.
\`\`\`

**Debugging Example:**
\`\`\`
${s0.bullet} **Learn by Doing**

**Context:** The user reported that number inputs aren't working correctly in the calculator. I've identified the handleInput() function as the likely source, but need to understand what values are being processed.

**Your Task:** In calculator.js, inside the handleInput() function, add 2-3 console.log statements after the TODO(human) comment to help debug why number inputs fail.

**Guidance:** Consider logging: the raw input value, the parsed result, and any validation state. This will help us understand where the conversion breaks.
\`\`\`

### After Contributions
Share one insight connecting their code to broader patterns or system effects. Avoid praise or repetition.

## Insights
${T5B}`
        }
    };
async function UZ1() {
    let A = await SK0(),
        B = {
            ...km
        },
        Q = A.filter((F) => F.source === "policySettings"),
        Z = A.filter((F) => F.source === "userSettings"),
        D = A.filter((F) => F.source === "projectSettings"),
        G = [Z, D, Q];
    for (let F of G)
        for (let I of F) B[I.name] = {
            name: I.name,
            description: I.description,
            prompt: I.prompt,
            source: I.source
        };
    return B
}
async function P5B() {
    let B = GB()?.outputStyle || sV;
    return (await UZ1())[B] ?? null
}

function $Q(A, B, Q, Z, D) {
    if (Z === "m") throw new TypeError("Private method is not writable");
    if (Z === "a" && !D) throw new TypeError("Private accessor was defined without a setter");
    if (typeof B === "function" ? A !== B || !D : !B.has(A)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return Z === "a" ? D.call(A, Q) : D ? D.value = Q : B.set(A, Q), Q
}

function _A(A, B, Q, Z) {
    if (Q === "a" && !Z) throw new TypeError("Private accessor was defined without a getter");
    if (typeof B === "function" ? A !== B || !Z : !B.has(A)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return Q === "m" ? Z : Q === "a" ? Z.call(A) : Z ? Z.value : B.get(A)
}
var jK0 = function() {
    let {
        crypto: A
    } = globalThis;
    if (A?.randomUUID) return jK0 = A.randomUUID.bind(A), A.randomUUID();
    let B = new Uint8Array(1),
        Q = A ? () => A.getRandomValues(B)[0] : () => Math.random() * 255 & 255;
    return "10000000-1000-4000-8000-100000000000".replace(/[018]/g, (Z) => (+Z ^ Q() & 15 >> +Z / 4).toString(16))
};

function lP(A) {
    return typeof A === "object" && A !== null && (("name" in A) && A.name === "AbortError" || ("message" in A) && String(A.message).includes("FetchRequestCanceledException"))
}
var wZ1 = (A) => {
    if (A instanceof Error) return A;
    if (typeof A === "object" && A !== null) {
        try {
            if (Object.prototype.toString.call(A) === "[object Error]") {
                let B = new Error(A.message, A.cause ? {
                    cause: A.cause
                } : {});
                if (A.stack) B.stack = A.stack;
                if (A.cause && !B.cause) B.cause = A.cause;
                if (A.name) B.name = A.name;
                return B
            }
        } catch {}
        try {
            return new Error(JSON.stringify(A))
        } catch {}
    }
    return new Error(A)
};
class P9 extends Error {}
class D6 extends P9 {
    constructor(A, B, Q, Z) {
        super(`${D6.makeMessage(A,B,Q)}`);
        this.status = A, this.headers = Z, this.requestID = Z?.get("request-id"), this.error = B
    }
    static makeMessage(A, B, Q) {
        let Z = B?.message ? typeof B.message === "string" ? B.message : JSON.stringify(B.message) : B ? JSON.stringify(B) : Q;
        if (A && Z) return `${A} ${Z}`;
        if (A) return `${A} status code (no body)`;
        if (Z) return Z;
        return "(no status code or body)"
    }
    static generate(A, B, Q, Z) {
        if (!A || !Z) return new pP({
            message: Q,
            cause: wZ1(B)
        });
        let D = B;
        if (A === 400) return new qZ1(A, D, Q, Z);
        if (A === 401) return new NZ1(A, D, Q, Z);
        if (A === 403) return new LZ1(A, D, Q, Z);
        if (A === 404) return new MZ1(A, D, Q, Z);
        if (A === 409) return new RZ1(A, D, Q, Z);
        if (A === 422) return new OZ1(A, D, Q, Z);
        if (A === 429) return new TZ1(A, D, Q, Z);
        if (A >= 500) return new PZ1(A, D, Q, Z);
        return new D6(A, D, Q, Z)
    }
}
class xF extends D6 {
    constructor({
        message: A
    } = {}) {
        super(void 0, void 0, A || "Request was aborted.", void 0)
    }
}
class pP extends D6 {
    constructor({
        message: A,
        cause: B
    }) {
        super(void 0, void 0, A || "Connection error.", void 0);
        if (B) this.cause = B
    }
}