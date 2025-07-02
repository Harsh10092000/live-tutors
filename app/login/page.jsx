'use client';

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter, useSearchParams } from 'next/navigation';

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl') || '/';
  
  const [isNewUser, setIsNewUser] = useState(false);
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [name, setName] = useState('');
  const [otp, setOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [userExists, setUserExists] = useState(false);

  const handleSendOTP = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // First check if user exists
      const checkUser = await fetch('/api/auth/check-user', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      });

      const userData = await checkUser.json();
      setUserExists(userData.exists);
      setIsNewUser(!userData.exists);

      // Then send OTP
      const res = await fetch('/api/auth/send-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to send OTP');
      
      setOtpSent(true);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // Validate required fields for new users
      if (!userExists && (!name || !phone)) {
        throw new Error('Name and phone number are required for new users');
      }

      const result = await signIn('credentials', {
        email,
        phone: !userExists ? phone : undefined,
        name: !userExists ? name : undefined,
        otp,
        isNewUser: !userExists,
        redirect: false
      });

      if (result?.error) {
        throw new Error(result.error);
      }

      router.push(callbackUrl);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="tu-main-login">
      <div className="tu-login-left">
				<figure>
          <img src="/images/login-img.png" alt="Login" />
				</figure>
        <div className="tu-login-left_title">
          <h2>Welcome to LiveTutors</h2>
          <span>Find your perfect tutor and start learning today!</span>
				</div>
            </div>
      <div className="tu-login-right">
        <div className="tu-login-right_title">
          <h2>{!userExists ? 'Create Account' : 'Login'}</h2>
          {!otpSent && (
            <p>Enter your email to continue</p>
          )}
				</div>

        {error && (
          <div className="tu-alert tu-alert-danger">
            <p>{error}</p>
										</div>
        )}

        <form onSubmit={otpSent ? handleSubmit : handleSendOTP}>
          <div className="tu-login-form">
            <div className="form-group">
              <label>Email address</label>
              <input
                type="email"
                className="form-control"
                placeholder="Enter email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={otpSent}
              />
									</div>

            {otpSent && !userExists && (
              <>
                <div className="form-group">
                  <label>Full name</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter your full name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
								</div>
                <div className="form-group">
                  <label>Phone number</label>
                  <input
                    type="tel"
                    className="form-control"
                    placeholder="Enter phone number"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    required
                  />
										</div>
              </>
            )}

            {otpSent && (
              <div className="form-group">
                <label>Enter OTP</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter OTP sent to your email"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  required
                />
									</div>
            )}

            <button
              type="submit"
              className="tu-primbtn-lg"
              disabled={loading}
            >
              {loading ? 'Please wait...' : otpSent ? 'Verify OTP' : 'Continue'}
            </button>

            <div className="tu-lost-password form-group">
              <a href="/" className="tu-password-clr_light">Back to Home</a>
							</div>
						</div>
				</form>
            </div>
       </div>
  );
}