import { Component } from '@angular/core';
import { RoomService } from '../room/room.service';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-room-price',
  templateUrl: './room-price.component.html',
  styleUrl: './room-price.component.css'
})
export class RoomPriceComponent {
  price: any[] = [];
  selectedRoomPrice = 'price'; 

  
  minPrice!: string;
  maxPrice!: string;
  
  constructor(private roomService: RoomService, private http: HttpClient, private route: ActivatedRoute) {}

 ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const roomPrice = params.get('roomPrice');
      if (roomPrice) {
        [this.minPrice, this.maxPrice] = roomPrice.split('-');
        this.fetchRoomsByRoomPrice(this.minPrice, this.maxPrice);
      }
    });
  }

  fetchRoomsByRoomPrice(min: string, max: string): void {
    this.roomService.filterByRoomPrice(min, max).subscribe({
      next: data => this.price = data,
      error: err => console.error('Failed to fetch rooms', err)
    });
  }

}
