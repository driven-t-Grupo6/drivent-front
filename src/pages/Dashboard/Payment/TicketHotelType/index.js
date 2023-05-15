import { Container, Text, Button } from '../TicketType/style';

export function TicketHotelType({ ticketsType, hotelTicketType, setHotelTicketType, setTicketSelected }) {
  function withHotel() {
    setHotelTicketType({ selected: true, includesHotel: true });
    const [ticket] = ticketsType.filter((e) => !e.isRemote && e.includesHotel);
    setTicketSelected(ticket);
  }

  function withoutHotel() {
    setHotelTicketType({ selected: true, includesHotel: false });
    const [ticket] = ticketsType.filter((e) => !e.isRemote && !e.includesHotel);
    setTicketSelected(ticket);
  }
  const tickets = ticketsType.filter((e) => !e.isRemote);
  const [includesHotel] = tickets.filter((e) => e.includesHotel);
  const [doNotIncludesHotel] = tickets.filter((e) => !e.includesHotel);
  const priceToAdd = (includesHotel.price - doNotIncludesHotel.price) / 100;
  return (
    <>
      <Text>Ótimo! Agora escolha sua modalidade de hospedagem</Text>
      <Container>
        <Button
          active={hotelTicketType.selected && !hotelTicketType.includesHotel}
          disabled={hotelTicketType.selected && !hotelTicketType.includesHotel}
          onClick={withoutHotel}
        >
          <h5>Sem Hotel</h5>
          <p>+ R$ 0</p>
        </Button>
        <Button
          active={hotelTicketType.selected && hotelTicketType.includesHotel}
          disabled={hotelTicketType.selected && hotelTicketType.includesHotel}
          onClick={withHotel}
        >
          <h5>Com Hotel</h5>
          <p>+ {priceToAdd.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</p>
        </Button>
      </Container>
    </>
  );
}
