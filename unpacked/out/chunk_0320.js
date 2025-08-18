/* chunk:320 bytes:[7750404, 7765222) size:14818 source:unpacked-cli.js */
var r31 = E((Ks2) => {
    Object.defineProperty(Ks2, "__esModule", {
        value: !0
    });
    Ks2.ChannelCredentials = void 0;
    Ks2.createCertificateProviderChannelCredentials = IV6;
    var s31 = W1("tls"),
        EP1 = CP1(),
        qJ0 = EJ0(),
        KP1 = mV(),
        Xs2 = DM(),
        GV6 = I7(),
        FV6 = b6();

    function $J0(A, B) {
        if (A && !(A instanceof Buffer)) throw new TypeError(`${B}, if provided, must be a Buffer.`)
    }
    class Ot {
        compose(A) {
            return new zP1(this, A)
        }
        static createSsl(A, B, Q, Z) {
            var D;
            if ($J0(A, "Root certificate"), $J0(B, "Private key"), $J0(Q, "Certificate chain"), B && !Q) throw new Error("Private key must be given with accompanying certificate chain");
            if (!B && Q) throw new Error("Certificate chain must be given with accompanying private key");
            let G = s31.createSecureContext({
                ca: (D = A !== null && A !== void 0 ? A : qJ0.getDefaultRootsData()) !== null && D !== void 0 ? D : void 0,
                key: B !== null && B !== void 0 ? B : void 0,
                cert: Q !== null && Q !== void 0 ? Q : void 0,
                ciphers: qJ0.CIPHER_SUITES
            });
            return new HP1(G, Z !== null && Z !== void 0 ? Z : {})
        }
        static createFromSecureContext(A, B) {
            return new HP1(A, B !== null && B !== void 0 ? B : {})
        }
        static createInsecure() {
            return new NJ0
        }
    }
    Ks2.ChannelCredentials = Ot;
    class NJ0 extends Ot {
        constructor() {
            super()
        }
        compose(A) {
            throw new Error("Cannot compose insecure credentials")
        }
        _isSecure() {
            return !1
        }
        _equals(A) {
            return A instanceof NJ0
        }
        _createSecureConnector(A, B, Q) {
            return {
                connect(Z) {
                    return Promise.resolve({
                        socket: Z,
                        secure: !1
                    })
                },
                waitForReady: () => {
                    return Promise.resolve()
                },
                getCallCredentials: () => {
                    return Q !== null && Q !== void 0 ? Q : EP1.CallCredentials.createEmpty()
                },
                destroy() {}
            }
        }
    }

    function Vs2(A, B, Q, Z) {
        var D, G, F, I;
        let Y = {
            secureContext: A
        };
        if (B.checkServerIdentity) Y.checkServerIdentity = B.checkServerIdentity;
        if (B.rejectUnauthorized !== void 0) Y.rejectUnauthorized = B.rejectUnauthorized;
        if (Y.ALPNProtocols = ["h2"], Z["grpc.ssl_target_name_override"]) {
            let C = Z["grpc.ssl_target_name_override"],
                K = (D = Y.checkServerIdentity) !== null && D !== void 0 ? D : s31.checkServerIdentity;
            Y.checkServerIdentity = (H, z) => {
                return K(C, z)
            }, Y.servername = C
        } else if ("grpc.http_connect_target" in Z) {
            let C = Xs2.getDefaultAuthority((G = KP1.parseUri(Z["grpc.http_connect_target"])) !== null && G !== void 0 ? G : {
                    path: "localhost"
                }),
                K = KP1.splitHostPort(C);
            Y.servername = (F = K === null || K === void 0 ? void 0 : K.host) !== null && F !== void 0 ? F : C
        }
        if (Z["grpc-node.tls_enable_trace"]) Y.enableTrace = !0;
        let W = Q;
        if ("grpc.http_connect_target" in Z) {
            let C = KP1.parseUri(Z["grpc.http_connect_target"]);
            if (C) W = C
        }
        let J = Xs2.getDefaultAuthority(W),
            X = KP1.splitHostPort(J),
            V = (I = X === null || X === void 0 ? void 0 : X.host) !== null && I !== void 0 ? I : J;
        return Y.host = V, Y.servername = V, Y
    }
    class Cs2 {
        constructor(A, B) {
            this.connectionOptions = A, this.callCredentials = B
        }
        connect(A) {
            let B = Object.assign({
                socket: A
            }, this.connectionOptions);
            return new Promise((Q, Z) => {
                let D = s31.connect(B, () => {
                    var G;
                    if (((G = this.connectionOptions.rejectUnauthorized) !== null && G !== void 0 ? G : !0) && !D.authorized) {
                        Z(D.authorizationError);
                        return
                    }
                    Q({
                        socket: D,
                        secure: !0
                    })
                });
                D.on("error", (G) => {
                    Z(G)
                })
            })
        }
        waitForReady() {
            return Promise.resolve()
        }
        getCallCredentials() {
            return this.callCredentials
        }
        destroy() {}
    }
    class HP1 extends Ot {
        constructor(A, B) {
            super();
            this.secureContext = A, this.verifyOptions = B
        }
        _isSecure() {
            return !0
        }
        _equals(A) {
            if (this === A) return !0;
            if (A instanceof HP1) return this.secureContext === A.secureContext && this.verifyOptions.checkServerIdentity === A.verifyOptions.checkServerIdentity;
            else return !1
        }
        _createSecureConnector(A, B, Q) {
            let Z = Vs2(this.secureContext, this.verifyOptions, A, B);
            return new Cs2(Z, Q !== null && Q !== void 0 ? Q : EP1.CallCredentials.createEmpty())
        }
    }
    class a31 extends Ot {
        constructor(A, B, Q) {
            super();
            this.caCertificateProvider = A, this.identityCertificateProvider = B, this.verifyOptions = Q, this.refcount = 0, this.latestCaUpdate = void 0, this.latestIdentityUpdate = void 0, this.caCertificateUpdateListener = this.handleCaCertificateUpdate.bind(this), this.identityCertificateUpdateListener = this.handleIdentityCertitificateUpdate.bind(this), this.secureContextWatchers = []
        }
        _isSecure() {
            return !0
        }
        _equals(A) {
            var B, Q;
            if (this === A) return !0;
            if (A instanceof a31) return this.caCertificateProvider === A.caCertificateProvider && this.identityCertificateProvider === A.identityCertificateProvider && ((B = this.verifyOptions) === null || B === void 0 ? void 0 : B.checkServerIdentity) === ((Q = A.verifyOptions) === null || Q === void 0 ? void 0 : Q.checkServerIdentity);
            else return !1
        }
        ref() {
            var A;
            if (this.refcount === 0) this.caCertificateProvider.addCaCertificateListener(this.caCertificateUpdateListener), (A = this.identityCertificateProvider) === null || A === void 0 || A.addIdentityCertificateListener(this.identityCertificateUpdateListener);
            this.refcount += 1
        }
        unref() {
            var A;
            if (this.refcount -= 1, this.refcount === 0) this.caCertificateProvider.removeCaCertificateListener(this.caCertificateUpdateListener), (A = this.identityCertificateProvider) === null || A === void 0 || A.removeIdentityCertificateListener(this.identityCertificateUpdateListener)
        }
        _createSecureConnector(A, B, Q) {
            return this.ref(), new a31.SecureConnectorImpl(this, A, B, Q !== null && Q !== void 0 ? Q : EP1.CallCredentials.createEmpty())
        }
        maybeUpdateWatchers() {
            if (this.hasReceivedUpdates()) {
                for (let A of this.secureContextWatchers) A(this.getLatestSecureContext());
                this.secureContextWatchers = []
            }
        }
        handleCaCertificateUpdate(A) {
            this.latestCaUpdate = A, this.maybeUpdateWatchers()
        }
        handleIdentityCertitificateUpdate(A) {
            this.latestIdentityUpdate = A, this.maybeUpdateWatchers()
        }
        hasReceivedUpdates() {
            if (this.latestCaUpdate === void 0) return !1;
            if (this.identityCertificateProvider && this.latestIdentityUpdate === void 0) return !1;
            return !0
        }
        getSecureContext() {
            if (this.hasReceivedUpdates()) return Promise.resolve(this.getLatestSecureContext());
            else return new Promise((A) => {
                this.secureContextWatchers.push(A)
            })
        }
        getLatestSecureContext() {
            var A, B;
            if (!this.latestCaUpdate) return null;
            if (this.identityCertificateProvider !== null && !this.latestIdentityUpdate) return null;
            try {
                return s31.createSecureContext({
                    ca: this.latestCaUpdate.caCertificate,
                    key: (A = this.latestIdentityUpdate) === null || A === void 0 ? void 0 : A.privateKey,
                    cert: (B = this.latestIdentityUpdate) === null || B === void 0 ? void 0 : B.certificate,
                    ciphers: qJ0.CIPHER_SUITES
                })
            } catch (Q) {
                return GV6.log(FV6.LogVerbosity.ERROR, "Failed to createSecureContext with error " + Q.message), null
            }
        }
    }
    a31.SecureConnectorImpl = class {
        constructor(A, B, Q, Z) {
            this.parent = A, this.channelTarget = B, this.options = Q, this.callCredentials = Z
        }
        connect(A) {
            return new Promise((B, Q) => {
                let Z = this.parent.getLatestSecureContext();
                if (!Z) {
                    Q(new Error("Failed to load credentials"));
                    return
                }
                if (A.closed) Q(new Error("Socket closed while loading credentials"));
                let D = Vs2(Z, this.parent.verifyOptions, this.channelTarget, this.options),
                    G = Object.assign({
                        socket: A
                    }, D),
                    F = () => {
                        Q(new Error("Socket closed"))
                    },
                    I = (W) => {
                        Q(W)
                    },
                    Y = s31.connect(G, () => {
                        var W;
                        if (Y.removeListener("close", F), Y.removeListener("error", I), ((W = this.parent.verifyOptions.rejectUnauthorized) !== null && W !== void 0 ? W : !0) && !Y.authorized) {
                            Q(Y.authorizationError);
                            return
                        }
                        B({
                            socket: Y,
                            secure: !0
                        })
                    });
                Y.once("close", F), Y.once("error", I)
            })
        }
        async waitForReady() {
            await this.parent.getSecureContext()
        }
        getCallCredentials() {
            return this.callCredentials
        }
        destroy() {
            this.parent.unref()
        }
    };

    function IV6(A, B, Q) {
        return new a31(A, B, Q !== null && Q !== void 0 ? Q : {})
    }
    class zP1 extends Ot {
        constructor(A, B) {
            super();
            if (this.channelCredentials = A, this.callCredentials = B, !A._isSecure()) throw new Error("Cannot compose insecure credentials")
        }
        compose(A) {
            let B = this.callCredentials.compose(A);
            return new zP1(this.channelCredentials, B)
        }
        _isSecure() {
            return !0
        }
        _equals(A) {
            if (this === A) return !0;
            if (A instanceof zP1) return this.channelCredentials._equals(A.channelCredentials) && this.callCredentials._equals(A.callCredentials);
            else return !1
        }
        _createSecureConnector(A, B, Q) {
            let Z = this.callCredentials.compose(Q !== null && Q !== void 0 ? Q : EP1.CallCredentials.createEmpty());
            return this.channelCredentials._createSecureConnector(A, B, Z)
        }
    }
});
var Wm = E((Es2) => {
    Object.defineProperty(Es2, "__esModule", {
        value: !0
    });
    Es2.createChildChannelControlHelper = XV6;
    Es2.registerLoadBalancerType = VV6;
    Es2.registerDefaultLoadBalancerType = CV6;
    Es2.createLoadBalancer = KV6;
    Es2.isLoadBalancerNameRegistered = HV6;
    Es2.parseLoadBalancingConfig = zs2;
    Es2.getDefaultConfig = zV6;
    Es2.selectLbConfigFromList = EV6;
    var WV6 = I7(),
        JV6 = b6();

    function XV6(A, B) {
        var Q, Z, D, G, F, I, Y, W, J, X;
        return {
            createSubchannel: (Z = (Q = B.createSubchannel) === null || Q === void 0 ? void 0 : Q.bind(B)) !== null && Z !== void 0 ? Z : A.createSubchannel.bind(A),
            updateState: (G = (D = B.updateState) === null || D === void 0 ? void 0 : D.bind(B)) !== null && G !== void 0 ? G : A.updateState.bind(A),
            requestReresolution: (I = (F = B.requestReresolution) === null || F === void 0 ? void 0 : F.bind(B)) !== null && I !== void 0 ? I : A.requestReresolution.bind(A),
            addChannelzChild: (W = (Y = B.addChannelzChild) === null || Y === void 0 ? void 0 : Y.bind(B)) !== null && W !== void 0 ? W : A.addChannelzChild.bind(A),
            removeChannelzChild: (X = (J = B.removeChannelzChild) === null || J === void 0 ? void 0 : J.bind(B)) !== null && X !== void 0 ? X : A.removeChannelzChild.bind(A)
        }
    }
    var Yx = {},
        o31 = null;

    function VV6(A, B, Q) {
        Yx[A] = {
            LoadBalancer: B,
            LoadBalancingConfig: Q
        }
    }

    function CV6(A) {
        o31 = A
    }

    function KV6(A, B) {
        let Q = A.getLoadBalancerName();
        if (Q in Yx) return new Yx[Q].LoadBalancer(B);
        else return null
    }

    function HV6(A) {
        return A in Yx
    }

    function zs2(A) {
        let B = Object.keys(A);
        if (B.length !== 1) throw new Error("Provided load balancing config has multiple conflicting entries");
        let Q = B[0];
        if (Q in Yx) try {
            return Yx[Q].LoadBalancingConfig.createFromJson(A[Q])
        } catch (Z) {
            throw new Error(`${Q}: ${Z.message}`)
        } else throw new Error(`Unrecognized load balancing config name ${Q}`)
    }

    function zV6() {
        if (!o31) throw new Error("No default load balancer type registered");
        return new Yx[o31].LoadBalancingConfig
    }

    function EV6(A, B = !1) {
        for (let Q of A) try {
            return zs2(Q)
        } catch (Z) {
            WV6.log(JV6.LogVerbosity.DEBUG, "Config parsing failed with error", Z.message);
            continue
        }
        if (B)
            if (o31) return new Yx[o31].LoadBalancingConfig;
            else return null;
        else return null
    }
});