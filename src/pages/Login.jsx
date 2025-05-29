// src/pages/Login.jsx
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { Eye, EyeOff, Building2, Mail, Lock } from 'lucide-react';
import { useAuthStore } from '../stores/authStore';
import { toast } from 'react-hot-toast';

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const { login, isLoading } = useAuthStore();

  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = async (data) => {
  try {
    const user = await login(data);
    if (user) {
      toast.success('Connexion réussie!');
      navigate('/dashboard');
    }
  } catch (error) {
    toast.error(error.response?.data?.message || 'Erreur de connexion');
  }
};

  return (
    <div className="min-h-screen flex">
      {/* Left side - Branding */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative z-10 flex flex-col justify-center px-12 text-white">
          <div className="mb-8">
            <div className="flex items-center space-x-3 mb-6">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/20 backdrop-blur-sm">
                <Building2 className="h-7 w-7" />
              </div>
              <h1 className="text-3xl font-bold">ImmoConnect</h1>
            </div>
            <h2 className="text-4xl font-bold mb-4">
              Connectez-vous à vos clients comme jamais auparavant
            </h2>
            <p className="text-blue-100 text-lg leading-relaxed">
              Gérez votre clientèle immobilière et envoyez des messages WhatsApp 
              personnalisés avec nos modèles professionnels.
            </p>
          </div>
          
          <div className="grid grid-cols-3 gap-6 mt-12">
            <div className="text-center">
              <div className="text-2xl font-bold">500+</div>
              <div className="text-blue-200">Agences</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">10K+</div>
              <div className="text-blue-200">Clients</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">50K+</div>
              <div className="text-blue-200">Messages</div>
            </div>
          </div>
        </div>
      </div>

      {/* Right side - Login form */}
      <div className="flex-1 flex flex-col justify-center px-8 py-12 lg:px-12">
        <div className="mx-auto w-full max-w-md">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-gray-900">Bon retour!</h2>
            <p className="text-gray-600 mt-2">
              Connectez-vous à votre compte ImmoConnect
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Adresse email
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="email"
                  {...register('email', {
                    required: 'Email requis',
                    pattern: {
                     value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                     message: 'Email invalide'
                   }
                 })}
                 className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
                   errors.email ? 'border-red-300' : 'border-gray-300'
                 }`}
                 placeholder="votre@email.com"
               />
             </div>
             {errors.email && (
               <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
             )}
           </div>

           {/* Password */}
           <div>
             <label className="block text-sm font-medium text-gray-700 mb-2">
               Mot de passe
             </label>
             <div className="relative">
               <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
               <input
                 type={showPassword ? 'text' : 'password'}
                 {...register('password', {
                   required: 'Mot de passe requis',
                   minLength: {
                     value: 6,
                     message: 'Minimum 6 caractères'
                   }
                 })}
                 className={`w-full pl-10 pr-12 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
                   errors.password ? 'border-red-300' : 'border-gray-300'
                 }`}
                 placeholder="••••••••"
               />
               <button
                 type="button"
                 onClick={() => setShowPassword(!showPassword)}
                 className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
               >
                 {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
               </button>
             </div>
             {errors.password && (
               <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>
             )}
           </div>

           {/* Submit button */}
           <button
             type="submit"
             disabled={isLoading}
             className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
           >
             {isLoading ? (
               <div className="flex items-center justify-center">
                 <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                 Connexion...
               </div>
             ) : (
               'Se connecter'
             )}
           </button>
         </form>

         <div className="mt-6 text-center">
           <p className="text-gray-600">
             Pas encore de compte?{' '}
             <Link 
               to="/register" 
               className="text-blue-600 hover:text-blue-700 font-medium"
             >
               Créer un compte
             </Link>
           </p>
         </div>
       </div>
     </div>
   </div>
 );
};

export default Login;