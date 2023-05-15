import { useState } from 'react';
import { useEffect } from 'react';
import { getHotelsWithRooms } from '../../../../services/hotelApi';
import { Container, Room, Capacity, Text } from './style';
import { FaUser } from 'react-icons/fa';

export function ListRooms({ token, hotel }) {
  const [rooms, setRooms] = useState();

  useEffect(() => {
    const promise = getHotelsWithRooms(token, hotel.id);
    promise
      .then((res) => {
        setRooms(res.Rooms);
      })
      .catch((error) => {
        if (error.status === 404) setRooms(false);
      });
  }, []);

  if (!rooms) return <>Carregando...</>;

  function capacity(qtd) {
    const capacityUser = [];
    for (let i = 0; i < qtd; i++) {
      capacityUser.push(<FaUser name="person" />);
    }
    return capacityUser;
  }

  return (
    <>
      <Text>Ótima pedida! Agora escolha seu quarto:</Text>
      <Container>
        {rooms.map((r) => (
          <Room key={r.id}>
            <p>{r.id}</p>
            <Capacity>{capacity(r.capacity).map((r) => r)}</Capacity>
          </Room>
        ))}
      </Container>
    </>
  );
}
