import React, { useContext, useEffect } from 'react'
import { ListGroup} from 'react-bootstrap'
import { useSelector } from 'react-redux';
import { AppContext } from '../context/appContext';
import { addNotifications,resetNotifications} from "../features/userSlice";

 function Sidebar() {
    const user = useSelector((state) => state.user);
    const {socket,setMembers,members,setCurrentRoom,setRooms,privateMemberMsg,rooms,setPrivateMemberMsg,currentRoom} =useContext(AppContext);
    
    function joinRoom(room, isPublic = true){
      if(!user) {
          return alert("please login");
      }
      socket.emit("join-room",room);
      setCurrentRoom(room);

      if(isPublic){
         setPrivateMemberMsg(null);
      }
    }

     useEffect(()=>{
       if(user){
        setCurrentRoom('general');
        getRooms();
        socket.emit("join-room","general");
        socket.emit("new-user");
       }
     } ,[]);

    socket.off("new-user").on("new-user", (payload)=>{
       setMembers(payload);
    });
    function getRooms(){
      fetch("http://localhost:5001/rooms")
        .then((res) => res.json())
        .then ((data) => setRooms(data));
    }
    function orderIds(id1,id2){
      if(id1>id2){
           return id1+"-"+id2;
      }
      else{
         return id2 +"-"+id1;
      }
    }

    function handlePrivateMemberMsg(member){
      setPrivateMemberMsg(member);
      const roomId = orderIds(user._id,member._id);
      joinRoom(roomId ,false);
    }

    if(!user){
      return <></>
    }

  return (
    <>
       <h2> Available rooms</h2>
       <ListGroup>
         {rooms.map((room,idx)=>(
            <ListGroup.Item key={idx} onClick={()=> joinRoom(room)} active={room == currentRoom} style={{cursor:"pointer",display:'flex',justifyContent:"space-between"}}>
              {room} {currentRoom != room && <span></span>}
              </ListGroup.Item>
            ))}
       </ListGroup>
       <h2> Members</h2>
       <ListGroup>
       {members.map((member) =>(
       <ListGroup.Item  key={member.id} style={{cursor:"pointer"}} active={privateMemberMsg?._id == member?._id} onClick={()=>handlePrivateMemberMsg(member)} disabled={member._id === user._id}>
         {member.name}
       </ListGroup.Item>))}
       </ListGroup>
    </>
  );
}

export default Sidebar;
