class FireIndiceSchema {
    static schema = {
        name: 'FireIndice',
        primaryKey: 'id',
        properties: {
            id: { type: 'int', indexed: true, },
            latitude: 'float',
            longitude: 'float',
            acq_date: 'string',
            acq_time: 'string',
            active: 'bool',
            daynight: 'string'
        }
    }
}

export default FireIndiceSchema;
