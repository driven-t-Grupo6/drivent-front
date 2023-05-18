import React, { useState, useEffect } from 'react';
import { PaymentContent, TicketContent, CardContent } from './style';
import useToken from '../../../../hooks/useToken';
import PaidPage from '../../../../components/Dashboard/Payment/PaidPage';
import { createPaymentParams } from '../../../../services/paymentApi';
import Cards from 'react-credit-cards-2';
import 'react-credit-cards-2/dist/es/styles-compiled.css';

function PaymentForm({ ticket }) {
  const ticketPriceAjust = ticket.TicketType.price / 100;
  const token = useToken();
  const [userTicket, setUserTicket] = useState(ticket);
  const [paid, setPaid] = useState(false);
  const [issuer, setIssuer] = useState('');
  const [state, setState] = useState({
    number: '',
    expiry: '',
    cvc: '',
    name: '',
    focus: '',
  });

  useEffect(() => {
    if (ticket.status === 'PAID') {
      setPaid(true);
    }
  }, []);

  const handleInputChange = (evt) => {
    const { name, value } = evt.target;

    setState((prev) => ({ ...prev, [name]: value }));
  };

  const handleInputFocus = (evt) => {
    setState((prev) => ({ ...prev, focus: evt.target.name }));
  };
  const handleCardIssuer = (cardIssuer) => {
    setIssuer(cardIssuer.issuer);
  };

  async function finalizePayment() {
    if (state.number.length !== 16 || state.cvc.length !== 3 || state.expiry.length !== 4 || state.name.length === 0) {
      return alert('Dados do cartão inválidos');
    }
    const cardData = {
      issuer: issuer,
      number: state.number,
      name: state.name,
      expirationDate: state.expiry,
      cvv: state.cvc,
    };
    const bodyRequest = { ticketId: ticket.id, cardData: cardData };
    try {
      await createPaymentParams(bodyRequest, token);
      setUserTicket({ ...userTicket, status: 'PAID' });
      setPaid(true);
    } catch (error) {
      alert('Erro ao digitar os dados do cartão');
    }
  }

  return (
    <>
      <PaymentContent>
        <h1>Ingresso e Pagamento</h1>
        <h2>Ingresso Escolhido</h2>
        <TicketContent>
          <h3>{ticket.TicketType.name}</h3>
          <h4>+ {ticketPriceAjust.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</h4>
        </TicketContent>
        <h2>Pagamento</h2>
        {!paid ? (
          <>
            <CardContent>
              <Cards
                number={state.number}
                expiry={state.expiry}
                cvc={state.cvc}
                name={state.name}
                focused={state.focus}
                callback={handleCardIssuer}
              />
              <form>
                <input
                  type="number"
                  name="number"
                  placeholder="Card Number"
                  value={state.number}
                  onChange={handleInputChange}
                  onFocus={handleInputFocus}
                />
                <h5>E.g.: 49..., 51..., 36..., 37...</h5>
                <input
                  type="text"
                  name="name"
                  placeholder="Name"
                  value={state.name}
                  onChange={handleInputChange}
                  onFocus={handleInputFocus}
                  minLength={5}
                  maxLength={17}
                />
                <input
                  type="number"
                  name="expiry"
                  placeholder="Valid Thru"
                  value={state.expiry}
                  onChange={handleInputChange}
                  onFocus={handleInputFocus}
                  className="validThru"
                  mask="99/99"
                />
                <input
                  type="number"
                  name="cvc"
                  placeholder="CVC"
                  value={state.cvc}
                  onChange={handleInputChange}
                  onFocus={handleInputFocus}
                  className="cvc"
                />
              </form>
            </CardContent>
            <button onClick={finalizePayment}>
              <p>FINALIZAR PAGAMENTO</p>
            </button>
          </>
        ) : (
          <PaidPage />
        )}
      </PaymentContent>
    </>
  );
}

export default PaymentForm;
