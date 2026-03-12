/**
 * SOLID Principles Data
 * Contains all principle definitions and cascade relationships
 * Separated for maintainability and reusability
 */

export type PrincipleKey = 'S' | 'O' | 'L' | 'I' | 'D';

export interface Principle {
  title: string;
  full: string;
  color: string;
  text: string;
  description?: string;
}

export interface Cascade {
  id: string;
  from: PrincipleKey;
  to: PrincipleKey;
  label: string;
  description: string;
  code: string;
}

export const PRINCIPLES: Record<PrincipleKey, Principle> = {
  S: {
    title: 'SRP',
    full: 'Single Responsibility',
    color: 'bg-blue-500',
    text: 'text-blue-500',
    description: 'A class should have only one reason to change'
  },
  O: {
    title: 'OCP',
    full: 'Open/Closed',
    color: 'bg-emerald-500',
    text: 'text-emerald-500',
    description: 'Open for extension, closed for modification'
  },
  L: {
    title: 'LSP',
    full: 'Liskov Substitution',
    color: 'bg-purple-500',
    text: 'text-purple-500',
    description: 'Subtypes must be substitutable for their base types'
  },
  I: {
    title: 'ISP',
    full: 'Interface Segregation',
    color: 'bg-orange-500',
    text: 'text-orange-500',
    description: 'Clients should not depend on interfaces they don\'t use'
  },
  D: {
    title: 'DIP',
    full: 'Dependency Inversion',
    color: 'bg-rose-500',
    text: 'text-rose-500',
    description: 'Depend on abstractions, not concretions'
  }
};

export const CASCADES: Cascade[] = [
  {
    id: 'isp-lsp',
    from: 'I',
    to: 'L',
    label: 'The Fat Interface Trap',
    description: 'Fat interfaces force clients to implement methods they don\'t need. These "empty" or "throwing" implementations break the substitution contract.',
    code: `// VIOLATION
public interface IWorker { 
  void Work(); 
  void Eat(); 
}

public class Robot : IWorker {
  public void Work() => DoWork();
  public void Eat() => throw new NotSupportedException(); // LSP BROKEN!
}`
  },
  {
    id: 'lsp-dip',
    from: 'L',
    to: 'D',
    label: 'The Type-Checking Rot',
    description: 'When a subtype breaks behavior (LSP), the caller can no longer trust the abstraction. This forces the caller to check for specific types, effectively depending on concretions.',
    code: `// VIOLATION
public void Process(IWorker w) {
  if (w is Robot) { /* specialized logic */ } // DIP BROKEN! 
  else w.Eat();
}`
  },
  {
    id: 'lsp-ocp',
    from: 'L',
    to: 'O',
    label: 'Modification via Subtyping',
    description: 'If every new subtype requires an "if-else" check in the main logic, the system is no longer closed to modification.',
    code: `// VIOLATION
public double Calc(Shape s) {
  if (s is Square) return ...;
  if (s is Circle) return ...; // OCP BROKEN: Must modify for every new shape
}`
  },
  {
    id: 'srp-ocp',
    from: 'S',
    to: 'O',
    label: 'The Single Change Nexus',
    description: 'A class with multiple responsibilities is a magnet for change. You cannot add behavior (Extend) without risking side effects in unrelated logic (Modify).',
    code: `// VIOLATION
public class Report {
  public void Generate() { ... }
  public void SaveToDatabase() { ... } 
  // SRP violation makes OCP extension risky
}`
  },
  {
    id: 'ocp-dip',
    from: 'O',
    to: 'D',
    label: 'Coupling Reveal',
    description: 'If you find you cannot extend behavior without changing code, it reveals that your "abstraction" was actually tightly coupled to a specific implementation detail.',
    code: `// REVEAL
// If changing the DB requires changing the Service class, 
// the Service was never truly depending on an abstraction.`
  },
  {
    id: 'dip-ocp',
    from: 'D',
    to: 'O',
    label: 'The Structural Prerequisite',
    description: 'DIP is the engine for OCP. Without Dependency Injection/Abstractions, there is no way to swap behavior without editing the source code.',
    code: `// DIP = OCP Enabler
public class OrderService(IPaymentProcessor proc) {
  // We can add "Crypto" without touching this class.
}`
  },
  {
    id: 'isp-dip',
    from: 'I',
    to: 'D',
    label: 'The Hidden Concretion',
    description: 'A "God Interface" (ISP violation) acts exactly like a concrete class because it carries specific implementation assumptions that leak across layers.',
    code: `// VIOLATION
public interface IEverything { 
  void Query(); 
  void Log(); 
  void Email(); 
}
// Too specific to implementation, not domain needs.`
  },
  {
    id: 's-isp',
    from: 'S',
    to: 'I',
    label: 'God Interface Cascade',
    description: 'A God Class (SRP violation) inevitably produces a God Interface (ISP violation). Clients inherit all the bloat of the class they depend on.',
    code: `// SRP -> ISP
public class Manager : IManager { 
  // IManager has 50 methods because Manager does 50 things
  // Every client of IManager is now bloated.
}`
  },
  {
    id: 'srp-lsp',
    from: 'S',
    to: 'L',
    label: 'Contract Bloat',
    description: 'When a class does too much, its contract becomes too complex for any subclass to honor fully, leading to broken substitution.',
    code: `// VIOLATION
public class MultiTool { 
  public virtual void Drill() { ... }
  public virtual void Saw() { ... }
}
public class HandDrill : MultiTool { 
  public override void Saw() => throw new Error(); 
  // SRP bloat caused LSP fail
}`
  }
];
