/* chunk:513 bytes:[12169502, 12189560) size:20058 source:unpacked-cli.js */
var A40 = async () => {
    let {
        stdout: A
    } = await F2("git", ["rev-parse", "HEAD"]);
    return A.trim()
}, Qq1 = async () => {
    let {
        stdout: A
    } = await F2("git", ["rev-parse", "--abbrev-ref", "HEAD"], {
        preserveOutputOnError: !1
    });
    return A.trim()
}, IeA = async () => {
    let {
        stdout: A,
        code: B
    } = await F2("git", ["symbolic-ref", "refs/remotes/origin/HEAD"], {
        preserveOutputOnError: !1
    });
    if (B === 0) {
        let D = A.trim().match(/refs\/remotes\/origin\/(.+)/);
        if (D && D[1]) return D[1]
    }
    let {
        stdout: Q,
        code: Z
    } = await F2("git", ["branch", "-r"], {
        preserveOutputOnError: !1
    });
    if (Z === 0) {
        let D = Q.trim().split(`
`).map((G) => G.trim());
        for (let G of ["main", "master"])
            if (D.some((F) => F.includes(`origin/${G}`))) return G
    }
    return "main"
}, j61 = async () => {
    let {
        stdout: A,
        code: B
    } = await F2("git", ["remote", "get-url", "origin"], {
        preserveOutputOnError: !1
    });
    return B === 0 ? A.trim() : null
}, jZ4 = async () => {
    let {
        code: A
    } = await F2("git", ["rev-parse", "@{u}"], {
        preserveOutputOnError: !1
    });
    return A === 0
}, Zq1 = async () => {
    let {
        stdout: A
    } = await F2("git", ["status", "--porcelain"], {
        preserveOutputOnError: !1
    });
    return A.trim().length === 0
};
var B40 = async () => {
    let {
        stdout: A
    } = await F2("git", ["status", "--porcelain"], {
        preserveOutputOnError: !1
    }), B = [], Q = [];
    return A.trim().split(`
`).filter((Z) => Z.length > 0).forEach((Z) => {
        let D = Z.substring(0, 2),
            G = Z.substring(2).trim();
        if (D === "??") Q.push(G);
        else if (G) B.push(G)
    }), {
        tracked: B,
        untracked: Q
    }
}, k61 = async () => {
    try {
        let {
            stdout: A,
            code: B
        } = await F2("git", ["worktree", "list"], {
            preserveOutputOnError: !1
        });
        if (B !== 0) return 0;
        return A.trim().split(`
`).length
    } catch (A) {
        return 0
    }
}, YeA = async (A) => {
    try {
        let B = A || `Claude Code auto-stash - ${new Date().toISOString()}`,
            {
                untracked: Q
            } = await B40();
        if (Q.length > 0) {
            let {
                code: D
            } = await F2("git", ["add", ...Q], {
                preserveOutputOnError: !1
            });
            if (D !== 0) return !1
        }
        let {
            code: Z
        } = await F2("git", ["stash", "push", "--message", B], {
            preserveOutputOnError: !1
        });
        return Z === 0
    } catch (B) {
        return !1
    }
};
async function WeA() {
    try {
        let [A, B, Q, Z, D, G] = await Promise.all([A40(), Qq1(), j61(), jZ4(), Zq1(), k61()]);
        return {
            commitHash: A,
            branchName: B,
            remoteUrl: Q,
            isHeadOnRemote: Z,
            isClean: D,
            worktreeCount: G
        }
    } catch (A) {
        return null
    }
}
var y61 = t0();

function _61() {
    return Cs(e9(), "projects")
}

function Dq1() {
    return JeA(CB())
}

function JeA(A) {
    let B = CL(y61);
    return Cs(B, `${A}.jsonl`)
}

function XeA(A) {
    let B = CL(y61),
        Q = Cs(B, `${A}.jsonl`),
        Z = j1();
    try {
        return Z.statSync(Q), !0
    } catch {
        return !1
    }
}

function yZ4() {
    return "production"
}

function VeA() {
    return "external"
}

function CL(A) {
    return Cs(_61(), A.replace(/[^a-zA-Z0-9]/g, "-"))
}
var Q40 = null;

