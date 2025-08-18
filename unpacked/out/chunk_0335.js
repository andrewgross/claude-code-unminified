/* chunk:335 bytes:[8001319, 8018201) size:16882 source:unpacked-cli.js */
var Xt2 = E((Sp5, Wz6) => {
    Wz6.exports = {
        nested: {
            google: {
                nested: {
                    protobuf: {
                        nested: {
                            Api: {
                                fields: {
                                    name: {
                                        type: "string",
                                        id: 1
                                    },
                                    methods: {
                                        rule: "repeated",
                                        type: "Method",
                                        id: 2
                                    },
                                    options: {
                                        rule: "repeated",
                                        type: "Option",
                                        id: 3
                                    },
                                    version: {
                                        type: "string",
                                        id: 4
                                    },
                                    sourceContext: {
                                        type: "SourceContext",
                                        id: 5
                                    },
                                    mixins: {
                                        rule: "repeated",
                                        type: "Mixin",
                                        id: 6
                                    },
                                    syntax: {
                                        type: "Syntax",
                                        id: 7
                                    }
                                }
                            },
                            Method: {
                                fields: {
                                    name: {
                                        type: "string",
                                        id: 1
                                    },
                                    requestTypeUrl: {
                                        type: "string",
                                        id: 2
                                    },
                                    requestStreaming: {
                                        type: "bool",
                                        id: 3
                                    },
                                    responseTypeUrl: {
                                        type: "string",
                                        id: 4
                                    },
                                    responseStreaming: {
                                        type: "bool",
                                        id: 5
                                    },
                                    options: {
                                        rule: "repeated",
                                        type: "Option",
                                        id: 6
                                    },
                                    syntax: {
                                        type: "Syntax",
                                        id: 7
                                    }
                                }
                            },
                            Mixin: {
                                fields: {
                                    name: {
                                        type: "string",
                                        id: 1
                                    },
                                    root: {
                                        type: "string",
                                        id: 2
                                    }
                                }
                            },
                            SourceContext: {
                                fields: {
                                    fileName: {
                                        type: "string",
                                        id: 1
                                    }
                                }
                            },
                            Option: {
                                fields: {
                                    name: {
                                        type: "string",
                                        id: 1
                                    },
                                    value: {
                                        type: "Any",
                                        id: 2
                                    }
                                }
                            },
                            Syntax: {
                                values: {
                                    SYNTAX_PROTO2: 0,
                                    SYNTAX_PROTO3: 1
                                }
                            }
                        }
                    }
                }
            }
        }
    }
});
var Vt2 = E((jp5, Jz6) => {
    Jz6.exports = {
        nested: {
            google: {
                nested: {
                    protobuf: {
                        nested: {
                            SourceContext: {
                                fields: {
                                    fileName: {
                                        type: "string",
                                        id: 1
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }
});
var Ct2 = E((kp5, Xz6) => {
    Xz6.exports = {
        nested: {
            google: {
                nested: {
                    protobuf: {
                        nested: {
                            Type: {
                                fields: {
                                    name: {
                                        type: "string",
                                        id: 1
                                    },
                                    fields: {
                                        rule: "repeated",
                                        type: "Field",
                                        id: 2
                                    },
                                    oneofs: {
                                        rule: "repeated",
                                        type: "string",
                                        id: 3
                                    },
                                    options: {
                                        rule: "repeated",
                                        type: "Option",
                                        id: 4
                                    },
                                    sourceContext: {
                                        type: "SourceContext",
                                        id: 5
                                    },
                                    syntax: {
                                        type: "Syntax",
                                        id: 6
                                    }
                                }
                            },
                            Field: {
                                fields: {
                                    kind: {
                                        type: "Kind",
                                        id: 1
                                    },
                                    cardinality: {
                                        type: "Cardinality",
                                        id: 2
                                    },
                                    number: {
                                        type: "int32",
                                        id: 3
                                    },
                                    name: {
                                        type: "string",
                                        id: 4
                                    },
                                    typeUrl: {
                                        type: "string",
                                        id: 6
                                    },
                                    oneofIndex: {
                                        type: "int32",
                                        id: 7
                                    },
                                    packed: {
                                        type: "bool",
                                        id: 8
                                    },
                                    options: {
                                        rule: "repeated",
                                        type: "Option",
                                        id: 9
                                    },
                                    jsonName: {
                                        type: "string",
                                        id: 10
                                    },
                                    defaultValue: {
                                        type: "string",
                                        id: 11
                                    }
                                },
                                nested: {
                                    Kind: {
                                        values: {
                                            TYPE_UNKNOWN: 0,
                                            TYPE_DOUBLE: 1,
                                            TYPE_FLOAT: 2,
                                            TYPE_INT64: 3,
                                            TYPE_UINT64: 4,
                                            TYPE_INT32: 5,
                                            TYPE_FIXED64: 6,
                                            TYPE_FIXED32: 7,
                                            TYPE_BOOL: 8,
                                            TYPE_STRING: 9,
                                            TYPE_GROUP: 10,
                                            TYPE_MESSAGE: 11,
                                            TYPE_BYTES: 12,
                                            TYPE_UINT32: 13,
                                            TYPE_ENUM: 14,
                                            TYPE_SFIXED32: 15,
                                            TYPE_SFIXED64: 16,
                                            TYPE_SINT32: 17,
                                            TYPE_SINT64: 18
                                        }
                                    },
                                    Cardinality: {
                                        values: {
                                            CARDINALITY_UNKNOWN: 0,
                                            CARDINALITY_OPTIONAL: 1,
                                            CARDINALITY_REQUIRED: 2,
                                            CARDINALITY_REPEATED: 3
                                        }
                                    }
                                }
                            },
                            Enum: {
                                fields: {
                                    name: {
                                        type: "string",
                                        id: 1
                                    },
                                    enumvalue: {
                                        rule: "repeated",
                                        type: "EnumValue",
                                        id: 2
                                    },
                                    options: {
                                        rule: "repeated",
                                        type: "Option",
                                        id: 3
                                    },
                                    sourceContext: {
                                        type: "SourceContext",
                                        id: 4
                                    },
                                    syntax: {
                                        type: "Syntax",
                                        id: 5
                                    }
                                }
                            },
                            EnumValue: {
                                fields: {
                                    name: {
                                        type: "string",
                                        id: 1
                                    },
                                    number: {
                                        type: "int32",
                                        id: 2
                                    },
                                    options: {
                                        rule: "repeated",
                                        type: "Option",
                                        id: 3
                                    }
                                }
                            },
                            Option: {
                                fields: {
                                    name: {
                                        type: "string",
                                        id: 1
                                    },
                                    value: {
                                        type: "Any",
                                        id: 2
                                    }
                                }
                            },
                            Syntax: {
                                values: {
                                    SYNTAX_PROTO2: 0,
                                    SYNTAX_PROTO3: 1
                                }
                            },
                            Any: {
                                fields: {
                                    type_url: {
                                        type: "string",
                                        id: 1
                                    },
                                    value: {
                                        type: "bytes",
                                        id: 2
                                    }
                                }
                            },
                            SourceContext: {
                                fields: {
                                    fileName: {
                                        type: "string",
                                        id: 1
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }
});
var wt2 = E((Et2) => {
    Object.defineProperty(Et2, "__esModule", {
        value: !0
    });
    Et2.addCommonProtos = Et2.loadProtosWithOptionsSync = Et2.loadProtosWithOptions = void 0;
    var Kt2 = W1("fs"),
        Ht2 = W1("path"),
        gt = iP1();

    function zt2(A, B) {
        let Q = A.resolvePath;
        A.resolvePath = (Z, D) => {
            if (Ht2.isAbsolute(D)) return D;
            for (let G of B) {
                let F = Ht2.join(G, D);
                try {
                    return Kt2.accessSync(F, Kt2.constants.R_OK), F
                } catch (I) {
                    continue
                }
            }
            return process.emitWarning(`${D} not found in any of the include paths ${B}`), Q(Z, D)
        }
    }
    async function Vz6(A, B) {
        let Q = new gt.Root;
        if (B = B || {}, B.includeDirs) {
            if (!Array.isArray(B.includeDirs)) return Promise.reject(new Error("The includeDirs option must be an array"));
            zt2(Q, B.includeDirs)
        }
        let Z = await Q.load(A, B);
        return Z.resolveAll(), Z
    }
    Et2.loadProtosWithOptions = Vz6;

    function Cz6(A, B) {
        let Q = new gt.Root;
        if (B = B || {}, B.includeDirs) {
            if (!Array.isArray(B.includeDirs)) throw new Error("The includeDirs option must be an array");
            zt2(Q, B.includeDirs)
        }
        let Z = Q.loadSync(A, B);
        return Z.resolveAll(), Z
    }
    Et2.loadProtosWithOptionsSync = Cz6;

    function Kz6() {
        let A = Xt2(),
            B = zX0(),
            Q = Vt2(),
            Z = Ct2();
        gt.common("api", A.nested.google.nested.protobuf.nested), gt.common("descriptor", B.nested.google.nested.protobuf.nested), gt.common("source_context", Q.nested.google.nested.protobuf.nested), gt.common("type", Z.nested.google.nested.protobuf.nested)
    }
    Et2.addCommonProtos = Kz6
});