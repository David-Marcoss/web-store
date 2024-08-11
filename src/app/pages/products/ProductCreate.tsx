import { useCallback, useContext, useEffect } from "react"
import { ProductForm } from "./components/ProductForm"
import "./products.css"
import { IProducts, ProductsService } from "../../shared/services/api/products/ProductService"
import { UserLoggedContext } from "../../shared/contexts"
import { useNavigate } from "react-router-dom"

export const ProductCreate = () => {

    const userLogged = useContext(UserLoggedContext);
    const navigate = useNavigate()

    useEffect(() => {
        if (!userLogged.isAuthenticated) {
            navigate("/login")
        }
    }, [navigate, userLogged.isAuthenticated]); // Array de dependências


    const createProduct = useCallback( (data:Omit<IProducts, "id">) => {
        
        if(userLogged.token) {

            const productService = new ProductsService(userLogged.token);

            productService.create(data).then( res => {
                if(res.success){
                    navigate("/")
                }
            })

        }
        
    },[])

    return (
        <div className="products">

            <div className="products-form">
                <div className="header">
                    <h1>Cadastar Produto</h1>
                </div>

                <div className="body">
                    <ProductForm onSubmit={createProduct}/>
                </div>
            </div>
        </div>
    )
}