function VL() {
    if (!Q40) Q40 = new CeA;
    return Q40
}
class CeA {
    summaries;
    messages;
    checkpoints;
    bookmarks;
    didLoad = !1;
    sessionFile = null;
    constructor() {
        this.summaries = new Map, this.messages = new Map, this.checkpoints = new Map, this.bookmarks = new Map
    }
    async insertMessageChain(A, B = !1) {
        let Q = null,
            Z;
        try {
            Z = await Qq1()
        } catch {
            Z = void 0
        }
        for (let D of A) {
            let G = {
                parentUuid: Q,
                isSidechain: B,
                userType: VeA(),
                cwd: t0(),
                sessionId: CB(),
                version: {
                    ISSUES_EXPLAINER: "report the issue at https://github.com/anthropics/claude-code/issues",
                    PACKAGE_URL: "@anthropic-ai/claude-code",
                    README_URL: "https://docs.anthropic.com/s/claude-code",
                    VERSION: "1.0.83"
                }.VERSION,
                gitBranch: Z,
                ...D
            };
            this.messages.set(D.uuid, G), await this.appendEntry(G), Q = D.uuid
        }
    }
    async insertCheckpoint(A) {
        let B = CB(),
            Q = {
                type: "checkpoint",
                sessionId: B,
                commit: A.commit,
                timestamp: A.timestamp.toISOString(),
                label: A.label,
                id: A.id
            };
        if (!this.checkpoints.has(B)) this.checkpoints.set(B, []);
        this.checkpoints.get(B)?.push(Q), await this.appendEntry(Q)
    }
    async insertBookmark(A, B) {
        let Q = {
            type: "bookmark",
            sessionId: A,
            timestamp: new Date().toISOString(),
            isBookmarked: B
        };
        this.bookmarks.set(A, Q), await this.appendEntry(Q)
    }
    async appendEntry(A) {
        if (yZ4() === "test" || GB()?.cleanupPeriodDays === 0) return;
        let B = j1();
        if (this.sessionFile === null) {
            let Z = CL(y61);
            try {
                B.statSync(Z)
            } catch {
                B.mkdirSync(Z)
            }
            this.sessionFile = Dq1();
            try {
                B.statSync(this.sessionFile)
            } catch {
                B.writeFileSync(this.sessionFile, "", {
                    encoding: "utf8",
                    flush: !0
                })
            }
        }
        if (this.sessionFile !== null) try {
            B.statSync(this.sessionFile)
        } catch {
            let Z = CL(y61);
            try {
                B.statSync(Z)
            } catch {
                B.mkdirSync(Z)
            }
            B.writeFileSync(this.sessionFile, "", {
                encoding: "utf8",
                flush: !0
            })
        }
        let Q = CB();
        if (A.type === "summary" || A.type === "bookmark") B.appendFileSync(this.sessionFile, JSON.stringify(A) + `
`);
        else {
            let {
                messageSet: Z,
                checkpointSet: D
            } = await vZ4(Q);
            if (A.type === "checkpoint") {
                if (A.id && !D.has(A.id)) B.appendFileSync(this.sessionFile, JSON.stringify(A) + `
`), D.add(A.id)
            } else if (!Z.has(A.uuid)) B.appendFileSync(this.sessionFile, JSON.stringify(A) + `
`), Z.add(A.uuid)
        }
    }
    async getAllTranscripts() {
        await this.loadAllSessions();
        let A = [...this.messages.values()],
            B = new Set(A.map((Q) => Q.parentUuid));
        return A.filter((Q) => !B.has(Q.uuid)).map((Q) => this.getTranscript(Q)).filter((Q) => Q.length)
    }
    getTranscript(A) {
        let B = [],
            Q = A;
        while (Q) B.unshift(Q), Q = Q.parentUuid ? this.messages.get(Q.parentUuid) : void 0;
        return B
    }
    async getLastLog(A) {
        let {
            messages: B
        } = await G40(A);
        if (B.size === 0) return null;
        let Z = Array.from(B.values()).sort((F, I) => new Date(I.timestamp).getTime() - new Date(F.timestamp).getTime())[0];
        if (!Z) return null;
        let D = [],
            G = Z;
        while (G) D.unshift(G), G = G.parentUuid ? B.get(G.parentUuid) : void 0;
        return D
    }
    getAllCheckpoints(A) {
        let B = new Map,
            Q = A[A.length - 1]?.sessionId;
        if (Q) {
            let Z = this.checkpoints.get(Q)?.values() || [];
            for (let D of Z) {
                let G = D.id ?? D.commit;
                if (G) B.set(G, D)
            }
        }
        return Array.from(B.values())
    }
    getBookmarkStatus(A) {
        return this.bookmarks.get(A)?.isBookmarked ?? !1
    }
    loadAllSessions = EA(async () => {
        let A = CL(y61),
            B = j1();
        if (this.didLoad) return this;
        try {
            B.statSync(A)
        } catch {
            return this
        }
        let Z = B.readdirSync(A).filter((G) => G.isFile() && G.name.endsWith(".jsonl")).map((G) => Cs(A, G.name)),
            D = await Promise.all(Z.sort((G, F) => {
                let I = B.statSync(G),
                    Y = B.statSync(F);
                return I.mtime.getTime() - Y.mtime.getTime()
            }).map(async (G) => {
                let F = VK(kZ4(G, ".jsonl"));
                if (!F) return {
                    sessionId: F,
                    sessionMessages: new Set
                };
                let I = new Map,
                    Y = new Map,
                    W = new Map,
                    J;
                try {
                    await B.stat(G);
                    for (let X of await eQ0(G))
                        if (X.type === "user" || X.type === "assistant" || X.type === "attachment" || X.type === "system") I.set(X.uuid, X);
                        else if (X.type === "summary" && X.leafUuid) Y.set(X.leafUuid, X.summary);
                    else if (X.type === "checkpoint") {
                        let V = X.id ?? X.commit;
                        if (V) W.set(V, X)
                    } else if (X.type === "bookmark") J = X
                } catch {}
                return {
                    sessionId: F,
                    sessionMessages: I,
                    summaries: Y,
                    checkpoints: W,
                    bookmarkStatus: J
                }
            }));
        for (let {
                sessionId: G,
                sessionMessages: F,
                summaries: I,
                checkpoints: Y,
                bookmarkStatus: W
            }
            of D) {
            if (!G) continue;
            for (let [J, X] of F.entries()) this.messages.set(J, X);
            for (let [J, X] of I.entries()) this.summaries.set(J, X);
            if (this.checkpoints.set(G, Array.from(Y.values())), W) this.bookmarks.set(G, W)
        }
        return this.didLoad = !0, this
    })
}
async function Gq1(A) {
    let B = $eA(A);
    return await VL().insertMessageChain(B), B[B.length - 1]?.uuid || null
}
async function KeA(A) {
    await VL().insertMessageChain($eA(A), !0)
}
async function Z40(A) {
    await VL().insertCheckpoint(A)
}
async function HeA() {
    let A = VL();
    A.sessionFile = Dq1()
}

