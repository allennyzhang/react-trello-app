import { ActionType } from './actionType';

export const cardReducer = (state = {}, action) => {
    switch (action.type) {
        case ActionType.ADD_CARD: {
            const { cardText, cardId } = action.payload;
            return { ...state, [cardId]: { text: cardText, cardId: cardId } };
        }
        case ActionType.UPDATE_CARD: {
            const { cardText, cardId } = action.payload;
            return { ...state, [cardId]: { ...state[cardId], text: cardText } };
        }
        case ActionType.DELETE_CARD: {
            const { cardId } = action.payload;
            const { [cardId]: deletedCard, ...restCards } = state;
            return restCards;
        }
        // Find every card from the deleted column and remove it
        case ActionType.DELETE_COLUMN: {
            const { cards: cardIds } = action.payload;
            return Object.keys(state)
                .filter(cardId => !cardIds.includes(cardId))
                .reduce((newState, cardId) => ({ ...newState, [cardId]: state[cardId] }), {});
        }
        default:
            return state;
    }
};