import { useState } from 'react';
import { useEffect } from 'react';
import { getHotelsWithRooms } from '../../../services/hotelApi';
import { ContainerRooms, Text, Button } from './style';
import RoomContainer from '../Room/RoomContainer';
import { changeBooking, createBooking } from '../../../services/bookingApi';
import { useNavigate } from 'react-router-dom';

export function ListRooms({ token, hotelId, booking, selectedRoom, setSelectedRoom, changeBookingStatus }) {
  if (!hotelId) return <></>;

  const [rooms, setRooms] = useState();
  const navigate = useNavigate();

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
    if (!changeBookingStatus) {
      if (booking) return alert('Você já tem uma reserva, se está tentando alterar atualize a pagina!');
      await createBooking(token, selectedRoom);
    }
    if (changeBookingStatus) {
      if (selectedRoom === booking.Room.id) return alert('Escolha um quarto diferente');
      await changeBooking(token, booking.id, selectedRoom);
    }
    navigate('/dashboard/hotel/reservation');
  }

  return (
    <>
      <Text>Ótima pedida! Agora escolha seu quarto:</Text>
      <ContainerRooms>
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
      </ContainerRooms>
      <ContainerRooms>
        {selectedRoom ? (
          <Button onClick={book}>
            <h5>RESERVAR QUARTO</h5>
          </Button>
        ) : (
          <></>
        )}
      </ContainerRooms>
    </>
  );
}
