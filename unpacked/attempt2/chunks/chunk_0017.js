/* chunk:17 bytes:[272228, 292021) size:19793 source:unpacked-cli.js */
var Bu0 = E((Au0) => {
    var {
        _optionalChain: YV9
    } = UA();
    Object.defineProperty(Au0, "__esModule", {
        value: !0
    });
    var GB1 = UA(),
        Jl1 = FV(),
        WV9 = oj();
    class KX1 {
        static __initStatic() {
            this.id = "Mysql"
        }
        constructor() {
            this.name = KX1.id
        }
        loadDependency() {
            return this._module = this._module || GB1.loadModule("mysql/lib/Connection.js")
        }
        setupOnce(A, B) {
            if (WV9.shouldDisableAutoInstrumentation(B)) {
                Jl1.DEBUG_BUILD && GB1.logger.log("Mysql Integration is skipped because of instrumenter configuration.");
                return
            }
            let Q = this.loadDependency();
            if (!Q) {
                Jl1.DEBUG_BUILD && GB1.logger.error("Mysql Integration was unable to require `mysql` package.");
                return
            }
            let Z = void 0;
            try {
                Q.prototype.connect = new Proxy(Q.prototype.connect, {
                    apply(F, I, Y) {
                        if (!Z) Z = I.config;
                        return F.apply(I, Y)
                    }
                })
            } catch (F) {
                Jl1.DEBUG_BUILD && GB1.logger.error("Mysql Integration was unable to instrument `mysql` config.")
            }

            function D() {
                if (!Z) return {};
                return {
                    "server.address": Z.host,
                    "server.port": Z.port,
                    "db.user": Z.user
                }
            }

            function G(F) {
                if (!F) return;
                let I = D();
                Object.keys(I).forEach((Y) => {
                    F.setAttribute(Y, I[Y])
                }), F.end()
            }
            GB1.fill(Q, "createQuery", function(F) {
                return function(I, Y, W) {
                    let X = B().getScope().getSpan(),
                        V = YV9([X, "optionalAccess", (K) => K.startChild, "call", (K) => K({
                            description: typeof I === "string" ? I : I.sql,
                            op: "db",
                            origin: "auto.db.mysql",
                            data: {
                                "db.system": "mysql"
                            }
                        })]);
                    if (typeof W === "function") return F.call(this, I, Y, function(K, H, z) {
                        G(V), W(K, H, z)
                    });
                    if (typeof Y === "function") return F.call(this, I, function(K, H, z) {
                        G(V), Y(K, H, z)
                    });
                    let C = F.call(this, I, Y);
                    return C.on("end", () => {
                        G(V)
                    }), C
                }
            })
        }
    }
    KX1.__initStatic();
    Au0.Mysql = KX1
});
var Du0 = E((Zu0) => {
    var {
        _optionalChain: tj
    } = UA();
    Object.defineProperty(Zu0, "__esModule", {
        value: !0
    });
    var FB1 = UA(),
        Qu0 = FV(),
        XV9 = oj(),
        VV9 = ["aggregate", "bulkWrite", "countDocuments", "createIndex", "createIndexes", "deleteMany", "deleteOne", "distinct", "drop", "dropIndex", "dropIndexes", "estimatedDocumentCount", "find", "findOne", "findOneAndDelete", "findOneAndReplace", "findOneAndUpdate", "indexes", "indexExists", "indexInformation", "initializeOrderedBulkOp", "insertMany", "insertOne", "isCapped", "mapReduce", "options", "parallelCollectionScan", "rename", "replaceOne", "stats", "updateMany", "updateOne"],
        CV9 = {
            bulkWrite: ["operations"],
            countDocuments: ["query"],
            createIndex: ["fieldOrSpec"],
            createIndexes: ["indexSpecs"],
            deleteMany: ["filter"],
            deleteOne: ["filter"],
            distinct: ["key", "query"],
            dropIndex: ["indexName"],
            find: ["query"],
            findOne: ["query"],
            findOneAndDelete: ["filter"],
            findOneAndReplace: ["filter", "replacement"],
            findOneAndUpdate: ["filter", "update"],
            indexExists: ["indexes"],
            insertMany: ["docs"],
            insertOne: ["doc"],
            mapReduce: ["map", "reduce"],
            rename: ["newName"],
            replaceOne: ["filter", "doc"],
            updateMany: ["filter", "update"],
            updateOne: ["filter", "update"]
        };

    function KV9(A) {
        return A && typeof A === "object" && A.once && typeof A.once === "function"
    }
    class HX1 {
        static __initStatic() {
            this.id = "Mongo"
        }
        constructor(A = {}) {
            this.name = HX1.id, this._operations = Array.isArray(A.operations) ? A.operations : VV9, this._describeOperations = "describeOperations" in A ? A.describeOperations : !0, this._useMongoose = !!A.useMongoose
        }
        loadDependency() {
            let A = this._useMongoose ? "mongoose" : "mongodb";
            return this._module = this._module || FB1.loadModule(A)
        }
        setupOnce(A, B) {
            if (XV9.shouldDisableAutoInstrumentation(B)) {
                Qu0.DEBUG_BUILD && FB1.logger.log("Mongo Integration is skipped because of instrumenter configuration.");
                return
            }
            let Q = this.loadDependency();
            if (!Q) {
                let Z = this._useMongoose ? "mongoose" : "mongodb";
                Qu0.DEBUG_BUILD && FB1.logger.error(`Mongo Integration was unable to require \`${Z}\` package.`);
                return
            }
            this._instrumentOperations(Q.Collection, this._operations, B)
        }
        _instrumentOperations(A, B, Q) {
            B.forEach((Z) => this._patchOperation(A, Z, Q))
        }
        _patchOperation(A, B, Q) {
            if (!(B in A.prototype)) return;
            let Z = this._getSpanContextFromOperationArguments.bind(this);
            FB1.fill(A.prototype, B, function(D) {
                return function(...G) {
                    let F = G[G.length - 1],
                        I = Q(),
                        Y = I.getScope(),
                        W = I.getClient(),
                        J = Y.getSpan(),
                        X = tj([W, "optionalAccess", (C) => C.getOptions, "call", (C) => C(), "access", (C) => C.sendDefaultPii]);
                    if (typeof F !== "function" || B === "mapReduce" && G.length === 2) {
                        let C = tj([J, "optionalAccess", (H) => H.startChild, "call", (H) => H(Z(this, B, G, X))]),
                            K = D.call(this, ...G);
                        if (FB1.isThenable(K)) return K.then((H) => {
                            return tj([C, "optionalAccess", (z) => z.end, "call", (z) => z()]), H
                        });
                        else if (KV9(K)) {
                            let H = K;
                            try {
                                H.once("close", () => {
                                    tj([C, "optionalAccess", (z) => z.end, "call", (z) => z()])
                                })
                            } catch (z) {
                                tj([C, "optionalAccess", ($) => $.end, "call", ($) => $()])
                            }
                            return H
                        } else return tj([C, "optionalAccess", (H) => H.end, "call", (H) => H()]), K
                    }
                    let V = tj([J, "optionalAccess", (C) => C.startChild, "call", (C) => C(Z(this, B, G.slice(0, -1)))]);
                    return D.call(this, ...G.slice(0, -1), function(C, K) {
                        tj([V, "optionalAccess", (H) => H.end, "call", (H) => H()]), F(C, K)
                    })
                }
            })
        }
        _getSpanContextFromOperationArguments(A, B, Q, Z = !1) {
            let D = {
                    "db.system": "mongodb",
                    "db.name": A.dbName,
                    "db.operation": B,
                    "db.mongodb.collection": A.collectionName
                },
                G = {
                    op: "db",
                    origin: "auto.db.mongo",
                    description: B,
                    data: D
                },
                F = CV9[B],
                I = Array.isArray(this._describeOperations) ? this._describeOperations.includes(B) : this._describeOperations;
            if (!F || !I || !Z) return G;
            try {
                if (B === "mapReduce") {
                    let [Y, W] = Q;
                    D[F[0]] = typeof Y === "string" ? Y : Y.name || "<anonymous>", D[F[1]] = typeof W === "string" ? W : W.name || "<anonymous>"
                } else
                    for (let Y = 0; Y < F.length; Y++) D[`db.mongodb.${F[Y]}`] = JSON.stringify(Q[Y])
            } catch (Y) {}
            return G
        }
    }
    HX1.__initStatic();
    Zu0.Mongo = HX1
});
var Iu0 = E((Fu0) => {
    Object.defineProperty(Fu0, "__esModule", {
        value: !0
    });
    var Xl1 = xQ(),
        Gu0 = UA(),
        zV9 = FV(),
        EV9 = oj();

    function UV9(A) {
        return !!A && !!A.$use
    }
    class zX1 {
        static __initStatic() {
            this.id = "Prisma"
        }
        constructor(A = {}) {
            if (this.name = zX1.id, UV9(A.client) && !A.client._sentryInstrumented) {
                Gu0.addNonEnumerableProperty(A.client, "_sentryInstrumented", !0);
                let B = {};
                try {
                    let Q = A.client._engineConfig;
                    if (Q) {
                        let {
                            activeProvider: Z,
                            clientVersion: D
                        } = Q;
                        if (Z) B["db.system"] = Z;
                        if (D) B["db.prisma.version"] = D
                    }
                } catch (Q) {}
                A.client.$use((Q, Z) => {
                    if (EV9.shouldDisableAutoInstrumentation(Xl1.getCurrentHub)) return Z(Q);
                    let {
                        action: D,
                        model: G
                    } = Q;
                    return Xl1.startSpan({
                        name: G ? `${G} ${D}` : D,
                        onlyIfParent: !0,
                        op: "db.prisma",
                        attributes: {
                            [Xl1.SEMANTIC_ATTRIBUTE_SENTRY_ORIGIN]: "auto.db.prisma"
                        },
                        data: {
                            ...B,
                            "db.operation": D
                        }
                    }, () => Z(Q))
                })
            } else zV9.DEBUG_BUILD && Gu0.logger.warn("Unsupported Prisma client provided to PrismaIntegration. Provided client:", A.client)
        }
        setupOnce() {}
    }
    zX1.__initStatic();
    Fu0.Prisma = zX1
});
var Ju0 = E((Wu0) => {
    var {
        _optionalChain: il
    } = UA();
    Object.defineProperty(Wu0, "__esModule", {
        value: !0
    });
    var IB1 = UA(),
        Yu0 = FV(),
        $V9 = oj();
    class EX1 {
        static __initStatic() {
            this.id = "GraphQL"
        }
        constructor() {
            this.name = EX1.id
        }
        loadDependency() {
            return this._module = this._module || IB1.loadModule("graphql/execution/execute.js")
        }
        setupOnce(A, B) {
            if ($V9.shouldDisableAutoInstrumentation(B)) {
                Yu0.DEBUG_BUILD && IB1.logger.log("GraphQL Integration is skipped because of instrumenter configuration.");
                return
            }
            let Q = this.loadDependency();
            if (!Q) {
                Yu0.DEBUG_BUILD && IB1.logger.error("GraphQL Integration was unable to require graphql/execution package.");
                return
            }
            IB1.fill(Q, "execute", function(Z) {
                return function(...D) {
                    let G = B().getScope(),
                        F = G.getSpan(),
                        I = il([F, "optionalAccess", (W) => W.startChild, "call", (W) => W({
                            description: "execute",
                            op: "graphql.execute",
                            origin: "auto.graphql.graphql"
                        })]);
                    il([G, "optionalAccess", (W) => W.setSpan, "call", (W) => W(I)]);
                    let Y = Z.call(this, ...D);
                    if (IB1.isThenable(Y)) return Y.then((W) => {
                        return il([I, "optionalAccess", (J) => J.end, "call", (J) => J()]), il([G, "optionalAccess", (J) => J.setSpan, "call", (J) => J(F)]), W
                    });
                    return il([I, "optionalAccess", (W) => W.end, "call", (W) => W()]), il([G, "optionalAccess", (W) => W.setSpan, "call", (W) => W(F)]), Y
                }
            })
        }
    }
    EX1.__initStatic();
    Wu0.GraphQL = EX1
});
var Cu0 = E((Vu0) => {
    var {
        _optionalChain: Vl1
    } = UA();
    Object.defineProperty(Vu0, "__esModule", {
        value: !0
    });
    var hW = UA(),
        UX1 = FV(),
        NV9 = oj();
    class wX1 {
        static __initStatic() {
            this.id = "Apollo"
        }
        constructor(A = {
            useNestjs: !1
        }) {
            this.name = wX1.id, this._useNest = !!A.useNestjs
        }
        loadDependency() {
            if (this._useNest) this._module = this._module || hW.loadModule("@nestjs/graphql");
            else this._module = this._module || hW.loadModule("apollo-server-core");
            return this._module
        }
        setupOnce(A, B) {
            if (NV9.shouldDisableAutoInstrumentation(B)) {
                UX1.DEBUG_BUILD && hW.logger.log("Apollo Integration is skipped because of instrumenter configuration.");
                return
            }
            if (this._useNest) {
                let Q = this.loadDependency();
                if (!Q) {
                    UX1.DEBUG_BUILD && hW.logger.error("Apollo-NestJS Integration was unable to require @nestjs/graphql package.");
                    return
                }
                hW.fill(Q.GraphQLFactory.prototype, "mergeWithSchema", function(Z) {
                    return function(...D) {
                        return hW.fill(this.resolversExplorerService, "explore", function(G) {
                            return function() {
                                let F = hW.arrayify(G.call(this));
                                return Xu0(F, B)
                            }
                        }), Z.call(this, ...D)
                    }
                })
            } else {
                let Q = this.loadDependency();
                if (!Q) {
                    UX1.DEBUG_BUILD && hW.logger.error("Apollo Integration was unable to require apollo-server-core package.");
                    return
                }
                hW.fill(Q.ApolloServerBase.prototype, "constructSchema", function(Z) {
                    return function() {
                        if (!this.config.resolvers) {
                            if (UX1.DEBUG_BUILD) {
                                if (this.config.schema) hW.logger.warn("Apollo integration is not able to trace `ApolloServer` instances constructed via `schema` property.If you are using NestJS with Apollo, please use `Sentry.Integrations.Apollo({ useNestjs: true })` instead."), hW.logger.warn();
                                else if (this.config.modules) hW.logger.warn("Apollo integration is not able to trace `ApolloServer` instances constructed via `modules` property.");
                                hW.logger.error("Skipping tracing as no resolvers found on the `ApolloServer` instance.")
                            }
                            return Z.call(this)
                        }
                        let D = hW.arrayify(this.config.resolvers);
                        return this.config.resolvers = Xu0(D, B), Z.call(this)
                    }
                })
            }
        }
    }
    wX1.__initStatic();

    function Xu0(A, B) {
        return A.map((Q) => {
            return Object.keys(Q).forEach((Z) => {
                Object.keys(Q[Z]).forEach((D) => {
                    if (typeof Q[Z][D] !== "function") return;
                    LV9(Q, Z, D, B)
                })
            }), Q
        })
    }

    function LV9(A, B, Q, Z) {
        hW.fill(A[B], Q, function(D) {
            return function(...G) {
                let I = Z().getScope().getSpan(),
                    Y = Vl1([I, "optionalAccess", (J) => J.startChild, "call", (J) => J({
                        description: `${B}.${Q}`,
                        op: "graphql.resolve",
                        origin: "auto.graphql.apollo"
                    })]),
                    W = D.call(this, ...G);
                if (hW.isThenable(W)) return W.then((J) => {
                    return Vl1([Y, "optionalAccess", (X) => X.end, "call", (X) => X()]), J
                });
                return Vl1([Y, "optionalAccess", (J) => J.end, "call", (J) => J()]), W
            }
        })
    }
    Vu0.Apollo = wX1
});
var Hu0 = E((Ku0, ej) => {
    Object.defineProperty(Ku0, "__esModule", {
        value: !0
    });
    var xf = UA(),
        RV9 = [() => {
            return new(xf.dynamicRequire(ej, "./apollo")).Apollo
        }, () => {
            return new(xf.dynamicRequire(ej, "./apollo")).Apollo({
                useNestjs: !0
            })
        }, () => {
            return new(xf.dynamicRequire(ej, "./graphql")).GraphQL
        }, () => {
            return new(xf.dynamicRequire(ej, "./mongo")).Mongo
        }, () => {
            return new(xf.dynamicRequire(ej, "./mongo")).Mongo({
                mongoose: !0
            })
        }, () => {
            return new(xf.dynamicRequire(ej, "./mysql")).Mysql
        }, () => {
            return new(xf.dynamicRequire(ej, "./postgres")).Postgres
        }];
    Ku0.lazyLoadedNodePerformanceMonitoringIntegrations = RV9
});
var dC = E((zu0) => {
    Object.defineProperty(zu0, "__esModule", {
        value: !0
    });
    var TV9 = UA(),
        PV9 = TV9.GLOBAL_OBJ;
    zu0.WINDOW = PV9
});
var Kl1 = E(($u0) => {
    Object.defineProperty($u0, "__esModule", {
        value: !0
    });
    var Eu0 = xQ(),
        Uu0 = UA(),
        wu0 = FV(),
        Cl1 = dC();

    function jV9() {
        if (Cl1.WINDOW.document) Cl1.WINDOW.document.addEventListener("visibilitychange", () => {
            let A = Eu0.getActiveTransaction();
            if (Cl1.WINDOW.document.hidden && A) {
                let {
                    op: Q,
                    status: Z
                } = Eu0.spanToJSON(A);
                if (wu0.DEBUG_BUILD && Uu0.logger.log(`[Tracing] Transaction: cancelled -> since tab moved to the background, op: ${Q}`), !Z) A.setStatus("cancelled");
                A.setTag("visibilitychange", "document.hidden"), A.end()
            }
        });
        else wu0.DEBUG_BUILD && Uu0.logger.warn("[Tracing] Could not set up background tab detection due to lack of global document")
    }
    $u0.registerBackgroundTabDetection = jV9
});
var nl = E((qu0) => {
    Object.defineProperty(qu0, "__esModule", {
        value: !0
    });
    var yV9 = (A, B, Q) => {
        let Z, D;
        return (G) => {
            if (B.value >= 0) {
                if (G || Q) {
                    if (D = B.value - (Z || 0), D || Z === void 0) Z = B.value, B.delta = D, A(B)
                }
            }
        }
    };
    qu0.bindReporter = yV9
});