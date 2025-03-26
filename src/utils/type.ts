
export type  createUserParam = 

{
  name:string;
  email?: string;
  major:string;
  password: string;
  role:string
  shift:string
  contact_info:string,
  roomID:number,
  doctorID:number
};

export type updateUserParam = {
  email: string;
  password: string;
  
};
