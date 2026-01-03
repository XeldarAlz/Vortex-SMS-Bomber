const { createServiceHandler } = require('../utils/request-handler');
const foodServices = require('./categories/food');
const retailServices = require('./categories/retail');
const transportServices = require('./categories/transport');
const utilityServices = require('./categories/utilities');
const otherServices = require('./categories/other');

const services = [
    ...foodServices,
    ...retailServices,
    ...transportServices,
    ...utilityServices,
    ...otherServices
];

let cachedHandlers = null;
let cachedOnLog = null;

function initializeServices(onLog) {
    if (cachedHandlers && cachedOnLog === onLog) {
        return cachedHandlers;
    }
    
    cachedOnLog = onLog;
    cachedHandlers = services.map(config => ({
        handler: createServiceHandler(config, onLog),
        name: config.serviceName
    }));
    
    return cachedHandlers;
}

function getServiceStats() {
    return {
        total: services.length,
        food: foodServices.length,
        retail: retailServices.length,
        transport: transportServices.length,
        utilities: utilityServices.length,
        other: otherServices.length
    };
}

module.exports = {
    services,
    initializeServices,
    getServiceStats
};
