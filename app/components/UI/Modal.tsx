'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { X, AlertCircle, HelpCircle, CheckCircle2, Info } from 'lucide-react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm?: () => void;
  title: string;
  message: string;
  type?: 'info' | 'success' | 'warning' | 'error' | 'confirm';
  confirmText?: string;
  cancelText?: string;
}

export default function Modal({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  type = 'info',
  confirmText = 'Aceptar',
  cancelText = 'Cancelar'
}: ModalProps) {
  
  const getIcon = () => {
    switch (type) {
      case 'success': return <CheckCircle2 className="text-green-500" size={40} />;
      case 'error': return <AlertCircle className="text-red-500" size={40} />;
      case 'warning': return <AlertCircle className="text-yellow-500" size={40} />;
      case 'confirm': return <HelpCircle className="text-accent" size={40} />;
      default: return <Info className="text-blue-500" size={40} />;
    }
  };

  const getButtonClass = () => {
    switch (type) {
      case 'error': return 'bg-red-500 hover:bg-red-600 shadow-red-100';
      case 'warning': return 'bg-yellow-500 hover:bg-yellow-600 shadow-yellow-100';
      case 'confirm': return 'bg-accent hover:opacity-90 shadow-accent/20';
      default: return 'bg-accent hover:opacity-90 shadow-accent/20';
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative w-full max-w-sm bg-white rounded-[2.5rem] shadow-2xl p-8 text-center border border-white/20 overflow-hidden"
          >
            {/* Background decoration */}
            <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-primary via-accent to-primary" />
            
            <button 
              onClick={onClose}
              className="absolute top-6 right-6 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X size={20} />
            </button>

            <div className="mb-6 flex justify-center">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', damping: 12, delay: 0.1 }}
                className="w-20 h-20 rounded-full bg-gray-50 flex items-center justify-center"
              >
                {getIcon()}
              </motion.div>
            </div>

            <h3 className="text-2xl font-black text-letra tracking-tight mb-2">{title}</h3>
            <p className="text-gray-500 leading-relaxed text-sm mb-8">
              {message}
            </p>

            <div className="flex flex-col gap-3">
              {type === 'confirm' ? (
                <>
                  <button
                    onClick={() => {
                      onConfirm?.();
                      onClose();
                    }}
                    className={`w-full py-4 rounded-2xl text-letra font-black text-sm shadow-xl transition-all active:scale-[0.98] ${getButtonClass()}`}
                  >
                    {confirmText}
                  </button>
                  <button
                    onClick={onClose}
                    className="w-full py-4 rounded-2xl text-gray-500 font-bold text-sm hover:bg-gray-50 transition-colors"
                  >
                    {cancelText}
                  </button>
                </>
              ) : (
                <button
                  onClick={onClose}
                  className={`w-full py-4 rounded-2xl text-letra font-black text-sm shadow-xl transition-all active:scale-[0.98] ${getButtonClass()}`}
                >
                  {confirmText}
                </button>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
