import React, { useEffect, useState } from 'react';
import { Redirect, useHistory } from 'react-router-dom';
import styled from 'styled-components/macro';
import DeletePrompt from '../../common/DeletePrompt';
import { deleteSerial, patchSerial } from '../../utils/services';
import { getFromStorage } from '../../utils/storage';
import LoadingPage from '../LoadingPage';

export default function EditSerialPage({ serials, setEditedObject, setIsWaiting }) {
  const [validationError, setValidationError] = useState('');
  const [serialToEdit, setSerialToEdit] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [isInvalidId, setIsInvalidId] = useState(false);
  const [showDeletePrompt, setShowDeletePrompt] = useState(false);

  let history = useHistory();

  useEffect(() => {
    const serialId = window.location.pathname.slice(-24);
    const selectedSerial = serials.find((serial) => serial._id === serialId);
    if (!selectedSerial) {
      setIsInvalidId(true);
    }
    setSerialToEdit(selectedSerial);
    setIsLoading(false);
  }, [serials]);

  useEffect(() => {
    if (!isInvalidId) {
      document.title = serialToEdit.title + ' - edit | Rineuto Lichtspiele';
    }
  }, [serialToEdit, isInvalidId]);

  if (isLoading) {
    return <LoadingPage />;
  }

  if (isInvalidId) {
    return <Redirect to="/404" />;
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
        <ErrorMessageStyled>{validationError}</ErrorMessageStyled>
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
        <ButtonStyled type="button" onClick={() => history.push('/posters/' + serialToEdit.year)}>
          Abbrechen
        </ButtonStyled>
      </FormStyled>
    </EditSerialPageStyled>
  );

  function handleSubmit(event) {
    event.preventDefault();
    setIsWaiting(true);
    const form = event.currentTarget;
    const formData = new FormData(form);
    const jwt = getFromStorage('rineuto-token');
    patchSerial(serialToEdit._id, formData, jwt)
      .then((res) => {
        setIsWaiting(false);
        setEditedObject(serialToEdit);
        history.push('/posters/' + serialToEdit.year);
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
    setIsWaiting(true);
    setShowDeletePrompt(false);
    const jwt = getFromStorage('rineuto-token');
    deleteSerial(serialToEdit._id, jwt)
      .then(() => {
        setIsWaiting(false);
        setEditedObject({ deleted: 'serial' });
        history.push('/posters');
      })
      .catch((err) => {
        setIsWaiting(false);
        console.error(err);
      });
  }
}

const EditSerialPageStyled = styled.div`
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

const ButtonStyled = styled.button`
  justify-self: center;
`;

const ErrorMessageStyled = styled.span`
  color: red;
  font-size: 1.5em;
`;
