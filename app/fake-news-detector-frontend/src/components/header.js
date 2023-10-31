import {React} from "react";

import { Navbar, Container, Nav, NavDropdown } from 'react-bootstrap';

import  { LinkContainer } from 'react-router-bootstrap';

function Header(props) {

    const { activeContainer } = props;

    return (
        <header>
            <Container>
                <Navbar bg="" expand="lg">
                    <Container>
                        <LinkContainer to='/'>
                            <Navbar.Brand href="/">
                                <img src={process.env.PUBLIC_URL + '/logo.png'} height={27} className='logo-image' alt="Logo"></img>
                                <span style={{fontWeight: 600, color: '#136996'}}>News</span> <span style={{color: '#48a2f8'}}>Guardian</span>
                            </Navbar.Brand>
                        </LinkContainer>
                        <Navbar.Toggle aria-controls="hearder-navbar" />
                        <Navbar.Collapse id="hearder-navbar" className="justify-content-end">
                            <Nav>
                                <NavDropdown title="News Categories" id="nav-dropdown">
                                    <LinkContainer to='/category/sport'>
                                        <NavDropdown.Item eventKey="4.1">Sport</NavDropdown.Item>
                                    </LinkContainer>
                                    <LinkContainer to='/category/world'>
                                        <NavDropdown.Item eventKey='4.2'>World</NavDropdown.Item>
                                    </LinkContainer>
                                    <LinkContainer to='/category/society'>
                                        <NavDropdown.Item eventKey='4.3'>Society</NavDropdown.Item>
                                    </LinkContainer>
                                    <LinkContainer to='/category/books'>
                                        <NavDropdown.Item eventKey='4.3'>Books</NavDropdown.Item>
                                    </LinkContainer>
                                    <LinkContainer to='/category/lifeandstyle'>
                                        <NavDropdown.Item eventKey='4.3'>Life and Style</NavDropdown.Item>
                                    </LinkContainer>
                                    <LinkContainer to='/category/artanddesign'>
                                        <NavDropdown.Item eventKey='4.3'>Art and Design</NavDropdown.Item>
                                    </LinkContainer>
                                    <LinkContainer to='/category/usnews'>
                                        <NavDropdown.Item eventKey='4.3'>US news</NavDropdown.Item>
                                    </LinkContainer>
                                    <LinkContainer to='/category/commentisfree'>
                                        <NavDropdown.Item eventKey='4.3'>Comment Is Free</NavDropdown.Item>
                                    </LinkContainer>
                                    <LinkContainer to='/category/fashion'>
                                        <NavDropdown.Item eventKey='4.3'>Fashion</NavDropdown.Item>
                                    </LinkContainer>
                                    <LinkContainer to='/category/news'>
                                        <NavDropdown.Item eventKey='4.3'>News</NavDropdown.Item>
                                    </LinkContainer>
                                    <LinkContainer to='/category/education'>
                                        <NavDropdown.Item eventKey='4.3'>Education</NavDropdown.Item>
                                    </LinkContainer>
                                    <LinkContainer to='/category/politics'>
                                        <NavDropdown.Item eventKey='4.3'>Politics</NavDropdown.Item>
                                    </LinkContainer>
                                    <LinkContainer to='/category/tvandradio'>
                                        <NavDropdown.Item eventKey='4.3'>TV and Radio</NavDropdown.Item>
                                    </LinkContainer>
                                    <LinkContainer to='/category/business'>
                                        <NavDropdown.Item eventKey='4.3'>Business</NavDropdown.Item>
                                    </LinkContainer>
                                    <LinkContainer to='/category/uknews'>
                                        <NavDropdown.Item eventKey='4.3'>UK News</NavDropdown.Item>
                                    </LinkContainer>
                                    <LinkContainer to='/category/environment'>
                                        <NavDropdown.Item eventKey='4.3'>Environment</NavDropdown.Item>
                                    </LinkContainer>
                                    <LinkContainer to='/category/football'>
                                        <NavDropdown.Item eventKey='4.3'>Football</NavDropdown.Item>
                                    </LinkContainer>
                                </NavDropdown>
                            </Nav>
                            <Nav>
                                <LinkContainer to='/checkbytitle'>
                                    <Nav.Link className={activeContainer === 2 ? 'active-link' : 'inactive-link'}>
                                        <div>
                                            <li>
                                                <div>Check News By Title</div>
                                            </li>
                                        </div>
                                    </Nav.Link>
                                </LinkContainer>
                            </Nav>
                            <Nav>
                                <LinkContainer to='/newsquiz'>
                                    <Nav.Link className={activeContainer === 3 ? 'active-link' : 'inactive-link'}>
                                        <div>
                                            <li>
                                                <div>News Quiz</div>
                                            </li>
                                        </div>
                                    </Nav.Link>
                                </LinkContainer>
                            </Nav>
                        </Navbar.Collapse>
                    </Container>
                </Navbar>
            </Container>
        </header>
    )
};

export default Header;