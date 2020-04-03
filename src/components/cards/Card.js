import "../../index.css";
import React, { Component } from "react";
import { connect } from "react-redux";
import { CardEditor } from "./CardEditor";
import { Actions } from '../../redux';

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
      cardText: this.props.card.cardText
    });

  endEditing = () => this.setState({ hover: false, editing: false });

  editCard = async cardText => {
    this.endEditing();
    const { cardState } = this.props;
    const isCardExist = Object.values(cardState).filter(x => x.cardText.toLowerCase().trim() === cardText.toLowerCase().trim());
    if (!cardText.trim() || isCardExist.length) return;

    const { card, dispatch } = this.props;

    dispatch(Actions.UpdateCard({ cardId: card.cardId, cardText }));
  };

  deleteCard = async () => {
    const { columnId, card, dispatch } = this.props;

    dispatch(Actions.DeleteCard({ cardId: card.cardId, columnId }));
  };

  render() {
    const { card } = this.props;
    const { hover, editing } = this.state;

    if (editing) {
      return (
        <CardEditor
          cardText={card.cardText}
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
          {card.cardText}
        </div>
      );
    }
  }
}

const mapStateToProps = (state, ownProps) => ({
  card: state.cardState[ownProps.cardId],
  cardState: state.cardState
});

export const Card = connect(mapStateToProps)(CardImp);