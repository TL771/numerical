import { Navbar,Container,Nav ,NavDropdown} from 'react-bootstrap';
function Menu(props) {
  return (
    
          <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
            <Container>
              <Navbar.Brand href="/">Numer</Navbar.Brand>
              <Navbar.Toggle aria-controls="responsive-navbar-nav" />
              <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="me-auto">
                  <NavDropdown title="Root of Equation" id="collasible-nav-dropdown">
                    <NavDropdown.Item href="/bisection">Bisection Method</NavDropdown.Item>
                    <NavDropdown.Item href="/false-position">False-Position Method</NavDropdown.Item>
                    <NavDropdown.Item href="/one-point-iteration">One-point-iteration Method</NavDropdown.Item>
                    <NavDropdown.Item href="/newton-rapson">Newton Rapson Method</NavDropdown.Item>
                    <NavDropdown.Item href="/secant">Secant Method</NavDropdown.Item>
                  </NavDropdown>
                  <NavDropdown title="Liner Algebra" id="collasible-nav-dropdown">
                    <NavDropdown.Item href="/cramerule">Cramer Method</NavDropdown.Item>
                    <NavDropdown.Item href="/GuessEliminateMethod">Guess Eliminate Method</NavDropdown.Item>
                    <NavDropdown.Item href="/GaussJordanMethod">Gauss Jordan Eliminate Method</NavDropdown.Item>
                    <NavDropdown.Item href="/JocobiIterationMethod">Jocobi Iteration Method</NavDropdown.Item>
                    <NavDropdown.Item href="/GaussSeidelIterationMethod">Gauss Seidel Iteration Method</NavDropdown.Item>
                    <NavDropdown.Item href="/ConjugateGradientMethod">Conjugate Gradient Method</NavDropdown.Item>
                  </NavDropdown>
                  <NavDropdown title="Intepolation and Extrapolation" id="collasible-nav-dropdown">
                    <NavDropdown.Item href="/Newtondivideddifferences">Newton divided differences</NavDropdown.Item>
                    <NavDropdown.Item href="/Largrange">Largrange Intepolation differences</NavDropdown.Item>
                    <NavDropdown.Item href="/spline">Spline</NavDropdown.Item>
                  </NavDropdown>
                  <Nav.Link href="/Regression">Regression</Nav.Link>
                </Nav>
              </Navbar.Collapse>
            </Container>
          </Navbar>
        )
}

export default Menu;