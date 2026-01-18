'use client'

import React, { useState } from 'react';

interface JoinUsFormProps {
    className?: string;
}

interface FormErrors {
    firstName?: string;
    lastName?: string;
    email?: string;
    privacy?: string;
}

const JoinUsForm = ({ className = '' }: JoinUsFormProps) => {
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [privacyAgreed, setPrivacyAgreed] = useState(false)
    const [submitting, setSubmitting] = useState(false)
    const [success, setSuccess] = useState(false)
    const [error, setError] = useState('')
    const [formErrors, setFormErrors] = useState<FormErrors>({})
    const [showPrivacyModal, setShowPrivacyModal] = useState(false)

    const validateForm = (): boolean => {
        const errors: FormErrors = {}

        if (!firstName.trim()) {
            errors.firstName = 'First name is required'
        }

        if (!lastName.trim()) {
            errors.lastName = 'Last name is required'
        }

        if (!email.trim()) {
            errors.email = 'Email is required'
        } else {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
            if (!emailRegex.test(email.trim())) {
                errors.email = 'Please enter a valid email address'
            }
        }

        if (!privacyAgreed) {
            errors.privacy = 'You must agree to the privacy policy'
        }

        setFormErrors(errors)
        return Object.keys(errors).length === 0
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setError('')

        if (!validateForm()) {
            return
        }

        setSubmitting(true)

        try {
            const response = await fetch('/api/subscribe', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    firstName: firstName.trim(),
                    lastName: lastName.trim(),
                    email: email.trim(),
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
            setPrivacyAgreed(false)
            setFormErrors({})
        } catch (err: unknown) {
            console.error('Error subscribing:', err)
            setError(err instanceof Error ? err.message : 'Failed to subscribe')
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
        <>
            <div className={`w-full max-w-xl ${className}`}>
                {error && (
                    <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg">
                        <p className="text-red-700">{error}</p>
                    </div>
                )}
                <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                    {/* Name row */}
                    <div className="flex flex-col md:flex-row gap-4 md:gap-6 w-full">
                        {/* First name */}
                        <div className="flex flex-col gap-1.5 w-full">
                            <label className="text-sm font-medium text-[#344054]">
                                First name <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                value={firstName}
                                onChange={(e) => {
                                    setFirstName(e.target.value)
                                    if (formErrors.firstName) setFormErrors(prev => ({ ...prev, firstName: undefined }))
                                }}
                                placeholder="First name"
                                className={`w-full px-3.5 py-2.5 border rounded-lg shadow-sm text-[#101828] placeholder:text-[#667085] focus:outline-none focus:ring-2 focus:ring-[#1DADDF] focus:border-[#1DADDF] ${
                                    formErrors.firstName ? 'border-red-500' : 'border-[#D0D5DD]'
                                }`}
                            />
                            {formErrors.firstName && (
                                <span className="text-sm text-red-500">{formErrors.firstName}</span>
                            )}
                        </div>

                        {/* Last name */}
                        <div className="flex flex-col gap-1.5 w-full">
                            <label className="text-sm font-medium text-[#344054]">
                                Last name <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                value={lastName}
                                onChange={(e) => {
                                    setLastName(e.target.value)
                                    if (formErrors.lastName) setFormErrors(prev => ({ ...prev, lastName: undefined }))
                                }}
                                placeholder="Last name"
                                className={`w-full px-3.5 py-2.5 border rounded-lg shadow-sm text-[#101828] placeholder:text-[#667085] focus:outline-none focus:ring-2 focus:ring-[#1DADDF] focus:border-[#1DADDF] ${
                                    formErrors.lastName ? 'border-red-500' : 'border-[#D0D5DD]'
                                }`}
                            />
                            {formErrors.lastName && (
                                <span className="text-sm text-red-500">{formErrors.lastName}</span>
                            )}
                        </div>
                    </div>

                    {/* Email */}
                    <div className="flex flex-col gap-1.5 w-full">
                        <label className="text-sm font-medium text-[#344054]">
                            Email <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => {
                                setEmail(e.target.value)
                                if (formErrors.email) setFormErrors(prev => ({ ...prev, email: undefined }))
                            }}
                            placeholder="you@example.com"
                            className={`w-full px-3.5 py-2.5 border rounded-lg shadow-sm text-[#101828] placeholder:text-[#667085] focus:outline-none focus:ring-2 focus:ring-[#1DADDF] focus:border-[#1DADDF] ${
                                formErrors.email ? 'border-red-500' : 'border-[#D0D5DD]'
                            }`}
                        />
                        {formErrors.email && (
                            <span className="text-sm text-red-500">{formErrors.email}</span>
                        )}
                    </div>

                    {/* Privacy policy */}
                    <div className="flex flex-col gap-1">
                        <div className="flex items-start gap-3">
                            <input
                                type="checkbox"
                                id="privacy-policy"
                                checked={privacyAgreed}
                                onChange={(e) => {
                                    setPrivacyAgreed(e.target.checked)
                                    if (formErrors.privacy) setFormErrors(prev => ({ ...prev, privacy: undefined }))
                                }}
                                className={`mt-1 h-4 w-4 rounded border text-[#1DADDF] focus:ring-[#1DADDF] ${
                                    formErrors.privacy ? 'border-red-500' : 'border-[#D0D5DD]'
                                }`}
                            />
                            <label htmlFor="privacy-policy" className="text-sm text-[#475467]">
                                You agree to our{' '}
                                <button
                                    type="button"
                                    onClick={() => setShowPrivacyModal(true)}
                                    className="text-[#1DADDF] underline hover:text-[#028DBF]"
                                >
                                    friendly privacy policy
                                </button>
                                . <span className="text-red-500">*</span>
                            </label>
                        </div>
                        {formErrors.privacy && (
                            <span className="text-sm text-red-500 ml-7">{formErrors.privacy}</span>
                        )}
                    </div>

                    {/* Submit button */}
                    <button
                        type="submit"
                        disabled={submitting}
                        className="w-full bg-[#028DBF] text-white font-semibold py-3 px-6 rounded-lg shadow-sm hover:bg-[#0278A4] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                        {submitting ? 'Subscribing...' : 'Subscribe to Newsletter'}
                    </button>
                </form>
            </div>

            {/* Privacy Policy Modal */}
            {showPrivacyModal && (
                <div
                    className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
                    onClick={() => setShowPrivacyModal(false)}
                >
                    <div
                        className="bg-white rounded-xl max-w-2xl w-full max-h-[80vh] overflow-hidden shadow-2xl"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Modal header */}
                        <div className="flex items-center justify-between p-6 border-b border-[#EAECF0]">
                            <h2 className="text-xl font-semibold text-[#101828]">Privacy Policy</h2>
                            <button
                                onClick={() => setShowPrivacyModal(false)}
                                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                            >
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M18 6L6 18M6 6L18 18" stroke="#667085" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </button>
                        </div>

                        {/* Modal content */}
                        <div className="p-6 overflow-y-auto max-h-[60vh]">
                            <div className="prose prose-sm max-w-none text-[#475467]">
                                <p className="mb-4">
                                    <strong>Last updated:</strong> January 2025
                                </p>

                                <h3 className="text-lg font-semibold text-[#101828] mt-6 mb-3">1. Information We Collect</h3>
                                <p className="mb-4">
                                    When you subscribe to our newsletter, we collect the following information:
                                </p>
                                <ul className="list-disc pl-5 mb-4 space-y-1">
                                    <li>Your first and last name</li>
                                    <li>Email address</li>
                                </ul>

                                <h3 className="text-lg font-semibold text-[#101828] mt-6 mb-3">2. How We Use Your Information</h3>
                                <p className="mb-4">
                                    We use the information we collect to:
                                </p>
                                <ul className="list-disc pl-5 mb-4 space-y-1">
                                    <li>Send you our newsletter with updates about GYCC activities</li>
                                    <li>Notify you about upcoming events and opportunities</li>
                                    <li>Communicate important announcements</li>
                                </ul>

                                <h3 className="text-lg font-semibold text-[#101828] mt-6 mb-3">3. Data Protection</h3>
                                <p className="mb-4">
                                    We are committed to protecting your personal information. Your data is stored securely and we do not sell, trade, or share your personal information with third parties for marketing purposes.
                                </p>

                                <h3 className="text-lg font-semibold text-[#101828] mt-6 mb-3">4. Your Rights</h3>
                                <p className="mb-4">
                                    You have the right to:
                                </p>
                                <ul className="list-disc pl-5 mb-4 space-y-1">
                                    <li>Unsubscribe from our newsletter at any time</li>
                                    <li>Request access to your personal data</li>
                                    <li>Request deletion of your personal data</li>
                                    <li>Update or correct your information</li>
                                </ul>

                                <h3 className="text-lg font-semibold text-[#101828] mt-6 mb-3">5. Contact Us</h3>
                                <p className="mb-4">
                                    If you have any questions about this privacy policy, please contact us at{' '}
                                    <a href="mailto:admin@gyccyouthlab.org" className="text-[#1DADDF] hover:underline">
                                        admin@gyccyouthlab.org
                                    </a>
                                </p>
                            </div>
                        </div>

                        {/* Modal footer */}
                        <div className="p-6 border-t border-[#EAECF0]">
                            <button
                                onClick={() => setShowPrivacyModal(false)}
                                className="w-full bg-[#028DBF] text-white font-semibold py-3 px-6 rounded-lg shadow-sm hover:bg-[#0278A4] transition-colors"
                            >
                                I Understand
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default JoinUsForm;
