/* chunk:598 bytes:[13778538, 13795499) size:16961 source:unpacked-cli.js */
function pL0({
    count: A,
    countLabel: B,
    secondaryCount: Q,
    secondaryLabel: Z,
    content: D,
    verbose: G
}) {
    let F = ND.default.createElement(ND.default.Fragment, null, "Found ", ND.default.createElement(T, {
            bold: !0
        }, A, " "), A === 0 || A > 1 ? B : B.slice(0, -1)),
        I = Q !== void 0 && Z ? ND.default.createElement(ND.default.Fragment, null, " ", "across ", ND.default.createElement(T, {
            bold: !0
        }, Q, " "), Q === 0 || Q > 1 ? Z : Z.slice(0, -1)) : null;
    if (G) return ND.default.createElement(v, {
        flexDirection: "column"
    }, ND.default.createElement(v, {
        flexDirection: "row"
    }, ND.default.createElement(T, null, "  ⎿  ", F, I)), ND.default.createElement(v, {
        marginLeft: 5
    }, ND.default.createElement(T, null, D)));
    return ND.default.createElement(OA, {
        height: 1
    }, ND.default.createElement(T, null, F, I, " ", A > 0 && ND.default.createElement(bv, null)))
}
var jS = {
    name: pM,
    async description() {
        return i$0()
    },
    userFacingName() {
        return "Search"
    },
    isEnabled() {
        return !0
    },
    inputSchema: eX8,
    isConcurrencySafe() {
        return !0
    },
    isReadOnly() {
        return !0
    },
    getPath({
        path: A
    }) {
        return A || t0()
    },
    async checkPermissions(A, B) {
        return ty(jS, A, B.getToolPermissionContext())
    },
    async prompt() {
        return i$0()
    },
    renderToolUseMessage({
        pattern: A,
        path: B,
        glob: Q,
        type: Z,
        output_mode: D = "files_with_matches",
        head_limit: G
    }, {
        verbose: F
    }) {
        if (!A) return null;
        let {
            absolutePath: I,
            relativePath: Y
        } = R40(B), W = [`pattern: "${A}"`];
        if (Y || F) W.push(`path: "${F?I:Y}"`);
        if (Q) W.push(`glob: "${Q}"`);
        if (Z) W.push(`type: "${Z}"`);
        if (D !== "files_with_matches") W.push(`output_mode: "${D}"`);
        if (G !== void 0) W.push(`head_limit: ${G}`);
        return W.join(", ")
    },
    renderToolUseRejectedMessage() {
        return ND.default.createElement(P5, null)
    },
    renderToolUseErrorMessage(A, {
        verbose: B
    }) {
        if (!B && typeof A === "string" && l4(A, "tool_use_error")) return ND.default.createElement(OA, null, ND.default.createElement(T, {
            color: "error"
        }, "Error searching files"));
        return ND.default.createElement(f6, {
            result: A,
            verbose: B
        })
    },
    renderToolUseProgressMessage() {
        return null
    },
    renderToolResultMessage({
        mode: A = "files_with_matches",
        filenames: B,
        numFiles: Q,
        content: Z,
        numLines: D,
        numMatches: G
    }, F, {
        verbose: I
    }) {
        if (A === "content") return ND.default.createElement(pL0, {
            count: D ?? 0,
            countLabel: "lines",
            content: Z,
            verbose: I
        });
        if (A === "count") return ND.default.createElement(pL0, {
            count: G ?? 0,
            countLabel: "matches",
            secondaryCount: Q,
            secondaryLabel: "files",
            content: Z,
            verbose: I
        });
        let Y = B.map((W) => W).join(`
`);
        return ND.default.createElement(pL0, {
            count: Q,
            countLabel: "files",
            content: Y,
            verbose: I
        })
    },
    mapToolResultToToolResultBlockParam({
        mode: A = "files_with_matches",
        numFiles: B,
        filenames: Q,
        content: Z,
        numLines: D,
        numMatches: G
    }, F) {
        if (A === "content") {
            let W = cL0(Z || "No matches found");
            return {
                tool_use_id: F,
                type: "tool_result",
                content: W
            }
        }
        if (A === "count") {
            let J = cL0(Z || "No matches found"),
                X = G ?? 0,
                V = B ?? 0,
                C = `

Found ${X} total ${X===1?"occurrence":"occurrences"} across ${V} ${V===1?"file":"files"}.`;
            return {
                tool_use_id: F,
                type: "tool_result",
                content: J + C
            }
        }
        if (B === 0) return {
            tool_use_id: F,
            type: "tool_result",
            content: "No files found"
        };
        let I = `Found ${B} file${B===1?"":"s"}
${Q.join(`
`)}`,
            Y = cL0(I);
        return {
            tool_use_id: F,
            type: "tool_result",
            content: Y
        }
    },
    async * call({
        pattern: A,
        path: B,
        glob: Q,
        type: Z,
        output_mode: D = "files_with_matches",
        "-B": G,
        "-A": F,
        "-C": I,
        "-n": Y = !1,
        "-i": W = !1,
        head_limit: J,
        multiline: X = !1
    }, {
        abortController: V,
        getToolPermissionContext: C
    }) {
        let K = fg(B) || t0(),
            H = ["--hidden"];
        if (X) H.push("-U", "--multiline-dotall");
        if (W) H.push("-i");
        if (D === "files_with_matches") H.push("-l");
        else if (D === "count") H.push("-c");
        if (Y && D === "content") H.push("-n");
        if (I !== void 0 && D === "content") H.push("-C", I.toString());
        else if (D === "content") {
            if (G !== void 0) H.push("-B", G.toString());
            if (F !== void 0) H.push("-A", F.toString())
        }
        if (A.startsWith("-")) H.push("-e", A);
        else H.push(A);
        if (Z) H.push("--type", Z);
        if (Q) {
            let P = [],
                j = Q.split(/\s+/);
            for (let f of j)
                if (f.includes("{") && f.includes("}")) P.push(f);
                else P.push(...f.split(",").filter(Boolean));
            for (let f of P.filter(Boolean)) H.push("--glob", f)
        }
        let z = Mq1(bs(C()), t0());
        for (let P of z) {
            let j = P.startsWith("/") ? `!${P}` : `!**/${P}`;
            H.push("--glob", j)
        }
        let $ = await cy(H, K, V.signal);
        if (D === "content") {
            let P = lL0($, J);
            yield {
                type: "result",
                data: {
                    mode: "content",
                    numFiles: 0,
                    filenames: [],
                    content: P.join(`
`),
                    numLines: P.length
                }
            };
            return
        }
        if (D === "count") {
            let P = lL0($, J),
                j = 0,
                f = 0;
            for (let c of P) {
                let u = c.lastIndexOf(":");
                if (u > 0) {
                    let a = c.substring(u + 1),
                        l = parseInt(a, 10);
                    if (!isNaN(l)) j += l, f += 1
                }
            }
            yield {
                type: "result",
                data: {
                    mode: "count",
                    numFiles: f,
                    filenames: [],
                    content: P.join(`
`),
                    numMatches: j
                }
            };
            return
        }
        let L = await Promise.all($.map((P) => j1().stat(P))),
            N = $.map((P, j) => [P, L[j]]).sort((P, j) => {
                let f = (j[1].mtimeMs ?? 0) - (P[1].mtimeMs ?? 0);
                if (f === 0) return P[0].localeCompare(j[0]);
                return f
            }).map((P) => P[0]),
            R = lL0(N, J);
        yield {
            type: "result",
            data: {
                mode: "files_with_matches",
                filenames: R,
                numFiles: R.length
            }
        }
    }
};
var ZV8 = h.strictObject({
        pattern: h.string().describe("The glob pattern to match files against"),
        path: h.string().optional().describe('The directory to search in. If not specified, the current working directory will be used. IMPORTANT: Omit this field to use the default directory. DO NOT enter "undefined" or "null" - simply omit it for the default behavior. Must be a valid directory path if provided.')
    }),
    MR3 = h.object({
        durationMs: h.number().describe("Time taken to execute the search in milliseconds"),
        numFiles: h.number().describe("Total number of files found"),
        filenames: h.array(h.string()).describe("Array of file paths that match the pattern"),
        truncated: h.boolean().describe("Whether results were truncated (limited to 100 files)")
    }),
    p$ = {
        name: zv,
        async description() {
            return p$0
        },
        userFacingName() {
            return "Search"
        },
        isEnabled() {
            return !0
        },
        inputSchema: ZV8,
        isConcurrencySafe() {
            return !0
        },
        isReadOnly() {
            return !0
        },
        getPath({
            path: A
        }) {
            return A || t0()
        },
        async checkPermissions(A, B) {
            return ty(p$, A, B.getToolPermissionContext())
        },
        async prompt() {
            return p$0
        },
        renderToolUseMessage({
            pattern: A,
            path: B
        }, {
            verbose: Q
        }) {
            if (!A) return null;
            let Z = B ? AV8(B) ? B : QV8(t0(), B) : void 0,
                D = Z ? BV8(t0(), Z) : void 0;
            return `pattern: "${A}"${D||Q?`, path: "${Q?Z:D}"`:""}`
        },
        renderToolUseRejectedMessage() {
            return yF1.default.createElement(P5, null)
        },
        renderToolUseErrorMessage(A, {
            verbose: B
        }) {
            if (!B && typeof A === "string" && l4(A, "tool_use_error")) return yF1.default.createElement(OA, null, yF1.default.createElement(T, {
                color: "error"
            }, "Error searching files"));
            return yF1.default.createElement(f6, {
                result: A,
                verbose: B
            })
        },
        renderToolUseProgressMessage() {
            return null
        },
        renderToolResultMessage: jS.renderToolResultMessage,
        async * call(A, {
            abortController: B,
            getToolPermissionContext: Q
        }) {
            let Z = Date.now(),
                {
                    files: D,
                    truncated: G
                } = await eeA(A.pattern, p$.getPath(A), {
                    limit: 100,
                    offset: 0
                }, B.signal, Q());
            yield {
                type: "result",
                data: {
                    filenames: D,
                    durationMs: Date.now() - Z,
                    numFiles: D.length,
                    truncated: G
                }
            }
        },
        mapToolResultToToolResultBlockParam(A, B) {
            if (A.filenames.length === 0) return {
                tool_use_id: B,
                type: "tool_result",
                content: "No files found"
            };
            return {
                tool_use_id: B,
                type: "tool_result",
                content: [...A.filenames, ...A.truncated ? ["(Results are truncated. Consider using a more specific path or pattern.)"] : []].join(`
`)
            }
        }
    };
