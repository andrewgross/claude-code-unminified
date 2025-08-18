/* chunk:541 bytes:[12705856, 12725767) size:19911 source:unpacked-cli.js */
class k8 {
    measuredText;
    selection;
    offset;
    constructor(A, B = 0, Q = 0) {
        this.measuredText = A;
        this.selection = Q;
        this.offset = Math.max(0, Math.min(this.text.length, B))
    }
    static fromText(A, B, Q = 0, Z = 0) {
        return new k8(new N4B(A, B - 1), Q, Z)
    }
    render(A, B, Q) {
        let {
            line: Z,
            column: D
        } = this.getPosition();
        return this.measuredText.getWrappedText().map((G, F, I) => {
            let Y = G;
            if (B && F === I.length - 1) {
                let K = Math.max(0, G.length - 6);
                Y = B.repeat(K) + G.slice(K)
            }
            if (Z !== F) return Y.trimEnd();
            let W = this.measuredText.displayWidthToStringIndex(Y, D),
                J = Array.from(gC0.segment(Y)).map(({
                    segment: K,
                    index: H
                }) => ({
                    segment: K,
                    index: H
                })),
                X = "",
                V = A,
                C = "";
            for (let {
                    segment: K,
                    index: H
                }
                of J) {
                let z = H + K.length;
                if (z <= W) X += K;
                else if (H < W && z > W) V = K;
                else if (H === W) V = K;
                else C += K
            }
            return X + Q(V) + C.trimEnd()
        }).join(`
`)
    }
    left() {
        if (this.offset === 0) return this;
        let A = this.measuredText.prevOffset(this.offset);
        return new k8(this.measuredText, A)
    }
    right() {
        if (this.offset >= this.text.length) return this;
        let A = this.measuredText.nextOffset(this.offset);
        return new k8(this.measuredText, Math.min(A, this.text.length))
    }
    up() {
        let {
            line: A,
            column: B
        } = this.getPosition();
        if (A === 0) return this;
        let Q = this.measuredText.getWrappedText()[A - 1];
        if (!Q) return this;
        let Z = qM.default(Q);
        if (B > Z) {
            let G = this.getOffset({
                line: A - 1,
                column: Z
            });
            return new k8(this.measuredText, G, 0)
        }
        let D = this.getOffset({
            line: A - 1,
            column: B
        });
        return new k8(this.measuredText, D, 0)
    }
    down() {
        let {
            line: A,
            column: B
        } = this.getPosition();
        if (A >= this.measuredText.lineCount - 1) return this;
        let Q = this.measuredText.getWrappedText()[A + 1];
        if (!Q) return this;
        let Z = qM.default(Q);
        if (B > Z) {
            let G = this.getOffset({
                line: A + 1,
                column: Z
            });
            return new k8(this.measuredText, G, 0)
        }
        let D = this.getOffset({
            line: A + 1,
            column: B
        });
        return new k8(this.measuredText, D, 0)
    }
    startOfLine() {
        let {
            line: A
        } = this.getPosition();
        return new k8(this.measuredText, this.getOffset({
            line: A,
            column: 0
        }), 0)
    }
    firstNonBlankInLine() {
        let {
            line: A
        } = this.getPosition(), Q = (this.measuredText.getWrappedText()[A] || "").match(/^\s*\S/), Z = Q?.index ? Q.index + Q[0].length - 1 : 0, D = this.getOffset({
            line: A,
            column: Z
        });
        return new k8(this.measuredText, D, 0)
    }
    endOfLine() {
        let {
            line: A
        } = this.getPosition(), B = this.measuredText.getLineLength(A), Q = this.getOffset({
            line: A,
            column: B
        });
        return new k8(this.measuredText, Q, 0)
    }
    findLogicalLineStart(A = this.offset) {
        let B = this.text.lastIndexOf(`
`, A - 1);
        return B === -1 ? 0 : B + 1
    }
    findLogicalLineEnd(A = this.offset) {
        let B = this.text.indexOf(`
`, A);
        return B === -1 ? this.text.length : B
    }
    getLogicalLineBounds() {
        return {
            start: this.findLogicalLineStart(),
            end: this.findLogicalLineEnd()
        }
    }
    createCursorWithColumn(A, B, Q) {
        let Z = B - A,
            D = Math.min(Q, Z);
        return new k8(this.measuredText, A + D, 0)
    }
    endOfLogicalLine() {
        return new k8(this.measuredText, this.findLogicalLineEnd(), 0)
    }
    startOfLogicalLine() {
        return new k8(this.measuredText, this.findLogicalLineStart(), 0)
    }
    firstNonBlankInLogicalLine() {
        let {
            start: A,
            end: B
        } = this.getLogicalLineBounds(), Z = this.text.slice(A, B).match(/\S/), D = A + (Z?.index ?? 0);
        return new k8(this.measuredText, D, 0)
    }
    upLogicalLine() {
        let {
            start: A
        } = this.getLogicalLineBounds();
        if (A === 0) return new k8(this.measuredText, 0, 0);
        let B = this.offset - A,
            Q = A - 1,
            Z = this.findLogicalLineStart(Q);
        return this.createCursorWithColumn(Z, Q, B)
    }
    downLogicalLine() {
        let {
            start: A,
            end: B
        } = this.getLogicalLineBounds();
        if (B >= this.text.length) return new k8(this.measuredText, this.text.length, 0);
        let Q = this.offset - A,
            Z = B + 1,
            D = this.findLogicalLineEnd(Z);
        return this.createCursorWithColumn(Z, D, Q)
    }
    nextWord() {
        let A = this;
        while (A.isOverWordChar() && !A.isAtEnd()) A = A.right();
        while (!A.isOverWordChar() && !A.isAtEnd()) A = A.right();
        return A
    }
    endOfWord() {
        let A = this;
        if (A.isOverWordChar() && (!A.right().isOverWordChar() || A.right().isAtEnd())) return A = A.right(), A.endOfWord();
        if (!A.isOverWordChar()) A = A.nextWord();
        while (A.right().isOverWordChar() && !A.isAtEnd()) A = A.right();
        return A
    }
    prevWord() {
        let A = this;
        if (!A.left().isOverWordChar()) A = A.left();
        while (!A.isOverWordChar() && !A.isAtStart()) A = A.left();
        if (A.isOverWordChar())
            while (A.left().isOverWordChar() && !A.isAtStart()) A = A.left();
        return A
    }
    nextWORD() {
        let A = this;
        while (!A.isOverWhitespace() && !A.isAtEnd()) A = A.right();
        while (A.isOverWhitespace() && !A.isAtEnd()) A = A.right();
        return A
    }
    endOfWORD() {
        let A = this;
        if (!A.isOverWhitespace() && (A.right().isOverWhitespace() || A.right().isAtEnd())) return A = A.right(), A.endOfWORD();
        if (A.isOverWhitespace()) A = A.nextWORD();
        while (!A.right().isOverWhitespace() && !A.isAtEnd()) A = A.right();
        return A
    }
    prevWORD() {
        let A = this;
        if (A.left().isOverWhitespace()) A = A.left();
        while (A.isOverWhitespace() && !A.isAtStart()) A = A.left();
        if (!A.isOverWhitespace())
            while (!A.left().isOverWhitespace() && !A.isAtStart()) A = A.left();
        return A
    }
    modifyText(A, B = "") {
        let Q = this.offset,
            Z = A.offset,
            D = this.text.slice(0, Q) + B + this.text.slice(Z);
        return k8.fromText(D, this.columns, Q + B.normalize("NFC").length)
    }
    insert(A) {
        return this.modifyText(this, A)
    }
    del() {
        if (this.isAtEnd()) return this;
        return this.modifyText(this.right())
    }
    backspace() {
        if (this.isAtStart()) return this;
        return this.left().modifyText(this)
    }
    deleteToLineStart() {
        return this.startOfLine().modifyText(this)
    }
    deleteToLineEnd() {
        if (this.text[this.offset] === `
`) return this.modifyText(this.right());
        return this.modifyText(this.endOfLine())
    }
    deleteToLogicalLineEnd() {
        if (this.text[this.offset] === `
`) return this.modifyText(this.right());
        return this.modifyText(this.endOfLogicalLine())
    }
    deleteWordBefore() {
        if (this.isAtStart()) return this;
        return this.prevWord().modifyText(this)
    }
    deleteWordAfter() {
        if (this.isAtEnd()) return this;
        return this.modifyText(this.nextWord())
    }
    isOverWordChar() {
        let A = this.text[this.offset] ?? "";
        return /\w/.test(A)
    }
    isOverWhitespace() {
        let A = this.text[this.offset] ?? "";
        return /\s/.test(A)
    }
    equals(A) {
        return this.offset === A.offset && this.measuredText === A.measuredText
    }
    isAtStart() {
        return this.offset === 0
    }
    isAtEnd() {
        return this.offset >= this.text.length
    }
    startOfFirstLine() {
        return new k8(this.measuredText, 0, 0)
    }
    startOfLastLine() {
        let A = this.text.lastIndexOf(`
`);
        if (A === -1) return this.startOfLine();
        return new k8(this.measuredText, A + 1, 0)
    }
    get text() {
        return this.measuredText.text
    }
    get columns() {
        return this.measuredText.columns + 1
    }
    getPosition() {
        return this.measuredText.getPositionFromOffset(this.offset)
    }
    getOffset(A) {
        return this.measuredText.getOffsetFromPosition(A)
    }
}
class Jj1 {
    text;
    startOffset;
    isPrecededByNewline;
    endsWithNewline;
    constructor(A, B, Q, Z = !1) {
        this.text = A;
        this.startOffset = B;
        this.isPrecededByNewline = Q;
        this.endsWithNewline = Z
    }
    equals(A) {
        return this.text === A.text && this.startOffset === A.startOffset
    }
    get length() {
        return this.text.length + (this.endsWithNewline ? 1 : 0)
    }
}
class N4B {
    columns;
    wrappedLines;
    text;
    graphemes;
    constructor(A, B) {
        this.columns = B;
        this.text = A.normalize("NFC"), this.graphemes = Array.from(gC0.segment(this.text)).map(({
            segment: Q,
            index: Z
        }) => ({
            grapheme: Q,
            start: Z,
            end: Z + Q.length,
            width: qM.default(Q)
        })), this.wrappedLines = this.measureWrappedText()
    }
    stringIndexToDisplayWidth(A, B) {
        if (B <= 0) return 0;
        if (B >= A.length) return qM.default(A);
        return qM.default(A.substring(0, B))
    }
    displayWidthToStringIndex(A, B) {
        if (B <= 0) return 0;
        if (!A) return 0;
        if (A === this.text) return this.offsetAtDisplayWidth(B);
        let Q = 0,
            Z = 0;
        for (let {
                segment: D,
                index: G
            }
            of gC0.segment(A)) {
            let F = qM.default(D);
            if (Q + F > B) break;
            Q += F, Z = G + D.length
        }
        return Z
    }
    offsetAtDisplayWidth(A) {
        if (A <= 0) return 0;
        let B = 0;
        for (let Q of this.graphemes) {
            if (B + Q.width > A) return Q.start;
            B += Q.width
        }
        return this.text.length
    }
    measureWrappedText() {
        let A = a51(this.text, this.columns, {
                hard: !0,
                trim: !1
            }),
            B = [],
            Q = 0,
            Z = -1,
            D = A.split(`
`);
        for (let G = 0; G < D.length; G++) {
            let F = D[G],
                I = (Y) => G === 0 || Y > 0 && this.text[Y - 1] === `
`;
            if (F.length === 0)
                if (Z = this.text.indexOf(`
`, Z + 1), Z !== -1) {
                    let Y = Z,
                        W = !0;
                    B.push(new Jj1(F, Y, I(Y), !0))
                } else {
                    let Y = this.text.length;
                    B.push(new Jj1(F, Y, I(Y), !1))
                }
            else {
                let Y = this.text.indexOf(F, Q);
                if (Y === -1) throw new Error("Failed to find wrapped line in text");
                Q = Y + F.length;
                let W = Y + F.length,
                    J = W < this.text.length && this.text[W] === `
`;
                if (J) Z = W;
                B.push(new Jj1(F, Y, I(Y), J))
            }
        }
        return B
    }
    getWrappedText() {
        return this.wrappedLines.map((A) => A.isPrecededByNewline ? A.text : A.text.trimStart())
    }
    getWrappedLines() {
        return this.wrappedLines
    }
    getLine(A) {
        return this.wrappedLines[Math.max(0, Math.min(A, this.wrappedLines.length - 1))]
    }
    getOffsetFromPosition(A) {
        let B = this.getLine(A.line);
        if (B.text.length === 0 && B.endsWithNewline) return B.startOffset;
        let Q = B.isPrecededByNewline ? 0 : B.text.length - B.text.trimStart().length,
            Z = A.column + Q,
            D = this.displayWidthToStringIndex(B.text, Z),
            G = B.startOffset + D,
            F = B.startOffset + B.text.length,
            I = F,
            Y = qM.default(B.text);
        if (B.endsWithNewline && A.column > Y) I = F + 1;
        return Math.min(G, I)
    }
    getLineLength(A) {
        let B = this.getLine(A);
        return qM.default(B.text)
    }
    getPositionFromOffset(A) {
        let B = this.wrappedLines;
        for (let D = 0; D < B.length; D++) {
            let G = B[D],
                F = B[D + 1];
            if (A >= G.startOffset && (!F || A < F.startOffset)) {
                let I = A - G.startOffset,
                    Y;
                if (G.isPrecededByNewline) Y = this.stringIndexToDisplayWidth(G.text, I);
                else {
                    let W = G.text.length - G.text.trimStart().length;
                    if (I < W) Y = 0;
                    else {
                        let J = G.text.trimStart(),
                            X = I - W;
                        Y = this.stringIndexToDisplayWidth(J, X)
                    }
                }
                return {
                    line: D,
                    column: Math.max(0, Y)
                }
            }
        }
        let Q = B.length - 1,
            Z = this.wrappedLines[Q];
        return {
            line: Q,
            column: qM.default(Z.text)
        }
    }
    get lineCount() {
        return this.wrappedLines.length
    }
    nextOffset(A) {
        let B = this.graphemes.find((Q) => A >= Q.start && A < Q.end);
        if (B) return B.end;
        for (let Q of this.graphemes)
            if (Q.start > A) return Q.start;
        return this.text.length
    }
    prevOffset(A) {
        let B = 0;
        for (let Q of this.graphemes) {
            if (Q.start >= A) return B;
            B = Q.start
        }
        return B
    }
}
import {
    execSync as vj1
} from "child_process";
import {
    basename as nS6,
    extname as aS6,
    isAbsolute as sS6
} from "path";
var VK0 = 3932160,
    _j1 = 2000,
    xj1 = 2000;
