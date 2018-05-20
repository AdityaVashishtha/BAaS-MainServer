# major-1.0

![alt text](./public/assets/img/logo-dark.png "BAaS Logo")

## Guidelines

1. For custom css,find /css/style.css and make your changes there. **Do not touch the original files in /assets/css**

## Structutre of Project

1. Main start file `app.js` when called render views from `view` folder.
2. `view engine` is pug which uses indentation like python for coding renders views from `/view` folder.
3. `passport`, `passport-local` used for authentication.
4. File related to theme are stored in `/public/assests`.
5. Main Project related css file is stored in `/public/style.css`
6. Check your *`todos`* on `trello` board.
7. `/models` contains schema of the tables.
8. `/config` contains configuration file for database and authentication.
9. `public` folder contains static resources ie. css, js, html pages etc.
10. `routes` folder for maintaining request for different routes.

# Installation Instructions
--------------------
## Setup Instructions
- Install MongoDB version v3.6.4 or later.
- Install NodeJS v8.11.1 or later.
- Python v3.6 or later.
- Install nodemon using `npm install -g nodemon`.

## Folder Structure
- backend-dashboard-1.0.0 Contains backend source code of generic server and python server folder for analytics.
- dashboard-1.0.0 Contains Source code of the dashboard front end in Angular 4.
- major-1.0 Master Server source code.
- _generated_application folder where all the generated generic server code will be copied.

## First time setup
- Copy all the folder on the server.
- For backend, dashboard, major folders, `cd` into it and then run `npm install`
- For analytics, open `pythonserver` folder inside `backend-1.0.0` run `pip install -r requirements.txt`.
- Environment variable to set debug mode in flask is: `FLASK_DEBUG=1`.

## Generate an application
1. Open terminal/command prompt inside `major-1.0` and run `nodemon`.
2. By default app will run on `port 3000`, now open `http://localhost:3000/users/signup` in browser.
3. After registration go to `http://localhost:3000/users/login` in browser to login.
4. Click on `Create App` Button, fill app details and click on `create` button.
5. Now after creation wizard a folder will be copied in your `_generated_application`.
6. Open `_generated_application/<username>/<created_app_name>` in terminal and run `nodemon`.
7. After step 6 your generic server will run on your choosen port as `localhost:<port>`.
8. Start your app in browser, and login with your original credentials.

## Additional Instruction to Start Analytics Server
1. To Run flask server open `pythonserver` and run `FLASK_APP=aas.py flask run`.
2. For enabling email verification set environment varialbes as: `export BAAS_EMAIL_KEY=<"your_sendgrid_password">` and `export BAAS_USER_ID="<your_sendgrid_userID>"`.
`