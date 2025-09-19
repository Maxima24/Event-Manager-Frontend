// components/PaymentModal.tsx
import React from "react";

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  paymentData: {
    bankName: string;
    accountNumber: string;
    amount: number;
    reference: string;
    note: string;
    expiry: string;
  } | null;
}

const PaymentModal: React.FC<PaymentModalProps> = ({ isOpen, onClose, paymentData }) => {
  if (!isOpen || !paymentData) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-96 relative">
        <button
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
          onClick={onClose}
        >
          ✕
        </button>
        <h2 className="text-xl font-semibold mb-4">Payment Instructions</h2>
        <div className="space-y-2">
          <p><strong>Bank:</strong> {paymentData.bankName}</p>
          <p><strong>Account Number:</strong> {paymentData.accountNumber}</p>
          <p><strong>Amount:</strong> ₦{paymentData.amount}</p>
          <p><strong>Reference:</strong> {paymentData.reference}</p>
          <p><strong>Note:</strong> {paymentData.note}</p>
          <p><strong>Expiry:</strong> {new Date(paymentData.expiry).toLocaleString()}</p>
        </div>
      </div>
    </div>
  );
};

export default PaymentModal;