function _Z4(A) {
    let B = A.find((D) => D.type === "user");
    if (!B || B.type !== "user") return "No prompt";
    let Q = B.message?.content,
        Z = "";
    if (typeof Q === "string") Z = Q;
    else if (Array.isArray(Q)) Z = Q.find((G) => G.type === "text")?.text || "No prompt";
    else Z = "No prompt";
    if (Z = Z.replace(/\n/g, " ").trim(), Z.length > 45) Z = Z.slice(0, 45) + "...";
    return Z
}

function xZ4(A) {
    return A.map((B) => {
        let {
            isSidechain: Q,
            parentUuid: Z,
            ...D
        } = B;
        return D
    })
}

function zeA(A, B = 0, Q, Z, D) {
    let G = A[A.length - 1],
        F = A[0],
        I = _Z4(A),
        Y = new Date(F.timestamp),
        W = new Date(G.timestamp),
        J = Z?.map((X) => ({
            id: X.id ?? "unavailable",
            commit: X.commit,
            timestamp: new Date(X.timestamp),
            label: X.label
        }));
    return {
        date: G.timestamp,
        messages: xZ4(A),
        fullPath: "n/a",
        value: B,
        created: Y,
        modified: W,
        firstPrompt: I,
        messageCount: A.length,
        isSidechain: F.isSidechain,
        leafUuid: G.uuid,
        summary: Q,
        checkpoints: J,
        gitBranch: G.gitBranch,
        isBookmarked: D
    }
}
async function EeA() {
    let A = await VL().getAllTranscripts(),
        B = VL().summaries;
    return A.map((Q, Z) => {
        let D = Q[Q.length - 1],
            G = D ? B.get(D.uuid) : void 0,
            F = D ? VL().getAllCheckpoints(Q) : void 0,
            I = D?.sessionId,
            Y = I ? VL().getBookmarkStatus(I) : !1;
        return zeA(Q, Z, G, F, Y)
    }).sort((Q, Z) => {
        return Z.modified.getTime() - Q.modified.getTime()
    })
}
async function UeA(A, B) {
    await VL().appendEntry({
        type: "summary",
        summary: B,
        leafUuid: A
    })
}
async function D40(A) {
    let B = new Map,
        Q = new Map,
        Z = new Map;
    try {
        let D = await eQ0(A);
        for (let G of D)
            if (G.type === "user" || G.type === "assistant" || G.type === "attachment" || G.type === "system") B.set(G.uuid, G);
            else if (G.type === "summary" && G.leafUuid) Q.set(G.leafUuid, G.summary);
        else if (G.type === "checkpoint") {
            let F = G.id ?? G.commit;
            if (F) Z.set(F, G)
        }
    } catch {}
    return {
        messages: B,
        summaries: Q,
        checkpoints: Z
    }
}
async function G40(A) {
    let B = Cs(CL(t0()), `${A}.jsonl`);
    return D40(B)
}
var vZ4 = EA(async (A) => {
    let {
        messages: B,
        checkpoints: Q
    } = await G40(A);
    return {
        messageSet: new Set(B.keys()),
        checkpointSet: new Set(Q.keys())
    }
}, (A) => A);
async function weA(A) {
    let B = await VL().getLastLog(A);
    if (B !== null && B !== void 0) {
        let Q = B[B.length - 1],
            {
                summaries: Z,
                checkpoints: D
            } = await G40(A),
            G = Q ? Z.get(Q.uuid) : void 0;
        return zeA(B, 0, G, Array.from(D.values()))
    }
    return null
}

