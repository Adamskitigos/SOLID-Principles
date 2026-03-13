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
  concept?: {
    title: string;
    description: string;
    highlights?: string[];
  };
  diagnosticQuestions?: string[];
  lspTable?: {
    rules: { name: string; description: string }[];
  };
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
    description: 'A class should have only one reason to change',
    concept: {
      title: 'Actor-Centric Design',
      description: 'A class or module should be dedicated to a single stakeholder or actor, ensuring it has only one reason to change.'
    },
    diagnosticQuestions: [
      'Who are the stakeholders that could request a change to this class?',
      'If two methods changed independently, could they conflict?',
      'Can you name the responsibility in a single noun phrase without using "and"?',
      'Does this class have more than one reason to be instantiated by different callers?'
    ]
  },
  O: {
    title: 'OCP',
    full: 'Open/Closed',
    color: 'bg-emerald-500',
    text: 'text-emerald-500',
    description: 'Open for extension, closed for modification',
    concept: {
      title: 'Strategic Closure',
      description: 'Since no program can be fully closed to all changes, designers should strategically apply the Open-Closed Principle by closing modules against the most likely changes based on experience and context.'
    },
    diagnosticQuestions: [
      'Does adding a new variant require editing existing, working code?',
      'Are there if/else or switch chains that grow every sprint?',
      'Can a new team member extend behavior without understanding the core?',
      'Would adding a new feature here break existing tests?'
    ]
  },
  L: {
    title: 'LSP',
    full: 'Liskov Substitution',
    color: 'bg-purple-500',
    text: 'text-purple-500',
    description: 'Subtypes must be substitutable for their base types',
    concept: {
      title: 'The 3 Rules of Substitutability',
      description: 'To safely substitute a base class with its derived class, three strict rules must be followed:',
      highlights: [
        'Signature Rule: Subtypes must maintain compatible method signatures (contravariant arguments, covariant returns, and matching exceptions).',
        'Properties Rule: Subtypes must preserve class invariants and history constraints (no mutating state the base class promised to keep immutable).',
        'Methods Rule: Subtypes cannot strengthen preconditions or weaken postconditions of the parent.'
      ]
    },
    diagnosticQuestions: [
      'Can every subtype be passed where the base type is expected without callers noticing?',
      'Does any subtype throw exceptions the base type never declared?',
      'Does any override ignore or stub out a parent method with // not supported?',
      'Do any subtypes strengthen preconditions — demanding more from callers than the parent did?',
      'Does the IS-A relationship hold behaviorally, not just conceptually?'
    ],
    lspTable: {
      rules: [
        { name: 'Preconditions', description: 'A subclass cannot require stricter conditions than the parent. It must accept at least everything the parent accepts, or even more.' },
        { name: 'Postconditions', description: 'A subclass must guarantee results that are at least as strong as the parents promises. It can return better or more specific results, but never worse.' },
        { name: 'Invariants', description: 'All core rules or state constraints defined by the parent must always remain true in the subtype.' },
        { name: 'Exceptions', description: 'A subclass cannot introduce new unexpected exception types beyond what the parent specifies.' }
      ]
    }
  },
  I: {
    title: 'ISP',
    full: 'Interface Segregation',
    color: 'bg-orange-500',
    text: 'text-orange-500',
    description: 'Clients should not depend on interfaces they don\'t use',
    concept: {
      title: 'Interesting Fact: The Compilation Tax',
      description: 'Beyond confusing developers, the "Fat Interface" problem has hidden costs. In compiled languages like C++ or Java, depending on a bloated interface forces unnecessary and costly recompilation of all dependent clients, even when unrelated methods are modified.'
    },
    diagnosticQuestions: [
      'Does any class implement an interface method with throw new NotSupportedException()?',
      'Do clients import an interface but only ever call one or two of its methods?',
      'Does a change to a method break classes that never call that method?',
      'Are interface names vague like IManager, IService, IHelper?'
    ]
  },
  D: {
    title: 'DIP',
    full: 'Dependency Inversion',
    color: 'bg-rose-500',
    text: 'text-rose-500',
    description: 'Depend on abstractions, not concretions',
    concept: {
      title: 'DIP vs. Inversion of Control (IoC)',
      description: 'DIP dictates that high-level modules depend on abstractions, not low-level concretions. Inversion of Control is the broader mechanism that flips the execution flow, handing over control of dependency creation to a framework.'
    },
    diagnosticQuestions: [
      'Does the high-level policy depend on low-level implementation details (e.g., specific database classes or external API clients)?',
      'Can you unit test the core business logic without spinning up a database or making network calls?',
      'Are dependencies injected via interfaces or constructors rather than being instantiated inside the class?',
      'When a new external system is integrated, does it require modifying the core business rules?',
      'Do the names of your interfaces describe the business need rather than the technical implementation?'
    ]
  }
};

