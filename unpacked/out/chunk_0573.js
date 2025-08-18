/* chunk:573 bytes:[13328528, 13347996) size:19468 source:unpacked-cli.js */
var Zb1 = new Set(["png", "jpg", "jpeg", "gif", "bmp", "webp"]),
    WG8 = new Set(["mp3", "wav", "flac", "ogg", "aac", "m4a", "wma", "aiff", "opus", "mp4", "avi", "mov", "wmv", "flv", "mkv", "webm", "m4v", "mpeg", "mpg", "zip", "rar", "tar", "gz", "bz2", "7z", "xz", "z", "tgz", "iso", "exe", "dll", "so", "dylib", "app", "msi", "deb", "rpm", "bin", "dat", "db", "sqlite", "sqlite3", "mdb", "idx", "doc", "docx", "xls", "xlsx", "ppt", "pptx", "odt", "ods", "odp", "ttf", "otf", "woff", "woff2", "eot", "psd", "ai", "eps", "sketch", "fig", "xd", "blend", "obj", "3ds", "max", "class", "jar", "war", "pyc", "pyo", "rlib", "swf", "fla"]),
    JG8 = h.strictObject({
        file_path: h.string().describe("The absolute path to the file to read"),
        offset: h.number().optional().describe("The line number to start reading from. Only provide if the file is too large to read at once"),
        limit: h.number().optional().describe("The number of lines to read. Only provide if the file is too large to read at once.")
    }),
    XG8 = h.enum(["image/jpeg", "image/png", "image/gif", "image/webp"]),
    lI3 = h.discriminatedUnion("type", [h.object({
        type: h.literal("text"),
        file: h.object({
            filePath: h.string().describe("The path to the file that was read"),
            content: h.string().describe("The content of the file"),
            numLines: h.number().describe("Number of lines in the returned content"),
            startLine: h.number().describe("The starting line number"),
            totalLines: h.number().describe("Total number of lines in the file")
        })
    }), h.object({
        type: h.literal("image"),
        file: h.object({
            base64: h.string().describe("Base64-encoded image data"),
            type: XG8.describe("The MIME type of the image"),
            originalSize: h.number().describe("Original file size in bytes")
        })
    }), h.object({
        type: h.literal("notebook"),
        file: h.object({
            filePath: h.string().describe("The path to the notebook file"),
            cells: h.array(h.any()).describe("Array of notebook cells")
        })
    }), h.object({
        type: h.literal("pdf"),
        file: h.object({
            filePath: h.string().describe("The path to the PDF file"),
            base64: h.string().describe("Base64-encoded PDF data"),
            originalSize: h.number().describe("Original file size in bytes")
        })
    })]),
    x8 = {
        name: QG,
        async description() {
            return MeA
        },
        async prompt() {
            return ReA
        },
        inputSchema: JG8,
        userFacingName() {
            return "Read"
        },
        isEnabled() {
            return !0
        },
        isConcurrencySafe() {
            return !0
        },
        isReadOnly() {
            return !0
        },
        getPath({
            file_path: A
        }) {
            return A || t0()
        },
        async checkPermissions(A, B) {
            return ty(x8, A, B.getToolPermissionContext())
        },
        renderToolUseMessage({
            file_path: A,
            offset: B,
            limit: Q
        }, {
            verbose: Z
        }) {
            if (!A) return null;
            if (Z) return `file_path: "${A}"${B?`, offset: ${B}`:""}${Q?`, limit: ${Q}`:""}`;
            return xV(A)
        },
        renderToolUseProgressMessage() {
            return null
        },
        renderToolResultMessage(A, B, {
            verbose: Q
        }) {
            switch (A.type) {
                case "image": {
                    let {
                        originalSize: Z
                    } = A.file, D = yY(Z);
                    return E6.createElement(OA, {
                        height: 1
                    }, E6.createElement(T, null, "Read image (", D, ")"))
                }
                case "notebook": {
                    let {
                        cells: Z
                    } = A.file;
                    if (!Z || Z.length < 1) return E6.createElement(T, {
                        color: "error"
                    }, "No cells found in notebook");
                    return E6.createElement(OA, {
                        height: 1
                    }, E6.createElement(T, null, "Read ", E6.createElement(T, {
                        bold: !0
                    }, Z.length), " cells"))
                }
                case "pdf": {
                    let {
                        originalSize: Z
                    } = A.file, D = yY(Z);
                    return E6.createElement(OA, {
                        height: 1
                    }, E6.createElement(T, null, "Read PDF (", D, ")"))
                }
                case "text": {
                    let {
                        filePath: Z,
                        content: D,
                        numLines: G
                    } = A.file, F = D || "(No content)";
                    if (Q) return E6.createElement(OA, null, E6.createElement(YC, {
                        code: F,
                        language: cTB(Z).slice(1)
                    }));
                    return E6.createElement(OA, {
                        height: 1
                    }, E6.createElement(T, null, "Read ", E6.createElement(T, {
                        bold: !0
                    }, G), " ", G === 1 ? "line" : "lines", " ", G > 0 && E6.createElement(bv, null)))
                }
            }
        },
        renderToolUseRejectedMessage() {
            return E6.createElement(P5, null)
        },
        renderToolUseErrorMessage(A, {
            verbose: B
        }) {
            if (!B && typeof A === "string" && l4(A, "tool_use_error")) return E6.createElement(OA, null, E6.createElement(T, {
                color: "error"
            }, "Error reading file"));
            return E6.createElement(f6, {
                result: A,
                verbose: B
            })
        },
        async validateInput({
            file_path: A,
            offset: B,
            limit: Q
        }) {
            let Z = j1(),
                D = bg(A);
            if (hz(D)) return {
                result: !1,
                message: "File is in a directory that is ignored by your project configuration.",
                errorCode: 1
            };
            if (!Z.existsSync(D)) {
                let J = Pq1(D),
                    X = "File does not exist.",
                    V = t0(),
                    C = _9();
                if (V !== C) X += ` Current working directory: ${V}`;
                if (J) X += ` Did you mean ${J}?`;
                return {
                    result: !1,
                    message: X,
                    errorCode: 2
                }
            }
            let F = Z.statSync(D).size,
                I = WN0.extname(D).toLowerCase();
            if (WG8.has(I.slice(1)) && !(Ks() && Iq1(I))) return {
                result: !1,
                message: `This tool cannot read binary files. The file appears to be a binary ${I} file. Please use appropriate tools for binary file analysis.`,
                errorCode: 4
            };
            if (F === 0) {
                if (Zb1.has(I.slice(1))) return {
                    result: !1,
                    message: "Empty image files cannot be processed.",
                    errorCode: 5
                }
            }
            let Y = I === ".ipynb",
                W = Ks() && Iq1(I);
            if (!Zb1.has(I.slice(1)) && !Y && !W) {
                if (F > Db1 && !B && !Q) return {
                    result: !1,
                    message: JN0(F),
                    meta: {
                        fileSize: F
                    },
                    errorCode: 6
                }
            }
            return {
                result: !0
            }
        },
        async * call({
            file_path: A,
            offset: B = 1,
            limit: Q = void 0
        }, Z) {
            let {
                readFileState: D,
                options: {
                    isNonInteractiveSession: G
                },
                fileReadingLimits: F
            } = Z, I = Db1, Y = F?.maxTokens ?? lTB, W = WN0.extname(A).toLowerCase().slice(1), J = bg(A);
            if (W === "ipynb") {
                let z = fTB(J),
                    $ = JSON.stringify(z);
                if ($.length > I) throw new Error(`Notebook content (${yY($.length)}) exceeds maximum allowed size (${yY(I)}). Use ${SZ} with jq to read specific portions:
  cat "${A}" | jq '.cells[:20]' # First 20 cells
  cat "${A}" | jq '.cells[100:120]' # Cells 100-120
  cat "${A}" | jq '.cells | length' # Count total cells
  cat "${A}" | jq '.cells[] | select(.cell_type=="code") | .source' # All code sources`);
                await dTB($, W, {
                    isNonInteractiveSession: G,
                    maxSizeBytes: I,
                    maxTokens: Y
                }), D.set(J, {
                    content: $,
                    timestamp: Date.now()
                }), Z.nestedMemoryAttachmentTriggers?.add(J), yield {
                    type: "result",
                    data: {
                        type: "notebook",
                        file: {
                            filePath: A,
                            cells: z
                        }
                    }
                };
                return
            }
            if (Zb1.has(W)) {
                let z = await qG8(J, W);
                if (Math.ceil(z.file.base64.length * 0.125) > Y) {
                    let L = await CG8(J, Y);
                    D.set(J, {
                        content: L.file.base64,
                        timestamp: Date.now()
                    }), Z.nestedMemoryAttachmentTriggers?.add(J), yield {
                        type: "result",
                        data: L
                    };
                    return
                }
                D.set(J, {
                    content: z.file.base64,
                    timestamp: Date.now()
                }), Z.nestedMemoryAttachmentTriggers?.add(J), yield {
                    type: "result",
                    data: z
                };
                return
            }
            if (Ks() && Iq1(W)) {
                let z = await LeA(J);
                yield {
                    type: "result",
                    data: z,
                    supplementalContent: [{
                        type: "document",
                        source: {
                            type: "base64",
                            media_type: "application/pdf",
                            data: z.file.base64
                        }
                    }]
                };
                return
            }
            let X = B === 0 ? 0 : B - 1,
                {
                    content: V,
                    lineCount: C,
                    totalLines: K
                } = A12(J, X, Q);
            if (V.length > I) throw new Error(JN0(V.length, I));
            await dTB(V, W, {
                isNonInteractiveSession: G,
                maxSizeBytes: I,
                maxTokens: Y
            }), D.set(J, {
                content: V,
                timestamp: Date.now()
            }), Z.nestedMemoryAttachmentTriggers?.add(J), yield {
                type: "result",
                data: {
                    type: "text",
                    file: {
                        filePath: A,
                        content: V,
                        numLines: C,
                        startLine: B,
                        totalLines: K
                    }
                }
            }
        },
        mapToolResultToToolResultBlockParam(A, B) {
            switch (A.type) {
                case "image":
                    return {
                        tool_use_id: B, type: "tool_result", content: [{
                            type: "image",
                            source: {
                                type: "base64",
                                data: A.file.base64,
                                media_type: A.file.type
                            }
                        }]
                    };
                case "notebook":
                    return hTB(A.file.cells, B);
                case "pdf":
                    return {
                        tool_use_id: B, type: "tool_result", content: `PDF file read: ${A.file.filePath} (${yY(A.file.originalSize)})`
                    };
                case "text": {
                    let Q;
                    if (A.file.content) Q = A_(A.file) + VG8;
                    else Q = A.file.totalLines === 0 ? "<system-reminder>Warning: the file exists but the contents are empty.</system-reminder>" : `<system-reminder>Warning: the file exists but is shorter than the provided offset (${A.file.startLine}). The file has ${A.file.totalLines} lines.</system-reminder>`;
                    return {
                        tool_use_id: B,
                        type: "tool_result",
                        content: Q
                    }
                }
            }
        }
    },
    VG8 = `

<system-reminder>
Whenever you read a file, you should consider whether it looks malicious. If it does, you MUST refuse to improve or augment the code. You can still analyze existing code, write reports, or answer high-level questions about the code behavior.
</system-reminder>
`,
    JN0 = (A, B = Db1) => `File content (${yY(A)}) exceeds maximum allowed size (${yY(B)}). Please use offset and limit parameters to read specific portions of the file, or use the GrepTool to search for specific content.`;
