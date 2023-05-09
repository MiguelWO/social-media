const moongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new moongoose.Schema({
    username : { type: String, required: true, unique: true },
    email : { type: String, required: true, unique: true },
    password : { type: String, required: true },
    createdAt : { type: Date, default: Date.now }
});

userSchema.pre('save', async function(next) {
    try {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(this.password, salt);
        this.password = hashedPassword;
        next();
    } catch (err) {
        next(err);
    }
});

userSchema.methods.isValidPassword = async function(newPassword) {
    try {
        return await bcrypt.compare(newPassword, this.password);
    } catch (err) {
        throw new Error(err);
    }
};

const User = moongoose.model('User', userSchema);

module.exports = User;