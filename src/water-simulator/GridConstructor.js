import React, { Component } from "react";
import './GridConstructor.css';

class GridConstructor extends Component {
  render () {
    return (
      <>
        <h2>Grid Creation</h2>
         <form className="form-container">
          <div className="form-field">
            <label className="form-label">Number of Rows: { this.props.noOfRows }</label>
            <input
              type="range"
              className="form-input"
              value={this.props.noOfRows}
              min={1}
              max={10}
              step={1}
              onChange={(e) => this.props.handleGridConstructorChange('noOfRows', +e.target.value)}
            />
          </div>
          <div className="form-field">
            <label className="form-label">Number of Columns: { this.props.noOfColumns }</label>
            <input
              type="range"
              className="form-input" 
              value={this.props.noOfColumns}
              min={1}
              max={10}
              step={1}
              onChange={(e) => this.props.handleGridConstructorChange('noOfColumns', +e.target.value)}  
            />
          </div>
          <div className="form-field">
            <label className="form-label">Number of Obstructions: { this.props.noOfBlocks }</label>
            <input
              type="range"
              className="form-input" 
              value={this.props.noOfBlocks}
              min={1}
              max={10}
              step={1}
              onChange={(e) => this.props.handleGridConstructorChange('noOfBlocks', +e.target.value)}  
            />
          </div>
        </form>

        <button className="btn" onClick={() => this.props.handleCurrentStepChange(1)}>Next</button>
      </>
    )
  }
}

export default GridConstructor;