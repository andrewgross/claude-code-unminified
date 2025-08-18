/* chunk:338 bytes:[8043260, 8059708) size:16448 source:unpacked-cli.js */
var Hm = E((lt2) => {
    var __dirname = "/home/runner/code/tmp/claude-cli-external-build-2232/node_modules/@grpc/grpc-js/build/src";
    Object.defineProperty(lt2, "__esModule", {
        value: !0
    });
    lt2.registerChannelzSocket = lt2.registerChannelzServer = lt2.registerChannelzSubchannel = lt2.registerChannelzChannel = lt2.ChannelzCallTrackerStub = lt2.ChannelzCallTracker = lt2.ChannelzChildrenTrackerStub = lt2.ChannelzChildrenTracker = lt2.ChannelzTrace = lt2.ChannelzTraceStub = void 0;
    lt2.unregisterChannelzRef = cz6;
    lt2.getChannelzHandlers = dt2;
    lt2.getChannelzServiceDefinition = ct2;
    lt2.setup = AE6;
    var oP1 = W1("net"),
        Km = Br2(),
        E71 = RE(),
        U71 = b6(),
        gz6 = OE(),
        uz6 = MP1(),
        mz6 = xJ0();

    function NX0(A) {
        return {
            channel_id: A.id,
            name: A.name
        }
    }

    function LX0(A) {
        return {
            subchannel_id: A.id,
            name: A.name
        }
    }

    function dz6(A) {
        return {
            server_id: A.id
        }
    }

    function tP1(A) {
        return {
            socket_id: A.id,
            name: A.name
        }
    }
    var kt2 = 32,
        MX0 = 100;
    class vt2 {
        constructor() {
            this.events = [], this.creationTimestamp = new Date, this.eventsLogged = 0
        }
        addTrace() {}
        getTraceMessage() {
            return {
                creation_timestamp: VM(this.creationTimestamp),
                num_events_logged: this.eventsLogged,
                events: []
            }
        }
    }
    lt2.ChannelzTraceStub = vt2;
    class bt2 {
        constructor() {
            this.events = [], this.eventsLogged = 0, this.creationTimestamp = new Date
        }
        addTrace(A, B, Q) {
            let Z = new Date;
            if (this.events.push({
                    description: B,
                    severity: A,
                    timestamp: Z,
                    childChannel: (Q === null || Q === void 0 ? void 0 : Q.kind) === "channel" ? Q : void 0,
                    childSubchannel: (Q === null || Q === void 0 ? void 0 : Q.kind) === "subchannel" ? Q : void 0
                }), this.events.length >= kt2 * 2) this.events = this.events.slice(kt2);
            this.eventsLogged += 1
        }
        getTraceMessage() {
            return {
                creation_timestamp: VM(this.creationTimestamp),
                num_events_logged: this.eventsLogged,
                events: this.events.map((A) => {
                    return {
                        description: A.description,
                        severity: A.severity,
                        timestamp: VM(A.timestamp),
                        channel_ref: A.childChannel ? NX0(A.childChannel) : null,
                        subchannel_ref: A.childSubchannel ? LX0(A.childSubchannel) : null
                    }
                })
            }
        }
    }
    lt2.ChannelzTrace = bt2;
    class RX0 {
        constructor() {
            this.channelChildren = new Km.OrderedMap, this.subchannelChildren = new Km.OrderedMap, this.socketChildren = new Km.OrderedMap, this.trackerMap = {
                ["channel"]: this.channelChildren,
                ["subchannel"]: this.subchannelChildren,
                ["socket"]: this.socketChildren
            }
        }
        refChild(A) {
            let B = this.trackerMap[A.kind],
                Q = B.find(A.id);
            if (Q.equals(B.end())) B.setElement(A.id, {
                ref: A,
                count: 1
            }, Q);
            else Q.pointer[1].count += 1
        }
        unrefChild(A) {
            let B = this.trackerMap[A.kind],
                Q = B.getElementByKey(A.id);
            if (Q !== void 0) {
                if (Q.count -= 1, Q.count === 0) B.eraseElementByKey(A.id)
            }
        }
        getChildLists() {
            return {
                channels: this.channelChildren,
                subchannels: this.subchannelChildren,
                sockets: this.socketChildren
            }
        }
    }
    lt2.ChannelzChildrenTracker = RX0;
    class ft2 extends RX0 {
        refChild() {}
        unrefChild() {}
    }
    lt2.ChannelzChildrenTrackerStub = ft2;
    class OX0 {
        constructor() {
            this.callsStarted = 0, this.callsSucceeded = 0, this.callsFailed = 0, this.lastCallStartedTimestamp = null
        }
        addCallStarted() {
            this.callsStarted += 1, this.lastCallStartedTimestamp = new Date
        }
        addCallSucceeded() {
            this.callsSucceeded += 1
        }
        addCallFailed() {
            this.callsFailed += 1
        }
    }
    lt2.ChannelzCallTracker = OX0;
    class ht2 extends OX0 {
        addCallStarted() {}
        addCallSucceeded() {}
        addCallFailed() {}
    }
    lt2.ChannelzCallTrackerStub = ht2;
    var SP = {
            ["channel"]: new Km.OrderedMap,
            ["subchannel"]: new Km.OrderedMap,
            ["server"]: new Km.OrderedMap,
            ["socket"]: new Km.OrderedMap
        },
        eP1 = (A) => {
            let B = 1;

            function Q() {
                return B++
            }
            let Z = SP[A];
            return (D, G, F) => {
                let I = Q(),
                    Y = {
                        id: I,
                        name: D,
                        kind: A
                    };
                if (F) Z.setElement(I, {
                    ref: Y,
                    getInfo: G
                });
                return Y
            }
        };
    lt2.registerChannelzChannel = eP1("channel");
    lt2.registerChannelzSubchannel = eP1("subchannel");
    lt2.registerChannelzServer = eP1("server");
    lt2.registerChannelzSocket = eP1("socket");

    function cz6(A) {
        SP[A.kind].eraseElementByKey(A.id)
    }

    function lz6(A) {
        let B = Number.parseInt(A, 16);
        return [B / 256 | 0, B % 256]
    }

    function yt2(A) {
        if (A === "") return [];
        let B = A.split(":").map((Z) => lz6(Z));
        return [].concat(...B)
    }

    function pz6(A) {
        return oP1.isIPv6(A) && A.toLowerCase().startsWith("::ffff:") && oP1.isIPv4(A.substring(7))
    }

    function _t2(A) {
        return Buffer.from(Uint8Array.from(A.split(".").map((B) => Number.parseInt(B))))
    }

    function iz6(A) {
        if (oP1.isIPv4(A)) return _t2(A);
        else if (pz6(A)) return _t2(A.substring(7));
        else if (oP1.isIPv6(A)) {
            let B, Q, Z = A.indexOf("::");
            if (Z === -1) B = A, Q = "";
            else B = A.substring(0, Z), Q = A.substring(Z + 2);
            let D = Buffer.from(yt2(B)),
                G = Buffer.from(yt2(Q)),
                F = Buffer.alloc(16 - D.length - G.length, 0);
            return Buffer.concat([D, F, G])
        } else return null
    }

    function gt2(A) {
        switch (A) {
            case E71.ConnectivityState.CONNECTING:
                return {
                    state: "CONNECTING"
                };
            case E71.ConnectivityState.IDLE:
                return {
                    state: "IDLE"
                };
            case E71.ConnectivityState.READY:
                return {
                    state: "READY"
                };
            case E71.ConnectivityState.SHUTDOWN:
                return {
                    state: "SHUTDOWN"
                };
            case E71.ConnectivityState.TRANSIENT_FAILURE:
                return {
                    state: "TRANSIENT_FAILURE"
                };
            default:
                return {
                    state: "UNKNOWN"
                }
        }
    }

    function VM(A) {
        if (!A) return null;
        let B = A.getTime();
        return {
            seconds: B / 1000 | 0,
            nanos: B % 1000 * 1e6
        }
    }

    function ut2(A) {
        let B = A.getInfo(),
            Q = [],
            Z = [];
        return B.children.channels.forEach((D) => {
            Q.push(NX0(D[1].ref))
        }), B.children.subchannels.forEach((D) => {
            Z.push(LX0(D[1].ref))
        }), {
            ref: NX0(A.ref),
            data: {
                target: B.target,
                state: gt2(B.state),
                calls_started: B.callTracker.callsStarted,
                calls_succeeded: B.callTracker.callsSucceeded,
                calls_failed: B.callTracker.callsFailed,
                last_call_started_timestamp: VM(B.callTracker.lastCallStartedTimestamp),
                trace: B.trace.getTraceMessage()
            },
            channel_ref: Q,
            subchannel_ref: Z
        }
    }

    function nz6(A, B) {
        let Q = parseInt(A.request.channel_id, 10),
            Z = SP.channel.getElementByKey(Q);
        if (Z === void 0) {
            B({
                code: U71.Status.NOT_FOUND,
                details: "No channel data found for id " + Q
            });
            return
        }
        B(null, {
            channel: ut2(Z)
        })
    }

    function az6(A, B) {
        let Q = parseInt(A.request.max_results, 10) || MX0,
            Z = [],
            D = parseInt(A.request.start_channel_id, 10),
            G = SP.channel,
            F;
        for (F = G.lowerBound(D); !F.equals(G.end()) && Z.length < Q; F = F.next()) Z.push(ut2(F.pointer[1]));
        B(null, {
            channel: Z,
            end: F.equals(G.end())
        })
    }

    function mt2(A) {
        let B = A.getInfo(),
            Q = [];
        return B.listenerChildren.sockets.forEach((Z) => {
            Q.push(tP1(Z[1].ref))
        }), {
            ref: dz6(A.ref),
            data: {
                calls_started: B.callTracker.callsStarted,
                calls_succeeded: B.callTracker.callsSucceeded,
                calls_failed: B.callTracker.callsFailed,
                last_call_started_timestamp: VM(B.callTracker.lastCallStartedTimestamp),
                trace: B.trace.getTraceMessage()
            },
            listen_socket: Q
        }
    }

    function sz6(A, B) {
        let Q = parseInt(A.request.server_id, 10),
            D = SP.server.getElementByKey(Q);
        if (D === void 0) {
            B({
                code: U71.Status.NOT_FOUND,
                details: "No server data found for id " + Q
            });
            return
        }
        B(null, {
            server: mt2(D)
        })
    }

    function rz6(A, B) {
        let Q = parseInt(A.request.max_results, 10) || MX0,
            Z = parseInt(A.request.start_server_id, 10),
            D = SP.server,
            G = [],
            F;
        for (F = D.lowerBound(Z); !F.equals(D.end()) && G.length < Q; F = F.next()) G.push(mt2(F.pointer[1]));
        B(null, {
            server: G,
            end: F.equals(D.end())
        })
    }

    function oz6(A, B) {
        let Q = parseInt(A.request.subchannel_id, 10),
            Z = SP.subchannel.getElementByKey(Q);
        if (Z === void 0) {
            B({
                code: U71.Status.NOT_FOUND,
                details: "No subchannel data found for id " + Q
            });
            return
        }
        let D = Z.getInfo(),
            G = [];
        D.children.sockets.forEach((I) => {
            G.push(tP1(I[1].ref))
        });
        let F = {
            ref: LX0(Z.ref),
            data: {
                target: D.target,
                state: gt2(D.state),
                calls_started: D.callTracker.callsStarted,
                calls_succeeded: D.callTracker.callsSucceeded,
                calls_failed: D.callTracker.callsFailed,
                last_call_started_timestamp: VM(D.callTracker.lastCallStartedTimestamp),
                trace: D.trace.getTraceMessage()
            },
            socket_ref: G
        };
        B(null, {
            subchannel: F
        })
    }

    function xt2(A) {
        var B;
        if (gz6.isTcpSubchannelAddress(A)) return {
            address: "tcpip_address",
            tcpip_address: {
                ip_address: (B = iz6(A.host)) !== null && B !== void 0 ? B : void 0,
                port: A.port
            }
        };
        else return {
            address: "uds_address",
            uds_address: {
                filename: A.path
            }
        }
    }

    function tz6(A, B) {
        var Q, Z, D, G, F;
        let I = parseInt(A.request.socket_id, 10),
            Y = SP.socket.getElementByKey(I);
        if (Y === void 0) {
            B({
                code: U71.Status.NOT_FOUND,
                details: "No socket data found for id " + I
            });
            return
        }
        let W = Y.getInfo(),
            J = W.security ? {
                model: "tls",
                tls: {
                    cipher_suite: W.security.cipherSuiteStandardName ? "standard_name" : "other_name",
                    standard_name: (Q = W.security.cipherSuiteStandardName) !== null && Q !== void 0 ? Q : void 0,
                    other_name: (Z = W.security.cipherSuiteOtherName) !== null && Z !== void 0 ? Z : void 0,
                    local_certificate: (D = W.security.localCertificate) !== null && D !== void 0 ? D : void 0,
                    remote_certificate: (G = W.security.remoteCertificate) !== null && G !== void 0 ? G : void 0
                }
            } : null,
            X = {
                ref: tP1(Y.ref),
                local: W.localAddress ? xt2(W.localAddress) : null,
                remote: W.remoteAddress ? xt2(W.remoteAddress) : null,
                remote_name: (F = W.remoteName) !== null && F !== void 0 ? F : void 0,
                security: J,
                data: {
                    keep_alives_sent: W.keepAlivesSent,
                    streams_started: W.streamsStarted,
                    streams_succeeded: W.streamsSucceeded,
                    streams_failed: W.streamsFailed,
                    last_local_stream_created_timestamp: VM(W.lastLocalStreamCreatedTimestamp),
                    last_remote_stream_created_timestamp: VM(W.lastRemoteStreamCreatedTimestamp),
                    messages_received: W.messagesReceived,
                    messages_sent: W.messagesSent,
                    last_message_received_timestamp: VM(W.lastMessageReceivedTimestamp),
                    last_message_sent_timestamp: VM(W.lastMessageSentTimestamp),
                    local_flow_control_window: W.localFlowControlWindow ? {
                        value: W.localFlowControlWindow
                    } : null,
                    remote_flow_control_window: W.remoteFlowControlWindow ? {
                        value: W.remoteFlowControlWindow
                    } : null
                }
            };
        B(null, {
            socket: X
        })
    }

    function ez6(A, B) {
        let Q = parseInt(A.request.server_id, 10),
            Z = SP.server.getElementByKey(Q);
        if (Z === void 0) {
            B({
                code: U71.Status.NOT_FOUND,
                details: "No server data found for id " + Q
            });
            return
        }
        let D = parseInt(A.request.start_socket_id, 10),
            G = parseInt(A.request.max_results, 10) || MX0,
            I = Z.getInfo().sessionChildren.sockets,
            Y = [],
            W;
        for (W = I.lowerBound(D); !W.equals(I.end()) && Y.length < G; W = W.next()) Y.push(tP1(W.pointer[1].ref));
        B(null, {
            socket_ref: Y,
            end: W.equals(I.end())
        })
    }

    function dt2() {
        return {
            GetChannel: nz6,
            GetTopChannels: az6,
            GetServer: sz6,
            GetServers: rz6,
            GetSubchannel: oz6,
            GetSocket: tz6,
            GetServerSockets: ez6
        }
    }
    var rP1 = null;

    function ct2() {
        if (rP1) return rP1;
        let A = jt2().loadSync,
            B = A("channelz.proto", {
                keepCase: !0,
                longs: String,
                enums: String,
                defaults: !0,
                oneofs: !0,
                includeDirs: [`${__dirname}/../../proto`]
            });
        return rP1 = mz6.loadPackageDefinition(B).grpc.channelz.v1.Channelz.service, rP1
    }

    function AE6() {
        uz6.registerAdminService(ct2, dt2)
    }
});