// import { HttpClient } from '@angular/common/http';
// import { Component } from '@angular/core';
// import { FormBuilder, FormGroup, Validators } from '@angular/forms';

// @Component({
//   selector: 'app-add-room',
//   templateUrl: './add-room.component.html',
//   styleUrl: './add-room.component.css'
// })
// export class AddRoomComponent {
//   roomForm!: FormGroup;
//   imageFiles: File[] = [];

//   constructor(private fb: FormBuilder, private http: HttpClient) {}

//   ngOnInit(): void {
//     this.roomForm = this.fb.group({
//       adminId: [null, Validators.required],
//       plotId: ['', Validators.required],
//       adminName: ['', Validators.required],
//       contactInfo: ['', Validators.required],
//       areaType: ['Urban', Validators.required],
//       location: ['', Validators.required],
//       fullAddress: ['', Validators.required],
//       roomType: ['1 BHK', Validators.required],
//       quality: ['Furnished', Validators.required],
//       roomPrice: ['', Validators.required],
//       roomStatus: ['Available', Validators.required],
//       title: ['', Validators.required],
//       description: ['', Validators.required],
//     });
//   }

//   onFileChange(event: any) {
//     this.imageFiles = Array.from(event.target.files);
//   }

//   submitRoom() {
//     const formData = new FormData();
//     const roomData = { ...this.roomForm.value };

//     formData.append('room', new Blob([JSON.stringify(roomData)], { type: 'application/json' }));
//     this.imageFiles.forEach(file => formData.append('images', file));

//     this.http.post('http://localhost:8082/save-room', roomData).subscribe({
//       next: res => alert('Room added successfully!'),
//       error: err => console.error(err)
//     });
//   }
// }






import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-add-room',
  templateUrl: './add-room.component.html',
  styleUrls: ['./add-room.component.css']
})
export class AddRoomComponent {
  roomForm: FormGroup;
  selectedImages: File[] = [];

  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.roomForm = this.fb.group({
      plotId: ['', Validators.required],
      adminName: [''],
      contactInfo: [''],
      areaType: ['Urban'],
      location: [''],
      fullAddress: [''],
      roomType: ['1 BHK'],
      quality: ['Furnished'],
      roomPrice: [''],
      roomStatus: ['Available'],
      title: [''],
      description: ['']
    });
  }

  onFileChange(event: Event): void {
    const target = event.target as HTMLInputElement;
    if (target.files) {
      this.selectedImages = Array.from(target.files);
    }
  }

  submitRoom(): void {
    const formData = new FormData();

    // Append JSON fields
    const roomData = { ...this.roomForm.value };
    const jsonBlob = new Blob([JSON.stringify(roomData)], { type: 'application/json' });
    formData.append('room', jsonBlob);

    // Append multiple files
    this.selectedImages.forEach((file, index) => {
      formData.append('images', file);
    });

    this.http.post('http://localhost:8082/rooms/save-room', formData).subscribe({
      next: res => {
        alert('Room added successfully!');
        this.roomForm.reset();
        this.selectedImages = [];
      },
      error: err => {
        console.error('Error adding room:', err);
        alert('Failed to add room.');
      }
    });
  }
}
