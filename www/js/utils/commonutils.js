angular.module('starter.commonutils', ['ngCordova'])

.factory("CommonUtils",['$cordovaFile', function($cordovaFile){
	return {
    /**
     * 时间戳格式化函数
     * @param  {string} format    格式
     * @param  {int}    timestamp 要格式化的时间 默认为当前时间
     * @return {string}           格式化的时间字符串
     * date('Y-m-d','1350052653');//很方便的将时间戳转换成了2012-10-11
     * date('Y-m-d H:i:s.u','1350052653');//得到的结果是2012-10-12 22:37:33.123
     */
    convertLongToString: function(format, timestamp){
      var a, jsdate=((timestamp) ? new Date(timestamp) : new Date());
      var pad = function(n, c){
        if((n = n + "").length < c){
          return new Array(++c - n.length).join("0") + n;
        } else {
          return n;
        }
      };
      var txt_weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
      var txt_ordin = {1:"st", 2:"nd", 3:"rd", 21:"st", 22:"nd", 23:"rd", 31:"st"};
      var txt_months = ["", "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
      var f = {
        // Day
        d: function(){return pad(f.j(), 2)},
        D: function(){return f.l().substr(0,3)},
        j: function(){return jsdate.getDate()},
        l: function(){return txt_weekdays[f.w()]},
        N: function(){return f.w() + 1},
        S: function(){return txt_ordin[f.j()] ? txt_ordin[f.j()] : 'th'},
        w: function(){return jsdate.getDay()},
        z: function(){return (jsdate - new Date(jsdate.getFullYear() + "/1/1")) / 864e5 >> 0},

        // Week
        W: function(){
          var a = f.z(), b = 364 + f.L() - a;
          var nd2, nd = (new Date(jsdate.getFullYear() + "/1/1").getDay() || 7) - 1;
          if(b <= 2 && ((jsdate.getDay() || 7) - 1) <= 2 - b){
            return 1;
          } else{
            if(a <= 2 && nd >= 4 && a >= (6 - nd)){
              nd2 = new Date(jsdate.getFullYear() - 1 + "/12/31");
              return date("W", Math.round(nd2.getTime()/1000));
            } else{
              return (1 + (nd <= 3 ? ((a + nd) / 7) : (a - (7 - nd)) / 7) >> 0);
            }
          }
        },

        // Month
        F: function(){return txt_months[f.n()]},
        m: function(){return pad(f.n(), 2)},
        M: function(){return f.F().substr(0,3)},
        n: function(){return jsdate.getMonth() + 1},
        t: function(){
          var n;
          if( (n = jsdate.getMonth() + 1) == 2 ){
            return 28 + f.L();
          } else{
            if( n & 1 && n < 8 || !(n & 1) && n > 7 ){
              return 31;
            } else{
              return 30;
            }
          }
        },

        // Year
        L: function(){var y = f.Y();return (!(y & 3) && (y % 1e2 || !(y % 4e2))) ? 1 : 0},
        //o not supported yet
        Y: function(){return jsdate.getFullYear()},
        y: function(){return (jsdate.getFullYear() + "").slice(2)},

        // Time
        a: function(){return jsdate.getHours() > 11 ? "pm" : "am"},
        A: function(){return f.a().toUpperCase()},
        B: function(){
          // peter paul koch:
          var off = (jsdate.getTimezoneOffset() + 60)*60;
          var theSeconds = (jsdate.getHours() * 3600) + (jsdate.getMinutes() * 60) + jsdate.getSeconds() + off;
          var beat = Math.floor(theSeconds/86.4);
          if (beat > 1000) beat -= 1000;
          if (beat < 0) beat += 1000;
          if ((String(beat)).length == 1) beat = "00"+beat;
          if ((String(beat)).length == 2) beat = "0"+beat;
          return beat;
        },
        g: function(){return jsdate.getHours() % 12 || 12},
        G: function(){return jsdate.getHours()},
        h: function(){return pad(f.g(), 2)},
        H: function(){return pad(jsdate.getHours(), 2)},
        i: function(){return pad(jsdate.getMinutes(), 2)},
        s: function(){return pad(jsdate.getSeconds(), 2)},
        u: function(){return pad(jsdate.getMilliseconds(),3)},

        // Timezone
        //e not supported yet
        //I not supported yet
        O: function(){
          var t = pad(Math.abs(jsdate.getTimezoneOffset()/60*100), 4);
          if (jsdate.getTimezoneOffset() > 0) t = "-" + t; else t = "+" + t;
          return t;
        },
        P: function(){var O = f.O();return (O.substr(0, 3) + ":" + O.substr(3, 2))},
        //T not supported yet
        //Z not supported yet

        // Full Date/Time
        c: function(){return f.Y() + "-" + f.m() + "-" + f.d() + "T" + f.h() + ":" + f.i() + ":" + f.s() + f.P()},
        //r not supported yet
        U: function(){return Math.round(jsdate.getTime()/1000)}
      };

      var reg = new RegExp("[\]?([a-zA-Z])","g");
      return format.replace(reg, function(t, s){
        if( t!=s ){
          // escaped
          ret = s;
        } else if( f[s] ){
          // a date function exists
          ret = f[s]();
        } else{
          // nothing special
          ret = s;
        }
        return ret;
      });
    },
    // 获取总页数
    getPageCount: function(total, pageSize){
      var pageCount = 1;
      if(total > pageSize){
        pageCount = total / pageSize;
        var remain = total % pageSize;
        if(remain>0){
          pageCount++;
        }
      }
      return pageCount;
    },
    /**
     * 获取文件名
     * @param source
     * @returns {*}
     */
    getFileName: function(source){
      var fileName = null;
      if(source!=null && source!=undefined && source.length>0){
        if(source.indexOf("/")<0){
          fileName = source;
        }else{
          var p = source.lastIndexOf('/');
          if ((p > -1) && (p < (source.length))) {
            fileName = source.substring(source.lastIndexOf("/") + 1);
          }
        }
      }
      return fileName;
    },
    /**
     * 递归创建目录
     * @param path     根目录
     * @param dir      文件夹名
     * @param success
     * @param fail
     */
    recurCreateDirectory: function(path, dir, success, fail){
      var self = this;
      if(dir.indexOf('/')>=0){
        var first = dir.substring(0,dir.indexOf('/'));
        var remain = dir.substring(dir.indexOf('/')+1);
        $cordovaFile.createDir(path, first, true).then(function(){
          self.recurCreateDirectory(path+'/'+first, remain, success, fail);
        }, fail);
      } else {
        $cordovaFile.createDir(path, dir, true).then(success, fail);
      }
    },
    /**
     * 检查文件是否存在
     * @param path
     * @param callbackMethod
     */
    checkFileIsExist: function (path, callbackMethod) {
      if (path != undefined && path != null && path != "") {
        var root = path.substring(0, path.lastIndexOf("/") + 1);
        var name = path.substring(path.lastIndexOf("/") + 1);
        $cordovaFile.checkFile(root, name).then(function (res) {
          callbackMethod(true);
        }, function (err) {
          console.log(err.message);
          callbackMethod(false);
        });
      } else {
        callbackMethod(false);
      }
    },
    /**
     *
     * @param path
     * @param callbackMethod
         */
    checkDirIsExist: function(path, callbackMethod){
      if (path != undefined && path != null && path != "") {
        var root = path.substring(0, path.lastIndexOf("/") + 1);
        var name = path.substring(path.lastIndexOf("/") + 1);
        $cordovaFile.checkDir(root, name).then(function (res) {
          callbackMethod(true);
        }, function (err) {
          console.log(err.message);
          callbackMethod(false);
        });
      } else {
        callbackMethod(false);
      }
    },
    /**
     * js对象转为String
     * @param o
     * @returns {*}
     */
    jsobjToString: function(o){
      var r=[];
      if(typeof o=="string"){
        return "\""+o.replace(/([\'\"\\])/g,"\\$1").replace(/(\n)/g,"\\n").replace(/(\r)/g,"\\r").replace(/(\t)/g,"\\t")+"\"";
      }
      if(typeof o=="object"){
        if(!o.sort){
          for(var i in o){
            r.push(i+":"+obj2string(o[i]));
          }
          if(!!document.all&&!/^\n?function\s*toString\(\)\s*\{\n?\s*\[native code\]\n?\s*\}\n?\s*$/.test(o.toString)){
            r.push("toString:"+o.toString.toString());
          }
          r="{"+r.join()+"}";
        }else{
          for(var i=0;i<o.length;i++){
            r.push(obj2string(o[i]))
          }
          r="["+r.join()+"]";
        }
        return r;
      }
      return o.toString();
    }
  };
}]);
