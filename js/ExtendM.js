export class ExtendM {
    constructor(){

    }
    //原型链继承
    static extend1(){
        function ParType(name) {
            this.name=name;
            this.age=30;
            this.clo=[1,2,3];
        }
        ParType.prototype.work=function () {
            console.log('make money!');
        };
        function SubType() {
            this.stu='good';
        }
        SubType.prototype=new ParType('ppp');
        SubType.prototype.eat=function () {
            console.log('eat food');
        };
        SubType.prototype.work=function(){
            console.log('cost money!');
        };
        let par1=new ParType('parent');
        let sub1=new SubType();
        let sub2=new SubType();
        sub1.work();//执行重定义的方法
        sub1.name='sub';
        sub1.clo.push(5);
        par1.work();//执行父类原来的方法
        console.log(par1.name);//父类实例属性不受影响
        console.log(sub2.clo);
        console.log(sub2.name);
        //缺点1,子类的其中一个实例修改了引用类型值的属性，则所有其他子类型实例都会受影响
        //缺点2,没有办法在不影响所有实例属性的情况下，向父类构造函数传递参数
    }
    //借用构造函数
    static extend2(){
        function ParType(name) {
            this.name=name;
        }
        ParType.prototype.getName=function () {
            return this.name;
        };
        function SubType(name,age) {
            ParType.call(this,name);
            this.age=age;
        }
        SubType.prototype.getAge=function () {
            return this.age
        };
        let sub=new SubType('jack',20);
        console.log(sub.getName());//报错
        console.log(sub.getAge());
        //缺点：父类原型中定义的方法无法复用，优点：可以在初始化子类实例时向父类构造函数中传递参数
    }
    //组合继承(原型链+借用构造函数)
    static extend3(){
        function ParentType(name) {
            this.name=name;
            this.colors=['red','white','blue'];
        }
        ParentType.prototype.sayName=function () {
            return this.name;
        };
        function SubType(name,age) {
            ParentType.call(this,name);
            this.age=20;
        }
        SubType.prototype=new ParentType();
        SubType.prototype.sayAge=function () {
            return this.age;
        };
        let sub1=new SubType('july',18);
        sub1.colors.push('yellow');
        console.log(sub1.sayName());
        let sub2=new SubType('john',19);
        console.log(sub2.colors);
        //优点：既能向父类构造函数传递参数，又能实现函数复用，实例属性之间互不影响，是常见的继承方式
        //缺点:不得不调用父类构造函数两次,子类实例属性不得不重写父类的实例属性
    }
    //原型式继承
    static extend4(){
        let person={
            name:'jjj',
            friends:['a','b','c']
        };
        let person1=Object.create(person);
        person1.friends.push('dd');
        person1.name='ggg';
        console.log(person1.name);
        let person2=Object.create(person);
        console.log(person2.name);
        console.log(person2.friends);
        //相当于对已有对象进行浅复制，适用于仅仅想让一个对象与另外一个对象相似的情况，缺点是对象属性是引用类型值时相互影响
    }
    //寄生式继承
    static extend5(){
        let person={
            name:'person',
            friends: ['a','b','c']
        };
        function createAnother(obj) {
            let clone=Object.create(obj);
            clone.sayBye=function () {
                console.log(this.name);
            };
            return clone;
        }
        let person1=createAnother(person);
        person1.sayBye();
        //缺点，无法实现函数复用，跟借用构造函数类似
    }
    //寄生组合式继承
    static extend6(){
        function f(sub,par) {
            let pro=Object.create(par.prototype);
            pro.constructor=sub;
            sub.prototype=pro;
        }
        function ParType(name) {
            this.name=name;
            this.colors=['a','b','c'];
        }
        ParType.prototype.sayColors=function () {
            console.log(this.colors);
        };
        function SubType(name) {
            ParType.call(this,name)
        }
        f(SubType,ParType);
        let sub=new SubType('ddd');
        sub.sayColors();
        sub.colors.push('dddddd');
        let sub1=new SubType('ggg');
        //比较理想的继承方式，没有组合继承的缺点
    }
}