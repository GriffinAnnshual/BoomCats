package controllers

import (
	"context"
	"encoding/json"

	"github.com/GriffinAnnshual/Boom-cats/models"
	"github.com/redis/go-redis/v9"
)

var ctx = context.Background()

func CreateUser(username string, rdb *redis.Client) error {
	user := models.User{
		Username: username,
		Points:   0,
		State:    "",
	}

	userKey := "user:" + username
	userJSON, _ := json.Marshal(user)
	err := rdb.Set(ctx, userKey, userJSON, 0).Err()
	if err != nil {
		return err
	}
	return nil
}