import React from 'react';
import randomColor from 'randomcolor';
import {PieChart, Pie,BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Cell} from 'recharts'
import merge from 'lodash/merge';
import "../style/charts.css";
import {Tabs, Tab} from 'react-bootstrap';
import CandidateInfo from './candidate_info';

const RADIAN = Math.PI / 180;
//Just to fix the labeling for the pie chart...
const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x  = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy  + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
    	{`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};
//Just to fix the labeling for the graph...
const CustomizedAxisTick = React.createClass({
  render () {
    const {x, y, stroke, payload} = this.props;

   	return (
    	<g transform={`translate(${x},${y})`} className="tick" >
        <text x={0} y={0} dy={16} textAnchor="start" transform="rotate(90)">
          {payload.value}</text>
      </g>
    );
  }
});

class Histogram extends React.Component{
  constructor(props){
    super(props);
    this.getTotalData = this.getTotalData.bind(this);
    this.getNumData = this.getNumData.bind(this);
    this.showCandidateDetail = this.showCandidateDetail.bind(this);
    this.showDetailContribution = this.showDetailContribution.bind(this);
    this.getBarChart = this.getBarChart.bind(this);
    this.getPieChart = this.getPieChart.bind(this);
    this.state={candidateName:""};
  }
  getTotalData(){
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

  getNumData(){
    let candidates = this.props.candidates;
    let names = Object.keys(candidates);
    let res = [];
    for(let i = 0; i< names.length; i++){
      res.push(merge(
        {name: names[i]},
        {total: candidates[names[i]]["contributions"].length}
      ));
    }
    return res;
  }
  showCandidateDetail(e){
    if(e===null) return;
    if(e.activeLabel !== undefined ) this.setState({candidateName:e.activeLabel});
    if(e.name !== undefined ) this.setState({candidateName:e.name});

  }
  showDetailContribution(){

    if(this.state.candidateName !== "" ){
      return <CandidateInfo candidates={this.props.candidates}
                            candidateName={this.state.candidateName}/>
    }else{
      return <div></div>
    }
  }
  getBarChart(data){
    return<BarChart width={1000} height={600} data={data}
          onClick={this.showCandidateDetail}
          margin={{top: 5, right: 30, left: 20, bottom: 5}}>
      <XAxis dataKey="name" interval={0} tick={<CustomizedAxisTick/>} tickLine={false}/>
     <YAxis />
     <CartesianGrid strokeDasharray="3 3"/>
     <Tooltip/>
     <Bar dataKey="total" fill="#8884d8" />
    </BarChart>
  }
  getPieChart(data){
    const legendPayload = [];

    return<PieChart width={1000} height={500}  className="pie-chart">
            <Pie isAnimationActive={false} nameKey="name"
                dataKey="total" data={data} outerRadius={200}
                label={renderCustomizedLabel}labelLine={false}
                onClick={this.showCandidateDetail}>
            {
              data.map((entry,idx) => {
                  let randColor = randomColor();
                  let temp =  {
                      id: entry.name,
                      value: entry.name,
                      type: "circle",
                      color: randColor
                  }
                  legendPayload.push(temp);
                  return <Cell key={entry.total}fill={randColor}/>
              })
            }
            </Pie>
            <Legend payload={legendPayload}/>
            <Tooltip/>
       </PieChart>
  }

  render(){
    let data = this.getTotalData();
    let numData = this.getNumData();
    return <div>

        <Tabs  defaultActiveKey={2} id="uncontrolled-tab-example" className="graphs">
          <Tab eventKey={1} title="By Total Graph">
            {this.getBarChart(data)}
          </Tab>

          <Tab eventKey={2} title="By Count Graph">
            {this.getBarChart(numData)}
          </Tab>
          <Tab eventKey={3} title="Pie Charts" >
            <div className="add-space"></div>
            <div className="header"><div className="title">By Total Amount</div></div>
            {this.getPieChart(data)}
            <div className="header"><div className="title">By Count </div></div>

            {this.getPieChart(numData)}
          </Tab>
        </Tabs>
        <div className="candidate-detail">
          {this.showDetailContribution()}
        </div>
      </div>

  }
}



export default Histogram;
