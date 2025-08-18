/* chunk:340 bytes:[8078162, 8086211) size:8049 source:unpacked-cli.js */
var _X0 = E((Ye2) => {
    Object.defineProperty(Ye2, "__esModule", {
        value: !0
    });
    Ye2.parseCIDR = Fe2;
    Ye2.mapProxyName = bE6;
    Ye2.getProxiedConnection = fE6;
    var w71 = I7(),
        ut = b6(),
        Ge2 = W1("net"),
        TE6 = W1("http"),
        PE6 = I7(),
        De2 = OE(),
        $71 = mV(),
        SE6 = W1("url"),
        jE6 = yX0(),
        kE6 = "proxy";

    function mt(A) {
        PE6.trace(ut.LogVerbosity.DEBUG, kE6, A)
    }

    function yE6() {
        let A = "",
            B = "";
        if (process.env.grpc_proxy) B = "grpc_proxy", A = process.env.grpc_proxy;
        else if (process.env.https_proxy) B = "https_proxy", A = process.env.https_proxy;
        else if (process.env.http_proxy) B = "http_proxy", A = process.env.http_proxy;
        else return {};
        let Q;
        try {
            Q = new SE6.URL(A)
        } catch (I) {
            return w71.log(ut.LogVerbosity.ERROR, `cannot parse value of "${B}" env var`), {}
        }
        if (Q.protocol !== "http:") return w71.log(ut.LogVerbosity.ERROR, `"${Q.protocol}" scheme not supported in proxy URI`), {};
        let Z = null;
        if (Q.username)
            if (Q.password) w71.log(ut.LogVerbosity.INFO, "userinfo found in proxy URI"), Z = decodeURIComponent(`${Q.username}:${Q.password}`);
            else Z = Q.username;
        let {
            hostname: D,
            port: G
        } = Q;
        if (G === "") G = "80";
        let F = {
            address: `${D}:${G}`
        };
        if (Z) F.creds = Z;
        return mt("Proxy server " + F.address + " set by environment variable " + B), F
    }

    function _E6() {
        let A = process.env.no_grpc_proxy,
            B = "no_grpc_proxy";
        if (!A) A = process.env.no_proxy, B = "no_proxy";
        if (A) return mt("No proxy server list set by environment variable " + B), A.split(",");
        else return []
    }

    function Fe2(A) {
        let B = A.split("/");
        if (B.length !== 2) return null;
        let Q = parseInt(B[1], 10);
        if (!Ge2.isIPv4(B[0]) || Number.isNaN(Q) || Q < 0 || Q > 32) return null;
        return {
            ip: Ie2(B[0]),
            prefixLength: Q
        }
    }

    function Ie2(A) {
        return A.split(".").reduce((B, Q) => (B << 8) + parseInt(Q, 10), 0)
    }

    function xE6(A, B) {
        let Q = A.ip,
            Z = -1 << 32 - A.prefixLength;
        return (Ie2(B) & Z) === (Q & Z)
    }

    function vE6(A) {
        for (let B of _E6()) {
            let Q = Fe2(B);
            if (Ge2.isIPv4(A) && Q && xE6(Q, A)) return !0;
            else if (A.endsWith(B)) return !0
        }
        return !1
    }

    function bE6(A, B) {
        var Q;
        let Z = {
            target: A,
            extraOptions: {}
        };
        if (((Q = B["grpc.enable_http_proxy"]) !== null && Q !== void 0 ? Q : 1) === 0) return Z;
        if (A.scheme === "unix") return Z;
        let D = yE6();
        if (!D.address) return Z;
        let G = $71.splitHostPort(A.path);
        if (!G) return Z;
        let F = G.host;
        if (vE6(F)) return mt("Not using proxy for target in no_proxy list: " + $71.uriToString(A)), Z;
        let I = {
            "grpc.http_connect_target": $71.uriToString(A)
        };
        if (D.creds) I["grpc.http_connect_creds"] = D.creds;
        return {
            target: {
                scheme: "dns",
                path: D.address
            },
            extraOptions: I
        }
    }

    function fE6(A, B) {
        var Q;
        if (!("grpc.http_connect_target" in B)) return Promise.resolve(null);
        let Z = B["grpc.http_connect_target"],
            D = $71.parseUri(Z);
        if (D === null) return Promise.resolve(null);
        let G = $71.splitHostPort(D.path);
        if (G === null) return Promise.resolve(null);
        let F = `${G.host}:${(Q=G.port)!==null&&Q!==void 0?Q:jE6.DEFAULT_PORT}`,
            I = {
                method: "CONNECT",
                path: F
            },
            Y = {
                Host: F
            };
        if (De2.isTcpSubchannelAddress(A)) I.host = A.host, I.port = A.port;
        else I.socketPath = A.path;
        if ("grpc.http_connect_creds" in B) Y["Proxy-Authorization"] = "Basic " + Buffer.from(B["grpc.http_connect_creds"]).toString("base64");
        I.headers = Y;
        let W = De2.subchannelAddressToString(A);
        return mt("Using proxy " + W + " to connect to " + I.path), new Promise((J, X) => {
            let V = TE6.request(I);
            V.once("connect", (C, K, H) => {
                if (V.removeAllListeners(), K.removeAllListeners(), C.statusCode === 200) {
                    if (mt("Successfully connected to " + I.path + " through proxy " + W), H.length > 0) K.unshift(H);
                    mt("Successfully established a plaintext connection to " + I.path + " through proxy " + W), J(K)
                } else w71.log(ut.LogVerbosity.ERROR, "Failed to connect to " + I.path + " through proxy " + W + " with status " + C.statusCode), X()
            }), V.once("error", (C) => {
                V.removeAllListeners(), w71.log(ut.LogVerbosity.ERROR, "Failed to connect to proxy " + W + " with error " + C.message), X()
            }), V.end()
        })
    }
});
var xX0 = E((Je2) => {
    Object.defineProperty(Je2, "__esModule", {
        value: !0
    });
    Je2.StreamDecoder = void 0;
    var HM;
    (function(A) {
        A[A.NO_DATA = 0] = "NO_DATA", A[A.READING_SIZE = 1] = "READING_SIZE", A[A.READING_MESSAGE = 2] = "READING_MESSAGE"
    })(HM || (HM = {}));
    class We2 {
        constructor(A) {
            this.maxReadMessageLength = A, this.readState = HM.NO_DATA, this.readCompressFlag = Buffer.alloc(1), this.readPartialSize = Buffer.alloc(4), this.readSizeRemaining = 4, this.readMessageSize = 0, this.readPartialMessage = [], this.readMessageRemaining = 0
        }
        write(A) {
            let B = 0,
                Q, Z = [];
            while (B < A.length) switch (this.readState) {
                case HM.NO_DATA:
                    this.readCompressFlag = A.slice(B, B + 1), B += 1, this.readState = HM.READING_SIZE, this.readPartialSize.fill(0), this.readSizeRemaining = 4, this.readMessageSize = 0, this.readMessageRemaining = 0, this.readPartialMessage = [];
                    break;
                case HM.READING_SIZE:
                    if (Q = Math.min(A.length - B, this.readSizeRemaining), A.copy(this.readPartialSize, 4 - this.readSizeRemaining, B, B + Q), this.readSizeRemaining -= Q, B += Q, this.readSizeRemaining === 0) {
                        if (this.readMessageSize = this.readPartialSize.readUInt32BE(0), this.maxReadMessageLength !== -1 && this.readMessageSize > this.maxReadMessageLength) throw new Error(`Received message larger than max (${this.readMessageSize} vs ${this.maxReadMessageLength})`);
                        if (this.readMessageRemaining = this.readMessageSize, this.readMessageRemaining > 0) this.readState = HM.READING_MESSAGE;
                        else {
                            let D = Buffer.concat([this.readCompressFlag, this.readPartialSize], 5);
                            this.readState = HM.NO_DATA, Z.push(D)
                        }
                    }
                    break;
                case HM.READING_MESSAGE:
                    if (Q = Math.min(A.length - B, this.readMessageRemaining), this.readPartialMessage.push(A.slice(B, B + Q)), this.readMessageRemaining -= Q, B += Q, this.readMessageRemaining === 0) {
                        let D = [this.readCompressFlag, this.readPartialSize].concat(this.readPartialMessage),
                            G = Buffer.concat(D, this.readMessageSize + 5);
                        this.readState = HM.NO_DATA, Z.push(G)
                    }
                    break;
                default:
                    throw new Error("Unexpected read state")
            }
            return Z
        }
    }
    Je2.StreamDecoder = We2
});