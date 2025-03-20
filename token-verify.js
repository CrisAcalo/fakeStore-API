const jwt = require('jsonwebtoken');

const secret = 'mysecretsshhh';
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEsInJvbGUiOiJjdXN0b21lciIsImlhdCI6MTc0MjQzMjg1Mn0.d8wDb0FL_MpecQUJZm8Mw_q8GP1cT_omyg_3PtLQRGo';


function verifyToken(token, secret) {
    return jwt.verify(token, secret)
}

const payload = verifyToken(token, secret);
console.log(payload);