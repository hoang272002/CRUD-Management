const axios = require('axios')

exports.loginRoute = (req, res)=>{
    res.render('login')
}
exports.homeRoutes = (req,res)=>{
    axios.get('http://localhost:3000/api/users')
    .then(function(response){
        res.render('index',{users : response.data})
    })
    .catch(err=>{
        res.send(err)
    })
}

exports.addUserRoutes = (req,res)=>{
    res.render('add_user')
}

exports.updateUserRoutes = (req,res)=>{
    axios.get('http://localhost:3000/api/users', {params: {id : req.query.id}})
    .then(function(userData){
        res.render("update_user",{user : userData.data})
    })
    .catch(err=>{
        res.send(err)
    })
    
}