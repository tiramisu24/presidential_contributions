import React from 'react';
// import {Chart} from 'react-d3-core';
// import {BarChart} from 'react-d3-basic';
import {PieChart, Pie,BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend} from 'recharts'
import merge from 'lodash/merge';


class Histogram extends React.Component{
  constructor(props){
    super(props);
    this.getData = this.getData.bind(this);
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


  render(){
    let data = this.getData();
    return   <div>
      <BarChart width={1000} height={600} data={data}
            margin={{top: 5, right: 30, left: 20, bottom: 5}}>
       <XAxis dataKey="name"/>
       <YAxis />
       <CartesianGrid strokeDasharray="3 3"/>
       <Tooltip/>
       <Legend />
       <Bar dataKey="total" fill="#8884d8" />
      </BarChart>

      <PieChart width={1000} height={500}>
      <Pie isAnimationActive={false} valueKey="total" nameKey="name" dataKey="total" data={data}  outerRadius={200} fill="#8884d8" label/>
      <Tooltip/>
     </PieChart>

    </div>

  }
}



export default Histogram;
