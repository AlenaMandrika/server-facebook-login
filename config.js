module.exports = {
  port: process.env.port || process.env.PORT || '3005',
  mongoUrl: process.env.MONGODB_URI || `mongodb://username:123@ds255588.mlab.com:55588/users`
}
