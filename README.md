# hetwgtao

## Summary

Dispuutswebsite voor het w.g. Tao.

## Running the app

### Installation

#### 1. Clone the repository

The repository can be cloned by running `git clone` in the command line.

```zsh
git clone https://github.com/Kuckelkorn/hetwgtao
```

#### 2. Install the packages

Install the dependencies with npm.

```node
npm install
```

#### 3. Setup your database connection

In order to setup your database connection first you need to make a `.env` file
in that file you paste the following code if you're using mongodb paste
your info instead of the standard `<username>` , `<password>`, `<dbname>`

```sh
MONGODB_URI= mongodb+srv://<username>:<password>@cluster0-ea6cu.azure.mongodb.net/<dbname>?retryWrites=true
```

If you're using a different service look at their documentation about setting up the connection to your database and paste it behind `MONGO_DB=`

#### 4. Setup express sessions

In order to make sessions work you have to put in the .env file a string consisting of random characters to make it really hard for hackers to guess your secret and accesing your cookies and retrieve potentially sensitive information about your users

```sh
SESSION_SECRET= 'your string'
```

### Running and viewing the application

Start the server with `npm run ndmStart`, you can view it by going to `localhost:5555`.

```node
1. npm run ndmStart
2. open your browser of choice and go to localhost:5000
```
