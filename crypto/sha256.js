const crypto = require('crypto');

const secret = 'dha%j24sdj$k53*3h2#dsj$jsdf';
				 

var hash = crypto.createHmac('sha256', secret)
                   .update('admin')
                   .digest('hex');

console.log(hash);