/* chunk:466 bytes:[11235376, 11243043) size:7667 source:unpacked-cli.js */
var rF1 = E((qO3, qvB) => {
    qvB.exports = $vB;
    var UvB = Sf1(),
        wvB = kf1(),
        $H8 = hf1(),
        gf1 = MD(),
        qH8 = Kf1();

    function $vB(A) {
        this.contextObject = A
    }
    var NH8 = {
        xml: {
            "": !0,
            "1.0": !0,
            "2.0": !0
        },
        core: {
            "": !0,
            "2.0": !0
        },
        html: {
            "": !0,
            "1.0": !0,
            "2.0": !0
        },
        xhtml: {
            "": !0,
            "1.0": !0,
            "2.0": !0
        }
    };
    $vB.prototype = {
        hasFeature: function A(B, Q) {
            var Z = NH8[(B || "").toLowerCase()];
            return Z && Z[Q || ""] || !1
        },
        createDocumentType: function A(B, Q, Z) {
            if (!qH8.isValidQName(B)) gf1.InvalidCharacterError();
            return new wvB(this.contextObject, B, Q, Z)
        },
        createDocument: function A(B, Q, Z) {
            var D = new UvB(!1, null),
                G;
            if (Q) G = D.createElementNS(B, Q);
            else G = null;
            if (Z) D.appendChild(Z);
            if (G) D.appendChild(G);
            if (B === gf1.NAMESPACE.HTML) D._contentType = "application/xhtml+xml";
            else if (B === gf1.NAMESPACE.SVG) D._contentType = "image/svg+xml";
            else D._contentType = "application/xml";
            return D
        },
        createHTMLDocument: function A(B) {
            var Q = new UvB(!0, null);
            Q.appendChild(new wvB(Q, "html"));
            var Z = Q.createElement("html");
            Q.appendChild(Z);
            var D = Q.createElement("head");
            if (Z.appendChild(D), B !== void 0) {
                var G = Q.createElement("title");
                D.appendChild(G), G.appendChild(Q.createTextNode(B))
            }
            return Z.appendChild(Q.createElement("body")), Q.modclock = 1, Q
        },
        mozSetOutputMutationHandler: function(A, B) {
            A.mutationHandler = B
        },
        mozGetInputMutationHandler: function(A) {
            gf1.nyi()
        },
        mozHTMLParser: $H8
    }
});
var LvB = E((NO3, NvB) => {
    var LH8 = Mf1(),
        MH8 = cM0();
    NvB.exports = ZR0;

    function ZR0(A, B) {
        this._window = A, this._href = B
    }
    ZR0.prototype = Object.create(MH8.prototype, {
        constructor: {
            value: ZR0
        },
        href: {
            get: function() {
                return this._href
            },
            set: function(A) {
                this.assign(A)
            }
        },
        assign: {
            value: function(A) {
                var B = new LH8(this._href),
                    Q = B.resolve(A);
                this._href = Q
            }
        },
        replace: {
            value: function(A) {
                this.assign(A)
            }
        },
        reload: {
            value: function() {
                this.assign(this.href)
            }
        },
        toString: {
            value: function() {
                return this.href
            }
        }
    })
});
var RvB = E((LO3, MvB) => {
    var RH8 = Object.create(null, {
        appCodeName: {
            value: "Mozilla"
        },
        appName: {
            value: "Netscape"
        },
        appVersion: {
            value: "4.0"
        },
        platform: {
            value: ""
        },
        product: {
            value: "Gecko"
        },
        productSub: {
            value: "20100101"
        },
        userAgent: {
            value: ""
        },
        vendor: {
            value: ""
        },
        vendorSub: {
            value: ""
        },
        taintEnabled: {
            value: function() {
                return !1
            }
        }
    });
    MvB.exports = RH8
});
var TvB = E((MO3, OvB) => {
    var OH8 = {
        setTimeout,
        clearTimeout,
        setInterval,
        clearInterval
    };
    OvB.exports = OH8
});
var GR0 = E((oF1, PvB) => {
    var DR0 = MD();
    oF1 = PvB.exports = {
        CSSStyleDeclaration: Rf1(),
        CharacterData: mF1(),
        Comment: SM0(),
        DOMException: Wf1(),
        DOMImplementation: rF1(),
        DOMTokenList: VM0(),
        Document: Sf1(),
        DocumentFragment: kM0(),
        DocumentType: kf1(),
        Element: f01(),
        HTMLParser: hf1(),
        NamedNodeMap: UM0(),
        Node: YW(),
        NodeList: kd(),
        NodeFilter: pF1(),
        ProcessingInstruction: _M0(),
        Text: TM0(),
        Window: FR0()
    };
    DR0.merge(oF1, dM0());
    DR0.merge(oF1, Tf1().elements);
    DR0.merge(oF1, aM0().elements)
});
var FR0 = E((RO3, SvB) => {
    var TH8 = rF1(),
        PH8 = rL0(),
        SH8 = LvB(),
        tF1 = MD();
    SvB.exports = uf1;

    function uf1(A) {
        this.document = A || new TH8(null).createHTMLDocument(""), this.document._scripting_enabled = !0, this.document.defaultView = this, this.location = new SH8(this, this.document._address || "about:blank")
    }
    uf1.prototype = Object.create(PH8.prototype, {
        console: {
            value: console
        },
        history: {
            value: {
                back: tF1.nyi,
                forward: tF1.nyi,
                go: tF1.nyi
            }
        },
        navigator: {
            value: RvB()
        },
        window: {
            get: function() {
                return this
            }
        },
        self: {
            get: function() {
                return this
            }
        },
        frames: {
            get: function() {
                return this
            }
        },
        parent: {
            get: function() {
                return this
            }
        },
        top: {
            get: function() {
                return this
            }
        },
        length: {
            value: 0
        },
        frameElement: {
            value: null
        },
        opener: {
            value: null
        },
        onload: {
            get: function() {
                return this._getEventHandler("load")
            },
            set: function(A) {
                this._setEventHandler("load", A)
            }
        },
        getComputedStyle: {
            value: function A(B) {
                return B.style
            }
        }
    });
    tF1.expose(TvB(), uf1);
    tF1.expose(GR0(), uf1)
});
var xvB = E((jH8) => {
    var jvB = rF1(),
        kvB = hf1(),
        OO3 = FR0(),
        yvB = GR0();
    jH8.createDOMImplementation = function() {
        return new jvB(null)
    };
    jH8.createDocument = function(A, B) {
        if (A || B) {
            var Q = new kvB;
            return Q.parse(A || "", !0), Q.document()
        }
        return new jvB(null).createHTMLDocument("")
    };
    jH8.createIncrementalHTMLParser = function() {
        var A = new kvB;
        return {
            write: function(B) {
                if (B.length > 0) A.parse(B, !1, function() {
                    return !0
                })
            },
            end: function(B) {
                A.parse(B || "", !0, function() {
                    return !0
                })
            },
            process: function(B) {
                return A.parse("", !1, B)
            },
            document: function() {
                return A.document()
            }
        }
    };
    jH8.createWindow = function(A, B) {
        var Q = jH8.createDocument(A);
        if (B !== void 0) Q._address = B;
        return new yvB.Window(Q)
    };
    jH8.impl = yvB
});