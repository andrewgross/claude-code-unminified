/* chunk:349 bytes:[8224796, 8276967) size:52171 source:unpacked-cli.js */
var o1B = E(($x) => {
    var mw6 = $x && $x.__runInitializers || function(A, B, Q) {
            var Z = arguments.length > 2;
            for (var D = 0; D < B.length; D++) Q = Z ? B[D].call(A, Q) : B[D].call(A);
            return Z ? Q : void 0
        },
        dw6 = $x && $x.__esDecorate || function(A, B, Q, Z, D, G) {
            function F($) {
                if ($ !== void 0 && typeof $ !== "function") throw new TypeError("Function expected");
                return $
            }
            var I = Z.kind,
                Y = I === "getter" ? "get" : I === "setter" ? "set" : "value",
                W = !B && A ? Z.static ? A : A.prototype : null,
                J = B || (W ? Object.getOwnPropertyDescriptor(W, Z.name) : {}),
                X, V = !1;
            for (var C = Q.length - 1; C >= 0; C--) {
                var K = {};
                for (var H in Z) K[H] = H === "access" ? {} : Z[H];
                for (var H in Z.access) K.access[H] = Z.access[H];
                K.addInitializer = function($) {
                    if (V) throw new TypeError("Cannot add initializers after decoration has completed");
                    G.push(F($ || null))
                };
                var z = Q[C](I === "accessor" ? {
                    get: J.get,
                    set: J.set
                } : J[Y], K);
                if (I === "accessor") {
                    if (z === void 0) continue;
                    if (z === null || typeof z !== "object") throw new TypeError("Object expected");
                    if (X = F(z.get)) J.get = X;
                    if (X = F(z.set)) J.set = X;
                    if (X = F(z.init)) D.unshift(X)
                } else if (X = F(z))
                    if (I === "field") D.unshift(X);
                    else J[Y] = X
            }
            if (W) Object.defineProperty(W, Z.name, J);
            V = !0
        };
    Object.defineProperty($x, "__esModule", {
        value: !0
    });
    $x.Server = void 0;
    var lV = W1("http2"),
        cw6 = W1("util"),
        KG = b6(),
        st = P1B(),
        JV0 = HS1(),
        p1B = DM(),
        at = I7(),
        wx = OE(),
        V$ = mV(),
        yF = Hm(),
        i1B = WV0(),
        nt = 2147483647,
        XV0 = 2147483647,
        lw6 = 20000,
        n1B = 2147483647,
        {
            HTTP2_HEADER_PATH: a1B
        } = lV.constants,
        pw6 = "server",
        s1B = Buffer.from("max_age");

    function r1B(A) {
        at.trace(KG.LogVerbosity.DEBUG, "server_call", A)
    }

    function iw6() {}

    function nw6(A) {
        return function(B, Q) {
            return cw6.deprecate(B, A)
        }
    }

    function VV0(A) {
        return {
            code: KG.Status.UNIMPLEMENTED,
            details: `The server does not implement the method ${A}`
        }
    }

    function aw6(A, B) {
        let Q = VV0(B);
        switch (A) {
            case "unary":
                return (Z, D) => {
                    D(Q, null)
                };
            case "clientStream":
                return (Z, D) => {
                    D(Q, null)
                };
            case "serverStream":
                return (Z) => {
                    Z.emit("error", Q)
                };
            case "bidi":
                return (Z) => {
                    Z.emit("error", Q)
                };
            default:
                throw new Error(`Invalid handlerType ${A}`)
        }
    }
    var sw6 = (() => {
        var A;
        let B = [],
            Q;
        return A = class Z {
            constructor(D) {
                var G, F, I, Y, W, J;
                if (this.boundPorts = (mw6(this, B), new Map), this.http2Servers = new Map, this.sessionIdleTimeouts = new Map, this.handlers = new Map, this.sessions = new Map, this.started = !1, this.shutdown = !1, this.serverAddressString = "null", this.channelzEnabled = !0, this.options = D !== null && D !== void 0 ? D : {}, this.options["grpc.enable_channelz"] === 0) this.channelzEnabled = !1, this.channelzTrace = new yF.ChannelzTraceStub, this.callTracker = new yF.ChannelzCallTrackerStub, this.listenerChildrenTracker = new yF.ChannelzChildrenTrackerStub, this.sessionChildrenTracker = new yF.ChannelzChildrenTrackerStub;
                else this.channelzTrace = new yF.ChannelzTrace, this.callTracker = new yF.ChannelzCallTracker, this.listenerChildrenTracker = new yF.ChannelzChildrenTracker, this.sessionChildrenTracker = new yF.ChannelzChildrenTracker;
                if (this.channelzRef = yF.registerChannelzServer("server", () => this.getChannelzInfo(), this.channelzEnabled), this.channelzTrace.addTrace("CT_INFO", "Server created"), this.maxConnectionAgeMs = (G = this.options["grpc.max_connection_age_ms"]) !== null && G !== void 0 ? G : nt, this.maxConnectionAgeGraceMs = (F = this.options["grpc.max_connection_age_grace_ms"]) !== null && F !== void 0 ? F : nt, this.keepaliveTimeMs = (I = this.options["grpc.keepalive_time_ms"]) !== null && I !== void 0 ? I : XV0, this.keepaliveTimeoutMs = (Y = this.options["grpc.keepalive_timeout_ms"]) !== null && Y !== void 0 ? Y : lw6, this.sessionIdleTimeout = (W = this.options["grpc.max_connection_idle_ms"]) !== null && W !== void 0 ? W : n1B, this.commonServerOptions = {
                        maxSendHeaderBlockLength: Number.MAX_SAFE_INTEGER
                    }, "grpc-node.max_session_memory" in this.options) this.commonServerOptions.maxSessionMemory = this.options["grpc-node.max_session_memory"];
                else this.commonServerOptions.maxSessionMemory = Number.MAX_SAFE_INTEGER;
                if ("grpc.max_concurrent_streams" in this.options) this.commonServerOptions.settings = {
                    maxConcurrentStreams: this.options["grpc.max_concurrent_streams"]
                };
                this.interceptors = (J = this.options.interceptors) !== null && J !== void 0 ? J : [], this.trace("Server constructed")
            }
            getChannelzInfo() {
                return {
                    trace: this.channelzTrace,
                    callTracker: this.callTracker,
                    listenerChildren: this.listenerChildrenTracker.getChildLists(),
                    sessionChildren: this.sessionChildrenTracker.getChildLists()
                }
            }
            getChannelzSessionInfo(D) {
                var G, F, I;
                let Y = this.sessions.get(D),
                    W = D.socket,
                    J = W.remoteAddress ? wx.stringToSubchannelAddress(W.remoteAddress, W.remotePort) : null,
                    X = W.localAddress ? wx.stringToSubchannelAddress(W.localAddress, W.localPort) : null,
                    V;
                if (D.encrypted) {
                    let K = W,
                        H = K.getCipher(),
                        z = K.getCertificate(),
                        $ = K.getPeerCertificate();
                    V = {
                        cipherSuiteStandardName: (G = H.standardName) !== null && G !== void 0 ? G : null,
                        cipherSuiteOtherName: H.standardName ? null : H.name,
                        localCertificate: z && "raw" in z ? z.raw : null,
                        remoteCertificate: $ && "raw" in $ ? $.raw : null
                    }
                } else V = null;
                return {
                    remoteAddress: J,
                    localAddress: X,
                    security: V,
                    remoteName: null,
                    streamsStarted: Y.streamTracker.callsStarted,
                    streamsSucceeded: Y.streamTracker.callsSucceeded,
                    streamsFailed: Y.streamTracker.callsFailed,
                    messagesSent: Y.messagesSent,
                    messagesReceived: Y.messagesReceived,
                    keepAlivesSent: Y.keepAlivesSent,
                    lastLocalStreamCreatedTimestamp: null,
                    lastRemoteStreamCreatedTimestamp: Y.streamTracker.lastCallStartedTimestamp,
                    lastMessageSentTimestamp: Y.lastMessageSentTimestamp,
                    lastMessageReceivedTimestamp: Y.lastMessageReceivedTimestamp,
                    localFlowControlWindow: (F = D.state.localWindowSize) !== null && F !== void 0 ? F : null,
                    remoteFlowControlWindow: (I = D.state.remoteWindowSize) !== null && I !== void 0 ? I : null
                }
            }
            trace(D) {
                at.trace(KG.LogVerbosity.DEBUG, pw6, "(" + this.channelzRef.id + ") " + D)
            }
            keepaliveTrace(D) {
                at.trace(KG.LogVerbosity.DEBUG, "keepalive", "(" + this.channelzRef.id + ") " + D)
            }
            addProtoService() {
                throw new Error("Not implemented. Use addService() instead")
            }
            addService(D, G) {
                if (D === null || typeof D !== "object" || G === null || typeof G !== "object") throw new Error("addService() requires two objects as arguments");
                let F = Object.keys(D);
                if (F.length === 0) throw new Error("Cannot add an empty service to a server");
                F.forEach((I) => {
                    let Y = D[I],
                        W;
                    if (Y.requestStream)
                        if (Y.responseStream) W = "bidi";
                        else W = "clientStream";
                    else if (Y.responseStream) W = "serverStream";
                    else W = "unary";
                    let J = G[I],
                        X;
                    if (J === void 0 && typeof Y.originalName === "string") J = G[Y.originalName];
                    if (J !== void 0) X = J.bind(G);
                    else X = aw6(W, I);
                    if (this.register(Y.path, X, Y.responseSerialize, Y.requestDeserialize, W) === !1) throw new Error(`Method handler for ${Y.path} already provided.`)
                })
            }
            removeService(D) {
                if (D === null || typeof D !== "object") throw new Error("removeService() requires object as argument");
                Object.keys(D).forEach((F) => {
                    let I = D[F];
                    this.unregister(I.path)
                })
            }
            bind(D, G) {
                throw new Error("Not implemented. Use bindAsync() instead")
            }
            experimentalRegisterListenerToChannelz(D) {
                return yF.registerChannelzSocket(wx.subchannelAddressToString(D), () => {
                    return {
                        localAddress: D,
                        remoteAddress: null,
                        security: null,
                        remoteName: null,
                        streamsStarted: 0,
                        streamsSucceeded: 0,
                        streamsFailed: 0,
                        messagesSent: 0,
                        messagesReceived: 0,
                        keepAlivesSent: 0,
                        lastLocalStreamCreatedTimestamp: null,
                        lastRemoteStreamCreatedTimestamp: null,
                        lastMessageSentTimestamp: null,
                        lastMessageReceivedTimestamp: null,
                        localFlowControlWindow: null,
                        remoteFlowControlWindow: null
                    }
                }, this.channelzEnabled)
            }
            experimentalUnregisterListenerFromChannelz(D) {
                yF.unregisterChannelzRef(D)
            }
            createHttp2Server(D) {
                let G;
                if (D._isSecure()) {
                    let F = D._getConstructorOptions(),
                        I = D._getSecureContextOptions(),
                        Y = Object.assign(Object.assign(Object.assign(Object.assign({}, this.commonServerOptions), F), I), {
                            enableTrace: this.options["grpc-node.tls_enable_trace"] === 1
                        }),
                        W = I !== null;
                    this.trace("Initial credentials valid: " + W), G = lV.createSecureServer(Y), G.prependListener("connection", (X) => {
                        if (!W) this.trace("Dropped connection from " + JSON.stringify(X.address()) + " due to unloaded credentials"), X.destroy()
                    }), G.on("secureConnection", (X) => {
                        X.on("error", (V) => {
                            this.trace("An incoming TLS connection closed with error: " + V.message)
                        })
                    });
                    let J = (X) => {
                        if (X) {
                            let V = G;
                            try {
                                V.setSecureContext(X)
                            } catch (C) {
                                at.log(KG.LogVerbosity.ERROR, "Failed to set secure context with error " + C.message), X = null
                            }
                        }
                        W = X !== null, this.trace("Post-update credentials valid: " + W)
                    };
                    D._addWatcher(J), G.on("close", () => {
                        D._removeWatcher(J)
                    })
                } else G = lV.createServer(this.commonServerOptions);
                return G.setTimeout(0, iw6), this._setupHandlers(G, D._getInterceptors()), G
            }
            bindOneAddress(D, G) {
                this.trace("Attempting to bind " + wx.subchannelAddressToString(D));
                let F = this.createHttp2Server(G.credentials);
                return new Promise((I, Y) => {
                    let W = (J) => {
                        this.trace("Failed to bind " + wx.subchannelAddressToString(D) + " with error " + J.message), I({
                            port: "port" in D ? D.port : 1,
                            error: J.message
                        })
                    };
                    F.once("error", W), F.listen(D, () => {
                        let J = F.address(),
                            X;
                        if (typeof J === "string") X = {
                            path: J
                        };
                        else X = {
                            host: J.address,
                            port: J.port
                        };
                        let V = this.experimentalRegisterListenerToChannelz(X);
                        this.listenerChildrenTracker.refChild(V), this.http2Servers.set(F, {
                            channelzRef: V,
                            sessions: new Set,
                            ownsChannelzRef: !0
                        }), G.listeningServers.add(F), this.trace("Successfully bound " + wx.subchannelAddressToString(X)), I({
                            port: "port" in X ? X.port : 1
                        }), F.removeListener("error", W)
                    })
                })
            }
            async bindManyPorts(D, G) {
                if (D.length === 0) return {
                    count: 0,
                    port: 0,
                    errors: []
                };
                if (wx.isTcpSubchannelAddress(D[0]) && D[0].port === 0) {
                    let F = await this.bindOneAddress(D[0], G);
                    if (F.error) {
                        let I = await this.bindManyPorts(D.slice(1), G);
                        return Object.assign(Object.assign({}, I), {
                            errors: [F.error, ...I.errors]
                        })
                    } else {
                        let I = D.slice(1).map((J) => wx.isTcpSubchannelAddress(J) ? {
                                host: J.host,
                                port: F.port
                            } : J),
                            Y = await Promise.all(I.map((J) => this.bindOneAddress(J, G))),
                            W = [F, ...Y];
                        return {
                            count: W.filter((J) => J.error === void 0).length,
                            port: F.port,
                            errors: W.filter((J) => J.error).map((J) => J.error)
                        }
                    }
                } else {
                    let F = await Promise.all(D.map((I) => this.bindOneAddress(I, G)));
                    return {
                        count: F.filter((I) => I.error === void 0).length,
                        port: F[0].port,
                        errors: F.filter((I) => I.error).map((I) => I.error)
                    }
                }
            }
            async bindAddressList(D, G) {
                let F = await this.bindManyPorts(D, G);
                if (F.count > 0) {
                    if (F.count < D.length) at.log(KG.LogVerbosity.INFO, `WARNING Only ${F.count} addresses added out of total ${D.length} resolved`);
                    return F.port
                } else {
                    let I = `No address added out of total ${D.length} resolved`;
                    throw at.log(KG.LogVerbosity.ERROR, I), new Error(`${I} errors: [${F.errors.join(",")}]`)
                }
            }
            resolvePort(D) {
                return new Promise((G, F) => {
                    let I = {
                        onSuccessfulResolution: (W, J, X) => {
                            I.onSuccessfulResolution = () => {};
                            let V = [].concat(...W.map((C) => C.addresses));
                            if (V.length === 0) {
                                F(new Error(`No addresses resolved for port ${D}`));
                                return
                            }
                            G(V)
                        },
                        onError: (W) => {
                            F(new Error(W.details))
                        }
                    };
                    p1B.createResolver(D, I, this.options).updateResolution()
                })
            }
            async bindPort(D, G) {
                let F = await this.resolvePort(D);
                if (G.cancelled) throw this.completeUnbind(G), new Error("bindAsync operation cancelled by unbind call");
                let I = await this.bindAddressList(F, G);
                if (G.cancelled) throw this.completeUnbind(G), new Error("bindAsync operation cancelled by unbind call");
                return I
            }
            normalizePort(D) {
                let G = V$.parseUri(D);
                if (G === null) throw new Error(`Could not parse port "${D}"`);
                let F = p1B.mapUriDefaultScheme(G);
                if (F === null) throw new Error(`Could not get a default scheme for port "${D}"`);
                return F
            }
            bindAsync(D, G, F) {
                if (this.shutdown) throw new Error("bindAsync called after shutdown");
                if (typeof D !== "string") throw new TypeError("port must be a string");
                if (G === null || !(G instanceof JV0.ServerCredentials)) throw new TypeError("creds must be a ServerCredentials object");
                if (typeof F !== "function") throw new TypeError("callback must be a function");
                this.trace("bindAsync port=" + D);
                let I = this.normalizePort(D),
                    Y = (V, C) => {
                        process.nextTick(() => F(V, C))
                    },
                    W = this.boundPorts.get(V$.uriToString(I));
                if (W) {
                    if (!G._equals(W.credentials)) {
                        Y(new Error(`${D} already bound with incompatible credentials`), 0);
                        return
                    }
                    if (W.cancelled = !1, W.completionPromise) W.completionPromise.then((V) => F(null, V), (V) => F(V, 0));
                    else Y(null, W.portNumber);
                    return
                }
                W = {
                    mapKey: V$.uriToString(I),
                    originalUri: I,
                    completionPromise: null,
                    cancelled: !1,
                    portNumber: 0,
                    credentials: G,
                    listeningServers: new Set
                };
                let J = V$.splitHostPort(I.path),
                    X = this.bindPort(I, W);
                if (W.completionPromise = X, (J === null || J === void 0 ? void 0 : J.port) === 0) X.then((V) => {
                    let C = {
                        scheme: I.scheme,
                        authority: I.authority,
                        path: V$.combineHostPort({
                            host: J.host,
                            port: V
                        })
                    };
                    W.mapKey = V$.uriToString(C), W.completionPromise = null, W.portNumber = V, this.boundPorts.set(W.mapKey, W), F(null, V)
                }, (V) => {
                    F(V, 0)
                });
                else this.boundPorts.set(W.mapKey, W), X.then((V) => {
                    W.completionPromise = null, W.portNumber = V, F(null, V)
                }, (V) => {
                    F(V, 0)
                })
            }
            registerInjectorToChannelz() {
                return yF.registerChannelzSocket("injector", () => {
                    return {
                        localAddress: null,
                        remoteAddress: null,
                        security: null,
                        remoteName: null,
                        streamsStarted: 0,
                        streamsSucceeded: 0,
                        streamsFailed: 0,
                        messagesSent: 0,
                        messagesReceived: 0,
                        keepAlivesSent: 0,
                        lastLocalStreamCreatedTimestamp: null,
                        lastRemoteStreamCreatedTimestamp: null,
                        lastMessageSentTimestamp: null,
                        lastMessageReceivedTimestamp: null,
                        localFlowControlWindow: null,
                        remoteFlowControlWindow: null
                    }
                }, this.channelzEnabled)
            }
            experimentalCreateConnectionInjectorWithChannelzRef(D, G, F = !1) {
                if (D === null || !(D instanceof JV0.ServerCredentials)) throw new TypeError("creds must be a ServerCredentials object");
                if (this.channelzEnabled) this.listenerChildrenTracker.refChild(G);
                let I = this.createHttp2Server(D),
                    Y = new Set;
                return this.http2Servers.set(I, {
                    channelzRef: G,
                    sessions: Y,
                    ownsChannelzRef: F
                }), {
                    injectConnection: (W) => {
                        I.emit("connection", W)
                    },
                    drain: (W) => {
                        var J, X;
                        for (let V of Y) this.closeSession(V);
                        (X = (J = setTimeout(() => {
                            for (let V of Y) V.destroy(lV.constants.NGHTTP2_CANCEL)
                        }, W)).unref) === null || X === void 0 || X.call(J)
                    },
                    destroy: () => {
                        this.closeServer(I);
                        for (let W of Y) this.closeSession(W)
                    }
                }
            }
            createConnectionInjector(D) {
                if (D === null || !(D instanceof JV0.ServerCredentials)) throw new TypeError("creds must be a ServerCredentials object");
                let G = this.registerInjectorToChannelz();
                return this.experimentalCreateConnectionInjectorWithChannelzRef(D, G, !0)
            }
            closeServer(D, G) {
                this.trace("Closing server with address " + JSON.stringify(D.address()));
                let F = this.http2Servers.get(D);
                D.close(() => {
                    if (F && F.ownsChannelzRef) this.listenerChildrenTracker.unrefChild(F.channelzRef), yF.unregisterChannelzRef(F.channelzRef);
                    this.http2Servers.delete(D), G === null || G === void 0 || G()
                })
            }
            closeSession(D, G) {
                var F;
                this.trace("Closing session initiated by " + ((F = D.socket) === null || F === void 0 ? void 0 : F.remoteAddress));
                let I = this.sessions.get(D),
                    Y = () => {
                        if (I) this.sessionChildrenTracker.unrefChild(I.ref), yF.unregisterChannelzRef(I.ref);
                        G === null || G === void 0 || G()
                    };
                if (D.closed) queueMicrotask(Y);
                else D.close(Y)
            }
            completeUnbind(D) {
                for (let G of D.listeningServers) {
                    let F = this.http2Servers.get(G);
                    if (this.closeServer(G, () => {
                            D.listeningServers.delete(G)
                        }), F)
                        for (let I of F.sessions) this.closeSession(I)
                }
                this.boundPorts.delete(D.mapKey)
            }
            unbind(D) {
                this.trace("unbind port=" + D);
                let G = this.normalizePort(D),
                    F = V$.splitHostPort(G.path);
                if ((F === null || F === void 0 ? void 0 : F.port) === 0) throw new Error("Cannot unbind port 0");
                let I = this.boundPorts.get(V$.uriToString(G));
                if (I)
                    if (this.trace("unbinding " + I.mapKey + " originally bound as " + V$.uriToString(I.originalUri)), I.completionPromise) I.cancelled = !0;
                    else this.completeUnbind(I)
            }
            drain(D, G) {
                var F, I;
                this.trace("drain port=" + D + " graceTimeMs=" + G);
                let Y = this.normalizePort(D),
                    W = V$.splitHostPort(Y.path);
                if ((W === null || W === void 0 ? void 0 : W.port) === 0) throw new Error("Cannot drain port 0");
                let J = this.boundPorts.get(V$.uriToString(Y));
                if (!J) return;
                let X = new Set;
                for (let V of J.listeningServers) {
                    let C = this.http2Servers.get(V);
                    if (C)
                        for (let K of C.sessions) X.add(K), this.closeSession(K, () => {
                            X.delete(K)
                        })
                }(I = (F = setTimeout(() => {
                    for (let V of X) V.destroy(lV.constants.NGHTTP2_CANCEL)
                }, G)).unref) === null || I === void 0 || I.call(F)
            }
            forceShutdown() {
                for (let D of this.boundPorts.values()) D.cancelled = !0;
                this.boundPorts.clear();
                for (let D of this.http2Servers.keys()) this.closeServer(D);
                this.sessions.forEach((D, G) => {
                    this.closeSession(G), G.destroy(lV.constants.NGHTTP2_CANCEL)
                }), this.sessions.clear(), yF.unregisterChannelzRef(this.channelzRef), this.shutdown = !0
            }
            register(D, G, F, I, Y) {
                if (this.handlers.has(D)) return !1;
                return this.handlers.set(D, {
                    func: G,
                    serialize: F,
                    deserialize: I,
                    type: Y,
                    path: D
                }), !0
            }
            unregister(D) {
                return this.handlers.delete(D)
            }
            start() {
                if (this.http2Servers.size === 0 || [...this.http2Servers.keys()].every((D) => !D.listening)) throw new Error("server must be bound in order to start");
                if (this.started === !0) throw new Error("server is already started");
                this.started = !0
            }
            tryShutdown(D) {
                var G;
                let F = (W) => {
                        yF.unregisterChannelzRef(this.channelzRef), D(W)
                    },
                    I = 0;

                function Y() {
                    if (I--, I === 0) F()
                }
                this.shutdown = !0;
                for (let [W, J] of this.http2Servers.entries()) {
                    I++;
                    let X = J.channelzRef.name;
                    this.trace("Waiting for server " + X + " to close"), this.closeServer(W, () => {
                        this.trace("Server " + X + " finished closing"), Y()
                    });
                    for (let V of J.sessions.keys()) {
                        I++;
                        let C = (G = V.socket) === null || G === void 0 ? void 0 : G.remoteAddress;
                        this.trace("Waiting for session " + C + " to close"), this.closeSession(V, () => {
                            this.trace("Session " + C + " finished closing"), Y()
                        })
                    }
                }
                if (I === 0) F()
            }
            addHttp2Port() {
                throw new Error("Not yet implemented")
            }
            getChannelzRef() {
                return this.channelzRef
            }
            _verifyContentType(D, G) {
                let F = G[lV.constants.HTTP2_HEADER_CONTENT_TYPE];
                if (typeof F !== "string" || !F.startsWith("application/grpc")) return D.respond({
                    [lV.constants.HTTP2_HEADER_STATUS]: lV.constants.HTTP_STATUS_UNSUPPORTED_MEDIA_TYPE
                }, {
                    endStream: !0
                }), !1;
                return !0
            }
            _retrieveHandler(D) {
                r1B("Received call to method " + D + " at address " + this.serverAddressString);
                let G = this.handlers.get(D);
                if (G === void 0) return r1B("No handler registered for method " + D + ". Sending UNIMPLEMENTED status."), null;
                return G
            }
            _respondWithError(D, G, F = null) {
                var I, Y;
                let W = Object.assign({
                    "grpc-status": (I = D.code) !== null && I !== void 0 ? I : KG.Status.INTERNAL,
                    "grpc-message": D.details,
                    [lV.constants.HTTP2_HEADER_STATUS]: lV.constants.HTTP_STATUS_OK,
                    [lV.constants.HTTP2_HEADER_CONTENT_TYPE]: "application/grpc+proto"
                }, (Y = D.metadata) === null || Y === void 0 ? void 0 : Y.toHttp2Headers());
                G.respond(W, {
                    endStream: !0
                }), this.callTracker.addCallFailed(), F === null || F === void 0 || F.streamTracker.addCallFailed()
            }
            _channelzHandler(D, G, F) {
                this.onStreamOpened(G);
                let I = this.sessions.get(G.session);
                if (this.callTracker.addCallStarted(), I === null || I === void 0 || I.streamTracker.addCallStarted(), !this._verifyContentType(G, F)) {
                    this.callTracker.addCallFailed(), I === null || I === void 0 || I.streamTracker.addCallFailed();
                    return
                }
                let Y = F[a1B],
                    W = this._retrieveHandler(Y);
                if (!W) {
                    this._respondWithError(VV0(Y), G, I);
                    return
                }
                let J = {
                        addMessageSent: () => {
                            if (I) I.messagesSent += 1, I.lastMessageSentTimestamp = new Date
                        },
                        addMessageReceived: () => {
                            if (I) I.messagesReceived += 1, I.lastMessageReceivedTimestamp = new Date
                        },
                        onCallEnd: (V) => {
                            if (V.code === KG.Status.OK) this.callTracker.addCallSucceeded();
                            else this.callTracker.addCallFailed()
                        },
                        onStreamEnd: (V) => {
                            if (I)
                                if (V) I.streamTracker.addCallSucceeded();
                                else I.streamTracker.addCallFailed()
                        }
                    },
                    X = i1B.getServerInterceptingCall([...D, ...this.interceptors], G, F, J, W, this.options);
                if (!this._runHandlerForCall(X, W)) this.callTracker.addCallFailed(), I === null || I === void 0 || I.streamTracker.addCallFailed(), X.sendStatus({
                    code: KG.Status.INTERNAL,
                    details: `Unknown handler type: ${W.type}`
                })
            }
            _streamHandler(D, G, F) {
                if (this.onStreamOpened(G), this._verifyContentType(G, F) !== !0) return;
                let I = F[a1B],
                    Y = this._retrieveHandler(I);
                if (!Y) {
                    this._respondWithError(VV0(I), G, null);
                    return
                }
                let W = i1B.getServerInterceptingCall([...D, ...this.interceptors], G, F, null, Y, this.options);
                if (!this._runHandlerForCall(W, Y)) W.sendStatus({
                    code: KG.Status.INTERNAL,
                    details: `Unknown handler type: ${Y.type}`
                })
            }
            _runHandlerForCall(D, G) {
                let {
                    type: F
                } = G;
                if (F === "unary") rw6(D, G);
                else if (F === "clientStream") ow6(D, G);
                else if (F === "serverStream") tw6(D, G);
                else if (F === "bidi") ew6(D, G);
                else return !1;
                return !0
            }
            _setupHandlers(D, G) {
                if (D === null) return;
                let F = D.address(),
                    I = "null";
                if (F)
                    if (typeof F === "string") I = F;
                    else I = F.address + ":" + F.port;
                this.serverAddressString = I;
                let Y = this.channelzEnabled ? this._channelzHandler : this._streamHandler,
                    W = this.channelzEnabled ? this._channelzSessionHandler(D) : this._sessionHandler(D);
                D.on("stream", Y.bind(this, G)), D.on("session", W)
            }
            _sessionHandler(D) {
                return (G) => {
                    var F, I;
                    (F = this.http2Servers.get(D)) === null || F === void 0 || F.sessions.add(G);
                    let Y = null,
                        W = null,
                        J = null,
                        X = !1,
                        V = this.enableIdleTimeout(G);
                    if (this.maxConnectionAgeMs !== nt) {
                        let $ = this.maxConnectionAgeMs / 10,
                            L = Math.random() * $ * 2 - $;
                        Y = setTimeout(() => {
                            var N, R;
                            X = !0, this.trace("Connection dropped by max connection age: " + ((N = G.socket) === null || N === void 0 ? void 0 : N.remoteAddress));
                            try {
                                G.goaway(lV.constants.NGHTTP2_NO_ERROR, 2147483647, s1B)
                            } catch (O) {
                                G.destroy();
                                return
                            }
                            if (G.close(), this.maxConnectionAgeGraceMs !== nt) W = setTimeout(() => {
                                G.destroy()
                            }, this.maxConnectionAgeGraceMs), (R = W.unref) === null || R === void 0 || R.call(W)
                        }, this.maxConnectionAgeMs + L), (I = Y.unref) === null || I === void 0 || I.call(Y)
                    }
                    let C = () => {
                            if (J) clearTimeout(J), J = null
                        },
                        K = () => {
                            return !G.destroyed && this.keepaliveTimeMs < XV0 && this.keepaliveTimeMs > 0
                        },
                        H, z = () => {
                            var $;
                            if (!K()) return;
                            this.keepaliveTrace("Starting keepalive timer for " + this.keepaliveTimeMs + "ms"), J = setTimeout(() => {
                                C(), H()
                            }, this.keepaliveTimeMs), ($ = J.unref) === null || $ === void 0 || $.call(J)
                        };
                    H = () => {
                        var $;
                        if (!K()) return;
                        this.keepaliveTrace("Sending ping with timeout " + this.keepaliveTimeoutMs + "ms");
                        let L = "";
                        try {
                            if (!G.ping((R, O, P) => {
                                    if (C(), R) this.keepaliveTrace("Ping failed with error: " + R.message), X = !0, G.close();
                                    else this.keepaliveTrace("Received ping response"), z()
                                })) L = "Ping returned false"
                        } catch (N) {
                            L = (N instanceof Error ? N.message : "") || "Unknown error"
                        }
                        if (L) {
                            this.keepaliveTrace("Ping send failed: " + L), this.trace("Connection dropped due to ping send error: " + L), X = !0, G.close();
                            return
                        }
                        J = setTimeout(() => {
                            C(), this.keepaliveTrace("Ping timeout passed without response"), this.trace("Connection dropped by keepalive timeout"), X = !0, G.close()
                        }, this.keepaliveTimeoutMs), ($ = J.unref) === null || $ === void 0 || $.call(J)
                    }, z(), G.on("close", () => {
                        var $, L;
                        if (!X) this.trace(`Connection dropped by client ${($=G.socket)===null||$===void 0?void 0:$.remoteAddress}`);
                        if (Y) clearTimeout(Y);
                        if (W) clearTimeout(W);
                        if (C(), V !== null) clearTimeout(V.timeout), this.sessionIdleTimeouts.delete(G);
                        (L = this.http2Servers.get(D)) === null || L === void 0 || L.sessions.delete(G)
                    })
                }
            }
            _channelzSessionHandler(D) {
                return (G) => {
                    var F, I, Y, W;
                    let J = yF.registerChannelzSocket((I = (F = G.socket) === null || F === void 0 ? void 0 : F.remoteAddress) !== null && I !== void 0 ? I : "unknown", this.getChannelzSessionInfo.bind(this, G), this.channelzEnabled),
                        X = {
                            ref: J,
                            streamTracker: new yF.ChannelzCallTracker,
                            messagesSent: 0,
                            messagesReceived: 0,
                            keepAlivesSent: 0,
                            lastMessageSentTimestamp: null,
                            lastMessageReceivedTimestamp: null
                        };
                    (Y = this.http2Servers.get(D)) === null || Y === void 0 || Y.sessions.add(G), this.sessions.set(G, X);
                    let V = `${G.socket.remoteAddress}:${G.socket.remotePort}`;
                    this.channelzTrace.addTrace("CT_INFO", "Connection established by client " + V), this.trace("Connection established by client " + V), this.sessionChildrenTracker.refChild(J);
                    let C = null,
                        K = null,
                        H = null,
                        z = !1,
                        $ = this.enableIdleTimeout(G);
                    if (this.maxConnectionAgeMs !== nt) {
                        let P = this.maxConnectionAgeMs / 10,
                            j = Math.random() * P * 2 - P;
                        C = setTimeout(() => {
                            var f;
                            z = !0, this.channelzTrace.addTrace("CT_INFO", "Connection dropped by max connection age from " + V);
                            try {
                                G.goaway(lV.constants.NGHTTP2_NO_ERROR, 2147483647, s1B)
                            } catch (k) {
                                G.destroy();
                                return
                            }
                            if (G.close(), this.maxConnectionAgeGraceMs !== nt) K = setTimeout(() => {
                                G.destroy()
                            }, this.maxConnectionAgeGraceMs), (f = K.unref) === null || f === void 0 || f.call(K)
                        }, this.maxConnectionAgeMs + j), (W = C.unref) === null || W === void 0 || W.call(C)
                    }
                    let L = () => {
                            if (H) clearTimeout(H), H = null
                        },
                        N = () => {
                            return !G.destroyed && this.keepaliveTimeMs < XV0 && this.keepaliveTimeMs > 0
                        },
                        R, O = () => {
                            var P;
                            if (!N()) return;
                            this.keepaliveTrace("Starting keepalive timer for " + this.keepaliveTimeMs + "ms"), H = setTimeout(() => {
                                L(), R()
                            }, this.keepaliveTimeMs), (P = H.unref) === null || P === void 0 || P.call(H)
                        };
                    R = () => {
                        var P;
                        if (!N()) return;
                        this.keepaliveTrace("Sending ping with timeout " + this.keepaliveTimeoutMs + "ms");
                        let j = "";
                        try {
                            if (!G.ping((k, c, u) => {
                                    if (L(), k) this.keepaliveTrace("Ping failed with error: " + k.message), this.channelzTrace.addTrace("CT_INFO", "Connection dropped due to error of a ping frame " + k.message + " return in " + c), z = !0, G.close();
                                    else this.keepaliveTrace("Received ping response"), O()
                                })) j = "Ping returned false"
                        } catch (f) {
                            j = (f instanceof Error ? f.message : "") || "Unknown error"
                        }
                        if (j) {
                            this.keepaliveTrace("Ping send failed: " + j), this.channelzTrace.addTrace("CT_INFO", "Connection dropped due to ping send error: " + j), z = !0, G.close();
                            return
                        }
                        X.keepAlivesSent += 1, H = setTimeout(() => {
                            L(), this.keepaliveTrace("Ping timeout passed without response"), this.channelzTrace.addTrace("CT_INFO", "Connection dropped by keepalive timeout from " + V), z = !0, G.close()
                        }, this.keepaliveTimeoutMs), (P = H.unref) === null || P === void 0 || P.call(H)
                    }, O(), G.on("close", () => {
                        var P;
                        if (!z) this.channelzTrace.addTrace("CT_INFO", "Connection dropped by client " + V);
                        if (this.sessionChildrenTracker.unrefChild(J), yF.unregisterChannelzRef(J), C) clearTimeout(C);
                        if (K) clearTimeout(K);
                        if (L(), $ !== null) clearTimeout($.timeout), this.sessionIdleTimeouts.delete(G);
                        (P = this.http2Servers.get(D)) === null || P === void 0 || P.sessions.delete(G), this.sessions.delete(G)
                    })
                }
            }
            enableIdleTimeout(D) {
                var G, F;
                if (this.sessionIdleTimeout >= n1B) return null;
                let I = {
                    activeStreams: 0,
                    lastIdle: Date.now(),
                    onClose: this.onStreamClose.bind(this, D),
                    timeout: setTimeout(this.onIdleTimeout, this.sessionIdleTimeout, this, D)
                };
                (F = (G = I.timeout).unref) === null || F === void 0 || F.call(G), this.sessionIdleTimeouts.set(D, I);
                let {
                    socket: Y
                } = D;
                return this.trace("Enable idle timeout for " + Y.remoteAddress + ":" + Y.remotePort), I
            }
            onIdleTimeout(D, G) {
                let {
                    socket: F
                } = G, I = D.sessionIdleTimeouts.get(G);
                if (I !== void 0 && I.activeStreams === 0)
                    if (Date.now() - I.lastIdle >= D.sessionIdleTimeout) D.trace("Session idle timeout triggered for " + (F === null || F === void 0 ? void 0 : F.remoteAddress) + ":" + (F === null || F === void 0 ? void 0 : F.remotePort) + " last idle at " + I.lastIdle), D.closeSession(G);
                    else I.timeout.refresh()
            }
            onStreamOpened(D) {
                let G = D.session,
                    F = this.sessionIdleTimeouts.get(G);
                if (F) F.activeStreams += 1, D.once("close", F.onClose)
            }
            onStreamClose(D) {
                var G, F;
                let I = this.sessionIdleTimeouts.get(D);
                if (I) {
                    if (I.activeStreams -= 1, I.activeStreams === 0) I.lastIdle = Date.now(), I.timeout.refresh(), this.trace("Session onStreamClose" + ((G = D.socket) === null || G === void 0 ? void 0 : G.remoteAddress) + ":" + ((F = D.socket) === null || F === void 0 ? void 0 : F.remotePort) + " at " + I.lastIdle)
                }
            }
        }, (() => {
            let Z = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            if (Q = [nw6("Calling start() is no longer necessary. It can be safely omitted.")], dw6(A, null, Q, {
                    kind: "method",
                    name: "start",
                    static: !1,
                    private: !1,
                    access: {
                        has: (D) => ("start" in D),
                        get: (D) => D.start
                    },
                    metadata: Z
                }, null, B), Z) Object.defineProperty(A, Symbol.metadata, {
                enumerable: !0,
                configurable: !0,
                writable: !0,
                value: Z
            })
        })(), A
    })();
    $x.Server = sw6;
    async function rw6(A, B) {
        let Q;

        function Z(F, I, Y, W) {
            if (F) {
                A.sendStatus(st.serverErrorToStatus(F, Y));
                return
            }
            A.sendMessage(I, () => {
                A.sendStatus({
                    code: KG.Status.OK,
                    details: "OK",
                    metadata: Y !== null && Y !== void 0 ? Y : null
                })
            })
        }
        let D, G = null;
        A.start({
            onReceiveMetadata(F) {
                D = F, A.startRead()
            },
            onReceiveMessage(F) {
                if (G) {
                    A.sendStatus({
                        code: KG.Status.UNIMPLEMENTED,
                        details: `Received a second request message for server streaming method ${B.path}`,
                        metadata: null
                    });
                    return
                }
                G = F, A.startRead()
            },
            onReceiveHalfClose() {
                if (!G) {
                    A.sendStatus({
                        code: KG.Status.UNIMPLEMENTED,
                        details: `Received no request message for server streaming method ${B.path}`,
                        metadata: null
                    });
                    return
                }
                Q = new st.ServerWritableStreamImpl(B.path, A, D, G);
                try {
                    B.func(Q, Z)
                } catch (F) {
                    A.sendStatus({
                        code: KG.Status.UNKNOWN,
                        details: `Server method handler threw error ${F.message}`,
                        metadata: null
                    })
                }
            },
            onCancel() {
                if (Q) Q.cancelled = !0, Q.emit("cancelled", "cancelled")
            }
        })
    }

    function ow6(A, B) {
        let Q;

        function Z(D, G, F, I) {
            if (D) {
                A.sendStatus(st.serverErrorToStatus(D, F));
                return
            }
            A.sendMessage(G, () => {
                A.sendStatus({
                    code: KG.Status.OK,
                    details: "OK",
                    metadata: F !== null && F !== void 0 ? F : null
                })
            })
        }
        A.start({
            onReceiveMetadata(D) {
                Q = new st.ServerDuplexStreamImpl(B.path, A, D);
                try {
                    B.func(Q, Z)
                } catch (G) {
                    A.sendStatus({
                        code: KG.Status.UNKNOWN,
                        details: `Server method handler threw error ${G.message}`,
                        metadata: null
                    })
                }
            },
            onReceiveMessage(D) {
                Q.push(D)
            },
            onReceiveHalfClose() {
                Q.push(null)
            },
            onCancel() {
                if (Q) Q.cancelled = !0, Q.emit("cancelled", "cancelled"), Q.destroy()
            }
        })
    }

    function tw6(A, B) {
        let Q, Z, D = null;
        A.start({
            onReceiveMetadata(G) {
                Z = G, A.startRead()
            },
            onReceiveMessage(G) {
                if (D) {
                    A.sendStatus({
                        code: KG.Status.UNIMPLEMENTED,
                        details: `Received a second request message for server streaming method ${B.path}`,
                        metadata: null
                    });
                    return
                }
                D = G, A.startRead()
            },
            onReceiveHalfClose() {
                if (!D) {
                    A.sendStatus({
                        code: KG.Status.UNIMPLEMENTED,
                        details: `Received no request message for server streaming method ${B.path}`,
                        metadata: null
                    });
                    return
                }
                Q = new st.ServerWritableStreamImpl(B.path, A, Z, D);
                try {
                    B.func(Q)
                } catch (G) {
                    A.sendStatus({
                        code: KG.Status.UNKNOWN,
                        details: `Server method handler threw error ${G.message}`,
                        metadata: null
                    })
                }
            },
            onCancel() {
                if (Q) Q.cancelled = !0, Q.emit("cancelled", "cancelled"), Q.destroy()
            }
        })
    }

    function ew6(A, B) {
        let Q;
        A.start({
            onReceiveMetadata(Z) {
                Q = new st.ServerDuplexStreamImpl(B.path, A, Z);
                try {
                    B.func(Q)
                } catch (D) {
                    A.sendStatus({
                        code: KG.Status.UNKNOWN,
                        details: `Server method handler threw error ${D.message}`,
                        metadata: null
                    })
                }
            },
            onReceiveMessage(Z) {
                Q.push(Z)
            },
            onReceiveHalfClose() {
                Q.push(null)
            },
            onCancel() {
                if (Q) Q.cancelled = !0, Q.emit("cancelled", "cancelled"), Q.destroy()
            }
        })
    }
});