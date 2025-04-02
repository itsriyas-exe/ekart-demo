import { useEffect, useState } from "react";
import { Button, Spinner } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { addToWishlist } from "../redux/slice/wishlistSlice";
import { addToCart } from "../redux/slice/cartSlice";
function View() {
    const { id } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { loading } = useSelector((state) => state.productSlice);
    const { wishlist } = useSelector(state => state.wishlistSlice);
    
    const [product, setProduct] = useState({});
    const [similarProducts, setSimilarProducts] = useState([]);

    // Fetch product details from API
    useEffect(() => {
        fetch(`https://dummyjson.com/products/${id}`)
            .then(res => res.json())
            .then(data => {
                setProduct(data);
                fetchSimilarProducts(data.category);
            })
            .catch(err => console.error("Error fetching product:", err));
    }, [id]);

    // Fetch similar products based on the product category
    const fetchSimilarProducts = (category) => {
        fetch(`https://dummyjson.com/products/category/${category}`)
            .then(res => res.json())
            .then(data => setSimilarProducts(data.products))
            .catch(err => console.error("Error fetching similar products:", err));
    };

    const handleWishlist = (product) => {
        const existingProduct = wishlist.find(item => item.id == product.id);
        if (existingProduct) {
            alert("Already Exists in Wishlist");
        } else {
            dispatch(addToWishlist(product));
        }
    };

    const handleProductChange = (newProduct) => {
        navigate(`/view/${newProduct.id}`);
        setProduct(newProduct); // Update the displayed product immediately
    };

    return (
        <div className="container mt-5">
            {loading ? (
                <div className='d-flex justify-content-center mt-5'>
                    <Spinner animation="border" variant="info" /> Loading...
                </div>
            ) : (
                <div className="container row" style={{ marginTop: '100px' }}>
                    <div className="col-lg-4">
                        <img style={{ width: '100%', height: '400px' }} src={product?.thumbnail} alt={product?.title} />
                    </div>
                    <div className="col-lg-2"></div>
                    <div className="col-lg-6">
                        <p>Product ID: {product?.id}</p>
                        <h1>{product?.title}</h1>
                        <h5 className="fw-bolder">Price: <span style={{ color: 'red' }}>${product?.price}</span></h5>
                        <p>{product?.description}</p>
                        <div className="d-flex justify-content-between mt-4">
                            <Button className="btn btn-outline-dark" onClick={() => handleWishlist(product)}>
                                <i className="fa-solid fa-heart text-danger"></i> Wishlist
                            </Button>
                            <Button className="btn btn-outline-light" onClick={() => dispatch(addToCart(product))}>
                                <i className="fa-solid fa-cart-shopping text-warning"></i> Cart
                            </Button>
                        </div>
                    </div>
                </div>
            )}

            {/* Similar Products Section */}
            <div className="container mt-5">
                <h3>Similar Products</h3>
                <div className="row">
                    {similarProducts.length > 0 ? (
                        similarProducts.map((item) => (
                            <div key={item.id} className="col-md-3 mb-3" onClick={() => handleProductChange(item)} style={{ cursor: 'pointer' }}>
                                <div className="card">
                                    <img src={item.thumbnail} className="card-img-top" alt={item.title} style={{ height: '200px', objectFit: 'contain' }} />
                                    <div className="card-body">
                                        <h5 className="card-title">{item.title}</h5>
                                        <p className="card-text">${item.price}</p>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p>No similar products found.</p>
                    )}
                </div>
            </div>
        </div>
    );
}

export default View;
