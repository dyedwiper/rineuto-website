import React, { useState } from 'react';
import styled from 'styled-components/macro';
import { postScreening } from '../utils/services';
import { getFromStorage } from '../utils/storage';

export default function InternPage() {
  const [validationError, setValidationError] = useState('');

  return (
    <InternPageStyled>
      <HeadlineStyled>Neues Screening anlegen</HeadlineStyled>
      <FormStyled onSubmit={handleSubmit}>
        <LabelStyled>
          Filmtitel
          <InputStyled name="title" />
        </LabelStyled>
        <LabelStyled>
          Vorführdatum
          <InputStyled type="date" name="day" />
        </LabelStyled>
        <LabelStyled>
          Uhrzeit
          <InputStyled type="time" name="time" defaultValue="20:30" />
        </LabelStyled>
        <LabelStyled>
          Regie
          <InputStyled name="director" />
        </LabelStyled>
        <LabelStyled>
          Bild
          <InputStyled type="file" name="image" />
        </LabelStyled>
        <LabelStyled>
          Länge in Minuten
          <InputStyled name="length" />
        </LabelStyled>
        <LabelStyled>
          Prodoktionsländer
          <InputStyled name="country" />
        </LabelStyled>
        <LabelStyled>
          Erscheinungsjahr
          <InputStyled name="year" />
        </LabelStyled>
        <LabelStyled>
          Version
          <InputStyled name="version" />
        </LabelStyled>
        <LabelStyled>
          Beschreibung
          <TextareaStyled name="synopsis" />
        </LabelStyled>
        <LabelStyled>
          Filmreihe
          <InputStyled name="series" />
        </LabelStyled>
        <LabelStyled>
          Links
          <InputStyled name="links" />
        </LabelStyled>
        <ErrorMessageStyled>{validationError}</ErrorMessageStyled>
        <ButtonStyled>Senden</ButtonStyled>
      </FormStyled>
    </InternPageStyled>
  );

  function handleSubmit(event) {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    const jwt = getFromStorage('rineuto-token');
    postScreening(formData, jwt)
      .then((res) => console.log(res))
      .catch((err) => {
        console.error(err);
        if (err.hasOwnProperty('joiError')) {
          setValidationError(err.joiError);
        }
      });
  }
}

const InternPageStyled = styled.div`
  overflow: auto;
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
`;
