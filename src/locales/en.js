/**
 * VortexSMS - English Locale
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

module.exports = {
    code: 'en',
    name: 'English',
    
    menu: {
        selectLanguage: 'Select Language',
        english: 'English',
        turkish: 'Turkish',
        enterChoice: 'Enter your choice'
    },
    
    prompts: {
        enterPhone: 'Enter target phone number (5XXXXXXXXX)',
        enterAmount: 'How many SMS bombs to deploy',
        enterDelay: 'Delay between requests in seconds (Enter for no delay)',
        invalidNumber: 'Please enter a valid number',
        phoneRequired: 'Phone number required',
        payloadRequired: 'Payload count required',
        invalidPhone: 'Invalid phone format. Use 5XXXXXXXXX (10 digits)'
    },
    
    status: {
        missionStarted: 'MISSION STARTED - SMS BOMBING IN PROGRESS',
        deploying: 'Deploying {amount} SMS bombs to target: +90{phone}',
        delayInfo: '{delay}s delay',
        noDelay: 'no delay',
        hit: 'HIT',
        miss: 'MISS',
        deployed: 'DEPLOYED',
        failed: 'FAILED',
        target: 'Target'
    },
    
    results: {
        missionComplete: 'MISSION COMPLETE',
        operationSummary: 'OPERATION SUMMARY',
        duration: 'Duration',
        seconds: 'seconds',
        targetHit: 'Target',
        totalAttempts: 'Total Attempts',
        successful: 'Successful',
        failed: 'Failed',
        successRate: 'Success Rate',
        avgResponseTime: 'Avg Response Time'
    },
    
    banner: {
        operationParams: 'OPERATION PARAMETERS',
        targetIdentifier: 'TARGET IDENTIFIER',
        payloadQuantity: 'PAYLOAD QUANTITY',
        requestDelay: 'REQUEST DELAY',
        smsBombs: 'SMS Bombs',
        perRequest: 'per request',
        maxSpeed: 'MAX SPEED',
        warning: 'WARNING: UNAUTHORIZED USE IS STRICTLY PROHIBITED',
        disclaimer: 'THIS IS FOR EDUCATIONAL PURPOSES ONLY - USE AT YOUR OWN RISK',
        protocol: 'PROTOCOL',
        protocolType: 'HTTPS/API',
        status: 'STATUS',
        readyStatus: 'READY TO DEPLOY',
        randomMessages: [
            'Initializing kernel modules...',
            'Bypassing security protocols...',
            'Establishing encrypted tunnel...',
            'Loading payload vectors...',
            'Configuring attack parameters...',
            'Obfuscating network signature...',
            'Disabling trace routes...',
            'Activating anonymous proxies...',
            'System primed and ready...',
            'Establishing connection pool...',
            'Loading service endpoints...',
            'Validating target parameters...',
            'Scanning available resources...',
            'Synchronizing with remote servers...',
            'Preparing deployment sequence...'
        ],
        loadingMessages: [
            'Loading spammer arsenal',
            'Initializing service connections',
            'Preparing SMS payloads',
            'Establishing network links',
            'Loading target database',
            'Synchronizing protocols',
            'Preparing attack vectors',
            'Initializing command center',
            'Loading service endpoints',
            'Preparing deployment system'
        ]
    },
    
    labels: {
        bomber: 'BOMBER',
        payload: 'PAYLOAD',
        delay: 'DELAY',
        error: 'ERROR',
        system: 'SYSTEM'
    }
};
