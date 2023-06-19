import { Routes, Route, Link, useNavigate, Outlet, useParams } from 'react-router-dom';	
import {useState, useEffect} from 'react';
import data from './data.js';
import Cart from './Routes/cart.js';
import {Main, Detail, Navs, Error404, Event} from './Routes.js';
import One from './Routes/Event/One.js';
import Two from './Routes/Event/Two.js';
import axios from 'axios'


function App() {
  let [shoes, setShoes] = useState(data);	
  let navigate = useNavigate();

  return (
    <div className="App">
    <Navs/>
	<Routes>
		<Route path = "/" element = {
				<>
					<Main shoes = {shoes}/>
					<button onClick = {()=>{
						axios.get('https://codingapple1.github.io/shop/data2.json').then((result)=>{
							setShoes([...shoes, ...result.data]);			
						})
						.catch(()=>{
							console.log('failed');
						})				
					}}>버튼</button>
				</>
			}/>
		<Route path = "/detail/:id" element = {
				<Detail shoes = {shoes}/>
			}/>
		<Route path = "/event" element = {
				<Event/>
			}>
			<Route path = "one" element = {<One/>}/>
				<Route path = "two" element = {<Two/>}/>
		</Route>		
		<Route path = "/cart" element = {
				<Cart/>
			}/>
		<Route path = "*" element = {
				<Error404/>
			}/>
	</Routes>		  
    </div>	  
  );
}

export default App;