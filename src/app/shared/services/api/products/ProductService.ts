import { api } from "../ApiConfig"

export interface IProducts{
    id?: number,
    name: string,
    description?: string,
    price: number,
    stock: number
}

export interface IProductsResponse {
    success: boolean,
    message: string,
    data: {products: IProducts[]} | {product: IProducts} | null
}


export class ProductsService{
    
    authToken:string = ""
    routeName:string = "/api/products"

    constructor(authToken:string){
        this.authToken = authToken
    }


    getAll = async ():Promise<IProductsResponse> => {
        
        try {
            const {data} = await api().get(`${this.routeName}/get-all-products`, {
                headers: {
                    Authorization: `Bearer ${this.authToken}`
                }})

            return data

        } catch (error:any) {
            if(!error.response){
                return {
                    success: false,
                    message: "Falha ao buscar Produtos",
                    data: null
                }
            }
    
            return error.response.data
        }
    }

    getById = async (id:number):Promise<IProductsResponse> => {

        try {
            const {data} = await api().get(`${this.routeName}/get-one-product/${id}`, {
                headers: {
                    Authorization: `Bearer ${this.authToken}`
                }})

        

            return data

        } catch (error:any) {

            if(!error.response){
                return {
                    success: false,
                    message: "Falha ao buscar Produto",
                    data: null
                }
            }
    
            return error.response.data
        }
    }

    create = async (createData:IProducts):Promise<IProductsResponse> => {

        try {
            const {data} = await api().post(`${this.routeName}/create-product`, createData ,{
                headers: {
                    Authorization: `Bearer ${this.authToken}`
                }})

            return data

        } catch (error:any) {
            if(!error.response.data){
                return {
                    success: false,
                    message: "Falha ao criar Produto",
                    data: null
                }
            }
    
            return error.response.data
        }
    }

    updateById =  async (id:number,updateData:IProducts):Promise<undefined | IProductsResponse> => {

        try {
            const {data} = await api().patch(`${this.routeName}/update-product/${id}`, updateData ,{
                headers: {
                    Authorization: `Bearer ${this.authToken}`
                }})

            return undefined

        } catch (error:any) {
            if(!error.response.data){
                return {
                    success: false,
                    message: "Falha ao atualizar Produto",
                    data: null
                }
            }
    
            return error.response.data
        }
    }

    deleteById = async (id:number):Promise<undefined | IProductsResponse> => {

        try {
            await api().delete(`${this.routeName}/delete-product/${id}`, {
                headers: {
                    Authorization: `Bearer ${this.authToken}`
                }})

            return undefined

        } catch (error:any) {
            if(!error.response.data){
                return {
                    success: false,
                    message: "Falha ao deletar Produto",
                    data: null
                }
            }
    
            return error.response.data
        }
    }

}

