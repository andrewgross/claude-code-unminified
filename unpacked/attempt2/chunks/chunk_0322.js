/* chunk:322 bytes:[7781889, 7798798) size:16909 source:unpacked-cli.js */
var NP1 = E((ks2) => {
    Object.defineProperty(ks2, "__esModule", {
        value: !0
    });
    ks2.ChildLoadBalancerHandler = void 0;
    var oV6 = Wm(),
        tV6 = RE(),
        eV6 = "child_load_balancer_helper";
    class js2 {
        constructor(A) {
            this.channelControlHelper = A, this.currentChild = null, this.pendingChild = null, this.latestConfig = null, this.ChildPolicyHelper = class {
                constructor(B) {
                    this.parent = B, this.child = null
                }
                createSubchannel(B, Q) {
                    return this.parent.channelControlHelper.createSubchannel(B, Q)
                }
                updateState(B, Q, Z) {
                    var D;
                    if (this.calledByPendingChild()) {
                        if (B === tV6.ConnectivityState.CONNECTING) return;
                        (D = this.parent.currentChild) === null || D === void 0 || D.destroy(), this.parent.currentChild = this.parent.pendingChild, this.parent.pendingChild = null
                    } else if (!this.calledByCurrentChild()) return;
                    this.parent.channelControlHelper.updateState(B, Q, Z)
                }
                requestReresolution() {
                    var B;
                    let Q = (B = this.parent.pendingChild) !== null && B !== void 0 ? B : this.parent.currentChild;
                    if (this.child === Q) this.parent.channelControlHelper.requestReresolution()
                }
                setChild(B) {
                    this.child = B
                }
                addChannelzChild(B) {
                    this.parent.channelControlHelper.addChannelzChild(B)
                }
                removeChannelzChild(B) {
                    this.parent.channelControlHelper.removeChannelzChild(B)
                }
                calledByPendingChild() {
                    return this.child === this.parent.pendingChild
                }
                calledByCurrentChild() {
                    return this.child === this.parent.currentChild
                }
            }
        }
        configUpdateRequiresNewPolicyInstance(A, B) {
            return A.getLoadBalancerName() !== B.getLoadBalancerName()
        }
        updateAddressList(A, B, Q) {
            let Z;
            if (this.currentChild === null || this.latestConfig === null || this.configUpdateRequiresNewPolicyInstance(this.latestConfig, B)) {
                let D = new this.ChildPolicyHelper(this),
                    G = oV6.createLoadBalancer(B, D);
                if (D.setChild(G), this.currentChild === null) this.currentChild = G, Z = this.currentChild;
                else {
                    if (this.pendingChild) this.pendingChild.destroy();
                    this.pendingChild = G, Z = this.pendingChild
                }
            } else if (this.pendingChild === null) Z = this.currentChild;
            else Z = this.pendingChild;
            this.latestConfig = B, Z.updateAddressList(A, B, Q)
        }
        exitIdle() {
            if (this.currentChild) {
                if (this.currentChild.exitIdle(), this.pendingChild) this.pendingChild.exitIdle()
            }
        }
        resetBackoff() {
            if (this.currentChild) {
                if (this.currentChild.resetBackoff(), this.pendingChild) this.pendingChild.resetBackoff()
            }
        }
        destroy() {
            if (this.currentChild) this.currentChild.destroy(), this.currentChild = null;
            if (this.pendingChild) this.pendingChild.destroy(), this.pendingChild = null
        }
        getTypeName() {
            return eV6
        }
    }
    ks2.ChildLoadBalancerHandler = js2
});
var fs2 = E((vs2) => {
    Object.defineProperty(vs2, "__esModule", {
        value: !0
    });
    vs2.ResolvingLoadBalancer = void 0;
    var AC6 = Wm(),
        BC6 = LJ0(),
        dV = RE(),
        QC6 = DM(),
        e31 = Wx(),
        ZC6 = t31(),
        MJ0 = b6(),
        DC6 = IJ(),
        GC6 = I7(),
        FC6 = b6(),
        IC6 = mV(),
        YC6 = NP1(),
        WC6 = "resolving_load_balancer";

    function _s2(A) {
        GC6.trace(FC6.LogVerbosity.DEBUG, WC6, A)
    }
    var JC6 = ["SERVICE_AND_METHOD", "SERVICE", "EMPTY"];

    function XC6(A, B, Q, Z) {
        for (let D of Q.name) switch (Z) {
            case "EMPTY":
                if (!D.service && !D.method) return !0;
                break;
            case "SERVICE":
                if (D.service === A && !D.method) return !0;
                break;
            case "SERVICE_AND_METHOD":
                if (D.service === A && D.method === B) return !0
        }
        return !1
    }

    function VC6(A, B, Q, Z) {
        for (let D of Q)
            if (XC6(A, B, D, Z)) return D;
        return null
    }

    function CC6(A) {
        return {
            invoke(B, Q) {
                var Z, D;
                let G = B.split("/").filter((Y) => Y.length > 0),
                    F = (Z = G[0]) !== null && Z !== void 0 ? Z : "",
                    I = (D = G[1]) !== null && D !== void 0 ? D : "";
                if (A && A.methodConfig)
                    for (let Y of JC6) {
                        let W = VC6(F, I, A.methodConfig, Y);
                        if (W) return {
                            methodConfig: W,
                            pickInformation: {},
                            status: MJ0.Status.OK,
                            dynamicFilterFactories: []
                        }
                    }
                return {
                    methodConfig: {
                        name: []
                    },
                    pickInformation: {},
                    status: MJ0.Status.OK,
                    dynamicFilterFactories: []
                }
            },
            unref() {}
        }
    }
    class xs2 {
        constructor(A, B, Q, Z, D) {
            if (this.target = A, this.channelControlHelper = B, this.channelOptions = Q, this.onSuccessfulResolution = Z, this.onFailedResolution = D, this.latestChildState = dV.ConnectivityState.IDLE, this.latestChildPicker = new e31.QueuePicker(this), this.latestChildErrorMessage = null, this.currentState = dV.ConnectivityState.IDLE, this.previousServiceConfig = null, this.continueResolving = !1, Q["grpc.service_config"]) this.defaultServiceConfig = BC6.validateServiceConfig(JSON.parse(Q["grpc.service_config"]));
            else this.defaultServiceConfig = {
                loadBalancingConfig: [],
                methodConfig: []
            };
            this.updateState(dV.ConnectivityState.IDLE, new e31.QueuePicker(this), null), this.childLoadBalancer = new YC6.ChildLoadBalancerHandler({
                createSubchannel: B.createSubchannel.bind(B),
                requestReresolution: () => {
                    if (this.backoffTimeout.isRunning()) _s2("requestReresolution delayed by backoff timer until " + this.backoffTimeout.getEndTime().toISOString()), this.continueResolving = !0;
                    else this.updateResolution()
                },
                updateState: (F, I, Y) => {
                    this.latestChildState = F, this.latestChildPicker = I, this.latestChildErrorMessage = Y, this.updateState(F, I, Y)
                },
                addChannelzChild: B.addChannelzChild.bind(B),
                removeChannelzChild: B.removeChannelzChild.bind(B)
            }), this.innerResolver = QC6.createResolver(A, {
                onSuccessfulResolution: (F, I, Y, W, J) => {
                    var X;
                    this.backoffTimeout.stop(), this.backoffTimeout.reset();
                    let V = null;
                    if (I === null)
                        if (Y === null) this.previousServiceConfig = null, V = this.defaultServiceConfig;
                        else if (this.previousServiceConfig === null) this.handleResolutionFailure(Y);
                    else V = this.previousServiceConfig;
                    else V = I, this.previousServiceConfig = I;
                    let C = (X = V === null || V === void 0 ? void 0 : V.loadBalancingConfig) !== null && X !== void 0 ? X : [],
                        K = AC6.selectLbConfigFromList(C, !0);
                    if (K === null) {
                        this.handleResolutionFailure({
                            code: MJ0.Status.UNAVAILABLE,
                            details: "All load balancer options in service config are not compatible",
                            metadata: new DC6.Metadata
                        }), W === null || W === void 0 || W.unref();
                        return
                    }
                    this.childLoadBalancer.updateAddressList(F, K, Object.assign(Object.assign({}, this.channelOptions), J));
                    let H = V !== null && V !== void 0 ? V : this.defaultServiceConfig;
                    this.onSuccessfulResolution(H, W !== null && W !== void 0 ? W : CC6(H))
                },
                onError: (F) => {
                    this.handleResolutionFailure(F)
                }
            }, Q);
            let G = {
                initialDelay: Q["grpc.initial_reconnect_backoff_ms"],
                maxDelay: Q["grpc.max_reconnect_backoff_ms"]
            };
            this.backoffTimeout = new ZC6.BackoffTimeout(() => {
                if (this.continueResolving) this.updateResolution(), this.continueResolving = !1;
                else this.updateState(this.latestChildState, this.latestChildPicker, this.latestChildErrorMessage)
            }, G), this.backoffTimeout.unref()
        }
        updateResolution() {
            if (this.innerResolver.updateResolution(), this.currentState === dV.ConnectivityState.IDLE) this.updateState(dV.ConnectivityState.CONNECTING, this.latestChildPicker, this.latestChildErrorMessage);
            this.backoffTimeout.runOnce()
        }
        updateState(A, B, Q) {
            if (_s2(IC6.uriToString(this.target) + " " + dV.ConnectivityState[this.currentState] + " -> " + dV.ConnectivityState[A]), A === dV.ConnectivityState.IDLE) B = new e31.QueuePicker(this, B);
            this.currentState = A, this.channelControlHelper.updateState(A, B, Q)
        }
        handleResolutionFailure(A) {
            if (this.latestChildState === dV.ConnectivityState.IDLE) this.updateState(dV.ConnectivityState.TRANSIENT_FAILURE, new e31.UnavailablePicker(A), A.details), this.onFailedResolution(A)
        }
        exitIdle() {
            if (this.currentState === dV.ConnectivityState.IDLE || this.currentState === dV.ConnectivityState.TRANSIENT_FAILURE)
                if (this.backoffTimeout.isRunning()) this.continueResolving = !0;
                else this.updateResolution();
            this.childLoadBalancer.exitIdle()
        }
        updateAddressList(A, B) {
            throw new Error("updateAddressList not supported on ResolvingLoadBalancer")
        }
        resetBackoff() {
            this.backoffTimeout.reset(), this.childLoadBalancer.resetBackoff()
        }
        destroy() {
            this.childLoadBalancer.destroy(), this.innerResolver.destroy(), this.backoffTimeout.reset(), this.backoffTimeout.stop(), this.latestChildState = dV.ConnectivityState.IDLE, this.latestChildPicker = new e31.QueuePicker(this), this.currentState = dV.ConnectivityState.IDLE, this.previousServiceConfig = null, this.continueResolving = !1
        }
        getTypeName() {
            return "resolving_load_balancer"
        }
    }
    vs2.ResolvingLoadBalancer = xs2
});
var us2 = E((hs2) => {
    Object.defineProperty(hs2, "__esModule", {
        value: !0
    });
    hs2.recognizedOptions = void 0;
    hs2.channelOptionsEqual = KC6;
    hs2.recognizedOptions = {
        "grpc.ssl_target_name_override": !0,
        "grpc.primary_user_agent": !0,
        "grpc.secondary_user_agent": !0,
        "grpc.default_authority": !0,
        "grpc.keepalive_time_ms": !0,
        "grpc.keepalive_timeout_ms": !0,
        "grpc.keepalive_permit_without_calls": !0,
        "grpc.service_config": !0,
        "grpc.max_concurrent_streams": !0,
        "grpc.initial_reconnect_backoff_ms": !0,
        "grpc.max_reconnect_backoff_ms": !0,
        "grpc.use_local_subchannel_pool": !0,
        "grpc.max_send_message_length": !0,
        "grpc.max_receive_message_length": !0,
        "grpc.enable_http_proxy": !0,
        "grpc.enable_channelz": !0,
        "grpc.dns_min_time_between_resolutions_ms": !0,
        "grpc.enable_retries": !0,
        "grpc.per_rpc_retry_buffer_size": !0,
        "grpc.retry_buffer_size": !0,
        "grpc.max_connection_age_ms": !0,
        "grpc.max_connection_age_grace_ms": !0,
        "grpc-node.max_session_memory": !0,
        "grpc.service_config_disable_resolution": !0,
        "grpc.client_idle_timeout_ms": !0,
        "grpc-node.tls_enable_trace": !0,
        "grpc.lb.ring_hash.ring_size_cap": !0,
        "grpc-node.retry_max_attempts_limit": !0,
        "grpc-node.flow_control_window": !0
    };

    function KC6(A, B) {
        let Q = Object.keys(A).sort(),
            Z = Object.keys(B).sort();
        if (Q.length !== Z.length) return !1;
        for (let D = 0; D < Q.length; D += 1) {
            if (Q[D] !== Z[D]) return !1;
            if (A[Q[D]] !== B[Z[D]]) return !1
        }
        return !0
    }
});
var OE = E((ps2) => {
    Object.defineProperty(ps2, "__esModule", {
        value: !0
    });
    ps2.EndpointMap = void 0;
    ps2.isTcpSubchannelAddress = B71;
    ps2.subchannelAddressEqual = LP1;
    ps2.subchannelAddressToString = ds2;
    ps2.stringToSubchannelAddress = EC6;
    ps2.endpointEqual = UC6;
    ps2.endpointToString = wC6;
    ps2.endpointHasAddress = cs2;
    var ms2 = W1("net");

    function B71(A) {
        return "port" in A
    }

    function LP1(A, B) {
        if (!A && !B) return !0;
        if (!A || !B) return !1;
        if (B71(A)) return B71(B) && A.host === B.host && A.port === B.port;
        else return !B71(B) && A.path === B.path
    }

    function ds2(A) {
        if (B71(A))
            if (ms2.isIPv6(A.host)) return "[" + A.host + "]:" + A.port;
            else return A.host + ":" + A.port;
        else return A.path
    }
    var zC6 = 443;

    function EC6(A, B) {
        if (ms2.isIP(A)) return {
            host: A,
            port: B !== null && B !== void 0 ? B : zC6
        };
        else return {
            path: A
        }
    }

    function UC6(A, B) {
        if (A.addresses.length !== B.addresses.length) return !1;
        for (let Q = 0; Q < A.addresses.length; Q++)
            if (!LP1(A.addresses[Q], B.addresses[Q])) return !1;
        return !0
    }

    function wC6(A) {
        return "[" + A.addresses.map(ds2).join(", ") + "]"
    }

    function cs2(A, B) {
        for (let Q of A.addresses)
            if (LP1(Q, B)) return !0;
        return !1
    }

    function A71(A, B) {
        if (A.addresses.length !== B.addresses.length) return !1;
        for (let Q of A.addresses) {
            let Z = !1;
            for (let D of B.addresses)
                if (LP1(Q, D)) {
                    Z = !0;
                    break
                } if (!Z) return !1
        }
        return !0
    }
    class ls2 {
        constructor() {
            this.map = new Set
        }
        get size() {
            return this.map.size
        }
        getForSubchannelAddress(A) {
            for (let B of this.map)
                if (cs2(B.key, A)) return B.value;
            return
        }
        deleteMissing(A) {
            let B = [];
            for (let Q of this.map) {
                let Z = !1;
                for (let D of A)
                    if (A71(D, Q.key)) Z = !0;
                if (!Z) B.push(Q.value), this.map.delete(Q)
            }
            return B
        }
        get(A) {
            for (let B of this.map)
                if (A71(A, B.key)) return B.value;
            return
        }
        set(A, B) {
            for (let Q of this.map)
                if (A71(A, Q.key)) {
                    Q.value = B;
                    return
                } this.map.add({
                key: A,
                value: B
            })
        }
        delete(A) {
            for (let B of this.map)
                if (A71(A, B.key)) {
                    this.map.delete(B);
                    return
                }
        }
        has(A) {
            for (let B of this.map)
                if (A71(A, B.key)) return !0;
            return !1
        }
        clear() {
            this.map.clear()
        }* keys() {
            for (let A of this.map) yield A.key
        }* values() {
            for (let A of this.map) yield A.value
        }* entries() {
            for (let A of this.map) yield [A.key, A.value]
        }
    }
    ps2.EndpointMap = ls2
});