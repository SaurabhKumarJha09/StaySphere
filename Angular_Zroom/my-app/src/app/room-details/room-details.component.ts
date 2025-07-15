import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RoomService } from '../room/room.service';

@Component({
  selector: 'app-room-details',
  templateUrl: './room-details.component.html',
  styleUrl: './room-details.component.css'
})
export class RoomDetailsComponent implements OnInit {
constructor(private http: HttpClient,private route: ActivatedRoute, private roomService: RoomService,){}

 room: any;
 selectedImage: string = '';

 ngOnInit(): void {
   const adminId = this.route.snapshot.paramMap.get('adminId');
   if (adminId) {
     this.roomService.getRoomById(+adminId).subscribe({
       next: (data) => {
         this.room = data;
         if (this.room?.images?.length) {
           this.selectedImage = this.room.images[0]; // Set default main image
         }
         console.log('Room fetched:', this.room);
       },
       error: (err) => {
         console.error('Failed to fetch room:', err);
       }
     });
   }
 }

 selectImage(img: string): void {
   this.selectedImage = img;
 }

}
