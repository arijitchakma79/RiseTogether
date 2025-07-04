import supabase from '../supabase/supabaseClient';
import determineRoleFromEmail from '../utils/determine_email_roles';


export const create_user = async (
  email: string,
  password: string,
  fullName: string
) => {
  try {
    const role = determineRoleFromEmail(email);

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          fullName: fullName || '',
          userRole: role
        }
      }
    });

    if (error) throw error;

    return { success: true, data };
  } catch (err: any) {
    console.error('Signup error:', err);
    return { success: false, error: err.message || 'Signup failed' };
  }
};

// login
export const login_user = async (email: string, password: string) => {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    });

    if (error) throw error;
    return { success: true, data };
  } catch (err: any) {
    return { success: false, error: err.message || 'Login failed.' };
  }
};

// Logout
export const logout_user = async () => {
  try {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;

    return { success: true };
  } catch (err: any) {
    return { success: false, error: err.message || 'Logout failed' };
  }
};

// ✅ Update profile (email, password, or metadata)
export const update_user = async (
  email?: string,
  password?: string,
  fullName?: string
) => {
  try {
    const updatePayload: any = {};
    const {
      data: { user }
    } = await supabase.auth.getUser();

    const currentMetadata = user?.user_metadata || {};

    if (email) updatePayload.email = email;
    if (password) updatePayload.password = password;

    if (fullName !== undefined) {
      updatePayload.data = {
        ...currentMetadata,
        fullName
      };
    }

    const { data, error } = await supabase.auth.updateUser(updatePayload);
    if (error) throw error;

    return { success: true, data };
  } catch (err: any) {
    return { success: false, error: err.message || 'Update failed' };
  }
};