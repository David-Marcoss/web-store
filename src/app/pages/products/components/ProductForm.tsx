import React, { useContext, useEffect, useState } from "react";
import { IProducts, ProductsService } from "../../../shared/services/api/products/ProductService";
import { UserLoggedContext } from "../../../shared/contexts";

interface ProductFormProps {
    productId?: number
    onSubmit: (product:IProducts) => void;
}

export const ProductForm: React.FC<ProductFormProps> = (props) => {
    const [product, setProduct] = useState<Omit<IProducts, "id">>({
        name: "",
        description: "",
        price: 1,
        stock: 1
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setProduct({
            ...product,
            [name]: name === "price" || name === "stock" ? Number(value) : value,
        });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if(product.name && product.price && product.stock){
            console.log(product)
            props.onSubmit(product);
        }
    };

    const userLogged = useContext(UserLoggedContext);

    useEffect(() => {
        if (props.productId && userLogged.token) {

            const productService = new ProductsService(userLogged.token);

            productService.getById(props.productId).then((res) => {

                if (res.success && res.data && ('product' in res.data)) {
                    setProduct(res.data.product)     
                }
            });
        }

    },[props, userLogged.token])

    return (
        <form onSubmit={handleSubmit} className="product-form">
            <div>
                <label htmlFor="name">Nome</label>
                <input
                    type="text"
                    name="name"
                    id="name"
                    value={product.name}
                    onChange={handleChange}
                    required
                />
            </div>

            <div>
                <label htmlFor="description">Descrição</label>
                <textarea
                    name="description"
                    id="description"
                    value={product.description}
                    onChange={handleChange}

                />
            </div>

            <div>
                <label htmlFor="price">Preço</label>
                <input
                    type="number"
                    name="price"
                    id="price"
                    value={product.price}
                    onChange={handleChange}
                    required
                />
            </div>

            <div>
                <label htmlFor="stock">Estoque</label>
                <input
                    type="number"
                    name="stock"
                    id="stock"
                    value={product.stock}
                    onChange={handleChange}
                    required
                    min="1"
                />
            </div>

            <button type="submit">Salvar</button>
        </form>
    );
};
