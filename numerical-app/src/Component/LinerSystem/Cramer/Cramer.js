import {Component} from "react";
import "../Matrix/Matrix.css"
import axios from "axios";
import { Cramera } from "../Module/Cramer";
import {Table} from 'react-bootstrap'
export default class Cramer extends Component{
    constructor(props){
        super(props);
        this.state = {
            size : 3,
            A : [],
            B : [],
            X : [],
            data : [],
            no: -1,
            errormsg:"",
            error:false
        }
        this.proposChange = this.proposChange.bind(this);
        this.onChange = this.onChange.bind(this);
        this.submit = this.submit.bind(this);
        this.bChange = this.bChange.bind(this);
        this.sizeChange = this.sizeChange.bind(this);
    }
    async componentDidMount() {
        const res = await axios.post(
          'http://localhost:4000/linerSystem',
          {}, 
          {headers:{"Authorization" : `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNjIwNDA2MjYzMDA4NCIsImlhdCI6MTY1MzA1NzcwMSwiZXhwIjoxNjg0NTkzNzAxfQ.mNhdul4krjKFBV2In5yQO6MxazBD5jUU--3ZqqFygAo`}} 
        )
        const {data} = res;
        console.log(data)
        this.setState({data});
    }
    onChange(e){
        const pos = e.target.id.split(',');
        let A = this.state.A;
        A[pos[0]][pos[1]] = parseFloat(e.target.value);
        this.setState({A})
    }
    bChange(e){
        const pos = e.target.id;
        let B = this.state.B;
        B[pos] = parseFloat(e.target.value);
        this.setState({B})
    }
    submit(){
        const ans = Cramera([...this.state.A],[...this.state.B]);
        if(!ans.error){
            const {X} = ans
            this.setState({
                X
            })
        }else{
            this.setState({ errormsg : ans.msg,error:true});
        }
    }
    proposChange(e){

        const d = this.state.data[e.target.value];
        const {A,B,size} = d;
        this.setState({
            A,B,size,no : e.target.value,X:[],error:false,errormsg:"",
        })
    }

    sizeChange(e){
        let A = [];
        const n =e.target.value;
        for(let i = 0;i < n;i++){
            let arrd = [];
            for(let j = 0;j < n;j++){
                arrd.push(0);
            }
           A.push(arrd);
        }
        let B = [],X = []
        for(let i = 0;i < n;i++){
            B.push(0)
            X.push(0)
        }
        this.setState({
            A,
            B,
            X
        })
    }
    render() {
        return (
        <div>
            <h1 className="header">Cramer</h1>
            <select className="form-select" value={this.state.no} onChange={this.proposChange} >
                <option key={0} value={-1} hidden>Select propos</option>
                {
                    this.state.data.map((x,i)=>{
                        return <option key={i} value={i}>{i+1}</option>
                    })
                }
            </select>
            <h2>A*X = B</h2>
            {(this.state.A.length !== 0 && this.state.B.length !== 0)?
                <div>
                    <h2>A</h2>
                    <div className="Matrix">
                        {this.state.A.map((arr,i)=>{
                            return <div key={i}>
                                {arr.map((a,j)=>{ return <input className="matrixBox" type="number" value={this.state.A[i][j]} id={`${i},${j}`} key={`${i},${j}`} onChange={this.onChange}/>})}
                            </div>
                        })}
                    </div>
                    <h2>B</h2>
                    <div className="Matrix">
                        {this.state.B.map((value,i)=>{
                            return <div><input className="matrixBox" value={this.state.B[i]} type="number" key={`${i}B`} id={`${i}`} onChange={this.bChange}/></div>
                        })}
                    </div>
                    {
                        (this.state.X.length !== 0)?
                        <div className="tableClass">
                            <h2>X</h2>
                            <Table striped bordered hover size="sm">
                                <thead>
                                    <tr>
                                        <th>Xi</th>
                                        <th>Value</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {this.state.X.map(
                                        (x,i)=>
                                        <tr>
                                            <td>X{i+1}</td>
                                            <td>{x}</td>
                                        </tr>
                                    )}
                                </tbody>
                            </Table>
                        </div>
                        :""
                    }
                    <div className="Button">
                        <button className="btn btn-success" onClick={this.submit}>click</button>
                    </div>
                </div>:""
             }
        </div>
        )
    }
}