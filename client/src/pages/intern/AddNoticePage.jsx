import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Context from '../../Context';
import WysiwygEditor from '../../common/WysiwygEditor';
import { WaitNoteStyled } from '../../common/styledElements';
import { postNotice } from '../../services/noticeServices';
import { handleValidationError } from '../../utils/validationErrorHandler';

export default function AddNoticePage() {
  const [validationError, setValidationError] = useState('');
  const [editor, setEditor] = useState();

  const { isWaiting, setIsWaiting } = useContext(Context);

  let navigate = useNavigate();

  useEffect(() => {
    document.title = ' News anlegen | Rineuto Lichtspiele';
  }, []);

  return (
    <AddNoticePageStyled>
      <HeadlineStyled>Neue News anlegen</HeadlineStyled>
      <FormStyled onSubmit={handleSubmit}>
        <LabelStyled>
          Schlagzeile
          <InputStyled name="title" />
        </LabelStyled>
        <LabelStyled>
          Datum
          <InputStyled type="date" name="date" defaultValue={new Date().toISOString().slice(0, 10)} />
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
        <FormGroupStyled>
          <LabelStyled htmlFor="ckEditor">Text</LabelStyled>
          <WysiwygEditor setEditor={setEditor} />
        </FormGroupStyled>
        <ErrorMessageStyled>{validationError}</ErrorMessageStyled>
        {isWaiting ? (
          <WaitNoteStyled>Bitte warten</WaitNoteStyled>
        ) : (
          <>
            <ButtonStyled>News anlegen</ButtonStyled>
            <ButtonStyled type="button" onClick={() => navigate('/')}>
              Abbrechen
            </ButtonStyled>
          </>
        )}
      </FormStyled>
    </AddNoticePageStyled>
  );

  function handleSubmit(event) {
    event.preventDefault();
    setIsWaiting(true);
    const form = event.currentTarget;
    const formData = new FormData(form);
    formData.append('text', editor.getData());
    postNotice(formData)
      .then(() => {
        navigate('/');
      })
      .catch((err) => {
        handleValidationError(err, setValidationError);
      })
      .finally(() => {
        setIsWaiting(false);
      });
  }
}

const AddNoticePageStyled = styled.div`
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
