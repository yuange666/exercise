class Node{
    constructor(key){
        this.key=key;
        this.left=null;
        this.right=null;
    }
}
//二叉搜索树
export default class {
    constructor(){
        this.root=null;
    }
    //插入值
    insert(key){
        let newNode=new Node(key);
        if(this.root===null){
            this.root=newNode;
        }else {
            this.insertNode(this.root,newNode);
        }
    }
    //插入值辅助函数
    insertNode(node,newNode){
        if(newNode.key<node.key){
            if(node.left===null){
                node.left=newNode;
            }else {
                this.insertNode(node.left,newNode);
            }
        }else {
            if(node.right===null){
                node.right=newNode;
            }else {
                this.insertNode(node.right,newNode);
            }
        }
    }
    //中序遍历树
    inOrderTraverse(callback){
        this.inOrderTraverseNode(this.root,callback);
    }
    inOrderTraverseNode(node,callback){
        if(node!==null){
            this.inOrderTraverseNode(node.left,callback);
            callback(node.key);
            this.inOrderTraverseNode(node.right,callback);
        }
    }
    //先序遍历
    preOrderTraverse(callback){
        this.preOrderTraverseNode(this.root,callback);
    }
    preOrderTraverseNode(node,callback){
        if(node!==null){
            callback(node.key);
            this.preOrderTraverseNode(node.left,callback);
            this.preOrderTraverseNode(node.right,callback);
        }
    }
    //后序遍历
    postOrderTraverse(callback){
        this.postOrderTraverseNode(this.root,callback);
    }
    postOrderTraverseNode(node,callback){
        if(node!==null){
            this.postOrderTraverseNode(node.left,callback);
            this.postOrderTraverseNode(node.right,callback);
            callback(node.key);
        }
    }
    //树的最小值
    min(){
        return this.minNode(this.root);
    }
    minNode(node){
        if(node){
            while (node && node.left!==null){
                node=node.left;
            }
            return node.key
        }
        return null
    }
    //树的最大值
    max(){
        return this.maxNode(this.root);
    }
    maxNode(node){
        if(node){
            while(node && node.right!==null){
                node=node.right;
            }
            return node.key;
        }
        return null
    }
}