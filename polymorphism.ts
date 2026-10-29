//Polymorphism (meaning "many forms") is an OOP pillar that allows different classes to implement the exact same method name or interface, but behave in their own unique way.

//In backend development, this is typically split into two types:

//Run-time Polymorphism (Method Overriding): Child classes provide their own implementation of a method defined in a parent class or abstract class. The correct method is resolved dynamically at runtime based on the object passed in.

//Compile-time Polymorphism (Method Overloading): A single class has multiple methods with the same name but different parameters.


//This code demonstrates runtime polymorphism via method overriding by utilizing an abstract base class Sender with a contract method send(). Concrete child classes (EmailSender, SmsSender, and PushNotificationSender) implement their own unique logic for delivering notifications. The polymorphic function triggerNotification accepts any Sender object interchangeably and invokes .send(), allowing the application to dynamically execute the correct behavior at runtime without a single fragile if/else statement. This architectural pattern eliminates tight coupling and follows the Open-Closed Principle, ensuring that new notification channels can be added effortlessly without modifying any existing core service code.
abstract class Sender {
  abstract send(): void;
}

// 2. Concrete Implementation 1
class EmailSender extends Sender {
  public send(): void {
    console.log("Email sent successfully!");
  }
}

// 3. Concrete Implementation 2
class SmsSender extends Sender {
  public send(): void {
    console.log("SMS message sent successfully!");
  }
}

// 4. Concrete Implementation 3
class PushNotificationSender extends Sender {
  public send(): void {
    console.log("Push notification sent successfully!");
  }
}

// 5. Polymorphic Function: Treats any Sender interchangeably 
function triggerNotification(senderObject: Sender) {
  console.log("Preparing notification system...");
  
  // Polymorphism ensures the correct .send() method runs 
  // depending on what object was passed in!
  senderObject.send(); 
}

// ==========================================
// RUNNING IT IN PRACTICE (Polymorphism in Action)
// ==========================================

const myEmail = new EmailSender();
const mySms = new SmsSender();
const myPush = new PushNotificationSender();

// Passing completely different objects into the exact same function:
triggerNotification(myEmail); 
// Output: Preparing notification system... Email sent successfully!

triggerNotification(mySms);   
// Output: Preparing notification system... SMS message sent successfully!

triggerNotification(myPush);