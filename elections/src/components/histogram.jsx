import React from 'react';
import {Chart} from 'react-d3-core';
import {BarChart} from 'react-d3-basic';
import merge from 'lodash/merge';


class Histogram extends React.Component{
  constructor(props){
    super(props);
    this.state ={
      title : "Total contributions",
      width : 700,
      height : 400,
      chartSeries : [
        {
          field: "total",
          name: "Donations"
        }
      ],
      xLabel : "Candidate",
      xScale : "linear",
      yTicks : [5, "dollars"],
      yLabel : "Donation Total"

    };
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
    if(data.length === 0) return <div>Histogram</div>;
      console.log("data", data);
    let x = function(d){
      return d.name;
    };
    return   <BarChart
        title= {this.state.title}
        data= {data}
        width= {this.state.width}
        height= {this.state.height}
        chartSeries = {this.state.chartSeries}
        x= {x}
        xLabel= {this.state.xLabel}
        xScale= {this.state.xScale}
        yTicks= {this.state.yTicks}
        yLabel = {this.state.yLabel}
      />

  }
}

export default Histogram;
