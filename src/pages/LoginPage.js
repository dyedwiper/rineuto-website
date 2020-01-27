import React from 'react';
import styled from 'styled-components/macro';
import { setToStorage } from '../utils/storage';
import { useHistory } from 'react-router-dom';
import { postLoginUser } from '../utils/services';

export default function LoginPage() {
  let history = useHistory();

  return (
    <LoginPageStyled>
      <LoginFormStyled onSubmit={handleSubmit}>
        <InputStyled name="username" />
        <InputStyled type="password" name="password" />
        <ButtonStyled>Login</ButtonStyled>
      </LoginFormStyled>
    </LoginPageStyled>
  );

  function handleSubmit(event) {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    const loginData = Object.fromEntries(formData);
    postLoginUser(loginData)
      .then(res => {
        if (!res.ok) {
          return res.json().then(err => {
            throw err;
          });
        }
        setToStorage('jwt', res.headers.get('auth-token'));
        history.push('/intern/addScreening');
      })
      .catch(err => console.error(err));
  }
}

const LoginPageStyled = styled.main`
  padding: 20px;
  color: white;
`;

const LoginFormStyled = styled.form`
  display: grid;
  grid-auto-rows: min-content;
  grid-gap: 10px;
`;

const InputStyled = styled.input``;

const ButtonStyled = styled.button``;
