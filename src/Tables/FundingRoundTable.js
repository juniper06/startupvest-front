import React, { useState, useEffect } from 'react';
import { Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TablePagination, Button, Typography, FormControl, Select, MenuItem } from '@mui/material';
import ViewFundingRoundDialog from '../Dialogs/ViewFundingRoundDialog';
import ConfirmDeleteDialog from '../Dialogs/ConfirmDeleteFundingRoundDialog';
import { tableStyles } from '../styles/tables';

function FundingRoundTable({
  fundingRounds = [], 
  fundingRowsPerPage = 5, 
  fundingPage = 0,
  handleViewFundingRound,
  handleSoftDeleteFundingRound,
  selectedFundingRoundDetails,
  openViewFundingRound,
  handleCloseFundingProfile,
  businessProfiles,
  onTotalAmountFundedChange
}) {
  const [localFundingPage, setLocalFundingPage] = useState(fundingPage);
  const [localFundingRowsPerPage, setLocalFundingRowsPerPage] = useState(fundingRowsPerPage);

  const [openDeleteFundingRoundDialog, setOpenDeleteFundingRoundDialog] = useState(false);
  const [fundingRoundToDelete, setFundingRoundToDelete] = useState(null);
  const [selectedStartupFunding, setSelectedStartupFunding] = useState('All');

  const [totalAmountFunded, setTotalAmountFunded] = useState(0);

  // Handle the startup filter change
  const handleStartupChangeFunding = (event) => {
    setSelectedStartupFunding(event.target.value);
  };

  // Get list of startup IDs the user created
  const userCreatedStartupIds = businessProfiles
    .filter(profile => profile.type === 'Startup')
    .map(startup => startup.id);

  // Filter funding rounds based on the selected startup
  const filteredFundingRounds = selectedStartupFunding === 'All'
    ? fundingRounds.filter(round => round.startup && userCreatedStartupIds.includes(round.startup.id))
    : fundingRounds.filter(round => round.startup && round.startup.id === selectedStartupFunding);

  // Calculate the total amount funded from filtered funding rounds
  useEffect(() => {
    const totalFunded = filteredFundingRounds.reduce((sum, round) => sum + (round.moneyRaised || 0), 0);
    setTotalAmountFunded(totalFunded);
    // Pass the computed value back to the parent (UserDashboard)
    onTotalAmountFundedChange(totalFunded);
  }, [filteredFundingRounds, onTotalAmountFundedChange]);

  // Calculate the index of the first and last row to display
  const startIndex = localFundingPage * localFundingRowsPerPage;
  const endIndex = startIndex + localFundingRowsPerPage;

  // Slice the filtered data to display only the rows for the current page
  const paginatedFundingRounds = filteredFundingRounds.slice(startIndex, endIndex);

  const handleOpenDeleteFundingRoundDialog = (round) => {
    setFundingRoundToDelete(round);
    setOpenDeleteFundingRoundDialog(true);
  };

  const handleCloseDeleteFundingRoundDialog = () => {
    setOpenDeleteFundingRoundDialog(false);
    setFundingRoundToDelete(null);
  };

  const handleConfirmDelete = () => {
    if (fundingRoundToDelete) {
      handleSoftDeleteFundingRound(fundingRoundToDelete.id);
      handleCloseDeleteFundingRoundDialog();
    }
  };

  // Pagination
  const handleFundingPageChange = (event, newPage) => {
    setLocalFundingPage(newPage);
  };

  const handleFundingRowsPerPageChange = (event) => {
    setLocalFundingRowsPerPage(parseInt(event.target.value, 10));
    setLocalFundingPage(0);
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Typography variant="subtitle1" sx={{ pr: 1 }}>By Company:</Typography>
          <FormControl sx={{ minWidth: 200 }}>
            <Select 
              value={selectedStartupFunding} 
              onChange={handleStartupChangeFunding} 
              variant="outlined" 
              sx={{ minWidth: 150, height: '45px' }}>
              <MenuItem value="All">All</MenuItem>
              {businessProfiles.filter(profile => profile.type === 'Startup')
                .map((startup) => (
                  <MenuItem key={startup.id} value={startup.id}>{startup.companyName}</MenuItem>
                ))}
            </Select>
          </FormControl>
        </Box>
      </Box>

      <TableContainer sx={tableStyles.container}>
        <Table>
          <TableHead sx={tableStyles.head}>
            <TableRow>
              <TableCell sx={tableStyles.cell}>
                <Typography sx={tableStyles.typography}>Funding Type</Typography>
              </TableCell>
              <TableCell sx={tableStyles.cell}>
                <Typography sx={tableStyles.typography}>Money Raised</Typography>
              </TableCell>
              <TableCell sx={tableStyles.cell}>
                <Typography sx={tableStyles.typography}>Target Funding</Typography>
              </TableCell>
              <TableCell sx={tableStyles.cell}>
                <Typography sx={tableStyles.typography}>Action</Typography>
              </TableCell>        
            </TableRow>
          </TableHead>
          
          <TableBody>
          {paginatedFundingRounds.length > 0 ? (
              paginatedFundingRounds.map((round) => (
                <TableRow key={round.id}>
                  <TableCell sx={tableStyles.cell}>{round.fundingType}</TableCell>
                  <TableCell sx={tableStyles.cell}>{round.moneyRaised}</TableCell>
                  <TableCell sx={tableStyles.cell}>{round.targetFunding}</TableCell>
                  <TableCell sx={tableStyles.cell}>
                    <Button
                      variant="contained"
                      sx={tableStyles.actionButton}
                      onClick={() => handleViewFundingRound(round.id)}>
                      View
                    </Button>
                    <Button
                      variant="outlined"
                      sx={tableStyles.deleteButton}
                      onClick={() => handleOpenDeleteFundingRoundDialog(round)}>
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))
              ) : (
                <TableRow>
                  <TableCell colSpan={4} sx={tableStyles.cell}>
                    No funding rounds available for your startups.
                  </TableCell>
                </TableRow>
              )}
          </TableBody>
        </Table>

        <TablePagination
          rowsPerPageOptions={[5]}
          component="div"
          count={filteredFundingRounds.length}
          rowsPerPage={localFundingRowsPerPage}
          page={localFundingPage}
          onPageChange={handleFundingPageChange}
          onRowsPerPageChange={handleFundingRowsPerPageChange} />
      </TableContainer>

      <ViewFundingRoundDialog open={openViewFundingRound} fundingRoundDetails={selectedFundingRoundDetails} onClose={handleCloseFundingProfile} />

      <ConfirmDeleteDialog
        open={openDeleteFundingRoundDialog}
        onClose={handleCloseDeleteFundingRoundDialog}
        onConfirm={handleConfirmDelete}
        companyName={fundingRoundToDelete ? fundingRoundToDelete.companyName : ''} />
    </Box>
  );
}

export default FundingRoundTable;
