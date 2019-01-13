module.exports = {
isNotAuthenticated  : (req, res, next) => {

if (req.isAuthenticated()) {

  //if(req.user){//it  work same as above
  // mean user already login go  to next mean you can go to ideas and add/ideas

      return next();
    } else {

      res.redirect('/');
    }

},

isAuthenticated :  (req, res, next) => {
  if (req.isAuthenticated()) {

    res.redirect('/dashboard');
  } else {
    return next();
  }
}





///////





}
