var express = require('express');
const UserModel = require('../model/UserModel');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

router.post('/create',async(req,res)=>{
  try {
    let newUser = await new UserModel(req.body).save();
    return res.send(newUser).status(201);
  } catch (err) {
    return res.send(err.message).status(500);
  }
});

router.get('/display',async(req, res)=>{
  try {
    let users = await UserModel.find();
    return res.send(users).status(200);
  } catch (err) {
    return res.send(err.message).status(500);
  }
});

router.put('/edit/:userId', async(req, res)=>{
  try {
    let user = await UserModel.findOneAndUpdate({_id: req.params.userId},{$set: req.body},{new:true});
    return res.send(user).status(500);
  } catch (err) {
    return res.send(err.message).status(500);
  }
});

router.delete('/delete/:userId', async(req, res)=>{
  try {
    return res.sendStatus(200);
  } catch (err) {
    return res.send(err.message).status(500);
  }
})

module.exports = router;
