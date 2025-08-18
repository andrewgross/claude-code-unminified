/* chunk:108 bytes:[2532243, 2535483) size:3240 source:unpacked-cli.js */
var He1 = E((vQ5, sUA) => {
    var {
        defineProperty: EE1,
        getOwnPropertyDescriptor: QEQ,
        getOwnPropertyNames: ZEQ
    } = Object, DEQ = Object.prototype.hasOwnProperty, UE1 = (A, B) => EE1(A, "name", {
        value: B,
        configurable: !0
    }), GEQ = (A, B) => {
        for (var Q in B) EE1(A, Q, {
            get: B[Q],
            enumerable: !0
        })
    }, FEQ = (A, B, Q, Z) => {
        if (B && typeof B === "object" || typeof B === "function") {
            for (let D of ZEQ(B))
                if (!DEQ.call(A, D) && D !== Q) EE1(A, D, {
                    get: () => B[D],
                    enumerable: !(Z = QEQ(B, D)) || Z.enumerable
                })
        }
        return A
    }, IEQ = (A) => FEQ(EE1({}, "__esModule", {
        value: !0
    }), A), mUA = {};
    GEQ(mUA, {
        AlgorithmId: () => pUA,
        EndpointURLScheme: () => lUA,
        FieldPosition: () => iUA,
        HttpApiKeyAuthLocation: () => cUA,
        HttpAuthLocation: () => dUA,
        IniSectionType: () => nUA,
        RequestHandlerProtocol: () => aUA,
        SMITHY_CONTEXT_KEY: () => VEQ,
        getDefaultClientConfiguration: () => JEQ,
        resolveDefaultRuntimeConfig: () => XEQ
    });
    sUA.exports = IEQ(mUA);
    var dUA = ((A) => {
            return A.HEADER = "header", A.QUERY = "query", A
        })(dUA || {}),
        cUA = ((A) => {
            return A.HEADER = "header", A.QUERY = "query", A
        })(cUA || {}),
        lUA = ((A) => {
            return A.HTTP = "http", A.HTTPS = "https", A
        })(lUA || {}),
        pUA = ((A) => {
            return A.MD5 = "md5", A.CRC32 = "crc32", A.CRC32C = "crc32c", A.SHA1 = "sha1", A.SHA256 = "sha256", A
        })(pUA || {}),
        YEQ = UE1((A) => {
            let B = [];
            if (A.sha256 !== void 0) B.push({
                algorithmId: () => "sha256",
                checksumConstructor: () => A.sha256
            });
            if (A.md5 != null) B.push({
                algorithmId: () => "md5",
                checksumConstructor: () => A.md5
            });
            return {
                addChecksumAlgorithm(Q) {
                    B.push(Q)
                },
                checksumAlgorithms() {
                    return B
                }
            }
        }, "getChecksumConfiguration"),
        WEQ = UE1((A) => {
            let B = {};
            return A.checksumAlgorithms().forEach((Q) => {
                B[Q.algorithmId()] = Q.checksumConstructor()
            }), B
        }, "resolveChecksumRuntimeConfig"),
        JEQ = UE1((A) => {
            return YEQ(A)
        }, "getDefaultClientConfiguration"),
        XEQ = UE1((A) => {
            return WEQ(A)
        }, "resolveDefaultRuntimeConfig"),
        iUA = ((A) => {
            return A[A.HEADER = 0] = "HEADER", A[A.TRAILER = 1] = "TRAILER", A
        })(iUA || {}),
        VEQ = "__smithy_context",
        nUA = ((A) => {
            return A.PROFILE = "profile", A.SSO_SESSION = "sso-session", A.SERVICES = "services", A
        })(nUA || {}),
        aUA = ((A) => {
            return A.HTTP_0_9 = "http/0.9", A.HTTP_1_0 = "http/1.0", A.TDS_8_0 = "tds/8.0", A
        })(aUA || {})
});