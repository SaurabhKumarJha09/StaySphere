package com.ZR.Zroom.Repository;


import com.ZR.Zroom.Model.Room;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RoomRepository extends JpaRepository<Room, Long> {
    List<Room> findByLocationContainingIgnoreCase(String location);
    List<Room> findByAreaTypeContainingIgnoreCase(String areaType);
    @Query(value = "SELECT * FROM room WHERE CAST(room_price AS INTEGER) BETWEEN :min AND :max", nativeQuery = true)
    List<Room> findRoomsByRoomPriceRange(@Param("min") int min, @Param("max") int max);
    List<Room> findByRoomTypeIgnoreCase(String roomType);
    List<Room> findByRoomStatus(String roomStatus);


}
