import "../../index.css";
import React, { Component } from "react";
import TextareaAutosize from "react-textarea-autosize";
import { EditButtons } from "./EditButtons";

class CardEditor extends Component {
  state = {
    cardText: this.props.cardText || ""
  };

  handleChangeText = event => this.setState({ cardText: event.target.value });

  onEnter = e => {
    const { cardText } = this.state;

    if (e.keyCode === 13) {
      e.preventDefault();
      this.props.onSave(cardText);
    }
  };

  render() {
    const { cardText } = this.state;
    const { onSave, onCancel, onDelete, adding } = this.props;

    return (
      <div className="Edit-Card">
        <div className="Card">
          <TextareaAutosize
            autoFocus
            className="Edit-Card-Textarea"
            placeholder="Enter the text for this card..."
            value={cardText}
            onChange={this.handleChangeText}
            onKeyDown={this.onEnter}
          />
        </div>
        <EditButtons
          handleSave={() => onSave(cardText)}
          saveLabel={adding ? "Add card" : "Save"}
          handleDelete={onDelete}
          handleCancel={onCancel}
        />
      </div>
    );
  }
}

export { CardEditor }
