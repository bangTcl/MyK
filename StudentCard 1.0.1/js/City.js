window.addEventListener('load', function () {
    var HitMsgList = document.querySelectorAll('.hit_msg')
    var CityName = document.querySelector('#sel_city');

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

            temp.clazz = item.clazz
            list.push(temp);


        })
    }
    // 调用创建list  将城市传入 ，
    creatList(CityData, first);

    // 判断CityData第一选中的index的元素中在原型链上是否存在children属性
    //如果不存在将身份的文本值和value都设置为指定值
    if (CityData[selectedIndex[0]].hasOwnProperty('children')) {
        // 调用函数  通过第一值拿到children字段的数组 ，second传递数组对象进入
        creatList(CityData[selectedIndex[0]].children, second);
    } else {
        second = [{
            text: '',
            value: 0
        }];
    }
    //判断城市对象中是否存在children（区）
    if (CityData[selectedIndex[0]].children[selectedIndex[1]].hasOwnProperty('children')) {
        creatList(CityData[selectedIndex[0]].children[selectedIndex[1]].children, third);
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

    picker.on('picker.select', function (selectedVal, selectedIndex) {
        var text1 = first[selectedIndex[0]].text; //得到城市名称


        var text2 = second[selectedIndex[1]].text;
        // console.log(third[selectedIndex[2]].clazz) //{text: "一年级", value: 0, code: "510767"}
        // 判断第三个数组中是否还存在数据 第三级
        var text3 = third[selectedIndex[2]] ? third[selectedIndex[2]].text : '';
        // 最后拼接返回
        CityName.value = text1 + ' ' + text2 + ' ' + text3;

        //获取code处  
        // code.push(first[selectedIndex[0]].grade, second[selectedIndex[1]].grade)
        //得到学校类型和班级代码数

        window.clascs = [];
        clascs.push(second[selectedIndex[1]].grade, third[selectedIndex[2]].text) //[stu,1]
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
            var firstCityData = CityData[selectedIndex]; //省份的值
            if (firstCityData.hasOwnProperty('children')) {
                // 第一个children 空数组进行重写显示数据
                creatList(firstCityData.children, second);
                //根据省份的变化默认选中第一个
                var secondCityData = CityData[selectedIndex].children[0]
                // 判断城市里面存在children属性没有，存在则显示第三个区
                if (secondCityData.hasOwnProperty('children')) {
                    creatList(secondCityData.children, third);
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
            if (CityData[first_index].children[selectedIndex].hasOwnProperty('children')) {
                var secondCityData = CityData[first_index].children[selectedIndex];
                creatList(secondCityData.children, third);
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
        HitMsgList[2].style.display = 'none'

    });

    CityName.addEventListener('click', function () {
        // 显示筛选器，next 为筛选器显示后执行的回调函数。
        picker.show();

        // const iptSearch = document.querySelector('.inputSty')
    });
    //调用picker
    var LaIcon = document.querySelector('.laimg2')

    LaIcon.addEventListener('click', function () {
        picker.show()
    })






})