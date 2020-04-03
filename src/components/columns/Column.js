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
    columnTitle: this.props.column.columnTitle,
  };

  handleAddCard = async cardText => {
    this.toggleAddingCard();
    const { cardState } = this.props;
    const isCardExist = Object.values(cardState).filter(x => x.cardText.toLowerCase().trim() === cardText.toLowerCase().trim());
    if (!cardText.trim() || isCardExist.length) return;

    const { columnId, dispatch } = this.props;
    const cardId = shortid.generate();
    dispatch(Actions.AddCard({ cardText, cardId, columnId }));
  };

  toggleAddingCard = () => this.setState({ isAddingCard: !this.state.isAddingCard });

  handleChangeTitle = e => this.setState({ columnTitle: e.target.value });

  handleEditTitle = async () => {
    this.toggleEditingTitle();

    const { columnTitle } = this.state;
    const { columnState } = this.props;
    const isTitleExist = Object.values(columnState).filter(x => x.columnTitle.toLowerCase().trim() === columnTitle.toLowerCase().trim());
    if (!columnTitle.trim() || isTitleExist.length) return;

    const { columnId, dispatch } = this.props;
    dispatch(Actions.UpdateColumn({ columnId, columnTitle }));
  };

  toggleEditingTitle = () => this.setState({ isEditingTitle: !this.state.isEditingTitle });

  handleDeleteColumn = async () => {
    const { columnId, column, dispatch } = this.props;
    dispatch(Actions.DeleteColumn({ columnId, columnCards: column.columnCards }));
  };

  render() {
    const { column } = this.props;
    const { isEditingTitle, isAddingCard, columnTitle } = this.state;

    return (
      <div className="Column">
        {isEditingTitle
          ? <ColumnEditor
            column={column}
            columnTitle={columnTitle}
            handleChangeTitle={this.handleChangeTitle}
            saveColumn={this.handleEditTitle}
            onClickOutside={this.handleEditTitle}
            deleteColumn={this.handleDeleteColumn}
          />
          : <div className="Column-Title" onClick={this.toggleEditingTitle}>
            {column.columnTitle}
          </div>
        }

        {column.columnCards &&
          column.columnCards.map((cardId, index) =>
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
  cardState: state.cardState,
  columnState: state.columnState,
  column: state.columnState[ownProps.columnId]
});

export const Column = connect(mapStateToProps)(ColumnImp);