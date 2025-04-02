
import { Col, Row, Spinner } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchProductData } from '../redux/slice/productSlice';
import { useEffect } from 'react';
import { addToWishlist } from '../redux/slice/wishlistSlice';
import { addToCart } from '../redux/slice/cartSlice';

function Home() {

const dispatch=useDispatch()
const {loading,error,products}= useSelector((state)=>state.productSlice)
const {wishlist}=useSelector(state=>state.wishlistSlice)
const cart= useSelector(state=>state.cartReducer)


// console.log(loading);
// console.log(error);
// console.log(products);

useEffect(()=>{
  dispatch(fetchProductData())
},[])

const handleWishlist=(product)=>{
  const existingProduct = wishlist.find(item=>item.id==product.id)
  if(existingProduct){
    alert("Already Exist")
  }else{
    dispatch(addToWishlist(product))
  }
}

  return (
    <div style={{marginTop:"90px"}}>
      {loading?<div className='d-flex justify-content-center align-content-center mt-5'>
      <Spinner animation="border" variant="info" />Loading...
      </div>
        :<Row className='mt-5 container-fluid'>
          { products.length>0 && products.map((product,index)=>(
           <Col key={index} className='mt-5' sm={12} md={6} lg={4} xl={3}>
            <Card className='ms-5' style={{ width: '18rem' }}>
                <Link to={`./View/${product.id}`}><Card.Img variant="top" src={product.thumbnail} /></Link>
      
      <Card.Body>
        <Card.Title>{product.title.slice(0,20)}</Card.Title>
        <p>{product.description.slice(0,100)}</p>
        <p className='text-success'>{product.price}</p>
        <div className='d-flex justify-content-between'>
        <Button className='btn btn-light' onClick={()=>handleWishlist(product)}><i className='fa-solid fa-heart text-danger '></i>
         </Button>   
        <Button className='btn btn-light' onClick={()=>dispatch(addToCart(product))}><i className='fa-solid fa-cart-shopping text-warning '></i>
         </Button>   
        </div>
        
      </Card.Body>
    </Card>
            </Col>
        ))}
        </Row>
} 
    </div>
  )
}

export default Home
