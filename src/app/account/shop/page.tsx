import type { Metadata } from 'next'
import AccountOrders from './orders-fixed'

export const metadata: Metadata = {
  title: 'Cartzilla | Account - Orders History',
}

const ShopAccountOrdersPage = () => <AccountOrders />

export default ShopAccountOrdersPage
