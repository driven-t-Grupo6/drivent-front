import { Container, Text, Button } from './style';

export function Reservation({ reservation, ticketSelected }) {
  const finalPrice = (ticketSelected.price / 100).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

  return (
    <>
      <Text>Fechado! O total ficou em {finalPrice}. Agora é só confirmar:</Text>
      <Container>
        <Button onClick={() => reservation()}>
          <h5>RESERVAR INGRESSO</h5>
        </Button>
      </Container>
    </>
  );
}
