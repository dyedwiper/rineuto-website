import React, { useState, useEffect } from 'react';
import styled from 'styled-components/macro';
import { useHistory } from 'react-router-dom';
import { getFromStorage } from '../../utils/storage';
import { postSerial } from '../../utils/services';

export default function AddSerialPage({ setEditedObject }) {
  const [validationError, setValidationError] = useState('');

  let history = useHistory();

  useEffect(() => {
    document.title = ' Reihe anlegen | Rineuto Lichtspiele';
  }, []);

  return (
    <AddSerialPageStyled>
      <HeadlineStyled>Neue Filmreihe anlegen</HeadlineStyled>
      <FormStyled onSubmit={handleSubmit}>
        <LabelStyled>
          Reihentitel
          <InputStyled name="title" />
        </LabelStyled>
        <LabelStyled>
          Jahr der ersten Vorstellung (vierstellige Zahl)
          <InputStyled name="year" />
        </LabelStyled>
        <LabelStyled>
          Monat der ersten Vorstellung (zweistellige Zahl)
          <InputStyled name="month" />
        </LabelStyled>
        <LabelStyled>
          Poster
          <InputStyled type="file" name="image" />
        </LabelStyled>
        <ErrorMessageStyled>{validationError}</ErrorMessageStyled>
        <ButtonStyled>Filmreihe anlegen</ButtonStyled>
        <ButtonStyled type="button" onClick={() => history.push('/')}>
          Abbrechen
        </ButtonStyled>
      </FormStyled>
    </AddSerialPageStyled>
  );

  function handleSubmit(event) {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    const jwt = getFromStorage('rineuto-token');
    postSerial(formData, jwt)
      .then((res) => {
        setEditedObject({ added: 'serial' });
        history.push('/posters');
      })
      .catch((err) => {
        console.error(err);
        if (err.hasOwnProperty('joiError')) {
          setValidationError(err.joiError);
        }
        if (err.hasOwnProperty('multerError')) {
          setValidationError(err.multerError);
        }
      });
  }
}

const AddSerialPageStyled = styled.div`
  overflow: auto;
  max-width: 600px;
  margin: 20px auto;
  padding: 20px;
  color: white;
`;

const HeadlineStyled = styled.h2`
  margin: 0 0 10px 0;
`;

const FormStyled = styled.form`
  display: grid;
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
  padding: 5px;
`;

const ErrorMessageStyled = styled.span`
  color: red;
  font-size: 1.5em;
`;
