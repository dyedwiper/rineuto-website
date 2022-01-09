import React, { useEffect, useState } from 'react';
import { Redirect, useHistory } from 'react-router-dom';
import styled from 'styled-components/macro';
import DeletePrompt from '../../common/DeletePrompt';
import { deleteNotice, patchNotice } from '../../utils/services';
import { getFromLocalStorage } from '../../utils/storage';
import LoadingPage from '../LoadingPage';
import { WaitNoteStyled } from '../../common/styledElements';

export default function EditNoticePage({ notices, setEditedObject, isWaiting, setIsWaiting }) {
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
          <span>
            Alternativtext{' '}
            <LinkStyled target="_blank" rel="noopener noreferrer" href="https://de.wikipedia.org/wiki/Alt-Text">
              (Wikipedia)
            </LinkStyled>
          </span>
          <InputStyled name="altText" defaultValue={noticeToEdit.altText} />
        </LabelStyled>
        <LabelStyled>
          Text
          <TextareaStyled name="text" defaultValue={noticeToEdit.text} />
        </LabelStyled>
        <ErrorMessageStyled>{validationError}</ErrorMessageStyled>
        {isWaiting ? (
          <WaitNoteStyled>Bitte warten</WaitNoteStyled>
        ) : (
          <>
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
          </>
        )}
      </FormStyled>
    </EditNoticePageStyled>
  );

  function handleSubmit(event) {
    event.preventDefault();
    setIsWaiting(true);
    const form = event.currentTarget;
    const formData = new FormData(form);
    const jwt = getFromLocalStorage('rineuto-token');
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
    const jwt = getFromLocalStorage('rineuto-token');
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
  padding-bottom: 40px;
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

const LinkStyled = styled.a`
  color: white;
`;

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
  color: var(--error-color);
  font-size: 1.5em;
`;
