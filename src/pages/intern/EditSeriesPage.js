import React, { useEffect, useState } from 'react';
import { useHistory, Redirect } from 'react-router-dom';
import styled from 'styled-components/macro';
import { patchSeries, deleteSeries } from '../../utils/services';
import { getFromStorage } from '../../utils/storage';
import LoadingPage from '../LoadingPage';
import DeletePrompt from '../../common/DeletePrompt';

export default function EditSeriesPage({ series, setEditedObject }) {
  const [validationError, setValidationError] = useState('');
  const [seriesToEdit, setSeriesToEdit] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [isInvalidId, setIsInvalidId] = useState(false);
  const [showDeletePrompt, setShowDeletePrompt] = useState(false);

  let history = useHistory();

  useEffect(() => {
    const seriesId = window.location.pathname.slice(-24);
    const selectedSeries = series.find((screening) => screening._id === seriesId);
    if (!selectedSeries) {
      setIsInvalidId(true);
    }
    setSeriesToEdit(selectedSeries);
    setIsLoading(false);
  }, [series]);

  useEffect(() => {
    if (!isInvalidId) {
      document.title = seriesToEdit.title + ' - edit | Rineuto Lichtspiele';
    }
  }, [seriesToEdit, isInvalidId]);

  if (isLoading) {
    return <LoadingPage />;
  }

  if (isInvalidId) {
    return <Redirect to="/404" />;
  }

  return (
    <EditSeriesPageStyled>
      <HeadlineStyled>Filmreihe bearbeiten</HeadlineStyled>
      <FormStyled onSubmit={handleSubmit}>
        <LabelStyled>
          Reihentitel
          <InputStyled name="title" defaultValue={seriesToEdit.title} />
        </LabelStyled>
        <LabelStyled>
          Jahr der ersten Vorstellung (vierstellig)
          <InputStyled name="year" defaultValue={seriesToEdit.year} />
        </LabelStyled>
        <LabelStyled>
          Monat der ersten Vorstellung
          <InputStyled name="month" defaultValue={seriesToEdit.month} />
        </LabelStyled>
        <LabelStyled>
          Poster
          <InputStyled type="file" name="image" />
        </LabelStyled>
        <ErrorMessageStyled>{validationError}</ErrorMessageStyled>
        <ButtonStyled type="button" onClick={() => history.push('/posters/' + seriesToEdit.year)}>
          Abbrechen
        </ButtonStyled>
        <ButtonStyled>Änderungen speichern</ButtonStyled>
        <ButtonStyled type="button" onClick={() => setShowDeletePrompt(true)}>
          Diese Filmreihe löschen
        </ButtonStyled>
        {showDeletePrompt && (
          <DeletePrompt
            handleDelete={handleDelete}
            setShowDeletePrompt={setShowDeletePrompt}
            setEditedObject={setEditedObject}
          />
        )}
      </FormStyled>
    </EditSeriesPageStyled>
  );

  function handleSubmit(event) {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    const jwt = getFromStorage('rineuto-token');
    patchSeries(seriesToEdit._id, formData, jwt)
      .then((res) => {
        setEditedObject(seriesToEdit);
        history.push('/posters/' + seriesToEdit.year);
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

  function handleDelete() {
    setShowDeletePrompt(false);
    const jwt = getFromStorage('rineuto-token');
    deleteSeries(seriesToEdit._id, jwt)
      .then(() => {
        setEditedObject({ deleted: 'series' });
        history.push('/posters');
      })
      .catch((err) => console.error(err));
  }
}

const EditSeriesPageStyled = styled.div`
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
