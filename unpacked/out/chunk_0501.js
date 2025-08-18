/* chunk:501 bytes:[11947712, 11967690) size:19978 source:unpacked-cli.js */
class sB1 {
    constructor(A) {
        this.defaults = A, this.interceptors = {
            request: new gp1,
            response: new gp1
        }
    }
    async request(A, B) {
        try {
            return await this._request(A, B)
        } catch (Q) {
            if (Q instanceof Error) {
                let Z = {};
                Error.captureStackTrace ? Error.captureStackTrace(Z) : Z = new Error;
                let D = Z.stack ? Z.stack.replace(/^.+\n/, "") : "";
                try {
                    if (!Q.stack) Q.stack = D;
                    else if (D && !String(Q.stack).endsWith(D.replace(/^.+\n.+\n/, ""))) Q.stack += `
` + D
                } catch (G) {}
            }
            throw Q
        }
    }
    _request(A, B) {
        if (typeof A === "string") B = B || {}, B.url = A;
        else B = A || {};
        B = Ww(this.defaults, B);
        let {
            transitional: Q,
            paramsSerializer: Z,
            headers: D
        } = B;
        if (Q !== void 0) aB1.assertOptions(Q, {
            silentJSONParsing: VN.transitional(VN.boolean),
            forcedJSONParsing: VN.transitional(VN.boolean),
            clarifyTimeoutError: VN.transitional(VN.boolean)
        }, !1);
        if (Z != null)
            if (O0.isFunction(Z)) B.paramsSerializer = {
                serialize: Z
            };
            else aB1.assertOptions(Z, {
                encode: VN.function,
                serialize: VN.function
            }, !0);
        if (B.allowAbsoluteUrls !== void 0);
        else if (this.defaults.allowAbsoluteUrls !== void 0) B.allowAbsoluteUrls = this.defaults.allowAbsoluteUrls;
        else B.allowAbsoluteUrls = !0;
        aB1.assertOptions(B, {
            baseUrl: VN.spelling("baseURL"),
            withXsrfToken: VN.spelling("withXSRFToken")
        }, !0), B.method = (B.method || this.defaults.method || "get").toLowerCase();
        let G = D && O0.merge(D.common, D[B.method]);
        D && O0.forEach(["delete", "get", "head", "post", "put", "patch", "common"], (C) => {
            delete D[C]
        }), B.headers = uZ.concat(G, D);
        let F = [],
            I = !0;
        this.interceptors.request.forEach(function C(K) {
            if (typeof K.runWhen === "function" && K.runWhen(B) === !1) return;
            I = I && K.synchronous, F.unshift(K.fulfilled, K.rejected)
        });
        let Y = [];
        this.interceptors.response.forEach(function C(K) {
            Y.push(K.fulfilled, K.rejected)
        });
        let W, J = 0,
            X;
        if (!I) {
            let C = [bV1.bind(this), void 0];
            C.unshift.apply(C, F), C.push.apply(C, Y), X = C.length, W = Promise.resolve(B);
            while (J < X) W = W.then(C[J++], C[J++]);
            return W
        }
        X = F.length;
        let V = B;
        J = 0;
        while (J < X) {
            let C = F[J++],
                K = F[J++];
            try {
                V = C(V)
            } catch (H) {
                K.call(this, H);
                break
            }
        }
        try {
            W = bV1.call(this, V)
        } catch (C) {
            return Promise.reject(C)
        }
        J = 0, X = Y.length;
        while (J < X) W = W.then(Y[J++], Y[J++]);
        return W
    }
    getUri(A) {
        A = Ww(this.defaults, A);
        let B = ef(A.baseURL, A.url, A.allowAbsoluteUrls);
        return tf(B, A.params, A.paramsSerializer)
    }
}
O0.forEach(["delete", "get", "head", "options"], function A(B) {
    sB1.prototype[B] = function(Q, Z) {
        return this.request(Ww(Z || {}, {
            method: B,
            url: Q,
            data: (Z || {}).data
        }))
    }
});
O0.forEach(["post", "put", "patch"], function A(B) {
    function Q(Z) {
        return function D(G, F, I) {
            return this.request(Ww(I || {}, {
                method: B,
                headers: Z ? {
                    "Content-Type": "multipart/form-data"
                } : {},
                url: G,
                data: F
            }))
        }
    }
    sB1.prototype[B] = Q(), sB1.prototype[B + "Form"] = Q(!0)
});
var rB1 = sB1;
class Ei1 {
    constructor(A) {
        if (typeof A !== "function") throw new TypeError("executor must be a function.");
        let B;
        this.promise = new Promise(function Z(D) {
            B = D
        });
        let Q = this;
        this.promise.then((Z) => {
            if (!Q._listeners) return;
            let D = Q._listeners.length;
            while (D-- > 0) Q._listeners[D](Z);
            Q._listeners = null
        }), this.promise.then = (Z) => {
            let D, G = new Promise((F) => {
                Q.subscribe(F), D = F
            }).then(Z);
            return G.cancel = function F() {
                Q.unsubscribe(D)
            }, G
        }, A(function Z(D, G, F) {
            if (Q.reason) return;
            Q.reason = new nC(D, G, F), B(Q.reason)
        })
    }
    throwIfRequested() {
        if (this.reason) throw this.reason
    }
    subscribe(A) {
        if (this.reason) {
            A(this.reason);
            return
        }
        if (this._listeners) this._listeners.push(A);
        else this._listeners = [A]
    }
    unsubscribe(A) {
        if (!this._listeners) return;
        let B = this._listeners.indexOf(A);
        if (B !== -1) this._listeners.splice(B, 1)
    }
    toAbortSignal() {
        let A = new AbortController,
            B = (Q) => {
                A.abort(Q)
            };
        return this.subscribe(B), A.signal.unsubscribe = () => this.unsubscribe(B), A.signal
    }
    static source() {
        let A;
        return {
            token: new Ei1(function Q(Z) {
                A = Z
            }),
            cancel: A
        }
    }
}
var cs0 = Ei1;

