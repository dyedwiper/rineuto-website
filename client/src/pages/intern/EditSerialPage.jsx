import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import Context from '../../Context';
import DeletePrompt from '../../common/DeletePrompt';
import { WaitNoteStyled } from '../../common/styledElements';
import { deleteSerial, getSerial, patchSerial } from '../../services/serialServices';
import LoadingPage from '../LoadingPage';

export default function EditSerialPage() {
  const [validationError, setValidationError] = useState('');
  const [serialToEdit, setSerialToEdit] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [showDeletePrompt, setShowDeletePrompt] = useState(false);

  const { isWaiting, setIsWaiting } = useContext(Context);

  let history = useHistory();

  useEffect(() => {
    const serialId = window.location.pathname.slice(-24);
    getSerial(serialId).then((res) => {
      const serial = res.data;
      setSerialToEdit(serial);
      setIsLoading(false);
    });
  }, []);

  useEffect(() => {
    document.title = serialToEdit.title + ' - edit | Rineuto Lichtspiele';
  }, [serialToEdit]);

  if (isLoading) {
    return <LoadingPage />;
  }

  return (
    <EditSerialPageStyled>
      <HeadlineStyled>Filmreihe bearbeiten</HeadlineStyled>
      <FormStyled onSubmit={handleSubmit}>
        <LabelStyled>
          Reihentitel
          <InputStyled name="title" defaultValue={serialToEdit.title} />
        </LabelStyled>
        <LabelStyled>
          Jahr der ersten Vorstellung (vierstellig)
          <InputStyled name="year" defaultValue={serialToEdit.year} />
        </LabelStyled>
        <LabelStyled>
          Monat der ersten Vorstellung
          <InputStyled name="month" defaultValue={serialToEdit.month} />
        </LabelStyled>
        <LabelStyled>
          Poster (max. 1 MB)
          <InputStyled type="file" name="image" />
        </LabelStyled>
        <LabelStyled>
          <span>
            Alternativtext{' '}
            <LinkStyled target="_blank" rel="noopener noreferrer" href="https://de.wikipedia.org/wiki/Alt-Text">
              (Wikipedia)
            </LinkStyled>
          </span>
          <InputStyled name="altText" defaultValue={serialToEdit.altText} />
        </LabelStyled>
        <ErrorMessageStyled>{validationError}</ErrorMessageStyled>
        {isWaiting ? (
          <WaitNoteStyled>Bitte warten</WaitNoteStyled>
        ) : (
          <>
            <ButtonStyled>Änderungen speichern</ButtonStyled>
            <ButtonStyled type="button" onClick={() => setShowDeletePrompt(true)}>
              Diese Filmreihe löschen
            </ButtonStyled>
            {showDeletePrompt && <DeletePrompt handleDelete={handleDelete} setShowDeletePrompt={setShowDeletePrompt} />}
            <ButtonStyled type="button" onClick={() => history.push('/posters/' + serialToEdit.year)}>
              Abbrechen
            </ButtonStyled>
          </>
        )}
      </FormStyled>
    </EditSerialPageStyled>
  );

  function handleSubmit(event) {
    event.preventDefault();
    setIsWaiting(true);
    const form = event.currentTarget;
    const formData = new FormData(form);
    patchSerial(serialToEdit._id, formData)
      .then(() => {
        setIsWaiting(false);
        history.push('/posters/' + serialToEdit.year);
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
    setIsWaiting(true);
    setShowDeletePrompt(false);
    deleteSerial(serialToEdit._id)
      .then(() => {
        setIsWaiting(false);
        history.push('/posters');
      })
      .catch((err) => {
        setIsWaiting(false);
      });
  }
}

const EditSerialPageStyled = styled.div`
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

const ErrorMessageStyled = styled.span`
  color: var(--error-color);
  font-size: 1.5em;
`;
