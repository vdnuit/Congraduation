import axios from "axios";

export const authenticate = async () => {
    const result = await axios.get("/api/user/auth");
    if (result.data.authenticated) {
        return result.data.authenticated
    } return false
};

export const logout = async () => {
    const result = await axios.get("/api/user/logout");
    if (result.data.success) {
        return true
    }  return false
};

export const getUser = async () => {
    const result = await axios.get("/api/user/auth");
    return result?.data.name
}