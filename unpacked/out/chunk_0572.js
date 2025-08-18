/* chunk:572 bytes:[13319909, 13328527) size:8618 source:unpacked-cli.js */
function AG8(A, B) {
    switch (A) {
        case 0:
        case 1:
            return B.toString();
        case 2:
            return tD8[B - 1];
        case 3:
            return eD8[B - 1];
        default:
            return B.toString()
    }
}

function Kd({
    content: A,
    verbose: B
}) {
    let {
        stdout: Q,
        stderr: Z,
        summary: D,
        isImage: G,
        returnCodeInterpretation: F,
        backgroundTaskId: I
    } = A, [Y] = fB();
    if (G) return EJ.default.createElement(OA, {
        height: 1
    }, EJ.default.createElement(T, {
        color: "secondaryText"
    }, "[Image data detected and sent to Claude]"));
    if (D) {
        if (!B) return EJ.default.createElement(v, {
            flexDirection: "column"
        }, EJ.default.createElement(IC, {
            content: ZW(D, Y),
            verbose: !1
        }));
        return EJ.default.createElement(v, {
            flexDirection: "column"
        }, EJ.default.createElement(IC, {
            content: D,
            verbose: B
        }), (Q !== "" || Z !== "") && EJ.default.createElement(v, {
            flexDirection: "column",
            marginTop: 1
        }, EJ.default.createElement(T, {
            bold: !0
        }, "=== Original Output ==="), Q !== "" ? EJ.default.createElement(IC, {
            content: Q,
            verbose: B
        }) : null, Z !== "" ? EJ.default.createElement(IC, {
            content: Z,
            verbose: B,
            isError: !0
        }) : null))
    }
    return EJ.default.createElement(v, {
        flexDirection: "column"
    }, Q !== "" ? EJ.default.createElement(IC, {
        content: Q,
        verbose: B
    }) : null, Z !== "" ? EJ.default.createElement(IC, {
        content: Z,
        verbose: B,
        isError: !0
    }) : null, Q === "" && Z === "" ? EJ.default.createElement(OA, {
        height: 1
    }, EJ.default.createElement(T, {
        color: "secondaryText"
    }, I ? "Running in the background (down arrow to manage)" : F || "(No content)")) : null)
}
var vv = G1(z1(), 1);

function Ab1({
    lastLines: A,
    elapsedTimeSeconds: B,
    totalLines: Q
}) {
    let D = eG((A ?? "").trim()).split(`
`).filter((Y) => Y),
        G = D.slice(-5).join(`
`),
        F = Q ? Math.max(0, Q - 5) : 0,
        I = B !== void 0 ? ` (${B}s)` : "";
    if (!D.length) return vv.default.createElement(OA, null, vv.default.createElement(T, {
        color: "secondaryText"
    }, "Running…", I));
    return vv.default.createElement(OA, null, vv.default.createElement(v, {
        flexDirection: "column"
    }, vv.default.createElement(v, {
        height: Math.min(5, D.length),
        flexDirection: "column",
        overflow: "hidden"
    }, vv.default.createElement(T, {
        color: "secondaryText"
    }, G)), (F > 0 || I) && vv.default.createElement(T, {
        color: "secondaryText"
    }, F > 0 && `+${F} more line${F===1?"":"s"}`, I)))
}
var E6 = G1(z1(), 1);
import * as WN0 from "path";
import {
    extname as cTB
} from "path";
var I01 = G1(IN0(), 1);
var Bb1 = G1(z1(), 1);

function YC({
    code: A,
    language: B
}) {
    let Q = Bb1.useMemo(() => {
        let Z = gs(A);
        try {
            if (I01.supportsLanguage(B)) return I01.highlight(Z, {
                language: B
            });
            else return R1(new Error(`Language not supported while highlighting code, falling back to markdown: ${B}`)), I01.highlight(Z, {
                language: "markdown"
            })
        } catch (D) {
            if (D instanceof Error && D.message.includes("Unknown language")) return R1(new Error(`Language not supported while highlighting code, falling back to markdown: ${D}`)), I01.highlight(Z, {
                language: "markdown"
            })
        }
    }, [A, B]);
    return Bb1.default.createElement(T, null, Q)
}
var Qb1 = null;
async function vTB() {
    if (Qb1) return Qb1.default;
    if (vz()) try {
        let Q = await Promise.resolve().then(() => (xTB(), _TB)),
            Z = Q.sharp || Q.default;
        return Qb1 = {
            default: Z
        }, Z
    } catch {
        console.warn("Native image processor not available, falling back to sharp")
    }
    let A = await Promise.resolve().then(() => G1(yj1(), 1)),
        B = A?.default || A;
    return Qb1 = {
        default: B
    }, B
}

