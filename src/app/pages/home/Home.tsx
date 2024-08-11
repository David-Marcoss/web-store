import "./home.css"
import { useContext, useEffect, useState } from "react";
import { UserLoggedContext } from "../../shared/contexts";
import { useNavigate } from "react-router-dom";
import { Header } from "../../shared/components/Header";
import { IProducts, ProductsService } from "../../shared/services/api/products/ProductService";
import { Link } from "react-router-dom";
import { ProductsList } from "../products/ProductList";

export const Home = () => {
    const [products, setProducts] = useState<IProducts[]>([]);
    const userLogged = useContext(UserLoggedContext);
    const navigate = useNavigate();

    useEffect(() => {
        if (userLogged.isAuthenticated && userLogged.token) {
            const productService = new ProductsService(userLogged.token);

            productService.getAll().then((res) => {

                console.log(res)

                if (res.success && res.data && ('products' in res.data)) {
                    
                    res.data.products.forEach( e => console.log(e))
                    
                    setProducts(res.data.products);
                }
            });
        }else{
            navigate("/login")
        }
    }, [navigate, userLogged.isAuthenticated, userLogged.token]); // Array de dependências

    return (
        <div className="home">            
            <div className="products-dashboard">
                <div className="header"> 
                    <h2>Produtos</h2>
                    <Link to={"/products/create"}> Cadastrar Produto</Link>
                </div>

                <div className="body">

                    <ProductsList/>

                </div>
            </div>
        </div>
    );
};
