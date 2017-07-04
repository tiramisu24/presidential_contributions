import React from 'react';
import Histogram from './histogram';
import '../style/index.css';
import Select from './select';
import {Button} from 'react-bootstrap';

class App extends React.Component{
  constructor(props){
    super(props);
    this.state ={"candidates": {}, "graph":true};
    this.changeToGraph = this.changeToGraph.bind(this);
    this.changeToPie = this.changeToPie.bind(this);
  }
  componentWillMount(){
    this.props.getAll();
  }
  changeToGraph(e){
    e.preventDefault();
    if(this.state.graph !== true) this.setState({graph:true});
    console.log("graph", this.state.graph);
  }
  changeToPie(e){
    e.preventDefault();
    if(this.state.graph !== false) this.setState({graph:false});
    console.log("pie", this.state.graph);
  }


  render(){
    return <div className="app">
      <div className="header"><div>Contributions from Committees</div></div>
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
