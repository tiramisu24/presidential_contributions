import React from 'react';
import merge from 'lodash/merge';
import {Button} from 'react-bootstrap';
import "../style/select.css"


class Select extends React.Component{
  constructor(props){
    super(props);
    this.state={
      candidates: this.props.candidates,
      unselected: {}
    }

    this.showCandidates = this.showCandidates.bind(this);
    this.onDragEnd = this.onDragEnd.bind(this);
  }
  componentWillReceiveProps(nextProps){
    this.setState({candidates:nextProps.candidates});
  }

  showCandidates(isShown){
    let candidates = (isShown) ? this.state.candidates : this.state.unselected
    let list = Object.keys(candidates).map(name =>{
      return <div key={name} draggable={true} >
        <Button >{name}</Button>
      </div>
    })
    return list;
  }

  onDragEnd(e){
    e.preventDefault();
    let candidates = this.state.candidates;
    let unselected = this.state.unselected;
    let candidateName = e.target.textContent;
    console.log("onDragEnd",this.props);
    if(candidates.hasOwnProperty(candidateName)){
      unselected[candidateName] = candidates[candidateName];
      delete candidates[candidateName];
      this.props.removeCandidate(candidateName);
    }else{
      candidates[candidateName] = unselected[candidateName];
      delete unselected[candidateName];
      let temp = {}
      temp[candidateName] = candidates[candidateName];
      this.props.addCandidate(temp);
    }

    this.setState({candidates, unselected});

  }
  onDragStart(e){
    e.preventDefault();
    console.log("on drag start event", e);
  }


  render(){
    return <div className="select">
        <div className="header select-title"><div>Candidates</div> </div>
        <div className="columns">
          <div className="col">
            <div className="title">Selected Candidates</div>
            <div className="candidate-list" onDragEnd={this.onDragEnd}>
              {this.showCandidates(true)}
            </div>
          </div>
          <div className="col right-col">
            <div className="title">Not Shown</div>
            <div className="candidate-list" onDragEnd={this.onDragEnd} >
              {this.showCandidates(false)}
            </div>
          </div>
        </div>
      </div>

  }
}



export default Select;
