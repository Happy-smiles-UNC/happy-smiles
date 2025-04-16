# Happy Smiles Dental Tracker

A web application to help users track their daily dental hygiene habits and maintain good oral health.

## Features

- Track daily brushing and flossing activities
- View activity history and streaks
- Get dental health tips
- Simple and user-friendly interface

## Project Overview

Happy Smiles is a Vue.js application with an Express backend that helps users maintain good dental hygiene habits by tracking their daily brushing and flossing. The application stores user activity data and provides feedback on streaks of consistent dental care.

## Tech Stack

- **Frontend**: Vue 3 with Vite
- **Backend**: Express.js
- **Data Storage**: JSON file for simplicity (could be upgraded to a database)

## Project Setup

```sh
# Install dependencies
npm install

# Start the development server
npm run dev
```

This will start the application at http://localhost:3000

## How to Use

1. Check the boxes for brushing and flossing once you've completed them for the day
2. Click "Track My Smile" to save your activity
3. View your current streak and history below the form
4. Try to maintain a streak of daily dental care!

## Data Storage

User activity data is stored in a JSON file in the `data` directory. In a production environment, this would typically be replaced with a database solution.

## Development

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Compile and Minify for Production

```sh
npm run build
```

### Run the server separately

```sh
npm run server
```
