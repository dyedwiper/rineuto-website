import React from 'react';
import styled from 'styled-components/macro';

export default function DeletePrompt({ handleDelete, setShowDeletePrompt, setEditedObject }) {
  return (
    <DeletePromptStyled>
      Wirklich?
      <DeletePromptButtonStyled
        type="button"
        onClick={() => {
          setShowDeletePrompt(false);
          setEditedObject({});
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
