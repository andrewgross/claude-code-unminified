/* chunk:433 bytes:[10318875, 10337929) size:19054 source:unpacked-cli.js */
var pqB = E((Vv) => {
    var S$ = Vv && Vv.__classPrivateFieldGet || function(A, B, Q, Z) {
            if (Q === "a" && !Z) throw new TypeError("Private accessor was defined without a getter");
            if (typeof B === "function" ? A !== B || !Z : !B.has(A)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
            return Q === "m" ? Z : Q === "a" ? Z.call(A) : Z ? Z.value : B.get(A)
        },
        fqB = Vv && Vv.__classPrivateFieldSet || function(A, B, Q, Z, D) {
            if (Z === "m") throw new TypeError("Private method is not writable");
            if (Z === "a" && !D) throw new TypeError("Private accessor was defined without a setter");
            if (typeof B === "function" ? A !== B || !D : !B.has(A)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
            return Z === "a" ? D.call(A, Q) : D ? D.value = Q : B.set(A, Q), Q
        },
        j$, y11, iw0, hqB, gqB, nw0, aw0, uqB;
    Object.defineProperty(Vv, "__esModule", {
        value: !0
    });
    Vv.GoogleToken = void 0;
    var mqB = W1("fs"),
        K98 = R$(),
        H98 = pw0(),
        z98 = W1("path"),
        E98 = W1("util"),
        dqB = mqB.readFile ? E98.promisify(mqB.readFile) : async () => {
            throw new _11("use key rather than keyFile.", "MISSING_CREDENTIALS")
        }, cqB = "https://www.googleapis.com/oauth2/v4/token", U98 = "https://accounts.google.com/o/oauth2/revoke?token=";
    class _11 extends Error {
        constructor(A, B) {
            super(A);
            this.code = B
        }
    }
    class lqB {
        get accessToken() {
            return this.rawToken ? this.rawToken.access_token : void 0
        }
        get idToken() {
            return this.rawToken ? this.rawToken.id_token : void 0
        }
        get tokenType() {
            return this.rawToken ? this.rawToken.token_type : void 0
        }
        get refreshToken() {
            return this.rawToken ? this.rawToken.refresh_token : void 0
        }
        constructor(A) {
            j$.add(this), this.transporter = {
                request: (B) => K98.request(B)
            }, y11.set(this, void 0), S$(this, j$, "m", aw0).call(this, A)
        }
        hasExpired() {
            let A = new Date().getTime();
            if (this.rawToken && this.expiresAt) return A >= this.expiresAt;
            else return !0
        }
        isTokenExpiring() {
            var A;
            let B = new Date().getTime(),
                Q = (A = this.eagerRefreshThresholdMillis) !== null && A !== void 0 ? A : 0;
            if (this.rawToken && this.expiresAt) return this.expiresAt <= B + Q;
            else return !0
        }
        getToken(A, B = {}) {
            if (typeof A === "object") B = A, A = void 0;
            if (B = Object.assign({
                    forceRefresh: !1
                }, B), A) {
                let Q = A;
                S$(this, j$, "m", iw0).call(this, B).then((Z) => Q(null, Z), A);
                return
            }
            return S$(this, j$, "m", iw0).call(this, B)
        }
        async getCredentials(A) {
            switch (z98.extname(A)) {
                case ".json": {
                    let Q = await dqB(A, "utf8"),
                        Z = JSON.parse(Q),
                        D = Z.private_key,
                        G = Z.client_email;
                    if (!D || !G) throw new _11("private_key and client_email are required.", "MISSING_CREDENTIALS");
                    return {
                        privateKey: D,
                        clientEmail: G
                    }
                }
                case ".der":
                case ".crt":
                case ".pem":
                    return {
                        privateKey: await dqB(A, "utf8")
                    };
                case ".p12":
                case ".pfx":
                    throw new _11("*.p12 certificates are not supported after v6.1.2. Consider utilizing *.json format or converting *.p12 to *.pem using the OpenSSL CLI.", "UNKNOWN_CERTIFICATE_TYPE");
                default:
                    throw new _11("Unknown certificate type. Type is determined based on file extension. Current supported extensions are *.json, and *.pem.", "UNKNOWN_CERTIFICATE_TYPE")
            }
        }
        revokeToken(A) {
            if (A) {
                S$(this, j$, "m", nw0).call(this).then(() => A(), A);
                return
            }
            return S$(this, j$, "m", nw0).call(this)
        }
    }
    Vv.GoogleToken = lqB;
    y11 = new WeakMap, j$ = new WeakSet, iw0 = async function A(B) {
        if (S$(this, y11, "f") && !B.forceRefresh) return S$(this, y11, "f");
        try {
            return await fqB(this, y11, S$(this, j$, "m", hqB).call(this, B), "f")
        } finally {
            fqB(this, y11, void 0, "f")
        }
    }, hqB = async function A(B) {
        if (this.isTokenExpiring() === !1 && B.forceRefresh === !1) return Promise.resolve(this.rawToken);
        if (!this.key && !this.keyFile) throw new Error("No key or keyFile set.");
        if (!this.key && this.keyFile) {
            let Q = await this.getCredentials(this.keyFile);
            if (this.key = Q.privateKey, this.iss = Q.clientEmail || this.iss, !Q.clientEmail) S$(this, j$, "m", gqB).call(this)
        }
        return S$(this, j$, "m", uqB).call(this)
    }, gqB = function A() {
        if (!this.iss) throw new _11("email is required.", "MISSING_CREDENTIALS")
    }, nw0 = async function A() {
        if (!this.accessToken) throw new Error("No token to revoke.");
        let B = U98 + this.accessToken;
        await this.transporter.request({
            url: B,
            retry: !0
        }), S$(this, j$, "m", aw0).call(this, {
            email: this.iss,
            sub: this.sub,
            key: this.key,
            keyFile: this.keyFile,
            scope: this.scope,
            additionalClaims: this.additionalClaims
        })
    }, aw0 = function A(B = {}) {
        if (this.keyFile = B.keyFile, this.key = B.key, this.rawToken = void 0, this.iss = B.email || B.iss, this.sub = B.sub, this.additionalClaims = B.additionalClaims, typeof B.scope === "object") this.scope = B.scope.join(" ");
        else this.scope = B.scope;
        if (this.eagerRefreshThresholdMillis = B.eagerRefreshThresholdMillis, B.transporter) this.transporter = B.transporter
    }, uqB = async function A() {
        var B, Q;
        let Z = Math.floor(new Date().getTime() / 1000),
            D = this.additionalClaims || {},
            G = Object.assign({
                iss: this.iss,
                scope: this.scope,
                aud: cqB,
                exp: Z + 3600,
                iat: Z,
                sub: this.sub
            }, D),
            F = H98.sign({
                header: {
                    alg: "RS256"
                },
                payload: G,
                secret: this.key
            });
        try {
            let I = await this.transporter.request({
                method: "POST",
                url: cqB,
                data: {
                    grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer",
                    assertion: F
                },
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                },
                responseType: "json",
                retryConfig: {
                    httpMethodsToRetry: ["POST"]
                }
            });
            return this.rawToken = I.data, this.expiresAt = I.data.expires_in === null || I.data.expires_in === void 0 ? void 0 : (Z + I.data.expires_in) * 1000, this.rawToken
        } catch (I) {
            this.rawToken = void 0, this.tokenExpires = void 0;
            let Y = I.response && ((B = I.response) === null || B === void 0 ? void 0 : B.data) ? (Q = I.response) === null || Q === void 0 ? void 0 : Q.data : {};
            if (Y.error) {
                let W = Y.error_description ? `: ${Y.error_description}` : "";
                I.message = `${Y.error}${W}`
            }
            throw I
        }
    }
});
var rw0 = E((nqB) => {
    Object.defineProperty(nqB, "__esModule", {
        value: !0
    });
    nqB.JWTAccess = void 0;
    var w98 = pw0(),
        $98 = Xv(),
        iqB = {
            alg: "RS256",
            typ: "JWT"
        };
    class sw0 {
        constructor(A, B, Q, Z) {
            this.cache = new $98.LRUCache({
                capacity: 500,
                maxAge: 3600000
            }), this.email = A, this.key = B, this.keyId = Q, this.eagerRefreshThresholdMillis = Z !== null && Z !== void 0 ? Z : 300000
        }
        getCachedKey(A, B) {
            let Q = A;
            if (B && Array.isArray(B) && B.length) Q = A ? `${A}_${B.join("_")}` : `${B.join("_")}`;
            else if (typeof B === "string") Q = A ? `${A}_${B}` : B;
            if (!Q) throw Error("Scopes or url must be provided");
            return Q
        }
        getRequestHeaders(A, B, Q) {
            let Z = this.getCachedKey(A, Q),
                D = this.cache.get(Z),
                G = Date.now();
            if (D && D.expiration - G > this.eagerRefreshThresholdMillis) return D.headers;
            let F = Math.floor(Date.now() / 1000),
                I = sw0.getExpirationTime(F),
                Y;
            if (Array.isArray(Q)) Q = Q.join(" ");
            if (Q) Y = {
                iss: this.email,
                sub: this.email,
                scope: Q,
                exp: I,
                iat: F
            };
            else Y = {
                iss: this.email,
                sub: this.email,
                aud: A,
                exp: I,
                iat: F
            };
            if (B) {
                for (let C in Y)
                    if (B[C]) throw new Error(`The '${C}' property is not allowed when passing additionalClaims. This claim is included in the JWT by default.`)
            }
            let W = this.keyId ? {
                    ...iqB,
                    kid: this.keyId
                } : iqB,
                J = Object.assign(Y, B),
                V = {
                    Authorization: `Bearer ${w98.sign({header:W,payload:J,secret:this.key})}`
                };
            return this.cache.set(Z, {
                expiration: I * 1000,
                headers: V
            }), V
        }
        static getExpirationTime(A) {
            return A + 3600
        }
        fromJSON(A) {
            if (!A) throw new Error("Must pass in a JSON object containing the service account auth settings.");
            if (!A.client_email) throw new Error("The incoming JSON object does not contain a client_email field");
            if (!A.private_key) throw new Error("The incoming JSON object does not contain a private_key field");
            this.email = A.client_email, this.key = A.private_key, this.keyId = A.private_key_id, this.projectId = A.project_id
        }
        fromStream(A, B) {
            if (B) this.fromStreamAsync(A).then(() => B(), B);
            else return this.fromStreamAsync(A)
        }
        fromStreamAsync(A) {
            return new Promise((B, Q) => {
                if (!A) Q(new Error("Must pass in a stream containing the service account auth settings."));
                let Z = "";
                A.setEncoding("utf8").on("data", (D) => Z += D).on("error", Q).on("end", () => {
                    try {
                        let D = JSON.parse(Z);
                        this.fromJSON(D), B()
                    } catch (D) {
                        Q(D)
                    }
                })
            })
        }
    }
    nqB.JWTAccess = sw0
});
var tw0 = E((rqB) => {
    Object.defineProperty(rqB, "__esModule", {
        value: !0
    });
    rqB.JWT = void 0;
    var sqB = pqB(),
        q98 = rw0(),
        N98 = sm(),
        ox1 = cM();
    class ow0 extends N98.OAuth2Client {
        constructor(A, B, Q, Z, D, G) {
            let F = A && typeof A === "object" ? A : {
                email: A,
                keyFile: B,
                key: Q,
                keyId: G,
                scopes: Z,
                subject: D
            };
            super(F);
            this.email = F.email, this.keyFile = F.keyFile, this.key = F.key, this.keyId = F.keyId, this.scopes = F.scopes, this.subject = F.subject, this.additionalClaims = F.additionalClaims, this.credentials = {
                refresh_token: "jwt-placeholder",
                expiry_date: 1
            }
        }
        createScoped(A) {
            let B = new ow0(this);
            return B.scopes = A, B
        }
        async getRequestMetadataAsync(A) {
            A = this.defaultServicePath ? `https://${this.defaultServicePath}/` : A;
            let B = !this.hasUserScopes() && A || this.useJWTAccessWithScope && this.hasAnyScopes() || this.universeDomain !== ox1.DEFAULT_UNIVERSE;
            if (this.subject && this.universeDomain !== ox1.DEFAULT_UNIVERSE) throw new RangeError(`Service Account user is configured for the credential. Domain-wide delegation is not supported in universes other than ${ox1.DEFAULT_UNIVERSE}`);
            if (!this.apiKey && B)
                if (this.additionalClaims && this.additionalClaims.target_audience) {
                    let {
                        tokens: Q
                    } = await this.refreshToken();
                    return {
                        headers: this.addSharedMetadataHeaders({
                            Authorization: `Bearer ${Q.id_token}`
                        })
                    }
                } else {
                    if (!this.access) this.access = new q98.JWTAccess(this.email, this.key, this.keyId, this.eagerRefreshThresholdMillis);
                    let Q;
                    if (this.hasUserScopes()) Q = this.scopes;
                    else if (!A) Q = this.defaultScopes;
                    let Z = this.useJWTAccessWithScope || this.universeDomain !== ox1.DEFAULT_UNIVERSE,
                        D = await this.access.getRequestHeaders(A !== null && A !== void 0 ? A : void 0, this.additionalClaims, Z ? Q : void 0);
                    return {
                        headers: this.addSharedMetadataHeaders(D)
                    }
                }
            else if (this.hasAnyScopes() || this.apiKey) return super.getRequestMetadataAsync(A);
            else return {
                headers: {}
            }
        }
        async fetchIdToken(A) {
            let B = new sqB.GoogleToken({
                iss: this.email,
                sub: this.subject,
                scope: this.scopes || this.defaultScopes,
                keyFile: this.keyFile,
                key: this.key,
                additionalClaims: {
                    target_audience: A
                },
                transporter: this.transporter
            });
            if (await B.getToken({
                    forceRefresh: !0
                }), !B.idToken) throw new Error("Unknown error: Failed to fetch ID token");
            return B.idToken
        }
        hasUserScopes() {
            if (!this.scopes) return !1;
            return this.scopes.length > 0
        }
        hasAnyScopes() {
            if (this.scopes && this.scopes.length > 0) return !0;
            if (this.defaultScopes && this.defaultScopes.length > 0) return !0;
            return !1
        }
        authorize(A) {
            if (A) this.authorizeAsync().then((B) => A(null, B), A);
            else return this.authorizeAsync()
        }
        async authorizeAsync() {
            let A = await this.refreshToken();
            if (!A) throw new Error("No result returned");
            return this.credentials = A.tokens, this.credentials.refresh_token = "jwt-placeholder", this.key = this.gtoken.key, this.email = this.gtoken.iss, A.tokens
        }
        async refreshTokenNoCache(A) {
            let B = this.createGToken(),
                Z = {
                    access_token: (await B.getToken({
                        forceRefresh: this.isTokenExpiring()
                    })).access_token,
                    token_type: "Bearer",
                    expiry_date: B.expiresAt,
                    id_token: B.idToken
                };
            return this.emit("tokens", Z), {
                res: null,
                tokens: Z
            }
        }
        createGToken() {
            if (!this.gtoken) this.gtoken = new sqB.GoogleToken({
                iss: this.email,
                sub: this.subject,
                scope: this.scopes || this.defaultScopes,
                keyFile: this.keyFile,
                key: this.key,
                additionalClaims: this.additionalClaims,
                transporter: this.transporter
            });
            return this.gtoken
        }
        fromJSON(A) {
            if (!A) throw new Error("Must pass in a JSON object containing the service account auth settings.");
            if (!A.client_email) throw new Error("The incoming JSON object does not contain a client_email field");
            if (!A.private_key) throw new Error("The incoming JSON object does not contain a private_key field");
            this.email = A.client_email, this.key = A.private_key, this.keyId = A.private_key_id, this.projectId = A.project_id, this.quotaProjectId = A.quota_project_id, this.universeDomain = A.universe_domain || this.universeDomain
        }
        fromStream(A, B) {
            if (B) this.fromStreamAsync(A).then(() => B(), B);
            else return this.fromStreamAsync(A)
        }
        fromStreamAsync(A) {
            return new Promise((B, Q) => {
                if (!A) throw new Error("Must pass in a stream containing the service account auth settings.");
                let Z = "";
                A.setEncoding("utf8").on("error", Q).on("data", (D) => Z += D).on("end", () => {
                    try {
                        let D = JSON.parse(Z);
                        this.fromJSON(D), B()
                    } catch (D) {
                        Q(D)
                    }
                })
            })
        }
        fromAPIKey(A) {
            if (typeof A !== "string") throw new Error("Must provide an API Key string.");
            this.apiKey = A
        }
        async getCredentials() {
            if (this.key) return {
                private_key: this.key,
                client_email: this.email
            };
            else if (this.keyFile) {
                let B = await this.createGToken().getCredentials(this.keyFile);
                return {
                    private_key: B.privateKey,
                    client_email: B.clientEmail
                }
            }
            throw new Error("A key or a keyFile must be provided to getCredentials.")
        }
    }
    rqB.JWT = ow0
});