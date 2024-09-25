# JENGa Stack
# Project Title: ratemyclub

## Table of Contents

-[Installation](#installation)
-[Usage](#usage)
-[Features](#features)

## Installation

### Prerequisites

Before beginning with the Installtion steps, ensure that the following requirements have been met:

- You have installed Python 3.x on your system. This is for backend development.
- You have installed [Node.js](https://nodejs.org/). This is for frontend development.
- You have installed MySQL.
- You have installed the package managers 'pip' and 'npm'.
- All of the previous requirements are updated to the latest versions.

### Installation

Follow the steps to install the project onto your system with your own branch.

1. **Clone the repository**
   - Use the following command:
     ```bash
     git clone https://github.com/treeofjuly/ratemyclub.git
     cd ratemyclub
     ```
2. **Switching to Personal Branch**
   - Use the following command to check to see if your branch exists in Github (meaning you made the branch in Github.com and not using Git in cmdline):
     ```bash
     git branch
     ```
     This should label all existing branches, and there should exist an asterisk next to a branch. This asterisk represents the branch the repository you are currently on.
   - If your branch is found then switch over using the following code:
     ```bash
     git checkout your-personal-branch
     ```
   - If your branch was not found then create your own branch and switch over using the following code:
     ```bash
     git checkout -b your-personal-branch
     ```
3. **Install Vite Framework with React Library via npm**
   - Create your Vite Project using the following code:
     ```bash
     npm create vite@latest
     ```
   - You will be prompted to enter project name, which will be "front-end" and then you will select the option to replace all existing files. This is fine as it does not affect the Git history, and simply you are just creating the project personalized to your own machine.
   - The following options will be presented, in which you will choose React and JavaScript, respectively.
   - You will then be given the following commands to run and finalize the project (the third command is optional if you want to see how it works):
      ```bash
      cd front-end
      npm install
      npm run dev
     ```
4. **Install Flask Framework via pip**
   - After finishing the installment of Vite + React, head back into the project folder using the command:
   - Enter the back-end directory using the command:
     ```bash
     cd ..
     ```
   - The first step is to create a virtual environment (meant to isolate the installment of Python packages from the system) using the following command:
     ```bash
     py -3 -m venv .venv
     ```
   - The second step is to activate the environment (activate whenever you need to add more packages) using the following command:
     ```bash
     .venv\Scripts\activate
     ```
   - The third step is to add the required packages which are Flask and MySQL connector to Flask, using the following command:
     ```bash
     pip install Flask Flask-MySQL
     ```
   - Then exit the environment using the following command, and you are done:
     ```bash
     deactivate
     ```
6. **Push Your Files to Finalize your Personal Branch**
   - It is time to finalize your branch by pushing your branch onto the remote repository! Use the following command:
     ```bash
     git push -u origin your-personal-branch
     ```

## Usage

The following commands will be to run the front-end or back-end scripts:
```bash
npm start
npm run dev

python app.py
```

## Features

1. Rating for each club.
2. Brief synopsis for each club.
3. Location for each club.
4. Time schedule for each club.
5. TBD
