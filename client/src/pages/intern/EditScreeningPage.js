import React, { useContext, useEffect, useState } from 'react';
import { Redirect, useHistory } from 'react-router-dom';
import styled from 'styled-components/macro';
import Context from '../../Context';
import DeletePrompt from '../../common/DeletePrompt';
import WysiwygEditor from '../../common/WysiwygEditor';
import { WaitNoteStyled } from '../../common/styledElements';
import { deleteScreening, patchScreening } from '../../services/screeningServices';
import LoadingPage from '../LoadingPage';

export default function EditScreeningPage({ screenings, serials, setEditedObject }) {
  const [validationError, setValidationError] = useState('');
  const [screeningToEdit, setScreeningToEdit] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [isInvalidId, setIsInvalidId] = useState(false);
  const [showDeletePrompt, setShowDeletePrompt] = useState(false);
  const [editor, setEditor] = useState();

  const { isWaiting, setIsWaiting } = useContext(Context);

  let history = useHistory();

  useEffect(() => {
    const screeningId = window.location.pathname.slice(-24);
    const screening = screenings.find((screening) => screening._id === screeningId);
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
      <HeadlineStyled>Vorführung bearbeiten</HeadlineStyled>
      <FormStyled onSubmit={handleSubmit}>
        <LabelStyled>
          Filmtitel
          <InputStyled name="title" defaultValue={screeningToEdit.title} />
        </LabelStyled>
        <LabelStyled>
          Vorführdatum
          <InputStyled type="date" name="day" defaultValue={screeningToEdit.date.toISOString().slice(0, 10)} />
        </LabelStyled>
        <LabelStyled>
          Uhrzeit
          <InputStyled
            type="time"
            name="time"
            defaultValue={
              screeningToEdit.date.getHours() +
              ':' +
              (screeningToEdit.date.getMinutes() < 10 ? '0' : '') +
              screeningToEdit.date.getMinutes()
            }
          />
        </LabelStyled>
        <LabelStyled>
          Regie
          <InputStyled name="director" defaultValue={screeningToEdit.director} />
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
          <InputStyled name="altText" defaultValue={screeningToEdit.altText} />
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
        <FormGroupStyled>
          <LabelStyled htmlFor="ckEditor">Beschreibung</LabelStyled>
          <WysiwygEditor setEditor={setEditor} data={screeningToEdit.synopsis} />
        </FormGroupStyled>
        <LabelStyled>
          Sonderbemerkung
          <InputStyled name="special" defaultValue={screeningToEdit.special} />
        </LabelStyled>
        <LabelStyled>
          Filmreihe
          <SelectStyled
            name="serial"
            defaultValue={screeningToEdit.serial ? screeningToEdit.serial._id : '000000000000000000000000'}
          >
            <option value="000000000000000000000000">-- Film ohne Reihe --</option>
            {serials
              .sort((a, b) => b.year - a.year || b.month - a.month)
              .map((serial) => (
                <option key={serial._id} value={serial._id}>
                  {serial.title}
                </option>
              ))}
          </SelectStyled>
        </LabelStyled>
        <ErrorMessageStyled>{validationError}</ErrorMessageStyled>
        {isWaiting ? (
          <WaitNoteStyled>Bitte warten</WaitNoteStyled>
        ) : (
          <>
            <ButtonStyled>Änderungen speichern</ButtonStyled>
            <ButtonStyled type="button" onClick={() => setShowDeletePrompt(true)}>
              Diese Vorfürhung löschen
            </ButtonStyled>
            {showDeletePrompt && (
              <DeletePrompt
                handleDelete={handleDelete}
                setShowDeletePrompt={setShowDeletePrompt}
                setEditedObject={setEditedObject}
              />
            )}
            <ButtonStyled type="button" onClick={() => history.push('/screening/' + screeningToEdit._id)}>
              Abbrechen
            </ButtonStyled>
          </>
        )}
      </FormStyled>
    </EditScreeningPageStyled>
  );

  function handleSubmit(event) {
    event.preventDefault();
    setIsWaiting(true);
    const form = event.currentTarget;
    const formData = new FormData(form);
    formData.append('synopsis', editor.getData());
    patchScreening(screeningToEdit._id, formData)
      .then(() => {
        setIsWaiting(false);
        setEditedObject(screeningToEdit);
        history.push('/screening/' + screeningToEdit._id);
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
    deleteScreening(screeningToEdit._id)
      .then(() => {
        setIsWaiting(false);
        setEditedObject({ deleted: 'screening' });
        history.push('/program');
      })
      .catch((err) => {
        setIsWaiting(false);
      });
  }
}

const EditScreeningPageStyled = styled.div`
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

const SelectStyled = styled.select`
  padding: 5px;
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
