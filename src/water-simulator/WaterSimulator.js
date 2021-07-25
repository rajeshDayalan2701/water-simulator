import React, { Component } from 'react';
import Node from './node/Node';

import './WaterSimulator.css';

class WaterSimulator extends Component {
  constructor () {
    super();
    this.state = {
      grid: [],
      noOfBlocksMoved: 0,
      simulationStarted: false,
      simulationCompleted: false,
      columnChosen: false
    }
    this.blocksContainer = React.createRef();
  }

  componentDidMount () {
    const grid = getInitialGrid(this.props.noOfRows, this.props.noOfColumns);
    this.setState({grid});
  }

  handleSelectStartColumn (col) {
    this.setState({
      ...this.state,
      columnChosen: true
    })

    setTimeout(() => {
      let currentNodesProcessed = [];
  
      // Initial Node selected
      let selectedStartNode = this.state.grid[0][col];
      selectedStartNode.isVisited = true;
      this.setState({
        grid: this.state.grid
      });
      currentNodesProcessed.push(selectedStartNode);

      //TO make water flow in a slow manner
      let intervalId = setInterval(() => {
        let currentNode = currentNodesProcessed.shift();
        currentNodesProcessed.push(...this.fetchNextNode(currentNode));
        this.setState({
          grid: this.state.grid
        });

        if (currentNodesProcessed.length === 0) {
          clearInterval(intervalId);

          this.setState({
            ...this.state,
            simulationCompleted: true
          })
        }
      }, 100);
    }, 100)
  }

  handleBlockNode (row, col) {
    let selectedNode = this.state.grid[row][col];
    selectedNode.isWall = true;
    this.setState({
      grid: this.state.grid
    });
  }

  fetchNextNode ({ row, col }) {
    let nextNodes = []
    //If the flow reaches the last row, then end the simulation
    if (row === this.state.grid.length - 1) {
      return nextNodes;
    }

    //If direct node which is below current node is not a wall or already visisted, then its a valid nextNode
    let nextNode = this.state.grid[row + 1][col];
    if (nextNode && !nextNode.isVisited && !nextNode.isWall) {
      nextNode.isVisited = true;
      nextNodes.push(nextNode);
    } else {
      let leftNode;
      let rightNode;

      if (col !== 0) {
        leftNode = this.state.grid[row][col - 1];
        if (leftNode && !leftNode.isVisited && !leftNode.isWall) {
          leftNode.isVisited = true;
          nextNodes.push(leftNode);
        }
      }

      if (col < this.state.grid[0].length) {
        rightNode = this.state.grid[row][col + 1];
        if (rightNode && !rightNode.isVisited && !rightNode.isWall) {
          rightNode.isVisited = true;
          nextNodes.push(rightNode);
        }
      }
    }

    return nextNodes;
  }

  removeCurrentRow (currentNodesProcessed, currentNode) {
    currentNodesProcessed = currentNodesProcessed.filter((node) => !(node.row === currentNode.row && node.col === currentNode.col));
  }

  handleDragEnd (e) {
    if (e.dataTransfer.dropEffect === 'move' || e.dataTransfer.dropEffect === 'copy') {
      e.target.classList.add('moved');
      e.target.parentNode.classList.add('moved');
      this.setState({
        ...this.state,
        noOfBlocksMoved: this.state.noOfBlocksMoved + 1
      });
    }
  }

  startSimulation () {
    this.setState({
      ...this.state,
      simulationStarted: true
    })
  }

  handleReset () {
    this.setState({
      noOfBlocksMoved: 0,
      simulationStarted: false,
      simulationCompleted: false,
      columnChosen: false,
      grid: getInitialGrid(this.props.noOfRows, this.props.noOfColumns)
    })
    let blocksContainer = this.blocksContainer.current.childNodes;
    blocksContainer.forEach((blockContainer) => {
      blockContainer.classList.remove('moved');

      let childBlocks = blockContainer.childNodes;
      childBlocks.forEach((block) => {
        block.classList.remove('moved');
      });
    });
  }

  render () {
    const { grid } = this.state;
    const blocks = new Array(this.props.noOfBlocks).fill(0);

    return (
      <>
        {
          this.state.noOfBlocksMoved === this.props.noOfBlocks ?
          <p>Select the waterflow start point by clicking on any of the blue boxes</p> :
          <p>Drag the obstructions and place it inside grid</p>
        }
        
        <div className="grid-container">
          <div className="grid">
            { grid.map((row, rowIdx) => {
              return (
                <div key={rowIdx} className={`
                  grid-row
                  ${rowIdx === 0 && this.state.simulationStarted ? 'show' : '' }
                `}>
                  {row.map((node, nodeIdx) => {
                    const { row, col, isWall, isVisited } = node;
                    return (
                      <Node
                        key={nodeIdx}
                        col={col}
                        isWall={isWall}
                        isVisited={isVisited}
                        row={row}
                        handleSelectStartColumn={(col) => this.handleSelectStartColumn(col)}
                        handleBlockNode={(row, col) => this.handleBlockNode(row, col)}
                        columnChosen={this.state.columnChosen}
                      ></Node>
                    );
                  })}
                </div>
              );
            })}
          </div>

          <div className="blocks" ref={this.blocksContainer}>
            {
              blocks.map((_, idx) => {
                return (
                  <div className="block-container" key={idx} >
                    <div
                      className="block"
                      draggable
                      onDragEnd={this.handleDragEnd.bind(this)}
                    ></div>
                  </div>
                )
              })
            }
          </div>
        </div>

        <div className="action-buttons">
          <button className="btn mr-10p" onClick={() => this.props.handleCurrentStepChange(0)}>Back</button>
          {
            !this.state.simulationStarted && <button
              className="btn"
              disabled={ this.state.noOfBlocksMoved !== this.props.noOfBlocks}
              onClick={ this.startSimulation.bind(this) }
            >Start Simulation</button>
          }
          {
            this.state.simulationCompleted && <button
              className="btn"
              onClick={ this.handleReset.bind(this) }
            >Reset</button>
          }
        </div>
      </>
    )
  }

}

export default WaterSimulator;

const getInitialGrid = (maxRows, maxCols) => {
  const grid = [];
  for (let row = 0; row < maxRows + 2; row++) {
    const currentRow = [];
    for (let col = 0; col < maxCols; col++) {
      currentRow.push(createNode(col, row));
    }
    grid.push(currentRow);
  }
  return grid;
}

const createNode = (col, row) => {
  return {
    col,
    row,
    isVisited: false,
    isWall: false
  };
}