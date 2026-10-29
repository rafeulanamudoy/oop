

class Parent {
   

    public grandFather:string
    protected fatherName:string;
    protected fatherAge:number
    private hidden:string
    constructor(grandFather:string,fatherName:string,FatherAge:number){


    this.grandFather=grandFather
    this.fatherName=fatherName;
    this.fatherAge=FatherAge
    this.hidden="test"
        
    }

}


class Child extends Parent{
     protected myName:string="test"
     protected age:number

    constructor(grandFatherName:string,fatherName:string,fatherAge:number,name:string,age:number){
                


        super(grandFatherName,fatherName,fatherAge)

        this.myName=name
   
        this.age=age

        
    
     }  

    
}


const myself= new Child("ashraf","hasem",60,"chandu",28)


console.log(myself)




const test={
    name:"test"
}





console.log(test)