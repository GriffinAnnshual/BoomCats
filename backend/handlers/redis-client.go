package handlers

import (
	"context"
	"fmt"
	"log"
	"os"

	"github.com/joho/godotenv"
	"github.com/redis/go-redis/v9"
)

func init() {
    if err := godotenv.Load(); err != nil {
        log.Println("No .env file found, assuming environment variables are set")
    }
}

func NewRedisClient() *redis.Client {

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
