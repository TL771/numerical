import './BisectionAndFalsePosition.css'
import axios from 'axios';
import {Component} from 'react';
import bisection from '../Module/Bisection';
import falseposition from '../Module/FalsePosition';
import AlgebraLatex from 'algebra-latex';
import '../../../../node_modules/react-vis/dist/style.css';
import {XYPlot, LineSeries,VerticalGridLines,HorizontalGridLines,XAxis,YAxis } from 'react-vis';



class Binarystyle extends Component{
  constructor(props){
    super(props);
    console.log(this.props.methodName)
    this.state = {
      latex:"",
      e:(this.props.methodName === 'bisection')?'m':'1',
      eqation:"",
      x1 : undefined,
      x2 : undefined,
      data:[],
      i : [],
      answer : "",
      dataXY : [],
    };
    this.EqationChange = this.EqationChange.bind(this);
    this.x1Change = this.x1Change.bind(this);
    this.x2Change = this.x2Change.bind(this);
    this.FindAnswer = this.FindAnswer.bind(this);
    this.capitalizeFirstLetter = this.capitalizeFirstLetter.bind(this)
  }
  async componentDidMount() {
    const res = await axios.post(
      'http://localhost:4000/rootOfEquation',
      {}, 
      {headers:{"Authorization" : `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNjIwNDA2MjYzMDA4NCIsImlhdCI6MTY1MzA1NzcwMSwiZXhwIjoxNjg0NTkzNzAxfQ.mNhdul4krjKFBV2In5yQO6MxazBD5jUU--3ZqqFygAo`}} 
    )
    const {data} = res;
    this.setState({data});
  }
  FindAnswer(){
    let ans;
    if(this.props.methodName === 'bisection'){
        ans =  bisection(this.state.eqation,parseInt(this.state.x1),parseInt(this.state.x2))
    }else if(this.props.methodName === 'false-position'){
        console.log('false-position test');
        ans = falseposition(this.state.eqation,parseInt(this.state.x1),parseInt(this.state.x2))
    }
    this.setState(
        {   answer : ans.x , 
            i : ans.i , 
            dataXY: ans.i.map((x,index)=>({x:index, y : x.error})),
        }
    )
    
  }

  EqationChange(e){
    const x  = this.state.data.find(x=>x.equation === e.target.value)
    this.setState({ 
      eqation: e.target.value,
      x1 : x.x1,
      x2 : x.x2
    });
    console.log(x)
  }
  x1Change(e){
    this.setState({ x1: e.target.value });
  }
  x2Change(e){
    this.setState({ x2: e.target.value });
  }
  capitalizeFirstLetter(ss) {
    return ss.charAt(0).toUpperCase() + ss.slice(1);
  }
  render() {
    return (
      <div>
      <h2>{this.capitalizeFirstLetter(this.props.methodName)} Method</h2>
      <div className="from form-control">
        <div className="mb-3">
          <label className="form-label">Eqation</label>
          
          <div>{((new AlgebraLatex()).parseMath(this.state.eqation)).toLatex()}</div>
          <select className="form-select" onChange={this.EqationChange}>
            <option key={-1} value={""} selected hidden>Eqation</option>
            {this.state.data.map((values,index)=>
              <option key={index}  value={values.equation}>{values.equation}</option>
            )}
          </select>
        </div>
        <div className="row">
          <div className="col mb-3">
            <label className="form-label">x1</label>
            <input className="form-control" type="number" value={this.state.x1} readOnly={true}/>
          </div>
          <div className="col mb-3">
            <label className="form-label">x2</label>
            <input className="form-control" type="number" value={this.state.x2} readOnly={true}/>
          </div>
        </div>
        <div className="b">
          <button className="btn btn-outline-success" type="button" id="button-addon2" onClick={this.FindAnswer} disabled={!this.state.eqation || !this.state.x1 || !this.state.x2}>Submit</button>
        </div>
        <div className="answer form-control mb-3">
          <label className="form-label">Answer</label>
          <input type="text" className="form-control" value={this.state.answer} aria-describedby="button-addon2"  readOnly/>
          <span>{(this.state.answer === -1)?"your x1 or x2 is error":""}</span>
        </div>
      </div>
      {
        (this.state.dataXY.length !== 0)?
        <div className="chart">
        <h1>Error</h1>
        <XYPlot height={500} width={500}>
        <VerticalGridLines />
          <HorizontalGridLines />
          <XAxis />
          <YAxis />
          <LineSeries data={this.state.dataXY} />
        </XYPlot>
        </div>
        :""
      }
      <ol className="list-group">
          {this.state.i.map((obj,key) =>{
              return(
                  <li className="list-group-item align-items-start" key={key}>
                      <label className="fw-bold">Iteration : {obj.i}</label><br></br>
                      <div className="row">
                          <label className="col fw-bold">xl  = {obj.xl}</label> 
                          <label className="col fw-bold">f(xl) = {obj.fxl}</label>
                      </div>
                      <div className="row">
                          <label className="col fw-bold">xr = {obj.xr}</label>  
                          <label className="col fw-bold">f(xr) = {obj.fxr}</label>
                      </div>
                      <div className="row">
                          <label className="col fw-bold">x{this.state.e}) = {obj.xm}</label>
                          <label className="col fw-bold">f(x{this.state.e}) = {obj.fxm}</label><br></br>
                      </div> 
                  </li>
              )
          })}
      </ol>  
      </div>
    )
  }
}

export default Binarystyle;