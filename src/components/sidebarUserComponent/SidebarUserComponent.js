import React, { useState, useEffect, useContext} from 'react';
import Parse from 'parse/dist/parse.min.js';


import "./sidebarUserComponent.css"

import { ReceiverIdContext } from '../../contexts/ReceiverIdContext';
import { ChatIdContext } from '../../contexts/ChatIdContext';

function SidebarUserComponent(props) {
    const [ReceiverId, setReceiverId] = useContext(ReceiverIdContext)
    const [ChatId, setChatId] = useContext(ChatIdContext)

    const [ userData, setUserdata ] = useState([])
    const [ searchTerm, setSearchTerm ] = useState("");

    function fetchUserData () {
        var query = new Parse.Query(props.queryName);
        // console.log("Fetch User Query", query)

        query.ascending(props.attribute1);
        query.find().then((results) => {
            setUserdata(results)
            console.log("userData", results)
        })
    }

    useEffect(() => {
        fetchUserData()
    },[])

    return (
        <div className="sidebar-user-component">
            <h2>{props.title}</h2>
            <div className="input-field">
                <input type="text" placeholder="Search..." onChange={(event) => {setSearchTerm(event.target.value)}}></input>
            </div>

            <div className="sidebar-user-container">
            {userData.filter((value) => {
                if(value.id !== Parse.User.current().id){
                    if (searchTerm === "") {
                        return value
                    } else if (value.get(props.attribute1).toLowerCase().includes(searchTerm.toLocaleLowerCase())){
                        return value
                    }
                }
            }).map((value) => {
                return <div className={`sidebar-user ${ReceiverId === value.id ? "clicked" : ""}`}  key={value.id} onClick={setReceiverId(value.id)}>
                <div className="user-icon">
                {props.queryName === "User" 
                    ? <h3 className="user-icon-text">{String(value.get(props.attribute1)).substring(0, 1)}{String(value.get(props.attribute2)).substring(0, 1)}</h3> 
                    : <h3 className="user-icon-text">{String(value.get(props.attribute1)).substring(0, 2) }</h3>}
                </div>
                <div className="sidebar-user-info">
                    <h3>{value.get(props.attribute1)} {value.get(props.attribute2)}</h3>
                    <p>Here goes a text message that was sent by the sender</p>
                </div>
                {}
            </div>
            })
            }
            </div>
        </div>
    )
}

export default SidebarUserComponent