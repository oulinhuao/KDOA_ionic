angular.module('starter.databaseservice', ['ngCordova'])
	.factory("DBHelper", ['$cordovaSQLite',
		function($cordovaSQLite) {

			return {
				opendb: function(platform) {
					var db = null; // database handle
          if(platform === "Android"){
            // Works on android but not in iOS
            db = $cordovaSQLite.openDB({ name: "KDOAIonic.db", iosDatabaseLocation:'default'});
          } else if(platform === "iOS"){
            // Works on iOS
            db = window.sqlitePlugin.openDatabase({ name: "KDOAIonic.db", location: 2, createFromLocation: 1});
          }
					return db;
				},
				closedb: function() {
					if (db != undefined)
						db.close();
				},
				createTable: function() {
					// USER_INFO:用户信息表
          var sql = "CREATE TABLE IF NOT EXISTS 'USER_INFO' (" + //
            "'LOCAL_ID' INTEGER PRIMARY KEY AUTOINCREMENT ," + // 0: LocalId 本地Id
            "'SERVER_ID' INTEGER NOT NULL ," + // 1: ServerId 服务端Id
            "'USER_NAME' TEXT," + // 2: UserName 用户名
            "'PSWD' TEXT," + // 3: Pswd 姓名
            "'USER_TYPE' INTEGER ," + // 4: UserType 用户类型
            "'ROLE_IDS' INTEGER ," + // 5: RoleIds 角色
            "'REAL_NAME' TEXT," + // 6: RealName 用户名
            "'SEX' INTEGER ," + // 7: Sex 性别：1 男
            "'DUTY' TEXT," + // 8: Duty 职位
            "'DEPT_ID' INTEGER ," + // 9: DeptId 职位编号
            "'DEPT_NAME' TEXT," + // 10: DeptName 部门名称
            "'DEPT_IDS' TEXT," + // 11: DeptIds 部门编号组织
            "'DEPT_NAMES' TEXT," + // 12: DeptNames 部门名称组织
            "'POSTAL_CODE' TEXT," + // 13: PostalCode
            "'EMAIL' TEXT," + // 14: Email 邮箱
            "'MOBILE_PHONE' TEXT," + // 15: MobilePhone 手机
            "'TEL' TEXT," + // 16: Tel 电话
            "'UPDATE_TIME' INTEGER ," + // 17: UpdateTime 更新时间
            "'TOKEN' TEXT);";// 18: Token Token
					$cordovaSQLite.execute(db,sql );

          //LOGIN_INFO 登录信息
          sql = "CREATE TABLE IF NOT EXISTS 'LOGIN_INFO' (" + //
            "'LOCAL_ID' INTEGER PRIMARY KEY AUTOINCREMENT ," + // 0: LocalId 本地Id
            "'SERVER_ID' INTEGER NOT NULL ," + // 1: ServerId 服务端Id
            "'USER_NAME' TEXT," + // 2: UserName 用户名
            "'PSWD' TEXT," + // 3: Pswd 姓名
            "'PSWD_LEN' INTEGER," + // Pswd 长度
            "'AUTO_LOGIN' TEXT," + // 4: AutoLogin 自动登录
            "'LOGIN_TIME' INTEGER NOT NULL)"; // 5: 上次登录时间
          $cordovaSQLite.execute(db,sql );


				},
				dropTable: function() {
          $cordovaSQLite.execute(db, "DROP TABLE 'LOGIN_INFO'");
          $cordovaSQLite.execute(db, "DROP TABLE 'USER_INFO'");

				}
			}
		}
	]);
