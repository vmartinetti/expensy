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
import useFetch from '../hooks/use-fetch';
import { gql, useQuery } from '@apollo/client'

const Orders = (props) => {
  console.log(props)
  const {more} = props;
  const [orders, setOrders] = React.useState([]);

  const GET_EXPENSES = gql`{
    expenses {
            id
            concept
            amount
            createdAt
            createdBy
          }
  }`;

  const { loading, error, data } = useQuery(GET_EXPENSES);
  if (loading) return 'Loading';
  if (error) return `Error ${error.message}`;
  console.log('data', data)
  const expenses = data.expenses;

  return (
    <React.Fragment>
      <Title>Recent expenses</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Date</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Ship To</TableCell>
            <TableCell align="right"> Amount</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {!loading ? expenses.map((expense) => (
            <TableRow key={expense.id}>
              <TableCell>{formatDate(expense.createdAt)}</TableCell>
              <TableCell>{expense.concept}</TableCell>
              <TableCell>{expense.createdBy}</TableCell>
              <TableCell align="right">{`$${expense.amount}`}</TableCell>
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