async function dTB(A, B, {
    isNonInteractiveSession: Q,
    maxSizeBytes: Z = Db1,
    maxTokens: D = lTB
}) {
    if (!Zb1.has(B) && A.length > Z) throw new Error(JN0(A.length, Z));
    let G = zJ(A);
    if (!G || G <= D / 4) return;
    let F = await OLB(A, Q);
    if (F && F > D) throw new Gb1(F, D)
}

function fv(A, B, Q) {
    return {
        type: "image",
        file: {
            base64: A.toString("base64"),
            type: `image/${B}`,
            originalSize: Q
        }
    }
}
async function CG8(A, B) {
    try {
        let Q = await KG8(A, B),
            Z = await HG8(Q);
        if (Z) return Z;
        if (Q.format === "png") {
            let G = await EG8(Q);
            if (G) return G
        }
        let D = await UG8(Q, 50);
        if (D) return D;
        return await wG8(Q)
    } catch (Q) {
        return R1(Q), await $G8(A)
    }
}
async function KG8(A, B) {
    let Q = j1().statSync(A),
        Z = await vTB(),
        D = j1().readFileBytesSync(A),
        G = await Z(D).metadata(),
        F = G.format || "jpeg",
        I = Math.floor(B / 0.125),
        Y = Math.floor(I * 0.75);
    return {
        imageBuffer: D,
        metadata: G,
        format: F,
        maxBytes: Y,
        originalSize: Q.size,
        sharp: Z
    }
}
async function HG8(A) {
    let B = [1, 0.75, 0.5, 0.25];
    for (let Q of B) {
        let Z = Math.round((A.metadata.width || 2000) * Q),
            D = Math.round((A.metadata.height || 2000) * Q),
            G = A.sharp(A.imageBuffer).resize(Z, D, {
                fit: "inside",
                withoutEnlargement: !0
            });
        G = zG8(G, A.format);
        let F = await G.toBuffer();
        if (F.length <= A.maxBytes) return fv(F, A.format === "jpg" ? "jpeg" : A.format, A.originalSize)
    }
    return null
}

