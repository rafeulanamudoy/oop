//Encapsulation is the OOP pillar of bundling data (state) and the methods that operate on that data into a single unit (a class), while restricting direct access to the object's internal state from the outside world using access modifiers like private or protected.

//Why we use it: We use encapsulation for data security and integrity. It prevents external code from accidentally or maliciously corrupting an object's internal data. Instead of exposing raw data, the class provides controlled public entry points (methods, getters, and setters) that enforce validation rules before any state is modified.

//"For example, in a UserProfile class, sensitive properties like walletBalance and passwordHash are marked as private. Outside code cannot modify them directly. Instead, we expose a public method like depositMoney(amount) or setPassword(). This public method acts as a security guard—it validates the input (such as making sure a deposit isn't negative) and then safely updates the private balance internally. This ensures our app never enters an invalid state."
class UserProfile {
  //  1. PRIVATE DATA: Completely hidden from the outside world
  private passwordHash: string = "";
  private walletBalance: number = 0;

  //  2. PRIVATE HELPER: Only this class knows how to hash passwords. 
  // External code cannot call this directly.
  private hashPassword(rawPassword: string): string {
    console.log("Hashing password securely...");
    return `hashed_${rawPassword}`; // Simulating a secure hash
  }

  //  3. PUBLIC ENTRY POINT (SETTER): Safe way to set a password
  public setPassword(rawPassword: string) {
    if (rawPassword.length < 6) {
      throw new Error("Password must be at least 6 characters long!");
    }
    // Internally calls the private method safely!
    this.passwordHash = this.hashPassword(rawPassword);
    console.log("Password successfully updated.");
  }

  // 4. PUBLIC ENTRY POINT: Safe way to deposit money with validation
  public depositMoney(amount: number) {
    if (amount <= 0) {
      console.log("Error: Deposit amount must be greater than zero!");
      return;
    }
    
    // Safely updates the private balance
    this.walletBalance += amount;
    console.log(`Successfully deposited $${amount}. Current balance: $${this.walletBalance}`);
  }

  // 5. PUBLIC GETTER: Safe way to READ the balance without allowing anyone to modify it
  public getBalance(): number {
    return this.walletBalance;
  }
}