# ChatUp


ChatUp is a full-stack real-time chat application that allows users to communicate instantly with each other. The application supports both traditional email/password authentication and social login options (Google, Facebook, GitHub) through Firebase integration.

## Features

### User Features
- **User Registration & Authentication**
  - Traditional email/password registration and login
  - Social login with Google, Facebook, and GitHub
  - Secure password hashing with bcrypt
  - Username availability checking

- **Profile Management**
  - Custom avatar selection using Multiavatar
  - Username customization for social login users
  - Profile persistence across sessions

- **Real-time Messaging**
  - Instant message delivery using Socket.IO
  - Message history persistence
  - Emoji picker integration

- **User Interface**
  - Modern, responsive design
  - Dark theme interface
  - Contact list with user avatars
  - Welcome screen for new conversations

### Technical Features
- Real-time bidirectional communication
- RESTful API architecture
- MongoDB data persistence
- JWT-like session management
- Cross-origin resource sharing (CORS) support
- Lazy loading for optimal performance

## Technology Stack

### Frontend
- **React 18.3.1** - UI library
- **Vite** - Build tool and development server
- **React Router DOM** - Client-side routing
- **Socket.IO Client** - Real-time communication
- **Styled Components** - CSS-in-JS styling
- **Axios** - HTTP client
- **Firebase** - Social authentication
- **React Toastify** - Notifications
- **Emoji Picker React** - Emoji selection
- **Multiavatar** - Avatar generation

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **Socket.IO** - Real-time communication
- **MongoDB** - Database
- **Mongoose** - MongoDB ODM
- **bcrypt** - Password hashing
- **CORS** - Cross-origin resource sharing
- **dotenv** - Environment variable management

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- MongoDB database
- Firebase project (for social authentication)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/praveenguptaa/ChatGo.git
   ```

2. **Install root dependencies**
   ```bash
   npm install
   ```

3. **Install server dependencies**
   ```bash
   cd server
   npm install
   ```

4. **Install client dependencies**
   ```bash
   cd ../client
   npm install
   ```

5. **Environment Configuration**
   
   Create a `.env` file in the server directory:
   ```env
   MONGO_URL=your_mongodb_connection_string
   PORT=4000
   ```

6. **Firebase Configuration**
   
   Update `client/src/utils/FirebaseConfig.js` with your Firebase project credentials.

### Running the Application

1. **Start the server**
   ```bash
   cd server
   npm start
   ```

2. **Start the client** (in a new terminal)
   ```bash
   cd client
   npm run dev
   ```

3. **Access the application**
   - Client: http://localhost:5173
   - Server: http://localhost:4000

## User Guide

### Getting Started as a User

1. **Registration**
   - Visit the application URL
   - Click "Register" to create a new account
   - Fill in username, email, and password
   - Or use social login buttons for quick registration

2. **Setting Up Your Profile**
   - After registration, you'll be prompted to set an avatar
   - Choose from generated avatar options
   - Social login users can also set a custom username

3. **Starting Conversations**
   - View your contact list on the left sidebar
   - Click on any user to start a conversation
   - Type messages in the input field at the bottom
   - Use the emoji picker to add emojis to your messages

4. **Features Available**
   - Real-time message delivery
   - Message history persistence
   - Online status indicators
   - Responsive design for mobile and desktop

## Developer Guide

### Project Structure

```
ChatGo/
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── pages/          # Route components
│   │   ├── utils/          # Utility functions and configs
│   │   └── assets/         # Static assets
│   └── package.json
├── server/                 # Node.js backend
│   ├── controllers/        # Request handlers
│   ├── model/             # Database models
│   ├── routes/            # API routes
│   └── package.json
└── package.json           # Root package file
```

### Key Components

#### Frontend Components
- **Chat.jsx** - Main chat interface
- **Login.jsx** - User authentication
- **Register.jsx** - User registration
- **SetAvatar.jsx** - Avatar selection
- **ChatContainer.jsx** - Message display area
- **Contacts.jsx** - User contact list
- **SocialLoginButtons.jsx** - Firebase social auth

#### Backend Structure
- **index.js** - Server entry point with Socket.IO setup
- **userController.js** - User authentication and management
- **messageController.js** - Message handling
- **userModel.js** - User database schema
- **messageModel.js** - Message database schema



## API Documentation

### Authentication Endpoints

#### POST /api/auth/register
Register a new user
```json
{
  "username": "string",
  "email": "string", 
  "password": "string"
}
```

#### POST /api/auth/login
User login
```json
{
  "username": "string",
  "password": "string"
}
```

#### POST /api/auth/firebaseLogin
Social login verification
```json
{
  "email": "string"
}
```

#### POST /api/auth/checkUsername
Check username availability
```json
{
  "username": "string"
}
```

#### POST /api/auth/setAvatar/:id
Set user avatar
```json
{
  "image": "string"
}
```

#### GET /api/auth/allUsers/:id
Get all users except current user

### Message Endpoints

#### POST /api/message/addmsg
Add new message
```json
{
  "from": "userId",
  "to": "userId",
  "message": "string"
}
```

#### POST /api/message/getmsg
Get conversation messages
```json
{
  "from": "userId",
  "to": "userId"
}
```

### Socket.IO Events

#### Client to Server
- `add-user` - Register user for real-time communication
- `send-msg` - Send message to another user

#### Server to Client
- `msg-recieve` - Receive message from another user

## Database Schema

### User Model
```javascript
{
  username: String (required, unique, 3-20 chars),
  email: String (required, unique, 3-50 chars),
  password: String (required, min 8 chars),
  isAvatarImageSet: Boolean (default: false),
  avatarImage: String (default: "")
}
```

### Message Model
```javascript
{
  message: {
    text: String (required)
  },
  users: Array,
  sender: ObjectId (ref: User, required),
  timestamps: true
}
```

