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
        Trage hier deine E-Mail-Adresse ein, um die Last, selbständig an unsere Vorführungen denken zu müssen, von
        deinen Schultern zu nehmen.
      </ExplanationStyled>
      {isSubmitted ? (
        <SubmitMessageStyled>Du erhältst eine E-Mail mit weiteren Instruktionen.</SubmitMessageStyled>
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
    setValidationError('');
    const data = { email: event.currentTarget.email.value };
    postNewsletterContact(data)
      .then(() => {
        setIsSubmitted(true);
        setIsWaiting(false);
      })
      .catch((err) => {
        if (err === 'Invalid email address') {
          setValidationError('Die angegebene E-Mail-Adresse ist nicht valide.');
        } else {
          setIsError(true);
        }
        setIsWaiting(false);
      });
  }
}

const NewsletterPageStyled = styled.div`
  max-width: 600px;
  margin: 40px auto;
  padding: 0 20px;
  color: var(--primary-color);
  text-align: center;
  font-size: 1.2em;
`;

const HeadlineStyled = styled.h2`
  font-size: 1.5rem;
`;

const ExplanationStyled = styled.p``;

const SubmitMessageStyled = styled.p`
  color: var(--success-color);
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
  color: var(--error-color);
`;
