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
    const {data, error} = await supabase.from(table_name).select().order('created_at', { ascending: false });
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

export const upsert_donation_request = async(table_name:string, request: DonationRequest, uid:string) => {
    const {error} = await supabase.from(table_name).upsert(request).eq('id', uid );

    if (error) {
        throw error
    }
    return {success: true}
}

export const filter_donation_request_by_uid = async(table_name:string, uid: string) => {
    const {data, error} = await supabase.from(table_name).select().eq('created_by', uid).order('created_at', { ascending: false });
    
    if (error) {
        throw error
    }
    
    return {success: true, data}
}

export const filter_donation_requests_by_category = async (
    table_name: string,
    category: string
  ) => {
    const { data, error } = await supabase
      .from(table_name)
      .select()
      .eq('category', category)
      .order('created_at', { ascending: false });
  
    if (error) throw error;
  
    return { success: true, data };
  };

  export const filter_donation_requests_by_date_range = async (
    table_name: string,
    fromDate: string, // ISO format e.g., '2025-01-01'
    toDate: string    // ISO format e.g., '2025-05-01'
  ) => {
    const { data, error } = await supabase
      .from(table_name)
      .select()
      .gte('created_at', fromDate)
      .lte('created_at', toDate)
      .order('created_at', { ascending: false });
  
    if (error) throw error;
  
    return { success: true, data };
  };
  
  export const filter_donation_requests_by_status = async (
    table_name: string,
    status: string
  ) => {
    const { data, error } = await supabase
      .from(table_name)
      .select()
      .eq('status', status)
      .order('created_at', { ascending: false });
  
    if (error) throw error;
  
    return { success: true, data };
  };
  
export const fulfill_donation_request = async (
    table_name: string,
    requestId: number,
    fulfillerId: string
  ) => {
    const { error } = await supabase
      .from(table_name)
      .update({
        status: 'fulfilled',
        fulfilled_by: fulfillerId
      })
      .eq('id', requestId);
  
    if (error) {
      throw error;
    }
  
    return { success: true };
  };