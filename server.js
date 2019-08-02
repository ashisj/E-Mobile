const app = require('./app');
const port = process.env.PORT || 3000;

app.listen(port,(err)=>{
    if(err){
        console.log("Error while connecting to the server");
    }
    console.log(`server connected to the port ${port}`);
});