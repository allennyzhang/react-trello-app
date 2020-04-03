import { ActionType } from './actionType';

export const boardReducer = (state = { columns: [] }, action) => {
    switch (action.type) {
        case ActionType.ADD_COLUMN: {
            const { columnId } = action.payload;
            return { columns: [...state.columns, columnId] };
        }
        case ActionType.DELETE_COLUMN: {
            const { columnId } = action.payload;
            const filterDeleted = tmpColumnId => tmpColumnId !== columnId;
            const newColumns = state.columns.filter(filterDeleted);
            return { columns: newColumns };
        }
        default:
            return state;
    }
};