function Ui1(A) {
    return function B(Q) {
        return A.apply(null, Q)
    }
}

function wi1(A) {
    return O0.isObject(A) && A.isAxiosError === !0
}
var $i1 = {
    Continue: 100,
    SwitchingProtocols: 101,
    Processing: 102,
    EarlyHints: 103,
    Ok: 200,
    Created: 201,
    Accepted: 202,
    NonAuthoritativeInformation: 203,
    NoContent: 204,
    ResetContent: 205,
    PartialContent: 206,
    MultiStatus: 207,
    AlreadyReported: 208,
    ImUsed: 226,
    MultipleChoices: 300,
    MovedPermanently: 301,
    Found: 302,
    SeeOther: 303,
    NotModified: 304,
    UseProxy: 305,
    Unused: 306,
    TemporaryRedirect: 307,
    PermanentRedirect: 308,
    BadRequest: 400,
    Unauthorized: 401,
    PaymentRequired: 402,
    Forbidden: 403,
    NotFound: 404,
    MethodNotAllowed: 405,
    NotAcceptable: 406,
    ProxyAuthenticationRequired: 407,
    RequestTimeout: 408,
    Conflict: 409,
    Gone: 410,
    LengthRequired: 411,
    PreconditionFailed: 412,
    PayloadTooLarge: 413,
    UriTooLong: 414,
    UnsupportedMediaType: 415,
    RangeNotSatisfiable: 416,
    ExpectationFailed: 417,
    ImATeapot: 418,
    MisdirectedRequest: 421,
    UnprocessableEntity: 422,
    Locked: 423,
    FailedDependency: 424,
    TooEarly: 425,
    UpgradeRequired: 426,
    PreconditionRequired: 428,
    TooManyRequests: 429,
    RequestHeaderFieldsTooLarge: 431,
    UnavailableForLegalReasons: 451,
    InternalServerError: 500,
    NotImplemented: 501,
    BadGateway: 502,
    ServiceUnavailable: 503,
    GatewayTimeout: 504,
    HttpVersionNotSupported: 505,
    VariantAlsoNegotiates: 506,
    InsufficientStorage: 507,
    LoopDetected: 508,
    NotExtended: 510,
    NetworkAuthenticationRequired: 511
};
Object.entries($i1).forEach(([A, B]) => {
    $i1[B] = A
});
var ls0 = $i1;

