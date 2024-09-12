package main

import (
	"log"

	"github.com/GriffinAnnshual/Boom-cats/handlers"
	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)


func main() {

	rdb  := handlers.NewRedisClient()
	router := gin.Default()

	corsConfig := cors.Config{
        AllowOrigins:     []string{"http://localhost:5173"}, // Allow only this origin
        AllowMethods:     []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"}, // Allowed HTTP methods
        AllowHeaders:     []string{"Origin", "Content-Type", "Authorization"}, // Allowed headers
        ExposeHeaders:    []string{"Content-Length", "Authorization"}, // Headers that the browser can access
        AllowCredentials: true, // Allow cookies or other credentials
    }

    router.Use(cors.New(corsConfig))


	router.POST("/create-user", func(c *gin.Context) {
    	handlers.HandleCreateUser(c, rdb)
	})
	
	router.GET("/get-leaderboard", func(c *gin.Context) {
    	handlers.HandleLeaderboard(c, rdb)
	})

	router.POST("/save-game", func(c *gin.Context) {
		handlers.HandleSaveGame(c , rdb)
	})

	router.POST("/win-game" , func(c *gin.Context) {
		handlers.HandleWinGame(c , rdb)
	})

	router.GET("/get-saved-game", func(c *gin.Context) {
		handlers.HandleGetSavedGame(c, rdb)	
	})
	
	if err := router.Run(":8000"); err != nil {
		log.Fatal(err.Error())
	}
}