async function WZ1(A, B, Q) {
    try {
        let Z = await Promise.resolve().then(() => G1(yj1(), 1)),
            G = (Z.default || Z)(A),
            F = await G.metadata();
        if (!F.width || !F.height) {
            if (B > VK0) return {
                buffer: await G.jpeg({
                    quality: 80
                }).toBuffer(),
                mediaType: "jpeg"
            }
        }
        let I = F.width || 0,
            Y = F.height || 0,
            W = F.format ?? Q,
            J = W === "jpg" ? "jpeg" : W;
        if (B <= VK0 && I <= _j1 && Y <= xj1) return {
            buffer: A,
            mediaType: J
        };
        if (I > _j1) Y = Math.round(Y * _j1 / I), I = _j1;
        if (Y > xj1) I = Math.round(I * xj1 / Y), Y = xj1;
        let X = await G.resize(I, Y, {
            fit: "inside",
            withoutEnlargement: !0
        }).toBuffer();
        if (X.length > VK0) return {
            buffer: await G.jpeg({
                quality: 80
            }).toBuffer(),
            mediaType: "jpeg"
        };
        return {
            buffer: X,
            mediaType: J
        }
    } catch (Z) {
        return R1(Z), {
            buffer: A,
            mediaType: Q === "jpg" ? "jpeg" : Q
        }
    }
}

