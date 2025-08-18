/* chunk:201 bytes:[4471738, 4488729) size:16991 source:unpacked-cli.js */
var _sA = E((RJ5, ysA) => {
    function Y34(A) {
        return {
            name: "N1QL",
            case_insensitive: !0,
            contains: [{
                beginKeywords: "build create index delete drop explain infer|10 insert merge prepare select update upsert|10",
                end: /;/,
                endsWithParent: !0,
                keywords: {
                    keyword: "all alter analyze and any array as asc begin between binary boolean break bucket build by call case cast cluster collate collection commit connect continue correlate cover create database dataset datastore declare decrement delete derived desc describe distinct do drop each element else end every except exclude execute exists explain fetch first flatten for force from function grant group gsi having if ignore ilike in include increment index infer inline inner insert intersect into is join key keys keyspace known last left let letting like limit lsm map mapping matched materialized merge minus namespace nest not number object offset on option or order outer over parse partition password path pool prepare primary private privilege procedure public raw realm reduce rename return returning revoke right role rollback satisfies schema select self semi set show some start statistics string system then to transaction trigger truncate under union unique unknown unnest unset update upsert use user using validate value valued values via view when where while with within work xor",
                    literal: "true false null missing|5",
                    built_in: "array_agg array_append array_concat array_contains array_count array_distinct array_ifnull array_length array_max array_min array_position array_prepend array_put array_range array_remove array_repeat array_replace array_reverse array_sort array_sum avg count max min sum greatest least ifmissing ifmissingornull ifnull missingif nullif ifinf ifnan ifnanorinf naninf neginfif posinfif clock_millis clock_str date_add_millis date_add_str date_diff_millis date_diff_str date_part_millis date_part_str date_trunc_millis date_trunc_str duration_to_str millis str_to_millis millis_to_str millis_to_utc millis_to_zone_name now_millis now_str str_to_duration str_to_utc str_to_zone_name decode_json encode_json encoded_size poly_length base64 base64_encode base64_decode meta uuid abs acos asin atan atan2 ceil cos degrees e exp ln log floor pi power radians random round sign sin sqrt tan trunc object_length object_names object_pairs object_inner_pairs object_values object_inner_values object_add object_put object_remove object_unwrap regexp_contains regexp_like regexp_position regexp_replace contains initcap length lower ltrim position repeat replace rtrim split substr title trim upper isarray isatom isboolean isnumber isobject isstring type toarray toatom toboolean tonumber toobject tostring"
                },
                contains: [{
                    className: "string",
                    begin: "'",
                    end: "'",
                    contains: [A.BACKSLASH_ESCAPE]
                }, {
                    className: "string",
                    begin: '"',
                    end: '"',
                    contains: [A.BACKSLASH_ESCAPE]
                }, {
                    className: "symbol",
                    begin: "`",
                    end: "`",
                    contains: [A.BACKSLASH_ESCAPE],
                    relevance: 2
                }, A.C_NUMBER_MODE, A.C_BLOCK_COMMENT_MODE]
            }, A.C_BLOCK_COMMENT_MODE]
        }
    }
    ysA.exports = Y34
});
var vsA = E((OJ5, xsA) => {
    function W34(A) {
        let B = {
                className: "variable",
                variants: [{
                    begin: /\$\d+/
                }, {
                    begin: /\$\{/,
                    end: /\}/
                }, {
                    begin: /[$@]/ + A.UNDERSCORE_IDENT_RE
                }]
            },
            Q = {
                endsWithParent: !0,
                keywords: {
                    $pattern: "[a-z/_]+",
                    literal: "on off yes no true false none blocked debug info notice warn error crit select break last permanent redirect kqueue rtsig epoll poll /dev/poll"
                },
                relevance: 0,
                illegal: "=>",
                contains: [A.HASH_COMMENT_MODE, {
                    className: "string",
                    contains: [A.BACKSLASH_ESCAPE, B],
                    variants: [{
                        begin: /"/,
                        end: /"/
                    }, {
                        begin: /'/,
                        end: /'/
                    }]
                }, {
                    begin: "([a-z]+):/",
                    end: "\\s",
                    endsWithParent: !0,
                    excludeEnd: !0,
                    contains: [B]
                }, {
                    className: "regexp",
                    contains: [A.BACKSLASH_ESCAPE, B],
                    variants: [{
                        begin: "\\s\\^",
                        end: "\\s|\\{|;",
                        returnEnd: !0
                    }, {
                        begin: "~\\*?\\s+",
                        end: "\\s|\\{|;",
                        returnEnd: !0
                    }, {
                        begin: "\\*(\\.[a-z\\-]+)+"
                    }, {
                        begin: "([a-z\\-]+\\.)+\\*"
                    }]
                }, {
                    className: "number",
                    begin: "\\b\\d{1,3}\\.\\d{1,3}\\.\\d{1,3}\\.\\d{1,3}(:\\d{1,5})?\\b"
                }, {
                    className: "number",
                    begin: "\\b\\d+[kKmMgGdshdwy]*\\b",
                    relevance: 0
                }, B]
            };
        return {
            name: "Nginx config",
            aliases: ["nginxconf"],
            contains: [A.HASH_COMMENT_MODE, {
                begin: A.UNDERSCORE_IDENT_RE + "\\s+\\{",
                returnBegin: !0,
                end: /\{/,
                contains: [{
                    className: "section",
                    begin: A.UNDERSCORE_IDENT_RE
                }],
                relevance: 0
            }, {
                begin: A.UNDERSCORE_IDENT_RE + "\\s",
                end: ";|\\{",
                returnBegin: !0,
                contains: [{
                    className: "attribute",
                    begin: A.UNDERSCORE_IDENT_RE,
                    starts: Q
                }],
                relevance: 0
            }],
            illegal: "[^\\s\\}]"
        }
    }
    xsA.exports = W34
});
var fsA = E((TJ5, bsA) => {
    function J34(A) {
        return {
            name: "Nim",
            keywords: {
                keyword: "addr and as asm bind block break case cast const continue converter discard distinct div do elif else end enum except export finally for from func generic if import in include interface is isnot iterator let macro method mixin mod nil not notin object of or out proc ptr raise ref return shl shr static template try tuple type using var when while with without xor yield",
                literal: "shared guarded stdin stdout stderr result true false",
                built_in: "int int8 int16 int32 int64 uint uint8 uint16 uint32 uint64 float float32 float64 bool char string cstring pointer expr stmt void auto any range array openarray varargs seq set clong culong cchar cschar cshort cint csize clonglong cfloat cdouble clongdouble cuchar cushort cuint culonglong cstringarray semistatic"
            },
            contains: [{
                className: "meta",
                begin: /\{\./,
                end: /\.\}/,
                relevance: 10
            }, {
                className: "string",
                begin: /[a-zA-Z]\w*"/,
                end: /"/,
                contains: [{
                    begin: /""/
                }]
            }, {
                className: "string",
                begin: /([a-zA-Z]\w*)?"""/,
                end: /"""/
            }, A.QUOTE_STRING_MODE, {
                className: "type",
                begin: /\b[A-Z]\w+\b/,
                relevance: 0
            }, {
                className: "number",
                relevance: 0,
                variants: [{
                    begin: /\b(0[xX][0-9a-fA-F][_0-9a-fA-F]*)('?[iIuU](8|16|32|64))?/
                }, {
                    begin: /\b(0o[0-7][_0-7]*)('?[iIuUfF](8|16|32|64))?/
                }, {
                    begin: /\b(0(b|B)[01][_01]*)('?[iIuUfF](8|16|32|64))?/
                }, {
                    begin: /\b(\d[_\d]*)('?[iIuUfF](8|16|32|64))?/
                }]
            }, A.HASH_COMMENT_MODE]
        }
    }
    bsA.exports = J34
});
var gsA = E((PJ5, hsA) => {
    function X34(A) {
        let B = {
                keyword: "rec with let in inherit assert if else then",
                literal: "true false or and null",
                built_in: "import abort baseNameOf dirOf isNull builtins map removeAttrs throw toString derivation"
            },
            Q = {
                className: "subst",
                begin: /\$\{/,
                end: /\}/,
                keywords: B
            },
            Z = {
                begin: /[a-zA-Z0-9-_]+(\s*=)/,
                returnBegin: !0,
                relevance: 0,
                contains: [{
                    className: "attr",
                    begin: /\S+/
                }]
            },
            D = {
                className: "string",
                contains: [Q],
                variants: [{
                    begin: "''",
                    end: "''"
                }, {
                    begin: '"',
                    end: '"'
                }]
            },
            G = [A.NUMBER_MODE, A.HASH_COMMENT_MODE, A.C_BLOCK_COMMENT_MODE, D, Z];
        return Q.contains = G, {
            name: "Nix",
            aliases: ["nixos"],
            keywords: B,
            contains: G
        }
    }
    hsA.exports = X34
});
var msA = E((SJ5, usA) => {
    function V34(A) {
        return {
            name: "Node REPL",
            contains: [{
                className: "meta",
                starts: {
                    end: / |$/,
                    starts: {
                        end: "$",
                        subLanguage: "javascript"
                    }
                },
                variants: [{
                    begin: /^>(?=[ ]|$)/
                }, {
                    begin: /^\.\.\.(?=[ ]|$)/
                }]
            }]
        }
    }
    usA.exports = V34
});
var csA = E((jJ5, dsA) => {
    function C34(A) {
        let B = {
                className: "variable",
                begin: /\$(ADMINTOOLS|APPDATA|CDBURN_AREA|CMDLINE|COMMONFILES32|COMMONFILES64|COMMONFILES|COOKIES|DESKTOP|DOCUMENTS|EXEDIR|EXEFILE|EXEPATH|FAVORITES|FONTS|HISTORY|HWNDPARENT|INSTDIR|INTERNET_CACHE|LANGUAGE|LOCALAPPDATA|MUSIC|NETHOOD|OUTDIR|PICTURES|PLUGINSDIR|PRINTHOOD|PROFILE|PROGRAMFILES32|PROGRAMFILES64|PROGRAMFILES|QUICKLAUNCH|RECENT|RESOURCES_LOCALIZED|RESOURCES|SENDTO|SMPROGRAMS|SMSTARTUP|STARTMENU|SYSDIR|TEMP|TEMPLATES|VIDEOS|WINDIR)/
            },
            Q = {
                className: "variable",
                begin: /\$+\{[\w.:-]+\}/
            },
            Z = {
                className: "variable",
                begin: /\$+\w+/,
                illegal: /\(\)\{\}/
            },
            D = {
                className: "variable",
                begin: /\$+\([\w^.:-]+\)/
            },
            G = {
                className: "params",
                begin: "(ARCHIVE|FILE_ATTRIBUTE_ARCHIVE|FILE_ATTRIBUTE_NORMAL|FILE_ATTRIBUTE_OFFLINE|FILE_ATTRIBUTE_READONLY|FILE_ATTRIBUTE_SYSTEM|FILE_ATTRIBUTE_TEMPORARY|HKCR|HKCU|HKDD|HKEY_CLASSES_ROOT|HKEY_CURRENT_CONFIG|HKEY_CURRENT_USER|HKEY_DYN_DATA|HKEY_LOCAL_MACHINE|HKEY_PERFORMANCE_DATA|HKEY_USERS|HKLM|HKPD|HKU|IDABORT|IDCANCEL|IDIGNORE|IDNO|IDOK|IDRETRY|IDYES|MB_ABORTRETRYIGNORE|MB_DEFBUTTON1|MB_DEFBUTTON2|MB_DEFBUTTON3|MB_DEFBUTTON4|MB_ICONEXCLAMATION|MB_ICONINFORMATION|MB_ICONQUESTION|MB_ICONSTOP|MB_OK|MB_OKCANCEL|MB_RETRYCANCEL|MB_RIGHT|MB_RTLREADING|MB_SETFOREGROUND|MB_TOPMOST|MB_USERICON|MB_YESNO|NORMAL|OFFLINE|READONLY|SHCTX|SHELL_CONTEXT|SYSTEM|TEMPORARY)"
            },
            F = {
                className: "keyword",
                begin: /!(addincludedir|addplugindir|appendfile|cd|define|delfile|echo|else|endif|error|execute|finalize|getdllversion|gettlbversion|if|ifdef|ifmacrodef|ifmacrondef|ifndef|include|insertmacro|macro|macroend|makensis|packhdr|searchparse|searchreplace|system|tempfile|undef|verbose|warning)/
            },
            I = {
                className: "meta",
                begin: /\$(\\[nrt]|\$)/
            },
            Y = {
                className: "class",
                begin: /\w+::\w+/
            },
            W = {
                className: "string",
                variants: [{
                    begin: '"',
                    end: '"'
                }, {
                    begin: "'",
                    end: "'"
                }, {
                    begin: "`",
                    end: "`"
                }],
                illegal: /\n/,
                contains: [I, B, Q, Z, D]
            };
        return {
            name: "NSIS",
            case_insensitive: !1,
            keywords: {
                keyword: "Abort AddBrandingImage AddSize AllowRootDirInstall AllowSkipFiles AutoCloseWindow BGFont BGGradient BrandingText BringToFront Call CallInstDLL Caption ChangeUI CheckBitmap ClearErrors CompletedText ComponentText CopyFiles CRCCheck CreateDirectory CreateFont CreateShortCut Delete DeleteINISec DeleteINIStr DeleteRegKey DeleteRegValue DetailPrint DetailsButtonText DirText DirVar DirVerify EnableWindow EnumRegKey EnumRegValue Exch Exec ExecShell ExecShellWait ExecWait ExpandEnvStrings File FileBufSize FileClose FileErrorText FileOpen FileRead FileReadByte FileReadUTF16LE FileReadWord FileWriteUTF16LE FileSeek FileWrite FileWriteByte FileWriteWord FindClose FindFirst FindNext FindWindow FlushINI GetCurInstType GetCurrentAddress GetDlgItem GetDLLVersion GetDLLVersionLocal GetErrorLevel GetFileTime GetFileTimeLocal GetFullPathName GetFunctionAddress GetInstDirError GetKnownFolderPath GetLabelAddress GetTempFileName Goto HideWindow Icon IfAbort IfErrors IfFileExists IfRebootFlag IfRtlLanguage IfShellVarContextAll IfSilent InitPluginsDir InstallButtonText InstallColors InstallDir InstallDirRegKey InstProgressFlags InstType InstTypeGetText InstTypeSetText Int64Cmp Int64CmpU Int64Fmt IntCmp IntCmpU IntFmt IntOp IntPtrCmp IntPtrCmpU IntPtrOp IsWindow LangString LicenseBkColor LicenseData LicenseForceSelection LicenseLangString LicenseText LoadAndSetImage LoadLanguageFile LockWindow LogSet LogText ManifestDPIAware ManifestLongPathAware ManifestMaxVersionTested ManifestSupportedOS MessageBox MiscButtonText Name Nop OutFile Page PageCallbacks PEAddResource PEDllCharacteristics PERemoveResource PESubsysVer Pop Push Quit ReadEnvStr ReadINIStr ReadRegDWORD ReadRegStr Reboot RegDLL Rename RequestExecutionLevel ReserveFile Return RMDir SearchPath SectionGetFlags SectionGetInstTypes SectionGetSize SectionGetText SectionIn SectionSetFlags SectionSetInstTypes SectionSetSize SectionSetText SendMessage SetAutoClose SetBrandingImage SetCompress SetCompressor SetCompressorDictSize SetCtlColors SetCurInstType SetDatablockOptimize SetDateSave SetDetailsPrint SetDetailsView SetErrorLevel SetErrors SetFileAttributes SetFont SetOutPath SetOverwrite SetRebootFlag SetRegView SetShellVarContext SetSilent ShowInstDetails ShowUninstDetails ShowWindow SilentInstall SilentUnInstall Sleep SpaceTexts StrCmp StrCmpS StrCpy StrLen SubCaption Unicode UninstallButtonText UninstallCaption UninstallIcon UninstallSubCaption UninstallText UninstPage UnRegDLL Var VIAddVersionKey VIFileVersion VIProductVersion WindowIcon WriteINIStr WriteRegBin WriteRegDWORD WriteRegExpandStr WriteRegMultiStr WriteRegNone WriteRegStr WriteUninstaller XPStyle",
                literal: "admin all auto both bottom bzip2 colored components current custom directory false force hide highest ifdiff ifnewer instfiles lastused leave left license listonly lzma nevershow none normal notset off on open print right show silent silentlog smooth textonly top true try un.components un.custom un.directory un.instfiles un.license uninstConfirm user Win10 Win7 Win8 WinVista zlib"
            },
            contains: [A.HASH_COMMENT_MODE, A.C_BLOCK_COMMENT_MODE, A.COMMENT(";", "$", {
                relevance: 0
            }), {
                className: "function",
                beginKeywords: "Function PageEx Section SectionGroup",
                end: "$"
            }, W, F, Q, Z, D, G, Y, A.NUMBER_MODE]
        }
    }
    dsA.exports = C34
});