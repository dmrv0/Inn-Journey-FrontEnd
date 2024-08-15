import { Component, Input, OnInit } from '@angular/core';
import { HotelExtensionsService } from '../../../services/hotel-extensions.service';
import { hotelExtensionsModel } from '../../../model/Entities/ExtensionsModel/hotelExtensions';

@Component({
  selector: 'app-extensions',
  templateUrl: './extensions.component.html',
  styleUrl: './extensions.component.scss'
})

export class ExtensionsComponent implements OnInit{
  @Input() hotelId: string = "";

  extensionsModel:hotelExtensionsModel[]
  constructor(
    private hotelExtensions:HotelExtensionsService
  ) {
    
  }
  ngOnInit(): void {
    this.hotelExtensions.getByHotelId(this.hotelId).subscribe(resp=> this.extensionsModel = resp)
  }
}
