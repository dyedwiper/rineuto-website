import React from 'react';
import styled from 'styled-components';

export default function DeletePrompt({ handleDelete, setShowDeletePrompt }) {
  return (
    <DeletePromptStyled>
      Wirklich?
      <DeletePromptButtonStyled
        type="button"
        onClick={() => {
          setShowDeletePrompt(false);
        }}
      >
        Nein
      </DeletePromptButtonStyled>
      <DeletePromptButtonStyled type="button" onClick={handleDelete}>
        Ja
      </DeletePromptButtonStyled>
    </DeletePromptStyled>
  );
}

const DeletePromptStyled = styled.div`
  justify-self: center;
`;

const DeletePromptButtonStyled = styled.button`
  width: 50px;
  margin: 0 10px;
  padding: 5px;
`;
