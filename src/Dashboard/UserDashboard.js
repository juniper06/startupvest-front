import { useEffect, useState } from 'react';
import axios from 'axios';
import StarsIcon from '@mui/icons-material/Stars';
import { Box, Typography, Toolbar, Grid, Button, Menu, MenuItem,Tabs, Tab, ListItemText, ListItem } from '@mui/material';
import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state';
import StarIcon from '@mui/icons-material/Star';
import Person2Icon from '@mui/icons-material/Person2';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOnRounded';

import Navbar from "../Navbar/Navbar";
import CreateFundingRoundDialog from '../Dialogs/CreateFundingRoundDialog';
import CreateBusinessProfileDialog from '../Dialogs/CreateBusinessProfileDialog';
import BusinessProfileTable from '../Tables/BusinessProfileTable';
import FundingRoundTable from '../Tables/FundingRoundTable';
import CapTable from '../Tables/CapTableTable';

import { Container, HeaderBox, StatsBox, RecentActivityBox, RecentActivityList, TopInfoBox, TopInfoIcon, TopInfoText, TopInfoTitle, CreateButton, GraphTitle, RecentActivityTitle} from '../styles/UserDashboard';

function UserDashboard() {
    const [tabValue, setTabValue] = useState(1);

    // PROFILE
    const [openCreateBusinessProfile, setCreateBusinessProfile] = useState(false);
    const [businessProfiles, setBusinessProfiles] = useState([]);
    const [selectedBusinessProfile, setSelectedBusinessProfile] = useState(null);
    const [openViewStartup, setOpenViewStartup] = useState(false);
    const [openViewInvestor, setOpenViewInvestor] = useState(false);
    const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
    const [profileToDelete, setProfileToDelete] = useState(null);

    // FUNDING ROUND
    const [openCreateFundingRound, setOpenCreateFundingRound] = useState(false);
    const [fundingRounds, setFundingRounds] = useState([]);
    const [selectedFundingRoundDetails, setSelectedFundingRoundDetails] = useState(null);
    const [openViewFundingRound, setOpenViewFundingRound] = useState(false);
    const [filteredFundingRounds, setFilteredFundingRounds] = useState([]);

    // CAP TABLE
    const [selectedStartupCapTable, setSelectedStartupCapTable] = useState('Select Company');
    const [capTables, setCapTables] = useState([]);
    const [filteredCapTables, setFilteredCapTables] = useState([]);

    // COUNTS
    const [fundedCompaniesCount, setFundedCompaniesCount] = useState(0);
    const [companyCount, setCompanyCount] = useState(0);
    const [investorCount, setInvestorCount] = useState(0);
    // const [fundingRoundCount, setFundingRoundCount] = useState(0);
    const [totalAmountFunded, setTotalAmountFunded] = useState(0);
    const [fundingRoundsCount, setFundingRoundsCount] = useState(0);

    const [filteredFundingRoundsCount, setFilteredFundingRoundsCount] = useState(0);

    const [recentActivities, setRecentActivities] = useState([]);
    
    useEffect(() => {
        fetchBusinessProfiles();
        fetchFundingRounds();
        // fetchCapTable();
        fetchInvestorsByEachUsersCompany();

        const timer = setTimeout(() => {
            setTabValue(0);
        }, 1000);
        return () => clearTimeout(timer);
    }, []);

    const handleTabChange = (event, newValue) => {
        setTabValue(newValue);
    };

    // PROFILE
    const handleOpenBusinessProfile = () => {
        setCreateBusinessProfile(true);
    };
    
    const handleCloseBusinessProfile = () => {
        setCreateBusinessProfile(false);
        fetchBusinessProfiles();
    };

    const handleOpenStartUp = (profile) => {
        setSelectedBusinessProfile(profile);
        setOpenViewStartup(true);
    };
    
    const handleCloseStartUp = () => {
        setOpenViewStartup(false);
    };
    
    const handleOpenInvestor = (profile) => {
        setSelectedBusinessProfile(profile);
        setOpenViewInvestor(true);
    };    

    const handleCloseInvestor = () => {
        setOpenViewInvestor(false);
    };  
    
    const handleOpenDeleteDialog = (profile) => {
        setProfileToDelete(profile);
        setOpenDeleteDialog(true);
    };
    
    const handleCloseDeleteDialog = () => {
    setOpenDeleteDialog(false);
    };

    // Handler to update the total amount funded
    const handleTotalAmountFundedChange = (total) => {
        setTotalAmountFunded(total);
    };

    // Handler to update the funded rounds count
    const handleFundingRoundsCountChange = (count) => {
        setFundingRoundsCount(count);
    };

    const fetchBusinessProfiles = async () => {
        try {
            const responseStartups = await axios.get(`http://localhost:3000/startups`, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                },
            });

            const responseInvestors = await axios.get(`http://localhost:3000/investors`, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                },
            });

            const startups = responseStartups.data.filter(profile => !profile.isDeleted).map(profile => ({ ...profile, type: 'Startup' }));
            const investors = responseInvestors.data.filter(profile => !profile.isDeleted).map(profile => ({ ...profile, type: 'Investor' }));
    
            setBusinessProfiles([...investors, ...startups]);

            // Update counts
            setCompanyCount(startups.length);
            // setInvestorCount(investors.length);
        } catch (error) {
            console.error('Failed to fetch business profiles:', error);
        }
    };

    const handleSoftDelete = async () => {
        if (!profileToDelete) {
            console.error('No profile selected');
            return;
        }

        try {
            const endpoint = `http://localhost:3000/startups/${profileToDelete.id}/delete`;

            await axios.put(endpoint, {}, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                },
            });

            fetchBusinessProfiles();

            // Add recent activity
            setRecentActivities(prevActivities => [
                { action: 'Deleted Business Profile', description: `${profileToDelete.companyName} was deleted`, date: new Date().toLocaleDateString() },
                ...prevActivities.slice(0, 4) // Limit to 5 recent activities
            ]);
        } catch (error) {
            console.error('Failed to delete profile:', error);
        }
    };
    
    // FUNDING ROUND
    const handleOpenFundingRound = () => {
        setOpenCreateFundingRound(true);
    };

    const handleCloseFundingRound = () => {
        setOpenCreateFundingRound(false);
        fetchFundingRounds();

        // Add recent activity
        setRecentActivities(prevActivities => [
            { action: 'Created Funding Round', description: 'A new funding round was created', date: new Date().toLocaleDateString() },
            ...prevActivities.slice(0, 4) // Limit to 5 recent activities
        ]);
    };

    const handleCloseFundingProfile = () => {
        setOpenViewFundingRound(false);
        fetchFundingRounds();
    }

    const handleViewFundingRound = async (fundingRoundId) => {
        try {
            const response = await axios.get(`http://localhost:3000/funding-rounds/${fundingRoundId}`, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                },
            });
            console.log('Funding Round Details:', response.data);
            setSelectedFundingRoundDetails(response.data);
            setOpenViewFundingRound(true);
        } catch (error) {
            console.error('Error fetching funding round details:', error);
        }
    };

    const handleSoftDeleteFundingRound = async (fundingRoundId) => {
        try {
            await axios.delete(`http://localhost:3000/funding-rounds/${fundingRoundId}`, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });
            // Remove the deleted funding round from the state to update the UI
            const updatedFundingRounds = fundingRounds.filter(round => round.id !== fundingRoundId);
            setFundingRounds(updatedFundingRounds);
            setFilteredFundingRounds(updatedFundingRounds);

            // Add recent activity
            setRecentActivities(prevActivities => [
                { action: 'Delete Funding Round', description: 'A new funding round was deleted', date: new Date().toLocaleDateString() },
                ...prevActivities.slice(0, 4) // Limit to 5 recent activities
            ]);
        } catch (error) {
            console.error('Failed to soft delete funding round:', error);
        }
    };

    const fetchFundingRounds = async () => {
        try {
            const response = await axios.get('http://localhost:3000/funding-rounds/all', {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                },
            });
            setFundingRounds(response.data);
            setFilteredFundingRounds(response.data);
            // Calculate the total amount funded
            const totalFunded = fundingRounds.reduce((total, round) => total + round.amount, 0);
            setTotalAmountFunded(totalFunded);
            setFilteredFundingRoundsCount(filteredFundingRounds.length);
        } catch (error) {
            console.error('Error fetching funding rounds:', error);
        }
    };

    // CAP TABLE
    useEffect(() => {
        if (selectedStartupCapTable === 'Select Company') {
            fetchInvestorsByEachUsersCompany();
        } else {
            // fetchCapTable(selectedStartupCapTable);
        }
    }, [selectedStartupCapTable]);
    

    const fetchInvestorsByEachUsersCompany = async (companyId) => {
        try {
            const response = await axios.get(`http://localhost:3000/funding-rounds/${companyId}/investors/all`, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                },
            });
            setCapTables(response.data);
            setFilteredCapTables(response.data);
            setInvestorCount(response.data.length);
        } catch (error) {
            console.error('Error fetching funding rounds:', error);
        }
    };

    const handleStartupChangeCapTable = (event) => {
        const selectedCompanyId = event.target.value;
        setSelectedStartupCapTable(selectedCompanyId);
        // fetchCapTable(selectedCompanyId);
        fetchInvestorsByEachUsersCompany(selectedCompanyId);
    };

    return (
        <>
            <Navbar />
            <Toolbar />

            <Container>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <HeaderBox>
                            <Typography variant="h5">User Dashboard</Typography>
                            <PopupState variant="popover" popupId="demo-popup-menu">
                                {(popupState) => (
                                    <>
                                        <CreateButton startIcon={<StarsIcon />} {...bindTrigger(popupState)}>Create</CreateButton>
                                        <Menu {...bindMenu(popupState)}>
                                            <MenuItem onClick={() => 
                                                {handleOpenBusinessProfile(); popupState.close(); }}>
                                                    <Person2Icon sx={{ mr: 1, color: '#007490'}}/>Business Profile
                                                    </MenuItem>
                                            <MenuItem onClick={() => 
                                                {handleOpenFundingRound(); popupState.close();}}>
                                                    <MonetizationOnIcon sx={{ mr: 1, color: '#007490'}}/>Funding Round
                                            </MenuItem>
                                        </Menu>
                                    </>
                                )}
                            </PopupState>
                        </HeaderBox>
                    </Grid>

                    {/* Top Row - 5 Boxes */}
                    <Grid item xs={12} sm={6}>
                        <TopInfoBox>
                            <TopInfoIcon>
                                <StarIcon sx={{ color: '#005b6e' }} />
                            </TopInfoIcon>
                            <TopInfoText>Highest-Funded Company</TopInfoText>
                            <TopInfoTitle>Shell Company</TopInfoTitle>
                        </TopInfoBox>
                    </Grid>

                    <Grid item xs={12} sm={6}>
                        <TopInfoBox>
                            <TopInfoIcon>
                                <Person2Icon sx={{ color: '#005b6e' }} />
                            </TopInfoIcon>
                            <TopInfoText>Top Investment Contributor</TopInfoText>
                            <TopInfoTitle>Hazelyn Balingcasag</TopInfoTitle>
                        </TopInfoBox>
                    </Grid>

                    <Grid item xs={12} sm={3}>
                        <StatsBox>
                            <TopInfoText>Funded Companies</TopInfoText>
                            <TopInfoTitle>{fundingRoundsCount} out of {companyCount}</TopInfoTitle>
                        </StatsBox>
                    </Grid>

                    <Grid item xs={12} sm={2}>
                        <StatsBox>
                            <TopInfoText>Company Count</TopInfoText>
                            <TopInfoTitle>{companyCount}</TopInfoTitle>
                        </StatsBox>
                    </Grid>

                    <Grid item xs={12} sm={2}>
                        <StatsBox>
                            <TopInfoText>Investor Count</TopInfoText>
                            <TopInfoTitle>{investorCount}</TopInfoTitle>
                        </StatsBox>
                    </Grid>

                    <Grid item xs={12} sm={2}>
                        <StatsBox>
                            <TopInfoText>Funding Rounds</TopInfoText>
                            <TopInfoTitle>{fundingRoundsCount}</TopInfoTitle>
                        </StatsBox>
                    </Grid>

                    <Grid item xs={12} sm={3}>
                        <StatsBox>
                            <TopInfoText>Total Amount Funded</TopInfoText>
                            <TopInfoTitle>{totalAmountFunded.toLocaleString()}</TopInfoTitle>
                        </StatsBox>
                    </Grid>

                    {/* Middle Row - Two Boxes */}
                    <Grid item xs={12} sm={9}>
                        <Box sx={{ backgroundColor: 'white', height: 420, display: 'flex', flexDirection: 'column', borderRadius: 2, boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', overflow: 'hidden' }}>
                            <GraphTitle variant="h6">Total Investment Graph</GraphTitle>
                        </Box>
                    </Grid>

                    <Grid item xs={12} sm={3}>
                        <RecentActivityBox>
                            <RecentActivityTitle variant="h6">Recent Activity</RecentActivityTitle>
                            <RecentActivityList>
                                {recentActivities.length === 0 ? (
                                    <ListItem>
                                        <ListItemText primary="No recent activity" />
                                    </ListItem>
                                ) : (
                                    recentActivities.map((activity, index) => (
                                        <ListItem key={index}>
                                            <ListItemText primary={activity.action} secondary={`${activity.description} - ${activity.date}`} />
                                        </ListItem>
                                    ))
                                )}
                            </RecentActivityList>
                        </RecentActivityBox>
                    </Grid>

                    <Grid item xs={12}>
                    <Tabs value={tabValue} onChange={handleTabChange} aria-label="tabs" sx={{ mt: 2, '& .MuiTabs-indicator': { backgroundColor: '#007490' } }}>
                        <Tab label="My Profile" sx={{ color: tabValue === 0 ? '#007490' : 'text.secondary', '&.Mui-selected': {
                            color: '#007490' } }}/>
                        <Tab label="My Funding Round" sx={{ color: tabValue === 1 ? '#007490' : 'text.secondary', '&.Mui-selected': {
                            color: '#007490' } }}/>
                        <Tab label="My Captable" sx={{ color: tabValue === 2 ? '#007490' : 'text.secondary', '&.Mui-selected': {
                            color: '#007490' } }}/>
                    </Tabs>

                    <Box sx={{ pt: 3}}>
                        {tabValue === 0 && (
                            <BusinessProfileTable 
                                businessProfiles={businessProfiles}
                                handleOpenStartUp={handleOpenStartUp}
                                handleOpenInvestor={handleOpenInvestor}
                                handleOpenDeleteDialog={handleOpenDeleteDialog}
                                selectedBusinessProfile={selectedBusinessProfile}
                                openViewStartup={openViewStartup}
                                openViewInvestor={openViewInvestor}
                                openDeleteDialog={openDeleteDialog}
                                handleCloseStartUp={handleCloseStartUp}
                                handleCloseInvestor={handleCloseInvestor}
                                handleCloseDeleteDialog={handleCloseDeleteDialog}
                                handleSoftDelete={handleSoftDelete}
                                profileToDelete={profileToDelete}/>                            
                            )}
                            
                            {tabValue === 1 && (
                                <FundingRoundTable 
                                    filteredFundingRounds={filteredFundingRounds}
                                    fundingRounds={fundingRounds}
                                    handleViewFundingRound={handleViewFundingRound}
                                    handleSoftDeleteFundingRound={handleSoftDeleteFundingRound}
                                    selectedFundingRoundDetails={selectedFundingRoundDetails}
                                    openViewFundingRound={openViewFundingRound}
                                    handleCloseFundingRound={handleCloseFundingRound}
                                    handleCloseFundingProfile={handleCloseFundingProfile}
                                    businessProfiles={businessProfiles}
                                    onTotalAmountFundedChange={handleTotalAmountFundedChange}
                                    onFundingRoundsCountChange={handleFundingRoundsCountChange} />
                            )}

                            {tabValue === 2 && (
                            <CapTable 
                                filteredCapTables={filteredCapTables}
                                businessProfiles={businessProfiles} 
                                selectedStartupCapTable={selectedStartupCapTable} 
                                handleStartupChangeCapTable={handleStartupChangeCapTable} />
                            )}
                    </Box>
                    </Grid>
                
                </Grid>

                <CreateBusinessProfileDialog open={openCreateBusinessProfile} onClose={handleCloseBusinessProfile} />
                <CreateFundingRoundDialog open={openCreateFundingRound} onClose={handleCloseFundingRound} />
            </Container>
        </>
    );
}

export default UserDashboard;