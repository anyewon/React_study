import React from "react";
import UserInfo from "./UserInfo";

function Comment(props){
    return (
        <div className="comment">
            {/* <div className="user-info">
                <Avatar user={props.author}/>
                <div className="user-info-name">
                    {props.author.name}
                </div>
            </div> */}
            <UserInfo user={props.author}/>

            <div className="comment-text">
                {props.text}
            </div>
            <div className="comment-date">
                {FormData(props.date)}
            </div>
        </div>
    );
}
export default Comment;