function rS6() {
    let A = process.platform,
        B = {
            darwin: "No image found in clipboard. Use Cmd + Ctrl + Shift + 4 to copy a screenshot to clipboard.",
            win32: "No image found in clipboard. Use Print Screen to copy a screenshot to clipboard.",
            linux: "No image found in clipboard. Use appropriate screenshot tool to copy a screenshot to clipboard."
        };
    return B[A] || B.linux
}
var f8B = rS6();
var bj1 = 800;

function h8B() {
    let A = process.platform,
        B = {
            darwin: "/tmp/claude_cli_latest_screenshot.png",
            linux: "/tmp/claude_cli_latest_screenshot.png",
            win32: process.env.TEMP ? `${process.env.TEMP}\\claude_cli_latest_screenshot.png` : "C:\\Temp\\claude_cli_latest_screenshot.png"
        },
        Q = B[A] || B.linux,
        Z = {
            darwin: {
                checkImage: "osascript -e 'the clipboard as «class PNGf»'",
                saveImage: `osascript -e 'set png_data to (the clipboard as «class PNGf»)' -e 'set fp to open for access POSIX file "${Q}" with write permission' -e 'write png_data to fp' -e 'close access fp'`,
                getPath: "osascript -e 'get POSIX path of (the clipboard as «class furl»)'",
                deleteFile: `rm -f "${Q}"`
            },
            linux: {
                checkImage: 'xclip -selection clipboard -t TARGETS -o | grep -E "image/(png|jpeg|jpg|gif|webp)"',
                saveImage: `xclip -selection clipboard -t image/png -o > "${Q}" || wl-paste --type image/png > "${Q}"`,
                getPath: "xclip -selection clipboard -t text/plain -o",
                deleteFile: `rm -f "${Q}"`
            },
            win32: {
                checkImage: 'powershell -Command "(Get-Clipboard -Format Image) -ne $null"',
                saveImage: `powershell -Command "$img = Get-Clipboard -Format Image; if ($img) { $img.Save('${Q.replace(/\\/g,"\\\\")}', [System.Drawing.Imaging.ImageFormat]::Png) }"`,
                getPath: 'powershell -Command "Get-Clipboard"',
                deleteFile: `del /f "${Q}"`
            }
        };
    return {
        commands: Z[A] || Z.linux,
        screenshotPath: Q
    }
}
async function fj1() {
    let {
        commands: A,
        screenshotPath: B
    } = h8B();
    try {
        vj1(A.checkImage, {
            stdio: "ignore"
        }), vj1(A.saveImage, {
            stdio: "ignore"
        });
        let Q = j1().readFileBytesSync(B),
            {
                buffer: Z
            } = await WZ1(Q, Q.length, "png"),
            D = Z.toString("base64"),
            G = u8B(D);
        return vj1(A.deleteFile, {
            stdio: "ignore"
        }), {
            base64: D,
            mediaType: G
        }
    } catch {
        return null
    }
}

function oS6() {
    let {
        commands: A
    } = h8B();
    try {
        return vj1(A.getPath, {
            encoding: "utf-8"
        }).trim()
    } catch (B) {
        return R1(B), null
    }
}
var g8B = /\.(png|jpe?g|gif|webp)$/i;

function u8B(A) {
    try {
        let B = Buffer.from(A, "base64");
        if (B.length < 4) return "image/png";
        if (B[0] === 137 && B[1] === 80 && B[2] === 78 && B[3] === 71) return "image/png";
        if (B[0] === 255 && B[1] === 216 && B[2] === 255) return "image/jpeg";
        if (B[0] === 71 && B[1] === 73 && B[2] === 70) return "image/gif";
        if (B[0] === 82 && B[1] === 73 && B[2] === 70 && B[3] === 70) {
            if (B.length >= 12 && B[8] === 87 && B[9] === 69 && B[10] === 66 && B[11] === 80) return "image/webp"
        }
        return "image/png"
    } catch {
        return "image/png"
    }
}