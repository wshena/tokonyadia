import { supabase } from "./supabaseClient";

interface UserProps {
  email:string;
  username:string;
  firstName:string;
  lastName:string;
  sex:string;
  address:string;
  phoneNumber:string;
  date:any;
}

export const createUser = async (id:string, {email, username, firstName, lastName, sex, address, phoneNumber, date}:UserProps) => {
  const {data, error} = await supabase.from('profiles').insert({
    id: id,
    email: email,
    firstName: firstName,
    lastName: lastName,
    username: username,
    address: address,
    phoneNumber: phoneNumber,
    sex: sex,
    date: date,
    created_at: new Date().toISOString(),
  })

  if (error) {
    console.error('Error creating profile:', error);
  } else {
    console.log('Profile created:', data);
  }
}

export const findUser = async (id: string) => {
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', id);

  if (error) {
    console.error('Error fetching profile:', error);
  } else {
    return data
  }
}
