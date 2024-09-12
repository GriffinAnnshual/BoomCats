package controllers

import (
	"encoding/json"
	"github.com/GriffinAnnshual/Boom-cats/models"
	"github.com/redis/go-redis/v9"
)

func SaveGameState(username, gameState string, rdb *redis.Client) error {
	userKey := "user:" + username
	userJSON, err := rdb.Get(ctx, userKey).Result()
	if err == redis.Nil {
		return err
	} else if err != nil {
		return err
	}

	var user models.User
	err = json.Unmarshal([]byte(userJSON), &user)
	if err != nil {
		return err
	}

	user.State = gameState

	updatedUserJSON, _ := json.Marshal(user)
	err = rdb.Set(ctx, userKey, updatedUserJSON, 0).Err()
	return err
}