import React, { useContext, useState } from 'react';
import styled from 'styled-components';
import Context from '../Context';
import { postDish } from '../services/dishServices';
import { getFromLocalStorage } from '../utils/storage';

export default function DishForm({ dishes, setDishes }) {
  const [validationError, setValidationError] = useState('');

  const { setIsWaiting } = useContext(Context);

  return (
    <DishFormStyled onSubmit={handleSubmit}>
      <HeadlineStyled>Gericht hinzufügen</HeadlineStyled>
      <FormGroupStyled>
        <LabelStyled htmlFor="dishDateInput">Datum</LabelStyled>
        <InputStyled id="dishDateInput" name="date" type="date" />
      </FormGroupStyled>
      <FormGroupStyled>
        <LabelStyled htmlFor="dishNameInput">Gericht</LabelStyled>
        <InputStyled id="dishNameInput" name="name" />
      </FormGroupStyled>
      <ButtonStyled>Senden</ButtonStyled>
      <ErrorMessageStyled>{validationError}</ErrorMessageStyled>
    </DishFormStyled>
  );

  function handleSubmit(event) {
    event.preventDefault();
    setIsWaiting(true);
    const form = event.currentTarget;
    const data = { date: form.date.value, name: form.name.value };
    const jwt = getFromLocalStorage('rineuto-token');
    postDish(data, jwt)
      .then((response) => {
        setDishes([...dishes, response.data]);
      })
      .catch((err) => {
        if (err.hasOwnProperty('joiError')) {
          setValidationError(err.joiError);
        }
      })
      .finally(() => {
        setIsWaiting(false);
      });
  }
}

const DishFormStyled = styled.form``;

const HeadlineStyled = styled.h3`
  color: var(--primary-color);
`;

const FormGroupStyled = styled.div`
  margin: 0 0 20px 0;
`;

const LabelStyled = styled.label`
  display: inline-block;
  width: 50px;
  margin: 0 20px 0 0;
  color: var(--primary-color);
`;

const InputStyled = styled.input`
  width: 300px;
`;

const ButtonStyled = styled.button``;

const ErrorMessageStyled = styled.span`
  display: block;
  color: var(--error-color);
  font-size: 1.5em;
`;
