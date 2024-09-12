package handlers

import (
	"net/http"

	"github.com/GriffinAnnshual/Boom-cats/controllers"
	"github.com/gin-gonic/gin"
	"github.com/redis/go-redis/v9"
)

func HandleLeaderboard(c *gin.Context, rdb *redis.Client) {
	users, err := controllers.GetLeaderboard(rdb)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to retrieve leaderboard"})
		return
	}

	// Prepare the response data
	leaderboard := []gin.H{}
	for _, user := range users {
		leaderboard = append(leaderboard, gin.H{
			"username": user.Username,
			"points":   user.Points,
		})
	}

	// Send the response
	c.JSON(http.StatusOK, gin.H{"leaderboard": leaderboard})
}
