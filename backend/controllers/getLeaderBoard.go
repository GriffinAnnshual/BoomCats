package controllers

import (
	"encoding/json"
	"sort"
	"github.com/GriffinAnnshual/Boom-cats/models"
	"github.com/redis/go-redis/v9"
)


func GetLeaderboard(rdb *redis.Client) ([]models.User, error) {
	users := []models.User{}
	// Scan all keys that match "user:*"
	iter := rdb.Scan(ctx, 0, "user:*", 0).Iterator()

	for iter.Next(ctx) {
		userKey := iter.Val()
		userJSON, err := rdb.Get(ctx, userKey).Result()
		if err != nil {
			return nil, err
		}

		var user models.User
		err = json.Unmarshal([]byte(userJSON), &user)
		if err != nil {
			return nil, err
		}

		users = append(users, user)
	}

	if err := iter.Err(); err != nil {
		return nil, err
	}

	// Sort users by points (descending)
	sort.Slice(users, func(i, j int) bool {
		return users[i].Points > users[j].Points
	})

	return users, nil
}