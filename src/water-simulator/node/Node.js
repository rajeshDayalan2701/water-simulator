import React, {Component} from 'react';

import './Node.css';

class Node extends Component {

  handleColumnSelection (row, col) {
    if (row === 0) {
      this.props.handleSelectStartColumn(col);
    }
  }

  handleDrop () {
    this.props.handleBlockNode(this.props.row, this.props.col);
  }

  allowDrop (e) {
    e.preventDefault();
  }

  render() {
    const {
      col,
      row,
      isWall,
      isVisited,
      columnChosen
    } = this.props;

    return (
      <div
        onDrop={(e) => this.handleDrop(e)}
        onDragOver={this.allowDrop}
        id={`node-${row}-${col}`}
        className={`
          node
          ${isWall ? 'node-wall': ''}
          ${isVisited ? 'node-visited': ''}
          ${row === 0 && !isVisited && columnChosen ? 'hide' : ''}
        `}
        onClick={() => this.handleColumnSelection(row, col)}
      ></div>
    );
  }
}

export default Node;