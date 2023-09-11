import React, { useContext, useEffect, useState } from 'react';
import { Redirect, useHistory } from 'react-router-dom';
import styled from 'styled-components/macro';
import Context from '../../Context';
import DeletePrompt from '../../common/DeletePrompt';
import WysiwygEditor from '../../common/WysiwygEditor';
import { WaitNoteStyled } from '../../common/styledElements';
import { deleteNotice, patchNotice } from '../../services/noticeServices';
import { getFromLocalStorage } from '../../utils/storage';
import LoadingPage from '../LoadingPage';

export default function EditNoticePage({ notices, setEditedObject }) {
  const [validationError, setValidationError] = useState('');
  const [noticeToEdit, setNoticeToEdit] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [isInvalidId, setIsInvalidId] = useState(false);
  const [showDeletePrompt, setShowDeletePrompt] = useState(false);
  const [editor, setEditor] = useState();

  const { isWaiting, setIsWaiting } = useContext(Context);

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
        <FormGroupStyled>
          <LabelStyled htmlFor="ckEditor">Text</LabelStyled>
          <WysiwygEditor setEditor={setEditor} data={noticeToEdit.text} />
        </FormGroupStyled>
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
    formData.append('text', editor.getData());
    const jwt = getFromLocalStorage('rineuto-token');
    patchNotice(noticeToEdit._id, formData, jwt)
      .then(() => {
        setEditedObject(noticeToEdit);
        setIsWaiting(false);
        history.push('/');
      })
      .catch((err) => {
        setIsWaiting(false);
        if (err.hasOwnProperty('joiError')) {
          setValidationError(err.joiError);
        }
        if (err.hasOwnProperty('multerError')) {
          setValidationError(err.multerError);
        }
        if (err.hasOwnProperty('cloudinaryError')) {
          setValidationError(err.cloudinaryError);
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
      });
  }
}

const EditNoticePageStyled = styled.div`
  overflow: auto;
  max-width: 600px;
  margin: 20px auto;
  padding: 20px;
  padding-bottom: 40px;
  color: var(--primary-color);
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
  color: var(--primary-color);
`;

const ButtonStyled = styled.button`
  justify-self: center;
`;

const FormGroupStyled = styled.div`
  display: grid;
  grid-auto-rows: min-content;
  grid-gap: 5px;
`;

const ErrorMessageStyled = styled.span`
  color: var(--error-color);
  font-size: 1.5em;
`;
