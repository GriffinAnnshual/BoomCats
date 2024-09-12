package controllers

import (
	"context"

	"github.com/redis/go-redis/v9"
)

func GetSavedGameState(username string, rdb *redis.Client) (string, error) {
	ctx := context.Background()
	key := "user:" + username
	gameState, err := rdb.Get(ctx, key).Result()
	if err == redis.Nil {
		return "", nil
	} else if err != nil {
		return "", err
	}
	return gameState, nil
}
