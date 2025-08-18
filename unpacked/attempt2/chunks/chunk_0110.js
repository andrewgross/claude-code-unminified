/* chunk:110 bytes:[2569425, 2571157) size:1732 source:unpacked-cli.js */
var Se1 = E((KwA) => {
    Object.defineProperty(KwA, "__esModule", {
        value: !0
    });
    KwA.resolveHttpAuthSchemeConfig = KwA.defaultSSOOIDCHttpAuthSchemeProvider = KwA.defaultSSOOIDCHttpAuthSchemeParametersProvider = void 0;
    var MUQ = WI(),
        Pe1 = E5(),
        RUQ = async (A, B, Q) => {
            return {
                operation: Pe1.getSmithyContext(B).operation,
                region: await Pe1.normalizeProvider(A.region)() || (() => {
                    throw new Error("expected `region` to be configured for `aws.auth#sigv4`")
                })()
            }
        };
    KwA.defaultSSOOIDCHttpAuthSchemeParametersProvider = RUQ;

    function OUQ(A) {
        return {
            schemeId: "aws.auth#sigv4",
            signingProperties: {
                name: "sso-oauth",
                region: A.region
            },
            propertiesExtractor: (B, Q) => ({
                signingProperties: {
                    config: B,
                    context: Q
                }
            })
        }
    }

    function TUQ(A) {
        return {
            schemeId: "smithy.api#noAuth"
        }
    }
    var PUQ = (A) => {
        let B = [];
        switch (A.operation) {
            case "CreateToken": {
                B.push(TUQ(A));
                break
            }
            default:
                B.push(OUQ(A))
        }
        return B
    };
    KwA.defaultSSOOIDCHttpAuthSchemeProvider = PUQ;
    var SUQ = (A) => {
        let B = MUQ.resolveAwsSdkSigV4Config(A);
        return Object.assign(B, {
            authSchemePreference: Pe1.normalizeProvider(A.authSchemePreference ?? [])
        })
    };
    KwA.resolveHttpAuthSchemeConfig = SUQ
});