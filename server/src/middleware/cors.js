const enableCORSMiddleware = (req,res,next) => {
    // You could use * instead of the url below to allow any origin,
    // but be careful, you're opening yourself up to all sorts of things!
    res.setHeader('Access-Control-Allow-Origin',  "http://localhost:8080");
    next()
}
module.exports = {enableCORSMiddleware};
/*
server.use(enableCORSMiddleware);*/
