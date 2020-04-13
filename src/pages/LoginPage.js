import React, { useState, useContext } from 'react';
import styled from 'styled-components/macro';
import { useHistory } from 'react-router-dom';
import { postLoginUser } from '../utils/services';
import magicGif from '../assets/ahahah.gif';
import UserContext from '../userContext';

export default function LoginPage() {
  const [didLoginFail, setDidLoginFail] = useState(false);
  let history = useHistory();
  const { setUser } = useContext(UserContext);

  return (
    <LoginPageStyled>
      <LoginFormStyled onSubmit={handleSubmit}>
        <LabelStyled>
          Name
          <InputStyled name="username" />
        </LabelStyled>
        <LabelStyled>
          Passwort
          <InputStyled type="password" name="password" />
        </LabelStyled>
        <ButtonStyled>Login</ButtonStyled>
      </LoginFormStyled>
      {didLoginFail && <ImageStyled src={magicGif}></ImageStyled>}
    </LoginPageStyled>
  );

  function handleSubmit(event) {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    const loginData = Object.fromEntries(formData);
    const nameInput = form.elements.username;
    postLoginUser(loginData)
      .then((user) => {
        console.log('user', user);
        setUser(user);
        setDidLoginFail(false);
        history.push('/intern');
      })
      .catch((err) => {
        console.error(err);
        form.reset();
        nameInput.focus();
        setDidLoginFail(true);
      });
  }
}

const LoginPageStyled = styled.main`
  display: grid;
  grid-auto-rows: min-content;
  grid-gap: 40px;
  justify-items: center;
  padding: 20px;
  color: white;
`;

const LoginFormStyled = styled.form`
  display: grid;
  grid-auto-rows: min-content;
  grid-gap: 15px;
`;

const LabelStyled = styled.label`
  display: grid;
  grid-auto-rows: min-content;
  grid-gap: 5px;
`;

const InputStyled = styled.input`
  padding: 5px;
`;

const ButtonStyled = styled.button`
  justify-self: center;
  width: min-content;
  padding: 5px 20px;
`;

const ImageStyled = styled.img`
  width: 90%;
`;
