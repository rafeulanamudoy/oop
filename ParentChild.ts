class ParentClass {
    protected testParent="teest"
  constructor( endPoint: string) {
    // console.log(endPoint, "inside constructor of parent ");

    console.log(this, "check this inside constructor of parent ");
  }

  protected async getUrl(baseUrl: string) {
    console.log(baseUrl, "check direct url inside method ");
    console.log(this, "check this inside get url method ");
  }
}

class ChildClass extends ParentClass {
   protected test2:undefined
    protected test="test variable"
  constructor(baseUrl: string) {
  
    super(baseUrl);
   
    // console.log(baseUrl, "inside constructor in child ");

    // console.log(this, "check this inside constructor in child ");
  }

  public fetchUsers() {

   console.log(this,"check this ")
   return this
  }
}
const userService = new ChildClass("test/link"); 
//   const parentService=new ParentClass("test")
//   const user2Service = new ChildClass("test/link"); 
const output=userService.fetchUsers()


