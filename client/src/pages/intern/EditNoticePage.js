import React, { useEffect, useState } from 'react';
import { Redirect, useHistory } from 'react-router-dom';
import styled from 'styled-components/macro';
import DeletePrompt from '../../common/DeletePrompt';
import { deleteNotice, patchNotice } from '../../utils/services';
import { getFromStorage } from '../../utils/storage';
import LoadingPage from '../LoadingPage';

export default function EditNoticePage({ notices, setEditedObject, setIsWaiting }) {
  const [validationError, setValidationError] = useState('');
  const [noticeToEdit, setNoticeToEdit] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [isInvalidId, setIsInvalidId] = useState(false);
  const [showDeletePrompt, setShowDeletePrompt] = useState(false);

  let history = useHistory();

  useEffect(() => {
    const noticeId = window.location.pathname.slice(-24);
    const selectedNotice = notices.find((notice) => notice._id === noticeId);
    if (!selectedNotice) {
      setIsInvalidId(true);
    }
    setNoticeToEdit(selectedNotice);
    setIsLoading(false);
  }, [notices]);

  useEffect(() => {
    if (!isInvalidId) {
      document.title = noticeToEdit.title + ' - edit | Rineuto Lichtspiele';
    }
  }, [noticeToEdit, isInvalidId]);

  if (isLoading) {
    return <LoadingPage />;
  }

  if (isInvalidId) {
    return <Redirect to="/404" />;
  }
  return (
    <EditNoticePageStyled>
      <HeadlineStyled>News bearbeiten</HeadlineStyled>
      <FormStyled onSubmit={handleSubmit}>
        <LabelStyled>
          Schlagzeile
          <InputStyled name="title" defaultValue={noticeToEdit.title} />
        </LabelStyled>
        <LabelStyled>
          Datum
          <InputStyled type="date" name="date" defaultValue={noticeToEdit.date.toISOString().slice(0, 10)} />
        </LabelStyled>
        <LabelStyled>
          Bild (max. 1 MB)
          <InputStyled type="file" name="image" />
        </LabelStyled>
        <LabelStyled>
          Text
          <TextareaStyled name="text" defaultValue={noticeToEdit.text} />
        </LabelStyled>
        <ErrorMessageStyled>{validationError}</ErrorMessageStyled>
        <ButtonStyled>Änderungen speichern</ButtonStyled>
        <ButtonStyled type="button" onClick={() => setShowDeletePrompt(true)}>
          Diese News löschen
        </ButtonStyled>
        {showDeletePrompt && (
          <DeletePrompt
            handleDelete={handleDelete}
            setShowDeletePrompt={setShowDeletePrompt}
            setEditedObject={setEditedObject}
          />
        )}
        <ButtonStyled type="button" onClick={() => history.push('/')}>
          Abbrechen
        </ButtonStyled>
      </FormStyled>
    </EditNoticePageStyled>
  );

  function handleSubmit(event) {
    event.preventDefault();
    setIsWaiting(true);
    const form = event.currentTarget;
    const formData = new FormData(form);
    const jwt = getFromStorage('rineuto-token');
    patchNotice(noticeToEdit._id, formData, jwt)
      .then(() => {
        setEditedObject(noticeToEdit);
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

  function handleDelete() {
    setShowDeletePrompt(false);
    setIsWaiting(true);
    const jwt = getFromStorage('rineuto-token');
    deleteNotice(noticeToEdit._id, jwt)
      .then(() => {
        setIsWaiting(false);
        setEditedObject({ deleted: 'notice' });
        history.push('/');
      })
      .catch((err) => {
        setIsWaiting(false);
        console.error(err);
      });
  }
}

const EditNoticePageStyled = styled.div`
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
  max-width: 100%;
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
