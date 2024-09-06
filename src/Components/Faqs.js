import React from 'react';
import { Typography, Toolbar, Box, Accordion, AccordionSummary, AccordionDetails } from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Navbar from "../Navbar/Navbar";

const drawerWidth = 280;

function Faqs() {
    return (
        <>
            <Navbar />
            <Toolbar />
            <Box sx={{ width: '100%', paddingLeft: `${drawerWidth}px`, pt: '50px', pr: '50px' }}>
                <Typography variant="h4" gutterBottom>
                    Frequently Asked Questions (FAQs)
                </Typography>
                <Accordion>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                        <Typography variant="h6">What is a startup investment?</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography>
                            A startup investment refers to the process of providing capital to a newly established company or business. This funding helps startups grow their operations, develop products, and reach their market.
                        </Typography>
                    </AccordionDetails>
                </Accordion>
                
                <Accordion>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                        <Typography variant="h6">What types of investments are available for startups?</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography>
                            Startups can receive several types of investments, including angel investments, venture capital, seed funding, and crowdfunding. Each type has its own benefits and criteria.
                        </Typography>
                    </AccordionDetails>
                </Accordion>

                <Accordion>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                        <Typography variant="h6">How do I evaluate a startup for investment?</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography>
                            Evaluating a startup involves analyzing the business model, market potential, team experience, financial projections, and competitive landscape. It's crucial to conduct thorough due diligence before making an investment decision.
                        </Typography>
                    </AccordionDetails>
                </Accordion>

                <Accordion>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                        <Typography variant="h6">What are the risks involved in startup investments?</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography>
                            Investing in startups carries inherent risks, including high failure rates, market volatility, and uncertain returns. It's important to diversify investments and be prepared for the possibility of losing the entire investment.
                        </Typography>
                    </AccordionDetails>
                </Accordion>
                
                <Accordion>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                        <Typography variant="h6">How can I get started with investing in startups?</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography>
                            To get started with investing in startups, you can research various funding platforms, network with entrepreneurs and investors, and seek advice from financial advisors. It's also helpful to understand the legal and financial aspects of startup investing.
                        </Typography>
                    </AccordionDetails>
                </Accordion>

                <Accordion>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                        <Typography variant="h6">How can I get started with investing in startups?</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography>
                            To get started with investing in startups, you can research various funding platforms, network with entrepreneurs and investors, and seek advice from financial advisors. It's also helpful to understand the legal and financial aspects of startup investing.
                        </Typography>
                    </AccordionDetails>
                </Accordion>

                <Accordion>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                        <Typography variant="h6">How can I get started with investing in startups?</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography>
                            To get started with investing in startups, you can research various funding platforms, network with entrepreneurs and investors, and seek advice from financial advisors. It's also helpful to understand the legal and financial aspects of startup investing.
                        </Typography>
                    </AccordionDetails>
                </Accordion>

                <Accordion>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                        <Typography variant="h6">How can I get started with investing in startups?</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography>
                            To get started with investing in startups, you can research various funding platforms, network with entrepreneurs and investors, and seek advice from financial advisors. It's also helpful to understand the legal and financial aspects of startup investing.
                        </Typography>
                    </AccordionDetails>
                </Accordion>

                <Accordion>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                        <Typography variant="h6">How can I get started with investing in startups?</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography>
                            To get started with investing in startups, you can research various funding platforms, network with entrepreneurs and investors, and seek advice from financial advisors. It's also helpful to understand the legal and financial aspects of startup investing.
                        </Typography>
                    </AccordionDetails>
                </Accordion>

                <Accordion>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                        <Typography variant="h6">How can I get started with investing in startups?</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography>
                            To get started with investing in startups, you can research various funding platforms, network with entrepreneurs and investors, and seek advice from financial advisors. It's also helpful to understand the legal and financial aspects of startup investing.
                        </Typography>
                    </AccordionDetails>
                </Accordion>
            </Box>
        </>
    );
}

export default Faqs;
