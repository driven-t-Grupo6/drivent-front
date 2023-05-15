import React, { useState } from 'react';
import { PaymentContent, TicketContent, PaymentConfirme, ConfirmeIcon, CardContent } from './style';
import useToken from '../../../../hooks/useToken';
import Cards from 'react-credit-cards-2';
import 'react-credit-cards-2/dist/es/styles-compiled.css';
import { createPaymentParams } from '../../../../services/paymentApi';

const PaymentForm = ({ ticket }) => {
  const ticketPriceAjust = ticket.TicketType.price / 100;
  const token = useToken();
  const [number, setNumber] = useState('');
  const [expiry, setExpity] = useState('');
  const [cvc, setCvc] = useState('');
  const [name, setName] = useState('');
  const [focus, setFocus] = useState('');
  const [issuer, setIssuer] = useState('');
  const [userTicket, setUserTicket] = useState(ticket);

  const handleInputFocus = (e) => {
    setFocus(e.target.name);
  };

  const handleCardTypeChange = (cardType) => {
    setIssuer(cardType.issuer);
  };

  function Paid() {
    return (
      <>
        <PaymentConfirme>
          <ConfirmeIcon />
          <p>
            <strong>Pagamento confirmado!</strong>
            <br />
            Prossiga para escolha de hospedagem e atividades
          </p>
        </PaymentConfirme>
      </>
    );
  }
  function Reserve() {
    return (
      <>
        <CardContent>
          <Cards
            cvc={cvc}
            expiry={expiry}
            focused={focus}
            name={name}
            number={number}
            callback={handleCardTypeChange}
          />
          <form>
            <input
              type="number"
              name="number"
              placeholder="Card Number"
              value={number}
              onChange={(e) => setNumber(e.target.value)}
              onFocus={handleInputFocus}
              required
            />
            <h5>E.g.: 49..., 51..., 36..., 37...</h5>
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              onFocus={handleInputFocus}
            />
            <input
              type="number"
              name="expiry"
              placeholder="Valid Thru"
              value={expiry}
              onChange={(e) => setExpity(e.target.value)}
              onFocus={handleInputFocus}
              className="validThru"
              mask="99/99"
            />
            <input
              type="number"
              name="cvc"
              placeholder="CVC"
              value={cvc}
              onChange={(e) => setCvc(e.target.value)}
              onFocus={handleInputFocus}
              className="cvc"
            />
          </form>
        </CardContent>
        <button onClick={finalizePayment}>
          <p>FINALIZAR PAGAMENTO</p>
        </button>
      </>
    );
  }

  function PaymentRender() {
    if (userTicket.status === 'PAID') return Paid();
    return Reserve();
  }
  async function finalizePayment(e) {
    e.preventDefault();
    const cardData = {
      issuer: issuer,
      number: number,
      name: name,
      expirationDate: expiry,
      cvv: cvc,
    };
    const bodyRequest = { ticketId: ticket.id, cardData: cardData };
    try {
      await createPaymentParams(bodyRequest, token);
      setUserTicket({ ...userTicket, status: 'PAID' });
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
        <PaymentRender />
      </PaymentContent>
    </>
  );
};

export default PaymentForm;
