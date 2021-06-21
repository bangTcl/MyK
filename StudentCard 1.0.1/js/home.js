window.addEventListener('load', function () {

    const DelIcon = document.querySelector('#Del-Icon')
    const UserIpt = document.querySelector('#User-ipt')
    const NextBtn = document.querySelector('#NextBtn')

    const HitMsgList = document.querySelectorAll('.hit_msg')
    const PositionMag = document.querySelector('#Position_Img')
    const MaskBox = document.querySelector('.mask')
    const MapReturn = document.querySelector('.mapReturn')
    const MapEnter = document.querySelector('.mapEnter')
    // const HitMsgTwo = document.querySelector('#Hit-Msg2')

    const StuId = document.querySelector('#Stu-id')

    const showddr = document.querySelector('.show-addr')

    // const searchData = document.querySelector('.search-data')
    // school

    const clazzInfo = document.querySelector('#sel_city')

    const AddrIpt = document.querySelector('#addr_ipt')
    const schoolVal = document.querySelector('.schoolId')
    const showadd = this.document.querySelector('.showadd')

    //ok no
    const okBtn = document.querySelector('.ok')

    const stuBox = document.querySelector('.stu_box')
    //返回按钮
    const BackIcon = this.document.querySelector('#backicon')
    //area
    let areaSet = document.querySelector('.areaset')
    //班级
    const confirmHook = document.querySelector('.confirm-hook')

    //初始化定义标杆
    var flag = {
        userName: false, //name
        userId: false, //userid
        schooliId: false,
        clazz: false,
        address: false
    }

    //显示图标blur focus input 元素发送变化触发  用户名进行验证
    ///   /^[\u4e00-\u9fa5]{1,6}(·[\u4e00-\u9fa5]{1,6}){0,2}$/
    // 名字长度限制
    UserIpt.addEventListener('keyup', function () {

        if (UserIpt.value.length > 17) {
            UserIpt.setAttribute('maxlength', 16)
            // HitMsgList[0].textContent = '姓名最长为16个字符'
            UserIpt.setAttribute('minlength', 2)
            flag.userName = false
        }
    })

    // 用户名失去焦点判断
    UserIpt.addEventListener('change', function () {
        if (!UserIpt.value.length) {
            HitMsgList[0].style.display = 'none'
            flag.userName = false
        }
        let userReg = /^[\u4E00-\u9FA5\uf900-\ufa2d·s]{2,16}$/;
        // 验证为true同时满足长度 
        if (userReg.test(UserIpt.value) && UserIpt.value.length >= 2) {
            HitMsgList[0].style.display = 'none'
            //通过设置位true
            flag.userName = true
        } else {
            HitMsgList[0].textContent = HitMsgList[0].textContent == '' ? '您输入的姓名有误，请重新输入' : HitMsgList[0].textContent
            HitMsgList[0].style.display = 'block'
            flag.userName = false //false
            if (!UserIpt.value.length) {
                // HitMsgList[0].textContent = '姓名最长为16个字符'
                HitMsgList[0].style.display = 'none'
                flag.userName = false //false

            }
        }

        //判断是否显示清除按钮
        if (UserIpt.value.length > 0) {
            DelIcon.style.display = 'block'
        }
        //判断用户名存在数据

        if (!UserIpt.value.length) {
            DelIcon.style.display = 'none'
        }
    })
    //输入时候触发
    UserIpt.addEventListener('input', function () {

        if (UserIpt.value.length > 16) {
            HitMsgList[0].style.display = 'block'
            HitMsgList[0].textContent = '姓名最长为16个字符'
        }
        HitMsgList[0].textContent = ''
        // 判断输入的时候是否存在数字 
        // var nameText = /^[\u4E00-\u9FA5\uf900-\ufa2d·s]{2,16}$/;
        var nameText = /[0-9]/;
        if (nameText.test(UserIpt.value)) {
            HitMsgList[0].style.display = 'block'
            HitMsgList[0].textContent = '姓名不能包含数字'
            flag.userName = flag
        }
        // reg = /^(?=.*)(?=.*\d)(?=.*[~!@#$%^&*()_+`\-={}:";'<>?,.\/]).{8,64}$/;

        var userNameText = new RegExp("[`~!@#$^&*()=|{}':;',\\[\\].<>《》/?~！@#￥……&*（）——|{}【】‘；：”“'。，、？ ]")

        // 包含包含特殊符号 字母  除以外
        if (userNameText.test(UserIpt.value)) {
            HitMsgList[0].style.display = 'block'
            HitMsgList[0].textContent = '姓名不能包含# % & *等字符'
            flag.userName = false

        }
        //判断是否显示清除按钮
        if (UserIpt.value.length) {
            DelIcon.style.display = 'block'

        }
        //判断用户名存在数据

        if (!UserIpt.value.length) {
            DelIcon.style.display = 'none'
            HitMsgList[0].style.display = 'none'
        }
    })

    //删除图标   退格删除
    DelIcon.addEventListener('click', function () {
        UserIpt.value = ''
        DelIcon.style.display = 'none'
        HitMsgList[0].style.display = 'none'
    })
    // 身份证进行正则判断   失焦判断

    StuId.addEventListener('change', function () {
        if (!StuId.value.length) {
            HitMsgList[1].style.display = 'none'
            flag.userId = false
        }
        //存在才开始验证
        if (StuId.value.length > 0) {
            var reg = /^[1-9][0-9]{5}(19|20)[0-9]{2}((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|30|31)|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|[1-2][0-9]))[0-9]{3}([0-9]|x|X)$/;
            if (!reg.test(StuId.value)) {

                //存在有数据进行验证
                // if(StuId.value.length<18){
                // HitMsgList[1].textContent = '不包括数字,字母(X除外),@#%^&等字符，十八位组成，'
                // }
                HitMsgList[1].textContent = HitMsgList[1].textContent == '' ? '您输入的身份证有误，请重新输入' : HitMsgList[1].textContent
                HitMsgList[1].style.display = 'block'
                flag.userId = false


            } else {
                // 身份证字母转大写
                /**
                 * js 将字符串中的大写变成小写,小写变成大写
                 */
                var str = StuId.value.split('');
                for (var i = 0; i < str.length; i++) {
                    str[i] = str[i].toUpperCase();

                }
                //验证通过同时验证最后一位
                function checkIDCard(idcode) {
                    // 加权因子
                    var weight_factor = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2];
                    // 校验码
                    var check_code = ['1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2'];

                    var code = idcode + "";
                    var last = idcode[17]; //最后一位

                    var seventeen = code.substring(0, 17);

                    // ISO 7064:1983.MOD 11-2
                    // 判断最后一位校验码是否正确
                    var arr = seventeen.split("");
                    var len = arr.length;
                    var num = 0;
                    for (var i = 0; i < len; i++) {
                        num = num + arr[i] * weight_factor[i];
                    }
                    // 获取余数
                    var resisue = num % 11;
                    var last_no = check_code[resisue];

                    var idcard_patter = /^[1-9][0-9]{5}([1][9][0-9]{2}|[2][0][0|1][0-9])([0][1-9]|[1][0|1|2])([0][1-9]|[1|2][0-9]|[3][0|1])[0-9]{3}([0-9]|[X])$/;

                    // 判断格式是否正确
                    var format = idcard_patter.test(idcode);
                    // 返回验证结果，校验码和格式同时正确才算是合法的身份证号码 format
                    return last === last_no ? true : false;
                }
                var strVal = str.join('')
                var resVal = checkIDCard(strVal)
                if (!resVal) {
                    HitMsgList[1].textContent = '身份证校验失败'
                    HitMsgList[1].style.display = 'block'
                    flag.userId = false
                }


                if (resVal) {
                    // 验证通过
                    HitMsgList[1].style.display = 'none'
                    flag.userId = true
                }
            }
        }

        //身份证最后一位校验
        // 函数参数必须是字符串，因为二代身份证号码是十八位，而在javascript中，十八位的数值会超出计算范围，造成不精确的结果，导致最后两位和计算的值不一致，从而该函数出现错误。
        // 详情查看javascript的数值范围

    })


    //键盘按下监测数据的长度大于18进行拦截
    StuId.addEventListener('keyup', function () {

        // if (StuId.value.length >= 18) {
        //     // StuId.setAttribute('maxlength', 18)
        //     HitMsgList[1].textContent = '身份证限制十八位'
        //     HitMsgList[1].style.display = 'block'
        //     // StuId.setAttribute('minlength', 18)
        //     flag.StuId = false
        // }

    })

    StuId.addEventListener('input', function () {
        // 验证通过  清空提示信息
        HitMsgList[1].textContent = ''
        // // 判断用户输入的是否由非法字母  字母验证
        var rescheck = ''
        rescheck = StuId.value
        var check = /[a-zA-Z]/i

        var stateMage = true
        if (check.test(rescheck)) {
            stateMage = true
            // 替换调x 重新进行监测
            if (rescheck.includes('x') || rescheck.includes('X')) {
                rescheck = rescheck.replace('x', '')
                rescheck = rescheck.replace('X', '')
            }
            //除去了x是否还存在其他字母
            if (check.test(rescheck)) {
                HitMsgList[1].style.display = 'block'
                HitMsgList[1].textContent = '您输入的身份证有误，请重新输入'
                stateMage = false
                flag.userId = false
            }
        }

        if (StuId.value.length > 18) {
            HitMsgList[1].style.display = 'block'
            HitMsgList[1].textContent = '身份证长度限制十八位'
            flag.userId = false

        }


        // 验证身份证中是否输入了字符和特殊符号

        // 包含中文字符验证
        var StuIdVal = /[\!\@\#\$\%\^\&\*\~\`(\){\}\<\>\[\]\|\/\\\,\;\'\"\?\_\-\+\=\u4e00-\u9fa5]/

        if (StuIdVal.test(StuId.value)) {
            HitMsgList[1].style.display = 'block'
            HitMsgList[1].textContent = '不能包括中文字符'
            stateMage = false
            flag.userId = false
        }


        var pattern = new RegExp("[`~!@#$^&*()=|{}':;',\\[\\].<>《》/?~！@#￥……&*（）——|{}【】‘；：”“'。，、？ ]")
        // 包含包含特殊符号 字母  除x以外
        if (pattern.test(StuId.value)) {
            HitMsgList[1].style.display = 'block'
            if (pattern.test(StuId.value)) {
                HitMsgList[1].textContent = '不能包括@#$~+|{}等特殊字符'
                stateMage = false
                flag.userId = false

            }
        }
    })
    //地图初始化
    //地图初始化
    PositionMag.addEventListener('click', function () {
        MaskBox.style.display = 'block'

        function G(id) {
            return document.getElementById(id);
        }
        var map = new BMap.Map("l-map"); //实例化地图
        // var lng = G('lng'); //当前的
        // var lat = G('lat');
        var searchBtn = G('search-btn'); //搜索按钮
        var myValue;
        var local = null;
        var ac = null;
        var geolocation = new BMap.Geolocation();
        // 地址关键字提示下拉框
        ac = new BMap.Autocomplete({
            "input": "suggestId", //input
            "location": map
        });
        //获取当前位置
        geolocation.getCurrentPosition(function (r) {
                if (this.getStatus() == BMAP_STATUS_SUCCESS) {
                    var mk = new BMap.Marker(r.point);
                    map.addOverlay(mk); //标出所在地
                    map.panTo(r.point); //地图中心移动
                    // console.log('您的位置：' + r.point.lng + ',' + r.point.lat);
                    var point = new BMap.Point(r.point.lng, r.point.lat); //用所定位的经纬度查找所在地省市街道等信息
                    // console.log(point, 'poit')
                    //中心的聚焦
                    map.centerAndZoom(point, 13);
                    ass(point)

                } else {
                    //定位失败
                    document.getElementById("s-data").innerHTML = `<p class="addLocal CurActive"><span>四川省绵阳市</span><span></span></p>`
                    // 设置固定值
                    map.clearOverlays();
                    map.centerAndZoom({
                        lng: 104.70551898,
                        lat: 31.50470126
                    }, 10);
                    // map.addOverlay(rs.point); //标出所在地
                    map.addOverlay(new BMap.Marker({
                        lng: 104.70551898,
                        lat: 31.50470126
                    }));

                    alert('failed' + this.getStatus());
                }
            }, {
                //设备高精度定位
                enableHighAccuracy: true
            }

        )
        window.ass = function (data) {

            //data 是经纬度
            var gc = new BMap.Geocoder();
            gc.getLocation(data, function (rs) {
                var addComp = rs.addressComponents;
                // console.log(addComp)
                var province = addComp.province
                var city = addComp.city
                var district = addComp.district
                var street = addComp.street
                var streetNumber = addComp.streetNumber
                var showGe = province + city + district + street + streetNumber
                var options = {
                    onSearchComplete: function (results) {
                        // 判断状态是否正确
                        if (local.getStatus() == BMAP_STATUS_SUCCESS) {
                            var s = [];
                            for (var i = 0; i < results.getCurrentNumPois(); i++) {
                                // s.push(results.getPoi(i).title + ", " + results.getPoi(i).address);
                                s.push([`<p class="addLocal"><span>${results.province}${results.city}${results.getPoi(i).title}</span><span>${results.province}${results.city}${results.getPoi(i).address}</span>
                                <img src="./images/ze.png" class="zeOk"></p>`])
                            }
                            // console.log(results)
                            document.getElementById("s-data").innerHTML = s.join('');
                            // console.log(results)
                            // console.log(results.getPoi(0))
                            var allLocal = document.getElementsByClassName('addLocal')
                            var allZe = document.querySelectorAll('.zeOk')
                            // map.centerAndZoom(point2, 13);
                            //标出所在地  定位成功默认定位到第一个
                            allLocal[0].classList.add('CurActive')
                            allZe[0].classList.add('chooseOk')
                            // 先清除
                            map.clearOverlays();
                            map.addOverlay(new BMap.Marker(results.Hr[0].point));
                            map.panTo(results.Hr[0].point); //地图中心移动
                            //    colletionHtml转换
                            let list = Array.prototype.slice.call(allLocal);
                            // let list = Array.from(allLocal);
                            let OkList = Array.prototype.slice.call(allZe);
                            list.forEach((item, index) => {
                                item.addEventListener('click', function () {
                                    // 添加背景
                                    list.forEach(obj => {
                                        obj.classList.remove('CurActive')
                                    })
                                    OkList.forEach(function (item) {
                                        item.classList.remove('chooseOk')
                                    })
                                    OkList[index].classList.add('chooseOk')
                                    list[index].classList.add('CurActive')
                                    //地图上描点
                                    // console.log(results.Hr[index])
                                    map.clearOverlays();
                                    var point2 = new BMap.Point(results.Hr[index].point.lng, results.Hr[index].point.lat); //用所定位的经纬度查找所在地省市街道等信息
                                    //中心的聚焦
                                    map.centerAndZoom(point2, 13);
                                    // map.addOverlay(results.Hr[index].point); //标出所在地
                                    map.addOverlay(new BMap.Marker(results.Hr[index].point));
                                    map.panTo(results.Hr[index].point); //地图中心移动
                                    // console.log('您的位置：' + results.Hr[index].point.lng + ',' + results.Hr[index].point.lat);
                                })
                            });
                        }
                    }
                };
                var local = new BMap.LocalSearch(map, options);
                local.search(showGe)
                // local.searchNearby(showGe, data, 1000);
                // console.log(showGe, 'shoge')
            });

        }
        // map.enableScrollWheelZoom(); //开启鼠标滚轮缩放


        //初始化地图    
        map.enableInertialDragging(); //开启关系拖拽    
        map.enableScrollWheelZoom(); //开启鼠标滚动缩放  

        var geoCtrl = new BMap.GeolocationControl({
            anchor: BMAP_ANCHOR_BOTTOM_RIGHT,
            showAddressBar: true //是否显示    
                ,
            enableAutoLocation: false //首次是否进行自动定位    
                ,
            offset: new BMap.Size(0, 25)
            //, locationIcon     : icon //定位的icon图标    
        });
        var geoc = new BMap.Geocoder()
        //监听定位成功事件    
        geoCtrl.addEventListener("locationSuccess", function (e) {
            // 经纬度转换tionSu
            geoc.getLocation(e.point, function (rs) {
                //定位成功显示详细地址
                // console.log(rs.address) //详情地址
                // console.log(rs)
                // console.log(rs.point)
                var addComp = rs.addressComponents;
                var province = addComp.province; //省
                var city = addComp.city; //市
                var district = addComp.district; //区或县
                var street = addComp.street //街道
                var streetNumber = addComp.streetNumber //号
                var province = addComp.province; //省
                var EditAddr = province + city + district + street + streetNumber
                map.clearOverlays();
                map.centerAndZoom(rs.point, 10);
                // map.addOverlay(rs.point); //标出所在地
                map.addOverlay(new BMap.Marker(rs.point));
                // map.panTo(rs.point); //地图中心移动
                // document.getElementById('lnd_fert_address').value = province + city + district;
                document.getElementById("s-data").innerHTML = `<p class="addLocal CurActive">
                <span>${rs.address}</span><span>${EditAddr}</span>
                <img src="./images/ze.png" class="zeOk" style="display: block;" > </p>`
            })
        });
        //监听定位失败事件    
        geoCtrl.addEventListener("locationError", function (e) {
            //默认值
            document.getElementById("s-data").innerHTML = `<p class="addLocal CurActive"><span>四川省绵阳市</span><span></span></p>`
            //默认定位
            map.clearOverlays();
            map.centerAndZoom({
                lng: 104.70551898,
                lat: 31.50470126
            }, 10);
            // map.addOverlay(rs.point); //标出所在地
            map.addOverlay(new BMap.Marker({
                lng: 104.70551898,
                lat: 31.50470126
            }));
            //弹窗提醒
            Qmsg.error('定位失败', {
                showClose: true,
                timeout: 4000,
            });

        });
        // 将定位控件添加到地图    
        map.addControl(geoCtrl);
        ac.addEventListener("onhighlight", function (e) { //鼠标放在下拉列表上的事件
            var str = "";
            var _value = e.fromitem.value;
            var value = "";
            if (e.fromitem.index > -1) {
                value = _value.province + _value.city + _value.district + _value.street + _value.business;
            }
            str = "FromItem<br />index = " + e.fromitem.index + "<br />value = " + value;
            value = "";
            if (e.toitem.index > -1) {
                _value = e.toitem.value;
                value = _value.province + _value.city + _value.district + _value.street + _value.business;
            }
            str += "<br />ToItem<br />index = " + e.toitem.index + "<br />value = " + value;
            G("searchResultPanel").innerHTML = str;
        });

        // 将定位控件添加到地图    

        // function theLocation() {
        //     var geolocation = new BMap.Geolocation();
        //     geolocation.getCurrentPosition(function (r) {
        //         if (this.getStatus() == BMAP_STATUS_SUCCESS) {
        //             var mk = new BMap.Marker(r.point);
        //             map.addOverlay(mk);
        //             map.panTo(r.point);
        //             // console.log(r)

        //         } else {
        //             alert('failed' + this.getStatus());
        //             //showddr.textContent = '四川省绵阳市'

        //         }
        //     });
        // }
        // theLocation();


        // 我的查找
        function myFun() {
            var pp = local.getResults().getPoi(0).point; //获取第一个智能搜索的结果
            map.centerAndZoom(pp, 10);
            //通过查找的数据进行经纬描点
            map.addOverlay(new BMap.Marker(pp)); //添加标注
        }

        //设置地图显示物品
        function setPlace() {
            map.clearOverlays(); //清除地图上所有覆盖物
            local = new BMap.LocalSearch(map, { //智能搜索
                onSearchComplete: myFun
            });
            local.search(myValue);
        }
        //经纬度
        function showInfo(e) {
            lng.value = e.point.lng;
            lat.value = e.point.lat;
        }

        //获取详细的地址
        ac.addEventListener("onconfirm", function (e) { //鼠标点击下拉列表后的事件
            var _value = e.item.value;
            myValue = _value.province + _value.city + _value.district + _value.street + _value.business;

            G("searchResultPanel").innerHTML = "onconfirm<br />index = " + e.item.index +
                "<br />myValue = " + myValue;
            // console.log(myValue, 'myvalue')
            setPlace();
            //间接调用按钮搜索事件
            searchBtn.click()

        });
        //监听事件获取用户点击的enter
        let sug = document.getElementById("suggestId")
        sug.addEventListener('keydown', function (event) {
            if (event.keyCode == 13) {
                searchBtn.click()
                setPlace()

            }

        })

        // 搜索按钮事件
        searchBtn.addEventListener("click", function () { //点击搜索
            // 如果input没有值者不进行搜索
            if (!document.getElementById("suggestId").value) {
                return
            } else {
                map.clearOverlays(); //清除地图上所有覆盖物
                local = new BMap.LocalSearch(map, { //智能搜索
                    onSearchComplete: myFun
                });
                //获取周边的数据
                var opVal = {
                    onSearchComplete: function (results) {
                        // console.log(results, '516')
                        //获取的省份
                        var ProvinceAdd = results.province
                        //获取的城市
                        var CityAdd = results.city
                        // console.log(CityAdd, ProvinceAdd, )
                        // 判断状态是否正确
                        if (local.getStatus() == BMAP_STATUS_SUCCESS) {
                            var s = [];
                            for (var i = 0; i < results.getCurrentNumPois(); i++) {
                                var ProvinceAddSet = results.getPoi(i).address.includes(ProvinceAdd) ? results.getPoi(i).address.replace(ProvinceAdd, '') : results.getPoi(i).address
                                var CityAddSet = ProvinceAddSet.includes(CityAdd) ? ProvinceAddSet.replace(CityAdd, '') : ProvinceAddSet
                                // console.log(ProvinceAddSet, 'PRo')
                                // console.log(CityAddSet, 'CityAdd')
                                s.push([`<p class="addLocal"><span>${results.getPoi(i).title}</span>
                                <span>${ProvinceAdd+CityAdd+CityAddSet}</span> 
                                <img src="./images/ze.png" class="zeOk"></p>`])

                            }
                            // 这里是通过点击搜索框来进行渲染的数据
                            document.getElementById("s-data").innerHTML = s.join('');
                            var allLocal = document.getElementsByClassName('addLocal')
                            var allZe = document.querySelectorAll('.zeOk')
                            // map.centerAndZoom(point2, 13);
                            //标出所在地  定位成功默认定位到第一个
                            allLocal[0].classList.add('CurActive')
                            allZe[0].classList.add('chooseOk')
                            // 先清除
                            map.clearOverlays();
                            map.addOverlay(new BMap.Marker(results.Hr[0].point));
                            map.panTo(results.Hr[0].point); //地图中心移动
                            // HTMLCollection   转换成真数组
                            let list = Array.prototype.slice.call(allLocal);
                            let OkList = Array.prototype.slice.call(allZe);


                            list.forEach((item, index) => {
                                item.addEventListener('click', function () {
                                    // 添加背景
                                    list.forEach(obj => {
                                        obj.classList.remove('CurActive')

                                    })
                                    OkList.forEach(function (item) {
                                        item.classList.remove('chooseOk')
                                    })

                                    OkList[index].classList.add('chooseOk')
                                    list[index].classList.add('CurActive')
                                    //地图上描点
                                    // console.log(results.Hr[index])

                                    map.clearOverlays();
                                    var point2 = new BMap.Point(results.Hr[index].point.lng, results.Hr[index].point.lat); //用所定位的经纬度查找所在地省市街道等信息

                                    //中心的聚焦
                                    map.centerAndZoom(point2, 13);

                                    // map.addOverlay(results.Hr[index].point); //标出所在地
                                    map.addOverlay(new BMap.Marker(results.Hr[index].point));
                                    map.panTo(results.Hr[index].point); //地图中心移动
                                    // console.log('您的位置：' + results.Hr[index].point.lng + ',' + results.Hr[index].point.lat);
                                })
                            });
                        }
                    }
                };

                var options = opVal
                var local = new BMap.LocalSearch(map, options);
                local.search(document.getElementById("suggestId").value);
                // 调用获取周边信息
            }

        });
        map.addEventListener("click", showInfo); //搜索事件
    })

    // 地图的ok
    okBtn.addEventListener('click', function () {
        //获取当前选择的对象的值
        let CurActiveObj = document.querySelector('.CurActive')
        let twoSpan = document.querySelector('.CurActive >span:nth-child(2)')
        showadd.value = twoSpan.textContent
        MaskBox.style.display = 'none'
    })

    const canleBtn = document.querySelector('.canle')

    // 地图no
    canleBtn.addEventListener('click', function () {
        MaskBox.style.display = 'none'

    })
    //请求数据提取
    // window.UplinkData = [];
    schoolVal.addEventListener('input', function () {
        if (schoolVal.value) {
            HitMsgList[2].style.display = 'none'
        }

    })


    const setWay = document.querySelector('.setWay')
    setWay.addEventListener('change', function () {

        if (!setWay.value.length) {
            HitMsgList[3].style.display = 'none'
        }

    })
    // 地址判断

    showadd.addEventListener('input', function () {
        // HitMsgList[4].textContent = ''
        HitMsgList[4].style.display = 'none'
        if (!showadd.value.length) {
            HitMsgList[4].style.display = 'none'
        }
        flag.address = false


    })

    //  长度限制
    showadd.addEventListener('keyup', function () {
        HitMsgList[4].style.display = 'none'

        if (showadd.value.length > 255) {
            showadd.setAttribute('maxlength', 255)
            HitMsgList[4].style.display = 'block'
            showadd.setAttribute('minlength', 2)
            flag.address = false
        }
    })

    //验证  失焦
    showadd.addEventListener('change', function () {
        HitMsgList[4].style.display = 'none'
        flag.address = true
        if (!showadd.value.length) {
            HitMsgList[4].style.display = 'none'
            flag.address = false
        }
    })

    //班级年级
    confirmHook.addEventListener('click', function () {
        HitMsgList[3].style.display = 'none'
    })

    //下一步按钮 
    NextBtn.addEventListener('click', function () {

        let NewHit = document.querySelector('.New_AddMeg')
        // 姓名
        if (!UserIpt.value) {
            HitMsgList[0].style.display = 'block'
            HitMsgList[0].textContent = '姓名不能为空'
            return
        }
        //判断标杆
        if (!flag.userName) {
            HitMsgList[0].style.display = 'block'
            HitMsgList[0].textContent = '您输入的姓名有误，请重新输入'
            return
        }
        // 身份证
        if (!StuId.value) {
            HitMsgList[1].style.display = 'block'
            HitMsgList[1].textContent = '身份证不能为空'
            return
        }
        if (!flag.userId) {
            HitMsgList[1].style.display = 'block'
            HitMsgList[1].textContent = '您输入的身份证有误，请重新输入'
            return

        }

        // //判断区域是否为空
        // if (!areaSet.value) {
        //     NewHit.style.display = 'block'
        //     NewHit.textContent = '请选择区域'
        //     return
        // }

        // // 学校id     
        if (!window.chosse) {
            flag.schooliId = false
            HitMsgList[2].style.display = 'block'
            HitMsgList[2].textContent = '请选择学校'
            return;
        }

        if (window.chosse) {
            HitMsgList[2].style.display = 'none'
            flag.schoolId = true
        }
        const stuIdSendval = document.querySelector('.searchIpt')
        //   学校
        if (stuBox.textContent.length) {
            HitMsgList[2].style.display = 'none'
        }
        if (stuBox.textContent.length == 0) {
            HitMsgList[2].textContent = '学校不能为空'
            HitMsgList[2].style.display = 'block'
            return
        }

        // 班级选择
        if (!clazzInfo.value) {
            flag.clascs = false
            HitMsgList[3].style.display = 'block'
            HitMsgList[3].textContent = '班级不能为空'
            return
        }
        //存在值
        if (clazzInfo.value) {
            flag.clascs = true
            HitMsgList[3].style.display = 'none'
        }
        // if (!flag.address) {
        //     HitMsgList[4].style.display = 'block'
        //     HitMsgList[4].textContent = '您输入的用户地址错误，请重新输入'
        //     return
        // }

        if (!showadd.value) {
            flag.address = false
            HitMsgList[4].style.display = 'block'
            HitMsgList[4].textContent = '地址不能为空'
            flag.address = false
            return
        }
        if (showadd.value) {
            flag.address = true
            HitMsgList[4].style.display = 'none'
        }
        if (!flag.address) {
            HitMsgList[4].style.display = 'block'
            HitMsgList[4].textContent = '地址信息错误'
            return

        }

        var params = {
            id_number: StuId.value, //sfz
            name: UserIpt.value, //xm
            school_uid: schoolId, //xxid
            grade: window.clascs[0], //nj   一年级
            clazz: window.clascs[1], // bj  1班
            address: AddrIpt.value //dizhi
        }

        //提交请求

        window.$http.post('/h5/student/info/commit', params, function (res) {
            //进行判断，执行成功跳转，不成功阻止并且新式提示内容
            // 失败
            // 登陆失败监测异常

            // 成功
            if (res.meta.code == 0) {
                Qmsg.success("提交成功", {
                    showClose: true,
                    onClose: function (e) {
                        //设置按禁用
                        NextBtn.disabled = true
                        setTimeout(() => {
                            NextBtn.disabled = false
                        }, 3000);
                        UserIpt.value = ''
                        StuId.value = ''
                        showadd.value = ''
                        setWay.value = ''
                        stuBox.textContent = ''
                        AddrIpt.textContent = ''
                        clazzInfo.value = ''
                        areaSet.value = ''
                        //弹出提示框
                        location.href = res.data.url
                        //清空所有信息
                    }
                });
                // //弹出提示框
            } else {
                Qmsg.error(res.meta.message, {
                    showClose: true,
                    timeout: 8000,
                });
            }

        })

    })

})