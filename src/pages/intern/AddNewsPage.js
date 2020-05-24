import React, { useState } from 'react';
import styled from 'styled-components/macro';
import { getFromStorage } from '../../utils/storage';
import { useHistory } from 'react-router-dom';
import { postNews } from '../../utils/services';

export default function AddNewsPage() {
  const [validationError, setValidationError] = useState('');

  let history = useHistory();

  return (
    <AddNewsPageStyled>
      <HeadlineStyled>Neue News anlegen</HeadlineStyled>
      <FormStyled onSubmit={handleSubmit}>
        <LabelStyled>
          Schlagzeile
          <InputStyled name="title" />
        </LabelStyled>
        <LabelStyled>
          Datum
          <InputStyled type="date" name="date" defaultValue={new Date().toISOString().slice(0, 10)} />
        </LabelStyled>
        <LabelStyled>
          Bild
          <InputStyled type="file" name="image" />
        </LabelStyled>
        <LabelStyled>
          Text
          <TextareaStyled name="text" />
        </LabelStyled>
        <ErrorMessageStyled>{validationError}</ErrorMessageStyled>
        <ButtonStyled type="button" onClick={() => history.push('/')}>
          Abbrechen
        </ButtonStyled>
        <ButtonStyled>Senden</ButtonStyled>
      </FormStyled>
    </AddNewsPageStyled>
  );

  function handleSubmit(event) {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    const jwt = getFromStorage('rineuto-token');
    postNews(formData, jwt)
      .then(() => {
        history.push('/');
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

const AddNewsPageStyled = styled.div`
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

const TextareaStyled = styled.textarea`
  display: block;
  overflow: auto;
  resize: none;
  min-height: 150px;
  padding: 5px;
`;

const ButtonStyled = styled.button`
  justify-self: center;
  width: min-content;
  padding: 5px;
`;

const ErrorMessageStyled = styled.span`
  color: red;
  font-size: 1.5em;
`;
