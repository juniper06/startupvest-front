import React, { useState, useEffect } from 'react';
import { Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button, Typography, Pagination, Avatar
} from '@mui/material';

import { tableStyles } from '../styles/tables';
import axios from 'axios';
import { CakeOutlined } from '@mui/icons-material';

function PendingRequestInvestor() {
  const [pendingRequests, setPendingRequests] = useState([]);
 


  useEffect(() => {
    const fetchPendingRequests = async () => {
      const userId = localStorage.getItem('userId');
      console.log("userID",userId);
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/cap-table-investor/all?userId=${userId}`);
        setPendingRequests(response.data);
      } catch (error) {
        console.error('Error fetching pending requests:', error);
      }
    };
    fetchPendingRequests();
  }, []);

  const handleAccept = async (capTableInvestorId) => {
    try {
      await axios.put(`${process.env.REACT_APP_API_URL}/funding-rounds/${capTableInvestorId}/status`, { status: 'accepted' });
      // Optionally refetch pending requests or update state to remove the accepted request
      setPendingRequests(prevRequests => prevRequests.filter(request => request.capTableInvestorId !== capTableInvestorId));
    } catch (error) {
      console.error('Error accepting request:', error);
    }
  };

  const handleReject = async (capTableInvestorId) => {
    console.log('Canceling request:', { capTableInvestorId, status: 'rejected' });
    try {
      await axios.put(`${process.env.REACT_APP_API_URL}/funding-rounds/${capTableInvestorId}/status`, { status: 'rejected' });
      // Optionally refetch pending requests or update state to remove the rejected request
      setPendingRequests(prevRequests => prevRequests.filter(request => request.capTableInvestorId !== capTableInvestorId));
    } catch (error) {
      console.error('Error rejecting request:', error);
    }
  };

  return (
    <Box component="main" sx={{ display: 'flex', flexDirection: 'column' }}>
      <TableContainer sx={tableStyles.container}>
        <Table>
          <TableHead sx={tableStyles.head}>
            <TableRow>
              <TableCell sx={{ ...tableStyles.cell }}>
                <Typography sx={tableStyles.typography}>Date</Typography>
              </TableCell>
              <TableCell>
                <Typography sx={{ fontWeight: 'bold', color: 'white', ml: 5 }}>Company Name</Typography>
              </TableCell>
              <TableCell sx={{ ...tableStyles.cell }}>
                <Typography sx={tableStyles.typography}>Email</Typography>
              </TableCell>
              <TableCell sx={{ ...tableStyles.cell}}>
                <Typography sx={tableStyles.typography}>Investor</Typography>
              </TableCell>
              <TableCell sx={{ ...tableStyles.cell }}>
                <Typography sx={tableStyles.typography}>Shares</Typography>
              </TableCell>
              <TableCell sx={{ ...tableStyles.cell}}>
                <Typography sx={tableStyles.typography}>Action</Typography>
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {pendingRequests.length > 0 ? (
              pendingRequests.map((request) => (
                <TableRow key={request.capTableInvestorId} sx={{ backgroundColor: 'white' }}>
                  <TableCell sx={tableStyles.cell}>{new Date(request.createdAt).toLocaleDateString()}</TableCell>
                  <TableCell sx={{ ...tableStyles.cell, width: '20%' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start', ml: 5 }}>
                      <Avatar sx={{ mr: 2, border: '2px rgba(0, 116, 144, 1) solid', borderRadius: 1 }} variant='square' />
                      {request.startupName}
                    </Box>
                  </TableCell>
                  <TableCell sx={tableStyles.cell}>{request.email}</TableCell>
                  <TableCell sx={tableStyles.cell}>{request.investorName}</TableCell>
                  <TableCell sx={tableStyles.cell}>{request.shares}</TableCell>
                  <TableCell sx={tableStyles.cell}>
                    <Button variant="contained" sx={tableStyles.acceptButton} onClick={() => handleAccept(request.capTableInvestorId)}>
                      Accept
                    </Button>
                    <Button variant="text" sx={tableStyles.rejectButton} onClick={() => handleReject(request.capTableInvestorId)}>
                      Reject
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} sx={{ textAlign: 'center' }}>
                  <Typography>No pending requests found</Typography>
                </TableCell>
              </TableRow>
            )}
          </TableBody>

        </Table>

        {/* <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: 2, background: 'white' }}>
          <Pagination count={totalPageCount} page={page} onChange={handleChangePage} size="medium" />
        </Box> */}

      </TableContainer>
    </Box>
  );
}

export default PendingRequestInvestor;
