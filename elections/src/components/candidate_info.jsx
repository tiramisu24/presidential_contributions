import React from 'react';
import randomColor from 'randomcolor';
import {PieChart, Pie,BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Cell} from 'recharts'
import merge from 'lodash/merge';
import "../style/charts.css";
import {Tabs, Tab} from 'react-bootstrap';

const RADIAN = Math.PI / 180;

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
    let legendPayload = [];

    return <div>
      <div className='header'><div>Donations to {this.props.candidateName} by Committee</div></div>

        <Tabs  defaultActiveKey={2} id="uncontrolled-tab-example" className="graphs">
          <Tab eventKey={1} title="Graph">
            <BarChart width={1000} height={500} data={data}
                  margin={{top: 5, right: 30, left: 20, bottom: 5}}>
             <XAxis dataKey="committee_id" interval={0} tickLine={false} hide={true}/>
             <YAxis />
             <CartesianGrid strokeDasharray="3 3"/>
             <Tooltip/>
             <Bar dataKey="amount" fill="#8884d8" />
            </BarChart>
          </Tab>
          <Tab eventKey={2} title="Pie Chart">
            <PieChart width={1000} height={500}>
                    <Pie
                        isAnimationActive={false}
                        nameKey="committee_id"
                        dataKey="amount"
                        data={data}
                        outerRadius={200}
                        label={renderCustomizedLabel}
                        labelLine={false}
                    >
                    {
                      data.map((entry,idx) => {
                          let randColor = randomColor();
                          let temp =  {

                              id: entry.committee_id,
                              value: entry.committee_id,
                              type: "circle",
                              color: randColor
                          }
                          legendPayload.push(temp);
                          return <Cell key={idx} fill={randColor}/>
                      })
                    }
                    </Pie>
                    <Tooltip/>
               </PieChart>
          </Tab>

        </Tabs>
      </div>

  }
}



export default CandidateInfo;
