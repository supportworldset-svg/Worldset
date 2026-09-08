'use client';

import { useState } from 'react';
import { Sparkles, Send } from 'lucide-react';
import ProductCard from '@/components/ProductCard';
import { getAiResponse, AiReply } from '@/lib/ai-assistant';
import { Product } from '@/lib/types';

interface Message {
  role: 'user' | 'assistant';
  text: string;
  products?: Product[];
}

const suggestions = [
  'Find me a good laptop under $700',
  'Headphones for traveling',
  'Best value for a home office',
  'Compare monitors under $300'
];

export default function AiPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      text: "Hi! I'm Worldset AI. Tell me your budget and what you need, and I'll shortlist products from the catalog."
    }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  async function send(text: string) {
    if (!text.trim() || loading) return;
    setMessages((m) => [...m, { role: 'user', text }]);
    setInput('');
    setLoading(true);
    const reply: AiReply = await getAiResponse(text);
    setMessages((m) => [...m, { role: 'assistant', text: reply.text, products: reply.products }]);
    setLoading(false);
  }

  return (
    <div className="container-page py-8">
      <div className="mx-auto max-w-2xl">
        <div className="mb-6 flex items-center gap-2">
          <Sparkles size={20} className="text-accent" />
          <h1 className="text-2xl font-semibold">Worldset AI</h1>
        </div>

        <div className="card flex min-h-[50vh] flex-col p-4">
          <div className="flex-1 space-y-4 overflow-y-auto">
            {messages.map((m, i) => (
              <div key={i} className={m.role === 'user' ? 'text-right' : ''}>
                <div
                  className={`inline-block max-w-[85%] rounded-2xl px-4 py-2 text-sm ${
                    m.role === 'user' ? 'bg-ink text-white' : 'bg-line/50 text-ink'
                  }`}
                >
                  {m.text}
                </div>
                {m.products && m.products.length > 0 && (
                  <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-2">
                    {m.products.map((p) => (
                      <ProductCard key={p.id} product={p} />
                    ))}
                  </div>
                )}
              </div>
            ))}
            {loading && <p className="text-sm text-ink/40">Thinking…</p>}
          </div>

          <div className="mt-4 flex flex-wrap gap-2">
            {suggestions.map((s) => (
              <button
                key={s}
                onClick={() => send(s)}
                className="rounded-full border border-line px-3 py-1.5 text-xs text-ink/60 hover:border-ink"
              >
                {s}
              </button>
            ))}
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              send(input);
            }}
            className="mt-3 flex items-center gap-2 rounded-full border border-line px-3 py-1"
          >
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about products, budgets, comparisons…"
              className="w-full bg-transparent py-2 text-sm outline-none"
            />
            <button type="submit" className="rounded-full bg-ink p-2 text-white" aria-label="Send">
              <Send size={16} />
            </button>
          </form>
        </div>

        <p className="mt-3 text-center text-xs text-ink/40">
          Running on the local demo catalog. Connect an LLM API key server-side to power richer answers.
        </p>
      </div>
    </div>
  );
}
