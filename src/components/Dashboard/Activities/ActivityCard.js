import styled from 'styled-components';
import { BiExit } from 'react-icons/bi';
import { AiOutlineCheckCircle, AiOutlineCloseCircle } from 'react-icons/ai';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import { createEntry, getEntriesByActivityId } from '../../../services/entriesApi';
import useToken from '../../../hooks/useToken';
import Loader from 'react-loader-spinner';

export function ActivityCard({ userEntries, activity }) {
  const token = useToken();
  const [entry, setEntry] = useState(userEntries.entries?.some((e) => e.activityId === activity.id));
  const startsAt = dayjs(activity.startsAt).add(3, 'hour');
  const endsAt = dayjs(activity.endsAt).add(3, 'hour');
  const duration = endsAt.hour() - startsAt.hour();
  const [capacity, setCapacity] = useState(activity.capacity);
  const [load, setLoad] = useState(false);

  useEffect(() => {
    getEntriesByActivityId(token, activity.id).then((res) => setCapacity(capacity - res.entries));
  }, []);

  function entryActivity(activityId) {
    if (load || entry) return;
    setLoad(true);
    createEntry(token, activityId)
      .then(() => {
        setLoad(false);
        setEntry(true);
      })
      .catch((err) => {
        setLoad(false);
        console.log({ ...err });
        if (err.response.status === 409) alert(err.response.data.message);
      });
  }

  return (
    <Container onClick={() => entryActivity(activity.id)} entry={entry} capacity={capacity} duration={duration}>
      <ActivityInfo>
        <h2>{activity.name}</h2>
        <h3>
          {startsAt.format('HH:mm')} - {endsAt.format('HH:mm')}
        </h3>
      </ActivityInfo>
      <ActivityVacancy activity={activity} capacity={capacity}>
        {load ? (
          <Loader
            height="30"
            width="30"
            color="#000000"
            ariaLabel="audio-loading"
            wrapperStyle={{}}
            wrapperClass="wrapper-class"
            visible={true}
          />
        ) : entry ? (
          <>
            <div>
              <AiOutlineCheckCircle />
            </div>
            <p>Inscrito</p>
          </>
        ) : (
          <>
            <div>{capacity ? <BiExit /> : <AiOutlineCloseCircle />}</div>
            <p>{capacity ? `${capacity} vagas` : 'Esgotado'}</p>
          </>
        )}
      </ActivityVacancy>
    </Container>
  );
}

const Container = styled.div`
  box-sizing: border-box;
  font-style: 'Roboto', 'sans-serif';
  width: 95%;
  min-height: ${(props) => `${props.duration * 80}px`};
  background-color: ${(props) => (props.entry ? '#D0FFDB' : '#f1f1f1')};
  border-radius: 5px;
  display: flex;
  justify-content: space-between;
  padding: 10px;
  gap: 15px;
  cursor: ${(props) => (!props.entry && props.capacity ? 'pointer' : 'default')};
  :hover {
    background-color: ${(props) => (props.entry ? '' : '#dfdfdf;')};
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
  h2 {
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
