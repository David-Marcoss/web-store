import { useState, useEffect, useContext } from 'react';
import { IProducts, ProductsService } from '../../shared/services/api/products/ProductService';
import { UserLoggedContext } from '../../shared/contexts';
import { CardProduct } from './components/CardProduct';


export const ProductsList = () => {
    const [products, setProducts] = useState<IProducts[]>([]);
    const userLogged = useContext(UserLoggedContext);

    useEffect(() => {
        if (userLogged.isAuthenticated && userLogged.token) {
            const productService = new ProductsService(userLogged.token);

            productService.getAll().then((res) => {
                console.log(res);

                if (res.success && res.data && 'products' in res.data) {
                    res.data.products.forEach((e) => console.log(e));
                    setProducts(res.data.products);
                }
            });
        }
    }, [userLogged.isAuthenticated, userLogged.token]); // Array de dependências

    return (
        <div className='product-list'>
            {
                products.length > 0 ? products.map((product) => (
                    <CardProduct product={product} key={product.id}/>
                )) : <div className='Info'> 
                        <h2>Não há produtos cadastrados :(</h2>
                    </div>
            }
        </div>
    );
};
