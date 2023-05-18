import { PaymentConfirme, ConfirmeIcon } from '../../../pages/Dashboard/Payment/TicketPayment/style';

function PaidPage() {
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
export default PaidPage;
