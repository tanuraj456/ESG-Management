import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Leaf, Users, CheckSquare, TrendingDown, BarChart2, ClipboardCheck, CheckCircle } from 'lucide-react';
import loginBgImage from '../assets/login-bg-new.jpg';

const LoginPage = () => {
  const [employeeId, setEmployeeId] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    setError('');

    if (!employeeId || !password) {
      setError('Please enter both Employee ID and password.');
      return;
    }

    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      if (employeeId === 'admin' || employeeId.startsWith('EMP')) {
         navigate('/');
      } else {
         setError('Invalid Employee ID or password.');
      }
    }, 1500);
  };

  return (
    <>
      <style>
        {`
          /* Override browser autofill background for inputs */
          input:-webkit-autofill,
          input:-webkit-autofill:hover, 
          input:-webkit-autofill:focus, 
          input:-webkit-autofill:active{
              -webkit-box-shadow: 0 0 0 30px transparent inset !important;
              -webkit-text-fill-color: white !important;
              transition: background-color 5000s ease-in-out 0s;
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

        {/* Main Centered Card - Has the clear image as its background */}
        <div 
          className="relative z-10 w-full max-w-5xl flex flex-col md:flex-row rounded-[2rem] overflow-hidden shadow-2xl min-h-[650px] bg-cover bg-[position:35%_center]"
          style={{ backgroundImage: `url(${loginBgImage})` }}
        >
          
          {/* Left Panel - Clear Image & Branding */}
          <div className="w-full md:w-[55%] relative hidden md:flex flex-col justify-between p-12">
            {/* Subtle gradient overlay to ensure text readability at the bottom */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/80"></div>
            
            <div className="relative z-10 flex items-center gap-2 font-bold text-xl text-[#0B2B26]">
              <Leaf size={24} className="text-[#0B2B26]" />
              <span>EcoSphere</span>
            </div>

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

          {/* Right Panel - Form (Dark Glassmorphism blurring the card's background) */}
          <div className="w-full md:w-[45%] bg-black/40 backdrop-blur-md flex flex-col justify-center p-8 sm:p-14 relative z-10">
            <div className="md:hidden flex items-center gap-2 font-bold text-xl mb-10 text-white">
              <Leaf size={24} className="text-white" />
              <span>EcoSphere</span>
            </div>

            <h1 className="text-3xl sm:text-4xl font-light mb-12 !text-white">Welcome back</h1>

            {error && <div className="mb-6 text-red-300 text-sm bg-red-900/30 border border-red-500/30 p-3 rounded-lg">{error}</div>}

            <form className="flex flex-col gap-10 w-full max-w-sm" onSubmit={handleLogin}>
              
              {/* Employee ID Input */}
              <div className="flex flex-col relative group">
                <label htmlFor="employeeId" className="text-sm text-white/70 mb-2 transition-all group-focus-within:text-white">
                  Employee ID
                </label>
                <input 
                  type="text" 
                  id="employeeId" 
                  className="w-full bg-transparent border-0 border-b border-white/30 pb-2 text-white placeholder-white/30 focus:outline-none focus:border-white focus:ring-0 transition-colors"
                  placeholder="e.g. EMP-1234"
                  value={employeeId}
                  onChange={(e) => setEmployeeId(e.target.value)}
                />
              </div>

              {/* Password Input */}
              <div className="flex flex-col relative group">
                <label htmlFor="password" className="text-sm text-white/70 mb-2 transition-all group-focus-within:text-white">
                  Password
                </label>
                <div className="relative w-full">
                  <input 
                    type={showPassword ? "text" : "password"} 
                    id="password" 
                    className="w-full bg-transparent border-0 border-b border-white/30 pb-2 pr-8 text-white placeholder-white/30 focus:outline-none focus:border-white focus:ring-0 transition-colors"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <button 
                    type="button" 
                    className="absolute right-0 top-0 text-white/50 hover:text-white transition-colors p-1"
                    onClick={() => setShowPassword(!showPassword)}
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
                <p className="text-[11px] text-white/40 mt-2">Must be provided by administrator</p>
              </div>

              {/* Actions */}
              <div className="flex flex-col gap-4 mt-2">
                <div className="flex items-center gap-6">
                  <button 
                    type="submit" 
                    className="bg-white text-black px-8 py-3 rounded-full font-medium hover:bg-gray-200 transition-colors disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center min-w-[120px]"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <div className="w-5 h-5 border-2 border-black/20 border-t-black rounded-full animate-spin"></div>
                    ) : 'Sign in'}
                  </button>
                  
                  <Link to="/" className="text-sm text-white/60 hover:text-white transition-colors">
                    Back to home?
                  </Link>
                </div>
                
                <div className="mt-2 text-sm text-white/60">
                  Don't have an account?{' '}
                  <Link to="/register" className="text-white hover:underline transition-colors font-medium">
                    Sign up
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

export default LoginPage;
