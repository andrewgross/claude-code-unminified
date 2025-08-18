/* chunk:207 bytes:[4577467, 4597109) size:19642 source:unpacked-cli.js */
var grA = E((BX5, hrA) => {
    function p34(A) {
        function B(O) {
            return O.map(function(P) {
                return P.split("").map(function(j) {
                    return "\\" + j
                }).join("")
            }).join("|")
        }
        let Q = "~?[a-z$_][0-9a-zA-Z$_]*",
            Z = "`?[A-Z$_][0-9a-zA-Z$_]*",
            D = "'?[a-z$_][0-9a-z$_]*",
            G = "\\s*:\\s*[a-z$_][0-9a-z$_]*(\\(\\s*(" + D + "\\s*(," + D + "\\s*)*)?\\))?",
            F = Q + "(" + G + "){0,2}",
            I = "(" + B(["||", "++", "**", "+.", "*", "/", "*.", "/.", "..."]) + "|\\|>|&&|==|===)",
            Y = "\\s+" + I + "\\s+",
            W = {
                keyword: "and as asr assert begin class constraint do done downto else end exception external for fun function functor if in include inherit initializer land lazy let lor lsl lsr lxor match method mod module mutable new nonrec object of open or private rec sig struct then to try type val virtual when while with",
                built_in: "array bool bytes char exn|5 float int int32 int64 list lazy_t|5 nativeint|5 ref string unit ",
                literal: "true false"
            },
            J = "\\b(0[xX][a-fA-F0-9_]+[Lln]?|0[oO][0-7_]+[Lln]?|0[bB][01_]+[Lln]?|[0-9][0-9_]*([Lln]|(\\.[0-9_]*)?([eE][-+]?[0-9_]+)?)?)",
            X = {
                className: "number",
                relevance: 0,
                variants: [{
                    begin: J
                }, {
                    begin: "\\(-" + J + "\\)"
                }]
            },
            V = {
                className: "operator",
                relevance: 0,
                begin: I
            },
            C = [{
                className: "identifier",
                relevance: 0,
                begin: Q
            }, V, X],
            K = [A.QUOTE_STRING_MODE, V, {
                className: "module",
                begin: "\\b" + Z,
                returnBegin: !0,
                end: ".",
                contains: [{
                    className: "identifier",
                    begin: Z,
                    relevance: 0
                }]
            }],
            H = [{
                className: "module",
                begin: "\\b" + Z,
                returnBegin: !0,
                end: ".",
                relevance: 0,
                contains: [{
                    className: "identifier",
                    begin: Z,
                    relevance: 0
                }]
            }],
            z = {
                begin: Q,
                end: "(,|\\n|\\))",
                relevance: 0,
                contains: [V, {
                    className: "typing",
                    begin: ":",
                    end: "(,|\\n)",
                    returnBegin: !0,
                    relevance: 0,
                    contains: H
                }]
            },
            $ = {
                className: "function",
                relevance: 0,
                keywords: W,
                variants: [{
                    begin: "\\s(\\(\\.?.*?\\)|" + Q + ")\\s*=>",
                    end: "\\s*=>",
                    returnBegin: !0,
                    relevance: 0,
                    contains: [{
                        className: "params",
                        variants: [{
                            begin: Q
                        }, {
                            begin: F
                        }, {
                            begin: /\(\s*\)/
                        }]
                    }]
                }, {
                    begin: "\\s\\(\\.?[^;\\|]*\\)\\s*=>",
                    end: "\\s=>",
                    returnBegin: !0,
                    relevance: 0,
                    contains: [{
                        className: "params",
                        relevance: 0,
                        variants: [z]
                    }]
                }, {
                    begin: "\\(\\.\\s" + Q + "\\)\\s*=>"
                }]
            };
        K.push($);
        let L = {
                className: "constructor",
                begin: Z + "\\(",
                end: "\\)",
                illegal: "\\n",
                keywords: W,
                contains: [A.QUOTE_STRING_MODE, V, {
                    className: "params",
                    begin: "\\b" + Q
                }]
            },
            N = {
                className: "pattern-match",
                begin: "\\|",
                returnBegin: !0,
                keywords: W,
                end: "=>",
                relevance: 0,
                contains: [L, V, {
                    relevance: 0,
                    className: "constructor",
                    begin: Z
                }]
            },
            R = {
                className: "module-access",
                keywords: W,
                returnBegin: !0,
                variants: [{
                    begin: "\\b(" + Z + "\\.)+" + Q
                }, {
                    begin: "\\b(" + Z + "\\.)+\\(",
                    end: "\\)",
                    returnBegin: !0,
                    contains: [$, {
                        begin: "\\(",
                        end: "\\)",
                        skip: !0
                    }].concat(K)
                }, {
                    begin: "\\b(" + Z + "\\.)+\\{",
                    end: /\}/
                }],
                contains: K
            };
        return H.push(R), {
            name: "ReasonML",
            aliases: ["re"],
            keywords: W,
            illegal: "(:-|:=|\\$\\{|\\+=)",
            contains: [A.COMMENT("/\\*", "\\*/", {
                illegal: "^(#,\\/\\/)"
            }), {
                className: "character",
                begin: "'(\\\\[^']+|[^'])'",
                illegal: "\\n",
                relevance: 0
            }, A.QUOTE_STRING_MODE, {
                className: "literal",
                begin: "\\(\\)",
                relevance: 0
            }, {
                className: "literal",
                begin: "\\[\\|",
                end: "\\|\\]",
                relevance: 0,
                contains: C
            }, {
                className: "literal",
                begin: "\\[",
                end: "\\]",
                relevance: 0,
                contains: C
            }, L, {
                className: "operator",
                begin: Y,
                illegal: "-->",
                relevance: 0
            }, X, A.C_LINE_COMMENT_MODE, N, $, {
                className: "module-def",
                begin: "\\bmodule\\s+" + Q + "\\s+" + Z + "\\s+=\\s+\\{",
                end: /\}/,
                returnBegin: !0,
                keywords: W,
                relevance: 0,
                contains: [{
                    className: "module",
                    relevance: 0,
                    begin: Z
                }, {
                    begin: /\{/,
                    end: /\}/,
                    skip: !0
                }].concat(K)
            }, R]
        }
    }
    hrA.exports = p34
});
var mrA = E((QX5, urA) => {
    function i34(A) {
        return {
            name: "RenderMan RIB",
            keywords: "ArchiveRecord AreaLightSource Atmosphere Attribute AttributeBegin AttributeEnd Basis Begin Blobby Bound Clipping ClippingPlane Color ColorSamples ConcatTransform Cone CoordinateSystem CoordSysTransform CropWindow Curves Cylinder DepthOfField Detail DetailRange Disk Displacement Display End ErrorHandler Exposure Exterior Format FrameAspectRatio FrameBegin FrameEnd GeneralPolygon GeometricApproximation Geometry Hider Hyperboloid Identity Illuminate Imager Interior LightSource MakeCubeFaceEnvironment MakeLatLongEnvironment MakeShadow MakeTexture Matte MotionBegin MotionEnd NuPatch ObjectBegin ObjectEnd ObjectInstance Opacity Option Orientation Paraboloid Patch PatchMesh Perspective PixelFilter PixelSamples PixelVariance Points PointsGeneralPolygons PointsPolygons Polygon Procedural Projection Quantize ReadArchive RelativeDetail ReverseOrientation Rotate Scale ScreenWindow ShadingInterpolation ShadingRate Shutter Sides Skew SolidBegin SolidEnd Sphere SubdivisionMesh Surface TextureCoordinates Torus Transform TransformBegin TransformEnd TransformPoints Translate TrimCurve WorldBegin WorldEnd",
            illegal: "</",
            contains: [A.HASH_COMMENT_MODE, A.C_NUMBER_MODE, A.APOS_STRING_MODE, A.QUOTE_STRING_MODE]
        }
    }
    urA.exports = i34
});
var crA = E((ZX5, drA) => {
    function n34(A) {
        let Q = {
            className: "attribute",
            begin: /[a-zA-Z-_]+/,
            end: /\s*:/,
            excludeEnd: !0,
            starts: {
                end: ";",
                relevance: 0,
                contains: [{
                    className: "variable",
                    begin: /\.[a-zA-Z-_]+/
                }, {
                    className: "keyword",
                    begin: /\(optional\)/
                }]
            }
        };
        return {
            name: "Roboconf",
            aliases: ["graph", "instances"],
            case_insensitive: !0,
            keywords: "import",
            contains: [{
                begin: "^facet [a-zA-Z-_][^\\n{]+\\{",
                end: /\}/,
                keywords: "facet",
                contains: [Q, A.HASH_COMMENT_MODE]
            }, {
                begin: "^\\s*instance of [a-zA-Z-_][^\\n{]+\\{",
                end: /\}/,
                keywords: "name count channels instance-data instance-state instance of",
                illegal: /\S/,
                contains: ["self", Q, A.HASH_COMMENT_MODE]
            }, {
                begin: "^[a-zA-Z-_][^\\n{]+\\{",
                end: /\}/,
                contains: [Q, A.HASH_COMMENT_MODE]
            }, A.HASH_COMMENT_MODE]
        }
    }
    drA.exports = n34
});
var prA = E((DX5, lrA) => {
    function a34(A) {
        let F = {
                className: "variable",
                variants: [{
                    begin: /\$[\w\d#@][\w\d_]*/
                }, {
                    begin: /\$\{(.*?)\}/
                }]
            },
            I = {
                className: "string",
                begin: /"/,
                end: /"/,
                contains: [A.BACKSLASH_ESCAPE, F, {
                    className: "variable",
                    begin: /\$\(/,
                    end: /\)/,
                    contains: [A.BACKSLASH_ESCAPE]
                }]
            },
            Y = {
                className: "string",
                begin: /'/,
                end: /'/
            };
        return {
            name: "Microtik RouterOS script",
            aliases: ["mikrotik"],
            case_insensitive: !0,
            keywords: {
                $pattern: /:?[\w-]+/,
                literal: "true false yes no nothing nil null",
                keyword: "foreach do while for if from to step else on-error and or not in :" + "foreach do while for if from to step else on-error and or not in".split(" ").join(" :") + " :" + "global local beep delay put len typeof pick log time set find environment terminal error execute parse resolve toarray tobool toid toip toip6 tonum tostr totime".split(" ").join(" :")
            },
            contains: [{
                variants: [{
                    begin: /\/\*/,
                    end: /\*\//
                }, {
                    begin: /\/\//,
                    end: /$/
                }, {
                    begin: /<\//,
                    end: />/
                }],
                illegal: /./
            }, A.COMMENT("^#", "$"), I, Y, F, {
                begin: /[\w-]+=([^\s{}[\]()>]+)/,
                relevance: 0,
                returnBegin: !0,
                contains: [{
                    className: "attribute",
                    begin: /[^=]+/
                }, {
                    begin: /=/,
                    endsWithParent: !0,
                    relevance: 0,
                    contains: [I, Y, F, {
                        className: "literal",
                        begin: "\\b(" + "true false yes no nothing nil null".split(" ").join("|") + ")\\b"
                    }, {
                        begin: /("[^"]*"|[^\s{}[\]]+)/
                    }]
                }]
            }, {
                className: "number",
                begin: /\*[0-9a-fA-F]+/
            }, {
                begin: "\\b(" + "add remove enable disable set get print export edit find run debug error info warning".split(" ").join("|") + ")([\\s[(\\]|])",
                returnBegin: !0,
                contains: [{
                    className: "builtin-name",
                    begin: /\w+/
                }]
            }, {
                className: "built_in",
                variants: [{
                    begin: "(\\.\\./|/|\\s)((" + "traffic-flow traffic-generator firewall scheduler aaa accounting address-list address align area bandwidth-server bfd bgp bridge client clock community config connection console customer default dhcp-client dhcp-server discovery dns e-mail ethernet filter firmware gps graphing group hardware health hotspot identity igmp-proxy incoming instance interface ip ipsec ipv6 irq l2tp-server lcd ldp logging mac-server mac-winbox mangle manual mirror mme mpls nat nd neighbor network note ntp ospf ospf-v3 ovpn-server page peer pim ping policy pool port ppp pppoe-client pptp-server prefix profile proposal proxy queue radius resource rip ripng route routing screen script security-profiles server service service-port settings shares smb sms sniffer snmp snooper socks sstp-server system tool tracking type upgrade upnp user-manager users user vlan secret vrrp watchdog web-access wireless pptp pppoe lan wan layer7-protocol lease simple raw".split(" ").join("|") + ");?\\s)+"
                }, {
                    begin: /\.\./,
                    relevance: 0
                }]
            }]
        }
    }
    lrA.exports = a34
});
var nrA = E((GX5, irA) => {
    function s34(A) {
        return {
            name: "RenderMan RSL",
            keywords: {
                keyword: "float color point normal vector matrix while for if do return else break extern continue",
                built_in: "abs acos ambient area asin atan atmosphere attribute calculatenormal ceil cellnoise clamp comp concat cos degrees depth Deriv diffuse distance Du Dv environment exp faceforward filterstep floor format fresnel incident length lightsource log match max min mod noise normalize ntransform opposite option phong pnoise pow printf ptlined radians random reflect refract renderinfo round setcomp setxcomp setycomp setzcomp shadow sign sin smoothstep specular specularbrdf spline sqrt step tan texture textureinfo trace transform vtransform xcomp ycomp zcomp"
            },
            illegal: "</",
            contains: [A.C_LINE_COMMENT_MODE, A.C_BLOCK_COMMENT_MODE, A.QUOTE_STRING_MODE, A.APOS_STRING_MODE, A.C_NUMBER_MODE, {
                className: "meta",
                begin: "#",
                end: "$"
            }, {
                className: "class",
                beginKeywords: "surface displacement light volume imager",
                end: "\\("
            }, {
                beginKeywords: "illuminate illuminance gather",
                end: "\\("
            }]
        }
    }
    irA.exports = s34
});
var srA = E((FX5, arA) => {
    function r34(A) {
        return {
            name: "Oracle Rules Language",
            keywords: {
                keyword: "BILL_PERIOD BILL_START BILL_STOP RS_EFFECTIVE_START RS_EFFECTIVE_STOP RS_JURIS_CODE RS_OPCO_CODE INTDADDATTRIBUTE|5 INTDADDVMSG|5 INTDBLOCKOP|5 INTDBLOCKOPNA|5 INTDCLOSE|5 INTDCOUNT|5 INTDCOUNTSTATUSCODE|5 INTDCREATEMASK|5 INTDCREATEDAYMASK|5 INTDCREATEFACTORMASK|5 INTDCREATEHANDLE|5 INTDCREATEOVERRIDEDAYMASK|5 INTDCREATEOVERRIDEMASK|5 INTDCREATESTATUSCODEMASK|5 INTDCREATETOUPERIOD|5 INTDDELETE|5 INTDDIPTEST|5 INTDEXPORT|5 INTDGETERRORCODE|5 INTDGETERRORMESSAGE|5 INTDISEQUAL|5 INTDJOIN|5 INTDLOAD|5 INTDLOADACTUALCUT|5 INTDLOADDATES|5 INTDLOADHIST|5 INTDLOADLIST|5 INTDLOADLISTDATES|5 INTDLOADLISTENERGY|5 INTDLOADLISTHIST|5 INTDLOADRELATEDCHANNEL|5 INTDLOADSP|5 INTDLOADSTAGING|5 INTDLOADUOM|5 INTDLOADUOMDATES|5 INTDLOADUOMHIST|5 INTDLOADVERSION|5 INTDOPEN|5 INTDREADFIRST|5 INTDREADNEXT|5 INTDRECCOUNT|5 INTDRELEASE|5 INTDREPLACE|5 INTDROLLAVG|5 INTDROLLPEAK|5 INTDSCALAROP|5 INTDSCALE|5 INTDSETATTRIBUTE|5 INTDSETDSTPARTICIPANT|5 INTDSETSTRING|5 INTDSETVALUE|5 INTDSETVALUESTATUS|5 INTDSHIFTSTARTTIME|5 INTDSMOOTH|5 INTDSORT|5 INTDSPIKETEST|5 INTDSUBSET|5 INTDTOU|5 INTDTOURELEASE|5 INTDTOUVALUE|5 INTDUPDATESTATS|5 INTDVALUE|5 STDEV INTDDELETEEX|5 INTDLOADEXACTUAL|5 INTDLOADEXCUT|5 INTDLOADEXDATES|5 INTDLOADEX|5 INTDLOADEXRELATEDCHANNEL|5 INTDSAVEEX|5 MVLOAD|5 MVLOADACCT|5 MVLOADACCTDATES|5 MVLOADACCTHIST|5 MVLOADDATES|5 MVLOADHIST|5 MVLOADLIST|5 MVLOADLISTDATES|5 MVLOADLISTHIST|5 IF FOR NEXT DONE SELECT END CALL ABORT CLEAR CHANNEL FACTOR LIST NUMBER OVERRIDE SET WEEK DISTRIBUTIONNODE ELSE WHEN THEN OTHERWISE IENUM CSV INCLUDE LEAVE RIDER SAVE DELETE NOVALUE SECTION WARN SAVE_UPDATE DETERMINANT LABEL REPORT REVENUE EACH IN FROM TOTAL CHARGE BLOCK AND OR CSV_FILE RATE_CODE AUXILIARY_DEMAND UIDACCOUNT RS BILL_PERIOD_SELECT HOURS_PER_MONTH INTD_ERROR_STOP SEASON_SCHEDULE_NAME ACCOUNTFACTOR ARRAYUPPERBOUND CALLSTOREDPROC GETADOCONNECTION GETCONNECT GETDATASOURCE GETQUALIFIER GETUSERID HASVALUE LISTCOUNT LISTOP LISTUPDATE LISTVALUE PRORATEFACTOR RSPRORATE SETBINPATH SETDBMONITOR WQ_OPEN BILLINGHOURS DATE DATEFROMFLOAT DATETIMEFROMSTRING DATETIMETOSTRING DATETOFLOAT DAY DAYDIFF DAYNAME DBDATETIME HOUR MINUTE MONTH MONTHDIFF MONTHHOURS MONTHNAME ROUNDDATE SAMEWEEKDAYLASTYEAR SECOND WEEKDAY WEEKDIFF YEAR YEARDAY YEARSTR COMPSUM HISTCOUNT HISTMAX HISTMIN HISTMINNZ HISTVALUE MAXNRANGE MAXRANGE MINRANGE COMPIKVA COMPKVA COMPKVARFROMKQKW COMPLF IDATTR FLAG LF2KW LF2KWH MAXKW POWERFACTOR READING2USAGE AVGSEASON MAXSEASON MONTHLYMERGE SEASONVALUE SUMSEASON ACCTREADDATES ACCTTABLELOAD CONFIGADD CONFIGGET CREATEOBJECT CREATEREPORT EMAILCLIENT EXPBLKMDMUSAGE EXPMDMUSAGE EXPORT_USAGE FACTORINEFFECT GETUSERSPECIFIEDSTOP INEFFECT ISHOLIDAY RUNRATE SAVE_PROFILE SETREPORTTITLE USEREXIT WATFORRUNRATE TO TABLE ACOS ASIN ATAN ATAN2 BITAND CEIL COS COSECANT COSH COTANGENT DIVQUOT DIVREM EXP FABS FLOOR FMOD FREPM FREXPN LOG LOG10 MAX MAXN MIN MINNZ MODF POW ROUND ROUND2VALUE ROUNDINT SECANT SIN SINH SQROOT TAN TANH FLOAT2STRING FLOAT2STRINGNC INSTR LEFT LEN LTRIM MID RIGHT RTRIM STRING STRINGNC TOLOWER TOUPPER TRIM NUMDAYS READ_DATE STAGING",
                built_in: "IDENTIFIER OPTIONS XML_ELEMENT XML_OP XML_ELEMENT_OF DOMDOCCREATE DOMDOCLOADFILE DOMDOCLOADXML DOMDOCSAVEFILE DOMDOCGETROOT DOMDOCADDPI DOMNODEGETNAME DOMNODEGETTYPE DOMNODEGETVALUE DOMNODEGETCHILDCT DOMNODEGETFIRSTCHILD DOMNODEGETSIBLING DOMNODECREATECHILDELEMENT DOMNODESETATTRIBUTE DOMNODEGETCHILDELEMENTCT DOMNODEGETFIRSTCHILDELEMENT DOMNODEGETSIBLINGELEMENT DOMNODEGETATTRIBUTECT DOMNODEGETATTRIBUTEI DOMNODEGETATTRIBUTEBYNAME DOMNODEGETBYNAME"
            },
            contains: [A.C_LINE_COMMENT_MODE, A.C_BLOCK_COMMENT_MODE, A.APOS_STRING_MODE, A.QUOTE_STRING_MODE, A.C_NUMBER_MODE, {
                className: "literal",
                variants: [{
                    begin: "#\\s+",
                    relevance: 0
                }, {
                    begin: "#[a-zA-Z .]+"
                }]
            }]
        }
    }
    arA.exports = r34
});