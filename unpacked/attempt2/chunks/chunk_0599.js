/* chunk:599 bytes:[13795500, 13815211) size:19711 source:unpacked-cli.js */
var vI = {
    name: VS,
    async description(A) {
        let {
            url: B
        } = A;
        try {
            return `Claude wants to fetch content from ${new URL(B).hostname}`
        } catch {
            return "Claude wants to fetch content from this URL"
        }
    },
    userFacingName() {
        return "Fetch"
    },
    isEnabled() {
        return !0
    },
    inputSchema: Vz8,
    isConcurrencySafe() {
        return !0
    },
    isReadOnly() {
        return !0
    },
    async checkPermissions(A, B) {
        let Q = B.getToolPermissionContext(),
            Z = Cz8(A),
            D = fz(Q, vI, "deny").get(Z);
        if (D) return {
            behavior: "deny",
            message: `${vI.name} denied access to ${Z}.`,
            decisionReason: {
                type: "rule",
                rule: D
            }
        };
        let G = fz(Q, vI, "ask").get(Z);
        if (G) return {
            behavior: "ask",
            message: `Claude requested permissions to use ${vI.name}, but you haven't granted it yet.`,
            decisionReason: {
                type: "rule",
                rule: G
            }
        };
        let F = fz(Q, vI, "allow").get(Z);
        if (F) return {
            behavior: "allow",
            updatedInput: A,
            decisionReason: {
                type: "rule",
                rule: F
            }
        };
        return {
            behavior: "ask",
            message: `Claude requested permissions to use ${vI.name}, but you haven't granted it yet.`
        }
    },
    async prompt() {
        return _LB
    },
    async validateInput(A) {
        let {
            url: B
        } = A;
        try {
            new URL(B)
        } catch {
            return {
                result: !1,
                message: `Error: Invalid URL "${B}". The URL provided could not be parsed.`,
                meta: {
                    reason: "invalid_url"
                },
                errorCode: 1
            }
        }
        return {
            result: !0
        }
    },
    renderToolUseMessage({
        url: A,
        prompt: B
    }, {
        verbose: Q
    }) {
        if (!A) return null;
        if (Q) return `url: "${A}"${Q&&B?`, prompt: "${B}"`:""}`;
        return A
    },
    renderToolUseRejectedMessage() {
        return KC.default.createElement(P5, null)
    },
    renderToolUseErrorMessage(A, {
        verbose: B
    }) {
        return KC.default.createElement(f6, {
            result: A,
            verbose: B
        })
    },
    renderToolUseProgressMessage() {
        return KC.default.createElement(OA, {
            height: 1
        }, KC.default.createElement(T, {
            color: "secondaryText"
        }, "Fetching…"))
    },
    renderToolResultMessage({
        bytes: A,
        code: B,
        codeText: Q,
        result: Z
    }, D, {
        verbose: G
    }) {
        let F = yY(A);
        if (G) return KC.default.createElement(v, {
            flexDirection: "column"
        }, KC.default.createElement(OA, {
            height: 1
        }, KC.default.createElement(T, null, "Received ", KC.default.createElement(T, {
            bold: !0
        }, F), " (", B, " ", Q, ")")), KC.default.createElement(v, {
            flexDirection: "column"
        }, KC.default.createElement(T, null, Z)));
        return KC.default.createElement(OA, {
            height: 1
        }, KC.default.createElement(T, null, "Received ", KC.default.createElement(T, {
            bold: !0
        }, F), " (", B, " ", Q, ")"))
    },
    async * call({
        url: A,
        prompt: B
    }, {
        abortController: Q,
        options: {
            isNonInteractiveSession: Z
        }
    }) {
        let D = Date.now(),
            G = await ovB(A, Q);
        if ("type" in G && G.type === "redirect") {
            let V = G.statusCode === 301 ? "Moved Permanently" : G.statusCode === 308 ? "Permanent Redirect" : G.statusCode === 307 ? "Temporary Redirect" : "Found",
                C = `REDIRECT DETECTED: The URL redirects to a different host.

Original URL: ${G.originalUrl}
Redirect URL: ${G.redirectUrl}
Status: ${G.statusCode} ${V}

To complete your request, I need to fetch content from the redirected URL. Please use WebFetch again with these parameters:
- url: "${G.redirectUrl}"
- prompt: "${B}"`;
            yield {
                type: "result",
                data: {
                    bytes: Buffer.byteLength(C),
                    code: G.statusCode,
                    codeText: V,
                    result: C,
                    durationMs: Date.now() - D,
                    url: A
                }
            };
            return
        }
        let {
            content: F,
            bytes: I,
            code: Y,
            codeText: W
        } = G, J = await tvB(B, F, Q.signal, Z);
        yield {
            type: "result",
            data: {
                bytes: I,
                code: Y,
                codeText: W,
                result: J,
                durationMs: Date.now() - D,
                url: A
            }
        }
    },
    mapToolResultToToolResultBlockParam({
        result: A
    }, B) {
        return {
            tool_use_id: B,
            type: "tool_result",
            content: A
        }
    }
};
var KU = G1(z1(), 1);

