'use client';

import { useState } from 'react';
import { Sparkles } from 'lucide-react';
import { Product } from '@/lib/types';

export default function AskAiAboutProduct({ product }: { product: Product }) {
  const [open, setOpen] = useState(false);
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState<string | null>(null);

  function ask(e: React.FormEvent) {
    e.preventDefault();
    if (!question.trim()) return;
    const spec = product.specs.find((s) =>
      question.toLowerCase().includes(s.label.toLowerCase())
    );
    setAnswer(
      spec
        ? `${spec.label}: ${spec.value}.`
        : `Based on the listed specs — ${product.specs
            .slice(0, 2)
            .map((s) => `${s.label.toLowerCase()} is ${s.value.toLowerCase()}`)
            .join(', ')} — this should be a solid fit for most everyday use. For anything not covered in the spec sheet, the seller can confirm directly.`
    );
  }

  return (
    <div className="card p-4">
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center gap-2 text-sm font-medium text-accent-dark"
      >
        <Sparkles size={16} /> Ask Worldset AI about this product
      </button>
      {open && (
        <div className="mt-3">
          <form onSubmit={ask} className="flex gap-2">
            <input
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder="e.g. What's the battery life?"
              className="w-full rounded-full border border-line px-3 py-2 text-sm outline-none"
            />
            <button type="submit" className="rounded-full bg-ink px-4 py-2 text-sm text-white">
              Ask
            </button>
          </form>
          {answer && <p className="mt-3 text-sm text-ink/70">{answer}</p>}
        </div>
      )}
    </div>
  );
}
