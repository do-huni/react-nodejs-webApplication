import './App.css';
import {useState} from 'react';
import {Button, Navbar, Container, Nav, Row, Col} from 'react-bootstrap'
import data from './data.js';

function App() {
	
  let [shoes, setShoes] = useState(data);
  return (
    <div className="App">
		<Container>
		  <Navbar bg="dark" variant="dark">
			<Container>
			  <Navbar.Brand href="#home">byeolShop</Navbar.Brand>
			  <Nav className="me-auto">
				<Nav.Link href="#home">Home</Nav.Link>
				<Nav.Link href="#features">Carts</Nav.Link>
			  </Nav>
			</Container>
		  </Navbar>	
		  <div className="main-bg"></div>			
			<Container>
			  <Row>
				{
					  shoes.map((a, i) => {
						  return (
							  <Item key = {i} link = {a.link} title = {a.title} price = {a.price} content = {a.content} />
						  )
					  })
				 }
			  </Row>
			</Container>
		</Container>		  
    </div>	  
  );
}

export default App;

function Item(props){
	return(
		<Col md = {4}>
			<img src = {props.link} style = {{width: '100%'}}/>
			<h4>{props.title}</h4>
			<h6>{props.price}</h6>
			<p>{props.content}</p>
		</Col>
	)
}