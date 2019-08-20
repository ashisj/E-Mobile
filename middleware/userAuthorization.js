module.exports = (req, res, next) => {
    try{
        if(req.user){
            next();
        } else {
            throw new Error();
        }
    }catch(error){
        return next({
            status: 401,
            message: 'Authorization Failed' 
        })
    }
}