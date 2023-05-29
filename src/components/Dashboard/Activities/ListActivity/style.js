import styled from 'styled-components';

const ContainerDate = styled.div`
  width: 100%;

  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 20px;

  background-color: white;

  margin-bottom: 60px;
  margin-top: 28px;

  @media (max-width: 840px) {
    flex-direction: column;
    align-items: flex-start;

    margin-bottom: 0;
  }
`;

const Text = styled.span`
  margin-top: 25%;

  font-family: 'Roboto', sans-serif;
  font-style: normal;
  font-weight: 400;
  font-size: 20px;
  line-height: 23px;
  text-align: center;

  color: #8e8e8e;

  ${({ isSelected }) => isSelected && 'display: none'}
`;

const Button = styled.button`
  width: 131px;

  display: flex;
  justify-content: center;
  align-items: center;

  font-family: 'Roboto', sans-serif;
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 20px;
  text-align: center;

  background-color: ${({ isDateSelected }) => (isDateSelected ? '#FFD37D' : '#E0E0E0')};

  box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.25);

  border-radius: 4px;
  border: none;

  padding: 10px;

  :first-child {
    margin-left: 0;
  }

  cursor: pointer;

  :hover {
    box-shadow: 1px 1px 1px 1px #ececec;
  }
`;

const Container = styled.div`
  width: 100%;

  background-color: white;

  display: flex;
  flex-direction: row;
  justify-content: center;

  @media (max-width: 840px) {
    flex-direction: column;
  }
`;

const ContainerActivitiesLeft = styled.div`
  box-sizing: border-box;
  width: 100%;
  min-width: 300px;
  height: 350px;
  padding: 10px 0;

  border-top: 1px solid #d7d7d7;
  border-bottom: 1px solid #d7d7d7;
  border-left: 1px solid #d7d7d7;
  gap: 5px;

  display: flex;
  flex-direction: column;
  flex-flow: column;
  align-items: center;

  overflow-y: auto;
  ::-webkit-scrollbar {
    width: 1px;
    height: 0;
  }
  ::-webkit-scrollbar-thumb {
    background: gray;
  }

  @media (max-width: 840px) {
    width: 90%;

    border-right: 1px solid #d7d7d7;
  }
`;

const ContainerActivitiesRight = styled.div`
  box-sizing: border-box;
  width: 100%;
  min-width: 300px;
  height: 350px;
  padding: 10px 0;

  border-top: 1px solid #d7d7d7;
  border-bottom: 1px solid #d7d7d7;
  border-right: 1px solid #d7d7d7;
  gap: 5px;

  display: flex;
  flex-direction: column;
  flex-flow: column;
  align-items: center;

  overflow: auto;
  ::-webkit-scrollbar {
    width: 1px;
    height: 0;
  }
  ::-webkit-scrollbar-thumb {
    background: gray;
  }

  @media (max-width: 840px) {
    width: 93%;

    border-left: 1px solid #d7d7d7;
  }
`;

const ContainerActivitiesCenter = styled.div`
  box-sizing: border-box;
  width: 100%;
  min-width: 300px;
  height: 350px;
  padding: 10px 0;

  border: 1px solid #d7d7d7;
  gap: 5px;

  display: flex;
  flex-direction: column;
  flex-flow: column;
  align-items: center;

  overflow: auto;
  ::-webkit-scrollbar {
    width: 1px;
    height: 0;
  }
  ::-webkit-scrollbar-thumb {
    background: gray;
  }

  @media (max-width: 840px) {
    width: 92%;
  }
`;

const BoxDiv = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;

  :last-child {
    margin-right: 10px;
  }

  h1 {
    color: #7b7b7b;
    margin-bottom: 13px;
  }
  h2 {
    font-family: 'Roboto';
    font-size: 12px;
    font-weight: 700;
    line-height: 14px;
    text-align: left;
    color: #343434;
  }
  h3 {
    font-family: 'Roboto';
    font-size: 12px;
    font-weight: 400;
    line-height: 14px;
    text-align: left;
    color: #343434;
  }

  @media (max-width: 840px) {
    h1 {
      margin-top: 20px;
    }

    align-items: flex-start;
  }
`;

export {
  Container,
  ContainerDate,
  ContainerActivitiesRight,
  ContainerActivitiesCenter,
  ContainerActivitiesLeft,
  Text,
  Button,
  BoxDiv,
};
