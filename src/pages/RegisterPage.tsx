/**
 * @copyright 2025 codingczar
 * @license Apache-2.0
 * @description Register page for the app
 */

/**
 * Node Modules
 */
import { SignUp } from '@clerk/clerk-react';

/**
 * Components
 */
import Head from '@/components/Head';

const RegisterPage = () => {
  return (
    <>
      <Head
        title='Create an Account - TaskFlow AI To-Do List &
      Project Management App'
      />

      <section className=''>
        <div className='container flex justify-center'>
          <SignUp signInUrl='/login' />
        </div>
      </section>
    </>
  );
};

export default RegisterPage;
