import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { FooterComponent } from './footer/footer.component';
import { RoomComponent } from './room/room.component';
import { ContactComponent } from './contact/contact.component';
import { HttpClientModule } from '@angular/common/http';
import { RoomDetailsComponent } from './room-details/room-details.component';
import { RoomPriceComponent } from './room-price/room-price.component';
import { RoomAvailabilityComponent } from './room-availability/room-availability.component';
import { RoomLocationComponent } from './room-location/room-location.component';
import { AddRoomComponent } from './add-room/add-room.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AboutComponent,
    FooterComponent,
    RoomComponent,
    ContactComponent,
    RoomDetailsComponent,
    RoomPriceComponent,
    RoomAvailabilityComponent,
    RoomLocationComponent,
    AddRoomComponent,
  
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
