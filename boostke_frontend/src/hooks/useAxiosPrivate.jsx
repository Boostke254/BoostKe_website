import { axiosPrivate } from "../api/axios";
import { useEffect } from "react";
import { useAuth } from "../context/AuthProvider";

const useAxiosPrivate = () => {
    const { login } = useAuth();

    
    const getToken = localStorage.getItem('userToken');  

    useEffect(()=>{    
        //console.log(getToken)
        const requestIntercept = axiosPrivate.interceptors.request.use(
            config=>{
                // if (!config.headers['Authorization'] && accessToken) {
                if (getToken) {
                    config.headers['Authorization'] = `Bearer ${getToken}`;
                }
                return config;
            }, (error)=> Promise.reject(error)
        );

        const responseIntercept = axiosPrivate.interceptors.response.use(
            response => response,
            async (error)=>{
                const prevRequest = error?.config;
                if(error?.response?.status === 403 && !prevRequest?.sent){
                    prevRequest.sent = true;
                    const newAccessToken = await refresh();
                    prevRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
                    return axiosPrivate(prevRequest);
                }
                return Promise.reject(error);
            }
        );

        return ()=>{
            axiosPrivate.interceptors.request.eject(requestIntercept);
            axiosPrivate.interceptors.response.eject(responseIntercept);
        }
    },[login])

    return axiosPrivate;
}

export default useAxiosPrivate;