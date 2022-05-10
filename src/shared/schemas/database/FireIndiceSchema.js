class FireIndiceSchema {
    static schema = {
        name: 'FireIndice',
        primaryKey: 'id',
        properties: {
            id: { type: 'int', indexed: true, },
            latitude: 'float',
            longitude: 'float',
            acq_date: 'string',
            acq_datetime: 'string',
            active: 'bool',
            userCreated: 'bool',
            daynight: 'string',
            WKT: 'string'
        }
    };
}

export default FireIndiceSchema;
