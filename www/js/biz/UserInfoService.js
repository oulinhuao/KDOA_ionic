angular.module('starter.UserInfoService',['angularSoap',
    'starter.globalservice','ngCordova'])
.factory("UserInfoService", ['$soap',
  '$cordovaSQLite',
  'GlobalSetting',
  function($soap,$cordovaSQLite,GlobalSetting){
    var DBNameUserInfo = "USER_INFO";
    var DBNameLoginInfo = "LOGIN_INFO";

     return {

       doLogin: function (userName, pwd) {
         return $soap.post(GlobalSetting.getUrlUser(),
           "Login",
           {UserName: userName, Pswd: pwd});
       },
       getEntity : function(serverId){
        var sql = "SELECT * FROM "
          +DBNameUserInfo
          +" WHERE SERVER_ID = ?";

         return $cordovaSQLite.execute(db,sql,[serverId]).then(function (res) {
           var userInfo = null;
           if(res.rows.length > 0) {
             userInfo=res.rows.item(0);
           }
           return userInfo;
         });
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
         ]).then(function (res) {
         });
       },
       updata : function(userInfoEntity){
         var updateSql = "update "
           +DBNameUserInfo
           +" set "
           +" SERVER_ID = "+userInfoEntity.ServerId+"," + // 1: ServerId 服务端Id
           "USER_NAME = "+userInfoEntity.UserName+"," + // 2: UserName 用户名
           "PSWD = "+userInfoEntity.Pswd+"," + // 3: Pswd 姓名
           "REAL_NAME = "+userInfoEntity.RealName+"," + // 6: RealName 用户名
           "REAL_NAME_PY = "+userInfoEntity.RealNamePY+"," + // 6: RealName 用户名
           "SEX = "+userInfoEntity.Sex+"," + // 7: Sex 性别：1 男
           "DEPT_ID = "+userInfoEntity.DeptId+"，" + // 11: DeptIds 部门编号组织
           "DEPT_NAME = "+userInfoEntity.DeptName+"，" + // 10: DeptName 部门名称
           "EMAIL = "+userInfoEntity.Email+"，" + // 14: Email 邮箱
           "MOBILE_PHONE = "+userInfoEntity.MobilePhone+"，" + // 15: MobilePhone 手机
           "TEL = "+userInfoEntity.Tel+"，" + // 16: Tel 电话
           "UPDATE_TIME = "+DateStringToLong(userInfoEntity.UpdateTime)+"，" + // 17: UpdateTime 更新时间
           "TOKEN = "+userInfoEntity.Token +// 18: Token Token
           " where LOCAL_ID = ?";
         $cordovaSQLite.execute(db,updateSql,[userInfoEntity.LOCAL_ID]).then(function (res) {
         });
       },
       insertOrUpdate:function(userInfoEntity){
         var entity = this.getEntity(userInfoEntity.ServerId);
         if(null != entity && typeof(entity) != "undefined" && entity.ServerId > 0){
           userInfoEntity.LOCAL_ID = entity.LOCAL_ID;
           this.updata(userInfoEntity);
         }else{
           this.insert(userInfoEntity);
         }
       },

       getEntityLoginById : function(id){
         var sql = "select * from "
           +DBNameLoginInfo
           + " where SERVER_ID = ?";

         return $cordovaSQLite.execute(db,sql,[id]).then(function (res) {
           var loginInfo = null;
           if(res.rows.length > 0) {
             loginInfo=res.rows.item(0);
           }
           return loginInfo;
         });
       },
       getEntityLastLogin : function(){
         var sql = "SELECT * FROM "
           +DBNameLoginInfo;
           +" ORDER BY LOGIN_TIME DESC LIMIT 0,1 ";

         return $cordovaSQLite.execute(db,sql,[]).then(function (res) {
           var loginInfo = null;
           alert(JSON.stringify(res.rows.item(0)).PSWD);

           if(res.rows.length > 0) {
             loginInfo=res.rows.item(0);
           }
           return loginInfo;
         });
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
         ]).then(function (res) {

         });
       },
       updateLoginUser : function(){
         var sql = "UPDATE "
           +DBNameLoginInfo
           +" SET "
           " SERVER_ID = " + userInfoEntity.ServerId  + // 1: ServerId 服务端Id
           ",USER_NAME  = " + userInfoEntity.UserName + // 2: UserName 用户名
           ",PSWD  = " + userInfoEntity.Pswd + // 3: Pswd 姓名
           ",PSWD_LEN  = " + userInfoEntity.Pswd.length + // 3: Pswd
           ",AUTO_LOGIN  = " + userInfoEntity.AutoLogin + // 4: UserType 用户类型
           ",LOGIN_TIME = " + Date.parse(new Date());

         $cordovaSQLite.execute(db,sql,[]).then(function (res) {
         });
       },
       insertOrUpdateLoginUser:function(userInfoEntity){
         var entity = this.getEntityLoginById(userInfoEntity.ServerId);
         if(typeof(entity) != "undefined" && entity.ServerId > 0){
           userInfoEntity.LOCAL_ID = entity.LOCAL_ID;
           this.updateLoginUser(userInfoEntity);
         }else{
           this.insertUserLogin(userInfoEntity);
         }
       },
       loginSuccess:function(info,pswd){
         this.insertOrUpdate(info);
         info.Pswd = pswd;
         this.insertOrUpdateLoginUser(info);
       }


     };
}]);
