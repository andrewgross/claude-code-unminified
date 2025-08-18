/* chunk:421 bytes:[10089299, 10105128) size:15829 source:unpacked-cli.js */
var Bw0 = E((S08) => {
    var BC = wx1(),
        g3 = qx1(),
        T08 = bUB(),
        hUB = g3.newObjectInRealm,
        UG = g3.implSymbol,
        gUB = g3.ctorRegistrySymbol;
    S08.is = (A) => {
        return g3.isObject(A) && g3.hasOwn(A, UG) && A[UG] instanceof Fv.implementation
    };
    S08.isImpl = (A) => {
        return g3.isObject(A) && A instanceof Fv.implementation
    };
    S08.convert = (A, B, {
        context: Q = "The provided value"
    } = {}) => {
        if (S08.is(B)) return g3.implForWrapper(B);
        throw new A.TypeError(`${Q} is not of type 'URLSearchParams'.`)
    };
    S08.createDefaultIterator = (A, B, Q) => {
        let D = A[gUB]["URLSearchParams Iterator"],
            G = Object.create(D);
        return Object.defineProperty(G, g3.iterInternalSymbol, {
            value: {
                target: B,
                kind: Q,
                index: 0
            },
            configurable: !0
        }), G
    };

    function uUB(A, B) {
        let Q;
        if (B !== void 0) Q = B.prototype;
        if (!g3.isObject(Q)) Q = A[gUB].URLSearchParams.prototype;
        return Object.create(Q)
    }
    S08.create = (A, B, Q) => {
        let Z = uUB(A);
        return S08.setup(Z, A, B, Q)
    };
    S08.createImpl = (A, B, Q) => {
        let Z = S08.create(A, B, Q);
        return g3.implForWrapper(Z)
    };
    S08._internalSetup = (A, B) => {};
    S08.setup = (A, B, Q = [], Z = {}) => {
        if (Z.wrapper = A, S08._internalSetup(A, B), Object.defineProperty(A, UG, {
                value: new Fv.implementation(B, Q, Z),
                configurable: !0
            }), A[UG][g3.wrapperSymbol] = A, Fv.init) Fv.init(A[UG]);
        return A
    };
    S08.new = (A, B) => {
        let Q = uUB(A, B);
        if (S08._internalSetup(Q, A), Object.defineProperty(Q, UG, {
                value: Object.create(Fv.implementation.prototype),
                configurable: !0
            }), Q[UG][g3.wrapperSymbol] = Q, Fv.init) Fv.init(Q[UG]);
        return Q[UG]
    };
    var P08 = new Set(["Window", "Worker"]);
    S08.install = (A, B) => {
        if (!B.some((D) => P08.has(D))) return;
        let Q = g3.initCtorRegistry(A);
        class Z {
            constructor() {
                let D = [];
                {
                    let G = arguments[0];
                    if (G !== void 0)
                        if (g3.isObject(G))
                            if (G[Symbol.iterator] !== void 0)
                                if (!g3.isObject(G)) throw new A.TypeError("Failed to construct 'URLSearchParams': parameter 1 sequence is not an iterable object.");
                                else {
                                    let F = [],
                                        I = G;
                                    for (let Y of I) {
                                        if (!g3.isObject(Y)) throw new A.TypeError("Failed to construct 'URLSearchParams': parameter 1 sequence's element is not an iterable object.");
                                        else {
                                            let W = [],
                                                J = Y;
                                            for (let X of J) X = BC.USVString(X, {
                                                context: "Failed to construct 'URLSearchParams': parameter 1 sequence's element's element",
                                                globals: A
                                            }), W.push(X);
                                            Y = W
                                        }
                                        F.push(Y)
                                    }
                                    G = F
                                }
                    else if (!g3.isObject(G)) throw new A.TypeError("Failed to construct 'URLSearchParams': parameter 1 record is not an object.");
                    else {
                        let F = Object.create(null);
                        for (let I of Reflect.ownKeys(G)) {
                            let Y = Object.getOwnPropertyDescriptor(G, I);
                            if (Y && Y.enumerable) {
                                let W = I;
                                W = BC.USVString(W, {
                                    context: "Failed to construct 'URLSearchParams': parameter 1 record's key",
                                    globals: A
                                });
                                let J = G[I];
                                J = BC.USVString(J, {
                                    context: "Failed to construct 'URLSearchParams': parameter 1 record's value",
                                    globals: A
                                }), F[W] = J
                            }
                        }
                        G = F
                    } else G = BC.USVString(G, {
                        context: "Failed to construct 'URLSearchParams': parameter 1",
                        globals: A
                    });
                    else G = "";
                    D.push(G)
                }
                return S08.setup(Object.create(new.target.prototype), A, D)
            }
            append(D, G) {
                let F = this !== null && this !== void 0 ? this : A;
                if (!S08.is(F)) throw new A.TypeError("'append' called on an object that is not a valid instance of URLSearchParams.");
                if (arguments.length < 2) throw new A.TypeError(`Failed to execute 'append' on 'URLSearchParams': 2 arguments required, but only ${arguments.length} present.`);
                let I = [];
                {
                    let Y = arguments[0];
                    Y = BC.USVString(Y, {
                        context: "Failed to execute 'append' on 'URLSearchParams': parameter 1",
                        globals: A
                    }), I.push(Y)
                } {
                    let Y = arguments[1];
                    Y = BC.USVString(Y, {
                        context: "Failed to execute 'append' on 'URLSearchParams': parameter 2",
                        globals: A
                    }), I.push(Y)
                }
                return g3.tryWrapperForImpl(F[UG].append(...I))
            }
            delete(D) {
                let G = this !== null && this !== void 0 ? this : A;
                if (!S08.is(G)) throw new A.TypeError("'delete' called on an object that is not a valid instance of URLSearchParams.");
                if (arguments.length < 1) throw new A.TypeError(`Failed to execute 'delete' on 'URLSearchParams': 1 argument required, but only ${arguments.length} present.`);
                let F = [];
                {
                    let I = arguments[0];
                    I = BC.USVString(I, {
                        context: "Failed to execute 'delete' on 'URLSearchParams': parameter 1",
                        globals: A
                    }), F.push(I)
                } {
                    let I = arguments[1];
                    if (I !== void 0) I = BC.USVString(I, {
                        context: "Failed to execute 'delete' on 'URLSearchParams': parameter 2",
                        globals: A
                    });
                    F.push(I)
                }
                return g3.tryWrapperForImpl(G[UG].delete(...F))
            }
            get(D) {
                let G = this !== null && this !== void 0 ? this : A;
                if (!S08.is(G)) throw new A.TypeError("'get' called on an object that is not a valid instance of URLSearchParams.");
                if (arguments.length < 1) throw new A.TypeError(`Failed to execute 'get' on 'URLSearchParams': 1 argument required, but only ${arguments.length} present.`);
                let F = [];
                {
                    let I = arguments[0];
                    I = BC.USVString(I, {
                        context: "Failed to execute 'get' on 'URLSearchParams': parameter 1",
                        globals: A
                    }), F.push(I)
                }
                return G[UG].get(...F)
            }
            getAll(D) {
                let G = this !== null && this !== void 0 ? this : A;
                if (!S08.is(G)) throw new A.TypeError("'getAll' called on an object that is not a valid instance of URLSearchParams.");
                if (arguments.length < 1) throw new A.TypeError(`Failed to execute 'getAll' on 'URLSearchParams': 1 argument required, but only ${arguments.length} present.`);
                let F = [];
                {
                    let I = arguments[0];
                    I = BC.USVString(I, {
                        context: "Failed to execute 'getAll' on 'URLSearchParams': parameter 1",
                        globals: A
                    }), F.push(I)
                }
                return g3.tryWrapperForImpl(G[UG].getAll(...F))
            }
            has(D) {
                let G = this !== null && this !== void 0 ? this : A;
                if (!S08.is(G)) throw new A.TypeError("'has' called on an object that is not a valid instance of URLSearchParams.");
                if (arguments.length < 1) throw new A.TypeError(`Failed to execute 'has' on 'URLSearchParams': 1 argument required, but only ${arguments.length} present.`);
                let F = [];
                {
                    let I = arguments[0];
                    I = BC.USVString(I, {
                        context: "Failed to execute 'has' on 'URLSearchParams': parameter 1",
                        globals: A
                    }), F.push(I)
                } {
                    let I = arguments[1];
                    if (I !== void 0) I = BC.USVString(I, {
                        context: "Failed to execute 'has' on 'URLSearchParams': parameter 2",
                        globals: A
                    });
                    F.push(I)
                }
                return G[UG].has(...F)
            }
            set(D, G) {
                let F = this !== null && this !== void 0 ? this : A;
                if (!S08.is(F)) throw new A.TypeError("'set' called on an object that is not a valid instance of URLSearchParams.");
                if (arguments.length < 2) throw new A.TypeError(`Failed to execute 'set' on 'URLSearchParams': 2 arguments required, but only ${arguments.length} present.`);
                let I = [];
                {
                    let Y = arguments[0];
                    Y = BC.USVString(Y, {
                        context: "Failed to execute 'set' on 'URLSearchParams': parameter 1",
                        globals: A
                    }), I.push(Y)
                } {
                    let Y = arguments[1];
                    Y = BC.USVString(Y, {
                        context: "Failed to execute 'set' on 'URLSearchParams': parameter 2",
                        globals: A
                    }), I.push(Y)
                }
                return g3.tryWrapperForImpl(F[UG].set(...I))
            }
            sort() {
                let D = this !== null && this !== void 0 ? this : A;
                if (!S08.is(D)) throw new A.TypeError("'sort' called on an object that is not a valid instance of URLSearchParams.");
                return g3.tryWrapperForImpl(D[UG].sort())
            }
            toString() {
                let D = this !== null && this !== void 0 ? this : A;
                if (!S08.is(D)) throw new A.TypeError("'toString' called on an object that is not a valid instance of URLSearchParams.");
                return D[UG].toString()
            }
            keys() {
                if (!S08.is(this)) throw new A.TypeError("'keys' called on an object that is not a valid instance of URLSearchParams.");
                return S08.createDefaultIterator(A, this, "key")
            }
            values() {
                if (!S08.is(this)) throw new A.TypeError("'values' called on an object that is not a valid instance of URLSearchParams.");
                return S08.createDefaultIterator(A, this, "value")
            }
            entries() {
                if (!S08.is(this)) throw new A.TypeError("'entries' called on an object that is not a valid instance of URLSearchParams.");
                return S08.createDefaultIterator(A, this, "key+value")
            }
            forEach(D) {
                if (!S08.is(this)) throw new A.TypeError("'forEach' called on an object that is not a valid instance of URLSearchParams.");
                if (arguments.length < 1) throw new A.TypeError("Failed to execute 'forEach' on 'iterable': 1 argument required, but only 0 present.");
                D = T08.convert(A, D, {
                    context: "Failed to execute 'forEach' on 'iterable': The callback provided as parameter 1"
                });
                let G = arguments[1],
                    F = Array.from(this[UG]),
                    I = 0;
                while (I < F.length) {
                    let [Y, W] = F[I].map(g3.tryWrapperForImpl);
                    D.call(G, W, Y, this), F = Array.from(this[UG]), I++
                }
            }
            get size() {
                let D = this !== null && this !== void 0 ? this : A;
                if (!S08.is(D)) throw new A.TypeError("'get size' called on an object that is not a valid instance of URLSearchParams.");
                return D[UG].size
            }
        }
        Object.defineProperties(Z.prototype, {
            append: {
                enumerable: !0
            },
            delete: {
                enumerable: !0
            },
            get: {
                enumerable: !0
            },
            getAll: {
                enumerable: !0
            },
            has: {
                enumerable: !0
            },
            set: {
                enumerable: !0
            },
            sort: {
                enumerable: !0
            },
            toString: {
                enumerable: !0
            },
            keys: {
                enumerable: !0
            },
            values: {
                enumerable: !0
            },
            entries: {
                enumerable: !0
            },
            forEach: {
                enumerable: !0
            },
            size: {
                enumerable: !0
            },
            [Symbol.toStringTag]: {
                value: "URLSearchParams",
                configurable: !0
            },
            [Symbol.iterator]: {
                value: Z.prototype.entries,
                configurable: !0,
                writable: !0
            }
        }), Q.URLSearchParams = Z, Q["URLSearchParams Iterator"] = Object.create(Q["%IteratorPrototype%"], {
            [Symbol.toStringTag]: {
                configurable: !0,
                value: "URLSearchParams Iterator"
            }
        }), g3.define(Q["URLSearchParams Iterator"], {
            next() {
                let D = this && this[g3.iterInternalSymbol];
                if (!D) throw new A.TypeError("next() called on a value that is not a URLSearchParams iterator object");
                let {
                    target: G,
                    kind: F,
                    index: I
                } = D, Y = Array.from(G[UG]), W = Y.length;
                if (I >= W) return hUB(A, {
                    value: void 0,
                    done: !0
                });
                let J = Y[I];
                return D.index = I + 1, hUB(A, g3.iteratorResult(J.map(g3.tryWrapperForImpl), F))
            }
        }), Object.defineProperty(A, "URLSearchParams", {
            configurable: !0,
            writable: !0,
            value: Z
        })
    };
    var Fv = fUB()
});