function ps0(A) {
    let B = new rB1(A),
        Q = SB1(rB1.prototype.request, B);
    return O0.extend(Q, rB1.prototype, B, {
        allOwnKeys: !0
    }), O0.extend(Q, B, null, {
        allOwnKeys: !0
    }), Q.create = function Z(D) {
        return ps0(Ww(A, D))
    }, Q
}
var fG = ps0(Kp);
fG.Axios = rB1;
fG.CanceledError = nC;
fG.CancelToken = cs0;
fG.isCancel = gB1;
fG.VERSION = Dh;
fG.toFormData = Gk;
fG.AxiosError = c2;
fG.Cancel = fG.CanceledError;
fG.all = function A(B) {
    return Promise.all(B)
};
fG.spread = Ui1;
fG.isAxiosError = wi1;
fG.mergeConfig = Ww;
fG.AxiosHeaders = uZ;
fG.formToJSON = (A) => LV1(O0.isHTMLForm(A) ? new FormData(A) : A);
fG.getAdapter = vV1.getAdapter;
fG.HttpStatusCode = ls0;
fG.default = fG;
var J9 = fG;
var {
    Axios: sr8,
    AxiosError: is0,
    CanceledError: rr8,
    isCancel: or8,
    CancelToken: tr8,
    VERSION: er8,
    all: Ao8,
    Cancel: Bo8,
    isAxiosError: Qo8,
    spread: Zo8,
    toFormData: Do8,
    AxiosHeaders: Go8,
    HttpStatusCode: Fo8,
    formToJSON: Io8,
    getAdapter: Yo8,
    mergeConfig: Wo8
} = J9;
var vw1 = G1(Tt0(), 1);
import {
    createHash as yhQ
} from "crypto";
var nx9 = {
        visibilityState: "visible",
        documentElement: {
            lang: "en"
        },
        addEventListener: (A, B) => {}
    },
    ax9 = {
        document: nx9,
        location: {
            href: "node://localhost",
            pathname: "/"
        },
        addEventListener: (A, B) => {
            if (A === "beforeunload") process.on("exit", () => {
                if (typeof B === "function") B({});
                else B.handleEvent({})
            })
        },
        focus: () => {},
        innerHeight: 768,
        innerWidth: 1024
    },
    sx9 = {
        sendBeacon: (A, B) => {
            return !0
        },
        userAgent: "Mozilla/5.0 (Node.js) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0",
        language: "en-US"
    };
if (typeof window === "undefined") global.window = ax9;
if (typeof navigator === "undefined") global.navigator = sx9;
import * as F91 from "path";
import {
    existsSync as kt0,
    mkdirSync as tx9,
    readdirSync as ex9,
    readFileSync as Av9,
    writeFileSync as Bv9,
    unlinkSync as Qv9
} from "fs";
import {
    join as rx9
} from "path";
import {
    homedir as ox9
} from "os";

function e9() {
    return process.env.CLAUDE_CONFIG_DIR ?? rx9(ox9(), ".claude")
}

function IQ(A) {
    if (!A) return !1;
    let B = A.toLowerCase().trim();
    return ["1", "true", "yes", "on"].includes(B)
}

function Pt0(A) {
    if (!A) return !1;
    let B = A.toLowerCase().trim();
    return ["0", "false", "no", "off"].includes(B)
}

function St0(A) {
    let B = {};
    if (A)
        for (let Q of A) {
            let [Z, ...D] = Q.split("=");
            if (!Z || D.length === 0) throw new Error(`Invalid environment variable format: ${Q}, environment variables should be added as: -e KEY1=value1 -e KEY2=value2`);
            B[Z] = D.join("=")
        }
    return B
}

function fp() {
    return process.env.AWS_REGION || process.env.AWS_DEFAULT_REGION || "us-east-1"
}

function SO() {
    return process.env.CLOUD_ML_REGION || "us-east5"
}

function Dn1() {
    return IQ(process.env.CLAUDE_BASH_MAINTAIN_PROJECT_WORKING_DIR)
}

function jt0(A) {
    if (A?.startsWith("claude-3-5-haiku")) return process.env.VERTEX_REGION_CLAUDE_3_5_HAIKU || SO();
    if (A?.startsWith("claude-3-5-sonnet")) return process.env.VERTEX_REGION_CLAUDE_3_5_SONNET || SO();
    if (A?.startsWith("claude-3-7-sonnet")) return process.env.VERTEX_REGION_CLAUDE_3_7_SONNET || SO();
    if (A?.startsWith("claude-opus-4-1")) return process.env.VERTEX_REGION_CLAUDE_4_1_OPUS || SO();
    if (A?.startsWith("claude-opus-4")) return process.env.VERTEX_REGION_CLAUDE_4_0_OPUS || SO();
    if (A?.startsWith("claude-sonnet-4")) return process.env.VERTEX_REGION_CLAUDE_4_0_SONNET || SO();
    return SO()
}

