import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { WaitNoteStyled } from '../common/styledElements';
import { postNewsletterContact } from '../utils/services';

export default function NewsletterPage({ isWaiting, setIsWaiting, setIsError }) {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [validationError, setValidationError] = useState('');

  useEffect(() => {
    document.title = 'Newsletter | Rineuto Lichtspiele';
    document.querySelector('#newsletterEmailInput').focus();
  }, []);

  return (
    <NewsletterPageStyled>
      <HeadlineStyled>Newsletter</HeadlineStyled>
      <ExplanationStyled>
        Wenn du hier deine E-Mail-Adresse einträgst, wirst du für immer mit den neutesten Neutigkeiten zu den Rineuto
        Lichtspielen versorgt.
      </ExplanationStyled>
      {isSubmitted ? (
        <SubmitMessageStyled>Du erhältst eine E-Mail, in der du die Anmeldung bestätigen musst.</SubmitMessageStyled>
      ) : (
        <FormStyled onSubmit={handleSubmit}>
          <LabelStyled>
            E-Mail-Adresse
            <InputStyled id="newsletterEmailInput" name="email" type="email" />
          </LabelStyled>
          {isWaiting ? <WaitNoteStyled>Bitte Warten</WaitNoteStyled> : <ButtonStyled>Eintragen</ButtonStyled>}
        </FormStyled>
      )}
      <ErrorMessageStyled>{validationError}</ErrorMessageStyled>
    </NewsletterPageStyled>
  );

  function handleSubmit(event) {
    event.preventDefault();
    setIsWaiting(true);
    const data = { email: event.currentTarget.email.value };
    postNewsletterContact(data)
      .then(() => {
        setValidationError('');
        setIsWaiting(false);
        setIsSubmitted(true);
      })
      .catch((err) => {
        if (err === 'Invalid email address') {
          setValidationError('Die angegebene E-Mail-Adresse ist nicht valide.');
          setIsWaiting(false);
        } else {
          setIsError(true);
          setIsWaiting(false);
        }
      });
  }
}

const NewsletterPageStyled = styled.div`
  max-width: 600px;
  margin: 40px auto;
  padding: 0 20px;
  color: white;
  text-align: center;
  font-size: 1.2em;
`;

const HeadlineStyled = styled.h2`
  font-size: 1.5rem;
`;

const ExplanationStyled = styled.p``;

const SubmitMessageStyled = styled.p`
  color: chartreuse;
`;

const FormStyled = styled.form``;

const LabelStyled = styled.label`
  display: block;
`;

const InputStyled = styled.input`
  display: block;
  max-width: 300px;
  margin: 10px auto;
`;

const ButtonStyled = styled.button`
  margin: 10px auto;
`;

const ErrorMessageStyled = styled.p`
  color: coral;
`;
