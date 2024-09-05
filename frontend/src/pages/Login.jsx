import coverImage from '../assets/login-cover-image.png'
import { Link } from 'react-router-dom'

function Login() {
  return (
    <>
      <div className="coverSection w-2/3 bg-pink-100 mx-auto my-10 rounded-lg p-5 flex justify-around">
        <img className='w-1/2' src={coverImage} alt="cover-image" />
        <div className="login bg-red-500 justify-center">
          <h2 className='font-semibold text-4xl'>Login</h2>
          <label htmlFor="Email" className='font-semibold text-2xl'>Email</label><br/>
          <input className='p-1' type="text" /><br/>
          <label htmlFor="Password" className='font-semibold text-2xl' >Password</label><br/>
          <input className='p-1' type="password" /><br/>
          <Link to='/' className=''>Forget Password</Link><br/>
          <button>Login</button>
          <p className=''>Or Contiune With</p>

        </div>
      </div>
    </>
  )
}

export default Login
