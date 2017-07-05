import React from 'react';
import {PieChart, Pie,BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend} from 'recharts'
import merge from 'lodash/merge';
import "../style/charts.css";
import {Tabs, Tab} from 'react-bootstrap';
import CandidateInfo from './candidate_info';


class Histogram extends React.Component{
  constructor(props){
    super(props);
    this.getData = this.getData.bind(this);
    this.showCandidateDetail = this.showCandidateDetail.bind(this);
    this.showDetailContribution = this.showDetailContribution.bind(this);
    this.state={candidateName:""};
  }
  getData(){
    let candidates = this.props.candidates;
    let names = Object.keys(candidates);
    let res = [];
    for(let i = 0; i< names.length; i++){
      res.push(merge(
        {name: names[i]},
        {total: candidates[names[i]]["total"]}
      ));
    }
    return res;
  }
  showCandidateDetail(e){
    if(e.activeLabel !== "" ) this.setState({candidateName:e.activeLabel});

  }
  showDetailContribution(){

    if(this.state.candidateName !== "" ){
      return <CandidateInfo candidates={this.props.candidates}
                            candidateName={this.state.candidateName}/>
    }else{
      return <div></div>
    }
  }

  render(){
    let data = this.getData();
    return <div>

    <Tabs  defaultActiveKey={2} id="uncontrolled-tab-example" className="graphs">
        <Tab eventKey={1} title="Graph">
          <BarChart width={1000} height={600} data={data} onClick={this.showCandidateDetail}
                margin={{top: 5, right: 30, left: 20, bottom: 5}}>
           <XAxis dataKey="name" interval={0}/>
           <YAxis />
           <CartesianGrid strokeDasharray="3 3"/>
           <Tooltip/>
           <Legend />
           <Bar dataKey="total" fill="#8884d8" />
          </BarChart>
        </Tab>
        <Tab eventKey={2} title="Pie Chart">
          <PieChart width={1000} height={500}>
          <Pie isAnimationActive={false} valueKey="total" nameKey="name" dataKey="total" data={data}  outerRadius={200} fill="#8884d8" label/>
          <Tooltip/>
         </PieChart>
        </Tab>

      </Tabs>
      <div className="candidate-detail">
        {this.showDetailContribution()}
      </div>
      </div>

  }
}



export default Histogram;
