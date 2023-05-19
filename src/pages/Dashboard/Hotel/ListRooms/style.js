import styled from 'styled-components';

export const Container = styled.div`
  box-sizing: border-box;
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem 1rem;
`;

export const Text = styled.div`
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 400;
  font-size: 20px;
  line-height: 23px;
  color: #8e8e8e;
  margin: 2rem 0;
`;

export const Button = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 162px;
  height: 37px;
  background: #e0e0e0;
  box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.25);
  border-radius: 4px;
  cursor: pointer;
  margin-top: 20px;
  h5 {
    font-family: 'Roboto';
    font-style: normal;
    font-weight: 400;
    font-size: 12px;
    line-height: 16px;
    color: #000000;
  }
`;
