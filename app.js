var exp=require("express");
const app=exp();
var bodyparser=require('body-parser');
const path=require('path');
app.use(bodyparser.urlencoded({extended:true}));
var multer = require('multer'); //module to upload files
var upload=multer({dest:'images/'})
var type=upload.single('img');


var mongoose=require("mongoose");
var url="mongodb://localhost/img"
var book=require("./model/book")
mongoose.connect(url,function(err)
{
    if(err)
    throw err;
    else
        console.log("DB Connected!");
})
app.get("/",function(req,res){
    res.render("home")
})
app.get("/new",function(req,res){
    res.render("newbook")
})


app.post('/upload',type,function(req,res){
    res.send("file uploaded successfully....")
    var b1 = new book();
    b1.name = req.body.title;
    b1.file = req.file.filename;
    b1.save((err)=>{
        if (err) throw err;
        else{
            console.log("Book added");
          
        }
    })
})

app.listen(8000,function(){
    console.log("Server thudangi makkale....")
});
app.get("/view/:image",function(req,res){
    res.sendFile(__dirname+'/images/'+req.params.image)
})

app.get("/view",function(req,res){
    book.find({},function(err,result){
        if(err)
        throw err;
        else
        console.log(result)
       
      res.render('view',{bookdata:result})
    })
   
})
app.set("view engine","ejs");