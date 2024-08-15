export interface payModal {
    id: string
    createdDate: Date;
    updatedDate: Date;
    deletedDate: Date;
    deleted: boolean;
    userId: string;
    roomId: string;
    hotelId: string;
    checkIn: Date;
    checkOut: Date;
    totalPrice: number;
    status: string;
    cardHolderName: string;
    cardNumber: string;
    expireMonth: string;
    expireYear: string;
    cvc: string;
  }
