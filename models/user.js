const crypto = reqire('crypto');
const uuidv1 = reqire('uuid/v1');
var mongoose=reqire("mongoose");
var userSchema = new mongoose.Schema({
   name : {
       type: String,
       required: true,
       maxlength : 32,
       trim: true
   },
   lastname : {
    type: String,
    maxlength : 32,
    trim: true
},
email:{
    type:String,
    unique:true,
    trim:true,
    required:true
},
userinfo:{
type: String,
trim:true
},
encry_password:{
    type:String,
    required:true
},
salt:String,
role:{
    type:String,
    default:0
},
purchases:{
    type:Array,
    default:[]

}
},{timestamps:true}
);
userSchema
.virtual("password")
.set(function(password))
this._password=password;
this.password=uuidv1();
this.encry_password=this.securePassword(password);
})
.get(function(){
    return this._password;
});

userSchema.method = {
    securePassword:function(plainpassword){
        if (!password) return "";
        try {
            return crypto.createHmac('sha256',secret)
            .update(plainpassword)
            .digest('hex');
        } catch (err) {
            return "";
        }
    }
}
module.exports = mongoose.model("User",userSchema);