![logo](https://raw.githubusercontent.com/solo-fox/kvizz/main/screenshots/logo.png)
# Kvizz

**Kvizz** is a fun and interactive drawing game where you can play with your friends, create custom rooms, and enjoy a variety of features that keep the excitement going! 🎨🎮 Invite your friends, draw random words, guess what others are drawing, and see who scores the highest after multiple rounds. Have a good time with Kvizz! 😃😘

## Features

- **Create and Customize Rooms**: Create rooms and invite friends to join. Customize the settings to your liking.
- **Random Word Generator**: Get a random word to draw.
- **Drawing and Guessing**: Draw the word while others in the room guess it. Only the player whose turn it is sees the word.
- **Scoring System**: Earn points for correct guesses and good drawings.
- **Results Display**: View the results and scores after each round.

## Technologies Used

- **Frontend**: 
  - [Next.js](https://nextjs.org/)
  - [React](https://reactjs.org/)
  - [Material-UI (MUI)](https://mui.com/)
  - [Styled Components](https://styled-components.com/)
  
- **Backend**:
  - [Firebase Firestore](https://firebase.google.com/products/firestore)
  - [Firebase Realtime Database](https://firebase.google.com/products/realtime-database)

## Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

Ensure you have the following installed:

- [Node.js](https://nodejs.org/)
- npm or [Yarn](https://yarnpkg.com/)

### Installation

1. Clone the repository:
    ```bash
    git clone https://github.com/yourusername/kvizz.git
    cd kvizz
    ```

2. Install dependencies:
    ```bash
    npm install
    # or
    yarn install
    ```

3. Set up Firebase:
   - Create a Firebase project in the [Firebase Console](https://console.firebase.google.com/).
   - Add a web app to your Firebase project and configure Firestore and Realtime Database.
   - Copy your Firebase configuration and add it to your project.

4. Create a `.env.local` file in the root directory and add your Firebase configuration:
    ```plaintext
    NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
    NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_auth_domain
    NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
    NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_storage_bucket
    NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
    NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
    ```

### Usage

1. Start the development server:
    ```bash
    npm run dev
    # or
    yarn dev
    ```

2. Open [http://localhost:3000](http://localhost:3000) in your browser to see the app.

## Screenshots
![s1](https://raw.githubusercontent.com/solo-fox/kvizz/main/screenshots/s1.png)
![s2](https://raw.githubusercontent.com/solo-fox/kvizz/main/screenshots/s2.png)
![s3](https://raw.githubusercontent.com/solo-fox/kvizz/main/screenshots/s3.png)
![s14(https://raw.githubusercontent.com/solo-fox/kvizz/main/screenshots/s4.png)
![s5](https://raw.githubusercontent.com/solo-fox/kvizz/main/screenshots/s5.png)
![s6](https://raw.githubusercontent.com/solo-fox/kvizz/main/screenshots/s6.png)
## Contributing

Contributions are what make the open-source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

Distributed under the MIT License. See `LICENSE` for more information.

---

Enjoy playing Kvizz with your friends! If you have any questions or feedback, feel free to reach out. 😃🎨
