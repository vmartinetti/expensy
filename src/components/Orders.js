import * as React from 'react';
import Link from '@mui/material/Link';
import { Link as RouterLink } from 'react-router-dom';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Title from './Title';
import { getOrders } from '../services/orders-service';
import { formatDate } from '../utils/helpers';
import { API_URL } from '../config';
import useFetch from '../hooks/use-fetch';

const Orders = (props) => {
  console.log(props)
  const {more} = props;
  const [orders, setOrders] = React.useState([]);

  const {fetchData: fetchOrders, error, loading}  = useFetch()
  React.useEffect(() => {
    fetchOrders(`${API_URL}/orders`).then((orders) => {
      console.log(orders)
      setOrders(orders)
    })
    console.log("Orders useEffect")
  }, [fetchOrders])

  return (
    <React.Fragment>
      <Title>Recent Orders</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Date</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Ship To</TableCell>
            <TableCell>Payment Method</TableCell>
            <TableCell align="right">Sale Amount</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {!loading ? orders.map((order) => (
            <TableRow key={order.id}>
              <TableCell>{formatDate(order.date)}</TableCell>
              <TableCell>{order.name}</TableCell>
              <TableCell>{order.shipTo}</TableCell>
              <TableCell>{order.paymentMethod}</TableCell>
              <TableCell align="right">{`$${order.amount}`}</TableCell>
            </TableRow>
          )) : 
          <TableRow>
            <TableCell colSpan={5}>Loading...</TableCell>
            </TableRow>}
        </TableBody>
      </Table>
      {more ?
        <Link component={RouterLink} to="/orders" color="primary" sx={{ mt: 3 }}>
          See more orders
        </Link>
      :
      null
      }
    </React.Fragment>
  );
}

export default Orders;