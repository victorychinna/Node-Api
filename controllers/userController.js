const connection = require("../connection.js");
var md5 = require('md5');
/**
 * Get all users list
 * @return array of users 
 * */
exports.getAllUsers = function(req, res){
   // res.json({"name":"test"});

    try{

            connection.query(`SELECT * FROM user`, function (err, result, fields) {
              if (err) throw err
              result.sort((a,b) => (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0)); 
              res.send(JSON.stringify(result));
              
            });
    }
    catch(e)
    {   console.log(e);
        res.send({status:"fail", message:"Something went wrong try again..!"})
    }
    
}

/**
 * Get user by id
 * @param userId
 * @return  user object
 * */
exports.getUserById = function(req, res){
           if(req.params.userId!='' && req.params.userId!='undefined' )
           {
            userId=req.params.userId;
   
                    connection.query(`SELECT * FROM user where id=`+userId, function (err, result, fields) {
                    
                        if (err) {
                            res.send({status:"fail", message:"Something went wrong try again..!"});
                        }
                       if(result.length>0)
                       {
                        res.send(JSON.stringify(result[0]));
                       }
                       else
                       {
                        res.send({"status":"success", "message":"Invalid userId"});
                       }
                       
                      });
                  
           }
           else
           {
            res.send({status:"fail", message:"Invalid params data"})
           }
    
}

/**
 * Login end point
 * @param email  string
 *  @param password  string
 * @return  user object
 * */
exports.userLogin= function(req, res){
    try{
           if(req.body.email!='' && req.body.password!='undefined' && req.body.password!='' && req.body.email!='undefined' )
           {
                      let  email=req.body.email;
                      let mdpassword=md5(req.body.password);
                    let query='SELECT name, email, role FROM user where email="'+email+ '" and password="'+mdpassword+'"';
                    connection.query(query, function (err, result, fields) {
                        if (err) {
                            res.send({status:"fail", message:"Something went wrong try again..!"});
                        }
                        else
                        {
                            if(result.length>0)
                            {
                             res.send({"status":"success", "user_data":result[0]});
                            }
                            else
                            {
                             res.send({"status":"fail", "message":"That username/password is incorrect. Try again!"});
                            }
                        }
                    
                      });
               
           }
           else
           {
            res.send({status:"fail", message:"Invalid params data"})
           }
           
    }
    catch(e)
    {   console.log(e);
        res.send({status:"fail", message:"Something went wrong try again..!"})
    }
    
}
