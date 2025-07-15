import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RoomService } from './room.service';

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrl: './room.component.css'
})
export class RoomComponent implements OnInit {
  rooms: any[] = [];
  selectedAreaType = 'Urban'; 

  constructor(private roomService: RoomService, private http: HttpClient, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
    const area = params.get('areaType');
    if (area) {
      this.fetchRoomsByAreaType(area); // Make API call
    }
  });
  }

  fetchRoomsByAreaType(areaType: string): void {
    this.roomService.filterByAreaType(areaType).subscribe({
      next: data => this.rooms = data,
      error: err => console.error('Failed to fetch rooms', err)
    });
  }
}

