# 📊 GraphQL Fullstack Application

> A modern fullstack application built with GraphQL, React, Node.js, and MongoDB.

[![Node.js Version][node-version]][node-url]
[![React Version][react-version]][react-url]
[![MongoDB][mongodb-shield]][mongodb-url]

## 🚀 Quick Start

### Prerequisites

- Node.js >= 18.x
- npm >= 9.x
- MongoDB Atlas account or local MongoDB
- Git

### One-Click Setup

```bash
# Clone the repository
git clone <your-repo-url>
cd graphql

# Install dependencies for both client and server
npm run install-all

# Start both servers
npm run dev
```

## 🏗️ Architecture

### Tech Stack

#### Backend

- **Server**: Node.js with Express
- **GraphQL**: Apollo Server
- **Database**: MongoDB with Mongoose
- **Authentication**: JWT
- **Testing**: Jest

#### Frontend

- **Framework**: React 18
- **GraphQL Client**: Apollo Client
- **Styling**: TailwindCSS
- **State Management**: Apollo Cache
- **Testing**: React Testing Library

## 📁 Project Structure

```
graphql/
├── client/                # Frontend application
│   ├── src/
│   │   ├── components/   # Reusable React components
│   │   ├── graphql/      # GraphQL queries and mutations
│   │   ├── hooks/        # Custom React hooks
│   │   └── pages/        # Route components
│   └── package.json
│
├── server/               # Backend application
│   ├── src/
│   │   ├── models/      # Mongoose models
│   │   ├── resolvers/   # GraphQL resolvers
│   │   ├── typeDefs/    # GraphQL type definitions
│   │   └── utils/       # Helper functions
│   └── package.json
│
└── package.json         # Root package.json
```

## 🔧 Configuration

### Environment Variables

#### Server (.env)

```env
MONGO_URL=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
PORT=4000
```

#### Client (.env)

```env
REACT_APP_API_URL=http://localhost:4000/graphql
```

## 📝 API Documentation

### Core GraphQL Operations

#### Queries

```graphql
# Get all users
query GetUsers {
  users {
    id
    name
    email
    posts {
      id
      title
    }
  }
}

# Get user by ID
query GetUser($id: ID!) {
  user(id: $id) {
    id
    name
    email
  }
}
```

#### Mutations

```graphql
# Create new post
mutation CreatePost($input: PostInput!) {
  createPost(input: $input) {
    id
    title
    content
  }
}
```

## 🧪 Testing

```bash
# Run backend tests
cd server && npm test

# Run frontend tests
cd client && npm test
```

## 📦 Available Scripts

```bash
# Root directory
npm run dev           # Start both client and server
npm run install-all   # Install all dependencies

# Server directory
npm start            # Start server with nodemon
npm test             # Run tests
npm run build        # Build for production

# Client directory
npm start            # Start React dev server
npm test             # Run tests
npm run build        # Build for production
```

## 🚀 Deployment

### Backend Deployment

1. Set up MongoDB Atlas cluster
2. Configure environment variables
3. Deploy to your preferred platform (Heroku, AWS, etc.)

### Frontend Deployment

1. Build the React application
2. Deploy to static hosting (Netlify, Vercel, etc.)

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 Authors

- **Your Name** - _Initial work_ - [YourGithub](https://github.com/yourusername)

## 🙏 Acknowledgments

- Apollo GraphQL team for excellent documentation
- MongoDB Atlas for database hosting
- React team for the awesome framework

[node-version]: https://img.shields.io/badge/node-v18.x-green.svg
[node-url]: https://nodejs.org/
[react-version]: https://img.shields.io/badge/react-v18.x-blue.svg
[react-url]: https://reactjs.org/
[mongodb-shield]: https://img.shields.io/badge/mongodb-%234ea94b.svg?style=flat&logo=mongodb&logoColor=white
[mongodb-url]: https://www.mongodb.com/
