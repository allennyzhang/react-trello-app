import "../../index.css";
import React, { Component } from "react";
import TextareaAutosize from "react-textarea-autosize";

class ColumnEditor extends Component {
  ref = React.createRef();

  onEnter = e => {
    if (e.keyCode === 13) {
      e.preventDefault();
      this.props.saveColumn();
    }
  };

  handleClick = e => {
    const node = this.ref.current;
    if (node.contains(e.target)) {
      return;
    }

    this.props.onClickOutside();
  };

  componentDidMount() {
    document.addEventListener("click", this.handleClick, false);
  }

  componentWillUnmount() {
    document.removeEventListener("click", this.handleClick, false);
  }

  render() {
    const { title, handleChangeTitle, deleteColumn } = this.props;

    return (
      <div className="Column-Title-Edit" ref={this.ref}>
        <TextareaAutosize
          autoFocus
          className="Column-Title-Textarea"
          placeholder="Enter column title..."
          value={title}
          onChange={handleChangeTitle}
          onKeyDown={this.onEnter}
          style={{ width: deleteColumn ? 220 : 245 }}
        />
        {deleteColumn && <ion-icon name="trash" onClick={deleteColumn} />}
      </div>
    );
  }
}

export { ColumnEditor }
