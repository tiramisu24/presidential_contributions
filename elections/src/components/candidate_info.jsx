import React from 'react';
import {PieChart, Pie,BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend} from 'recharts'
import merge from 'lodash/merge';
import "../style/charts.css";
import {Tabs, Tab} from 'react-bootstrap';


class CandidateInfo extends React.Component{
  constructor(props){
    super(props);
    this.getData = this.getData.bind(this);
  }
  getData(){
    let candidates = this.props.candidates;
    let candidate = candidates[this.props.candidateName];
    if(candidate === undefined) return [];
    let res = candidate.contributions;
    return res;
  }


  render(){
    let data = this.getData();

    return <div>

        <Tabs  defaultActiveKey={2} id="uncontrolled-tab-example" className="graphs">
          <Tab eventKey={1} title="Graph">
            <BarChart width={800} height={400} data={data}
                  margin={{top: 5, right: 30, left: 20, bottom: 5}}>
             <XAxis dataKey="committee_id" interval={0}/>
             <YAxis />
             <CartesianGrid strokeDasharray="3 3"/>
             <Tooltip/>
             <Legend />
             <Bar dataKey="amount" fill="#8884d8" />
            </BarChart>
          </Tab>
          <Tab eventKey={2} title="Pie Chart">
            <PieChart width={800} height={400}>
            <Pie isAnimationActive={false} valueKey="amount" nameKey="committee_id" dataKey="amount" data={data}  outerRadius={200} fill="#8884d8" label/>
            <Tooltip/>
           </PieChart>
          </Tab>

        </Tabs>
      </div>

  }
}



export default CandidateInfo;
