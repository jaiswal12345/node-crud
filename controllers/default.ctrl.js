defaultCtrl = {
    get:function(req,res){
        res.status(200);
        res.send("hello Express application");
    },
    health: function(req,res){
        health ={'status' :'up'};
        res.status(200);
        res.json(health);
    }
}
module.exports = defaultCtrl;