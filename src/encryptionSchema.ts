const encryptionSchema = {
    account: {
        name: "string",
        type: "string",
        openingBalance: "integer",
        interest: "integer",
        createdAt: "string",
        updatedAt: "string",
        transactions: ["transaction"]
    },
    transaction: {
        amount: "integer",
        date: "string",
        description: "string",
        notes: "string",
        type: "string",
        createdAt: "string",
        updatedAt: "string"
    },
    recurringTransaction: {
        amount: "integer",
        description: "string",
        notes: "string",
        type: "string",
        interval: "integer",
        freq: "string",
        on: "integer",
        startDate: "string",
        endDate: "string",
        count: "integer",
        neverEnds: "boolean",
        lastRealizedDate: "string",
        createdAt: "string",
        updatedAt: "string"
    },
    importProfile: {
        name: "string",
        importProfileMappings: ["importProfileMapping"],
        createdAt: "string",
        updatedAt: "string"
    },
    importProfileMapping: {
        from: "string",
        to: "string",
        createdAt: "string",
        updatedAt: "string"
    },
    importRule: {
        createdAt: "string",
        updatedAt: "string",
        importRuleActions: ["importRuleAction"],
        importRuleConditions: ["importRuleCondition"]
    },
    importRuleAction: {
        property: "string",
        value: "string",
        createdAt: "string",
        updatedAt: "string"
    },
    importRuleCondition: {
        condition: "string",
        property: "string",
        value: "string",
        createdAt: "string",
        updatedAt: "string"
    },
    preference: {
        currency: "string"
    }
} as const;

export default encryptionSchema;
