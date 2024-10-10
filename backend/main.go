package main

import (
	"Backend/routes"
	"log"
	"net/http"
)

//websocket biz logic

func main(){
	log.Println("let's go");
	routes.SetUpRoutes();
	err := http.ListenAndServe(":8080",nil)

	if err!=nil{
		log.Fatal(err.Error());
	}
}