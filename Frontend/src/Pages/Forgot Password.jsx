import React, { useState } from "react";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleResetPassword = async (e) => {
    e.preventDefault();

    if (!email) {
      setMessage("Please enter your email");
      return;
    }

    setLoading(true);

    try {
      // 👉 Here you will connect backend / Firebase
      console.log("Send reset link to:", email);

      // Fake success response
      setTimeout(() => {
        setMessage("Reset link sent to your email ✔");
        setLoading(false);
      }, 1500);

    } catch (error) {
      setMessage("Something went wrong ❌");
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <form onSubmit={handleResetPassword} style={styles.form}>
        <h2>Forgot Password</h2>
        <p style={{ fontSize: "14px", color: "#555" }}>
          Enter your email to receive a reset link
        </p>

        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={styles.input}
        />

        <button type="submit" style={styles.button} disabled={loading}>
          {loading ? "Sending..." : "Send Reset Link"}
        </button>

        {message && <p style={styles.message}>{message}</p>}
      </form>
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
  form: {
    width: "320px",
    padding: "25px",
    background: "#fff",
    borderRadius: "10px",
    boxShadow: "0 0 10px rgba(0,0,0,0.1)",
    display: "flex",
    flexDirection: "column",
    gap: "12px",
  },
  input: {
    padding: "10px",
    border: "1px solid #ccc",
    borderRadius: "5px",
  },
  button: {
    padding: "10px",
    background: "#ef4444",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
  message: {
    fontSize: "14px",
    textAlign: "center",
    color: "green",
  },
};

export default ForgotPassword;