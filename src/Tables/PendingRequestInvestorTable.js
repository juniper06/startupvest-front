import React, { useState, useEffect } from 'react';
import { Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button, Typography, Avatar,
} from '@mui/material';
import axios from 'axios';
import { Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button, Typography, Avatar, CircularProgress } from '@mui/material';
import { tableStyles } from '../styles/tables';
import StartupConfirmationDialog from '../Dialogs/StartupConfirmationDialog';
import Pagination from '@mui/material/Pagination';
import axios from 'axios';

function PendingRequestInvestor() {
  const [pendingRequests, setPendingRequests] = useState([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogType, setDialogType] = useState(null);
  const [currentRequest, setCurrentRequest] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const [profilePictures, setProfilePictures] = useState({});
  const [loading, setLoading] = useState({});

  useEffect(() => {
    const fetchPendingRequests = async () => {
      const userId = localStorage.getItem('userId');
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/cap-table-investor/all?userId=${userId}`
        );
        setPendingRequests(response.data);
        fetchAllProfilePictures(response.data);
      } catch (error) {
        console.error('Error fetching pending requests:', error);
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

  const handleConfirm = async () => {
    if (!currentRequest) return;

    const status = dialogType === 'accept' ? 'accepted' : 'rejected';

  const handleAccept = async (capTableInvestorId) => {
    setLoading(prev => ({ ...prev, [capTableInvestorId]: true }));
    try {
      await axios.put(
        `${process.env.REACT_APP_API_URL}/funding-rounds/${currentRequest.capTableInvestorId}/status`,
        { status }
      );
      setPendingRequests((prevRequests) =>
        prevRequests.filter(
          (request) => request.capTableInvestorId !== currentRequest.capTableInvestorId
        )
      );
      await axios.put(`${process.env.REACT_APP_API_URL}/funding-rounds/${capTableInvestorId}/status`, { status: 'accepted' });
      window.location.reload();  // Refresh the entire browser
    } catch (error) {
      console.error('Error accepting request:', error);
    } finally {
      setLoading(prev => ({ ...prev, [capTableInvestorId]: false }));
    }
  };
  
  const handleReject = async (capTableInvestorId) => {
    setLoading(prev => ({ ...prev, [capTableInvestorId]: true }));
    try {
      await axios.put(`${process.env.REACT_APP_API_URL}/funding-rounds/${capTableInvestorId}/status`, { status: 'rejected' });
      window.location.reload();  // Refresh the entire browser
    } catch (error) {
      console.error('Error rejecting request:', error);
    } finally {
      setLoading(prev => ({ ...prev, [capTableInvestorId]: false }));
    }
  };  

  const fetchPendingRequests = async () => {
    const userId = localStorage.getItem('userId');
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/cap-table-investor/all?userId=${userId}`);
      setPendingRequests(response.data);
    } catch (error) {
      console.error('Error fetching pending requests:', error);
    }
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const formatShares = (shares) => {
    return shares.toLocaleString();
  };
      console.error(
        `Error ${status === 'accepted' ? 'accepting' : 'rejecting'} request:`,
        error
      );
    } finally {
      setDialogOpen(false);
      setCurrentRequest(null); 
    }
  };

  // Calculate total number of pages
  const totalPages = Math.ceil(pendingRequests.length / itemsPerPage);
  const indexOfLastRequest = currentPage * itemsPerPage;
  const indexOfFirstRequest = indexOfLastRequest - itemsPerPage;
  const currentRequests = pendingRequests.slice(indexOfFirstRequest, indexOfLastRequest);

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
              <TableCell sx={{ ...tableStyles.cell }}>
              <TableCell sx={{ ...tableStyles.cell }}>
                <Typography sx={tableStyles.typography}>Investor</Typography>
              </TableCell>
              <TableCell sx={{ ...tableStyles.cell }}>
                <Typography sx={tableStyles.typography}>Shares</Typography>
              </TableCell>
              <TableCell sx={{ ...tableStyles.cell }}>
              <TableCell sx={{ ...tableStyles.cell }}>
                <Typography sx={tableStyles.typography}>Action</Typography>
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {currentRequests.length > 0 ? (
              currentRequests.map((request) => (
                <TableRow key={request.capTableInvestorId} sx={{ backgroundColor: 'white' }}>
                  <TableCell sx={tableStyles.cell}>{formatDate(request.createdAt)}</TableCell>
                  <TableCell sx={{ ...tableStyles.cell, width: '20%' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start', ml: 5 }}>
                      <Avatar 
                        src={profilePictures[request.startupId]} 
                        sx={{ mr: 2, border: '2px rgba(0, 116, 144, 1) solid', borderRadius: 1 }} 
                        variant='square' 
                      />
                      {request.startupName}
                    </Box>
                  </TableCell>
                  <TableCell sx={tableStyles.cell}>{request.email}</TableCell>
                  <TableCell sx={tableStyles.cell}>{request.investorName}</TableCell>
                  <TableCell sx={tableStyles.cell}>{formatShares(request.shares)}</TableCell>
                  <TableCell sx={tableStyles.cell}>
                    <Button
                      variant="contained"
                      sx={tableStyles.acceptButton}
                      onClick={() => {
                        setCurrentRequest(request);
                        setDialogType('accept');
                        setDialogOpen(true);
                      }}>
                      Accept
                    <Button 
                      variant="contained" 
                      sx={tableStyles.acceptButton} 
                      onClick={() => handleAccept(request.capTableInvestorId)} 
                      disabled={loading[request.capTableInvestorId]}
                    >
                      {loading[request.capTableInvestorId] ? <CircularProgress size={24} /> : 'Accept'}
                    </Button>
                    <Button
                      variant="text"
                      sx={tableStyles.rejectButton}
                      onClick={() => {
                        setCurrentRequest(request);
                        setDialogType('reject');
                        setDialogOpen(true);
                      }}>
                      Reject
                    <Button 
                      variant="text" 
                      sx={tableStyles.rejectButton} 
                      onClick={() => handleReject(request.capTableInvestorId)} 
                      disabled={loading[request.capTableInvestorId]}
                    >
                      {loading[request.capTableInvestorId] ? <CircularProgress size={24} /> : 'Reject'}
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} sx={{ textAlign: 'center' }}>
                  <Typography variant="body2" color="textSecondary">
                    No pending requests found.
                  </Typography>
                </TableCell>
              </TableRow>
            )}
          </TableBody>

          {/* Pagination Row */}
          {currentRequests.length > 0 && (
              <TableRow>
                <TableCell colSpan={6} sx={{ textAlign: 'center', background: 'white' }}>
                  <Pagination count={totalPages} size="medium" page={currentPage}onChange={(event, value) => setCurrentPage(value)} sx={{ display: 'inline-block' }}/>
                </TableCell>
              </TableRow>
          )}
        </Table>
      </TableContainer>

      {/* Request Dialog */}
      <StartupConfirmationDialog open={dialogOpen} onClose={() => setDialogOpen(false)} onConfirm={handleConfirm}
        title={dialogType === 'accept' ? 'Confirm Accept' : 'Confirm Reject'}
        message={
          <>
            Are you sure you want to {dialogType === 'accept' ? 'accept' : 'reject'} the investment request from{' '}
            <strong>{currentRequest?.investorName}</strong>?
          </>
        }
        success={
          <>
            You have successfully {dialogType === 'accept' ? 'accepted' : 'rejected'} the investment request!
          </>
        }
      />
    </Box>
  );
}

export default PendingRequestInvestor;