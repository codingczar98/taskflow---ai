/**
 * @copyright 2025 codingczar
 * @license Apache-2.0
 * @description Login page for the app
 */

/**
 * Node Modules
 */
import { SignIn } from '@clerk/clerk-react';

/**
 * Components
 */
import Head from '@/components/Head';

const LoginPage = () => {
    return (
        <>
          <Head
            title='Log In to TaskFlow AI - Manage Your To-Do List and
          Projects'
          />
    
          <section className=''>
            <div className='container flex justify-center'>
              <SignIn signUpUrl='/register' />
            </div>
          </section>
        </>
      );
}

export default LoginPage