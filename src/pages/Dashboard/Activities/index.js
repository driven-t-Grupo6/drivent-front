import styled from 'styled-components';
import { useEffect, useState } from 'react';
import { StyledTypography } from '../../../components/PersonalInformationForm/index';
import { ListActivity } from '../../../components/Dashboard/Activities/ListActivity/index';
import { getDatesInfo } from '../../../services/activitiesApi';
import { getPersonalInformations } from '../../../services/enrollmentApi';
import { getTickets } from '../../../services/ticketApi';
import useToken from '../../../hooks/useToken';

export default function Activities() {
  const token = useToken();
  const [dates, setDates] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [online, setOnline] = useState(false);

  useEffect(() => {
    handleDatabaseCalls();
  }, []);

  async function handleDatabaseCalls() {
    try {
      const promiseEnrollment = await getPersonalInformations(token);
      const enrollmentData = promiseEnrollment.id;

      const promiseTicket = await getTickets(token, enrollmentData);
      if (promiseTicket.TicketType.isRemote === false) setOnline(false);
      if (promiseTicket.TicketType.isRemote === true) setOnline(true);

      const promiseActivity = await getDatesInfo(token);
      setDates(promiseActivity);

      setLoading(false);
    } catch {
      setLoading(true);
      setOnline(false);
    }
  }

  return (
    <>
      <StyledTypography variant="h4">Escolha de atividades</StyledTypography>
      {isLoading ? (
        <>Loading...</>
      ) : online ? (
        <Container>
          <Text>
            Sua modalidade de ingresso não necessita escolher <br />
            atividade. Você terá acesso a todas as atividades.
          </Text>
        </Container>
      ) : (
        <ListActivity dateInfo={dates} setDates={setDates} />
      )}
    </>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Text = styled.span`
  margin-top: 30%;
  font-family: 'Roboto', sans-serif;
  font-style: normal;
  font-weight: 400;
  font-size: 20px;
  line-height: 23px;
  text-align: center;
  color: #8e8e8e;
`;
