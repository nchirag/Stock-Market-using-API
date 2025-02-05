import React, { useState } from 'react';
import axios from 'axios';
import { Line } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
import { Container, TextField, Button, Typography, Box } from '@mui/material';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';

Chart.register(...registerables);

const Apps = () => {
  const [stockData, setStockData] = useState([]);
  const [symbol, setSymbol] = useState('AAPL');
  const [startDate, setStartDate] = useState(dayjs().subtract(1, 'month'));
  const [endDate, setEndDate] = useState(dayjs());
  const [loading, setLoading] = useState(false);

  const fetchStockData = async () => {
    try {
      setLoading(true);
      const formattedStartDate = startDate.format('YYYY-MM-DD');
      const formattedEndDate = endDate.format('YYYY-MM-DD');
  
      const today = dayjs().format('YYYY-MM-DD');
      if (formattedEndDate > today) {
        alert("End date cannot be in the future.");
        return;
      }
  
      console.log(`Fetching stock data for ${symbol} from ${formattedStartDate} to ${formattedEndDate}`);
  
      const response = await axios.get(`http://127.0.0.1:5000/stock/${symbol}`, {
        params: { start_date: formattedStartDate, end_date: formattedEndDate },
      });
  
      setStockData(response.data);
    } catch (error) {
      console.error('Error fetching stock data:', error);
    } finally {
      setLoading(false);
    }
  };

  const calculateMovingAverage = (data, windowSize) => {
    return data.map((_, index, arr) => {
      if (index < windowSize - 1) return null;
      const slice = arr.slice(index - windowSize + 1, index + 1);
      return slice.reduce((acc, val) => acc + val.Close, 0) / windowSize;
    });
  };

  const movingAverage7 = calculateMovingAverage(stockData, 7);
  const movingAverage30 = calculateMovingAverage(stockData, 30);

  const chartData = {
    labels: stockData.map((data) => data.Date),
    datasets: [
      {
        label: 'Closing Price',
        data: stockData.map((data) => data.Close),
        borderColor: 'rgba(99, 102, 241, 1)',
        backgroundColor: 'rgba(99, 102, 241, 0.1)',
        fill: true,
        tension: 0.4,
        borderWidth: 2,
      },
      {
        label: 'Opening Price',
        data: stockData.map((data) => data.Open),
        borderColor: 'rgba(34, 197, 94, 1)',
        backgroundColor: 'rgba(34, 197, 94, 0.1)',
        fill: false,
        borderWidth: 2,
      },
      {
        label: 'High Price',
        data: stockData.map((data) => data.High),
        borderColor: 'rgba(245, 158, 11, 1)',
        backgroundColor: 'rgba(245, 158, 11, 0.1)',
        fill: false,
        borderWidth: 2,
      },
      {
        label: 'Low Price',
        data: stockData.map((data) => data.Low),
        borderColor: 'rgba(239, 68, 68, 1)',
        backgroundColor: 'rgba(239, 68, 68, 0.1)',
        fill: false,
        borderWidth: 2,
      },
      {
        label: '7-day Moving Average',
        data: movingAverage7,
        borderColor: 'rgba(59, 130, 246, 1)',
        borderDash: [5, 5],
        fill: false,
        borderWidth: 2,
      },
      {
        label: '30-day Moving Average',
        data: movingAverage30,
        borderColor: 'rgba(107, 114, 128, 1)',
        borderDash: [5, 5],
        fill: false,
        borderWidth: 2,
      }
    ],
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Container>
          <Box sx={{ py: 6, px: 4, borderRadius: 2, bgcolor: 'white', boxShadow: 3, my: 4 }}>
            <Typography variant="h4" gutterBottom sx={{ fontWeight: 700, textAlign: 'center' }}>
              Stock Market Analysis
            </Typography>
            
            <Box sx={{ display: 'flex', gap: 2, mb: 4, flexDirection: { xs: 'column', md: 'row' }, alignItems: 'center' }}>
              <TextField
                label="Stock Symbol"
                value={symbol}
                onChange={(e) => setSymbol(e.target.value.toUpperCase())}
                variant="outlined"
                fullWidth
              />
              <DatePicker label="Start Date" value={startDate} onChange={(newValue) => setStartDate(newValue)} />
              <DatePicker label="End Date" value={endDate} onChange={(newValue) => setEndDate(newValue)} />
              <Button variant="contained" onClick={fetchStockData} disabled={loading} sx={{ minWidth: '150px' }}>
                {loading ? 'Loading...' : 'Fetch Data'}
              </Button>
            </Box>
            
            <Box sx={{ height: '400px', p: 2, bgcolor: 'white', borderRadius: 1, border: '1px solid', borderColor: 'grey.200' }}>
              {stockData.length > 0 ? (
                <Line data={chartData} options={{ responsive: true, maintainAspectRatio: false }} />
              ) : (
                <Box sx={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Typography color="text.secondary" sx={{ textAlign: 'center', fontSize: '1.1rem' }}>
                    Enter a stock symbol and date range to visualize data
                  </Typography>
                </Box>
              )}
            </Box>
          </Box>
        </Container>
      </LocalizationProvider>
    </div>
  );
};

export default Apps;
