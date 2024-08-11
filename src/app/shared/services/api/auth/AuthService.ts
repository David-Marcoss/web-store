import { api } from "../ApiConfig"

export interface IAuthRegister {
    name: string,
    taxNumber: string,
    mail: string,
    phone: string,
    password: string
}

export interface IAuthLogin {
    taxNumber: string,
    password: string
}

export interface IAuthResponse {
    success: boolean,
    message: string,
    data: {token: string} | null
}


const routeName = "/api/auth"


const register = async (userData:IAuthRegister):Promise<IAuthResponse> => {

    try {

        const {data} = await api().post(`${routeName}/register`, userData);

        return data

    } catch (error:any) {

        if(!error.response.data){
            return {
                success: false,
                message: "Falha ao cadastrar usuario",
                data: null
            }
        }

        return error.response.data
    }
}

const login = async (userData:IAuthLogin):Promise<IAuthResponse> => {

    try {
        const {data} = await api().post(`${routeName}/login`, userData);

        return data

    } catch (error:any) {

        if(!error.response.data){
            return {
                success: false,
                message: "Erro no Login",
                data: null
            }
        }

        return error.response.data
    }
}


export const AuthService = {
    register,
    login
}
