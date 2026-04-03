import React, { useState } from 'react';
import { motion } from 'motion/react';
import { User, IndianRupee, Target, ShieldAlert, Briefcase } from 'lucide-react';

interface UserFormProps {
  onSubmit: (details: UserDetails) => void;
  isLoading: boolean;
}

export interface UserDetails {
  age: string;
  income: string;
  goals: string;
  riskAppetite: string;
  existing: string;
}

export default function UserForm({ onSubmit, isLoading }: UserFormProps) {
  const [details, setDetails] = useState<UserDetails>({
    age: '',
    income: '',
    goals: '',
    riskAppetite: 'Low',
    existing: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(details);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white p-8 rounded-2xl shadow-xl border border-gray-100 max-w-2xl mx-auto"
    >
      <div className="mb-8 text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-2 tracking-tight">Your Financial Profile</h2>
        <p className="text-gray-500">Provide your details for an unbiased insurance analysis.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="flex items-center text-sm font-medium text-gray-700 gap-2">
              <User size={16} className="text-blue-600" />
              Age
            </label>
            <input
              required
              type="number"
              placeholder="e.g., 30"
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none"
              value={details.age}
              onChange={(e) => setDetails({ ...details, age: e.target.value })}
            />
          </div>

          <div className="space-y-2">
            <label className="flex items-center text-sm font-medium text-gray-700 gap-2">
              <IndianRupee size={16} className="text-blue-600" />
              Annual Income
            </label>
            <input
              required
              type="text"
              placeholder="e.g., ₹8,00,000"
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none"
              value={details.income}
              onChange={(e) => setDetails({ ...details, income: e.target.value })}
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="flex items-center text-sm font-medium text-gray-700 gap-2">
            <Target size={16} className="text-blue-600" />
            Financial Goals
          </label>
          <textarea
            required
            placeholder="e.g., Family protection, Child's education, Retirement savings, Tax saving (80C)"
            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none min-h-[100px]"
            value={details.goals}
            onChange={(e) => setDetails({ ...details, goals: e.target.value })}
          />
        </div>

        <div className="space-y-2">
          <label className="flex items-center text-sm font-medium text-gray-700 gap-2">
            <ShieldAlert size={16} className="text-blue-600" />
            Risk Appetite
          </label>
          <div className="grid grid-cols-3 gap-4">
            {['Low', 'Medium', 'High'].map((risk) => (
              <button
                key={risk}
                type="button"
                onClick={() => setDetails({ ...details, riskAppetite: risk })}
                className={`py-3 px-4 rounded-xl border transition-all ${
                  details.riskAppetite === risk
                    ? 'bg-blue-50 border-blue-500 text-blue-700 font-semibold shadow-sm'
                    : 'bg-white border-gray-200 text-gray-600 hover:border-blue-200 hover:bg-blue-50/30'
                }`}
              >
                {risk}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-2">
          <label className="flex items-center text-sm font-medium text-gray-700 gap-2">
            <Briefcase size={16} className="text-blue-600" />
            Existing Insurance / Investments
          </label>
          <input
            type="text"
            placeholder="e.g., ₹5 Lakh Term plan, PPF, Mutual Funds"
            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none"
            value={details.existing}
            onChange={(e) => setDetails({ ...details, existing: e.target.value })}
          />
        </div>

        <button
          disabled={isLoading}
          type="submit"
          className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-lg shadow-blue-200 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 text-lg"
        >
          {isLoading ? (
            <>
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              Analyzing Profile...
            </>
          ) : (
            'Get Unbiased Advice'
          )}
        </button>
      </form>
    </motion.div>
  );
}
