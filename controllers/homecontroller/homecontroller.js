module.exports.home = function(req, res){
    return res.render('home/home', {
        title: "Home"
    });
}