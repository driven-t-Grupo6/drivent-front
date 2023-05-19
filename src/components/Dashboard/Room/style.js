import styled from 'styled-components';

export const Room = styled.div`
  cursor: ${(props) => (props.isFilled ? 'default' : 'pointer')};
  box-sizing: border-box;
  padding: 0.55rem;
  width: 190px;
  height: 45px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border: 1px solid #cecece;
  border-radius: 10px;
  background-color: ${(props) => (props.isUserBooking ? '#FFEED2' : props.isFilled ? '#CECECE' : 'none')};
  p {
    font-family: 'Roboto';
    font-weight: 700;
    font-size: 20px;
    text-align: center;
    color: #454545;
  }
`;

export const Capacity = styled.div`
  font-size: 20px;
  display: flex;
  gap: 0.1rem;
`;
