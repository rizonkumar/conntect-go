import { useState } from "react";
import { CheckCircle, X, CreditCard, Wallet } from "lucide-react";

const RideComplete = ({ fare, onClose, onComplete }) => {
  const [selectedPayment, setSelectedPayment] = useState("cash");
  const paymentMethods = [
    {
      id: "cash",
      name: "Cash",
      icon: <Wallet className="h-6 w-6" />,
    },
    {
      id: "card",
      name: "Credit/Debit Card",
      icon: <CreditCard className="h-6 w-6" />,
    },
  ];

  const handlePaymentSubmit = () => {
    onComplete(selectedPayment);
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-[70] flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl w-full max-w-md">
        {/* Header */}
        <div className="p-6 text-center border-b">
          <div className="flex justify-end">
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
          <div className="flex justify-center mb-4">
            <div className="bg-green-100 p-3 rounded-full">
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
          </div>
          <h2 className="text-xl font-semibold mb-2">Ride Complete!</h2>
          <p className="text-gray-600">
            Total fare: <span className="font-semibold">${fare}</span>
          </p>
        </div>

        {/* Payment Methods */}
        <div className="p-6 space-y-4">
          <h3 className="font-medium text-gray-900">Select payment method</h3>
          <div className="space-y-3">
            {paymentMethods.map((method) => (
              <button
                key={method.id}
                onClick={() => setSelectedPayment(method.id)}
                className={`w-full flex items-center gap-4 p-4 rounded-lg border transition-colors ${
                  selectedPayment === method.id
                    ? "border-black bg-gray-50"
                    : "border-gray-200 hover:bg-gray-50"
                }`}
              >
                {method.icon}
                <span className="font-medium">{method.name}</span>
                {selectedPayment === method.id && (
                  <div className="ml-auto w-4 h-4 rounded-full bg-black"></div>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 border-t">
          <button
            onClick={handlePaymentSubmit}
            className="w-full bg-black text-white py-4 rounded-lg font-medium hover:bg-gray-900 transition-colors"
          >
            Complete Payment
          </button>
        </div>
      </div>
    </div>
  );
};

export default RideComplete;
