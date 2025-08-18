/* chunk:342 bytes:[8099388, 8117758) size:18370 source:unpacked-cli.js */
var qe2 = E((we2) => {
    Object.defineProperty(we2, "__esModule", {
        value: !0
    });
    we2.Http2SubchannelConnector = void 0;
    var DS1 = W1("http2"),
        QS1 = Hm(),
        q71 = b6(),
        rE6 = _X0(),
        dt = I7(),
        oE6 = DM(),
        ZS1 = OE(),
        fX0 = mV(),
        tE6 = W1("net"),
        eE6 = He2(),
        AU6 = bX0(),
        hX0 = "transport",
        BU6 = "transport_flowctrl",
        QU6 = FJ0().version,
        {
            HTTP2_HEADER_AUTHORITY: ZU6,
            HTTP2_HEADER_CONTENT_TYPE: DU6,
            HTTP2_HEADER_METHOD: GU6,
            HTTP2_HEADER_PATH: FU6,
            HTTP2_HEADER_TE: IU6,
            HTTP2_HEADER_USER_AGENT: YU6
        } = DS1.constants,
        WU6 = 20000,
        JU6 = Buffer.from("too_many_pings", "ascii");
    class Ee2 {
        constructor(A, B, Q, Z) {
            if (this.session = A, this.options = Q, this.remoteName = Z, this.keepaliveTimer = null, this.pendingSendKeepalivePing = !1, this.activeCalls = new Set, this.disconnectListeners = [], this.disconnectHandled = !1, this.channelzEnabled = !0, this.keepalivesSent = 0, this.messagesSent = 0, this.messagesReceived = 0, this.lastMessageSentTimestamp = null, this.lastMessageReceivedTimestamp = null, this.subchannelAddressString = ZS1.subchannelAddressToString(B), Q["grpc.enable_channelz"] === 0) this.channelzEnabled = !1, this.streamTracker = new QS1.ChannelzCallTrackerStub;
            else this.streamTracker = new QS1.ChannelzCallTracker;
            if (this.channelzRef = QS1.registerChannelzSocket(this.subchannelAddressString, () => this.getChannelzInfo(), this.channelzEnabled), this.userAgent = [Q["grpc.primary_user_agent"], `grpc-node-js/${QU6}`, Q["grpc.secondary_user_agent"]].filter((D) => D).join(" "), "grpc.keepalive_time_ms" in Q) this.keepaliveTimeMs = Q["grpc.keepalive_time_ms"];
            else this.keepaliveTimeMs = -1;
            if ("grpc.keepalive_timeout_ms" in Q) this.keepaliveTimeoutMs = Q["grpc.keepalive_timeout_ms"];
            else this.keepaliveTimeoutMs = WU6;
            if ("grpc.keepalive_permit_without_calls" in Q) this.keepaliveWithoutCalls = Q["grpc.keepalive_permit_without_calls"] === 1;
            else this.keepaliveWithoutCalls = !1;
            if (A.once("close", () => {
                    this.trace("session closed"), this.handleDisconnect()
                }), A.once("goaway", (D, G, F) => {
                    let I = !1;
                    if (D === DS1.constants.NGHTTP2_ENHANCE_YOUR_CALM && F && F.equals(JU6)) I = !0;
                    this.trace("connection closed by GOAWAY with code " + D + " and data " + (F === null || F === void 0 ? void 0 : F.toString())), this.reportDisconnectToOwner(I)
                }), A.once("error", (D) => {
                    this.trace("connection closed with error " + D.message), this.handleDisconnect()
                }), A.socket.once("close", (D) => {
                    this.trace("connection closed. hadError=" + D), this.handleDisconnect()
                }), dt.isTracerEnabled(hX0)) A.on("remoteSettings", (D) => {
                this.trace("new settings received" + (this.session !== A ? " on the old connection" : "") + ": " + JSON.stringify(D))
            }), A.on("localSettings", (D) => {
                this.trace("local settings acknowledged by remote" + (this.session !== A ? " on the old connection" : "") + ": " + JSON.stringify(D))
            });
            if (this.keepaliveWithoutCalls) this.maybeStartKeepalivePingTimer()
        }
        getChannelzInfo() {
            var A, B, Q;
            let Z = this.session.socket,
                D = Z.remoteAddress ? ZS1.stringToSubchannelAddress(Z.remoteAddress, Z.remotePort) : null,
                G = Z.localAddress ? ZS1.stringToSubchannelAddress(Z.localAddress, Z.localPort) : null,
                F;
            if (this.session.encrypted) {
                let Y = Z,
                    W = Y.getCipher(),
                    J = Y.getCertificate(),
                    X = Y.getPeerCertificate();
                F = {
                    cipherSuiteStandardName: (A = W.standardName) !== null && A !== void 0 ? A : null,
                    cipherSuiteOtherName: W.standardName ? null : W.name,
                    localCertificate: J && "raw" in J ? J.raw : null,
                    remoteCertificate: X && "raw" in X ? X.raw : null
                }
            } else F = null;
            return {
                remoteAddress: D,
                localAddress: G,
                security: F,
                remoteName: this.remoteName,
                streamsStarted: this.streamTracker.callsStarted,
                streamsSucceeded: this.streamTracker.callsSucceeded,
                streamsFailed: this.streamTracker.callsFailed,
                messagesSent: this.messagesSent,
                messagesReceived: this.messagesReceived,
                keepAlivesSent: this.keepalivesSent,
                lastLocalStreamCreatedTimestamp: this.streamTracker.lastCallStartedTimestamp,
                lastRemoteStreamCreatedTimestamp: null,
                lastMessageSentTimestamp: this.lastMessageSentTimestamp,
                lastMessageReceivedTimestamp: this.lastMessageReceivedTimestamp,
                localFlowControlWindow: (B = this.session.state.localWindowSize) !== null && B !== void 0 ? B : null,
                remoteFlowControlWindow: (Q = this.session.state.remoteWindowSize) !== null && Q !== void 0 ? Q : null
            }
        }
        trace(A) {
            dt.trace(q71.LogVerbosity.DEBUG, hX0, "(" + this.channelzRef.id + ") " + this.subchannelAddressString + " " + A)
        }
        keepaliveTrace(A) {
            dt.trace(q71.LogVerbosity.DEBUG, "keepalive", "(" + this.channelzRef.id + ") " + this.subchannelAddressString + " " + A)
        }
        flowControlTrace(A) {
            dt.trace(q71.LogVerbosity.DEBUG, BU6, "(" + this.channelzRef.id + ") " + this.subchannelAddressString + " " + A)
        }
        internalsTrace(A) {
            dt.trace(q71.LogVerbosity.DEBUG, "transport_internals", "(" + this.channelzRef.id + ") " + this.subchannelAddressString + " " + A)
        }
        reportDisconnectToOwner(A) {
            if (this.disconnectHandled) return;
            this.disconnectHandled = !0, this.disconnectListeners.forEach((B) => B(A))
        }
        handleDisconnect() {
            this.clearKeepaliveTimeout(), this.reportDisconnectToOwner(!1);
            for (let A of this.activeCalls) A.onDisconnect();
            setImmediate(() => {
                this.session.destroy()
            })
        }
        addDisconnectListener(A) {
            this.disconnectListeners.push(A)
        }
        canSendPing() {
            return !this.session.destroyed && this.keepaliveTimeMs > 0 && (this.keepaliveWithoutCalls || this.activeCalls.size > 0)
        }
        maybeSendPing() {
            var A, B;
            if (!this.canSendPing()) {
                this.pendingSendKeepalivePing = !0;
                return
            }
            if (this.keepaliveTimer) {
                console.error("keepaliveTimeout is not null");
                return
            }
            if (this.channelzEnabled) this.keepalivesSent += 1;
            this.keepaliveTrace("Sending ping with timeout " + this.keepaliveTimeoutMs + "ms"), this.keepaliveTimer = setTimeout(() => {
                this.keepaliveTimer = null, this.keepaliveTrace("Ping timeout passed without response"), this.handleDisconnect()
            }, this.keepaliveTimeoutMs), (B = (A = this.keepaliveTimer).unref) === null || B === void 0 || B.call(A);
            let Q = "";
            try {
                if (!this.session.ping((D, G, F) => {
                        if (this.clearKeepaliveTimeout(), D) this.keepaliveTrace("Ping failed with error " + D.message), this.handleDisconnect();
                        else this.keepaliveTrace("Received ping response"), this.maybeStartKeepalivePingTimer()
                    })) Q = "Ping returned false"
            } catch (Z) {
                Q = (Z instanceof Error ? Z.message : "") || "Unknown error"
            }
            if (Q) this.keepaliveTrace("Ping send failed: " + Q), this.handleDisconnect()
        }
        maybeStartKeepalivePingTimer() {
            var A, B;
            if (!this.canSendPing()) return;
            if (this.pendingSendKeepalivePing) this.pendingSendKeepalivePing = !1, this.maybeSendPing();
            else if (!this.keepaliveTimer) this.keepaliveTrace("Starting keepalive timer for " + this.keepaliveTimeMs + "ms"), this.keepaliveTimer = setTimeout(() => {
                this.keepaliveTimer = null, this.maybeSendPing()
            }, this.keepaliveTimeMs), (B = (A = this.keepaliveTimer).unref) === null || B === void 0 || B.call(A)
        }
        clearKeepaliveTimeout() {
            if (this.keepaliveTimer) clearTimeout(this.keepaliveTimer), this.keepaliveTimer = null
        }
        removeActiveCall(A) {
            if (this.activeCalls.delete(A), this.activeCalls.size === 0) this.session.unref()
        }
        addActiveCall(A) {
            if (this.activeCalls.add(A), this.activeCalls.size === 1) {
                if (this.session.ref(), !this.keepaliveWithoutCalls) this.maybeStartKeepalivePingTimer()
            }
        }
        createCall(A, B, Q, Z, D) {
            let G = A.toHttp2Headers();
            G[ZU6] = B, G[YU6] = this.userAgent, G[DU6] = "application/grpc", G[GU6] = "POST", G[FU6] = Q, G[IU6] = "trailers";
            let F;
            try {
                F = this.session.request(G)
            } catch (W) {
                throw this.handleDisconnect(), W
            }
            this.flowControlTrace("local window size: " + this.session.state.localWindowSize + " remote window size: " + this.session.state.remoteWindowSize), this.internalsTrace("session.closed=" + this.session.closed + " session.destroyed=" + this.session.destroyed + " session.socket.destroyed=" + this.session.socket.destroyed);
            let I, Y;
            if (this.channelzEnabled) this.streamTracker.addCallStarted(), I = {
                addMessageSent: () => {
                    var W;
                    this.messagesSent += 1, this.lastMessageSentTimestamp = new Date, (W = D.addMessageSent) === null || W === void 0 || W.call(D)
                },
                addMessageReceived: () => {
                    var W;
                    this.messagesReceived += 1, this.lastMessageReceivedTimestamp = new Date, (W = D.addMessageReceived) === null || W === void 0 || W.call(D)
                },
                onCallEnd: (W) => {
                    var J;
                    (J = D.onCallEnd) === null || J === void 0 || J.call(D, W), this.removeActiveCall(Y)
                },
                onStreamEnd: (W) => {
                    var J;
                    if (W) this.streamTracker.addCallSucceeded();
                    else this.streamTracker.addCallFailed();
                    (J = D.onStreamEnd) === null || J === void 0 || J.call(D, W)
                }
            };
            else I = {
                addMessageSent: () => {
                    var W;
                    (W = D.addMessageSent) === null || W === void 0 || W.call(D)
                },
                addMessageReceived: () => {
                    var W;
                    (W = D.addMessageReceived) === null || W === void 0 || W.call(D)
                },
                onCallEnd: (W) => {
                    var J;
                    (J = D.onCallEnd) === null || J === void 0 || J.call(D, W), this.removeActiveCall(Y)
                },
                onStreamEnd: (W) => {
                    var J;
                    (J = D.onStreamEnd) === null || J === void 0 || J.call(D, W)
                }
            };
            return Y = new eE6.Http2SubchannelCall(F, I, Z, this, AU6.getNextCallNumber()), this.addActiveCall(Y), Y
        }
        getChannelzRef() {
            return this.channelzRef
        }
        getPeerName() {
            return this.subchannelAddressString
        }
        getOptions() {
            return this.options
        }
        shutdown() {
            this.session.close(), QS1.unregisterChannelzRef(this.channelzRef)
        }
    }
    class Ue2 {
        constructor(A) {
            this.channelTarget = A, this.session = null, this.isShutdown = !1
        }
        trace(A) {
            dt.trace(q71.LogVerbosity.DEBUG, hX0, fX0.uriToString(this.channelTarget) + " " + A)
        }
        createSession(A, B, Q) {
            if (this.isShutdown) return Promise.reject();
            if (A.socket.closed) return Promise.reject("Connection closed before starting HTTP/2 handshake");
            return new Promise((Z, D) => {
                var G;
                let F = null,
                    I = this.channelTarget;
                if ("grpc.http_connect_target" in Q) {
                    let H = fX0.parseUri(Q["grpc.http_connect_target"]);
                    if (H) I = H, F = fX0.uriToString(H)
                }
                let Y = A.secure ? "https" : "http",
                    W = oE6.getDefaultAuthority(I),
                    J = () => {
                        var H;
                        (H = this.session) === null || H === void 0 || H.destroy(), this.session = null, setImmediate(() => {
                            if (!K) K = !0, D(`${C.trim()} (${new Date().toISOString()})`)
                        })
                    },
                    X = (H) => {
                        var z;
                        if ((z = this.session) === null || z === void 0 || z.destroy(), C = H.message, this.trace("connection failed with error " + C), !K) K = !0, D(`${C} (${new Date().toISOString()})`)
                    },
                    V = DS1.connect(`${Y}://${W}`, {
                        createConnection: (H, z) => {
                            return A.socket
                        },
                        settings: {
                            initialWindowSize: (G = Q["grpc-node.flow_control_window"]) !== null && G !== void 0 ? G : DS1.getDefaultSettings().initialWindowSize
                        }
                    });
                this.session = V;
                let C = "Failed to connect",
                    K = !1;
                V.unref(), V.once("remoteSettings", () => {
                    V.removeAllListeners(), A.socket.removeListener("close", J), A.socket.removeListener("error", X), Z(new Ee2(V, B, Q, F)), this.session = null
                }), V.once("close", J), V.once("error", X), A.socket.once("close", J), A.socket.once("error", X)
            })
        }
        tcpConnect(A, B) {
            return rE6.getProxiedConnection(A, B).then((Q) => {
                if (Q) return Q;
                else return new Promise((Z, D) => {
                    let G = () => {
                            D(new Error("Socket closed"))
                        },
                        F = (Y) => {
                            D(Y)
                        },
                        I = tE6.connect(A, () => {
                            I.removeListener("close", G), I.removeListener("error", F), Z(I)
                        });
                    I.once("close", G), I.once("error", F)
                })
            })
        }
        async connect(A, B, Q) {
            if (this.isShutdown) return Promise.reject();
            let Z = null,
                D = null,
                G = ZS1.subchannelAddressToString(A);
            try {
                return this.trace(G + " Waiting for secureConnector to be ready"), await B.waitForReady(), this.trace(G + " secureConnector is ready"), Z = await this.tcpConnect(A, Q), this.trace(G + " Established TCP connection"), D = await B.connect(Z), this.trace(G + " Established secure connection"), this.createSession(D, A, Q)
            } catch (F) {
                throw Z === null || Z === void 0 || Z.destroy(), D === null || D === void 0 || D.socket.destroy(), F
            }
        }
        shutdown() {
            var A;
            this.isShutdown = !0, (A = this.session) === null || A === void 0 || A.close(), this.session = null
        }
    }
    we2.Http2SubchannelConnector = Ue2
});
var Me2 = E((Ne2) => {
    Object.defineProperty(Ne2, "__esModule", {
        value: !0
    });
    Ne2.SubchannelPool = void 0;
    Ne2.getSubchannelPool = UU6;
    var XU6 = us2(),
        VU6 = st2(),
        CU6 = OE(),
        KU6 = mV(),
        HU6 = qe2(),
        zU6 = 1e4;
    class GS1 {
        constructor() {
            this.pool = Object.create(null), this.cleanupTimer = null
        }
        unrefUnusedSubchannels() {
            let A = !0;
            for (let B in this.pool) {
                let Z = this.pool[B].filter((D) => !D.subchannel.unrefIfOneRef());
                if (Z.length > 0) A = !1;
                this.pool[B] = Z
            }
            if (A && this.cleanupTimer !== null) clearInterval(this.cleanupTimer), this.cleanupTimer = null
        }
        ensureCleanupTask() {
            var A, B;
            if (this.cleanupTimer === null) this.cleanupTimer = setInterval(() => {
                this.unrefUnusedSubchannels()
            }, zU6), (B = (A = this.cleanupTimer).unref) === null || B === void 0 || B.call(A)
        }
        getOrCreateSubchannel(A, B, Q, Z) {
            this.ensureCleanupTask();
            let D = KU6.uriToString(A);
            if (D in this.pool) {
                let F = this.pool[D];
                for (let I of F)
                    if (CU6.subchannelAddressEqual(B, I.subchannelAddress) && XU6.channelOptionsEqual(Q, I.channelArguments) && Z._equals(I.channelCredentials)) return I.subchannel
            }
            let G = new VU6.Subchannel(A, B, Q, Z, new HU6.Http2SubchannelConnector(A));
            if (!(D in this.pool)) this.pool[D] = [];
            return this.pool[D].push({
                subchannelAddress: B,
                channelArguments: Q,
                channelCredentials: Z,
                subchannel: G
            }), G.ref(), G
        }
    }
    Ne2.SubchannelPool = GS1;
    var EU6 = new GS1;

    function UU6(A) {
        if (A) return EU6;
        else return new GS1
    }
});