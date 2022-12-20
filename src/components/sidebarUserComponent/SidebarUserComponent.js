import React, { useState, useEffect, useContext } from 'react';
import Parse from 'parse';

import "./sidebarUserComponent.css"

import { ReceiverIdContext } from '../../contexts/ReceiverIdContext';
import { ChatIdContext } from '../../contexts/ChatContext';

function SidebarUserComponent(props) {
    const [ReceiverId, setReceiverId] = useContext(ReceiverIdContext)
    const [ChatId, setChatId] = useContext(ChatIdContext)

    const [userData, setUserdata] = useState([])
    const [searchTerm, setSearchTerm] = useState("");

    function fetchUserData() {
        var query = new Parse.Query(props.first);
        query.ascending(props.second);
        query.find().then((results) => {
            setUserdata(results)
        })
    }

    useEffect(() => {
        fetchUserData()
    }, [])

    function handleSetIds(val) {
        setChatId("");
        setReceiverId(val);
    }

    return (
        <div className="sidebar-user-component">
            <h2>{props.title}</h2>
            <div className="input-field">
                <input type="text" placeholder="Search..." onChange={(event) => { setSearchTerm(event.target.value) }}></input>
            </div>

            <div className="sidebar-user-container">
                {userData.filter((val) => {
                    if (val.id !== Parse.User.current().id) {
                        if (searchTerm === "") {
                            return val
                        } else if (val.get(props.second).toLowerCase().includes(searchTerm.toLocaleLowerCase())) {
                            return val
                        }
                    }
                }).map((val) => {
                    return <div className={`sidebar-user ${ReceiverId === val.id ? "clicked" : ""}`} key={val.id} onClick={() => handleSetIds(val.id)}>
                        <div className="user-icon">
                            <h3 className="user-icon-text">{String(val.get(props.second)).substring(0, 1)}{String(val.get(props.third)).substring(0, 1)}</h3>
                        </div>
                        <div className="sidebar-user-info">
                            <h3>{val.get(props.second)} {val.get(props.third)}</h3>
                            <p>Here goes a text message that was sent by the sender</p>
                        </div>
                        { }
                    </div>
                })
                }
            </div>
        </div>
    )
}

export default SidebarUserComponent