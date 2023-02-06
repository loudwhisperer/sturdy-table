# The Table

<!-- Project Shields -->

[![Contributors][contributors-shield]][contributors-url]
![GitHub](https://img.shields.io/github/license/loudwhisperer/sturdy-table?style=for-the-badge)
![node-lts](https://img.shields.io/badge/node-16.18.0-brightgreen?style=for-the-badge)
[![npm version](https://img.shields.io/badge/express-4.18.2-brightgreen?style=for-the-badge)](https://badge.fury.io/js/express)
![GitHub issues](https://img.shields.io/github/issues/loudwhisperer/sturdy-table?style=for-the-badge)

## Description

Always wanted to schedule a game but your friends can never find the time? Send them an invite from 'The Table'! Users are able to create, join, share, and invite other users to events they create related to a game of their choosing! This makes setting up a game night with friends or even users that you don't know a seamless experience.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Credits](#credits)
- [License](#license)
- [Development](#development-team)
- [Features](#features)

## Installation

1. Install MySQL and NodeJS for your OS version
   - Configure MySQL
2. Clone the repository from GitHub to your local machine
3. Create a '.env' file in the root directory
   - Use the database name: 'tableapp_db'
   - Add your MySQL username and password
4. Open a terminal in the root of the cloned repository
   - In the terminal, run the following: '$ npm i'
5. Log into MySQL in the terminal
   - Command: '$ mysql -u root -p'
6. Now, while logged into MySQL, run the following commands
   - 'mysql> source db/schema.sql;'
   - then 'mysql> exit' to leave MySQL
7. Now, while not logged into MySQL, run the following commands
   - '$ npm run seed'
   - '$ node server.js'

## Usage

Provide instructions and examples for use. Include screenshots as needed.

To add a screenshot, create an `assets/images` folder in your repository and upload your screenshot to it. Then, using the relative filepath, add it to your README using the following syntax:

![screenshot](./assets/images/screenshot.png)

## Credits

1. Our predefined category names came from Simon Castle's blog here: https://www.dicebreaker.com/categories/board-game/how-to/board-game-types-explained/

## License

Refer to the LICENSE in the repo for the code.
The font (Montserrat) is licensed under the SIL Open Font License (OFL).

## Development Team

<ul>
    <li><a href="https://github.com/josht-dev">Josh Taylor</a></li>
    <li><a href="https://github.com/loudwhisperer">Brendan Borowski</a></li>
    <li><a href="https://github.com/porkchoppy">Christin Carter</a></li>
    <li><a href="https://github.com/artiecannv">Arthur Cann</a></li>
</ul>

## Features

<ul>
    <li>Host or join public events</li>
    <li>Host and invite other users to private events</li>
    <li>Edit any hosted events</li>
    <li>Change account information</li>
</ul>

<!-- Markdown links and shields -->

[contributors-shield]: https://img.shields.io/github/contributors/loudwhisperer/sturdy-table.svg?style=for-the-badge
[contributors-url]: https://github.com/loudwhisperer/sturdy-table/graphs/contributors
