import React, { useState, useEffect } from 'react';
import { Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button, Typography, Avatar } from '@mui/material';
import axios from 'axios';
import { tableStyles } from '../styles/tables';

function InvestorRequest() { 
  const [pendingRequests, setPendingRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [profilePictures, setProfilePictures] = useState({});

  useEffect(() => {
    const fetchPendingRequests = async () => {
      const investorId = localStorage.getItem('userId');
      if (!investorId) {
        setError('No investor ID found in local storage');
        setLoading(false);
        return;
      }
      
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/cap-table-investor/investor-requests/${investorId}`);
        console.log('API Response:', response.data);

        if (response.data.length === 0) {
          setError('No pending requests found');
        } else {
          setPendingRequests(response.data);
          fetchAllProfilePictures(response.data);
        }

        setLoading(false);
      } catch (error) {
        console.error('Error fetching pending requests:', error);
        setError('Failed to fetch pending requests');
        setLoading(false);
      }
    };

    fetchPendingRequests();
  }, []);

  const fetchAllProfilePictures = async (requests) => {
    const pictures = {};
    await Promise.all(
      requests.map(async (request) => {
        if (!request.startupId) return;

        try {
          const response = await axios.get(`${process.env.REACT_APP_API_URL}/profile-picture/startup/${request.startupId}`, {
            headers: {
              'Authorization': `Bearer ${localStorage.getItem('token')}`,
            },
            responseType: 'blob',
          });
          const imageUrl = URL.createObjectURL(response.data);
          pictures[request.startupId] = imageUrl;
        } catch (error) {
          console.error(`Failed to fetch profile picture for startup ID ${request.startupId}:`, error);
        }
      })
    );
    setProfilePictures(pictures);
  };

  const handleReject = async (capTableInvestorId) => {
    console.log('Canceling request:', { capTableInvestorId, status: 'rejected' });
    try {
      await axios.put(`${process.env.REACT_APP_API_URL}/funding-rounds/${capTableInvestorId}/status`, { status: 'rejected' });
      setPendingRequests(prevRequests => prevRequests.filter(request => request.capTableInvestorId !== capTableInvestorId));
    } catch (error) {
      console.error('Error canceling request:', error);
    }
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  const formatNumber = (number) => {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  return (
    <Box component="main" sx={{ display: 'flex', flexDirection: 'column', height: '100%', mt: 3 }}>
      <TableContainer sx={tableStyles.container}>
        <Table>
          <TableHead sx={tableStyles.head}>
            <TableRow>
              <TableCell sx={{ ...tableStyles.head }}>
                <Typography sx={tableStyles.typography}>Date</Typography>
              </TableCell>
              <TableCell sx={{}}>
                <Typography sx={tableStyles.typography}>Company Name</Typography>
              </TableCell>
              <TableCell sx={{ ...tableStyles.head }}>
                <Typography sx={tableStyles.typography}>Shares</Typography>
              </TableCell>
              <TableCell sx={{ ...tableStyles.head }}>
                <Typography sx={tableStyles.typography}>Total Shares</Typography>
              </TableCell>
              <TableCell sx={{ ...tableStyles.head }}>
                <Typography sx={tableStyles.typography}>Status</Typography>
              </TableCell>
              <TableCell sx={{ ...tableStyles.head }}>
                <Typography sx={tableStyles.typography}>Action</Typography>
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {pendingRequests.length > 0 ? (
              pendingRequests.map((request) => (
                <TableRow key={request.capTableInvestorId} sx={{ backgroundColor: 'white' }}>
                  <TableCell sx={tableStyles.cell}>
                    {formatDate(request.createdAt)}
                  </TableCell>
                  <TableCell sx={{ ...tableStyles.cell, width: '20%' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start' }}>
                      <Avatar 
                        src={profilePictures[request.startupId] || "https://via.placeholder.com/40"}
                        sx={{ mr: 2, border: '2px rgba(0, 116, 144, 1) solid', borderRadius: 1 }} 
                        variant='square' 
                      />
                      {request.startupName}
                    </Box>
                  </TableCell>
                  <TableCell sx={tableStyles.cell}>{formatNumber(request.shares)}</TableCell>
                  <TableCell sx={tableStyles.cell}>{formatNumber(request.totalinvestment)}</TableCell>
                  <TableCell sx={tableStyles.cell}>{request.status}</TableCell>
                  <TableCell sx={tableStyles.cell}>
                    {request.status === 'pending' && (
                      <Button variant="text" sx={tableStyles.rejectButton} onClick={() => handleReject(request.capTableInvestorId)}>
                        Cancel
                      </Button>
                    )}
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} sx={{ textAlign: 'center' }}>
                  <Typography>No pending requests found.</Typography>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}

export default InvestorRequest;