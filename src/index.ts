// Se esse arquivo compilar sem erros, seu ambiente está 100% configurado.

// Testando strict mode — tente descomentar a linha abaixo e veja o erro:
// const name = undefined;
// console.log(name.toUpperCase()); // ← strictNullChecks vai barrar isso

// Testando noImplicitAny — tente descomentar abaixo e veja o erro:
// function greet(name) { return `Hello, ${name}` } // ← noImplicitAny vai barrar isso

// Código válido com strict mode:
function greet(name: string): string {
  return `Hello, ${name}! TypeScript strict mode is active.`;
}

const message: string = greet("World");
console.log(message);