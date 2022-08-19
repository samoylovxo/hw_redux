import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  ADD_NOTE,
  EDIT_NOTE,
  DELETE_NOTE,
  FILTER_NOTES,
} from "../redux/actions";
import styled from "styled-components";

const StyledNotes = styled.div`
  padding: 80px;

  display: grid;
  gap: 16px;
`;

const StyledForm = styled.form`
  display: grid;
  grid-template-columns: 1fr 1fr max-content;
  align-items: center;
  gap: 8px;
`;

const StyledInput = styled.input`
  padding: 8px 16px;

  border: 1px solid #141123;
  border-radius: 4px;

  outline: none;
  transition: border-color 0.4s;

  :hover:not(:disabled) {
    border-color: #131235;
  }

  &:disabled {
    border-color: #e0e0e0;
    cursor: not-allowed;
  }
`;

const StyledNoteList = styled.div`
  display: grid;
  gap: 8px;
`;

const StyledNote = styled.div`
  padding: 8px;

  border: 1px solid #e0e0e0;
  border-radius: 4px;

  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 4px;
`;

const StyledButtons = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const StyledButton = styled.button`
  padding: 8px;
  border-color: transparent;
  border-radius: 4px;

  background-color: #332a5d;

  color: #fff;

  cursor: pointer;
  outline: none;
  transition: background-color 0.4s, border-color 0.4s;

  &:hover {
    background-color: #131235;
  }
`;

const StyledButtonIcon = styled(StyledButton)`
  background-color: transparent;

  border: 1px solid #332a5d;

  &:hover {
    background-color: transparent;
    border-color: #131235;
  }
`;

const StyledPlaceholder = styled.div`
  font-size: 18px;
  font-weight: 700;
`;

const INITIAL_NOTE = {
  id: -1,
  name: "",
  value: "",
};

const Notes = () => {
  const dispatch = useDispatch();

  const { notes, filteredNotes } = useSelector((state) => state.notes);

  const [note, setNote] = useState(INITIAL_NOTE);
  const [isEditing, setIsEditing] = useState(false);

  const submitButtonText = isEditing ? "Изменить" : "Добавить";
  const noteList = filteredNotes.length ? filteredNotes : notes;

  const onAddNoteSubmit = (event) => {
    event.preventDefault();

    dispatch({
      type: isEditing ? EDIT_NOTE : ADD_NOTE,
      payload: {
        ...note,
        id: isEditing ? note.id : Date.now(),
      },
    });

    setNote(INITIAL_NOTE);
    setIsEditing(false);
  };

  const onEditNoteButtonClick = (note) => {
    setNote(note);
    setIsEditing(true);
  };

  const onDeleteNoteButtonClick = (id) => {
    dispatch({
      type: DELETE_NOTE,
      payload: id,
    });

    setNote(INITIAL_NOTE);
    setIsEditing(false);
  };

  const onClearNoteFormButtonClick = () => {
    setNote(INITIAL_NOTE);
    setIsEditing(false);
  };

  const onFilterNotesChange = (event) => {
    const { value } = event.target;

    dispatch({
      type: FILTER_NOTES,
      payload: value,
    });
  };

  return (
    <StyledNotes>
      <StyledInput
        placeholder="Фильтр по названию"
        disabled={notes.length === 0}
        onChange={onFilterNotesChange}
      />
      <StyledForm onSubmit={onAddNoteSubmit}>
        <StyledInput
          placeholder="Введите название"
          value={note.name}
          onChange={(event) =>
            setNote((prev) => ({ ...prev, name: event.target.value }))
          }
        />
        <StyledInput
          type="number"
          placeholder="Введите значение"
          value={note.value}
          onChange={(event) =>
            setNote((prev) => ({ ...prev, value: event.target.value }))
          }
        />

        <StyledButtons>
          <StyledButton type="submit">{submitButtonText}</StyledButton>
          <StyledButton type="button" onClick={onClearNoteFormButtonClick}>
            Очистить
          </StyledButton>
        </StyledButtons>
      </StyledForm>

      <StyledNoteList>
        {noteList.length ? (
          noteList.map((note, index) => {
            const { id, name, value } = note;

            return (
              <StyledNote key={index}>
                {name} {value}
                <StyledButtons>
                  <StyledButtonIcon onClick={() => onEditNoteButtonClick(note)}>
                    ✏️
                  </StyledButtonIcon>
                  <StyledButtonIcon onClick={() => onDeleteNoteButtonClick(id)}>
                    🪣
                  </StyledButtonIcon>
                </StyledButtons>
              </StyledNote>
            );
          })
        ) : (
          <StyledPlaceholder>У вас пока нет заметок :(</StyledPlaceholder>
        )}
      </StyledNoteList>
    </StyledNotes>
  );
};

export { Notes };
