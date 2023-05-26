import { ActivityCard } from '../../../components/Dashboard/Activities/ActivityCard';
export default function Activities() {
  const ACTIVITY = {
    name: 'Nome da atividade',
    vacancies: 20,
    start: '2023-07-11 09:00:00',
    end: '2023-07-11 10:00:00',
  };

  const entrysCount = 20;

  return <ActivityCard activity={ACTIVITY} entrysCount={entrysCount} />;
}
