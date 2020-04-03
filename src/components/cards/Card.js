import "../../index.css";
import React, { Component } from "react";
import { connect } from "react-redux";
import { CardEditor } from "./CardEditor";
import { ActionType } from '../../redux';

class CardImp extends Component {

  state = {
    hover: false,
    editing: false
  };

  startHover = () => this.setState({ hover: true });
  endHover = () => this.setState({ hover: false });

  startEditing = () =>
    this.setState({
      hover: false,
      editing: true,
      text: this.props.card.text
    });

  endEditing = () => this.setState({ hover: false, editing: false });

  editCard = async text => {
    this.endEditing();
    if (!text.trim()) return;

    const { card, dispatch } = this.props;

    dispatch({
      type: ActionType.UPDATE_CARD,
      payload: { cardId: card.cardId, cardText: text }
    });
  };

  deleteCard = async () => {
    const { columnId, card, dispatch } = this.props;

    dispatch({
      type: ActionType.DELETE_CARD,
      payload: { cardId: card.cardId, columnId }
    });
  };

  render() {
    const { card } = this.props;
    const { hover, editing } = this.state;

    if (editing) {
      return (
        <CardEditor
          text={card.text}
          onSave={this.editCard}
          onDelete={this.deleteCard}
          onCancel={this.endEditing}
        />
      );

    } else {
      return (
        <div
          className="Card"
          onMouseEnter={this.startHover}
          onMouseLeave={this.endHover}
        >
          {hover && (
            <div className="Card-Icons">
              <div className="Card-Icon" onClick={this.startEditing}>
                <ion-icon name="create" />
              </div>
            </div>
          )}
          {card.text}
        </div>
      );
    }
  }
}

const mapStateToProps = (state, ownProps) => ({
  card: state.cardState[ownProps.cardId]
});

export const Card = connect(mapStateToProps)(CardImp);