export const CASCADES: Cascade[] = [
  {
    id: 'isp-lsp',
    from: 'I',
    to: 'L',
    label: 'The Fat Interface Trap',
    description: 'Fat interfaces force clients to implement methods they don\'t need. These "empty" or "throwing" implementations break the substitution contract.',
    code: `// --- PROBLEM: "Fat" Interface ---
public interface IMachine {
    void Print();
    void Scan();
}

public class BasicPrinter : IMachine {
    public void Print() => Console.WriteLine("Printing...");
    public void Scan() => throw new NotImplementedException();
}

// --- SOLUTION: Interface Segregation (ISP) ---
public interface IPrinter { void Print(); }
public interface IScanner { void Scan(); }

public class SimplePrinter : IPrinter {
    public void Print() => Console.WriteLine("Printing only.");
}

public class SmartDevice : IPrinter, IScanner {
    public void Print() => Console.WriteLine("Printing...");
    public void Scan() => Console.WriteLine("Scanning...");
}`
  },
  {
    id: 'lsp-dip',
    from: 'L',
    to: 'D',
    label: 'The Type-Checking Rot',
    description: 'When a subtype breaks behavior (LSP), the caller can no longer trust the abstraction. This forces the caller to check for specific types, effectively depending on concretions.',
    code: `// --- PROBLEM: LSP Violation ---
public class Bird {
    public virtual void Fly() => Console.WriteLine("Flying...");
}

public class Ostrich : Bird {
    public override void Fly() => throw new InvalidOperationException();
}

// THE ROT: Type-Checking (Caller cannot trust the abstraction)
public void MakeBirdsFly(Bird bird) {
    if (bird is not Ostrich) {
        bird.Fly();
    }
}

// --- SOLUTION: Segregate by Behavior ---
public interface IBird { }
public interface IFlyingBird : IBird { void Fly(); }

public class Eagle : IFlyingBird {
    public void Fly() => Console.WriteLine("Soaring...");
}

public class Ostrich : IBird { }

public void ExecuteFlight(IFlyingBird bird) => bird.Fly();`
  },
  {
    id: 'lsp-ocp',
    from: 'L',
    to: 'O',
    label: 'Modification via Subtyping',
    description: 'If every new subtype requires an "if-else" check in the main logic, the system is no longer closed to modification.',
    code: `// --- PROBLEM: LSP Violation leading to an OCP Violation ---
public class Bird {
    public virtual void Fly() => Console.WriteLine("Flying...");
}

public class Ostrich : Bird {
    public override void Fly() => throw new InvalidOperationException();
}

public class BirdService {
    public void MakeBirdFly(Bird bird) {
        // ROT: Code is no longer Closed to Modification
        if (bird is not Ostrich) { 
            bird.Fly();
        }
    }
}

// --- SOLUTION: Interface Segregation ---
public interface IBird { }
public interface IFlyingBird : IBird { void Fly(); }

public class Eagle : IFlyingBird {
    public void Fly() => Console.WriteLine("Soaring...");
}

public class Ostrich : IBird { }

public class FixedBirdService {
    public void MakeBirdFly(IFlyingBird bird) => bird.Fly(); 
}`
  },
  {
    id: 'srp-ocp',
    from: 'S',
    to: 'O',
    label: 'The Single Change Nexus',
    description: 'A class with multiple responsibilities is a magnet for change. You cannot add behavior (Extend) without risking side effects in unrelated logic (Modify).',
    code: `// --- PROBLEM: Multiple Responsibilities ---
public class ReportProcessor {
    public void CreateReport() {
        Console.WriteLine("Calculating data..."); // Responsibility 1
        Console.WriteLine("Exporting as PDF..."); // Responsibility 2
    }
}

// --- SOLUTION: Strategic Abstraction (SRP + OCP) ---
public interface IReportExporter { void Export(); }

public class PdfExporter : IReportExporter { 
    public void Export() => Console.WriteLine("PDF Export"); 
}
public class ExcelExporter : IReportExporter { 
    public void Export() => Console.WriteLine("Excel Export"); 
}

public class FixedReportProcessor {
    private readonly IReportExporter _exporter;
    public FixedReportProcessor(IReportExporter exporter) => _exporter = exporter;

    public void CreateReport() {
        Console.WriteLine("Calculating data...");
        _exporter.Export(); // Closed to modification
    }
}`
  },
  {
    id: 'ocp-dip',
    from: 'O',
    to: 'D',
    label: 'Coupling Reveal',
    description: 'If you find you cannot extend behavior without changing code, it reveals that your "abstraction" was actually tightly coupled to a specific implementation detail.',
    code: `// --- PROBLEM: Leaky Abstraction ---
public interface INotification {
    void Send(string smtpServer, string msg); // Coupled to SMTP
}

// --- SOLUTION: True Abstraction (OCP + DIP) ---
public interface INotifier { void Send(string msg); }

public class EmailProvider : INotifier {
    public void Send(string msg) => Console.WriteLine($"SMTP: {msg}");
}
public class SmsProvider : INotifier {
    public void Send(string msg) => Console.WriteLine($"SMS: {msg}");
}

public class AlertSystem {
    public void Notify(INotifier n) => n.Send("Critical Error");
}`
  },
  {
    id: 'dip-ocp',
    from: 'D',
    to: 'O',
    label: 'The Structural Prerequisite',
    description: 'DIP is the engine for OCP. Without Dependency Injection/Abstractions, there is no way to swap behavior without editing the source code.',
    code: `// --- PROBLEM: Hard-coded dependency ---
public class OrderService {
    private SqlData _db = new SqlData(); // Stuck with SQL
    public void Save() => _db.Save();
}

// --- SOLUTION: DIP as the Engine for OCP ---
public interface IRepository { void Save(); }

public class SqlRepo : IRepository { public void Save() => /*...*/; }
public class MongoRepo : IRepository { public void Save() => /*...*/; }

public class FixedOrderService {
    private readonly IRepository _repo;
    public FixedOrderService(IRepository repo) => _repo = repo;
    public void Save() => _repo.Save();
}`
  },
  {
    id: 'isp-dip',
    from: 'I',
    to: 'D',
    label: 'The Hidden Concretion',
    description: 'A "God Interface" (ISP violation) acts exactly like a concrete class because it carries specific implementation assumptions that leak across layers.',
    code: `// --- PROBLEM: God Interface (Leaks details) ---
public interface IDatabase {
    void Save();
    void Rollback(); // Forced SQL assumption
}

// --- SOLUTION: Segregated Behaviors (ISP) ---
public interface ISaveable { void Save(); }
public interface ITransactional { void Rollback(); }

public class NoSqlStore : ISaveable {
    public void Save() => Console.WriteLine("Saved.");
}

public class BusinessLogic {
    public void Execute(ISaveable store) => store.Save();
}`
  },
  {
    id: 's-isp',
    from: 'S',
    to: 'I',
    label: 'God Interface Cascade',
    description: 'A God Class (SRP violation) inevitably produces a God Interface (ISP violation). Clients inherit all the bloat of the class they depend on.',
    code: `// --- PROBLEM: God Interface Cascade (SRP + ISP) ---
public interface IAllInOne {
    void Process();
    void Log();
}

public class SimpleLogger : IAllInOne {
    public void Log() => Console.WriteLine("Logging...");
    public void Process() => throw new NotImplementedException(); 
}

// --- SOLUTION: Single Responsibility Interfaces ---
public interface IProcessor { void Process(); }
public interface ILogger { void Log(); }

public class CleanLogger : ILogger {
    public void Log() => Console.WriteLine("Logging only.");
}`
  },
  {
    id: 'srp-lsp',
    from: 'S',
    to: 'L',
    label: 'Contract Bloat',
    description: 'When a class does too much, its contract becomes too complex for any subclass to honor fully, leading to broken substitution.',
    code: `// --- PROBLEM: Contract Bloat (SRP + LSP) ---
public interface IWorker {
    void Code();
    void AssignTasks();
}

public class DeveloperRobot : IWorker {
    public void Code() => Console.WriteLine("Coding...");
    public void AssignTasks() => throw new NotSupportedException(); 
}

// --- SOLUTION: Segregated Contracts ---
public interface ICoder { void Code(); }
public interface IManager { void AssignTasks(); }

public class SoftwareRobot : ICoder {
    public void Code() => Console.WriteLine("Coding efficiently.");
}`
  }
];
