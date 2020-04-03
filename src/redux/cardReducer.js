import { ActionTypes } from './actions';

export const cardReducer = (state = {}, action) => {
    switch (action.type) {
        case ActionTypes.ADD_CARD: {
            const { cardText, cardId } = action.payload;
            return { ...state, [cardId]: { text: cardText, cardId: cardId } };
        }
        case ActionTypes.UPDATE_CARD: {
            const { cardText, cardId } = action.payload;
            return { ...state, [cardId]: { ...state[cardId], text: cardText } };
        }
        case ActionTypes.DELETE_CARD: {
            const { cardId } = action.payload;
            const { [cardId]: deletedCard, ...restCards } = state;
            return restCards;
        }
        // Find every card from the deleted column and remove it
        case ActionTypes.DELETE_COLUMN: {
            const { cards: cardIds } = action.payload;
            return Object.keys(state)
                .filter(cardId => !cardIds.includes(cardId))
                .reduce((newState, cardId) => ({ ...newState, [cardId]: state[cardId] }), {});
        }
        default:
            return state;
    }
};