import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;

const Text = styled.span`
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 400;
  font-size: 20px;
  line-height: 23px;
  text-align: center;
  color: #8e8e8e;
`;

const Button = styled.button`
  width: 145px;
  height: 145px;
  background-color: ${({ active }) => (active ? '#FFEED2' : '#ffff')};
  border-radius: 20px;
  border: ${({ active }) => (active ? 'none' : '1px solid #cecece')};
  margin-top: 20px;
  :last-child {
    margin-left: 20px;
  }
  cursor: pointer;
  h5 {
    font-family: 'Roboto';
    font-size: 16px;
    text-align: center;
    color: #454545;
  }
  p {
    font-family: 'Roboto';
    font-size: 14px;
    line-height: 20px;
    text-align: center;
    color: #898989;
  }
`;

export { Container, Text, Button };