function $eA(A) {
    return A.filter((B) => {
        if (B.type === "progress") return !1;
        if (B.type === "attachment" && VeA() !== "ant") return !1;
        return !0
    })
}
class $T extends Error {}
class tJ extends Error {
    constructor(A) {
        super(A);
        this.name = "AbortError"
    }
}
class Rg extends Error {
    filePath;
    defaultConfig;
    constructor(A, B, Q) {
        super(A);
        this.name = "ConfigParseError", this.filePath = B, this.defaultConfig = Q
    }
}
class KL extends Error {
    stdout;
    stderr;
    code;
    interrupted;
    constructor(A, B, Q, Z) {
        super("Shell command failed");
        this.stdout = A;
        this.stderr = B;
        this.code = Q;
        this.interrupted = Z;
        this.name = "ShellError"
    }
}
class kY extends Error {
    formattedMessage;
    constructor(A, B) {
        super(A);
        this.formattedMessage = B;
        this.name = "TeleportOperationError"
    }
}

function x61(A, B) {
    return A instanceof Error && A.message === B
}
var uw = ["userSettings", "projectSettings", "localSettings", "flagSettings", "policySettings"];

function Fq1(A) {
    switch (A) {
        case "userSettings":
            return "project, gitignored";
        case "projectSettings":
            return "project";
        case "localSettings":
            return "user";
        case "flagSettings":
            return "cli flag";
        case "policySettings":
            return "managed"
    }
}
var qeA = "https://json.schemastore.org/claude-code-settings.json";
var bZ4 = new Set(["pdf"]),
    NeA = 33554432;

function Ks() {
    return DZ() === "firstParty"
}

