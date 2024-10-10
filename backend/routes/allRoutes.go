package routes

import (
	"log"
	"net/http"
)

func SetUpRoutes() {

	http.HandleFunc("/",func(w http.ResponseWriter,r *http.Request){
		log.Println(w,"simple server");
	})
}