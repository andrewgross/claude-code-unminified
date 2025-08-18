/* chunk:347 bytes:[8188699, 8203404) size:14705 source:unpacked-cli.js */
var yJ0 = E((w1B) => {
    Object.defineProperty(w1B, "__esModule", {
        value: !0
    });
    w1B.ChannelImplementation = void 0;
    var Uw6 = r31(),
        ww6 = rX0();
    class U1B {
        constructor(A, B, Q) {
            if (typeof A !== "string") throw new TypeError("Channel target must be a string");
            if (!(B instanceof Uw6.ChannelCredentials)) throw new TypeError("Channel credentials must be a ChannelCredentials object");
            if (Q) {
                if (typeof Q !== "object") throw new TypeError("Channel options must be an object")
            }
            this.internalChannel = new ww6.InternalChannel(A, B, Q)
        }
        close() {
            this.internalChannel.close()
        }
        getTarget() {
            return this.internalChannel.getTarget()
        }
        getConnectivityState(A) {
            return this.internalChannel.getConnectivityState(A)
        }
        watchConnectivityState(A, B, Q) {
            this.internalChannel.watchConnectivityState(A, B, Q)
        }
        getChannelzRef() {
            return this.internalChannel.getChannelzRef()
        }
        createCall(A, B, Q, Z, D) {
            if (typeof A !== "string") throw new TypeError("Channel#createCall: method must be a string");
            if (!(typeof B === "number" || B instanceof Date)) throw new TypeError("Channel#createCall: deadline must be a number or Date");
            return this.internalChannel.createCall(A, B, Q, Z, D)
        }
    }
    w1B.ChannelImplementation = U1B
});
var P1B = E((O1B) => {
    Object.defineProperty(O1B, "__esModule", {
        value: !0
    });
    O1B.ServerDuplexStreamImpl = O1B.ServerWritableStreamImpl = O1B.ServerReadableStreamImpl = O1B.ServerUnaryCallImpl = void 0;
    O1B.serverErrorToStatus = eX0;
    var $w6 = W1("events"),
        oX0 = W1("stream"),
        tX0 = b6(),
        q1B = IJ();

    function eX0(A, B) {
        var Q;
        let Z = {
            code: tX0.Status.UNKNOWN,
            details: "message" in A ? A.message : "Unknown Error",
            metadata: (Q = B !== null && B !== void 0 ? B : A.metadata) !== null && Q !== void 0 ? Q : null
        };
        if ("code" in A && typeof A.code === "number" && Number.isInteger(A.code)) {
            if (Z.code = A.code, "details" in A && typeof A.details === "string") Z.details = A.details
        }
        return Z
    }
    class N1B extends $w6.EventEmitter {
        constructor(A, B, Q, Z) {
            super();
            this.path = A, this.call = B, this.metadata = Q, this.request = Z, this.cancelled = !1
        }
        getPeer() {
            return this.call.getPeer()
        }
        sendMetadata(A) {
            this.call.sendMetadata(A)
        }
        getDeadline() {
            return this.call.getDeadline()
        }
        getPath() {
            return this.path
        }
        getHost() {
            return this.call.getHost()
        }
    }
    O1B.ServerUnaryCallImpl = N1B;
    class L1B extends oX0.Readable {
        constructor(A, B, Q) {
            super({
                objectMode: !0
            });
            this.path = A, this.call = B, this.metadata = Q, this.cancelled = !1
        }
        _read(A) {
            this.call.startRead()
        }
        getPeer() {
            return this.call.getPeer()
        }
        sendMetadata(A) {
            this.call.sendMetadata(A)
        }
        getDeadline() {
            return this.call.getDeadline()
        }
        getPath() {
            return this.path
        }
        getHost() {
            return this.call.getHost()
        }
    }
    O1B.ServerReadableStreamImpl = L1B;
    class M1B extends oX0.Writable {
        constructor(A, B, Q, Z) {
            super({
                objectMode: !0
            });
            this.path = A, this.call = B, this.metadata = Q, this.request = Z, this.pendingStatus = {
                code: tX0.Status.OK,
                details: "OK"
            }, this.cancelled = !1, this.trailingMetadata = new q1B.Metadata, this.on("error", (D) => {
                this.pendingStatus = eX0(D), this.end()
            })
        }
        getPeer() {
            return this.call.getPeer()
        }
        sendMetadata(A) {
            this.call.sendMetadata(A)
        }
        getDeadline() {
            return this.call.getDeadline()
        }
        getPath() {
            return this.path
        }
        getHost() {
            return this.call.getHost()
        }
        _write(A, B, Q) {
            this.call.sendMessage(A, Q)
        }
        _final(A) {
            var B;
            A(null), this.call.sendStatus(Object.assign(Object.assign({}, this.pendingStatus), {
                metadata: (B = this.pendingStatus.metadata) !== null && B !== void 0 ? B : this.trailingMetadata
            }))
        }
        end(A) {
            if (A) this.trailingMetadata = A;
            return super.end()
        }
    }
    O1B.ServerWritableStreamImpl = M1B;
    class R1B extends oX0.Duplex {
        constructor(A, B, Q) {
            super({
                objectMode: !0
            });
            this.path = A, this.call = B, this.metadata = Q, this.pendingStatus = {
                code: tX0.Status.OK,
                details: "OK"
            }, this.cancelled = !1, this.trailingMetadata = new q1B.Metadata, this.on("error", (Z) => {
                this.pendingStatus = eX0(Z), this.end()
            })
        }
        getPeer() {
            return this.call.getPeer()
        }
        sendMetadata(A) {
            this.call.sendMetadata(A)
        }
        getDeadline() {
            return this.call.getDeadline()
        }
        getPath() {
            return this.path
        }
        getHost() {
            return this.call.getHost()
        }
        _read(A) {
            this.call.startRead()
        }
        _write(A, B, Q) {
            this.call.sendMessage(A, Q)
        }
        _final(A) {
            var B;
            A(null), this.call.sendStatus(Object.assign(Object.assign({}, this.pendingStatus), {
                metadata: (B = this.pendingStatus.metadata) !== null && B !== void 0 ? B : this.trailingMetadata
            }))
        }
        end(A) {
            if (A) this.trailingMetadata = A;
            return super.end()
        }
    }
    O1B.ServerDuplexStreamImpl = R1B
});
var HS1 = E((S1B) => {
    Object.defineProperty(S1B, "__esModule", {
        value: !0
    });
    S1B.ServerCredentials = void 0;
    S1B.createCertificateProviderServerCredentials = Rw6;
    S1B.createServerCredentialsWithInterceptors = Ow6;
    var AV0 = EJ0();
    class pt {
        constructor(A, B) {
            this.serverConstructorOptions = A, this.watchers = new Set, this.latestContextOptions = null, this.latestContextOptions = B !== null && B !== void 0 ? B : null
        }
        _addWatcher(A) {
            this.watchers.add(A)
        }
        _removeWatcher(A) {
            this.watchers.delete(A)
        }
        getWatcherCount() {
            return this.watchers.size
        }
        updateSecureContextOptions(A) {
            this.latestContextOptions = A;
            for (let B of this.watchers) B(this.latestContextOptions)
        }
        _isSecure() {
            return this.serverConstructorOptions !== null
        }
        _getSecureContextOptions() {
            return this.latestContextOptions
        }
        _getConstructorOptions() {
            return this.serverConstructorOptions
        }
        _getInterceptors() {
            return []
        }
        static createInsecure() {
            return new BV0
        }
        static createSsl(A, B, Q = !1) {
            var Z;
            if (A !== null && !Buffer.isBuffer(A)) throw new TypeError("rootCerts must be null or a Buffer");
            if (!Array.isArray(B)) throw new TypeError("keyCertPairs must be an array");
            if (typeof Q !== "boolean") throw new TypeError("checkClientCertificate must be a boolean");
            let D = [],
                G = [];
            for (let F = 0; F < B.length; F++) {
                let I = B[F];
                if (I === null || typeof I !== "object") throw new TypeError(`keyCertPair[${F}] must be an object`);
                if (!Buffer.isBuffer(I.private_key)) throw new TypeError(`keyCertPair[${F}].private_key must be a Buffer`);
                if (!Buffer.isBuffer(I.cert_chain)) throw new TypeError(`keyCertPair[${F}].cert_chain must be a Buffer`);
                D.push(I.cert_chain), G.push(I.private_key)
            }
            return new QV0({
                requestCert: Q,
                ciphers: AV0.CIPHER_SUITES
            }, {
                ca: (Z = A !== null && A !== void 0 ? A : AV0.getDefaultRootsData()) !== null && Z !== void 0 ? Z : void 0,
                cert: D,
                key: G
            })
        }
    }
    S1B.ServerCredentials = pt;
    class BV0 extends pt {
        constructor() {
            super(null)
        }
        _getSettings() {
            return null
        }
        _equals(A) {
            return A instanceof BV0
        }
    }
    class QV0 extends pt {
        constructor(A, B) {
            super(A, B);
            this.options = Object.assign(Object.assign({}, A), B)
        }
        _equals(A) {
            if (this === A) return !0;
            if (!(A instanceof QV0)) return !1;
            if (Buffer.isBuffer(this.options.ca) && Buffer.isBuffer(A.options.ca)) {
                if (!this.options.ca.equals(A.options.ca)) return !1
            } else if (this.options.ca !== A.options.ca) return !1;
            if (Array.isArray(this.options.cert) && Array.isArray(A.options.cert)) {
                if (this.options.cert.length !== A.options.cert.length) return !1;
                for (let B = 0; B < this.options.cert.length; B++) {
                    let Q = this.options.cert[B],
                        Z = A.options.cert[B];
                    if (Buffer.isBuffer(Q) && Buffer.isBuffer(Z)) {
                        if (!Q.equals(Z)) return !1
                    } else if (Q !== Z) return !1
                }
            } else if (this.options.cert !== A.options.cert) return !1;
            if (Array.isArray(this.options.key) && Array.isArray(A.options.key)) {
                if (this.options.key.length !== A.options.key.length) return !1;
                for (let B = 0; B < this.options.key.length; B++) {
                    let Q = this.options.key[B],
                        Z = A.options.key[B];
                    if (Buffer.isBuffer(Q) && Buffer.isBuffer(Z)) {
                        if (!Q.equals(Z)) return !1
                    } else if (Q !== Z) return !1
                }
            } else if (this.options.key !== A.options.key) return !1;
            if (this.options.requestCert !== A.options.requestCert) return !1;
            return !0
        }
    }
    class ZV0 extends pt {
        constructor(A, B, Q) {
            super({
                requestCert: B !== null,
                rejectUnauthorized: Q,
                ciphers: AV0.CIPHER_SUITES
            });
            this.identityCertificateProvider = A, this.caCertificateProvider = B, this.requireClientCertificate = Q, this.latestCaUpdate = null, this.latestIdentityUpdate = null, this.caCertificateUpdateListener = this.handleCaCertificateUpdate.bind(this), this.identityCertificateUpdateListener = this.handleIdentityCertitificateUpdate.bind(this)
        }
        _addWatcher(A) {
            var B;
            if (this.getWatcherCount() === 0)(B = this.caCertificateProvider) === null || B === void 0 || B.addCaCertificateListener(this.caCertificateUpdateListener), this.identityCertificateProvider.addIdentityCertificateListener(this.identityCertificateUpdateListener);
            super._addWatcher(A)
        }
        _removeWatcher(A) {
            var B;
            if (super._removeWatcher(A), this.getWatcherCount() === 0)(B = this.caCertificateProvider) === null || B === void 0 || B.removeCaCertificateListener(this.caCertificateUpdateListener), this.identityCertificateProvider.removeIdentityCertificateListener(this.identityCertificateUpdateListener)
        }
        _equals(A) {
            if (this === A) return !0;
            if (!(A instanceof ZV0)) return !1;
            return this.caCertificateProvider === A.caCertificateProvider && this.identityCertificateProvider === A.identityCertificateProvider && this.requireClientCertificate === A.requireClientCertificate
        }
        calculateSecureContextOptions() {
            var A;
            if (this.latestIdentityUpdate === null) return null;
            if (this.caCertificateProvider !== null && this.latestCaUpdate === null) return null;
            return {
                ca: (A = this.latestCaUpdate) === null || A === void 0 ? void 0 : A.caCertificate,
                cert: [this.latestIdentityUpdate.certificate],
                key: [this.latestIdentityUpdate.privateKey]
            }
        }
        finalizeUpdate() {
            let A = this.calculateSecureContextOptions();
            this.updateSecureContextOptions(A)
        }
        handleCaCertificateUpdate(A) {
            this.latestCaUpdate = A, this.finalizeUpdate()
        }
        handleIdentityCertitificateUpdate(A) {
            this.latestIdentityUpdate = A, this.finalizeUpdate()
        }
    }

    function Rw6(A, B, Q) {
        return new ZV0(A, B, Q)
    }
    class DV0 extends pt {
        constructor(A, B) {
            super({});
            this.childCredentials = A, this.interceptors = B
        }
        _isSecure() {
            return this.childCredentials._isSecure()
        }
        _equals(A) {
            if (!(A instanceof DV0)) return !1;
            if (!this.childCredentials._equals(A.childCredentials)) return !1;
            if (this.interceptors.length !== A.interceptors.length) return !1;
            for (let B = 0; B < this.interceptors.length; B++)
                if (this.interceptors[B] !== A.interceptors[B]) return !1;
            return !0
        }
        _getInterceptors() {
            return this.interceptors
        }
        _addWatcher(A) {
            this.childCredentials._addWatcher(A)
        }
        _removeWatcher(A) {
            this.childCredentials._removeWatcher(A)
        }
        _getConstructorOptions() {
            return this.childCredentials._getConstructorOptions()
        }
        _getSecureContextOptions() {
            return this.childCredentials._getSecureContextOptions()
        }
    }

    function Ow6(A, B) {
        return new DV0(A, B)
    }
});