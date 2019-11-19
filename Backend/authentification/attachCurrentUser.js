module.exports = function(req, res, next) {
    const decodedTokenData = req.tokenData;
    const userId =  decodedTokenData.id;

    function callback(error,data) {
        if (error){
            return res.status(401).end(error.sqlMessage);
        }
        else {
            req.currentUser = data[0];
            if(req.currentUser)
                return next();
            else
                return res.status(401).end('User not found');
        }
    }
    db.get_client_by_phone(info.phone_number,callback);
}
//
// module.exports = function(req, res, next) {
//     const decodedTokenData = req.tokenData;
//     const userId =  decodedTokenData.id;
//
//     function callback(error,data) {
//         if (error){
//             return res.status(401).end(error.sqlMessage);
//         }
//         else {
//             req.currentUser = data[0];
//             if(req.currentUser)
//                 return next();
//             else
//                 return res.status(401).end('User not found');
//         }
//     }
//     db.get_client_by_phone(info.phone_number,callback);
// }