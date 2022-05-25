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
            <Route path="/bisection" element={<Binarystyle methodName="bisection"/>} />
            <Route path="/false-position" element={<Binarystyle methodName="false-position"/>} />
            <Route path="/one-point-iteration" element={<OnePointIteration/>} />
            <Route path="/newton-rapson" element={<Newtonrapson/>}/>
            <Route path="/secant" element={<Secant/>}/>
            <Route path="/cramerule" element={<Cramer/>}/>
            <Route path="/GuessEliminateMethod" element={<GEM/>}/>
            <Route path="/GaussJordanMethod" element={<GJM/>}/>
            <Route path="/JocobiIterationMethod" element={<Jacobi/>}/>
            <Route path="/GaussSeidelIterationMethod" element={<Seidel/>}/>
            <Route path="/ConjugateGradientMethod" element={<Conjugate/>}/>
            <Route path="/Newtondivideddifferences" element={<Newtondiff/>}/>
            <Route path="/Largrange" element={<Largrange/>}/>
            <Route path="/Regression" element={<Regression/>}/>
          </Routes>
      </BrowserRouter>
      </div>
    </div>
  );
}

export default App;
