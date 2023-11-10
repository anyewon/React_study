import logo from './logo.svg';
import './App.css';
import CreateUser from './userCreate/CreateUser';
import UserList from './userCreate/UserList';
import React, {useState, useRef, useMemo,useCallback} from "react";


// useCallback을 사용하여 특정함수를 새로 만들지 않고 재사용하고 싶을 때 사용하게 한다.
// 근데 문제는 input이 바뀔 때도 UserList 컴포넌트가 리렌더링이 되고 있음


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
  const onChange = useCallback(
    e=>{
      const {name, value} = e.target;
      setInputs({
          ...inputs,
          [name]:value
      });
    },[inputs]
  );

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
  const onCreate = useCallback( ()=>{
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
    },[users,username,email]
  );
  // 배열 삭제
  const onRemove = useCallback(
        id=>{
        setUsers(users.filter(user=> user.id !== id));
    },[users]
  );
  // 배열 수정
  const onToggle = useCallback(
        id => {
        setUsers(
            users.map(user=> 
                user.id===id ? {...user, active: !user.active}:user
            )
        );
    },[users]
  );

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
