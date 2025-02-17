# Exploding Kitten

## Description

"Exploding Kitten" is an online single-player card game where players draw cards from a deck, aiming to avoid the exploding kitten card. The game includes features like user authentication, a leaderboard, and real-time updates, all built with modern technologies.


## Tech Stack

- **Frontend:** React, Vite, Redux Toolkit, Tailwind CSS
- **Backend:** Golang (Gin framework)
- **Database:** Redis

I’ve used Redux Toolkit for state management in the frontend. It helps in efficiently handling the game state, including the deck of cards, drawn cards, and game status, by using slices and actions.

Redis Usage: Redis is utilized to save the game state and user points. It ensures that game progress is preserved and user scores are stored and retrieved efficiently. This allows for automatic saving of game progress and real-time updates to the leaderboard.

## Setup Instructions

### Frontend

1. Navigate to the `frontend` directory:
   ```bash
   cd frontend/
   ```
2. Install the necessary dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```

### Backend

1. Navigate to the `backend` directory:
   ```bash
   cd backend/
   ```
2. Install Go dependencies:
   ```bash
   go mod tidy
   ```
3. Run the backend server:
   ```bash
   go run main.go
   ```

### Redis

1. Create a Redis database in the cloud (e.g., Redis Labs, AWS ElastiCache).
2. Add the Redis URL to the `.env` file in the `backend` directory:
   ```
   REDIS_URL=<your_redis_url>
   ```

## Notes

- Ensure that both frontend and backend servers are running simultaneously.
- Make sure to configure the `.env` file with the correct Redis URL to enable proper database connectivity.

## Images

![image](https://github.com/user-attachments/assets/b72c806c-5b16-4612-bdba-a833030242bf)

![image](https://github.com/user-attachments/assets/afc01af7-4574-4030-aea5-6b3826b343bd)

![image](https://github.com/user-attachments/assets/9b6fb2bb-b6f3-4a11-a3f7-eb2e776d2022)

## Mobile Responsive UI
![image](https://github.com/user-attachments/assets/ad3e2f41-7c3c-4471-bcb6-2e5c7d698382)



