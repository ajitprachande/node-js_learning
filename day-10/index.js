const {User, Login } = require('./User')


const user1 = new User("Ajit","Ajit123@gmail.com");

const UserLogin = new Login("ajitpra", "ajit123");

console.log(UserLogin.getCredentials());

user1.getProfile();