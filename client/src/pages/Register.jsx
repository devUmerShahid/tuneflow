import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { login, register } from '../features/auth/authSlice'
import { useNavigate } from 'react-router-dom'

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true)
  const [formData, setFormData] = useState({ name: '', email: '', password: '' })
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    const action = isLogin ? login : register
    const result = await dispatch(action(formData))
    if (result.type.endsWith('fulfilled')) {
      navigate('/')
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 to-black flex items-center justify-center">
      <div className="bg-dark-light p-10 rounded-2xl w-full max-w-md">
        <h2 className="text-4xl font-bold text-center mb-8 text-primary">TuneFlow</h2>
        <h3 className="text-2xl mb-6">{isLogin ? 'Login' : 'Register'}</h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLogin && (
            <input
              type="text"
              placeholder="Name"
              className="w-full p-3 rounded bg-gray-800 focus:outline-none focus:ring-2 focus:ring-primary"
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
            />
          )}
          <input
            type="email"
            placeholder="Email"
            className="w-full p-3 rounded bg-gray-800 focus:outline-none focus:ring-2 focus:ring-primary"
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            required
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full p-3 rounded bg-gray-800 focus:outline-none focus:ring-2 focus:ring-primary"
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            required
          />
          <button type="submit" className="w-full bg-primary py-3 rounded-full font-bold hover:bg-green-500 transition">
            {isLogin ? 'Login' : 'Create Account'}
          </button>
        </form>
        <p className="text-center mt-6">
          {isLogin ? "Don't have an account? " : "Already have an account? "}
          <button onClick={() => setIsLogin(!isLogin)} className="text-primary hover:underline">
            {isLogin ? 'Register' : 'Login'}
          </button>
        </p>
      </div>
    </div>
  )
}