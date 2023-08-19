function mapToBoolean(value) {
    return value === 'false' ? false : Boolean(value);
}

exports.mapToBoolean = mapToBoolean;