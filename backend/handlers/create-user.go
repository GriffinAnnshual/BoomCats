package handlers

import (
	"fmt"
	"net/http"

	"github.com/GriffinAnnshual/Boom-cats/controllers"
	"github.com/gin-gonic/gin"
	"github.com/redis/go-redis/v9"
)

type CreateUserRequest struct {
	Username string `json:"username" binding:"required"`
}

func HandleCreateUser(c *gin.Context, rdb *redis.Client) {
	var req CreateUserRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Username is required"})
		return
	}

	fmt.Println(req.Username)

	err := controllers.CreateUser(req.Username, rdb)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to create user"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "User created", "username": req.Username})
}
