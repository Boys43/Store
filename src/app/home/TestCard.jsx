'use client'

import { Container, Row, Col, Button, Card } from 'react-bootstrap'
import Link from 'next/link'

export default function WeeklyPromotion({ e }) {
  console.log(e);

  return (
    <Container as="section" className="py-5">
      {/* Section Header */}
      <Card className="h-100 border-0 shadow-sm" >
        <div className="position-relative">
            <Card.Img
              variant="top"
              src={e.image_url}
              className="rounded-5"
              style={{ height: '170px',  objectFit: 'cover' }}
            />

          {/* Sale Badge */}
          <span className="badge bg-danger position-absolute top-0 start-0 m-2">
            {Math.round(((e.original_price - e.price) / e.original_price) * 100)}% OFF
          </span>


          {/* Wishlist Button */}
          <Button variant="light" size="sm" className="rounded-circle position-absolute bottom-0 end-0 m-2">
            <i className="bi bi-heart"></i>
          </Button>
        </div>

        <Card.Body className="p-2">
          <h6 className="mb-1 text-truncate">{e?.name}</h6>
          <div>
            <span className="fw-bold text-dark">{e.price_formatted}</span>{' '}
            <small className="text-muted text-decoration-line-through">{e.original_price_formatted}</small>
          </div>
        </Card.Body>
      </Card>
    </Container>
  )
}
