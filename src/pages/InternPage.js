import React from 'react';
import styled from 'styled-components/macro';
import { postScreening } from '../utils/services';
import { getFromStorage } from '../utils/storage';

export default function InternPage() {
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
          <InputStyled type="time" name="time" />
        </LabelStyled>
        <LabelStyled>
          Regie
          <InputStyled name="director" />
        </LabelStyled>
        <LabelStyled>
          URL des Bildes
          <InputStyled name="imageUrl" />
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
          Prodoktionsjahr
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
        <ButtonStyled>Senden</ButtonStyled>
      </FormStyled>
    </InternPageStyled>
  );

  function handleSubmit(event) {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = Object.fromEntries(new FormData(form));
    const jwt = getFromStorage('rineuto-token');
    const screeningData = {
      ...formData,
      date: formData.day + 'T' + formData.time
    };
    delete screeningData.day;
    delete screeningData.time;
    postScreening(screeningData, jwt)
      .then(res => console.log(res))
      .catch(err => console.error(err));
  }
}

const InternPageStyled = styled.main`
  overflow: auto;
  padding: 20px;
  color: white;
`;

const HeadlineStyled = styled.h2`
  margin: 0 0 10px 0;
`;

const FormStyled = styled.form`
  display: grid;
  grid-gap: 10px;
`;

const LabelStyled = styled.label`
  display: grid;
  grid-auto-rows: min-content;
`;

const InputStyled = styled.input``;

const TextareaStyled = styled.textarea``;

const ButtonStyled = styled.button``;
