import './App.css';
import {useState} from 'react';
function App() {
	
	let [logo, setLogo] = useState("ReactBlog");
	let [postNames, setPostNames] = useState(["전역 방법 추천", "여자 코트 추천", "남자 코트 추천", "시간이 안감"]);
	let [like, setLike] = useState(0);
	let [modal, setModal] = useState(false);
  return (
    <div className="App">
		  <div className = "black-nav">
			  <h4 style = {{color: 'white', fontSize : '16px'}}>{logo}</h4>
		  </div>
		  <button onClick = {() => {
				  let copy = [...postNames];
				  copy.sort();
				  setPostNames(copy);
			  }}>정렬</button>
		  <div className = "list">
			  <h4 onClick = {()=>{
					  modal ? setModal(false) : setModal(true);
				  }}>{postNames[0]} <span onClick = {() =>{setLike(like+1)}}>👍</span>{like}</h4>
			  <p>2월 17일 발행</p>
		  </div>
		  <div className = "list">
			  <h4>{postNames[1]}</h4>
			  <p>2월 17일 발행</p>
		  </div>
		  <div className = "list">
			  <h4>{postNames[2]}</h4>
			  <p>3월 19일 발행</p>
		  </div>		  
		  <div className = "list">
			  <h4>{postNames[3]}</h4>
			  <p>3월 19일 발행</p>
		  </div>	
		  {
			  (modal) ? <Modal/> : null		
		  }
    </div>
  );
}

function Modal(){
	return (
	  <div className = "modal">
		  <h4>제목</h4>
		  <p>날짜</p>
		  <p>상세내용</p>
	  </div>		
	);
}
export default App;
