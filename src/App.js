import logo from './logo.svg';
import './App.css';
import CreateUser from './userCreate/CreateUser';
import UserList from './userCreate/UserList';
import React, {useState, useRef, useMemo} from "react";


function countAtiveUser(users){
    console.log("활성 사용자 수 세는 중....")
    return users.filter(user=> user.active).length;
}

function App() {
  const [inputs,setInputs] = useState({
    username:"",
    email:""
  });

  const {username, email} = inputs;
  const onChange = e=>{
      const {name, value} = e.target;
      setInputs({
          ...inputs,
          [name]:value
      });
  };

  const [users, setUsers]=useState([
      {
          id: 1,
          username: "예원",
          email: "예원@naver.com",
          active: true
      },
      {
          id: 2,
          username: "예지",
          email: "예지@naver.com",
          active:false
      },
      {
          id: 3,
          username: "태현",
          email: "태현@naver.com",
          active:false
      }
  ]);
  const nextId = useRef(4);

  //배열 추가
  const onCreate = ()=>{
      const user = {
          id:nextId.current,
          username,
          email
      };
      setUsers([...users, user]);

      setInputs({
          username:"",
          email:""
      });

      nextId.current+=1;
  };
  // 배열 삭제
  const onRemove = id=>{
    setUsers(users.filter(user=> user.id !== id));
  }
  // 배열 수정
  const onToggle = id => {
    setUsers(
        users.map(user=> 
            user.id===id ? {...user, active: !user.active}:user
        )
    );
  };

  const count = useMemo(()=>countAtiveUser(users), [users]);
  return(
      <>
          <CreateUser
          username={username}
          email={email}
          onChange={onChange}
          onCreate={onCreate}
          />
          <UserList users={users} onRemove={onRemove} onToggle={onToggle}/>
          <div>활성 사용자 수: {count} </div>
      </>
  );
}

export default App;
