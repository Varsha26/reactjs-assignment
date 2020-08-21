const mongoose = require('mongoose');
const TeamsSchema = new mongoose.Schema({
    id:{
        type: mongoose.Schema.Types.ObjectId,
    },
    name:{
        type: String,
    },
    username:{
        type:String
    },
    email:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user' 
    },
    address:{
        street: {
            type: String
        },
        suite: {
            type: String
        },
        city: {
            type: String
        },
        zipcode: {
            type: String
        },
        geo: {
            lat: {
                type: String
            },
            lng: {
              type: String
            },
        },
    },
    phone: {
        type: String
    },
    website:{
        type: String
    },
    company: 
        {
            name: {
                type: String,
            },
            catchPhrase: {
                type: String,
            },
            bs: {
                type: String,
            }
        }
});
module.exports = Teams = mongoose.model('team', TeamsSchema);