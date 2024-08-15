import { Component, OnInit } from '@angular/core';
import { HotelService } from '../services/hotel.service';
import { HotelModal } from '../model/Entities/hotelmodal';
import { User } from '../model/user';
import { LocalStorageService } from '../services/localstorage.service';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-hotels',
  templateUrl: './hotels.component.html',
  styleUrl: './hotels.component.scss'
})
export class HotelsComponent implements OnInit {


  hotel: HotelModal[] = [];
  filterText: string = "";
  Filteredhotel: HotelModal[];
  currentPageNo: number;
  totalPageCount: number;
  totalCount: number;
  pageSize: number = 12;
  pageList: number[] = [];
  checkInDate: Date | null = null;
  checkOutDate: Date | null = null;
maxStar:boolean = null;
maxPrice:boolean = null;
dateSearch:boolean=false;
bosHotel:HotelModal[];

loading:boolean= false


  constructor(
    private hotelService: HotelService,
    private activatedRoute: ActivatedRoute,
  ) {
  }


      // #region Service
      ngOnInit() {
        console.log(this.maxPrice);
      
        this.activatedRoute.params.subscribe({
          next: async (params) => {
            this.currentPageNo = parseInt(params["pageNo"] ?? '1');
            this.loading = true; // Başlangıçta loading'i true yap
      
            if (this.dateSearch) {
              this.hotelService.getHotelsDate(this.checkInDate, this.checkOutDate, this.currentPageNo - 1, this.pageSize).subscribe({
                next: (response) => {
                  console.log(response);
                  this.Filteredhotel = response.hotels;
                  this.totalCount = response.hotels.length > 0 ? response.totalCount : 0;
                  this.totalPageCount = Math.ceil(this.totalCount / this.pageSize);
                  this.pageList = this.calculatePageList();
                  console.log("TEST" + this.checkInDate);
                  console.log(this.checkOutDate);
                },
                error: (error) => {
                  console.error('Hata:', error);
                },
                complete: () => {
                  this.loading = false; // İşlem tamamlandığında loading'i false yap
                }
              });
            } else if (this.maxPrice != null) {
              this.hotelService.getHotels(null, this.currentPageNo - 1, this.pageSize, this.maxPrice).subscribe({
                next: (data) => {
                  this.hotel = data;
                  this.Filteredhotel = this.hotel;
                  this.totalCount = data.length > 0 ? data[0].totalCount : 0;
                  this.totalPageCount = Math.ceil(this.totalCount / this.pageSize);
                  this.pageList = this.calculatePageList();
                },
                error: (error) => {
                  console.error('Hata:', error);
                },
                complete: () => {
                  this.loading = false; // İşlem tamamlandığında loading'i false yap
                }
              });
            } else if (this.maxStar != null) {
              this.hotelService.getHotels(this.maxStar, this.currentPageNo - 1, this.pageSize, null).subscribe({
                next: (data) => {
                  this.hotel = data;
                  this.Filteredhotel = this.hotel;
                  this.totalCount = data.length > 0 ? data[0].totalCount : 0;
                  this.totalPageCount = Math.ceil(this.totalCount / this.pageSize);
                  this.pageList = this.calculatePageList();
                },
                error: (error) => {
                  console.error('Hata:', error);
                },
                complete: () => {
                  this.loading = false; // İşlem tamamlandığında loading'i false yap
                }
              });
            } else {
              this.hotelService.getHotels(this.maxStar, this.currentPageNo - 1, this.pageSize, null).subscribe({
                next: (data) => {
                  this.hotel = data;
                  this.Filteredhotel = this.hotel;
                  this.totalCount = data.length > 0 ? data[0].totalCount : 0;
                  this.totalPageCount = Math.ceil(this.totalCount / this.pageSize);
                  this.pageList = this.calculatePageList();
                },
                error: (error) => {
                  console.error('Hata:', error);
                },
                complete: () => {
                  this.loading = false; // İşlem tamamlandığında loading'i false yap
                }
              });
            }
      
          }
        });
      
        this.selectedLayout = 'horizontal'; // Örneğin, varsayılan olarak 'horizontal' seçili olabilir
      }
      
      // #region Hesaplama
  calculatePageList(): number[] {
    const pageList: number[] = [];
    const delta = 3; // Gösterilecek sayfa numaralarının aralığı
  
    let startPage = Math.max(1, this.currentPageNo - delta);
    let endPage = Math.min(this.totalPageCount, this.currentPageNo + delta);
  
    for (let i = startPage; i <= endPage; i++) {
      pageList.push(i);
    }
  
    return pageList;
  }

      // #region Date 

  onInputChange() {
    if (this.filterText && this.hotel) {
      const filterTextLower = this.filterText.toLowerCase();
      this.Filteredhotel = this.hotel.filter(m =>
        m.name.toLowerCase().indexOf(filterTextLower) !== -1);
    } else {
      this.Filteredhotel = this.hotel; // filterText veya hotel boş ise, tüm otelleri göster
    }
  }

