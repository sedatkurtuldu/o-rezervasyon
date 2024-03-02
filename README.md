# O'Rezervasyon Projesi Teknik Dökümantasyonu

## Genel Bakış
O’Rezervasyon projesi, kullanıcıların çeşitli otellere rezervasyon yapmalarını ve bu otellerle ilgili bilgileri takip etmelerini sağlayan bir mobil uygulamadır. Proje, React Native kullanılarak geliştirilmiştir ve Expo platformunu temel alır.

## Kullanılan Teknolojiler
### Ana Teknolojiler
- **React Native:** Mobil uygulama geliştirmek için kullanılan bir JavaScript kütüphanesidir.
- **Expo:** React Native projelerini kolayca geliştirmek ve dağıtmak için bir platform sağlar.

### Bağımlılıklar
- `@firebase/auth (^1.6.0)`: Firebase kimlik doğrulama işlemleri için kullanılır.
- `@gorhom/bottom-sheet (^4.6.0)`: Alt tabaka bileşenleri oluşturmak için kullanılan bir kütüphanedir.
- `@react-native-async-storage/async-storage (^1.21.0)`: Veri depolama için kullanılır.
- `@react-native-firebase/firestore (^18.8.0)`: Firestore veritabanı ile etkileşim sağlar.
- `@react-native-firebase/storage (^18.8.0)`: Firebase Storage ile medya dosyalarını yönetir.
- `@react-navigation/bottom-tabs (^6.5.11)`: Tab navigasyonunu sağlayan bir kütüphanedir.
- `@react-navigation/native (^6.1.9)`: Navigasyon için kullanılan bir kütüphanedir.
- `@react-navigation/native-stack (^6.9.17)`: Stack navigasyonunu sağlayan bir kütüphanedir.
- `@react-navigation/stack (^6.3.20)`: Stack navigasyonunu sağlayan bir kütüphanedir.
- `@reduxjs/toolkit (^2.1.0)`: Redux state yönetimini kolaylaştıran bir kütüphanedir.
- `expo (~50.0.8)`: Expo platformunu kullanarak mobil uygulama geliştirmek için kullanılır.
- `expo-checkbox (^2.7.0)`: Checkbox bileşenini sağlayan bir kütüphanedir.
- `expo-location (16.5.5)`: Konum hizmetlerini kullanmak için kullanılır.
- `expo-status-bar (~1.11.1)`: Durum çubuğunu yöneten bir bileşen kütüphanesidir.
- `firebase (^10.8.0)`: Firebase hizmetlerine erişim sağlar.
- `moment (^2.30.1)`: Tarih ve saat işlemleri için kullanılır.
- `react-native-calendar-range-picker (^1.5.8)`: Takvim aralığı seçimini sağlayan bir bileşen kütüphanesidir.
- `react-native-calendars (^1.1303.0)`: Takvim bileşenini sağlayan bir kütüphanedir.
- `react-native-gesture-handler (~2.14.0)`: Dokunma etkileşimlerini yönetmek için kullanılır.
- `react-native-maps (1.10.0)`: Harita bileşenini sağlayan bir kütüphanedir.
- `react-native-reanimated (~3.6.2)`: Animasyonlar için kullanılır.
- `react-native-reanimated-carousel (^3.5.1)`: Carousel (kaydırılabilir slayt) bileşenini sağlayan bir kütüphanedir.
- `react-native-safe-area-context (4.8.2)`: Güvenli alanı sağlayan bir kütüphanedir.
- `react-native-screens (~3.29.0)`: Ekran yönetimi için kullanılır.
- `react-redux (^9.1.0)`: React uygulamalarında Redux kullanımını sağlar.

### Geliştirme Bağımlılıkları
- `@babel/core`: Babel, JavaScript kodunu ES5'e dönüştürmek için kullanılır.

## Çalıştırma ve Geliştirme
Proje, Expo CLI üzerinde geliştirilmiştir. Aşağıdaki komutlarla proje çalıştırılabilir:

- `yarn`: package.json içerisinde kaydı bulunan bağımlılıkları yükler.
- `yarn android`: Android için geliştirme sunucusunu başlatır.
- `yarn ios`: iOS için geliştirme sunucusunu başlatır.
- `yarn web`: Web için geliştirme sunucusunu başlatır.

Not: proje ilk çalıştırıldığında veya git pull işlemi gerçekleştirildiğinde package.json içerisinde bir değişiklik varsa “yarn” komutu çalıştırılmalıdır.

## Önemli Notlar
- Proje, Firebase kimlik doğrulaması ve Firestore veritabanı gibi Firebase hizmetlerini kullanır.
- Expo, proje geliştirme sürecini kolaylaştırmak için kullanılan bir platformdur.
- Proje, Redux ve React Navigation gibi popüler React Native kütüphanelerini içerir.

Detaylı bilgi için projenin kaynak kodunu inceleyebilirsiniz: [O'Rezervasyon GitHub Repository](https://github.com/sedatkurtuldu/o-rezervasyon)
