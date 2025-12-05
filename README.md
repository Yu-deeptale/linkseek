# linkseek

React Native (Expo) version of linkseek.

## Setup

1. Install dependencies:
   ```bash
   cd linkseek
   npm install
   ```

2. Run the app:
   ```bash
   npx expo start
   ```

   - Press `w` for Web.
   - Press `a` for Android (requires emulator or device).
   - Press `i` for iOS (requires simulator or device).

## Structure

- `src/models`: Data models (Event).
- `src/services`: State management (EventContext).
- `src/screens`: UI Screens (SignIn, Home, CreateEvent).
- `App.tsx`: Entry point and Navigation setup.

## Notes

- This project uses `expo` for easy setup and running.
- State is managed in-memory using React Context (similar to the Flutter version).
