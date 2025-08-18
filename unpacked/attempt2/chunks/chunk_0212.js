/* chunk:212 bytes:[4676636, 4694143) size:17507 source:unpacked-cli.js */
var NoA = E((wX5, qoA) => {
    function $oA(A) {
        if (!A) return null;
        if (typeof A === "string") return A;
        return A.source
    }

    function H74(...A) {
        return A.map((Q) => $oA(Q)).join("")
    }

    function vQ0(...A) {
        return "(" + A.map((Q) => $oA(Q)).join("|") + ")"
    }

    function z74(A) {
        let B = A.COMMENT("--", "$"),
            Q = {
                className: "string",
                variants: [{
                    begin: /'/,
                    end: /'/,
                    contains: [{
                        begin: /''/
                    }]
                }]
            },
            Z = {
                begin: /"/,
                end: /"/,
                contains: [{
                    begin: /""/
                }]
            },
            D = ["true", "false", "unknown"],
            G = ["double precision", "large object", "with timezone", "without timezone"],
            F = ["bigint", "binary", "blob", "boolean", "char", "character", "clob", "date", "dec", "decfloat", "decimal", "float", "int", "integer", "interval", "nchar", "nclob", "national", "numeric", "real", "row", "smallint", "time", "timestamp", "varchar", "varying", "varbinary"],
            I = ["add", "asc", "collation", "desc", "final", "first", "last", "view"],
            Y = ["abs", "acos", "all", "allocate", "alter", "and", "any", "are", "array", "array_agg", "array_max_cardinality", "as", "asensitive", "asin", "asymmetric", "at", "atan", "atomic", "authorization", "avg", "begin", "begin_frame", "begin_partition", "between", "bigint", "binary", "blob", "boolean", "both", "by", "call", "called", "cardinality", "cascaded", "case", "cast", "ceil", "ceiling", "char", "char_length", "character", "character_length", "check", "classifier", "clob", "close", "coalesce", "collate", "collect", "column", "commit", "condition", "connect", "constraint", "contains", "convert", "copy", "corr", "corresponding", "cos", "cosh", "count", "covar_pop", "covar_samp", "create", "cross", "cube", "cume_dist", "current", "current_catalog", "current_date", "current_default_transform_group", "current_path", "current_role", "current_row", "current_schema", "current_time", "current_timestamp", "current_path", "current_role", "current_transform_group_for_type", "current_user", "cursor", "cycle", "date", "day", "deallocate", "dec", "decimal", "decfloat", "declare", "default", "define", "delete", "dense_rank", "deref", "describe", "deterministic", "disconnect", "distinct", "double", "drop", "dynamic", "each", "element", "else", "empty", "end", "end_frame", "end_partition", "end-exec", "equals", "escape", "every", "except", "exec", "execute", "exists", "exp", "external", "extract", "false", "fetch", "filter", "first_value", "float", "floor", "for", "foreign", "frame_row", "free", "from", "full", "function", "fusion", "get", "global", "grant", "group", "grouping", "groups", "having", "hold", "hour", "identity", "in", "indicator", "initial", "inner", "inout", "insensitive", "insert", "int", "integer", "intersect", "intersection", "interval", "into", "is", "join", "json_array", "json_arrayagg", "json_exists", "json_object", "json_objectagg", "json_query", "json_table", "json_table_primitive", "json_value", "lag", "language", "large", "last_value", "lateral", "lead", "leading", "left", "like", "like_regex", "listagg", "ln", "local", "localtime", "localtimestamp", "log", "log10", "lower", "match", "match_number", "match_recognize", "matches", "max", "member", "merge", "method", "min", "minute", "mod", "modifies", "module", "month", "multiset", "national", "natural", "nchar", "nclob", "new", "no", "none", "normalize", "not", "nth_value", "ntile", "null", "nullif", "numeric", "octet_length", "occurrences_regex", "of", "offset", "old", "omit", "on", "one", "only", "open", "or", "order", "out", "outer", "over", "overlaps", "overlay", "parameter", "partition", "pattern", "per", "percent", "percent_rank", "percentile_cont", "percentile_disc", "period", "portion", "position", "position_regex", "power", "precedes", "precision", "prepare", "primary", "procedure", "ptf", "range", "rank", "reads", "real", "recursive", "ref", "references", "referencing", "regr_avgx", "regr_avgy", "regr_count", "regr_intercept", "regr_r2", "regr_slope", "regr_sxx", "regr_sxy", "regr_syy", "release", "result", "return", "returns", "revoke", "right", "rollback", "rollup", "row", "row_number", "rows", "running", "savepoint", "scope", "scroll", "search", "second", "seek", "select", "sensitive", "session_user", "set", "show", "similar", "sin", "sinh", "skip", "smallint", "some", "specific", "specifictype", "sql", "sqlexception", "sqlstate", "sqlwarning", "sqrt", "start", "static", "stddev_pop", "stddev_samp", "submultiset", "subset", "substring", "substring_regex", "succeeds", "sum", "symmetric", "system", "system_time", "system_user", "table", "tablesample", "tan", "tanh", "then", "time", "timestamp", "timezone_hour", "timezone_minute", "to", "trailing", "translate", "translate_regex", "translation", "treat", "trigger", "trim", "trim_array", "true", "truncate", "uescape", "union", "unique", "unknown", "unnest", "update   ", "upper", "user", "using", "value", "values", "value_of", "var_pop", "var_samp", "varbinary", "varchar", "varying", "versioning", "when", "whenever", "where", "width_bucket", "window", "with", "within", "without", "year"],
            W = ["abs", "acos", "array_agg", "asin", "atan", "avg", "cast", "ceil", "ceiling", "coalesce", "corr", "cos", "cosh", "count", "covar_pop", "covar_samp", "cume_dist", "dense_rank", "deref", "element", "exp", "extract", "first_value", "floor", "json_array", "json_arrayagg", "json_exists", "json_object", "json_objectagg", "json_query", "json_table", "json_table_primitive", "json_value", "lag", "last_value", "lead", "listagg", "ln", "log", "log10", "lower", "max", "min", "mod", "nth_value", "ntile", "nullif", "percent_rank", "percentile_cont", "percentile_disc", "position", "position_regex", "power", "rank", "regr_avgx", "regr_avgy", "regr_count", "regr_intercept", "regr_r2", "regr_slope", "regr_sxx", "regr_sxy", "regr_syy", "row_number", "sin", "sinh", "sqrt", "stddev_pop", "stddev_samp", "substring", "substring_regex", "sum", "tan", "tanh", "translate", "translate_regex", "treat", "trim", "trim_array", "unnest", "upper", "value_of", "var_pop", "var_samp", "width_bucket"],
            J = ["current_catalog", "current_date", "current_default_transform_group", "current_path", "current_role", "current_schema", "current_transform_group_for_type", "current_user", "session_user", "system_time", "system_user", "current_time", "localtime", "current_timestamp", "localtimestamp"],
            X = ["create table", "insert into", "primary key", "foreign key", "not null", "alter table", "add constraint", "grouping sets", "on overflow", "character set", "respect nulls", "ignore nulls", "nulls first", "nulls last", "depth first", "breadth first"],
            V = W,
            C = [...Y, ...I].filter((L) => {
                return !W.includes(L)
            }),
            K = {
                className: "variable",
                begin: /@[a-z0-9]+/
            },
            H = {
                className: "operator",
                begin: /[-+*/=%^~]|&&?|\|\|?|!=?|<(?:=>?|<|>)?|>[>=]?/,
                relevance: 0
            },
            z = {
                begin: H74(/\b/, vQ0(...V), /\s*\(/),
                keywords: {
                    built_in: V
                }
            };

        function $(L, {
            exceptions: N,
            when: R
        } = {}) {
            let O = R;
            return N = N || [], L.map((P) => {
                if (P.match(/\|\d+$/) || N.includes(P)) return P;
                else if (O(P)) return `${P}|0`;
                else return P
            })
        }
        return {
            name: "SQL",
            case_insensitive: !0,
            illegal: /[{}]|<\//,
            keywords: {
                $pattern: /\b[\w\.]+/,
                keyword: $(C, {
                    when: (L) => L.length < 3
                }),
                literal: D,
                type: F,
                built_in: J
            },
            contains: [{
                begin: vQ0(...X),
                keywords: {
                    $pattern: /[\w\.]+/,
                    keyword: C.concat(X),
                    literal: D,
                    type: F
                }
            }, {
                className: "type",
                begin: vQ0(...G)
            }, z, K, Q, Z, A.C_NUMBER_MODE, A.C_BLOCK_COMMENT_MODE, B, H]
        }
    }
    qoA.exports = z74
});
var MoA = E(($X5, LoA) => {
    function E74(A) {
        let B = ["functions", "model", "data", "parameters", "quantities", "transformed", "generated"],
            Q = ["for", "in", "if", "else", "while", "break", "continue", "return"],
            Z = ["print", "reject", "increment_log_prob|10", "integrate_ode|10", "integrate_ode_rk45|10", "integrate_ode_bdf|10", "algebra_solver"],
            D = ["int", "real", "vector", "ordered", "positive_ordered", "simplex", "unit_vector", "row_vector", "matrix", "cholesky_factor_corr|10", "cholesky_factor_cov|10", "corr_matrix|10", "cov_matrix|10", "void"],
            G = ["Phi", "Phi_approx", "abs", "acos", "acosh", "algebra_solver", "append_array", "append_col", "append_row", "asin", "asinh", "atan", "atan2", "atanh", "bernoulli_cdf", "bernoulli_lccdf", "bernoulli_lcdf", "bernoulli_logit_lpmf", "bernoulli_logit_rng", "bernoulli_lpmf", "bernoulli_rng", "bessel_first_kind", "bessel_second_kind", "beta_binomial_cdf", "beta_binomial_lccdf", "beta_binomial_lcdf", "beta_binomial_lpmf", "beta_binomial_rng", "beta_cdf", "beta_lccdf", "beta_lcdf", "beta_lpdf", "beta_rng", "binary_log_loss", "binomial_cdf", "binomial_coefficient_log", "binomial_lccdf", "binomial_lcdf", "binomial_logit_lpmf", "binomial_lpmf", "binomial_rng", "block", "categorical_logit_lpmf", "categorical_logit_rng", "categorical_lpmf", "categorical_rng", "cauchy_cdf", "cauchy_lccdf", "cauchy_lcdf", "cauchy_lpdf", "cauchy_rng", "cbrt", "ceil", "chi_square_cdf", "chi_square_lccdf", "chi_square_lcdf", "chi_square_lpdf", "chi_square_rng", "cholesky_decompose", "choose", "col", "cols", "columns_dot_product", "columns_dot_self", "cos", "cosh", "cov_exp_quad", "crossprod", "csr_extract_u", "csr_extract_v", "csr_extract_w", "csr_matrix_times_vector", "csr_to_dense_matrix", "cumulative_sum", "determinant", "diag_matrix", "diag_post_multiply", "diag_pre_multiply", "diagonal", "digamma", "dims", "dirichlet_lpdf", "dirichlet_rng", "distance", "dot_product", "dot_self", "double_exponential_cdf", "double_exponential_lccdf", "double_exponential_lcdf", "double_exponential_lpdf", "double_exponential_rng", "e", "eigenvalues_sym", "eigenvectors_sym", "erf", "erfc", "exp", "exp2", "exp_mod_normal_cdf", "exp_mod_normal_lccdf", "exp_mod_normal_lcdf", "exp_mod_normal_lpdf", "exp_mod_normal_rng", "expm1", "exponential_cdf", "exponential_lccdf", "exponential_lcdf", "exponential_lpdf", "exponential_rng", "fabs", "falling_factorial", "fdim", "floor", "fma", "fmax", "fmin", "fmod", "frechet_cdf", "frechet_lccdf", "frechet_lcdf", "frechet_lpdf", "frechet_rng", "gamma_cdf", "gamma_lccdf", "gamma_lcdf", "gamma_lpdf", "gamma_p", "gamma_q", "gamma_rng", "gaussian_dlm_obs_lpdf", "get_lp", "gumbel_cdf", "gumbel_lccdf", "gumbel_lcdf", "gumbel_lpdf", "gumbel_rng", "head", "hypergeometric_lpmf", "hypergeometric_rng", "hypot", "inc_beta", "int_step", "integrate_ode", "integrate_ode_bdf", "integrate_ode_rk45", "inv", "inv_Phi", "inv_chi_square_cdf", "inv_chi_square_lccdf", "inv_chi_square_lcdf", "inv_chi_square_lpdf", "inv_chi_square_rng", "inv_cloglog", "inv_gamma_cdf", "inv_gamma_lccdf", "inv_gamma_lcdf", "inv_gamma_lpdf", "inv_gamma_rng", "inv_logit", "inv_sqrt", "inv_square", "inv_wishart_lpdf", "inv_wishart_rng", "inverse", "inverse_spd", "is_inf", "is_nan", "lbeta", "lchoose", "lgamma", "lkj_corr_cholesky_lpdf", "lkj_corr_cholesky_rng", "lkj_corr_lpdf", "lkj_corr_rng", "lmgamma", "lmultiply", "log", "log10", "log1m", "log1m_exp", "log1m_inv_logit", "log1p", "log1p_exp", "log2", "log_determinant", "log_diff_exp", "log_falling_factorial", "log_inv_logit", "log_mix", "log_rising_factorial", "log_softmax", "log_sum_exp", "logistic_cdf", "logistic_lccdf", "logistic_lcdf", "logistic_lpdf", "logistic_rng", "logit", "lognormal_cdf", "lognormal_lccdf", "lognormal_lcdf", "lognormal_lpdf", "lognormal_rng", "machine_precision", "matrix_exp", "max", "mdivide_left_spd", "mdivide_left_tri_low", "mdivide_right_spd", "mdivide_right_tri_low", "mean", "min", "modified_bessel_first_kind", "modified_bessel_second_kind", "multi_gp_cholesky_lpdf", "multi_gp_lpdf", "multi_normal_cholesky_lpdf", "multi_normal_cholesky_rng", "multi_normal_lpdf", "multi_normal_prec_lpdf", "multi_normal_rng", "multi_student_t_lpdf", "multi_student_t_rng", "multinomial_lpmf", "multinomial_rng", "multiply_log", "multiply_lower_tri_self_transpose", "neg_binomial_2_cdf", "neg_binomial_2_lccdf", "neg_binomial_2_lcdf", "neg_binomial_2_log_lpmf", "neg_binomial_2_log_rng", "neg_binomial_2_lpmf", "neg_binomial_2_rng", "neg_binomial_cdf", "neg_binomial_lccdf", "neg_binomial_lcdf", "neg_binomial_lpmf", "neg_binomial_rng", "negative_infinity", "normal_cdf", "normal_lccdf", "normal_lcdf", "normal_lpdf", "normal_rng", "not_a_number", "num_elements", "ordered_logistic_lpmf", "ordered_logistic_rng", "owens_t", "pareto_cdf", "pareto_lccdf", "pareto_lcdf", "pareto_lpdf", "pareto_rng", "pareto_type_2_cdf", "pareto_type_2_lccdf", "pareto_type_2_lcdf", "pareto_type_2_lpdf", "pareto_type_2_rng", "pi", "poisson_cdf", "poisson_lccdf", "poisson_lcdf", "poisson_log_lpmf", "poisson_log_rng", "poisson_lpmf", "poisson_rng", "positive_infinity", "pow", "print", "prod", "qr_Q", "qr_R", "quad_form", "quad_form_diag", "quad_form_sym", "rank", "rayleigh_cdf", "rayleigh_lccdf", "rayleigh_lcdf", "rayleigh_lpdf", "rayleigh_rng", "reject", "rep_array", "rep_matrix", "rep_row_vector", "rep_vector", "rising_factorial", "round", "row", "rows", "rows_dot_product", "rows_dot_self", "scaled_inv_chi_square_cdf", "scaled_inv_chi_square_lccdf", "scaled_inv_chi_square_lcdf", "scaled_inv_chi_square_lpdf", "scaled_inv_chi_square_rng", "sd", "segment", "sin", "singular_values", "sinh", "size", "skew_normal_cdf", "skew_normal_lccdf", "skew_normal_lcdf", "skew_normal_lpdf", "skew_normal_rng", "softmax", "sort_asc", "sort_desc", "sort_indices_asc", "sort_indices_desc", "sqrt", "sqrt2", "square", "squared_distance", "step", "student_t_cdf", "student_t_lccdf", "student_t_lcdf", "student_t_lpdf", "student_t_rng", "sub_col", "sub_row", "sum", "tail", "tan", "tanh", "target", "tcrossprod", "tgamma", "to_array_1d", "to_array_2d", "to_matrix", "to_row_vector", "to_vector", "trace", "trace_gen_quad_form", "trace_quad_form", "trigamma", "trunc", "uniform_cdf", "uniform_lccdf", "uniform_lcdf", "uniform_lpdf", "uniform_rng", "variance", "von_mises_lpdf", "von_mises_rng", "weibull_cdf", "weibull_lccdf", "weibull_lcdf", "weibull_lpdf", "weibull_rng", "wiener_lpdf", "wishart_lpdf", "wishart_rng"],
            F = ["bernoulli", "bernoulli_logit", "beta", "beta_binomial", "binomial", "binomial_logit", "categorical", "categorical_logit", "cauchy", "chi_square", "dirichlet", "double_exponential", "exp_mod_normal", "exponential", "frechet", "gamma", "gaussian_dlm_obs", "gumbel", "hypergeometric", "inv_chi_square", "inv_gamma", "inv_wishart", "lkj_corr", "lkj_corr_cholesky", "logistic", "lognormal", "multi_gp", "multi_gp_cholesky", "multi_normal", "multi_normal_cholesky", "multi_normal_prec", "multi_student_t", "multinomial", "neg_binomial", "neg_binomial_2", "neg_binomial_2_log", "normal", "ordered_logistic", "pareto", "pareto_type_2", "poisson", "poisson_log", "rayleigh", "scaled_inv_chi_square", "skew_normal", "student_t", "uniform", "von_mises", "weibull", "wiener", "wishart"];
        return {
            name: "Stan",
            aliases: ["stanfuncs"],
            keywords: {
                $pattern: A.IDENT_RE,
                title: B,
                keyword: Q.concat(D).concat(Z),
                built_in: G
            },
            contains: [A.C_LINE_COMMENT_MODE, A.COMMENT(/#/, /$/, {
                relevance: 0,
                keywords: {
                    "meta-keyword": "include"
                }
            }), A.COMMENT(/\/\*/, /\*\//, {
                relevance: 0,
                contains: [{
                    className: "doctag",
                    begin: /@(return|param)/
                }]
            }), {
                begin: /<\s*lower\s*=/,
                keywords: "lower"
            }, {
                begin: /[<,]\s*upper\s*=/,
                keywords: "upper"
            }, {
                className: "keyword",
                begin: /\btarget\s*\+=/,
                relevance: 10
            }, {
                begin: "~\\s*(" + A.IDENT_RE + ")\\s*\\(",
                keywords: F
            }, {
                className: "number",
                variants: [{
                    begin: /\b\d+(?:\.\d*)?(?:[eE][+-]?\d+)?/
                }, {
                    begin: /\.\d+(?:[eE][+-]?\d+)?\b/
                }],
                relevance: 0
            }, {
                className: "string",
                begin: '"',
                end: '"',
                relevance: 0
            }]
        }
    }
    LoA.exports = E74
});