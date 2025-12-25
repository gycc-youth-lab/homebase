'use client'

import React, { useState } from 'react';

interface JoinUsFormProps {
    className?: string;
}

const JoinUsForm = ({ className = '' }: JoinUsFormProps) => {
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')
    const [message, setMessage] = useState('')
    const [privacyAgreed, setPrivacyAgreed] = useState(false)
    const [submitting, setSubmitting] = useState(false)
    const [success, setSuccess] = useState(false)
    const [error, setError] = useState('')

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!email.trim()) {
            setError('Email is required')
            return
        }
        if (!privacyAgreed) {
            setError('Please agree to the privacy policy')
            return
        }

        setSubmitting(true)
        setError('')

        try {
            const response = await fetch('/api/subscribe', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: email.trim(),
                    full_name: `${firstName.trim()} ${lastName.trim()}`.trim() || null,
                    phone: phone.trim() || null,
                    message: message.trim() || null,
                })
            })

            if (!response.ok) {
                const data = await response.json()
                throw new Error(data.error || 'Failed to subscribe')
            }

            setSuccess(true)
            setFirstName('')
            setLastName('')
            setEmail('')
            setPhone('')
            setMessage('')
            setPrivacyAgreed(false)
        } catch (error: any) {
            console.error('Error subscribing:', error)
            setError(error.message || 'Failed to subscribe')
        } finally {
            setSubmitting(false)
        }
    }

    if (success) {
        return (
            <div className={`w-full max-w-xl ${className}`}>
                <div className="text-center p-8 bg-green-50 border border-green-200 rounded-lg">
                    <h3 className="text-lg font-semibold text-green-800 mb-2">Thank you!</h3>
                    <p className="text-green-700">You&apos;ve successfully subscribed to our newsletter.</p>
                </div>
            </div>
        )
    }

    return (
        <div className={`w-full max-w-xl ${className}`}>
            {error && (
                <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg">
                    <p className="text-red-700">{error}</p>
                </div>
            )}
            <form onSubmit={handleSubmit} className="flex flex-col gap-8">
                {/* Form fields */}
                <div className="flex flex-col gap-6">
                    {/* Name row */}
                    <div className="flex flex-col md:flex-row gap-6 w-full">
                        {/* First name */}
                        <div className="flex flex-col gap-1.5 w-full">
                            <label className="text-sm font-medium text-[#344054]">
                                First name
                            </label>
                            <input
                                type="text"
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)}
                                placeholder="First name"
                                className="w-full px-3.5 py-2.5 border border-[#D0D5DD] rounded-lg shadow-sm text-[#667085] focus:outline-none focus:ring-2 focus:ring-[#1DADDF] focus:border-[#1DADDF]"
                            />
                        </div>

                        {/* Last name */}
                        <div className="flex flex-col gap-1.5 w-full">
                            <label className="text-sm font-medium text-[#344054]">
                                Last name
                            </label>
                            <input
                                type="text"
                                value={lastName}
                                onChange={(e) => setLastName(e.target.value)}
                                placeholder="Last name"
                                className="w-full px-3.5 py-2.5 border border-[#D0D5DD] rounded-lg shadow-sm text-[#667085] focus:outline-none focus:ring-2 focus:ring-[#1DADDF] focus:border-[#1DADDF]"
                            />
                        </div>
                    </div>

                    {/* Email */}
                    <div className="flex flex-col gap-1.5 w-full">
                        <label className="text-sm font-medium text-[#344054]">
                            Email
                        </label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="you@company.com"
                            className="w-full px-3.5 py-2.5 border border-[#D0D5DD] rounded-lg shadow-sm text-[#667085] focus:outline-none focus:ring-2 focus:ring-[#1DADDF] focus:border-[#1DADDF]"
                            required
                        />
                    </div>

                    {/* Phone */}
                    <div className="flex flex-col gap-1.5 w-full">
                        <label className="text-sm font-medium text-[#344054]">
                            Phone number
                        </label>
                        <div className="flex w-full">
                            <div className="flex items-center gap-2 border-y border-l border-[#D0D5DD] rounded-l-lg px-3.5 py-2.5 bg-white">
                                <span className="text-[#344054]">US</span>
                                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M4 6L8 10L12 6" stroke="#98A2B3" strokeWidth="1.67" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </div>
                            <input
                                type="tel"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                                placeholder="+1 (555) 000-0000"
                                className="flex-1 border-y border-r border-[#D0D5DD] rounded-r-lg px-3.5 py-2.5 text-[#667085] focus:outline-none focus:ring-2 focus:ring-[#1DADDF] focus:border-[#1DADDF]"
                            />
                        </div>
                    </div>

                    {/* Message */}
                    <div className="flex flex-col gap-1.5 w-full">
                        <label className="text-sm font-medium text-[#344054]">
                            Message
                        </label>
                        <textarea
                            rows={5}
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            placeholder="Leave us a message..."
                            className="w-full px-3.5 py-2.5 border border-[#D0D5DD] rounded-lg shadow-sm text-[#667085] focus:outline-none focus:ring-2 focus:ring-[#1DADDF] focus:border-[#1DADDF]"
                        />
                    </div>

                    {/* Privacy policy */}
                    <div className="flex items-start gap-3">
                        <input
                            type="checkbox"
                            id="privacy-policy"
                            checked={privacyAgreed}
                            onChange={(e) => setPrivacyAgreed(e.target.checked)}
                            className="mt-1 h-4 w-4 rounded border-[#D0D5DD] text-[#1DADDF] focus:ring-[#1DADDF]"
                            required
                        />
                        <label htmlFor="privacy-policy" className="text-[#475467]">
                            You agree to our friendly privacy policy.
                        </label>
                    </div>
                </div>

                {/* Submit button */}
                <button
                    type="submit"
                    disabled={submitting}
                    className="w-full bg-[#028DBF] text-white font-semibold py-3 px-4.5 rounded-lg shadow-sm hover:bg-[#0278A4] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                    {submitting ? 'Subscribing...' : 'Subscribe to Newsletter'}
                </button>
            </form>
        </div>
    );
};

export default JoinUsForm;