var KC = G1(z1(), 1);
var avB = G1(ivB(), 1);
class CR0 extends Error {
    constructor(A) {
        super(`Claude Code is unable to fetch from ${A}`);
        this.name = "DomainBlockedError"
    }
}
class KR0 extends Error {
    constructor(A) {
        super(`Unable to verify if domain ${A} is safe to fetch. This may be due to network restrictions or enterprise security policies blocking claude.ai.`);
        this.name = "DomainCheckFailedError"
    }
}
var cf1 = new Map,
    svB = 900000;

function Gz8() {
    let A = Date.now();
    for (let [B, Q] of cf1.entries())
        if (A - Q.timestamp > svB) cf1.delete(B)
}
var Fz8 = 2000,
    Iz8 = 10485760,
    nvB = 1e5;

function Yz8(A) {
    if (A.length > Fz8) return !1;
    let B;
    try {
        B = new URL(A)
    } catch {
        return !1
    }
    if (B.username || B.password) return !1;
    if (B.hostname.split(".").length < 2) return !1;
    return !0
}
async function Wz8(A) {
    try {
        let B = await J9.get(`https://claude.ai/api/web/domain_info?domain=${encodeURIComponent(A)}`);
        if (B.status === 200) return B.data.can_fetch === !0 ? {
            status: "allowed"
        } : {
            status: "blocked"
        };
        return {
            status: "check_failed",
            error: new Error(`Domain check returned status ${B.status}`)
        }
    } catch (B) {
        return R1(B), {
            status: "check_failed",
            error: B
        }
    }
}

