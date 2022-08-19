import { STATE } from "../state";
import { ADD_NOTE, EDIT_NOTE, DELETE_NOTE, FILTER_NOTES } from "../actions";

const notesReducer = (state = STATE, action) => {
  switch (action.type) {
    case ADD_NOTE:
      return {
        ...state,
        notes: [...state.notes, action.payload],
      };

    case EDIT_NOTE:
      const matchNoteIndex = state.notes.findIndex(
        (note) => note.id === action.payload.id
      );

      state.notes.splice(matchNoteIndex, 1, action.payload);

      return state;

    case DELETE_NOTE:
      const notesAfterDelete = state.notes.filter(
        (note) => note.id !== action.payload
      );

      return {
        ...state,
        notes: notesAfterDelete,
      };

    case FILTER_NOTES:
      const isEmptyFilter = action.payload.length === 0;

      const filteredNotes = state.notes.filter((note) =>
        note.name.toLowerCase().includes(action.payload.toLowerCase())
      );

      return {
        ...state,
        filteredNotes: isEmptyFilter ? [] : filteredNotes,
      };

    default:
      return state;
  }
};

export { notesReducer };
