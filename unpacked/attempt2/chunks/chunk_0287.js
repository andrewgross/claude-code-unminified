/* chunk:287 bytes:[6100078, 6115181) size:15103 source:unpacked-cli.js */
var Mq2 = E((mL) => {
    var mp4 = mL && mL.__createBinding || (Object.create ? function(A, B, Q, Z) {
            if (Z === void 0) Z = Q;
            var D = Object.getOwnPropertyDescriptor(B, Q);
            if (!D || ("get" in D ? !B.__esModule : D.writable || D.configurable)) D = {
                enumerable: !0,
                get: function() {
                    return B[Q]
                }
            };
            Object.defineProperty(A, Z, D)
        } : function(A, B, Q, Z) {
            if (Z === void 0) Z = Q;
            A[Z] = B[Q]
        }),
        dp4 = mL && mL.__setModuleDefault || (Object.create ? function(A, B) {
            Object.defineProperty(A, "default", {
                enumerable: !0,
                value: B
            })
        } : function(A, B) {
            A.default = B
        }),
        cp4 = mL && mL.__importStar || function() {
            var A = function(B) {
                return A = Object.getOwnPropertyNames || function(Q) {
                    var Z = [];
                    for (var D in Q)
                        if (Object.prototype.hasOwnProperty.call(Q, D)) Z[Z.length] = D;
                    return Z
                }, A(B)
            };
            return function(B) {
                if (B && B.__esModule) return B;
                var Q = {};
                if (B != null) {
                    for (var Z = A(B), D = 0; D < Z.length; D++)
                        if (Z[D] !== "default") mp4(Q, B, Z[D])
                }
                return dp4(Q, B), Q
            }
        }();
    Object.defineProperty(mL, "__esModule", {
        value: !0
    });
    mL.fromTemporaryCredentials = void 0;
    var lp4 = HB(),
        Nq2 = A9(),
        pp4 = "us-east-1",
        ip4 = (A, B, Q) => {
            let Z;
            return async (D = {}) => {
                let {
                    callerClientConfig: G
                } = D, F = A.clientConfig?.profile ?? G?.profile, I = A.logger ?? G?.logger;
                I?.debug("@aws-sdk/credential-providers - fromTemporaryCredentials (STS)");
                let Y = {
                    ...A.params,
                    RoleSessionName: A.params.RoleSessionName ?? "aws-sdk-js-" + Date.now()
                };
                if (Y?.SerialNumber) {
                    if (!A.mfaCodeProvider) throw new Nq2.CredentialsProviderError("Temporary credential requires multi-factor authentication, but no MFA code callback was provided.", {
                        tryNextLink: !1,
                        logger: I
                    });
                    Y.TokenCode = await A.mfaCodeProvider(Y?.SerialNumber)
                }
                let {
                    AssumeRoleCommand: W,
                    STSClient: J
                } = await Promise.resolve().then(() => cp4(qq2()));
                if (!Z) {
                    let V = typeof B === "function" ? B() : void 0,
                        C = [A.masterCredentials, A.clientConfig?.credentials, void G?.credentials, G?.credentialDefaultProvider?.(), V],
                        K = "STS client default credentials";
                    if (C[0]) K = "options.masterCredentials";
                    else if (C[1]) K = "options.clientConfig.credentials";
                    else if (C[2]) throw K = "caller client's credentials", new Error("fromTemporaryCredentials recursion in callerClientConfig.credentials");
                    else if (C[3]) K = "caller client's credentialDefaultProvider";
                    else if (C[4]) K = "AWS SDK default credentials";
                    let H = [A.clientConfig?.region, G?.region, await Q?.({
                            profile: F
                        }), pp4],
                        z = "default partition's default region";
                    if (H[0]) z = "options.clientConfig.region";
                    else if (H[1]) z = "caller client's region";
                    else if (H[2]) z = "file or env region";
                    let $ = [Lq2(A.clientConfig?.requestHandler), Lq2(G?.requestHandler)],
                        L = "STS default requestHandler";
                    if ($[0]) L = "options.clientConfig.requestHandler";
                    else if ($[1]) L = "caller client's requestHandler";
                    I?.debug?.(`@aws-sdk/credential-providers - fromTemporaryCredentials STS client init with ${z}=${await lp4.normalizeProvider(qR1(H))()}, ${K}, ${L}.`), Z = new J({
                        ...A.clientConfig,
                        credentials: qR1(C),
                        logger: I,
                        profile: F,
                        region: qR1(H),
                        requestHandler: qR1($)
                    })
                }
                if (A.clientPlugins)
                    for (let V of A.clientPlugins) Z.middlewareStack.use(V);
                let {
                    Credentials: X
                } = await Z.send(new W(Y));
                if (!X || !X.AccessKeyId || !X.SecretAccessKey) throw new Nq2.CredentialsProviderError(`Invalid response from STS.assumeRole call with role ${Y.RoleArn}`, {
                    logger: I
                });
                return {
                    accessKeyId: X.AccessKeyId,
                    secretAccessKey: X.SecretAccessKey,
                    sessionToken: X.SessionToken,
                    expiration: X.Expiration,
                    credentialScope: X.CredentialScope
                }
            }
        };
    mL.fromTemporaryCredentials = ip4;
    var Lq2 = (A) => {
            return A?.metadata?.handlerProtocol === "h2" ? void 0 : A
        },
        qR1 = (A) => {
            for (let B of A)
                if (B !== void 0) return B
        }
});
var Tq2 = E((Rq2) => {
    Object.defineProperty(Rq2, "__esModule", {
        value: !0
    });
    Rq2.fromTemporaryCredentials = void 0;
    var np4 = z4(),
        ap4 = IZ(),
        sp4 = yG0(),
        rp4 = Mq2(),
        op4 = (A) => {
            return rp4.fromTemporaryCredentials(A, sp4.fromNodeProviderChain, async ({
                profile: B = process.env.AWS_PROFILE
            }) => ap4.loadConfig({
                environmentVariableSelector: (Q) => Q.AWS_REGION,
                configFileSelector: (Q) => {
                    return Q.region
                },
                default: () => {
                    return
                }
            }, {
                ...np4.NODE_REGION_CONFIG_FILE_OPTIONS,
                profile: B
            })())
        };
    Rq2.fromTemporaryCredentials = op4
});
var jq2 = E((Pq2) => {
    Object.defineProperty(Pq2, "__esModule", {
        value: !0
    });
    Pq2.fromTokenFile = void 0;
    var tp4 = M51(),
        ep4 = (A = {}) => tp4.fromTokenFile({
            ...A
        });
    Pq2.fromTokenFile = ep4
});
var _q2 = E((kq2) => {
    Object.defineProperty(kq2, "__esModule", {
        value: !0
    });
    kq2.fromWebToken = void 0;
    var Ai4 = M51(),
        Bi4 = (A) => Ai4.fromWebToken({
            ...A
        });
    kq2.fromWebToken = Bi4
});
var _G0 = E((DJ) => {
    Object.defineProperty(DJ, "__esModule", {
        value: !0
    });
    DJ.fromHttp = void 0;
    var _K = Zu();
    _K.__exportStar(i72(), DJ);
    _K.__exportStar(GC2(), DJ);
    _K.__exportStar(YC2(), DJ);
    _K.__exportStar(XC2(), DJ);
    var Qi4 = $M1();
    Object.defineProperty(DJ, "fromHttp", {
        enumerable: !0,
        get: function() {
            return Qi4.fromHttp
        }
    });
    _K.__exportStar(YK2(), DJ);
    _K.__exportStar(Aq2(), DJ);
    _K.__exportStar(Zq2(), DJ);
    _K.__exportStar(yG0(), DJ);
    _K.__exportStar(zq2(), DJ);
    _K.__exportStar(wq2(), DJ);
    _K.__exportStar(Tq2(), DJ);
    _K.__exportStar(jq2(), DJ);
    _K.__exportStar(_q2(), DJ)
});
var kN2 = E((Cn4) => {
    function oG0(A, B) {
        var Q = A.length;
        A.push(B);
        A: for (; 0 < Q;) {
            var Z = Q - 1 >>> 1,
                D = A[Z];
            if (0 < yR1(D, B)) A[Z] = B, A[Q] = D, Q = Z;
            else break A
        }
    }

    function A$(A) {
        return A.length === 0 ? null : A[0]
    }

    function bR1(A) {
        if (A.length === 0) return null;
        var B = A[0],
            Q = A.pop();
        if (Q !== B) {
            A[0] = Q;
            A: for (var Z = 0, D = A.length, G = D >>> 1; Z < G;) {
                var F = 2 * (Z + 1) - 1,
                    I = A[F],
                    Y = F + 1,
                    W = A[Y];
                if (0 > yR1(I, Q)) Y < D && 0 > yR1(W, I) ? (A[Z] = W, A[Y] = Q, Z = Y) : (A[Z] = I, A[F] = Q, Z = F);
                else if (Y < D && 0 > yR1(W, Q)) A[Z] = W, A[Y] = Q, Z = Y;
                else break A
            }
        }
        return B
    }

    function yR1(A, B) {
        var Q = A.sortIndex - B.sortIndex;
        return Q !== 0 ? Q : A.id - B.id
    }
    if (typeof performance === "object" && typeof performance.now === "function") tG0 = performance, Cn4.unstable_now = function() {
        return tG0.now()
    };
    else _R1 = Date, eG0 = _R1.now(), Cn4.unstable_now = function() {
        return _R1.now() - eG0
    };
    var tG0, _R1, eG0, cL = [],
        b_ = [],
        Vn4 = 1,
        zE = null,
        GJ = 3,
        fR1 = !1,
        Ru = !1,
        g51 = !1,
        ON2 = typeof setTimeout === "function" ? setTimeout : null,
        TN2 = typeof clearTimeout === "function" ? clearTimeout : null,
        RN2 = typeof setImmediate !== "undefined" ? setImmediate : null;
    typeof navigator !== "undefined" && navigator.scheduling !== void 0 && navigator.scheduling.isInputPending !== void 0 && navigator.scheduling.isInputPending.bind(navigator.scheduling);

    function AF0(A) {
        for (var B = A$(b_); B !== null;) {
            if (B.callback === null) bR1(b_);
            else if (B.startTime <= A) bR1(b_), B.sortIndex = B.expirationTime, oG0(cL, B);
            else break;
            B = A$(b_)
        }
    }

    function QF0(A) {
        if (g51 = !1, AF0(A), !Ru)
            if (A$(cL) !== null) Ru = !0, DF0(ZF0);
            else {
                var B = A$(b_);
                B !== null && GF0(QF0, B.startTime - A)
            }
    }

    function ZF0(A, B) {
        Ru = !1, g51 && (g51 = !1, TN2(u51), u51 = -1), fR1 = !0;
        var Q = GJ;
        try {
            AF0(B);
            for (zE = A$(cL); zE !== null && (!(zE.expirationTime > B) || A && !jN2());) {
                var Z = zE.callback;
                if (typeof Z === "function") {
                    zE.callback = null, GJ = zE.priorityLevel;
                    var D = Z(zE.expirationTime <= B);
                    B = Cn4.unstable_now(), typeof D === "function" ? zE.callback = D : zE === A$(cL) && bR1(cL), AF0(B)
                } else bR1(cL);
                zE = A$(cL)
            }
            if (zE !== null) var G = !0;
            else {
                var F = A$(b_);
                F !== null && GF0(QF0, F.startTime - B), G = !1
            }
            return G
        } finally {
            zE = null, GJ = Q, fR1 = !1
        }
    }
    var hR1 = !1,
        xR1 = null,
        u51 = -1,
        PN2 = 5,
        SN2 = -1;

    function jN2() {
        return Cn4.unstable_now() - SN2 < PN2 ? !1 : !0
    }

    function rG0() {
        if (xR1 !== null) {
            var A = Cn4.unstable_now();
            SN2 = A;
            var B = !0;
            try {
                B = xR1(!0, A)
            } finally {
                B ? h51() : (hR1 = !1, xR1 = null)
            }
        } else hR1 = !1
    }
    var h51;
    if (typeof RN2 === "function") h51 = function() {
        RN2(rG0)
    };
    else if (typeof MessageChannel !== "undefined") vR1 = new MessageChannel, BF0 = vR1.port2, vR1.port1.onmessage = rG0, h51 = function() {
        BF0.postMessage(null)
    };
    else h51 = function() {
        ON2(rG0, 0)
    };
    var vR1, BF0;

    function DF0(A) {
        xR1 = A, hR1 || (hR1 = !0, h51())
    }

    function GF0(A, B) {
        u51 = ON2(function() {
            A(Cn4.unstable_now())
        }, B)
    }
    Cn4.unstable_IdlePriority = 5;
    Cn4.unstable_ImmediatePriority = 1;
    Cn4.unstable_LowPriority = 4;
    Cn4.unstable_NormalPriority = 3;
    Cn4.unstable_Profiling = null;
    Cn4.unstable_UserBlockingPriority = 2;
    Cn4.unstable_cancelCallback = function(A) {
        A.callback = null
    };
    Cn4.unstable_continueExecution = function() {
        Ru || fR1 || (Ru = !0, DF0(ZF0))
    };
    Cn4.unstable_forceFrameRate = function(A) {
        0 > A || 125 < A ? console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported") : PN2 = 0 < A ? Math.floor(1000 / A) : 5
    };
    Cn4.unstable_getCurrentPriorityLevel = function() {
        return GJ
    };
    Cn4.unstable_getFirstCallbackNode = function() {
        return A$(cL)
    };
    Cn4.unstable_next = function(A) {
        switch (GJ) {
            case 1:
            case 2:
            case 3:
                var B = 3;
                break;
            default:
                B = GJ
        }
        var Q = GJ;
        GJ = B;
        try {
            return A()
        } finally {
            GJ = Q
        }
    };
    Cn4.unstable_pauseExecution = function() {};
    Cn4.unstable_requestPaint = function() {};
    Cn4.unstable_runWithPriority = function(A, B) {
        switch (A) {
            case 1:
            case 2:
            case 3:
            case 4:
            case 5:
                break;
            default:
                A = 3
        }
        var Q = GJ;
        GJ = A;
        try {
            return B()
        } finally {
            GJ = Q
        }
    };
    Cn4.unstable_scheduleCallback = function(A, B, Q) {
        var Z = Cn4.unstable_now();
        switch (typeof Q === "object" && Q !== null ? (Q = Q.delay, Q = typeof Q === "number" && 0 < Q ? Z + Q : Z) : Q = Z, A) {
            case 1:
                var D = -1;
                break;
            case 2:
                D = 250;
                break;
            case 5:
                D = 1073741823;
                break;
            case 4:
                D = 1e4;
                break;
            default:
                D = 5000
        }
        return D = Q + D, A = {
            id: Vn4++,
            callback: B,
            priorityLevel: A,
            startTime: Q,
            expirationTime: D,
            sortIndex: -1
        }, Q > Z ? (A.sortIndex = Q, oG0(b_, A), A$(cL) === null && A === A$(b_) && (g51 ? (TN2(u51), u51 = -1) : g51 = !0, GF0(QF0, Q - Z))) : (A.sortIndex = D, oG0(cL, A), Ru || fR1 || (Ru = !0, DF0(ZF0))), A
    };
    Cn4.unstable_shouldYield = jN2;
    Cn4.unstable_wrapCallback = function(A) {
        var B = GJ;
        return function() {
            var Q = GJ;
            GJ = B;
            try {
                return A.apply(this, arguments)
            } finally {
                GJ = Q
            }
        }
    }
});