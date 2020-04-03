import "../../index.css";
import React, { Component } from "react";
import { connect } from "react-redux";
import { Card } from "../cards/Card";
import { CardEditor } from "../cards/CardEditor";
import shortid from "shortid";
import { ColumnEditor } from "./ColumnEditor";
import { Actions } from '../../redux';

class ColumnImp extends Component {
  state = {
    isAddingCard: false,
    isEditingTitle: false,
    title: this.props.column.title,
  };

  handleAddCard = async cardText => {
    this.toggleAddingCard();

    if (!cardText.trim()) return;

    const { columnId, dispatch } = this.props;
    const cardId = shortid.generate();
    dispatch(Actions.AddCard({ cardText, cardId, columnId }));
  };

  toggleAddingCard = () => this.setState({ isAddingCard: !this.state.isAddingCard });

  handleChangeTitle = e => this.setState({ title: e.target.value });

  handleEditTitle = async () => {
    this.toggleEditingTitle();

    const { title } = this.state;
    if (!title.trim()) return;

    const { columnId, dispatch } = this.props;
    dispatch(Actions.UpdateColumn({ columnId, columnTitle: title }));
  };

  toggleEditingTitle = () => this.setState({ isEditingTitle: !this.state.isEditingTitle });

  handleDeleteColumn = async () => {
    const { columnId, column, dispatch } = this.props;
    dispatch(Actions.DeleteColumn({ columnId, cards: column.cards }));
  };

  render() {
    const { column } = this.props;
    const { isEditingTitle, isAddingCard, title } = this.state;

    return (
      <div className="Column">
        {isEditingTitle
          ? <ColumnEditor
            column={column}
            title={title}
            handleChangeTitle={this.handleChangeTitle}
            saveColumn={this.handleEditTitle}
            onClickOutside={this.handleEditTitle}
            deleteColumn={this.handleDeleteColumn}
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

        {isAddingCard
          ? <CardEditor
            onSave={this.handleAddCard}
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