export function getFileExtension (filename) {
    var tempArr = filename.split(".");
    var ext;
    if (tempArr.length === 1 || (tempArr[0] === "" && tempArr.length === 2)) {
        ext = "";
    } else {
        ext = tempArr.pop().toLowerCase(); //get the extension and make it lower-case
    }
    return ext;
}

export function isCardNo(card) 
{ 
    // 身份证号码为15位或者18位，15位时全为数字，18位前17位为数字，最后一位是校验位，可能为数字或字符X 
    var reg_18 = /^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/;
    var reg_15 = /^[1-9]\d{5}\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}$/;

    return reg_18.test(card) || reg_15.test(card)
}

export function jsGetAge(strBirthday, splitstr) {
    var returnAge;
    var strBirthdayArr = strBirthday.split(splitstr);
    var birthYear = strBirthdayArr[0];
    var birthMonth = strBirthdayArr[1];
    var birthDay = strBirthdayArr[2];
    var d = new Date();
    var nowYear = d.getFullYear();
    var nowMonth = d.getMonth() + 1;
    var nowDay = d.getDate();
    if (nowYear == birthYear) {
        returnAge = 0;//同年 则为0岁
    }
    else {
        var ageDiff = nowYear - birthYear; //年之差
        if (ageDiff > 0) {
            if (nowMonth == birthMonth) {
                var dayDiff = nowDay - birthDay;//日之差
                if (dayDiff < 0) {
                    returnAge = ageDiff - 1;
                }
                else {
                    returnAge = ageDiff;
                }
            }
            else {
                var monthDiff = nowMonth - birthMonth;//月之差
                if (monthDiff < 0) {
                    returnAge = ageDiff - 1;
                }
                else {
                    returnAge = ageDiff;
                }
            }
        }
        else {
            returnAge = -1;//返回-1 表示出生日期输入错误 晚于今天
        }
    }

    return returnAge;//返回周岁年龄

}

export function isPositiveInteger(s){//是否为正整数
    var re = /^[0-9]+$/ ;
    return re.test(s)
} 

export function isPositiveNumber(s) {
    var re = /^\d+(\.\d+)?$/ ;
    return re.test(s)
}

export function dialysisAge(firstDialysisDate) {
    var dialysisAge;
    var startDate = firstDialysisDate.split('-');
    var startYear = startDate[0];
    var startMonth = startDate[1];
    var startDay = startDate[2];
    var d = new Date();
    var nowYear = d.getFullYear();
    var nowMonth = d.getMonth() + 1;
    var nowDay = d.getDate();

    var diffYear = nowYear-startYear;
    var diffMonth = nowMonth-startMonth;
    var diffDay = nowDay-startDay;
    if (diffYear<0) {
        dialysisAge = "";
    }else if (diffYear==0) {
        if (diffMonth<0){
            dialysisAge = "";
        }else if (diffMonth==0 && diffDay<0){
            dialysisAge = "";
        } else {
            if (diffDay<0) {
                diffMonth -=1;
            }
            dialysisAge = diffMonth+"个月";
        }
    }else {
        if (diffDay<0) {
            diffMonth -=1;
        }
        if (diffMonth<0) {
            diffYear -=1;
            diffMonth += 12;
        }
        if (diffYear>0&&diffMonth>0) {
            dialysisAge = diffYear+"年零"+diffMonth+"个月";
        }else if (diffYear>0) {
            dialysisAge = diffYear+"年";
        }else {
            dialysisAge = diffMonth+"个月";
        }
    }

    return dialysisAge;//返回周岁年龄
}


export function uParseTime(time, cFormat) {
    if (arguments.length === 0) {
      return null
    }
    const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}'
    let date
    if (typeof time === 'object') {
      date = time
    } else {
      if (('' + time).length !== 13) time = parseInt(time) * 1000
      date = new Date(time)
    }
    const formatObj = {
      y: date.getFullYear(),
      m: date.getMonth() + 1,
      d: date.getDate(),
      h: date.getHours(),
      i: date.getMinutes(),
      s: date.getSeconds(),
      a: date.getDay()
    }
    const time_str = format.replace(/{(y|m|d|h|i|s|a)+}/g, (result, key) => {
      let value = formatObj[key]
      if (key === 'a') return ['一', '二', '三', '四', '五', '六', '日'][value - 1]
      if (result.length > 0 && value < 10) {
        value = '0' + value
      }
      return value || 0
    })
    return time_str
  }

  export function calculateAnticoagulantZL(type, shouji, shichang, weichi) {
      var t = 0.5;
      if (type==1) {
          t = 0.5;
      }else if (type == 2){
          t = 1;
      }else {
          return 0;
      }
      shouji = parseFloat(shouji);
      shichang = parseFloat(shichang);
      weichi = parseFloat(weichi);
      if (isNaN(shouji) ||isNaN(shichang) ||isNaN(weichi)) {
          return 0
      }
      return (shouji + (shichang-t) * weichi).toFixed(1);
  }