window.addEventListener('load', function () {
    // var HitMsgList = document.querySelectorAll('.hit_msg')
    //定义一个变量用来保存是否已经进行了一次请求
    var shuju = []
    let areaSet = document.querySelector('.areaset')
    window.UplinkData = [];
    window.dataHttp = function () {
        window.$http.post('/h5/student/school/list', {
            'region': 1
        }, function (res) {
            window.AllSchoolData = res.data
            render(AllSchoolData)
        })

    }
    dataHttp()
    window.render = function (data) {
        var searchData = data
        //1.判断当前的区域是否选择，选择后学校在点击事件的时候才执行调用函数
        // 2.没有选择发送所有学校
        // console.log(areaSet.value.length, 'areaset')
        SaveData(data)
        if (areaSet.value.length) {
            // console.log(window.areaNum, '判断当前的区域')
            //判断当前是是否有数据

            touchData(window.areaNum)

        } else {
            //讲所以的学校数据传入
            if (searchData.length > 0) getdata(searchData)

        }
    }
    // 所有数据
    var SaveData = function (SaveData) {
        var showSetDataList = []
        //得到所有数组
        area.forEach(function (names, title) {
            names.children.forEach(function (CityList, CityIndex) {
                showSetDataList.push({
                    uid: CityList.code,
                    name: CityList.label,
                    children: []

                })
            })

        })
        //  分组归纳所有数据
        SaveData.forEach(function (element) {
            // console.log(element, 'elemetn')
            showSetDataList.forEach((CodeObj, CodeIndex) => {
                if (CodeObj.uid == element.area) {
                    CodeObj.children.push({
                        name: element.name,
                        uid: element.uid,
                        children: []
                    })
                }
            })


        })

        // 执行用户点击了区域后分类执行学校选择
        touchData = function (areaNum) {

            showSetDataList.forEach(function (sendObj, sendIndex) {
                if (sendObj.uid == areaNum) {
                    getdata(showSetDataList[sendIndex].children)
                }
            })

        }

        // 判断是否存在数据显示地区名字
        //第一层是绵阳children
        area.forEach(function (item, index, arr) {
            item.children.forEach(function (obj, index, arr) {
                showSetDataList.forEach(function (numtest, keys) {
                    if (numtest.uid == obj.code) {
                        if (numtest.children.length == 0) {
                            // 截取
                            item.children.splice(index, 1)

                        }
                    }

                })
            })
        })

        // 实例化对象值执行一次  其他的就直接调用
        // console.log(SaveData.length > 0)
        if (shuju.length == 0 && SaveData.length > 0) {
            SetAear()
        }
        //改变状态不在执行实例对象
        shuju[0] = 1
    }


    //实例化
    window.getdata = function (data) {
        //传入渲染的数据不存在值就进行实例化
        if (UplinkData.length == 0) {
            UplinkData = data;
            window.mobileSelect5 = new MobileSelect({
                trigger: "#trigger5",
                wheels: [{
                    data: UplinkData
                }],
                position: [0],
                transitionEnd: function (indexArr, data) {},
                callback: function (indexArr, data) {
                    // 数据
                    var list = []
                    // 学校的uid
                    list.push(data[0].uid)

                    window.schoolId = list[0];
                },
            });
        } else {
            let StuBox = document.querySelector('.stu_box')

            UplinkData = data;
            mobileSelect5.updateWheel(0, UplinkData);
        }


        const test = document.querySelector('.content .spanBox')

        if (test == null) {
            const con = document.querySelector('.content')

            con.insertAdjacentHTML("afterbegin", '<span>')
            const span = document.querySelector('.content >span')
            span.insertAdjacentHTML('afterbegin', '<input placeholder="输入学校"/>')
            span.classList.add('spanBox')
            const InputBox = document.querySelector('.spanBox >input')
            InputBox.classList.add('searchIpt')
            const text = document.createElement('span')
            text.classList.add('textsty')
            text.textContent = '搜索'
            //search 按钮
            text.classList.add('search_btn')

            // 文本框。获取输入的value
            span.appendChild(text)


        }
        const enterIptVal = document.querySelector('.searchIpt')
        const ensures = document.querySelector('.ensure')
        window.nullList = []
        window.nullList[0] = {
            'name': '没有搜索到对应学校',
            'uid': 1,
            'children': ''

        }
        //   搜索按钮
        document.querySelector('.search_btn').addEventListener('click', function () {

            //过滤返回值
            if (enterIptVal.value.length > 0) {
                var newslist = UplinkData.filter((item, index, arr) => {
                    var str = item.name
                    return str.includes(enterIptVal.value)
                })
                //重新执行数据渲染
                if (newslist.length) {
                    // mobileSelect5.locatePosition(newslist, 0)
                    // mobileSelect5.updateWheels(newslist); 
                    mobileSelect5.updateWheel(0, newslist)
                    mobileSelect5.locatePosition(0, 0)
                }
                if (!newslist.length) {
                    window.nullList = []

                    nullList[0] = {
                        'name': '没有搜索到对应学校',
                        'uid': 0,
                        'children': ''
                    }
                    mobileSelect5.updateWheel(0, nullList)
                    mobileSelect5.locatePosition(0, 0)

                }
                if (!enterIptVal.value.length) {
                    // mobileSelect5.updateWheels(UplinkData);
                    mobileSelect5.updateWheel(0, UplinkData)
                    mobileSelect5.locatePosition(0, 0)
                }
            } else {
                mobileSelect5.updateWheel(0, UplinkData)
                mobileSelect5.locatePosition(0, 0)

            }
        })


        document.querySelector('.searchIpt').addEventListener('input', function () {
            if (!enterIptVal.value.length) {
                window.nullList = []

                // mobileSelect5.updateWheels(UplinkData);
                window.nullList = UplinkData
                console.log(window.nullList, '搜索按钮的所有数据')
                mobileSelect5.updateWheel(0, UplinkData)
                mobileSelect5.locatePosition(0, 0)
            }

        })









    }


    function SetAear() {

        var EareCity = document.querySelector('#sel_area');


        // 定义三个数组
        var first = []; /* 省，直辖市 */
        var second = []; /* 市 */
        var third = []; /* 镇 */

        var selectedIndex = [0, 0, 0]; /* 默认选中的地区 */

        var checked = [0, 0, 0]; /* 已选选项 */
        // 当前对象，传入的空数组
        function creatList(obj, list) {
            // 当前对象，索引，数组
            obj.forEach(function (item, index, arr) {

                var temp = new Object();
                temp.text = item.label; //省份名字

                // temp.value = index; //增加属性
                // {key：value} push到数组中
                temp.grade = item.grade
                temp.code = item.code
                list.push(temp);
            })
        }
        // 调用创建list  将城市传入 ，
        creatList(area, first);

        // 判断area第一选中的index的元素中在原型链上是否存在children属性
        //如果不存在将身份的文本值和value都设置为指定值
        if (area[selectedIndex[0]].hasOwnProperty('children')) {
            // 调用函数  通过第一值拿到children字段的数组 ，second传递数组对象进入
            creatList(area[selectedIndex[0]].children, second);
        } else {
            second = [{
                text: '',
                value: 0
            }];
        }
        //判断城市对象中是否存在children（区）
        if (area[selectedIndex[0]].children[selectedIndex[1]].hasOwnProperty('children')) {
            creatList(area[selectedIndex[0]].children[selectedIndex[1]].children, third);
        } else {
            third = [{
                text: '',
                value: 0
            }];
        }
        const input = document.createElement('input')
        //默认选中的值   
        var picker = new Picker({
            data: [first, second, third], //数组新式显示
            selectedIndex: selectedIndex,
            // title: `${input}`

        });
        //执行picker  拆入默认值，设置当前的文本选中的位置是城市还是区，省份
        // 当用户点击确定的时候，会派发 picker.select 事件，同时会传递每列选择的值数组 selectedVal 和每列选择的序号数组 selectedIndex。
        window.setState = false
        picker.on('picker.select', function (selectedVal, selectedIndex) {

            var text1 = first[selectedIndex[0]].text; //得到城市名称

            var text2 = second[selectedIndex[1]].text;
            // console.log(third[selectedIndex[2]].clazz) //{text: "一年级", value: 0, code: "510767"}
            // 判断第三个数组中是否还存在数据 第三级
            var text3 = third[selectedIndex[2]] ? third[selectedIndex[2]].text : '';
            // 最后拼接返回
            EareCity.value = text1 + ' ' + text2 + ' ' + text3;

            //获取code处  
            // code.push(first[selectedIndex[0]].grade, second[selectedIndex[1]].grade)
            //得到学校类型和班级代码数
            //挂载区域码
            window.areaNum = second[selectedIndex[1]].code
            //保存是否点击了
            window.areaState = true
            //先关闭
            // 获取是否存在值
            const StuBox = document.querySelector('.stu_box')
            const schoolId = document.querySelector('.schoolId')
            //判断学校是否被选择了
            window.setState = true
            // window.dataHttp()
            window.render(AllSchoolData)

            // 有数据处在
            StuBox.textContent = ''

            StuBox.innerHTML += '<input placeholder="请选择学校" class="newInput" readonly>'

            // console.log(window.UplinkData, '点击确认后')
            // 传入位置数组，重新定位轮子选中的位置
            // sliderIndex 代表的是要修改的轮子的索引
            // posIndex 代表位置索引
            mobileSelect5.locatePosition(0, 0)


        });
        //监听change事件picker
        // 当一列滚动停止的时候，会派发 picker.change 事件
        // ，同时会传递列序号 index 及滚动停止的位置 selectedIndex。
        picker.on('picker.change', function (index, selectedIndex) {

            //省份
            if (index === 0) {
                firstChange();
            } else if (index === 1) {
                //
                secondChange();
            }
            // 省份改变后默认选中第一个
            function firstChange() {
                second = [];
                third = [];
                //选择赋值
                checked[0] = selectedIndex;
                var firstarea = area[selectedIndex]; //省份的值
                if (firstarea.hasOwnProperty('children')) {
                    // 第一个children 空数组进行重写显示数据
                    creatList(firstarea.children, second);
                    //根据省份的变化默认选中第一个
                    var secondarea = area[selectedIndex].children[0]
                    // 判断城市里面存在children属性没有，存在则显示第三个区
                    if (secondarea.hasOwnProperty('children')) {
                        creatList(secondarea.children, third);
                    } else {
                        //不存在直接设置为空
                        third = [{
                            text: '',
                            value: 0
                        }];
                        //选中值的第三位设置为0
                        checked[2] = 0;
                    }
                } else {
                    // 全部设置为空  其他选项
                    second = [{
                        text: '',
                        value: 0
                    }];
                    third = [{
                        text: '',
                        value: 0
                    }];
                    checked[1] = 0;
                    checked[2] = 0;
                }

                picker.refillColumn(1, second);
                picker.refillColumn(2, third);
                picker.scrollColumn(1, 0)
                picker.scrollColumn(2, 0)
            }

            function secondChange() {
                third = [];
                checked[1] = selectedIndex;
                var first_index = checked[0];
                if (area[first_index].children[selectedIndex].hasOwnProperty('children')) {
                    var secondarea = area[first_index].children[selectedIndex];
                    creatList(secondarea.children, third);
                    // 重填某一列的数据，index为列序号，data为数据数组。
                    picker.refillColumn(2, third);
                    // 复位某一列的默认选项，index为列序号，dist为选项的下标，起始值为0
                    picker.scrollColumn(2, 0)
                } else {
                    third = [{
                        text: '',
                        value: 0
                    }];
                    checked[2] = 0;
                    picker.refillColumn(2, third);
                    picker.scrollColumn(2, 0)
                }
            }
        });


        // 当用户点击确定的时候，如果本次选择的数据和上一次不一致，
        // 会派发 picker.valuechange 事件，同时会传递每列选择的值数组 
        // selectedVal 和每列选择的序号数组 selectedIndex。
        picker.on('picker.valuechange', function (selectedVal, selectedIndex) {
            let NewHit = document.querySelector('.New_AddMeg')
            NewHit.style.display = 'none'
        });

        EareCity.addEventListener('click', function () {

            // 显示筛选器，next 为筛选器显示后执行的回调函数。
            picker.show();
            // const iptSearch = document.querySelector('.inputSty')
        });



        var LaIcon3 = document.querySelector('.laimg3')

        LaIcon3.addEventListener('click', function () {
            picker.show()


        })
    }




})