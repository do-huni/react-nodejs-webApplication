import './App.css';
import {useState} from 'react';
function App() {
	
	let [logo, setLogo] = useState("ReactBlog");
	let [postNames, setPostNames] = useState(["전역 방법 추천", "여자 코트 추천", "남자 코트 추천", "시간이 안감"]);
	let [like, setLike] = useState([0,0,0,0]);
	let [modal, setModal] = useState(false);
	let [title, setTitle ] = useState(0);

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
		  {
			postNames.map((a, i)=>{
				return (
				  <div className = "list" key = {i}>
					  <h4 onClick = {()=>{
							  setTitle(i);
							  modal ? setModal(false) : setModal(true);
						  }}>{a} <span onClick = {(e) =>{
								  e.stopPropagation();
								  let copy = [...like];
								  copy[i] += 1;
								  setLike(copy);}
							  }>👍</span>{like[i]}</h4>
					  <p>2월 17일 발행</p>
					  <button onClick = {()=>{
								let copy = [...postNames];
								copy.splice(i, 1);
								setPostNames(copy);
							}}>삭제</button>
				  </div>			
				)
			})			  			  
		  }
		  {
			  (modal) ? <Modal postNames={postNames} setPostNames={setPostNames} title = {title}/> : null		
		  }
		  <input type = "text" id = "addInput"></input>
		  <button onClick = { () =>{
				  let copy = [...postNames];
			      copy.push(document.getElementById('addInput').value);
				  setPostNames(copy);
				  copy = [...like];
				  copy.push(0);
				  setLike(copy);
				  }}>추가</button>
    </div>
  );
}

function Modal(props){
	return (
	  <div className = "modal">
		  <h4>제목</h4>
		  <p>{props.postNames[props.title]}</p>
		  <p>상세내용</p>
		  <button onClick={() =>{props.setPostNames(["전역 방법 추우천", "여자 코트 추천", "남자 코트 추천", "시간이 안감"])}} >글 수정</button>
	  </div>		
	);
}
export default App;
