'use client';

import { useState } from 'react';
import { Eye, EyeOff, Lock, Mail, AlertCircle, ArrowRight, Loader2 } from 'lucide-react';
import { loginAdmin } from '../services/adminAuthService';

export default function AdminLoginForm({ onSuccess }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError('Please fill in both Email and Password fields.');
      return;
    }

    setLoading(true);
    try {
      const data = await loginAdmin(email, password);
      onSuccess(data.admin);
    } catch (err) {
      setError(err.message || 'Invalid credentials or server connection failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-card-shell">
      <div className="admin-title-wrap">
        <span className="admin-badge-sticker">restricted area</span>
        <h1 className="admin-title">
          ADMIN <span>portal</span>
        </h1>
        <p className="admin-subtitle">Sign in to manage LoopLab platform operations</p>
      </div>

      {error && (
        <div className="admin-error-box" role="alert">
          <AlertCircle size={20} />
          <span>{error}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} noValidate>
        <div className="admin-form-group">
          <label className="admin-label" htmlFor="admin-email">Email Address</label>
          <div className="admin-input-wrapper">
            <input
              id="admin-email"
              type="email"
              className="admin-input"
              placeholder="admin@looplab.site"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={loading}
              required
            />
          </div>
        </div>

        <div className="admin-form-group">
          <label className="admin-label" htmlFor="admin-password">Password</label>
          <div className="admin-input-wrapper">
            <input
              id="admin-password"
              type={showPassword ? 'text' : 'password'}
              className="admin-input"
              placeholder="••••••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={loading}
              required
            />
            <button
              type="button"
              className="admin-input-icon-btn"
              onClick={() => setShowPassword(!showPassword)}
              aria-label={showPassword ? 'Hide password' : 'Show password'}
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
        </div>

        <button type="submit" className="admin-submit-btn" disabled={loading}>
          {loading ? (
            <>
              <Loader2 size={20} className="animate-spin" />
              Verifying Credentials...
            </>
          ) : (
            <>
              Access Dashboard
              <ArrowRight size={20} />
            </>
          )}
        </button>
      </form>
    </div>
  );
}
