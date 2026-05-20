import React, { useState, useRef } from "react";

const OTPVerification = () => {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [message, setMessage] = useState("");
  const [timer, setTimer] = useState(30);
  const [canResend, setCanResend] = useState(false);

  const inputsRef = useRef([]);

  // handle input change
  const handleChange = (value, index) => {
    if (!/^[0-9]?$/.test(value)) return; // only numbers

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // move next input
    if (value && index < 5) {
      inputsRef.current[index + 1].focus();
    }
  };

  // backspace move previous
  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputsRef.current[index - 1].focus();
    }
  };

  // verify OTP
  const handleVerify = () => {
    const code = otp.join("");

    if (code.length !== 6) {
      setMessage("Enter full 6-digit OTP");
      return;
    }

    // 🔥 Replace this with backend API
    if (code === "123456") {
      setMessage("OTP Verified ✔ Success");
    } else {
      setMessage("Invalid OTP ❌");
    }
  };

  // resend OTP
  const handleResend = () => {
    setMessage("OTP Resent ✔");

    setCanResend(false);
    setTimer(30);

    const interval = setInterval(() => {
      setTimer((prev) => {
        if (prev === 1) {
          clearInterval(interval);
          setCanResend(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2>OTP Verification</h2>
        <p>Enter 6-digit code sent to your email</p>

        {/* OTP Inputs */}
        <div style={styles.otpBox}>
          {otp.map((digit, index) => (
            <input
              key={index}
              ref={(el) => (inputsRef.current[index] = el)}
              type="text"
              maxLength="1"
              value={digit}
              onChange={(e) => handleChange(e.target.value, index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              style={styles.input}
            />
          ))}
        </div>

        {/* Verify Button */}
        <button onClick={handleVerify} style={styles.verifyBtn}>
          Verify OTP
        </button>

        {/* Message */}
        {message && <p style={styles.msg}>{message}</p>}

        {/* Resend OTP */}
        <button
          onClick={handleResend}
          disabled={!canResend}
          style={{
            ...styles.resendBtn,
            opacity: canResend ? 1 : 0.5,
            cursor: canResend ? "pointer" : "not-allowed",
          }}
        >
          {canResend ? "Resend OTP" : `Resend in ${timer}s`}
        </button>
      </div>
    </div>
  );
};

const styles = {
  container: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "#f3f4f6",
  },
  card: {
    width: "350px",
    padding: "25px",
    background: "#fff",
    borderRadius: "12px",
    textAlign: "center",
    boxShadow: "0 0 10px rgba(0,0,0,0.1)",
  },
  otpBox: {
    display: "flex",
    justifyContent: "space-between",
    margin: "20px 0",
  },
  input: {
    width: "40px",
    height: "45px",
    textAlign: "center",
    fontSize: "18px",
    border: "1px solid #ccc",
    borderRadius: "5px",
  },
  verifyBtn: {
    width: "100%",
    padding: "10px",
    background: "#16a34a",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
  },
  resendBtn: {
    marginTop: "10px",
    width: "100%",
    padding: "10px",
    background: "#2563eb",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
  },
  msg: {
    marginTop: "10px",
    fontSize: "14px",
  },
};

export default OTPVerification;