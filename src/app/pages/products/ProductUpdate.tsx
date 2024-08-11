import { useCallback, useContext, useEffect } from "react";
import { ProductForm } from "./components/ProductForm";
import "./products.css";
import { IProducts, ProductsService } from "../../shared/services/api/products/ProductService";
import { UserLoggedContext } from "../../shared/contexts";
import { useNavigate } from "react-router-dom";

interface IProductUpdateProp {
    productId: number;
}


export const ProductUpdate = ({ productId }: IProductUpdateProp) => {
    const { token, isAuthenticated } = useContext(UserLoggedContext);
    const navigate = useNavigate();
  
    useEffect(() => {
        if (!isAuthenticated) {
            navigate("/login")
        }
    }, [navigate, isAuthenticated]); // Array de dependências


    const handleUpdateProduct = useCallback(
        async (data: IProducts) => {
            if (token) {
                try {
                    const productService = new ProductsService(token);

                    delete data.id
                    
                    const response = await productService.updateById(productId, data);

                    if (!response) {
                        navigate("/");
                    } else {
                        console.error("Failed to update product:", response.message);
                    }
                } catch (error) {
                    console.error("Error updating product:", error);
                }
            }
        },
        [token, navigate]
    );

    return (
        <div className="products">
            <div className="products-form">
                <div className="header">
                    <h1>Editar Produto</h1>
                </div>
                <div className="body">
                    <ProductForm onSubmit={handleUpdateProduct} productId={productId} />
                </div>
            </div>
        </div>
    );
};