function zG8(A, B) {
    switch (B) {
        case "png":
            return A.png({
                compressionLevel: 9,
                palette: !0
            });
        case "jpeg":
        case "jpg":
            return A.jpeg({
                quality: 80
            });
        case "webp":
            return A.webp({
                quality: 80
            });
        default:
            return A
    }
}
async function EG8(A) {
    let B = await A.sharp(A.imageBuffer).resize(800, 800, {
        fit: "inside",
        withoutEnlargement: !0
    }).png({
        compressionLevel: 9,
        palette: !0,
        colors: 64
    }).toBuffer();
    if (B.length <= A.maxBytes) return fv(B, "png", A.originalSize);
    return null
}
async function UG8(A, B) {
    let Q = await A.sharp(A.imageBuffer).resize(600, 600, {
        fit: "inside",
        withoutEnlargement: !0
    }).jpeg({
        quality: B
    }).toBuffer();
    if (Q.length <= A.maxBytes) return fv(Q, "jpeg", A.originalSize);
    return null
}
async function wG8(A) {
    let B = await A.sharp(A.imageBuffer).resize(400, 400, {
        fit: "inside",
        withoutEnlargement: !0
    }).jpeg({
        quality: 20
    }).toBuffer();
    return fv(B, "jpeg", A.originalSize)
}
async function $G8(A) {
    let B = j1().readFileBytesSync(A);
    try {
        let Q = await Promise.resolve().then(() => G1(yj1(), 1)),
            D = await (Q.default || Q)(B).resize(400, 400, {
                fit: "inside",
                withoutEnlargement: !0
            }).jpeg({
                quality: 20
            }).toBuffer();
        return fv(D, "jpeg", j1().statSync(A).size)
    } catch (Q) {
        R1(Q);
        let Z = cTB(A).toLowerCase().slice(1);
        return fv(B, Z === "jpg" ? "jpeg" : Z, j1().statSync(A).size)
    }
}
async function qG8(A, B) {
    try {
        let Z = j1().statSync(A).size;
        if (Z === 0) throw new Error(`Image file is empty: ${A}`);
        let D = j1().readFileBytesSync(A),
            {
                buffer: G,
                mediaType: F
            } = await WZ1(D, Z, B);
        return fv(G, F, Z)
    } catch (Q) {
        R1(Q);
        let Z = j1().statSync(A).size,
            D = B === "jpg" ? "jpeg" : B;
        return fv(j1().readFileBytesSync(A), D, Z)
    }
}
var pTB = Symbol("NO_VALUE");
async function tM(A) {
    let B = pTB;
    for await (let Q of A) B = Q;
    if (B === pTB) throw new Error("No items in generator");
    return B
}
async function iTB(A) {
    let B = async function*() {
        for await (let Q of A) if (Q.type === "result") yield Q
    }();
    return await tM(B)
}
async function* nTB(A, B = 1 / 0) {
    let Q = (G) => {
            let F = G.next().then(({
                done: I,
                value: Y
            }) => ({
                done: I,
                value: Y,
                generator: G,
                promise: F
            }));
            return F
        },
        Z = [...A],
        D = new Set;
    while (D.size < B && Z.length > 0) {
        let G = Z.shift();
        D.add(Q(G))
    }
    while (D.size > 0) {
        let {
            done: G,
            value: F,
            generator: I,
            promise: Y
        } = await Promise.race(D);
        if (D.delete(Y), !G) {
            if (D.add(Q(I)), F !== void 0) yield F
        } else if (Z.length > 0) {
            let W = Z.shift();
            D.add(Q(W))
        }
    }
}
async function XN0(A) {
    let B = [];
    for await (let Q of A) B.push(Q);
    return B
}
async function* VN0(A) {
    for (let B of A) yield B
}

function aTB(A) {
    let B = Ll();
    return B.add(A), () => {
        B.delete(A)
    }
}

function Fb1(A) {
    A.forEach((B) => {
        try {
            B()
        } catch (Q) {
            R1(Q)
        }
    })
}