function Kz8(A) {
    try {
        let B = vI.inputSchema.safeParse(A);
        if (!B.success) return `input:${A.toString()}`;
        let {
            url: Q
        } = B.data;
        return `domain:${new URL(Q).hostname}`
    } catch {
        return `input:${A.toString()}`
    }
}

function evB({
    setToolPermissionContext: A,
    toolUseConfirm: B,
    onDone: Q,
    onReject: Z,
    verbose: D
}) {
    let [G] = fB(), {
        url: F
    } = B.input, I = new URL(F).hostname, Y = KU.useMemo(() => ({
        completion_type: "tool_use_single",
        language_name: "none"
    }), []);
    sv(B, Y);
    let W = [{
        label: "Yes",
        value: "yes"
    }, {
        label: `Yes, and don't ask again for ${e1.bold(I)}`,
        value: "yes-dont-ask-again-domain"
    }, {
        label: `No, and tell Claude what to do differently (${e1.bold.dim("esc")})`,
        value: "no"
    }];

    function J(X) {
        switch (X) {
            case "yes":
                dP("tool_use_single", B, "accept"), B.onAllow("temporary", B.input), Q();
                break;
            case "yes-dont-ask-again-domain":
                dP("tool_use_single", B, "accept"), Nq1({
                    rule: {
                        ruleBehavior: "allow",
                        ruleValue: {
                            toolName: B.tool.name,
                            ruleContent: Kz8(B.input)
                        },
                        source: "localSettings"
                    },
                    initialContext: B.toolUseContext.getToolPermissionContext(),
                    setToolPermissionContext: A
                }).then(() => {
                    B.onAllow("permanent", B.input), Q()
                });
                break;
            case "no":
                dP("tool_use_single", B, "reject"), B.onReject(), Z(), Q();
                break
        }
    }
    return KU.default.createElement(v, {
        flexDirection: "column",
        borderStyle: "round",
        borderColor: "permission",
        marginTop: 1,
        paddingLeft: 1,
        paddingRight: 1,
        paddingBottom: 1
    }, KU.default.createElement(AR, {
        title: "Fetch"
    }), KU.default.createElement(v, {
        flexDirection: "column",
        paddingX: 2,
        paddingY: 1
    }, KU.default.createElement(T, null, vI.renderToolUseMessage(B.input, {
        theme: G,
        verbose: D
    })), KU.default.createElement(T, {
        color: "secondaryText"
    }, B.description)), KU.default.createElement(v, {
        flexDirection: "column"
    }, KU.default.createElement(rv, {
        permissionResult: B.permissionResult,
        toolType: "tool"
    }), KU.default.createElement(T, null, "Do you want to allow Claude to fetch this content?"), KU.default.createElement(uA, {
        options: W,
        onChange: J,
        onCancel: () => J("no")
    })))
}
var eF1 = G1(z1(), 1);
import {
    basename as zz8
} from "path";
var f7 = G1(z1(), 1),
    p01 = G1(z1(), 1);
