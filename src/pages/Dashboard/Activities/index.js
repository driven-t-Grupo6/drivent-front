import { useEffect, useState } from 'react';
import { ListActivity } from '../../../components/Dashboard/Activities/ListActivity/index';
import { getDatesInfo } from '../../../services/activitiesApi';

import useToken from '../../../hooks/useToken';

export default function Activities() {
  const token = useToken();
  const [dates, setDates] = useState([]);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    handleDatabaseCalls();
  }, []);

  async function handleDatabaseCalls() {
    try {
      const promiseActivity = await getDatesInfo(token);
      setDates(promiseActivity);

      setLoading(false);
    } catch {
      setLoading(true);
    }
  }

  return <>{isLoading ? <>Loading...</> : <ListActivity dateInfo={dates} setDates={setDates} />}</>;
}
