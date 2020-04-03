import "../../index.css";
import React, { Component } from "react";
import { connect } from "react-redux";
import { Column } from "../columns/Column";
import { AddColumn } from "../columns/AddColumn";

class BoardImp extends Component {
  state = {
    addingColumn: false
  };

  toggleAddingColumn = () => this.setState({ addingColumn: !this.state.addingColumn });

  render() {
    const { boardState } = this.props;
    const { addingColumn } = this.state;

    return (
      <div className="Board">
        {boardState.columns.map((columnId, index) => {
          return <Column columnId={columnId} key={index} />;
        })}

        <div className="Add-Column">
          {addingColumn
            ? <AddColumn toggleAddingColumn={this.toggleAddingColumn} />
            : <div onClick={this.toggleAddingColumn} className="Add-Column-Button">
              <ion-icon name="add" /> Add a Column
            </div>
          }
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({ boardState: state.boardState });

export const Board = connect(mapStateToProps)(BoardImp);