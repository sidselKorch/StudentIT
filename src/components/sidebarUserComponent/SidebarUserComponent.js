import React, { useState, useEffect, useContext} from 'react';
import Parse from 'parse/dist/parse.min.js';


import "./sidebarUserComponent.css"

import { ReceiverIdContext } from '../../contexts/ReceiverIdContext';

function SidebarUserComponent(props) {
    const [ReceiverId, setReceiverId] = useContext(ReceiverIdContext)

    const [ userData, setUserdata ] = useState([])
    const [ searchTerm, setSearchTerm ] = useState("");

    function fetchUserData () {
        var query = new Parse.Query(props.first);
        query.ascending(props.second);
        query.find().then((results) => {
            setUserdata(results)
        })
    }

    async function getText(name){
        const PublisherAQuery = new Parse.Query('Nickname');
        PublisherAQuery.equalTo('name', name);
        const PublisherA = await PublisherAQuery.first();

        // Query Books with PublisherA
        const bookQuery = new Parse.Query('Message');
        bookQuery.equalTo('sender', PublisherA);
        let queryResults = await bookQuery.find();

        // Let's show the results
        for (let result of queryResults) {
            // You access `Parse.Objects` attributes by using `.get`
            console.log(result.get('text'));
        };
    }

    useEffect(() => {
        fetchUserData()
    },[])

    console.log(userData)
    function resetReceiverId(){
        setReceiverId("")
    }

    return (
        <div className="sidebar-user-component">
            {/* <ChatSetup /> */}
            <h2>{props.title}</h2>
            <p>Clicked Element's ID: {ReceiverId}</p>
            <button className="btn" onClick={() => resetReceiverId()}>Close Chat</button>
            <div className="input-field">
                <input type="text" placeholder="Search..." onChange={(event) => {setSearchTerm(event.target.value)}}></input>
            </div>

            <div className="sidebar-user-container">
            {userData.filter((val) => {
                if (searchTerm === "") {
                    return val
                } else if (val.get(props.second).toLowerCase().includes(searchTerm.toLocaleLowerCase())){
                    return val
                }
            }).map((val) => {
                return <div className={`sidebar-user ${ReceiverId === val.id ? "clicked" : ""}`}  key={val.id} onClick={() => setReceiverId(val.id)}>
                <div className="user-icon">
                    <h3 className="user-icon-text">{String(val.get(props.second)).substring(0, 1)}{String(val.get(props.third)).substring(0, 1)}</h3>
                </div>
                <div className="sidebar-user-info">
                    <h3>{val.get(props.second)} {val.get(props.third)}</h3>
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