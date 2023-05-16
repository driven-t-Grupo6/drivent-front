import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;

export const HotelListContainer = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  margin-bottom: 20px;
  gap: 1.5rem;
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

export const HotelContainer = styled.div`
  box-sizing: border-box;
  width: 196px;
  height: 264px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  gap: 0.1rem;
  padding: 1rem 0;

  background: ${(props) => (!props.selected ? '#ebebeb' : '#ffeed2')};
  border-radius: 10px;

  font-family: 'Roboto';

  h2 {
    font-family: 'Roboto';
    font-weight: 700;
    font-size: 12px;
    color: #3c3c3c;
  }
  p {
    font-family: 'Roboto';
    font-weight: 400;
    font-size: 12px;
    color: #3c3c3c;
  }
`;

export const HotelImage = styled.img`
  width: 168px;
  aspect-ratio: 1.5;
  border-radius: 5px;
`;

export const Information = styled.div`
  width: 100%;
  height: 100%;
  padding: 10px 12px 22px 12px;
  display: flex;
  flex-direction: column;
  gap: 0.9rem;
`;

export const HotelName = styled.h1`
  font-size: 20px;
  font-weight: 400px;
  color: #343434;
`;

export const RoomsInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
`;
