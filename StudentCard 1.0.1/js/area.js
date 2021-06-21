var area = [{
        "label": "绵阳",
        "value": "510700",
        "code": "5107",
        "grade": '1',
        'children': [{

                "label": "涪城区",
                "value": "510767",
                "code": 1001,
                "grade": 1,
                "children": []

            }, {

                "label": "游仙区",
                "value": "510767",
                "code": 1002,
                "grade": 1,
                "children": []

            }, {

                "label": "安州区",
                "value": "510767",
                "code": 1003,
                "children": []


            },
            {

                "label": "其他位置地区",
                "value": "510767",
                "code": 1000,
                "grade": 1,
                'children': []
            }


        ]
    }

]







// area.forEach(function (item, index, arr) {
//     console.log(item, 'Miany')
//     item.children.forEach(function (obj, index, arr) {
//         showArrAear.forEach(function (numtest, keys) {
//             if (numtest.uid == obj.code) {
//                 console.log(numtest, 'numitem')
//                 if (numtest.children.length == 0) {
//                     item.children.splice(index, 1)
//                     console.log('12')
//                 }
//             }

//         })
//     })
// })