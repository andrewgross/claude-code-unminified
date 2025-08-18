/* chunk:439 bytes:[10414249, 10434059) size:19810 source:unpacked-cli.js */
var JLB = E((YLB) => {
    Object.defineProperty(YLB, "__esModule", {
        value: !0
    });
    YLB.IAMAuth = void 0;
    class ILB {
        constructor(A, B) {
            this.selector = A, this.token = B, this.selector = A, this.token = B
        }
        getRequestHeaders() {
            return {
                "x-goog-iam-authority-selector": this.selector,
                "x-goog-iam-authorization-token": this.token
            }
        }
    }
    YLB.IAMAuth = ILB
});
var KLB = E((VLB) => {
    Object.defineProperty(VLB, "__esModule", {
        value: !0
    });
    VLB.DownscopedClient = VLB.EXPIRATION_TIME_OFFSET = VLB.MAX_ACCESS_BOUNDARY_RULES_COUNT = void 0;
    var gQ8 = W1("stream"),
        uQ8 = cM(),
        mQ8 = Z$0(),
        dQ8 = "urn:ietf:params:oauth:grant-type:token-exchange",
        cQ8 = "urn:ietf:params:oauth:token-type:access_token",
        lQ8 = "urn:ietf:params:oauth:token-type:access_token";
    VLB.MAX_ACCESS_BOUNDARY_RULES_COUNT = 10;
    VLB.EXPIRATION_TIME_OFFSET = 300000;
    class XLB extends uQ8.AuthClient {
        constructor(A, B, Q, Z) {
            super({
                ...Q,
                quotaProjectId: Z
            });
            if (this.authClient = A, this.credentialAccessBoundary = B, B.accessBoundary.accessBoundaryRules.length === 0) throw new Error("At least one access boundary rule needs to be defined.");
            else if (B.accessBoundary.accessBoundaryRules.length > VLB.MAX_ACCESS_BOUNDARY_RULES_COUNT) throw new Error(`The provided access boundary has more than ${VLB.MAX_ACCESS_BOUNDARY_RULES_COUNT} access boundary rules.`);
            for (let D of B.accessBoundary.accessBoundaryRules)
                if (D.availablePermissions.length === 0) throw new Error("At least one permission should be defined in access boundary rules.");
            this.stsCredential = new mQ8.StsCredentials(`https://sts.${this.universeDomain}/v1/token`), this.cachedDownscopedAccessToken = null
        }
        setCredentials(A) {
            if (!A.expiry_date) throw new Error("The access token expiry_date field is missing in the provided credentials.");
            super.setCredentials(A), this.cachedDownscopedAccessToken = A
        }
        async getAccessToken() {
            if (!this.cachedDownscopedAccessToken || this.isExpired(this.cachedDownscopedAccessToken)) await this.refreshAccessTokenAsync();
            return {
                token: this.cachedDownscopedAccessToken.access_token,
                expirationTime: this.cachedDownscopedAccessToken.expiry_date,
                res: this.cachedDownscopedAccessToken.res
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
                        F = D.config.data instanceof gQ8.Readable;
                    if (!B && (G === 401 || G === 403) && !F && this.forceRefreshOnFailure) return await this.refreshAccessTokenAsync(), await this.requestAsync(A, !0)
                }
                throw Z
            }
            return Q
        }
        async refreshAccessTokenAsync() {
            var A;
            let B = (await this.authClient.getAccessToken()).token,
                Q = {
                    grantType: dQ8,
                    requestedTokenType: cQ8,
                    subjectToken: B,
                    subjectTokenType: lQ8
                },
                Z = await this.stsCredential.exchangeToken(Q, void 0, this.credentialAccessBoundary),
                D = ((A = this.authClient.credentials) === null || A === void 0 ? void 0 : A.expiry_date) || null,
                G = Z.expires_in ? new Date().getTime() + Z.expires_in * 1000 : D;
            return this.cachedDownscopedAccessToken = {
                access_token: Z.access_token,
                expiry_date: G,
                res: Z.res
            }, this.credentials = {}, Object.assign(this.credentials, this.cachedDownscopedAccessToken), delete this.credentials.res, this.emit("tokens", {
                refresh_token: null,
                expiry_date: this.cachedDownscopedAccessToken.expiry_date,
                access_token: this.cachedDownscopedAccessToken.access_token,
                token_type: "Bearer",
                id_token: null
            }), this.cachedDownscopedAccessToken
        }
        isExpired(A) {
            let B = new Date().getTime();
            return A.expiry_date ? B >= A.expiry_date - this.eagerRefreshThresholdMillis : !1
        }
    }
    VLB.DownscopedClient = XLB
});
var ELB = E((HLB) => {
    Object.defineProperty(HLB, "__esModule", {
        value: !0
    });
    HLB.PassThroughClient = void 0;
    var iQ8 = cM();
    class b$0 extends iQ8.AuthClient {
        async request(A) {
            return this.transporter.request(A)
        }
        async getAccessToken() {
            return {}
        }
        async getRequestHeaders() {
            return {}
        }
    }
    HLB.PassThroughClient = b$0;
    var nQ8 = new b$0;
    nQ8.getAccessToken()
});
var qLB = E((u3) => {
    Object.defineProperty(u3, "__esModule", {
        value: !0
    });
    u3.GoogleAuth = u3.auth = u3.DefaultTransporter = u3.PassThroughClient = u3.ExecutableError = u3.PluggableAuthClient = u3.DownscopedClient = u3.BaseExternalAccountClient = u3.ExternalAccountClient = u3.IdentityPoolClient = u3.AwsRequestSigner = u3.AwsClient = u3.UserRefreshClient = u3.LoginTicket = u3.ClientAuthentication = u3.OAuth2Client = u3.CodeChallengeMethod = u3.Impersonated = u3.JWT = u3.JWTAccess = u3.IdTokenClient = u3.IAMAuth = u3.GCPEnv = u3.Compute = u3.DEFAULT_UNIVERSE = u3.AuthClient = u3.gaxios = u3.gcpMetadata = void 0;
    var ULB = FLB();
    Object.defineProperty(u3, "GoogleAuth", {
        enumerable: !0,
        get: function() {
            return ULB.GoogleAuth
        }
    });
    u3.gcpMetadata = pD1();
    u3.gaxios = R$();
    var wLB = cM();
    Object.defineProperty(u3, "AuthClient", {
        enumerable: !0,
        get: function() {
            return wLB.AuthClient
        }
    });
    Object.defineProperty(u3, "DEFAULT_UNIVERSE", {
        enumerable: !0,
        get: function() {
            return wLB.DEFAULT_UNIVERSE
        }
    });
    var aQ8 = vw0();
    Object.defineProperty(u3, "Compute", {
        enumerable: !0,
        get: function() {
            return aQ8.Compute
        }
    });
    var sQ8 = fw0();
    Object.defineProperty(u3, "GCPEnv", {
        enumerable: !0,
        get: function() {
            return sQ8.GCPEnv
        }
    });
    var rQ8 = JLB();
    Object.defineProperty(u3, "IAMAuth", {
        enumerable: !0,
        get: function() {
            return rQ8.IAMAuth
        }
    });
    var oQ8 = bw0();
    Object.defineProperty(u3, "IdTokenClient", {
        enumerable: !0,
        get: function() {
            return oQ8.IdTokenClient
        }
    });
    var tQ8 = rw0();
    Object.defineProperty(u3, "JWTAccess", {
        enumerable: !0,
        get: function() {
            return tQ8.JWTAccess
        }
    });
    var eQ8 = tw0();
    Object.defineProperty(u3, "JWT", {
        enumerable: !0,
        get: function() {
            return eQ8.JWT
        }
    });
    var A48 = A$0();
    Object.defineProperty(u3, "Impersonated", {
        enumerable: !0,
        get: function() {
            return A48.Impersonated
        }
    });
    var f$0 = sm();
    Object.defineProperty(u3, "CodeChallengeMethod", {
        enumerable: !0,
        get: function() {
            return f$0.CodeChallengeMethod
        }
    });
    Object.defineProperty(u3, "OAuth2Client", {
        enumerable: !0,
        get: function() {
            return f$0.OAuth2Client
        }
    });
    Object.defineProperty(u3, "ClientAuthentication", {
        enumerable: !0,
        get: function() {
            return f$0.ClientAuthentication
        }
    });
    var B48 = yw0();
    Object.defineProperty(u3, "LoginTicket", {
        enumerable: !0,
        get: function() {
            return B48.LoginTicket
        }
    });
    var Q48 = ew0();
    Object.defineProperty(u3, "UserRefreshClient", {
        enumerable: !0,
        get: function() {
            return Q48.UserRefreshClient
        }
    });
    var Z48 = U$0();
    Object.defineProperty(u3, "AwsClient", {
        enumerable: !0,
        get: function() {
            return Z48.AwsClient
        }
    });
    var D48 = H$0();
    Object.defineProperty(u3, "AwsRequestSigner", {
        enumerable: !0,
        get: function() {
            return D48.AwsRequestSigner
        }
    });
    var G48 = K$0();
    Object.defineProperty(u3, "IdentityPoolClient", {
        enumerable: !0,
        get: function() {
            return G48.IdentityPoolClient
        }
    });
    var F48 = j$0();
    Object.defineProperty(u3, "ExternalAccountClient", {
        enumerable: !0,
        get: function() {
            return F48.ExternalAccountClient
        }
    });
    var I48 = Cv();
    Object.defineProperty(u3, "BaseExternalAccountClient", {
        enumerable: !0,
        get: function() {
            return I48.BaseExternalAccountClient
        }
    });
    var Y48 = KLB();
    Object.defineProperty(u3, "DownscopedClient", {
        enumerable: !0,
        get: function() {
            return Y48.DownscopedClient
        }
    });
    var $LB = Dv1();
    Object.defineProperty(u3, "PluggableAuthClient", {
        enumerable: !0,
        get: function() {
            return $LB.PluggableAuthClient
        }
    });
    Object.defineProperty(u3, "ExecutableError", {
        enumerable: !0,
        get: function() {
            return $LB.ExecutableError
        }
    });
    var W48 = ELB();
    Object.defineProperty(u3, "PassThroughClient", {
        enumerable: !0,
        get: function() {
            return W48.PassThroughClient
        }
    });
    var J48 = nD1();
    Object.defineProperty(u3, "DefaultTransporter", {
        enumerable: !0,
        get: function() {
            return J48.DefaultTransporter
        }
    });
    var X48 = new ULB.GoogleAuth;
    u3.auth = X48
});
var IMB = E((WZ3, FMB) => {
    var GMB = W1("child_process"),
        QMB = GMB.spawn,
        i48 = GMB.exec;
    FMB.exports = function(A, B, Q) {
        if (typeof B === "function" && Q === void 0) Q = B, B = void 0;
        if (A = parseInt(A), Number.isNaN(A))
            if (Q) return Q(new Error("pid must be a number"));
            else throw new Error("pid must be a number");
        var Z = {},
            D = {};
        switch (Z[A] = [], D[A] = 1, process.platform) {
            case "win32":
                i48("taskkill /pid " + A + " /T /F", Q);
                break;
            case "darwin":
                e$0(A, Z, D, function(G) {
                    return QMB("pgrep", ["-P", G])
                }, function() {
                    ZMB(Z, B, Q)
                });
                break;
            default:
                e$0(A, Z, D, function(G) {
                    return QMB("ps", ["-o", "pid", "--no-headers", "--ppid", G])
                }, function() {
                    ZMB(Z, B, Q)
                });
                break
        }
    };

    function ZMB(A, B, Q) {
        var Z = {};
        try {
            Object.keys(A).forEach(function(D) {
                if (A[D].forEach(function(G) {
                        if (!Z[G]) DMB(G, B), Z[G] = 1
                    }), !Z[D]) DMB(D, B), Z[D] = 1
            })
        } catch (D) {
            if (Q) return Q(D);
            else throw D
        }
        if (Q) return Q()
    }

    function DMB(A, B) {
        try {
            process.kill(parseInt(A, 10), B)
        } catch (Q) {
            if (Q.code !== "ESRCH") throw Q
        }
    }

    function e$0(A, B, Q, Z, D) {
        var G = Z(A),
            F = "";
        G.stdout.on("data", function(W) {
            var W = W.toString("ascii");
            F += W
        });
        var I = function(Y) {
            if (delete Q[A], Y != 0) {
                if (Object.keys(Q).length == 0) D();
                return
            }
            F.match(/\d+/g).forEach(function(W) {
                W = parseInt(W, 10), B[A].push(W), B[W] = [], Q[W] = 1, e$0(W, B, Q, Z, D)
            })
        };
        G.on("close", I)
    }
});
var vv1 = E((Q58) => {
    var B58 = [65534, 65535, 131070, 131071, 196606, 196607, 262142, 262143, 327678, 327679, 393214, 393215, 458750, 458751, 524286, 524287, 589822, 589823, 655358, 655359, 720894, 720895, 786430, 786431, 851966, 851967, 917502, 917503, 983038, 983039, 1048574, 1048575, 1114110, 1114111];
    Q58.REPLACEMENT_CHARACTER = "�";
    Q58.CODE_POINTS = {
        EOF: -1,
        NULL: 0,
        TABULATION: 9,
        CARRIAGE_RETURN: 13,
        LINE_FEED: 10,
        FORM_FEED: 12,
        SPACE: 32,
        EXCLAMATION_MARK: 33,
        QUOTATION_MARK: 34,
        NUMBER_SIGN: 35,
        AMPERSAND: 38,
        APOSTROPHE: 39,
        HYPHEN_MINUS: 45,
        SOLIDUS: 47,
        DIGIT_0: 48,
        DIGIT_9: 57,
        SEMICOLON: 59,
        LESS_THAN_SIGN: 60,
        EQUALS_SIGN: 61,
        GREATER_THAN_SIGN: 62,
        QUESTION_MARK: 63,
        LATIN_CAPITAL_A: 65,
        LATIN_CAPITAL_F: 70,
        LATIN_CAPITAL_X: 88,
        LATIN_CAPITAL_Z: 90,
        RIGHT_SQUARE_BRACKET: 93,
        GRAVE_ACCENT: 96,
        LATIN_SMALL_A: 97,
        LATIN_SMALL_F: 102,
        LATIN_SMALL_X: 120,
        LATIN_SMALL_Z: 122,
        REPLACEMENT_CHARACTER: 65533
    };
    Q58.CODE_POINT_SEQUENCES = {
        DASH_DASH_STRING: [45, 45],
        DOCTYPE_STRING: [68, 79, 67, 84, 89, 80, 69],
        CDATA_START_STRING: [91, 67, 68, 65, 84, 65, 91],
        SCRIPT_STRING: [115, 99, 114, 105, 112, 116],
        PUBLIC_STRING: [80, 85, 66, 76, 73, 67],
        SYSTEM_STRING: [83, 89, 83, 84, 69, 77]
    };
    Q58.isSurrogate = function(A) {
        return A >= 55296 && A <= 57343
    };
    Q58.isSurrogatePair = function(A) {
        return A >= 56320 && A <= 57343
    };
    Q58.getSurrogatePairCodePoint = function(A, B) {
        return (A - 55296) * 1024 + 9216 + B
    };
    Q58.isControlCodePoint = function(A) {
        return A !== 32 && A !== 10 && A !== 13 && A !== 9 && A !== 12 && A >= 1 && A <= 31 || A >= 127 && A <= 159
    };
    Q58.isUndefinedCodePoint = function(A) {
        return A >= 64976 && A <= 65007 || B58.indexOf(A) > -1
    }
});
var bv1 = E((QF3, PRB) => {
    PRB.exports = {
        controlCharacterInInputStream: "control-character-in-input-stream",
        noncharacterInInputStream: "noncharacter-in-input-stream",
        surrogateInInputStream: "surrogate-in-input-stream",
        nonVoidHtmlElementStartTagWithTrailingSolidus: "non-void-html-element-start-tag-with-trailing-solidus",
        endTagWithAttributes: "end-tag-with-attributes",
        endTagWithTrailingSolidus: "end-tag-with-trailing-solidus",
        unexpectedSolidusInTag: "unexpected-solidus-in-tag",
        unexpectedNullCharacter: "unexpected-null-character",
        unexpectedQuestionMarkInsteadOfTagName: "unexpected-question-mark-instead-of-tag-name",
        invalidFirstCharacterOfTagName: "invalid-first-character-of-tag-name",
        unexpectedEqualsSignBeforeAttributeName: "unexpected-equals-sign-before-attribute-name",
        missingEndTagName: "missing-end-tag-name",
        unexpectedCharacterInAttributeName: "unexpected-character-in-attribute-name",
        unknownNamedCharacterReference: "unknown-named-character-reference",
        missingSemicolonAfterCharacterReference: "missing-semicolon-after-character-reference",
        unexpectedCharacterAfterDoctypeSystemIdentifier: "unexpected-character-after-doctype-system-identifier",
        unexpectedCharacterInUnquotedAttributeValue: "unexpected-character-in-unquoted-attribute-value",
        eofBeforeTagName: "eof-before-tag-name",
        eofInTag: "eof-in-tag",
        missingAttributeValue: "missing-attribute-value",
        missingWhitespaceBetweenAttributes: "missing-whitespace-between-attributes",
        missingWhitespaceAfterDoctypePublicKeyword: "missing-whitespace-after-doctype-public-keyword",
        missingWhitespaceBetweenDoctypePublicAndSystemIdentifiers: "missing-whitespace-between-doctype-public-and-system-identifiers",
        missingWhitespaceAfterDoctypeSystemKeyword: "missing-whitespace-after-doctype-system-keyword",
        missingQuoteBeforeDoctypePublicIdentifier: "missing-quote-before-doctype-public-identifier",
        missingQuoteBeforeDoctypeSystemIdentifier: "missing-quote-before-doctype-system-identifier",
        missingDoctypePublicIdentifier: "missing-doctype-public-identifier",
        missingDoctypeSystemIdentifier: "missing-doctype-system-identifier",
        abruptDoctypePublicIdentifier: "abrupt-doctype-public-identifier",
        abruptDoctypeSystemIdentifier: "abrupt-doctype-system-identifier",
        cdataInHtmlContent: "cdata-in-html-content",
        incorrectlyOpenedComment: "incorrectly-opened-comment",
        eofInScriptHtmlCommentLikeText: "eof-in-script-html-comment-like-text",
        eofInDoctype: "eof-in-doctype",
        nestedComment: "nested-comment",
        abruptClosingOfEmptyComment: "abrupt-closing-of-empty-comment",
        eofInComment: "eof-in-comment",
        incorrectlyClosedComment: "incorrectly-closed-comment",
        eofInCdata: "eof-in-cdata",
        absenceOfDigitsInNumericCharacterReference: "absence-of-digits-in-numeric-character-reference",
        nullCharacterReference: "null-character-reference",
        surrogateCharacterReference: "surrogate-character-reference",
        characterReferenceOutsideUnicodeRange: "character-reference-outside-unicode-range",
        controlCharacterReference: "control-character-reference",
        noncharacterCharacterReference: "noncharacter-character-reference",
        missingWhitespaceBeforeDoctypeName: "missing-whitespace-before-doctype-name",
        missingDoctypeName: "missing-doctype-name",
        invalidCharacterSequenceAfterDoctypeName: "invalid-character-sequence-after-doctype-name",
        duplicateAttribute: "duplicate-attribute",
        nonConformingDoctype: "non-conforming-doctype",
        missingDoctype: "missing-doctype",
        misplacedDoctype: "misplaced-doctype",
        endTagWithoutMatchingOpenElement: "end-tag-without-matching-open-element",
        closingOfElementWithOpenChildElements: "closing-of-element-with-open-child-elements",
        disallowedContentInNoscriptInHead: "disallowed-content-in-noscript-in-head",
        openElementsLeftAfterEof: "open-elements-left-after-eof",
        abandonedHeadElementChild: "abandoned-head-element-child",
        misplacedStartTagForHeadElement: "misplaced-start-tag-for-head-element",
        nestedNoscriptInHead: "nested-noscript-in-head",
        eofInElementThatCanContainOnlyText: "eof-in-element-that-can-contain-only-text"
    }
});