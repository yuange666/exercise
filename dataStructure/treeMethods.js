//树结构数据示例
let tree = [
    {
        id: '1',
        title: '节点1',
        children: [
            {
                id: '1-1',
                title: '节点1-1',
                children: [
                    {
                        id: '1-1-1',
                        title: '节点1-1-1',
                        children: [
                            {
                                id: '1-1-1-1',
                                title: '节点1-1-1-1',
                            }
                        ]
                    }
                ]
            },
            {
                id: '1-2',
                title: '节点1-2'
            }
        ]
    },
    {
        id: '2',
        title: '节点2',
        children: [
            {
                id: '2-1',
                title: '节点2-1'
            }
        ]
    }
];
//列表结构数据
let list = [
    {
        id: '1',
        title: '节点1',
        parentId: '',
    },
    {
        id: '1-1',
        title: '节点1-1',
        parentId: '1'
    },
    {
        id: '1-2',
        title: '节点1-2',
        parentId: '1'
    },
    {
        id: '2',
        title: '节点2',
        parentId: ''
    },
    {
        id: '2-1',
        title: '节点2-1',
        parentId: '2'
    }
];
//广度优先遍历
function treeForeach(tree, func) {
    let node, list = [...tree];
    while (node = list.shift()) {
        func(node);
        node.children && list.push(...node.children);
    }
}

//深度优先遍历(先序)-递归
function treeForeach2(tree, func) {
    tree.forEach(data => {
        func(data);
        data.children && treeForeach2(data.children, func);
    })
}

//深度优先遍历(后序)-递归
function treeForeach3(tree, func) {
    tree.forEach(data => {
        data.children && treeForeach3(data.children, func);
        func(data);
    })
}

//深度优先遍历(先序)-循环
function treeForeach4(tree, func) {
    let node, list = [...tree];
    while (node = list.shift()) {
        func(node);
        node.children && list.unshift(...node.children);
    }
}
//深度优先遍历(后序)-循环
function treeForeach5(tree, func) {
    let node, list = [...tree], i =  0, expanded = new Map();
    while (node = list[i]) {
        let childCount = node.children ? node.children.length : 0;
        if (!childCount || node.children[childCount - 1] === list[i - 1]) {
            func(node);
            i++;
        } else {
            list.splice(i, 0, ...node.children);
        }
    }
}

//列表结构转为树结构
function listToTree (list) {
    let info = list.reduce((map, node) => (map[node.id] = node, node.children = [], map), {})
    return list.filter(node => {
        info[node.parentId] && info[node.parentId].children.push(node)
        return !node.parentId
    })
}

function listToTree2(list) {
    let res=[];
    list.filter(e=>!e.parentId)
}
export {
    treeForeach,
    treeForeach2,
    treeForeach3,
    treeForeach4,
    treeForeach5
}
