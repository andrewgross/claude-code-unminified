/* chunk:436 bytes:[10371501, 10389679) size:18178 source:unpacked-cli.js */
var kNB = E((v11) => {
    var JS = v11 && v11.__classPrivateFieldGet || function(A, B, Q, Z) {
            if (Q === "a" && !Z) throw new TypeError("Private accessor was defined without a getter");
            if (typeof B === "function" ? A !== B || !Z : !B.has(A)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
            return Q === "m" ? Z : Q === "a" ? Z.call(A) : Z ? Z.value : B.get(A)
        },
        k$, z$0, PNB, SNB, Av1, E$0;
    Object.defineProperty(v11, "__esModule", {
        value: !0
    });
    v11.DefaultAwsSecurityCredentialsSupplier = void 0;
    class jNB {
        constructor(A) {
            k$.add(this), this.regionUrl = A.regionUrl, this.securityCredentialsUrl = A.securityCredentialsUrl, this.imdsV2SessionTokenUrl = A.imdsV2SessionTokenUrl, this.additionalGaxiosOptions = A.additionalGaxiosOptions
        }
        async getAwsRegion(A) {
            if (JS(this, k$, "a", Av1)) return JS(this, k$, "a", Av1);
            let B = {};
            if (!JS(this, k$, "a", Av1) && this.imdsV2SessionTokenUrl) B["x-aws-ec2-metadata-token"] = await JS(this, k$, "m", z$0).call(this, A.transporter);
            if (!this.regionUrl) throw new Error('Unable to determine AWS region due to missing "options.credential_source.region_url"');
            let Q = {
                    ...this.additionalGaxiosOptions,
                    url: this.regionUrl,
                    method: "GET",
                    responseType: "text",
                    headers: B
                },
                Z = await A.transporter.request(Q);
            return Z.data.substr(0, Z.data.length - 1)
        }
        async getAwsSecurityCredentials(A) {
            if (JS(this, k$, "a", E$0)) return JS(this, k$, "a", E$0);
            let B = {};
            if (this.imdsV2SessionTokenUrl) B["x-aws-ec2-metadata-token"] = await JS(this, k$, "m", z$0).call(this, A.transporter);
            let Q = await JS(this, k$, "m", PNB).call(this, B, A.transporter),
                Z = await JS(this, k$, "m", SNB).call(this, Q, B, A.transporter);
            return {
                accessKeyId: Z.AccessKeyId,
                secretAccessKey: Z.SecretAccessKey,
                token: Z.Token
            }
        }
    }
    v11.DefaultAwsSecurityCredentialsSupplier = jNB;
    k$ = new WeakSet, z$0 = async function A(B) {
        let Q = {
            ...this.additionalGaxiosOptions,
            url: this.imdsV2SessionTokenUrl,
            method: "PUT",
            responseType: "text",
            headers: {
                "x-aws-ec2-metadata-token-ttl-seconds": "300"
            }
        };
        return (await B.request(Q)).data
    }, PNB = async function A(B, Q) {
        if (!this.securityCredentialsUrl) throw new Error('Unable to determine AWS role name due to missing "options.credential_source.url"');
        let Z = {
            ...this.additionalGaxiosOptions,
            url: this.securityCredentialsUrl,
            method: "GET",
            responseType: "text",
            headers: B
        };
        return (await Q.request(Z)).data
    }, SNB = async function A(B, Q, Z) {
        return (await Z.request({
            ...this.additionalGaxiosOptions,
            url: `${this.securityCredentialsUrl}/${B}`,
            responseType: "json",
            headers: Q
        })).data
    }, Av1 = function A() {
        return process.env.AWS_REGION || process.env.AWS_DEFAULT_REGION || null
    }, E$0 = function A() {
        if (process.env.AWS_ACCESS_KEY_ID && process.env.AWS_SECRET_ACCESS_KEY) return {
            accessKeyId: process.env.AWS_ACCESS_KEY_ID,
            secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
            token: process.env.AWS_SESSION_TOKEN
        };
        return null
    }
});
var U$0 = E((b11) => {
    var BQ8 = b11 && b11.__classPrivateFieldGet || function(A, B, Q, Z) {
            if (Q === "a" && !Z) throw new TypeError("Private accessor was defined without a getter");
            if (typeof B === "function" ? A !== B || !Z : !B.has(A)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
            return Q === "m" ? Z : Q === "a" ? Z.call(A) : Z ? Z.value : B.get(A)
        },
        Bv1, _NB;
    Object.defineProperty(b11, "__esModule", {
        value: !0
    });
    b11.AwsClient = void 0;
    var QQ8 = H$0(),
        ZQ8 = Cv(),
        DQ8 = kNB(),
        yNB = Xv();
    class BG1 extends ZQ8.BaseExternalAccountClient {
        constructor(A, B) {
            super(A, B);
            let Q = yNB.originalOrCamelOptions(A),
                Z = Q.get("credential_source"),
                D = Q.get("aws_security_credentials_supplier");
            if (!Z && !D) throw new Error("A credential source or AWS security credentials supplier must be specified.");
            if (Z && D) throw new Error("Only one of credential source or AWS security credentials supplier can be specified.");
            if (D) this.awsSecurityCredentialsSupplier = D, this.regionalCredVerificationUrl = BQ8(Bv1, Bv1, "f", _NB), this.credentialSourceType = "programmatic";
            else {
                let G = yNB.originalOrCamelOptions(Z);
                this.environmentId = G.get("environment_id");
                let F = G.get("region_url"),
                    I = G.get("url"),
                    Y = G.get("imdsv2_session_token_url");
                this.awsSecurityCredentialsSupplier = new DQ8.DefaultAwsSecurityCredentialsSupplier({
                    regionUrl: F,
                    securityCredentialsUrl: I,
                    imdsV2SessionTokenUrl: Y
                }), this.regionalCredVerificationUrl = G.get("regional_cred_verification_url"), this.credentialSourceType = "aws", this.validateEnvironmentId()
            }
            this.awsRequestSigner = null, this.region = ""
        }
        validateEnvironmentId() {
            var A;
            let B = (A = this.environmentId) === null || A === void 0 ? void 0 : A.match(/^(aws)(\d+)$/);
            if (!B || !this.regionalCredVerificationUrl) throw new Error('No valid AWS "credential_source" provided');
            else if (parseInt(B[2], 10) !== 1) throw new Error(`aws version "${B[2]}" is not supported in the current build.`)
        }
        async retrieveSubjectToken() {
            if (!this.awsRequestSigner) this.region = await this.awsSecurityCredentialsSupplier.getAwsRegion(this.supplierContext), this.awsRequestSigner = new QQ8.AwsRequestSigner(async () => {
                return this.awsSecurityCredentialsSupplier.getAwsSecurityCredentials(this.supplierContext)
            }, this.region);
            let A = await this.awsRequestSigner.getRequestOptions({
                    ...Bv1.RETRY_CONFIG,
                    url: this.regionalCredVerificationUrl.replace("{region}", this.region),
                    method: "POST"
                }),
                B = [],
                Q = Object.assign({
                    "x-goog-cloud-target-resource": this.audience
                }, A.headers);
            for (let Z in Q) B.push({
                key: Z,
                value: Q[Z]
            });
            return encodeURIComponent(JSON.stringify({
                url: A.url,
                method: A.method,
                headers: B
            }))
        }
    }
    b11.AwsClient = BG1;
    Bv1 = BG1;
    _NB = {
        value: "https://sts.{region}.amazonaws.com?Action=GetCallerIdentity&Version=2011-06-15"
    };
    BG1.AWS_EC2_METADATA_IPV4_ADDRESS = "169.254.169.254";
    BG1.AWS_EC2_METADATA_IPV6_ADDRESS = "fd00:ec2::254"
});
var O$0 = E((bNB) => {
    Object.defineProperty(bNB, "__esModule", {
        value: !0
    });
    bNB.InvalidSubjectTokenError = bNB.InvalidMessageFieldError = bNB.InvalidCodeFieldError = bNB.InvalidTokenTypeFieldError = bNB.InvalidExpirationTimeFieldError = bNB.InvalidSuccessFieldError = bNB.InvalidVersionFieldError = bNB.ExecutableResponseError = bNB.ExecutableResponse = void 0;
    var Qv1 = "urn:ietf:params:oauth:token-type:saml2",
        w$0 = "urn:ietf:params:oauth:token-type:id_token",
        $$0 = "urn:ietf:params:oauth:token-type:jwt";
    class xNB {
        constructor(A) {
            if (!A.version) throw new q$0("Executable response must contain a 'version' field.");
            if (A.success === void 0) throw new N$0("Executable response must contain a 'success' field.");
            if (this.version = A.version, this.success = A.success, this.success) {
                if (this.expirationTime = A.expiration_time, this.tokenType = A.token_type, this.tokenType !== Qv1 && this.tokenType !== w$0 && this.tokenType !== $$0) throw new L$0(`Executable response must contain a 'token_type' field when successful and it must be one of ${w$0}, ${$$0}, or ${Qv1}.`);
                if (this.tokenType === Qv1) {
                    if (!A.saml_response) throw new Zv1(`Executable response must contain a 'saml_response' field when token_type=${Qv1}.`);
                    this.subjectToken = A.saml_response
                } else {
                    if (!A.id_token) throw new Zv1(`Executable response must contain a 'id_token' field when token_type=${w$0} or ${$$0}.`);
                    this.subjectToken = A.id_token
                }
            } else {
                if (!A.code) throw new M$0("Executable response must contain a 'code' field when unsuccessful.");
                if (!A.message) throw new R$0("Executable response must contain a 'message' field when unsuccessful.");
                this.errorCode = A.code, this.errorMessage = A.message
            }
        }
        isValid() {
            return !this.isExpired() && this.success
        }
        isExpired() {
            return this.expirationTime !== void 0 && this.expirationTime < Math.round(Date.now() / 1000)
        }
    }
    bNB.ExecutableResponse = xNB;
    class XS extends Error {
        constructor(A) {
            super(A);
            Object.setPrototypeOf(this, new.target.prototype)
        }
    }
    bNB.ExecutableResponseError = XS;
    class q$0 extends XS {}
    bNB.InvalidVersionFieldError = q$0;
    class N$0 extends XS {}
    bNB.InvalidSuccessFieldError = N$0;
    class vNB extends XS {}
    bNB.InvalidExpirationTimeFieldError = vNB;
    class L$0 extends XS {}
    bNB.InvalidTokenTypeFieldError = L$0;
    class M$0 extends XS {}
    bNB.InvalidCodeFieldError = M$0;
    class R$0 extends XS {}
    bNB.InvalidMessageFieldError = R$0;
    class Zv1 extends XS {}
    bNB.InvalidSubjectTokenError = Zv1
});
var uNB = E((hNB) => {
    Object.defineProperty(hNB, "__esModule", {
        value: !0
    });
    hNB.PluggableAuthHandler = void 0;
    var CQ8 = Dv1(),
        rm = O$0(),
        KQ8 = W1("child_process"),
        T$0 = W1("fs");
    class P$0 {
        constructor(A) {
            if (!A.command) throw new Error("No command provided.");
            if (this.commandComponents = P$0.parseCommand(A.command), this.timeoutMillis = A.timeoutMillis, !this.timeoutMillis) throw new Error("No timeoutMillis provided.");
            this.outputFile = A.outputFile
        }
        retrieveResponseFromExecutable(A) {
            return new Promise((B, Q) => {
                let Z = KQ8.spawn(this.commandComponents[0], this.commandComponents.slice(1), {
                        env: {
                            ...process.env,
                            ...Object.fromEntries(A)
                        }
                    }),
                    D = "";
                Z.stdout.on("data", (F) => {
                    D += F
                }), Z.stderr.on("data", (F) => {
                    D += F
                });
                let G = setTimeout(() => {
                    return Z.removeAllListeners(), Z.kill(), Q(new Error("The executable failed to finish within the timeout specified."))
                }, this.timeoutMillis);
                Z.on("close", (F) => {
                    if (clearTimeout(G), F === 0) try {
                        let I = JSON.parse(D),
                            Y = new rm.ExecutableResponse(I);
                        return B(Y)
                    } catch (I) {
                        if (I instanceof rm.ExecutableResponseError) return Q(I);
                        return Q(new rm.ExecutableResponseError(`The executable returned an invalid response: ${D}`))
                    } else return Q(new CQ8.ExecutableError(D, F.toString()))
                })
            })
        }
        async retrieveCachedResponse() {
            if (!this.outputFile || this.outputFile.length === 0) return;
            let A;
            try {
                A = await T$0.promises.realpath(this.outputFile)
            } catch (Q) {
                return
            }
            if (!(await T$0.promises.lstat(A)).isFile()) return;
            let B = await T$0.promises.readFile(A, {
                encoding: "utf8"
            });
            if (B === "") return;
            try {
                let Q = JSON.parse(B);
                if (new rm.ExecutableResponse(Q).isValid()) return new rm.ExecutableResponse(Q);
                return
            } catch (Q) {
                if (Q instanceof rm.ExecutableResponseError) throw Q;
                throw new rm.ExecutableResponseError(`The output file contained an invalid response: ${B}`)
            }
        }
        static parseCommand(A) {
            let B = A.match(/(?:[^\s"]+|"[^"]*")+/g);
            if (!B) throw new Error(`Provided command: "${A}" could not be parsed.`);
            for (let Q = 0; Q < B.length; Q++)
                if (B[Q][0] === '"' && B[Q].slice(-1) === '"') B[Q] = B[Q].slice(1, -1);
            return B
        }
    }
    hNB.PluggableAuthHandler = P$0
});
var Dv1 = E((pNB) => {
    Object.defineProperty(pNB, "__esModule", {
        value: !0
    });
    pNB.PluggableAuthClient = pNB.ExecutableError = void 0;
    var HQ8 = Cv(),
        zQ8 = O$0(),
        EQ8 = uNB();
    class S$0 extends Error {
        constructor(A, B) {
            super(`The executable failed with exit code: ${B} and error message: ${A}.`);
            this.code = B, Object.setPrototypeOf(this, new.target.prototype)
        }
    }
    pNB.ExecutableError = S$0;
    var UQ8 = 30000,
        mNB = 5000,
        dNB = 120000,
        wQ8 = "GOOGLE_EXTERNAL_ACCOUNT_ALLOW_EXECUTABLES",
        cNB = 1;
    class lNB extends HQ8.BaseExternalAccountClient {
        constructor(A, B) {
            super(A, B);
            if (!A.credential_source.executable) throw new Error('No valid Pluggable Auth "credential_source" provided.');
            if (this.command = A.credential_source.executable.command, !this.command) throw new Error('No valid Pluggable Auth "credential_source" provided.');
            if (A.credential_source.executable.timeout_millis === void 0) this.timeoutMillis = UQ8;
            else if (this.timeoutMillis = A.credential_source.executable.timeout_millis, this.timeoutMillis < mNB || this.timeoutMillis > dNB) throw new Error(`Timeout must be between ${mNB} and ${dNB} milliseconds.`);
            this.outputFile = A.credential_source.executable.output_file, this.handler = new EQ8.PluggableAuthHandler({
                command: this.command,
                timeoutMillis: this.timeoutMillis,
                outputFile: this.outputFile
            }), this.credentialSourceType = "executable"
        }
        async retrieveSubjectToken() {
            if (process.env[wQ8] !== "1") throw new Error("Pluggable Auth executables need to be explicitly allowed to run by setting the GOOGLE_EXTERNAL_ACCOUNT_ALLOW_EXECUTABLES environment Variable to 1.");
            let A = void 0;
            if (this.outputFile) A = await this.handler.retrieveCachedResponse();
            if (!A) {
                let B = new Map;
                if (B.set("GOOGLE_EXTERNAL_ACCOUNT_AUDIENCE", this.audience), B.set("GOOGLE_EXTERNAL_ACCOUNT_TOKEN_TYPE", this.subjectTokenType), B.set("GOOGLE_EXTERNAL_ACCOUNT_INTERACTIVE", "0"), this.outputFile) B.set("GOOGLE_EXTERNAL_ACCOUNT_OUTPUT_FILE", this.outputFile);
                let Q = this.getServiceAccountEmail();
                if (Q) B.set("GOOGLE_EXTERNAL_ACCOUNT_IMPERSONATED_EMAIL", Q);
                A = await this.handler.retrieveResponseFromExecutable(B)
            }
            if (A.version > cNB) throw new Error(`Version of executable is not currently supported, maximum supported version is ${cNB}.`);
            if (!A.success) throw new S$0(A.errorMessage, A.errorCode);
            if (this.outputFile) {
                if (!A.expirationTime) throw new zQ8.InvalidExpirationTimeFieldError("The executable response must contain the `expiration_time` field for successful responses when an output_file has been specified in the configuration.")
            }
            if (A.isExpired()) throw new Error("Executable response is expired.");
            return A.subjectToken
        }
    }
    pNB.PluggableAuthClient = lNB
});
var j$0 = E((aNB) => {
    Object.defineProperty(aNB, "__esModule", {
        value: !0
    });
    aNB.ExternalAccountClient = void 0;
    var qQ8 = Cv(),
        NQ8 = K$0(),
        LQ8 = U$0(),
        MQ8 = Dv1();
    class nNB {
        constructor() {
            throw new Error("ExternalAccountClients should be initialized via: ExternalAccountClient.fromJSON(), directly via explicit constructors, eg. new AwsClient(options), new IdentityPoolClient(options), newPluggableAuthClientOptions, or via new GoogleAuth(options).getClient()")
        }
        static fromJSON(A, B) {
            var Q, Z;
            if (A && A.type === qQ8.EXTERNAL_ACCOUNT_TYPE)
                if ((Q = A.credential_source) === null || Q === void 0 ? void 0 : Q.environment_id) return new LQ8.AwsClient(A, B);
                else if ((Z = A.credential_source) === null || Z === void 0 ? void 0 : Z.executable) return new MQ8.PluggableAuthClient(A, B);
            else return new NQ8.IdentityPoolClient(A, B);
            else return null
        }
    }
    aNB.ExternalAccountClient = nNB
});