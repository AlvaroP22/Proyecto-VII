# Proyecto7

## Prerequisites

* Node.js 20.x (LTS). Using NVM (Node Version Manager) is recommended.
* Npm 10.x or a compatible version.

## Installation

Follow the steps below to set up the project locally.

1. Clone the repository
```
git clone https://github.com/AlvaroP22/Proyecto-VII
cd Proyecto-VII/
```

2. Use Node.js 20 (Recommended).
If you are using NVM:
```
nvm use
```
This will automatically switch to the Node.js version defined in .nvmrc.

3. Install dependencies.
The project is divided into two parts: 
* cliente (frontend)
* servicios (backend). 

Install dependencies in each directory:

Frontend
```
cd cliente
npm install
```
Backend
```
cd ../servicios
npm install
```

## Environment Variables

This project requires environment variables to run properly.

The .env file is not included in the repository for security reasons.  
Create it using the example file:

```
cd servicios
cp .env.example .env
```
⚠️ Make sure the .env file is properly configured before starting the backend.

## Download the Example Database

The example database is not included in the repository because it is intended only for testing and contains sample data.

To set up the example database:

1. Copy the file **proyecto7.sqlite** from the following link:
https://drive.google.com/drive/folders/1fYLNPIgal2sGCavdKSpx4Jd5VPXStWL7?usp=sharing

2. Place the file inside the following directory:

**servicios/db/**

## Default Test User

You can log in using the following admin account. It has full access to all system functions, data viewing and data editing:

email
```
a@a.com
```

password 
```
123456
```

⚠️ Important:
The database file is excluded in .gitignore, so it will not be uploaded to the repository. Each developer must download their own copy.

## Run the application

Start backend
```
cd servicios
npm start
```
The backend should be available at:
```
http://localhost:3000
```

Start frontend
```
cd cliente
npx ng serve
```

The frontend should be available at:
```
http://localhost:4200
```


