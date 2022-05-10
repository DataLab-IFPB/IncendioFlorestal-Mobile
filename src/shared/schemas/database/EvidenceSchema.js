class EvidenceSchema {
    static schema = {
        name: 'Evidence',
        primaryKey: 'id',
        properties: {
            id: { type: 'int', indexed: true, },
            path: 'string',
            media: 'string',
        }
    };
}

export default EvidenceSchema;
