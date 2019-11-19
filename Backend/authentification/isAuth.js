var jwt = require('express-jwt');

const getTokenFromHeader = (req) => {
    if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
        return req.headers.authorization.split(' ')[1];

    }
}

module.exports = jwt({
    secret: 'secret_$rsf@fsdioensa24sg,2',
    userProperty: 'token', // Здесь следующее промежуточное ПО сможет найти то, что было закодировано в generateToken -> 'req.token'
    getToken: getTokenFromHeader, // Функция для получения токена аутентификации из запроса
})