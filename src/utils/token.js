const crypto = require('crypto');
const base64url = require('base64url');
const token = size => base64url(crypto.randomBytes(size));

export default token;