import {
    relative as Hz8
} from "path";

function AbB({
    notebook_path: A,
    cell_id: B,
    new_source: Q,
    cell_type: Z,
    edit_mode: D = "replace",
    verbose: G,
    width: F
}) {
    let I = p01.useMemo(() => j1().existsSync(A), [A]),
        Y = p01.useMemo(() => {
            if (!I) return null;
            try {
                let C = AX(A);
                return T7(C)
            } catch (C) {
                return null
            }
        }, [A, I]),
        W = p01.useMemo(() => {
            if (!Y || !B) return "";
            let C = hG1(B);
            if (C !== void 0) {
                if (Y.cells[C]) {
                    let H = Y.cells[C].source;
                    return Array.isArray(H) ? H.join("") : H
                }
                return ""
            }
            let K = Y.cells.find((H) => H.id === B);
            if (!K) return "";
            return Array.isArray(K.source) ? K.source.join("") : K.source
        }, [Y, B]),
        J = p01.useMemo(() => {
            if (!Y || !Y.metadata.language_info) return "python";
            return Y.metadata.language_info.name || "python"
        }, [Y]),
        X = p01.useMemo(() => {
            if (!I || D === "insert" || D === "delete") return null;
            return QU({
                filePath: A,
                fileContents: W,
                edits: [{
                    old_string: W,
                    new_string: Q,
                    replace_all: !1
                }],
                ignoreWhitespace: !1
            })
        }, [I, A, W, Q, D]),
        V;
    switch (D) {
        case "insert":
            V = "Insert new cell";
            break;
        case "delete":
            V = "Delete cell";
            break;
        default:
            V = "Replace cell contents"
    }
    return f7.createElement(v, {
        flexDirection: "column"
    }, f7.createElement(v, {
        borderColor: "secondaryBorder",
        borderStyle: "round",
        flexDirection: "column",
        paddingX: 1
    }, f7.createElement(v, {
        paddingBottom: 1,
        flexDirection: "column"
    }, f7.createElement(T, {
        bold: !0
    }, G ? A : Hz8(t0(), A)), f7.createElement(T, {
        color: "secondaryText"
    }, V, " for cell ", B, Z ? ` (${Z})` : "")), D === "delete" ? f7.createElement(v, {
        flexDirection: "column",
        paddingLeft: 2
    }, f7.createElement(YC, {
        code: W,
        language: J
    })) : D === "insert" ? f7.createElement(v, {
        flexDirection: "column",
        paddingLeft: 2
    }, f7.createElement(YC, {
        code: Q,
        language: Z === "markdown" ? "markdown" : J
    })) : X ? WC(X.map((C) => f7.createElement(JC, {
        key: C.newStart,
        patch: C,
        dim: !1,
        width: F
    })), (C) => f7.createElement(T, {
        color: "secondaryText",
        key: `ellipsis-${C}`
    }, "...")) : f7.createElement(YC, {
        code: Q,
        language: Z === "markdown" ? "markdown" : J
    })))
}

