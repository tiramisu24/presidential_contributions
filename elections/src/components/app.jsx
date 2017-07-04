import React from 'react';
import Histogram from './histogram';
import '../style/index.css';
import Select from './select';

class App extends React.Component{
  constructor(props){
    super(props);
    this.state ={"candidates": {}};

  }
  componentWillMount(){
    this.props.getAll();
  }


  render(){
    return <div className="app">
      <div className="header">Contributions from Committees</div>
      <div className="content">        
        <Histogram candidates={this.props.candidates}/>
        <Select addCandidate = {this.props.addCandidate}
          removeCandidate= {this.props.removeCandidate}
          candidates ={this.props.candidates}/>
      </div>
    </div>
    }
}

export default App;
