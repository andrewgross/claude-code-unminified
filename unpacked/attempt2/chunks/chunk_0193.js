/* chunk:193 bytes:[4240881, 4259084) size:18203 source:unpacked-cli.js */
var iaA = E((IJ5, paA) => {
    function v54(A) {
        var B = "[a-zA-Z_\\-+\\*\\/<=>&#][a-zA-Z0-9_\\-+*\\/<=>&#!]*",
            Q = "\\|[^]*?\\|",
            Z = "(-|\\+)?\\d+(\\.\\d+|\\/\\d+)?((d|e|f|l|s|D|E|F|L|S)(\\+|-)?\\d+)?",
            D = {
                className: "literal",
                begin: "\\b(t{1}|nil)\\b"
            },
            G = {
                className: "number",
                variants: [{
                    begin: Z,
                    relevance: 0
                }, {
                    begin: "#(b|B)[0-1]+(/[0-1]+)?"
                }, {
                    begin: "#(o|O)[0-7]+(/[0-7]+)?"
                }, {
                    begin: "#(x|X)[0-9a-fA-F]+(/[0-9a-fA-F]+)?"
                }, {
                    begin: "#(c|C)\\(" + Z + " +" + Z,
                    end: "\\)"
                }]
            },
            F = A.inherit(A.QUOTE_STRING_MODE, {
                illegal: null
            }),
            I = A.COMMENT(";", "$", {
                relevance: 0
            }),
            Y = {
                begin: "\\*",
                end: "\\*"
            },
            W = {
                className: "symbol",
                begin: "[:&]" + B
            },
            J = {
                begin: B,
                relevance: 0
            },
            X = {
                begin: Q
            },
            V = {
                begin: "\\(",
                end: "\\)",
                contains: ["self", D, F, G, J]
            },
            C = {
                contains: [G, F, Y, W, V, J],
                variants: [{
                    begin: "['`]\\(",
                    end: "\\)"
                }, {
                    begin: "\\(quote ",
                    end: "\\)",
                    keywords: {
                        name: "quote"
                    }
                }, {
                    begin: "'" + Q
                }]
            },
            K = {
                variants: [{
                    begin: "'" + B
                }, {
                    begin: "#'" + B + "(::" + B + ")*"
                }]
            },
            H = {
                begin: "\\(\\s*",
                end: "\\)"
            },
            z = {
                endsWithParent: !0,
                relevance: 0
            };
        return H.contains = [{
            className: "name",
            variants: [{
                begin: B,
                relevance: 0
            }, {
                begin: Q
            }]
        }, z], z.contains = [C, K, H, D, G, F, I, Y, W, X, J], {
            name: "Lisp",
            illegal: /\S/,
            contains: [G, A.SHEBANG(), D, F, I, C, K, H, J]
        }
    }
    paA.exports = v54
});
var aaA = E((YJ5, naA) => {
    function b54(A) {
        let B = {
                className: "variable",
                variants: [{
                    begin: "\\b([gtps][A-Z]{1}[a-zA-Z0-9]*)(\\[.+\\])?(?:\\s*?)"
                }, {
                    begin: "\\$_[A-Z]+"
                }],
                relevance: 0
            },
            Q = [A.C_BLOCK_COMMENT_MODE, A.HASH_COMMENT_MODE, A.COMMENT("--", "$"), A.COMMENT("[^:]//", "$")],
            Z = A.inherit(A.TITLE_MODE, {
                variants: [{
                    begin: "\\b_*rig[A-Z][A-Za-z0-9_\\-]*"
                }, {
                    begin: "\\b_[a-z0-9\\-]+"
                }]
            }),
            D = A.inherit(A.TITLE_MODE, {
                begin: "\\b([A-Za-z0-9_\\-]+)\\b"
            });
        return {
            name: "LiveCode",
            case_insensitive: !1,
            keywords: {
                keyword: "$_COOKIE $_FILES $_GET $_GET_BINARY $_GET_RAW $_POST $_POST_BINARY $_POST_RAW $_SESSION $_SERVER codepoint codepoints segment segments codeunit codeunits sentence sentences trueWord trueWords paragraph after byte bytes english the until http forever descending using line real8 with seventh for stdout finally element word words fourth before black ninth sixth characters chars stderr uInt1 uInt1s uInt2 uInt2s stdin string lines relative rel any fifth items from middle mid at else of catch then third it file milliseconds seconds second secs sec int1 int1s int4 int4s internet int2 int2s normal text item last long detailed effective uInt4 uInt4s repeat end repeat URL in try into switch to words https token binfile each tenth as ticks tick system real4 by dateItems without char character ascending eighth whole dateTime numeric short first ftp integer abbreviated abbr abbrev private case while if div mod wrap and or bitAnd bitNot bitOr bitXor among not in a an within contains ends with begins the keys of keys",
                literal: "SIX TEN FORMFEED NINE ZERO NONE SPACE FOUR FALSE COLON CRLF PI COMMA ENDOFFILE EOF EIGHT FIVE QUOTE EMPTY ONE TRUE RETURN CR LINEFEED RIGHT BACKSLASH NULL SEVEN TAB THREE TWO six ten formfeed nine zero none space four false colon crlf pi comma endoffile eof eight five quote empty one true return cr linefeed right backslash null seven tab three two RIVERSION RISTATE FILE_READ_MODE FILE_WRITE_MODE FILE_WRITE_MODE DIR_WRITE_MODE FILE_READ_UMASK FILE_WRITE_UMASK DIR_READ_UMASK DIR_WRITE_UMASK",
                built_in: "put abs acos aliasReference annuity arrayDecode arrayEncode asin atan atan2 average avg avgDev base64Decode base64Encode baseConvert binaryDecode binaryEncode byteOffset byteToNum cachedURL cachedURLs charToNum cipherNames codepointOffset codepointProperty codepointToNum codeunitOffset commandNames compound compress constantNames cos date dateFormat decompress difference directories diskSpace DNSServers exp exp1 exp2 exp10 extents files flushEvents folders format functionNames geometricMean global globals hasMemory harmonicMean hostAddress hostAddressToName hostName hostNameToAddress isNumber ISOToMac itemOffset keys len length libURLErrorData libUrlFormData libURLftpCommand libURLLastHTTPHeaders libURLLastRHHeaders libUrlMultipartFormAddPart libUrlMultipartFormData libURLVersion lineOffset ln ln1 localNames log log2 log10 longFilePath lower macToISO matchChunk matchText matrixMultiply max md5Digest median merge messageAuthenticationCode messageDigest millisec millisecs millisecond milliseconds min monthNames nativeCharToNum normalizeText num number numToByte numToChar numToCodepoint numToNativeChar offset open openfiles openProcesses openProcessIDs openSockets paragraphOffset paramCount param params peerAddress pendingMessages platform popStdDev populationStandardDeviation populationVariance popVariance processID random randomBytes replaceText result revCreateXMLTree revCreateXMLTreeFromFile revCurrentRecord revCurrentRecordIsFirst revCurrentRecordIsLast revDatabaseColumnCount revDatabaseColumnIsNull revDatabaseColumnLengths revDatabaseColumnNames revDatabaseColumnNamed revDatabaseColumnNumbered revDatabaseColumnTypes revDatabaseConnectResult revDatabaseCursors revDatabaseID revDatabaseTableNames revDatabaseType revDataFromQuery revdb_closeCursor revdb_columnbynumber revdb_columncount revdb_columnisnull revdb_columnlengths revdb_columnnames revdb_columntypes revdb_commit revdb_connect revdb_connections revdb_connectionerr revdb_currentrecord revdb_cursorconnection revdb_cursorerr revdb_cursors revdb_dbtype revdb_disconnect revdb_execute revdb_iseof revdb_isbof revdb_movefirst revdb_movelast revdb_movenext revdb_moveprev revdb_query revdb_querylist revdb_recordcount revdb_rollback revdb_tablenames revGetDatabaseDriverPath revNumberOfRecords revOpenDatabase revOpenDatabases revQueryDatabase revQueryDatabaseBlob revQueryResult revQueryIsAtStart revQueryIsAtEnd revUnixFromMacPath revXMLAttribute revXMLAttributes revXMLAttributeValues revXMLChildContents revXMLChildNames revXMLCreateTreeFromFileWithNamespaces revXMLCreateTreeWithNamespaces revXMLDataFromXPathQuery revXMLEvaluateXPath revXMLFirstChild revXMLMatchingNode revXMLNextSibling revXMLNodeContents revXMLNumberOfChildren revXMLParent revXMLPreviousSibling revXMLRootNode revXMLRPC_CreateRequest revXMLRPC_Documents revXMLRPC_Error revXMLRPC_GetHost revXMLRPC_GetMethod revXMLRPC_GetParam revXMLText revXMLRPC_Execute revXMLRPC_GetParamCount revXMLRPC_GetParamNode revXMLRPC_GetParamType revXMLRPC_GetPath revXMLRPC_GetPort revXMLRPC_GetProtocol revXMLRPC_GetRequest revXMLRPC_GetResponse revXMLRPC_GetSocket revXMLTree revXMLTrees revXMLValidateDTD revZipDescribeItem revZipEnumerateItems revZipOpenArchives round sampVariance sec secs seconds sentenceOffset sha1Digest shell shortFilePath sin specialFolderPath sqrt standardDeviation statRound stdDev sum sysError systemVersion tan tempName textDecode textEncode tick ticks time to tokenOffset toLower toUpper transpose truewordOffset trunc uniDecode uniEncode upper URLDecode URLEncode URLStatus uuid value variableNames variance version waitDepth weekdayNames wordOffset xsltApplyStylesheet xsltApplyStylesheetFromFile xsltLoadStylesheet xsltLoadStylesheetFromFile add breakpoint cancel clear local variable file word line folder directory URL close socket process combine constant convert create new alias folder directory decrypt delete variable word line folder directory URL dispatch divide do encrypt filter get include intersect kill libURLDownloadToFile libURLFollowHttpRedirects libURLftpUpload libURLftpUploadFile libURLresetAll libUrlSetAuthCallback libURLSetDriver libURLSetCustomHTTPHeaders libUrlSetExpect100 libURLSetFTPListCommand libURLSetFTPMode libURLSetFTPStopTime libURLSetStatusCallback load extension loadedExtensions multiply socket prepare process post seek rel relative read from process rename replace require resetAll resolve revAddXMLNode revAppendXML revCloseCursor revCloseDatabase revCommitDatabase revCopyFile revCopyFolder revCopyXMLNode revDeleteFolder revDeleteXMLNode revDeleteAllXMLTrees revDeleteXMLTree revExecuteSQL revGoURL revInsertXMLNode revMoveFolder revMoveToFirstRecord revMoveToLastRecord revMoveToNextRecord revMoveToPreviousRecord revMoveToRecord revMoveXMLNode revPutIntoXMLNode revRollBackDatabase revSetDatabaseDriverPath revSetXMLAttribute revXMLRPC_AddParam revXMLRPC_DeleteAllDocuments revXMLAddDTD revXMLRPC_Free revXMLRPC_FreeAll revXMLRPC_DeleteDocument revXMLRPC_DeleteParam revXMLRPC_SetHost revXMLRPC_SetMethod revXMLRPC_SetPort revXMLRPC_SetProtocol revXMLRPC_SetSocket revZipAddItemWithData revZipAddItemWithFile revZipAddUncompressedItemWithData revZipAddUncompressedItemWithFile revZipCancel revZipCloseArchive revZipDeleteItem revZipExtractItemToFile revZipExtractItemToVariable revZipSetProgressCallback revZipRenameItem revZipReplaceItemWithData revZipReplaceItemWithFile revZipOpenArchive send set sort split start stop subtract symmetric union unload vectorDotProduct wait write"
            },
            contains: [B, {
                className: "keyword",
                begin: "\\bend\\sif\\b"
            }, {
                className: "function",
                beginKeywords: "function",
                end: "$",
                contains: [B, D, A.APOS_STRING_MODE, A.QUOTE_STRING_MODE, A.BINARY_NUMBER_MODE, A.C_NUMBER_MODE, Z]
            }, {
                className: "function",
                begin: "\\bend\\s+",
                end: "$",
                keywords: "end",
                contains: [D, Z],
                relevance: 0
            }, {
                beginKeywords: "command on",
                end: "$",
                contains: [B, D, A.APOS_STRING_MODE, A.QUOTE_STRING_MODE, A.BINARY_NUMBER_MODE, A.C_NUMBER_MODE, Z]
            }, {
                className: "meta",
                variants: [{
                    begin: "<\\?(rev|lc|livecode)",
                    relevance: 10
                }, {
                    begin: "<\\?"
                }, {
                    begin: "\\?>"
                }]
            }, A.APOS_STRING_MODE, A.QUOTE_STRING_MODE, A.BINARY_NUMBER_MODE, A.C_NUMBER_MODE, Z].concat(Q),
            illegal: ";$|^\\[|^=|&|\\{"
        }
    }
    naA.exports = b54
});
var raA = E((WJ5, saA) => {
    var f54 = ["as", "in", "of", "if", "for", "while", "finally", "var", "new", "function", "do", "return", "void", "else", "break", "catch", "instanceof", "with", "throw", "case", "default", "try", "switch", "continue", "typeof", "delete", "let", "yield", "const", "class", "debugger", "async", "await", "static", "import", "from", "export", "extends"],
        h54 = ["true", "false", "null", "undefined", "NaN", "Infinity"],
        g54 = ["Intl", "DataView", "Number", "Math", "Date", "String", "RegExp", "Object", "Function", "Boolean", "Error", "Symbol", "Set", "Map", "WeakSet", "WeakMap", "Proxy", "Reflect", "JSON", "Promise", "Float64Array", "Int16Array", "Int32Array", "Int8Array", "Uint16Array", "Uint32Array", "Float32Array", "Array", "Uint8Array", "Uint8ClampedArray", "ArrayBuffer", "BigInt64Array", "BigUint64Array", "BigInt"],
        u54 = ["EvalError", "InternalError", "RangeError", "ReferenceError", "SyntaxError", "TypeError", "URIError"],
        m54 = ["setInterval", "setTimeout", "clearInterval", "clearTimeout", "require", "exports", "eval", "isFinite", "isNaN", "parseFloat", "parseInt", "decodeURI", "decodeURIComponent", "encodeURI", "encodeURIComponent", "escape", "unescape"],
        d54 = ["arguments", "this", "super", "console", "window", "document", "localStorage", "module", "global"],
        c54 = [].concat(m54, d54, g54, u54);

    function l54(A) {
        let B = ["npm", "print"],
            Q = ["yes", "no", "on", "off", "it", "that", "void"],
            Z = ["then", "unless", "until", "loop", "of", "by", "when", "and", "or", "is", "isnt", "not", "it", "that", "otherwise", "from", "to", "til", "fallthrough", "case", "enum", "native", "list", "map", "__hasProp", "__extends", "__slice", "__bind", "__indexOf"],
            D = {
                keyword: f54.concat(Z),
                literal: h54.concat(Q),
                built_in: c54.concat(B)
            },
            G = "[A-Za-z$_](?:-[0-9A-Za-z$_]|[0-9A-Za-z$_])*",
            F = A.inherit(A.TITLE_MODE, {
                begin: "[A-Za-z$_](?:-[0-9A-Za-z$_]|[0-9A-Za-z$_])*"
            }),
            I = {
                className: "subst",
                begin: /#\{/,
                end: /\}/,
                keywords: D
            },
            Y = {
                className: "subst",
                begin: /#[A-Za-z$_]/,
                end: /(?:-[0-9A-Za-z$_]|[0-9A-Za-z$_])*/,
                keywords: D
            },
            W = [A.BINARY_NUMBER_MODE, {
                className: "number",
                begin: "(\\b0[xX][a-fA-F0-9_]+)|(\\b\\d(\\d|_\\d)*(\\.(\\d(\\d|_\\d)*)?)?(_*[eE]([-+]\\d(_\\d|\\d)*)?)?[_a-z]*)",
                relevance: 0,
                starts: {
                    end: "(\\s*/)?",
                    relevance: 0
                }
            }, {
                className: "string",
                variants: [{
                    begin: /'''/,
                    end: /'''/,
                    contains: [A.BACKSLASH_ESCAPE]
                }, {
                    begin: /'/,
                    end: /'/,
                    contains: [A.BACKSLASH_ESCAPE]
                }, {
                    begin: /"""/,
                    end: /"""/,
                    contains: [A.BACKSLASH_ESCAPE, I, Y]
                }, {
                    begin: /"/,
                    end: /"/,
                    contains: [A.BACKSLASH_ESCAPE, I, Y]
                }, {
                    begin: /\\/,
                    end: /(\s|$)/,
                    excludeEnd: !0
                }]
            }, {
                className: "regexp",
                variants: [{
                    begin: "//",
                    end: "//[gim]*",
                    contains: [I, A.HASH_COMMENT_MODE]
                }, {
                    begin: /\/(?![ *])(\\.|[^\\\n])*?\/[gim]*(?=\W)/
                }]
            }, {
                begin: "@[A-Za-z$_](?:-[0-9A-Za-z$_]|[0-9A-Za-z$_])*"
            }, {
                begin: "``",
                end: "``",
                excludeBegin: !0,
                excludeEnd: !0,
                subLanguage: "javascript"
            }];
        I.contains = W;
        let J = {
                className: "params",
                begin: "\\(",
                returnBegin: !0,
                contains: [{
                    begin: /\(/,
                    end: /\)/,
                    keywords: D,
                    contains: ["self"].concat(W)
                }]
            },
            X = {
                begin: "(#=>|=>|\\|>>|-?->|!->)"
            };
        return {
            name: "LiveScript",
            aliases: ["ls"],
            keywords: D,
            illegal: /\/\*/,
            contains: W.concat([A.COMMENT("\\/\\*", "\\*\\/"), A.HASH_COMMENT_MODE, X, {
                className: "function",
                contains: [F, J],
                returnBegin: !0,
                variants: [{
                    begin: "([A-Za-z$_](?:-[0-9A-Za-z$_]|[0-9A-Za-z$_])*\\s*(?:=|:=)\\s*)?(\\(.*\\)\\s*)?\\B->\\*?",
                    end: "->\\*?"
                }, {
                    begin: "([A-Za-z$_](?:-[0-9A-Za-z$_]|[0-9A-Za-z$_])*\\s*(?:=|:=)\\s*)?!?(\\(.*\\)\\s*)?\\B[-~]{1,2}>\\*?",
                    end: "[-~]{1,2}>\\*?"
                }, {
                    begin: "([A-Za-z$_](?:-[0-9A-Za-z$_]|[0-9A-Za-z$_])*\\s*(?:=|:=)\\s*)?(\\(.*\\)\\s*)?\\B!?[-~]{1,2}>\\*?",
                    end: "!?[-~]{1,2}>\\*?"
                }]
            }, {
                className: "class",
                beginKeywords: "class",
                end: "$",
                illegal: /[:="\[\]]/,
                contains: [{
                    beginKeywords: "extends",
                    endsWithParent: !0,
                    illegal: /[:="\[\]]/,
                    contains: [F]
                }, F]
            }, {
                begin: "[A-Za-z$_](?:-[0-9A-Za-z$_]|[0-9A-Za-z$_])*:",
                end: ":",
                returnBegin: !0,
                returnEnd: !0,
                relevance: 0
            }])
        }
    }
    saA.exports = l54
});