function Jz8(A, B) {
    try {
        let Q = new URL(A),
            Z = new URL(B);
        if (Z.protocol !== Q.protocol) return !1;
        if (Z.port !== Q.port) return !1;
        if (Z.username || Z.password) return !1;
        let D = (I) => I.replace(/^www\./, ""),
            G = D(Q.hostname),
            F = D(Z.hostname);
        return G === F
    } catch (Q) {
        return !1
    }
}
async function rvB(A, B, Q) {
    try {
        return await J9.get(A, {
            signal: B,
            maxRedirects: 0,
            responseType: "arraybuffer",
            maxContentLength: Iz8
        })
    } catch (Z) {
        if (J9.isAxiosError(Z) && Z.response && [301, 302, 307, 308].includes(Z.response.status)) {
            let D = Z.response.headers.location;
            if (!D) throw new Error("Redirect missing Location header");
            let G = new URL(D, A).toString();
            if (Q(A, G)) return rvB(G, B, Q);
            else return {
                type: "redirect",
                originalUrl: A,
                redirectUrl: G,
                statusCode: Z.response.status
            }
        }
        throw Z
    }
}

function Xz8(A) {
    return "type" in A && A.type === "redirect"
}
async function ovB(A, B) {
    if (!Yz8(A)) throw new Error("Invalid URL");
    Gz8();
    let Q = Date.now(),
        Z = cf1.get(A);
    if (Z && Q - Z.timestamp < svB) return {
        bytes: Z.bytes,
        code: Z.code,
        codeText: Z.codeText,
        content: Z.content
    };
    let D, G = A;
    try {
        if (D = new URL(A), D.protocol === "http:") D.protocol = "https:", G = D.toString();
        let X = D.hostname;
        switch ((await Wz8(X)).status) {
            case "allowed":
                break;
            case "blocked":
                throw new CR0(X);
            case "check_failed":
                throw new KR0(X)
        }
    } catch (X) {
        if (R1(X), X instanceof CR0 || X instanceof KR0) throw X
    }
    let F = await rvB(G, B.signal, Jz8);
    if (Xz8(F)) return F;
    let I = Buffer.from(F.data).toString("utf-8"),
        Y = F.headers["content-type"] ?? "",
        W = Buffer.byteLength(I),
        J;
    if (Y.includes("text/html")) J = new avB.default().turndown(I);
    else J = I;
    if (J.length > nvB) J = J.substring(0, nvB) + "...[content truncated]";
    return cf1.set(A, {
        bytes: W,
        code: F.status,
        codeText: F.statusText,
        content: J,
        timestamp: Q
    }), {
        code: F.status,
        codeText: F.statusText,
        content: J,
        bytes: W
    }
}
async function tvB(A, B, Q, Z) {
    let D = xLB(B, A),
        G = await jI({
            systemPrompt: [],
            userPrompt: D,
            isNonInteractiveSession: Z,
            signal: Q,
            promptCategory: "web_fetch_apply"
        });
    if (Q.aborted) throw new tJ;
    let {
        content: F
    } = G.message;
    if (F.length > 0) {
        let I = F[0];
        if ("text" in I) return I.text
    }
    return "No response from model"
}
var Vz8 = h.strictObject({
        url: h.string().url().describe("The URL to fetch content from"),
        prompt: h.string().describe("The prompt to run on the fetched content")
    }),
    iO3 = h.object({
        bytes: h.number().describe("Size of the fetched content in bytes"),
        code: h.number().describe("HTTP response code"),
        codeText: h.string().describe("HTTP response code text"),
        result: h.string().describe("Processed result from applying the prompt to the content"),
        durationMs: h.number().describe("Time taken to fetch and process the content"),
        url: h.string().describe("The URL that was fetched")
    });

function Cz8(A) {
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