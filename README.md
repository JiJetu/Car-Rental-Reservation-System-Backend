## Car Rental Reservation System

This guide helps you set up and run the `Car Rental Reservation System Backend project` locally for development purposes.

**Prerequisites:**

- **Node.js and npm (or yarn):** Download and install Node.js from the official website https://nodejs.org/en/about/previous-releases. npm (Node Package Manager) comes bundled with Node.js. Alternatively, you can use yarn as a package manager.
- **MongoDB:** The application uses MongoDB as a database. Download and install a local MongoDB instance from the official website https://www.mongodb.com/try/download/community.

**Steps:**

1. **Clone or download the project.**
2. **Navigate to the project directory** in your terminal.
3. **Install dependencies:** Run `npm install` (or `yarn install`) to install all the required packages listed in `package.json`.
4. **Start the server:** Choose one of the following commands depending on your preference:
   - **For development with automatic restarts:** `npm start:dev` (or `yarn start:dev`)
     - This is the recommended option for development as it automatically restarts the server whenever you make changes to the code.
   - **For production-like mode with restarts:** `npm start:prod` (or `yarn start:prod`)
     - This option is similar to `start:dev` but might be less resource-intensive.
   - **To directly run the compiled server:** `npm start` (or `yarn start`)
     - This option directly runs the compiled JavaScript file and is useful for a quick test after building the project.

**Additional Notes:**

- The `test` script currently doesn't run any tests. You'll need to implement your own testing suite if needed.
- This project uses TypeScript. If you're not familiar with TypeScript, you might need to learn some basics before diving into the code.

By following these steps, you should be able to run the `Car Rental Reservation System Backend project` locally and start developing your backend application!
