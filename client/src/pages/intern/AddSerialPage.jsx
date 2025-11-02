import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Context from '../../Context';
import { WaitNoteStyled } from '../../common/styledElements';
import { postSerial } from '../../services/serialServices';
import { handleValidationError } from '../../utils/validationErrorHandler';

export default function AddSerialPage() {
  const [validationError, setValidationError] = useState('');

  const { isWaiting, setIsWaiting } = useContext(Context);

  let navigate = useNavigate();

  useEffect(() => {
    document.title = ' Reihe anlegen | Rineuto Lichtspiele';
  }, []);

  return (
    <AddSerialPageStyled>
      <HeadlineStyled>Neue Filmreihe anlegen</HeadlineStyled>
      <FormStyled onSubmit={handleSubmit}>
        <LabelStyled>
          Reihentitel
          <InputStyled name="title" />
        </LabelStyled>
        <LabelStyled>
          Jahr der ersten Vorstellung (vierstellige Zahl)
          <InputStyled name="year" />
        </LabelStyled>
        <LabelStyled>
          Monat der ersten Vorstellung
          <InputStyled name="month" />
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
          <InputStyled name="altText" />
        </LabelStyled>
        <ErrorMessageStyled>{validationError}</ErrorMessageStyled>
        {isWaiting ? (
          <WaitNoteStyled>Bitte warten</WaitNoteStyled>
        ) : (
          <>
            <ButtonStyled>Filmreihe anlegen</ButtonStyled>
            <ButtonStyled type="button" onClick={() => navigate('/')}>
              Abbrechen
            </ButtonStyled>
          </>
        )}
      </FormStyled>
    </AddSerialPageStyled>
  );

  function handleSubmit(event) {
    event.preventDefault();
    setIsWaiting(true);
    const form = event.currentTarget;
    const formData = new FormData(form);
    postSerial(formData)
      .then(() => {
        navigate('/posters');
      })
      .catch((err) => {
        handleValidationError(err, setValidationError);
      })
      .finally(() => {
        setIsWaiting(false);
      });
  }
}

const AddSerialPageStyled = styled.div`
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
