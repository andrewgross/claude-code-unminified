/* chunk:550 bytes:[12881356, 12894310) size:12954 source:unpacked-cli.js */
var N3B = h.object({
        jsonrpc: h.literal(Mk1),
        id: Rk1,
        error: h.object({
            code: h.number().int(),
            message: h.string(),
            data: h.optional(h.unknown())
        })
    }).strict(),
    L3B = (A) => N3B.safeParse(A).success,
    jM = h.union([U3B, w3B, q3B, N3B]),
    rP = uE.strict(),
    Tk1 = SM.extend({
        method: h.literal("notifications/cancelled"),
        params: tZ1.extend({
            requestId: Rk1,
            reason: h.string().optional()
        })
    }),
    AD1 = h.object({
        name: h.string(),
        title: h.optional(h.string())
    }).passthrough(),
    M3B = AD1.extend({
        version: h.string()
    }),
    Pk6 = h.object({
        experimental: h.optional(h.object({}).passthrough()),
        sampling: h.optional(h.object({}).passthrough()),
        elicitation: h.optional(h.object({}).passthrough()),
        roots: h.optional(h.object({
            listChanged: h.optional(h.boolean())
        }).passthrough())
    }).passthrough(),
    GH0 = oV.extend({
        method: h.literal("initialize"),
        params: gE.extend({
            protocolVersion: h.string(),
            capabilities: Pk6,
            clientInfo: M3B
        })
    });
