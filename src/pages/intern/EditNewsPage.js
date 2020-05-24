import React, { useEffect, useState } from 'react';
import { Redirect, useHistory } from 'react-router-dom';
import styled from 'styled-components/macro';
import { patchNews } from '../../utils/services';
import { getFromStorage } from '../../utils/storage';
import LoadingPage from '../LoadingPage';

export default function EditNewsPage({ news, setEditedObject }) {
  const [validationError, setValidationError] = useState('');
  const [newsToEdit, setNewsToEdit] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [isInvalidId, setIsInvalidId] = useState(false);

  let history = useHistory();

  useEffect(() => {
    const newsId = window.location.pathname.slice(-24);
    const selectedNews = news.find((news) => news._id === newsId);
    if (!selectedNews) {
      setIsInvalidId(true);
    }
    setNewsToEdit(selectedNews);
    setIsLoading(false);
  }, [news]);

  useEffect(() => {
    if (!isInvalidId) {
      document.title = newsToEdit.title + ' - edit | Rineuto Lichtspiele';
    }
  }, [newsToEdit, isInvalidId]);

  if (isLoading) {
    return <LoadingPage />;
  }

  if (isInvalidId) {
    return <Redirect to="/404" />;
  }
  return (
    <EditNewsPageStyled>
      <HeadlineStyled>News bearbeiten</HeadlineStyled>
      <FormStyled onSubmit={handleSubmit}>
        <LabelStyled>
          Schlagzeile
          <InputStyled name="title" defaultValue={newsToEdit.title} />
        </LabelStyled>
        <LabelStyled>
          Datum
          <InputStyled type="date" name="date" defaultValue={newsToEdit.date.toISOString().slice(0, 10)} />
        </LabelStyled>
        <LabelStyled>
          Bild
          <InputStyled type="file" name="image" />
        </LabelStyled>
        <LabelStyled>
          Text
          <TextareaStyled name="text" defaultValue={newsToEdit.text} />
        </LabelStyled>
        <ErrorMessageStyled>{validationError}</ErrorMessageStyled>
        <ButtonStyled type="button" onClick={() => history.push('/')}>
          Abbrechen
        </ButtonStyled>
        <ButtonStyled>Änderungen speichern</ButtonStyled>
      </FormStyled>
    </EditNewsPageStyled>
  );

  function handleSubmit(event) {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    const jwt = getFromStorage('rineuto-token');
    patchNews(newsToEdit._id, formData, jwt)
      .then(() => {
        setEditedObject(newsToEdit);
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

const EditNewsPageStyled = styled.div`
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
  padding: 5px;
`;

const ErrorMessageStyled = styled.span`
  color: red;
  font-size: 1.5em;
`;
