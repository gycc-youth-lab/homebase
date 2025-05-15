import React from 'react';

interface JoinUsFormProps {
    className?: string;
}

const JoinUsForm = ({ className = '' }: JoinUsFormProps) => {
    return (
        <div className={`w-full max-w-xl ${className}`}>
            <form className="flex flex-col gap-8">
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
                            placeholder="you@company.com"
                            className="w-full px-3.5 py-2.5 border border-[#D0D5DD] rounded-lg shadow-sm text-[#667085] focus:outline-none focus:ring-2 focus:ring-[#1DADDF] focus:border-[#1DADDF]"
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
                            placeholder="Leave us a message..."
                            className="w-full px-3.5 py-2.5 border border-[#D0D5DD] rounded-lg shadow-sm text-[#667085] focus:outline-none focus:ring-2 focus:ring-[#1DADDF] focus:border-[#1DADDF]"
                        />
                    </div>

                    {/* Privacy policy */}
                    <div className="flex items-start gap-3">
                        <input
                            type="checkbox"
                            id="privacy-policy"
                            className="mt-1 h-4 w-4 rounded border-[#D0D5DD] text-[#1DADDF] focus:ring-[#1DADDF]"
                        />
                        <label htmlFor="privacy-policy" className="text-[#475467]">
                            You agree to our friendly privacy policy.
                        </label>
                    </div>
                </div>

                {/* Submit button */}
                <button
                    type="submit"
                    className="w-full bg-[#028DBF] text-white font-semibold py-3 px-4.5 rounded-lg shadow-sm hover:bg-[#0278A4] transition-colors"
                >
                    Send message
                </button>
            </form>
        </div>
    );
};

export default JoinUsForm;