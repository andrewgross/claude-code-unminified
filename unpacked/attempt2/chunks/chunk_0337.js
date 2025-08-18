/* chunk:337 bytes:[8038084, 8043259) size:5175 source:unpacked-cli.js */
var jt2 = E((Pt2) => {
    Object.defineProperty(Pt2, "__esModule", {
        value: !0
    });
    Pt2.loadFileDescriptorSetFromObject = Pt2.loadFileDescriptorSetFromBuffer = Pt2.fromJSON = Pt2.loadSync = Pt2.load = Pt2.IdempotencyLevel = Pt2.isAnyExtension = Pt2.Long = void 0;
    var Ez6 = Ao2(),
        XM = iP1(),
        $X0 = Jt2(),
        qX0 = wt2(),
        Uz6 = $t2();
    Pt2.Long = Uz6;

    function wz6(A) {
        return "@type" in A && typeof A["@type"] === "string"
    }
    Pt2.isAnyExtension = wz6;
    var Mt2;
    (function(A) {
        A.IDEMPOTENCY_UNKNOWN = "IDEMPOTENCY_UNKNOWN", A.NO_SIDE_EFFECTS = "NO_SIDE_EFFECTS", A.IDEMPOTENT = "IDEMPOTENT"
    })(Mt2 = Pt2.IdempotencyLevel || (Pt2.IdempotencyLevel = {}));
    var Rt2 = {
        longs: String,
        enums: String,
        bytes: String,
        defaults: !0,
        oneofs: !0,
        json: !0
    };

    function $z6(A, B) {
        if (A === "") return B;
        else return A + "." + B
    }

    function qz6(A) {
        return A instanceof XM.Service || A instanceof XM.Type || A instanceof XM.Enum
    }

    function Nz6(A) {
        return A instanceof XM.Namespace || A instanceof XM.Root
    }

    function Ot2(A, B) {
        let Q = $z6(B, A.name);
        if (qz6(A)) return [
            [Q, A]
        ];
        else if (Nz6(A) && typeof A.nested !== "undefined") return Object.keys(A.nested).map((Z) => {
            return Ot2(A.nested[Z], Q)
        }).reduce((Z, D) => Z.concat(D), []);
        return []
    }

    function qt2(A, B) {
        return function Q(Z) {
            return A.toObject(A.decode(Z), B)
        }
    }

    function Nt2(A) {
        return function B(Q) {
            if (Array.isArray(Q)) throw new Error(`Failed to serialize message: expected object with ${A.name} structure, got array instead`);
            let Z = A.fromObject(Q);
            return A.encode(Z).finish()
        }
    }

    function Lz6(A) {
        return (A || []).reduce((B, Q) => {
            for (let [Z, D] of Object.entries(Q)) switch (Z) {
                case "uninterpreted_option":
                    B.uninterpreted_option.push(Q.uninterpreted_option);
                    break;
                default:
                    B[Z] = D
            }
            return B
        }, {
            deprecated: !1,
            idempotency_level: Mt2.IDEMPOTENCY_UNKNOWN,
            uninterpreted_option: []
        })
    }

    function Mz6(A, B, Q, Z) {
        let {
            resolvedRequestType: D,
            resolvedResponseType: G
        } = A;
        return {
            path: "/" + B + "/" + A.name,
            requestStream: !!A.requestStream,
            responseStream: !!A.responseStream,
            requestSerialize: Nt2(D),
            requestDeserialize: qt2(D, Q),
            responseSerialize: Nt2(G),
            responseDeserialize: qt2(G, Q),
            originalName: Ez6(A.name),
            requestType: wX0(D, Z),
            responseType: wX0(G, Z),
            options: Lz6(A.parsedOptions)
        }
    }

    function Rz6(A, B, Q, Z) {
        let D = {};
        for (let G of A.methodsArray) D[G.name] = Mz6(G, B, Q, Z);
        return D
    }

    function wX0(A, B) {
        let Q = A.toDescriptor("proto3");
        return {
            format: "Protocol Buffer 3 DescriptorProto",
            type: Q.$type.toObject(Q, Rt2),
            fileDescriptorProtos: B
        }
    }

    function Oz6(A, B) {
        let Q = A.toDescriptor("proto3");
        return {
            format: "Protocol Buffer 3 EnumDescriptorProto",
            type: Q.$type.toObject(Q, Rt2),
            fileDescriptorProtos: B
        }
    }

    function Tz6(A, B, Q, Z) {
        if (A instanceof XM.Service) return Rz6(A, B, Q, Z);
        else if (A instanceof XM.Type) return wX0(A, Z);
        else if (A instanceof XM.Enum) return Oz6(A, Z);
        else throw new Error("Type mismatch in reflection object handling")
    }

    function sP1(A, B) {
        let Q = {};
        A.resolveAll();
        let D = A.toDescriptor("proto3").file.map((G) => Buffer.from($X0.FileDescriptorProto.encode(G).finish()));
        for (let [G, F] of Ot2(A, "")) Q[G] = Tz6(F, G, B, D);
        return Q
    }

    function Tt2(A, B) {
        B = B || {};
        let Q = XM.Root.fromDescriptor(A);
        return Q.resolveAll(), sP1(Q, B)
    }

    function Pz6(A, B) {
        return qX0.loadProtosWithOptions(A, B).then((Q) => {
            return sP1(Q, B)
        })
    }
    Pt2.load = Pz6;

    function Sz6(A, B) {
        let Q = qX0.loadProtosWithOptionsSync(A, B);
        return sP1(Q, B)
    }
    Pt2.loadSync = Sz6;

    function jz6(A, B) {
        B = B || {};
        let Q = XM.Root.fromJSON(A);
        return Q.resolveAll(), sP1(Q, B)
    }
    Pt2.fromJSON = jz6;

    function kz6(A, B) {
        let Q = $X0.FileDescriptorSet.decode(A);
        return Tt2(Q, B)
    }
    Pt2.loadFileDescriptorSetFromBuffer = kz6;

    function yz6(A, B) {
        let Q = $X0.FileDescriptorSet.fromObject(A);
        return Tt2(Q, B)
    }
    Pt2.loadFileDescriptorSetFromObject = yz6;
    qX0.addCommonProtos()
});