import { Component } from '@angular/core';
import { Room } from '../model/roomDTO.model';
import { RoomService } from '../room/room.service';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-room-location',
  templateUrl: './room-location.component.html',
  styleUrl: './room-location.component.css'
})
export class RoomLocationComponent {


 loc: Room[] = [];
  selectedRoomLocation = '';

   constructor(private roomService: RoomService, private http: HttpClient, private route: ActivatedRoute) {}


  ngOnInit(): void {
    const location = this.route.snapshot.paramMap.get('location');
    if (location) {
      this.selectedRoomLocation = location;
      this.roomService.filterByLocation(location).subscribe({
        next: data => {
          this.loc = data;
          console.log('Rooms fetched:', this.loc);
        },
        error: err => {
          console.error('Failed to fetch rooms:', err);
        }
      });
    }
  }

}
