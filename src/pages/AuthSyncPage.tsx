/**
 * @copyright 2025 codingczar
 * @license Apache-2.0
 * @description Authsync page for the app
 */

/**
 * Node Modules
 */
import { useNavigate } from 'react-router';
import { useEffect } from 'react';
import { useAuth } from '@clerk/clerk-react';

const AuthSyncPage = () => {
  const navigate = useNavigate();
  const { isSignedIn, isLoaded, userId } = useAuth();

  useEffect(() => {
    if (!isLoaded) return;

    // Redirect to home page when user is not signed in
    if (!isSignedIn) {
      //Handled this case cause the user is signed out
      if (localStorage.getItem('clerkUserId')) {
        localStorage.removeItem('clerkUserId');
      }
      navigate('/');
      return;
    }

    //Set the userId in local storage and redirect to the todayPage when user is signed in
    if (isSignedIn) {
      localStorage.setItem('clerkUserId', userId);
      navigate('/app/today');
    }
  }, [userId, isSignedIn, isLoaded]);

  return <></>
};

export default AuthSyncPage;
