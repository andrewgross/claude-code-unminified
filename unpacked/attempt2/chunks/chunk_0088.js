/* chunk:88 bytes:[2191652, 2196191) size:4539 source:unpacked-cli.js */
var jN = E((oB5, iJA) => {
    var {
        defineProperty: Az1,
        getOwnPropertyDescriptor: QFQ,
        getOwnPropertyNames: ZFQ
    } = Object, DFQ = Object.prototype.hasOwnProperty, ao1 = (A, B) => Az1(A, "name", {
        value: B,
        configurable: !0
    }), GFQ = (A, B) => {
        for (var Q in B) Az1(A, Q, {
            get: B[Q],
            enumerable: !0
        })
    }, FFQ = (A, B, Q, Z) => {
        if (B && typeof B === "object" || typeof B === "function") {
            for (let D of ZFQ(B))
                if (!DFQ.call(A, D) && D !== Q) Az1(A, D, {
                    get: () => B[D],
                    enumerable: !(Z = QFQ(B, D)) || Z.enumerable
                })
        }
        return A
    }, IFQ = (A) => FFQ(Az1({}, "__esModule", {
        value: !0
    }), A), cJA = {};
    GFQ(cJA, {
        emitWarningIfUnsupportedVersion: () => YFQ,
        setCredentialFeature: () => lJA,
        setFeature: () => pJA,
        state: () => no1
    });
    iJA.exports = IFQ(cJA);
    var no1 = {
            warningEmitted: !1
        },
        YFQ = ao1((A) => {
            if (A && !no1.warningEmitted && parseInt(A.substring(1, A.indexOf("."))) < 18) no1.warningEmitted = !0, process.emitWarning(`NodeDeprecationWarning: The AWS SDK for JavaScript (v3) will
no longer support Node.js 16.x on January 6, 2025.

To continue receiving updates to AWS services, bug fixes, and security
updates please upgrade to a supported Node.js LTS version.

More information can be found at: https://a.co/74kJMmI`)
        }, "emitWarningIfUnsupportedVersion");

    function lJA(A, B, Q) {
        if (!A.$source) A.$source = {};
        return A.$source[B] = Q, A
    }
    ao1(lJA, "setCredentialFeature");

    function pJA(A, B, Q) {
        if (!A.__aws_sdk_context) A.__aws_sdk_context = {
            features: {}
        };
        else if (!A.__aws_sdk_context.features) A.__aws_sdk_context.features = {};
        A.__aws_sdk_context.features[B] = Q
    }
    ao1(pJA, "setFeature")
});
var so1 = E((tB5, AXA) => {
    var {
        defineProperty: Bz1,
        getOwnPropertyDescriptor: WFQ,
        getOwnPropertyNames: JFQ
    } = Object, XFQ = Object.prototype.hasOwnProperty, VFQ = (A, B) => Bz1(A, "name", {
        value: B,
        configurable: !0
    }), CFQ = (A, B) => {
        for (var Q in B) Bz1(A, Q, {
            get: B[Q],
            enumerable: !0
        })
    }, KFQ = (A, B, Q, Z) => {
        if (B && typeof B === "object" || typeof B === "function") {
            for (let D of JFQ(B))
                if (!XFQ.call(A, D) && D !== Q) Bz1(A, D, {
                    get: () => B[D],
                    enumerable: !(Z = WFQ(B, D)) || Z.enumerable
                })
        }
        return A
    }, HFQ = (A) => KFQ(Bz1({}, "__esModule", {
        value: !0
    }), A), nJA = {};
    CFQ(nJA, {
        ENV_ACCOUNT_ID: () => eJA,
        ENV_CREDENTIAL_SCOPE: () => tJA,
        ENV_EXPIRATION: () => oJA,
        ENV_KEY: () => aJA,
        ENV_SECRET: () => sJA,
        ENV_SESSION: () => rJA,
        fromEnv: () => UFQ
    });
    AXA.exports = HFQ(nJA);
    var zFQ = jN(),
        EFQ = A9(),
        aJA = "AWS_ACCESS_KEY_ID",
        sJA = "AWS_SECRET_ACCESS_KEY",
        rJA = "AWS_SESSION_TOKEN",
        oJA = "AWS_CREDENTIAL_EXPIRATION",
        tJA = "AWS_CREDENTIAL_SCOPE",
        eJA = "AWS_ACCOUNT_ID",
        UFQ = VFQ((A) => async () => {
            A?.logger?.debug("@aws-sdk/credential-provider-env - fromEnv");
            let B = process.env[aJA],
                Q = process.env[sJA],
                Z = process.env[rJA],
                D = process.env[oJA],
                G = process.env[tJA],
                F = process.env[eJA];
            if (B && Q) {
                let I = {
                    accessKeyId: B,
                    secretAccessKey: Q,
                    ...Z && {
                        sessionToken: Z
                    },
                    ...D && {
                        expiration: new Date(D)
                    },
                    ...G && {
                        credentialScope: G
                    },
                    ...F && {
                        accountId: F
                    }
                };
                return zFQ.setCredentialFeature(I, "CREDENTIALS_ENV_VARS", "g"), I
            }
            throw new EFQ.CredentialsProviderError("Unable to find environment variable credentials.", {
                logger: A?.logger
            })
        }, "fromEnv")
});