function Iq1(A) {
    let B = A.startsWith(".") ? A.slice(1) : A;
    return bZ4.has(B.toLowerCase())
}
async function LeA(A) {
    let B = j1(),
        Z = B.statSync(A).size;
    if (Z === 0) throw new Error(`PDF file is empty: ${A}`);
    if (Z > NeA) throw new Error(`PDF file size (${yY(Z)}) exceeds maximum allowed size (${yY(NeA)}). PDF files must be less than 32MB.`);
    let G = B.readFileBytesSync(A).toString("base64");
    return {
        type: "pdf",
        file: {
            filePath: A,
            base64: G,
            originalSize: Z
        }
    }
}
var QG = "Read",
    v61 = 2000,
    fZ4 = 2000,
    MeA = "Read a file from the local filesystem.",
    ReA = `Reads a file from the local filesystem. You can access any file directly by using this tool.
Assume this tool is able to read all files on the machine. If the User provides a path to a file assume that path is valid. It is okay to read a file that does not exist; an error will be returned.

Usage:
- The file_path parameter must be an absolute path, not a relative path
- By default, it reads up to ${v61} lines starting from the beginning of the file
- You can optionally specify a line offset and limit (especially handy for long files), but it's recommended to read the whole file by not providing these parameters
- Any lines longer than ${fZ4} characters will be truncated
- Results are returned using cat -n format, with line numbers starting at 1
- This tool allows Claude Code to read images (eg PNG, JPG, etc). When reading an image file the contents are presented visually as Claude Code is a multimodal LLM.${Ks()?`
- This tool can read PDF files (.pdf). PDFs are processed page by page, extracting both text and visual content for analysis.`:""}
- This tool can read Jupyter notebooks (.ipynb files) and returns all cells with their outputs, combining code, text, and visualizations.
- You have the capability to call multiple tools in a single response. It is always better to speculatively read multiple files as a batch that are potentially useful. 
- You will regularly be asked to read screenshots. If the user provides a path to a screenshot ALWAYS use this tool to view the file at the path. This tool will work with all temporary file paths like /var/folders/123/abc/T/TemporaryItems/NSIRD_screencaptureui_ZfB1tD/Screenshot.png
- If you read a file that exists but has empty contents you will receive a system reminder warning in place of file contents.`;
var hZ4 = ["allow", "deny", "ask"];

function gZ4(A, B) {
    if (!A || !A.permissions) return [];
    let {
        permissions: Q
    } = A, Z = [];
    for (let D of hZ4) {
        let G = Q[D];
        if (G)
            for (let F of G) Z.push({
                source: B,
                ruleBehavior: D,
                ruleValue: CK(F)
            })
    }
    return Z
}

function uZ4(A, B) {
    if (!A.allowedTools || A.allowedTools.length < 1) return [];
    let Q = new Set;
    for (let D of B)
        if (D.ruleBehavior === "allow" && D.source === "localSettings") Q.add(r8(D.ruleValue));
    let Z = new Set;
    for (let D of A.allowedTools)
        if (!Q.has(D)) Z.add(D);
    return Array.from(Z)
}

function mZ4(A, B) {
    if (!A.ignorePatterns || A.ignorePatterns.length < 1) return [];
    let Q = new Set;
    for (let D of B)
        if (D.ruleBehavior === "deny" && D.source === "localSettings" && D.ruleValue.toolName === QG && D.ruleValue.ruleContent !== void 0) Q.add(D.ruleValue.ruleContent);
    let Z = new Set;
    for (let D of A.ignorePatterns)
        if (!Q.has(D)) Z.add(D);
    return Array.from(Z).map((D) => ({
        toolName: QG,
        ruleContent: D
    }))
}

function OeA() {
    let A = UQ();
    if (!A.allowedTools && !A.ignorePatterns) return;
    let B = {
            ...A
        },
        Q = uZ4(A, py("localSettings"));
    if (Q.length > 0) Yq1({
        ruleValues: Q.map(CK),
        ruleBehavior: "allow"
    }, "localSettings");
    B.allowedTools = [];
    let Z = mZ4(A, py("localSettings"));
    if (Z.length > 0) Yq1({
        ruleValues: Z,
        ruleBehavior: "deny"
    }, "localSettings");
    delete B.ignorePatterns, r5(B)
}