// FundingHistoryDialog.js

import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Table, TableBody, TableCell, TableHead, TableRow, Typography } from '@mui/material';

function FundingHistoryDialog({ open, fundingRounds, onClose }) {
    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Funding Rounds History</DialogTitle>
            <DialogContent>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell><Typography variant="subtitle2">Closed Date</Typography></TableCell>
                            <TableCell><Typography variant="subtitle2">Funding Type</Typography></TableCell>
                            <TableCell><Typography variant="subtitle2">Money Raised</Typography></TableCell>
                            <TableCell><Typography variant="subtitle2">Target Funding</Typography></TableCell>
                            <TableCell><Typography variant="subtitle2">Status</Typography></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {fundingRounds.length > 0 ? (
                            fundingRounds.map((round) => (
                                <TableRow key={round.id}>
                                    <TableCell>{new Date(round.closedDate).toLocaleDateString()}</TableCell>
                                    <TableCell>{round.fundingType}</TableCell>
                                    <TableCell>{round.moneyRaised ? `${round.moneyRaisedCurrency} ${round.moneyRaised.toLocaleString()}` : '---'}</TableCell>
                                    <TableCell>{round.targetFunding ? `${round.moneyRaisedCurrency} ${round.targetFunding.toLocaleString()}` : '---'}</TableCell>
                                    <TableCell>{round.targetFunding ? `${round.moneyRaisedCurrency} ${round.targetFunding.toLocaleString()}` : '---'}</TableCell>
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={5}><Typography variant="body2" color="textSecondary">No funding rounds available.</Typography></TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="primary">Close</Button>
            </DialogActions>
        </Dialog>
    );
}

export default FundingHistoryDialog;
