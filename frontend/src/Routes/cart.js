import { Table } from 'react-bootstrap' 
import { useDispatch, useSelector } from "react-redux"
import { addCount } from './../store.js';

function Cart(props){
	let cartData = useSelector((state) => state.cartData);
	const dispatch = useDispatch();	
	return(
		<Table>
		  <thead>
			<tr>
			  <th>#</th>
			  <th>상품명</th>
			  <th>수량</th>
			  <th>변경하기</th>
			</tr>
		  </thead>
		  <tbody>
			 {
			  cartData.map((a)=>{
				  return(
					  <tr key = {a.id}>
						<td>{a.id}</td>
						<td>{a.name}</td>
						<td>{a.count}</td>
						<td><button onClick = {()=>{
									dispatch(addCount(a.id))
								}}>변경하기</button></td>
					  </tr>
				  )
			  })
			  }
		  </tbody>
		</Table>
	)
};
function TrData(props){
	let a = useSelector((state) => state);	
	return(
		<tr>
			<td>{a.cartData[props.index].id}</td>
			<td>{a.cartData[props.index].name}</td>
			<td>{a.cartData[props.index].count}</td>
			<td>변경하기</td>
		</tr>
	)
}
export default Cart;