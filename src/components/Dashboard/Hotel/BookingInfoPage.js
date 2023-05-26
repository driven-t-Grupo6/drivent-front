import { StyledTypography } from '../../PersonalInformationForm';
import {
  Container,
  HotelContainer,
  HotelImage,
  HotelListContainer,
  HotelName,
  Information,
  RoomsInfo,
  Text,
  Button,
} from './style';
import { useEffect, useState } from 'react';
import useToken from '../../../hooks/useToken';
import { getHotelsByRoomId } from '../../../services/hotelApi';
import { getBookingByRoomId } from '../../../services/bookingApi';
import { useNavigate } from 'react-router-dom';

export function BookingInfoPage({ booking }) {
  const [hotel, setHotel] = useState(false);
  const [usage, setUsage] = useState(0);
  const token = useToken();
  const navigate = useNavigate();

  useEffect(() => {
    getHotelsByRoomId(token, booking.Room.id)
      .then((res) => {
        setHotel(res);
      })
      .catch((err) => {
        setHotel(false);
      });
    getBookingByRoomId(token, booking.Room.id)
      .then((res) => {
        setUsage(res.bookings);
      })
      .catch((err) => {
        setUsage(false);
      });
  }, [booking]);

  if (!hotel || !usage) return <>Carregando...</>;

  function getRoomType() {
    const [room] = hotel.Rooms.filter((e) => e.id === booking.Room.id);
    if (room.capacity === 1) return 'Single';
    if (room.capacity === 2) return 'Double';
    if (room.capacity === 3) return 'Triple';
  }

  function getUsage() {
    const withUser = usage - 1;
    if (usage === 1) return 'Somente você';
    if (usage > 1) return `Você e mais ${withUser}`;
  }

  function handleChangeRoom() {
    navigate('/dashboard/hotel?change=true');
  }

  return (
    <>
      <StyledTypography variant="h4"> Escolha de hotel e quarto </StyledTypography>
      <Text>Você já escolheu seu quarto:</Text>
      <HotelListContainer>
        <HotelContainer key={hotel.id} selected={true}>
          <HotelImage src={hotel.image} alt="Imagem Hotel" />
          <Information>
            <HotelName>{hotel.name}</HotelName>
            <RoomsInfo>
              <h2>Quarto reservado</h2>
              <p>
                {booking.Room.name} ({getRoomType()})
              </p>
            </RoomsInfo>
            <RoomsInfo>
              <h2>Pessoas no seu quarto</h2>
              <p>{getUsage()}</p>
            </RoomsInfo>
          </Information>
        </HotelContainer>
      </HotelListContainer>
      <Container>
        <Button>
          <h5 onClick={handleChangeRoom}>TROCAR DE QUARTO</h5>
        </Button>
      </Container>
    </>
  );
}
