
import { MDBFooter, MDBContainer, MDBRow, MDBCol, MDBIcon } from 'mdb-react-ui-kit';

function Footer() {
  return (
    <div>
       <MDBFooter  className='text-center bg-warning text-lg-start text-dark'>
      <section className=''>
        <MDBContainer className='text-center text-md-start mt-5'>
          <MDBRow className='mt-3'>
            <MDBCol md="3" lg="4" xl="3" className='mx-auto mt-3 mb-4'>
              <h6 className='text-uppercase fw-bold mb-4'>
              <i className='fa-solid fa-truck-fast fa-bounce'></i>
               <span> </span> E-Cart
              </h6>
              <p>
                Here you can use rows and columns to organize your footer content. Lorem ipsum dolor sit amet,
                consectetur adipisicing elit.
              </p>
            </MDBCol>

            <MDBCol md="2" lg="2" xl="2" className='mx-auto mt-3 mb-4'>
              <h6 className='text-uppercase fw-bold mb-4'>Links</h6>
              <p>
                <a href='#!' className='text-reset'>
                  Linking Page
                </a>
              </p>
              <p>
                <a href='#!' className='text-reset'>
                  Home Page
                </a>
              </p>
              <p>
                <a href='#!' className='text-reset'>
                  Watch History
                </a>
              </p>
              
            </MDBCol>

            <MDBCol md="3" lg="2" xl="2" className='mx-auto mt-3 mb-4'>
              <h6 className='text-uppercase fw-bold mb-4'>Guides</h6>
              <p>
                <a href='#!' className='text-reset'>
                  React
                </a>
              </p>
              <p>
                <a href='#!' className='text-reset'>
                  React Bootstrap
                </a>
              </p>
              <p>
                <a href='#!' className='text-reset'>
                  Bootswatch
                </a>
              </p>
              
            </MDBCol>

            <MDBCol md="4" lg='3' xl="4" className='mx-auto mb-md-0 mt-3 mb-4'>
              <h6 className='text-uppercase fw-bold mb-4'>Contact Us</h6>
              <div className='d-flex'><input className='border-0 form-control w-50' type='text' placeholder='enter your email' />
              <button className='btn btn-danger ms-2'>subscribe</button></div> 
            <p><div className='mt-3'>
          <a href='' className='me-4 text-reset'>
            <MDBIcon fab icon="facebook-f" />
          </a>
          <a href='' className='me-4 text-reset'>
            <MDBIcon fab icon="twitter" />
          </a>

          <a href='' className='me-4 text-reset'>
            <MDBIcon fab icon="instagram" />
          </a>
          <a href='' className='me-4 text-reset'>
            <MDBIcon fab icon="linkedin" />
          </a>
          
        </div></p>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      </section>

      <div className='text-center p-4' style={{ backgroundColor: 'rgba(0, 0, 0, 0.05)' }}>
itsriyas
        © 2025 Copyright E-Cart. Build with react
       
      </div>
    </MDBFooter>
    </div>
  )
}

export default Footer
