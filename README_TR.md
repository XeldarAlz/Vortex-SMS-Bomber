# VortexSMS

[![Versiyon](https://img.shields.io/badge/versiyon-1.0.0-blue.svg)](https://github.com/XeldarAlz/Vortex-SMS-Bomber/releases)
[![Lisans](https://img.shields.io/badge/lisans-Ticari%20Olmayan-red.svg)](LICENSE)
[![Node.js](https://img.shields.io/badge/node.js-%3E%3D12.0-brightgreen.svg)](https://nodejs.org/)
[![Platform](https://img.shields.io/badge/platform-Windows-blue.svg)]()
[![Sponsor](https://img.shields.io/badge/sponsor-30363D?style=flat-square&logo=GitHub-Sponsors&logoColor=#EA4AAA)](https://github.com/sponsors/XeldarAlz)

> **Dil**: [English](README.md) | [Türkçe](README_TR.md)

```
██╗   ██╗ ██████╗ ██████╗ ████████╗███████╗██╗  ██╗    ███████╗███╗   ███╗███████╗
██║   ██║██╔═══██╗██╔══██╗╚══██╔══╝██╔════╝╚██╗██╔╝    ██╔════╝████╗ ████║██╔════╝
██║   ██║██║   ██║██████╔╝   ██║   █████╗   ╚███╔╝     ███████╗██╔████╔██║███████╗
╚██╗ ██╔╝██║   ██║██╔══██╗   ██║   ██╔══╝   ██╔██╗     ╚════██║██║╚██╔╝██║╚════██║
 ╚████╔╝ ╚██████╔╝██║  ██║   ██║   ███████╗██╔╝ ██╗    ███████║██║ ╚═╝ ██║███████║
  ╚═══╝   ╚═════╝ ╚═╝  ╚═╝   ╚═╝   ╚══════╝╚═╝  ╚═╝    ╚══════╝╚═╝     ╚═╝╚══════╝
```

## VortexSMS Nedir?

VortexSMS bircok farkli servis uzerinden ayni anda SMS mesajlari gonderen bir aractir. SMS sistemlerini test etmek veya ogrenme amacli kullanabilirsiniz.

## Ozellikler

- Turkce ve Ingilizce dil destegi
- Modern arayuzlu Windows masaustu uygulamasi
- 50'den fazla SMS servisi destegi
- Mesajlar arasi ayarlanabilir gecikme
- Gercek zamanli ilerleme ve istatistikler
- GitHub releases uzerinden otomatik guncelleme
- Guzel terminal tarzi arayuz
- Ses efektleri ve arka plan muzigi

## Ekran Goruntuleri

<div align="center">
  <img src="screenshots/app.png" alt="Masaustu Uygulamasi" width="800"/>
</div>

## Kurulum

### Windows Masaustu Uygulamasi (Onerilen)

En son surumu [Releases](https://github.com/XeldarAlz/Vortex-SMS-Bomber/releases) sayfasindan indirin:

| Dosya | Aciklama |
|-------|----------|
| `VortexSMS-Setup-x.x.x.exe` | Kurulum dosyasi (onerilen) |
| `VortexSMS-Portable-x.x.x.exe` | Tasinabilir surum (kurulum gerektirmez) |

Uygulama **otomatik guncelleme** ozelligine sahiptir - yeni surum ciktiginda bildirim alirsiniz.

### Terminal Versiyonu (Windows/Mac/Linux)

Komut satiri kullanimi veya gelistirme icin:

**Gereksinimler**: Node.js 12.0 veya uzeri

```bash
# Repoyu klonlayin
git clone https://github.com/XeldarAlz/Vortex-SMS-Bomber.git
cd Vortex-SMS-Bomber

# Bagimliliklari yukleyin
npm install

# Terminal versiyonunu calistirin
npm start
```

## Nasil Kullanilir

### Masaustu Uygulamasi

1. [Releases](https://github.com/XeldarAlz/Vortex-SMS-Bomber/releases) sayfasindan indirin ve kurun
2. Uygulamayi baslatin
3. Dilinizi secin (Turkce veya Ingilizce)
4. Hedef telefon numarasini girin (10 hane, 5 ile baslayan)
5. Gonderilecek mesaj sayisini belirleyin
6. Isterseniz mesajlar arasi gecikme ayarlayin
7. **SALDIRIYI BASLAT** butonuna tiklayin ve ilerlemeyi izleyin

### Terminal Versiyonu

```bash
npm start
# veya
node index.js
```

Ekrandaki yonergeleri takip ederek yapilandirin ve calistirin.

## Gelistirme

### Kaynaktan Derleme

```bash
# Projeyi klonlayin ve girin
git clone https://github.com/XeldarAlz/Vortex-SMS-Bomber.git
cd Vortex-SMS-Bomber

# Desktop bagimliliklarini yukleyin
cd desktop
npm install

# Gelistirme modunda calistirin
npm start

# Windows calistirilabilir dosyalarini derleyin
npm run build:win
```

Derleme ciktisi `desktop/build/` klasorunde:
- `VortexSMS-Setup-x.x.x.exe` - NSIS kurulum dosyasi
- `VortexSMS-Portable-x.x.x.exe` - Tasinabilir calistirilabilir
- `latest.yml` - Otomatik guncelleyici manifest dosyasi

## Katkida Bulunma

Katkilarinizi bekliyoruz! Detayli kilavuz icin [CONTRIBUTE_TR.md](CONTRIBUTE_TR.md) dosyasina bakin.

## Yasal Uyari

**UYARI: Bu arac yalnizca egitim amaclidir.**

- Yerel yasa ve duzenlemelere uyun
- Herhangi bir sistemi test etmeden once izin alin
- Baskalarini rahatsiz etmek veya zarar vermek icin kullanmayin
- Yetkisiz kullanim yasal sonuclar dogurabilir

Gelistiriciler bu yazilimin herhangi bir kotuye kullanimindan sorumlu degildir.

## Lisans

Bu proje **Ticari Olmayan Lisans** altindadir. Ticari kullanim yasaktir. Detaylar icin [LICENSE](LICENSE) dosyasina bakin.

## Destek

- **Hata bildirimleri**: [Issue acin](https://github.com/XeldarAlz/Vortex-SMS-Bomber/issues)
- **Sorular**: [GitHub Discussions](https://github.com/XeldarAlz/Vortex-SMS-Bomber/discussions)
- **Projeyi begendiziniz mi?** Yildiz verin!

## Sponsorlar

VortexSMS'in gelistirilmesini destekleyin:

[![Sponsor](https://img.shields.io/badge/Sponsor-EA4AAA?style=for-the-badge&logo=github-sponsors&logoColor=white)](https://github.com/sponsors/XeldarAlz)
