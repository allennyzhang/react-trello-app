import "../../index.css";
import React, { Component } from "react";
import { connect } from "react-redux";
import { ColumnEditor } from "./ColumnEditor";
import shortid from "shortid";
import { EditButtons } from "../cards/EditButtons";
import { Actions } from '../../redux';

class AddColumnImp extends Component {
  state = {
    columnTitle: ""
  };

  handleChangeTitle = e => this.setState({ columnTitle: e.target.value });

  createColumn = async () => {
    const { columnTitle } = this.state;
    const { columnState } = this.props;

    const isTitleExist = Object.values(columnState).filter(x => x.columnTitle.toLowerCase().trim() === columnTitle.toLowerCase().trim());
    if (!columnTitle.trim() || isTitleExist.length) return;

    const { dispatch } = this.props;
    this.props.toggleAddingColumn();

    dispatch(Actions.AddColumn({ columnId: shortid.generate(), columnTitle }));
  };

  render() {
    const { toggleAddingColumn } = this.props;
    const { columnTitle } = this.state;

    return (
      <div className="Add-Column-Editor">
        <ColumnEditor
          columnTitle={columnTitle}
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
