import React from 'react';
import {Segment} from  'semantic-ui-react';
import logoidsi from '../assets/img/logoidsi.jpg';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar, Container } from 'react-bootstrap';


function Header() {
    return (
        <div className="container">
        <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="#home">
            <img
              alt=""
              src= {logoidsi}
              width="30"
              height="30"
              className="d-inline-block align-top"
            />{' '}
            ALUMNI IDSI
          </Navbar.Brand>
        </Container>
      </Navbar>
            <Segment  color='teal'>
            <div className='row text-center'>
                <div className = 'col-1'>
                    <img height={84} width={100} src={logoidsi} alt="" />
                </div>
                <div className='col-11'>
                <span class="badge rounded-pill bg-danger">
                <h3>ELECTION DU PRESIDENT DES ALUMNI-IDSI</h3>
                </span>
                <div>
                <small>Assemblée générale élective 14 août 2021 Cocody-Danga</small>

                </div>
                </div>
                </div>
            </Segment>
      </div>
    )
}

export default Header
