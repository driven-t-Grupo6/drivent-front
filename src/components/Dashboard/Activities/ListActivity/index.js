import {
  Container,
  ContainerDate,
  ContainerActivitiesRight,
  ContainerActivitiesCenter,
  ContainerActivitiesLeft,
  Text,
  Button,
  BoxDiv,
} from './style';
import { getActivitiesByDate } from '../../../../services/activitiesApi';
import { toast } from 'react-toastify';
import useToken from '../../../../hooks/useToken';
import { useState } from 'react';
import { ActivityCard } from '../ActivityCard';
import NoPayPage from '../NoPayPage';
import { useEffect } from 'react';
import { getEntriesByUserId } from '../../../../services/entriesApi';
import { getTickets } from '../../../../services/ticketApi';

export function ListActivity({ dateInfo }) {
  const token = useToken();
  const [isDateSelected, setDateSelected] = useState(false);
  const [userEntries, setUserEntries] = useState([]);
  const [arrayPrincipal, setArrayPrincipal] = useState([]);
  const [arrayLateral, setArrayLateral] = useState([]);
  const [arrayWorkshop, setArrayWorkshop] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const [ticketPaid, setTicketPaid] = useState(false);

  useEffect(() => {
    getTickets(token)
      .then((res) => {
        if (res.status === 'PAID') setTicketPaid(true);
      })
      .catch((error) => {
        // eslint-disable-next-line no-console
        console.error(error);
      });
    getEntriesByUserId(token).then((res) => setUserEntries(res));
  }, [isLoading]);

  function handleDateChange(d) {
    setIsLoading(true);
    renderDate(d);
    findActivitiesByDate(d);
  }

  async function findActivitiesByDate(d) {
    setIsLoading(true);

    let newPrincipal = [];
    let newLateral = [];
    let newWorkshop = [];

    try {
      const promiseActivity = await getActivitiesByDate(d.originalDate, token);

      for (let i = 0; i < promiseActivity.length; i++) {
        promiseActivity[i].isSelected = false;

        if (promiseActivity[i].local === 'Auditório Principal' && promiseActivity[i].day === d.originalDate) {
          newPrincipal.push(promiseActivity[i]);
        }
        if (promiseActivity[i].local === 'Auditório Lateral' && promiseActivity[i].day === d.originalDate) {
          newLateral.push(promiseActivity[i]);
        }
        if (promiseActivity[i].local === 'Sala de Workshop' && promiseActivity[i].day === d.originalDate) {
          newWorkshop.push(promiseActivity[i]);
        }
      }

      setArrayPrincipal(newPrincipal);
      setArrayLateral(newLateral);
      setArrayWorkshop(newWorkshop);

      setIsLoading(false);
    } catch {
      setIsLoading(false);
      toast.error('Algo deu errado, tente novamente.');
    }
  }

  function renderDate(dates) {
    for (let i = 0; i < dateInfo.length; i++) {
      if (i === dates.id - 1) {
        dateInfo[i].isSelected = true;
        setDateSelected(true);
      } else {
        dateInfo[i].isSelected = false;
        setDateSelected(true);
      }
    }
    return dates;
  }

  if (!ticketPaid) return <NoPayPage />;

  return (
    <>
      <Text isSelected={isDateSelected}>Primeiro, filtre pelo dia do evento: </Text>
      <ContainerDate>
        {dateInfo?.map((d) => (
          <Button key={d.id} onClick={() => handleDateChange(d)} isDateSelected={d.isSelected}>
            {d.day}
          </Button>
        ))}
      </ContainerDate>
      {isDateSelected && (
        <Container>
          {isLoading ? (
            <>Loading...</>
          ) : (
            <>
              <BoxDiv>
                <h1>Auditório Principal</h1>
                <ContainerActivitiesLeft>
                  {arrayPrincipal.map((a) => (
                    <ActivityCard userEntries={userEntries} key={a.id} activity={a} />
                  ))}
                </ContainerActivitiesLeft>
              </BoxDiv>
              <BoxDiv>
                <h1>Auditório Lateral</h1>
                <ContainerActivitiesCenter>
                  {arrayLateral.map((a) => (
                    <ActivityCard userEntries={userEntries} key={a.id} activity={a} />
                  ))}
                </ContainerActivitiesCenter>
              </BoxDiv>
              <BoxDiv>
                <h1>Sala de Workshop</h1>
                <ContainerActivitiesRight>
                  {arrayWorkshop.map((a) => (
                    <ActivityCard userEntries={userEntries} key={a.id} activity={a} />
                  ))}
                </ContainerActivitiesRight>
              </BoxDiv>
            </>
          )}
        </Container>
      )}
    </>
  );
}
