// components/PaymentModal.tsx
import React from "react";
import { useToast } from "../contexts/toastContext";
interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  paymentData: {
    account_bank_name: string;
    account_number: string;
    amount: number;
    reference: string;
    note: string;
    expiry: string;
  } | null;
}

const PaymentModal: React.FC<PaymentModalProps> = ({ isOpen, onClose, paymentData }) => {
  const {toast} = useToast()
  if (!isOpen || !paymentData) return null;

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text).then(()=>{
      toast({
        title: "Copied Successfully",
        description: "Successfully Copied to Clipboard",
        variant: "success",
        duration:3000
      })
    });
  
  };

  const formatAmount = (amount: number) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN'
    }).format(amount);
  };

  const formatExpiry = (expiry: string) => {
    return new Date(expiry).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="fixed inset-0 bg-black/30 bg-opacity-60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md relative overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-4">
          <button
            className="absolute top-4 right-4 text-white hover:text-gray-200 transition-colors"
            onClick={onClose}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
          <h2 className="text-2xl font-bold text-white">Payment Details</h2>
          <p className="text-blue-100 mt-1">Complete your payment using the details below</p>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Amount - Highlighted */}
          <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-4 border border-green-200">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-green-700">Amount to Pay</span>
              <div className="flex items-center space-x-2">
                <span className="text-2xl font-bold text-green-800">
                  {formatAmount(paymentData.amount)}
                </span>
                <button
                  onClick={() => copyToClipboard(paymentData.amount.toString())}
                  className="text-green-600 hover:text-green-800 transition-colors"
                  title="Copy amount"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"></path>
                  </svg>
                </button>
              </div>
            </div>
          </div>

          {/* Bank Details */}
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <span className="text-sm font-medium text-gray-600">Bank</span>
              <div className="flex items-center space-x-2">
                <span className="text-gray-900 font-semibold">{paymentData.account_bank_name}</span>
              </div>
            </div>

            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <span className="text-sm font-medium text-gray-600">Account Number</span>
              <div className="flex items-center space-x-2">
                <span className="text-gray-900 font-mono font-semibold">{paymentData.account_number}</span>
                <button
                  onClick={() => copyToClipboard(paymentData.account_number)}
                  className="text-blue-600 hover:text-blue-800 transition-colors"
                  title="Copy account number"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"></path>
                  </svg>
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <span className="text-sm font-medium text-gray-600">Reference</span>
              <div className="flex items-center space-x-2">
                <span className="text-gray-900 font-mono text-sm">{paymentData.reference}</span>
                <button
                  onClick={() => copyToClipboard(paymentData.reference)}
                  className="text-blue-600 hover:text-blue-800 transition-colors"
                  title="Copy reference"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"></path>
                  </svg>
                </button>
              </div>
            </div>
          </div>

          {/* Note */}
          {paymentData.note && (
            <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
              <div className="flex items-start space-x-3">
                <svg className="w-5 h-5 text-amber-600 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
                <div>
                  <p className="text-sm font-medium text-amber-800">Important Note</p>
                  <p className="text-sm text-amber-700 mt-1">{paymentData.note}</p>
                </div>
              </div>
            </div>
          )}

          {/* Expiry */}
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <div className="flex items-center space-x-3">
              <svg className="w-5 h-5 text-red-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
              <div>
                <p className="text-sm font-medium text-red-800">Payment Expires</p>
                <p className="text-sm text-red-700">in 5 minutes</p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-gray-50 px-6 py-4">
          <div className="flex items-center justify-center space-x-2 text-sm text-gray-500">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
            </svg>
            <span>Secure payment processing</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentModal;