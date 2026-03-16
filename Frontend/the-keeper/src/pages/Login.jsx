import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function Login() {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  })

  function handleChange(e) {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  async function handleSubmit(e) {
    e.preventDefault()
    try {
      const res = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify(formData)
      })

      const data = await res.json()
      
      if (!res.ok) {
        console.error('Error:', data.message || 'Login failed')
        return
      }
      
      console.log('Success:', data)
      navigate('/')
    } catch (error) {
      console.error('Error:', error.message)
    }
  }

  return (
    <div className='flex justify-center items-center min-h-screen'>
      <div className='border rounded-lg p-8 w-full max-w-md'>
        <h1 className='text-2xl font-bold mb-6 text-center'>Login</h1>
        <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
          <input 
            type="email" 
            name="email"
            placeholder='Enter your email' 
            className='border rounded-lg p-2'
            value={formData.email}
            onChange={handleChange}
            required
          />
          <input 
            type="password" 
            name="password"
            placeholder='Enter your password' 
            className='border rounded-lg p-2'
            value={formData.password}
            onChange={handleChange}
            required
          />
          <button 
            type='submit' 
            className='bg-amber-300 text-white rounded-lg p-2 font-semibold hover:bg-amber-600'
          >
            Login
          </button>
        </form>
      </div>
    </div>
  )
}

export default Login
