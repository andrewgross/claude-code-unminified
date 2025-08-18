/* chunk:440 bytes:[10434060, 10436719) size:2659 source:unpacked-cli.js */
var kRB = E((ZF3, jRB) => {
    var e11 = vv1(),
        kq0 = bv1(),
        Id = e11.CODE_POINTS;
    class SRB {
        constructor() {
            this.html = null, this.pos = -1, this.lastGapPos = -1, this.lastCharPos = -1, this.gapStack = [], this.skipNextNewLine = !1, this.lastChunkWritten = !1, this.endOfChunkHit = !1, this.bufferWaterline = 65536
        }
        _err() {}
        _addGap() {
            this.gapStack.push(this.lastGapPos), this.lastGapPos = this.pos
        }
        _processSurrogate(A) {
            if (this.pos !== this.lastCharPos) {
                let B = this.html.charCodeAt(this.pos + 1);
                if (e11.isSurrogatePair(B)) return this.pos++, this._addGap(), e11.getSurrogatePairCodePoint(A, B)
            } else if (!this.lastChunkWritten) return this.endOfChunkHit = !0, Id.EOF;
            return this._err(kq0.surrogateInInputStream), A
        }
        dropParsedChunk() {
            if (this.pos > this.bufferWaterline) this.lastCharPos -= this.pos, this.html = this.html.substring(this.pos), this.pos = 0, this.lastGapPos = -1, this.gapStack = []
        }
        write(A, B) {
            if (this.html) this.html += A;
            else this.html = A;
            this.lastCharPos = this.html.length - 1, this.endOfChunkHit = !1, this.lastChunkWritten = B
        }
        insertHtmlAtCurrentPos(A) {
            this.html = this.html.substring(0, this.pos + 1) + A + this.html.substring(this.pos + 1, this.html.length), this.lastCharPos = this.html.length - 1, this.endOfChunkHit = !1
        }
        advance() {
            if (this.pos++, this.pos > this.lastCharPos) return this.endOfChunkHit = !this.lastChunkWritten, Id.EOF;
            let A = this.html.charCodeAt(this.pos);
            if (this.skipNextNewLine && A === Id.LINE_FEED) return this.skipNextNewLine = !1, this._addGap(), this.advance();
            if (A === Id.CARRIAGE_RETURN) return this.skipNextNewLine = !0, Id.LINE_FEED;
            if (this.skipNextNewLine = !1, e11.isSurrogate(A)) A = this._processSurrogate(A);
            if (!(A > 31 && A < 127 || A === Id.LINE_FEED || A === Id.CARRIAGE_RETURN || A > 159 && A < 64976)) this._checkForProblematicCharacters(A);
            return A
        }
        _checkForProblematicCharacters(A) {
            if (e11.isControlCodePoint(A)) this._err(kq0.controlCharacterInInputStream);
            else if (e11.isUndefinedCodePoint(A)) this._err(kq0.noncharacterInInputStream)
        }
        retreat() {
            if (this.pos === this.lastGapPos) this.lastGapPos = this.gapStack.pop(), this.pos--;
            this.pos--
        }
    }
    jRB.exports = SRB
});