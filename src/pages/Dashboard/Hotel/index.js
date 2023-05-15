import styled from 'styled-components';
import { useState } from 'react';
import { useEffect } from 'react';
import useToken from '../../../hooks/useToken';
import { StyledTypography } from '../../../components/PersonalInformationForm';
import { getTickets } from '../../../services/ticketApi';
import { ListHotels } from './ListHotels';
import { useParams } from 'react-router-dom';

export default function Hotels() {
  const token = useToken();
  const { idHotel } = useParams();
  const [remoteStatus, setRemoteStatus] = useState(false);
  const [ticketStatus, setTicketStatus] = useState(true);
  const [ticket, setTicket] = useState();

  useEffect(() => {
    getTickets(token)
      .then((res) => {
        const TicketType = res.TicketType;

        if (res.status === 'PAID') setTicketStatus(true);
        if (TicketType.isRemote || TicketType.includesHotel) setRemoteStatus(true);
        setTicket(res);
      })
      .catch((error) => {
        if (error.status === 404) setTicket(false);
      });
  }, []);

  if (!ticket) return <>Carregando...</>;

  return (
    <>
      <StyledTypography variant="h4"> Escolha de hotel e quarto </StyledTypography>
      {!ticket || !ticketStatus ? (
        <Container>
          <Text>Você precisa ter confirmado pagamento antes de fazer a escolha de hospedagem.</Text>
        </Container>
      ) : !remoteStatus ? (
        <Container>
          <Text>
            Sua modalidade de ingresso não inclui hospedagem.
            <br />
            Prossiga para a escolha de atividades.
          </Text>
        </Container>
      ) : (
        <ListHotels idHotel={idHotel} token={token} />
      )}
    </>
  );
}

const Container = styled.div`
  height: 90%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Text = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  font-family: 'Roboto';
  font-size: 20px;
  text-align: center;

  color: #8e8e8e;
`;
