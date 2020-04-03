import "../../index.css";
import React, { Component } from "react";
import { connect } from "react-redux";
import { Card } from "../cards/Card";
import { CardEditor } from "../cards/CardEditor";
import shortid from "shortid";
import { ColumnEditor } from "./ColumnEditor";
import { ActionType } from '../../redux';

class ColumnImp extends Component {
  state = {
    editingTitle: false,
    title: this.props.column.title,
    addingCard: false
  };

  toggleAddingCard = () => this.setState({ addingCard: !this.state.addingCard });

  addCard = async cardText => {
    const { columnId, dispatch } = this.props;
    this.toggleAddingCard();

    const cardId = shortid.generate();

    dispatch({
      type: ActionType.ADD_CARD,
      payload: { cardText, cardId, columnId }
    });
  };

  toggleEditingTitle = () => this.setState({ editingTitle: !this.state.editingTitle });

  handleChangeTitle = e => this.setState({ title: e.target.value });

  editColumnTitle = async () => {
    const { columnId, dispatch } = this.props;
    const { title } = this.state;
    this.toggleEditingTitle();

    dispatch({
      type: ActionType.UPDATE_COLUMN,
      payload: { columnId, columnTitle: title }
    });
  };

  deleteColumn = async () => {
    const { columnId, column, dispatch } = this.props;

    dispatch({
      type: ActionType.DELETE_COLUMN,
      payload: { columnId, cards: column.cards }
    });
  };

  render() {
    const { column } = this.props;
    const { editingTitle, addingCard, title } = this.state;

    return (
      <div className="Column">
        {editingTitle
          ? <ColumnEditor
            column={column}
            title={title}
            handleChangeTitle={this.handleChangeTitle}
            saveColumn={this.editColumnTitle}
            onClickOutside={this.editColumnTitle}
            deleteColumn={this.deleteColumn}
          />
          : <div className="Column-Title" onClick={this.toggleEditingTitle}>
            {column.title}
          </div>
        }

        {column.cards &&
          column.cards.map((cardId, index) =>
            <Card
              key={cardId}
              cardId={cardId}
              index={index}
              columnId={column.columnId}
            />
          )}

        {addingCard
          ? <CardEditor
            onSave={this.addCard}
            onCancel={this.toggleAddingCard}
            adding
          />
          : <div className="Toggle-Add-Card" onClick={this.toggleAddingCard}>
            <ion-icon name="add" /> Add a card
            </div>
        }
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  column: state.columnState[ownProps.columnId]
});

export const Column = connect(mapStateToProps)(ColumnImp);