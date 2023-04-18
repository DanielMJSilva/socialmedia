import jwt from "jsonwebtoken";

export const verifyToken = async (req, res, next) => {
    try {
        let token = req.header("Authorization");

        if(!token) {
            return res.status(403).send("Access Denied!");
        }
        //Bearer will be set on frontend 
        //and it will be removed from left side
        //and token will be placed after the space in the Bearer.
        if(token.startsWith("Bearer ")) {
            token = token.slice(7, token.length).trimLeft();
        }

        const verified = jwt.verify(token, process.env.JWT_SECRET);
        req.user = verified
        next();
    } catch(err) {
        res.status(500).json({ error: err.message })
    }
}