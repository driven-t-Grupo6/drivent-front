import { useState } from 'react';
import { useEffect } from 'react';
import { ListRooms } from '../ListRooms';
import { getHotels } from '../../../../services/hotelApi';
import { Container, Text, HotelSelect, Hotel, Information } from './style';

export function ListHotels({ token, idHotel }) {
  const [hotels, setHotels] = useState();
  const [typeRooms, setTypeRooms] = useState('Single, Double e Triple');
  const [onRooms, setOnRooms] = useState('100');
  const [selectedHotel, setSelectedHotel] = useState();

  useEffect(() => {
    getHotels(token)
      .then((res) => {
        setHotels(res);
      })
      .catch((error) => {
        if (error.status === 404) setHotels(false);
      });
  }, []);

  if (selectedHotel) {
    return (
      <>
        {!hotels ? (
          <Container>
            <Text>Ainda não há hoteis cadastrados.</Text>
          </Container>
        ) : (
          <>
            <Text>Primeiro, escolha seu hotel</Text>
            <Container>
              {hotels.map((h) =>
                h.id === idHotel ? (
                  <div key={h.id}>
                    <HotelSelect>
                      <img src={h.image} alt="Imagem Hotel" />
                      <Information>
                        <h1>{h.name}</h1>
                        <strong>Tipo de acomodação:</strong>
                        <p>{typeRooms}</p>
                        <strong>Vagas disponíveis:</strong>
                        <p>{onRooms}</p>
                      </Information>
                    </HotelSelect>
                  </div>
                ) : (
                  <div key={h.id}>
                    <Hotel>
                      <img src={h.image} alt="Imagem Hotel" />
                      <Information>
                        <h1>{h.name}</h1>
                        <strong>Tipo de acomodação:</strong>
                        <p>{typeRooms}</p>
                        <strong>Vagas disponíveis:</strong>
                        <p>{onRooms}</p>
                      </Information>
                    </Hotel>
                  </div>
                )
              )}
            </Container>
            <ListRooms token={token} hotel={selectedHotel} />
          </>
        )}
      </>
    );
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
          <Container>
            {hotels.map((h) => (
              <div onClick={() => setSelectedHotel(h)} key={h.id}>
                <Hotel>
                  <img src={h.image} alt="Imagem Hotel" />
                  <h1>{h.name}</h1>
                  <strong>Tipo de acomodação:</strong>
                  <p>{typeRooms}</p>
                  <strong>Vagas disponíveis:</strong>
                  <p>{onRooms}</p>
                </Hotel>
              </div>
            ))}
          </Container>
        </>
      )}
    </>
  );
}
