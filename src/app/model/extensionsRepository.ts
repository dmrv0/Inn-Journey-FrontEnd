import { Injectable } from '@angular/core';
import { roomExtensionsModel } from './Entities/ExtensionsModel/roomExtensions';
import { hotelExtensionsModel } from './Entities/ExtensionsModel/hotelExtensions';



@Injectable({
  providedIn: 'root' // Servisin tüm uygulamada kullanılabilir olması için root'a eklenir
})
export class ExtensionsRepository {
  
  roomExtensions: roomExtensionsModel[] = [
    { name: '100 Metrekare ferah oda', iconUrl: '/assets/img/roomEx/width.png' },
    { name: 'Ücretsiz Kahvaltı', iconUrl: '/assets/img/roomEx/breakfast.png' },
    { name: 'Ücretsiz Alacarte', iconUrl: '/assets/img/roomEx/hotel.png' },
    { name: 'Gelince Öde', iconUrl: '/assets/img/roomEx/tick.png' },
    { name: 'Ücretsiz Wifi', iconUrl: '/assets/img/roomEx/wifi.png' },
    { name: 'Tek Kişilik Yatak', iconUrl: '/assets/img/roomEx/bed.png' },
    { name: 'Çift Kişilik Yatak', iconUrl: '/assets/img/roomEx/bed.png' },
    { name: 'Kral Yatak', iconUrl: '/assets/img/roomEx/bed.png' },
    { name: 'Ücretsiz Oda Servisi', iconUrl: '/assets/img/roomEx/food-delivery.png' },
    { name: 'Ücretli Oda Servisi', iconUrl: '/assets/img/roomEx/food-delivery.png' },
    { name: 'Ücretsiz Minibar', iconUrl: '/assets/img/roomEx/minibar.png' },
    { name: 'Ücretli Minibar', iconUrl: '/assets/img/roomEx/minibar.png' },
    { name: 'Güvenli Oda Kasası', iconUrl: '/assets/img/roomEx/safe-deposit.png' },
    { name: 'Otel TV', iconUrl: '/assets/img/roomEx/television.png' },
    { name: 'Teras', iconUrl: '/assets/img/roomEx/cafe.png' },
    { name: 'Ses Yalıtımı', iconUrl: '/assets/img/roomEx/waves.png' },
    { name: 'Sauna', iconUrl: '/assets/img/roomEx/sauna.png' },
    { name: 'Ütü ve Ütü Masası', iconUrl: '/assets/img/roomEx/iron.png' },
  ];

    hotelExtensions: hotelExtensionsModel[] = [
      { name: 'VIP Servis', iconUrl: '/assets/img/hotelEx/taxi.png' },
      { name: 'Herşey dahil sistem', iconUrl: '/assets/img/hotelEx/all-inclusive.png'},
      { name: 'Gelince Öde', iconUrl: '/assets/img/roomEx/tick.png' },
      { name: 'Spa', iconUrl: '/assets/img/hotelEx/facial-treatment.png' },
      { name: 'Havuz', iconUrl: '/assets/img/hotelEx/swimming-pool.png' },
      { name: 'Sahil', iconUrl: '/assets/img/hotelEx/vacations.png' },
      { name: 'Sörf', iconUrl: '/assets/img/hotelEx/sea-waves.png' },
      { name: 'Bar', iconUrl: '/assets/img/hotelEx/bar.png' },
      { name: 'Beach Bar', iconUrl: '/assets/img/hotelEx/bar2.png' },
      { name: 'Oda Servisi', iconUrl: '/assets/img/hotelEx/food-serving.png' },
      { name: 'Spor Salonu', iconUrl: '/assets/img/hotelEx/treadmill.png' },
      { name: 'Otopark', iconUrl: '/assets/img/hotelEx/parking.png' },
      { name: 'Oyun Alanı', iconUrl: '/assets/img/hotelEx/play.png' },
      { name: 'Oda Servisi', iconUrl: '/assets/img/hotelEx/food-serving.png' },
      { name: 'Restaurant', iconUrl: '/assets/img/hotelEx/restaurant.png' },
      { name: 'Evcil Hayvan Dostu', iconUrl: '/assets/img/hotelEx/dog.png' },
      { name: 'Kuru Temizleme', iconUrl: '/assets/img/hotelEx/dry-cleaning.png' },
  ];

}