/* chunk:195 bytes:[4278449, 4280410) size:1961 source:unpacked-cli.js */
var DsA = E((CJ5, ZsA) => {
    function s54(A) {
        let B = {
                className: "variable",
                variants: [{
                    begin: "\\$\\(" + A.UNDERSCORE_IDENT_RE + "\\)",
                    contains: [A.BACKSLASH_ESCAPE]
                }, {
                    begin: /\$[@%<?\^\+\*]/
                }]
            },
            Q = {
                className: "string",
                begin: /"/,
                end: /"/,
                contains: [A.BACKSLASH_ESCAPE, B]
            },
            Z = {
                className: "variable",
                begin: /\$\([\w-]+\s/,
                end: /\)/,
                keywords: {
                    built_in: "subst patsubst strip findstring filter filter-out sort word wordlist firstword lastword dir notdir suffix basename addsuffix addprefix join wildcard realpath abspath error warning shell origin flavor foreach if or and call eval file value"
                },
                contains: [B]
            },
            D = {
                begin: "^" + A.UNDERSCORE_IDENT_RE + "\\s*(?=[:+?]?=)"
            },
            G = {
                className: "meta",
                begin: /^\.PHONY:/,
                end: /$/,
                keywords: {
                    $pattern: /[\.\w]+/,
                    "meta-keyword": ".PHONY"
                }
            },
            F = {
                className: "section",
                begin: /^[^\s]+:/,
                end: /$/,
                contains: [B]
            };
        return {
            name: "Makefile",
            aliases: ["mk", "mak", "make"],
            keywords: {
                $pattern: /[\w-]+/,
                keyword: "define endef undefine ifdef ifndef ifeq ifneq else endif include -include sinclude override export unexport private vpath"
            },
            contains: [A.HASH_COMMENT_MODE, B, Q, Z, D, G, F]
        }
    }
    ZsA.exports = s54
});