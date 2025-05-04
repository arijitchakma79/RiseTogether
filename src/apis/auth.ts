import supabase from '../supabase/supabaseClient';


export const create_user = async(email:string, password: string, fullname: string, userRole: string) => {
    try {
        const {data, error} = await supabase.auth.signUp({
            email: email,
            password: password,
            options: {
                data: {
                    fullName: fullname || '',
                    userRole: userRole || 'user'
                }
            }
        });

        if (error) throw error;

        return {success: true, data};
    } catch (err: any) {
        console.error('Signup error:', err);
        return {success: false, error: err.message || 'Signup failed'};
    }
};

export const login_user = async(email: string, password: string) => {
    try {
        const {data, error} = await supabase.auth.signInWithPassword({
            email: email,
            password: password
        });

        if (error) throw error;
        return {success: true, data};
    } catch (err: any) {
        return {success: false, error: err.message || 'Login failed.'};
    }
}


export const logout_user = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
  
      return { success: true };
    } catch (err: any) {
      return { success: false, error: err.message || 'Logout failed' };
    }
  };