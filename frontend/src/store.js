import { configureStore, createSlice } from '@reduxjs/toolkit'

let user = createSlice({
	name: 'user',
	initialState: 'kim'
});

let stock = createSlice({
	name: 'stock',
	initialState: [10,11,12]
});

let cartData = createSlice({
	name: 'cartData',		
	initialState: [
  {id : 0, name : 'White and Black', count : 2},
  {id : 2, name : 'Grey Yordan', count : 1}
],
	reducers : {
		addCount(state, action){

			let index = state.findIndex((a) => a.id == action.payload);
			state[index].count += 1;
		},
		orderItem(state, action){
			let orderedItemData = action.payload
			let index = state.findIndex(a=> a.id == orderedItemData.id)
			console.log(index)
			if(index != -1){
				state[index].count += 1;
			} else{
				let itemObj = {id: orderedItemData.id, name: orderedItemData.title, count: 1}
				state.push(itemObj);			
			}

		}
	}
});
export let { addCount, orderItem } = cartData.actions
	
export default configureStore({
  reducer: {
	  user : user.reducer,
	  stock: stock.reducer,
	  cartData: cartData.reducer
  }
}) 

