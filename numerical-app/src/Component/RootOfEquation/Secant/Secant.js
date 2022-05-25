import React from 'react';
import axios from 'axios';
import secant from '../Module/Secant';
import '../OnePointIteration/OnePointIteration.css';
import functionPlot from "function-plot";
import {XYPlot, LineSeries,VerticalGridLines,HorizontalGridLines,XAxis,YAxis } from 'react-vis';
import StickyHeadTable from '../Table/Table';

export default class Secant extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            equation:'',
            data:[],
            error:[],
            statusAns:undefined,
            test:[],
            answer: undefined,
            header:[
                { 
                  id: 'i', 
                  label: 'Iteration',
                  align: 'center', 
                  minWidth: 100 
                },
                { id: 'x', 
                  label: 'Xn', 
                  minWidth: 170 ,
                  align: 'center',
                  format: (value) => value.toFixed(6)
                },
                {
                  id: 'xn',
                  label: 'Xn+1',
                  minWidth: 170,
                  align: 'center',
                  format: (value) => value.toFixed(6),
                },
                {
                  id: 'error',
                  label: 'Error',
                  minWidth: 170,
                  align: 'center',
                  format: (value) => value.toFixed(6),
                },
              ]
        }
        this.onSelectionChanged = this.onSelectionChanged.bind(this);
        this.findAnswer = this.findAnswer.bind(this);
    }
    async componentWillMount(){
        const res = await axios.post(
            'http://localhost:4000/rootOfEquation',
            {}, 
            {headers:{"Authorization" : `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNjIwNDA2MjYzMDA4NCIsImlhdCI6MTY1MzA1NzcwMSwiZXhwIjoxNjg0NTkzNzAxfQ.mNhdul4krjKFBV2In5yQO6MxazBD5jUU--3ZqqFygAo`}} 
          )
        const {data} = res;
        this.setState({data});
    }
    findAnswer(){
        const ans = secant(this.state.equation,1);
        if(ans !== undefined){
            console.log(ans)
            this.setState({
                answer: ans.xn,
                statusAns:true,
                test:ans.answer,
                error: ans.answer.map((x,index)=>({x:index, y : x.error}))
            })
        }else{
            this.setState({answer:"None",statusAns:false})
        }
    }
    onSelectionChanged(e){
        this.setState(
            {
                equation:e.target.value,
                answer:undefined,
                statusAns:undefined,
                test:[],
                error:[]
            });
        this.renderChart(e.target.value);
    }
    renderChart(x){
        let width = 800;
        let height = 500;
        functionPlot({
            target: "#chart",
            width,
            height,
            yAxis: { domain: [-1, 9] },
            grid: true,
            data: [
                {
                    fn: x.replaceAll("e^","$").replaceAll('e',"exp(1)").replaceAll('$',"exp")
                }
            ]
        });
    }
    render() {
        return (
        <>
            <h2>Secant Method</h2>
            <div className="equation-select row g-3">
                <select className="form-select col-auto" onChange={this.onSelectionChanged}>
                <option defaultValue={true} value={''} hidden>Select Eqation</option>
                {
                    this.state.data.map((value,index)=>{
                    return <option key={index} value={value.equation}>{value.equation}</option>
                    })
                }
                </select>
                <button className="btn btn-primary col-auto" onClick={this.findAnswer}>Find value</button>
            </div>
            <h5 className="Answer">{(this.state.answer)?`Answers X is ${this.state.answer}`:""}  {(this.state.statusAns !== undefined)?`( ${(this.state.statusAns)?"Convergence":"Divergence"} )`:""}</h5>
            <div id="chart"  className="col"></div>
                    
            {(this.state.test.length !== 0)?<StickyHeadTable header={this.state.header} data={this.state.test} />:""}
            {
                (this.state.error.length !== 0)?
                    <div className="chart">
                        <h1>Error</h1>
                        <XYPlot height={500} width={800}>
                            <VerticalGridLines />
                            <HorizontalGridLines />
                            <XAxis />
                            <YAxis />
                            <LineSeries data={this.state.error} />
                        </XYPlot>
                    </div>
                    :""
            }
        </>
        )
    }
}