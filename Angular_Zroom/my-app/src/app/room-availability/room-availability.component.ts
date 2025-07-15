import { Component } from '@angular/core';
import { RoomService } from '../room/room.service';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Room } from '../model/roomDTO.model';

@Component({
  selector: 'app-room-availability',
  templateUrl: './room-availability.component.html',
  styleUrl: './room-availability.component.css'
})
export class RoomAvailabilityComponent {

status: Room[] = [];
  selectedRoomStatus = ''; 

  constructor(private roomService: RoomService, private http: HttpClient, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
    const roomStatus = params.get('roomStatus');
    if (roomStatus) {
        this.selectedRoomStatus = roomStatus;
      this.fetchRoomsByRoomStatus(roomStatus); // Make API call
    }
  });
  }

  fetchRoomsByRoomStatus(roomStatus: string): void {
    this.roomService.getRoomsByRoomStatus(roomStatus).subscribe({
      next: data => this.status = data,
      error: err => console.error('Failed to fetch rooms', err)
    });
  }

}
