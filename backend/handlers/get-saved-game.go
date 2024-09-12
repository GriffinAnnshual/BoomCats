package handlers

import (
	"net/http"

	"github.com/GriffinAnnshual/Boom-cats/controllers"
	"github.com/gin-gonic/gin"
	"github.com/redis/go-redis/v9"
)

func HandleGetSavedGame(c *gin.Context, rdb *redis.Client) {
	username := c.Query("username")
	if username == "" {
		c.JSON(http.StatusBadRequest, gin.H{"messsage": "Username is required"})
		return
	}

	gameState, err := controllers.GetSavedGameState(username, rdb)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"message": "Failed to retrieve game state"})
		return
	}

	if gameState == "" {
		c.JSON(http.StatusInternalServerError, gin.H{"message": "No saved game found"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"username": username, "gameState": gameState})
}
