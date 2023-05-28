import styled from 'styled-components';

function NoPayPage() {
  return (
    <MainText>
      <p>Você precisa ter confirmado pagamento antes de fazer a escolha de atividades</p>
    </MainText>
  );
}
export default NoPayPage;
const MainText = styled.div`
  height: 80%;
  display: flex;
  align-items: center;
  justify-content: center;
  p {
    width: 460px;
    text-align: center;
    font-size: 20px;
    color: #8e8e8e;
  }
`;
