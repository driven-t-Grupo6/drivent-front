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

export function ListHotels({ token }) {
  const [hotels, setHotels] = useState();
  const [typeRooms, setTypeRooms] = useState('Single, Double e Triple');
  const [onRooms, setOnRooms] = useState('100');
  const [selectedHotel, setSelectedHotel] = useState();
  const [hotelId, setHotelId] = useState();

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
    setSelectedHotel(hotel);
    setHotelId(hotel.id);
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
                    <p>{typeRooms}</p>
                  </RoomsInfo>
                  <RoomsInfo>
                    <h2>Vagas disponíveis:</h2>
                    <p>{onRooms}</p>
                  </RoomsInfo>
                </Information>
              </HotelContainer>
            ))}
          </HotelListContainer>
          <ListRooms token={token} hotelId={hotelId} />
        </>
      )}
    </>
  );
}