  generateAdditionalStars(starRating: number): string {
    let stars = '';
    const fullStars = Math.floor(starRating);
    for (let i = 0; i < fullStars; i++) {
      stars += '<i class="fa fa-star" aria-hidden="true"></i> ';
    }
    return stars;
  }

  getStarArray(hotel: HotelModal): number[] {
    return Array(hotel.star || 0).fill(0);
  }

  onSortOrderChange(selectedValue: boolean) {

    this.maxStar=selectedValue
    this.loading = true; // Başlangıçta loading'i true yap

    this.hotelService.getHotels(this.maxStar, this.currentPageNo - 1, this.pageSize).subscribe({
      next: (data) => {
        // Gelen veriler ile yapılacak işlemler
        this.hotel = data;
        this.Filteredhotel = this.hotel;
        this.totalCount = data.length > 0 ? data[0].totalCount : 0;
        this.totalPageCount = Math.ceil(this.totalCount / this.pageSize);
        this.pageList = this.calculatePageList();
      },
      error: (error) => {
        console.error('Hata:', error);
        // Hata durumunda uygun kullanıcı geri bildirimi veya hata işleme yapabilirsiniz
      },
      complete: () => {
        this.loading = false; // İşlem tamamlandığında loading'i false yap
      }
    });
    
  }

  
  // Check-in tarihini seçerken bugünden sonraki ve check-out tarihinden önceki günler seçilebilir
  checkInFilter = (d: Date | null): boolean => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const checkOut = this.checkOutDate ? new Date(this.checkOutDate) : null;
    if (checkOut) {
      checkOut.setHours(0, 0, 0, 0);
    }
    return (d || today) >= today && (!checkOut || (d || today) < checkOut);
  };

  // Check-out tarihini seçerken sadece check-in tarihinden sonraki günler seçilebilir
  checkOutFilter = (d: Date | null): boolean => {
    if (!this.checkInDate) {
      return true; // Eğer check-in tarihi seçilmemişse, tüm tarihler seçilebilir
    }
    const checkIn = new Date(this.checkInDate);
    checkIn.setHours(0, 0, 0, 0);
    return (d || checkIn) > checkIn;
  };

    // Check-in tarihi seçildiğinde check-out tarihini sıfırla
    onCheckInDateChange(event: any): void {
      this.checkInDate = event.value;
      this.checkOutDate = null; // Check-out tarihini sıfırla
    }

    // Check-out tarihi değiştiğinde check-in tarihini kontrol et
    onCheckOutDateChange(event: any): void { 
      this.checkOutDate = event.value;
      if (this.checkInDate && this.checkInDate >= this.checkOutDate) {  //eğer giriş tarihi çıkış tarihinden büyük ise güvenlik için sıfırla.
        this.checkInDate = null; // Check-in tarihini sıfırla
      }
    }


    tariheGoreGetir() {
      this.loading = true; // Başlangıçta loading'i true yap
      this.dateSearch = true;
    
      this.hotelService.getHotelsDate(this.checkInDate, this.checkOutDate, this.currentPageNo - 1, this.pageSize)
        .subscribe({
          next: (resp) => {
            this.Filteredhotel = resp.hotels;
          },
          error: (err) => {
            console.error('Bir hata oluştu:', err);
            // Hata durumunda uygun kullanıcı geri bildirimi veya hata işleme yapabilirsiniz
          },
          complete: () => {
            this.loading = false; // İşlem tamamlandığında loading'i false yap
          }
        });
    }
    

    fiyatinaGoreSirala(selectedValue: boolean) {
      this.maxPrice = selectedValue
      console.log(this.maxPrice)
      this.loading = true;

      this.hotelService.getHotels( undefined,  this.currentPageNo - 1, this.pageSize , this.maxPrice).subscribe({
        next:  (data) => {
          // Gelen veriler ile yapılacak işlemler
          this.hotel = data;
          this.Filteredhotel = this.hotel;
          this.totalCount = data.length > 0 ? data[0].totalCount : 0;
          this.totalPageCount = Math.ceil(this.totalCount / this.pageSize);
          this.pageList = this.calculatePageList();
        
        },
        error: (error) => {
          console.error('Hata:', error);
        },
        complete: () => {
          this.loading = false; // İşlem tamamlandığında loading'i false yap
        }
      }
      );
    }


    onImageError(event: Event): void {
      const target = event.target as HTMLImageElement;
      target.src = 'https://cdn.pixabay.com/photo/2015/09/07/19/12/hotel-928937_1280.jpg';
    }
    

    // #region Menü
    isMenuOpen = false;

    toggleMenu() {
      this.isMenuOpen = !this.isMenuOpen;
    }
  
 //View Görünüm
 
 ListNo: number = 1; // Varsayılan değer
  selectedLayout: 'horizontal' | 'vertical' | null = null;

  setLayout(layout: 'horizontal' | 'vertical') {
    this.selectedLayout = layout;
    this.ListNo = layout === 'horizontal' ? 1 : 2; // Liste numarasını güncelle
  }

  isSelected(layout: 'horizontal' | 'vertical'): boolean {
    return this.selectedLayout === layout;
  }

}
