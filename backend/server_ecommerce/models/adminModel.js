const mongoose= require('mongoose');

const adminSchema= mongoose.Schema({

    email :{ type:String, require,default:'admin@example.com' },
    password :{ type:String, require,default:'123' }
});

module.exports=mongoose.model('admins',adminSchema);