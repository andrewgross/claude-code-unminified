/* chunk:435 bytes:[10351870, 10371500) size:19630 source:unpacked-cli.js */
var Cv = E((PI) => {
    var D$0 = PI && PI.__classPrivateFieldGet || function(A, B, Q, Z) {
            if (Q === "a" && !Z) throw new TypeError("Private accessor was defined without a getter");
            if (typeof B === "function" ? A !== B || !Z : !B.has(A)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
            return Q === "m" ? Z : Q === "a" ? Z.call(A) : Z ? Z.value : B.get(A)
        },
        JNB = PI && PI.__classPrivateFieldSet || function(A, B, Q, Z, D) {
            if (Z === "m") throw new TypeError("Private method is not writable");
            if (Z === "a" && !D) throw new TypeError("Private accessor was defined without a setter");
            if (typeof B === "function" ? A !== B || !D : !B.has(A)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
            return Z === "a" ? D.call(A, Q) : D ? D.value = Q : B.set(A, Q), Q
        },
        G$0, x11, VNB;
    Object.defineProperty(PI, "__esModule", {
        value: !0
    });
    PI.BaseExternalAccountClient = PI.DEFAULT_UNIVERSE = PI.CLOUD_RESOURCE_MANAGER = PI.EXTERNAL_ACCOUNT_TYPE = PI.EXPIRATION_TIME_OFFSET = void 0;
    var b98 = W1("stream"),
        f98 = cM(),
        h98 = Z$0(),
        XNB = Xv(),
        g98 = "urn:ietf:params:oauth:grant-type:token-exchange",
        u98 = "urn:ietf:params:oauth:token-type:access_token",
        F$0 = "https://www.googleapis.com/auth/cloud-platform",
        m98 = 3600;
    PI.EXPIRATION_TIME_OFFSET = 300000;
    PI.EXTERNAL_ACCOUNT_TYPE = "external_account";
    PI.CLOUD_RESOURCE_MANAGER = "https://cloudresourcemanager.googleapis.com/v1/projects/";
    var d98 = "//iam\\.googleapis\\.com/locations/[^/]+/workforcePools/[^/]+/providers/.+",
        c98 = "https://sts.{universeDomain}/v1/token",
        l98 = Rw0(),
        p98 = cM();
    Object.defineProperty(PI, "DEFAULT_UNIVERSE", {
        enumerable: !0,
        get: function() {
            return p98.DEFAULT_UNIVERSE
        }
    });
    class ex1 extends f98.AuthClient {
        constructor(A, B) {
            var Q;
            super({
                ...A,
                ...B
            });
            G$0.add(this), x11.set(this, null);
            let Z = XNB.originalOrCamelOptions(A),
                D = Z.get("type");
            if (D && D !== PI.EXTERNAL_ACCOUNT_TYPE) throw new Error(`Expected "${PI.EXTERNAL_ACCOUNT_TYPE}" type but received "${A.type}"`);
            let G = Z.get("client_id"),
                F = Z.get("client_secret"),
                I = (Q = Z.get("token_url")) !== null && Q !== void 0 ? Q : c98.replace("{universeDomain}", this.universeDomain),
                Y = Z.get("subject_token_type"),
                W = Z.get("workforce_pool_user_project"),
                J = Z.get("service_account_impersonation_url"),
                X = Z.get("service_account_impersonation"),
                V = XNB.originalOrCamelOptions(X).get("token_lifetime_seconds");
            if (this.cloudResourceManagerURL = new URL(Z.get("cloud_resource_manager_url") || `https://cloudresourcemanager.${this.universeDomain}/v1/projects/`), G) this.clientAuth = {
                confidentialClientType: "basic",
                clientId: G,
                clientSecret: F
            };
            this.stsCredential = new h98.StsCredentials(I, this.clientAuth), this.scopes = Z.get("scopes") || [F$0], this.cachedAccessToken = null, this.audience = Z.get("audience"), this.subjectTokenType = Y, this.workforcePoolUserProject = W;
            let C = new RegExp(d98);
            if (this.workforcePoolUserProject && !this.audience.match(C)) throw new Error("workforcePoolUserProject should not be set for non-workforce pool credentials.");
            if (this.serviceAccountImpersonationUrl = J, this.serviceAccountImpersonationLifetime = V, this.serviceAccountImpersonationLifetime) this.configLifetimeRequested = !0;
            else this.configLifetimeRequested = !1, this.serviceAccountImpersonationLifetime = m98;
            this.projectNumber = this.getProjectNumber(this.audience), this.supplierContext = {
                audience: this.audience,
                subjectTokenType: this.subjectTokenType,
                transporter: this.transporter
            }
        }
        getServiceAccountEmail() {
            var A;
            if (this.serviceAccountImpersonationUrl) {
                if (this.serviceAccountImpersonationUrl.length > 256) throw new RangeError(`URL is too long: ${this.serviceAccountImpersonationUrl}`);
                let Q = /serviceAccounts\/(?<email>[^:]+):generateAccessToken$/.exec(this.serviceAccountImpersonationUrl);
                return ((A = Q === null || Q === void 0 ? void 0 : Q.groups) === null || A === void 0 ? void 0 : A.email) || null
            }
            return null
        }
        setCredentials(A) {
            super.setCredentials(A), this.cachedAccessToken = A
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
        async getProjectId() {
            let A = this.projectNumber || this.workforcePoolUserProject;
            if (this.projectId) return this.projectId;
            else if (A) {
                let B = await this.getRequestHeaders(),
                    Q = await this.transporter.request({
                        ...ex1.RETRY_CONFIG,
                        headers: B,
                        url: `${this.cloudResourceManagerURL.toString()}${A}`,
                        responseType: "json"
                    });
                return this.projectId = Q.data.projectId, this.projectId
            }
            return null
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
                        F = D.config.data instanceof b98.Readable;
                    if (!B && (G === 401 || G === 403) && !F && this.forceRefreshOnFailure) return await this.refreshAccessTokenAsync(), await this.requestAsync(A, !0)
                }
                throw Z
            }
            return Q
        }
        async refreshAccessTokenAsync() {
            JNB(this, x11, D$0(this, x11, "f") || D$0(this, G$0, "m", VNB).call(this), "f");
            try {
                return await D$0(this, x11, "f")
            } finally {
                JNB(this, x11, null, "f")
            }
        }
        getProjectNumber(A) {
            let B = A.match(/\/projects\/([^/]+)/);
            if (!B) return null;
            return B[1]
        }
        async getImpersonatedAccessToken(A) {
            let B = {
                    ...ex1.RETRY_CONFIG,
                    url: this.serviceAccountImpersonationUrl,
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${A}`
                    },
                    data: {
                        scope: this.getScopesArray(),
                        lifetime: this.serviceAccountImpersonationLifetime + "s"
                    },
                    responseType: "json"
                },
                Q = await this.transporter.request(B),
                Z = Q.data;
            return {
                access_token: Z.accessToken,
                expiry_date: new Date(Z.expireTime).getTime(),
                res: Q
            }
        }
        isExpired(A) {
            let B = new Date().getTime();
            return A.expiry_date ? B >= A.expiry_date - this.eagerRefreshThresholdMillis : !1
        }
        getScopesArray() {
            if (typeof this.scopes === "string") return [this.scopes];
            return this.scopes || [F$0]
        }
        getMetricsHeaderValue() {
            let A = process.version.replace(/^v/, ""),
                B = this.serviceAccountImpersonationUrl !== void 0,
                Q = this.credentialSourceType ? this.credentialSourceType : "unknown";
            return `gl-node/${A} auth/${l98.version} google-byoid-sdk source/${Q} sa-impersonation/${B} config-lifetime/${this.configLifetimeRequested}`
        }
    }
    PI.BaseExternalAccountClient = ex1;
    x11 = new WeakMap, G$0 = new WeakSet, VNB = async function A() {
        let B = await this.retrieveSubjectToken(),
            Q = {
                grantType: g98,
                audience: this.audience,
                requestedTokenType: u98,
                subjectToken: B,
                subjectTokenType: this.subjectTokenType,
                scope: this.serviceAccountImpersonationUrl ? [F$0] : this.getScopesArray()
            },
            Z = !this.clientAuth && this.workforcePoolUserProject ? {
                userProject: this.workforcePoolUserProject
            } : void 0,
            D = {
                "x-goog-api-client": this.getMetricsHeaderValue()
            },
            G = await this.stsCredential.exchangeToken(Q, D, Z);
        if (this.serviceAccountImpersonationUrl) this.cachedAccessToken = await this.getImpersonatedAccessToken(G.access_token);
        else if (G.expires_in) this.cachedAccessToken = {
            access_token: G.access_token,
            expiry_date: new Date().getTime() + G.expires_in * 1000,
            res: G.res
        };
        else this.cachedAccessToken = {
            access_token: G.access_token,
            res: G.res
        };
        return this.credentials = {}, Object.assign(this.credentials, this.cachedAccessToken), delete this.credentials.res, this.emit("tokens", {
            refresh_token: null,
            expiry_date: this.cachedAccessToken.expiry_date,
            access_token: this.cachedAccessToken.access_token,
            token_type: "Bearer",
            id_token: null
        }), this.cachedAccessToken
    }
});
var zNB = E((KNB) => {
    var I$0, Y$0, W$0;
    Object.defineProperty(KNB, "__esModule", {
        value: !0
    });
    KNB.FileSubjectTokenSupplier = void 0;
    var J$0 = W1("util"),
        X$0 = W1("fs"),
        i98 = J$0.promisify((I$0 = X$0.readFile) !== null && I$0 !== void 0 ? I$0 : () => {}),
        n98 = J$0.promisify((Y$0 = X$0.realpath) !== null && Y$0 !== void 0 ? Y$0 : () => {}),
        a98 = J$0.promisify((W$0 = X$0.lstat) !== null && W$0 !== void 0 ? W$0 : () => {});
    class CNB {
        constructor(A) {
            this.filePath = A.filePath, this.formatType = A.formatType, this.subjectTokenFieldName = A.subjectTokenFieldName
        }
        async getSubjectToken(A) {
            let B = this.filePath;
            try {
                if (B = await n98(B), !(await a98(B)).isFile()) throw new Error
            } catch (D) {
                if (D instanceof Error) D.message = `The file at ${B} does not exist, or it is not a file. ${D.message}`;
                throw D
            }
            let Q, Z = await i98(B, {
                encoding: "utf8"
            });
            if (this.formatType === "text") Q = Z;
            else if (this.formatType === "json" && this.subjectTokenFieldName) Q = JSON.parse(Z)[this.subjectTokenFieldName];
            if (!Q) throw new Error("Unable to parse the subject_token from the credential_source file");
            return Q
        }
    }
    KNB.FileSubjectTokenSupplier = CNB
});
var $NB = E((UNB) => {
    Object.defineProperty(UNB, "__esModule", {
        value: !0
    });
    UNB.UrlSubjectTokenSupplier = void 0;
    class ENB {
        constructor(A) {
            this.url = A.url, this.formatType = A.formatType, this.subjectTokenFieldName = A.subjectTokenFieldName, this.headers = A.headers, this.additionalGaxiosOptions = A.additionalGaxiosOptions
        }
        async getSubjectToken(A) {
            let B = {
                    ...this.additionalGaxiosOptions,
                    url: this.url,
                    method: "GET",
                    headers: this.headers,
                    responseType: this.formatType
                },
                Q;
            if (this.formatType === "text") Q = (await A.transporter.request(B)).data;
            else if (this.formatType === "json" && this.subjectTokenFieldName) Q = (await A.transporter.request(B)).data[this.subjectTokenFieldName];
            if (!Q) throw new Error("Unable to parse the subject_token from the credential_source URL");
            return Q
        }
    }
    UNB.UrlSubjectTokenSupplier = ENB
});
var K$0 = E((qNB) => {
    Object.defineProperty(qNB, "__esModule", {
        value: !0
    });
    qNB.IdentityPoolClient = void 0;
    var s98 = Cv(),
        V$0 = Xv(),
        r98 = zNB(),
        o98 = $NB();
    class C$0 extends s98.BaseExternalAccountClient {
        constructor(A, B) {
            super(A, B);
            let Q = V$0.originalOrCamelOptions(A),
                Z = Q.get("credential_source"),
                D = Q.get("subject_token_supplier");
            if (!Z && !D) throw new Error("A credential source or subject token supplier must be specified.");
            if (Z && D) throw new Error("Only one of credential source or subject token supplier can be specified.");
            if (D) this.subjectTokenSupplier = D, this.credentialSourceType = "programmatic";
            else {
                let G = V$0.originalOrCamelOptions(Z),
                    F = V$0.originalOrCamelOptions(G.get("format")),
                    I = F.get("type") || "text",
                    Y = F.get("subject_token_field_name");
                if (I !== "json" && I !== "text") throw new Error(`Invalid credential_source format "${I}"`);
                if (I === "json" && !Y) throw new Error("Missing subject_token_field_name for JSON credential_source format");
                let W = G.get("file"),
                    J = G.get("url"),
                    X = G.get("headers");
                if (W && J) throw new Error('No valid Identity Pool "credential_source" provided, must be either file or url.');
                else if (W && !J) this.credentialSourceType = "file", this.subjectTokenSupplier = new r98.FileSubjectTokenSupplier({
                    filePath: W,
                    formatType: I,
                    subjectTokenFieldName: Y
                });
                else if (!W && J) this.credentialSourceType = "url", this.subjectTokenSupplier = new o98.UrlSubjectTokenSupplier({
                    url: J,
                    formatType: I,
                    subjectTokenFieldName: Y,
                    headers: X,
                    additionalGaxiosOptions: C$0.RETRY_CONFIG
                });
                else throw new Error('No valid Identity Pool "credential_source" provided, must be either file or url.')
            }
        }
        async retrieveSubjectToken() {
            return this.subjectTokenSupplier.getSubjectToken(this.supplierContext)
        }
    }
    qNB.IdentityPoolClient = C$0
});
var H$0 = E((ONB) => {
    Object.defineProperty(ONB, "__esModule", {
        value: !0
    });
    ONB.AwsRequestSigner = void 0;
    var MNB = R11(),
        LNB = "AWS4-HMAC-SHA256",
        t98 = "aws4_request";
    class RNB {
        constructor(A, B) {
            this.getCredentials = A, this.region = B, this.crypto = MNB.createCrypto()
        }
        async getRequestOptions(A) {
            if (!A.url) throw new Error('"url" is required in "amzOptions"');
            let B = typeof A.data === "object" ? JSON.stringify(A.data) : A.data,
                Q = A.url,
                Z = A.method || "GET",
                D = A.body || B,
                G = A.headers,
                F = await this.getCredentials(),
                I = new URL(Q),
                Y = await AQ8({
                    crypto: this.crypto,
                    host: I.host,
                    canonicalUri: I.pathname,
                    canonicalQuerystring: I.search.substr(1),
                    method: Z,
                    region: this.region,
                    securityCredentials: F,
                    requestPayload: D,
                    additionalAmzHeaders: G
                }),
                W = Object.assign(Y.amzDate ? {
                    "x-amz-date": Y.amzDate
                } : {}, {
                    Authorization: Y.authorizationHeader,
                    host: I.host
                }, G || {});
            if (F.token) Object.assign(W, {
                "x-amz-security-token": F.token
            });
            let J = {
                url: Q,
                method: Z,
                headers: W
            };
            if (typeof D !== "undefined") J.body = D;
            return J
        }
    }
    ONB.AwsRequestSigner = RNB;
    async function AG1(A, B, Q) {
        return await A.signWithHmacSha256(B, Q)
    }
    async function e98(A, B, Q, Z, D) {
        let G = await AG1(A, `AWS4${B}`, Q),
            F = await AG1(A, G, Z),
            I = await AG1(A, F, D);
        return await AG1(A, I, "aws4_request")
    }
    async function AQ8(A) {
        let B = A.additionalAmzHeaders || {},
            Q = A.requestPayload || "",
            Z = A.host.split(".")[0],
            D = new Date,
            G = D.toISOString().replace(/[-:]/g, "").replace(/\.[0-9]+/, ""),
            F = D.toISOString().replace(/[-]/g, "").replace(/T.*/, ""),
            I = {};
        if (Object.keys(B).forEach((N) => {
                I[N.toLowerCase()] = B[N]
            }), A.securityCredentials.token) I["x-amz-security-token"] = A.securityCredentials.token;
        let Y = Object.assign({
                host: A.host
            }, I.date ? {} : {
                "x-amz-date": G
            }, I),
            W = "",
            J = Object.keys(Y).sort();
        J.forEach((N) => {
            W += `${N}:${Y[N]}
`
        });
        let X = J.join(";"),
            V = await A.crypto.sha256DigestHex(Q),
            C = `${A.method}
${A.canonicalUri}
${A.canonicalQuerystring}
${W}
${X}
${V}`,
            K = `${F}/${A.region}/${Z}/${t98}`,
            H = `${LNB}
${G}
${K}
` + await A.crypto.sha256DigestHex(C),
            z = await e98(A.crypto, A.securityCredentials.secretAccessKey, F, A.region, Z),
            $ = await AG1(A.crypto, z, H),
            L = `${LNB} Credential=${A.securityCredentials.accessKeyId}/${K}, SignedHeaders=${X}, Signature=${MNB.fromArrayBufferToHex($)}`;
        return {
            amzDate: I.date ? void 0 : G,
            authorizationHeader: L,
            canonicalQuerystring: A.canonicalQuerystring
        }
    }
});