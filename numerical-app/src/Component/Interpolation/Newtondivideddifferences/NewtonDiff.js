import { Component } from "react";
import { newton , findY } from "../Module/Newton";
import functionPlot from "function-plot";
import { simplify,round } from "mathjs";
import '../Table.css';
export default class Newtondiff extends Component {
    constructor(props){
        super(props);
        this.state = {
            level: 2,
            data : [],
            L : [],
            f : 'x',
            x : 0,
            ans : 0,
            plot : [],
        }
        this.levelChange = this.levelChange.bind(this);
        this.Xchange = this.Xchange.bind(this);
        this.Ychange = this.Ychange.bind(this);
        this.findL = this.findL.bind(this);
        this.findY = this.findY.bind(this);
        this.xChange = this.xChange.bind(this);
    }
    findL(){
        const data = this.state.data;
        for(let i = 0; i < this.state.level;i++){
            data[i].x = parseFloat(data[i].x)
            data[i].y = parseFloat(data[i].y)
        }
        const {L} = newton([...data])
        console.log(L)
        let f = "";
        for(let i = 0; i < this.state.level;i++){
            f += `(${L[i]})`
            for(let j = 0; j < i;j++){
                f += `*(x-${data[j].x})`
            }
            f += `+`
        }
        f = f.slice(0,f.length-1);
        console.log(simplify(f).toString())
        this.setState({
            L,f
        })
        ////////
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
                    fn: f,
                },
                {
                    points: this.state.plot,
                    fnType: 'points',
                    graphType: 'scatter'
                }
            ]
        });
    }
    findY(){
        const y = findY(this.state.x,this.state.L);
        console.log(y)
        this.setState({
            ans:y,plot : [this.state.x,this.state.ans]
        })
    }
    componentDidMount(){
        let data = []
        for(let i = 0;i < this.state.level;i++){
            data.push({x:1,y:1});
        }
        this.setState({data:data})
    }
    xChange(e){
        this.setState({
            x : e.target.value
        })
        console.log(e.target.value)
    }
    Xchange(e){

        let data = this.state.data;
        data[e.target.id].x = (e.target.value);
        this.setState({
            data
        })
    }

    Ychange(e){
    
        let data = this.state.data;
        data[e.target.id].y = (e.target.value);
        console.log(e.target.value)
            this.setState({
            data
        })
    }

    levelChange(e){
        let data = []
        for(let i = 0;i < e.target.value;i++){
            data.push({x:1,y:1});
        }
        this.setState({ 
            level : e.target.value,data
        })
    }
    render(){
        return <div>
            <h1>Newton divided differences</h1>
            <div>
                <select className="form-select" value={this.state.level} onChange={this.levelChange} >
                   <option key={2} value={2}>Liner</option>
                   <option key={3} value={3}>Quadratic</option>
                   <option key={5} value={5}>Polynomial</option>
                </select>
            </div>
            <table className="tablenow">
                <thead>
                    <tr>
                        <th>i</th>
                        <th>X</th>
                        <th>f(X) or Y</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        this.state.data.map((v,i)=>{
                            return <tr key={i}>
                                <td>{i+1}</td>
                                <td><input type="number" id={i} value={v.x} onChange={this.Xchange}/></td>
                                <td><input  type="number" id={i} value={v.y} onChange={this.Ychange}/></td>
                            </tr>
                        })
                    }
                </tbody>
                </table>
                <div id="chart"></div>
                <div className="buttonL">
                    <button className="btn btn-success" onClick={this.findL}>find L</button>
                </div>

                    {
                        (this.state.L.length !== 0)?
                    <>
                    <table className="tablenow">
                    <thead>
                        <tr>
                            <th>i</th>
                            <th>L</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.L.map((value,i)=>{
                            return <tr>
                                <th>{i}</th>
                                <th>{value}</th>
                            </tr>
                        })}
                    </tbody>
                </table>
                <div className="buttonL">
                    <label>X : </label> <input className="x" type="number" value={this.state.x} onChange={this.xChange}/>
                    <br></br>
                    <label>Y : </label> <input className="x" type="number" value={round(this.state.ans,6)} />
                </div>
                <div className="buttonL">
                    <button className="btn btn-success" onClick={this.findY}>find</button>
                </div></>
                :""
                }

        </div> 
    }
}