function BbB(A) {
    let B = (Y) => {
            let W = QR.inputSchema.safeParse(Y);
            if (!W.success) return R1(new Error(`Failed to parse notebook edit input: ${W.error.message}`)), {
                notebook_path: "",
                new_source: "",
                cell_id: ""
            };
            return W.data
        },
        Q = B(A.toolUseConfirm.input),
        {
            notebook_path: Z,
            edit_mode: D,
            cell_type: G
        } = Q,
        F = G === "markdown" ? "markdown" : "python",
        I = D === "insert" ? "insert this cell into" : D === "delete" ? "delete this cell from" : "make this edit to";
    return eF1.default.createElement(BR, {
        toolUseConfirm: A.toolUseConfirm,
        toolUseContext: A.toolUseContext,
        onDone: A.onDone,
        onReject: A.onReject,
        setToolPermissionContext: A.setToolPermissionContext,
        title: "Edit notebook",
        question: eF1.default.createElement(T, null, "Do you want to ", I, " ", eF1.default.createElement(T, {
            bold: !0
        }, zz8(Z)), "?"),
        content: eF1.default.createElement(AbB, {
            notebook_path: Q.notebook_path,
            cell_id: Q.cell_id,
            new_source: Q.new_source,
            cell_type: Q.cell_type,
            edit_mode: Q.edit_mode,
            verbose: A.verbose,
            width: A.verbose ? 120 : 80
        }),
        path: Z,
        completionType: "tool_use_single",
        languageName: F,
        parseInput: B
    })
}
var AI1 = G1(z1(), 1);
import {
    basename as Ez8
} from "path";

function QbB(A) {
    let B = (Y) => {
            return m$.inputSchema.parse(Y)
        },
        Q = (Y) => WyB(Y.file_path, Y.edits),
        Z = B(A.toolUseConfirm.input),
        {
            file_path: D,
            edits: G
        } = Z,
        F = G.length,
        I = F === 1 ? "edit" : `${F} edits`;
    return AI1.default.createElement(BR, {
        toolUseConfirm: A.toolUseConfirm,
        toolUseContext: A.toolUseContext,
        onDone: A.onDone,
        onReject: A.onReject,
        setToolPermissionContext: A.setToolPermissionContext,
        title: "Edit file (multiple changes)",
        question: AI1.default.createElement(T, null, "Do you want to make ", I, " to", " ", AI1.default.createElement(T, {
            bold: !0
        }, Ez8(D)), "?"),
        content: AI1.default.createElement(Bf1, {
            file_path: D,
            edits: G.map((Y) => ({
                old_string: Y.old_string,
                new_string: Y.new_string,
                replace_all: Y.replace_all ?? !1
            })),
            verbose: A.verbose
        }),
        path: D,
        completionType: "str_replace_multi",
        languageName: B_(D),
        parseInput: B,
        getIDEDiffConfig: Q
    })
}
var s$ = G1(z1(), 1);

function ZbB({
    toolUseConfirm: A,
    setToolPermissionContext: B,
    onDone: Q,
    onReject: Z
}) {
    let [D] = fB();

    function G(F) {
        if (F === "yes-accept-edits") B({
            ...A.toolUseContext.getToolPermissionContext(),
            mode: "acceptEdits"
        }), Q(), A.onAllow("temporary", A.input);
        else if (F === "yes-default") B({
            ...A.toolUseContext.getToolPermissionContext(),
            mode: "default"
        }), Q(), A.onAllow("temporary", A.input);
        else Q(), Z(), A.onReject()
    }
    return s$.default.createElement(v, {
        flexDirection: "column",
        borderStyle: "round",
        borderColor: "planMode",
        marginTop: 1,
        paddingLeft: 1,
        paddingRight: 1,
        paddingBottom: 1
    }, s$.default.createElement(AR, {
        title: "Ready to code?"
    }), s$.default.createElement(v, {
        flexDirection: "column",
        marginTop: 1
    }, s$.default.createElement(T, null, "Here is Claude's plan:"), s$.default.createElement(v, {
        borderStyle: "round",
        borderColor: "secondaryText",
        marginBottom: 1,
        paddingX: 1,
        overflow: "hidden"
    }, s$.default.createElement(T, null, ZW(A.input.plan, D))), s$.default.createElement(rv, {
        permissionResult: A.permissionResult,
        toolType: "tool"
    }), s$.default.createElement(T, {
        color: "secondaryText"
    }, "Would you like to proceed?"), s$.default.createElement(v, {
        marginTop: 1
    }, s$.default.createElement(uA, {
        options: [{
            label: "Yes, and auto-accept edits",
            value: "yes-accept-edits"
        }, {
            label: "Yes, and manually approve edits",
            value: "yes-default"
        }, {
            label: "No, keep planning",
            value: "no"
        }],
        onChange: (F) => G(F),
        onCancel: () => G("no")
    }))))
}

