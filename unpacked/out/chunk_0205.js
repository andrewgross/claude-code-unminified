/* chunk:205 bytes:[4541839, 4558244) size:16405 source:unpacked-cli.js */
var HrA = E((cJ5, KrA) => {
    function O34(A) {
        return {
            name: "Processing",
            keywords: {
                keyword: "BufferedReader PVector PFont PImage PGraphics HashMap boolean byte char color double float int long String Array FloatDict FloatList IntDict IntList JSONArray JSONObject Object StringDict StringList Table TableRow XML false synchronized int abstract float private char boolean static null if const for true while long throw strictfp finally protected import native final return void enum else break transient new catch instanceof byte super volatile case assert short package default double public try this switch continue throws protected public private",
                literal: "P2D P3D HALF_PI PI QUARTER_PI TAU TWO_PI",
                title: "setup draw",
                built_in: "displayHeight displayWidth mouseY mouseX mousePressed pmouseX pmouseY key keyCode pixels focused frameCount frameRate height width size createGraphics beginDraw createShape loadShape PShape arc ellipse line point quad rect triangle bezier bezierDetail bezierPoint bezierTangent curve curveDetail curvePoint curveTangent curveTightness shape shapeMode beginContour beginShape bezierVertex curveVertex endContour endShape quadraticVertex vertex ellipseMode noSmooth rectMode smooth strokeCap strokeJoin strokeWeight mouseClicked mouseDragged mouseMoved mousePressed mouseReleased mouseWheel keyPressed keyPressedkeyReleased keyTyped print println save saveFrame day hour millis minute month second year background clear colorMode fill noFill noStroke stroke alpha blue brightness color green hue lerpColor red saturation modelX modelY modelZ screenX screenY screenZ ambient emissive shininess specular add createImage beginCamera camera endCamera frustum ortho perspective printCamera printProjection cursor frameRate noCursor exit loop noLoop popStyle pushStyle redraw binary boolean byte char float hex int str unbinary unhex join match matchAll nf nfc nfp nfs split splitTokens trim append arrayCopy concat expand reverse shorten sort splice subset box sphere sphereDetail createInput createReader loadBytes loadJSONArray loadJSONObject loadStrings loadTable loadXML open parseXML saveTable selectFolder selectInput beginRaw beginRecord createOutput createWriter endRaw endRecord PrintWritersaveBytes saveJSONArray saveJSONObject saveStream saveStrings saveXML selectOutput popMatrix printMatrix pushMatrix resetMatrix rotate rotateX rotateY rotateZ scale shearX shearY translate ambientLight directionalLight lightFalloff lights lightSpecular noLights normal pointLight spotLight image imageMode loadImage noTint requestImage tint texture textureMode textureWrap blend copy filter get loadPixels set updatePixels blendMode loadShader PShaderresetShader shader createFont loadFont text textFont textAlign textLeading textMode textSize textWidth textAscent textDescent abs ceil constrain dist exp floor lerp log mag map max min norm pow round sq sqrt acos asin atan atan2 cos degrees radians sin tan noise noiseDetail noiseSeed random randomGaussian randomSeed"
            },
            contains: [A.C_LINE_COMMENT_MODE, A.C_BLOCK_COMMENT_MODE, A.APOS_STRING_MODE, A.QUOTE_STRING_MODE, A.C_NUMBER_MODE]
        }
    }
    KrA.exports = O34
});
var ErA = E((lJ5, zrA) => {
    function T34(A) {
        return {
            name: "Python profiler",
            contains: [A.C_NUMBER_MODE, {
                begin: "[a-zA-Z_][\\da-zA-Z_]+\\.[\\da-zA-Z_]{1,3}",
                end: ":",
                excludeEnd: !0
            }, {
                begin: "(ncalls|tottime|cumtime)",
                end: "$",
                keywords: "ncalls tottime|10 cumtime|10 filename",
                relevance: 10
            }, {
                begin: "function calls",
                end: "$",
                contains: [A.C_NUMBER_MODE],
                relevance: 10
            }, A.APOS_STRING_MODE, A.QUOTE_STRING_MODE, {
                className: "string",
                begin: "\\(",
                end: "\\)$",
                excludeBegin: !0,
                excludeEnd: !0,
                relevance: 0
            }]
        }
    }
    zrA.exports = T34
});
var wrA = E((pJ5, UrA) => {
    function P34(A) {
        let B = {
                begin: /[a-z][A-Za-z0-9_]*/,
                relevance: 0
            },
            Q = {
                className: "symbol",
                variants: [{
                    begin: /[A-Z][a-zA-Z0-9_]*/
                }, {
                    begin: /_[A-Za-z0-9_]*/
                }],
                relevance: 0
            },
            Z = {
                begin: /\(/,
                end: /\)/,
                relevance: 0
            },
            D = {
                begin: /\[/,
                end: /\]/
            },
            G = {
                className: "comment",
                begin: /%/,
                end: /$/,
                contains: [A.PHRASAL_WORDS_MODE]
            },
            F = {
                className: "string",
                begin: /`/,
                end: /`/,
                contains: [A.BACKSLASH_ESCAPE]
            },
            I = {
                className: "string",
                begin: /0'(\\'|.)/
            },
            Y = {
                className: "string",
                begin: /0'\\s/
            },
            J = [B, Q, Z, {
                begin: /:-/
            }, D, G, A.C_BLOCK_COMMENT_MODE, A.QUOTE_STRING_MODE, A.APOS_STRING_MODE, F, I, Y, A.C_NUMBER_MODE];
        return Z.contains = J, D.contains = J, {
            name: "Prolog",
            contains: J.concat([{
                begin: /\.$/
            }])
        }
    }
    UrA.exports = P34
});
var qrA = E((iJ5, $rA) => {
    function S34(A) {
        var B = "[ \\t\\f]*",
            Q = "[ \\t\\f]+",
            Z = B + "[:=]" + B,
            D = Q,
            G = "(" + Z + "|" + D + ")",
            F = "([^\\\\\\W:= \\t\\f\\n]|\\\\.)+",
            I = "([^\\\\:= \\t\\f\\n]|\\\\.)+",
            Y = {
                end: G,
                relevance: 0,
                starts: {
                    className: "string",
                    end: /$/,
                    relevance: 0,
                    contains: [{
                        begin: "\\\\\\\\"
                    }, {
                        begin: "\\\\\\n"
                    }]
                }
            };
        return {
            name: ".properties",
            case_insensitive: !0,
            illegal: /\S/,
            contains: [A.COMMENT("^\\s*[!#]", "$"), {
                returnBegin: !0,
                variants: [{
                    begin: F + Z,
                    relevance: 1
                }, {
                    begin: F + D,
                    relevance: 0
                }],
                contains: [{
                    className: "attr",
                    begin: F,
                    endsParent: !0,
                    relevance: 0
                }],
                starts: Y
            }, {
                begin: I + G,
                returnBegin: !0,
                relevance: 0,
                contains: [{
                    className: "meta",
                    begin: I,
                    endsParent: !0,
                    relevance: 0
                }],
                starts: Y
            }, {
                className: "attr",
                relevance: 0,
                begin: I + B + "$"
            }]
        }
    }
    $rA.exports = S34
});
var LrA = E((nJ5, NrA) => {
    function j34(A) {
        return {
            name: "Protocol Buffers",
            keywords: {
                keyword: "package import option optional required repeated group oneof",
                built_in: "double float int32 int64 uint32 uint64 sint32 sint64 fixed32 fixed64 sfixed32 sfixed64 bool string bytes",
                literal: "true false"
            },
            contains: [A.QUOTE_STRING_MODE, A.NUMBER_MODE, A.C_LINE_COMMENT_MODE, A.C_BLOCK_COMMENT_MODE, {
                className: "class",
                beginKeywords: "message enum service",
                end: /\{/,
                illegal: /\n/,
                contains: [A.inherit(A.TITLE_MODE, {
                    starts: {
                        endsWithParent: !0,
                        excludeEnd: !0
                    }
                })]
            }, {
                className: "function",
                beginKeywords: "rpc",
                end: /[{;]/,
                excludeEnd: !0,
                keywords: "rpc returns"
            }, {
                begin: /^\s*[A-Z_]+(?=\s*=[^\n]+;$)/
            }]
        }
    }
    NrA.exports = j34
});
var RrA = E((aJ5, MrA) => {
    function k34(A) {
        let B = {
                keyword: "and case default else elsif false if in import enherits node or true undef unless main settings $string ",
                literal: "alias audit before loglevel noop require subscribe tag owner ensure group mode name|0 changes context force incl lens load_path onlyif provider returns root show_diff type_check en_address ip_address realname command environment hour monute month monthday special target weekday creates cwd ogoutput refresh refreshonly tries try_sleep umask backup checksum content ctime force ignore links mtime purge recurse recurselimit replace selinux_ignore_defaults selrange selrole seltype seluser source souirce_permissions sourceselect validate_cmd validate_replacement allowdupe attribute_membership auth_membership forcelocal gid ia_load_module members system host_aliases ip allowed_trunk_vlans description device_url duplex encapsulation etherchannel native_vlan speed principals allow_root auth_class auth_type authenticate_user k_of_n mechanisms rule session_owner shared options device fstype enable hasrestart directory present absent link atboot blockdevice device dump pass remounts poller_tag use message withpath adminfile allow_virtual allowcdrom category configfiles flavor install_options instance package_settings platform responsefile status uninstall_options vendor unless_system_user unless_uid binary control flags hasstatus manifest pattern restart running start stop allowdupe auths expiry gid groups home iterations key_membership keys managehome membership password password_max_age password_min_age profile_membership profiles project purge_ssh_keys role_membership roles salt shell uid baseurl cost descr enabled enablegroups exclude failovermethod gpgcheck gpgkey http_caching include includepkgs keepalive metadata_expire metalink mirrorlist priority protect proxy proxy_password proxy_username repo_gpgcheck s3_enabled skip_if_unavailable sslcacert sslclientcert sslclientkey sslverify mounted",
                built_in: "architecture augeasversion blockdevices boardmanufacturer boardproductname boardserialnumber cfkey dhcp_servers domain ec2_ ec2_userdata facterversion filesystems ldom fqdn gid hardwareisa hardwaremodel hostname id|0 interfaces ipaddress ipaddress_ ipaddress6 ipaddress6_ iphostnumber is_virtual kernel kernelmajversion kernelrelease kernelversion kernelrelease kernelversion lsbdistcodename lsbdistdescription lsbdistid lsbdistrelease lsbmajdistrelease lsbminordistrelease lsbrelease macaddress macaddress_ macosx_buildversion macosx_productname macosx_productversion macosx_productverson_major macosx_productversion_minor manufacturer memoryfree memorysize netmask metmask_ network_ operatingsystem operatingsystemmajrelease operatingsystemrelease osfamily partitions path physicalprocessorcount processor processorcount productname ps puppetversion rubysitedir rubyversion selinux selinux_config_mode selinux_config_policy selinux_current_mode selinux_current_mode selinux_enforced selinux_policyversion serialnumber sp_ sshdsakey sshecdsakey sshrsakey swapencrypted swapfree swapsize timezone type uniqueid uptime uptime_days uptime_hours uptime_seconds uuid virtual vlans xendomains zfs_version zonenae zones zpool_version"
            },
            Q = A.COMMENT("#", "$"),
            Z = "([A-Za-z_]|::)(\\w|::)*",
            D = A.inherit(A.TITLE_MODE, {
                begin: "([A-Za-z_]|::)(\\w|::)*"
            }),
            G = {
                className: "variable",
                begin: "\\$([A-Za-z_]|::)(\\w|::)*"
            },
            F = {
                className: "string",
                contains: [A.BACKSLASH_ESCAPE, G],
                variants: [{
                    begin: /'/,
                    end: /'/
                }, {
                    begin: /"/,
                    end: /"/
                }]
            };
        return {
            name: "Puppet",
            aliases: ["pp"],
            contains: [Q, G, F, {
                beginKeywords: "class",
                end: "\\{|;",
                illegal: /=/,
                contains: [D, Q]
            }, {
                beginKeywords: "define",
                end: /\{/,
                contains: [{
                    className: "section",
                    begin: A.IDENT_RE,
                    endsParent: !0
                }]
            }, {
                begin: A.IDENT_RE + "\\s+\\{",
                returnBegin: !0,
                end: /\S/,
                contains: [{
                    className: "keyword",
                    begin: A.IDENT_RE
                }, {
                    begin: /\{/,
                    end: /\}/,
                    keywords: B,
                    relevance: 0,
                    contains: [F, Q, {
                        begin: "[a-zA-Z_]+\\s*=>",
                        returnBegin: !0,
                        end: "=>",
                        contains: [{
                            className: "attr",
                            begin: A.IDENT_RE
                        }]
                    }, {
                        className: "number",
                        begin: "(\\b0[0-7_]+)|(\\b0x[0-9a-fA-F_]+)|(\\b[1-9][0-9_]*(\\.[0-9_]+)?)|[0_]\\b",
                        relevance: 0
                    }, G]
                }],
                relevance: 0
            }]
        }
    }
    MrA.exports = k34
});
var TrA = E((sJ5, OrA) => {
    function y34(A) {
        let B = {
                className: "string",
                begin: '(~)?"',
                end: '"',
                illegal: "\\n"
            },
            Q = {
                className: "symbol",
                begin: "#[a-zA-Z_]\\w*\\$?"
            };
        return {
            name: "PureBASIC",
            aliases: ["pb", "pbi"],
            keywords: "Align And Array As Break CallDebugger Case CompilerCase CompilerDefault CompilerElse CompilerElseIf CompilerEndIf CompilerEndSelect CompilerError CompilerIf CompilerSelect CompilerWarning Continue Data DataSection Debug DebugLevel Declare DeclareC DeclareCDLL DeclareDLL DeclareModule Default Define Dim DisableASM DisableDebugger DisableExplicit Else ElseIf EnableASM EnableDebugger EnableExplicit End EndDataSection EndDeclareModule EndEnumeration EndIf EndImport EndInterface EndMacro EndModule EndProcedure EndSelect EndStructure EndStructureUnion EndWith Enumeration EnumerationBinary Extends FakeReturn For ForEach ForEver Global Gosub Goto If Import ImportC IncludeBinary IncludeFile IncludePath Interface List Macro MacroExpandedCount Map Module NewList NewMap Next Not Or Procedure ProcedureC ProcedureCDLL ProcedureDLL ProcedureReturn Protected Prototype PrototypeC ReDim Read Repeat Restore Return Runtime Select Shared Static Step Structure StructureUnion Swap Threaded To UndefineMacro Until Until  UnuseModule UseModule Wend While With XIncludeFile XOr",
            contains: [A.COMMENT(";", "$", {
                relevance: 0
            }), {
                className: "function",
                begin: "\\b(Procedure|Declare)(C|CDLL|DLL)?\\b",
                end: "\\(",
                excludeEnd: !0,
                returnBegin: !0,
                contains: [{
                    className: "keyword",
                    begin: "(Procedure|Declare)(C|CDLL|DLL)?",
                    excludeEnd: !0
                }, {
                    className: "type",
                    begin: "\\.\\w*"
                }, A.UNDERSCORE_TITLE_MODE]
            }, B, Q]
        }
    }
    OrA.exports = y34
});