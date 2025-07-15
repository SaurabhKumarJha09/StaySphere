import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { RoomComponent } from './room/room.component';
import { ContactComponent } from './contact/contact.component';
import { RoomDetailsComponent } from './room-details/room-details.component';
import { RoomPriceComponent } from './room-price/room-price.component';
import { RoomAvailabilityComponent } from './room-availability/room-availability.component';
import { RoomLocationComponent } from './room-location/room-location.component';
import { AddRoomComponent } from './add-room/add-room.component';



const routes: Routes = [
  { path: '', component: HomeComponent },
  {path: "home",component:HomeComponent},
  {path: "about",component:AboutComponent},
  {path: "room/area/:areaType", component:RoomComponent},
  {path: "contact",component:ContactComponent},
  {path: "room-details/details/:adminId", component: RoomDetailsComponent},
  {path: "room/price/:roomPrice", component: RoomPriceComponent},
  {path: "room/status/:roomStatus", component: RoomAvailabilityComponent},
  {path: "room/loc/:location", component: RoomLocationComponent},
  {path: "add-room", component: AddRoomComponent},
  

];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
