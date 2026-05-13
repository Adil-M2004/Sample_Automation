require('dotenv').config();

const config = {
    firstName: process.env.firstName,
    lastName: process.env.lastName,
    employeeID: process.env.employeeID,
    username: process.env.user,
    password: process.env.password,
    
    // Optional: Add a helper to ensure required variables are present
    checkEnv: () => {
        const required = ['firstName', 'lastName', 'employeeID', 'username', 'password'];
        required.forEach(field => {
            if (!process.env[field]) {
                console.warn(`Warning: Environment variable ${field} is missing!`);
            }
        });
    }
};

module.exports = config;