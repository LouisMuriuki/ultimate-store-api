import jwt from "jsonwebtoken";

const verifyToken = (req, res, next) => {
  const authHeader = req.headers.token;

  if (!authHeader) {
    return res.status(401).json("You are not authenticated");
  }

  const token=authHeader.split(" ")[1]

  jwt.verify(token, process.env.JWTSECRET, (err, user) => {
    if (err) {
      return res.status(403).json("Token is not valid");
    }
    console.log(user)
    req.user = user;
    next();
  });
};

const verifyTokenandAuthorization=(req,res,next)=>{
    verifyToken(req,res,()=>{
        if(req.user.id===req.params.id||req.user.isAdmin){
            next()
        }else{
            res.status(403).json("Unauthorised")
        }
    })

}
const verifyTokenandAdmin=(req,res,next)=>{
    verifyToken(req,res,()=>{
        if(req.user.isAdmin){
            next()
        }else{
            res.status(403).json("Unauthorised")
        }
    })

}

export {verifyToken,verifyTokenandAuthorization,verifyTokenandAdmin};
