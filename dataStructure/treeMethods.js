
//广度优先遍历
function treeForeach2(tree, func) {
    let node, list = [...tree];
    while (node = list.shift()) {
        func(node);
        node.children && list.push(...node.children);
    }
}

//深度优先遍历(先序)-递归
function treeForeach(tree, func) {
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
    let node, list = [...tree], i = 0, expanded = new Map();
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
function listToTree(list) {
    let info = list.reduce((map, node) => {
        map[node.id] = node, node.children = [];
        return map;
    }, {});
    return list.filter(node => {
        info[node.parentId] && info[node.parentId].children.push(node);
        return !node.parentId
    })
}
//树结构转列表-递归
function treeToList (tree, result = [], level = 0) {
    tree.forEach(node => {
        result.push(node)
        node.level = level + 1
        node.children && treeToList(node.children, result, level + 1)
    })
    return result
}
//树结构转列表-循环
function treeToList2 (tree) {
    let node, result = tree.map(node => (node.level = 1, node))
    for (let i = 0; i < result.length; i++) {
        if (!result[i].children) continue
        let list = result[i].children.map(node => (node.level = result[i].level + 1, node))
        result.splice(i+1, 0, ...list)
    }
    return result
}
//查找树中的某个节点
function treeFind (tree, func) {
    for (const data of tree) {
        if (func(data)) return data
        if (data.children) {
            const res = treeFind(data.children, func)
            if (res) return res
        }
    }
    return null
}

//树结构筛选
function treeFilter (tree, func) {
    // 使用map复制一下节点，避免修改到原树
    return tree.map(node => ({ ...node })).filter(node => {
        node.children = node.children && treeFilter(node.children, func)
        return func(node) || (node.children && node.children.length)
    })
}
//查找满足条件的节点
function treeNodeFind (tree, func) {
    for (const data of tree) {
        if (func(data)) return data
        if (data.children) {
            const res = treeFind(data.children, func)
            if (res) return res
        }
    }
    return null
}

//查找节点路径
function treeFindPath (tree, func, path = []) {
    if (!tree) return [];
    for (const data of tree) {
        path.push(data.id);
        if (func(data)) return path;
        if (data.children) {
            const findChildren = treeFindPath(data.children, func, path)
            if (findChildren.length) return findChildren
        }
        path.pop();
    }
    return []
}
//查找多条节点路径
function treeFindPath2 (tree, func, path = [], result = []) {
    for (const data of tree) {
        path.push(data.id);
        if(func(data)){
            result.push([...path]);
        }
        data.children && treeFindPath2(data.children, func, path, result);
        path.pop();
    }
    return result
}

function TreeNode(val){
    this.val=val;
    this.left=null;
    this.right=null;
}
//根据二叉树的层次遍历的序列结果，创建二叉树
function createTree_levelOrder(levelOrderArr) {
    if(levelOrderArr.length){
        let root=new TreeNode(levelOrderArr.shift());
        let quene=[root];
        while (quene.length){
            let head=quene.shift();
            if(levelOrderArr.length){
                head.left=new TreeNode(levelOrderArr.shift());
                quene.push(head.left);
            }
            if(levelOrderArr.length){
                head.right=new TreeNode(levelOrderArr.shift());
                quene.push(head.right);
            }
        }
        return root;
    }
    return null;
}
//生成二叉树层次遍历的序列结果
function createLevelOrder_tree(root) {
    if(!root){
        return [];
    }
    let res=[];
    let quene=[root];
    while (quene.length){
        let node=quene.shift();
        if(node){
            res.push(node.val);
            node.left && quene.push(node.left);
            node.right && quene.push(node.right);
        }
    }
    return res;
}

export  {
    treeForeach,
    listToTree,
    treeToList,
    treeFilter,
    treeNodeFind,
    treeFind,
    treeFindPath,
    treeFindPath2,
    createTree_levelOrder,
    createLevelOrder_tree
}
