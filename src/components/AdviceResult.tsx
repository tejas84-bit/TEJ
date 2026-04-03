import ReactMarkdown from 'react-markdown';
import { motion } from 'motion/react';
import { ShieldCheck, AlertCircle, TrendingUp, Lock, ArrowLeft } from 'lucide-react';

interface AdviceResultProps {
  advice: string;
  onReset: () => void;
}

export default function AdviceResult({ advice, onReset }: AdviceResultProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="max-w-4xl mx-auto space-y-8 pb-20"
    >
      <div className="flex items-center justify-between mb-8">
        <button
          onClick={onReset}
          className="flex items-center gap-2 text-gray-500 hover:text-blue-600 transition-colors font-medium"
        >
          <ArrowLeft size={20} />
          Start Over
        </button>
        <div className="flex items-center gap-2 px-4 py-2 bg-green-50 text-green-700 rounded-full text-sm font-bold border border-green-100">
          <ShieldCheck size={16} />
          Unbiased Analysis
        </div>
      </div>

      <div className="bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden">
        <div className="bg-blue-600 p-8 text-white">
          <h2 className="text-3xl font-bold mb-2">Your Insurance Roadmap</h2>
          <p className="text-blue-100">Expert analysis based on your financial profile.</p>
        </div>

        <div className="p-8 md:p-12">
          <div className="prose prose-blue max-w-none prose-headings:text-gray-900 prose-p:text-gray-600 prose-li:text-gray-600 prose-strong:text-gray-900">
            <ReactMarkdown
              components={{
                h1: ({ children }) => <h1 className="text-3xl font-bold mb-6 border-b pb-4">{children}</h1>,
                h2: ({ children }) => <h2 className="text-2xl font-bold mt-10 mb-4 flex items-center gap-2">{children}</h2>,
                h3: ({ children }) => <h3 className="text-xl font-bold mt-8 mb-3 text-blue-700">{children}</h3>,
                ul: ({ children }) => <ul className="space-y-3 my-6 list-disc pl-6">{children}</ul>,
                li: ({ children }) => <li className="leading-relaxed">{children}</li>,
                p: ({ children }) => <p className="leading-relaxed mb-4">{children}</p>,
                strong: ({ children }) => <strong className="font-bold text-gray-900">{children}</strong>,
                blockquote: ({ children }) => (
                  <blockquote className="border-l-4 border-blue-500 bg-blue-50/50 p-6 my-8 rounded-r-xl italic text-gray-700">
                    {children}
                  </blockquote>
                ),
              }}
            >
              {advice}
            </ReactMarkdown>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-start gap-4">
          <div className="p-3 bg-blue-50 text-blue-600 rounded-xl">
            <TrendingUp size={24} />
          </div>
          <div>
            <h4 className="font-bold text-gray-900 mb-1">Realistic Returns</h4>
            <p className="text-sm text-gray-500">Traditional plans typically offer 4-6% IRR.</p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-start gap-4">
          <div className="p-3 bg-orange-50 text-orange-600 rounded-xl">
            <Lock size={24} />
          </div>
          <div>
            <h4 className="font-bold text-gray-900 mb-1">Lock-in Period</h4>
            <p className="text-sm text-gray-500">Most plans have a 2-3 year minimum lock-in.</p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-start gap-4">
          <div className="p-3 bg-red-50 text-red-600 rounded-xl">
            <AlertCircle size={24} />
          </div>
          <div>
            <h4 className="font-bold text-gray-900 mb-1">Risk Disclosure</h4>
            <p className="text-sm text-gray-500">Insurance is for protection, not just investment.</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
