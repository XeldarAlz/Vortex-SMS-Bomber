/**
 * VortexSMS - Turkish Locale
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
    code: 'tr',
    name: 'Türkçe',
    
    menu: {
        selectLanguage: 'Dil Seçin',
        english: 'İngilizce',
        turkish: 'Türkçe',
        enterChoice: 'Seçiminizi girin'
    },
    
    prompts: {
        enterPhone: 'Hedef telefon numarasını girin (5XXXXXXXXX)',
        enterAmount: 'Kaç SMS bombası gönderilsin',
        enterDelay: 'İstekler arası gecikme (saniye) (Enter = gecikme yok)',
        invalidNumber: 'Lütfen geçerli bir sayı girin',
        phoneRequired: 'Telefon numarası gerekli',
        payloadRequired: 'Bomba sayısı gerekli',
        invalidPhone: 'Geçersiz telefon formatı. 5XXXXXXXXX (10 hane) kullanın'
    },
    
    status: {
        missionStarted: 'GÖREV BAŞLADI - SMS BOMBALAMA DEVAM EDİYOR',
        deploying: '{amount} SMS bombası hedefe gönderiliyor: +90{phone}',
        delayInfo: '{delay}s gecikme',
        noDelay: 'gecikme yok',
        hit: 'İSABET',
        miss: 'ISKALADI',
        deployed: 'GÖNDERİLDİ',
        failed: 'BAŞARISIZ',
        target: 'Hedef'
    },
    
    results: {
        missionComplete: 'GÖREV TAMAMLANDI',
        operationSummary: 'OPERASYON ÖZETİ',
        duration: 'Süre',
        seconds: 'saniye',
        targetHit: 'Hedef',
        totalAttempts: 'Toplam Deneme',
        successful: 'Başarılı',
        failed: 'Başarısız',
        successRate: 'Başarı Oranı',
        avgResponseTime: 'Ort. Yanıt Süresi'
    },
    
    banner: {
        operationParams: 'OPERASYON PARAMETRELERİ',
        targetIdentifier: 'HEDEF NUMARASI',
        payloadQuantity: 'BOMBA MİKTARI',
        requestDelay: 'İSTEK GECİKMESİ',
        smsBombs: 'SMS Bombası',
        perRequest: 'istek başına',
        maxSpeed: 'MAKSİMUM HIZ',
        warning: 'UYARI: YETKİSİZ KULLANIM KESİNLİKLE YASAKTIR',
        disclaimer: 'BU YALNIZCA EĞİTİM AMAÇLIDIR - KULLANIM SİZİN SORUMLULUĞUNUZDADIR',
        protocol: 'PROTOKOL',
        protocolType: 'HTTPS/API',
        status: 'DURUM',
        readyStatus: 'DAĞITIMA HAZIR',
        randomMessages: [
            'Kernel modülleri başlatılıyor...',
            'Güvenlik protokolleri aşılıyor...',
            'Şifreli tünel kuruluyor...',
            'Yük vektörleri yükleniyor...',
            'Saldırı parametreleri yapılandırılıyor...',
            'Ağ imzası gizleniyor...',
            'İz takibi devre dışı bırakılıyor...',
            'Anonim proxy\'ler etkinleştiriliyor...',
            'Sistem hazır ve aktif...',
            'Bağlantı havuzu kuruluyor...',
            'Servis uç noktaları yükleniyor...',
            'Hedef parametreleri doğrulanıyor...',
            'Mevcut kaynaklar taranıyor...',
            'Uzak sunucularla senkronize ediliyor...',
            'Dağıtım sırası hazırlanıyor...'
        ],
        loadingMessages: [
            'Spammer cephanesi yükleniyor',
            'Servis bağlantıları başlatılıyor',
            'SMS yükleri hazırlanıyor',
            'Ağ bağlantıları kuruluyor',
            'Hedef veritabanı yükleniyor',
            'Protokoller senkronize ediliyor',
            'Saldırı vektörleri hazırlanıyor',
            'Komuta merkezi başlatılıyor',
            'Servis uç noktaları yükleniyor',
            'Dağıtım sistemi hazırlanıyor'
        ]
    },
    
    labels: {
        bomber: 'BOMBER',
        payload: 'BOMBA',
        delay: 'GECİKME',
        error: 'HATA',
        system: 'SİSTEM'
    }
};
