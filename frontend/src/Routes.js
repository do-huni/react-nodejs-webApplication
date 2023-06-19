import {useState, useEffect} from 'react';
import './App.css';
import {Navbar, Container, Nav, Row, Col} from 'react-bootstrap'
import data from './data.js';
import { Routes, Route, Link, useNavigate, Outlet, useParams } from 'react-router-dom';	
import axios from 'axios'
import { useDispatch, useSelector } from "react-redux"
import { orderItem } from './store.js';

function Main(props){
	let navigate = useNavigate();
	return(
		<Container>
		  <div className="main-bg"></div>			
			<Container>
			  <Row>
				{
					  props.shoes.map((a, i) => {
						  return (
							  <Item key = {i} link = {a.link} title = {a.title} price = {a.price} content = {a.content} id = {a.id} />
						  )
					  })
				 }
			  </Row>
			</Container>
		</Container>			
	)	
}
function Detail(props){
	let dispatch = useDispatch();
	let [num, setNum] = useState('')
	let id = parseInt(useParams().id);
	let imageId = id +1;
	let selectedShoes = props.shoes.filter((i) => i.id == id)[0];	
	let [tap, changeTap] = useState(1);
	
	
	return (
		<Container>
			<div className="container">			
			  <div className="row">
				<div className="col-md-6">			
				  <img src={"https://codingapple1.github.io/shop/shoes" + imageId + ".jpg" } width="100%" alt = "" />
				</div>
				<div className="col-md-6">
				  <h4 className="pt-5">{selectedShoes.title}</h4>
				  <p>{selectedShoes.content}</p>
				  <p>{selectedShoes.price}</p>
				  <button className="btn btn-danger" onClick = {()=>{
							dispatch(orderItem(selectedShoes))
							console.log(selectedShoes)
						}}>주문하기</button> 
				</div>
			  </div>
			</div>	
			
			<Nav variant="tabs"  defaultActiveKey="link0">
				<Nav.Item>
				  <Nav.Link onClick={()=>{changeTap(0)}} eventKey="link0">버튼0</Nav.Link>
				</Nav.Item>
				<Nav.Item>
				  <Nav.Link onClick={()=>{changeTap(1)}} eventKey="link1">버튼1</Nav.Link>
				</Nav.Item>
				<Nav.Item>
				  <Nav.Link onClick={()=>{changeTap(2)}} eventKey="link2">버튼2</Nav.Link>
				</Nav.Item>
			</Nav>			
			<TapContent index = {tap}/>
		</Container>		
	)
}

function TapContent(props){
	let [fade,setFade] = useState('');
	
	useEffect(()=>{
    	setTimeout(()=>{ setFade('end') }, 100)	
	return ()=>{
		setFade('');
	}
	},[props.index]);
	
	return(
		<div className ={'start' + fade}>
			{[<div>내용0</div>, <div>내용1</div>, <div>내용2</div>][props.index]}	
		</div>
	);
}
function Item(props){
	let navigate = useNavigate();
	let imageId = props.id+1;
	return(
		<Col md = {4} onClick={()=>{navigate(`detail/${props.id}`)}}>
			<img src = {"https://codingapple1.github.io/shop/shoes" + imageId + ".jpg"} style = {{width: '100%'}} alt = ""/>
			<h4>{props.title}</h4>
			<h6>{props.price}</h6>
			<p>{props.content}</p>
		</Col>
	)
}

function Navs(props){
	let navigate = useNavigate();
	return (
		  <Navbar bg="dark" variant="dark">
			<Container>
			  <Navbar.Brand onClick = {()=>navigate('/')}>byeolShop</Navbar.Brand>
			  <Nav className="me-auto">
				<Nav.Link onClick = {()=>navigate('/')}>Home</Nav.Link>
				<Nav.Link onClick = {()=>navigate('/event')}>Event</Nav.Link>
				<Nav.Link onClick = {()=>navigate('/cart')}>cart</Nav.Link>
				  
			  </Nav>
			</Container>
		  </Navbar>			
	)	
}
function Error404(props){
	return(
		<div>
			<p>404 잘못된 경로입니다.</p>
		</div>
	)
}

function Event(props){
	return(
		<div>
			<h2>이벤트 페이지</h2>
			<Outlet></Outlet>
		</div>
	)
}
export { Main, Detail, Navs, Error404, Event};