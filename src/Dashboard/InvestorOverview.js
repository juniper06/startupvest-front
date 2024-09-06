import React, { useState } from 'react';
import { Typography, Toolbar, Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TablePagination, Button, Box } from "@mui/material";
import Navbar from "../Navbar/Navbar";
import { tableStyles } from '../styles/tables';
import { StatsBox } from '../styles/UserDashboard';

const drawerWidth = 310;


function InvestorOverview() {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    return (
        <>
            <Navbar />
            <Toolbar />

            <Grid container spacing={3} sx={{ paddingLeft: `${drawerWidth}px`, pt: '50px', pr: '50px' }}>
                <Grid item xs={12}>
                    <Typography variant="h5" sx={{ mb: 2 }}>
                        Dashboard as Investor
                    </Typography>
                </Grid>

                <Grid container spacing={3}>
                    <Grid item xs={12} sm={3}>
                        <StatsBox>
                            <Typography sx={{ fontWeight: 'bold'}}>Investment Count</Typography>
                            <Typography>2</Typography>
                        </StatsBox>
                    </Grid>

                    <Grid item xs={12} sm={3}>
                        <StatsBox>
                            <Typography sx={{ fontWeight: 'bold'}}>Total Investment Amount</Typography>
                            <Typography>P50,000</Typography>
                        </StatsBox>
                    </Grid>

                    <Grid item xs={12} sm={3}>
                        <StatsBox>
                            <Typography sx={{ fontWeight: 'bold'}}>Top Company Invested</Typography>
                            <Typography>Shell Company 2.0</Typography>
                        </StatsBox>
                    </Grid>

                    <Grid item xs={12} sm={3}>
                        <StatsBox>
                            <Typography sx={{ fontWeight: 'bold'}}>Average Investment Size</Typography>
                            <Typography>P5,000</Typography>
                        </StatsBox>
                    </Grid>
                </Grid>
                

                {/* My Investments Header */}
                <Grid item xs={12}>
                    <Typography variant="h5" sx={{ mt: 4, mb: 2 }}>
                        My Investments
                    </Typography>
                </Grid>

                <TableContainer component={Paper} sx={tableStyles.container}>
                    <Table>
                        <TableHead sx={tableStyles.head}>
                            <TableRow>
                                <TableCell sx={tableStyles.cell}>
                                    <Typography sx={tableStyles.typography}>Company</Typography>
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
                                <TableCell sx={tableStyles.cell}>Shell Company 2.0</TableCell>
                                <TableCell sx={tableStyles.cell}>P20,000</TableCell>
                                <TableCell sx={tableStyles.cell}>60%</TableCell>
                                <TableCell sx={tableStyles.cell}>
                                    <Button variant="contained" sx={tableStyles.actionButton}>Visit Profile</Button>
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>

                    <TablePagination
                        rowsPerPageOptions={[5]}
                        component="div"
                        // count={businessProfiles.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}/>
                </TableContainer>
            </Grid>
        </>
    );
}

export default InvestorOverview;
