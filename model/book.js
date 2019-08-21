var mongoose = require("mongoose");
var schema= mongoose.Schema; // instance created for schema

var empschema = new schema(             //schema structure
    {
        
        name:{type:String,required:true},
        file:{type:String,required:true},
       
        
    }
)

var bookmodel=mongoose.model("emp",empschema,"img");  
module.exports=bookmodel;