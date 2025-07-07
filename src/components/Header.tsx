/**
 * @copyright 2025 codingczar
 * @license Apache-2.0
 * @description Header component for the app
 */

/**
 * Node modules
 */
import { Link, useLocation } from 'react-router';

/**
 * Components
 */
import Logo from '@/components/Logo';
import { Button } from '@/components/ui/button';

const Header = () => {
  const location = useLocation();
  return (
    <header className='fixed z-40 top-1 left-0 w-full'>
      <div className='container h-16 border backdrop-blur-3xl rounded-xl flex justify-between items-center'>
        <Link to='/'>
          <Logo />
        </Link>

        <div className='flex items-center gap-2'>
          {location.pathname !== '/login' && (
            <Button
              asChild
              variant='ghost'
            >
              <Link to='/login'> Sign in</Link>
            </Button>
          )}
          {location.pathname !== '/register' && (
            <Button asChild>
              <Link to='/register'>Start for free</Link>
            </Button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
