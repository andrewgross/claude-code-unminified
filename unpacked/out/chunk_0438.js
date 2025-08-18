/* chunk:438 bytes:[10394659, 10414248) size:19589 source:unpacked-cli.js */
var FLB = E((eY) => {
    var Kv = eY && eY.__classPrivateFieldGet || function(A, B, Q, Z) {
            if (Q === "a" && !Z) throw new TypeError("Private accessor was defined without a getter");
            if (typeof B === "function" ? A !== B || !Z : !B.has(A)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
            return Q === "m" ? Z : Q === "a" ? Z.call(A) : Z ? Z.value : B.get(A)
        },
        BLB = eY && eY.__classPrivateFieldSet || function(A, B, Q, Z, D) {
            if (Z === "m") throw new TypeError("Private method is not writable");
            if (Z === "a" && !D) throw new TypeError("Private accessor was defined without a setter");
            if (typeof B === "function" ? A !== B || !D : !B.has(A)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
            return Z === "a" ? D.call(A, Q) : D ? D.value = Q : B.set(A, Q), Q
        },
        Hv, g11, u11, GLB;
    Object.defineProperty(eY, "__esModule", {
        value: !0
    });
    eY.GoogleAuth = eY.GoogleAuthExceptionMessages = eY.CLOUD_SDK_CLIENT_ID = void 0;
    var kQ8 = W1("child_process"),
        DG1 = W1("fs"),
        QG1 = pD1(),
        yQ8 = W1("os"),
        _$0 = W1("path"),
        _Q8 = R11(),
        xQ8 = nD1(),
        vQ8 = vw0(),
        bQ8 = bw0(),
        fQ8 = fw0(),
        f11 = tw0(),
        QLB = ew0(),
        h11 = A$0(),
        hQ8 = j$0(),
        ZG1 = Cv(),
        y$0 = cM(),
        ZLB = ALB(),
        DLB = Xv();
    eY.CLOUD_SDK_CLIENT_ID = "764086051850-6qr4p6gpi6hn506pt8ejuq83di341hur.apps.googleusercontent.com";
    eY.GoogleAuthExceptionMessages = {
        API_KEY_WITH_CREDENTIALS: "API Keys and Credentials are mutually exclusive authentication methods and cannot be used together.",
        NO_PROJECT_ID_FOUND: `Unable to detect a Project Id in the current environment. 
To learn more about authentication and Google APIs, visit: 
https://cloud.google.com/docs/authentication/getting-started`,
        NO_CREDENTIALS_FOUND: `Unable to find credentials in current environment. 
To learn more about authentication and Google APIs, visit: 
https://cloud.google.com/docs/authentication/getting-started`,
        NO_ADC_FOUND: "Could not load the default credentials. Browse to https://cloud.google.com/docs/authentication/getting-started for more information.",
        NO_UNIVERSE_DOMAIN_FOUND: `Unable to detect a Universe Domain in the current environment.
To learn more about Universe Domain retrieval, visit: 
https://cloud.google.com/compute/docs/metadata/predefined-metadata-keys`
    };
    class x$0 {
        get isGCE() {
            return this.checkIsGCE
        }
        constructor(A = {}) {
            if (Hv.add(this), this.checkIsGCE = void 0, this.jsonContent = null, this.cachedCredential = null, g11.set(this, null), this.clientOptions = {}, this._cachedProjectId = A.projectId || null, this.cachedCredential = A.authClient || null, this.keyFilename = A.keyFilename || A.keyFile, this.scopes = A.scopes, this.clientOptions = A.clientOptions || {}, this.jsonContent = A.credentials || null, this.apiKey = A.apiKey || this.clientOptions.apiKey || null, this.apiKey && (this.jsonContent || this.clientOptions.credentials)) throw new RangeError(eY.GoogleAuthExceptionMessages.API_KEY_WITH_CREDENTIALS);
            if (A.universeDomain) this.clientOptions.universeDomain = A.universeDomain
        }
        setGapicJWTValues(A) {
            A.defaultServicePath = this.defaultServicePath, A.useJWTAccessWithScope = this.useJWTAccessWithScope, A.defaultScopes = this.defaultScopes
        }
        getProjectId(A) {
            if (A) this.getProjectIdAsync().then((B) => A(null, B), A);
            else return this.getProjectIdAsync()
        }
        async getProjectIdOptional() {
            try {
                return await this.getProjectId()
            } catch (A) {
                if (A instanceof Error && A.message === eY.GoogleAuthExceptionMessages.NO_PROJECT_ID_FOUND) return null;
                else throw A
            }
        }
        async findAndCacheProjectId() {
            let A = null;
            if (A || (A = await this.getProductionProjectId()), A || (A = await this.getFileProjectId()), A || (A = await this.getDefaultServiceProjectId()), A || (A = await this.getGCEProjectId()), A || (A = await this.getExternalAccountClientProjectId()), A) return this._cachedProjectId = A, A;
            else throw new Error(eY.GoogleAuthExceptionMessages.NO_PROJECT_ID_FOUND)
        }
        async getProjectIdAsync() {
            if (this._cachedProjectId) return this._cachedProjectId;
            if (!this._findProjectIdPromise) this._findProjectIdPromise = this.findAndCacheProjectId();
            return this._findProjectIdPromise
        }
        async getUniverseDomainFromMetadataServer() {
            var A;
            let B;
            try {
                B = await QG1.universe("universe-domain"), B || (B = y$0.DEFAULT_UNIVERSE)
            } catch (Q) {
                if (Q && ((A = Q === null || Q === void 0 ? void 0 : Q.response) === null || A === void 0 ? void 0 : A.status) === 404) B = y$0.DEFAULT_UNIVERSE;
                else throw Q
            }
            return B
        }
        async getUniverseDomain() {
            let A = DLB.originalOrCamelOptions(this.clientOptions).get("universe_domain");
            try {
                A !== null && A !== void 0 || (A = (await this.getClient()).universeDomain)
            } catch (B) {
                A !== null && A !== void 0 || (A = y$0.DEFAULT_UNIVERSE)
            }
            return A
        }
        getAnyScopes() {
            return this.scopes || this.defaultScopes
        }
        getApplicationDefault(A = {}, B) {
            let Q;
            if (typeof A === "function") B = A;
            else Q = A;
            if (B) this.getApplicationDefaultAsync(Q).then((Z) => B(null, Z.credential, Z.projectId), B);
            else return this.getApplicationDefaultAsync(Q)
        }
        async getApplicationDefaultAsync(A = {}) {
            if (this.cachedCredential) return await Kv(this, Hv, "m", u11).call(this, this.cachedCredential, null);
            let B;
            if (B = await this._tryGetApplicationCredentialsFromEnvironmentVariable(A), B) {
                if (B instanceof f11.JWT) B.scopes = this.scopes;
                else if (B instanceof ZG1.BaseExternalAccountClient) B.scopes = this.getAnyScopes();
                return await Kv(this, Hv, "m", u11).call(this, B)
            }
            if (B = await this._tryGetApplicationCredentialsFromWellKnownFile(A), B) {
                if (B instanceof f11.JWT) B.scopes = this.scopes;
                else if (B instanceof ZG1.BaseExternalAccountClient) B.scopes = this.getAnyScopes();
                return await Kv(this, Hv, "m", u11).call(this, B)
            }
            if (await this._checkIsGCE()) return A.scopes = this.getAnyScopes(), await Kv(this, Hv, "m", u11).call(this, new vQ8.Compute(A));
            throw new Error(eY.GoogleAuthExceptionMessages.NO_ADC_FOUND)
        }
        async _checkIsGCE() {
            if (this.checkIsGCE === void 0) this.checkIsGCE = QG1.getGCPResidency() || await QG1.isAvailable();
            return this.checkIsGCE
        }
        async _tryGetApplicationCredentialsFromEnvironmentVariable(A) {
            let B = process.env.GOOGLE_APPLICATION_CREDENTIALS || process.env.google_application_credentials;
            if (!B || B.length === 0) return null;
            try {
                return this._getApplicationCredentialsFromFilePath(B, A)
            } catch (Q) {
                if (Q instanceof Error) Q.message = `Unable to read the credential file specified by the GOOGLE_APPLICATION_CREDENTIALS environment variable: ${Q.message}`;
                throw Q
            }
        }
        async _tryGetApplicationCredentialsFromWellKnownFile(A) {
            let B = null;
            if (this._isWindows()) B = process.env.APPDATA;
            else {
                let Z = process.env.HOME;
                if (Z) B = _$0.join(Z, ".config")
            }
            if (B) {
                if (B = _$0.join(B, "gcloud", "application_default_credentials.json"), !DG1.existsSync(B)) B = null
            }
            if (!B) return null;
            return await this._getApplicationCredentialsFromFilePath(B, A)
        }
        async _getApplicationCredentialsFromFilePath(A, B = {}) {
            if (!A || A.length === 0) throw new Error("The file path is invalid.");
            try {
                if (A = DG1.realpathSync(A), !DG1.lstatSync(A).isFile()) throw new Error
            } catch (Z) {
                if (Z instanceof Error) Z.message = `The file at ${A} does not exist, or it is not a file. ${Z.message}`;
                throw Z
            }
            let Q = DG1.createReadStream(A);
            return this.fromStream(Q, B)
        }
        fromImpersonatedJSON(A) {
            var B, Q, Z, D;
            if (!A) throw new Error("Must pass in a JSON object containing an  impersonated refresh token");
            if (A.type !== h11.IMPERSONATED_ACCOUNT_TYPE) throw new Error(`The incoming JSON object does not have the "${h11.IMPERSONATED_ACCOUNT_TYPE}" type`);
            if (!A.source_credentials) throw new Error("The incoming JSON object does not contain a source_credentials field");
            if (!A.service_account_impersonation_url) throw new Error("The incoming JSON object does not contain a service_account_impersonation_url field");
            let G = this.fromJSON(A.source_credentials);
            if (((B = A.service_account_impersonation_url) === null || B === void 0 ? void 0 : B.length) > 256) throw new RangeError(`Target principal is too long: ${A.service_account_impersonation_url}`);
            let F = (Z = (Q = /(?<target>[^/]+):(generateAccessToken|generateIdToken)$/.exec(A.service_account_impersonation_url)) === null || Q === void 0 ? void 0 : Q.groups) === null || Z === void 0 ? void 0 : Z.target;
            if (!F) throw new RangeError(`Cannot extract target principal from ${A.service_account_impersonation_url}`);
            let I = (D = this.getAnyScopes()) !== null && D !== void 0 ? D : [];
            return new h11.Impersonated({
                ...A,
                sourceClient: G,
                targetPrincipal: F,
                targetScopes: Array.isArray(I) ? I : [I]
            })
        }
        fromJSON(A, B = {}) {
            let Q, Z = DLB.originalOrCamelOptions(B).get("universe_domain");
            if (A.type === QLB.USER_REFRESH_ACCOUNT_TYPE) Q = new QLB.UserRefreshClient(B), Q.fromJSON(A);
            else if (A.type === h11.IMPERSONATED_ACCOUNT_TYPE) Q = this.fromImpersonatedJSON(A);
            else if (A.type === ZG1.EXTERNAL_ACCOUNT_TYPE) Q = hQ8.ExternalAccountClient.fromJSON(A, B), Q.scopes = this.getAnyScopes();
            else if (A.type === ZLB.EXTERNAL_ACCOUNT_AUTHORIZED_USER_TYPE) Q = new ZLB.ExternalAccountAuthorizedUserClient(A, B);
            else B.scopes = this.scopes, Q = new f11.JWT(B), this.setGapicJWTValues(Q), Q.fromJSON(A);
            if (Z) Q.universeDomain = Z;
            return Q
        }
        _cacheClientFromJSON(A, B) {
            let Q = this.fromJSON(A, B);
            return this.jsonContent = A, this.cachedCredential = Q, Q
        }
        fromStream(A, B = {}, Q) {
            let Z = {};
            if (typeof B === "function") Q = B;
            else Z = B;
            if (Q) this.fromStreamAsync(A, Z).then((D) => Q(null, D), Q);
            else return this.fromStreamAsync(A, Z)
        }
        fromStreamAsync(A, B) {
            return new Promise((Q, Z) => {
                if (!A) throw new Error("Must pass in a stream containing the Google auth settings.");
                let D = [];
                A.setEncoding("utf8").on("error", Z).on("data", (G) => D.push(G)).on("end", () => {
                    try {
                        try {
                            let G = JSON.parse(D.join("")),
                                F = this._cacheClientFromJSON(G, B);
                            return Q(F)
                        } catch (G) {
                            if (!this.keyFilename) throw G;
                            let F = new f11.JWT({
                                ...this.clientOptions,
                                keyFile: this.keyFilename
                            });
                            return this.cachedCredential = F, this.setGapicJWTValues(F), Q(F)
                        }
                    } catch (G) {
                        return Z(G)
                    }
                })
            })
        }
        fromAPIKey(A, B = {}) {
            return new f11.JWT({
                ...B,
                apiKey: A
            })
        }
        _isWindows() {
            let A = yQ8.platform();
            if (A && A.length >= 3) {
                if (A.substring(0, 3).toLowerCase() === "win") return !0
            }
            return !1
        }
        async getDefaultServiceProjectId() {
            return new Promise((A) => {
                kQ8.exec("gcloud config config-helper --format json", (B, Q) => {
                    if (!B && Q) try {
                        let Z = JSON.parse(Q).configuration.properties.core.project;
                        A(Z);
                        return
                    } catch (Z) {}
                    A(null)
                })
            })
        }
        getProductionProjectId() {
            return process.env.GCLOUD_PROJECT || process.env.GOOGLE_CLOUD_PROJECT || process.env.gcloud_project || process.env.google_cloud_project
        }
        async getFileProjectId() {
            if (this.cachedCredential) return this.cachedCredential.projectId;
            if (this.keyFilename) {
                let B = await this.getClient();
                if (B && B.projectId) return B.projectId
            }
            let A = await this._tryGetApplicationCredentialsFromEnvironmentVariable();
            if (A) return A.projectId;
            else return null
        }
        async getExternalAccountClientProjectId() {
            if (!this.jsonContent || this.jsonContent.type !== ZG1.EXTERNAL_ACCOUNT_TYPE) return null;
            return await (await this.getClient()).getProjectId()
        }
        async getGCEProjectId() {
            try {
                return await QG1.project("project-id")
            } catch (A) {
                return null
            }
        }
        getCredentials(A) {
            if (A) this.getCredentialsAsync().then((B) => A(null, B), A);
            else return this.getCredentialsAsync()
        }
        async getCredentialsAsync() {
            let A = await this.getClient();
            if (A instanceof h11.Impersonated) return {
                client_email: A.getTargetPrincipal()
            };
            if (A instanceof ZG1.BaseExternalAccountClient) {
                let B = A.getServiceAccountEmail();
                if (B) return {
                    client_email: B,
                    universe_domain: A.universeDomain
                }
            }
            if (this.jsonContent) return {
                client_email: this.jsonContent.client_email,
                private_key: this.jsonContent.private_key,
                universe_domain: this.jsonContent.universe_domain
            };
            if (await this._checkIsGCE()) {
                let [B, Q] = await Promise.all([QG1.instance("service-accounts/default/email"), this.getUniverseDomain()]);
                return {
                    client_email: B,
                    universe_domain: Q
                }
            }
            throw new Error(eY.GoogleAuthExceptionMessages.NO_CREDENTIALS_FOUND)
        }
        async getClient() {
            if (this.cachedCredential) return this.cachedCredential;
            BLB(this, g11, Kv(this, g11, "f") || Kv(this, Hv, "m", GLB).call(this), "f");
            try {
                return await Kv(this, g11, "f")
            } finally {
                BLB(this, g11, null, "f")
            }
        }
        async getIdTokenClient(A) {
            let B = await this.getClient();
            if (!("fetchIdToken" in B)) throw new Error("Cannot fetch ID token in this environment, use GCE or set the GOOGLE_APPLICATION_CREDENTIALS environment variable to a service account credentials JSON file.");
            return new bQ8.IdTokenClient({
                targetAudience: A,
                idTokenProvider: B
            })
        }
        async getAccessToken() {
            return (await (await this.getClient()).getAccessToken()).token
        }
        async getRequestHeaders(A) {
            return (await this.getClient()).getRequestHeaders(A)
        }
        async authorizeRequest(A) {
            A = A || {};
            let B = A.url || A.uri,
                Z = await (await this.getClient()).getRequestHeaders(B);
            return A.headers = Object.assign(A.headers || {}, Z), A
        }
        async request(A) {
            return (await this.getClient()).request(A)
        }
        getEnv() {
            return fQ8.getEnv()
        }
        async sign(A, B) {
            let Q = await this.getClient(),
                Z = await this.getUniverseDomain();
            if (B = B || `https://iamcredentials.${Z}/v1/projects/-/serviceAccounts/`, Q instanceof h11.Impersonated) return (await Q.sign(A)).signedBlob;
            let D = _Q8.createCrypto();
            if (Q instanceof f11.JWT && Q.key) return await D.sign(Q.key, A);
            let G = await this.getCredentials();
            if (!G.client_email) throw new Error("Cannot sign data without `client_email`.");
            return this.signBlob(D, G.client_email, A, B)
        }
        async signBlob(A, B, Q, Z) {
            let D = new URL(Z + `${B}:signBlob`);
            return (await this.request({
                method: "POST",
                url: D.href,
                data: {
                    payload: A.encodeBase64StringUtf8(Q)
                },
                retry: !0,
                retryConfig: {
                    httpMethodsToRetry: ["POST"]
                }
            })).data.signedBlob
        }
    }
    eY.GoogleAuth = x$0;
    g11 = new WeakMap, Hv = new WeakSet, u11 = async function A(B, Q = process.env.GOOGLE_CLOUD_QUOTA_PROJECT || null) {
        let Z = await this.getProjectIdOptional();
        if (Q) B.quotaProjectId = Q;
        return this.cachedCredential = B, {
            credential: B,
            projectId: Z
        }
    }, GLB = async function A() {
        if (this.jsonContent) return this._cacheClientFromJSON(this.jsonContent, this.clientOptions);
        else if (this.keyFilename) {
            let B = _$0.resolve(this.keyFilename),
                Q = DG1.createReadStream(B);
            return await this.fromStreamAsync(Q, this.clientOptions)
        } else if (this.apiKey) {
            let B = await this.fromAPIKey(this.apiKey, this.clientOptions);
            B.scopes = this.scopes;
            let {
                credential: Q
            } = await Kv(this, Hv, "m", u11).call(this, B);
            return Q
        } else {
            let {
                credential: B
            } = await this.getApplicationDefaultAsync(this.clientOptions);
            return B
        }
    };
    x$0.DefaultTransporter = xQ8.DefaultTransporter
});