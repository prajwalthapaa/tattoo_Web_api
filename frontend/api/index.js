import axios from "axios";

const baseUrl = "http://localhost:8000/api/";

export const Api = axios.create({
  baseURL: baseUrl,
  headers: {
    "Content-Type": "application/json",
  },
});

export const ApiFormData = axios.create({
  baseURL: baseUrl,
  headers: {
    "Content-Type": "multipart/form-data",
  },
});

// Helper function to extract token from auth data
const getToken = () => {
  try {
    const authData = JSON.parse(localStorage.getItem("auth"));
    if (authData?.token) {
      // Remove extra quotes from token if present
      return authData.token.replace(/^"|"$/g, "");
    }
    return null;
  } catch {
    return null;
  }
};

// Add token to requests
Api.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add token to form-data requests
ApiFormData.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const userRegister = async (data) => {
  const response = await Api.post("/user/register", data);
  return response.data;
};

export const userLogin = async (data) => {
  const response = await Api.post("/user/login", data);
  return response.data;
};

export const createTattoo = async (data) => {
  const response = await ApiFormData.post("tattoo/create-tattoo", data);
  return response.data;
};

export const getTattoos = async () => {
  const response = await Api.get("/tattoo");
  return response.data;
};

export const getATattoo = async (tattooId) => {
  const response = await Api.get(`/tattoo/single/${tattooId}`);
  return response.data;
};

//booking
export const bookTattoo = async (data, hotelId) => {
  const response = await Api.post("/booking/book-tattoo", data, hotelId);
  return response.data;
};

export const getUserBookings = async () => {
  const response = await Api.get("/booking");
  return response.data;
};

export const cancelBooking = async (bookingId, tattooId) => {
  const response = await Api.patch(`/booking/book-cancel/${bookingId}`, {
    tattooId,
  });
  return response.data;
};

export const deleteTattoo = async (tattooId) => {
  const response = await Api.delete(`/tattoo/${tattooId}`);
  return response.data;
};

export const userProfile = async (userId) => {
  const response = await Api.get(`/user/profile/${userId}`);
  return response.data;
};

export const updateProfileData = async (data,userId) => {
  const response = await ApiFormData.put(`/user/profile/edit/${userId}`,data);
  return response.data;
};
