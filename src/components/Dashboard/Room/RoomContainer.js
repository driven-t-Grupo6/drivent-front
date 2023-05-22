import { FaRegUser, FaUser } from 'react-icons/fa';
import { Capacity, Room } from './style';
import { useEffect, useState } from 'react';
import { getBookingByRoomId } from '../../../services/bookingApi';

function RoomContainer({ room, token, booking, selectedRoom, setSelectedRoom }) {
  const [isUserBooking, setIsUserBooking] = useState(false);
  const rIForUserBook =
    isUserBooking && selectedRoom !== room.id ? 1 : isUserBooking && selectedRoom === room.id ? 1 : 0;
  const [bookings, setBookings] = useState();
  const isFilled = bookings === room.capacity + rIForUserBook;
  const [capacityUser, setCapacityUser] = useState([]);

  useEffect(() => {
    getBookingByRoomId(token, room.id).then((res) => {
      setBookings(res.bookings);
    });
    if (booking && booking.Room.id === room.id) {
      setIsUserBooking(true);
      setSelectedRoom(room.id);
    }
  }, [room]);

  useEffect(() => {
    const iconsList = [];
    const roomIcon = selectedRoom === room.id ? 1 : 0;
    if (!bookings) {
      for (let i = 0; i < room.capacity - roomIcon + rIForUserBook; i++) {
        iconsList.push(<FaRegUser key={`emptyicon${i}`} />);
      }
    } else if (bookings) {
      for (let i = 0; i < room.capacity - bookings - roomIcon + rIForUserBook; i++) {
        iconsList.push(<FaRegUser key={`emptyicon${i}`} />);
      }
      for (let i = 0; i < bookings - rIForUserBook; i++) {
        iconsList.push(<FaUser key={`icon${i}`} />);
      }
    }

    if (selectedRoom === room.id) iconsList.push(<FaUser key={'usericon'} color="red" />);
    setCapacityUser(iconsList);
  }, [bookings, selectedRoom]);

  function selectRoom() {
    if (isFilled) return;
    if (!(selectedRoom === room.id)) setSelectedRoom(room.id);
  }
  return (
    <Room key={room.id} onClick={selectRoom} isFilled={isFilled} isUserBooking={selectedRoom === room.id}>
      <p>{room.id}</p>
      <Capacity>{capacityUser.map((r) => r)}</Capacity>
    </Room>
  );
}

export default RoomContainer;
