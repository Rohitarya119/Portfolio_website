'use client';

import { useState, FormEvent, ChangeEvent } from 'react';
import { Send, Loader2, CheckCircle2, ShieldAlert } from 'lucide-react';

interface FormState {
  name: string;
  email: string;
  subject: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
}

export default function ContactForm() {
  const [formData, setFormData] = useState<FormState>({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const validate = (): boolean => {
    const tempErrors: FormErrors = {};
    if (!formData.name.trim()) tempErrors.name = 'Name is required';
    if (!formData.email.trim()) {
      tempErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      tempErrors.email = 'Invalid email address';
    }
    if (!formData.subject.trim()) tempErrors.subject = 'Subject is required';
    if (!formData.message.trim()) {
      tempErrors.message = 'Message content is required';
    } else if (formData.message.length < 10) {
      tempErrors.message = 'Message must be at least 10 characters';
    }

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error on type
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validate()) return;

    setStatus('submitting');

    try {
      const accessKey = process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY || "YOUR_ACCESS_KEY_HERE";
      
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          access_key: accessKey,
          name: formData.name,
          email: formData.email,
          subject: formData.subject,
          message: formData.message,
          from_name: 'Rohit Portfolio Contact Form',
        }),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        setStatus('success');
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        console.error('Web3Forms Error:', result);
        setStatus('error');
      }
    } catch (err) {
      console.error('Contact Form Submission Error:', err);
      setStatus('error');
    }
  };

  return (
    <div className="glass-panel rounded-2xl p-6 md:p-8 border border-border shadow-xl hover:border-primary/20 transition-all duration-300 max-w-xl mx-auto">
      <h3 className="text-xl font-bold text-foreground mb-1 flex items-center gap-2">
        Get In Touch
      </h3>
      <p className="text-xs text-muted-foreground mb-6">
        Submit a query or project opportunity. I typically reply within 24 hours.
      </p>

      {status === 'success' ? (
        <div className="py-8 text-center space-y-4 animate-in fade-in zoom-in duration-300">
          <div className="inline-flex p-3 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
            <CheckCircle2 className="h-8 w-8 animate-bounce" />
          </div>
          <div className="space-y-1.5 font-mono text-xs max-w-xs mx-auto bg-emerald-950/20 border border-emerald-500/20 p-4 rounded-xl">
            <p className="text-emerald-400 font-bold">MESSAGE TRANSMITTED</p>
            <p className="text-muted-foreground text-[10px]">Status: 200 OK Connection Secured</p>
            <p className="text-muted-foreground text-[10px]">Recipient: rohitarya.dev</p>
            <p className="text-emerald-500/80 text-[10px] mt-2 font-semibold">Thank you! Your message has been received.</p>
          </div>
          <button
            onClick={() => setStatus('idle')}
            className="px-6 py-2 text-xs font-semibold bg-muted hover:bg-muted/70 text-foreground rounded-lg transition-colors border border-border"
          >
            Send Another Message
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-5" noValidate>
          
          {/* Grid Name/Email */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Name input */}
            <div className="relative">
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder=" "
                className={`peer w-full px-4 py-3 rounded-xl bg-muted/20 border text-sm text-foreground placeholder-transparent focus:outline-none focus:ring-1 focus:ring-primary focus:bg-muted/30 transition-all ${
                  errors.name ? 'border-red-500/60 focus:ring-red-500' : 'border-border/60'
                }`}
              />
              <label
                htmlFor="name"
                className="absolute left-4 top-3 text-xs text-muted-foreground origin-[0] -translate-y-6 scale-75 transform transition-all duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:text-primary pointer-events-none"
              >
                Full Name
              </label>
              {errors.name && (
                <span className="text-[10px] text-red-400 mt-1 block pl-1">{errors.name}</span>
              )}
            </div>

            {/* Email input */}
            <div className="relative">
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder=" "
                className={`peer w-full px-4 py-3 rounded-xl bg-muted/20 border text-sm text-foreground placeholder-transparent focus:outline-none focus:ring-1 focus:ring-primary focus:bg-muted/30 transition-all ${
                  errors.email ? 'border-red-500/60 focus:ring-red-500' : 'border-border/60'
                }`}
              />
              <label
                htmlFor="email"
                className="absolute left-4 top-3 text-xs text-muted-foreground origin-[0] -translate-y-6 scale-75 transform transition-all duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:text-primary pointer-events-none"
              >
                Email Address
              </label>
              {errors.email && (
                <span className="text-[10px] text-red-400 mt-1 block pl-1">{errors.email}</span>
              )}
            </div>
          </div>

          {/* Subject input */}
          <div className="relative">
            <input
              type="text"
              id="subject"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              placeholder=" "
              className={`peer w-full px-4 py-3 rounded-xl bg-muted/20 border text-sm text-foreground placeholder-transparent focus:outline-none focus:ring-1 focus:ring-primary focus:bg-muted/30 transition-all ${
                errors.subject ? 'border-red-500/60 focus:ring-red-500' : 'border-border/60'
              }`}
            />
            <label
              htmlFor="subject"
              className="absolute left-4 top-3 text-xs text-muted-foreground origin-[0] -translate-y-6 scale-75 transform transition-all duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:text-primary pointer-events-none"
            >
              Subject Topic
            </label>
            {errors.subject && (
              <span className="text-[10px] text-red-400 mt-1 block pl-1">{errors.subject}</span>
            )}
          </div>

          {/* Message textarea */}
          <div className="relative">
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows={4}
              placeholder=" "
              className={`peer w-full px-4 py-3 rounded-xl bg-muted/20 border text-sm text-foreground placeholder-transparent focus:outline-none focus:ring-1 focus:ring-primary focus:bg-muted/30 transition-all ${
                errors.message ? 'border-red-500/60 focus:ring-red-500' : 'border-border/60'
              }`}
            />
            <label
              htmlFor="message"
              className="absolute left-4 top-3 text-xs text-muted-foreground origin-[0] -translate-y-6 scale-75 transform transition-all duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:text-primary pointer-events-none"
            >
              Message Content
            </label>
            {errors.message && (
              <span className="text-[10px] text-red-400 mt-1 block pl-1">{errors.message}</span>
            )}
          </div>

          {status === 'error' && (
            <div className="flex items-center gap-2 p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-medium">
              <ShieldAlert className="h-4 w-4" />
              <span>Failed to send. Please verify connectivity and try again.</span>
            </div>
          )}

          <button
            type="submit"
            disabled={status === 'submitting'}
            className="w-full flex items-center justify-center gap-2 px-6 py-3.5 bg-gradient-to-r from-primary to-accent hover:shadow-lg hover:shadow-primary/30 text-white rounded-xl text-sm font-semibold transition-all duration-300 disabled:opacity-50"
          >
            {status === 'submitting' ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                <span>Simulating Network Request...</span>
              </>
            ) : (
              <>
                <Send className="h-4 w-4" />
                <span>Transmit Message</span>
              </>
            )}
          </button>
        </form>
      )}
    </div>
  );
}
