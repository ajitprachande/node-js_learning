// Exporting a class:( default exporting )=>
class User {
    constructor(name, email) {
        this.name = name,
            this.email = email
    }

    getProfile() {
        console.log(`Name: ${this.name}`);
        console.log(`Email: ${this.email}`);
    }
}

class Login {
    constructor(username, password) {
        this.username = username,
            this.password = password
    }
    getCredentials() {
        return {
            UserName: this.username,
            Password: this.password
        }
    };
}


// module.exports = User

//or

module.exports = { User, Login }