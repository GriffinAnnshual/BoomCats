package handlers

import (
	"context"
	"fmt"
	"log"
	"os"

	"github.com/joho/godotenv"
	"github.com/redis/go-redis/v9"
)

func NewRedisClient() *redis.Client {
	 err := godotenv.Load()
    if err != nil {
        log.Fatalf("Error loading .env file")
    }

    redisURL := os.Getenv("redis_url")

	opt, err := redis.ParseURL(redisURL)
	if err != nil {
		log.Fatalf("Failed to parse Redis URL: %v", err)
	}

	rdb := redis.NewClient(opt)

	ctx := context.Background()

	pong, err := rdb.Ping(ctx).Result()
	if err != nil {
		log.Fatalf("Failed to connect to Redis: %v", err)
	}

	fmt.Println("Redis connected:", pong)

	return rdb
}
