package models

type User struct {
	Username string `json:"username"`
	Points   int    `json:"points"`
	State    string `json:"state"`
}