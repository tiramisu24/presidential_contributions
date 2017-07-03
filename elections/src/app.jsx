import React from 'react';
import $ from 'jquery';

class App extends React.Component{
  constructor(props){
    super(props);
    this.state ={};
  }
  componentWillMount(){
    this.readData();
  }
  readData(){

      // console.log("works");
      $.ajax({
          type: "POST",
          url: "~/readFiles.py",
          success: this.callbackFunc
      });

  }
    // var txtFile = '../public/itpas2.txt';
    // var file = new File(txtFile);
    // file.open("r");
    // while (!file.eof) {
    //     alert(file.readln());
    // }
    // file.close();

  callbackFunc(response) {
      console.log(typeof response);
      // do something with the response
      // console.log(response);
  }
  render(){
    return <div>

      Test
    </div>
  }
}

export default App;
