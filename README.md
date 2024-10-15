# JENGa Stack
# Project Title: ratemyclub

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Features](#features)

## Installation

### Prerequisites

Before beginning with the Installtion steps, ensure that the following requirements have been met:

- You have installed Python 3.x on your system. This is for backend development.
- You have installed [Node.js](https://nodejs.org/). This is for frontend development.
- You have installed the package managers 'pip' and 'npm', which will be installed via Python or Node.js, respectively.
- All of the previous requirements are updated to the latest versions.
- Forked the repository "https://github.com/treeofjuly/ratemyclub.git"

### Installation

Follow the steps to install the project onto your system with your own branch.

1. **Clone the repository**
   - Use the following command:
     ```bash
     git clone https://github.com/treeofjuly/ratemyclub.git
     cd ratemyclub
     ```
2. **Add your Github remote repository**
   - Use the following command to see the available remote repository that Git is connected to:
     ```bash
     git remote -v
     ```
     - If done correctly, you should see a remote repository called origin or master, and its link is to the cloned Github.
   - The next step is optional and only depends on your personal preference, change the name of the remote repository "origin/master" to "upstream" to avoid confusion between the roles of the repository. Use the following command:
     ```bash
     git remote rename 'repo-name' 'new-repo-name'
     ```
   - The next step is to change the URL of your GitHub forked repository to point to your own remote repository. You can do this using the following command:
     ```bash
     git remote set-url <remote_name> <new_url>
     ```
     - After running the command you will see two remote repositories configured, meaning you will have authorization to the both of them.
3. **Creating and then switching to personal branch for contribution**
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
4. **Recreating the necessary environment for both back-end and front-end**
   - Use the following commands to set up your environment, specifically the .venv for back-end and the node_modules/ for front-end:
     ```bash
     # For backend
     cd back-end
     python -m venv .venv
     .venv/Scripts/activate
     pip install -r requirements.txt
     # After installment
     deactivate
     # For frontend
     cd .
     cd front-end
     npm install
     # To run application
     npm start
     ```
   - You are done setting it up. Back-end users must activate the .venv if to run applications
5. **Push Your Files to Finalize your Personal Branch**
   - It is time to finalize your branch by pushing your branch onto the remote repository! Use the following command:
     ```bash
     git add .
     git commit -m "Your message!"
     git push -u forked-repo-name your-personal-branch
     ```
## Usage

The following commands will be to run the front-end or back-end scripts:
```bash
npm start

python app.py
```

## Features

1. Rating for each club.
2. Brief synopsis for each club.
3. Location for each club.
4. Time schedule for each club.
5. TBD
