abstract class ParentClass {
  test() {}
  abstract testVar: string;
   private privateValue2="somethid 2"
  abstract test2(): string;
}

class ChildClass extends ParentClass {
   testVar: string = "test";
   private privateValue="somethid"
  test2(): string {
    return "test";
  }
  test3(): string {
    return "test";
  }
  constructor() {
    super();
  }
}



const result = new ChildClass();
// console.log(Object.getOwnPropertyNames(ChildClass.prototype));
// console.log(Object.keys(result));
console.log(result);
