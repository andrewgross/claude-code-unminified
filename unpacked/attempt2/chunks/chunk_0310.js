/* chunk:310 bytes:[7205532, 7223824) size:18292 source:unpacked-cli.js */
var Vd2 = E((Jd2) => {
    Object.defineProperty(Jd2, "__esModule", {
        value: !0
    });
    Jd2.detectResources = void 0;
    var ZW0 = XQ(),
        QW0 = BW0(),
        EG6 = (A = {}) => {
            let B = (A.detectors || []).map((Q) => {
                try {
                    let Z = QW0.resourceFromDetectedResource(Q.detect(A));
                    return ZW0.diag.debug(`${Q.constructor.name} found resource.`, Z), Z
                } catch (Z) {
                    return ZW0.diag.debug(`${Q.constructor.name} failed: ${Z.message}`), QW0.emptyResource()
                }
            });
            return UG6(B), B.reduce((Q, Z) => Q.merge(Z), QW0.emptyResource())
        };
    Jd2.detectResources = EG6;
    var UG6 = (A) => {
        A.forEach((B) => {
            if (Object.keys(B.attributes).length > 0) {
                let Q = JSON.stringify(B.attributes, null, 4);
                ZW0.diag.verbose(Q)
            }
        })
    }
});
var Ed2 = E((Hd2) => {
    Object.defineProperty(Hd2, "__esModule", {
        value: !0
    });
    Hd2.envDetector = void 0;
    var wG6 = XQ(),
        $G6 = qP(),
        Cd2 = f3();
    class Kd2 {
        _MAX_LENGTH = 255;
        _COMMA_SEPARATOR = ",";
        _LABEL_KEY_VALUE_SPLITTER = "=";
        _ERROR_MESSAGE_INVALID_CHARS = "should be a ASCII string with a length greater than 0 and not exceed " + this._MAX_LENGTH + " characters.";
        _ERROR_MESSAGE_INVALID_VALUE = "should be a ASCII string with a length not exceed " + this._MAX_LENGTH + " characters.";
        detect(A) {
            let B = {},
                Q = Cd2.getStringFromEnv("OTEL_RESOURCE_ATTRIBUTES"),
                Z = Cd2.getStringFromEnv("OTEL_SERVICE_NAME");
            if (Q) try {
                let D = this._parseResourceAttributes(Q);
                Object.assign(B, D)
            } catch (D) {
                wG6.diag.debug(`EnvDetector failed: ${D.message}`)
            }
            if (Z) B[$G6.SEMRESATTRS_SERVICE_NAME] = Z;
            return {
                attributes: B
            }
        }
        _parseResourceAttributes(A) {
            if (!A) return {};
            let B = {},
                Q = A.split(this._COMMA_SEPARATOR, -1);
            for (let Z of Q) {
                let D = Z.split(this._LABEL_KEY_VALUE_SPLITTER, -1);
                if (D.length !== 2) continue;
                let [G, F] = D;
                if (G = G.trim(), F = F.trim().split(/^"|"$/).join(""), !this._isValidAndNotEmpty(G)) throw new Error(`Attribute key ${this._ERROR_MESSAGE_INVALID_CHARS}`);
                if (!this._isValid(F)) throw new Error(`Attribute value ${this._ERROR_MESSAGE_INVALID_VALUE}`);
                B[G] = decodeURIComponent(F)
            }
            return B
        }
        _isValid(A) {
            return A.length <= this._MAX_LENGTH && this._isBaggageOctetString(A)
        }
        _isBaggageOctetString(A) {
            for (let B = 0; B < A.length; B++) {
                let Q = A.charCodeAt(B);
                if (Q < 33 || Q === 44 || Q === 59 || Q === 92 || Q > 126) return !1
            }
            return !0
        }
        _isValidAndNotEmpty(A) {
            return A.length > 0 && this._isValid(A)
        }
    }
    Hd2.envDetector = new Kd2
});
var gT1 = E((Ud2) => {
    Object.defineProperty(Ud2, "__esModule", {
        value: !0
    });
    Ud2.execAsync = void 0;
    var qG6 = W1("child_process"),
        NG6 = W1("util");
    Ud2.execAsync = NG6.promisify(qG6.exec)
});
var Nd2 = E(($d2) => {
    Object.defineProperty($d2, "__esModule", {
        value: !0
    });
    $d2.getMachineId = void 0;
    var LG6 = gT1(),
        MG6 = XQ();
    async function RG6() {
        try {
            let B = (await LG6.execAsync('ioreg -rd1 -c "IOPlatformExpertDevice"')).stdout.split(`
`).find((Z) => Z.includes("IOPlatformUUID"));
            if (!B) return;
            let Q = B.split('" = "');
            if (Q.length === 2) return Q[1].slice(0, -1)
        } catch (A) {
            MG6.diag.debug(`error reading machine id: ${A}`)
        }
        return
    }
    $d2.getMachineId = RG6
});
var Rd2 = E((Ld2) => {
    Object.defineProperty(Ld2, "__esModule", {
        value: !0
    });
    Ld2.getMachineId = void 0;
    var OG6 = W1("fs"),
        TG6 = XQ();
    async function PG6() {
        let A = ["/etc/machine-id", "/var/lib/dbus/machine-id"];
        for (let B of A) try {
            return (await OG6.promises.readFile(B, {
                encoding: "utf8"
            })).trim()
        } catch (Q) {
            TG6.diag.debug(`error reading machine id: ${Q}`)
        }
        return
    }
    Ld2.getMachineId = PG6
});
var Sd2 = E((Td2) => {
    Object.defineProperty(Td2, "__esModule", {
        value: !0
    });
    Td2.getMachineId = void 0;
    var SG6 = W1("fs"),
        jG6 = gT1(),
        Od2 = XQ();
    async function kG6() {
        try {
            return (await SG6.promises.readFile("/etc/hostid", {
                encoding: "utf8"
            })).trim()
        } catch (A) {
            Od2.diag.debug(`error reading machine id: ${A}`)
        }
        try {
            return (await jG6.execAsync("kenv -q smbios.system.uuid")).stdout.trim()
        } catch (A) {
            Od2.diag.debug(`error reading machine id: ${A}`)
        }
        return
    }
    Td2.getMachineId = kG6
});
var _d2 = E((kd2) => {
    Object.defineProperty(kd2, "__esModule", {
        value: !0
    });
    kd2.getMachineId = void 0;
    var jd2 = W1("process"),
        yG6 = gT1(),
        _G6 = XQ();
    async function xG6() {
        let B = "%windir%\\System32\\REG.exe";
        if (jd2.arch === "ia32" && "PROCESSOR_ARCHITEW6432" in jd2.env) B = "%windir%\\sysnative\\cmd.exe /c " + B;
        try {
            let Z = (await yG6.execAsync(`${B} QUERY HKEY_LOCAL_MACHINE\\SOFTWARE\\Microsoft\\Cryptography /v MachineGuid`)).stdout.split("REG_SZ");
            if (Z.length === 2) return Z[1].trim()
        } catch (Q) {
            _G6.diag.debug(`error reading machine id: ${Q}`)
        }
        return
    }
    kd2.getMachineId = xG6
});
var bd2 = E((xd2) => {
    Object.defineProperty(xd2, "__esModule", {
        value: !0
    });
    xd2.getMachineId = void 0;
    var vG6 = XQ();
    async function bG6() {
        vG6.diag.debug("could not read machine-id: unsupported platform");
        return
    }
    xd2.getMachineId = bG6
});
var hd2 = E((fd2) => {
    Object.defineProperty(fd2, "__esModule", {
        value: !0
    });
    fd2.getMachineId = void 0;
    var fG6 = W1("process"),
        Ct;
    fd2.getMachineId = Ct;
    switch (fG6.platform) {
        case "darwin":
            fd2.getMachineId = Ct = Nd2().getMachineId;
            break;
        case "linux":
            fd2.getMachineId = Ct = Rd2().getMachineId;
            break;
        case "freebsd":
            fd2.getMachineId = Ct = Sd2().getMachineId;
            break;
        case "win32":
            fd2.getMachineId = Ct = _d2().getMachineId;
            break;
        default:
            fd2.getMachineId = Ct = bd2().getMachineId
    }
});
var DW0 = E((gd2) => {
    Object.defineProperty(gd2, "__esModule", {
        value: !0
    });
    gd2.normalizeType = gd2.normalizeArch = void 0;
    var hG6 = (A) => {
        switch (A) {
            case "arm":
                return "arm32";
            case "ppc":
                return "ppc32";
            case "x64":
                return "amd64";
            default:
                return A
        }
    };
    gd2.normalizeArch = hG6;
    var gG6 = (A) => {
        switch (A) {
            case "sunos":
                return "solaris";
            case "win32":
                return "windows";
            default:
                return A
        }
    };
    gd2.normalizeType = gG6
});
var pd2 = E((cd2) => {
    Object.defineProperty(cd2, "__esModule", {
        value: !0
    });
    cd2.hostDetector = void 0;
    var GW0 = qP(),
        md2 = W1("os"),
        mG6 = hd2(),
        dG6 = DW0();
    class dd2 {
        detect(A) {
            return {
                attributes: {
                    [GW0.SEMRESATTRS_HOST_NAME]: md2.hostname(),
                    [GW0.SEMRESATTRS_HOST_ARCH]: dG6.normalizeArch(md2.arch()),
                    [GW0.SEMRESATTRS_HOST_ID]: mG6.getMachineId()
                }
            }
        }
    }
    cd2.hostDetector = new dd2
});
var od2 = E((sd2) => {
    Object.defineProperty(sd2, "__esModule", {
        value: !0
    });
    sd2.osDetector = void 0;
    var id2 = qP(),
        nd2 = W1("os"),
        cG6 = DW0();
    class ad2 {
        detect(A) {
            return {
                attributes: {
                    [id2.SEMRESATTRS_OS_TYPE]: cG6.normalizeType(nd2.platform()),
                    [id2.SEMRESATTRS_OS_VERSION]: nd2.release()
                }
            }
        }
    }
    sd2.osDetector = new ad2
});
var Bc2 = E((ed2) => {
    Object.defineProperty(ed2, "__esModule", {
        value: !0
    });
    ed2.processDetector = void 0;
    var lG6 = XQ(),
        LP = qP(),
        pG6 = W1("os");
    class td2 {
        detect(A) {
            let B = {
                [LP.SEMRESATTRS_PROCESS_PID]: process.pid,
                [LP.SEMRESATTRS_PROCESS_EXECUTABLE_NAME]: process.title,
                [LP.SEMRESATTRS_PROCESS_EXECUTABLE_PATH]: process.execPath,
                [LP.SEMRESATTRS_PROCESS_COMMAND_ARGS]: [process.argv[0], ...process.execArgv, ...process.argv.slice(1)],
                [LP.SEMRESATTRS_PROCESS_RUNTIME_VERSION]: process.versions.node,
                [LP.SEMRESATTRS_PROCESS_RUNTIME_NAME]: "nodejs",
                [LP.SEMRESATTRS_PROCESS_RUNTIME_DESCRIPTION]: "Node.js"
            };
            if (process.argv.length > 1) B[LP.SEMRESATTRS_PROCESS_COMMAND] = process.argv[1];
            try {
                let Q = pG6.userInfo();
                B[LP.SEMRESATTRS_PROCESS_OWNER] = Q.username
            } catch (Q) {
                lG6.diag.debug(`error obtaining process owner: ${Q}`)
            }
            return {
                attributes: B
            }
        }
    }
    ed2.processDetector = new td2
});
var Gc2 = E((Zc2) => {
    Object.defineProperty(Zc2, "__esModule", {
        value: !0
    });
    Zc2.serviceInstanceIdDetector = void 0;
    var iG6 = qP(),
        nG6 = W1("crypto");
    class Qc2 {
        detect(A) {
            return {
                attributes: {
                    [iG6.SEMRESATTRS_SERVICE_INSTANCE_ID]: nG6.randomUUID()
                }
            }
        }
    }
    Zc2.serviceInstanceIdDetector = new Qc2
});
var Fc2 = E((Kt) => {
    Object.defineProperty(Kt, "__esModule", {
        value: !0
    });
    Kt.serviceInstanceIdDetector = Kt.processDetector = Kt.osDetector = Kt.hostDetector = void 0;
    var aG6 = pd2();
    Object.defineProperty(Kt, "hostDetector", {
        enumerable: !0,
        get: function() {
            return aG6.hostDetector
        }
    });
    var sG6 = od2();
    Object.defineProperty(Kt, "osDetector", {
        enumerable: !0,
        get: function() {
            return sG6.osDetector
        }
    });
    var rG6 = Bc2();
    Object.defineProperty(Kt, "processDetector", {
        enumerable: !0,
        get: function() {
            return rG6.processDetector
        }
    });
    var oG6 = Gc2();
    Object.defineProperty(Kt, "serviceInstanceIdDetector", {
        enumerable: !0,
        get: function() {
            return oG6.serviceInstanceIdDetector
        }
    })
});
var Ic2 = E((Ht) => {
    Object.defineProperty(Ht, "__esModule", {
        value: !0
    });
    Ht.serviceInstanceIdDetector = Ht.processDetector = Ht.osDetector = Ht.hostDetector = void 0;
    var uT1 = Fc2();
    Object.defineProperty(Ht, "hostDetector", {
        enumerable: !0,
        get: function() {
            return uT1.hostDetector
        }
    });
    Object.defineProperty(Ht, "osDetector", {
        enumerable: !0,
        get: function() {
            return uT1.osDetector
        }
    });
    Object.defineProperty(Ht, "processDetector", {
        enumerable: !0,
        get: function() {
            return uT1.processDetector
        }
    });
    Object.defineProperty(Ht, "serviceInstanceIdDetector", {
        enumerable: !0,
        get: function() {
            return uT1.serviceInstanceIdDetector
        }
    })
});
var Jc2 = E((Yc2) => {
    Object.defineProperty(Yc2, "__esModule", {
        value: !0
    });
    Yc2.noopDetector = Yc2.NoopDetector = void 0;
    class FW0 {
        detect() {
            return {
                attributes: {}
            }
        }
    }
    Yc2.NoopDetector = FW0;
    Yc2.noopDetector = new FW0
});
var Xc2 = E((Ax) => {
    Object.defineProperty(Ax, "__esModule", {
        value: !0
    });
    Ax.noopDetector = Ax.serviceInstanceIdDetector = Ax.processDetector = Ax.osDetector = Ax.hostDetector = Ax.envDetector = void 0;
    var BF6 = Ed2();
    Object.defineProperty(Ax, "envDetector", {
        enumerable: !0,
        get: function() {
            return BF6.envDetector
        }
    });
    var mT1 = Ic2();
    Object.defineProperty(Ax, "hostDetector", {
        enumerable: !0,
        get: function() {
            return mT1.hostDetector
        }
    });
    Object.defineProperty(Ax, "osDetector", {
        enumerable: !0,
        get: function() {
            return mT1.osDetector
        }
    });
    Object.defineProperty(Ax, "processDetector", {
        enumerable: !0,
        get: function() {
            return mT1.processDetector
        }
    });
    Object.defineProperty(Ax, "serviceInstanceIdDetector", {
        enumerable: !0,
        get: function() {
            return mT1.serviceInstanceIdDetector
        }
    });
    var QF6 = Jc2();
    Object.defineProperty(Ax, "noopDetector", {
        enumerable: !0,
        get: function() {
            return QF6.noopDetector
        }
    })
});
var dT1 = E((NE) => {
    Object.defineProperty(NE, "__esModule", {
        value: !0
    });
    NE.defaultServiceName = NE.emptyResource = NE.defaultResource = NE.resourceFromAttributes = NE.serviceInstanceIdDetector = NE.processDetector = NE.osDetector = NE.hostDetector = NE.envDetector = NE.detectResources = void 0;
    var DF6 = Vd2();
    Object.defineProperty(NE, "detectResources", {
        enumerable: !0,
        get: function() {
            return DF6.detectResources
        }
    });
    var b31 = Xc2();
    Object.defineProperty(NE, "envDetector", {
        enumerable: !0,
        get: function() {
            return b31.envDetector
        }
    });
    Object.defineProperty(NE, "hostDetector", {
        enumerable: !0,
        get: function() {
            return b31.hostDetector
        }
    });
    Object.defineProperty(NE, "osDetector", {
        enumerable: !0,
        get: function() {
            return b31.osDetector
        }
    });
    Object.defineProperty(NE, "processDetector", {
        enumerable: !0,
        get: function() {
            return b31.processDetector
        }
    });
    Object.defineProperty(NE, "serviceInstanceIdDetector", {
        enumerable: !0,
        get: function() {
            return b31.serviceInstanceIdDetector
        }
    });
    var IW0 = BW0();
    Object.defineProperty(NE, "resourceFromAttributes", {
        enumerable: !0,
        get: function() {
            return IW0.resourceFromAttributes
        }
    });
    Object.defineProperty(NE, "defaultResource", {
        enumerable: !0,
        get: function() {
            return IW0.defaultResource
        }
    });
    Object.defineProperty(NE, "emptyResource", {
        enumerable: !0,
        get: function() {
            return IW0.emptyResource
        }
    });
    var GF6 = oY0();
    Object.defineProperty(NE, "defaultServiceName", {
        enumerable: !0,
        get: function() {
            return GF6.defaultServiceName
        }
    })
});
var Hc2 = E((Cc2) => {
    Object.defineProperty(Cc2, "__esModule", {
        value: !0
    });
    Cc2.ViewRegistry = void 0;
    class Vc2 {
        _registeredViews = [];
        addView(A) {
            this._registeredViews.push(A)
        }
        findViews(A, B) {
            return this._registeredViews.filter((Z) => {
                return this._matchInstrument(Z.instrumentSelector, A) && this._matchMeter(Z.meterSelector, B)
            })
        }
        _matchInstrument(A, B) {
            return (A.getType() === void 0 || B.type === A.getType()) && A.getNameFilter().match(B.name) && A.getUnitFilter().match(B.unit)
        }
        _matchMeter(A, B) {
            return A.getNameFilter().match(B.name) && (B.version === void 0 || A.getVersionFilter().match(B.version)) && (B.schemaUrl === void 0 || A.getSchemaUrlFilter().match(B.schemaUrl))
        }
    }
    Cc2.ViewRegistry = Vc2
});
var f31 = E((Uc2) => {
    Object.defineProperty(Uc2, "__esModule", {
        value: !0
    });
    Uc2.isValidName = Uc2.isDescriptorCompatibleWith = Uc2.createInstrumentDescriptorWithView = Uc2.createInstrumentDescriptor = void 0;
    var zc2 = XQ(),
        IF6 = Z$();

    function YF6(A, B, Q) {
        if (!Ec2(A)) zc2.diag.warn(`Invalid metric name: "${A}". The metric name should be a ASCII string with a length no greater than 255 characters.`);
        return {
            name: A,
            type: B,
            description: Q?.description ?? "",
            unit: Q?.unit ?? "",
            valueType: Q?.valueType ?? zc2.ValueType.DOUBLE,
            advice: Q?.advice ?? {}
        }
    }
    Uc2.createInstrumentDescriptor = YF6;

    function WF6(A, B) {
        return {
            name: A.name ?? B.name,
            description: A.description ?? B.description,
            type: B.type,
            unit: B.unit,
            valueType: B.valueType,
            advice: B.advice
        }
    }
    Uc2.createInstrumentDescriptorWithView = WF6;

    function JF6(A, B) {
        return IF6.equalsCaseInsensitive(A.name, B.name) && A.unit === B.unit && A.type === B.type && A.valueType === B.valueType
    }
    Uc2.isDescriptorCompatibleWith = JF6;
    var XF6 = /^[a-z][a-z0-9_.\-/]{0,254}$/i;

    function Ec2(A) {
        return A.match(XF6) != null
    }
    Uc2.isValidName = Ec2
});