var Sk6 = h.object({
        experimental: h.optional(h.object({}).passthrough()),
        logging: h.optional(h.object({}).passthrough()),
        completions: h.optional(h.object({}).passthrough()),
        prompts: h.optional(h.object({
            listChanged: h.optional(h.boolean())
        }).passthrough()),
        resources: h.optional(h.object({
            subscribe: h.optional(h.boolean()),
            listChanged: h.optional(h.boolean())
        }).passthrough()),
        tools: h.optional(h.object({
            listChanged: h.optional(h.boolean())
        }).passthrough())
    }).passthrough(),
    FH0 = uE.extend({
        protocolVersion: h.string(),
        capabilities: Sk6,
        serverInfo: M3B,
        instructions: h.optional(h.string())
    }),
    Pk1 = SM.extend({
        method: h.literal("notifications/initialized")
    }),
    R3B = (A) => Pk1.safeParse(A).success,
    Sk1 = oV.extend({
        method: h.literal("ping")
    }),
    jk6 = h.object({
        progress: h.number(),
        total: h.optional(h.number()),
        message: h.optional(h.string())
    }).passthrough(),
    jk1 = SM.extend({
        method: h.literal("notifications/progress"),
        params: tZ1.merge(jk6).extend({
            progressToken: z3B
        })
    }),
    kk1 = oV.extend({
        params: gE.extend({
            cursor: h.optional(E3B)
        }).optional()
    }),
    yk1 = uE.extend({
        nextCursor: h.optional(E3B)
    }),
    O3B = h.object({
        uri: h.string(),
        mimeType: h.optional(h.string()),
        _meta: h.optional(h.object({}).passthrough())
    }).passthrough(),
    T3B = O3B.extend({
        text: h.string()
    }),
    P3B = O3B.extend({
        blob: h.string().base64()
    }),
    S3B = AD1.extend({
        uri: h.string(),
        description: h.optional(h.string()),
        mimeType: h.optional(h.string()),
        _meta: h.optional(h.object({}).passthrough())
    }),
    kk6 = AD1.extend({
        uriTemplate: h.string(),
        description: h.optional(h.string()),
        mimeType: h.optional(h.string()),
        _meta: h.optional(h.object({}).passthrough())
    }),
    yk6 = kk1.extend({
        method: h.literal("resources/list")
    }),
    xm = yk1.extend({
        resources: h.array(S3B)
    }),
    _k6 = kk1.extend({
        method: h.literal("resources/templates/list")
    }),
    IH0 = yk1.extend({
        resourceTemplates: h.array(kk6)
    }),
    xk6 = oV.extend({
        method: h.literal("resources/read"),
        params: gE.extend({
            uri: h.string()
        })
    }),
    BD1 = uE.extend({
        contents: h.array(h.union([T3B, P3B]))
    }),
    vk6 = SM.extend({
        method: h.literal("notifications/resources/list_changed")
    }),
    bk6 = oV.extend({
        method: h.literal("resources/subscribe"),
        params: gE.extend({
            uri: h.string()
        })
    }),
    fk6 = oV.extend({
        method: h.literal("resources/unsubscribe"),
        params: gE.extend({
            uri: h.string()
        })
    }),
    hk6 = SM.extend({
        method: h.literal("notifications/resources/updated"),
        params: tZ1.extend({
            uri: h.string()
        })
    }),
    gk6 = h.object({
        name: h.string(),
        description: h.optional(h.string()),
        required: h.optional(h.boolean())
    }).passthrough(),
    uk6 = AD1.extend({
        description: h.optional(h.string()),
        arguments: h.optional(h.array(gk6)),
        _meta: h.optional(h.object({}).passthrough())
    }),
    mk6 = kk1.extend({
        method: h.literal("prompts/list")
    }),
    QD1 = yk1.extend({
        prompts: h.array(uk6)
    }),
    dk6 = oV.extend({
        method: h.literal("prompts/get"),
        params: gE.extend({
            name: h.string(),
            arguments: h.optional(h.record(h.string()))
        })
    }),
    YH0 = h.object({
        type: h.literal("text"),
        text: h.string(),
        _meta: h.optional(h.object({}).passthrough())
    }).passthrough(),
    WH0 = h.object({
        type: h.literal("image"),
        data: h.string().base64(),
        mimeType: h.string(),
        _meta: h.optional(h.object({}).passthrough())
    }).passthrough(),
    JH0 = h.object({
        type: h.literal("audio"),
        data: h.string().base64(),
        mimeType: h.string(),
        _meta: h.optional(h.object({}).passthrough())
    }).passthrough(),
    ck6 = h.object({
        type: h.literal("resource"),
        resource: h.union([T3B, P3B]),
        _meta: h.optional(h.object({}).passthrough())
    }).passthrough(),
    lk6 = S3B.extend({
        type: h.literal("resource_link")
    }),
    j3B = h.union([YH0, WH0, JH0, lk6, ck6]),
    pk6 = h.object({
        role: h.enum(["user", "assistant"]),
        content: j3B
    }).passthrough(),
    XH0 = uE.extend({
        description: h.optional(h.string()),
        messages: h.array(pk6)
    }),
    ik6 = SM.extend({
        method: h.literal("notifications/prompts/list_changed")
    }),
    nk6 = h.object({
        title: h.optional(h.string()),
        readOnlyHint: h.optional(h.boolean()),
        destructiveHint: h.optional(h.boolean()),
        idempotentHint: h.optional(h.boolean()),
        openWorldHint: h.optional(h.boolean())
    }).passthrough(),
    ak6 = AD1.extend({
        description: h.optional(h.string()),
        inputSchema: h.object({
            type: h.literal("object"),
            properties: h.optional(h.object({}).passthrough()),
            required: h.optional(h.array(h.string()))
        }).passthrough(),
        outputSchema: h.optional(h.object({
            type: h.literal("object"),
            properties: h.optional(h.object({}).passthrough()),
            required: h.optional(h.array(h.string()))
        }).passthrough()),
        annotations: h.optional(nk6),
        _meta: h.optional(h.object({}).passthrough())
    }),
    VH0 = kk1.extend({
        method: h.literal("tools/list")
    }),
    ZD1 = yk1.extend({
        tools: h.array(ak6)
    }),
    fe = uE.extend({
        content: h.array(j3B).default([]),
        structuredContent: h.object({}).passthrough().optional(),
        isError: h.optional(h.boolean())
    }),
    nA3 = fe.or(uE.extend({
        toolResult: h.unknown()
    })),
    CH0 = oV.extend({
        method: h.literal("tools/call"),
        params: gE.extend({
            name: h.string(),
            arguments: h.optional(h.record(h.unknown()))
        })
    }),
    sk6 = SM.extend({
        method: h.literal("notifications/tools/list_changed")
    }),
    k3B = h.enum(["debug", "info", "notice", "warning", "error", "critical", "alert", "emergency"]),
    rk6 = oV.extend({
        method: h.literal("logging/setLevel"),
        params: gE.extend({
            level: k3B
        })
    }),
    ok6 = SM.extend({
        method: h.literal("notifications/message"),
        params: tZ1.extend({
            level: k3B,
            logger: h.optional(h.string()),
            data: h.unknown()
        })
    }),
    tk6 = h.object({
        name: h.string().optional()
    }).passthrough(),
    ek6 = h.object({
        hints: h.optional(h.array(tk6)),
        costPriority: h.optional(h.number().min(0).max(1)),
        speedPriority: h.optional(h.number().min(0).max(1)),
        intelligencePriority: h.optional(h.number().min(0).max(1))
    }).passthrough(),
    Ay6 = h.object({
        role: h.enum(["user", "assistant"]),
        content: h.union([YH0, WH0, JH0])
    }).passthrough(),
    By6 = oV.extend({
        method: h.literal("sampling/createMessage"),
        params: gE.extend({
            messages: h.array(Ay6),
            systemPrompt: h.optional(h.string()),
            includeContext: h.optional(h.enum(["none", "thisServer", "allServers"])),
            temperature: h.optional(h.number()),
            maxTokens: h.number().int(),
            stopSequences: h.optional(h.array(h.string())),
            metadata: h.optional(h.object({}).passthrough()),
            modelPreferences: h.optional(ek6)
        })
    }),
    KH0 = uE.extend({
        model: h.string(),
        stopReason: h.optional(h.enum(["endTurn", "stopSequence", "maxTokens"]).or(h.string())),
        role: h.enum(["user", "assistant"]),
        content: h.discriminatedUnion("type", [YH0, WH0, JH0])
    }),
    Qy6 = h.object({
        type: h.literal("boolean"),
        title: h.optional(h.string()),
        description: h.optional(h.string()),
        default: h.optional(h.boolean())
    }).passthrough(),
    Zy6 = h.object({
        type: h.literal("string"),
        title: h.optional(h.string()),
        description: h.optional(h.string()),
        minLength: h.optional(h.number()),
        maxLength: h.optional(h.number()),
        format: h.optional(h.enum(["email", "uri", "date", "date-time"]))
    }).passthrough(),
    Dy6 = h.object({
        type: h.enum(["number", "integer"]),
        title: h.optional(h.string()),
        description: h.optional(h.string()),
        minimum: h.optional(h.number()),
        maximum: h.optional(h.number())
    }).passthrough(),
    Gy6 = h.object({
        type: h.literal("string"),
        title: h.optional(h.string()),
        description: h.optional(h.string()),
        enum: h.array(h.string()),
        enumNames: h.optional(h.array(h.string()))
    }).passthrough(),
    Fy6 = h.union([Qy6, Zy6, Dy6, Gy6]),
    Iy6 = oV.extend({
        method: h.literal("elicitation/create"),
        params: gE.extend({
            message: h.string(),
            requestedSchema: h.object({
                type: h.literal("object"),
                properties: h.record(h.string(), Fy6),
                required: h.optional(h.array(h.string()))
            }).passthrough()
        })
    }),
    HH0 = uE.extend({
        action: h.enum(["accept", "decline", "cancel"]),
        content: h.optional(h.record(h.string(), h.unknown()))
    }),
    Yy6 = h.object({
        type: h.literal("ref/resource"),
        uri: h.string()
    }).passthrough();
