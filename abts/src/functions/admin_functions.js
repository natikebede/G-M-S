import api from "../Apis/api";

// get all cashier and admin 
export const  get_all_users=async()=>
{
    try {
        const response =await api.get("/cashier/All");
        return (response.data);
    } catch (error) {
        alert( error);
    }
}