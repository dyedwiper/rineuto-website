import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import Context from '../../Context';
import DeletePrompt from '../../common/DeletePrompt';
import WysiwygEditor from '../../common/WysiwygEditor';
import { WaitNoteStyled } from '../../common/styledElements';
import { deleteScreening, getScreening, patchScreening } from '../../services/screeningServices';
import { getSerials } from '../../services/serialServices';
import LoadingPage from '../LoadingPage';

export default function EditScreeningPage() {
  const [serials, setSerials] = useState([]);
  const [validationError, setValidationError] = useState('');
  const [screening, setScreening] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [showDeletePrompt, setShowDeletePrompt] = useState(false);
  const [editor, setEditor] = useState();

  const { isWaiting, setIsWaiting } = useContext(Context);

  let history = useHistory();

  useEffect(() => {
    getSerials().then((res) => {
      setSerials(res.data);
    });
  }, []);

  useEffect(() => {
    const screeningId = window.location.pathname.slice(-24);
    getScreening(screeningId).then((res) => {
      setScreening(res);
      setIsLoading(false);
    });
  }, []);

  useEffect(() => {
    document.title = screening.title + ' - edit | Rineuto Lichtspiele';
  }, [screening]);

  if (isLoading) {
    return <LoadingPage />;
  }

  return (
    <EditScreeningPageStyled>
      <HeadlineStyled>Vorführung bearbeiten</HeadlineStyled>
      <FormStyled onSubmit={handleSubmit}>
        <LabelStyled>
          Filmtitel
          <InputStyled name="title" defaultValue={screening.title} />
        </LabelStyled>
        <LabelStyled>
          Vorführdatum
          <InputStyled type="date" name="day" defaultValue={screening.date.toISOString().slice(0, 10)} />
        </LabelStyled>
        <LabelStyled>
          Uhrzeit
          <InputStyled
            type="time"
            name="time"
            defaultValue={
              screening.date.getHours() +
              ':' +
              (screening.date.getMinutes() < 10 ? '0' : '') +
              screening.date.getMinutes()
            }
          />
        </LabelStyled>
        <LabelStyled>
          Regie
          <InputStyled name="director" defaultValue={screening.director} />
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
          <InputStyled name="altText" defaultValue={screening.altText} />
        </LabelStyled>
        <LabelStyled>
          Länge in Minuten
          <InputStyled name="length" defaultValue={screening.length} />
        </LabelStyled>
        <LabelStyled>
          Prodoktionsländer
          <InputStyled name="country" defaultValue={screening.country} />
        </LabelStyled>
        <LabelStyled>
          Erscheinungsjahr
          <InputStyled name="year" defaultValue={screening.year} />
        </LabelStyled>
        <LabelStyled>
          Version
          <InputStyled name="version" defaultValue={screening.version} />
        </LabelStyled>
        <FormGroupStyled>
          <LabelStyled htmlFor="ckEditor">Beschreibung</LabelStyled>
          <WysiwygEditor setEditor={setEditor} data={screening.synopsis} />
        </FormGroupStyled>
        <LabelStyled>
          Sonderbemerkung
          <InputStyled name="special" defaultValue={screening.special} />
        </LabelStyled>
        <LabelStyled>
          Filmreihe
          <SelectStyled
            name="serial"
            defaultValue={screening.serial ? screening.serial._id : '000000000000000000000000'}
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
            {showDeletePrompt && <DeletePrompt handleDelete={handleDelete} setShowDeletePrompt={setShowDeletePrompt} />}
            <ButtonStyled type="button" onClick={() => history.push('/screening/' + screening._id)}>
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
    patchScreening(screening._id, formData)
      .then(() => {
        setIsWaiting(false);
        history.push('/screening/' + screening._id);
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
    deleteScreening(screening._id)
      .then(() => {
        setIsWaiting(false);
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
