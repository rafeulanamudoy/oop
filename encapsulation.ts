
class PostgreSqlConnection {
  private storage: any[] = [];

  constructor(private connectionString: string) {
    console.log(`[DB Connection]: Connected to database at ${this.connectionString}`);
  }

  public insertData(data: any) {
    this.storage.push(data);
    console.log("[PostgreSqlConnection]: Data inserted successfully into table.");
  }
}


abstract class DbRepository {
  abstract saveOrderToDb(orderData: any): void;
}


class PostgreSql implements DbRepository {
 
  constructor(private dbClient: PostgreSqlConnection) {}

  public saveOrderToDb(orderData: any): void {
    this.dbClient.insertData(orderData);
  }
}


class MockData implements DbRepository {
  private storage: any[] = [];
  
  public saveOrderToDb(orderData: any): void {
    this.storage.push(orderData);
    console.log("[MockDatabase]: Order saved safely to temporary memory.");
  }
}


class OrderService {

  constructor(private dbRepo: DbRepository) {}

  public createOrder(item: string, price: number) {
    const order = { item, price, date: new Date() };
    console.log(`[OrderService]: Processing order for "${item}"...`);

  
    this.dbRepo.saveOrderToDb(order);
    console.log(this,"check this ")
  }
}


console.log("--- SCENARIO A: Running with Production PostgreSQL ---");

const realConnection = new PostgreSqlConnection("postgresql://localhost:5432/production_db");

const postgresRepo = new PostgreSql(realConnection);

const orderServiceWithPg = new OrderService(postgresRepo);

orderServiceWithPg.createOrder("Mechanical Keyboard", 120);


console.log("\n--- SCENARIO B: Running Unit Test with Mock Database ---");

const mockRepo = new MockData();

const orderServiceWithMock = new OrderService(mockRepo);

orderServiceWithMock.createOrder("Gaming Mouse", 60);