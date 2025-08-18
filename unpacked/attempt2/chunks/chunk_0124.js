/* chunk:124 bytes:[2791373, 2810729) size:19356 source:unpacked-cli.js */
var $n = E((u45, iMA) => {
    var rMQ = uQ1(),
        {
            ClientDestroyedError: t10,
            ClientClosedError: oMQ,
            InvalidArgumentError: En
        } = $5(),
        {
            kDestroy: tMQ,
            kClose: eMQ,
            kClosed: mQ1,
            kDestroyed: Un,
            kDispatch: e10,
            kInterceptors: dh
        } = VZ(),
        rO = Symbol("onDestroyed"),
        wn = Symbol("onClosed"),
        nE1 = Symbol("Intercepted Dispatch");
    class pMA extends rMQ {
        constructor() {
            super();
            this[Un] = !1, this[rO] = null, this[mQ1] = !1, this[wn] = []
        }
        get destroyed() {
            return this[Un]
        }
        get closed() {
            return this[mQ1]
        }
        get interceptors() {
            return this[dh]
        }
        set interceptors(A) {
            if (A) {
                for (let B = A.length - 1; B >= 0; B--)
                    if (typeof this[dh][B] !== "function") throw new En("interceptor must be an function")
            }
            this[dh] = A
        }
        close(A) {
            if (A === void 0) return new Promise((Q, Z) => {
                this.close((D, G) => {
                    return D ? Z(D) : Q(G)
                })
            });
            if (typeof A !== "function") throw new En("invalid callback");
            if (this[Un]) {
                queueMicrotask(() => A(new t10, null));
                return
            }
            if (this[mQ1]) {
                if (this[wn]) this[wn].push(A);
                else queueMicrotask(() => A(null, null));
                return
            }
            this[mQ1] = !0, this[wn].push(A);
            let B = () => {
                let Q = this[wn];
                this[wn] = null;
                for (let Z = 0; Z < Q.length; Z++) Q[Z](null, null)
            };
            this[eMQ]().then(() => this.destroy()).then(() => {
                queueMicrotask(B)
            })
        }
        destroy(A, B) {
            if (typeof A === "function") B = A, A = null;
            if (B === void 0) return new Promise((Z, D) => {
                this.destroy(A, (G, F) => {
                    return G ? D(G) : Z(F)
                })
            });
            if (typeof B !== "function") throw new En("invalid callback");
            if (this[Un]) {
                if (this[rO]) this[rO].push(B);
                else queueMicrotask(() => B(null, null));
                return
            }
            if (!A) A = new t10;
            this[Un] = !0, this[rO] = this[rO] || [], this[rO].push(B);
            let Q = () => {
                let Z = this[rO];
                this[rO] = null;
                for (let D = 0; D < Z.length; D++) Z[D](null, null)
            };
            this[tMQ](A).then(() => {
                queueMicrotask(Q)
            })
        } [nE1](A, B) {
            if (!this[dh] || this[dh].length === 0) return this[nE1] = this[e10], this[e10](A, B);
            let Q = this[e10].bind(this);
            for (let Z = this[dh].length - 1; Z >= 0; Z--) Q = this[dh][Z](Q);
            return this[nE1] = Q, Q(A, B)
        }
        dispatch(A, B) {
            if (!B || typeof B !== "object") throw new En("handler must be an object");
            try {
                if (!A || typeof A !== "object") throw new En("opts must be an object.");
                if (this[Un] || this[rO]) throw new t10;
                if (this[mQ1]) throw new oMQ;
                return this[nE1](A, B)
            } catch (Q) {
                if (typeof B.onError !== "function") throw new En("invalid onError method");
                return B.onError(Q), !1
            }
        }
    }
    iMA.exports = pMA
});
var I00 = E((m45, rMA) => {
    var qn = 0,
        A00 = 1000,
        B00 = (A00 >> 1) - 1,
        oO, Q00 = Symbol("kFastTimer"),
        tO = [],
        Z00 = -2,
        D00 = -1,
        aMA = 0,
        nMA = 1;

    function G00() {
        qn += B00;
        let A = 0,
            B = tO.length;
        while (A < B) {
            let Q = tO[A];
            if (Q._state === aMA) Q._idleStart = qn - B00, Q._state = nMA;
            else if (Q._state === nMA && qn >= Q._idleStart + Q._idleTimeout) Q._state = D00, Q._idleStart = -1, Q._onTimeout(Q._timerArg);
            if (Q._state === D00) {
                if (Q._state = Z00, --B !== 0) tO[A] = tO[B]
            } else ++A
        }
        if (tO.length = B, tO.length !== 0) sMA()
    }

    function sMA() {
        if (oO) oO.refresh();
        else if (clearTimeout(oO), oO = setTimeout(G00, B00), oO.unref) oO.unref()
    }
    class F00 {
        [Q00] = !0;
        _state = Z00;
        _idleTimeout = -1;
        _idleStart = -1;
        _onTimeout;
        _timerArg;
        constructor(A, B, Q) {
            this._onTimeout = A, this._idleTimeout = B, this._timerArg = Q, this.refresh()
        }
        refresh() {
            if (this._state === Z00) tO.push(this);
            if (!oO || tO.length === 1) sMA();
            this._state = aMA
        }
        clear() {
            this._state = D00, this._idleStart = -1
        }
    }
    rMA.exports = {
        setTimeout(A, B, Q) {
            return B <= A00 ? setTimeout(A, B, Q) : new F00(A, B, Q)
        },
        clearTimeout(A) {
            if (A[Q00]) A.clear();
            else clearTimeout(A)
        },
        setFastTimeout(A, B, Q) {
            return new F00(A, B, Q)
        },
        clearFastTimeout(A) {
            A.clear()
        },
        now() {
            return qn
        },
        tick(A = 0) {
            qn += A - A00 + 1, G00(), G00()
        },
        reset() {
            qn = 0, tO.length = 0, clearTimeout(oO), oO = null
        },
        kFastTimer: Q00
    }
});
var dQ1 = E((d45, BRA) => {
    var ARQ = W1("node:net"),
        oMA = W1("node:assert"),
        ARA = e4(),
        {
            InvalidArgumentError: BRQ,
            ConnectTimeoutError: QRQ
        } = $5(),
        aE1 = I00();

    function tMA() {}
    var Y00, W00;
    if (global.FinalizationRegistry && !(process.env.NODE_V8_COVERAGE || process.env.UNDICI_NO_FG)) W00 = class A {
        constructor(B) {
            this._maxCachedSessions = B, this._sessionCache = new Map, this._sessionRegistry = new global.FinalizationRegistry((Q) => {
                if (this._sessionCache.size < this._maxCachedSessions) return;
                let Z = this._sessionCache.get(Q);
                if (Z !== void 0 && Z.deref() === void 0) this._sessionCache.delete(Q)
            })
        }
        get(B) {
            let Q = this._sessionCache.get(B);
            return Q ? Q.deref() : null
        }
        set(B, Q) {
            if (this._maxCachedSessions === 0) return;
            this._sessionCache.set(B, new WeakRef(Q)), this._sessionRegistry.register(Q, B)
        }
    };
    else W00 = class A {
        constructor(B) {
            this._maxCachedSessions = B, this._sessionCache = new Map
        }
        get(B) {
            return this._sessionCache.get(B)
        }
        set(B, Q) {
            if (this._maxCachedSessions === 0) return;
            if (this._sessionCache.size >= this._maxCachedSessions) {
                let {
                    value: Z
                } = this._sessionCache.keys().next();
                this._sessionCache.delete(Z)
            }
            this._sessionCache.set(B, Q)
        }
    };

    function ZRQ({
        allowH2: A,
        maxCachedSessions: B,
        socketPath: Q,
        timeout: Z,
        session: D,
        ...G
    }) {
        if (B != null && (!Number.isInteger(B) || B < 0)) throw new BRQ("maxCachedSessions must be a positive integer or zero");
        let F = {
                path: Q,
                ...G
            },
            I = new W00(B == null ? 100 : B);
        return Z = Z == null ? 1e4 : Z, A = A != null ? A : !1,
            function Y({
                hostname: W,
                host: J,
                protocol: X,
                port: V,
                servername: C,
                localAddress: K,
                httpSocket: H
            }, z) {
                let $;
                if (X === "https:") {
                    if (!Y00) Y00 = W1("node:tls");
                    C = C || F.servername || ARA.getServerName(J) || null;
                    let N = C || W;
                    oMA(N);
                    let R = D || I.get(N) || null;
                    V = V || 443, $ = Y00.connect({
                        highWaterMark: 16384,
                        ...F,
                        servername: C,
                        session: R,
                        localAddress: K,
                        ALPNProtocols: A ? ["http/1.1", "h2"] : ["http/1.1"],
                        socket: H,
                        port: V,
                        host: W
                    }), $.on("session", function(O) {
                        I.set(N, O)
                    })
                } else oMA(!H, "httpSocket can only be sent on TLS update"), V = V || 80, $ = ARQ.connect({
                    highWaterMark: 65536,
                    ...F,
                    localAddress: K,
                    port: V,
                    host: W
                });
                if (F.keepAlive == null || F.keepAlive) {
                    let N = F.keepAliveInitialDelay === void 0 ? 60000 : F.keepAliveInitialDelay;
                    $.setKeepAlive(!0, N)
                }
                let L = DRQ(new WeakRef($), {
                    timeout: Z,
                    hostname: W,
                    port: V
                });
                return $.setNoDelay(!0).once(X === "https:" ? "secureConnect" : "connect", function() {
                    if (queueMicrotask(L), z) {
                        let N = z;
                        z = null, N(null, this)
                    }
                }).on("error", function(N) {
                    if (queueMicrotask(L), z) {
                        let R = z;
                        z = null, R(N)
                    }
                }), $
            }
    }
    var DRQ = process.platform === "win32" ? (A, B) => {
        if (!B.timeout) return tMA;
        let Q = null,
            Z = null,
            D = aE1.setFastTimeout(() => {
                Q = setImmediate(() => {
                    Z = setImmediate(() => eMA(A.deref(), B))
                })
            }, B.timeout);
        return () => {
            aE1.clearFastTimeout(D), clearImmediate(Q), clearImmediate(Z)
        }
    } : (A, B) => {
        if (!B.timeout) return tMA;
        let Q = null,
            Z = aE1.setFastTimeout(() => {
                Q = setImmediate(() => {
                    eMA(A.deref(), B)
                })
            }, B.timeout);
        return () => {
            aE1.clearFastTimeout(Z), clearImmediate(Q)
        }
    };

    function eMA(A, B) {
        if (A == null) return;
        let Q = "Connect Timeout Error";
        if (Array.isArray(A.autoSelectFamilyAttemptedAddresses)) Q += ` (attempted addresses: ${A.autoSelectFamilyAttemptedAddresses.join(", ")},`;
        else Q += ` (attempted address: ${B.hostname}:${B.port},`;
        Q += ` timeout: ${B.timeout}ms)`, ARA.destroy(A, new QRQ(Q))
    }
    BRA.exports = ZRQ
});
var DRA = E((QRA) => {
    Object.defineProperty(QRA, "__esModule", {
        value: !0
    });
    QRA.enumToMap = void 0;

    function GRQ(A) {
        let B = {};
        return Object.keys(A).forEach((Q) => {
            let Z = A[Q];
            if (typeof Z === "number") B[Q] = Z
        }), B
    }
    QRA.enumToMap = GRQ
});
var qRA = E((VRA) => {
    Object.defineProperty(VRA, "__esModule", {
        value: !0
    });
    VRA.SPECIAL_HEADERS = VRA.HEADER_STATE = VRA.MINOR = VRA.MAJOR = VRA.CONNECTION_TOKEN_CHARS = VRA.HEADER_CHARS = VRA.TOKEN = VRA.STRICT_TOKEN = VRA.HEX = VRA.URL_CHAR = VRA.STRICT_URL_CHAR = VRA.USERINFO_CHARS = VRA.MARK = VRA.ALPHANUM = VRA.NUM = VRA.HEX_MAP = VRA.NUM_MAP = VRA.ALPHA = VRA.FINISH = VRA.H_METHOD_MAP = VRA.METHOD_MAP = VRA.METHODS_RTSP = VRA.METHODS_ICE = VRA.METHODS_HTTP = VRA.METHODS = VRA.LENIENT_FLAGS = VRA.FLAGS = VRA.TYPE = VRA.ERROR = void 0;
    var FRQ = DRA(),
        IRQ;
    (function(A) {
        A[A.OK = 0] = "OK", A[A.INTERNAL = 1] = "INTERNAL", A[A.STRICT = 2] = "STRICT", A[A.LF_EXPECTED = 3] = "LF_EXPECTED", A[A.UNEXPECTED_CONTENT_LENGTH = 4] = "UNEXPECTED_CONTENT_LENGTH", A[A.CLOSED_CONNECTION = 5] = "CLOSED_CONNECTION", A[A.INVALID_METHOD = 6] = "INVALID_METHOD", A[A.INVALID_URL = 7] = "INVALID_URL", A[A.INVALID_CONSTANT = 8] = "INVALID_CONSTANT", A[A.INVALID_VERSION = 9] = "INVALID_VERSION", A[A.INVALID_HEADER_TOKEN = 10] = "INVALID_HEADER_TOKEN", A[A.INVALID_CONTENT_LENGTH = 11] = "INVALID_CONTENT_LENGTH", A[A.INVALID_CHUNK_SIZE = 12] = "INVALID_CHUNK_SIZE", A[A.INVALID_STATUS = 13] = "INVALID_STATUS", A[A.INVALID_EOF_STATE = 14] = "INVALID_EOF_STATE", A[A.INVALID_TRANSFER_ENCODING = 15] = "INVALID_TRANSFER_ENCODING", A[A.CB_MESSAGE_BEGIN = 16] = "CB_MESSAGE_BEGIN", A[A.CB_HEADERS_COMPLETE = 17] = "CB_HEADERS_COMPLETE", A[A.CB_MESSAGE_COMPLETE = 18] = "CB_MESSAGE_COMPLETE", A[A.CB_CHUNK_HEADER = 19] = "CB_CHUNK_HEADER", A[A.CB_CHUNK_COMPLETE = 20] = "CB_CHUNK_COMPLETE", A[A.PAUSED = 21] = "PAUSED", A[A.PAUSED_UPGRADE = 22] = "PAUSED_UPGRADE", A[A.PAUSED_H2_UPGRADE = 23] = "PAUSED_H2_UPGRADE", A[A.USER = 24] = "USER"
    })(IRQ = VRA.ERROR || (VRA.ERROR = {}));
    var YRQ;
    (function(A) {
        A[A.BOTH = 0] = "BOTH", A[A.REQUEST = 1] = "REQUEST", A[A.RESPONSE = 2] = "RESPONSE"
    })(YRQ = VRA.TYPE || (VRA.TYPE = {}));
    var WRQ;
    (function(A) {
        A[A.CONNECTION_KEEP_ALIVE = 1] = "CONNECTION_KEEP_ALIVE", A[A.CONNECTION_CLOSE = 2] = "CONNECTION_CLOSE", A[A.CONNECTION_UPGRADE = 4] = "CONNECTION_UPGRADE", A[A.CHUNKED = 8] = "CHUNKED", A[A.UPGRADE = 16] = "UPGRADE", A[A.CONTENT_LENGTH = 32] = "CONTENT_LENGTH", A[A.SKIPBODY = 64] = "SKIPBODY", A[A.TRAILING = 128] = "TRAILING", A[A.TRANSFER_ENCODING = 512] = "TRANSFER_ENCODING"
    })(WRQ = VRA.FLAGS || (VRA.FLAGS = {}));
    var JRQ;
    (function(A) {
        A[A.HEADERS = 1] = "HEADERS", A[A.CHUNKED_LENGTH = 2] = "CHUNKED_LENGTH", A[A.KEEP_ALIVE = 4] = "KEEP_ALIVE"
    })(JRQ = VRA.LENIENT_FLAGS || (VRA.LENIENT_FLAGS = {}));
    var s9;
    (function(A) {
        A[A.DELETE = 0] = "DELETE", A[A.GET = 1] = "GET", A[A.HEAD = 2] = "HEAD", A[A.POST = 3] = "POST", A[A.PUT = 4] = "PUT", A[A.CONNECT = 5] = "CONNECT", A[A.OPTIONS = 6] = "OPTIONS", A[A.TRACE = 7] = "TRACE", A[A.COPY = 8] = "COPY", A[A.LOCK = 9] = "LOCK", A[A.MKCOL = 10] = "MKCOL", A[A.MOVE = 11] = "MOVE", A[A.PROPFIND = 12] = "PROPFIND", A[A.PROPPATCH = 13] = "PROPPATCH", A[A.SEARCH = 14] = "SEARCH", A[A.UNLOCK = 15] = "UNLOCK", A[A.BIND = 16] = "BIND", A[A.REBIND = 17] = "REBIND", A[A.UNBIND = 18] = "UNBIND", A[A.ACL = 19] = "ACL", A[A.REPORT = 20] = "REPORT", A[A.MKACTIVITY = 21] = "MKACTIVITY", A[A.CHECKOUT = 22] = "CHECKOUT", A[A.MERGE = 23] = "MERGE", A[A["M-SEARCH"] = 24] = "M-SEARCH", A[A.NOTIFY = 25] = "NOTIFY", A[A.SUBSCRIBE = 26] = "SUBSCRIBE", A[A.UNSUBSCRIBE = 27] = "UNSUBSCRIBE", A[A.PATCH = 28] = "PATCH", A[A.PURGE = 29] = "PURGE", A[A.MKCALENDAR = 30] = "MKCALENDAR", A[A.LINK = 31] = "LINK", A[A.UNLINK = 32] = "UNLINK", A[A.SOURCE = 33] = "SOURCE", A[A.PRI = 34] = "PRI", A[A.DESCRIBE = 35] = "DESCRIBE", A[A.ANNOUNCE = 36] = "ANNOUNCE", A[A.SETUP = 37] = "SETUP", A[A.PLAY = 38] = "PLAY", A[A.PAUSE = 39] = "PAUSE", A[A.TEARDOWN = 40] = "TEARDOWN", A[A.GET_PARAMETER = 41] = "GET_PARAMETER", A[A.SET_PARAMETER = 42] = "SET_PARAMETER", A[A.REDIRECT = 43] = "REDIRECT", A[A.RECORD = 44] = "RECORD", A[A.FLUSH = 45] = "FLUSH"
    })(s9 = VRA.METHODS || (VRA.METHODS = {}));
    VRA.METHODS_HTTP = [s9.DELETE, s9.GET, s9.HEAD, s9.POST, s9.PUT, s9.CONNECT, s9.OPTIONS, s9.TRACE, s9.COPY, s9.LOCK, s9.MKCOL, s9.MOVE, s9.PROPFIND, s9.PROPPATCH, s9.SEARCH, s9.UNLOCK, s9.BIND, s9.REBIND, s9.UNBIND, s9.ACL, s9.REPORT, s9.MKACTIVITY, s9.CHECKOUT, s9.MERGE, s9["M-SEARCH"], s9.NOTIFY, s9.SUBSCRIBE, s9.UNSUBSCRIBE, s9.PATCH, s9.PURGE, s9.MKCALENDAR, s9.LINK, s9.UNLINK, s9.PRI, s9.SOURCE];
    VRA.METHODS_ICE = [s9.SOURCE];
    VRA.METHODS_RTSP = [s9.OPTIONS, s9.DESCRIBE, s9.ANNOUNCE, s9.SETUP, s9.PLAY, s9.PAUSE, s9.TEARDOWN, s9.GET_PARAMETER, s9.SET_PARAMETER, s9.REDIRECT, s9.RECORD, s9.FLUSH, s9.GET, s9.POST];
    VRA.METHOD_MAP = FRQ.enumToMap(s9);
    VRA.H_METHOD_MAP = {};
    Object.keys(VRA.METHOD_MAP).forEach((A) => {
        if (/^H/.test(A)) VRA.H_METHOD_MAP[A] = VRA.METHOD_MAP[A]
    });
    var XRQ;
    (function(A) {
        A[A.SAFE = 0] = "SAFE", A[A.SAFE_WITH_CB = 1] = "SAFE_WITH_CB", A[A.UNSAFE = 2] = "UNSAFE"
    })(XRQ = VRA.FINISH || (VRA.FINISH = {}));
    VRA.ALPHA = [];
    for (let A = 65; A <= 90; A++) VRA.ALPHA.push(String.fromCharCode(A)), VRA.ALPHA.push(String.fromCharCode(A + 32));
    VRA.NUM_MAP = {
        0: 0,
        1: 1,
        2: 2,
        3: 3,
        4: 4,
        5: 5,
        6: 6,
        7: 7,
        8: 8,
        9: 9
    };
    VRA.HEX_MAP = {
        0: 0,
        1: 1,
        2: 2,
        3: 3,
        4: 4,
        5: 5,
        6: 6,
        7: 7,
        8: 8,
        9: 9,
        A: 10,
        B: 11,
        C: 12,
        D: 13,
        E: 14,
        F: 15,
        a: 10,
        b: 11,
        c: 12,
        d: 13,
        e: 14,
        f: 15
    };
    VRA.NUM = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
    VRA.ALPHANUM = VRA.ALPHA.concat(VRA.NUM);
    VRA.MARK = ["-", "_", ".", "!", "~", "*", "'", "(", ")"];
    VRA.USERINFO_CHARS = VRA.ALPHANUM.concat(VRA.MARK).concat(["%", ";", ":", "&", "=", "+", "$", ","]);
    VRA.STRICT_URL_CHAR = ["!", '"', "$", "%", "&", "'", "(", ")", "*", "+", ",", "-", ".", "/", ":", ";", "<", "=", ">", "@", "[", "\\", "]", "^", "_", "`", "{", "|", "}", "~"].concat(VRA.ALPHANUM);
    VRA.URL_CHAR = VRA.STRICT_URL_CHAR.concat(["\t", "\f"]);
    for (let A = 128; A <= 255; A++) VRA.URL_CHAR.push(A);
    VRA.HEX = VRA.NUM.concat(["a", "b", "c", "d", "e", "f", "A", "B", "C", "D", "E", "F"]);
    VRA.STRICT_TOKEN = ["!", "#", "$", "%", "&", "'", "*", "+", "-", ".", "^", "_", "`", "|", "~"].concat(VRA.ALPHANUM);
    VRA.TOKEN = VRA.STRICT_TOKEN.concat([" "]);
    VRA.HEADER_CHARS = ["\t"];
    for (let A = 32; A <= 255; A++)
        if (A !== 127) VRA.HEADER_CHARS.push(A);
    VRA.CONNECTION_TOKEN_CHARS = VRA.HEADER_CHARS.filter((A) => A !== 44);
    VRA.MAJOR = VRA.NUM_MAP;
    VRA.MINOR = VRA.MAJOR;
    var Nn;
    (function(A) {
        A[A.GENERAL = 0] = "GENERAL", A[A.CONNECTION = 1] = "CONNECTION", A[A.CONTENT_LENGTH = 2] = "CONTENT_LENGTH", A[A.TRANSFER_ENCODING = 3] = "TRANSFER_ENCODING", A[A.UPGRADE = 4] = "UPGRADE", A[A.CONNECTION_KEEP_ALIVE = 5] = "CONNECTION_KEEP_ALIVE", A[A.CONNECTION_CLOSE = 6] = "CONNECTION_CLOSE", A[A.CONNECTION_UPGRADE = 7] = "CONNECTION_UPGRADE", A[A.TRANSFER_ENCODING_CHUNKED = 8] = "TRANSFER_ENCODING_CHUNKED"
    })(Nn = VRA.HEADER_STATE || (VRA.HEADER_STATE = {}));
    VRA.SPECIAL_HEADERS = {
        connection: Nn.CONNECTION,
        "content-length": Nn.CONTENT_LENGTH,
        "proxy-connection": Nn.CONNECTION,
        "transfer-encoding": Nn.TRANSFER_ENCODING,
        upgrade: Nn.UPGRADE
    }
});