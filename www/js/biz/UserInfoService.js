angular.module('starter.UserInfoService',['angularSoap',
    'starter.globalservice','ngCordova'])
.factory("UserInfoService", ['$soap',
  '$cordovaSQLite',
  'GlobalSetting',
  function($soap,$cordovaSQLite,GlobalSetting){
    var DBNameUserInfo = "USER_INFO";
    var DBNameLoginInfo = "LOGIN_INFO";

     return scope = {
       doLogin: function (userName, pwd) {
         return $soap.post(GlobalSetting.getUrlUser(),
           "Login",
           {UserName: userName, Pswd: pwd});
       },
       getEntity : function(serverId,successCallback, failCallback){
        var sql = "SELECT * FROM "
          +DBNameUserInfo
          +" WHERE SERVER_ID = ?";
         $cordovaSQLite.execute(db,sql,[serverId]).then(function (res) {
           var entity = null;
           if(res.rows.length > 0) {
             entity=res.rows.item(0);
           }
           successCallback(entity);
         },failCallback);
       },
       insert : function (userInfoEntity){
         var insertSql = "INSERT INTO "
           +DBNameUserInfo
           +" (SERVER_ID,USER_NAME,PSWD,USER_TYPE,REAL_NAME,SEX,DUTY," + // 8: Duty 职位
           "DEPT_ID,DEPT_NAME,EMAIL,MOBILE_PHONE,TEL,UPDATE_TIME,TOKEN)"+// 18: Token Token
           " VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?)";

         $cordovaSQLite.execute(db,insertSql,[
           userInfoEntity.ServerId,
           userInfoEntity.UserName,
           userInfoEntity.Pswd,
           userInfoEntity.UserType,
           userInfoEntity.RealName,
           userInfoEntity.Sex,
           userInfoEntity.Duty,

           userInfoEntity.DeptId,
           userInfoEntity.DeptName,
           userInfoEntity.Email,
           userInfoEntity.MobilePhone,
           userInfoEntity.Tel,
           DateStringToLong(userInfoEntity.UpdateTime),
           userInfoEntity.Token
         ]);
       },
       updata : function(userInfoEntity){
         var updateSql = "update "
           +DBNameUserInfo
           +" set "
           +" SERVER_ID = ?,USER_NAME = ?,PSWD = ?,REAL_NAME = ?,"+
           "SEX = ?,DEPT_ID = ?,DEPT_NAME = ?,"+
           "EMAIL = ?,MOBILE_PHONE = ?,TEL = ?,UPDATE_TIME = ?,TOKEN = ?"+
           " where LOCAL_ID = ?";
         $cordovaSQLite.execute(db,updateSql,[
           userInfoEntity.ServerId,
           userInfoEntity.UserName,
           userInfoEntity.Pswd,
           userInfoEntity.RealName,
           userInfoEntity.Sex,
           userInfoEntity.DeptId,
           userInfoEntity.DeptName,
           userInfoEntity.Email,
           userInfoEntity.MobilePhone,
           userInfoEntity.Tel,
           DateStringToLong(userInfoEntity.UpdateTime),
           userInfoEntity.Token,
           userInfoEntity.LOCAL_ID]);
       },
       insertOrUpdate:function(userInfoEntity){
         scope.getEntity(userInfoEntity.ServerId,function(entity){
           if(null != entity && typeof(entity) != "undefined" && entity.SERVER_ID > 0){
             userInfoEntity.LOCAL_ID = entity.LOCAL_ID;
             scope.updata(userInfoEntity);
           }else{
             scope.insert(userInfoEntity);
           }
         });
       },

       getEntityLoginById : function(id,successCallback, failCallback){
         var sql = "select * from "
           +DBNameLoginInfo
           + " where SERVER_ID = ?";

         $cordovaSQLite.execute(db,sql,[id]).then(function (res) {
           var loginInfo = null;
           if(res.rows.length > 0) {
             loginInfo=res.rows.item(0);
           }
           successCallback(loginInfo);
         },failCallback);
       },
       getEntityLastLogin : function(successCallback, failCallback){
         var sql = "SELECT * FROM "
           +DBNameLoginInfo;
           +" ORDER BY LOGIN_TIME DESC LIMIT 0,1 ";

         $cordovaSQLite.execute(db,sql,[]).then(function(res){
           var loginInfo = null;
           if(res.rows.length > 0) {
             loginInfo=res.rows.item(0);
           }
           successCallback(loginInfo);
         },failCallback);
       },
       insertUserLogin : function (userInfoEntity){
         var insertSql = "INSERT INTO "
           + DBNameLoginInfo
           +" (SERVER_ID,USER_NAME,PSWD,PSWD_LEN,AUTO_LOGIN,LOGIN_TIME)"+//
           " VALUES (?,?,?,?,?,?)";
         $cordovaSQLite.execute(db,insertSql,[
           userInfoEntity.ServerId,
           userInfoEntity.UserName,
           userInfoEntity.Pswd,
           userInfoEntity.Pswd.length,
           false,
           Date.parse(new Date())
         ]);
       },
       updateLoginUser : function(entity){
         if(!entity.AutoLogin){
           entity.AutoLogin = false;
         }
         var sql = "UPDATE " +
           DBNameLoginInfo +
           " SET " +
           " SERVER_ID = ?,USER_NAME = ?,PSWD = ?,PSWD_LEN = ?" +
           ",AUTO_LOGIN = ?,LOGIN_TIME = ?" +
           " where LOCAL_ID = ?";
         $cordovaSQLite.execute(db,sql,[
           entity.ServerId,
           entity.UserName,
           entity.Pswd,
           entity.Pswd.length,
           entity.AutoLogin,
           Date.parse(new Date()),
           entity.LOCAL_ID]);
       },
       insertOrUpdateLoginUser:function(userInfoEntity){
         scope.getEntityLoginById(userInfoEntity.ServerId,function(entity){
           if(entity != null && typeof(entity) != "undefined" && entity.SERVER_ID > 0){
             userInfoEntity.LOCAL_ID = entity.LOCAL_ID;
              scope.updateLoginUser(userInfoEntity)
           }else{
             scope.insertUserLogin(userInfoEntity);
           }
         });
       },
       loginSuccess:function(info,pswd){
         scope.insertOrUpdate(info);
         info.Pswd = pswd;
         scope.insertOrUpdateLoginUser(info);
       }


     };
}]);
