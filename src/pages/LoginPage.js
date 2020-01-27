import React from 'react';
import styled from 'styled-components/macro';
import { setToStorage } from '../utils/storage';
import { useHistory } from 'react-router-dom';

export default function LoginPage() {
  let history = useHistory();

  return (
    <LoginPageStyled>
      <button onClick={login}>Login</button>
    </LoginPageStyled>
  );

  function login() {
    setToStorage('jwt', 'fake');
    history.push('/intern/addScreening');
  }
}

const LoginPageStyled = styled.main`
  padding: 20px;
  color: white;
`;
