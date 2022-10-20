# Online Foor Ordering

## Required ENV Variables

- MONGO_URL = Mongo DB URL (`mongodb+srv://<pass>:<username>@cluster0.f0bhd.mongodb.net/<db>?retryWrites=true&w=majority`)
- JWT_SECRET = JWT Secret Key (`123456`)

## PNPM/NPM Scripts

- `pnpm start` - Start the server in development mode with nodemon
- `pnpm prod` - Start the server in production mode

## API Endpoints

### User Routes

- `POST /api/signup` - Signup a new user (requires name, email, password)
  - returns JWT Token
- `POST /api/login` - Login a user (requires email, password)
  - returns JWT Tokeen
- `GET /api/session` - Get the current user session (requires JWT Token)
  - returns user object
- `GET /api/list-users` - List all users (FOR TESTING ONLY)

### Contact Us Routes

- `POST /api/contact-us` - saves the message in db (requires name, email,subject, message)
  - returns success message
- `GET /api/list-contacts` - List all messages (FOR TESTING ONLY)
### output
![1](https://github.com/199sahil/food-order-app/blob/main/showcase-assets/1.PNG?raw=true)
![2](https://github.com/199sahil/food-order-app/blob/main/showcase-assets/2.PNG?raw=true)
![3](https://github.com/199sahil/food-order-app/blob/main/showcase-assets/3.PNG?raw=true)
![4](https://github.com/199sahil/food-order-app/blob/main/showcase-assets/4.PNG?raw=true)