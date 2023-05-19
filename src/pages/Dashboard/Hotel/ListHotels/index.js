import { useState } from 'react';
import { useEffect } from 'react';
import { ListRooms } from '../ListRooms';
import { getHotels } from '../../../../services/hotelApi';
import {
  HotelListContainer,
  Text,
  HotelContainer,
  Information,
  Container,
  HotelImage,
  HotelName,
  RoomsInfo,
} from './style';

export function ListHotels({ booking, token, setUpdateBooking }) {
  const [hotels, setHotels] = useState();
  const [hotelId, setHotelId] = useState();
  const [selectedRoom, setSelectedRoom] = useState(0);

  useEffect(() => {
    getHotels(token)
      .then((res) => {
        setHotels(res);
      })
      .catch((error) => {
        if (error.status === 404) setHotels(false);
      });
  }, []);

  function selectHotel(hotel) {
    setHotelId(hotel.id);
  }

  function getRoomsTypes(hotel) {
    const roomsTypes = [];
    if (hotel.Rooms.some((e) => e.capacity === 1)) roomsTypes.push('Single');
    if (hotel.Rooms.some((e) => e.capacity === 2)) roomsTypes.push('Double');
    if (hotel.Rooms.some((e) => e.capacity === 3)) roomsTypes.push('Triple');
    return roomsTypes.join(', ');
  }

  function getCapacity(hotel) {
    let capacity = 0;
    hotel.Rooms.map((e) => (capacity += e.capacity));
    return capacity.toString();
  }

  return (
    <>
      {!hotels ? (
        <Container>
          <Text>Ainda não há hoteis cadastrados.</Text>
        </Container>
      ) : (
        <>
          <Text>Primeiro, escolha seu hotel</Text>
          <HotelListContainer>
            {hotels.map((h) => (
              <HotelContainer onClick={() => selectHotel(h)} key={h.id} selected={h.id === hotelId}>
                <HotelImage src={h.image} alt="Imagem Hotel" />
                <Information>
                  <HotelName>{h.name}</HotelName>
                  <RoomsInfo>
                    <h2>Tipo de acomodação:</h2>
                    <p>{getRoomsTypes(h)}</p>
                  </RoomsInfo>
                  <RoomsInfo>
                    <h2>Vagas disponíveis:</h2>
                    <p>{getCapacity(h)}</p>
                  </RoomsInfo>
                </Information>
              </HotelContainer>
            ))}
          </HotelListContainer>
          <ListRooms
            token={token}
            hotelId={hotelId}
            booking={booking}
            selectedRoom={selectedRoom}
            setSelectedRoom={setSelectedRoom}
            setUpdateBooking={setUpdateBooking}
          />
        </>
      )}
    </>
  );
}
