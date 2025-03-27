import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { registerUser } from '../../services/authentication';
import { User, Mail, Lock, CheckCircle } from 'lucide-react';

const Signup = () => {
    const [formData, setFormData] = useState({
        name: "", 
        email: "", 
        password: ""
    });
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [passwordStrength, setPasswordStrength] = useState(0);
    const navigate = useNavigate();

    const calculatePasswordStrength = (password) => {
        let strength = 0;
        if (password.length >= 8) strength++;
        if (password.match(/[a-z]+/)) strength++;
        if (password.match(/[A-Z]+/)) strength++;
        if (password.match(/[0-9]+/)) strength++;
        if (password.match(/[$@#&!]+/)) strength++;
        return strength;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);

        // Basic validation
        if (!formData.name || !formData.email || !formData.password) {
            setError("Please fill in all fields");
            setIsLoading(false);
            return;
        }

        if (passwordStrength < 3) {
            setError("Password is too weak");
            setIsLoading(false);
            return;
        }

        try {
            await registerUser(formData);
            navigate('/expense');
        } catch (error) {
            setError(error.message || "Registration failed");
            setIsLoading(false);
        }
    };

    const handlePasswordChange = (e) => {
        const password = e.target.value;
        setFormData({...formData, password});
        setPasswordStrength(calculatePasswordStrength(password));
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100 px-4">
            <div className="w-full max-w-md bg-white shadow-2xl rounded-2xl overflow-hidden">
                <div className="p-8">
                    <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
                        Create Your Account
                    </h2>
                    
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Name Input */}
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <User className="h-5 w-5 text-gray-400" />
                            </div>
                            <input
                                type="text"
                                required
                                value={formData.name}
                                onChange={(e) => setFormData({...formData, name: e.target.value.trim()})}
                                placeholder="Full Name"
                                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
                            />
                        </div>

                        {/* Email Input */}
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <Mail className="h-5 w-5 text-gray-400" />
                            </div>
                            <input
                                type="email"
                                required
                                value={formData.email}
                                onChange={(e) => setFormData({...formData, email: e.target.value.trim()})}
                                placeholder="Email Address"
                                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
                            />
                        </div>

                        {/* Password Input */}
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <Lock className="h-5 w-5 text-gray-400" />
                            </div>
                            <input
                                type="password"
                                required
                                value={formData.password}
                                onChange={handlePasswordChange}
                                placeholder="Create Password"
                                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
                            />
                            {formData.password && (
                                <div className="mt-2 h-1.5 w-full bg-gray-200 rounded">
                                    <div 
                                        className={`h-full rounded transition-all duration-300 ${
                                            passwordStrength <= 2 
                                                ? 'bg-red-500 w-1/3' 
                                                : passwordStrength <= 3 
                                                    ? 'bg-yellow-500 w-2/3' 
                                                    : 'bg-green-500 w-full'
                                        }`}
                                    />
                                </div>
                            )}
                        </div>

                        {/* Error Message */}
                        {error && (
                            <div className="text-red-500 text-sm text-center">
                                {error}
                            </div>
                        )}

                        {/* Submit Button */}
                        <button 
                            type="submit" 
                            disabled={isLoading}
                            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition duration-300 flex items-center justify-center space-x-2 disabled:opacity-50"
                        >
                            {isLoading ? (
                                <span>Creating Account...</span>
                            ) : (
                                <>
                                    <CheckCircle className="mr-2 h-5 w-5" />
                                    <span>Sign Up</span>
                                </>
                            )}
                        </button>
                    </form>

                    {/* Footer */}
                    <div className="mt-6 text-center text-sm text-gray-600">
                        Already have an account? {' '}
                        <a 
                            href="/login" 
                            className="text-blue-600 font-semibold hover:underline"
                        >
                            Log In
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Signup;