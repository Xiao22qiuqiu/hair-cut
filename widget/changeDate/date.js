export default upToDate=(time)=>{
    // 简单的一句代码
    let date = new Date(time); //获取一个时间对象

    /**
     1. 下面是获取时间日期的方法，需要什么样的格式自己拼接起来就好了
     2. 更多好用的方法可以在这查到 -> http://www.w3school.com.cn/jsref/jsref_obj_date.asp
     */
    date.getFullYear();  // 获取完整的年份(4位,1970)
    date.getMonth();  // 获取月份(0-11,0代表1月,用的时候记得加上1)
    date.getDate();  // 获取日(1-31)
    date.getTime();  // 获取时间(从1970.1.1开始的毫秒数)
    date.getHours();  // 获取小时数(0-23)
    date.getMinutes();  // 获取分钟数(0-59)
    date.getSeconds();  // 获取秒数(0-59)
}