function hp() {
    return F91.join(e9(), "statsig")
}
class Gn1 {
    cache = new Map;
    ready = !1;
    constructor() {
        try {
            if (!kt0(hp())) tx9(hp(), {
                recursive: !0
            });
            let A = ex9(hp());
            for (let B of A) {
                let Q = decodeURIComponent(B),
                    Z = Av9(F91.join(hp(), B), "utf8");
                this.cache.set(Q, Z)
            }
            this.ready = !0
        } catch (A) {
            R1(A), this.ready = !0
        }
    }
    isReady() {
        return this.ready
    }
    isReadyResolver() {
        return this.ready ? Promise.resolve() : null
    }
    getProviderName() {
        return "FileSystemStorageProvider"
    }
    getItem(A) {
        return this.cache.get(A) ?? null
    }
    setItem(A, B) {
        this.cache.set(A, B);
        try {
            let Q = encodeURIComponent(A);
            Bv9(F91.join(hp(), Q), B, "utf8")
        } catch (Q) {
            R1(Q)
        }
    }
    removeItem(A) {
        this.cache.delete(A);
        let B = encodeURIComponent(A),
            Q = F91.join(hp(), B);
        if (!kt0(Q)) return;
        try {
            Qv9(Q)
        } catch (Z) {
            R1(Z)
        }
    }
    getAllKeys() {
        return Array.from(this.cache.keys())
    }
}
var yt0 = "https://e531a1d9ec1de9064fae9d4affb0b0f4@o1158394.ingest.us.sentry.io/4508259541909504",
    _t0 = "client-RRNS7R65EAtReO5XA4xDC3eU6ZdJQi6lLEP6b5j32Me";
var xt0 = "claude-code-20250219",
    vt0 = "interleaved-thinking-2025-05-14",
    bt0 = "fine-grained-tool-streaming-2025-05-14",
    ft0 = "context-1m-2025-08-07",
    ht0 = "context-management-2025-06-27",
    Fn1 = new Set(["interleaved-thinking-2025-05-14", "context-1m-2025-08-07"]);
import * as TQ from "fs";
import {
    stat as Zv9
} from "fs/promises";

function XV(A, B) {
    if (!A.existsSync(B)) return {
        resolvedPath: B,
        isSymlink: !1
    };
    try {
        let Q = A.realpathSync(B);
        return {
            resolvedPath: Q,
            isSymlink: Q !== B
        }
    } catch (Q) {
        return {
            resolvedPath: B,
            isSymlink: !1
        }
    }
}
var Dv9 = {
        accessSync(A, B) {
            TQ.accessSync(A, B)
        },
        cwd() {
            return process.cwd()
        },
        chmodSync(A, B) {
            TQ.chmodSync(A, B)
        },
        existsSync(A) {
            return TQ.existsSync(A)
        },
        async stat(A) {
            return Zv9(A)
        },
        statSync(A) {
            return TQ.statSync(A)
        },
        readFileSync(A, B) {
            return TQ.readFileSync(A, {
                encoding: B.encoding
            })
        },
        readFileBytesSync(A) {
            return TQ.readFileSync(A)
        },
        readSync(A, B) {
            let Q = void 0;
            try {
                Q = TQ.openSync(A, "r");
                let Z = Buffer.alloc(B.length),
                    D = TQ.readSync(Q, Z, 0, B.length, 0);
                return {
                    buffer: Z,
                    bytesRead: D
                }
            } finally {
                if (Q) TQ.closeSync(Q)
            }
        },
        writeFileSync(A, B, Q) {
            if (!Q.flush) {
                TQ.writeFileSync(A, B, {
                    encoding: Q.encoding
                });
                return
            }
            let Z;
            try {
                Z = TQ.openSync(A, "w"), TQ.writeFileSync(Z, B, {
                    encoding: Q.encoding
                }), TQ.fsyncSync(Z)
            } finally {
                if (Z) TQ.closeSync(Z)
            }
        },
        appendFileSync(A, B) {
            TQ.appendFileSync(A, B)
        },
        copyFileSync(A, B) {
            TQ.copyFileSync(A, B)
        },
        unlinkSync(A) {
            TQ.unlinkSync(A)
        },
        renameSync(A, B) {
            TQ.renameSync(A, B)
        },
        symlinkSync(A, B) {
            TQ.symlinkSync(A, B)
        },
        readlinkSync(A) {
            return TQ.readlinkSync(A)
        },
        realpathSync(A) {
            return TQ.realpathSync(A)
        },
        mkdirSync(A) {
            if (!TQ.existsSync(A)) TQ.mkdirSync(A, {
                recursive: !0
            })
        },
        readdirSync(A) {
            return TQ.readdirSync(A, {
                withFileTypes: !0
            })
        },
        readdirStringSync(A) {
            return TQ.readdirSync(A)
        },
        isDirEmptySync(A) {
            return this.readdirSync(A).length === 0
        },
        rmdirSync(A) {
            TQ.rmdirSync(A)
        },
        rmSync(A, B) {
            TQ.rmSync(A, B)
        }
    },
    Gv9 = Dv9;

