import './App.css';
import {BrowserRouter,Routes,Route} from "react-router-dom";
import Menu from './Component/Menu/Menu';
import Binarystyle from './Component/RootOfEquation/BisectionAndFalsePosition/BisectionAndFalsePosition'
import Newtonrapson from './Component/RootOfEquation/NR/NR';
import OnePointIteration from './Component/RootOfEquation/OnePointIteration/OnePointIteration'
import Secant from './Component/RootOfEquation/Secant/Secant';
import Cramer from './Component/LinerSystem/Cramer/Cramer';
import GEM from './Component/LinerSystem/GuessEliminateMethod/GuessEliminateMethod'
import GJM from './Component/LinerSystem/GaussJordanMethod/GaussJordanMethod'
import Jacobi from './Component/LinerSystem/JacobiIterationMethod/JacobiIterationMethod';
import Seidel from './Component/LinerSystem/GaussSeidelIterationMethod/GaussSeidelIterationMethod';
import Conjugate from './Component/LinerSystem/ConjugateGradientMethod/ConjugateGradientMethod';
import Newtondiff from './Component/Interpolation/Newtondivideddifferences/NewtonDiff';
import Largrange from './Component/Interpolation/Largrange/LargrangeIntepolation';
import Regression from './Component/Regression/Regression';

function App() {
  
  return (
    <div>
      <Menu/>
      <div className="container">
      <BrowserRouter>
          <Routes>
            {/* <Route path="/bisection" exact component={Binarystyle(methodName="bisection")} />
            <Route path="/false-position" exact component={Binarystyle(methodName="false-position")} /> */}
            <Route path="/one-point-iteration" exact component={OnePointIteration} />
            <Route path="/newton-rapson" exact component={Newtonrapson}/>
            <Route path="/secant" exact component={Secant}/>
            <Route path="/cramerule" exact component={Cramer}/>
            <Route path="/GuessEliminateMethod" exact component={GEM}/>
            <Route path="/GaussJordanMethod" exact component={GJM}/>
            <Route path="/JocobiIterationMethod" exact component={Jacobi}/>
            <Route path="/GaussSeidelIterationMethod" exact component={Seidel}/>
            <Route path="/ConjugateGradientMethod" exact component={Conjugate}/>
            <Route path="/Newtondivideddifferences" exact component={Newtondiff}/>
            <Route path="/Largrange" exact component={Largrange}/>
            <Route path="/Regression" exact component={Regression}/>
          </Routes>
      </BrowserRouter>
      </div>
    </div>
  );
}

export default App;
