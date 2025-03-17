import React, { useState } from 'react'
import axios from "axios";
export default function PaymentPage() {
  const [loading, setLoading] = useState(false);

  const handlePayment = async () => {
    setLoading(true);
    try {
      const response = await axios.post("http://localhost:3000/api/payment/create-payment", {
        amount: 10000,
        description: "Payment for Order #123",
      });
      console.log(response);
      
      if (response.data.order_url) {
        window.location.href = response.data.order_url;
      } else {
        alert("Failed to create payment");
      }
    } catch (error) {
      console.error("Payment Error:", error);
      alert("Error processing payment");
    } finally {
      setLoading(false);
    }
  };

  return (
    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded h-12" onClick={handlePayment} disabled={loading}>
      {loading ? "Processing..." : "Pay with ZaloPay"}
    </button>
  );
};
