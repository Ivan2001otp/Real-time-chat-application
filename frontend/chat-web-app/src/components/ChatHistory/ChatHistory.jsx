import React,{Component} from "react"
import "./ChatHistory.css";
import Message from "../Message/Message.jsx";

class ChatHistory extends Component{
    render(){
        const messages = this.props.chatHistory.map(msg=><Message message={msg.data}/>);

        return (
            <div  className="ChatHistory">
                <h2>Chat History</h2>
                {messages}
            </div>
        )
    }
}

export default ChatHistory;