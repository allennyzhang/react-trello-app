import { ActionTypes } from './actions';

export const columnReducer = (state = {}, action) => {
    switch (action.type) {
        case ActionTypes.ADD_COLUMN: {
            const { columnId, columnTitle } = action.payload;
            return {
                ...state,
                [columnId]: { columnId: columnId, title: columnTitle, cards: [] }
            };
        }
        case ActionTypes.UPDATE_COLUMN: {
            const { columnId, columnTitle } = action.payload;
            return {
                ...state,
                [columnId]: { ...state[columnId], title: columnTitle }
            };
        }
        case ActionTypes.DELETE_COLUMN: {
            const { columnId } = action.payload;
            const { [columnId]: deletedColumn, ...restColumns } = state;
            return restColumns;
        }
        case ActionTypes.ADD_CARD: {
            const { columnId, cardId } = action.payload;
            return {
                ...state,
                [columnId]: { ...state[columnId], cards: [...state[columnId].cards, cardId] }
            };
        }
        case ActionTypes.DELETE_CARD: {
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