import React, { useState, useEffect } from "react";
import { getAuth, signInWithPhoneNumber, RecaptchaVerifier } from "firebase/auth";
import firebaseApp from "../../../utils/SMS";

function SmsDemo() {
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [confirmationResult, setConfirmationResult] = useState(null);
  const [user, setUser] = useState(null);
  const [recaptchaInitialized, setRecaptchaInitialized] = useState(false);

  const auth = getAuth(firebaseApp);

  useEffect(() => {
    if (!recaptchaInitialized) {
      window.recaptchaVerifier = new RecaptchaVerifier(auth, "recaptcha-container", {
        size: "invisible",
        callback: (response) => {
          console.log("reCAPTCHA verified!");
        },
        "expired-callback": () => {
          console.log("reCAPTCHA expired!");
        },
      });
      setRecaptchaInitialized(true);
    }
  }, [auth, recaptchaInitialized]);

  const sendOTP = () => {
    if (!phone.startsWith("+")) {
      alert("Phone number must be in international format, e.g., +84xxxxxxxxx");
      return;
    }
    const appVerifier = window.recaptchaVerifier;
    signInWithPhoneNumber(auth, phone, appVerifier)
      .then((result) => {
        setConfirmationResult(result);
        console.log("OTP sent!");
      })
      .catch((error) => console.error("Error sending OTP:", error));
  };

  const verifyOTP = () => {
    if (!confirmationResult) {
      console.error("No OTP request found.");
      return;
    }

    confirmationResult.confirm(otp)
      .then((result) => {
        setUser(result.user);
        console.log("User signed in:", result.user);
      })
      .catch((error) => console.error("Error verifying OTP:", error));
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h2>Firebase Phone Authentication</h2>
      <div>
        <input
          type="tel"
          placeholder="+84xxxxxxxxx"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
        <button 
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
          onClick={sendOTP}
        >Send OTP</button>
      </div>

      <div id="recaptcha-container"></div>

      {confirmationResult && (
        <div>
          <input
            type="text"
            placeholder="Enter OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
          />
          <button onClick={verifyOTP}>Verify OTP</button>
        </div>
      )}

      {user && <h3>Logged in as: {user.phoneNumber}</h3>}
    </div>
  );
}

export default SmsDemo;
