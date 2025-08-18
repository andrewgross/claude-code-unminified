/* chunk:144 bytes:[3235461, 3250397) size:14936 source:unpacked-cli.js */
var oA0 = E((p65, QkA) => {
    QkA.exports = {
        kState: Symbol("FileReader state"),
        kResult: Symbol("FileReader result"),
        kError: Symbol("FileReader error"),
        kLastProgressEventFired: Symbol("FileReader last progress event fired timestamp"),
        kEvents: Symbol("FileReader events"),
        kAborted: Symbol("FileReader aborted")
    }
});
var DkA = E((i65, ZkA) => {
    var {
        webidl: FK
    } = NY(), Bw1 = Symbol("ProgressEvent state");
    class O41 extends Event {
        constructor(A, B = {}) {
            A = FK.converters.DOMString(A, "ProgressEvent constructor", "type"), B = FK.converters.ProgressEventInit(B ?? {});
            super(A, B);
            this[Bw1] = {
                lengthComputable: B.lengthComputable,
                loaded: B.loaded,
                total: B.total
            }
        }
        get lengthComputable() {
            return FK.brandCheck(this, O41), this[Bw1].lengthComputable
        }
        get loaded() {
            return FK.brandCheck(this, O41), this[Bw1].loaded
        }
        get total() {
            return FK.brandCheck(this, O41), this[Bw1].total
        }
    }
    FK.converters.ProgressEventInit = FK.dictionaryConverter([{
        key: "lengthComputable",
        converter: FK.converters.boolean,
        defaultValue: () => !1
    }, {
        key: "loaded",
        converter: FK.converters["unsigned long long"],
        defaultValue: () => 0
    }, {
        key: "total",
        converter: FK.converters["unsigned long long"],
        defaultValue: () => 0
    }, {
        key: "bubbles",
        converter: FK.converters.boolean,
        defaultValue: () => !1
    }, {
        key: "cancelable",
        converter: FK.converters.boolean,
        defaultValue: () => !1
    }, {
        key: "composed",
        converter: FK.converters.boolean,
        defaultValue: () => !1
    }]);
    ZkA.exports = {
        ProgressEvent: O41
    }
});
var FkA = E((n65, GkA) => {
    function wxQ(A) {
        if (!A) return "failure";
        switch (A.trim().toLowerCase()) {
            case "unicode-1-1-utf-8":
            case "unicode11utf8":
            case "unicode20utf8":
            case "utf-8":
            case "utf8":
            case "x-unicode20utf8":
                return "UTF-8";
            case "866":
            case "cp866":
            case "csibm866":
            case "ibm866":
                return "IBM866";
            case "csisolatin2":
            case "iso-8859-2":
            case "iso-ir-101":
            case "iso8859-2":
            case "iso88592":
            case "iso_8859-2":
            case "iso_8859-2:1987":
            case "l2":
            case "latin2":
                return "ISO-8859-2";
            case "csisolatin3":
            case "iso-8859-3":
            case "iso-ir-109":
            case "iso8859-3":
            case "iso88593":
            case "iso_8859-3":
            case "iso_8859-3:1988":
            case "l3":
            case "latin3":
                return "ISO-8859-3";
            case "csisolatin4":
            case "iso-8859-4":
            case "iso-ir-110":
            case "iso8859-4":
            case "iso88594":
            case "iso_8859-4":
            case "iso_8859-4:1988":
            case "l4":
            case "latin4":
                return "ISO-8859-4";
            case "csisolatincyrillic":
            case "cyrillic":
            case "iso-8859-5":
            case "iso-ir-144":
            case "iso8859-5":
            case "iso88595":
            case "iso_8859-5":
            case "iso_8859-5:1988":
                return "ISO-8859-5";
            case "arabic":
            case "asmo-708":
            case "csiso88596e":
            case "csiso88596i":
            case "csisolatinarabic":
            case "ecma-114":
            case "iso-8859-6":
            case "iso-8859-6-e":
            case "iso-8859-6-i":
            case "iso-ir-127":
            case "iso8859-6":
            case "iso88596":
            case "iso_8859-6":
            case "iso_8859-6:1987":
                return "ISO-8859-6";
            case "csisolatingreek":
            case "ecma-118":
            case "elot_928":
            case "greek":
            case "greek8":
            case "iso-8859-7":
            case "iso-ir-126":
            case "iso8859-7":
            case "iso88597":
            case "iso_8859-7":
            case "iso_8859-7:1987":
            case "sun_eu_greek":
                return "ISO-8859-7";
            case "csiso88598e":
            case "csisolatinhebrew":
            case "hebrew":
            case "iso-8859-8":
            case "iso-8859-8-e":
            case "iso-ir-138":
            case "iso8859-8":
            case "iso88598":
            case "iso_8859-8":
            case "iso_8859-8:1988":
            case "visual":
                return "ISO-8859-8";
            case "csiso88598i":
            case "iso-8859-8-i":
            case "logical":
                return "ISO-8859-8-I";
            case "csisolatin6":
            case "iso-8859-10":
            case "iso-ir-157":
            case "iso8859-10":
            case "iso885910":
            case "l6":
            case "latin6":
                return "ISO-8859-10";
            case "iso-8859-13":
            case "iso8859-13":
            case "iso885913":
                return "ISO-8859-13";
            case "iso-8859-14":
            case "iso8859-14":
            case "iso885914":
                return "ISO-8859-14";
            case "csisolatin9":
            case "iso-8859-15":
            case "iso8859-15":
            case "iso885915":
            case "iso_8859-15":
            case "l9":
                return "ISO-8859-15";
            case "iso-8859-16":
                return "ISO-8859-16";
            case "cskoi8r":
            case "koi":
            case "koi8":
            case "koi8-r":
            case "koi8_r":
                return "KOI8-R";
            case "koi8-ru":
            case "koi8-u":
                return "KOI8-U";
            case "csmacintosh":
            case "mac":
            case "macintosh":
            case "x-mac-roman":
                return "macintosh";
            case "iso-8859-11":
            case "iso8859-11":
            case "iso885911":
            case "tis-620":
            case "windows-874":
                return "windows-874";
            case "cp1250":
            case "windows-1250":
            case "x-cp1250":
                return "windows-1250";
            case "cp1251":
            case "windows-1251":
            case "x-cp1251":
                return "windows-1251";
            case "ansi_x3.4-1968":
            case "ascii":
            case "cp1252":
            case "cp819":
            case "csisolatin1":
            case "ibm819":
            case "iso-8859-1":
            case "iso-ir-100":
            case "iso8859-1":
            case "iso88591":
            case "iso_8859-1":
            case "iso_8859-1:1987":
            case "l1":
            case "latin1":
            case "us-ascii":
            case "windows-1252":
            case "x-cp1252":
                return "windows-1252";
            case "cp1253":
            case "windows-1253":
            case "x-cp1253":
                return "windows-1253";
            case "cp1254":
            case "csisolatin5":
            case "iso-8859-9":
            case "iso-ir-148":
            case "iso8859-9":
            case "iso88599":
            case "iso_8859-9":
            case "iso_8859-9:1989":
            case "l5":
            case "latin5":
            case "windows-1254":
            case "x-cp1254":
                return "windows-1254";
            case "cp1255":
            case "windows-1255":
            case "x-cp1255":
                return "windows-1255";
            case "cp1256":
            case "windows-1256":
            case "x-cp1256":
                return "windows-1256";
            case "cp1257":
            case "windows-1257":
            case "x-cp1257":
                return "windows-1257";
            case "cp1258":
            case "windows-1258":
            case "x-cp1258":
                return "windows-1258";
            case "x-mac-cyrillic":
            case "x-mac-ukrainian":
                return "x-mac-cyrillic";
            case "chinese":
            case "csgb2312":
            case "csiso58gb231280":
            case "gb2312":
            case "gb_2312":
            case "gb_2312-80":
            case "gbk":
            case "iso-ir-58":
            case "x-gbk":
                return "GBK";
            case "gb18030":
                return "gb18030";
            case "big5":
            case "big5-hkscs":
            case "cn-big5":
            case "csbig5":
            case "x-x-big5":
                return "Big5";
            case "cseucpkdfmtjapanese":
            case "euc-jp":
            case "x-euc-jp":
                return "EUC-JP";
            case "csiso2022jp":
            case "iso-2022-jp":
                return "ISO-2022-JP";
            case "csshiftjis":
            case "ms932":
            case "ms_kanji":
            case "shift-jis":
            case "shift_jis":
            case "sjis":
            case "windows-31j":
            case "x-sjis":
                return "Shift_JIS";
            case "cseuckr":
            case "csksc56011987":
            case "euc-kr":
            case "iso-ir-149":
            case "korean":
            case "ks_c_5601-1987":
            case "ks_c_5601-1989":
            case "ksc5601":
            case "ksc_5601":
            case "windows-949":
                return "EUC-KR";
            case "csiso2022kr":
            case "hz-gb-2312":
            case "iso-2022-cn":
            case "iso-2022-cn-ext":
            case "iso-2022-kr":
            case "replacement":
                return "replacement";
            case "unicodefffe":
            case "utf-16be":
                return "UTF-16BE";
            case "csunicode":
            case "iso-10646-ucs-2":
            case "ucs-2":
            case "unicode":
            case "unicodefeff":
            case "utf-16":
            case "utf-16le":
                return "UTF-16LE";
            case "x-user-defined":
                return "x-user-defined";
            default:
                return "failure"
        }
    }
    GkA.exports = {
        getEncoding: wxQ
    }
});
var KkA = E((a65, CkA) => {
    var {
        kState: rn,
        kError: tA0,
        kResult: IkA,
        kAborted: T41,
        kLastProgressEventFired: eA0
    } = oA0(), {
        ProgressEvent: $xQ
    } = DkA(), {
        getEncoding: YkA
    } = FkA(), {
        serializeAMimeType: qxQ,
        parseMIMEType: WkA
    } = NV(), {
        types: NxQ
    } = W1("node:util"), {
        StringDecoder: JkA
    } = W1("string_decoder"), {
        btoa: XkA
    } = W1("node:buffer"), LxQ = {
        enumerable: !0,
        writable: !1,
        configurable: !1
    };

    function MxQ(A, B, Q, Z) {
        if (A[rn] === "loading") throw new DOMException("Invalid state", "InvalidStateError");
        A[rn] = "loading", A[IkA] = null, A[tA0] = null;
        let G = B.stream().getReader(),
            F = [],
            I = G.read(),
            Y = !0;
        (async () => {
            while (!A[T41]) try {
                let {
                    done: W,
                    value: J
                } = await I;
                if (Y && !A[T41]) queueMicrotask(() => {
                    Iy("loadstart", A)
                });
                if (Y = !1, !W && NxQ.isUint8Array(J)) {
                    if (F.push(J), (A[eA0] === void 0 || Date.now() - A[eA0] >= 50) && !A[T41]) A[eA0] = Date.now(), queueMicrotask(() => {
                        Iy("progress", A)
                    });
                    I = G.read()
                } else if (W) {
                    queueMicrotask(() => {
                        A[rn] = "done";
                        try {
                            let X = RxQ(F, Q, B.type, Z);
                            if (A[T41]) return;
                            A[IkA] = X, Iy("load", A)
                        } catch (X) {
                            A[tA0] = X, Iy("error", A)
                        }
                        if (A[rn] !== "loading") Iy("loadend", A)
                    });
                    break
                }
            } catch (W) {
                if (A[T41]) return;
                queueMicrotask(() => {
                    if (A[rn] = "done", A[tA0] = W, Iy("error", A), A[rn] !== "loading") Iy("loadend", A)
                });
                break
            }
        })()
    }

    function Iy(A, B) {
        let Q = new $xQ(A, {
            bubbles: !1,
            cancelable: !1
        });
        B.dispatchEvent(Q)
    }

    function RxQ(A, B, Q, Z) {
        switch (B) {
            case "DataURL": {
                let D = "data:",
                    G = WkA(Q || "application/octet-stream");
                if (G !== "failure") D += qxQ(G);
                D += ";base64,";
                let F = new JkA("latin1");
                for (let I of A) D += XkA(F.write(I));
                return D += XkA(F.end()), D
            }
            case "Text": {
                let D = "failure";
                if (Z) D = YkA(Z);
                if (D === "failure" && Q) {
                    let G = WkA(Q);
                    if (G !== "failure") D = YkA(G.parameters.get("charset"))
                }
                if (D === "failure") D = "UTF-8";
                return OxQ(A, D)
            }
            case "ArrayBuffer":
                return VkA(A).buffer;
            case "BinaryString": {
                let D = "",
                    G = new JkA("latin1");
                for (let F of A) D += G.write(F);
                return D += G.end(), D
            }
        }
    }

    function OxQ(A, B) {
        let Q = VkA(A),
            Z = TxQ(Q),
            D = 0;
        if (Z !== null) B = Z, D = Z === "UTF-8" ? 3 : 2;
        let G = Q.slice(D);
        return new TextDecoder(B).decode(G)
    }

    function TxQ(A) {
        let [B, Q, Z] = A;
        if (B === 239 && Q === 187 && Z === 191) return "UTF-8";
        else if (B === 254 && Q === 255) return "UTF-16BE";
        else if (B === 255 && Q === 254) return "UTF-16LE";
        return null
    }

    function VkA(A) {
        let B = A.reduce((Z, D) => {
                return Z + D.byteLength
            }, 0),
            Q = 0;
        return A.reduce((Z, D) => {
            return Z.set(D, Q), Q += D.byteLength, Z
        }, new Uint8Array(B))
    }
    CkA.exports = {
        staticPropertyDescriptors: LxQ,
        readOperation: MxQ,
        fireAProgressEvent: Iy
    }
});