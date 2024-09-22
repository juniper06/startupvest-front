// src/styles.js
import styled from '@emotion/styled';
import { Box, Typography, Button, List } from '@mui/material';

const drawerWidth = 270;

export const Container = styled(Box)`
  display: flex;
  flex-grow: 1;
  padding-right: 35px;
  padding-top: 50px;
  padding-bottom: 8px;
  padding-left: ${`${drawerWidth}px`};
  overflow-x: hidden;
  margin-bottom: 50px;
`;

export const HeaderBox = styled(Box)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1px;
`;

export const StatsBox = styled(Box)`
  background: linear-gradient(to bottom, #0093d0, #00779d, #005b6e);
  color: white;
  height: 70px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-radius: 2px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

export const RecentActivityBox = styled(Box)`
  background-color: white;
  height: 420px;
  display: flex;
  flex-direction: column;
  border-radius: 2px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  overflow: hidden;
`;

export const RecentActivityTitle = styled(Typography)`
    background: linear-gradient(135deg, #0093d0, #005b6e);
    font-weight: bold;
    padding: 10px;
    color: #f2f2f2;
`;

export const RecentActivityList = styled(List)`
  padding-left: 1px;
  overflow-y: auto;
  flex: 1;
`;

export const TopInfoBox = styled(Box)`
  background: linear-gradient(135deg, #0093d0, #005b6e);
  height: 70px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-radius: 3px;
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.4);
  border: 1px solid rgba(255, 255, 255, 0.2);
  position: relative;
  overflow: hidden;
`;

export const TopInfoIcon = styled(Box)`
  position: absolute;
  top: 12px;
  right: 15px;
  width: 45px;
  height: 45px;
  border-radius: 50%;
  background-color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.4);
  z-index: 1;
  transition: transform 0.3s, box-shadow 0.3s;
  &:hover {
    box-shadow: 0 12px 24px rgba(240, 240, 240, 0.8);
  }
`;

export const TopInfoText = styled(Typography)`
  color: #ffffff;
  text-align: center;
  font-size: 14px;
  margin-bottom: 0.5px;
`;

export const TopInfoTitle = styled(Typography)`
  color: #ffffff;
  font-weight: bold;
  text-align: center;
`;

export const CreateButton = styled(Button)`
  width: 150px;
  background-color: #007490;
  color: #f2f2f2;
  &:hover {
    box-shadow: 0 0 10px rgba(0,0,0,0.5);
    background-color: rgba(0, 116, 144, 1);
  }
`;

export const GraphTitle = styled(Typography)`
  font-weight: bold;
  padding: 20px;
`;
