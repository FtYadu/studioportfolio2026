
"use client";

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useUser, useAuth, initiateAnonymousSignIn } from '@/firebase';
import { LogIn, LogOut, User as UserIcon } from 'lucide-react';

export const Navbar = () => {
  const { user, isUserLoading } = useUser();
  const auth = useAuth();

  const handleAuth = () => {
    if (user) {
      auth.signOut();
    } else {
      initiateAnonymousSignIn(auth);
    }
  };

  return (
    <div className="fixed top-6 left-0 right-0 z-[100] flex justify-center px-4">
      <motion.nav 
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="flex items-center justify-between w-full max-w-5xl px-8 py-4 bg-white/70 backdrop-blur-2xl border border-white/20 rounded-full shadow-2xl"
      >
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white font-headline text-xs font-bold">
            Y
          </div>
          <span className="font-headline text-sm md:text-base text-[#4A4A4A] tracking-tighter font-extrabold uppercase hidden sm:block">
            Yadu Krishnan K S
          </span>
        </div>

        <div className="hidden lg:flex items-center gap-10 text-xs font-bold uppercase tracking-widest text-[#4A4A4A]/60">
          <a href="#creative" className="hover:text-primary transition-colors hover:tracking-[0.2em] duration-300">Creative</a>
          <a href="#tech" className="hover:text-primary transition-colors hover:tracking-[0.2em] duration-300">Tech</a>
          <a href="#work" className="hover:text-primary transition-colors hover:tracking-[0.2em] duration-300">Work</a>
        </div>

        <div className="flex items-center gap-6">
          <div className="hidden md:flex items-center gap-2">
            <div className="w-2.5 h-2.5 rounded-full bg-[#CCFF00] shadow-[0_0_15px_#CCFF00] animate-pulse-lime" />
            <span className="text-[10px] font-black uppercase tracking-tighter opacity-70">Live Now</span>
          </div>
          
          <button 
            onClick={handleAuth}
            disabled={isUserLoading}
            className="flex items-center gap-2 px-6 py-2.5 bg-black text-white rounded-full text-xs font-bold hover:scale-105 transition-all active:scale-95 shadow-lg hover:shadow-black/20 disabled:opacity-50"
          >
            <AnimatePresence mode='wait'>
              {user ? (
                <motion.div 
                  key="logout"
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -5 }}
                  className="flex items-center gap-2"
                >
                  <LogOut size={14} />
                  <span>Exit Session</span>
                </motion.div>
              ) : (
                <motion.div 
                  key="login"
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -5 }}
                  className="flex items-center gap-2"
                >
                  <LogIn size={14} />
                  <span>AI Editor</span>
                </motion.div>
              )}
            </AnimatePresence>
          </button>
        </div>
      </motion.nav>
    </div>
  );
};
