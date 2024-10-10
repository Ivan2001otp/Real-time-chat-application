package main

import (
	"Backend/routes"
	"log"
	"net/http"
	"github.com/gorilla/websocket"
)

/*websocket biz logic*/
var upgrader = websocket.Upgrader{
	ReadBufferSize: 1024,
	WriteBufferSize: 1024,
	CheckOrigin: func(r *http.Request)bool{return true;},
}

func reader(conn *websocket.Conn){
	for {
		messageType ,p,err := conn.ReadMessage();
		if err!=nil{
			log.Println(err);
			return;
		}

		log.Println("message in socket is : ",string(p))

		if err:= conn.WriteMessage(messageType,p);err!=nil{
			log.Println(err);
			return;
		}
	}
}

func serveWs(w http.ResponseWriter,r *http.Request){

	log.Println(string(r.Host))
	ws ,err := 	upgrader.Upgrade(w,r,nil);
	if err!=nil{
		log.Println(err);
	}

	log.Println("Successfully upgraded the http to websocket connection.")

	//listen for incoming messages or to write messages to websocket
	reader(ws);
}

/*routes*/
func SetUpRoutes() {

	// http.HandleFunc("/",func(w http.ResponseWriter,r *http.Request){
	// 	log.Println(w,"simple server");
	// })

	http.HandleFunc("/ws",serveWs);
}


func main(){
	log.Println("let's go");
	routes.SetUpRoutes();
	err := http.ListenAndServe(":8080",nil)

	if err!=nil{
		log.Fatal(err.Error());
	}
}