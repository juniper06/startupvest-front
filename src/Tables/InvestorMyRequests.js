import React, { useState, useEffect } from 'react';
import { Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button, Typography, Avatar, Pagination } from '@mui/material';
import axios from 'axios';
import { tableStyles } from '../styles/tables';
import InvestorConfirmationDialog from '../Dialogs/InvestorConfirmationDialog';

function InvestorRequest() { 
  const [pendingRequests, setPendingRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedRequest, setSelectedRequest] = useState(null); 
  const [dialogOpen, setDialogOpen] = useState(false); 
  const [page, setPage] = useState(1); 
  const requestsPerPage = 5; 

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

        if (response.data.length === 0) {
          setError('No pending requests found');
        } else {
          setPendingRequests(response.data);
        }

        setLoading(false);
      } catch (error) {
        setError('Failed to fetch pending requests');
        setLoading(false);
      }
    };

    fetchPendingRequests();
  }, []);

  const handleOpenDialog = (request) => {
    setSelectedRequest(request); 
    setDialogOpen(true); 
  };

  const handleCloseDialog = () => {
    setDialogOpen(false); 
  };

  // Handle confirm cancel action
  const handleConfirmCancel = async () => {
    const capTableInvestorId = selectedRequest?.capTableInvestorId;

    if (!capTableInvestorId) return;

    try {
      // Call the API to reject the request
      await axios.put(`${process.env.REACT_APP_API_URL}/funding-rounds/${capTableInvestorId}/status`, { status: 'rejected' });

      // Update the local state to remove the canceled request
      setPendingRequests(prevRequests => prevRequests.filter(request => request.capTableInvestorId !== capTableInvestorId));

      // Close the dialog after cancellation
      handleCloseDialog();
    } catch (error) {
      console.error('Error canceling request:', error);
    }
  };

  // Pagination
  const currentPageRequests = pendingRequests.slice((page - 1) * requestsPerPage, page * requestsPerPage);
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
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
            {currentPageRequests.length > 0 ? (
              currentPageRequests.map((request) => (
                <TableRow key={request.capTableInvestorId} sx={{ backgroundColor: 'white' }}>
                  <TableCell sx={tableStyles.cell}>
                    {new Date(request.createdAt).toLocaleDateString()}
                  </TableCell>
                  <TableCell sx={{ ...tableStyles.cell, width: '20%' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start' }}>
                      <Avatar 
                        src="https://via.placeholder.com/40" 
                        sx={{ mr: 2, border: '2px rgba(0, 116, 144, 1) solid', borderRadius: 1 }} 
                        variant='square' 
                      />
                      {request.startupName}
                    </Box>
                  </TableCell>
                  <TableCell sx={tableStyles.cell}>{request.shares}</TableCell>
                  <TableCell sx={tableStyles.cell}>{request.totalinvestment}</TableCell>
                  <TableCell sx={tableStyles.cell}>{request.status}</TableCell>
                  <TableCell sx={tableStyles.cell}>
                    {request.status === 'pending' && (
                      <Button variant="text" sx={tableStyles.rejectButton} onClick={() => handleOpenDialog(request)}>
                        Cancel
                      </Button>
                    )}
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} sx={{ textAlign: 'center', background: 'white'}}>
                  <Typography variant='body2' color="textSecondary">No pending requests found.</Typography>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>

        {/* Pagination */}
        {currentPageRequests.length > 0 && (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: 2, background: 'white' }}>
          <Pagination  count={Math.ceil(pendingRequests.length / requestsPerPage)} page={page} onChange={handleChangePage} size="medium" />
        </Box>
        )}
      </TableContainer>

      {/* Cancel Confirmation Dialog */}
      {selectedRequest && (
        <InvestorConfirmationDialog open={dialogOpen} onClose={handleCloseDialog} onConfirm={handleConfirmCancel} companyName={selectedRequest.startupName} />
      )}
    </Box>
  );
}

export default InvestorRequest;