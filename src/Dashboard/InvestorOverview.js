import React, { useState } from 'react';
import { Typography, Toolbar, Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button, Avatar, Box, Pagination, Stack } from "@mui/material";
import Navbar from "../Navbar/Navbar";
import { tableStyles } from '../styles/tables';
import { StatsBox, TopInfoText, TopInfoTitle } from '../styles/UserDashboard';

const drawerWidth = 310;

function InvestorOverview() {
    const [page, setPage] = useState(1);
    const [rowsPerPage] = useState(5); 

    const totalItems = 10; 
    const totalPages = Math.ceil(totalItems / rowsPerPage);

    const handleChangePage = (event, value) => {
        setPage(value);
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
                            <TopInfoText>Investment Count</TopInfoText>
                            <TopInfoTitle>2</TopInfoTitle>
                        </StatsBox>
                    </Grid>

                    <Grid item xs={12} sm={3}>
                        <StatsBox>
                            <TopInfoText>Top Company Invested</TopInfoText>
                            <TopInfoTitle>Shell Company 2.0</TopInfoTitle>
                        </StatsBox>
                    </Grid>

                    <Grid item xs={12} sm={3}>
                        <StatsBox>
                            <TopInfoText>Average Investment Size</TopInfoText>
                            <TopInfoTitle>P5,000</TopInfoTitle>
                        </StatsBox>
                    </Grid>

                    <Grid item xs={12} sm={3}>
                        <StatsBox>
                            <TopInfoText>Total Investment Amount</TopInfoText>
                            <TopInfoTitle>P50,000</TopInfoTitle>
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
                                    <Typography sx={tableStyles.typography}>Percentage</Typography>
                                </TableCell>
                                <TableCell sx={tableStyles.cell}>
                                    <Typography sx={tableStyles.typography}>Action</Typography>
                                </TableCell>
                            </TableRow>
                        </TableHead>

                        <TableBody>
                            <TableRow sx={tableStyles.row}>
                                <TableCell sx={tableStyles.cell}>
                                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                        <Avatar variant='rounded' sx={{ width: 30, height: 30, mr: 2, border: '2px solid rgba(0, 116, 144, 1)' }} /> Shell Company 2.0
                                    </Box>
                                </TableCell>
                                <TableCell sx={tableStyles.cell}>P20,000</TableCell>
                                <TableCell sx={tableStyles.cell}>60%</TableCell>
                                <TableCell sx={tableStyles.cell}>
                                    <Button variant="contained" sx={tableStyles.actionButton}>Visit Profile</Button>
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>

                    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: 2 }}>
                        <Pagination count={totalPages} page={page} onChange={handleChangePage} size="medium"/>
                    </Box>
                </TableContainer>
            </Grid>
        </>
    );
}

export default InvestorOverview;
