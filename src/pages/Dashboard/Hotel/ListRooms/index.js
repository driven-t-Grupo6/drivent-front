import { useState } from 'react';
import { useEffect } from 'react';
import { getHotelsWithRooms } from '../../../../services/hotelApi';
import { Container, Text, Button } from './style';
import RoomContainer from '../../../../components/Dashboard/Room/RoomContainer';
import { changeBooking, createBooking } from '../../../../services/bookingApi';

export function ListRooms({
  token,
  hotelId,
  booking,
  selectedRoom,
  setSelectedRoom,
  changeBookingStatus,
  setUpdateBooking,
}) {
  if (!hotelId) return <></>;

  const [rooms, setRooms] = useState();

  useEffect(() => {
    const promise = getHotelsWithRooms(token, hotelId);
    promise
      .then((res) => {
        setRooms(res.Rooms);
      })
      .catch((error) => {
        if (error.status === 404) setRooms(false);
      });
  }, [hotelId]);

  if (!rooms) return <>Carregando...</>;

  async function book() {
    if (selectedRoom === booking.Room.id) return alert('Escolha um quarto diferente');
    if (!changeBookingStatus) await createBooking(token, selectedRoom);
    if (changeBookingStatus) await changeBooking(token, booking.id, selectedRoom);

    setUpdateBooking();
  }

  return (
    <>
      <Text>Ótima pedida! Agora escolha seu quarto:</Text>
      <Container>
        {rooms.map((room) => (
          <RoomContainer
            key={room.id}
            room={room}
            token={token}
            booking={booking}
            selectedRoom={selectedRoom}
            setSelectedRoom={setSelectedRoom}
          />
        ))}
      </Container>
      <Container>
        {selectedRoom ? (
          <Button onClick={book}>
            <h5>RESERVAR QUARTO</h5>
          </Button>
        ) : (
          <></>
        )}
      </Container>
    </>
  );
}
