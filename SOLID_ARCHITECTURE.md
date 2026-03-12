# SOLID Architectural Cascade Map

> An interactive, production-ready reference guide for learning and teaching SOLID design principles.

## 🎯 Purpose

This project serves as both a **learning tool** and a **code reference** that demonstrates SOLID principles in its own architecture. Each component exemplifies the principle it describes.

---

## 📐 Project Architecture

### Core Philosophy

This application is intentionally built to **practice what it preaches**. Each component adheres to the SOLID principles it teaches:

### Directory Structure

```
app/
├── page.tsx                    # Main page entry point (SRP: routing)
├── layout.tsx                  # Root layout wrapper
└── globals.css                 # Global styles

components/
├── solid-cascade-map.tsx       # Orchestrator (SRP: state management)
├── principles-circle.tsx       # Circle visualization (DIP: depends on data)
├── cascades-list.tsx           # List component (ISP: focused interface)
├── detail-panel.tsx            # Detail view (OCP: extends via conditions)
├── cascade-button.tsx          # Button component (SRP: single concern)
└── principle-node.tsx          # Node component (LSP: consistent behavior)

lib/
└── solid-data.ts              # Data abstraction (DIP: single source of truth)
```

---

## 🏗️ SOLID Principles in This Codebase

### 1. **Single Responsibility Principle (SRP)**

Each component has **one reason to change**:

- **`principle-node.tsx`**: Only renders a single principle node
- **`cascade-button.tsx`**: Only renders a cascade button
- **`solid-data.ts`**: Only manages principle definitions
- **`solid-cascade-map.tsx`**: Only orchestrates component interaction

✅ **Benefit**: Easy to test, understand, and modify each component independently.

### 2. **Open/Closed Principle (OCP)**

The app is **open for extension, closed for modification**:

- New cascades can be added to `CASCADES` array without changing component code
- New principles can be added to `PRINCIPLES` object without touching rendering logic
- `DetailPanel` extends functionality through conditional rendering (not modification)

✅ **Benefit**: Adding new content doesn't require touching component logic.

### 3. **Liskov Substitution Principle (LSP)**

Components maintain consistent, substitutable behavior:

- All principle nodes behave identically (can substitute one for another)
- All cascade buttons have the same interface
- `DetailPanel` can render different content without breaking expectations

✅ **Benefit**: Predictable, composable component hierarchy.

### 4. **Interface Segregation Principle (ISP)**

Components expose only the interfaces they need:

- `PrincipleNode` props only include what it needs (not full principle object until needed)
- `CascadeButton` doesn't need to know about state management
- `DetailPanel` receives only computed data it uses

✅ **Benefit**: Components aren't bloated with unused dependencies.

### 5. **Dependency Inversion Principle (DIP)**

Components depend on abstractions, not concrete implementations:

- **Depends on:** Data types and interfaces from `solid-data.ts`
- **Not on:** Specific data sources, rendering implementations, or other components
- State flows down, events flow up (React's natural pattern)

✅ **Benefit**: Easy to swap data sources, styling, or rendering strategies.

---

## 🧩 Component Breakdown

### `solid-cascade-map.tsx` (Orchestrator)
**Principles**: SRP, DIP
- Manages application state (`activeNode`, `activeCascade`)
- Computes cascade relationships
- Coordinates child components

```typescript
const connections = useMemo(() => {
  // Pure computation: no side effects
  if (activeNode) {
    return {
      breaks: CASCADES.filter(c => c.from === activeNode),
      affectedBy: CASCADES.filter(c => c.to === activeNode)
    };
  }
  return { breaks: [], affectedBy: [] };
}, [activeNode]);
```

### `principles-circle.tsx` (Layout)
**Principles**: DIP, OCP
- Renders principles in circular arrangement
- Depends on data abstraction, not concrete principles
- Extensible: radius can be modified without affecting logic

### `detail-panel.tsx` (Display)
**Principles**: OCP, SRP
- Conditionally renders different views
- Open for extension (new view types without modification)
- Single responsibility: display details

### `cascade-button.tsx` & `principle-node.tsx` (Leaves)
**Principles**: SRP, ISP
- Minimal, focused components
- Each has one reason to change
- Only expose necessary props

### `solid-data.ts` (Data Layer)
**Principles**: DIP, SRP
- Single source of truth for all SOLID data
- TypeScript interfaces ensure type safety
- Easy to maintain, extend, or replace

---

## 🔄 Data Flow

```
User clicks node
    ↓
solid-cascade-map state updates
    ↓
useMemo recomputes connections
    ↓
Child components receive props
    ↓
Component renders with new data
```

**Key Pattern**: One-way data flow (React best practice)

---

## ✨ Features

- **9 Critical Cascades**: Shows how SOLID principles affect each other
- **Interactive Visualization**: Click to explore relationships
- **Code Examples**: Real C# violation examples for each cascade
- **Responsive Design**: Mobile-first layout
- **Accessible**: ARIA labels, semantic HTML

---

## 🚀 Getting Started

### Installation

```bash
# Clone or download the project
cd solid-cascade-map

# Install dependencies
npm install
# or
pnpm install

# Run development server
npm run dev
```

Visit `http://localhost:3000`

---

## 📚 Using This as a Reference

### For Learning SOLID

1. Click each principle to understand its "downstream breaks"
2. Select cascades to see code violations
3. Understand how principles reinforce each other

### For Code Architecture

Study how each file demonstrates its principle:

- **Want SRP example?** → Read `principle-node.tsx`
- **Want DIP example?** → Read `solid-data.ts` + how components import
- **Want OCP example?** → Read `detail-panel.tsx` conditional logic
- **Want ISP example?** → Read any component's props interface
- **Want LSP example?** → Read how cascade buttons are substitutable

---

## 🛠️ Extending This Project

### Adding a New Cascade

1. Add to `CASCADES` array in `lib/solid-data.ts`:

```typescript
{
  id: 'new-cascade-id',
  from: 'S',
  to: 'O',
  label: 'Your Cascade Label',
  description: 'Explanation...',
  code: `// Example code`
}
```

2. No component changes needed! (OCP in action)

### Adding a New Feature

- Keep it in a new component file
- Follow the naming pattern: `kebab-case.tsx`
- Let the main orchestrator import it
- Maintain the data layer in `solid-data.ts`

---

## 📝 Code Quality Standards

- **TypeScript**: Full type safety
- **React Best Practices**: Hooks, memoization, composition
- **Accessibility**: ARIA labels, semantic HTML
- **Performance**: useMemo for expensive computations
- **Documentation**: Inline comments for non-obvious logic

---

## 🎓 Learning Outcomes

After studying this project, you should understand:

1. ✅ How to break components by responsibility
2. ✅ How to design extensible systems
3. ✅ How to use TypeScript for architectural safety
4. ✅ How SOLID principles work together
5. ✅ How to build maintainable React applications

---

## 📖 Further Reading

- [SOLID Principles](https://en.wikipedia.org/wiki/SOLID)
- [React Best Practices](https://react.dev)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)

---

## 📄 License

Use this as a reference and learning tool. Modify for your needs.

---

**Built as a production-ready reference guide for developers and architects.**
