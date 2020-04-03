import "../../index.css";
import React, { Component } from "react";
import { connect } from "react-redux";
import { ColumnEditor } from "./ColumnEditor";
import shortid from "shortid";
import { EditButtons } from "../cards/EditButtons";
import { ActionType } from '../../redux';

class AddColumnImp extends Component {
  state = {
    title: ""
  };

  handleChangeTitle = e => this.setState({ title: e.target.value });

  createColumn = async () => {
    const { title } = this.state;
    const { dispatch } = this.props;

    this.props.toggleAddingColumn();

    dispatch({
      type: ActionType.ADD_COLUMN,
      payload: { columnId: shortid.generate(), columnTitle: title }
    });
  };

  render() {
    const { toggleAddingColumn } = this.props;
    const { title } = this.state;

    return (
      <div className="Add-Column-Editor">
        <ColumnEditor
          title={title}
          handleChangeTitle={this.handleChangeTitle}
          onClickOutside={toggleAddingColumn}
          saveColumn={this.createColumn}
        />

        <EditButtons
          handleSave={this.createColumn}
          saveLabel={"Add column"}
          handleCancel={toggleAddingColumn}
        />
      </div>
    );
  }
}

export const AddColumn = connect()(AddColumnImp);
