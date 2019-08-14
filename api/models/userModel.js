const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');
mongoose.promise = Promise

var userSchema = mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    isAdmin : {
        type: Boolean,
        default: false
    },
    photos: [],
    local : {
        email : String,
        password : String
    },
    facebook : {
        id : String,
        token : String,
        email : String
    },
    google: {
        googleId: String,
        token: String,
        email: String
    }
})

userSchema.methods = {
	checkPassword: function(password) {
		return bcrypt.compareSync(password, this.local.password)
	},
	hashPassword: plainTextPassword => {
		return bcrypt.hashSync(plainTextPassword, 10)
	}
}

// Define hooks for pre-saving
userSchema.pre('save', function (next) {
	if (!this.local.password) {
		console.log('models/user.js =======NO PASSWORD PROVIDED=======')
		next()
	} else {
		console.log('models/user.js hashPassword in pre save');
		
		this.local.password = this.hashPassword(this.local.password)
		next()
	}
})

const User = mongoose.model('User',userSchema);
module.exports = User;