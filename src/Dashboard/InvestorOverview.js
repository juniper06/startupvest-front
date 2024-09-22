import React, { useState, useEffect } from 'react';
import { Typography, Toolbar, Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button, Avatar, Box, Pagination, Stack } from "@mui/material";
import Navbar from "../Navbar/Navbar";
import { tableStyles } from '../styles/tables';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { StatsBox, TopInfoText, TopInfoTitle } from '../styles/UserDashboard';

const drawerWidth = 310;

function createData(id, transactionName, startupName, fundingType, moneyRaised, 
    moneyRaisedCurrency, announcedDate, closedDate, avatar, preMoneyValuation, capTableInvestors, 
    minimumShare, startupId, totalShares, totalInvestment ) {
    return {
      id,
      transactionName,
      startupName,
      fundingType,
      moneyRaised,
      moneyRaisedCurrency,
      announcedDate,
      closedDate,
      avatar,
      preMoneyValuation,
      capTableInvestors,
      minimumShare,
      startupId,
      totalShares,
      totalInvestment
    };
  }

function InvestorOverview() {
    const userId = localStorage.getItem('userId');
    const [page, setPage] = useState(1);
    const [rowsPerPage] = useState(5); 
    const [rows, setRows] = useState([]);
    const [filteredRows, setFilteredRows] = useState([]);
    const navigate = useNavigate();
    const totalItems = filteredRows.length; 
    const totalPages = Math.ceil(totalItems / rowsPerPage);
    const [userData, setUserData] = useState(null);
    const [profilePictures, setProfilePictures] = useState({});
    const totalInvestments = rows.length;
    const [topInvestedCompany, setTopInvestedCompany] = useState('N/A');
    const [averageInvestmentSize, setAverageInvestmentSize] = useState(0);
    const [totalInvestmentAmount, setTotalInvestmentAmount] = useState(0);
    const handleChangePage = (event, value) => {
        setPage(value);
    };

    const conversionRates = {
      USD: 50.0,  // 1 USD = 50 PHP
      EUR: 60.0,  // 1 EUR = 60 PHP
      GBP: 70.0,  // 1 GBP = 70 PHP
      JPY: 0.45,  // 1 JPY = 0.45 PHP
      KRW: 0.045, // 1 KRW = 0.045 PHP
      PHP: 1      // 1 PHP = 1 PHP (no conversion needed)
    };

    useEffect(() => {
        const fetchUserData = async () => {
          try {
            const response = await axios.get('http://localhost:3000/users/profile', {
              headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` },
            });
            setUserData(response.data); // Set user data, including the user ID
          } catch (error) {
            console.error('Failed to fetch user data:', error);
          }
        };
      
        fetchUserData();
      }, []);      
      
      useEffect(() => {
        if (userData && userData.id) {
          const fetchFundingRounds = async () => {
            try {
              const response = await axios.get('http://localhost:3000/funding-rounds/all');
              const fetchedRows = response.data.map(fundingRound => {
                const investors = fundingRound.capTableInvestors || [];
      
                // Calculate total shares
                const totalShares = investors.reduce((sum, investor) => sum + (investor.shares || 0), 0);
      
                // Filter capTableInvestors to show only the logged-in user's investments
                const userInvestors = investors.filter(investor => investor.investor?.id === userData.id);
      
                // Create data with totalShares and calculate user share percentage
                return createData(
                  fundingRound.id,
                  fundingRound.transactionName || 'N/A',
                  fundingRound.startup?.companyName ?? 'N/A',
                  fundingRound.fundingType || 'N/A',
                  fundingRound.moneyRaised || '---',
                  fundingRound.moneyRaisedCurrency || 'USD',
                  new Date(fundingRound.announcedDate).toLocaleDateString() || 'N/A',
                  new Date(fundingRound.closedDate).toLocaleDateString() || 'N/A',
                  fundingRound.avatar || '',
                  fundingRound.preMoneyValuation || 'N/A',
                  userInvestors.map(investor => ({
                    id: investor.id,
                    title: investor.title,
                    shares: investor.shares,
                    totalInvestment: investor.totalInvestment || 'N/A',
                    investorDetails: {
                      firstName: investor.investor?.firstName || 'N/A',
                      lastName: investor.investor?.lastName || 'N/A',
                      email: investor.investor?.emailAddress || 'N/A',
                      contactInfo: investor.investor?.contactInformation || 'N/A',
                    },
                  })),
                  fundingRound.minimumShare || 'N/A',
                  fundingRound.startup?.id || null,
                  totalShares, // Add totalShares here
                );
              });
      
              // Filter out rows where the logged-in user is not an investor in any cap table
              const userInvestedRows = fetchedRows.filter(row => row.capTableInvestors.length > 0);
              setRows(userInvestedRows);
              setFilteredRows(userInvestedRows);
              fetchAllProfilePictures(response.data);
            } catch (error) {
              console.error('Error fetching funding rounds:', error);
            }
          };
      
          fetchFundingRounds();
        }
      }, [userData]); // Dependency on userData
      
      useEffect(() => {
        if (rows.length > 0) {
          const investmentTotals = {};
          
          // Loop through each row and accumulate total investments for each company (startup)
          rows.forEach(row => {
            row.capTableInvestors.forEach(investor => {
              if (!investmentTotals[row.startupName]) {
                investmentTotals[row.startupName] = 0;
              }
              investmentTotals[row.startupName] += investor.totalInvestment || 0; // Add total investment instead of shares
            });
          });
      
          // Find the company with the highest total investment
          const topCompany = Object.entries(investmentTotals).reduce((a, b) => a[1] > b[1] ? a : b)[0];
          setTopInvestedCompany(topCompany);
        }
      }, [rows]);      

    // hook to calculate the average investment size
    useEffect(() => {
      if (rows.length > 0) {
        let totalInvestmentPHP = 0;
        let totalInvestments = 0;
    
        rows.forEach(row => {
          row.capTableInvestors.forEach(investor => {
            const investmentValue = investor.shares * (row.minimumShare || 0);
            const investmentValuePHP = investmentValue * (conversionRates[row.moneyRaisedCurrency] || 1);
            totalInvestmentPHP += investmentValuePHP;
            totalInvestments++;
          });
        });
    
        const averageInvestmentPHP = totalInvestments > 0 ? totalInvestmentPHP / totalInvestments : 0;
        setAverageInvestmentSize(averageInvestmentPHP);
      }
    }, [rows]);
    // hook that calculates the average investment size to also calculate the total investment amount
    useEffect(() => {
      if (rows.length > 0) {
        let totalInvestmentPHP = 0;
        let totalInvestments = 0;
    
        rows.forEach(row => {
          row.capTableInvestors.forEach(investor => {
            const investmentValue = investor.shares * (row.minimumShare || 0);
            const investmentValuePHP = investmentValue * (conversionRates[row.moneyRaisedCurrency] || 1);
            totalInvestmentPHP += investmentValuePHP;
            totalInvestments++;
          });
        });
    
        const averageInvestmentPHP = totalInvestments > 0 ? totalInvestmentPHP / totalInvestments : 0;
        setAverageInvestmentSize(averageInvestmentPHP);
        setTotalInvestmentAmount(totalInvestmentPHP);
      }
    }, [rows]);
       
      const fetchAllProfilePictures = async (fundingRounds) => {
        const pictures = {};
        await Promise.all(
          fundingRounds.map(async (fundingRound) => {
            const startupId = fundingRound.startup?.id;
            if (!startupId) return; // Skip if there's no startup ID
      
            try {
              const response = await axios.get(`http://localhost:3000/profile-picture/startup/${startupId}`, {
                headers: {
                  'Authorization': `Bearer ${localStorage.getItem('token')}`,
                },
                responseType: 'blob',
              });
      
              const imageUrl = URL.createObjectURL(response.data); // Convert blob to URL
              pictures[startupId] = imageUrl; // Store image URL against the startup ID (not funding round ID)
            } catch (error) {
              console.error(`Failed to fetch profile picture for startup ID ${startupId}:`, error);
            }
          })
        );
      
        setProfilePictures(pictures); // Set state with all fetched profile pictures
      };      

      const handleRowClick = (fundinground) => {
        navigate(`/fundingroundview`, { state: { fundinground } });
      };      

    return (
        <>
            <Navbar />
            <Toolbar />

            <Grid container spacing={3} sx={{ paddingLeft: `${drawerWidth}px`, pt: '50px', pr: '50px' }}>
                <Grid item xs={12}>
                <Typography variant="h5" sx={{ mb: 2, ml: -3 }}>
                        Dashboard as Investor
                    </Typography>
                </Grid>

                <Grid container spacing={3}>
                  <Grid item xs={12} sm={3}>
                          <StatsBox>
                              <TopInfoText>Top Company Invested</TopInfoText>
                              <TopInfoTitle>{topInvestedCompany}</TopInfoTitle>
                          </StatsBox>
                      </Grid>

                    <Grid item xs={12} sm={3}>
                        <StatsBox>
                            <TopInfoText>Investment Count</TopInfoText>
                            <TopInfoTitle>{totalInvestments}</TopInfoTitle>
                        </StatsBox>
                    </Grid>

                    <Grid item xs={12} sm={3}>
                        <StatsBox>
                            <TopInfoText>Average Investment Size</TopInfoText>
                            <TopInfoTitle>₱{averageInvestmentSize.toLocaleString('en-PH', { maximumFractionDigits: 2 })}</TopInfoTitle>
                        </StatsBox>
                    </Grid>

                    <Grid item xs={12} sm={3}>
                        <StatsBox>
                            <TopInfoText>Total Investment Amount</TopInfoText>
                            <TopInfoTitle>₱{totalInvestmentAmount.toLocaleString('en-PH', { maximumFractionDigits: 2 })}</TopInfoTitle>
                        </StatsBox>
                    </Grid>
                </Grid>
                
                {/* My Investments Header */}
                <Grid item xs={12}>
                <Typography variant="h5" sx={{ mt: 4, mb: 2, ml: -3 }}>
                        My Investments
                    </Typography>
                </Grid>

                <TableContainer component={Paper} sx={tableStyles.container}>
                    <Table>
                        <TableHead sx={tableStyles.head}>
                            <TableRow>
                                <TableCell sx={tableStyles.cell}>
                                    <Typography sx={tableStyles.typography}>Company Name</Typography>
                                </TableCell>
                                <TableCell sx={tableStyles.cell}>
                                    <Typography sx={tableStyles.typography}>Shares</Typography>
                                </TableCell>
                                <TableCell sx={tableStyles.cell}>
                                    <Typography sx={tableStyles.typography}>Total Shares</Typography>
                                </TableCell>
                                <TableCell sx={tableStyles.cell}>
                                    <Typography sx={tableStyles.typography}>Percentage</Typography>
                                </TableCell>
                                <TableCell sx={tableStyles.cell}>
                                    <Typography sx={tableStyles.typography}>Action</Typography>
                                </TableCell>
                            </TableRow>
                        </TableHead>

                        <TableBody>
                            {filteredRows.slice((page - 1) * rowsPerPage, page * rowsPerPage).map((row) => (
                                <TableRow key={row.id} sx={tableStyles.row}>
                                    {/* Company Name with Avatar */}
                                    <TableCell sx={tableStyles.cell}>
                                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                            <Avatar 
                                                variant='rounded' 
                                                sx={{ width: 30, height: 30, mr: 2, border: '2px solid rgba(0, 116, 144, 1)' }} 
                                                src={profilePictures[row.startupId] || ''} // Avatar image based on startupId
                                                alt={row.startupName}
                                            >
                                                {profilePictures[row.startupId] ? '' : row.startupName.charAt(0)} {/* First letter if no image */}
                                            </Avatar>
                                            {row.startupName}
                                        </Box>
                                    </TableCell>

                                    {/* Shares */}
                                    <TableCell sx={tableStyles.cell}>
                                        {row.capTableInvestors.map((investor, index) => (
                                        <div key={index}>
                                            {/* {investor.investorDetails.firstName} {investor.investorDetails.lastName}: {Number(investor.shares).toLocaleString()} shares */}
                                            {Number(investor.shares).toLocaleString()}
                                        </div>
                                        ))}
                                    </TableCell>
                            
                                    {/* Total Shares */}
                                    <TableCell sx={tableStyles.cell}>
                                        {row.capTableInvestors.map((investor, index) => (
                                        <div key={index}>
                                            {/* {investor.investorDetails.firstName} {investor.investorDetails.lastName}: {Number(investor.shares).toLocaleString()} shares */}
                                            {row.moneyRaisedCurrency} {Number(investor.totalInvestment).toLocaleString()}
                                        </div>
                                        ))}
                                    </TableCell>
                                    {/* Percentage */}
                                    <TableCell sx={tableStyles.cell}>
                                        {row.capTableInvestors.map((investor) => {
                                            // Compute percentage if totalShares is available
                                            const userShares = investor.shares || 0;
                                            const percentage = row.totalShares ? (userShares / row.totalShares * 100).toFixed(2) : '0.00';
                                            return (
                                            <div key={investor.id}>
                                                {percentage}%
                                            </div>
                                            );
                                        })}
                                        </TableCell>
                                    {/* Action Button */}
                                    <TableCell sx={tableStyles.cell}>
                                        <Button 
                                            variant="contained" 
                                            sx={tableStyles.actionButton}
                                            onClick={() => handleRowClick(row)}
                                        >
                                            Visit Profile
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>

                    {/* Pagination */}
                    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: 2 }}>
                        <Pagination count={totalPages} page={page} onChange={handleChangePage} size="medium"/>
                    </Box>
                </TableContainer>
            </Grid>
        </>
    );
}

export default InvestorOverview;
