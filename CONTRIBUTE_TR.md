# VortexSMS'ye Katkida Bulunma

VortexSMS'ye katkida bulunmak istediginiz icin tesekkurler! Bu kilavuz baslamaniza yardimci olacaktir.

## Icindekiler

- [Davranis Kurallari](#davranis-kurallari)
- [Baslarken](#baslarken)
- [Gelistirme Ortami](#gelistirme-ortami)
- [Nasil Katkida Bulunulur](#nasil-katkida-bulunulur)
- [Commit Kurallari](#commit-kurallari)
- [Pull Request Sureci](#pull-request-sureci)
- [Proje Yapisi](#proje-yapisi)
- [Yeni Ozellik Ekleme](#yeni-ozellik-ekleme)

## Davranis Kurallari

- Saygili ve kapsayici olun
- Yapici geri bildirime odaklanin
- Baskalarinin ogrenmesine ve gelismesine yardimci olun
- Tartismalari profesyonel tutun

## Baslarken

### Gereksinimler

- **Node.js** 12.0 veya uzeri
- **npm** (Node.js ile birlikte gelir)
- **Git** surum kontrolu icin

### Gelistirme Ortami

```bash
# 1. GitHub'da repoyu fork edin

# 2. Fork'unuzu klonlayin
git clone https://github.com/KULLANICI_ADINIZ/Vortex-SMS-Bomber.git
cd Vortex-SMS-Bomber

# 3. Upstream remote ekleyin
git remote add upstream https://github.com/XeldarAlz/Vortex-SMS-Bomber.git

# 4. CLI icin bagimliliklari yukleyin
npm install

# 5. Desktop uygulamasi icin bagimliliklari yukleyin
cd desktop
npm install

# 6. Gelistirme modunda calistirin
npm start           # Masaustu uygulamasi
npm run start:dev   # DevTools ile masaustu uygulamasi
```

### Masaustu Uygulamasini Derleme

```bash
cd desktop
npm run build:win   # Windows installer ve portable derle
```

Cikti dosyalari `desktop/build/` klasorunde olacaktir.

## Nasil Katkida Bulunulur

### Hata Bildirimi

Issue olusturmadan once:
1. **Mevcut issue'lari arayin** - tekrarlari onleyin
2. **En son surume guncelleyin** ve hatanin hala var olup olmadigini kontrol edin

Issue olustururken sunlari ekleyin:
- **Net baslik** - sorunu aciklayan
- **Yeniden uretme adimlari**
- **Beklenen davranis** vs **gerceklesen davranis**
- **Ekran goruntuleri veya loglar** (varsa)
- **Ortam bilgisi**: Isletim sistemi, uygulama surumu, Node.js surumu

### Ozellik Onerisi

`enhancement` etiketi ile issue acin:
- Gormek istediginiz **ozelligi aciklayin**
- **Neden** faydali olacagini belirtin
- Mumkunse **ornekler** veya mockup'lar saglayin
- Uygulama **zorluklarini goz onunde bulundurun**

### Dokumantasyon Iyilestirme

- Yazim hatalarini duzeltin veya mevcut dokumanlari netlestirin
- Ornekler veya egitimler ekleyin
- Diger dillere cevirin
- Guncel olmayan bilgileri guncelleyin

### Kod Gonderme

1. Uzerinde calisacak bir **issue bulun** (veya olusturun)
2. Uzerinde calistiginizi **yorum yazarak belirtin**
3. **Fork ve branch olusturun** (asagidaki is akisina bakin)
4. Stil kilavuzumuza uygun **kod yazin**
5. Gondermeden once **kapsamli test edin**
6. **Pull Request olusturun**

## Commit Kurallari

Net gecmis icin [Conventional Commits](https://www.conventionalcommits.org/) kullaniyoruz.

### Format

```
<tip>(<kapsam>): <aciklama>

[istege bagli govde]

[istege bagli altbilgi]
```

### Tipler

| Tip | Aciklama |
|-----|----------|
| `feat` | Yeni ozellik |
| `fix` | Hata duzeltme |
| `docs` | Dokumantasyon degisiklikleri |
| `style` | Kod formatlama (mantik degisikligi yok) |
| `refactor` | Kod yeniden yapilandirma |
| `perf` | Performans iyilestirmeleri |
| `test` | Test ekleme veya duzeltme |
| `chore` | Bakim, bagimliliklar |
| `ci` | CI/CD degisiklikleri |

### Kapsamlar (istege bagli)

- `core` - Cekirdek bombalama mantigi
- `ui` - Kullanici arayuzu
- `desktop` - Electron uygulamasi
- `services` - SMS servisleri
- `locales` - Ceviriler
- `build` - Derleme sistemi

### Ornekler

```bash
# Yeni ozellik
git commit -m "feat(services): yeni SMS servis saglayici ekle"

# Hata duzeltme
git commit -m "fix(ui): tiklamada butonun yanit vermeme sorununu duzelt"

# Dokumantasyon
git commit -m "docs: kurulum talimatlarini guncelle"

# Kirici degisiklik
git commit -m "feat(core)!: API yanit formatini degistir

BREAKING CHANGE: Yanit artik dizi yerine obje donduruyor"
```

## Pull Request Sureci

### Branch Isimlendirme

```
feature/kisa-aciklama    # Yeni ozellikler
fix/sorun-aciklamasi     # Hata duzeltmeleri
docs/ne-degisti          # Dokumantasyon
refactor/ne-yeniden-yapildi  # Yeniden yapilandirma
```

### Is Akisi

```bash
# 1. Upstream ile senkronize edin
git checkout main
git fetch upstream
git merge upstream/main

# 2. Ozellik branch'i olusturun
git checkout -b feature/ozelliginiz

# 3. Degisiklik yapin ve commit edin
git add .
git commit -m "feat: ozellik aciklamaniz"

# 4. Fork'unuza push edin
git push origin feature/ozelliginiz

# 5. GitHub'da Pull Request olusturun
```

### PR Kontrol Listesi

Gondermeden once sunlardan emin olun:

- [ ] Kod mevcut stile uyuyor
- [ ] Degisiklikler yerel olarak test edildi
- [ ] Gerekirse dokumantasyon guncellendi
- [ ] Commit mesajlari kurallara uyuyor
- [ ] PR basligi net ve aciklayici
- [ ] PR aciklamasi degisiklikleri acikliyor

### PR Aciklama Sablonu

```markdown
## Bu PR ne yapiyor?

Degisikliklerin kisa aciklamasi.

## Neden gerekli?

Motivasyonu aciklayin.

## Nasil test edilir?

Degisikliklerin calistigini dogrulamak icin adimlar.

## Ekran goruntuleri (varsa)

UI degisiklikleri icin ekran goruntuleri ekleyin.

## Ilgili Issue'lar

Closes #123
```

## Proje Yapisi

```
Vortex-SMS-Bomber/
├── src/                    # Paylasilan kaynak kod
│   ├── core/               # Cekirdek bombalama mantigi
│   │   └── bomber.js       # Ana bomber fonksiyonu
│   ├── locales/            # Dil dosyalari
│   │   ├── en.js           # Ingilizce
│   │   ├── tr.js           # Turkce
│   │   └── index.js        # Dil yoneticisi
│   ├── services/           # SMS servis tanimlamalari
│   │   ├── categories/     # Kategoriye gore servisler
│   │   │   ├── food.js     # Yemek teslimat servisleri
│   │   │   ├── retail.js   # Perakende servisleri
│   │   │   ├── transport.js # Ulasim
│   │   │   ├── utilities.js # Fayda servisleri
│   │   │   └── other.js    # Cesitli
│   │   ├── helpers.js      # Paylasilan yardimci fonksiyonlar
│   │   └── index.js        # Servis koleksiyonu
│   ├── ui/                 # CLI arayuz bilesenleri
│   └── utils/              # Yardimci fonksiyonlar
│       ├── logger.js       # Loglama yardimcisi
│       └── request-handler.js # HTTP istek isleyici
│
├── desktop/                # Electron masaustu uygulamasi
│   ├── assets/             # Ikonlar ve ses
│   │   ├── audio/          # Ses efektleri
│   │   ├── icon.ico        # Windows ikonu
│   │   └── icon.png        # Uygulama ikonu
│   ├── renderer/           # Frontend kodu
│   │   ├── app.js          # Ana uygulama mantigi
│   │   ├── locales.js      # Arayuz cevirileri
│   │   └── ...             # Diger arayuz modulleri
│   ├── src/                # Paylasilan src kopyasi (derleme icin)
│   ├── main.js             # Electron ana surec
│   ├── preload.js          # IPC koprusu
│   ├── index.html          # Ana arayuz
│   ├── styles.css          # Stil dosyasi
│   └── package.json        # Masaustu uygulama yapilandirmasi
│
├── index.js                # CLI giris noktasi
├── package.json            # Proje yapilandirmasi
└── README.md               # Dokumantasyon
```

## Yeni Ozellik Ekleme

### Yeni SMS Servisi Ekleme

1. `src/services/categories/` icinde uygun kategoriyi secin
2. Servis fonksiyonunuzu ekleyin:

```javascript
// src/services/categories/other.js
async function yeniServis(phone) {
    const url = 'https://api.example.com/sms';
    const data = {
        phone: phone,
        // ... diger gerekli alanlar
    };
    
    return await makeRequest(url, 'POST', data, {
        'Content-Type': 'application/json'
    });
}

module.exports = {
    // ... mevcut export'lar
    yeniServis
};
```

3. `src/services/index.js`'de kaydedin:

```javascript
const services = [
    // ... mevcut servisler
    { name: 'YeniServis', fn: other.yeniServis }
];
```

### Yeni Dil Ekleme

1. `src/locales/xx.js` olusturun (`xx`'i dil koduyla degistirin)
2. `en.js`'den yapiyi kopyalayin ve tum stringleri cevirin
3. `src/locales/index.js`'de kaydedin:

```javascript
const xx = require('./xx');

const languages = {
    en,
    tr,
    xx  // Yeni dil ekle
};
```

4. `desktop/renderer/locales.js`'i arayuz cevirileriyle guncelleyin

### Arayuz Ozellikleri Ekleme

1. Mantik icin `desktop/renderer/app.js`'i guncelleyin
2. Yapi icin `desktop/index.html`'i guncelleyin
3. Stil icin `desktop/styles.css`'i guncelleyin
4. Ceviriler icin `desktop/renderer/locales.js`'i guncelleyin

## Sorulariniz mi var?

- [Discussion](https://github.com/XeldarAlz/Vortex-SMS-Bomber/discussions) acin
- Mevcut [Issues](https://github.com/XeldarAlz/Vortex-SMS-Bomber/issues)'lari kontrol edin

Katkilariniz icin tesekkurler!
