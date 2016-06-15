angular.module('starter.UserInfoService',['angularSoap',
    'starter.globalservice','ngCordova'])
.factory("UserInfoService", ['$soap',
  '$cordovaSQLite',
  'GlobalSetting',
  function($soap,$cordovaSQLite,GlobalSetting){
    var DBNameUserInfo = "USER_INFO";
    var DBNameLoginInfo = "LOGIN_INFO";

    var userInfo;

     return {

       doLogin: function (userName, pwd) {
         return $soap.post(GlobalSetting.getUrlUser(),
           "Login",
           {UserName: userName, Pswd: pwd});
       },
       getEntity : function(serverId){
        var sql = "select * from "
          +DBNameUserInfo
          +" where SERVER_ID = "
          + serverId;

         return $cordovaSQLite.execute(db,sql,[]).then(function (res) {
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
           +" (SERVER_ID ," + // 1: ServerId 服务端Id
           "USER_NAME ," + // 2: UserName 用户名
           "PSWD ," + // 3: Pswd 姓名
           "USER_TYPE ," + // 4: UserType 用户类型
           "ROLE_IDS ," + // 5: RoleIds 角色
           "REAL_NAME ," + // 6: RealName 用户名
           "SEX," + // 7: Sex 性别：1 男
           "DUTY," + // 8: Duty 职位
           "DEPT_ID," + // 9: DeptId 职位编号
           "DEPT_NAME," + // 10: DeptName 部门名称
           "DEPT_IDS," + // 11: DeptIds 部门编号组织
           "DEPT_NAMES," + // 12: DeptNames 部门名称组织
           "POSTAL_CODE," + // 13: PostalCode
           "EMAIL," + // 14: Email 邮箱
           "MOBILE_PHONE," + // 15: MobilePhone 手机
           "TEL," + // 16: Tel 电话
           "UPDATE_TIME," + // 17: UpdateTime 更新时间
           "TOKEN)"+// 18: Token Token
           " VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)";

         $cordovaSQLite.execute(db,insertSql,[]).then(function (res) {
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
           "UPDATE_TIME = "+userInfoEntity.UpdateTime+"，" + // 17: UpdateTime 更新时间
           "TOKEN = "+userInfoEntity.Token +// 18: Token Token
           " where LOCAL_ID = " +
           userInfoEntity.LOCAL_ID;
         $cordovaSQLite.execute(db,updateSql,[]).then(function (res) {
         });
       },
       insertOrUpdate:function(userInfoEntity){
         var entity = this.getEntity(userInfoEntity.ServerId);
         if(typeof(entity) != "undefined" && entity.ServerId > 0){
           userInfoEntity.LOCAL_ID = entity.LOCAL_ID;
           this.updata(userInfoEntity);
         }else{
           this.insert(userInfoEntity);
         }
       },

       getEntityLoginById : function(id){
         var sql = "select * from "
           +DBNameLoginInfo
           + " where SERVER_ID = " +
           id;

         return $cordovaSQLite.execute(db,sql,[]).then(function (res) {
           var loginInfo = null;
           if(res.rows.length > 0) {
             loginInfo=res.rows.item(0);
           }
           return loginInfo;
         });
       },
       getEntityLogin : function(){
         var sql = "select * from "
           +DBNameLoginInfo
           +" order by LOGIN_TIME desc limit 0,1 ";

         return $cordovaSQLite.execute(db,sql,[]).then(function (res) {
           var loginInfo = null;
           if(res.rows.length > 0) {
             loginInfo=res.rows.item(0);
           }
           return loginInfo;
         });
       },
       insertUserLogin : function (userLoginInfoEntity){
         var insertSql = "INSERT INTO "
           +DBNameLoginInfo
           +" (SERVER_ID ," + // 1: ServerId 服务端Id
           "USER_NAME ," + // 2: UserName 用户名
           "PSWD ," + // 3: Pswd 姓名
           "PSWD_LEN ," + // 3: Pswd
           "AUTO_LOGIN ," + // 4: UserType 用户类型
           "LOGIN_TIME)"+//
           " VALUES (?,?,?,?,?,"+Date.parse(new Date())+")";

         $cordovaSQLite.execute(db,insertSql,[]).then(function (res) {
         });
       },
       updateLoginUser : function(){
         var sql = "UPDATE "
           +DBNameLoginInfo
           +" SET "
           " SERVER_ID = " + userLoginInfoEntity.ServerId  + // 1: ServerId 服务端Id
           ",USER_NAME  = " + userLoginInfoEntity.UserName + // 2: UserName 用户名
           ",PSWD  = " + userLoginInfoEntity.Pswd + // 3: Pswd 姓名
           ",PSWD_LEN  = " + userLoginInfoEntity.Pswd.length + // 3: Pswd
           ",AUTO_LOGIN  = " + userLoginInfoEntity.AutoLogin + // 4: UserType 用户类型
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
       }


     };
}]);
