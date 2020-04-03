import { ActionTypes } from './actions';

export const boardReducer = (state = { columns: [] }, action) => {
    switch (action.type) {
        case ActionTypes.ADD_COLUMN: {
            return { columns: [...state.columns, action.payload.columnId] };
        }
        case ActionTypes.DELETE_COLUMN: {
            const columns = state.columns.filter(x => x !== action.payload.columnId);
            return { columns };
        }
        default:
            return state;
    }
};