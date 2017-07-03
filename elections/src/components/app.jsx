import React from 'react';
import Histogram from './histogram';

class App extends React.Component{
  constructor(props){
    super(props);
    this.state ={"candidates": {}};
    this.callbackFunc = this.callbackFunc.bind(this);
  }
  componentWillMount(){
  }

    // var txtFile = '../public/itpas2.txt';
    // var file = new File(txtFile);
    // file.open("r");
    // while (!file.eof) {
    //     alert(file.readln());
    // }
    // file.close();

  callbackFunc(candidates) {

      this.setState({candidates})
      // do something with the response
  }
  render(){
    return <Histogram candidates={this.state.candidates}/>
    }
}

export default App;
