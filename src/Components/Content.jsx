import {React} from 'react'
import { Routes , Route} from 'react-router-dom'

import Container from '@mui/material/Container';

import Bi from '../pages/Standard/Bi';
// import False_Po from '../pages/Standard/False_Po';
// import Graphical from '../pages/Standard/Graphical';
// import Newton from '../pages/Standard/Newton';
// import One_Point from '../pages/Standard/One_Point';
// import Secant from '../pages/Standard/Secant';

// import Cholesky from '../pages/Solution_Tech/Cholesky';
// import Conjugate from '../pages/Solution_Tech/Conjugate';
// import Cremer from '../pages/Solution_Tech/Cremer';
// import Gauss_Eli from '../pages/Solution_Tech/Guass_Eli';
// import Guass_Jordan from '../pages/Solution_Tech/Guass_Jordan';
// import Jacobi from '../pages/Solution_Tech/Jacobi';
// import LU from '../pages/Solution_Tech/LU';
// import Matrix_Invers from '../pages/Solution_Tech/Matrix_Invers';



function Content() {

  return (
          <Container>
                <Routes>
                    {/* set Bi to home */}
                    <Route path="/" element= {<Bi />}></Route>
                    
                    <Route path="/Bi" element= {<Bi />}></Route>
                    <Route path="/False_Po" element= {<False_Po />}></Route>
                    <Route path="/Graphical" element= {<Graphical />}></Route>
                    <Route path="/Newton" element= {<Newton />}></Route>
                    <Route path="/One_Point" element= {<One_Point />}></Route>
                    <Route path="/Secant" element= {<Secant />}></Route>

                    <Route path="/Cholesky" element= {<Cholesky />}></Route>
                    <Route path="/Conjugate" element= {<Conjugate />}></Route>
                    <Route path="/Cremer" element= {<Cremer />}></Route>
                    <Route path="/Guass_Eli" element= {<Gauss_Eli/>}></Route>
                    <Route path="/Guass_Jordan" element= {<Guass_Jordan />}></Route>
                    <Route path="/Jacobi" element= {<Jacobi />}></Route>
                    <Route path="/LU" element= {<LU />}></Route>
                    <Route path="/Matrix_Invers" element= {<Matrix_Invers />}></Route>

                    <Route path="*" element= {<Error />}></Route>
                </Routes>
          </Container>
  )
}

export default Content