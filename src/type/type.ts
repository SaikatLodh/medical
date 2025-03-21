type Doctor = {
  id: string;
  created_at?: string;
  photo: string;
  name: string;
  email?: string;
  speciality: string;
  education: string;
  experience: string;
  addressone: string;
  addresstwo: string;
  fees: string;
  description: string;
  adminid?: string;
  password?: string;
};

type User = {
  id: string;
  created_at?: string;
  fullname: string;
  email?: string;
  role: string;
  phone: string;
  address: string;
  gender: string;
  birthday: string;
  profilepic: string;
  doctorid?: string;
};

type addDoctors = {
  id?: string;
  photo: FileList;
  name: string;
  email: string;
  speciality: string;
  education: string;
  password: string;
  experience: number;
  addressone: string;
  addresstwo?: string | undefined;
  fees: number;
  description: string;
};

type appoinment = {
  id: string;
  created_at: string;
  doctorid?: string;
  userid: string;
  date: string;
  time: string;
  status: string;
  cancellation: boolean;
  doctor: {
    id: string;
    name: string;
    speciality: string;
    photo: string;
    addressone: string;
    addresstwo: string;
    fees: number;
  };
};

type patients = {
  user: {
    id: string;
    created_at: string;
    email: string;
    phone: number;
    gender: string;
    birthday: string;
    fullname: string;
    profilepic: string;
  };
};

type getallAppoinment = {
  id: string;
  created_at: string;
  date: string;
  time: string;
  status: string;
  cancellation: boolean;
  user: {
    id: string;
    created_at: string;
    email: string;
    phone: number;
    gender: string;
    birthday: string;
    fullname: string;
    profilepic: string;
  };
};

type getallAppoinmentForAdmin = {
  id: string;
  created_at: string;
  date: string;
  time: string;
  status: string;
  cancellation: boolean;
  user: {
    id: string;
    created_at: string;
    email: string;
    phone: number;
    gender: string;
    birthday: string;
    fullname: string;
    profilepic: string;
  };
  doctor: {
    id: string;
    created_at: string;
    photo: string;
    name: string;
    email: string;
    speciality: string;
    education: number;
    experience: number;
    addressone: string;
    addresstwo: string;
    fees: number;
  };
};

type getalldoctorreport = {
  id: string;
  created_at: string;
  doctorid: string;
  userid: string;
  image: string;
};

type getpatainsreport = {
  id: string;
  created_at: string;
  doctorid: string;
  userid: string;
  image: string;
  user: {
    id: string;
    created_at: string;
    email: string;
    phone: number;
    gender: string;
    birthday: string;
    fullname: string;
    profilepic: string;
  };
};

type responseType = {
  success: boolean;
  message: string;
  status: number;
};

type responseTypeForPatients = {
  success: boolean;
  message: [];
  status: number;
};

export type {
  Doctor,
  User,
  addDoctors,
  appoinment,
  patients,
  getallAppoinment,
  getpatainsreport,
  responseType,
  responseTypeForPatients,
  getallAppoinmentForAdmin,
  getalldoctorreport,
};
