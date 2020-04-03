export const ActionTypes = {
    ADD_CARD: 'ADD_CARD',
    UPDATE_CARD: 'UPDATE_CARD',
    DELETE_CARD: 'DELETE_CARD',
    ADD_COLUMN: 'ADD_COLUMN',
    UPDATE_COLUMN: 'UPDATE_COLUMN',
    DELETE_COLUMN: 'DELETE_COLUMN',
};

const AddCard = payload => ({
    type: ActionTypes.ADD_CARD,
    payload
});

const UpdateCard = payload => ({
    type: ActionTypes.UPDATE_CARD,
    payload
});

const DeleteCard = payload => ({
    type: ActionTypes.DELETE_CARD,
    payload
});

const AddColumn = payload => ({
    type: ActionTypes.ADD_COLUMN,
    payload
});

const DeleteColumn = payload => ({
    type: ActionTypes.DELETE_COLUMN,
    payload
});

const UpdateColumn = payload => ({
    type: ActionTypes.UPDATE_COLUMN,
    payload
});


export const Actions = {
    AddCard,
    UpdateCard,
    DeleteCard,
    AddColumn,
    UpdateColumn,
    DeleteColumn
};