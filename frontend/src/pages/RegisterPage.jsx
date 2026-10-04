import React, { useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Leaf, Users, CheckSquare, TrendingDown, BarChart2, ClipboardCheck, CheckCircle, Upload, X } from 'lucide-react';
import loginBgImage from '../assets/login-bg-new.jpg';

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    companyName: '',
    adminName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: ''
  });
  
  const [logoFile, setLogoFile] = useState(null);
  const [logoPreview, setLogoPreview] = useState(null);
  const [logoError, setLogoError] = useState('');
  
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [apiMessage, setApiMessage] = useState('');
  
  const fileInputRef = useRef(null);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleLogoChange = (e) => {
    setLogoError('');
    const file = e.target.files[0];
    if (!file) return;

    const validTypes = ['image/jpeg', 'image/png', 'image/svg+xml'];
    if (!validTypes.includes(file.type)) {
      setLogoError('Valid formats: JPG, PNG, SVG.');
      return;
    }

    if (file.size > 2 * 1024 * 1024) {
      setLogoError('Max size: 2MB.');
      return;
    }

    setLogoFile(file);
    const reader = new FileReader();
    reader.onloadend = () => {
      setLogoPreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const clearLogo = () => {
    setLogoFile(null);
    setLogoPreview(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.companyName.trim()) newErrors.companyName = 'Required';
    if (!formData.adminName.trim()) newErrors.adminName = 'Required';
    
    if (!formData.email.trim()) {
      newErrors.email = 'Required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Invalid email';
    }

    if (!formData.phone.trim()) newErrors.phone = 'Required';

    if (!formData.password) {
      newErrors.password = 'Required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Min 8 chars';
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Must match';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setApiMessage('');
    if (!validateForm()) return;
    
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      setApiMessage({ type: 'success', text: 'Registration successful! (Backend integration pending). Redirecting...' });
      setTimeout(() => navigate('/login'), 2500);
    }, 1500);
  };

  return (
    <>
      <style>
        {`
          input:-webkit-autofill,
          input:-webkit-autofill:hover, 
          input:-webkit-autofill:focus, 
          input:-webkit-autofill:active{
              -webkit-box-shadow: 0 0 0 30px transparent inset !important;
              -webkit-text-fill-color: white !important;
              transition: background-color 5000s ease-in-out 0s;
          }
          
          /* Custom scrollbar for form */
          .form-scrollbar::-webkit-scrollbar {
            width: 6px;
          }
          .form-scrollbar::-webkit-scrollbar-track {
            background: rgba(255, 255, 255, 0.05);
            border-radius: 4px;
          }
          .form-scrollbar::-webkit-scrollbar-thumb {
            background: rgba(255, 255, 255, 0.2);
            border-radius: 4px;
          }
        `}
      </style>
      <div className="min-h-screen w-full relative flex items-center justify-center p-4 sm:p-8">
        
        {/* Blurred Full-Screen Background */}
        <div 
          className="absolute inset-0 z-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${loginBgImage})` }}
        >
          <div className="absolute inset-0 bg-black/40 backdrop-blur-2xl"></div>
        </div>

        {/* Main Centered Card */}
        <div 
          className="relative z-10 w-full max-w-6xl flex flex-col md:flex-row rounded-[2rem] overflow-hidden shadow-2xl min-h-[700px] max-h-[90vh] bg-cover bg-[position:35%_center]"
          style={{ backgroundImage: `url(${loginBgImage})` }}
        >
          
          {/* Left Panel - Copied exactly from LoginPage */}
          <div className="w-full md:w-[55%] relative hidden md:flex flex-col justify-between p-12">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/80"></div>
            
            <Link to="/" className="relative z-10 flex items-center gap-2 font-bold text-xl text-[#0B2B26] hover:opacity-80 transition-opacity w-max">
              <Leaf size={24} className="text-[#0B2B26]" />
              <span>EcoSphere</span>
            </Link>

            <div className="relative z-10 flex flex-col gap-4 mt-8">
              {/* Environmental Card */}
              <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-4 w-72 text-white shadow-lg transition-all duration-300 cursor-pointer hover:bg-white/20 hover:border-white/40 hover:shadow-2xl hover:-translate-y-1 hover:scale-[1.02] group">
                <div className="flex items-center gap-2 mb-4 text-sm font-semibold text-white/90">
                  <Leaf size={16} />
                  <span>Environmental</span>
                </div>
                <div className="flex justify-between items-end gap-2">
                  <div className="flex flex-col items-center flex-1">
                    <TrendingDown size={32} className="text-white/80 mb-2" strokeWidth={1.5} />
                    <span className="text-[10px] text-white/70 text-center">CO₂ emissions</span>
                  </div>
                  <div className="flex flex-col items-center flex-1">
                    <div className="relative mb-2">
                      <svg className="w-8 h-8 transform -rotate-90" viewBox="0 0 36 36">
                        <path className="text-white/20" strokeWidth="3" stroke="currentColor" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                        <path className="text-[#8EB69B]" strokeWidth="3" strokeDasharray="75, 100" stroke="currentColor" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                      </svg>
                      <Leaf size={12} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[#8EB69B]" />
                    </div>
                    <span className="text-[10px] text-white/70 text-center leading-tight">Sustainability<br/>goals</span>
                  </div>
                </div>
              </div>

              {/* Social Card */}
              <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-4 w-72 text-white shadow-lg transition-all duration-300 cursor-pointer hover:bg-white/20 hover:border-white/40 hover:shadow-2xl hover:-translate-y-1 hover:scale-[1.02] group">
                <div className="flex items-center gap-2 mb-4 text-sm font-semibold text-white/90">
                  <Users size={16} />
                  <span>Social</span>
                </div>
                <div className="flex justify-between items-end gap-2">
                  <div className="flex flex-col items-center flex-1">
                    <Users size={32} className="text-white/80 mb-2" strokeWidth={1.5} />
                    <span className="text-[10px] text-white/70 text-center leading-tight">Employee<br/>participation</span>
                  </div>
                  <div className="flex flex-col items-center flex-1">
                    <BarChart2 size={32} className="text-[#8EB69B] mb-2" strokeWidth={1.5} />
                    <span className="text-[10px] text-white/70 text-center leading-tight">CSR activity<br/>progress</span>
                  </div>
                </div>
              </div>

              {/* Governance Card */}
              <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-4 w-72 text-white shadow-lg transition-all duration-300 cursor-pointer hover:bg-white/20 hover:border-white/40 hover:shadow-2xl hover:-translate-y-1 hover:scale-[1.02] group">
                <div className="flex items-center gap-2 mb-4 text-sm font-semibold text-white/90">
                  <CheckSquare size={16} />
                  <span>Governance</span>
                </div>
                <div className="flex justify-between items-end gap-2">
                  <div className="flex flex-col items-center flex-1">
                    <ClipboardCheck size={32} className="text-white/80 mb-2" strokeWidth={1.5} />
                  </div>
                  <div className="flex flex-col items-center flex-1">
                    <CheckCircle size={32} className="text-[#8EB69B] mb-2" strokeWidth={1.5} />
                    <span className="text-[10px] text-white/70 text-center leading-tight">Compliance<br/>status</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Panel - Registration Form */}
          <div className="w-full md:w-[45%] bg-black/50 backdrop-blur-md flex flex-col p-8 sm:p-12 relative z-10 form-scrollbar overflow-y-auto">
            <div className="md:hidden flex items-center gap-2 font-bold text-xl mb-8 text-white">
              <Leaf size={24} className="text-white" />
              <span>EcoSphere</span>
            </div>

            <div className="mb-10">
              <h1 className="text-3xl font-light mb-2 !text-white">Create your company</h1>
              <p className="text-xs text-white/60">Register your organization and create your admin account.</p>
            </div>

            {apiMessage && (
              <div className={`mb-6 p-3 rounded-lg text-sm border ${apiMessage.type === 'success' ? 'bg-green-900/30 border-green-500/30 text-green-300' : 'bg-red-900/30 border-red-500/30 text-red-300'}`}>
                {apiMessage.text}
              </div>
            )}

            <form className="flex flex-col gap-8 w-full max-w-sm mx-auto md:mx-0" onSubmit={handleSubmit}>
              
              {/* Logo Upload */}
              <div className="flex items-center gap-4">
                {logoPreview ? (
                  <div className="relative w-16 h-16 rounded-xl overflow-hidden border border-white/20 bg-black/20 flex-shrink-0 group">
                    <img src={logoPreview} alt="Logo preview" className="w-full h-full object-cover" />
                    <button 
                      type="button" 
                      onClick={clearLogo}
                      className="absolute inset-0 bg-black/60 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <X size={16} />
                    </button>
                  </div>
                ) : (
                  <div 
                    onClick={() => fileInputRef.current?.click()}
                    className="w-16 h-16 rounded-xl border border-dashed border-white/30 bg-white/5 flex flex-col items-center justify-center cursor-pointer hover:bg-white/10 transition-colors flex-shrink-0 group"
                  >
                    <Upload size={18} className="text-white/60 group-hover:text-white mb-1 transition-colors" />
                  </div>
                )}
                <div className="flex-1">
                  <label className="text-sm text-white/70 block mb-1">Company Logo (Optional)</label>
                  <p className="text-[10px] text-white/40">PNG, JPG, SVG up to 2MB</p>
                  {logoError && <p className="text-[10px] text-red-400 mt-1">{logoError}</p>}
                  <input 
                    type="file" 
                    ref={fileInputRef} 
                    className="hidden" 
                    accept="image/png, image/jpeg, image/svg+xml"
                    onChange={handleLogoChange}
                  />
                </div>
              </div>

              {/* Company & Admin Name */}
              <div className="flex flex-col gap-8">
                <div className="flex flex-col relative group">
                  <label htmlFor="companyName" className="text-xs text-white/60 mb-1 absolute -top-5 left-0 transition-all group-focus-within:text-white">
                    Company Name
                  </label>
                  <input 
                    type="text" 
                    id="companyName"
                    name="companyName" 
                    className="w-full bg-transparent border-0 border-b border-white/30 pb-2 text-white placeholder-white/30 focus:outline-none focus:border-white focus:ring-0 transition-colors"
                    placeholder="e.g. Acme Corp"
                    value={formData.companyName}
                    onChange={handleInputChange}
                  />
                  {errors.companyName && <span className="absolute -bottom-5 right-0 text-[10px] text-red-400">{errors.companyName}</span>}
                </div>

                <div className="flex flex-col relative group">
                  <label htmlFor="adminName" className="text-xs text-white/60 mb-1 absolute -top-5 left-0 transition-all group-focus-within:text-white">
                    Administrator Name
                  </label>
                  <input 
                    type="text" 
                    id="adminName" 
                    name="adminName"
                    className="w-full bg-transparent border-0 border-b border-white/30 pb-2 text-white placeholder-white/30 focus:outline-none focus:border-white focus:ring-0 transition-colors"
                    placeholder="Your full name"
                    value={formData.adminName}
                    onChange={handleInputChange}
                  />
                  {errors.adminName && <span className="absolute -bottom-5 right-0 text-[10px] text-red-400">{errors.adminName}</span>}
                </div>
              </div>

              {/* Email & Phone */}
              <div className="grid grid-cols-2 gap-6">
                <div className="flex flex-col relative group">
                  <label htmlFor="email" className="text-xs text-white/60 mb-1 absolute -top-5 left-0 transition-all group-focus-within:text-white">
                    Work Email
                  </label>
                  <input 
                    type="email" 
                    id="email" 
                    name="email"
                    className="w-full bg-transparent border-0 border-b border-white/30 pb-2 text-white placeholder-white/30 focus:outline-none focus:border-white focus:ring-0 transition-colors"
                    placeholder="you@company.com"
                    value={formData.email}
                    onChange={handleInputChange}
                  />
                  {errors.email && <span className="absolute -bottom-5 right-0 text-[10px] text-red-400">{errors.email}</span>}
                </div>

                <div className="flex flex-col relative group">
                  <label htmlFor="phone" className="text-xs text-white/60 mb-1 absolute -top-5 left-0 transition-all group-focus-within:text-white">
                    Phone
                  </label>
                  <input 
                    type="tel" 
                    id="phone" 
                    name="phone"
                    className="w-full bg-transparent border-0 border-b border-white/30 pb-2 text-white placeholder-white/30 focus:outline-none focus:border-white focus:ring-0 transition-colors"
                    placeholder="+1 234 567 8900"
                    value={formData.phone}
                    onChange={handleInputChange}
                  />
                  {errors.phone && <span className="absolute -bottom-5 right-0 text-[10px] text-red-400">{errors.phone}</span>}
                </div>
              </div>

              {/* Passwords */}
              <div className="grid grid-cols-2 gap-6">
                <div className="flex flex-col relative group">
                  <label htmlFor="password" className="text-xs text-white/60 mb-1 absolute -top-5 left-0 transition-all group-focus-within:text-white">
                    Password
                  </label>
                  <div className="relative w-full">
                    <input 
                      type={showPassword ? "text" : "password"} 
                      id="password" 
                      name="password"
                      className="w-full bg-transparent border-0 border-b border-white/30 pb-2 pr-6 text-white placeholder-white/30 focus:outline-none focus:border-white focus:ring-0 transition-colors text-sm"
                      placeholder="Min 8 chars"
                      value={formData.password}
                      onChange={handleInputChange}
                    />
                    <button 
                      type="button" 
                      className="absolute right-0 top-0 text-white/50 hover:text-white transition-colors"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeOff size={14} /> : <Eye size={14} />}
                    </button>
                  </div>
                  {errors.password && <span className="absolute -bottom-4 right-0 text-[10px] text-red-400">{errors.password}</span>}
                </div>

                <div className="flex flex-col relative group">
                  <label htmlFor="confirmPassword" className="text-xs text-white/60 mb-1 absolute -top-5 left-0 transition-all group-focus-within:text-white">
                    Confirm
                  </label>
                  <div className="relative w-full">
                    <input 
                      type={showConfirmPassword ? "text" : "password"} 
                      id="confirmPassword" 
                      name="confirmPassword"
                      className="w-full bg-transparent border-0 border-b border-white/30 pb-2 pr-6 text-white placeholder-white/30 focus:outline-none focus:border-white focus:ring-0 transition-colors text-sm"
                      placeholder="Confirm password"
                      value={formData.confirmPassword}
                      onChange={handleInputChange}
                    />
                    <button 
                      type="button" 
                      className="absolute right-0 top-0 text-white/50 hover:text-white transition-colors"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    >
                      {showConfirmPassword ? <EyeOff size={14} /> : <Eye size={14} />}
                    </button>
                  </div>
                  {errors.confirmPassword && <span className="absolute -bottom-4 right-0 text-[10px] text-red-400">{errors.confirmPassword}</span>}
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-col gap-4 mt-4">
                <button 
                  type="submit" 
                  className="w-full bg-white text-black px-8 py-3 rounded-full font-medium hover:bg-gray-200 transition-colors disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <div className="w-5 h-5 border-2 border-black/20 border-t-black rounded-full animate-spin"></div>
                  ) : 'Create company account'}
                </button>
                
                <div className="text-center mt-2">
                  <span className="text-sm text-white/60">Already have an account? </span>
                  <Link to="/login" className="text-sm text-white font-medium hover:underline transition-colors">
                    Sign in
                  </Link>
                </div>
              </div>
            </form>
          </div>
          
        </div>
      </div>
    </>
  );
};

export default RegisterPage;
