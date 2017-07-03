import React from 'react';
import Histogram from './histogram';

class App extends React.Component{
  constructor(props){
    super(props);
    this.state ={"candidates": {}};

  }
  componentWillMount(){
    this.props.getAll();
  }


  render(){
    console.log("app",this.props);
    return <Histogram candidates={this.props.candidates}/>
    }
}

export default App;
