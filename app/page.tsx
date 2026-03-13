import { SOLIDCascadeMap } from '@/components/solid-cascade-map';

export const metadata = {
  title: 'SOLID Architectural Cascade Map | Learn SOLID Principles',
  description: 'Interactive reference guide for SOLID design principles. Explore how each principle affects others through cascading relationships with code examples.',
  keywords: 'SOLID, design patterns, software architecture, reference guide',
};

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 p-4 md:p-8 font-sans">
      <header className="max-w-6xl mx-auto mb-12 text-center">
        <h1 className="text-3xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
          SOLID Architectural Cascade Map
        </h1>
        <p className="text-slate-400 max-w-2xl mx-auto">
          Interactive map of the "Domino Effects" in software design. Click any principle to see how it affects or is affected by others. Perfect for learning and reference.
        </p>
      </header>

      <SOLIDCascadeMap />

      <footer className="max-w-6xl mx-auto mt-12 pt-6 border-t border-slate-800 text-center text-slate-500 text-sm italic">
        <p>
          "Here’s the simple truth: you can’t innovate on products without first innovating the way you build them."
        </p>
        <p className="mt-2 text-slate-600">
          Built by Adam & Tarik
        </p>
      </footer>
    </div>
  );
}
