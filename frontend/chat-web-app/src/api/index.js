var socket = new WebSocket("ws://localhost:8080/ws");

let connect = () => {
    console.log("Attempting Connection...")

    socket.onopen=()=>{
        console.log("successfully connected");
    };

    socket.onmessage = msg =>{
        console.log(`messages is -> ${msg}`);
    };

    socket.onclose = event => {
        console.log("socket closed connection : ",event)
    };

    socket.onerror = error =>{
        console.log("socket error : ",error);
    };
}

let sendMsg = msg =>{
    console.log(`Sending msg : ${msg}`);
    socket.send(msg);
}

export {connect,sendMsg}