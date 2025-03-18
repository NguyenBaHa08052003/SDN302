import React, { useState } from "react";
import axios from "axios";

export default function PaymentMethods() {
  const [loading, setLoading] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState(null);

  const handlePayment = async (method) => {
    setLoading(true);
    setPaymentStatus(null);
    try {
      const response = await axios.post(`http://localhost:3000/api/${method}/payment`, {
        amount: 50000,
        description: `Payment for Order #123 via ${method}`,
        method: method,
      });

      if (response.data.order_url) {
        window.location.href = response.data.order_url;
      }
      if (response.data.payUrl) {
        window.location.href = response.data.payUrl;
      }
    } catch (error) {
      console.error("Payment Error:", error);
      setPaymentStatus("Error processing payment.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center space-y-4 p-6">
      <h2 className="text-2xl font-semibold">Payment Methods</h2>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded h-12"
        onClick={() => handlePayment("zalo")}
        disabled={loading}
      >
        {loading ? "Processing..." : "Pay with ZaloPay"}
      </button>
      {paymentStatus && <p className="text-red-500">{paymentStatus}</p>}
    </div>
  );
}
