class User {
  public test: string = "text";

  protected test2: string = "protected";
  private test3: string = "private";

  public name: string;
  public age: number;
  constructor(name: string, age: number) {
    this.name = name;
    this.age = age;
  }

  static test3Fucntion(test: string) {
    return test;
  }
  public testFunction() {
    console.log(this, "check this ");
    // console.log(this.test2,"check test2")
    // console.log(this.test3,"check test2")
  }

  protected test2Function() {
    console.log(this, "check this from protected funciton");
  }

}

const testObject = new User("abul", 20);

console.log(testObject.testFunction(), "call method");

console.log(testObject, "check instance");

User.test3Fucntion("value");
console.log(User.test3Fucntion("value"));
