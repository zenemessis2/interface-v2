import React, { useState, useEffect } from 'react';
import { Box, Grid } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import Skeleton from '@material-ui/lab/Skeleton';
import { ArrowForwardIos } from '@material-ui/icons';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import { useGlobalData } from 'state/application/hooks';
import {
  getEthPrice,
  getTopPairs,
  getTopTokens,
  getGlobalData,
  getBulkPairData,
} from 'utils';
import { GlobalConst } from 'constants/index';
import { TokensTable, PairTable } from 'components';
import AnalyticsInfo from './AnalyticsInfo';
import AnalyticsLiquidityChart from './AnalyticsLiquidityChart';
import AnalyticsVolumeChart from './AnalyticsVolumeChart';

dayjs.extend(utc);

const AnalyticsOverview: React.FC = () => {
  const history = useHistory();
  const { globalData, updateGlobalData } = useGlobalData();
  const [topTokens, updateTopTokens] = useState<any[] | null>(null);
  const [topPairs, updateTopPairs] = useState<any[] | null>(null);

  useEffect(() => {
    const fetchGlobalData = async () => {
      const [newPrice, oneDayPrice] = await getEthPrice();
      const globalData = await getGlobalData(newPrice, oneDayPrice);
      if (globalData) {
        updateGlobalData({ data: globalData });
      }
    };
    const fetchTopTokens = async () => {
      updateTopTokens(null);
      const [newPrice, oneDayPrice] = await getEthPrice();
      const topTokensData = await getTopTokens(
        newPrice,
        oneDayPrice,
        GlobalConst.utils.ROWSPERPAGE,
      );
      if (topTokensData) {
        updateTopTokens(topTokensData);
      }
    };
    const fetchTopPairs = async () => {
      updateTopPairs(null);
      const [newPrice] = await getEthPrice();
      const pairs = await getTopPairs(GlobalConst.utils.ROWSPERPAGE);
      const formattedPairs = pairs
        ? pairs.map((pair: any) => {
            return pair.id;
          })
        : [];
      const pairData = await getBulkPairData(formattedPairs, newPrice);
      if (pairData) {
        updateTopPairs(pairData);
      }
    };
    fetchGlobalData();
    fetchTopTokens();
    fetchTopPairs();
  }, [updateGlobalData, updateTopTokens, updateTopPairs]);

  return (
    <Box width='100%' mb={3}>
      <Grid container spacing={4}>
        <Grid item xs={12} sm={12} md={6}>
          <Box className='panel' width={1}>
            <AnalyticsLiquidityChart />
          </Box>
        </Grid>
        <Grid item xs={12} sm={12} md={6}>
          <Box
            className='panel'
            width={1}
            height={1}
            display='flex'
            flexDirection='column'
            justifyContent='space-between'
          >
            <AnalyticsVolumeChart />
          </Box>
        </Grid>
      </Grid>
      <Box mt={4}>
        <Box display='flex' flexWrap='wrap' className='panel'>
          {globalData ? (
            <AnalyticsInfo data={globalData} />
          ) : (
            <Skeleton width='100%' height={20} />
          )}
        </Box>
      </Box>
      <Box mt={4}>
        <Box display='flex' justifyContent='space-between' alignItems='center'>
          <Box className='headingWrapper'>
            <p className='weight-600'>Top Tokens</p>
          </Box>
          <Box
            className='headingWrapper'
            style={{ cursor: 'pointer' }}
            onClick={() => history.push(`/analytics/tokens`)}
          >
            <p className='weight-600'>See All</p>
            <ArrowForwardIos />
          </Box>
        </Box>
      </Box>
      <Box mt={3} className='panel'>
        {topTokens ? (
          <TokensTable data={topTokens} />
        ) : (
          <Skeleton variant='rect' width='100%' height={150} />
        )}
      </Box>
      <Box mt={4}>
        <Box display='flex' justifyContent='space-between' alignItems='center'>
          <Box className='headingWrapper'>
            <p className='weight-600'>Top Pairs</p>
          </Box>
          <Box
            className='headingWrapper'
            style={{ cursor: 'pointer' }}
            onClick={() => history.push(`/analytics/pairs`)}
          >
            <p className='weight-600'>See All</p>
            <ArrowForwardIos />
          </Box>
        </Box>
      </Box>
      <Box mt={3} className='panel'>
        {topPairs ? (
          <PairTable data={topPairs} />
        ) : (
          <Skeleton variant='rect' width='100%' height={150} />
        )}
      </Box>
    </Box>
  );
};

export default AnalyticsOverview;
