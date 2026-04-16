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

// ============================================================
// GENERICS — CONSTRAINTS
// ============================================================


// --- Exercise 1: getProperty com keyof ---
// keyof garante que a chave passada realmente existe no objeto.
// Sem isso, você poderia passar qualquer string e só descobrir
// o erro em tempo de execução.
function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key];
}

const user = { id: "1", name: "John Doe", email: "john@email.com" };

const userName = getProperty(user, "name");   // ✅ string
const userEmail = getProperty(user, "email"); // ✅ string

// Tente descomentar a linha abaixo — TypeScript vai bloquear:
// const invalid = getProperty(user, "phone"); // ❌ "phone" não existe em User

console.log("Name:", userName);
console.log("Email:", userEmail);


// --- Exercise 2: merge com constraints ---
// T e U precisam ser objetos — a constraint "extends object"
// impede que você tente fazer merge de primitivos como string ou number.
function merge<T extends object, U extends object>(a: T, b: U): T & U {
  return { ...a, ...b };
}

const basicInfo = { id: "1", name: "John Doe" };
const contactInfo = { email: "john@email.com", phone: "999-9999" };

const fullProfile = merge(basicInfo, contactInfo);

// TypeScript sabe exatamente quais campos existem no resultado:
console.log("Merged profile:", fullProfile);
console.log("Name:", fullProfile.name);   // ✅ vem de basicInfo
console.log("Email:", fullProfile.email); // ✅ vem de contactInfo

// Tente descomentar abaixo — primitivos não são permitidos:
// merge("hello", "world"); // ❌ string não satisfaz "extends object"


// --- Exercise 3: HasId constraint ---
// Muito comum em repositórios reais — garantir que qualquer
// entidade que passe pelo findById tenha um campo "id".
interface HasId {
  id: string;
}

// A constraint "T extends HasId" garante que T sempre tem "id"
function findById<T extends HasId>(items: T[], id: string): T | null {
  return items.find(item => item.id === id) ?? null;
}

// Funciona com qualquer entidade que tenha "id":
interface Product {
  id: string;
  name: string;
  price: number;
}

const products: Product[] = [
  { id: "p1", name: "Laptop", price: 999 },
  { id: "p2", name: "Mouse", price: 49 },
  { id: "p3", name: "Keyboard", price: 79 },
];

const found = findById(products, "p2");
const notFound = findById(products, "p99");

console.log("Found:", found);       // { id: "p2", name: "Mouse", price: 49 }
console.log("Not found:", notFound); // null