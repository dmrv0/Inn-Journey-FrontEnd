import { Component, HostListener, Input, OnInit } from '@angular/core';
import { ReviewService } from '../../../services/review.service';
import { reviewModel } from '../../../model/Entities/review';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from '../../../model/user';
import { LocalStorageService } from '../../../services/localstorage.service';
import { AuthService } from '../../../services/auth.service';
import { UserService } from '../../../services/user.service';
import { userModal } from '../../../model/Entities/userModal';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrl: './review.component.scss'
})

export class ReviewComponent implements OnInit {

  @Input() hotelId: string = "";
  addreview:FormGroup
  userId:string
  users:userModal[]
  reviews: reviewModel[] = []; 
  userMap: { [key: string]: any } = {}; 
  errorMessage: string = ''; // Hata mesajı değişkeni
  totalCount:number;
  page:number = 0
  size:number = 5
  loadmoreDeactive=false;
constructor(
  private reviewService: ReviewService,
  private fb:FormBuilder,
  private localService: LocalStorageService,
  private userService: UserService,
  private _snackBar: MatSnackBar

){

  //userId cagirma
  if(!!this.localService.getItem("Token")){
  this.userId = this.localService.getItem("Token").userId;
}

this.userService.get().subscribe(data =>{ 
  this.users= data
this.createUserMap();
})

}


// Kullanıcı ismini yorumlara göstermek için userMap
createUserMap(): void {
  this.userMap = {};
  this.users.forEach(userMap => {
    this.userMap[userMap.id] = userMap;
  });
}

// kullanıcı ismini idye göre getir
getUserName(userId: string): string {
  const user = this.userMap[userId];
  return user ? user.email : "Bilinmeyen Kişi";
}


  ngOnInit(): void {
  this.loadReviews(); //yorum güncelle
  this.addreview = this.fb.group({
    hotelId: [this.hotelId , Validators.required],
    userId: [this.userId , Validators.required],
    rating: [null , Validators.required],
    comment: ['' , Validators.required]
  })
}

loadReviews() {
 
  if (this.hotelId) {
    this.reviewService.getbyIdHotel(this.hotelId, this.page, this.size).subscribe(response => {
      this.reviews = response.reviews;
      this.totalCount = response.totalCount
    });
  }
}

//yorum ekle
addReview(){
  if (this.addreview.valid) {
      this.reviewService.add(this.addreview.value).subscribe( response=>{
        console.log(response)
        this.loadReviews() // yorm getir
      }
      ,(error) => {
      
         this.errorMessage = 'Yorum yaparken bir hata oluştu Lütfen tekrar deneyin. Hata Mesajı:' + error;
         // Hata durumunda kullanıcıya bildirim
       });
    
      // this.addreview.reset(); // Formu sıfırla
      this.addreview.get('rating')?.setValue(null); // rating alanını sıfırla
      this.addreview.get('comment')?.setValue(''); // comment alanını sıfırla
      this._snackBar.open( 'Başarıyla yorum yapıldı.','',{ duration:4000 });

  }
  this.loadReviews() // yorm getir
}


  loadMore() {
    if (this.size <= this.totalCount) {
      this.page = this.page
      this.size = this.size + this.size
      this.loadReviews()
    }
    else {
      this.loadmoreDeactive = true
    }
  }



  //region #EventListener
  spaceKeyPressed: boolean = false;

  @HostListener('window:scroll', ['$event'])
  onWindowScroll(event: Event): void {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;

    if (scrollTop + windowHeight >= documentHeight - 5) {
      this.loadMore();
    }
  }

  @HostListener('window:keydown.space', ['$event'])
  onSpaceKeyPress(event: KeyboardEvent): void {
    this.spaceKeyPressed = true;
    if (this.spaceKeyPressed) {
      this.loadMore();
    }
  }

  @HostListener('window:keyup.space', ['$event'])
  onSpaceKeyRelease(event: KeyboardEvent): void {
    this.spaceKeyPressed = false;
  }

}