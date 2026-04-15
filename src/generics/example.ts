// The simplest generic — returns exactly what it receives.
// Without generics, you'd use "any" and lose all type safety.
function identity<T>(value: T): T {
  return value;
}

// TypeScript infers the type automatically:
const str = identity("hello");        // T = string
const num = identity(42);             // T = number
const bool = identity(true);          // T = boolean

console.log(str, num, bool);

// You can also pass the type explicitly (less common, but valid):
const explicit = identity<string>("world");
console.log(explicit);


// --- Exercise 2: paginate<T> ---
// A real-world utility used in almost every backend API.
// Returns a paginated structure that works with ANY type of data.
interface PaginatedResult<T> {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
}

function paginate<T>(items: T[], page: number, pageSize: number): PaginatedResult<T> {
  const start = (page - 1) * pageSize;
  const end = start + pageSize;

  return {
    data: items.slice(start, end),
    total: items.length,
    page,
    pageSize,
  };
}

// Works with any type — strings, numbers, objects:
const names = ["Alice", "Bob", "Charlie", "Diana", "Eve"];
const result = paginate(names, 1, 3);
console.log("Paginated:", result);
// { data: ["Alice", "Bob", "Charlie"], total: 5, page: 1, pageSize: 3 }


// --- Exercise 3: Repository<T> interface ---
// The foundation of the Repository Pattern — one of the most used
// design patterns in professional Node.js backends.
interface Repository<T> {
  findById(id: string): T | null;
  findAll(): T[];
  save(item: T): T;
}

// A simple User type to test the repository:
interface User {
  id: string;
  name: string;
  email: string;
}

// In-memory implementation — no database yet, just the structure:
class InMemoryUserRepository implements Repository<User> {
  private users: User[] = [];

  findById(id: string): User | null {
    return this.users.find(u => u.id === id) ?? null;
  }

  findAll(): User[] {
    return this.users;
  }

  save(user: User): User {
    this.users.push(user);
    return user;
  }
}

// Testing the repository:
const userRepo = new InMemoryUserRepository();

userRepo.save({ id: "1", name: "John Doe", email: "john@email.com" });
userRepo.save({ id: "2", name: "Jane Doe", email: "jane@email.com" });

console.log("All users:", userRepo.findAll());
console.log("Find by id:", userRepo.findById("1"));
console.log("Not found:", userRepo.findById("99"));