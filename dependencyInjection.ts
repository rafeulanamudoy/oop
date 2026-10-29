// ==========================================
// PROBLEM 1: Shipping Calculator Service
// ==========================================
//Dependency Injection (DI) is a core design pattern where a class receives its dependencies (its tools, like databases or shipping providers) from an external source via its constructor rather than instantiating them internally. In the refactored code above, several professional architectural practices were applied to solve major backend problems: Constructor Injection was used to bind against abstractions (interfaces) rather than concrete implementations, allowing the application to seamlessly swap between production modules (like PostgresUserRepository) and test modules (like InMemoryUserRepository) without altering service code. Furthermore, constructors were strictly reserved for wiring dependencies into private class properties, while all business logic was moved into dedicated methods (getEstimatedCost and registerUser). This ensures that services remain completely stateless, safe to use as global Singletons in high-traffic frameworks, and fully reusable across multiple requests without risking data concurrency bugs.
//

//Dependency Injection is heavily relied upon in automated testing because it completely decouples business logic from external infrastructure like databases and third-party APIs. By allowing developers to pass mock implementations, stubs, or in-memory repositories into classes via their constructors, DI ensures that unit tests run in complete isolation at lightning-fast speeds without hitting real networks or persistent storage. This enables developers to simulate complex edge cases and failure states on demand while completely eliminating the risk of polluting live production data with test artifacts.
interface ShippingProvider {
  calculateShippingCost(weight: number): number;
}

class FedExShipping implements ShippingProvider {
  public calculateShippingCost(weight: number): number {
    return weight * 5; // e.g., $5 per kg via FedEx
  }
}

class DhclShipping implements ShippingProvider {
  public calculateShippingCost(weight: number): number {
    return weight * 3; // e.g., $3 per kg via DHCL
  }
}

class OrderCheckoutService {
  //  GOOD PRACTICE: Store dependency as a private property (Wiring only)
  constructor(private shippingProvider: ShippingProvider) {}

  //  GOOD PRACTICE: Business logic lives in a reusable method, not the constructor
  public getEstimatedCost(weight: number): number {
    return this.shippingProvider.calculateShippingCost(weight);
  }
}

// Execution
const fedExShipping = new FedExShipping();
const checkoutService = new OrderCheckoutService(fedExShipping); // Injected!
console.log("Estimated Cost:", checkoutService.getEstimatedCost(10));

// ==========================================
// PROBLEM 2: Authentication & User Service
// ==========================================

interface UserRepository {
  saveUser(userName: string): void;
}

class PostgresUserRepository implements UserRepository {
  private postgresDb: string[] = [];

  public saveUser(userName: string): void {
    this.postgresDb.push(userName);
    console.log(`[Postgres]: Saved user "${userName}" to SQL database.`);
  }
}

class InMemoryUserRepository implements UserRepository {
  private storage: string[] = [];

  public saveUser(userName: string): void {
    this.storage.push(userName);
    console.log(`[InMemory]: Saved user "${userName}" to test storage.`);
  }
}

class AuthService {
  //  GOOD PRACTICE: Constructor accepts the interface contract, not a hardcoded database
  constructor(private repository: UserRepository) {}

  //  GOOD PRACTICE: Action is triggered via a method call per user request
  public registerUser(userName: string): void {
    this.repository.saveUser(userName);
  }
}

// Execution (Production vs. Test Environments)
const inMemoryRepo = new InMemoryUserRepository();
const testAuthService = new AuthService(inMemoryRepo); // Injected mock for testing!
testAuthService.registerUser("rafe");

const postgresRepo = new PostgresUserRepository();
const prodAuthService = new AuthService(postgresRepo); // Injected real DB for production!
prodAuthService.registerUser("rafe");
