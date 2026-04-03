import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ShieldCheck, Info, HelpCircle, MessageSquare } from 'lucide-react';
import UserForm, { UserDetails } from './components/UserForm';
import AdviceResult from './components/AdviceResult';
import { getInsuranceAdvice } from './lib/gemini';

export default function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [advice, setAdvice] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleFormSubmit = async (details: UserDetails) => {
    setIsLoading(true);
    setError(null);
    try {
      const result = await getInsuranceAdvice(details);
      setAdvice(result);
    } catch (err) {
      console.error(err);
      setError('Failed to generate advice. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setAdvice(null);
    setError(null);
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans selection:bg-blue-100 selection:text-blue-900">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-blue-600 p-1.5 rounded-lg">
              <ShieldCheck size={24} className="text-white" />
            </div>
            <span className="text-xl font-bold text-gray-900 tracking-tight">LIC Unbiased Advisor</span>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <a href="#" className="text-sm font-medium text-gray-500 hover:text-blue-600 transition-colors">How it works</a>
            <a href="#" className="text-sm font-medium text-gray-500 hover:text-blue-600 transition-colors">Transparency</a>
            <a href="#" className="px-4 py-2 bg-blue-50 text-blue-700 rounded-lg text-sm font-bold hover:bg-blue-100 transition-all">Support</a>
          </nav>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-12">
        <AnimatePresence mode="wait">
          {!advice ? (
            <motion.div
              key="form"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-12"
            >
              <div className="text-center max-w-3xl mx-auto space-y-4">
                <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 tracking-tight leading-tight">
                  Unbiased LIC Insurance <span className="text-blue-600">Guidance</span>
                </h1>
                <p className="text-lg md:text-xl text-gray-500 max-w-2xl mx-auto leading-relaxed">
                  We help you navigate LIC policies with honesty. No hidden risks, no sales pitches—just pure financial advice for your future.
                </p>
                <div className="flex flex-wrap justify-center gap-4 pt-4">
                  <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow-sm border border-gray-100 text-sm font-medium text-gray-600">
                    <Info size={16} className="text-blue-500" />
                    No Mis-selling
                  </div>
                  <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow-sm border border-gray-100 text-sm font-medium text-gray-600">
                    <HelpCircle size={16} className="text-green-500" />
                    Transparent Returns
                  </div>
                  <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow-sm border border-gray-100 text-sm font-medium text-gray-600">
                    <MessageSquare size={16} className="text-purple-500" />
                    Simple Language
                  </div>
                </div>
              </div>

              <UserForm onSubmit={handleFormSubmit} isLoading={isLoading} />
              
              {error && (
                <div className="max-w-2xl mx-auto p-4 bg-red-50 border border-red-100 text-red-700 rounded-xl text-center font-medium">
                  {error}
                </div>
              )}
            </motion.div>
          ) : (
            <AdviceResult key="result" advice={advice} onReset={handleReset} />
          )}
        </AnimatePresence>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-100 py-12 mt-20">
        <div className="max-w-7xl mx-auto px-4 text-center space-y-6">
          <div className="flex items-center justify-center gap-2 opacity-50 grayscale">
            <ShieldCheck size={24} />
            <span className="text-lg font-bold">LIC Unbiased Advisor</span>
          </div>
          <p className="text-sm text-gray-400 max-w-xl mx-auto leading-relaxed">
            Disclaimer: This AI agent provides general guidance based on public information about LIC policies. Insurance is a subject matter of solicitation. Please read the policy document carefully before investing.
          </p>
          <div className="flex justify-center gap-8 text-sm font-medium text-gray-400">
            <a href="#" className="hover:text-blue-600 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-blue-600 transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-blue-600 transition-colors">Contact Us</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
