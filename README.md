# Youth Group Song Book Website

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [FAQ](#faq)
- [Development](#development)
  - [Getting Started](#getting-started)
  - [Updating Song Data](#updating-song-data)
- [Copyright & Licensing](#copyright--licensing)
- [Privacy](#privacy)

## Overview

This is a song book that was specifically created to copy an existing song book used by a youth group. The goal was to make the songs easily accessible online for the youth group members.

The site is live and can be accessed at: [https://youthgroupsongs.com](https://youthgroupsongs.com)

## Features

- A collection of 200+ song lyrics
- Search functionality to quickly find songs
- Responsive design for mobile and desktop use
- PWA support for offline access
- Favoriting songs for quick access
- Clean and simple user interface
- Dark mode support
- Open individual songs in their own URL for easy sharing

## FAQ

### Why was this song book created?

The song book was created to provide youth group members with easy access to their favorite songs anytime and anywhere.

### How can I access the song book?

You can access the song book through the website [https://youthgroupsongs.com](https://youthgroupsongs.com). It is designed to be user-friendly and accessible on various devices.

### Is there a mobile app available?

Yes, the website is designed as a Progressive Web App (PWA), which means you can install it on your mobile device for offline access. You can do this by visiting the website on your mobile browser and following the prompts to add it to your home screen.

### Can I contribute to the song book?

Absolutely! If you have suggestions for new songs or improvements, please create an issue on the GitHub repository or contact the maintainers directly.

# Development

This project was bootstrapped with next.js. To learn more about Next.js, take a look at the [Next.js documentation](https://nextjs.org/docs).

## Getting Started

To set up the project locally, follow these steps:

1. install Node.js and npm if you haven't already. The suggested version is node 22.x, you can download node [here](https://nodejs.org/).
2. Clone the repository:
   ```bash
   git clone https://github.com/ColemanSandefur/Youth-Group-Song-Book-Website.git
   ```
3. Navigate to the project directory:
   ```bash
   cd Youth-Group-Song-Book-Website
   ```
4. Install the dependencies:
   ```bash
   npm install
   ```
5. Run the development server:
   ```bash
   npm run dev
   ```
6. Open [http://localhost:3000](http://localhost:3000) in your browser to view the site.

## Updating Song Data

The song data is stored in the `songs.json` file located in the `data` directory. To update or add new songs, simply edit this file and add the necessary song information in JSON format. Make sure to follow the existing structure for consistency.

Each song entry should include the following fields:

- `title`: The title of the song
- `lyrics`: The lyrics of the song. This is an array of strings, where each string represents a line in the song.
- `uuid`: A unique identifier for the song

It is required to use a unique UUID (Universally Unique Identifier) for each song. You can generate a UUID using the script provided in the `scripts` directory. This script will automatically generate and assign UUIDs to songs that are missing them. You can run the script with the following command:

```bash
npm run add-uuids
```

# Copyright & Licensing

This project provides an interface for displaying song lyrics for educational and church use.
All lyrics remain copyrighted by their respective owners and are not owned by this project.
If you are a copyright holder and want content removed, please open an issue.

# Privacy

This website uses PostHog for analytics. No personal data is collected or stored. All favorites and offline data are stored locally on the user's device.
