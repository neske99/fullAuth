import jsonwebtoken from 'jsonwebtoken'



function sign(user:string){
    const secretkey=process.env.SECRET_ACCESS_KEY;
    if(secretkey==undefined)
        throw new Error("SECRET_ACCESS_KEY is undefined")

    return jsonwebtoken.sign(user, secretkey)
}

function validate(token:string){
    const secretkey=process.env.SECRET_ACCESS_KEY;
    if(secretkey==undefined)
        throw new Error("SECRET_ACCESS_KEY is undefined")

    return jsonwebtoken.verify(token,secretkey);
}


export {sign,validate}