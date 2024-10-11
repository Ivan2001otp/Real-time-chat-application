package main

import (
	"log"
	"net/http"
	"fmt"
	"Backend/pkg/websocket"
)


func serveWs(pool *websocket.Pool,w http.ResponseWriter,r *http.Request){

	log.Println("Websocket endpoint hit")
	conn ,err := 	websocket.Upgrade(w,r);
	if err!=nil{
		fmt.Fprintf(w,"%+V\n",err)
	}

	// go websocket.Writer(ws)
	// websocket.Reader(ws)

	client := &websocket.Client{
		Conn: conn,
		Pool: pool,
	}
	pool.Register <- client;
	client.Read();

}

/*routes*/
func SetUpRoutes() {

	pool := websocket.NewPool();
	go pool.Start();

	http.HandleFunc("/",func(w http.ResponseWriter,r *http.Request){
		log.Println(w,"simple server");
	})

	http.HandleFunc("/ws",func(w http.ResponseWriter,r *http.Request){
		serveWs(pool,w,r);
	});

}


func main(){
	log.Println("Distributed Chat App v.0.01");
	SetUpRoutes();
	err := http.ListenAndServe(":8080",nil)

	if err!=nil{
		log.Fatal(err.Error());
	}
}