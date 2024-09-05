import { Link } from 'react-router-dom'
function NavBar() {
        return (
            <>
                <div className="flex justify-around p-5 bg-orange-600 sticky top-0">
                    <Link to='/' className="text-3xl font-bold text-white">Meshcraft</Link>
                    <div className='flex gap-10  items-center'>
                        <Link to="/login" className="button">Login</Link>
                        <Link to='/signup' className="button">Sign-up</Link>
                    </div>
                </div>
            </>
        )
    }

export default NavBar
