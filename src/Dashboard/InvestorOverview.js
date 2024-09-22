import React, { useState, useEffect } from 'react';
import { Typography, Toolbar, Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button, Avatar, Box, Pagination } from "@mui/material";
import Navbar from "../Navbar/Navbar";
import { tableStyles } from '../styles/tables';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { StatsBox, TopInfoText, TopInfoTitle } from '../styles/UserDashboard';

const drawerWidth = 310;

function createData(id, transactionName, startupName, fundingType, moneyRaised, moneyRaisedCurrency, 
    announcedDate, closedDate, avatar, preMoneyValuation, capTableInvestors, minimumShare, startupId, totalShares) {
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
        totalShares
    };
}

function InvestorOverview() {
    const userId = localStorage.getItem('userId');
    const [page, setPage] = useState(1);
    const [rowsPerPage] = useState(5);
    const [rows, setRows] = useState([]);
    const [filteredRows, setFilteredRows] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    
    const [userData, setUserData] = useState(null);
    const [profilePictures, setProfilePictures] = useState({});
    const totalInvestments = rows.length;
    const [topInvestedCompany, setTopInvestedCompany] = useState('None');
    const [averageInvestmentSize, setAverageInvestmentSize] = useState(0);
    const [totalInvestmentAmount, setTotalInvestmentAmount] = useState(0);
    
    const handleChangePage = (event, value) => {
        setPage(value);
    };

    const conversionRates = {
        USD: 50.0,
        EUR: 60.0,
        GBP: 70.0,
        JPY: 0.45,
        KRW: 0.045,
        PHP: 1
    };

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await axios.get('http://localhost:3000/users/profile', {
                    headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` },
                });
                setUserData(response.data);
            } catch (error) {
                console.error('Failed to fetch user data:', error);
            }
        };
      
        fetchUserData();
    }, []);

    useEffect(() => {
        const fetchFundingRounds = async () => {
            setLoading(true);
            try {
                const response = await axios.get('http://localhost:3000/funding-rounds/all');
                const fetchedRows = response.data.map(fundingRound => {
                    const investors = fundingRound.capTableInvestors || [];
                    const totalShares = investors.reduce((sum, investor) => sum + (investor.shares || 0), 0);
                    const userInvestors = investors.filter(investor => investor.investor?.id === userData.id);

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
                        totalShares
                    );
                });

                const userInvestedRows = fetchedRows.filter(row => row.capTableInvestors.length > 0);
                setRows(userInvestedRows);
                setFilteredRows(userInvestedRows);
                fetchAllProfilePictures(response.data);
            } catch (error) {
                console.error('Error fetching funding rounds:', error);
            } finally {
                setLoading(false);
            }
        };

        if (userData && userData.id) {
            fetchFundingRounds();
        }
    }, [userData]);

    useEffect(() => {
        if (rows.length > 0) {
            const investmentTotals = {};
            rows.forEach(row => {
                row.capTableInvestors.forEach(investor => {
                    investmentTotals[row.startupName] = (investmentTotals[row.startupName] || 0) + investor.shares;
                });
            });
            const topCompany = Object.entries(investmentTotals).reduce((a, b) => a[1] > b[1] ? a : b)[0];
            setTopInvestedCompany(topCompany);
        }
    }, [rows]);

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
                    const imageUrl = URL.createObjectURL(response.data);
                    pictures[startupId] = imageUrl;
                } catch (error) {
                    console.error(`Failed to fetch profile picture for startup ID ${startupId}:`, error);
                }
            })
        );

        setProfilePictures(pictures);
    };

    const handleRowClick = (fundinground) => {
        navigate(`/fundingroundview`, { state: { fundinground } });
    };

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
            <Navbar />
            <Toolbar />

            <Grid container spacing={3} sx={{ paddingLeft: `${drawerWidth}px`, pt: '50px', pr: '50px' }}>
                <Grid item xs={12}>
                    <Typography variant="h5" sx={{ mb: 2, ml: -3 }}>
                        Investor Dashboard
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

                <Grid item xs={12}>
                    <Typography variant="h6" sx={{ mt: 4, mb: 2, ml: -3 }}>
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
                            {loading ? (
                                <TableRow>
                                    <TableCell colSpan={5} sx={tableStyles.cell}>
                                        <Typography variant="body2" sx={{ textAlign: 'center', fontStyle: 'italic' }}>
                                            Loading investments...
                                        </Typography>
                                    </TableCell>
                                </TableRow>
                            ) : filteredRows.length > 0 ? (
                                filteredRows.slice((page - 1) * rowsPerPage, page * rowsPerPage).map((row) => (
                                    <TableRow key={row.id} sx={tableStyles.row}>
                                        <TableCell sx={tableStyles.cell}>
                                            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                <Avatar 
                                                    variant='rounded' 
                                                    sx={{ width: 30, height: 30, mr: 2 }} 
                                                    src={profilePictures[row.startupId] || ''} 
                                                    alt={row.startupName}
                                                >
                                                    {profilePictures[row.startupId] ? '' : row.startupName.charAt(0)}
                                                </Avatar>
                                                {row.startupName}
                                            </Box>
                                        </TableCell>
                                        <TableCell sx={tableStyles.cell}>
                                            {row.capTableInvestors.map((investor, index) => (
                                                <div key={index}>
                                                    {Number(investor.shares).toLocaleString()}
                                                </div>
                                            ))}
                                        </TableCell>
                                        <TableCell sx={tableStyles.cell}>
                                            {row.capTableInvestors.map((investor, index) => (
                                                <div key={index}>
                                                    {row.moneyRaisedCurrency} {Number(investor.totalInvestment).toLocaleString()}
                                                </div>
                                            ))}
                                        </TableCell>
                                        <TableCell sx={tableStyles.cell}>
                                            {row.capTableInvestors.map((investor) => {
                                                const userShares = investor.shares || 0;
                                                const percentage = row.totalShares ? ((userShares / row.totalShares) * 100).toFixed(2) : '0.00';
                                                return (
                                                    <div key={investor.id}>
                                                        {percentage}%
                                                    </div>
                                                );
                                            })}
                                        </TableCell>
                                        <TableCell sx={tableStyles.cell}>
                                            <Button 
                                                variant="contained" 
                                                sx={tableStyles.actionButton}
                                                onClick={() => handleRowClick(row)}>
                                                Visit Profile
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell colSpan={5} sx={tableStyles.cell}>
                                        <Typography variant="body2" sx={{ textAlign: 'center', fontStyle: 'italic' }}>
                                            You haven't made any investments yet. Start exploring opportunities today!
                                        </Typography>
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>

                    {filteredRows.length > 0 && (
                        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: 2 }}>
                            <Pagination count={Math.ceil(filteredRows.length / rowsPerPage)} page={page} onChange={handleChangePage} size="medium"/>
                        </Box>
                    )}
                </TableContainer>
            </Grid>
        </Box>
    );
}

export default InvestorOverview;
