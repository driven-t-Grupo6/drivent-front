import { BookingInfoPage } from '../../../components/Dashboard/Hotel/BookingInfoPage';
import { useState } from 'react';
import { useEffect } from 'react';
import { getBooking } from '../../../services/bookingApi';
import useToken from '../../../hooks/useToken';

export default function Reservation() {
  const [booking, setBooking] = useState(false);
  const token = useToken();

  useEffect(() => {
    getBooking(token)
      .then((res) => {
        setBooking(res);
      })
      .catch((error) => {
        if (error.status === 404) setBooking(false);
      });
  }, []);

  return booking ? <BookingInfoPage booking={booking} /> : <div>Loading...</div>;
}
