import styled from 'styled-components';
import { BiExit } from 'react-icons/bi';
import { AiOutlineCloseCircle } from 'react-icons/ai';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import { getEntriesByActivityId } from '../../../services/entriesApi';
import useToken from '../../../hooks/useToken';

export function ActivityCard({ activity }) {
  const token = useToken();
  const startsAt = dayjs(activity.startsAt).add(3, 'hour');
  const endsAt = dayjs(activity.endsAt).add(3, 'hour');
  const duration = endsAt.hour() - startsAt.hour();
  const [capacity, setCapacity] = useState(activity.capacity);

  useEffect(() => {
    getEntriesByActivityId(token, activity.id).then((res) => setCapacity(capacity - res.entries));
  }, []);

  return (
    <Container capacity={capacity} duration={duration}>
      <ActivityInfo>
        <h2>{activity.name}</h2>
        <h3>
          {startsAt.format('HH:mm')} - {endsAt.format('HH:mm')}
        </h3>
      </ActivityInfo>
      <ActivityVacancy activity={activity} capacity={capacity}>
        <div>{capacity ? <BiExit /> : <AiOutlineCloseCircle />}</div>
        <p>{capacity ? `${capacity} vagas` : 'Esgotado'}</p>
      </ActivityVacancy>
    </Container>
  );
}

const Container = styled.div`
  box-sizing: border-box;
  font-size: 'Roboto';
  width: 95%;
  min-height: ${(props) => `${props.duration * 80}px`};
  background-color: #f1f1f1;
  border-radius: 5px;
  display: flex;
  justify-content: space-between;
  padding: 10px;
  gap: 15px;
  cursor: ${(props) => (props.capacity ? 'pointer' : 'default')};
  :hover {
    background-color: #dfdfdf;
  }
`;

const ActivityInfo = styled.div`
  width: 200px;
  font-size: 12px;
  display: flex;
  flex-direction: column;
  gap: 5px;
  color: #343434;
  font-weight: 400;
  h1 {
    text-transform: capitalize;
    font-weight: 700;
  }
  padding: 5px;
  border-right: 1px solid #cfcfcf;
`;

const ActivityVacancy = styled.div`
  width: 45px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 5px;
  color: ${(props) => (props.capacity ? '#078632' : '#CC6666')};
  font-weight: 400;
  p {
    font-size: 9px;
  }
  div {
    font-size: 18px;
  }
  padding-right: 5px;
`;
