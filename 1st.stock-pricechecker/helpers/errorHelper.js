'use strict';

function prepareErrorPayload(message, status = 400) {
    return {
        message,
        status
    };
}

function createErrorMessage(message, field) {
    return `${message}: ${field}`;
}

exports.prepareErrorPayload = prepareErrorPayload;
exports.createErrorMessage = createErrorMessage;