function j1() {
    return Gv9
}
var In1 = ["macos", "wsl"],
    L9 = EA(() => {
        try {
            if (process.platform === "darwin") return "macos";
            if (process.platform === "win32") return "windows";
            if (process.platform === "linux") {
                try {
                    let A = j1().readFileSync("/proc/version", {
                        encoding: "utf8"
                    });
                    if (A.toLowerCase().includes("microsoft") || A.toLowerCase().includes("wsl")) return "wsl"
                } catch (A) {
                    R1(A instanceof Error ? A : new Error(String(A)))
                }
                return "linux"
            }
            return "unknown"
        } catch (A) {
            return R1(A instanceof Error ? A : new Error(String(A))), "unknown"
        }
    }),
    I91 = EA(() => {
        if (process.platform !== "linux") return;
        try {
            let A = j1().readFileSync("/proc/version", {
                    encoding: "utf8"
                }),
                B = A.match(/WSL(\d+)/i);
            if (B && B[1]) return B[1];
            if (A.toLowerCase().includes("microsoft")) return "1";
            return
        } catch (A) {
            R1(A instanceof Error ? A : new Error(String(A)));
            return
        }
    }),
    gt0 = L9() !== "windows";
var HC1 = "user:inference",
    Fv9 = "org:create_api_key",
    gp = "oauth-2025-04-20",
    ut0 = {
        REDIRECT_PORT: L9() === "windows" ? 45454 : 54545,
        SCOPES: [Fv9, "user:profile", HC1]
    },
    Iv9 = {
        ...ut0,
        BASE_API_URL: "https://api.anthropic.com",
        CONSOLE_AUTHORIZE_URL: "https://console.anthropic.com/oauth/authorize",
        CLAUDE_AI_AUTHORIZE_URL: "https://claude.ai/oauth/authorize",
        TOKEN_URL: "https://console.anthropic.com/v1/oauth/token",
        API_KEY_URL: "https://api.anthropic.com/api/oauth/claude_cli/create_api_key",
        ROLES_URL: "https://api.anthropic.com/api/oauth/claude_cli/roles",
        CONSOLE_SUCCESS_URL: "https://console.anthropic.com/buy_credits?returnUrl=/oauth/code/success%3Fapp%3Dclaude-code",
        CLAUDEAI_SUCCESS_URL: "https://console.anthropic.com/oauth/code/success?app=claude-code",
        MANUAL_REDIRECT_URL: "https://console.anthropic.com/oauth/code/callback",
        CLIENT_ID: "9d1c250a-e61b-44d9-88ed-5944d1962f5e"
    };
var Yv9 = {
    ...ut0,
    BASE_API_URL: "http://localhost:3000",
    CONSOLE_AUTHORIZE_URL: "http://localhost:3000/oauth/authorize",
    CLAUDE_AI_AUTHORIZE_URL: "http://localhost:4000/oauth/authorize",
    TOKEN_URL: "http://localhost:3000/v1/oauth/token",
    API_KEY_URL: "http://localhost:3000/api/oauth/claude_cli/create_api_key",
    ROLES_URL: "http://localhost:3000/api/oauth/claude_cli/roles",
    CONSOLE_SUCCESS_URL: "http://localhost:3000/buy_credits?returnUrl=/oauth/code/success%3Fapp%3Dclaude-code",
    CLAUDEAI_SUCCESS_URL: "http://localhost:3000/oauth/code/success?app=claude-code",
    MANUAL_REDIRECT_URL: "https://console.staging.ant.dev/oauth/code/callback",
    CLIENT_ID: "22422756-60c9-4084-8eb7-27705fd5cf9a"
};

function p8() {
    return process.env.USE_LOCAL_OAUTH === "1" && Yv9 || !1 || Iv9
}

function DZ() {
    return process.env.CLAUDE_CODE_USE_BEDROCK ? "bedrock" : process.env.CLAUDE_CODE_USE_VERTEX ? "vertex" : "firstParty"
}

function HN() {
    return DZ()
}

function Wv9(A) {
    if (DZ() === "firstParty") return !A.includes("claude-3-");
    else return A.includes("claude-opus-4") || A.includes("claude-sonnet-4")
}