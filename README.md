# Getting Postgres DB setup

If you want to setup sql db locally in the terminal you can run:

## `docker run --name local-4 -e POSTGRES_PASSWORD=mysecretpassword -d -p 5432:5432 postgres`

Create .env file in root take reference from .env.sample and update the values

## Create .env file

In the project directory, you can run:

### `npm run dev`

Runs the app in the development mode.\
Open [http://localhost:4000](http://localhost:4000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.
