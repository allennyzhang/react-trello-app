import { ActionTypes } from './actions';

export const boardReducer = (state = { columns: [] }, action) => {
    switch (action.type) {
        case ActionTypes.ADD_COLUMN: {
            const { columnId } = action.payload;
            return { columns: [...state.columns, columnId] };
        }
        case ActionTypes.DELETE_COLUMN: {
            const { columnId } = action.payload;
            const filterDeleted = tmpColumnId => tmpColumnId !== columnId;
            const newColumns = state.columns.filter(filterDeleted);
            return { columns: newColumns };
        }
        default:
            return state;
    }
};