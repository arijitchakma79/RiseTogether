import supabase from '../supabase/supabaseClient';

type DonationRequest = {
    title: string;
    description?: string;
    category?: string;
    image_url?: string;
    contact_number: string;
    contact_email?: string;
    created_by: string; 
  };

export const get_all_donation_request = async(table_name : string) =>  {
    const {data, error} = await supabase.from(table_name).select()
    if (error) 
        throw error;
    
    return {success: true, data};
}

export const add_donation_request = async(table_name:string, request: DonationRequest) => {
    const {error} = await supabase.from(table_name).insert(request);

    if (error) {
        throw error;
    }

    return {success: true}
}