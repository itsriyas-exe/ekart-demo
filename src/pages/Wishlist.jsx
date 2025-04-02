
import { Col, Row } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { removeFromWishlist } from '../redux/slice/wishlistSlice';
import { addToCart } from '../redux/slice/cartSlice';


function Wishlist() {
  const dispatch=useDispatch()
  const Wishlist= useSelector(state=>state.wishlistSlice.wishlist)
  const handleCart=(product)=>{
    dispatch(removeFromWishlist(product.id))
    dispatch(addToCart(product))
  }
  return (
    <div>
      <Row className='mt-5 container'>
        {
          Wishlist.length>0?Wishlist.map(product=>(
            <Col className='mt-5'  key={product.id}>
           <Card sm={12} md={6} lg={4} xl={3} style={{ width: '18rem' }}>
               <Link to={`../View/${product.id}`}><Card.Img variant="top" src={product.thumbnail} /></Link>
     
     <Card.Body>
       <Card.Title>{product.title.slice(0,20)}...</Card.Title>
       <Card.Text>
         {product.description}
       </Card.Text>
       <div className='d-flex justify-content-between'>
       <Button className='btn btn-light' onClick={()=>dispatch(removeFromWishlist(product?.id))}><i className="fa-solid fa-trash text-danger"></i>
        </Button>   
       <Button className='btn btn-light' onClick={()=>handleCart(product)}><i className='fa-solid fa-cart-plus text-success '></i>
        </Button>   
       </div>
       
     </Card.Body>
   </Card>
           </Col>
          )): <div className='container mt-5 d-flex align-items-center'>
            <h1 className='text-danger'>Your Wishlist is empty...</h1>
            <img src="" alt="" />
          </div>
           
        }
           
        </Row>
    </div>
      )
}

export default Wishlist
