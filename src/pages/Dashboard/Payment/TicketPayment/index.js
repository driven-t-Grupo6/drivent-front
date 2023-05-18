import React, { useState } from 'react';
import { PaymentContent, TicketContent, PaymentConfirme, ConfirmeIcon } from './style';
import useToken from '../../../../hooks/useToken';
import { createPaymentParams } from '../../../../services/paymentApi';
import PaymentTest from '../../../../components/Dashboard/Payment/PaymentForm';

function PaymentForm({ ticket }) {
  const ticketPriceAjust = 1000; //ticket.TicketType.price / 100;
  const token = useToken();
  const [issuer, setIssuer] = useState('');
  const [userTicket, setUserTicket] = useState(ticket);

  const [state, setState] = useState({
    number: '',
    expiry: '',
    cvc: '',
    name: '',
    focus: '',
  });

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
        <PaymentTest state={state} setState={setState} />
        <button onClick={finalizePayment}>
          <p>FINALIZAR PAGAMENTO</p>
        </button>
      </>
    );
  }

  function PaymentRender() {
    if (userTicket === 'PAID') return Paid();
    return Reserve();
  }
  async function finalizePayment(e) {
    /*e.preventDefault();
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
    }*/
  }

  return (
    <>
      <PaymentContent>
        <h1>Ingresso e Pagamento</h1>
        <h2>Ingresso Escolhido</h2>
        <TicketContent>
          <h3>Jorge</h3>
          <h4>+ {ticketPriceAjust.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</h4>
        </TicketContent>
        <h2>Pagamento</h2>
        <PaymentRender />
      </PaymentContent>
    </>
  );
}

export default PaymentForm;
