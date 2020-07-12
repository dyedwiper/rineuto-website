import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components/macro';
import { postNotice } from '../../utils/services';
import { getFromStorage } from '../../utils/storage';

export default function AddNoticePage({ setEditedObject, setIsWaiting }) {
  const [validationError, setValidationError] = useState('');

  let history = useHistory();

  useEffect(() => {
    document.title = ' News anlegen | Rineuto Lichtspiele';
  }, []);

  return (
    <AddNoticePageStyled>
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
          Bild (max. 1 MB)
          <InputStyled type="file" name="image" />
        </LabelStyled>
        <LabelStyled>
          Text
          <TextareaStyled name="text" />
        </LabelStyled>
        <ErrorMessageStyled>{validationError}</ErrorMessageStyled>
        <ButtonStyled>News anlegen</ButtonStyled>
        <ButtonStyled type="button" onClick={() => history.push('/')}>
          Abbrechen
        </ButtonStyled>
      </FormStyled>
    </AddNoticePageStyled>
  );

  function handleSubmit(event) {
    event.preventDefault();
    setIsWaiting(true);
    const form = event.currentTarget;
    const formData = new FormData(form);
    const jwt = getFromStorage('rineuto-token');
    postNotice(formData, jwt)
      .then(() => {
        setEditedObject({ added: 'notice' });
        setIsWaiting(false);
        history.push('/');
      })
      .catch((err) => {
        setIsWaiting(false);
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

const AddNoticePageStyled = styled.div`
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

const InputStyled = styled.input``;

const TextareaStyled = styled.textarea`
  display: block;
  overflow: auto;
  resize: none;
  min-height: 150px;
`;

const ButtonStyled = styled.button`
  justify-self: center;
`;

const ErrorMessageStyled = styled.span`
  color: red;
  font-size: 1.5em;
`;
