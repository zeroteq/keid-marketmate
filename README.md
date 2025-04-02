[image_0]: https://pfst.cf2.poecdn.net/base/image/f6961f00ae640276641918bd4434226255543de224dc50d1490e9c7777dab9a3?w=161&h=81&pmaid=334857096

# Marketzim - Marketplace API

[Marketplace Banner][image_0]

## Overview

Marketzim is a full-featured marketplace platform backend API that enables users to list products and services, manage favorites, likes, and user profiles. Built with Node.js, Express, and MongoDB, it provides a robust foundation for creating marketplace applications across different platforms.

[[License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)

## Features

- **User Management**:
  - Registration and authentication
  - Profile creation and management
  - JWT token-based security
  - OTP email verification

- **Listing Management**:
  - Product listings with multiple images
  - Service listings
  - Categorization
  - Location-based offerings

- **Social Features**:
  - Favoriting listings
  - Liking listings and profiles
  - User profile views

- **Search & Discovery**:
  - Query-based search
  - Category filtering
  - Location filtering

- **Image Uploads**:
  - AWS S3 integration
  - Multiple image support
  - Image management

## Tech Stack

- **Backend**:
  - Node.js
  - Express.js
  - MongoDB (mongoose ODM)
  - JWT Authentication
  - CORS support

- **Cloud Storage**:
  - AWS S3 (for image uploads)

- **Security**:
  - JWT token-based authentication
  - Email verification via OTP

## API Documentation

### Core Endpoints

| Category | Endpoints |
|----------|----------|
| Authentication | Login, Signup, OTP verification, Password recovery |
| Users | Profile management, Listings, Favorites, Likes |
| Products | CRUD operations, Filtering, Details |
| Services | CRUD operations, Filtering, Details |
| Search | Query, Category, Location filters |
| Social | Favorites, Likes |

For comprehensive API documentation, see the [detailed API documentation](API_DOCUMENTATION.md).

### Authentication

The API uses JWT (JSON Web Tokens) for authentication:

```javascript
// Sample authentication header
{
  "Authorization": "Bearer YOUR_JWT_TOKEN"
}
```

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- MongoDB
- AWS S3 account (for image uploads)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/marketzim.git
   cd marketzim
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory with the following variables:
   ```
   PORT=5000
   MONGODB_URI=mongodb+srv://your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret_key
   AWS_ACCESS_KEY_ID=your_aws_access_key
   AWS_SECRET_ACCESS_KEY=your_aws_secret_key
   AWS_BUCKET_NAME=your_s3_bucket_name
   ```

4. Start the server:
   ```bash
   npm start
   ```

For development with auto-reload:
   ```bash
   npm run dev
   ```

## Project Structure

```
keid-marketmate/
├── models/              # MongoDB schemas
│   ├── User.js
│   ├── Product.js
│   ├── Service.js
│   ├── Favorite.js
│   └── UserLike.js
├── routes/              # API routes
│   ├── authRoutes.js
│   ├── userRoutes.js
│   ├── productRoutes.js
│   ├── serviceRoutes.js
│   ├── favoriteRoutes.js
│   ├── userLikeRoutes.js
│   ├── searchRoutes.js
│   └── listingRoutes.js
├── app.js               # Express app configuration
├── server.js            # Server entry point
└── package.json         # Project dependencies
```

## Frontend Integration

This API is designed to work with any frontend technology. Sample request using fetch:

```javascript
// Example: Fetch all products
async function getProducts() {
  try {
    const response = await fetch('https://your-api-url.com/api/products', {
      method: 'GET',
      headers: {
        'Authorization': 'Bearer YOUR_JWT_TOKEN',
        'Content-Type': 'application/json'
      }
    });
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching products:', error);
  }
}
```

## Mobile App Integration

The API can be integrated with native mobile apps:

- **Android**: Using Retrofit, Volley, or OkHttp libraries
- **iOS**: Using URLSession or Alamofire
- **React Native**: Using fetch or axios
- **Flutter**: Using http or dio packages

## Deployment

The API is ready for deployment on platforms like:

- Heroku
- AWS EC2
- Google Cloud
- Render
- Vercel
- Digital Ocean

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License

## Contact

Knowledge Mhodi - mhodieknowledge@gmail.com

---

Made with ❤️ by Your Andaline Devs 
