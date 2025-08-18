/* chunk:437 bytes:[10389680, 10394658) size:4978 source:unpacked-cli.js */
var ALB = E((tNB) => {
    Object.defineProperty(tNB, "__esModule", {
        value: !0
    });
    tNB.ExternalAccountAuthorizedUserClient = tNB.EXTERNAL_ACCOUNT_AUTHORIZED_USER_TYPE = void 0;
    var RQ8 = cM(),
        rNB = B$0(),
        OQ8 = R$(),
        TQ8 = W1("stream"),
        PQ8 = Cv();
    tNB.EXTERNAL_ACCOUNT_AUTHORIZED_USER_TYPE = "external_account_authorized_user";
    var SQ8 = "https://sts.{universeDomain}/v1/oauthtoken";
    class k$0 extends rNB.OAuthClientAuthHandler {
        constructor(A, B, Q) {
            super(Q);
            this.url = A, this.transporter = B
        }
        async refreshToken(A, B) {
            let Q = new URLSearchParams({
                    grant_type: "refresh_token",
                    refresh_token: A
                }),
                Z = {
                    "Content-Type": "application/x-www-form-urlencoded",
                    ...B
                },
                D = {
                    ...k$0.RETRY_CONFIG,
                    url: this.url,
                    method: "POST",
                    headers: Z,
                    data: Q.toString(),
                    responseType: "json"
                };
            this.applyClientAuthenticationOptions(D);
            try {
                let G = await this.transporter.request(D),
                    F = G.data;
                return F.res = G, F
            } catch (G) {
                if (G instanceof OQ8.GaxiosError && G.response) throw rNB.getErrorFromOAuthErrorResponse(G.response.data, G);
                throw G
            }
        }
    }
    class oNB extends RQ8.AuthClient {
        constructor(A, B) {
            var Q;
            super({
                ...A,
                ...B
            });
            if (A.universe_domain) this.universeDomain = A.universe_domain;
            this.refreshToken = A.refresh_token;
            let Z = {
                confidentialClientType: "basic",
                clientId: A.client_id,
                clientSecret: A.client_secret
            };
            if (this.externalAccountAuthorizedUserHandler = new k$0((Q = A.token_url) !== null && Q !== void 0 ? Q : SQ8.replace("{universeDomain}", this.universeDomain), this.transporter, Z), this.cachedAccessToken = null, this.quotaProjectId = A.quota_project_id, typeof(B === null || B === void 0 ? void 0 : B.eagerRefreshThresholdMillis) !== "number") this.eagerRefreshThresholdMillis = PQ8.EXPIRATION_TIME_OFFSET;
            else this.eagerRefreshThresholdMillis = B.eagerRefreshThresholdMillis;
            this.forceRefreshOnFailure = !!(B === null || B === void 0 ? void 0 : B.forceRefreshOnFailure)
        }
        async getAccessToken() {
            if (!this.cachedAccessToken || this.isExpired(this.cachedAccessToken)) await this.refreshAccessTokenAsync();
            return {
                token: this.cachedAccessToken.access_token,
                res: this.cachedAccessToken.res
            }
        }
        async getRequestHeaders() {
            let B = {
                Authorization: `Bearer ${(await this.getAccessToken()).token}`
            };
            return this.addSharedMetadataHeaders(B)
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
                let Z = await this.getRequestHeaders();
                if (A.headers = A.headers || {}, Z && Z["x-goog-user-project"]) A.headers["x-goog-user-project"] = Z["x-goog-user-project"];
                if (Z && Z.Authorization) A.headers.Authorization = Z.Authorization;
                Q = await this.transporter.request(A)
            } catch (Z) {
                let D = Z.response;
                if (D) {
                    let G = D.status,
                        F = D.config.data instanceof TQ8.Readable;
                    if (!B && (G === 401 || G === 403) && !F && this.forceRefreshOnFailure) return await this.refreshAccessTokenAsync(), await this.requestAsync(A, !0)
                }
                throw Z
            }
            return Q
        }
        async refreshAccessTokenAsync() {
            let A = await this.externalAccountAuthorizedUserHandler.refreshToken(this.refreshToken);
            if (this.cachedAccessToken = {
                    access_token: A.access_token,
                    expiry_date: new Date().getTime() + A.expires_in * 1000,
                    res: A.res
                }, A.refresh_token !== void 0) this.refreshToken = A.refresh_token;
            return this.cachedAccessToken
        }
        isExpired(A) {
            let B = new Date().getTime();
            return A.expiry_date ? B >= A.expiry_date - this.eagerRefreshThresholdMillis : !1
        }
    }
    tNB.ExternalAccountAuthorizedUserClient = oNB
});