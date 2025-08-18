/* chunk:503 bytes:[11980119, 12006017) size:25898 source:unpacked-cli.js */
class jw {
    #A;
    #B;
    #Q;
    #Z;
    #D;
    #Y;
    ttl;
    ttlResolution;
    ttlAutopurge;
    updateAgeOnGet;
    updateAgeOnHas;
    allowStale;
    noDisposeOnSet;
    noUpdateTTL;
    maxEntrySize;
    sizeCalculation;
    noDeleteOnFetchRejection;
    noDeleteOnStaleGet;
    allowStaleOnFetchAbort;
    allowStaleOnFetchRejection;
    ignoreFetchAbort;
    #G;
    #J;
    #W;
    #X;
    #I;
    #E;
    #U;
    #K;
    #C;
    #L;
    #z;
    #M;
    #R;
    #$;
    #q;
    #N;
    #H;
    static unsafeExposeInternals(A) {
        return {
            starts: A.#R,
            ttls: A.#$,
            sizes: A.#M,
            keyMap: A.#W,
            keyList: A.#X,
            valList: A.#I,
            next: A.#E,
            prev: A.#U,
            get head() {
                return A.#K
            },
            get tail() {
                return A.#C
            },
            free: A.#L,
            isBackgroundFetch: (B) => A.#V(B),
            backgroundFetch: (B, Q, Z, D) => A.#h(B, Q, Z, D),
            moveToTail: (B) => A.#u(B),
            indexes: (B) => A.#T(B),
            rindexes: (B) => A.#P(B),
            isStale: (B) => A.#w(B)
        }
    }
    get max() {
        return this.#A
    }
    get maxSize() {
        return this.#B
    }
    get calculatedSize() {
        return this.#J
    }
    get size() {
        return this.#G
    }
    get fetchMethod() {
        return this.#D
    }
    get memoMethod() {
        return this.#Y
    }
    get dispose() {
        return this.#Q
    }
    get disposeAfter() {
        return this.#Z
    }
    constructor(A) {
        let {
            max: B = 0,
            ttl: Q,
            ttlResolution: Z = 1,
            ttlAutopurge: D,
            updateAgeOnGet: G,
            updateAgeOnHas: F,
            allowStale: I,
            dispose: Y,
            disposeAfter: W,
            noDisposeOnSet: J,
            noUpdateTTL: X,
            maxSize: V = 0,
            maxEntrySize: C = 0,
            sizeCalculation: K,
            fetchMethod: H,
            memoMethod: z,
            noDeleteOnFetchRejection: $,
            noDeleteOnStaleGet: L,
            allowStaleOnFetchRejection: N,
            allowStaleOnFetchAbort: R,
            ignoreFetchAbort: O
        } = A;
        if (B !== 0 && !Hy(B)) throw new TypeError("max option must be a nonnegative integer");
        let P = B ? H_A(B) : Array;
        if (!P) throw new Error("invalid max value: " + B);
        if (this.#A = B, this.#B = V, this.maxEntrySize = C || this.#B, this.sizeCalculation = K, this.sizeCalculation) {
            if (!this.#B && !this.maxEntrySize) throw new TypeError("cannot set sizeCalculation without setting maxSize or maxEntrySize");
            if (typeof this.sizeCalculation !== "function") throw new TypeError("sizeCalculation set to non-function")
        }
        if (z !== void 0 && typeof z !== "function") throw new TypeError("memoMethod must be a function if defined");
        if (this.#Y = z, H !== void 0 && typeof H !== "function") throw new TypeError("fetchMethod must be a function if specified");
        if (this.#D = H, this.#N = !!H, this.#W = new Map, this.#X = new Array(B).fill(void 0), this.#I = new Array(B).fill(void 0), this.#E = new P(B), this.#U = new P(B), this.#K = 0, this.#C = 0, this.#L = Ja.create(B), this.#G = 0, this.#J = 0, typeof Y === "function") this.#Q = Y;
        if (typeof W === "function") this.#Z = W, this.#z = [];
        else this.#Z = void 0, this.#z = void 0;
        if (this.#q = !!this.#Q, this.#H = !!this.#Z, this.noDisposeOnSet = !!J, this.noUpdateTTL = !!X, this.noDeleteOnFetchRejection = !!$, this.allowStaleOnFetchRejection = !!N, this.allowStaleOnFetchAbort = !!R, this.ignoreFetchAbort = !!O, this.maxEntrySize !== 0) {
            if (this.#B !== 0) {
                if (!Hy(this.#B)) throw new TypeError("maxSize must be a positive integer if specified")
            }
            if (!Hy(this.maxEntrySize)) throw new TypeError("maxEntrySize must be a positive integer if specified");
            this.#j()
        }
        if (this.allowStale = !!I, this.noDeleteOnStaleGet = !!L, this.updateAgeOnGet = !!G, this.updateAgeOnHas = !!F, this.ttlResolution = Hy(Z) || Z === 0 ? Z : 1, this.ttlAutopurge = !!D, this.ttl = Q || 0, this.ttl) {
            if (!Hy(this.ttl)) throw new TypeError("ttl must be a positive integer if specified");
            this.#S()
        }
        if (this.#A === 0 && this.ttl === 0 && this.#B === 0) throw new TypeError("At least one of max, maxSize, or ttl is required");
        if (!this.ttlAutopurge && !this.#A && !this.#B) {
            if ($hQ("LRU_CACHE_UNBOUNDED")) C_A.add("LRU_CACHE_UNBOUNDED"), K_A("TTL caching without ttlAutopurge, max, or maxSize can result in unbounded memory consumption.", "UnboundedCacheWarning", "LRU_CACHE_UNBOUNDED", jw)
        }
    }
    getRemainingTTL(A) {
        return this.#W.has(A) ? 1 / 0 : 0
    }
    #S() {
        let A = new c41(this.#A),
            B = new c41(this.#A);
        this.#$ = A, this.#R = B, this.#y = (D, G, F = Wa.now()) => {
            if (B[D] = G !== 0 ? F : 0, A[D] = G, G !== 0 && this.ttlAutopurge) {
                let I = setTimeout(() => {
                    if (this.#w(D)) this.#k(this.#X[D], "expire")
                }, G + 1);
                if (I.unref) I.unref()
            }
        }, this.#O = (D) => {
            B[D] = A[D] !== 0 ? Wa.now() : 0
        }, this.#F = (D, G) => {
            if (A[G]) {
                let F = A[G],
                    I = B[G];
                if (!F || !I) return;
                D.ttl = F, D.start = I, D.now = Q || Z();
                let Y = D.now - I;
                D.remainingTTL = F - Y
            }
        };
        let Q = 0,
            Z = () => {
                let D = Wa.now();
                if (this.ttlResolution > 0) {
                    Q = D;
                    let G = setTimeout(() => Q = 0, this.ttlResolution);
                    if (G.unref) G.unref()
                }
                return D
            };
        this.getRemainingTTL = (D) => {
            let G = this.#W.get(D);
            if (G === void 0) return 0;
            let F = A[G],
                I = B[G];
            if (!F || !I) return 1 / 0;
            let Y = (Q || Z()) - I;
            return F - Y
        }, this.#w = (D) => {
            let G = B[D],
                F = A[D];
            return !!F && !!G && (Q || Z()) - G > F
        }
    }
    #O = () => {};
    #F = () => {};
    #y = () => {};
    #w = () => !1;
    #j() {
        let A = new c41(this.#A);
        this.#J = 0, this.#M = A, this.#_ = (B) => {
            this.#J -= A[B], A[B] = 0
        }, this.#v = (B, Q, Z, D) => {
            if (this.#V(Q)) return 0;
            if (!Hy(Z))
                if (D) {
                    if (typeof D !== "function") throw new TypeError("sizeCalculation must be a function");
                    if (Z = D(Q, B), !Hy(Z)) throw new TypeError("sizeCalculation return invalid (expect positive integer)")
                } else throw new TypeError("invalid size value (must be positive integer). When maxSize or maxEntrySize is used, sizeCalculation or size must be set.");
            return Z
        }, this.#x = (B, Q, Z) => {
            if (A[B] = Q, this.#B) {
                let D = this.#B - A[B];
                while (this.#J > D) this.#f(!0)
            }
            if (this.#J += A[B], Z) Z.entrySize = Q, Z.totalCalculatedSize = this.#J
        }
    }
    #_ = (A) => {};
    #x = (A, B, Q) => {};
    #v = (A, B, Q, Z) => {
        if (Q || Z) throw new TypeError("cannot set size without setting maxSize or maxEntrySize on cache");
        return 0
    };* #T({
        allowStale: A = this.allowStale
    } = {}) {
        if (this.#G)
            for (let B = this.#C;;) {
                if (!this.#b(B)) break;
                if (A || !this.#w(B)) yield B;
                if (B === this.#K) break;
                else B = this.#U[B]
            }
    }* #P({
        allowStale: A = this.allowStale
    } = {}) {
        if (this.#G)
            for (let B = this.#K;;) {
                if (!this.#b(B)) break;
                if (A || !this.#w(B)) yield B;
                if (B === this.#C) break;
                else B = this.#E[B]
            }
    }
    #b(A) {
        return A !== void 0 && this.#W.get(this.#X[A]) === A
    }* entries() {
        for (let A of this.#T())
            if (this.#I[A] !== void 0 && this.#X[A] !== void 0 && !this.#V(this.#I[A])) yield [this.#X[A], this.#I[A]]
    }* rentries() {
        for (let A of this.#P())
            if (this.#I[A] !== void 0 && this.#X[A] !== void 0 && !this.#V(this.#I[A])) yield [this.#X[A], this.#I[A]]
    }* keys() {
        for (let A of this.#T()) {
            let B = this.#X[A];
            if (B !== void 0 && !this.#V(this.#I[A])) yield B
        }
    }* rkeys() {
        for (let A of this.#P()) {
            let B = this.#X[A];
            if (B !== void 0 && !this.#V(this.#I[A])) yield B
        }
    }* values() {
        for (let A of this.#T())
            if (this.#I[A] !== void 0 && !this.#V(this.#I[A])) yield this.#I[A]
    }* rvalues() {
        for (let A of this.#P())
            if (this.#I[A] !== void 0 && !this.#V(this.#I[A])) yield this.#I[A]
    } [Symbol.iterator]() {
        return this.entries()
    } [Symbol.toStringTag] = "LRUCache";
    find(A, B = {}) {
        for (let Q of this.#T()) {
            let Z = this.#I[Q],
                D = this.#V(Z) ? Z.__staleWhileFetching : Z;
            if (D === void 0) continue;
            if (A(D, this.#X[Q], this)) return this.get(this.#X[Q], B)
        }
    }
    forEach(A, B = this) {
        for (let Q of this.#T()) {
            let Z = this.#I[Q],
                D = this.#V(Z) ? Z.__staleWhileFetching : Z;
            if (D === void 0) continue;
            A.call(B, D, this.#X[Q], this)
        }
    }
    rforEach(A, B = this) {
        for (let Q of this.#P()) {
            let Z = this.#I[Q],
                D = this.#V(Z) ? Z.__staleWhileFetching : Z;
            if (D === void 0) continue;
            A.call(B, D, this.#X[Q], this)
        }
    }
    purgeStale() {
        let A = !1;
        for (let B of this.#P({
                allowStale: !0
            }))
            if (this.#w(B)) this.#k(this.#X[B], "expire"), A = !0;
        return A
    }
    info(A) {
        let B = this.#W.get(A);
        if (B === void 0) return;
        let Q = this.#I[B],
            Z = this.#V(Q) ? Q.__staleWhileFetching : Q;
        if (Z === void 0) return;
        let D = {
            value: Z
        };
        if (this.#$ && this.#R) {
            let G = this.#$[B],
                F = this.#R[B];
            if (G && F) {
                let I = G - (Wa.now() - F);
                D.ttl = I, D.start = Date.now()
            }
        }
        if (this.#M) D.size = this.#M[B];
        return D
    }
    dump() {
        let A = [];
        for (let B of this.#T({
                allowStale: !0
            })) {
            let Q = this.#X[B],
                Z = this.#I[B],
                D = this.#V(Z) ? Z.__staleWhileFetching : Z;
            if (D === void 0 || Q === void 0) continue;
            let G = {
                value: D
            };
            if (this.#$ && this.#R) {
                G.ttl = this.#$[B];
                let F = Wa.now() - this.#R[B];
                G.start = Math.floor(Date.now() - F)
            }
            if (this.#M) G.size = this.#M[B];
            A.unshift([Q, G])
        }
        return A
    }
    load(A) {
        this.clear();
        for (let [B, Q] of A) {
            if (Q.start) {
                let Z = Date.now() - Q.start;
                Q.start = Wa.now() - Z
            }
            this.set(B, Q.value, Q)
        }
    }
    set(A, B, Q = {}) {
        if (B === void 0) return this.delete(A), this;
        let {
            ttl: Z = this.ttl,
            start: D,
            noDisposeOnSet: G = this.noDisposeOnSet,
            sizeCalculation: F = this.sizeCalculation,
            status: I
        } = Q, {
            noUpdateTTL: Y = this.noUpdateTTL
        } = Q, W = this.#v(A, B, Q.size || 0, F);
        if (this.maxEntrySize && W > this.maxEntrySize) {
            if (I) I.set = "miss", I.maxEntrySizeExceeded = !0;
            return this.#k(A, "set"), this
        }
        let J = this.#G === 0 ? void 0 : this.#W.get(A);
        if (J === void 0) {
            if (J = this.#G === 0 ? this.#C : this.#L.length !== 0 ? this.#L.pop() : this.#G === this.#A ? this.#f(!1) : this.#G, this.#X[J] = A, this.#I[J] = B, this.#W.set(A, J), this.#E[this.#C] = J, this.#U[J] = this.#C, this.#C = J, this.#G++, this.#x(J, W, I), I) I.set = "add";
            Y = !1
        } else {
            this.#u(J);
            let X = this.#I[J];
            if (B !== X) {
                if (this.#N && this.#V(X)) {
                    X.__abortController.abort(new Error("replaced"));
                    let {
                        __staleWhileFetching: V
                    } = X;
                    if (V !== void 0 && !G) {
                        if (this.#q) this.#Q?.(V, A, "set");
                        if (this.#H) this.#z?.push([V, A, "set"])
                    }
                } else if (!G) {
                    if (this.#q) this.#Q?.(X, A, "set");
                    if (this.#H) this.#z?.push([X, A, "set"])
                }
                if (this.#_(J), this.#x(J, W, I), this.#I[J] = B, I) {
                    I.set = "replace";
                    let V = X && this.#V(X) ? X.__staleWhileFetching : X;
                    if (V !== void 0) I.oldValue = V
                }
            } else if (I) I.set = "update"
        }
        if (Z !== 0 && !this.#$) this.#S();
        if (this.#$) {
            if (!Y) this.#y(J, Z, D);
            if (I) this.#F(I, J)
        }
        if (!G && this.#H && this.#z) {
            let X = this.#z,
                V;
            while (V = X?.shift()) this.#Z?.(...V)
        }
        return this
    }
    pop() {
        try {
            while (this.#G) {
                let A = this.#I[this.#K];
                if (this.#f(!0), this.#V(A)) {
                    if (A.__staleWhileFetching) return A.__staleWhileFetching
                } else if (A !== void 0) return A
            }
        } finally {
            if (this.#H && this.#z) {
                let A = this.#z,
                    B;
                while (B = A?.shift()) this.#Z?.(...B)
            }
        }
    }
    #f(A) {
        let B = this.#K,
            Q = this.#X[B],
            Z = this.#I[B];
        if (this.#N && this.#V(Z)) Z.__abortController.abort(new Error("evicted"));
        else if (this.#q || this.#H) {
            if (this.#q) this.#Q?.(Z, Q, "evict");
            if (this.#H) this.#z?.push([Z, Q, "evict"])
        }
        if (this.#_(B), A) this.#X[B] = void 0, this.#I[B] = void 0, this.#L.push(B);
        if (this.#G === 1) this.#K = this.#C = 0, this.#L.length = 0;
        else this.#K = this.#E[B];
        return this.#W.delete(Q), this.#G--, B
    }
    has(A, B = {}) {
        let {
            updateAgeOnHas: Q = this.updateAgeOnHas,
            status: Z
        } = B, D = this.#W.get(A);
        if (D !== void 0) {
            let G = this.#I[D];
            if (this.#V(G) && G.__staleWhileFetching === void 0) return !1;
            if (!this.#w(D)) {
                if (Q) this.#O(D);
                if (Z) Z.has = "hit", this.#F(Z, D);
                return !0
            } else if (Z) Z.has = "stale", this.#F(Z, D)
        } else if (Z) Z.has = "miss";
        return !1
    }
    peek(A, B = {}) {
        let {
            allowStale: Q = this.allowStale
        } = B, Z = this.#W.get(A);
        if (Z === void 0 || !Q && this.#w(Z)) return;
        let D = this.#I[Z];
        return this.#V(D) ? D.__staleWhileFetching : D
    }
    #h(A, B, Q, Z) {
        let D = B === void 0 ? void 0 : this.#I[B];
        if (this.#V(D)) return D;
        let G = new Rw1,
            {
                signal: F
            } = Q;
        F?.addEventListener("abort", () => G.abort(F.reason), {
            signal: G.signal
        });
        let I = {
                signal: G.signal,
                options: Q,
                context: Z
            },
            Y = (K, H = !1) => {
                let {
                    aborted: z
                } = G.signal, $ = Q.ignoreFetchAbort && K !== void 0;
                if (Q.status)
                    if (z && !H) {
                        if (Q.status.fetchAborted = !0, Q.status.fetchError = G.signal.reason, $) Q.status.fetchAbortIgnored = !0
                    } else Q.status.fetchResolved = !0;
                if (z && !$ && !H) return J(G.signal.reason);
                let L = V;
                if (this.#I[B] === V)
                    if (K === void 0)
                        if (L.__staleWhileFetching) this.#I[B] = L.__staleWhileFetching;
                        else this.#k(A, "fetch");
                else {
                    if (Q.status) Q.status.fetchUpdated = !0;
                    this.set(A, K, I.options)
                }
                return K
            },
            W = (K) => {
                if (Q.status) Q.status.fetchRejected = !0, Q.status.fetchError = K;
                return J(K)
            },
            J = (K) => {
                let {
                    aborted: H
                } = G.signal, z = H && Q.allowStaleOnFetchAbort, $ = z || Q.allowStaleOnFetchRejection, L = $ || Q.noDeleteOnFetchRejection, N = V;
                if (this.#I[B] === V) {
                    if (!L || N.__staleWhileFetching === void 0) this.#k(A, "fetch");
                    else if (!z) this.#I[B] = N.__staleWhileFetching
                }
                if ($) {
                    if (Q.status && N.__staleWhileFetching !== void 0) Q.status.returnedStale = !0;
                    return N.__staleWhileFetching
                } else if (N.__returned === N) throw K
            },
            X = (K, H) => {
                let z = this.#D?.(A, D, I);
                if (z && z instanceof Promise) z.then(($) => K($ === void 0 ? void 0 : $), H);
                G.signal.addEventListener("abort", () => {
                    if (!Q.ignoreFetchAbort || Q.allowStaleOnFetchAbort) {
                        if (K(void 0), Q.allowStaleOnFetchAbort) K = ($) => Y($, !0)
                    }
                })
            };
        if (Q.status) Q.status.fetchDispatched = !0;
        let V = new Promise(X).then(Y, W),
            C = Object.assign(V, {
                __abortController: G,
                __staleWhileFetching: D,
                __returned: void 0
            });
        if (B === void 0) this.set(A, C, {
            ...I.options,
            status: void 0
        }), B = this.#W.get(A);
        else this.#I[B] = C;
        return C
    }
    #V(A) {
        if (!this.#N) return !1;
        let B = A;
        return !!B && B instanceof Promise && B.hasOwnProperty("__staleWhileFetching") && B.__abortController instanceof Rw1
    }
    async fetch(A, B = {}) {
        let {
            allowStale: Q = this.allowStale,
            updateAgeOnGet: Z = this.updateAgeOnGet,
            noDeleteOnStaleGet: D = this.noDeleteOnStaleGet,
            ttl: G = this.ttl,
            noDisposeOnSet: F = this.noDisposeOnSet,
            size: I = 0,
            sizeCalculation: Y = this.sizeCalculation,
            noUpdateTTL: W = this.noUpdateTTL,
            noDeleteOnFetchRejection: J = this.noDeleteOnFetchRejection,
            allowStaleOnFetchRejection: X = this.allowStaleOnFetchRejection,
            ignoreFetchAbort: V = this.ignoreFetchAbort,
            allowStaleOnFetchAbort: C = this.allowStaleOnFetchAbort,
            context: K,
            forceRefresh: H = !1,
            status: z,
            signal: $
        } = B;
        if (!this.#N) {
            if (z) z.fetch = "get";
            return this.get(A, {
                allowStale: Q,
                updateAgeOnGet: Z,
                noDeleteOnStaleGet: D,
                status: z
            })
        }
        let L = {
                allowStale: Q,
                updateAgeOnGet: Z,
                noDeleteOnStaleGet: D,
                ttl: G,
                noDisposeOnSet: F,
                size: I,
                sizeCalculation: Y,
                noUpdateTTL: W,
                noDeleteOnFetchRejection: J,
                allowStaleOnFetchRejection: X,
                allowStaleOnFetchAbort: C,
                ignoreFetchAbort: V,
                status: z,
                signal: $
            },
            N = this.#W.get(A);
        if (N === void 0) {
            if (z) z.fetch = "miss";
            let R = this.#h(A, N, L, K);
            return R.__returned = R
        } else {
            let R = this.#I[N];
            if (this.#V(R)) {
                let k = Q && R.__staleWhileFetching !== void 0;
                if (z) {
                    if (z.fetch = "inflight", k) z.returnedStale = !0
                }
                return k ? R.__staleWhileFetching : R.__returned = R
            }
            let O = this.#w(N);
            if (!H && !O) {
                if (z) z.fetch = "hit";
                if (this.#u(N), Z) this.#O(N);
                if (z) this.#F(z, N);
                return R
            }
            let P = this.#h(A, N, L, K),
                f = P.__staleWhileFetching !== void 0 && Q;
            if (z) {
                if (z.fetch = O ? "stale" : "refresh", f && O) z.returnedStale = !0
            }
            return f ? P.__staleWhileFetching : P.__returned = P
        }
    }
    async forceFetch(A, B = {}) {
        let Q = await this.fetch(A, B);
        if (Q === void 0) throw new Error("fetch() returned undefined");
        return Q
    }
    memo(A, B = {}) {
        let Q = this.#Y;
        if (!Q) throw new Error("no memoMethod provided to constructor");
        let {
            context: Z,
            forceRefresh: D,
            ...G
        } = B, F = this.get(A, G);
        if (!D && F !== void 0) return F;
        let I = Q(A, F, {
            options: G,
            context: Z
        });
        return this.set(A, I, G), I
    }
    get(A, B = {}) {
        let {
            allowStale: Q = this.allowStale,
            updateAgeOnGet: Z = this.updateAgeOnGet,
            noDeleteOnStaleGet: D = this.noDeleteOnStaleGet,
            status: G
        } = B, F = this.#W.get(A);
        if (F !== void 0) {
            let I = this.#I[F],
                Y = this.#V(I);
            if (G) this.#F(G, F);
            if (this.#w(F)) {
                if (G) G.get = "stale";
                if (!Y) {
                    if (!D) this.#k(A, "expire");
                    if (G && Q) G.returnedStale = !0;
                    return Q ? I : void 0
                } else {
                    if (G && Q && I.__staleWhileFetching !== void 0) G.returnedStale = !0;
                    return Q ? I.__staleWhileFetching : void 0
                }
            } else {
                if (G) G.get = "hit";
                if (Y) return I.__staleWhileFetching;
                if (this.#u(F), Z) this.#O(F);
                return I
            }
        } else if (G) G.get = "miss"
    }
    #g(A, B) {
        this.#U[B] = A, this.#E[A] = B
    }
    #u(A) {
        if (A !== this.#C) {
            if (A === this.#K) this.#K = this.#E[A];
            else this.#g(this.#U[A], this.#E[A]);
            this.#g(this.#C, A), this.#C = A
        }
    }
    delete(A) {
        return this.#k(A, "delete")
    }
    #k(A, B) {
        let Q = !1;
        if (this.#G !== 0) {
            let Z = this.#W.get(A);
            if (Z !== void 0)
                if (Q = !0, this.#G === 1) this.#m(B);
                else {
                    this.#_(Z);
                    let D = this.#I[Z];
                    if (this.#V(D)) D.__abortController.abort(new Error("deleted"));
                    else if (this.#q || this.#H) {
                        if (this.#q) this.#Q?.(D, A, B);
                        if (this.#H) this.#z?.push([D, A, B])
                    }
                    if (this.#W.delete(A), this.#X[Z] = void 0, this.#I[Z] = void 0, Z === this.#C) this.#C = this.#U[Z];
                    else if (Z === this.#K) this.#K = this.#E[Z];
                    else {
                        let G = this.#U[Z];
                        this.#E[G] = this.#E[Z];
                        let F = this.#E[Z];
                        this.#U[F] = this.#U[Z]
                    }
                    this.#G--, this.#L.push(Z)
                }
        }
        if (this.#H && this.#z?.length) {
            let Z = this.#z,
                D;
            while (D = Z?.shift()) this.#Z?.(...D)
        }
        return Q
    }
    clear() {
        return this.#m("delete")
    }
    #m(A) {
        for (let B of this.#P({
                allowStale: !0
            })) {
            let Q = this.#I[B];
            if (this.#V(Q)) Q.__abortController.abort(new Error("deleted"));
            else {
                let Z = this.#X[B];
                if (this.#q) this.#Q?.(Q, Z, A);
                if (this.#H) this.#z?.push([Q, Z, A])
            }
        }
        if (this.#W.clear(), this.#I.fill(void 0), this.#X.fill(void 0), this.#$ && this.#R) this.#$.fill(0), this.#R.fill(0);
        if (this.#M) this.#M.fill(0);
        if (this.#K = 0, this.#C = 0, this.#L.length = 0, this.#J = 0, this.#G = 0, this.#H && this.#z) {
            let B = this.#z,
                Q;
            while (Q = B?.shift()) this.#Z?.(...Q)
        }
    }
}