function YN0(A) {
    if (!A) return "";
    let B = Array.isArray(A) ? A.join("") : A,
        {
            truncatedContent: Q
        } = iM(B);
    return Q
}

function DG8(A) {
    if (typeof A["image/png"] === "string") return {
        image_data: A["image/png"].replace(/\s/g, ""),
        media_type: "image/png"
    };
    if (typeof A["image/jpeg"] === "string") return {
        image_data: A["image/jpeg"].replace(/\s/g, ""),
        media_type: "image/jpeg"
    };
    return
}

function GG8(A) {
    switch (A.output_type) {
        case "stream":
            return {
                output_type: A.output_type, text: YN0(A.text)
            };
        case "execute_result":
        case "display_data":
            return {
                output_type: A.output_type, text: YN0(A.data?.["text/plain"]), image: A.data && DG8(A.data)
            };
        case "error":
            return {
                output_type: A.output_type, text: YN0(`${A.ename}: ${A.evalue}
${A.traceback.join(`
`)}`)
            }
    }
}

function bTB(A, B, Q, Z) {
    let D = A.id ?? `cell-${B}`,
        G = {
            cellType: A.cell_type,
            source: Array.isArray(A.source) ? A.source.join("") : A.source,
            execution_count: A.cell_type === "code" ? A.execution_count || void 0 : void 0,
            cell_id: D
        };
    if (A.cell_type === "code") G.language = Q;
    if (A.cell_type === "code" && A.outputs?.length) {
        let F = A.outputs.map(GG8);
        if (!Z && JSON.stringify(F).length > 1e4) G.outputs = [{
            output_type: "stream",
            text: `Outputs are too large to include. Use ${SZ} with: cat <notebook_path> | jq '.cells[${B}].outputs'`
        }];
        else G.outputs = F
    }
    return G
}

function FG8(A) {
    let B = [];
    if (A.cellType !== "code") B.push(`<cell_type>${A.cellType}</cell_type>`);
    if (A.language !== "python" && A.cellType === "code") B.push(`<language>${A.language}</language>`);
    return {
        text: `<cell id="${A.cell_id}">${B.join("")}${A.source}</cell id="${A.cell_id}">`,
        type: "text"
    }
}

function IG8(A) {
    let B = [];
    if (A.text) B.push({
        text: `
${A.text}`,
        type: "text"
    });
    if (A.image) B.push({
        type: "image",
        source: {
            data: A.image.image_data,
            media_type: A.image.media_type,
            type: "base64"
        }
    });
    return B
}

function YG8(A) {
    let B = FG8(A),
        Q = A.outputs?.flatMap(IG8);
    return [B, ...Q ?? []]
}

function fTB(A, B) {
    let Q = fg(A);
    if (!Q) throw new Error("Invalid notebook path");
    let Z = j1().readFileSync(Q, {
            encoding: "utf-8"
        }),
        D = JSON.parse(Z),
        G = D.metadata.language_info?.name ?? "python";
    if (B) {
        let F = D.cells.find((I) => I.id === B);
        if (!F) throw new Error(`Cell with ID "${B}" not found in notebook`);
        return [bTB(F, D.cells.indexOf(F), G, !0)]
    }
    return D.cells.map((F, I) => bTB(F, I, G, !1))
}

function hTB(A, B) {
    let Q = A.flatMap(YG8);
    return {
        tool_use_id: B,
        type: "tool_result",
        content: Q.reduce((Z, D) => {
            if (Z.length === 0) return [D];
            let G = Z[Z.length - 1];
            if (G && G.type === "text" && D.type === "text") return G.text += `
` + D.text, Z;
            return [...Z, D]
        }, [])
    }
}

function hG1(A) {
    let B = A.match(/^cell-(\d+)$/);
    if (B && B[1]) {
        let Q = parseInt(B[1], 10);
        return isNaN(Q) ? void 0 : Q
    }
    return
}
var gTB = G1(z1(), 1);
var uTB = "(ctrl+r to expand)";

function bv() {
    return gTB.default.createElement(T, {
        color: "secondaryText"
    }, uTB)
}

function mTB() {
    return e1.dim(uTB)
}
var Db1 = 262144,
    lTB = 25000;
class Gb1 extends Error {
    tokenCount;
    maxTokens;
    constructor(A, B) {
        super(`File content (${A} tokens) exceeds maximum allowed tokens (${B}). Please use offset and limit parameters to read specific portions of the file, or use the GrepTool to search for specific content.`);
        this.tokenCount = A;
        this.maxTokens = B;
        this.name = "MaxFileReadTokenExceededError"
    }
}