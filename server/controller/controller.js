var Userdb = require('../model/model')

//create and save new user
exports.create = (req, res)=>{
    if(!req.body){
        return res.status(400).send({message : "Content can not be emty"});
       
    }

    Userdb.findOne({ email: req.body.email })
    .then(existEmail=>{
        if(existEmail){
            return res.status(400).send({ message: "Email already exists" });
        }
        else{
            const user = new Userdb({
                name : req.body.name,
                email:req.body.email,
                gender:req.body.gender,
                password:req.body.password,
                status: req.body.status,
            })
        
            user
            .save(user)
            .then(data=>{
                return res.status(201).send({message: "User inserted successfully!!"})
            })
            .catch(err => {
                return res.status(500).send({
                    message: err.message || "some error occurred while creating"
                })
            })
        }
    })
   
}

// retrieve and return all/single user
exports.find = (req, res)=>{
    if(req.query.id){
        const id = req.query.id;
        Userdb.findById(id)
        .then(data=>{
            if(!data){
                return res.status(404).send({message: `Not found userid ${id}` })
            }
            else{
                return res.send(data)
            }
        })
        .catch(err=>{
            return res.status(500).send({message : err.message || "some error occurred while finding"})
        })
    }
    else{
        Userdb.find()
        .then(data=> {
            console.log(data)
            return res.send(data)
        })
        .catch(err=>{
            
            return res.status(500).send({message : err.message || "some error occurred while finding"})
        })
    }
   
}

//update user by userid
exports.update = (req, res)=>{
    if(!req.body){
        return res.status(400).send({message : "data to update can not be emty"})
       
    }

    const id = req.params.id;
    Userdb.findByIdAndUpdate(id,req.body,{useFindAndModify: false})
    .then(data=>{
        if(!data){
            return res.status(404).send({message : `Cannot update userid: ${id} .Maybe cannot find!`})
        }
        else{return res.status(201).send({message: "Update success"})}
    })
    .catch(err=>{
        return res.status(500).send({message : err.message || "some error occurred while update"})
    })
}

// delete user
exports.delete = (req, res)=>{
    const id = req.params.id
    Userdb.findByIdAndDelete(id,req.body,{useFindAndModify: false})
    .then(data=>{
        if(!data){
            return res.status(404).send({message : `Cannot delete userid: ${id} .Maybe cannot find!`})
        }
        else{return res.send({message : "delete success"})}
    })
    .catch(err=>{
        return res.status(500).send({message : err.message || "some error occurred while delete"})
    })
}

exports.login = (req, res) => {
    if (!req.body.password || !req.body.email) {
        return res.status(400).send({ message: "Username or password cannot be empty" });
    }

    const email = req.body.email;
    const password = req.body.password;
    Userdb.findOne({ email: email, password: password })
        .then(data => {
            if (!data) {
                return res.status(401).send({ message: "Not found user with given email and password" });
            } else {
               
                return res.status(200).redirect('/'); // Chuyển hướng về trang chủ nếu đăng nhập thành công
            }
        })
        .catch(err => {
            res.status(500).send({ message: err.message || "Some error occurred while finding by email and password" });
        });
};