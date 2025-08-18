/* chunk:147 bytes:[3273808, 3291107) size:17299 source:unpacked-cli.js */
var Q20 = E((B85, xkA) => {
    function dxQ(A) {
        for (let B = 0; B < A.length; ++B) {
            let Q = A.charCodeAt(B);
            if (Q >= 0 && Q <= 8 || Q >= 10 && Q <= 31 || Q === 127) return !0
        }
        return !1
    }

    function jkA(A) {
        for (let B = 0; B < A.length; ++B) {
            let Q = A.charCodeAt(B);
            if (Q < 33 || Q > 126 || Q === 34 || Q === 40 || Q === 41 || Q === 60 || Q === 62 || Q === 64 || Q === 44 || Q === 59 || Q === 58 || Q === 92 || Q === 47 || Q === 91 || Q === 93 || Q === 63 || Q === 61 || Q === 123 || Q === 125) throw new Error("Invalid cookie name")
        }
    }

    function kkA(A) {
        let B = A.length,
            Q = 0;
        if (A[0] === '"') {
            if (B === 1 || A[B - 1] !== '"') throw new Error("Invalid cookie value");
            --B, ++Q
        }
        while (Q < B) {
            let Z = A.charCodeAt(Q++);
            if (Z < 33 || Z > 126 || Z === 34 || Z === 44 || Z === 59 || Z === 92) throw new Error("Invalid cookie value")
        }
    }

    function ykA(A) {
        for (let B = 0; B < A.length; ++B) {
            let Q = A.charCodeAt(B);
            if (Q < 32 || Q === 127 || Q === 59) throw new Error("Invalid cookie path")
        }
    }

    function cxQ(A) {
        if (A.startsWith("-") || A.endsWith(".") || A.endsWith("-")) throw new Error("Invalid cookie domain")
    }
    var lxQ = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
        pxQ = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
        Iw1 = Array(61).fill(0).map((A, B) => B.toString().padStart(2, "0"));

    function _kA(A) {
        if (typeof A === "number") A = new Date(A);
        return `${lxQ[A.getUTCDay()]}, ${Iw1[A.getUTCDate()]} ${pxQ[A.getUTCMonth()]} ${A.getUTCFullYear()} ${Iw1[A.getUTCHours()]}:${Iw1[A.getUTCMinutes()]}:${Iw1[A.getUTCSeconds()]} GMT`
    }

    function ixQ(A) {
        if (A < 0) throw new Error("Invalid cookie max-age")
    }

    function nxQ(A) {
        if (A.name.length === 0) return null;
        jkA(A.name), kkA(A.value);
        let B = [`${A.name}=${A.value}`];
        if (A.name.startsWith("__Secure-")) A.secure = !0;
        if (A.name.startsWith("__Host-")) A.secure = !0, A.domain = null, A.path = "/";
        if (A.secure) B.push("Secure");
        if (A.httpOnly) B.push("HttpOnly");
        if (typeof A.maxAge === "number") ixQ(A.maxAge), B.push(`Max-Age=${A.maxAge}`);
        if (A.domain) cxQ(A.domain), B.push(`Domain=${A.domain}`);
        if (A.path) ykA(A.path), B.push(`Path=${A.path}`);
        if (A.expires && A.expires.toString() !== "Invalid Date") B.push(`Expires=${_kA(A.expires)}`);
        if (A.sameSite) B.push(`SameSite=${A.sameSite}`);
        for (let Q of A.unparsed) {
            if (!Q.includes("=")) throw new Error("Invalid unparsed");
            let [Z, ...D] = Q.split("=");
            B.push(`${Z.trim()}=${D.join("=")}`)
        }
        return B.join("; ")
    }
    xkA.exports = {
        isCTLExcludingHtab: dxQ,
        validateCookieName: jkA,
        validateCookiePath: ykA,
        validateCookieValue: kkA,
        toIMFDate: _kA,
        stringify: nxQ
    }
});
var bkA = E((Q85, vkA) => {
    var {
        maxNameValuePairSize: axQ,
        maxAttributeValueSize: sxQ
    } = SkA(), {
        isCTLExcludingHtab: rxQ
    } = Q20(), {
        collectASequenceOfCodePointsFast: Yw1
    } = NV(), oxQ = W1("node:assert");

    function txQ(A) {
        if (rxQ(A)) return null;
        let B = "",
            Q = "",
            Z = "",
            D = "";
        if (A.includes(";")) {
            let G = {
                position: 0
            };
            B = Yw1(";", A, G), Q = A.slice(G.position)
        } else B = A;
        if (!B.includes("=")) D = B;
        else {
            let G = {
                position: 0
            };
            Z = Yw1("=", B, G), D = B.slice(G.position + 1)
        }
        if (Z = Z.trim(), D = D.trim(), Z.length + D.length > axQ) return null;
        return {
            name: Z,
            value: D,
            ...en(Q)
        }
    }

    function en(A, B = {}) {
        if (A.length === 0) return B;
        oxQ(A[0] === ";"), A = A.slice(1);
        let Q = "";
        if (A.includes(";")) Q = Yw1(";", A, {
            position: 0
        }), A = A.slice(Q.length);
        else Q = A, A = "";
        let Z = "",
            D = "";
        if (Q.includes("=")) {
            let F = {
                position: 0
            };
            Z = Yw1("=", Q, F), D = Q.slice(F.position + 1)
        } else Z = Q;
        if (Z = Z.trim(), D = D.trim(), D.length > sxQ) return en(A, B);
        let G = Z.toLowerCase();
        if (G === "expires") {
            let F = new Date(D);
            B.expires = F
        } else if (G === "max-age") {
            let F = D.charCodeAt(0);
            if ((F < 48 || F > 57) && D[0] !== "-") return en(A, B);
            if (!/^\d+$/.test(D)) return en(A, B);
            let I = Number(D);
            B.maxAge = I
        } else if (G === "domain") {
            let F = D;
            if (F[0] === ".") F = F.slice(1);
            F = F.toLowerCase(), B.domain = F
        } else if (G === "path") {
            let F = "";
            if (D.length === 0 || D[0] !== "/") F = "/";
            else F = D;
            B.path = F
        } else if (G === "secure") B.secure = !0;
        else if (G === "httponly") B.httpOnly = !0;
        else if (G === "samesite") {
            let F = "Default",
                I = D.toLowerCase();
            if (I.includes("none")) F = "None";
            if (I.includes("strict")) F = "Strict";
            if (I.includes("lax")) F = "Lax";
            B.sameSite = F
        } else B.unparsed ??= [], B.unparsed.push(`${Z}=${D}`);
        return en(A, B)
    }
    vkA.exports = {
        parseSetCookie: txQ,
        parseUnparsedAttributes: en
    }
});
var gkA = E((Z85, hkA) => {
    var {
        parseSetCookie: exQ
    } = bkA(), {
        stringify: AvQ
    } = Q20(), {
        webidl: k6
    } = NY(), {
        Headers: Ww1
    } = Bg();

    function BvQ(A) {
        k6.argumentLengthCheck(arguments, 1, "getCookies"), k6.brandCheck(A, Ww1, {
            strict: !1
        });
        let B = A.get("cookie"),
            Q = {};
        if (!B) return Q;
        for (let Z of B.split(";")) {
            let [D, ...G] = Z.split("=");
            Q[D.trim()] = G.join("=")
        }
        return Q
    }

    function QvQ(A, B, Q) {
        k6.brandCheck(A, Ww1, {
            strict: !1
        });
        let Z = "deleteCookie";
        k6.argumentLengthCheck(arguments, 2, Z), B = k6.converters.DOMString(B, Z, "name"), Q = k6.converters.DeleteCookieAttributes(Q), fkA(A, {
            name: B,
            value: "",
            expires: new Date(0),
            ...Q
        })
    }

    function ZvQ(A) {
        k6.argumentLengthCheck(arguments, 1, "getSetCookies"), k6.brandCheck(A, Ww1, {
            strict: !1
        });
        let B = A.getSetCookie();
        if (!B) return [];
        return B.map((Q) => exQ(Q))
    }

    function fkA(A, B) {
        k6.argumentLengthCheck(arguments, 2, "setCookie"), k6.brandCheck(A, Ww1, {
            strict: !1
        }), B = k6.converters.Cookie(B);
        let Q = AvQ(B);
        if (Q) A.append("Set-Cookie", Q)
    }
    k6.converters.DeleteCookieAttributes = k6.dictionaryConverter([{
        converter: k6.nullableConverter(k6.converters.DOMString),
        key: "path",
        defaultValue: () => null
    }, {
        converter: k6.nullableConverter(k6.converters.DOMString),
        key: "domain",
        defaultValue: () => null
    }]);
    k6.converters.Cookie = k6.dictionaryConverter([{
        converter: k6.converters.DOMString,
        key: "name"
    }, {
        converter: k6.converters.DOMString,
        key: "value"
    }, {
        converter: k6.nullableConverter((A) => {
            if (typeof A === "number") return k6.converters["unsigned long long"](A);
            return new Date(A)
        }),
        key: "expires",
        defaultValue: () => null
    }, {
        converter: k6.nullableConverter(k6.converters["long long"]),
        key: "maxAge",
        defaultValue: () => null
    }, {
        converter: k6.nullableConverter(k6.converters.DOMString),
        key: "domain",
        defaultValue: () => null
    }, {
        converter: k6.nullableConverter(k6.converters.DOMString),
        key: "path",
        defaultValue: () => null
    }, {
        converter: k6.nullableConverter(k6.converters.boolean),
        key: "secure",
        defaultValue: () => null
    }, {
        converter: k6.nullableConverter(k6.converters.boolean),
        key: "httpOnly",
        defaultValue: () => null
    }, {
        converter: k6.converters.USVString,
        key: "sameSite",
        allowedValues: ["Strict", "Lax", "None"]
    }, {
        converter: k6.sequenceConverter(k6.converters.DOMString),
        key: "unparsed",
        defaultValue: () => new Array(0)
    }]);
    hkA.exports = {
        getCookies: BvQ,
        deleteCookie: QvQ,
        getSetCookies: ZvQ,
        setCookie: fkA
    }
});
var Ba = E((D85, mkA) => {
    var {
        webidl: x9
    } = NY(), {
        kEnumerableProperty: OV
    } = e4(), {
        kConstruct: ukA
    } = VZ(), {
        MessagePort: DvQ
    } = W1("node:worker_threads");
    class IK extends Event {
        #A;
        constructor(A, B = {}) {
            if (A === ukA) {
                super(arguments[1], arguments[2]);
                x9.util.markAsUncloneable(this);
                return
            }
            let Q = "MessageEvent constructor";
            x9.argumentLengthCheck(arguments, 1, Q), A = x9.converters.DOMString(A, Q, "type"), B = x9.converters.MessageEventInit(B, Q, "eventInitDict");
            super(A, B);
            this.#A = B, x9.util.markAsUncloneable(this)
        }
        get data() {
            return x9.brandCheck(this, IK), this.#A.data
        }
        get origin() {
            return x9.brandCheck(this, IK), this.#A.origin
        }
        get lastEventId() {
            return x9.brandCheck(this, IK), this.#A.lastEventId
        }
        get source() {
            return x9.brandCheck(this, IK), this.#A.source
        }
        get ports() {
            if (x9.brandCheck(this, IK), !Object.isFrozen(this.#A.ports)) Object.freeze(this.#A.ports);
            return this.#A.ports
        }
        initMessageEvent(A, B = !1, Q = !1, Z = null, D = "", G = "", F = null, I = []) {
            return x9.brandCheck(this, IK), x9.argumentLengthCheck(arguments, 1, "MessageEvent.initMessageEvent"), new IK(A, {
                bubbles: B,
                cancelable: Q,
                data: Z,
                origin: D,
                lastEventId: G,
                source: F,
                ports: I
            })
        }
        static createFastMessageEvent(A, B) {
            let Q = new IK(ukA, A, B);
            return Q.#A = B, Q.#A.data ??= null, Q.#A.origin ??= "", Q.#A.lastEventId ??= "", Q.#A.source ??= null, Q.#A.ports ??= [], Q
        }
    }
    var {
        createFastMessageEvent: GvQ
    } = IK;
    delete IK.createFastMessageEvent;
    class Aa extends Event {
        #A;
        constructor(A, B = {}) {
            x9.argumentLengthCheck(arguments, 1, "CloseEvent constructor"), A = x9.converters.DOMString(A, "CloseEvent constructor", "type"), B = x9.converters.CloseEventInit(B);
            super(A, B);
            this.#A = B, x9.util.markAsUncloneable(this)
        }
        get wasClean() {
            return x9.brandCheck(this, Aa), this.#A.wasClean
        }
        get code() {
            return x9.brandCheck(this, Aa), this.#A.code
        }
        get reason() {
            return x9.brandCheck(this, Aa), this.#A.reason
        }
    }
    class Wy extends Event {
        #A;
        constructor(A, B) {
            x9.argumentLengthCheck(arguments, 1, "ErrorEvent constructor");
            super(A, B);
            x9.util.markAsUncloneable(this), A = x9.converters.DOMString(A, "ErrorEvent constructor", "type"), B = x9.converters.ErrorEventInit(B ?? {}), this.#A = B
        }
        get message() {
            return x9.brandCheck(this, Wy), this.#A.message
        }
        get filename() {
            return x9.brandCheck(this, Wy), this.#A.filename
        }
        get lineno() {
            return x9.brandCheck(this, Wy), this.#A.lineno
        }
        get colno() {
            return x9.brandCheck(this, Wy), this.#A.colno
        }
        get error() {
            return x9.brandCheck(this, Wy), this.#A.error
        }
    }
    Object.defineProperties(IK.prototype, {
        [Symbol.toStringTag]: {
            value: "MessageEvent",
            configurable: !0
        },
        data: OV,
        origin: OV,
        lastEventId: OV,
        source: OV,
        ports: OV,
        initMessageEvent: OV
    });
    Object.defineProperties(Aa.prototype, {
        [Symbol.toStringTag]: {
            value: "CloseEvent",
            configurable: !0
        },
        reason: OV,
        code: OV,
        wasClean: OV
    });
    Object.defineProperties(Wy.prototype, {
        [Symbol.toStringTag]: {
            value: "ErrorEvent",
            configurable: !0
        },
        message: OV,
        filename: OV,
        lineno: OV,
        colno: OV,
        error: OV
    });
    x9.converters.MessagePort = x9.interfaceConverter(DvQ);
    x9.converters["sequence<MessagePort>"] = x9.sequenceConverter(x9.converters.MessagePort);
    var Z20 = [{
        key: "bubbles",
        converter: x9.converters.boolean,
        defaultValue: () => !1
    }, {
        key: "cancelable",
        converter: x9.converters.boolean,
        defaultValue: () => !1
    }, {
        key: "composed",
        converter: x9.converters.boolean,
        defaultValue: () => !1
    }];
    x9.converters.MessageEventInit = x9.dictionaryConverter([...Z20, {
        key: "data",
        converter: x9.converters.any,
        defaultValue: () => null
    }, {
        key: "origin",
        converter: x9.converters.USVString,
        defaultValue: () => ""
    }, {
        key: "lastEventId",
        converter: x9.converters.DOMString,
        defaultValue: () => ""
    }, {
        key: "source",
        converter: x9.nullableConverter(x9.converters.MessagePort),
        defaultValue: () => null
    }, {
        key: "ports",
        converter: x9.converters["sequence<MessagePort>"],
        defaultValue: () => new Array(0)
    }]);
    x9.converters.CloseEventInit = x9.dictionaryConverter([...Z20, {
        key: "wasClean",
        converter: x9.converters.boolean,
        defaultValue: () => !1
    }, {
        key: "code",
        converter: x9.converters["unsigned short"],
        defaultValue: () => 0
    }, {
        key: "reason",
        converter: x9.converters.USVString,
        defaultValue: () => ""
    }]);
    x9.converters.ErrorEventInit = x9.dictionaryConverter([...Z20, {
        key: "message",
        converter: x9.converters.DOMString,
        defaultValue: () => ""
    }, {
        key: "filename",
        converter: x9.converters.USVString,
        defaultValue: () => ""
    }, {
        key: "lineno",
        converter: x9.converters["unsigned long"],
        defaultValue: () => 0
    }, {
        key: "colno",
        converter: x9.converters["unsigned long"],
        defaultValue: () => 0
    }, {
        key: "error",
        converter: x9.converters.any
    }]);
    mkA.exports = {
        MessageEvent: IK,
        CloseEvent: Aa,
        ErrorEvent: Wy,
        createFastMessageEvent: GvQ
    }
});
var Fg = E((G85, dkA) => {
    var FvQ = {
            enumerable: !0,
            writable: !1,
            configurable: !1
        },
        IvQ = {
            CONNECTING: 0,
            OPEN: 1,
            CLOSING: 2,
            CLOSED: 3
        },
        YvQ = {
            NOT_SENT: 0,
            PROCESSING: 1,
            SENT: 2
        },
        WvQ = {
            CONTINUATION: 0,
            TEXT: 1,
            BINARY: 2,
            CLOSE: 8,
            PING: 9,
            PONG: 10
        },
        JvQ = {
            INFO: 0,
            PAYLOADLENGTH_16: 2,
            PAYLOADLENGTH_64: 3,
            READ_DATA: 4
        },
        XvQ = Buffer.allocUnsafe(0),
        VvQ = {
            string: 1,
            typedArray: 2,
            arrayBuffer: 3,
            blob: 4
        };
    dkA.exports = {
        uid: "258EAFA5-E914-47DA-95CA-C5AB0DC85B11",
        sentCloseFrameState: YvQ,
        staticPropertyDescriptors: FvQ,
        states: IvQ,
        opcodes: WvQ,
        maxUnsigned16Bit: 65535,
        parserStates: JvQ,
        emptyBuffer: XvQ,
        sendHints: VvQ
    }
});
var j41 = E((F85, ckA) => {
    ckA.exports = {
        kWebSocketURL: Symbol("url"),
        kReadyState: Symbol("ready state"),
        kController: Symbol("controller"),
        kResponse: Symbol("response"),
        kBinaryType: Symbol("binary type"),
        kSentClose: Symbol("sent close"),
        kReceivedClose: Symbol("received close"),
        kByteParser: Symbol("byte parser")
    }
});