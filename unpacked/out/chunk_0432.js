/* chunk:432 bytes:[10301675, 10318874) size:17199 source:unpacked-cli.js */
var vw0 = E((e$B) => {
    Object.defineProperty(e$B, "__esModule", {
        value: !0
    });
    e$B.Compute = void 0;
    var EB8 = R$(),
        o$B = pD1(),
        UB8 = sm();
    class t$B extends UB8.OAuth2Client {
        constructor(A = {}) {
            super(A);
            this.credentials = {
                expiry_date: 1,
                refresh_token: "compute-placeholder"
            }, this.serviceAccountEmail = A.serviceAccountEmail || "default", this.scopes = Array.isArray(A.scopes) ? A.scopes : A.scopes ? [A.scopes] : []
        }
        async refreshTokenNoCache(A) {
            let B = `service-accounts/${this.serviceAccountEmail}/token`,
                Q;
            try {
                let D = {
                    property: B
                };
                if (this.scopes.length > 0) D.params = {
                    scopes: this.scopes.join(",")
                };
                Q = await o$B.instance(D)
            } catch (D) {
                if (D instanceof EB8.GaxiosError) D.message = `Could not refresh access token: ${D.message}`, this.wrapError(D);
                throw D
            }
            let Z = Q;
            if (Q && Q.expires_in) Z.expiry_date = new Date().getTime() + Q.expires_in * 1000, delete Z.expires_in;
            return this.emit("tokens", Z), {
                tokens: Z,
                res: null
            }
        }
        async fetchIdToken(A) {
            let B = `service-accounts/${this.serviceAccountEmail}/identity?format=full&audience=${A}`,
                Q;
            try {
                let Z = {
                    property: B
                };
                Q = await o$B.instance(Z)
            } catch (Z) {
                if (Z instanceof Error) Z.message = `Could not fetch ID token: ${Z.message}`;
                throw Z
            }
            return Q
        }
        wrapError(A) {
            let B = A.response;
            if (B && B.status) {
                if (A.status = B.status, B.status === 403) A.message = "A Forbidden error was returned while attempting to retrieve an access token for the Compute Engine built-in service account. This may be because the Compute Engine instance does not have the correct permission scopes specified: " + A.message;
                else if (B.status === 404) A.message = "A Not Found error was returned while attempting to retrieve an accesstoken for the Compute Engine built-in service account. This may be because the Compute Engine instance does not have any permission scopes specified: " + A.message
            }
        }
    }
    e$B.Compute = t$B
});
var bw0 = E((QqB) => {
    Object.defineProperty(QqB, "__esModule", {
        value: !0
    });
    QqB.IdTokenClient = void 0;
    var wB8 = sm();
    class BqB extends wB8.OAuth2Client {
        constructor(A) {
            super(A);
            this.targetAudience = A.targetAudience, this.idTokenProvider = A.idTokenProvider
        }
        async getRequestMetadataAsync(A) {
            if (!this.credentials.id_token || !this.credentials.expiry_date || this.isTokenExpiring()) {
                let Q = await this.idTokenProvider.fetchIdToken(this.targetAudience);
                this.credentials = {
                    id_token: Q,
                    expiry_date: this.getIdTokenExpiryDate(Q)
                }
            }
            return {
                headers: {
                    Authorization: "Bearer " + this.credentials.id_token
                }
            }
        }
        getIdTokenExpiryDate(A) {
            let B = A.split(".")[1];
            if (B) return JSON.parse(Buffer.from(B, "base64").toString("ascii")).exp * 1000
        }
    }
    QqB.IdTokenClient = BqB
});
var fw0 = E((GqB) => {
    Object.defineProperty(GqB, "__esModule", {
        value: !0
    });
    GqB.GCPEnv = void 0;
    GqB.clear = $B8;
    GqB.getEnv = qB8;
    var DqB = pD1(),
        WS;
    (function(A) {
        A.APP_ENGINE = "APP_ENGINE", A.KUBERNETES_ENGINE = "KUBERNETES_ENGINE", A.CLOUD_FUNCTIONS = "CLOUD_FUNCTIONS", A.COMPUTE_ENGINE = "COMPUTE_ENGINE", A.CLOUD_RUN = "CLOUD_RUN", A.NONE = "NONE"
    })(WS || (GqB.GCPEnv = WS = {}));
    var sD1;

    function $B8() {
        sD1 = void 0
    }
    async function qB8() {
        if (sD1) return sD1;
        return sD1 = NB8(), sD1
    }
    async function NB8() {
        let A = WS.NONE;
        if (LB8()) A = WS.APP_ENGINE;
        else if (MB8()) A = WS.CLOUD_FUNCTIONS;
        else if (await TB8())
            if (await OB8()) A = WS.KUBERNETES_ENGINE;
            else if (RB8()) A = WS.CLOUD_RUN;
        else A = WS.COMPUTE_ENGINE;
        else A = WS.NONE;
        return A
    }

    function LB8() {
        return !!(process.env.GAE_SERVICE || process.env.GAE_MODULE_NAME)
    }

    function MB8() {
        return !!(process.env.FUNCTION_NAME || process.env.FUNCTION_TARGET)
    }

    function RB8() {
        return !!process.env.K_CONFIGURATION
    }
    async function OB8() {
        try {
            return await DqB.instance("attributes/cluster-name"), !0
        } catch (A) {
            return !1
        }
    }
    async function TB8() {
        return DqB.isAvailable()
    }
});
var hw0 = E((f83, IqB) => {
    var ix1 = T11().Buffer,
        jB8 = W1("stream"),
        kB8 = W1("util");

    function nx1(A) {
        if (this.buffer = null, this.writable = !0, this.readable = !0, !A) return this.buffer = ix1.alloc(0), this;
        if (typeof A.pipe === "function") return this.buffer = ix1.alloc(0), A.pipe(this), this;
        if (A.length || typeof A === "object") return this.buffer = A, this.writable = !1, process.nextTick(function() {
            this.emit("end", A), this.readable = !1, this.emit("close")
        }.bind(this)), this;
        throw new TypeError("Unexpected data type (" + typeof A + ")")
    }
    kB8.inherits(nx1, jB8);
    nx1.prototype.write = function A(B) {
        this.buffer = ix1.concat([this.buffer, ix1.from(B)]), this.emit("data", B)
    };
    nx1.prototype.end = function A(B) {
        if (B) this.write(B);
        this.emit("end", B), this.emit("close"), this.writable = !1, this.readable = !1
    };
    IqB.exports = nx1
});
var WqB = E((h83, YqB) => {
    var rD1 = W1("buffer").Buffer,
        gw0 = W1("buffer").SlowBuffer;
    YqB.exports = ax1;

    function ax1(A, B) {
        if (!rD1.isBuffer(A) || !rD1.isBuffer(B)) return !1;
        if (A.length !== B.length) return !1;
        var Q = 0;
        for (var Z = 0; Z < A.length; Z++) Q |= A[Z] ^ B[Z];
        return Q === 0
    }
    ax1.install = function() {
        rD1.prototype.equal = gw0.prototype.equal = function A(B) {
            return ax1(this, B)
        }
    };
    var yB8 = rD1.prototype.equal,
        _B8 = gw0.prototype.equal;
    ax1.restore = function() {
        rD1.prototype.equal = yB8, gw0.prototype.equal = _B8
    }
});
var dw0 = E((g83, UqB) => {
    var xB8 = WqB(),
        j11 = T11().Buffer,
        lM = W1("crypto"),
        XqB = Pw0(),
        JqB = W1("util"),
        vB8 = `"%s" is not a valid algorithm.
  Supported algorithms are:
  "HS256", "HS384", "HS512", "RS256", "RS384", "RS512", "PS256", "PS384", "PS512", "ES256", "ES384", "ES512" and "none".`,
        oD1 = "secret must be a string or buffer",
        S11 = "key must be a string or a buffer",
        bB8 = "key must be a string, a buffer or an object",
        uw0 = typeof lM.createPublicKey === "function";
    if (uw0) S11 += " or a KeyObject", oD1 += "or a KeyObject";

    function VqB(A) {
        if (j11.isBuffer(A)) return;
        if (typeof A === "string") return;
        if (!uw0) throw P$(S11);
        if (typeof A !== "object") throw P$(S11);
        if (typeof A.type !== "string") throw P$(S11);
        if (typeof A.asymmetricKeyType !== "string") throw P$(S11);
        if (typeof A.export !== "function") throw P$(S11)
    }

    function CqB(A) {
        if (j11.isBuffer(A)) return;
        if (typeof A === "string") return;
        if (typeof A === "object") return;
        throw P$(bB8)
    }

    function fB8(A) {
        if (j11.isBuffer(A)) return;
        if (typeof A === "string") return A;
        if (!uw0) throw P$(oD1);
        if (typeof A !== "object") throw P$(oD1);
        if (A.type !== "secret") throw P$(oD1);
        if (typeof A.export !== "function") throw P$(oD1)
    }

    function mw0(A) {
        return A.replace(/=/g, "").replace(/\+/g, "-").replace(/\//g, "_")
    }

    function KqB(A) {
        A = A.toString();
        var B = 4 - A.length % 4;
        if (B !== 4)
            for (var Q = 0; Q < B; ++Q) A += "=";
        return A.replace(/\-/g, "+").replace(/_/g, "/")
    }

    function P$(A) {
        var B = [].slice.call(arguments, 1),
            Q = JqB.format.bind(JqB, A).apply(null, B);
        return new TypeError(Q)
    }

    function hB8(A) {
        return j11.isBuffer(A) || typeof A === "string"
    }

    function tD1(A) {
        if (!hB8(A)) A = JSON.stringify(A);
        return A
    }

    function HqB(A) {
        return function B(Q, Z) {
            fB8(Z), Q = tD1(Q);
            var D = lM.createHmac("sha" + A, Z),
                G = (D.update(Q), D.digest("base64"));
            return mw0(G)
        }
    }

    function gB8(A) {
        return function B(Q, Z, D) {
            var G = HqB(A)(Q, D);
            return xB8(j11.from(Z), j11.from(G))
        }
    }

    function zqB(A) {
        return function B(Q, Z) {
            CqB(Z), Q = tD1(Q);
            var D = lM.createSign("RSA-SHA" + A),
                G = (D.update(Q), D.sign(Z, "base64"));
            return mw0(G)
        }
    }

    function EqB(A) {
        return function B(Q, Z, D) {
            VqB(D), Q = tD1(Q), Z = KqB(Z);
            var G = lM.createVerify("RSA-SHA" + A);
            return G.update(Q), G.verify(D, Z, "base64")
        }
    }

    function uB8(A) {
        return function B(Q, Z) {
            CqB(Z), Q = tD1(Q);
            var D = lM.createSign("RSA-SHA" + A),
                G = (D.update(Q), D.sign({
                    key: Z,
                    padding: lM.constants.RSA_PKCS1_PSS_PADDING,
                    saltLength: lM.constants.RSA_PSS_SALTLEN_DIGEST
                }, "base64"));
            return mw0(G)
        }
    }

    function mB8(A) {
        return function B(Q, Z, D) {
            VqB(D), Q = tD1(Q), Z = KqB(Z);
            var G = lM.createVerify("RSA-SHA" + A);
            return G.update(Q), G.verify({
                key: D,
                padding: lM.constants.RSA_PKCS1_PSS_PADDING,
                saltLength: lM.constants.RSA_PSS_SALTLEN_DIGEST
            }, Z, "base64")
        }
    }

    function dB8(A) {
        var B = zqB(A);
        return function Q() {
            var Z = B.apply(null, arguments);
            return Z = XqB.derToJose(Z, "ES" + A), Z
        }
    }

    function cB8(A) {
        var B = EqB(A);
        return function Q(Z, D, G) {
            D = XqB.joseToDer(D, "ES" + A).toString("base64");
            var F = B(Z, D, G);
            return F
        }
    }

    function lB8() {
        return function A() {
            return ""
        }
    }

    function pB8() {
        return function A(B, Q) {
            return Q === ""
        }
    }
    UqB.exports = function A(B) {
        var Q = {
                hs: HqB,
                rs: zqB,
                ps: uB8,
                es: dB8,
                none: lB8
            },
            Z = {
                hs: gB8,
                rs: EqB,
                ps: mB8,
                es: cB8,
                none: pB8
            },
            D = B.match(/^(RS|PS|ES|HS)(256|384|512)$|^(none)$/);
        if (!D) throw P$(vB8, B);
        var G = (D[1] || D[3]).toLowerCase(),
            F = D[2];
        return {
            sign: Q[G](F),
            verify: Z[G](F)
        }
    }
});
var cw0 = E((u83, wqB) => {
    var iB8 = W1("buffer").Buffer;
    wqB.exports = function A(B) {
        if (typeof B === "string") return B;
        if (typeof B === "number" || iB8.isBuffer(B)) return B.toString();
        return JSON.stringify(B)
    }
});
var RqB = E((m83, MqB) => {
    var nB8 = T11().Buffer,
        $qB = hw0(),
        aB8 = dw0(),
        sB8 = W1("stream"),
        qqB = cw0(),
        lw0 = W1("util");

    function NqB(A, B) {
        return nB8.from(A, B).toString("base64").replace(/=/g, "").replace(/\+/g, "-").replace(/\//g, "_")
    }

    function rB8(A, B, Q) {
        Q = Q || "utf8";
        var Z = NqB(qqB(A), "binary"),
            D = NqB(qqB(B), Q);
        return lw0.format("%s.%s", Z, D)
    }

    function LqB(A) {
        var {
            header: B,
            payload: Q
        } = A, Z = A.secret || A.privateKey, D = A.encoding, G = aB8(B.alg), F = rB8(B, Q, D), I = G.sign(F, Z);
        return lw0.format("%s.%s", F, I)
    }

    function sx1(A) {
        var B = A.secret || A.privateKey || A.key,
            Q = new $qB(B);
        this.readable = !0, this.header = A.header, this.encoding = A.encoding, this.secret = this.privateKey = this.key = Q, this.payload = new $qB(A.payload), this.secret.once("close", function() {
            if (!this.payload.writable && this.readable) this.sign()
        }.bind(this)), this.payload.once("close", function() {
            if (!this.secret.writable && this.readable) this.sign()
        }.bind(this))
    }
    lw0.inherits(sx1, sB8);
    sx1.prototype.sign = function A() {
        try {
            var B = LqB({
                header: this.header,
                payload: this.payload.buffer,
                secret: this.secret.buffer,
                encoding: this.encoding
            });
            return this.emit("done", B), this.emit("data", B), this.emit("end"), this.readable = !1, B
        } catch (Q) {
            this.readable = !1, this.emit("error", Q), this.emit("close")
        }
    };
    sx1.sign = LqB;
    MqB.exports = sx1
});
var vqB = E((d83, xqB) => {
    var TqB = T11().Buffer,
        OqB = hw0(),
        oB8 = dw0(),
        tB8 = W1("stream"),
        PqB = cw0(),
        eB8 = W1("util"),
        A98 = /^[a-zA-Z0-9\-_]+?\.[a-zA-Z0-9\-_]+?\.([a-zA-Z0-9\-_]+)?$/;

    function B98(A) {
        return Object.prototype.toString.call(A) === "[object Object]"
    }

    function Q98(A) {
        if (B98(A)) return A;
        try {
            return JSON.parse(A)
        } catch (B) {
            return
        }
    }

    function SqB(A) {
        var B = A.split(".", 1)[0];
        return Q98(TqB.from(B, "base64").toString("binary"))
    }

    function Z98(A) {
        return A.split(".", 2).join(".")
    }

    function jqB(A) {
        return A.split(".")[2]
    }

    function D98(A, B) {
        B = B || "utf8";
        var Q = A.split(".")[1];
        return TqB.from(Q, "base64").toString(B)
    }

    function kqB(A) {
        return A98.test(A) && !!SqB(A)
    }

    function yqB(A, B, Q) {
        if (!B) {
            var Z = new Error("Missing algorithm parameter for jws.verify");
            throw Z.code = "MISSING_ALGORITHM", Z
        }
        A = PqB(A);
        var D = jqB(A),
            G = Z98(A),
            F = oB8(B);
        return F.verify(G, D, Q)
    }

    function _qB(A, B) {
        if (B = B || {}, A = PqB(A), !kqB(A)) return null;
        var Q = SqB(A);
        if (!Q) return null;
        var Z = D98(A);
        if (Q.typ === "JWT" || B.json) Z = JSON.parse(Z, B.encoding);
        return {
            header: Q,
            payload: Z,
            signature: jqB(A)
        }
    }

    function k11(A) {
        A = A || {};
        var B = A.secret || A.publicKey || A.key,
            Q = new OqB(B);
        this.readable = !0, this.algorithm = A.algorithm, this.encoding = A.encoding, this.secret = this.publicKey = this.key = Q, this.signature = new OqB(A.signature), this.secret.once("close", function() {
            if (!this.signature.writable && this.readable) this.verify()
        }.bind(this)), this.signature.once("close", function() {
            if (!this.secret.writable && this.readable) this.verify()
        }.bind(this))
    }
    eB8.inherits(k11, tB8);
    k11.prototype.verify = function A() {
        try {
            var B = yqB(this.signature.buffer, this.algorithm, this.key.buffer),
                Q = _qB(this.signature.buffer, this.encoding);
            return this.emit("done", B, Q), this.emit("data", B), this.emit("end"), this.readable = !1, B
        } catch (Z) {
            this.readable = !1, this.emit("error", Z), this.emit("close")
        }
    };
    k11.decode = _qB;
    k11.isValid = kqB;
    k11.verify = yqB;
    xqB.exports = k11
});
var pw0 = E((F98) => {
    var bqB = RqB(),
        rx1 = vqB(),
        G98 = ["HS256", "HS384", "HS512", "RS256", "RS384", "RS512", "PS256", "PS384", "PS512", "ES256", "ES384", "ES512"];
    F98.ALGORITHMS = G98;
    F98.sign = bqB.sign;
    F98.verify = rx1.verify;
    F98.decode = rx1.decode;
    F98.isValid = rx1.isValid;
    F98.createSign = function A(B) {
        return new bqB(B)
    };
    F98.createVerify = function A(B) {
        return new rx1(B)
    }
});