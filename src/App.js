import React, { Component } from "react";
import WaterSimulator from './water-simulator/WaterSimulator';
import GridConstructor from './water-simulator/GridConstructor';
import './App.css';

class App extends Component {
  constructor () {
    super();
    this.state = {
      noOfRows: 5,
      noOfColumns: 5,
      noOfBlocks: 3,
      currentStep: 0
    }
  }

  handleGridConstructorChange = (fieldName, value) => {
    this.setState({
      ...this.state,
      [fieldName]: value
    })
  }

  handleCurrentStepChange = (currentStep) => {
    this.setState({
      ...this.state,
      currentStep
    })
  }

  render () {
    return (
      <div className="app">
        <h1 className="app-header">Waterflow Simulator</h1>
        {
          this.state.currentStep === 0 && <GridConstructor 
            noOfRows={this.state.noOfRows}
            noOfColumns={this.state.noOfColumns}
            noOfBlocks={this.state.noOfBlocks}
            handleGridConstructorChange={this.handleGridConstructorChange}
            handleCurrentStepChange={this.handleCurrentStepChange}
          />
        }
        {
          this.state.currentStep === 1 && <WaterSimulator
            noOfRows={this.state.noOfRows}
            noOfColumns={this.state.noOfColumns}
            noOfBlocks={this.state.noOfBlocks}
            handleCurrentStepChange={this.handleCurrentStepChange}
          />
        }
      </div>
    );
  }
}

export default App;
