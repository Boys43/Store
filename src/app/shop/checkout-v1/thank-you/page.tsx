'use client'

import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { Suspense } from 'react'
import HeaderElectronics from '@/components/layout/header-electronics'
import CouponCheckout_V1 from './coupon'
import RelatedProductsCheckout_V1 from './related-products'
import FooterElectronics from '@/components/layout/footer-electronics'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Nav from 'react-bootstrap/Nav'
import NavLink from 'react-bootstrap/NavLink'

const ThankYouContent = () => {
  const searchParams = useSearchParams()
  const orderId = searchParams.get('order_id')
  const token = searchParams.get('token')

  return (
    <div className="w-100 pt-sm-2 pt-md-3 pt-lg-4 pb-lg-4 pb-xl-5 px-3 px-sm-4 pe-lg-0 ps-lg-5 mx-auto ms-lg-auto me-lg-4">
      <div className="d-flex align-items-sm-center border-bottom pb-4 pb-md-5">
        <div
          className="d-flex align-items-center justify-content-center bg-success text-white rounded-circle flex-shrink-0"
          style={{ width: '3rem', height: '3rem', marginTop: '-.125rem' }}
        >
          <i className="ci-check fs-4" />
        </div>
        <div className="w-100 ps-3">
          <div className="fs-sm mb-1">Order completed successfully!</div>
          <div className="d-sm-flex align-items-center">
            <h1 className="h4 mb-0 me-3">Thank you for your order!</h1>
            <Nav className="mt-2 mt-sm-0 ms-auto">
              <NavLink as={Link} href="/account/orders" className="text-decoration-underline p-0">
                View orders
              </NavLink>
            </Nav>
          </div>
        </div>
      </div>
      <div className="d-flex flex-column gap-4 pt-3 pb-5 mt-3">
        {orderId && (
          <div>
            <h3 className="h6 mb-2">Order Information</h3>
            <p className="fs-sm mb-0">Order ID: <strong>{orderId}</strong></p>
            {token && (
              <p className="fs-sm mb-0">Order Token: <strong>{token}</strong></p>
            )}
          </div>
        )}
        <div>
          <h3 className="h6 mb-2">What's next?</h3>
          <p className="fs-sm mb-0">You will receive an email confirmation with your order details and tracking information.</p>
        </div>
        <div>
          <h3 className="h6 mb-2">Need help?</h3>
          <p className="fs-sm mb-0">Contact our customer support if you have any questions about your order.</p>
        </div>
      </div>
      <CouponCheckout_V1 couponCode="WELCOME10" />
    </div>
  )
}

const Checkout_V1_ThankYouPage = () => (
  <>
    {/* Navigation bar (Page header) */}
    <HeaderElectronics />

    {/* Page content */}
    <main className="content-wrapper">
      {/* Viewed products (Carousel) */}
      <Row xs={1} lg={2} className="g-0 mx-auto" style={{ maxWidth: 1920 }}>
        {/* Thank you content column */}
        <Col className="d-flex flex-column justify-content-center py-5 px-xl-4 px-xxl-5">
          <Suspense>
            <ThankYouContent />
          </Suspense>
        </Col>

        {/* Related products */}
        <Col className="pt-sm-3 p-md-5 ps-lg-5 py-lg-4 pe-lg-4 p-xxl-5">
          <RelatedProductsCheckout_V1 />
        </Col>
      </Row>
    </main>

    {/* Page footer */}
    <FooterElectronics className="border-top" />
  </>
)

export default Checkout_V1_ThankYouPage
