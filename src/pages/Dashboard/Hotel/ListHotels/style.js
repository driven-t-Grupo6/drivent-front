import styled from 'styled-components';

export const Container = styled.div`
  height: 90%;
  display: flex;
  flex-wrap: wrap;
  padding: 0 35px;
`;

export const Text = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  font-family: 'Roboto';
  font-size: 20px;
  text-align: center;

  color: #8e8e8e;
`;

export const Hotel = styled.div`
  width: 196px;
  height: 264px;
  padding: 16px 14px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  background: #ebebeb;
  border-radius: 10px;

  img {
    width: 168px;
    height: 109px;
    border-radius: 5px;
  }
  h1 {
    font-family: 'Roboto';
    font-size: 20px;
    font-weight: 400px;
    color: #343434;
    margin: 2px;
  }
  strong {
    font-family: 'Roboto';
    font-weight: 700;
    font-size: 12px;
    color: #3c3c3c;
    margin: 2px;
  }
  p {
    font-family: 'Roboto';
    font-weight: 400;
    font-size: 12px;
    color: #3c3c3c;
    margin: 2px;
  }
`;

export const HotelSelect = styled.div`
  width: 196px;
  height: 264px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  background: #ffeed2;
  border-radius: 10px;
`;

export const Information = styled.div`
  width: 100%;
  height: 100%;
  padding: 10px 12px 22px 12px;
  display: flex;
  flex-direction: column;
  justify-content: start;
`;
