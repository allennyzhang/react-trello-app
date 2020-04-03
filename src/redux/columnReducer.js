import { ActionType } from './actionType';

export const columnReducer = (state = {}, action) => {
    switch (action.type) {
        case ActionType.ADD_COLUMN: {
            const { columnId, columnTitle } = action.payload;
            return {
                ...state,
                [columnId]: { columnId: columnId, title: columnTitle, cards: [] }
            };
        }
        case ActionType.UPDATE_COLUMN: {
            const { columnId, columnTitle } = action.payload;
            return {
                ...state,
                [columnId]: { ...state[columnId], title: columnTitle }
            };
        }
        case ActionType.DELETE_COLUMN: {
            const { columnId } = action.payload;
            const { [columnId]: deletedColumn, ...restColumns } = state;
            return restColumns;
        }
        case ActionType.ADD_CARD: {
            const { columnId, cardId } = action.payload;
            return {
                ...state,
                [columnId]: { ...state[columnId], cards: [...state[columnId].cards, cardId] }
            };
        }
        case ActionType.DELETE_CARD: {
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