package com.ZR.Zroom.Controller;


import com.ZR.Zroom.Model.Room;
import com.ZR.Zroom.Model.RoomDTO;
import com.ZR.Zroom.Service.RoomService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@CrossOrigin
@RestController
@RequestMapping("/rooms")
public class RoomController {
    @Autowired
    private RoomService roomService;

    @GetMapping("/get-all-room")
    public ResponseEntity<List<Room>> getAllRooms() {
        List<Room> roomList = roomService.getAllRooms();
        return ResponseEntity.ok(roomList);
    }

    @GetMapping("/get-room-by-id/{adminId}")
    public Room getRoomById(@PathVariable Long adminId) {
        return roomService.getRoomById(adminId);
    }

    @PostMapping("/save-room")
    public ResponseEntity<Room> saveRoom(@RequestBody Room room){
        roomService.saveRoom(room);
        return ResponseEntity.ok(room);
    }

    @PostMapping("/save-rooms")
    public ResponseEntity<List<Room>> saveRooms(@RequestBody List<Room> rooms){
        roomService.saveRooms(rooms);
        return ResponseEntity.ok(rooms);
    }

    @DeleteMapping("/delete-all-room")
    public ResponseEntity deleteAllRoom(){
        roomService.deleteAllRoom();
        return ResponseEntity.ok("All rooms are deleted Succesfully");
    }

    @DeleteMapping("/delete-room-by-id/{adminId}")
    public ResponseEntity deleteRoomById(@PathVariable String adminId){
        roomService.deleteRoomById(adminId);
        return ResponseEntity.ok("This Room is Removed Sucessfully");
    }

    @PutMapping("/update-details/{adminId}")
    public ResponseEntity<String> updateRoomDetails(@PathVariable Long adminId, @RequestBody RoomDTO roomDTO){
        boolean updated = roomService.updateRoomDetails(adminId,roomDTO);
        if(updated) {
            return ResponseEntity.ok("Room Details updated Successfully");
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/filter-by-location/{location}")
    public ResponseEntity<List<Room>> filterByLocation(@PathVariable String location){
        List<Room> rooms = roomService.getRoomsByLocation(location);
        return ResponseEntity.ok(rooms);
    }

    @GetMapping("/filter-by-areaType/{areaType}")
    public ResponseEntity<List<Room>> filterByAreaType(@PathVariable String areaType) {
        System.out.println("Searching for areaType: " + areaType);
        List<Room> filteredRooms = roomService.getRoomsByAreaType(areaType);
        return ResponseEntity.ok(filteredRooms);
    }

    @GetMapping("/filter-by-roomPrice{price}")
    public ResponseEntity<List<Room>> filterByRoomPrice(
            @RequestParam String minPrice,
            @RequestParam String maxPrice) {
        List<Room> rooms = roomService.getRoomsByPriceRange(minPrice, maxPrice);
        return ResponseEntity.ok(rooms);
    }

    @GetMapping("/filter-by-roomType/{roomType}")
    public ResponseEntity<List<Room>> getRoomsByRoomType(@PathVariable String roomType) {
        List<Room> rooms = roomService.getRoomsByRoomType(roomType);
        if (rooms.isEmpty()) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok(rooms);
    }



    @GetMapping("/filter-by-roomStatus/{roomStatus}")
    public ResponseEntity<List<Room>> getRoomByRoomStatus(@PathVariable String roomStatus) {
        List<Room> rooms = roomService.getRoomByRoomStatus(roomStatus);
        return ResponseEntity.ok(rooms);
    }




    // Upload multiple images for a room
    @PostMapping("/upload-images/{adminId}")
    public ResponseEntity<?> uploadImages(@PathVariable Long adminId,
                                          @RequestParam("files") MultipartFile[] files) {
        try {
            Optional<Room> optionalRoom = roomService.findById(adminId);
            if (optionalRoom.isEmpty()) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Room not found");
            }

            Room room = optionalRoom.get();
            String uploadDir = "uploads/";
            List<String> newImageUrls = new ArrayList<>();

            for (MultipartFile file : files) {
                if (file.isEmpty()) continue; // Skip empty files

                // Generate unique filename
                String fileName = UUID.randomUUID() + "_" + file.getOriginalFilename();
                Path filePath = Paths.get(uploadDir + fileName);

                // Ensure the directory exists
                Files.createDirectories(filePath.getParent());

                // Write file to the path
                Files.write(filePath, file.getBytes());

                // Save public access URL (could also use a full URL)
                String imageUrl = "/images/" + fileName;
                newImageUrls.add(imageUrl);
            }

            // Save image URLs to room
            room.getImages().addAll(newImageUrls);
            roomService.save(room);

            return ResponseEntity.ok(room.getImages());

        } catch (IOException e) {
            e.printStackTrace(); // Optional: log it
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Image upload failed: " + e.getMessage());
        } catch (Exception e) {
            e.printStackTrace(); // Optional: log it
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Unexpected error occurred");
        }
    }




    // (Optional) Get all image URLs for a room
    @GetMapping("/images/{adminId}")
    public ResponseEntity<?> getImages(@PathVariable Long adminId) {
        Optional<Room> optionalRoom = roomService.findById(adminId);
        if (optionalRoom.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Room not found");
        }

        return ResponseEntity.ok(optionalRoom.get().getImages());
    }




    @DeleteMapping("/delete-image/{adminId}")
    public ResponseEntity<?> deleteImage(@PathVariable Long adminId,
                                         @RequestParam String imageUrl) {
        Optional<Room> optionalRoom = roomService.findById(adminId);
        if (optionalRoom.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Room not found");
        }

        Room room = optionalRoom.get();

        // Remove image from the list
        boolean removed = room.getImages().remove(imageUrl);
        if (!removed) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Image not found in room");
        }

        // Delete the actual file from disk
        try {
            // Extract filename from URL
            String fileName = imageUrl.replace("/images/", "");
            Path filePath = Paths.get("uploads/" + fileName);

            if (Files.exists(filePath)) {
                Files.delete(filePath);
            }

            // Save updated room
            roomService.save(room);
            return ResponseEntity.ok("Image deleted successfully");

        } catch (IOException e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Failed to delete image: " + e.getMessage());
        }
    }




}





