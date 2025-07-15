package com.ZR.Zroom.Service;


import com.ZR.Zroom.Model.Room;
import com.ZR.Zroom.Model.RoomDTO;
import com.ZR.Zroom.Repository.RoomRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import javax.management.Query;
import java.util.List;
import java.util.Optional;

@Service
public class RoomService {
    @Autowired
    private RoomRepository roomRepository;

    public Room getRoomById(Long adminId) {
        return roomRepository.findById(adminId).orElseThrow(() ->
                new RuntimeException("Error: Room not found."));
    }

    public List<Room> getAllRooms() {
        return roomRepository.findAll();
    }

    public Room saveRoom(Room room) {
        return roomRepository.save(room);
    }

    public List<Room> saveRooms(List<Room> rooms) {
        return roomRepository.saveAll(rooms);
    }

    public void deleteAllRoom() {
        roomRepository.deleteAll();
    }

    public void deleteRoomById(String adminId) {
        try {
            Long id = Long.parseLong(adminId);
            if (roomRepository.existsById(id)) {
                roomRepository.deleteById(id);
            } else {
                throw new RuntimeException("Room with ID " + adminId + " not found.");
            }
        } catch (NumberFormatException e) {
            throw new RuntimeException("Invalid adminId format: " + adminId);
        }
    }

    public boolean updateRoomDetails(Long adminId, RoomDTO roomDTO) {
        Optional<Room> optionalRoom = roomRepository.findById(adminId);
        if(optionalRoom.isPresent()){
            Room room = optionalRoom.get();

            room.setPlotId(roomDTO.getPlotId());
            room.setAdminName(roomDTO.getAdminName());
            room.setContactInfo(roomDTO.getContactInfo());
            room.setAreaType(roomDTO.getAreaType());
            room.setLocation(roomDTO.getLocation());
            room.setFullAddress(roomDTO.getFullAddress());
            room.setRoomType(roomDTO.getRoomType());
            room.setQuality(roomDTO.getQuality());
            room.setRoomPrice(roomDTO.getRoomPrice());
            room.setRoomStatus(roomDTO.getRoomStatus());

            roomRepository.save(room);
            return true;
        }
        return false;
    }


    public List<Room> getRoomsByLocation(String location) {
        return roomRepository.findByLocationContainingIgnoreCase(location);
    }

    public List<Room> getRoomsByAreaType(String areaType) {
        return roomRepository.findByAreaTypeContainingIgnoreCase(areaType);
    }

    public List<Room> getRoomsByPriceRange(String minPrice, String maxPrice) {
        int min = Integer.parseInt(minPrice);
        int max = Integer.parseInt(maxPrice);
        return roomRepository.findRoomsByRoomPriceRange(min, max);
    }

    public List<Room> getRoomsByRoomType(String roomType) {
        return roomRepository.findByRoomTypeIgnoreCase(roomType);
    }



    public List<Room> getRoomByRoomStatus(String roomStatus) {
        return roomRepository.findByRoomStatus(roomStatus);
    }

    public void save(Room room) {
        roomRepository.save(room);
    }

    public Optional<Room> findById(Long adminId) {
        return roomRepository.findById(adminId);
    }
}
