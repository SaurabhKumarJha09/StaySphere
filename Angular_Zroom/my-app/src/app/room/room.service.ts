import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Room } from '../model/roomDTO.model';

@Injectable({
  providedIn: 'root'
})
export class RoomService {

  constructor(private http: HttpClient, private router: Router) { }

  getAllRoom() : Observable<any>{
    return this.http.get(`http://localhost:8082/rooms/get-all-room`);
  }

  getRoomById(adminId: number): Observable<any> {
    return this.http.get<Room>(`http://localhost:8082/rooms/get-room-by-id/${adminId}`);
  }

  saveRoom(room: any): Observable<any> {
    return this.http.post(`http://localhost:8082/rooms/save-room`, room);
  }

  deleteAllRoom(): Observable<any> {
    return this.http.delete(`http://localhost:8082/rooms/delete-all-room`);
  } 

  deleteRoomById(adminId: number): Observable<any> {
    return this.http.delete(`http://localhost:8082/rooms/delete-room/${adminId}`);
  } 

  getRoomsByAdminId(adminId: number): Observable<any> {
    return this.http.get(`http://localhost:8082/rooms/get-rooms-by-admin/${adminId}`);
  }

  updateRoomDetails(adminId: number, room: any): Observable<any> {
    return this.http.put(`http://localhost:8082/rooms/update-details/${adminId}`, room);
  } 

  filterByLocation(location: string): Observable<any> {
    return this.http.get<Room[]>(`http://localhost:8082/rooms/filter-by-location/${location}`);
  } 

  filterByAreaType(areaType: string): Observable<any> {
    return this.http.get<Room[]>(`http://localhost:8082/rooms/filter-by-areaType/${areaType}`);
  }


  filterByRoomPrice(minPrice: string, maxPrice: string): Observable<any> {
  return this.http.get<Room[]>(`http://localhost:8082/rooms/filter-by-roomPrice?minPrice=${minPrice}&maxPrice=${maxPrice}`);
}

 getRoomsByRoomType(roomType: string): Observable<any> {
  return this.http.get<Room[]>(`http://localhost:8082/rooms/filter-by-roomType?roomType=${roomType}`);
}
  
getRoomsByRoomStatus(roomStatus: string): Observable<any> {
  return this.http.get<Room[]>(`http://localhost:8082/rooms/filter-by-roomStatus/${roomStatus}`);

}

}