function Uz8(A) {
    switch (A) {
        case FF:
            return JyB;
        case m$:
            return QbB;
        case BH:
            return $yB;
        case VQ:
            return HyB;
        case vI:
            return evB;
        case QR:
            return BbB;
        case tK:
            return ZbB;
        case p$:
        case jS:
        case GU:
        case x8:
            return qyB;
        default:
            return Gf1
    }
}

function DbB({
    toolUseConfirm: A,
    toolUseContext: B,
    onDone: Q,
    onReject: Z,
    verbose: D,
    setToolPermissionContext: G
}) {
    DA((Y, W) => {
        if (W.ctrl && Y === "c") Q(), Z(), A.onReject()
    });
    let F = A.tool.userFacingName(A.input);
    UyB(`Claude needs your permission to use ${F}`);
    let I = Uz8(A.tool);
    return HR0.createElement(I, {
        toolUseContext: B,
        toolUseConfirm: A,
        onDone: Q,
        onReject: Z,
        verbose: D,
        setToolPermissionContext: G
    })
}
import {
    exec as wz8
} from "child_process";
import {
    promisify as $z8
} from "util";
var GbB = $z8(wz8);
async function qz8(A) {
    if (sA.platform === "win32") return [];
    if (!await XL()) return [];
    try {
        let B = "",
            {
                stdout: Q
            } = await GbB("git log -n 1000 --pretty=format: --name-only --diff-filter=M --author=$(git config user.email) | sort | uniq -c | sort -nr | head -n 20", {
                cwd: t0(),
                encoding: "utf8"
            });
        if (B = `Files modified by user:
` + Q, Q.split(`
`).length < 10) {
            let {
                stdout: F
            } = await GbB("git log -n 1000 --pretty=format: --name-only --diff-filter=M | sort | uniq -c | sort -nr | head -n 20", {
                cwd: t0(),
                encoding: "utf8"
            });
            B += `

Files modified by other users:
` + F
        }
        let D = (await jI({
            systemPrompt: ["You are an expert at analyzing git history. Given a list of files and their modification counts, return exactly five filenames that are frequently modified and represent core application logic (not auto-generated files, dependencies, or configuration). Make sure filenames are diverse, not all in the same folder, and are a mix of user and other users. Return only the filenames' basenames (without the path) separated by newlines with no explanation."],
            userPrompt: B,
            isNonInteractiveSession: A,
            promptCategory: "frequently_modified"
        })).message.content[0];
        if (!D || D.type !== "text") return [];
        let G = D.text.trim().split(`
`);
        if (G.length < 5) return [];
        return G
    } catch (B) {
        return R1(B), []
    }
}
var lf1 = EA(async (A) => {
    let B = UQ(),
        Q = Date.now(),
        Z = B.exampleFilesGeneratedAt ?? 0,
        D = 604800000;
    if (Q - Z > 604800000) B.exampleFiles = [];
    if (!B.exampleFiles?.length) qz8(A).then((F) => {
        if (F.length) r5({
            ...UQ(),
            exampleFiles: F,
            exampleFilesGeneratedAt: Date.now()
        })
    });
    let G = B.exampleFiles?.length ? qf(B.exampleFiles) : "<filepath>";
    return ["fix lint errors", "fix typecheck errors", `how does ${G} work?`, `refactor ${G}`, "how do I log an error?", `edit ${G} to...`, `write a test for ${G}`, "create a util logging.py that..."]
});
var j5 = G1(z1(), 1);
var zR0 = G1(z1(), 1);