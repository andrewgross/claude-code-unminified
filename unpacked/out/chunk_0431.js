/* chunk:431 bytes:[10280258, 10301674) size:21416 source:unpacked-cli.js */
var sm = E((s$B) => {
    Object.defineProperty(s$B, "__esModule", {
        value: !0
    });
    s$B.OAuth2Client = s$B.ClientAuthentication = s$B.CertificateFormat = s$B.CodeChallengeMethod = void 0;
    var WB8 = R$(),
        _w0 = W1("querystring"),
        JB8 = W1("stream"),
        XB8 = Pw0(),
        xw0 = R11(),
        VB8 = cM(),
        CB8 = yw0(),
        a$B;
    (function(A) {
        A.Plain = "plain", A.S256 = "S256"
    })(a$B || (s$B.CodeChallengeMethod = a$B = {}));
    var YS;
    (function(A) {
        A.PEM = "PEM", A.JWK = "JWK"
    })(YS || (s$B.CertificateFormat = YS = {}));
    var aD1;
    (function(A) {
        A.ClientSecretPost = "ClientSecretPost", A.ClientSecretBasic = "ClientSecretBasic", A.None = "None"
    })(aD1 || (s$B.ClientAuthentication = aD1 = {}));
    class wX extends VB8.AuthClient {
        constructor(A, B, Q) {
            let Z = A && typeof A === "object" ? A : {
                clientId: A,
                clientSecret: B,
                redirectUri: Q
            };
            super(Z);
            this.certificateCache = {}, this.certificateExpiry = null, this.certificateCacheFormat = YS.PEM, this.refreshTokenPromises = new Map, this._clientId = Z.clientId, this._clientSecret = Z.clientSecret, this.redirectUri = Z.redirectUri, this.endpoints = {
                tokenInfoUrl: "https://oauth2.googleapis.com/tokeninfo",
                oauth2AuthBaseUrl: "https://accounts.google.com/o/oauth2/v2/auth",
                oauth2TokenUrl: "https://oauth2.googleapis.com/token",
                oauth2RevokeUrl: "https://oauth2.googleapis.com/revoke",
                oauth2FederatedSignonPemCertsUrl: "https://www.googleapis.com/oauth2/v1/certs",
                oauth2FederatedSignonJwkCertsUrl: "https://www.googleapis.com/oauth2/v3/certs",
                oauth2IapPublicKeyUrl: "https://www.gstatic.com/iap/verify/public_key",
                ...Z.endpoints
            }, this.clientAuthentication = Z.clientAuthentication || aD1.ClientSecretPost, this.issuers = Z.issuers || ["accounts.google.com", "https://accounts.google.com", this.universeDomain]
        }
        generateAuthUrl(A = {}) {
            if (A.code_challenge_method && !A.code_challenge) throw new Error("If a code_challenge_method is provided, code_challenge must be included.");
            if (A.response_type = A.response_type || "code", A.client_id = A.client_id || this._clientId, A.redirect_uri = A.redirect_uri || this.redirectUri, Array.isArray(A.scope)) A.scope = A.scope.join(" ");
            return this.endpoints.oauth2AuthBaseUrl.toString() + "?" + _w0.stringify(A)
        }
        generateCodeVerifier() {
            throw new Error("generateCodeVerifier is removed, please use generateCodeVerifierAsync instead.")
        }
        async generateCodeVerifierAsync() {
            let A = xw0.createCrypto(),
                Q = A.randomBytesBase64(96).replace(/\+/g, "~").replace(/=/g, "_").replace(/\//g, "-"),
                D = (await A.sha256DigestBase64(Q)).split("=")[0].replace(/\+/g, "-").replace(/\//g, "_");
            return {
                codeVerifier: Q,
                codeChallenge: D
            }
        }
        getToken(A, B) {
            let Q = typeof A === "string" ? {
                code: A
            } : A;
            if (B) this.getTokenAsync(Q).then((Z) => B(null, Z.tokens, Z.res), (Z) => B(Z, null, Z.response));
            else return this.getTokenAsync(Q)
        }
        async getTokenAsync(A) {
            let B = this.endpoints.oauth2TokenUrl.toString(),
                Q = {
                    "Content-Type": "application/x-www-form-urlencoded"
                },
                Z = {
                    client_id: A.client_id || this._clientId,
                    code_verifier: A.codeVerifier,
                    code: A.code,
                    grant_type: "authorization_code",
                    redirect_uri: A.redirect_uri || this.redirectUri
                };
            if (this.clientAuthentication === aD1.ClientSecretBasic) {
                let F = Buffer.from(`${this._clientId}:${this._clientSecret}`);
                Q.Authorization = `Basic ${F.toString("base64")}`
            }
            if (this.clientAuthentication === aD1.ClientSecretPost) Z.client_secret = this._clientSecret;
            let D = await this.transporter.request({
                    ...wX.RETRY_CONFIG,
                    method: "POST",
                    url: B,
                    data: _w0.stringify(Z),
                    headers: Q
                }),
                G = D.data;
            if (D.data && D.data.expires_in) G.expiry_date = new Date().getTime() + D.data.expires_in * 1000, delete G.expires_in;
            return this.emit("tokens", G), {
                tokens: G,
                res: D
            }
        }
        async refreshToken(A) {
            if (!A) return this.refreshTokenNoCache(A);
            if (this.refreshTokenPromises.has(A)) return this.refreshTokenPromises.get(A);
            let B = this.refreshTokenNoCache(A).then((Q) => {
                return this.refreshTokenPromises.delete(A), Q
            }, (Q) => {
                throw this.refreshTokenPromises.delete(A), Q
            });
            return this.refreshTokenPromises.set(A, B), B
        }
        async refreshTokenNoCache(A) {
            var B;
            if (!A) throw new Error("No refresh token is set.");
            let Q = this.endpoints.oauth2TokenUrl.toString(),
                Z = {
                    refresh_token: A,
                    client_id: this._clientId,
                    client_secret: this._clientSecret,
                    grant_type: "refresh_token"
                },
                D;
            try {
                D = await this.transporter.request({
                    ...wX.RETRY_CONFIG,
                    method: "POST",
                    url: Q,
                    data: _w0.stringify(Z),
                    headers: {
                        "Content-Type": "application/x-www-form-urlencoded"
                    }
                })
            } catch (F) {
                if (F instanceof WB8.GaxiosError && F.message === "invalid_grant" && ((B = F.response) === null || B === void 0 ? void 0 : B.data) && /ReAuth/i.test(F.response.data.error_description)) F.message = JSON.stringify(F.response.data);
                throw F
            }
            let G = D.data;
            if (D.data && D.data.expires_in) G.expiry_date = new Date().getTime() + D.data.expires_in * 1000, delete G.expires_in;
            return this.emit("tokens", G), {
                tokens: G,
                res: D
            }
        }
        refreshAccessToken(A) {
            if (A) this.refreshAccessTokenAsync().then((B) => A(null, B.credentials, B.res), A);
            else return this.refreshAccessTokenAsync()
        }
        async refreshAccessTokenAsync() {
            let A = await this.refreshToken(this.credentials.refresh_token),
                B = A.tokens;
            return B.refresh_token = this.credentials.refresh_token, this.credentials = B, {
                credentials: this.credentials,
                res: A.res
            }
        }
        getAccessToken(A) {
            if (A) this.getAccessTokenAsync().then((B) => A(null, B.token, B.res), A);
            else return this.getAccessTokenAsync()
        }
        async getAccessTokenAsync() {
            if (!this.credentials.access_token || this.isTokenExpiring()) {
                if (!this.credentials.refresh_token)
                    if (this.refreshHandler) {
                        let Q = await this.processAndValidateRefreshHandler();
                        if (Q === null || Q === void 0 ? void 0 : Q.access_token) return this.setCredentials(Q), {
                            token: this.credentials.access_token
                        }
                    } else throw new Error("No refresh token or refresh handler callback is set.");
                let B = await this.refreshAccessTokenAsync();
                if (!B.credentials || B.credentials && !B.credentials.access_token) throw new Error("Could not refresh access token.");
                return {
                    token: B.credentials.access_token,
                    res: B.res
                }
            } else return {
                token: this.credentials.access_token
            }
        }
        async getRequestHeaders(A) {
            return (await this.getRequestMetadataAsync(A)).headers
        }
        async getRequestMetadataAsync(A) {
            let B = this.credentials;
            if (!B.access_token && !B.refresh_token && !this.apiKey && !this.refreshHandler) throw new Error("No access, refresh token, API key or refresh handler callback is set.");
            if (B.access_token && !this.isTokenExpiring()) {
                B.token_type = B.token_type || "Bearer";
                let F = {
                    Authorization: B.token_type + " " + B.access_token
                };
                return {
                    headers: this.addSharedMetadataHeaders(F)
                }
            }
            if (this.refreshHandler) {
                let F = await this.processAndValidateRefreshHandler();
                if (F === null || F === void 0 ? void 0 : F.access_token) {
                    this.setCredentials(F);
                    let I = {
                        Authorization: "Bearer " + this.credentials.access_token
                    };
                    return {
                        headers: this.addSharedMetadataHeaders(I)
                    }
                }
            }
            if (this.apiKey) return {
                headers: {
                    "X-Goog-Api-Key": this.apiKey
                }
            };
            let Q = null,
                Z = null;
            try {
                Q = await this.refreshToken(B.refresh_token), Z = Q.tokens
            } catch (F) {
                let I = F;
                if (I.response && (I.response.status === 403 || I.response.status === 404)) I.message = `Could not refresh access token: ${I.message}`;
                throw I
            }
            let D = this.credentials;
            D.token_type = D.token_type || "Bearer", Z.refresh_token = D.refresh_token, this.credentials = Z;
            let G = {
                Authorization: D.token_type + " " + Z.access_token
            };
            return {
                headers: this.addSharedMetadataHeaders(G),
                res: Q.res
            }
        }
        static getRevokeTokenUrl(A) {
            return new wX().getRevokeTokenURL(A).toString()
        }
        getRevokeTokenURL(A) {
            let B = new URL(this.endpoints.oauth2RevokeUrl);
            return B.searchParams.append("token", A), B
        }
        revokeToken(A, B) {
            let Q = {
                ...wX.RETRY_CONFIG,
                url: this.getRevokeTokenURL(A).toString(),
                method: "POST"
            };
            if (B) this.transporter.request(Q).then((Z) => B(null, Z), B);
            else return this.transporter.request(Q)
        }
        revokeCredentials(A) {
            if (A) this.revokeCredentialsAsync().then((B) => A(null, B), A);
            else return this.revokeCredentialsAsync()
        }
        async revokeCredentialsAsync() {
            let A = this.credentials.access_token;
            if (this.credentials = {}, A) return this.revokeToken(A);
            else throw new Error("No access token to revoke.")
        }
        request(A, B) {
            if (B) this.requestAsync(A).then((Q) => B(null, Q), (Q) => {
                return B(Q, Q.response)
            });
            else return this.requestAsync(A)
        }
        async requestAsync(A, B = !1) {
            let Q;
            try {
                let Z = await this.getRequestMetadataAsync(A.url);
                if (A.headers = A.headers || {}, Z.headers && Z.headers["x-goog-user-project"]) A.headers["x-goog-user-project"] = Z.headers["x-goog-user-project"];
                if (Z.headers && Z.headers.Authorization) A.headers.Authorization = Z.headers.Authorization;
                if (this.apiKey) A.headers["X-Goog-Api-Key"] = this.apiKey;
                Q = await this.transporter.request(A)
            } catch (Z) {
                let D = Z.response;
                if (D) {
                    let G = D.status,
                        F = this.credentials && this.credentials.access_token && this.credentials.refresh_token && (!this.credentials.expiry_date || this.forceRefreshOnFailure),
                        I = this.credentials && this.credentials.access_token && !this.credentials.refresh_token && (!this.credentials.expiry_date || this.forceRefreshOnFailure) && this.refreshHandler,
                        Y = D.config.data instanceof JB8.Readable,
                        W = G === 401 || G === 403;
                    if (!B && W && !Y && F) return await this.refreshAccessTokenAsync(), this.requestAsync(A, !0);
                    else if (!B && W && !Y && I) {
                        let J = await this.processAndValidateRefreshHandler();
                        if (J === null || J === void 0 ? void 0 : J.access_token) this.setCredentials(J);
                        return this.requestAsync(A, !0)
                    }
                }
                throw Z
            }
            return Q
        }
        verifyIdToken(A, B) {
            if (B && typeof B !== "function") throw new Error("This method accepts an options object as the first parameter, which includes the idToken, audience, and maxExpiry.");
            if (B) this.verifyIdTokenAsync(A).then((Q) => B(null, Q), B);
            else return this.verifyIdTokenAsync(A)
        }
        async verifyIdTokenAsync(A) {
            if (!A.idToken) throw new Error("The verifyIdToken method requires an ID Token");
            let B = await this.getFederatedSignonCertsAsync();
            return await this.verifySignedJwtWithCertsAsync(A.idToken, B.certs, A.audience, this.issuers, A.maxExpiry)
        }
        async getTokenInfo(A) {
            let {
                data: B
            } = await this.transporter.request({
                ...wX.RETRY_CONFIG,
                method: "POST",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                    Authorization: `Bearer ${A}`
                },
                url: this.endpoints.tokenInfoUrl.toString()
            }), Q = Object.assign({
                expiry_date: new Date().getTime() + B.expires_in * 1000,
                scopes: B.scope.split(" ")
            }, B);
            return delete Q.expires_in, delete Q.scope, Q
        }
        getFederatedSignonCerts(A) {
            if (A) this.getFederatedSignonCertsAsync().then((B) => A(null, B.certs, B.res), A);
            else return this.getFederatedSignonCertsAsync()
        }
        async getFederatedSignonCertsAsync() {
            let A = new Date().getTime(),
                B = xw0.hasBrowserCrypto() ? YS.JWK : YS.PEM;
            if (this.certificateExpiry && A < this.certificateExpiry.getTime() && this.certificateCacheFormat === B) return {
                certs: this.certificateCache,
                format: B
            };
            let Q, Z;
            switch (B) {
                case YS.PEM:
                    Z = this.endpoints.oauth2FederatedSignonPemCertsUrl.toString();
                    break;
                case YS.JWK:
                    Z = this.endpoints.oauth2FederatedSignonJwkCertsUrl.toString();
                    break;
                default:
                    throw new Error(`Unsupported certificate format ${B}`)
            }
            try {
                Q = await this.transporter.request({
                    ...wX.RETRY_CONFIG,
                    url: Z
                })
            } catch (Y) {
                if (Y instanceof Error) Y.message = `Failed to retrieve verification certificates: ${Y.message}`;
                throw Y
            }
            let D = Q ? Q.headers["cache-control"] : void 0,
                G = -1;
            if (D) {
                let W = new RegExp("max-age=([0-9]*)").exec(D);
                if (W && W.length === 2) G = Number(W[1]) * 1000
            }
            let F = {};
            switch (B) {
                case YS.PEM:
                    F = Q.data;
                    break;
                case YS.JWK:
                    for (let Y of Q.data.keys) F[Y.kid] = Y;
                    break;
                default:
                    throw new Error(`Unsupported certificate format ${B}`)
            }
            let I = new Date;
            return this.certificateExpiry = G === -1 ? null : new Date(I.getTime() + G), this.certificateCache = F, this.certificateCacheFormat = B, {
                certs: F,
                format: B,
                res: Q
            }
        }
        getIapPublicKeys(A) {
            if (A) this.getIapPublicKeysAsync().then((B) => A(null, B.pubkeys, B.res), A);
            else return this.getIapPublicKeysAsync()
        }
        async getIapPublicKeysAsync() {
            let A, B = this.endpoints.oauth2IapPublicKeyUrl.toString();
            try {
                A = await this.transporter.request({
                    ...wX.RETRY_CONFIG,
                    url: B
                })
            } catch (Q) {
                if (Q instanceof Error) Q.message = `Failed to retrieve verification certificates: ${Q.message}`;
                throw Q
            }
            return {
                pubkeys: A.data,
                res: A
            }
        }
        verifySignedJwtWithCerts() {
            throw new Error("verifySignedJwtWithCerts is removed, please use verifySignedJwtWithCertsAsync instead.")
        }
        async verifySignedJwtWithCertsAsync(A, B, Q, Z, D) {
            let G = xw0.createCrypto();
            if (!D) D = wX.DEFAULT_MAX_TOKEN_LIFETIME_SECS_;
            let F = A.split(".");
            if (F.length !== 3) throw new Error("Wrong number of segments in token: " + A);
            let I = F[0] + "." + F[1],
                Y = F[2],
                W, J;
            try {
                W = JSON.parse(G.decodeBase64StringUtf8(F[0]))
            } catch (L) {
                if (L instanceof Error) L.message = `Can't parse token envelope: ${F[0]}': ${L.message}`;
                throw L
            }
            if (!W) throw new Error("Can't parse token envelope: " + F[0]);
            try {
                J = JSON.parse(G.decodeBase64StringUtf8(F[1]))
            } catch (L) {
                if (L instanceof Error) L.message = `Can't parse token payload '${F[0]}`;
                throw L
            }
            if (!J) throw new Error("Can't parse token payload: " + F[1]);
            if (!Object.prototype.hasOwnProperty.call(B, W.kid)) throw new Error("No pem found for envelope: " + JSON.stringify(W));
            let X = B[W.kid];
            if (W.alg === "ES256") Y = XB8.joseToDer(Y, "ES256").toString("base64");
            if (!await G.verify(X, I, Y)) throw new Error("Invalid token signature: " + A);
            if (!J.iat) throw new Error("No issue time in token: " + JSON.stringify(J));
            if (!J.exp) throw new Error("No expiration time in token: " + JSON.stringify(J));
            let C = Number(J.iat);
            if (isNaN(C)) throw new Error("iat field using invalid format");
            let K = Number(J.exp);
            if (isNaN(K)) throw new Error("exp field using invalid format");
            let H = new Date().getTime() / 1000;
            if (K >= H + D) throw new Error("Expiration time too far in future: " + JSON.stringify(J));
            let z = C - wX.CLOCK_SKEW_SECS_,
                $ = K + wX.CLOCK_SKEW_SECS_;
            if (H < z) throw new Error("Token used too early, " + H + " < " + z + ": " + JSON.stringify(J));
            if (H > $) throw new Error("Token used too late, " + H + " > " + $ + ": " + JSON.stringify(J));
            if (Z && Z.indexOf(J.iss) < 0) throw new Error("Invalid issuer, expected one of [" + Z + "], but got " + J.iss);
            if (typeof Q !== "undefined" && Q !== null) {
                let L = J.aud,
                    N = !1;
                if (Q.constructor === Array) N = Q.indexOf(L) > -1;
                else N = L === Q;
                if (!N) throw new Error("Wrong recipient, payload audience != requiredAudience")
            }
            return new CB8.LoginTicket(W, J)
        }
        async processAndValidateRefreshHandler() {
            if (this.refreshHandler) {
                let A = await this.refreshHandler();
                if (!A.access_token) throw new Error("No access token is returned by the refreshHandler callback.");
                return A
            }
            return
        }
        isTokenExpiring() {
            let A = this.credentials.expiry_date;
            return A ? A <= new Date().getTime() + this.eagerRefreshThresholdMillis : !1
        }
    }
    s$B.OAuth2Client = wX;
    wX.GOOGLE_TOKEN_INFO_URL = "https://oauth2.googleapis.com/tokeninfo";
    wX.CLOCK_SKEW_SECS_ = 300;
    wX.DEFAULT_MAX_TOKEN_LIFETIME_SECS_ = 86400
});