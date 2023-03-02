var userService = require('./userServices');

var createUserControllerFunc = async (req, res) =>  {
    try {
    console.log(req.body);
    var status = await userService.createUserDBService(req.body);
    console.log(status);

    if (status) {
        res.send({ "status": true, "message": "Usuario creado" });
    } else {
        res.send({ "status": false, "message": "Error creando usuario" });
    }
    }
    catch(err) {
        console.log(err);
    }
}

var loginUserControllerFunc = async (req, res) => {
    var result = null;
    try {
        result = await userService.loginuserDBService(req.body);
        if (result.status) {
            res.send({ "status": true, "message": result.msg });
        } else {
            res.send({ "status": false, "message": result.msg });
        }

    } catch (error) {
        console.log(error);
        res.send({ "status": false, "message": error.msg });
    }
}

var searchUserControllerFunc = async (req, res) => {
    var result=null;
    try {
        result = await userService.SearchuserDBService(req.body);
    if (result.status) {
        res.send({ "status": true, "message": result.msg });
    } else {
        res.send({ "status": false, "message": result.msg});
    }
    }
    catch(err) {
        console.log(err);
        res.send({ "status": false, "message": error.msg });
    }

}

var deleteUserControllerFunc = async (req, res) => {
    var result=null;
    try{
        result = await userService.DeleteuserDBService(req.body);
    if (result.status) {
        res.send({ "status": true, "message": result.msg });
    } else {
        res.send({ "status": false, "message": result.msg});
    }
        


        
    }
    catch(err) {
        console.log(err);
    }
}

var updateUserControllerFunc = async (req, res) =>  {
    try {
    console.log(req.body);
    var status = await userService.UpdateuserDBService(req.body);
    console.log(status);

    if (status) {
        res.send({ "status": true, "message": "Usuario actualisado" });
    } else {
        res.send({ "status": false, "message": "Error al actualisar el usuario" });
    }
    }
    catch(err) {
        console.log(err);
    }
}

module.exports = { createUserControllerFunc, loginUserControllerFunc, searchUserControllerFunc, deleteUserControllerFunc, updateUserControllerFunc};