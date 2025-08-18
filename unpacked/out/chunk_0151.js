/* chunk:151 bytes:[3330538, 3348408) size:17870 source:unpacked-cli.js */
var oyA = E((z85, ryA) => {
    var {
        pipeline: xbQ
    } = W1("node:stream"), {
        fetching: vbQ
    } = R41(), {
        makeRequest: bbQ
    } = sn(), {
        webidl: IT
    } = NY(), {
        EventSourceStream: fbQ
    } = cyA(), {
        parseMIMEType: hbQ
    } = NV(), {
        createFastMessageEvent: gbQ
    } = Ba(), {
        isNetworkError: lyA
    } = L41(), {
        delay: ubQ
    } = J20(), {
        kEnumerableProperty: Ig
    } = e4(), {
        environmentSettingsObject: pyA
    } = AK(), iyA = !1, nyA = 3000, h41 = 0, ayA = 1, g41 = 2, mbQ = "anonymous", dbQ = "use-credentials";
    class Fa extends EventTarget {
        #A = {
            open: null,
            error: null,
            message: null
        };
        #B = null;
        #Q = !1;
        #Z = h41;
        #D = null;
        #Y = null;
        #G;
        #J;
        constructor(A, B = {}) {
            super();
            IT.util.markAsUncloneable(this);
            let Q = "EventSource constructor";
            if (IT.argumentLengthCheck(arguments, 1, Q), !iyA) iyA = !0, process.emitWarning("EventSource is experimental, expect them to change at any time.", {
                code: "UNDICI-ES"
            });
            A = IT.converters.USVString(A, Q, "url"), B = IT.converters.EventSourceInitDict(B, Q, "eventSourceInitDict"), this.#G = B.dispatcher, this.#J = {
                lastEventId: "",
                reconnectionTime: nyA
            };
            let Z = pyA,
                D;
            try {
                D = new URL(A, Z.settingsObject.baseUrl), this.#J.origin = D.origin
            } catch (I) {
                throw new DOMException(I, "SyntaxError")
            }
            this.#B = D.href;
            let G = mbQ;
            if (B.withCredentials) G = dbQ, this.#Q = !0;
            let F = {
                redirect: "follow",
                keepalive: !0,
                mode: "cors",
                credentials: G === "anonymous" ? "same-origin" : "omit",
                referrer: "no-referrer"
            };
            F.client = pyA.settingsObject, F.headersList = [
                ["accept", {
                    name: "accept",
                    value: "text/event-stream"
                }]
            ], F.cache = "no-store", F.initiator = "other", F.urlList = [new URL(this.#B)], this.#D = bbQ(F), this.#W()
        }
        get readyState() {
            return this.#Z
        }
        get url() {
            return this.#B
        }
        get withCredentials() {
            return this.#Q
        }
        #W() {
            if (this.#Z === g41) return;
            this.#Z = h41;
            let A = {
                    request: this.#D,
                    dispatcher: this.#G
                },
                B = (Q) => {
                    if (lyA(Q)) this.dispatchEvent(new Event("error")), this.close();
                    this.#X()
                };
            A.processResponseEndOfBody = B, A.processResponse = (Q) => {
                if (lyA(Q))
                    if (Q.aborted) {
                        this.close(), this.dispatchEvent(new Event("error"));
                        return
                    } else {
                        this.#X();
                        return
                    } let Z = Q.headersList.get("content-type", !0),
                    D = Z !== null ? hbQ(Z) : "failure",
                    G = D !== "failure" && D.essence === "text/event-stream";
                if (Q.status !== 200 || G === !1) {
                    this.close(), this.dispatchEvent(new Event("error"));
                    return
                }
                this.#Z = ayA, this.dispatchEvent(new Event("open")), this.#J.origin = Q.urlList[Q.urlList.length - 1].origin;
                let F = new fbQ({
                    eventSourceSettings: this.#J,
                    push: (I) => {
                        this.dispatchEvent(gbQ(I.type, I.options))
                    }
                });
                xbQ(Q.body.stream, F, (I) => {
                    if (I?.aborted === !1) this.close(), this.dispatchEvent(new Event("error"))
                })
            }, this.#Y = vbQ(A)
        }
        async #X() {
            if (this.#Z === g41) return;
            if (this.#Z = h41, this.dispatchEvent(new Event("error")), await ubQ(this.#J.reconnectionTime), this.#Z !== h41) return;
            if (this.#J.lastEventId.length) this.#D.headersList.set("last-event-id", this.#J.lastEventId, !0);
            this.#W()
        }
        close() {
            if (IT.brandCheck(this, Fa), this.#Z === g41) return;
            this.#Z = g41, this.#Y.abort(), this.#D = null
        }
        get onopen() {
            return this.#A.open
        }
        set onopen(A) {
            if (this.#A.open) this.removeEventListener("open", this.#A.open);
            if (typeof A === "function") this.#A.open = A, this.addEventListener("open", A);
            else this.#A.open = null
        }
        get onmessage() {
            return this.#A.message
        }
        set onmessage(A) {
            if (this.#A.message) this.removeEventListener("message", this.#A.message);
            if (typeof A === "function") this.#A.message = A, this.addEventListener("message", A);
            else this.#A.message = null
        }
        get onerror() {
            return this.#A.error
        }
        set onerror(A) {
            if (this.#A.error) this.removeEventListener("error", this.#A.error);
            if (typeof A === "function") this.#A.error = A, this.addEventListener("error", A);
            else this.#A.error = null
        }
    }
    var syA = {
        CONNECTING: {
            __proto__: null,
            configurable: !1,
            enumerable: !0,
            value: h41,
            writable: !1
        },
        OPEN: {
            __proto__: null,
            configurable: !1,
            enumerable: !0,
            value: ayA,
            writable: !1
        },
        CLOSED: {
            __proto__: null,
            configurable: !1,
            enumerable: !0,
            value: g41,
            writable: !1
        }
    };
    Object.defineProperties(Fa, syA);
    Object.defineProperties(Fa.prototype, syA);
    Object.defineProperties(Fa.prototype, {
        close: Ig,
        onerror: Ig,
        onmessage: Ig,
        onopen: Ig,
        readyState: Ig,
        url: Ig,
        withCredentials: Ig
    });
    IT.converters.EventSourceInitDict = IT.dictionaryConverter([{
        key: "withCredentials",
        converter: IT.converters.boolean,
        defaultValue: () => !1
    }, {
        key: "dispatcher",
        converter: IT.converters.any
    }]);
    ryA.exports = {
        EventSource: Fa,
        defaultReconnectionTime: nyA
    }
});
var X20 = E((qfQ, EQ) => {
    var cbQ = I41(),
        tyA = uQ1(),
        lbQ = bn(),
        pbQ = xTA(),
        ibQ = fn(),
        nbQ = DA0(),
        abQ = APA(),
        sbQ = IPA(),
        eyA = $5(),
        ww1 = e4(),
        {
            InvalidArgumentError: Uw1
        } = eyA,
        Ia = ASA(),
        rbQ = dQ1(),
        obQ = SA0(),
        tbQ = gSA(),
        ebQ = kA0(),
        AfQ = UA0(),
        BfQ = PU1(),
        {
            getGlobalDispatcher: A_A,
            setGlobalDispatcher: QfQ
        } = fU1(),
        ZfQ = hU1(),
        DfQ = UU1(),
        GfQ = wU1();
    Object.assign(tyA.prototype, Ia);
    qfQ.Dispatcher = tyA;
    qfQ.Client = cbQ;
    qfQ.Pool = lbQ;
    qfQ.BalancedPool = pbQ;
    qfQ.Agent = ibQ;
    qfQ.ProxyAgent = nbQ;
    qfQ.EnvHttpProxyAgent = abQ;
    qfQ.RetryAgent = sbQ;
    qfQ.RetryHandler = BfQ;
    qfQ.DecoratorHandler = ZfQ;
    qfQ.RedirectHandler = DfQ;
    qfQ.createRedirectInterceptor = GfQ;
    qfQ.interceptors = {
        redirect: iSA(),
        retry: aSA(),
        dump: oSA(),
        dns: QjA()
    };
    qfQ.buildConnector = rbQ;
    qfQ.errors = eyA;
    qfQ.util = {
        parseHeaders: ww1.parseHeaders,
        headerNameToString: ww1.headerNameToString
    };

    function u41(A) {
        return (B, Q, Z) => {
            if (typeof Q === "function") Z = Q, Q = null;
            if (!B || typeof B !== "string" && typeof B !== "object" && !(B instanceof URL)) throw new Uw1("invalid url");
            if (Q != null && typeof Q !== "object") throw new Uw1("invalid opts");
            if (Q && Q.path != null) {
                if (typeof Q.path !== "string") throw new Uw1("invalid opts.path");
                let F = Q.path;
                if (!Q.path.startsWith("/")) F = `/${F}`;
                B = new URL(ww1.parseOrigin(B).origin + F)
            } else {
                if (!Q) Q = typeof B === "object" ? B : {};
                B = ww1.parseURL(B)
            }
            let {
                agent: D,
                dispatcher: G = A_A()
            } = Q;
            if (D) throw new Uw1("unsupported opts.agent. Did you mean opts.client?");
            return A.call(G, {
                ...Q,
                origin: B.origin,
                path: B.search ? `${B.pathname}${B.search}` : B.pathname,
                method: Q.method || (Q.body ? "PUT" : "GET")
            }, Z)
        }
    }
    qfQ.setGlobalDispatcher = QfQ;
    qfQ.getGlobalDispatcher = A_A;
    var FfQ = R41().fetch;
    qfQ.fetch = async function A(B, Q = void 0) {
        try {
            return await FfQ(B, Q)
        } catch (Z) {
            if (Z && typeof Z === "object") Error.captureStackTrace(Z);
            throw Z
        }
    };
    qfQ.Headers = Bg().Headers;
    qfQ.Response = L41().Response;
    qfQ.Request = sn().Request;
    qfQ.FormData = aQ1().FormData;
    qfQ.File = globalThis.File ?? W1("node:buffer").File;
    qfQ.FileReader = UkA().FileReader;
    var {
        setGlobalOrigin: IfQ,
        getGlobalOrigin: YfQ
    } = H00();
    qfQ.setGlobalOrigin = IfQ;
    qfQ.getGlobalOrigin = YfQ;
    var {
        CacheStorage: WfQ
    } = TkA(), {
        kConstruct: JfQ
    } = Dw1();
    qfQ.caches = new WfQ(JfQ);
    var {
        deleteCookie: XfQ,
        getCookies: VfQ,
        getSetCookies: CfQ,
        setCookie: KfQ
    } = gkA();
    qfQ.deleteCookie = XfQ;
    qfQ.getCookies = VfQ;
    qfQ.getSetCookies = CfQ;
    qfQ.setCookie = KfQ;
    var {
        parseMIMEType: HfQ,
        serializeAMimeType: zfQ
    } = NV();
    qfQ.parseMIMEType = HfQ;
    qfQ.serializeAMimeType = zfQ;
    var {
        CloseEvent: EfQ,
        ErrorEvent: UfQ,
        MessageEvent: wfQ
    } = Ba();
    qfQ.WebSocket = fyA().WebSocket;
    qfQ.CloseEvent = EfQ;
    qfQ.ErrorEvent = UfQ;
    qfQ.MessageEvent = wfQ;
    qfQ.request = u41(Ia.request);
    qfQ.stream = u41(Ia.stream);
    qfQ.pipeline = u41(Ia.pipeline);
    qfQ.connect = u41(Ia.connect);
    qfQ.upgrade = u41(Ia.upgrade);
    qfQ.MockClient = obQ;
    qfQ.MockPool = ebQ;
    qfQ.MockAgent = tbQ;
    qfQ.mockErrors = AfQ;
    var {
        EventSource: $fQ
    } = oyA();
    qfQ.EventSource = $fQ
});
var h_A = E((l55, f_A) => {
    f_A.exports = v_A;

    function v_A(A, B, Q) {
        if (A instanceof RegExp) A = x_A(A, Q);
        if (B instanceof RegExp) B = x_A(B, Q);
        var Z = b_A(A, B, Q);
        return Z && {
            start: Z[0],
            end: Z[1],
            pre: Q.slice(0, Z[0]),
            body: Q.slice(Z[0] + A.length, Z[1]),
            post: Q.slice(Z[1] + B.length)
        }
    }

    function x_A(A, B) {
        var Q = B.match(A);
        return Q ? Q[0] : null
    }
    v_A.range = b_A;

    function b_A(A, B, Q) {
        var Z, D, G, F, I, Y = Q.indexOf(A),
            W = Q.indexOf(B, Y + 1),
            J = Y;
        if (Y >= 0 && W > 0) {
            if (A === B) return [Y, W];
            Z = [], G = Q.length;
            while (J >= 0 && !I) {
                if (J == Y) Z.push(J), Y = Q.indexOf(A, J + 1);
                else if (Z.length == 1) I = [Z.pop(), W];
                else {
                    if (D = Z.pop(), D < G) G = D, F = W;
                    W = Q.indexOf(B, J + 1)
                }
                J = Y < W && Y >= 0 ? Y : W
            }
            if (Z.length) I = [G, F]
        }
        return I
    }
});
var i_A = E((p55, p_A) => {
    var g_A = h_A();
    p_A.exports = uhQ;
    var u_A = "\x00SLASH" + Math.random() + "\x00",
        m_A = "\x00OPEN" + Math.random() + "\x00",
        N20 = "\x00CLOSE" + Math.random() + "\x00",
        d_A = "\x00COMMA" + Math.random() + "\x00",
        c_A = "\x00PERIOD" + Math.random() + "\x00";

    function q20(A) {
        return parseInt(A, 10) == A ? parseInt(A, 10) : A.charCodeAt(0)
    }

    function hhQ(A) {
        return A.split("\\\\").join(u_A).split("\\{").join(m_A).split("\\}").join(N20).split("\\,").join(d_A).split("\\.").join(c_A)
    }

    function ghQ(A) {
        return A.split(u_A).join("\\").split(m_A).join("{").split(N20).join("}").split(d_A).join(",").split(c_A).join(".")
    }

    function l_A(A) {
        if (!A) return [""];
        var B = [],
            Q = g_A("{", "}", A);
        if (!Q) return A.split(",");
        var {
            pre: Z,
            body: D,
            post: G
        } = Q, F = Z.split(",");
        F[F.length - 1] += "{" + D + "}";
        var I = l_A(G);
        if (G.length) F[F.length - 1] += I.shift(), F.push.apply(F, I);
        return B.push.apply(B, F), B
    }

    function uhQ(A) {
        if (!A) return [];
        if (A.substr(0, 2) === "{}") A = "\\{\\}" + A.substr(2);
        return p41(hhQ(A), !0).map(ghQ)
    }

    function mhQ(A) {
        return "{" + A + "}"
    }

    function dhQ(A) {
        return /^-?0\d/.test(A)
    }

    function chQ(A, B) {
        return A <= B
    }

    function lhQ(A, B) {
        return A >= B
    }

    function p41(A, B) {
        var Q = [],
            Z = g_A("{", "}", A);
        if (!Z) return [A];
        var D = Z.pre,
            G = Z.post.length ? p41(Z.post, !1) : [""];
        if (/\$$/.test(Z.pre))
            for (var F = 0; F < G.length; F++) {
                var I = D + "{" + Z.body + "}" + G[F];
                Q.push(I)
            } else {
                var Y = /^-?\d+\.\.-?\d+(?:\.\.-?\d+)?$/.test(Z.body),
                    W = /^[a-zA-Z]\.\.[a-zA-Z](?:\.\.-?\d+)?$/.test(Z.body),
                    J = Y || W,
                    X = Z.body.indexOf(",") >= 0;
                if (!J && !X) {
                    if (Z.post.match(/,.*\}/)) return A = Z.pre + "{" + Z.body + N20 + Z.post, p41(A);
                    return [A]
                }
                var V;
                if (J) V = Z.body.split(/\.\./);
                else if (V = l_A(Z.body), V.length === 1) {
                    if (V = p41(V[0], !1).map(mhQ), V.length === 1) return G.map(function(c) {
                        return Z.pre + V[0] + c
                    })
                }
                var C;
                if (J) {
                    var K = q20(V[0]),
                        H = q20(V[1]),
                        z = Math.max(V[0].length, V[1].length),
                        $ = V.length == 3 ? Math.abs(q20(V[2])) : 1,
                        L = chQ,
                        N = H < K;
                    if (N) $ *= -1, L = lhQ;
                    var R = V.some(dhQ);
                    C = [];
                    for (var O = K; L(O, H); O += $) {
                        var P;
                        if (W) {
                            if (P = String.fromCharCode(O), P === "\\") P = ""
                        } else if (P = String(O), R) {
                            var j = z - P.length;
                            if (j > 0) {
                                var f = new Array(j + 1).join("0");
                                if (O < 0) P = "-" + f + P.slice(1);
                                else P = f + P
                            }
                        }
                        C.push(P)
                    }
                } else {
                    C = [];
                    for (var k = 0; k < V.length; k++) C.push.apply(C, p41(V[k], !1))
                }
                for (var k = 0; k < C.length; k++)
                    for (var F = 0; F < G.length; F++) {
                        var I = D + C[k] + G[F];
                        if (!B || J || I) Q.push(I)
                    }
            }
        return Q
    }
});
var a5 = E((kxA) => {
    Object.defineProperty(kxA, "__esModule", {
        value: !0
    });
    kxA.isFunction = void 0;

    function JuQ(A) {
        return typeof A === "function"
    }
    kxA.isFunction = JuQ
});
var $y = E((_xA) => {
    Object.defineProperty(_xA, "__esModule", {
        value: !0
    });
    _xA.createErrorClass = void 0;

    function XuQ(A) {
        var B = function(Z) {
                Error.call(Z), Z.stack = new Error().stack
            },
            Q = A(B);
        return Q.prototype = Object.create(Error.prototype), Q.prototype.constructor = Q, Q
    }
    _xA.createErrorClass = XuQ
});
var g20 = E((vxA) => {
    Object.defineProperty(vxA, "__esModule", {
        value: !0
    });
    vxA.UnsubscriptionError = void 0;
    var VuQ = $y();
    vxA.UnsubscriptionError = VuQ.createErrorClass(function(A) {
        return function B(Q) {
            A(this), this.message = Q ? Q.length + ` errors occurred during unsubscription:
` + Q.map(function(Z, D) {
                return D + 1 + ") " + Z.toString()
            }).join(`
  `) : "", this.name = "UnsubscriptionError", this.errors = Q
        }
    })
});
var CT = E((fxA) => {
    Object.defineProperty(fxA, "__esModule", {
        value: !0
    });
    fxA.arrRemove = void 0;

    function CuQ(A, B) {
        if (A) {
            var Q = A.indexOf(B);
            0 <= Q && A.splice(Q, 1)
        }
    }
    fxA.arrRemove = CuQ
});