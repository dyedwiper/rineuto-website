import React, { useEffect, useState } from 'react';
import { Redirect, useHistory } from 'react-router-dom';
import styled from 'styled-components/macro';
import { patchScreening } from '../../utils/services';
import { getFromStorage } from '../../utils/storage';
import LoadingPage from '../LoadingPage';

export default function EditScreeningPage({ screenings, setHasBeenEdited }) {
  const [validationError, setValidationError] = useState('');
  const [screeningToEdit, setScreeningToEdit] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [isInvalidId, setIsInvalidId] = useState(false);

  let history = useHistory();

  useEffect(() => {
    const screeningId = window.location.pathname.slice(-24);
    const screening = screenings.find(
      (screening) => screening._id === screeningId
    );
    if (!screening) {
      setIsInvalidId(true);
    }
    setScreeningToEdit(screening);
    setIsLoading(false);
  }, [screenings]);

  useEffect(() => {
    if (!isInvalidId) {
      document.title = screeningToEdit.title + ' - edit | Rineuto Lichtspiele';
    }
  }, [screeningToEdit, isInvalidId]);

  if (isLoading) {
    return <LoadingPage />;
  }

  if (isInvalidId) {
    return <Redirect to="/404" />;
  }

  return (
    <EditScreeningPageStyled>
      <HeadlineStyled>Vorführung ändern</HeadlineStyled>
      <FormStyled onSubmit={handleSubmit}>
        <LabelStyled>
          Filmtitel
          <InputStyled name="title" defaultValue={screeningToEdit.title} />
        </LabelStyled>
        <LabelStyled>
          Vorführdatum
          <InputStyled
            type="date"
            name="day"
            defaultValue={screeningToEdit.date.toISOString().slice(0, 10)}
          />
        </LabelStyled>
        <LabelStyled>
          Uhrzeit
          <InputStyled
            type="time"
            name="time"
            defaultValue={
              screeningToEdit.date.getHours() +
              ':' +
              screeningToEdit.date.getMinutes()
            }
          />
        </LabelStyled>
        <LabelStyled>
          Regie
          <InputStyled
            name="director"
            defaultValue={screeningToEdit.director}
          />
        </LabelStyled>
        <LabelStyled>
          Bild
          <InputStyled type="file" name="image" />
        </LabelStyled>
        <LabelStyled>
          Länge in Minuten
          <InputStyled name="length" defaultValue={screeningToEdit.length} />
        </LabelStyled>
        <LabelStyled>
          Prodoktionsländer
          <InputStyled name="country" defaultValue={screeningToEdit.country} />
        </LabelStyled>
        <LabelStyled>
          Erscheinungsjahr
          <InputStyled name="year" defaultValue={screeningToEdit.year} />
        </LabelStyled>
        <LabelStyled>
          Version
          <InputStyled name="version" defaultValue={screeningToEdit.version} />
        </LabelStyled>
        <LabelStyled>
          Beschreibung
          <TextareaStyled
            name="synopsis"
            defaultValue={screeningToEdit.synopsis}
          />
        </LabelStyled>
        <LabelStyled>
          Filmreihe
          {/* hier sollte ein select hin */}
          {/* <InputStyled name="series" defaultValue={selectedScreening.series} /> */}
        </LabelStyled>
        <ErrorMessageStyled>{validationError}</ErrorMessageStyled>
        <ButtonStyled
          type="button"
          onClick={() => history.push('/screening/' + screeningToEdit._id)}
        >
          Abbrechen
        </ButtonStyled>
        <ButtonStyled>Senden</ButtonStyled>
      </FormStyled>
    </EditScreeningPageStyled>
  );

  function handleSubmit(event) {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    const jwt = getFromStorage('rineuto-token');
    patchScreening(screeningToEdit._id, formData, jwt)
      .then((updatedScreening) => {
        setHasBeenEdited(true);
        history.push('/screening/' + screeningToEdit._id);
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

const EditScreeningPageStyled = styled.div`
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
`;
