package handlers

import (
	"encoding/json"
	"net/http"

	"github.com/GriffinAnnshual/Boom-cats/controllers"
	"github.com/gin-gonic/gin"
	"github.com/redis/go-redis/v9"
)

type SaveGameRequest struct {
	Username  string                 `json:"username" binding:"required"`
	GameState map[string]interface{} `json:"gameState" binding:"required"`
}

func HandleSaveGame(c *gin.Context, rdb *redis.Client) {
	var req SaveGameRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Username and gameState are required"})
		return
	}

	gameStateJSON, err := json.Marshal(req.GameState)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to encode game state"})
		return
	}

	err = controllers.SaveGameState(req.Username, string(gameStateJSON), rdb)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to save game state"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Game state saved", "username": req.Username})
}
