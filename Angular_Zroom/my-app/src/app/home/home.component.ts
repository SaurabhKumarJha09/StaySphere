import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
selectedFilter: string = 'all';

  rooms = [
    { title: 'Modern Studio', areaType: 'urban', bhk: '1', city: 'Bangalore' },
    { title: 'Cozy 2BHK', areaType: 'urban', bhk: '2', city: 'Delhi' },
    { title: 'Spacious 3BHK', areaType: 'urban', bhk: '3', city: 'Mumbai' }, 
    { title: 'Rustic Home', areaType: 'rural', bhk: '1' ,city: 'Goa' },
    { title: 'Countryside Cottage', areaType: 'rural', bhk: '2', city: 'Pune' },
    { title: 'Hill View Room', areaType: 'remote', bhk: '2', city: 'Jaipur' },
    { title: 'Beachfront Villa', areaType: 'remote', bhk: '3', city:'Chennai' },
    // Add more sample or fetched data here
  ];

  get filteredRooms() {
    return this.rooms.filter(room => {
      if (this.selectedFilter === 'all') return true;
      if (['urban', 'rural', 'remote'].includes(this.selectedFilter)) {
        return room.areaType === this.selectedFilter;
      }
      if (this.selectedFilter === '3+') return +room.bhk >= 3;
      return room.bhk === this.selectedFilter;
    });

    
  }

  setFilter(filter: string) {
    this.selectedFilter = filter;
  }


  selectedCity: string | null = null;

  room = [
    { title: 'Room A', city: 'Delhi' },
    { title: 'Room B', city: 'Mumbai' },
    { title: 'Room C', city: 'Bangalore' },
    { title: 'Room D', city: 'Chennai' },
    { title: 'Room E', city: 'Goa' },
    { title: 'Room F', city: 'Hyderabad' },
    { title: 'Room G', city: 'Pune' },
    { title: 'Room H', city: 'Jaipur' },
  ];

  get filteredRoomsByCity() {
    if (!this.selectedCity) return this.rooms;
    return this.rooms.filter(room => room.city === this.selectedCity);
  }

  filterByCity(city: string) {
    this.selectedCity = city;
  }





}


