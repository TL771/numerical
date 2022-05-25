import {Component} from 'react';
import { Form } from 'react-bootstrap';
import './Regression.css';
import { regression , multiplyRegression } from './Module/regression';

export default class Regression extends Component {

    constructor(props){
        super(props);
        this.state = {
            type : 0,
            n : 2,
            j : 1,
            head : ["X0","Y"],
            order : 2,
            data : [],
            f : '',
            a : [],
            x : [],
        }
        this.typeChange = this.typeChange.bind(this);
        this.nChange = this.nChange.bind(this);
        this.jChange = this.jChange.bind(this);
        this.makeData = this.makeData.bind(this);
        this.orderChange = this.orderChange.bind(this);
        this.cellOnChange = this.cellOnChange.bind(this);
        this.makeModel = this.makeModel.bind(this);
        this.Xchange = this.Xchange.bind(this);
        this.findY = this.findY.bind(this);
    }

    typeChange(e){
        let data;
        data = [];
        this.setState({
            type : e.target.value,
            data,
            head : ["X0","Y"],
            j : 1,
            order : 2,
            a : [],
            x : [],
        })
        this.makeData(this.state.n,this.state.j)
    }
    orderChange(e){
        let k = parseInt(e.target.value)
        if((k <= 1 || k >30) || isNaN(k)){
            k = 2;
        }
        this.setState({
            order:k
        })
    }
    jChange(e){
        let k = parseInt(e.target.value)
        if((k <= 0 || k >10 ) || isNaN(k)){
            k = 1;
        }
        const data = this.makeData(this.state.n,k)
        const head = Object.keys(data[0])
        this.setState({
            j:k,
            head
        })
    }
    makeData(n,k){
        let data = [];
        for(let i = 0;i < n;i++){
            let inObj = {};
            for(let j = 0;j < k;j++){
                inObj[`X${j}`] = 0;
            }
            inObj[`Y`] = 0;
            data.push(inObj);
        }
        this.setState({
            data
        })
        return data
    }
    nChange(e){
        let n = parseInt(e.target.value)
        if(( n <= 2 || n > 30)  || isNaN(n)){
            n = 2;
        }
        this.makeData(n,this.state.j)
        this.setState({
            n
        })
  
    }
    
    cellOnChange(e){
        const pos = e.target.id.split(',');
        let data = this.state.data;
        data[parseInt(pos[0])][pos[1]] = parseFloat(e.target.value)
        this.setState({
            data
        })
    }
    
    Xchange(e){
        const  i = parseInt(e.target.id)
        console.log(i)
        let x = this.state.x;
        console.log(x)
        x[i] = parseFloat(e.target.value);
        this.setState({
            x : x
        })
        console.log(x)
    }

    makeModel(e){
        const data = this.state.data;
        const key = Object.keys(data[0]);
        const X = key.slice(0,-1)
        const Y = key.slice(-1)
        const dataUse = data.map((value)=>{
            const x = X.map(v=>{
                return value[v];
            })
            const y = value[Y[0]]
            return {x , y}
        })
        console.log(dataUse)
        console.log(this.state.type);
        let ans;
        if(parseInt(this.state.type) === 1){
            ans = regression(dataUse,1);
        }else if(parseInt(this.state.type) === 2){
            ans = regression(dataUse,parseInt(this.state.order));
        }else if(parseInt(this.state.type) === 3){
            ans = multiplyRegression(dataUse);
        }
        let x = [];
        for(let i = 0;i <= this.state.j;i++){
            x.push(0)
        }
        this.setState({
            f:ans.f,
            a:ans.a,
            x
        })
        console.log(x)
    }

    findY(){
        let sum;
        if(parseInt(this.state.type) === 1 || parseInt(this.state.type) === 2){
            const x = this.state.x[0]
            const n = this.state.a.length;
            sum = this.state.a[0];
            for(let i = 1;i < n;i++){
                sum += this.state.a[i]*x;
            }
        }else if(parseInt(this.state.type) === 3){
            let x = this.state.x;
            let a = this.state.a;
            sum = a[0]
            const n = a.length;
            for(let i = 1;i < n;i++){
                sum += a[i]*x[i-1];
            }
        }
        let b = this.state.x;
        b[b.length-1] = sum;
        this.setState({
            x:b
        })
    }
    render(){
        return <>
            <h1>Regression</h1>
            <div>
                <select className="form-select" defaultValue={this.state.type} onChange={this.typeChange} >
                    <option value={0} selected hidden>Select Type of Regression...</option>
                    <option key={1} value={1}>Liner Regression</option>
                    <option key={2} value={2}>Polynomial Regression</option>
                    <option key={3} value={3}>Multiple Liner Regression</option>
                </select>
            </div>
            {(this.state.type == 3)?
            <div className='nData'>
                <Form.Label htmlFor="inputNumber">Number of Xi</Form.Label>
                <Form.Control
                    type="number"
                    id="inputNumber"
                    value={this.state.j}
                    onChange={this.jChange}
                />
            </div>:""
            }
            {(this.state.type == 2)?
            <div className='nData'>
                <Form.Label htmlFor="inputNumber">Order</Form.Label>
                <Form.Control
                    type="number"
                    id="inputNumber"
                    value={this.state.order}
                    onChange={this.orderChange}
                />
            </div>:""
            }
            {(this.state.type !== 0)?
            <div className='nData'>
                <Form.Label htmlFor="inputNumber">Length Of Data</Form.Label>
                <Form.Control
                    type="number"
                    id="inputNumber"
                    value={this.state.n}
                    onChange={this.nChange}
                />
            </div>:""
            }
            {
                (this.state.type !== 0)?
                <>
                <table>
                    <thead>
                        <tr>
                            {
                                this.state.head.map((value,i)=>{
                                    return <th key={i}>{value}</th>
                                })
                            }       
                        </tr>
                    </thead>
                    <tbody>
                    {
                        this.state.data.map((d,i)=>{
                            return <tr key={i}>
                                {this.state.head.map((value,j)=>{
                                    return <td><input key={`${i},${value}`} type="number" id={`${i},${value}`} value={this.state.data[i][value]} onChange={this.cellOnChange} /></td>
                                })}
                            </tr>
                        })
                    }       
                    </tbody>
                </table>
                <div className="myButton">
                    <button className="btn btn-success" onClick={this.makeModel}>Make Model</button>
                </div>
                </>
                :""
            }
            {
                (this.state.a.length !== 0)?
                <>
                    <table>
                        <thead>
                            <tr>
                                <th>i</th>
                                <th>ai</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.a.map((value,i)=>{
                                return <tr>
                                    <td>{i}</td>
                                    <td>{value}</td>
                                </tr>
                            })
                            }
                        </tbody>
                    </table>
                    <div >
                        <h2>Input X for Answer.</h2>
                        <table>
                        <tbody>
                        {
                            this.state.head.map((value,i)=>{
                                return <tr >
                                    <td>{value} : </td> 
                                    <td><input value={this.state.x[i]} id={i} type="number" readOnly={value === 'Y'} onChange={this.Xchange}/></td>
                                </tr>
                            })
                        }</tbody>
                        </table>
                        <div className="myButton">
                            <button className="btn btn-success" onClick={this.findY}>find answer</button>
                        </div>
                    </div>
                </>:""
            }
           
        </>
    }
}