var Wy6 = h.object({
        type: h.literal("ref/prompt"),
        name: h.string()
    }).passthrough(),
    Jy6 = oV.extend({
        method: h.literal("completion/complete"),
        params: gE.extend({
            ref: h.union([Wy6, Yy6]),
            argument: h.object({
                name: h.string(),
                value: h.string()
            }).passthrough(),
            context: h.optional(h.object({
                arguments: h.optional(h.record(h.string(), h.string()))
            }))
        })
    }),
    zH0 = uE.extend({
        completion: h.object({
            values: h.array(h.string()).max(100),
            total: h.optional(h.number().int()),
            hasMore: h.optional(h.boolean())
        }).passthrough()
    }),
    Xy6 = h.object({
        uri: h.string().startsWith("file://"),
        name: h.optional(h.string()),
        _meta: h.optional(h.object({}).passthrough())
    }).passthrough(),
    EH0 = oV.extend({
        method: h.literal("roots/list")
    }),
    UH0 = uE.extend({
        roots: h.array(Xy6)
    }),
    Vy6 = SM.extend({
        method: h.literal("notifications/roots/list_changed")
    }),
    aA3 = h.union([Sk1, GH0, Jy6, rk6, dk6, mk6, yk6, _k6, xk6, bk6, fk6, CH0, VH0]),
    sA3 = h.union([Tk1, jk1, Pk1, Vy6]),
    rA3 = h.union([rP, KH0, HH0, UH0]),
    oA3 = h.union([Sk1, By6, Iy6, EH0]),
    tA3 = h.union([Tk1, jk1, ok6, hk6, vk6, sk6, ik6]),
    eA3 = h.union([rP, FH0, zH0, XH0, QD1, xm, IH0, BD1, fe, ZD1]);
class KX extends Error {
    constructor(A, B, Q) {
        super(`MCP error ${A}: ${B}`);
        this.code = A, this.data = Q, this.name = "McpError"
    }
}
var Cy6 = 60000;