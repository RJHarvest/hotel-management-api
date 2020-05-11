# Hotel Management REST API

Backend REST API for my hotel management app. 
The API is used to servce 2 different apps for 2 different stakeholders.

Stakeholders involved:
- Hotel Guests
- Internal Hotel Staff

## Tech Stack

- NodeJs
- Express
- MySQL 5.7

## Get Started

Install dependencies
```
npm install
npm run dev
```

## Data Migration (Optional)

*Note: The existing migration SQL scripts are based on MySQL Version 5.7.25*

1. Add .env file with your database configurations
```
HOST=<your-host-name>
USER=<your-user>
PASSWORD=<your-password>
DATABASE=<your-database>
```
2. Run data migration
```
npm run up
```
