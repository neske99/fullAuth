import jsonwebtoken from 'jsonwebtoken'



function sign(user:string){
    const secretKey=process.env.SECRET_ACCESS_KEY;
    if(secretKey==undefined)
        throw new Error("SECRET_ACCESS_KEY is undefined")

    return jsonwebtoken.sign(user, secretKey)
}

function verifyToken(token:string){
    const secretKey=process.env.SECRET_ACCESS_KEY;
    if(secretKey==undefined)
        throw new Error("SECRET_ACCESS_KEY is undefined")

      try{
        const decoded=jsonwebtoken.verify(token,secretKey);
        return decoded;
      }catch(err){
        return undefined;
      }
}





export {sign,verifyToken}