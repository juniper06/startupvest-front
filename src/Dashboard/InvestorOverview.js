import React from 'react';
import { Typography, Toolbar, Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import Navbar from "../Navbar/Navbar";

const drawerWidth = 280;

function InvestorOverview() {
    // Sample data for the table
    const rows = [
        { name: 'Investor 1', investment: '$100,000', date: '2024-01-15' },
        { name: 'Investor 2', investment: '$200,000', date: '2024-02-20' },
        { name: 'Investor 3', investment: '$150,000', date: '2024-03-10' },
        // Add more rows as needed
    ];

    return (
        <>
            <Navbar />
            <Toolbar />
            <Grid container spacing={3} sx={{ paddingLeft: `${drawerWidth}px`, pt: '50px', pr: '50px' }}>
                <Grid item xs={12} sm={4}>
                    <Typography>Funded Companies</Typography>
                    <Typography variant="h6">static</Typography>
                </Grid>

                <Grid item xs={12} sm={4}>
                    <Typography>Funded Companies</Typography>
                    <Typography variant="h6">static</Typography>
                </Grid>

                <Grid item xs={12} sm={4}>
                    <Typography>Funded Companies</Typography>
                    <Typography variant="h6">static</Typography>
                </Grid>

            </Grid>
            <TableContainer sx={{ width: '100%', paddingLeft: `${drawerWidth}px`, pt: '50px', pr: '50px' }}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell>Investment</TableCell>
                            <TableCell>Date</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row, index) => (
                            <TableRow key={index}>
                                <TableCell>{row.name}</TableCell>
                                <TableCell>{row.investment}</TableCell>
                                <TableCell>{row.date}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    );
}

export default InvestorOverview;
