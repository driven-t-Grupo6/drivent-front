import { Container, Text, Button } from './style';

export function TicketType({
  active,
  setActive,
  setInPerson,
  selected,
  setSelected,
  form,
  setForm,
  ticketsType,
  setTicketSelected,
  setHotelTicketType,
}) {
  function inPersonChange() {
    setSelected({ inPerson: true, online: false });
    setActive({ inPersonActive: true, onlineActive: false });
    setInPerson(true);
    setForm({ ...form, online: false });
    setHotelTicketType({ selected: false, includesHotel: null });
  }

  function onlineChange() {
    setSelected({ inPerson: false, online: true });
    setActive({ inPersonActive: false, onlineActive: true });
    setInPerson(false);
    setForm({ ...form, online: true });
    const [ticket] = ticketsType.filter((e) => e.isRemote);
    setTicketSelected(ticket);
    setHotelTicketType({ selected: false, includesHotel: null });
  }

  const [ticketsOnline] = ticketsType.filter((e) => e.isRemote);
  const [ticketsInPerson] = ticketsType.filter((e) => !e.isRemote && !e.includesHotel);
  const priceOnline = ticketsOnline.price / 100;
  const priceInPerson = ticketsInPerson.price / 100;

  return (
    <>
      <Text>Primeiro, escolha sua modalidade de ingresso</Text>
      <Container>
        <Button active={active.inPersonActive} selected={selected} onClick={inPersonChange}>
          <h5>Presencial</h5>
          <p>{priceInPerson.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</p>
        </Button>
        <Button active={active.onlineActive} selected={selected} onClick={onlineChange}>
          <h5>Online</h5>
          <p>{priceOnline.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</p>
        </Button>
      </Container>
    </>
  );
}
