import "../../index.css";
import React, { Component } from "react";
import { connect } from "react-redux";
import { ColumnEditor } from "./ColumnEditor";
import shortid from "shortid";
import { EditButtons } from "../cards/EditButtons";
import { Actions } from '../../redux';

class AddColumnImp extends Component {
  state = {
    title: ""
  };

  handleChangeTitle = e => this.setState({ title: e.target.value });

  createColumn = async () => {
    const { title } = this.state;
    const { columnState } = this.props;

    const isTitleExist = Object.values(columnState).filter(x => x.title.toLowerCase().trim() === title.toLowerCase().trim());
    if (!title.trim() || isTitleExist.length) return;

    const { dispatch } = this.props;
    this.props.toggleAddingColumn();

    dispatch(Actions.AddColumn({ columnId: shortid.generate(), columnTitle: title }));
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

const mapStateToProps = state => ({ columnState: state.columnState });

export const AddColumn = connect(mapStateToProps)(AddColumnImp);
