import styled from 'styled-components/macro';

export const WaitNoteStyled = styled.div`
  justify-self: center;
  margin-top: 20px;

  animation: spin 1s infinite;
  @keyframes spin {
    100% {
      transform: rotate(360deg);
    }
  }
`;
