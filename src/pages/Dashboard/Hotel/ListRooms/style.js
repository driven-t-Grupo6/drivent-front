import styled from 'styled-components';

export const Container = styled.div`
  box-sizing: border-box;
  height: 90%;
  display: flex;
  flex-wrap: wrap;
  padding: 0.25rem;
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

export const Room = styled.div`
  box-sizing: border-box;
  padding: 0.55rem;
  width: 190px;
  height: 45px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border: 1px solid #cecece;
  border-radius: 10px;
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
