import React, { useState } from 'react';

const SendVerificationEmail = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const sendVerificationEmail = async () => {
    setLoading(true);
    setMessage('');

    try {
      const response = await fetch('/api/send-verification-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      setMessage(data.message || 'Verification email sent successfully!');
    } finally {
      setLoading(false);
    }
  };

  const resendOtp = async () => {
    setLoading(true);
    setMessage('');

    try {
      const response = await fetch('/api/resend-otp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      setMessage(data.message || 'OTP resent successfully!');
    }  finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Send Verification Email</h2>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Enter your email"
        required
      />
      <button onClick={sendVerificationEmail} disabled={loading}>
        {loading ? 'Sending...' : 'Send Verification Email'}
      </button>
      <button onClick={resendOtp} disabled={loading}>
        {loading ? 'Resending...' : 'Resend OTP'}
      </button>
      {message && <p>{message}</p>}
    </div>
  );
};

export default SendVerificationEmail;
