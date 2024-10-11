// steps.js
import { Box, Typography, Grid } from "@mui/material";

const steps = [
    {   
        label: "Overview", 
        content: (
            <Box>
                <Typography variant="body1" textAlign='justify'>
                    Startup Vest is a dynamic platform designed to bridge the gap between startup owners and investors, providing a comprehensive solution for both parties. Whether you're a startup owner seeking funding or an investor looking for high-potential ventures, Startup Vest offers a streamlined, user-friendly environment.
                </Typography>

                <Grid container spacing={2} sx={{ mt: 1 }}>
                    <Grid item xs={12}>
                        <Typography variant="body2" textAlign='justify' sx={{ mb: 1}}>
                            As a <b>startup owner</b> on Startup Vest, you can manage your investors and fundraising more easily. You can track important details like how many shares investors have bought, their job titles, and what percentage of your company they own. It also lets you see which investors are interested in investing and gives you the option to accept or reject their offers. Additionally, you can keep your startup profile updated and monitor your funding rounds to stay organized.
                        </Typography>
                        <img src="/images/startupdashboard.png" alt="user dashboard" style={{ width: '100%', borderRadius: '8px' }} /> 
                    </Grid>

                    <Grid item xs={12}>
                        <Typography variant="body2" textAlign='justify' sx={{ mb: 1}}>Funding Round Tab</Typography>
                        <img src="/images/startupfundinground.png" alt="starup funding round tab" style={{ width: '100%', borderRadius: '8px' }} /> 
                    </Grid>

                    <Grid item xs={12}>
                        <Typography variant="body2" textAlign='justify' sx={{ mb: 1}}>Profile Tab</Typography>
                        <img src="/images/startupprofile.png" alt="starup profile tab" style={{ width: '100%', borderRadius: '8px' }} />  
                    </Grid>

                    <Grid item xs={12}> 
                        <Typography variant="body2" textAlign='justify' sx={{ mb: 1}}>Cap Table Tab</Typography>
                        <img src="/images/startupcaptable.png" alt="starup cap table tab" style={{ width: '100%', borderRadius: '8px' }} />  
                    </Grid>

                    <Grid item xs={12}>
                        <Typography variant="body2" textAlign='justify' sx={{ mb: 1}}>Investor Request Tab</Typography> 
                        <img src="/images/startuprequest.png" alt="starup investor request tab" style={{ width: '100%', borderRadius: '8px' }} />  
                    </Grid>

                    <Grid item xs={12}>
                        <Typography variant="body2" textAlign='justify' sx={{ mt: 1, mb: 1 }}>
                            As an <b>investor</b> on Startup Vest, you can create a profile to explore startups that match your interests, view detailed funding round information, and track your investments, including the amount invested and potential returns based on the company's performance.
                        </Typography>
                        <img src="/images/investorinvest.png" alt="investor request tab" style={{ width: '100%', borderRadius: '8px' }} />  
                    </Grid>

                    <Grid item xs={12}>
                        <Typography variant="body2" textAlign='justify' sx={{ mt: 1, mb: 1 }}>
                            Additionally, you have the opportunity to directly invest in a company if you choose to do so, allowing you to actively participate in the growth of promising startups.
                        </Typography>
                        <img src="/images/investordirectinvest.png" alt="investor directly invest to a company" style={{ width: '100%', borderRadius: '8px' }} />  
                        <img src="/images/investorrequest.png" alt="investor investment tab" style={{ width: '100%', borderRadius: '8px' }} />  
                    </Grid>
                </Grid>
            </Box>
        ) 
    },
    {   
        label: "Create Business Profile", 
        content: (
            <Box>
                <Typography variant="body1">
                    With StartUp Vest, you can create a detailed business profile as either a startup owner or an investor. 
                </Typography>

                <Grid container spacing={2} sx={{ mt: 1 }}>
                    <Grid item xs={12}>
                            <Typography variant="body2" sx={{ mt: 1, mb: 1, fontWeight: 'bold' }}>
                                Step 1: Click 'create' button and select business profile
                            </Typography>
                            <img src="/images/createprofile.png" alt="create profile button" style={{ width: '100%', borderRadius: '8px' }} />
                            <Typography variant="body2" sx={{ mt: 2,  mb: 1, fontWeight: 'bold' }}>
                                Step 2: Click the profile you want to create
                            </Typography>
                            <img src="/images/profiletype.png" alt="Choose between startup or investor profile" style={{ width: '100%', borderRadius: '8px' }} />    
                    </Grid>

                    <Grid item xs={12}>
                        <Typography variant="body2" sx={{  mt: 1, fontWeight: 'bold' }}>
                           Step 3: Fill up the form
                        </Typography>
                    </Grid>

                    <Grid item xs={12} md={6}>
                            <Typography variant="body2" gutterBottom>Startup Owner Form</Typography>
                            <img src="/images/profilestartup.png" alt="startup profile form" style={{ width: '100%', borderRadius: '8px' }} />
                    </Grid>
                    
                    <Grid item xs={12} md={6}>
                            <Typography variant="body2" gutterBottom>Investor Form</Typography>
                            <img src="/images/profileinvestor.png" alt="investor profile form" style={{ width: '100%', borderRadius: '8px' }} />
                    </Grid>
                </Grid>
            </Box>
        ) 
    },
    {   
        label: "Create Funding Round", 
        content: (
            <Box>
                <Typography variant="body1">
                    To set up a funding round on Startup Vest, startup owners must first create a startup profile. This ensures that all essential information about the company is ready and accessible, giving potential investors the insights they need before engaging in the funding process.
                </Typography>

                <Grid container spacing={2} sx={{ mt: 1, mb: 1 }}>
                    <Grid item xs={12}>
                            <Typography variant="body2" sx={{ mt: 1, mb: 1, fontWeight: 'bold' }}>
                                Step 1: Click 'create' button and select funding round
                            </Typography>
                            <img src="/images/createfundinground.png" alt="Create Funding Round Button" style={{ width: '100%', borderRadius: '8px' }} />
                            <Typography variant="body2" sx={{ mt: 2, mb: 1, fontWeight: 'bold' }}>
                                Step 2: Fill up the form
                            </Typography>
                            <img src="/images/fundingroundform.png" alt="Funding Round Form" style={{ width: '100%', borderRadius: '8px' }} />    
                    </Grid>
                </Grid>
            </Box>
        ) 
    },
];

export default steps;