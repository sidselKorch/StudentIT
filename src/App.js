import logo from './logo.svg';
import './common_styles.css';

function App() {
  return (
    <div className="App">
      <div className="cards">


        {/* FONT */}
        <div className="card-container">    
            <h1>Font Styles</h1>
            <h1>Chat</h1>
            <h2>#Current post</h2>
            <h3>User Lastname</h3>
            <h4>Teacher</h4>
            <p>Here goes some nice text</p>
        </div>
        
        {/* BUTTONS */}
        <div className="card-container">
            <h1>Buttons</h1>
            
            <button className="btn btn-send">Send</button>
            <button className="btn btn-reply">Reply</button>
            <button className="btn btn-react">React</button>
        </div>
        
        {/* USER ICONS */}
        <div className="card-container">
            <h1>User icons</h1>

            <div className="user-icon">
                <p>GW</p>
            </div>
            
            <div className="user-icon">
                <p>BW</p>
            </div>
        </div>
    
        {/* TABS */}
        <div className="card-container">
            <h1>Tabs</h1>
            <p className="tab tab-blue">Course</p>
            <p className="tab tab-red">Course</p>
            <p className="tab tab-green">Course</p>
            <p className="tab tab-yellow">Course</p>
        </div>
        
        {/* CHAT USERS */}
        <div className="card-container">
            <h1>Chat users</h1>
            
            <div className="chat chat-active">
                <div className="user-icon small">
                    <p>SL</p>
                </div>
                <div className="chat-text">
                    <p>Student Lastname</p>
                    <p>Last message here...</p>
                </div>
                <div className="notification-dot"></div>
            </div>
            
            <div className="chat">
                <div className="user-icon small">
                    <p>SL</p>
                </div>
                <div className="chat-text">
                    <p>Student Lastname</p>
                    <p>Last message here...</p>
                </div>
                <div className="notification-dot"></div>
            </div>
        </div>

        {/* INPUT FIELDS */}
        <div className="card-container">
            <h1>Input Fields</h1>
            
            <form action="/#" className="input-field">
                <input type="text" id="comment" name="comment" placeholder="Comment here..."></input>
                <div className="anonymous">
                    <h4>Anonymous</h4>
                    <input type="checkbox"></input>
                </div>
                <input type="submit" className="btn btn-send" value="Send" ></input>
            </form> 

            <form action="/#" className="input-field">
                <input type="text" id="comment" name="comment" placeholder="Type here..."></input>
                <input type="submit" className="btn btn-send" value="Send"></input>
            </form> 
        </div>



      </div>
    </div>
  );
}

export default App;
