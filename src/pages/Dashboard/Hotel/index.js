import HotelPage from '../../../components/Dashboard/Hotel/HotelPage';
import { useEffect } from 'react';
import { getBooking } from '../../../services/bookingApi';
import useToken from '../../../hooks/useToken';
import { useNavigate, useLocation } from 'react-router-dom';
import { useState } from 'react';

export default function Hotels() {
  const [booking, setBooking] = useState();
  const location = useLocation();
  const token = useToken();
  const navigate = useNavigate();
  const changeBookingStatus = new URLSearchParams(location.search).get('change') === 'true' ? true : false;

  useEffect(() => {
    getBooking(token)
      .then((res) => {
        if (!changeBookingStatus) navigate('/dashboard/hotel/reservation');
        setBooking(res);
      })
      .catch((error) => {
        // eslint-disable-next-line no-console
        if (error.status === 404) console.log('Nenhuma reserva encontrada...');
      });
  }, []);

  return <HotelPage booking={booking} setBooking={setBooking} changeBookingStatus={changeBookingStatus} />;
}
