import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import Context from '../../Context';
import WysiwygEditor from '../../common/WysiwygEditor';
import { WaitNoteStyled } from '../../common/styledElements';
import { postScreening } from '../../services/screeningServices';
import { getSerials } from '../../services/serialServices';

export default function AddScreeningPage() {
  const [serials, setSerials] = useState([]);
  const [validationError, setValidationError] = useState('');
  const [editor, setEditor] = useState();

  const { isWaiting, setIsWaiting } = useContext(Context);

  let history = useHistory();

  useEffect(() => {
    getSerials().then((res) => {
      setSerials(res.data);
    });
  }, []);

  useEffect(() => {
    document.title = ' Vorführung anlegen | Rineuto Lichtspiele';
  }, []);

  return (
    <AddScreeningPageStyled>
      <HeadlineStyled>Neue Vorführung anlegen</HeadlineStyled>
      <FormStyled onSubmit={handleSubmit}>
        <LabelStyled>
          Filmtitel
          <InputStyled name="title" />
        </LabelStyled>
        <LabelStyled>
          Vorführdatum
          <InputStyled type="date" name="day" />
        </LabelStyled>
        <LabelStyled>
          Uhrzeit
          <InputStyled type="time" name="time" defaultValue="20:30" />
        </LabelStyled>
        <LabelStyled>
          Regie
          <InputStyled name="director" />
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
          <InputStyled name="altText" />
        </LabelStyled>
        <LabelStyled>
          Länge in Minuten
          <InputStyled name="length" />
        </LabelStyled>
        <LabelStyled>
          Prodoktionsländer
          <InputStyled name="country" />
        </LabelStyled>
        <LabelStyled>
          Erscheinungsjahr
          <InputStyled name="year" />
        </LabelStyled>
        <LabelStyled>
          Version
          <InputStyled name="version" />
        </LabelStyled>
        <FormGroupStyled>
          <LabelStyled htmlFor="ckEditor">Beschreibung</LabelStyled>
          <WysiwygEditor setEditor={setEditor} />
        </FormGroupStyled>
        <LabelStyled>
          Sonderbemerkung
          <InputStyled name="special" />
        </LabelStyled>
        <LabelStyled>
          Filmreihe
          <SelectStyled name="serial">
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
            <ButtonStyled>Vorführung anlegen</ButtonStyled>
            <ButtonStyled type="button" onClick={() => history.push('/')}>
              Abbrechen
            </ButtonStyled>
          </>
        )}
      </FormStyled>
    </AddScreeningPageStyled>
  );

  function handleSubmit(event) {
    event.preventDefault();
    setIsWaiting(true);
    const form = event.currentTarget;
    const formData = new FormData(form);
    formData.append('synopsis', editor.getData());
    postScreening(formData)
      .then(() => {
        setIsWaiting(false);
        history.push('/program');
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
}

const AddScreeningPageStyled = styled.div`
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
