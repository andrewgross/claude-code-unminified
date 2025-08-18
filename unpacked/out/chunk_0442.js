/* chunk:442 bytes:[10529729, 10581692) size:51963 source:unpacked-cli.js */
var RG1 = E((GF3, fRB) => {
    var X58 = kRB(),
        w3 = vv1(),
        Jd = _RB(),
        NA = bv1(),
        X0 = w3.CODE_POINTS,
        Yd = w3.CODE_POINT_SEQUENCES,
        V58 = {
            128: 8364,
            130: 8218,
            131: 402,
            132: 8222,
            133: 8230,
            134: 8224,
            135: 8225,
            136: 710,
            137: 8240,
            138: 352,
            139: 8249,
            140: 338,
            142: 381,
            145: 8216,
            146: 8217,
            147: 8220,
            148: 8221,
            149: 8226,
            150: 8211,
            151: 8212,
            152: 732,
            153: 8482,
            154: 353,
            155: 8250,
            156: 339,
            158: 382,
            159: 376
        };

    function y7(A) {
        return A === X0.SPACE || A === X0.LINE_FEED || A === X0.TABULATION || A === X0.FORM_FEED
    }

    function MG1(A) {
        return A >= X0.DIGIT_0 && A <= X0.DIGIT_9
    }

    function b$(A) {
        return A >= X0.LATIN_CAPITAL_A && A <= X0.LATIN_CAPITAL_Z
    }

    function Wd(A) {
        return A >= X0.LATIN_SMALL_A && A <= X0.LATIN_SMALL_Z
    }

    function Sv(A) {
        return Wd(A) || b$(A)
    }

    function yq0(A) {
        return Sv(A) || MG1(A)
    }

    function vRB(A) {
        return A >= X0.LATIN_CAPITAL_A && A <= X0.LATIN_CAPITAL_F
    }

    function bRB(A) {
        return A >= X0.LATIN_SMALL_A && A <= X0.LATIN_SMALL_F
    }

    function C58(A) {
        return MG1(A) || vRB(A) || bRB(A)
    }

    function fv1(A) {
        return A + 32
    }

    function $D(A) {
        if (A <= 65535) return String.fromCharCode(A);
        return A -= 65536, String.fromCharCode(A >>> 10 & 1023 | 55296) + String.fromCharCode(56320 | A & 1023)
    }

    function Pv(A) {
        return String.fromCharCode(fv1(A))
    }

    function xRB(A, B) {
        let Q = Jd[++A],
            Z = ++A,
            D = Z + Q - 1;
        while (Z <= D) {
            let G = Z + D >>> 1,
                F = Jd[G];
            if (F < B) Z = G + 1;
            else if (F > B) D = G - 1;
            else return Jd[G + Q]
        }
        return -1
    }
    class X7 {
        constructor() {
            this.preprocessor = new X58, this.tokenQueue = [], this.allowCDATA = !1, this.state = "DATA_STATE", this.returnState = "", this.charRefCode = -1, this.tempBuff = [], this.lastStartTagName = "", this.consumedAfterSnapshot = -1, this.active = !1, this.currentCharacterToken = null, this.currentToken = null, this.currentAttr = null
        }
        _err() {}
        _errOnNextCodePoint(A) {
            this._consume(), this._err(A), this._unconsume()
        }
        getNextToken() {
            while (!this.tokenQueue.length && this.active) {
                this.consumedAfterSnapshot = 0;
                let A = this._consume();
                if (!this._ensureHibernation()) this[this.state](A)
            }
            return this.tokenQueue.shift()
        }
        write(A, B) {
            this.active = !0, this.preprocessor.write(A, B)
        }
        insertHtmlAtCurrentPos(A) {
            this.active = !0, this.preprocessor.insertHtmlAtCurrentPos(A)
        }
        _ensureHibernation() {
            if (this.preprocessor.endOfChunkHit) {
                for (; this.consumedAfterSnapshot > 0; this.consumedAfterSnapshot--) this.preprocessor.retreat();
                return this.active = !1, this.tokenQueue.push({
                    type: X7.HIBERNATION_TOKEN
                }), !0
            }
            return !1
        }
        _consume() {
            return this.consumedAfterSnapshot++, this.preprocessor.advance()
        }
        _unconsume() {
            this.consumedAfterSnapshot--, this.preprocessor.retreat()
        }
        _reconsumeInState(A) {
            this.state = A, this._unconsume()
        }
        _consumeSequenceIfMatch(A, B, Q) {
            let Z = 0,
                D = !0,
                G = A.length,
                F = 0,
                I = B,
                Y = void 0;
            for (; F < G; F++) {
                if (F > 0) I = this._consume(), Z++;
                if (I === X0.EOF) {
                    D = !1;
                    break
                }
                if (Y = A[F], I !== Y && (Q || I !== fv1(Y))) {
                    D = !1;
                    break
                }
            }
            if (!D)
                while (Z--) this._unconsume();
            return D
        }
        _isTempBufferEqualToScriptString() {
            if (this.tempBuff.length !== Yd.SCRIPT_STRING.length) return !1;
            for (let A = 0; A < this.tempBuff.length; A++)
                if (this.tempBuff[A] !== Yd.SCRIPT_STRING[A]) return !1;
            return !0
        }
        _createStartTagToken() {
            this.currentToken = {
                type: X7.START_TAG_TOKEN,
                tagName: "",
                selfClosing: !1,
                ackSelfClosing: !1,
                attrs: []
            }
        }
        _createEndTagToken() {
            this.currentToken = {
                type: X7.END_TAG_TOKEN,
                tagName: "",
                selfClosing: !1,
                attrs: []
            }
        }
        _createCommentToken() {
            this.currentToken = {
                type: X7.COMMENT_TOKEN,
                data: ""
            }
        }
        _createDoctypeToken(A) {
            this.currentToken = {
                type: X7.DOCTYPE_TOKEN,
                name: A,
                forceQuirks: !1,
                publicId: null,
                systemId: null
            }
        }
        _createCharacterToken(A, B) {
            this.currentCharacterToken = {
                type: A,
                chars: B
            }
        }
        _createEOFToken() {
            this.currentToken = {
                type: X7.EOF_TOKEN
            }
        }
        _createAttr(A) {
            this.currentAttr = {
                name: A,
                value: ""
            }
        }
        _leaveAttrName(A) {
            if (X7.getTokenAttr(this.currentToken, this.currentAttr.name) === null) this.currentToken.attrs.push(this.currentAttr);
            else this._err(NA.duplicateAttribute);
            this.state = A
        }
        _leaveAttrValue(A) {
            this.state = A
        }
        _emitCurrentToken() {
            this._emitCurrentCharacterToken();
            let A = this.currentToken;
            if (this.currentToken = null, A.type === X7.START_TAG_TOKEN) this.lastStartTagName = A.tagName;
            else if (A.type === X7.END_TAG_TOKEN) {
                if (A.attrs.length > 0) this._err(NA.endTagWithAttributes);
                if (A.selfClosing) this._err(NA.endTagWithTrailingSolidus)
            }
            this.tokenQueue.push(A)
        }
        _emitCurrentCharacterToken() {
            if (this.currentCharacterToken) this.tokenQueue.push(this.currentCharacterToken), this.currentCharacterToken = null
        }
        _emitEOFToken() {
            this._createEOFToken(), this._emitCurrentToken()
        }
        _appendCharToCurrentCharacterToken(A, B) {
            if (this.currentCharacterToken && this.currentCharacterToken.type !== A) this._emitCurrentCharacterToken();
            if (this.currentCharacterToken) this.currentCharacterToken.chars += B;
            else this._createCharacterToken(A, B)
        }
        _emitCodePoint(A) {
            let B = X7.CHARACTER_TOKEN;
            if (y7(A)) B = X7.WHITESPACE_CHARACTER_TOKEN;
            else if (A === X0.NULL) B = X7.NULL_CHARACTER_TOKEN;
            this._appendCharToCurrentCharacterToken(B, $D(A))
        }
        _emitSeveralCodePoints(A) {
            for (let B = 0; B < A.length; B++) this._emitCodePoint(A[B])
        }
        _emitChars(A) {
            this._appendCharToCurrentCharacterToken(X7.CHARACTER_TOKEN, A)
        }
        _matchNamedCharacterReference(A) {
            let B = null,
                Q = 1,
                Z = xRB(0, A);
            this.tempBuff.push(A);
            while (Z > -1) {
                let D = Jd[Z],
                    G = D < 7;
                if (G && D & 1) B = D & 2 ? [Jd[++Z], Jd[++Z]] : [Jd[++Z]], Q = 0;
                let I = this._consume();
                if (this.tempBuff.push(I), Q++, I === X0.EOF) break;
                if (G) Z = D & 4 ? xRB(Z, I) : -1;
                else Z = I === D ? ++Z : -1
            }
            while (Q--) this.tempBuff.pop(), this._unconsume();
            return B
        }
        _isCharacterReferenceInAttribute() {
            return this.returnState === "ATTRIBUTE_VALUE_DOUBLE_QUOTED_STATE" || this.returnState === "ATTRIBUTE_VALUE_SINGLE_QUOTED_STATE" || this.returnState === "ATTRIBUTE_VALUE_UNQUOTED_STATE"
        }
        _isCharacterReferenceAttributeQuirk(A) {
            if (!A && this._isCharacterReferenceInAttribute()) {
                let B = this._consume();
                return this._unconsume(), B === X0.EQUALS_SIGN || yq0(B)
            }
            return !1
        }
        _flushCodePointsConsumedAsCharacterReference() {
            if (this._isCharacterReferenceInAttribute())
                for (let A = 0; A < this.tempBuff.length; A++) this.currentAttr.value += $D(this.tempBuff[A]);
            else this._emitSeveralCodePoints(this.tempBuff);
            this.tempBuff = []
        } ["DATA_STATE"](A) {
            if (this.preprocessor.dropParsedChunk(), A === X0.LESS_THAN_SIGN) this.state = "TAG_OPEN_STATE";
            else if (A === X0.AMPERSAND) this.returnState = "DATA_STATE", this.state = "CHARACTER_REFERENCE_STATE";
            else if (A === X0.NULL) this._err(NA.unexpectedNullCharacter), this._emitCodePoint(A);
            else if (A === X0.EOF) this._emitEOFToken();
            else this._emitCodePoint(A)
        } ["RCDATA_STATE"](A) {
            if (this.preprocessor.dropParsedChunk(), A === X0.AMPERSAND) this.returnState = "RCDATA_STATE", this.state = "CHARACTER_REFERENCE_STATE";
            else if (A === X0.LESS_THAN_SIGN) this.state = "RCDATA_LESS_THAN_SIGN_STATE";
            else if (A === X0.NULL) this._err(NA.unexpectedNullCharacter), this._emitChars(w3.REPLACEMENT_CHARACTER);
            else if (A === X0.EOF) this._emitEOFToken();
            else this._emitCodePoint(A)
        } ["RAWTEXT_STATE"](A) {
            if (this.preprocessor.dropParsedChunk(), A === X0.LESS_THAN_SIGN) this.state = "RAWTEXT_LESS_THAN_SIGN_STATE";
            else if (A === X0.NULL) this._err(NA.unexpectedNullCharacter), this._emitChars(w3.REPLACEMENT_CHARACTER);
            else if (A === X0.EOF) this._emitEOFToken();
            else this._emitCodePoint(A)
        } ["SCRIPT_DATA_STATE"](A) {
            if (this.preprocessor.dropParsedChunk(), A === X0.LESS_THAN_SIGN) this.state = "SCRIPT_DATA_LESS_THAN_SIGN_STATE";
            else if (A === X0.NULL) this._err(NA.unexpectedNullCharacter), this._emitChars(w3.REPLACEMENT_CHARACTER);
            else if (A === X0.EOF) this._emitEOFToken();
            else this._emitCodePoint(A)
        } ["PLAINTEXT_STATE"](A) {
            if (this.preprocessor.dropParsedChunk(), A === X0.NULL) this._err(NA.unexpectedNullCharacter), this._emitChars(w3.REPLACEMENT_CHARACTER);
            else if (A === X0.EOF) this._emitEOFToken();
            else this._emitCodePoint(A)
        } ["TAG_OPEN_STATE"](A) {
            if (A === X0.EXCLAMATION_MARK) this.state = "MARKUP_DECLARATION_OPEN_STATE";
            else if (A === X0.SOLIDUS) this.state = "END_TAG_OPEN_STATE";
            else if (Sv(A)) this._createStartTagToken(), this._reconsumeInState("TAG_NAME_STATE");
            else if (A === X0.QUESTION_MARK) this._err(NA.unexpectedQuestionMarkInsteadOfTagName), this._createCommentToken(), this._reconsumeInState("BOGUS_COMMENT_STATE");
            else if (A === X0.EOF) this._err(NA.eofBeforeTagName), this._emitChars("<"), this._emitEOFToken();
            else this._err(NA.invalidFirstCharacterOfTagName), this._emitChars("<"), this._reconsumeInState("DATA_STATE")
        } ["END_TAG_OPEN_STATE"](A) {
            if (Sv(A)) this._createEndTagToken(), this._reconsumeInState("TAG_NAME_STATE");
            else if (A === X0.GREATER_THAN_SIGN) this._err(NA.missingEndTagName), this.state = "DATA_STATE";
            else if (A === X0.EOF) this._err(NA.eofBeforeTagName), this._emitChars("</"), this._emitEOFToken();
            else this._err(NA.invalidFirstCharacterOfTagName), this._createCommentToken(), this._reconsumeInState("BOGUS_COMMENT_STATE")
        } ["TAG_NAME_STATE"](A) {
            if (y7(A)) this.state = "BEFORE_ATTRIBUTE_NAME_STATE";
            else if (A === X0.SOLIDUS) this.state = "SELF_CLOSING_START_TAG_STATE";
            else if (A === X0.GREATER_THAN_SIGN) this.state = "DATA_STATE", this._emitCurrentToken();
            else if (b$(A)) this.currentToken.tagName += Pv(A);
            else if (A === X0.NULL) this._err(NA.unexpectedNullCharacter), this.currentToken.tagName += w3.REPLACEMENT_CHARACTER;
            else if (A === X0.EOF) this._err(NA.eofInTag), this._emitEOFToken();
            else this.currentToken.tagName += $D(A)
        } ["RCDATA_LESS_THAN_SIGN_STATE"](A) {
            if (A === X0.SOLIDUS) this.tempBuff = [], this.state = "RCDATA_END_TAG_OPEN_STATE";
            else this._emitChars("<"), this._reconsumeInState("RCDATA_STATE")
        } ["RCDATA_END_TAG_OPEN_STATE"](A) {
            if (Sv(A)) this._createEndTagToken(), this._reconsumeInState("RCDATA_END_TAG_NAME_STATE");
            else this._emitChars("</"), this._reconsumeInState("RCDATA_STATE")
        } ["RCDATA_END_TAG_NAME_STATE"](A) {
            if (b$(A)) this.currentToken.tagName += Pv(A), this.tempBuff.push(A);
            else if (Wd(A)) this.currentToken.tagName += $D(A), this.tempBuff.push(A);
            else {
                if (this.lastStartTagName === this.currentToken.tagName) {
                    if (y7(A)) {
                        this.state = "BEFORE_ATTRIBUTE_NAME_STATE";
                        return
                    }
                    if (A === X0.SOLIDUS) {
                        this.state = "SELF_CLOSING_START_TAG_STATE";
                        return
                    }
                    if (A === X0.GREATER_THAN_SIGN) {
                        this.state = "DATA_STATE", this._emitCurrentToken();
                        return
                    }
                }
                this._emitChars("</"), this._emitSeveralCodePoints(this.tempBuff), this._reconsumeInState("RCDATA_STATE")
            }
        } ["RAWTEXT_LESS_THAN_SIGN_STATE"](A) {
            if (A === X0.SOLIDUS) this.tempBuff = [], this.state = "RAWTEXT_END_TAG_OPEN_STATE";
            else this._emitChars("<"), this._reconsumeInState("RAWTEXT_STATE")
        } ["RAWTEXT_END_TAG_OPEN_STATE"](A) {
            if (Sv(A)) this._createEndTagToken(), this._reconsumeInState("RAWTEXT_END_TAG_NAME_STATE");
            else this._emitChars("</"), this._reconsumeInState("RAWTEXT_STATE")
        } ["RAWTEXT_END_TAG_NAME_STATE"](A) {
            if (b$(A)) this.currentToken.tagName += Pv(A), this.tempBuff.push(A);
            else if (Wd(A)) this.currentToken.tagName += $D(A), this.tempBuff.push(A);
            else {
                if (this.lastStartTagName === this.currentToken.tagName) {
                    if (y7(A)) {
                        this.state = "BEFORE_ATTRIBUTE_NAME_STATE";
                        return
                    }
                    if (A === X0.SOLIDUS) {
                        this.state = "SELF_CLOSING_START_TAG_STATE";
                        return
                    }
                    if (A === X0.GREATER_THAN_SIGN) {
                        this._emitCurrentToken(), this.state = "DATA_STATE";
                        return
                    }
                }
                this._emitChars("</"), this._emitSeveralCodePoints(this.tempBuff), this._reconsumeInState("RAWTEXT_STATE")
            }
        } ["SCRIPT_DATA_LESS_THAN_SIGN_STATE"](A) {
            if (A === X0.SOLIDUS) this.tempBuff = [], this.state = "SCRIPT_DATA_END_TAG_OPEN_STATE";
            else if (A === X0.EXCLAMATION_MARK) this.state = "SCRIPT_DATA_ESCAPE_START_STATE", this._emitChars("<!");
            else this._emitChars("<"), this._reconsumeInState("SCRIPT_DATA_STATE")
        } ["SCRIPT_DATA_END_TAG_OPEN_STATE"](A) {
            if (Sv(A)) this._createEndTagToken(), this._reconsumeInState("SCRIPT_DATA_END_TAG_NAME_STATE");
            else this._emitChars("</"), this._reconsumeInState("SCRIPT_DATA_STATE")
        } ["SCRIPT_DATA_END_TAG_NAME_STATE"](A) {
            if (b$(A)) this.currentToken.tagName += Pv(A), this.tempBuff.push(A);
            else if (Wd(A)) this.currentToken.tagName += $D(A), this.tempBuff.push(A);
            else {
                if (this.lastStartTagName === this.currentToken.tagName) {
                    if (y7(A)) {
                        this.state = "BEFORE_ATTRIBUTE_NAME_STATE";
                        return
                    } else if (A === X0.SOLIDUS) {
                        this.state = "SELF_CLOSING_START_TAG_STATE";
                        return
                    } else if (A === X0.GREATER_THAN_SIGN) {
                        this._emitCurrentToken(), this.state = "DATA_STATE";
                        return
                    }
                }
                this._emitChars("</"), this._emitSeveralCodePoints(this.tempBuff), this._reconsumeInState("SCRIPT_DATA_STATE")
            }
        } ["SCRIPT_DATA_ESCAPE_START_STATE"](A) {
            if (A === X0.HYPHEN_MINUS) this.state = "SCRIPT_DATA_ESCAPE_START_DASH_STATE", this._emitChars("-");
            else this._reconsumeInState("SCRIPT_DATA_STATE")
        } ["SCRIPT_DATA_ESCAPE_START_DASH_STATE"](A) {
            if (A === X0.HYPHEN_MINUS) this.state = "SCRIPT_DATA_ESCAPED_DASH_DASH_STATE", this._emitChars("-");
            else this._reconsumeInState("SCRIPT_DATA_STATE")
        } ["SCRIPT_DATA_ESCAPED_STATE"](A) {
            if (A === X0.HYPHEN_MINUS) this.state = "SCRIPT_DATA_ESCAPED_DASH_STATE", this._emitChars("-");
            else if (A === X0.LESS_THAN_SIGN) this.state = "SCRIPT_DATA_ESCAPED_LESS_THAN_SIGN_STATE";
            else if (A === X0.NULL) this._err(NA.unexpectedNullCharacter), this._emitChars(w3.REPLACEMENT_CHARACTER);
            else if (A === X0.EOF) this._err(NA.eofInScriptHtmlCommentLikeText), this._emitEOFToken();
            else this._emitCodePoint(A)
        } ["SCRIPT_DATA_ESCAPED_DASH_STATE"](A) {
            if (A === X0.HYPHEN_MINUS) this.state = "SCRIPT_DATA_ESCAPED_DASH_DASH_STATE", this._emitChars("-");
            else if (A === X0.LESS_THAN_SIGN) this.state = "SCRIPT_DATA_ESCAPED_LESS_THAN_SIGN_STATE";
            else if (A === X0.NULL) this._err(NA.unexpectedNullCharacter), this.state = "SCRIPT_DATA_ESCAPED_STATE", this._emitChars(w3.REPLACEMENT_CHARACTER);
            else if (A === X0.EOF) this._err(NA.eofInScriptHtmlCommentLikeText), this._emitEOFToken();
            else this.state = "SCRIPT_DATA_ESCAPED_STATE", this._emitCodePoint(A)
        } ["SCRIPT_DATA_ESCAPED_DASH_DASH_STATE"](A) {
            if (A === X0.HYPHEN_MINUS) this._emitChars("-");
            else if (A === X0.LESS_THAN_SIGN) this.state = "SCRIPT_DATA_ESCAPED_LESS_THAN_SIGN_STATE";
            else if (A === X0.GREATER_THAN_SIGN) this.state = "SCRIPT_DATA_STATE", this._emitChars(">");
            else if (A === X0.NULL) this._err(NA.unexpectedNullCharacter), this.state = "SCRIPT_DATA_ESCAPED_STATE", this._emitChars(w3.REPLACEMENT_CHARACTER);
            else if (A === X0.EOF) this._err(NA.eofInScriptHtmlCommentLikeText), this._emitEOFToken();
            else this.state = "SCRIPT_DATA_ESCAPED_STATE", this._emitCodePoint(A)
        } ["SCRIPT_DATA_ESCAPED_LESS_THAN_SIGN_STATE"](A) {
            if (A === X0.SOLIDUS) this.tempBuff = [], this.state = "SCRIPT_DATA_ESCAPED_END_TAG_OPEN_STATE";
            else if (Sv(A)) this.tempBuff = [], this._emitChars("<"), this._reconsumeInState("SCRIPT_DATA_DOUBLE_ESCAPE_START_STATE");
            else this._emitChars("<"), this._reconsumeInState("SCRIPT_DATA_ESCAPED_STATE")
        } ["SCRIPT_DATA_ESCAPED_END_TAG_OPEN_STATE"](A) {
            if (Sv(A)) this._createEndTagToken(), this._reconsumeInState("SCRIPT_DATA_ESCAPED_END_TAG_NAME_STATE");
            else this._emitChars("</"), this._reconsumeInState("SCRIPT_DATA_ESCAPED_STATE")
        } ["SCRIPT_DATA_ESCAPED_END_TAG_NAME_STATE"](A) {
            if (b$(A)) this.currentToken.tagName += Pv(A), this.tempBuff.push(A);
            else if (Wd(A)) this.currentToken.tagName += $D(A), this.tempBuff.push(A);
            else {
                if (this.lastStartTagName === this.currentToken.tagName) {
                    if (y7(A)) {
                        this.state = "BEFORE_ATTRIBUTE_NAME_STATE";
                        return
                    }
                    if (A === X0.SOLIDUS) {
                        this.state = "SELF_CLOSING_START_TAG_STATE";
                        return
                    }
                    if (A === X0.GREATER_THAN_SIGN) {
                        this._emitCurrentToken(), this.state = "DATA_STATE";
                        return
                    }
                }
                this._emitChars("</"), this._emitSeveralCodePoints(this.tempBuff), this._reconsumeInState("SCRIPT_DATA_ESCAPED_STATE")
            }
        } ["SCRIPT_DATA_DOUBLE_ESCAPE_START_STATE"](A) {
            if (y7(A) || A === X0.SOLIDUS || A === X0.GREATER_THAN_SIGN) this.state = this._isTempBufferEqualToScriptString() ? "SCRIPT_DATA_DOUBLE_ESCAPED_STATE" : "SCRIPT_DATA_ESCAPED_STATE", this._emitCodePoint(A);
            else if (b$(A)) this.tempBuff.push(fv1(A)), this._emitCodePoint(A);
            else if (Wd(A)) this.tempBuff.push(A), this._emitCodePoint(A);
            else this._reconsumeInState("SCRIPT_DATA_ESCAPED_STATE")
        } ["SCRIPT_DATA_DOUBLE_ESCAPED_STATE"](A) {
            if (A === X0.HYPHEN_MINUS) this.state = "SCRIPT_DATA_DOUBLE_ESCAPED_DASH_STATE", this._emitChars("-");
            else if (A === X0.LESS_THAN_SIGN) this.state = "SCRIPT_DATA_DOUBLE_ESCAPED_LESS_THAN_SIGN_STATE", this._emitChars("<");
            else if (A === X0.NULL) this._err(NA.unexpectedNullCharacter), this._emitChars(w3.REPLACEMENT_CHARACTER);
            else if (A === X0.EOF) this._err(NA.eofInScriptHtmlCommentLikeText), this._emitEOFToken();
            else this._emitCodePoint(A)
        } ["SCRIPT_DATA_DOUBLE_ESCAPED_DASH_STATE"](A) {
            if (A === X0.HYPHEN_MINUS) this.state = "SCRIPT_DATA_DOUBLE_ESCAPED_DASH_DASH_STATE", this._emitChars("-");
            else if (A === X0.LESS_THAN_SIGN) this.state = "SCRIPT_DATA_DOUBLE_ESCAPED_LESS_THAN_SIGN_STATE", this._emitChars("<");
            else if (A === X0.NULL) this._err(NA.unexpectedNullCharacter), this.state = "SCRIPT_DATA_DOUBLE_ESCAPED_STATE", this._emitChars(w3.REPLACEMENT_CHARACTER);
            else if (A === X0.EOF) this._err(NA.eofInScriptHtmlCommentLikeText), this._emitEOFToken();
            else this.state = "SCRIPT_DATA_DOUBLE_ESCAPED_STATE", this._emitCodePoint(A)
        } ["SCRIPT_DATA_DOUBLE_ESCAPED_DASH_DASH_STATE"](A) {
            if (A === X0.HYPHEN_MINUS) this._emitChars("-");
            else if (A === X0.LESS_THAN_SIGN) this.state = "SCRIPT_DATA_DOUBLE_ESCAPED_LESS_THAN_SIGN_STATE", this._emitChars("<");
            else if (A === X0.GREATER_THAN_SIGN) this.state = "SCRIPT_DATA_STATE", this._emitChars(">");
            else if (A === X0.NULL) this._err(NA.unexpectedNullCharacter), this.state = "SCRIPT_DATA_DOUBLE_ESCAPED_STATE", this._emitChars(w3.REPLACEMENT_CHARACTER);
            else if (A === X0.EOF) this._err(NA.eofInScriptHtmlCommentLikeText), this._emitEOFToken();
            else this.state = "SCRIPT_DATA_DOUBLE_ESCAPED_STATE", this._emitCodePoint(A)
        } ["SCRIPT_DATA_DOUBLE_ESCAPED_LESS_THAN_SIGN_STATE"](A) {
            if (A === X0.SOLIDUS) this.tempBuff = [], this.state = "SCRIPT_DATA_DOUBLE_ESCAPE_END_STATE", this._emitChars("/");
            else this._reconsumeInState("SCRIPT_DATA_DOUBLE_ESCAPED_STATE")
        } ["SCRIPT_DATA_DOUBLE_ESCAPE_END_STATE"](A) {
            if (y7(A) || A === X0.SOLIDUS || A === X0.GREATER_THAN_SIGN) this.state = this._isTempBufferEqualToScriptString() ? "SCRIPT_DATA_ESCAPED_STATE" : "SCRIPT_DATA_DOUBLE_ESCAPED_STATE", this._emitCodePoint(A);
            else if (b$(A)) this.tempBuff.push(fv1(A)), this._emitCodePoint(A);
            else if (Wd(A)) this.tempBuff.push(A), this._emitCodePoint(A);
            else this._reconsumeInState("SCRIPT_DATA_DOUBLE_ESCAPED_STATE")
        } ["BEFORE_ATTRIBUTE_NAME_STATE"](A) {
            if (y7(A)) return;
            if (A === X0.SOLIDUS || A === X0.GREATER_THAN_SIGN || A === X0.EOF) this._reconsumeInState("AFTER_ATTRIBUTE_NAME_STATE");
            else if (A === X0.EQUALS_SIGN) this._err(NA.unexpectedEqualsSignBeforeAttributeName), this._createAttr("="), this.state = "ATTRIBUTE_NAME_STATE";
            else this._createAttr(""), this._reconsumeInState("ATTRIBUTE_NAME_STATE")
        } ["ATTRIBUTE_NAME_STATE"](A) {
            if (y7(A) || A === X0.SOLIDUS || A === X0.GREATER_THAN_SIGN || A === X0.EOF) this._leaveAttrName("AFTER_ATTRIBUTE_NAME_STATE"), this._unconsume();
            else if (A === X0.EQUALS_SIGN) this._leaveAttrName("BEFORE_ATTRIBUTE_VALUE_STATE");
            else if (b$(A)) this.currentAttr.name += Pv(A);
            else if (A === X0.QUOTATION_MARK || A === X0.APOSTROPHE || A === X0.LESS_THAN_SIGN) this._err(NA.unexpectedCharacterInAttributeName), this.currentAttr.name += $D(A);
            else if (A === X0.NULL) this._err(NA.unexpectedNullCharacter), this.currentAttr.name += w3.REPLACEMENT_CHARACTER;
            else this.currentAttr.name += $D(A)
        } ["AFTER_ATTRIBUTE_NAME_STATE"](A) {
            if (y7(A)) return;
            if (A === X0.SOLIDUS) this.state = "SELF_CLOSING_START_TAG_STATE";
            else if (A === X0.EQUALS_SIGN) this.state = "BEFORE_ATTRIBUTE_VALUE_STATE";
            else if (A === X0.GREATER_THAN_SIGN) this.state = "DATA_STATE", this._emitCurrentToken();
            else if (A === X0.EOF) this._err(NA.eofInTag), this._emitEOFToken();
            else this._createAttr(""), this._reconsumeInState("ATTRIBUTE_NAME_STATE")
        } ["BEFORE_ATTRIBUTE_VALUE_STATE"](A) {
            if (y7(A)) return;
            if (A === X0.QUOTATION_MARK) this.state = "ATTRIBUTE_VALUE_DOUBLE_QUOTED_STATE";
            else if (A === X0.APOSTROPHE) this.state = "ATTRIBUTE_VALUE_SINGLE_QUOTED_STATE";
            else if (A === X0.GREATER_THAN_SIGN) this._err(NA.missingAttributeValue), this.state = "DATA_STATE", this._emitCurrentToken();
            else this._reconsumeInState("ATTRIBUTE_VALUE_UNQUOTED_STATE")
        } ["ATTRIBUTE_VALUE_DOUBLE_QUOTED_STATE"](A) {
            if (A === X0.QUOTATION_MARK) this.state = "AFTER_ATTRIBUTE_VALUE_QUOTED_STATE";
            else if (A === X0.AMPERSAND) this.returnState = "ATTRIBUTE_VALUE_DOUBLE_QUOTED_STATE", this.state = "CHARACTER_REFERENCE_STATE";
            else if (A === X0.NULL) this._err(NA.unexpectedNullCharacter), this.currentAttr.value += w3.REPLACEMENT_CHARACTER;
            else if (A === X0.EOF) this._err(NA.eofInTag), this._emitEOFToken();
            else this.currentAttr.value += $D(A)
        } ["ATTRIBUTE_VALUE_SINGLE_QUOTED_STATE"](A) {
            if (A === X0.APOSTROPHE) this.state = "AFTER_ATTRIBUTE_VALUE_QUOTED_STATE";
            else if (A === X0.AMPERSAND) this.returnState = "ATTRIBUTE_VALUE_SINGLE_QUOTED_STATE", this.state = "CHARACTER_REFERENCE_STATE";
            else if (A === X0.NULL) this._err(NA.unexpectedNullCharacter), this.currentAttr.value += w3.REPLACEMENT_CHARACTER;
            else if (A === X0.EOF) this._err(NA.eofInTag), this._emitEOFToken();
            else this.currentAttr.value += $D(A)
        } ["ATTRIBUTE_VALUE_UNQUOTED_STATE"](A) {
            if (y7(A)) this._leaveAttrValue("BEFORE_ATTRIBUTE_NAME_STATE");
            else if (A === X0.AMPERSAND) this.returnState = "ATTRIBUTE_VALUE_UNQUOTED_STATE", this.state = "CHARACTER_REFERENCE_STATE";
            else if (A === X0.GREATER_THAN_SIGN) this._leaveAttrValue("DATA_STATE"), this._emitCurrentToken();
            else if (A === X0.NULL) this._err(NA.unexpectedNullCharacter), this.currentAttr.value += w3.REPLACEMENT_CHARACTER;
            else if (A === X0.QUOTATION_MARK || A === X0.APOSTROPHE || A === X0.LESS_THAN_SIGN || A === X0.EQUALS_SIGN || A === X0.GRAVE_ACCENT) this._err(NA.unexpectedCharacterInUnquotedAttributeValue), this.currentAttr.value += $D(A);
            else if (A === X0.EOF) this._err(NA.eofInTag), this._emitEOFToken();
            else this.currentAttr.value += $D(A)
        } ["AFTER_ATTRIBUTE_VALUE_QUOTED_STATE"](A) {
            if (y7(A)) this._leaveAttrValue("BEFORE_ATTRIBUTE_NAME_STATE");
            else if (A === X0.SOLIDUS) this._leaveAttrValue("SELF_CLOSING_START_TAG_STATE");
            else if (A === X0.GREATER_THAN_SIGN) this._leaveAttrValue("DATA_STATE"), this._emitCurrentToken();
            else if (A === X0.EOF) this._err(NA.eofInTag), this._emitEOFToken();
            else this._err(NA.missingWhitespaceBetweenAttributes), this._reconsumeInState("BEFORE_ATTRIBUTE_NAME_STATE")
        } ["SELF_CLOSING_START_TAG_STATE"](A) {
            if (A === X0.GREATER_THAN_SIGN) this.currentToken.selfClosing = !0, this.state = "DATA_STATE", this._emitCurrentToken();
            else if (A === X0.EOF) this._err(NA.eofInTag), this._emitEOFToken();
            else this._err(NA.unexpectedSolidusInTag), this._reconsumeInState("BEFORE_ATTRIBUTE_NAME_STATE")
        } ["BOGUS_COMMENT_STATE"](A) {
            if (A === X0.GREATER_THAN_SIGN) this.state = "DATA_STATE", this._emitCurrentToken();
            else if (A === X0.EOF) this._emitCurrentToken(), this._emitEOFToken();
            else if (A === X0.NULL) this._err(NA.unexpectedNullCharacter), this.currentToken.data += w3.REPLACEMENT_CHARACTER;
            else this.currentToken.data += $D(A)
        } ["MARKUP_DECLARATION_OPEN_STATE"](A) {
            if (this._consumeSequenceIfMatch(Yd.DASH_DASH_STRING, A, !0)) this._createCommentToken(), this.state = "COMMENT_START_STATE";
            else if (this._consumeSequenceIfMatch(Yd.DOCTYPE_STRING, A, !1)) this.state = "DOCTYPE_STATE";
            else if (this._consumeSequenceIfMatch(Yd.CDATA_START_STRING, A, !0))
                if (this.allowCDATA) this.state = "CDATA_SECTION_STATE";
                else this._err(NA.cdataInHtmlContent), this._createCommentToken(), this.currentToken.data = "[CDATA[", this.state = "BOGUS_COMMENT_STATE";
            else if (!this._ensureHibernation()) this._err(NA.incorrectlyOpenedComment), this._createCommentToken(), this._reconsumeInState("BOGUS_COMMENT_STATE")
        } ["COMMENT_START_STATE"](A) {
            if (A === X0.HYPHEN_MINUS) this.state = "COMMENT_START_DASH_STATE";
            else if (A === X0.GREATER_THAN_SIGN) this._err(NA.abruptClosingOfEmptyComment), this.state = "DATA_STATE", this._emitCurrentToken();
            else this._reconsumeInState("COMMENT_STATE")
        } ["COMMENT_START_DASH_STATE"](A) {
            if (A === X0.HYPHEN_MINUS) this.state = "COMMENT_END_STATE";
            else if (A === X0.GREATER_THAN_SIGN) this._err(NA.abruptClosingOfEmptyComment), this.state = "DATA_STATE", this._emitCurrentToken();
            else if (A === X0.EOF) this._err(NA.eofInComment), this._emitCurrentToken(), this._emitEOFToken();
            else this.currentToken.data += "-", this._reconsumeInState("COMMENT_STATE")
        } ["COMMENT_STATE"](A) {
            if (A === X0.HYPHEN_MINUS) this.state = "COMMENT_END_DASH_STATE";
            else if (A === X0.LESS_THAN_SIGN) this.currentToken.data += "<", this.state = "COMMENT_LESS_THAN_SIGN_STATE";
            else if (A === X0.NULL) this._err(NA.unexpectedNullCharacter), this.currentToken.data += w3.REPLACEMENT_CHARACTER;
            else if (A === X0.EOF) this._err(NA.eofInComment), this._emitCurrentToken(), this._emitEOFToken();
            else this.currentToken.data += $D(A)
        } ["COMMENT_LESS_THAN_SIGN_STATE"](A) {
            if (A === X0.EXCLAMATION_MARK) this.currentToken.data += "!", this.state = "COMMENT_LESS_THAN_SIGN_BANG_STATE";
            else if (A === X0.LESS_THAN_SIGN) this.currentToken.data += "!";
            else this._reconsumeInState("COMMENT_STATE")
        } ["COMMENT_LESS_THAN_SIGN_BANG_STATE"](A) {
            if (A === X0.HYPHEN_MINUS) this.state = "COMMENT_LESS_THAN_SIGN_BANG_DASH_STATE";
            else this._reconsumeInState("COMMENT_STATE")
        } ["COMMENT_LESS_THAN_SIGN_BANG_DASH_STATE"](A) {
            if (A === X0.HYPHEN_MINUS) this.state = "COMMENT_LESS_THAN_SIGN_BANG_DASH_DASH_STATE";
            else this._reconsumeInState("COMMENT_END_DASH_STATE")
        } ["COMMENT_LESS_THAN_SIGN_BANG_DASH_DASH_STATE"](A) {
            if (A !== X0.GREATER_THAN_SIGN && A !== X0.EOF) this._err(NA.nestedComment);
            this._reconsumeInState("COMMENT_END_STATE")
        } ["COMMENT_END_DASH_STATE"](A) {
            if (A === X0.HYPHEN_MINUS) this.state = "COMMENT_END_STATE";
            else if (A === X0.EOF) this._err(NA.eofInComment), this._emitCurrentToken(), this._emitEOFToken();
            else this.currentToken.data += "-", this._reconsumeInState("COMMENT_STATE")
        } ["COMMENT_END_STATE"](A) {
            if (A === X0.GREATER_THAN_SIGN) this.state = "DATA_STATE", this._emitCurrentToken();
            else if (A === X0.EXCLAMATION_MARK) this.state = "COMMENT_END_BANG_STATE";
            else if (A === X0.HYPHEN_MINUS) this.currentToken.data += "-";
            else if (A === X0.EOF) this._err(NA.eofInComment), this._emitCurrentToken(), this._emitEOFToken();
            else this.currentToken.data += "--", this._reconsumeInState("COMMENT_STATE")
        } ["COMMENT_END_BANG_STATE"](A) {
            if (A === X0.HYPHEN_MINUS) this.currentToken.data += "--!", this.state = "COMMENT_END_DASH_STATE";
            else if (A === X0.GREATER_THAN_SIGN) this._err(NA.incorrectlyClosedComment), this.state = "DATA_STATE", this._emitCurrentToken();
            else if (A === X0.EOF) this._err(NA.eofInComment), this._emitCurrentToken(), this._emitEOFToken();
            else this.currentToken.data += "--!", this._reconsumeInState("COMMENT_STATE")
        } ["DOCTYPE_STATE"](A) {
            if (y7(A)) this.state = "BEFORE_DOCTYPE_NAME_STATE";
            else if (A === X0.GREATER_THAN_SIGN) this._reconsumeInState("BEFORE_DOCTYPE_NAME_STATE");
            else if (A === X0.EOF) this._err(NA.eofInDoctype), this._createDoctypeToken(null), this.currentToken.forceQuirks = !0, this._emitCurrentToken(), this._emitEOFToken();
            else this._err(NA.missingWhitespaceBeforeDoctypeName), this._reconsumeInState("BEFORE_DOCTYPE_NAME_STATE")
        } ["BEFORE_DOCTYPE_NAME_STATE"](A) {
            if (y7(A)) return;
            if (b$(A)) this._createDoctypeToken(Pv(A)), this.state = "DOCTYPE_NAME_STATE";
            else if (A === X0.NULL) this._err(NA.unexpectedNullCharacter), this._createDoctypeToken(w3.REPLACEMENT_CHARACTER), this.state = "DOCTYPE_NAME_STATE";
            else if (A === X0.GREATER_THAN_SIGN) this._err(NA.missingDoctypeName), this._createDoctypeToken(null), this.currentToken.forceQuirks = !0, this._emitCurrentToken(), this.state = "DATA_STATE";
            else if (A === X0.EOF) this._err(NA.eofInDoctype), this._createDoctypeToken(null), this.currentToken.forceQuirks = !0, this._emitCurrentToken(), this._emitEOFToken();
            else this._createDoctypeToken($D(A)), this.state = "DOCTYPE_NAME_STATE"
        } ["DOCTYPE_NAME_STATE"](A) {
            if (y7(A)) this.state = "AFTER_DOCTYPE_NAME_STATE";
            else if (A === X0.GREATER_THAN_SIGN) this.state = "DATA_STATE", this._emitCurrentToken();
            else if (b$(A)) this.currentToken.name += Pv(A);
            else if (A === X0.NULL) this._err(NA.unexpectedNullCharacter), this.currentToken.name += w3.REPLACEMENT_CHARACTER;
            else if (A === X0.EOF) this._err(NA.eofInDoctype), this.currentToken.forceQuirks = !0, this._emitCurrentToken(), this._emitEOFToken();
            else this.currentToken.name += $D(A)
        } ["AFTER_DOCTYPE_NAME_STATE"](A) {
            if (y7(A)) return;
            if (A === X0.GREATER_THAN_SIGN) this.state = "DATA_STATE", this._emitCurrentToken();
            else if (A === X0.EOF) this._err(NA.eofInDoctype), this.currentToken.forceQuirks = !0, this._emitCurrentToken(), this._emitEOFToken();
            else if (this._consumeSequenceIfMatch(Yd.PUBLIC_STRING, A, !1)) this.state = "AFTER_DOCTYPE_PUBLIC_KEYWORD_STATE";
            else if (this._consumeSequenceIfMatch(Yd.SYSTEM_STRING, A, !1)) this.state = "AFTER_DOCTYPE_SYSTEM_KEYWORD_STATE";
            else if (!this._ensureHibernation()) this._err(NA.invalidCharacterSequenceAfterDoctypeName), this.currentToken.forceQuirks = !0, this._reconsumeInState("BOGUS_DOCTYPE_STATE")
        } ["AFTER_DOCTYPE_PUBLIC_KEYWORD_STATE"](A) {
            if (y7(A)) this.state = "BEFORE_DOCTYPE_PUBLIC_IDENTIFIER_STATE";
            else if (A === X0.QUOTATION_MARK) this._err(NA.missingWhitespaceAfterDoctypePublicKeyword), this.currentToken.publicId = "", this.state = "DOCTYPE_PUBLIC_IDENTIFIER_DOUBLE_QUOTED_STATE";
            else if (A === X0.APOSTROPHE) this._err(NA.missingWhitespaceAfterDoctypePublicKeyword), this.currentToken.publicId = "", this.state = "DOCTYPE_PUBLIC_IDENTIFIER_SINGLE_QUOTED_STATE";
            else if (A === X0.GREATER_THAN_SIGN) this._err(NA.missingDoctypePublicIdentifier), this.currentToken.forceQuirks = !0, this.state = "DATA_STATE", this._emitCurrentToken();
            else if (A === X0.EOF) this._err(NA.eofInDoctype), this.currentToken.forceQuirks = !0, this._emitCurrentToken(), this._emitEOFToken();
            else this._err(NA.missingQuoteBeforeDoctypePublicIdentifier), this.currentToken.forceQuirks = !0, this._reconsumeInState("BOGUS_DOCTYPE_STATE")
        } ["BEFORE_DOCTYPE_PUBLIC_IDENTIFIER_STATE"](A) {
            if (y7(A)) return;
            if (A === X0.QUOTATION_MARK) this.currentToken.publicId = "", this.state = "DOCTYPE_PUBLIC_IDENTIFIER_DOUBLE_QUOTED_STATE";
            else if (A === X0.APOSTROPHE) this.currentToken.publicId = "", this.state = "DOCTYPE_PUBLIC_IDENTIFIER_SINGLE_QUOTED_STATE";
            else if (A === X0.GREATER_THAN_SIGN) this._err(NA.missingDoctypePublicIdentifier), this.currentToken.forceQuirks = !0, this.state = "DATA_STATE", this._emitCurrentToken();
            else if (A === X0.EOF) this._err(NA.eofInDoctype), this.currentToken.forceQuirks = !0, this._emitCurrentToken(), this._emitEOFToken();
            else this._err(NA.missingQuoteBeforeDoctypePublicIdentifier), this.currentToken.forceQuirks = !0, this._reconsumeInState("BOGUS_DOCTYPE_STATE")
        } ["DOCTYPE_PUBLIC_IDENTIFIER_DOUBLE_QUOTED_STATE"](A) {
            if (A === X0.QUOTATION_MARK) this.state = "AFTER_DOCTYPE_PUBLIC_IDENTIFIER_STATE";
            else if (A === X0.NULL) this._err(NA.unexpectedNullCharacter), this.currentToken.publicId += w3.REPLACEMENT_CHARACTER;
            else if (A === X0.GREATER_THAN_SIGN) this._err(NA.abruptDoctypePublicIdentifier), this.currentToken.forceQuirks = !0, this._emitCurrentToken(), this.state = "DATA_STATE";
            else if (A === X0.EOF) this._err(NA.eofInDoctype), this.currentToken.forceQuirks = !0, this._emitCurrentToken(), this._emitEOFToken();
            else this.currentToken.publicId += $D(A)
        } ["DOCTYPE_PUBLIC_IDENTIFIER_SINGLE_QUOTED_STATE"](A) {
            if (A === X0.APOSTROPHE) this.state = "AFTER_DOCTYPE_PUBLIC_IDENTIFIER_STATE";
            else if (A === X0.NULL) this._err(NA.unexpectedNullCharacter), this.currentToken.publicId += w3.REPLACEMENT_CHARACTER;
            else if (A === X0.GREATER_THAN_SIGN) this._err(NA.abruptDoctypePublicIdentifier), this.currentToken.forceQuirks = !0, this._emitCurrentToken(), this.state = "DATA_STATE";
            else if (A === X0.EOF) this._err(NA.eofInDoctype), this.currentToken.forceQuirks = !0, this._emitCurrentToken(), this._emitEOFToken();
            else this.currentToken.publicId += $D(A)
        } ["AFTER_DOCTYPE_PUBLIC_IDENTIFIER_STATE"](A) {
            if (y7(A)) this.state = "BETWEEN_DOCTYPE_PUBLIC_AND_SYSTEM_IDENTIFIERS_STATE";
            else if (A === X0.GREATER_THAN_SIGN) this.state = "DATA_STATE", this._emitCurrentToken();
            else if (A === X0.QUOTATION_MARK) this._err(NA.missingWhitespaceBetweenDoctypePublicAndSystemIdentifiers), this.currentToken.systemId = "", this.state = "DOCTYPE_SYSTEM_IDENTIFIER_DOUBLE_QUOTED_STATE";
            else if (A === X0.APOSTROPHE) this._err(NA.missingWhitespaceBetweenDoctypePublicAndSystemIdentifiers), this.currentToken.systemId = "", this.state = "DOCTYPE_SYSTEM_IDENTIFIER_SINGLE_QUOTED_STATE";
            else if (A === X0.EOF) this._err(NA.eofInDoctype), this.currentToken.forceQuirks = !0, this._emitCurrentToken(), this._emitEOFToken();
            else this._err(NA.missingQuoteBeforeDoctypeSystemIdentifier), this.currentToken.forceQuirks = !0, this._reconsumeInState("BOGUS_DOCTYPE_STATE")
        } ["BETWEEN_DOCTYPE_PUBLIC_AND_SYSTEM_IDENTIFIERS_STATE"](A) {
            if (y7(A)) return;
            if (A === X0.GREATER_THAN_SIGN) this._emitCurrentToken(), this.state = "DATA_STATE";
            else if (A === X0.QUOTATION_MARK) this.currentToken.systemId = "", this.state = "DOCTYPE_SYSTEM_IDENTIFIER_DOUBLE_QUOTED_STATE";
            else if (A === X0.APOSTROPHE) this.currentToken.systemId = "", this.state = "DOCTYPE_SYSTEM_IDENTIFIER_SINGLE_QUOTED_STATE";
            else if (A === X0.EOF) this._err(NA.eofInDoctype), this.currentToken.forceQuirks = !0, this._emitCurrentToken(), this._emitEOFToken();
            else this._err(NA.missingQuoteBeforeDoctypeSystemIdentifier), this.currentToken.forceQuirks = !0, this._reconsumeInState("BOGUS_DOCTYPE_STATE")
        } ["AFTER_DOCTYPE_SYSTEM_KEYWORD_STATE"](A) {
            if (y7(A)) this.state = "BEFORE_DOCTYPE_SYSTEM_IDENTIFIER_STATE";
            else if (A === X0.QUOTATION_MARK) this._err(NA.missingWhitespaceAfterDoctypeSystemKeyword), this.currentToken.systemId = "", this.state = "DOCTYPE_SYSTEM_IDENTIFIER_DOUBLE_QUOTED_STATE";
            else if (A === X0.APOSTROPHE) this._err(NA.missingWhitespaceAfterDoctypeSystemKeyword), this.currentToken.systemId = "", this.state = "DOCTYPE_SYSTEM_IDENTIFIER_SINGLE_QUOTED_STATE";
            else if (A === X0.GREATER_THAN_SIGN) this._err(NA.missingDoctypeSystemIdentifier), this.currentToken.forceQuirks = !0, this.state = "DATA_STATE", this._emitCurrentToken();
            else if (A === X0.EOF) this._err(NA.eofInDoctype), this.currentToken.forceQuirks = !0, this._emitCurrentToken(), this._emitEOFToken();
            else this._err(NA.missingQuoteBeforeDoctypeSystemIdentifier), this.currentToken.forceQuirks = !0, this._reconsumeInState("BOGUS_DOCTYPE_STATE")
        } ["BEFORE_DOCTYPE_SYSTEM_IDENTIFIER_STATE"](A) {
            if (y7(A)) return;
            if (A === X0.QUOTATION_MARK) this.currentToken.systemId = "", this.state = "DOCTYPE_SYSTEM_IDENTIFIER_DOUBLE_QUOTED_STATE";
            else if (A === X0.APOSTROPHE) this.currentToken.systemId = "", this.state = "DOCTYPE_SYSTEM_IDENTIFIER_SINGLE_QUOTED_STATE";
            else if (A === X0.GREATER_THAN_SIGN) this._err(NA.missingDoctypeSystemIdentifier), this.currentToken.forceQuirks = !0, this.state = "DATA_STATE", this._emitCurrentToken();
            else if (A === X0.EOF) this._err(NA.eofInDoctype), this.currentToken.forceQuirks = !0, this._emitCurrentToken(), this._emitEOFToken();
            else this._err(NA.missingQuoteBeforeDoctypeSystemIdentifier), this.currentToken.forceQuirks = !0, this._reconsumeInState("BOGUS_DOCTYPE_STATE")
        } ["DOCTYPE_SYSTEM_IDENTIFIER_DOUBLE_QUOTED_STATE"](A) {
            if (A === X0.QUOTATION_MARK) this.state = "AFTER_DOCTYPE_SYSTEM_IDENTIFIER_STATE";
            else if (A === X0.NULL) this._err(NA.unexpectedNullCharacter), this.currentToken.systemId += w3.REPLACEMENT_CHARACTER;
            else if (A === X0.GREATER_THAN_SIGN) this._err(NA.abruptDoctypeSystemIdentifier), this.currentToken.forceQuirks = !0, this._emitCurrentToken(), this.state = "DATA_STATE";
            else if (A === X0.EOF) this._err(NA.eofInDoctype), this.currentToken.forceQuirks = !0, this._emitCurrentToken(), this._emitEOFToken();
            else this.currentToken.systemId += $D(A)
        } ["DOCTYPE_SYSTEM_IDENTIFIER_SINGLE_QUOTED_STATE"](A) {
            if (A === X0.APOSTROPHE) this.state = "AFTER_DOCTYPE_SYSTEM_IDENTIFIER_STATE";
            else if (A === X0.NULL) this._err(NA.unexpectedNullCharacter), this.currentToken.systemId += w3.REPLACEMENT_CHARACTER;
            else if (A === X0.GREATER_THAN_SIGN) this._err(NA.abruptDoctypeSystemIdentifier), this.currentToken.forceQuirks = !0, this._emitCurrentToken(), this.state = "DATA_STATE";
            else if (A === X0.EOF) this._err(NA.eofInDoctype), this.currentToken.forceQuirks = !0, this._emitCurrentToken(), this._emitEOFToken();
            else this.currentToken.systemId += $D(A)
        } ["AFTER_DOCTYPE_SYSTEM_IDENTIFIER_STATE"](A) {
            if (y7(A)) return;
            if (A === X0.GREATER_THAN_SIGN) this._emitCurrentToken(), this.state = "DATA_STATE";
            else if (A === X0.EOF) this._err(NA.eofInDoctype), this.currentToken.forceQuirks = !0, this._emitCurrentToken(), this._emitEOFToken();
            else this._err(NA.unexpectedCharacterAfterDoctypeSystemIdentifier), this._reconsumeInState("BOGUS_DOCTYPE_STATE")
        } ["BOGUS_DOCTYPE_STATE"](A) {
            if (A === X0.GREATER_THAN_SIGN) this._emitCurrentToken(), this.state = "DATA_STATE";
            else if (A === X0.NULL) this._err(NA.unexpectedNullCharacter);
            else if (A === X0.EOF) this._emitCurrentToken(), this._emitEOFToken()
        } ["CDATA_SECTION_STATE"](A) {
            if (A === X0.RIGHT_SQUARE_BRACKET) this.state = "CDATA_SECTION_BRACKET_STATE";
            else if (A === X0.EOF) this._err(NA.eofInCdata), this._emitEOFToken();
            else this._emitCodePoint(A)
        } ["CDATA_SECTION_BRACKET_STATE"](A) {
            if (A === X0.RIGHT_SQUARE_BRACKET) this.state = "CDATA_SECTION_END_STATE";
            else this._emitChars("]"), this._reconsumeInState("CDATA_SECTION_STATE")
        } ["CDATA_SECTION_END_STATE"](A) {
            if (A === X0.GREATER_THAN_SIGN) this.state = "DATA_STATE";
            else if (A === X0.RIGHT_SQUARE_BRACKET) this._emitChars("]");
            else this._emitChars("]]"), this._reconsumeInState("CDATA_SECTION_STATE")
        } ["CHARACTER_REFERENCE_STATE"](A) {
            if (this.tempBuff = [X0.AMPERSAND], A === X0.NUMBER_SIGN) this.tempBuff.push(A), this.state = "NUMERIC_CHARACTER_REFERENCE_STATE";
            else if (yq0(A)) this._reconsumeInState("NAMED_CHARACTER_REFERENCE_STATE");
            else this._flushCodePointsConsumedAsCharacterReference(), this._reconsumeInState(this.returnState)
        } ["NAMED_CHARACTER_REFERENCE_STATE"](A) {
            let B = this._matchNamedCharacterReference(A);
            if (this._ensureHibernation()) this.tempBuff = [X0.AMPERSAND];
            else if (B) {
                let Q = this.tempBuff[this.tempBuff.length - 1] === X0.SEMICOLON;
                if (!this._isCharacterReferenceAttributeQuirk(Q)) {
                    if (!Q) this._errOnNextCodePoint(NA.missingSemicolonAfterCharacterReference);
                    this.tempBuff = B
                }
                this._flushCodePointsConsumedAsCharacterReference(), this.state = this.returnState
            } else this._flushCodePointsConsumedAsCharacterReference(), this.state = "AMBIGUOS_AMPERSAND_STATE"
        } ["AMBIGUOS_AMPERSAND_STATE"](A) {
            if (yq0(A))
                if (this._isCharacterReferenceInAttribute()) this.currentAttr.value += $D(A);
                else this._emitCodePoint(A);
            else {
                if (A === X0.SEMICOLON) this._err(NA.unknownNamedCharacterReference);
                this._reconsumeInState(this.returnState)
            }
        } ["NUMERIC_CHARACTER_REFERENCE_STATE"](A) {
            if (this.charRefCode = 0, A === X0.LATIN_SMALL_X || A === X0.LATIN_CAPITAL_X) this.tempBuff.push(A), this.state = "HEXADEMICAL_CHARACTER_REFERENCE_START_STATE";
            else this._reconsumeInState("DECIMAL_CHARACTER_REFERENCE_START_STATE")
        } ["HEXADEMICAL_CHARACTER_REFERENCE_START_STATE"](A) {
            if (C58(A)) this._reconsumeInState("HEXADEMICAL_CHARACTER_REFERENCE_STATE");
            else this._err(NA.absenceOfDigitsInNumericCharacterReference), this._flushCodePointsConsumedAsCharacterReference(), this._reconsumeInState(this.returnState)
        } ["DECIMAL_CHARACTER_REFERENCE_START_STATE"](A) {
            if (MG1(A)) this._reconsumeInState("DECIMAL_CHARACTER_REFERENCE_STATE");
            else this._err(NA.absenceOfDigitsInNumericCharacterReference), this._flushCodePointsConsumedAsCharacterReference(), this._reconsumeInState(this.returnState)
        } ["HEXADEMICAL_CHARACTER_REFERENCE_STATE"](A) {
            if (vRB(A)) this.charRefCode = this.charRefCode * 16 + A - 55;
            else if (bRB(A)) this.charRefCode = this.charRefCode * 16 + A - 87;
            else if (MG1(A)) this.charRefCode = this.charRefCode * 16 + A - 48;
            else if (A === X0.SEMICOLON) this.state = "NUMERIC_CHARACTER_REFERENCE_END_STATE";
            else this._err(NA.missingSemicolonAfterCharacterReference), this._reconsumeInState("NUMERIC_CHARACTER_REFERENCE_END_STATE")
        } ["DECIMAL_CHARACTER_REFERENCE_STATE"](A) {
            if (MG1(A)) this.charRefCode = this.charRefCode * 10 + A - 48;
            else if (A === X0.SEMICOLON) this.state = "NUMERIC_CHARACTER_REFERENCE_END_STATE";
            else this._err(NA.missingSemicolonAfterCharacterReference), this._reconsumeInState("NUMERIC_CHARACTER_REFERENCE_END_STATE")
        } ["NUMERIC_CHARACTER_REFERENCE_END_STATE"]() {
            if (this.charRefCode === X0.NULL) this._err(NA.nullCharacterReference), this.charRefCode = X0.REPLACEMENT_CHARACTER;
            else if (this.charRefCode > 1114111) this._err(NA.characterReferenceOutsideUnicodeRange), this.charRefCode = X0.REPLACEMENT_CHARACTER;
            else if (w3.isSurrogate(this.charRefCode)) this._err(NA.surrogateCharacterReference), this.charRefCode = X0.REPLACEMENT_CHARACTER;
            else if (w3.isUndefinedCodePoint(this.charRefCode)) this._err(NA.noncharacterCharacterReference);
            else if (w3.isControlCodePoint(this.charRefCode) || this.charRefCode === X0.CARRIAGE_RETURN) {
                this._err(NA.controlCharacterReference);
                let A = V58[this.charRefCode];
                if (A) this.charRefCode = A
            }
            this.tempBuff = [this.charRefCode], this._flushCodePointsConsumedAsCharacterReference(), this._reconsumeInState(this.returnState)
        }
    }
    X7.CHARACTER_TOKEN = "CHARACTER_TOKEN";
    X7.NULL_CHARACTER_TOKEN = "NULL_CHARACTER_TOKEN";
    X7.WHITESPACE_CHARACTER_TOKEN = "WHITESPACE_CHARACTER_TOKEN";
    X7.START_TAG_TOKEN = "START_TAG_TOKEN";
    X7.END_TAG_TOKEN = "END_TAG_TOKEN";
    X7.COMMENT_TOKEN = "COMMENT_TOKEN";
    X7.DOCTYPE_TOKEN = "DOCTYPE_TOKEN";
    X7.EOF_TOKEN = "EOF_TOKEN";
    X7.HIBERNATION_TOKEN = "HIBERNATION_TOKEN";
    X7.MODE = {
        DATA: "DATA_STATE",
        RCDATA: "RCDATA_STATE",
        RAWTEXT: "RAWTEXT_STATE",
        SCRIPT_DATA: "SCRIPT_DATA_STATE",
        PLAINTEXT: "PLAINTEXT_STATE"
    };
    X7.getTokenAttr = function(A, B) {
        for (let Q = A.attrs.length - 1; Q >= 0; Q--)
            if (A.attrs[Q].name === B) return A.attrs[Q].value;
        return null
    };
    fRB.exports = X7
});