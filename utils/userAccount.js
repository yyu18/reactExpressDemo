class UserAccount {
    constructor(userId,username,email,hashedPassword) {
        this.info = {
            userId:userId,
            username:username,
            email:email,
            password: hashedPassword,
          }
    }
}
module.exports = {
    UserAccount
}