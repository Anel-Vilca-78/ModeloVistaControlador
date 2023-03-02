var userModel = require('./userModel');
var key = 'somekey234567884456753456';
var encryptor = require('simple-encryptor')(key);

module.exports.createUserDBService = (userDetails) => {

   return new Promise(function myFn(resolve, reject) {
       var userModelData = new userModel();

       userModelData.firstname = userDetails.firstname;
       userModelData.lastname = userDetails.lastname;
       userModelData.email = userDetails.email;
       userModelData.password = userDetails.password;
       var encrypted = encryptor.encrypt(userDetails.password);
       userModelData.password = encrypted;

       userModelData.save(function resultHandle(error, result) {

           if (error) {
               resolve(false);
           } else {
               resolve(true);
           }
       });
   });
}

module.exports.loginuserDBService = (userDetails)=>  {
   return new Promise(function myFn(resolve, reject)  {
      userModel.findOne({ email: userDetails.email},function getresult(errorvalue, result) {
         if(errorvalue) {
            reject({status: false, msg: "Datos Invalidos"});
         }
         else {
            if(result !=undefined &&  result !=null) {
               var decrypted = encryptor.decrypt(result.password);

               if(decrypted== userDetails.password) {
                  resolve({status: true,msg: "Usuario Validado"});
               }
               else {
                  reject({status: false,msg: "Falla en validacion de usuario"});
               }
            }
            else {
               reject({status: false,msg: "Detalles de usuario invalido"});
            }
         }
      });
   });
}

module.exports.SearchuserDBService = (userDetails)=>  {
   return new Promise(function myFn(resolve, reject)  {
      userModel.findOne({ email: userDetails.email},function getresult(errorvalue, result) {
         if(errorvalue) {
            reject({status: false, msg: "Datos inválidos"});
         }
         else {
            if(result !=undefined &&  result !=null) {

               if(result.email == userDetails.email) {
                  resolve({status: true,msg: "El usuario si existe"});
               }
               else {
                  reject({status: false,msg: "Falla en búsqueda de usuario"});
               }
            }
            else {
               //resolve(false);
               resolve({status: false,msg: "El usuario no existe"});
               //reject({status: false,msg: "El usuario no existe"});
            }
         }
      });
   });
}
module.exports.DeleteuserDBService = (userDetails)=>  {

   return new Promise(function myFn(resolve, reject)  {
      userModel.findOneAndDelete({ email: userDetails.email},function getresult(errorvalue, result) {
         if(errorvalue) {
            reject({status: false, msg: "Datos inválidos"});
         }
         else {
            if(result !=undefined &&  result !=null) {

               if(result.email == userDetails.email) {
                  resolve({status: true,msg: "Usuario eliminado correctamente"});
               }
               else {
                  reject({status: false,msg: "Falla al eliminar el usuario"});
               }
            }
            else {
               //resolve(false);
               resolve({status: false,msg: "El usuario no existe"});
               //reject({status: false,msg: "El usuario no existe"});
            }
         }
      });
   });
}

module.exports.UpdateuserDBService = (userDetails)=>  {
   return new Promise(function myFn(resolve)  {
      userModel.findOneAndUpdate(userDetails.email,{
         $set:{
            firstname:userDetails.firstname,
            lastname:userDetails.lastname,
            password:userDetails.password
         }
      },
      (err) =>{
         if (err){
            resolve(false);
         }else{
            resolve(true);
         }
      }
      );
   });
}