
// ============================================================
// STRICT MODE EXAMPLES
// Run with: npm run dev
// ============================================================


// --- Example 1: Explicit types ---
// TypeScript can infer, but being explicit is a good habit in strict mode.
const username: string = 'john_doe';
const age: number = 28;
const isActive: boolean = true;

console.log(`User: ${username}, Age: ${age}, Active: ${isActive}`);

// --- Example 2: Typed Function parameters and returns ---
// Without types here, noImplicityAny would  throw an error.
function calculateDiscount (price: number, discountPercent: number): number {
  return price - (price * discountPercent) / 100;
};

const finalPrice: number = calculateDiscount(100,20);
console.log(`Final Price: $${finalPrice}`); // $80

//--- Example 3 handling null with stricNullChecks ---
// strictNullChecks forces you to handle the case  where a value  might be null.
function getUserEmail(userId: string): string | null {
  const fakeDatabase: Record<string, string> = {
    "1": "john@email.com",
    "2": "mari@email.com "
  };
  return fakeDatabase[userId] ?? null;
}

const email = getUserEmail("1");

if (email !== null ) {
  console.log(`Email found: ${email.toUpperCase()}`);
} else {
  console.log("Email not Found")
}

// --- Example 4: Typed object with interface ---
// Interfaces define the shape of an object. Strict mode ensures every field is respected.
interface Address {
  street: string;
  city: string;
  country: string;
  zipCode?: string; // optional field
}

interface UserProfile {
  id: string;
  name: string;
  email: string;
  address: Address;
}

const user: UserProfile = {
  id: "abc-123",
  name: "John Doe",
  email: "john@email.com",
  address: {
    street: "123 Main St",
    city: "Amsterdam",
    country: "Netherlands",
    // zipCode is optional, so it's fine to omit it
  },
};

console.log(`User ${user.name} lives in ${user.address.city}`);

// --- example 5: Typed Array ---
//TypeScript ensures every item in the array  matches  the declared  type.
const skills: string[] = ["node.js", "TypeScript", "PostgreSQL"];

//Alternative syntax: Array<string>
const experiencieYears: Array<number> = [2,5,8];

// push only  accepts  the correct  type  - try pushing  a number into skills:
 //skills.push(42); ← TypeScript will block this
 skills.push("docker");
 experiencieYears.push(10);

 console.log(`Skills: ${skills.join(", ")}`);
 console.log(`Experiences: ${experiencieYears.join(", ")} years`);

 import "./generics/example";