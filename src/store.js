import logger from 'redux-logger'
import { combineReducers, createStore, applyMiddleware } from "redux";

const boardReducer = (state = { columns: [] }, action) => {
  switch (action.type) {
    case "ADD_COLUMN": {
      const { columnId } = action.payload;
      return { columns: [...state.columns, columnId] };
    }
    case "DELETE_COLUMN": {
      const { columnId } = action.payload;
      const filterDeleted = tmpColumnId => tmpColumnId !== columnId;
      const newColumns = state.columns.filter(filterDeleted);
      return { columns: newColumns };
    }
    default:
      return state;
  }
};

const columnReducer = (state = {}, action) => {
  switch (action.type) {
    case "ADD_COLUMN": {
      const { columnId, columnTitle } = action.payload;
      return {
        ...state,
        [columnId]: { columnId: columnId, title: columnTitle, cards: [] }
      };
    }
    case "CHANGE_COLUMN_TITLE": {
      const { columnId, columnTitle } = action.payload;
      return {
        ...state,
        [columnId]: { ...state[columnId], title: columnTitle }
      };
    }
    case "DELETE_COLUMN": {
      const { columnId } = action.payload;
      const { [columnId]: deletedColumn, ...restColumns } = state;
      return restColumns;
    }
    case "ADD_CARD": {
      const { columnId, cardId } = action.payload;
      return {
        ...state,
        [columnId]: { ...state[columnId], cards: [...state[columnId].cards, cardId] }
      };
    }
    case "DELETE_CARD": {
      const { cardId: deletedCardId, columnId } = action.payload;
      const filterDeleted = cardId => cardId !== deletedCardId;
      return {
        ...state,
        [columnId]: { ...state[columnId], cards: state[columnId].cards.filter(filterDeleted) }
      };
    }
    default:
      return state;
  }
};

const cardReducer = (state = {}, action) => {
  switch (action.type) {
    case "ADD_CARD": {
      const { cardText, cardId } = action.payload;
      return { ...state, [cardId]: { text: cardText, cardId: cardId } };
    }
    case "CHANGE_CARD_TEXT": {
      const { cardText, cardId } = action.payload;
      return { ...state, [cardId]: { ...state[cardId], text: cardText } };
    }
    case "DELETE_CARD": {
      const { cardId } = action.payload;
      const { [cardId]: deletedCard, ...restCards } = state;
      return restCards;
    }
    // Find every card from the deleted column and remove it
    case "DELETE_COLUMN": {
      const { cards: cardIds } = action.payload;
      return Object.keys(state)
        .filter(cardId => !cardIds.includes(cardId))
        .reduce((newState, cardId) => ({ ...newState, [cardId]: state[cardId] }), {});
    }
    default:
      return state;
  }
};

const reducers = combineReducers({
  boardState: boardReducer,
  columnState: columnReducer,
  cardState: cardReducer
});


const store = createStore(reducers, applyMiddleware(logger));

export default store;
