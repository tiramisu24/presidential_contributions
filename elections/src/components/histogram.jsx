import React from 'react';

class Histogram extends React.Component{
  constructor(props){
    super(props);
    this.state ={};
    console.log(this.props)
  }

  componentWillMount(){
    let candidates = this.props.candidates;

    console.log("will mount", this.props);
    console.log("will mount", candidates);
    // let names = Object.keys(candidates);
    // for(let i = 0; i<names.length; i++){
    //   console.log(names);
    // }

  }

  render(){
    return <div>
      Histogram
    </div>;
  }
}

export default Histogram;
