# BidEase

## 📌 Introduction

[![Awesome](https://awesome.re/badge.svg)](https://awesome.re)

BidEase is a comprehensive bidding platform designed to allow users (bidders) to bid on various goods and items. The system allows users to place bids, view bid statuses, and get detailed summaries of their bidding activities. The platform ensures secure transactions and participation through user authentication and bid invitations.

## 🚀 Key Features

- User Authentication: Secure login system for bidders using JSON Web Tokens (JWT).
- Bid Invitation: Only invited bidders can participate in bids.
- Bid Acceptance/Rejection: Bidders can accept or reject the invited bids.
- Bid Summary: View detailed summaries of bids, including the bidders, bid amounts, and the bid items.
- Error Handling: Proper error responses (e.g., 404 for not found, 403 for forbidden actions).

## 👨‍💻 Tech Stack Used

Technologies Used

- Node.js
- Express
- MongoDB
- Mongoose

## Folder Structure

```bash
Bidders_Backend
│
├── config
│   └── db.js
│
├── controllers
│   └── bidController.js
│   └── bidderController.js
│
├── middleware
│   └── authMiddleware.js
│
├── models
│   └── Bid.js
│   └── Bidder.js
│   └── BidEntry.js
│   └── BidItem.js
│
├── routes
│   └── bidRoutes.js
│   └── bidRoutes.js
│
├── .env
├── .gitignore
├── package.json
└── server.js

```

## API Endpoints

#### Authentication

POST /api/auth/register - Register a new bidder.

```bash
{
  "name": "String",
  "email": "String",
  "password": "String"
}
```

POST /api/auth/login - Log in an existing bidder.

```bash
{
  "email": "String",
  "password": "String"
}
```

#### Bids

POST /api/bids - Create a new bid.

```bash
{
  "title": "String",
  "description": "String",
  "baseAmount": "Number",
  "bidItems": ["Array of Item IDs"]
}
```

POST api/bids - Invite bidder for bid.

PUT /api/bids/:id/publish - Publish the bid

GET /api/bids - Get a list of all bids.

#### Bidding Process

POST /api/bids/:bidId/bid - Place a bid on a specific bid item.

```bash
{
  "amount": "Number",
  "bidItemId": "String"
}
```

DELETE /api/bids/:bidId/bid - Reject a specific bid.

#### Bid Summary

GET /api/bids/:id/summary - View the summary of bids for a specific bid.

## 🛠️ Installation Steps

Star and Fork the Repo 🌟 and this will keep us motivated.

1. Clone the repository

```bash
git clone https://github.com/subhashdippu/Bidders_Backend.git
```

2. Change the working directory

```bash
cd Bidders_Backend
```

3. Install dependencies

```bash
npm install
```

4. Run the app

```bash
npm run start
```
