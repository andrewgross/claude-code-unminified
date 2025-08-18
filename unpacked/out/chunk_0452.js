/* chunk:452 bytes:[10777950, 10796811) size:18861 source:unpacked-cli.js */
var Wf1 = E((SR3, _yB) => {
    _yB.exports = Yf1;
    var DV8 = 1,
        GV8 = 3,
        FV8 = 4,
        IV8 = 5,
        YV8 = 7,
        WV8 = 8,
        JV8 = 9,
        XV8 = 11,
        VV8 = 12,
        CV8 = 13,
        KV8 = 14,
        HV8 = 15,
        zV8 = 17,
        EV8 = 18,
        UV8 = 19,
        wV8 = 20,
        $V8 = 21,
        qV8 = 22,
        NV8 = 23,
        LV8 = 24,
        MV8 = 25,
        RV8 = [null, "INDEX_SIZE_ERR", null, "HIERARCHY_REQUEST_ERR", "WRONG_DOCUMENT_ERR", "INVALID_CHARACTER_ERR", null, "NO_MODIFICATION_ALLOWED_ERR", "NOT_FOUND_ERR", "NOT_SUPPORTED_ERR", "INUSE_ATTRIBUTE_ERR", "INVALID_STATE_ERR", "SYNTAX_ERR", "INVALID_MODIFICATION_ERR", "NAMESPACE_ERR", "INVALID_ACCESS_ERR", null, "TYPE_MISMATCH_ERR", "SECURITY_ERR", "NETWORK_ERR", "ABORT_ERR", "URL_MISMATCH_ERR", "QUOTA_EXCEEDED_ERR", "TIMEOUT_ERR", "INVALID_NODE_TYPE_ERR", "DATA_CLONE_ERR"],
        OV8 = [null, "INDEX_SIZE_ERR (1): the index is not in the allowed range", null, "HIERARCHY_REQUEST_ERR (3): the operation would yield an incorrect nodes model", "WRONG_DOCUMENT_ERR (4): the object is in the wrong Document, a call to importNode is required", "INVALID_CHARACTER_ERR (5): the string contains invalid characters", null, "NO_MODIFICATION_ALLOWED_ERR (7): the object can not be modified", "NOT_FOUND_ERR (8): the object can not be found here", "NOT_SUPPORTED_ERR (9): this operation is not supported", "INUSE_ATTRIBUTE_ERR (10): setAttributeNode called on owned Attribute", "INVALID_STATE_ERR (11): the object is in an invalid state", "SYNTAX_ERR (12): the string did not match the expected pattern", "INVALID_MODIFICATION_ERR (13): the object can not be modified in this way", "NAMESPACE_ERR (14): the operation is not allowed by Namespaces in XML", "INVALID_ACCESS_ERR (15): the object does not support the operation or argument", null, "TYPE_MISMATCH_ERR (17): the type of the object does not match the expected type", "SECURITY_ERR (18): the operation is insecure", "NETWORK_ERR (19): a network error occurred", "ABORT_ERR (20): the user aborted an operation", "URL_MISMATCH_ERR (21): the given URL does not match another URL", "QUOTA_EXCEEDED_ERR (22): the quota has been exceeded", "TIMEOUT_ERR (23): a timeout occurred", "INVALID_NODE_TYPE_ERR (24): the supplied node is invalid or has an invalid ancestor for this operation", "DATA_CLONE_ERR (25): the object can not be cloned."],
        yyB = {
            INDEX_SIZE_ERR: DV8,
            DOMSTRING_SIZE_ERR: 2,
            HIERARCHY_REQUEST_ERR: GV8,
            WRONG_DOCUMENT_ERR: FV8,
            INVALID_CHARACTER_ERR: IV8,
            NO_DATA_ALLOWED_ERR: 6,
            NO_MODIFICATION_ALLOWED_ERR: YV8,
            NOT_FOUND_ERR: WV8,
            NOT_SUPPORTED_ERR: JV8,
            INUSE_ATTRIBUTE_ERR: 10,
            INVALID_STATE_ERR: XV8,
            SYNTAX_ERR: VV8,
            INVALID_MODIFICATION_ERR: CV8,
            NAMESPACE_ERR: KV8,
            INVALID_ACCESS_ERR: HV8,
            VALIDATION_ERR: 16,
            TYPE_MISMATCH_ERR: zV8,
            SECURITY_ERR: EV8,
            NETWORK_ERR: UV8,
            ABORT_ERR: wV8,
            URL_MISMATCH_ERR: $V8,
            QUOTA_EXCEEDED_ERR: qV8,
            TIMEOUT_ERR: NV8,
            INVALID_NODE_TYPE_ERR: LV8,
            DATA_CLONE_ERR: MV8
        };

    function Yf1(A) {
        Error.call(this), Error.captureStackTrace(this, this.constructor), this.code = A, this.message = OV8[A], this.name = RV8[A]
    }
    Yf1.prototype.__proto__ = Error.prototype;
    for (_F1 in yyB) If1 = {
        value: yyB[_F1]
    }, Object.defineProperty(Yf1, _F1, If1), Object.defineProperty(Yf1.prototype, _F1, If1);
    var If1, _F1
});
var Jf1 = E((TV8) => {
    TV8.isApiWritable = !globalThis.__domino_frozen__
});
var MD = E((jV8) => {
    var LD = Wf1(),
        qG = LD,
        SV8 = Jf1().isApiWritable;
    jV8.NAMESPACE = {
        HTML: "http://www.w3.org/1999/xhtml",
        XML: "http://www.w3.org/XML/1998/namespace",
        XMLNS: "http://www.w3.org/2000/xmlns/",
        MATHML: "http://www.w3.org/1998/Math/MathML",
        SVG: "http://www.w3.org/2000/svg",
        XLINK: "http://www.w3.org/1999/xlink"
    };
    jV8.IndexSizeError = function() {
        throw new LD(qG.INDEX_SIZE_ERR)
    };
    jV8.HierarchyRequestError = function() {
        throw new LD(qG.HIERARCHY_REQUEST_ERR)
    };
    jV8.WrongDocumentError = function() {
        throw new LD(qG.WRONG_DOCUMENT_ERR)
    };
    jV8.InvalidCharacterError = function() {
        throw new LD(qG.INVALID_CHARACTER_ERR)
    };
    jV8.NoModificationAllowedError = function() {
        throw new LD(qG.NO_MODIFICATION_ALLOWED_ERR)
    };
    jV8.NotFoundError = function() {
        throw new LD(qG.NOT_FOUND_ERR)
    };
    jV8.NotSupportedError = function() {
        throw new LD(qG.NOT_SUPPORTED_ERR)
    };
    jV8.InvalidStateError = function() {
        throw new LD(qG.INVALID_STATE_ERR)
    };
    jV8.SyntaxError = function() {
        throw new LD(qG.SYNTAX_ERR)
    };
    jV8.InvalidModificationError = function() {
        throw new LD(qG.INVALID_MODIFICATION_ERR)
    };
    jV8.NamespaceError = function() {
        throw new LD(qG.NAMESPACE_ERR)
    };
    jV8.InvalidAccessError = function() {
        throw new LD(qG.INVALID_ACCESS_ERR)
    };
    jV8.TypeMismatchError = function() {
        throw new LD(qG.TYPE_MISMATCH_ERR)
    };
    jV8.SecurityError = function() {
        throw new LD(qG.SECURITY_ERR)
    };
    jV8.NetworkError = function() {
        throw new LD(qG.NETWORK_ERR)
    };
    jV8.AbortError = function() {
        throw new LD(qG.ABORT_ERR)
    };
    jV8.UrlMismatchError = function() {
        throw new LD(qG.URL_MISMATCH_ERR)
    };
    jV8.QuotaExceededError = function() {
        throw new LD(qG.QUOTA_EXCEEDED_ERR)
    };
    jV8.TimeoutError = function() {
        throw new LD(qG.TIMEOUT_ERR)
    };
    jV8.InvalidNodeTypeError = function() {
        throw new LD(qG.INVALID_NODE_TYPE_ERR)
    };
    jV8.DataCloneError = function() {
        throw new LD(qG.DATA_CLONE_ERR)
    };
    jV8.nyi = function() {
        throw new Error("NotYetImplemented")
    };
    jV8.shouldOverride = function() {
        throw new Error("Abstract function; should be overriding in subclass.")
    };
    jV8.assert = function(A, B) {
        if (!A) throw new Error("Assertion failed: " + (B || "") + `
` + new Error().stack)
    };
    jV8.expose = function(A, B) {
        for (var Q in A) Object.defineProperty(B.prototype, Q, {
            value: A[Q],
            writable: SV8
        })
    };
    jV8.merge = function(A, B) {
        for (var Q in B) A[Q] = B[Q]
    };
    jV8.documentOrder = function(A, B) {
        return 3 - (A.compareDocumentPosition(B) & 6)
    };
    jV8.toASCIILowerCase = function(A) {
        return A.replace(/[A-Z]+/g, function(B) {
            return B.toLowerCase()
        })
    };
    jV8.toASCIIUpperCase = function(A) {
        return A.replace(/[a-z]+/g, function(B) {
            return B.toUpperCase()
        })
    }
});
var rL0 = E((yR3, vyB) => {
    var Sd = j01(),
        IC8 = sL0(),
        YC8 = MD();
    vyB.exports = xyB;

    function xyB() {}
    xyB.prototype = {
        addEventListener: function A(B, Q, Z) {
            if (!Q) return;
            if (Z === void 0) Z = !1;
            if (!this._listeners) this._listeners = Object.create(null);
            if (!this._listeners[B]) this._listeners[B] = [];
            var D = this._listeners[B];
            for (var G = 0, F = D.length; G < F; G++) {
                var I = D[G];
                if (I.listener === Q && I.capture === Z) return
            }
            var Y = {
                listener: Q,
                capture: Z
            };
            if (typeof Q === "function") Y.f = Q;
            D.push(Y)
        },
        removeEventListener: function A(B, Q, Z) {
            if (Z === void 0) Z = !1;
            if (this._listeners) {
                var D = this._listeners[B];
                if (D)
                    for (var G = 0, F = D.length; G < F; G++) {
                        var I = D[G];
                        if (I.listener === Q && I.capture === Z) {
                            if (D.length === 1) this._listeners[B] = void 0;
                            else D.splice(G, 1);
                            return
                        }
                    }
            }
        },
        dispatchEvent: function A(B) {
            return this._dispatchEvent(B, !1)
        },
        _dispatchEvent: function A(B, Q) {
            if (typeof Q !== "boolean") Q = !1;

            function Z(W, J) {
                var {
                    type: X,
                    eventPhase: V
                } = J;
                if (J.currentTarget = W, V !== Sd.CAPTURING_PHASE && W._handlers && W._handlers[X]) {
                    var C = W._handlers[X],
                        K;
                    if (typeof C === "function") K = C.call(J.currentTarget, J);
                    else {
                        var H = C.handleEvent;
                        if (typeof H !== "function") throw new TypeError("handleEvent property of event handler object isnot a function.");
                        K = H.call(C, J)
                    }
                    switch (J.type) {
                        case "mouseover":
                            if (K === !0) J.preventDefault();
                            break;
                        case "beforeunload":
                        default:
                            if (K === !1) J.preventDefault();
                            break
                    }
                }
                var z = W._listeners && W._listeners[X];
                if (!z) return;
                z = z.slice();
                for (var $ = 0, L = z.length; $ < L; $++) {
                    if (J._immediatePropagationStopped) return;
                    var N = z[$];
                    if (V === Sd.CAPTURING_PHASE && !N.capture || V === Sd.BUBBLING_PHASE && N.capture) continue;
                    if (N.f) N.f.call(J.currentTarget, J);
                    else {
                        var R = N.listener.handleEvent;
                        if (typeof R !== "function") throw new TypeError("handleEvent property of event listener object is not a function.");
                        R.call(N.listener, J)
                    }
                }
            }
            if (!B._initialized || B._dispatching) YC8.InvalidStateError();
            B.isTrusted = Q, B._dispatching = !0, B.target = this;
            var D = [];
            for (var G = this.parentNode; G; G = G.parentNode) D.push(G);
            B.eventPhase = Sd.CAPTURING_PHASE;
            for (var F = D.length - 1; F >= 0; F--)
                if (Z(D[F], B), B._propagationStopped) break;
            if (!B._propagationStopped) B.eventPhase = Sd.AT_TARGET, Z(this, B);
            if (B.bubbles && !B._propagationStopped) {
                B.eventPhase = Sd.BUBBLING_PHASE;
                for (var I = 0, Y = D.length; I < Y; I++)
                    if (Z(D[I], B), B._propagationStopped) break
            }
            if (B._dispatching = !1, B.eventPhase = Sd.AT_TARGET, B.currentTarget = null, Q && !B.defaultPrevented && B instanceof IC8) switch (B.type) {
                case "mousedown":
                    this._armed = {
                        x: B.clientX,
                        y: B.clientY,
                        t: B.timeStamp
                    };
                    break;
                case "mouseout":
                case "mouseover":
                    this._armed = null;
                    break;
                case "mouseup":
                    if (this._isClick(B)) this._doClick(B);
                    this._armed = null;
                    break
            }
            return !B.defaultPrevented
        },
        _isClick: function(A) {
            return this._armed !== null && A.type === "mouseup" && A.isTrusted && A.button === 0 && A.timeStamp - this._armed.t < 1000 && Math.abs(A.clientX - this._armed.x) < 10 && Math.abs(A.clientY - this._armed.Y) < 10
        },
        _doClick: function(A) {
            if (this._click_in_progress) return;
            this._click_in_progress = !0;
            var B = this;
            while (B && !B._post_click_activation_steps) B = B.parentNode;
            if (B && B._pre_click_activation_steps) B._pre_click_activation_steps();
            var Q = this.ownerDocument.createEvent("MouseEvent");
            Q.initMouseEvent("click", !0, !0, this.ownerDocument.defaultView, 1, A.screenX, A.screenY, A.clientX, A.clientY, A.ctrlKey, A.altKey, A.shiftKey, A.metaKey, A.button, null);
            var Z = this._dispatchEvent(Q, !0);
            if (B) {
                if (Z) {
                    if (B._post_click_activation_steps) B._post_click_activation_steps(Q)
                } else if (B._cancelled_activation_steps) B._cancelled_activation_steps()
            }
        },
        _setEventHandler: function A(B, Q) {
            if (!this._handlers) this._handlers = Object.create(null);
            this._handlers[B] = Q
        },
        _getEventHandler: function A(B) {
            return this._handlers && this._handlers[B] || null
        }
    }
});
var oL0 = E((_R3, byB) => {
    var kS = MD(),
        VU = byB.exports = {
            valid: function(A) {
                return kS.assert(A, "list falsy"), kS.assert(A._previousSibling, "previous falsy"), kS.assert(A._nextSibling, "next falsy"), !0
            },
            insertBefore: function(A, B) {
                kS.assert(VU.valid(A) && VU.valid(B));
                var Q = A,
                    Z = A._previousSibling,
                    D = B,
                    G = B._previousSibling;
                Q._previousSibling = G, Z._nextSibling = D, G._nextSibling = Q, D._previousSibling = Z, kS.assert(VU.valid(A) && VU.valid(B))
            },
            replace: function(A, B) {
                if (kS.assert(VU.valid(A) && (B === null || VU.valid(B))), B !== null) VU.insertBefore(B, A);
                VU.remove(A), kS.assert(VU.valid(A) && (B === null || VU.valid(B)))
            },
            remove: function(A) {
                kS.assert(VU.valid(A));
                var B = A._previousSibling;
                if (B === A) return;
                var Q = A._nextSibling;
                B._nextSibling = Q, Q._previousSibling = B, A._previousSibling = A._nextSibling = A, kS.assert(VU.valid(A))
            }
        }
});
var tL0 = E((xR3, lyB) => {
    lyB.exports = {
        serializeOne: HC8,
        ɵescapeMatchingClosingTag: myB,
        ɵescapeClosingCommentTag: dyB,
        ɵescapeProcessingInstructionContent: cyB
    };
    var uyB = MD(),
        jd = uyB.NAMESPACE,
        fyB = {
            STYLE: !0,
            SCRIPT: !0,
            XMP: !0,
            IFRAME: !0,
            NOEMBED: !0,
            NOFRAMES: !0,
            PLAINTEXT: !0
        },
        WC8 = {
            area: !0,
            base: !0,
            basefont: !0,
            bgsound: !0,
            br: !0,
            col: !0,
            embed: !0,
            frame: !0,
            hr: !0,
            img: !0,
            input: !0,
            keygen: !0,
            link: !0,
            meta: !0,
            param: !0,
            source: !0,
            track: !0,
            wbr: !0
        },
        JC8 = {},
        hyB = /[&<>\u00A0]/g,
        gyB = /[&"<>\u00A0]/g;

    function XC8(A) {
        if (!hyB.test(A)) return A;
        return A.replace(hyB, (B) => {
            switch (B) {
                case "&":
                    return "&amp;";
                case "<":
                    return "&lt;";
                case ">":
                    return "&gt;";
                case " ":
                    return "&nbsp;"
            }
        })
    }

    function VC8(A) {
        if (!gyB.test(A)) return A;
        return A.replace(gyB, (B) => {
            switch (B) {
                case "<":
                    return "&lt;";
                case ">":
                    return "&gt;";
                case "&":
                    return "&amp;";
                case '"':
                    return "&quot;";
                case " ":
                    return "&nbsp;"
            }
        })
    }

    function CC8(A) {
        var B = A.namespaceURI;
        if (!B) return A.localName;
        if (B === jd.XML) return "xml:" + A.localName;
        if (B === jd.XLINK) return "xlink:" + A.localName;
        if (B === jd.XMLNS)
            if (A.localName === "xmlns") return "xmlns";
            else return "xmlns:" + A.localName;
        return A.name
    }

    function myB(A, B) {
        let Q = "</" + B;
        if (!A.toLowerCase().includes(Q)) return A;
        let Z = [...A],
            D = A.matchAll(new RegExp(Q, "ig"));
        for (let G of D) Z[G.index] = "&lt;";
        return Z.join("")
    }
    var KC8 = /--!?>/;

    function dyB(A) {
        if (!KC8.test(A)) return A;
        return A.replace(/(--\!?)>/g, "$1&gt;")
    }

    function cyB(A) {
        return A.includes(">") ? A.replaceAll(">", "&gt;") : A
    }

    function HC8(A, B) {
        var Q = "";
        switch (A.nodeType) {
            case 1:
                var Z = A.namespaceURI,
                    D = Z === jd.HTML,
                    G = D || Z === jd.SVG || Z === jd.MATHML ? A.localName : A.tagName;
                Q += "<" + G;
                for (var F = 0, I = A._numattrs; F < I; F++) {
                    var Y = A._attr(F);
                    if (Q += " " + CC8(Y), Y.value !== void 0) Q += '="' + VC8(Y.value) + '"'
                }
                if (Q += ">", !(D && WC8[G])) {
                    var W = A.serialize();
                    if (fyB[G.toUpperCase()]) W = myB(W, G);
                    if (D && JC8[G] && W.charAt(0) === `
`) Q += `
`;
                    Q += W, Q += "</" + G + ">"
                }
                break;
            case 3:
            case 4:
                var J;
                if (B.nodeType === 1 && B.namespaceURI === jd.HTML) J = B.tagName;
                else J = "";
                if (fyB[J] || J === "NOSCRIPT" && B.ownerDocument._scripting_enabled) Q += A.data;
                else Q += XC8(A.data);
                break;
            case 8:
                Q += "<!--" + dyB(A.data) + "-->";
                break;
            case 7:
                let X = cyB(A.data);
                Q += "<?" + A.target + " " + X + "?>";
                break;
            case 10:
                Q += "<!DOCTYPE " + A.name, Q += ">";
                break;
            default:
                uyB.InvalidStateError()
        }
        return Q
    }
});