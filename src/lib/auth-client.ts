import { createServerFn } from '@tanstack/react-start/server';
import { auth } from './auth.server';
import { getWebRequest } from '@tanstack/react-start';

type SignUpInput = {
  email: string;
  password: string;
  name: string;
};

type SignInInput = {
  email: string;
  password: string;
};

export const getSession = createServerFn({ method: 'GET' })(async () => {
  try {
    const request = getWebRequest();
    const session = await auth.api.getSession({
      headers: request.headers,
    });
    return session;
  } catch (error) {
    console.error('Session error:', error);
    return null;
  }
});

export const signUp = createServerFn({ method: 'POST' })(async (data: SignUpInput) => {
  try {
    const request = getWebRequest();

    const response = await auth.api.signUpEmail({
      email: data.email,
      password: data.password,
      name: data.name,
      callbackURL: '/dashboard',
      headers: request.headers,
    });

    // Role (operator / partner / client) is assigned when the profile is created
    // in ensureProfile — first account becomes operator, invited emails become
    // partners, everyone else starts as client.
    return {
      success: true,
      user: response,
      message: 'Account created successfully. Welcome to Virellion.',
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Sign up failed',
    };
  }
});

export const signIn = createServerFn({ method: 'POST' })(async (data: SignInInput) => {
  try {
    const request = getWebRequest();
    
    const response = await auth.api.signInEmail({
      email: data.email,
      password: data.password,
      callbackURL: '/dashboard',
      headers: request.headers,
    });

    return { 
      success: true, 
      user: response,
      message: 'Signed in successfully'
    };
  } catch (error) {
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Sign in failed'
    };
  }
});

export const signOut = createServerFn({ method: 'POST' })(async () => {
  try {
    const request = getWebRequest();
    
    await auth.api.signOut({
      headers: request.headers,
    });

    return { success: true };
  } catch (error) {
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Sign out failed'
    };
  }
});
