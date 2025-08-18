/* chunk:434 bytes:[10337930, 10351869) size:13939 source:unpacked-cli.js */
var ew0 = E((tqB) => {
    Object.defineProperty(tqB, "__esModule", {
        value: !0
    });
    tqB.UserRefreshClient = tqB.USER_REFRESH_ACCOUNT_TYPE = void 0;
    var L98 = sm(),
        M98 = W1("querystring");
    tqB.USER_REFRESH_ACCOUNT_TYPE = "authorized_user";
    class tx1 extends L98.OAuth2Client {
        constructor(A, B, Q, Z, D) {
            let G = A && typeof A === "object" ? A : {
                clientId: A,
                clientSecret: B,
                refreshToken: Q,
                eagerRefreshThresholdMillis: Z,
                forceRefreshOnFailure: D
            };
            super(G);
            this._refreshToken = G.refreshToken, this.credentials.refresh_token = G.refreshToken
        }
        async refreshTokenNoCache(A) {
            return super.refreshTokenNoCache(this._refreshToken)
        }
        async fetchIdToken(A) {
            return (await this.transporter.request({
                ...tx1.RETRY_CONFIG,
                url: this.endpoints.oauth2TokenUrl,
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                },
                method: "POST",
                data: M98.stringify({
                    client_id: this._clientId,
                    client_secret: this._clientSecret,
                    grant_type: "refresh_token",
                    refresh_token: this._refreshToken,
                    target_audience: A
                })
            })).data.id_token
        }
        fromJSON(A) {
            if (!A) throw new Error("Must pass in a JSON object containing the user refresh token");
            if (A.type !== "authorized_user") throw new Error('The incoming JSON object does not have the "authorized_user" type');
            if (!A.client_id) throw new Error("The incoming JSON object does not contain a client_id field");
            if (!A.client_secret) throw new Error("The incoming JSON object does not contain a client_secret field");
            if (!A.refresh_token) throw new Error("The incoming JSON object does not contain a refresh_token field");
            this._clientId = A.client_id, this._clientSecret = A.client_secret, this._refreshToken = A.refresh_token, this.credentials.refresh_token = A.refresh_token, this.quotaProjectId = A.quota_project_id, this.universeDomain = A.universe_domain || this.universeDomain
        }
        fromStream(A, B) {
            if (B) this.fromStreamAsync(A).then(() => B(), B);
            else return this.fromStreamAsync(A)
        }
        async fromStreamAsync(A) {
            return new Promise((B, Q) => {
                if (!A) return Q(new Error("Must pass in a stream containing the user refresh token."));
                let Z = "";
                A.setEncoding("utf8").on("error", Q).on("data", (D) => Z += D).on("end", () => {
                    try {
                        let D = JSON.parse(Z);
                        return this.fromJSON(D), B()
                    } catch (D) {
                        return Q(D)
                    }
                })
            })
        }
        static fromJSON(A) {
            let B = new tx1;
            return B.fromJSON(A), B
        }
    }
    tqB.UserRefreshClient = tx1
});
var A$0 = E((BNB) => {
    Object.defineProperty(BNB, "__esModule", {
        value: !0
    });
    BNB.Impersonated = BNB.IMPERSONATED_ACCOUNT_TYPE = void 0;
    var ANB = sm(),
        O98 = R$(),
        T98 = Xv();
    BNB.IMPERSONATED_ACCOUNT_TYPE = "impersonated_service_account";
    class eD1 extends ANB.OAuth2Client {
        constructor(A = {}) {
            var B, Q, Z, D, G, F;
            super(A);
            if (this.credentials = {
                    expiry_date: 1,
                    refresh_token: "impersonated-placeholder"
                }, this.sourceClient = (B = A.sourceClient) !== null && B !== void 0 ? B : new ANB.OAuth2Client, this.targetPrincipal = (Q = A.targetPrincipal) !== null && Q !== void 0 ? Q : "", this.delegates = (Z = A.delegates) !== null && Z !== void 0 ? Z : [], this.targetScopes = (D = A.targetScopes) !== null && D !== void 0 ? D : [], this.lifetime = (G = A.lifetime) !== null && G !== void 0 ? G : 3600, !T98.originalOrCamelOptions(A).get("universe_domain")) this.universeDomain = this.sourceClient.universeDomain;
            else if (this.sourceClient.universeDomain !== this.universeDomain) throw new RangeError(`Universe domain ${this.sourceClient.universeDomain} in source credentials does not match ${this.universeDomain} universe domain set for impersonated credentials.`);
            this.endpoint = (F = A.endpoint) !== null && F !== void 0 ? F : `https://iamcredentials.${this.universeDomain}`
        }
        async sign(A) {
            await this.sourceClient.getAccessToken();
            let B = `projects/-/serviceAccounts/${this.targetPrincipal}`,
                Q = `${this.endpoint}/v1/${B}:signBlob`,
                Z = {
                    delegates: this.delegates,
                    payload: Buffer.from(A).toString("base64")
                };
            return (await this.sourceClient.request({
                ...eD1.RETRY_CONFIG,
                url: Q,
                data: Z,
                method: "POST"
            })).data
        }
        getTargetPrincipal() {
            return this.targetPrincipal
        }
        async refreshToken() {
            var A, B, Q, Z, D, G;
            try {
                await this.sourceClient.getAccessToken();
                let F = "projects/-/serviceAccounts/" + this.targetPrincipal,
                    I = `${this.endpoint}/v1/${F}:generateAccessToken`,
                    Y = {
                        delegates: this.delegates,
                        scope: this.targetScopes,
                        lifetime: this.lifetime + "s"
                    },
                    W = await this.sourceClient.request({
                        ...eD1.RETRY_CONFIG,
                        url: I,
                        data: Y,
                        method: "POST"
                    }),
                    J = W.data;
                return this.credentials.access_token = J.accessToken, this.credentials.expiry_date = Date.parse(J.expireTime), {
                    tokens: this.credentials,
                    res: W
                }
            } catch (F) {
                if (!(F instanceof Error)) throw F;
                let I = 0,
                    Y = "";
                if (F instanceof O98.GaxiosError) I = (Q = (B = (A = F === null || F === void 0 ? void 0 : F.response) === null || A === void 0 ? void 0 : A.data) === null || B === void 0 ? void 0 : B.error) === null || Q === void 0 ? void 0 : Q.status, Y = (G = (D = (Z = F === null || F === void 0 ? void 0 : F.response) === null || Z === void 0 ? void 0 : Z.data) === null || D === void 0 ? void 0 : D.error) === null || G === void 0 ? void 0 : G.message;
                if (I && Y) throw F.message = `${I}: unable to impersonate: ${Y}`, F;
                else throw F.message = `unable to impersonate: ${F}`, F
            }
        }
        async fetchIdToken(A, B) {
            var Q, Z;
            await this.sourceClient.getAccessToken();
            let D = `projects/-/serviceAccounts/${this.targetPrincipal}`,
                G = `${this.endpoint}/v1/${D}:generateIdToken`,
                F = {
                    delegates: this.delegates,
                    audience: A,
                    includeEmail: (Q = B === null || B === void 0 ? void 0 : B.includeEmail) !== null && Q !== void 0 ? Q : !0,
                    useEmailAzp: (Z = B === null || B === void 0 ? void 0 : B.includeEmail) !== null && Z !== void 0 ? Z : !0
                };
            return (await this.sourceClient.request({
                ...eD1.RETRY_CONFIG,
                url: G,
                data: F,
                method: "POST"
            })).data.token
        }
    }
    BNB.Impersonated = eD1
});
var B$0 = E((GNB) => {
    Object.defineProperty(GNB, "__esModule", {
        value: !0
    });
    GNB.OAuthClientAuthHandler = void 0;
    GNB.getErrorFromOAuthErrorResponse = k98;
    var ZNB = W1("querystring"),
        S98 = R11(),
        j98 = ["PUT", "POST", "PATCH"];
    class DNB {
        constructor(A) {
            this.clientAuthentication = A, this.crypto = S98.createCrypto()
        }
        applyClientAuthenticationOptions(A, B) {
            if (this.injectAuthenticatedHeaders(A, B), !B) this.injectAuthenticatedRequestBody(A)
        }
        injectAuthenticatedHeaders(A, B) {
            var Q;
            if (B) A.headers = A.headers || {}, Object.assign(A.headers, {
                Authorization: `Bearer ${B}}`
            });
            else if (((Q = this.clientAuthentication) === null || Q === void 0 ? void 0 : Q.confidentialClientType) === "basic") {
                A.headers = A.headers || {};
                let Z = this.clientAuthentication.clientId,
                    D = this.clientAuthentication.clientSecret || "",
                    G = this.crypto.encodeBase64StringUtf8(`${Z}:${D}`);
                Object.assign(A.headers, {
                    Authorization: `Basic ${G}`
                })
            }
        }
        injectAuthenticatedRequestBody(A) {
            var B;
            if (((B = this.clientAuthentication) === null || B === void 0 ? void 0 : B.confidentialClientType) === "request-body") {
                let Q = (A.method || "GET").toUpperCase();
                if (j98.indexOf(Q) !== -1) {
                    let Z, D = A.headers || {};
                    for (let G in D)
                        if (G.toLowerCase() === "content-type" && D[G]) {
                            Z = D[G].toLowerCase();
                            break
                        } if (Z === "application/x-www-form-urlencoded") {
                        A.data = A.data || "";
                        let G = ZNB.parse(A.data);
                        Object.assign(G, {
                            client_id: this.clientAuthentication.clientId,
                            client_secret: this.clientAuthentication.clientSecret || ""
                        }), A.data = ZNB.stringify(G)
                    } else if (Z === "application/json") A.data = A.data || {}, Object.assign(A.data, {
                        client_id: this.clientAuthentication.clientId,
                        client_secret: this.clientAuthentication.clientSecret || ""
                    });
                    else throw new Error(`${Z} content-types are not supported with ${this.clientAuthentication.confidentialClientType} client authentication`)
                } else throw new Error(`${Q} HTTP method does not support ${this.clientAuthentication.confidentialClientType} client authentication`)
            }
        }
        static get RETRY_CONFIG() {
            return {
                retry: !0,
                retryConfig: {
                    httpMethodsToRetry: ["GET", "PUT", "POST", "HEAD", "OPTIONS", "DELETE"]
                }
            }
        }
    }
    GNB.OAuthClientAuthHandler = DNB;

    function k98(A, B) {
        let {
            error: Q,
            error_description: Z,
            error_uri: D
        } = A, G = `Error code ${Q}`;
        if (typeof Z !== "undefined") G += `: ${Z}`;
        if (typeof D !== "undefined") G += ` - ${D}`;
        let F = new Error(G);
        if (B) {
            let I = Object.keys(B);
            if (B.stack) I.push("stack");
            I.forEach((Y) => {
                if (Y !== "message") Object.defineProperty(F, Y, {
                    value: B[Y],
                    writable: !1,
                    enumerable: !0
                })
            })
        }
        return F
    }
});
var Z$0 = E((YNB) => {
    Object.defineProperty(YNB, "__esModule", {
        value: !0
    });
    YNB.StsCredentials = void 0;
    var _98 = R$(),
        x98 = W1("querystring"),
        v98 = nD1(),
        INB = B$0();
    class Q$0 extends INB.OAuthClientAuthHandler {
        constructor(A, B) {
            super(B);
            this.tokenExchangeEndpoint = A, this.transporter = new v98.DefaultTransporter
        }
        async exchangeToken(A, B, Q) {
            var Z, D, G;
            let F = {
                grant_type: A.grantType,
                resource: A.resource,
                audience: A.audience,
                scope: (Z = A.scope) === null || Z === void 0 ? void 0 : Z.join(" "),
                requested_token_type: A.requestedTokenType,
                subject_token: A.subjectToken,
                subject_token_type: A.subjectTokenType,
                actor_token: (D = A.actingParty) === null || D === void 0 ? void 0 : D.actorToken,
                actor_token_type: (G = A.actingParty) === null || G === void 0 ? void 0 : G.actorTokenType,
                options: Q && JSON.stringify(Q)
            };
            Object.keys(F).forEach((W) => {
                if (typeof F[W] === "undefined") delete F[W]
            });
            let I = {
                "Content-Type": "application/x-www-form-urlencoded"
            };
            Object.assign(I, B || {});
            let Y = {
                ...Q$0.RETRY_CONFIG,
                url: this.tokenExchangeEndpoint.toString(),
                method: "POST",
                headers: I,
                data: x98.stringify(F),
                responseType: "json"
            };
            this.applyClientAuthenticationOptions(Y);
            try {
                let W = await this.transporter.request(Y),
                    J = W.data;
                return J.res = W, J
            } catch (W) {
                if (W instanceof _98.GaxiosError && W.response) throw INB.getErrorFromOAuthErrorResponse(W.response.data, W);
                throw W
            }
        }
    }
    YNB.StsCredentials = Q$0
});