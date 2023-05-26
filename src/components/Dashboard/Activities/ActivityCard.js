import styled from 'styled-components';
import { BiExit } from 'react-icons/bi';
import { AiOutlineCloseCircle } from 'react-icons/ai';
import dayjs from 'dayjs';

export function ActivityCard({ activity, entrysCount }) {
  const vacanciesAvailable = activity.vacancies - entrysCount;

  const duration = dayjs(activity.end).hour() - dayjs(activity.start).hour();

  return (
    <Container duration={duration}>
      <ActivityInfo>
        <h1>{activity.name}</h1>
        <div>
          {dayjs(activity.start).format('HH:mm')} - {dayjs(activity.end).format('HH:mm')}
        </div>
      </ActivityInfo>
      <ActivityVacancy vacanciesAvailable={vacanciesAvailable}>
        <div>{vacanciesAvailable ? <BiExit /> : <AiOutlineCloseCircle />}</div>
        <p>{vacanciesAvailable ? `${vacanciesAvailable} vagas` : 'Esgotado'}</p>
      </ActivityVacancy>
    </Container>
  );
}

const Container = styled.div`
  box-sizing: border-box;
  font-size: 'Roboto';
  width: 265px;
  height: ${(props) => `${props.duration * 79}px`};
  background-color: #f1f1f1;
  border-radius: 5px;
  display: flex;
  justify-content: space-between;
  padding: 10px;
  gap: 15px;
`;

const ActivityInfo = styled.div`
  width: 200px;
  font-size: 12px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  color: #343434;
  font-weight: 400;
  h1 {
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
  color: ${(props) => (props.vacanciesAvailable ? '#078632' : '#CC6666')};
  font-weight: 400;
  p {
    font-size: 9px;
  }
  div {
    font-size: 18px;
  }
  padding-right: 5px;
`;
