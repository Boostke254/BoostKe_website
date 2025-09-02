import React, { useState, useEffect } from 'react';
import {
  Box,
  Paper,
  Typography,
  Grid,
  Card,
  CardContent,
  List,
  ListItem,
  ListItemText,
  Chip,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  FormControl,
  Select,
  MenuItem,
  InputLabel,
  CircularProgress,
  Alert
} from '@mui/material';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import SearchIcon from '@mui/icons-material/Search';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import AnalyticsIcon from '@mui/icons-material/Analytics';
import axios from '../api/axios';

const SearchAnalyticsDashboard = () => {
  const [trends, setTrends] = useState([]);
  const [popularSearches, setPopularSearches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [timePeriod, setTimePeriod] = useState(30);

  useEffect(() => {
    fetchAnalyticsData();
  }, [timePeriod]);

  const fetchAnalyticsData = async () => {
    try {
      setLoading(true);
      setError(null);

      const [trendsResponse, popularResponse] = await Promise.allSettled([
        axios.get(`/search/analytics/trends?days=${timePeriod}&limit=20`),
        axios.get('/search/suggestions/popular?limit=15')
      ]);

      if (trendsResponse.status === 'fulfilled') {
        setTrends(trendsResponse.value.data.trends || []);
      }

      if (popularResponse.status === 'fulfilled') {
        setPopularSearches(popularResponse.value.data.suggestions || []);
      }

    } catch (err) {
      console.error('Failed to fetch analytics data:', err);
      setError('Failed to load analytics data');
    } finally {
      setLoading(false);
    }
  };

  const formatChartData = (data) => {
    return data.slice(0, 10).map(item => ({
      name: item.search_query,
      searches: item.search_count,
      avgResults: Math.round(item.avg_results || 0)
    }));
  };

  const getCategoryData = () => {
    const categoryMap = {};
    popularSearches.forEach(search => {
      const category = search.category || 'Other';
      categoryMap[category] = (categoryMap[category] || 0) + search.search_count;
    });

    return Object.entries(categoryMap).map(([name, value]) => ({
      name,
      value
    }));
  };

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 400 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Alert severity="error" sx={{ m: 2 }}>
        {error}
      </Alert>
    );
  }

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
        <AnalyticsIcon sx={{ mr: 2 }} />
        Search Analytics Dashboard
      </Typography>

      {/* Time Period Selector */}
      <Box sx={{ mb: 3 }}>
        <FormControl size="small" sx={{ minWidth: 200 }}>
          <InputLabel>Time Period</InputLabel>
          <Select
            value={timePeriod}
            onChange={(e) => setTimePeriod(e.target.value)}
            label="Time Period"
          >
            <MenuItem value={7}>Last 7 days</MenuItem>
            <MenuItem value={30}>Last 30 days</MenuItem>
            <MenuItem value={90}>Last 90 days</MenuItem>
            <MenuItem value={365}>Last year</MenuItem>
          </Select>
        </FormControl>
      </Box>

      <Grid container spacing={3}>
        {/* Summary Cards */}
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" color="primary" gutterBottom>
                Total Searches
              </Typography>
              <Typography variant="h3" color="text.primary">
                {trends.reduce((sum, item) => sum + item.search_count, 0).toLocaleString()}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                in the last {timePeriod} days
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" color="primary" gutterBottom>
                Unique Queries
              </Typography>
              <Typography variant="h3" color="text.primary">
                {trends.length}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                distinct search terms
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" color="primary" gutterBottom>
                Avg Results per Search
              </Typography>
              <Typography variant="h3" color="text.primary">
                {trends.length > 0 
                  ? Math.round(trends.reduce((sum, item) => sum + (item.avg_results || 0), 0) / trends.length)
                  : 0
                }
              </Typography>
              <Typography variant="body2" color="text.secondary">
                average results found
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Search Trends Chart */}
        <Grid item xs={12} lg={8}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Top Search Terms (Last {timePeriod} days)
            </Typography>
            <ResponsiveContainer width="100%" height={400}>
              <BarChart data={formatChartData(trends)}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis 
                  dataKey="name" 
                  angle={-45}
                  textAnchor="end"
                  height={100}
                  fontSize={12}
                />
                <YAxis />
                <Tooltip />
                <Bar dataKey="searches" fill="#1976d2" />
              </BarChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>

        {/* Category Distribution */}
        <Grid item xs={12} lg={4}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Search Categories
            </Typography>
            <ResponsiveContainer width="100%" height={400}>
              <PieChart>
                <Pie
                  data={getCategoryData()}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {getCategoryData().map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>

        {/* Popular Searches List */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
              <TrendingUpIcon sx={{ mr: 1 }} />
              Trending Searches
            </Typography>
            <List>
              {popularSearches.slice(0, 10).map((search, index) => (
                <ListItem key={index} divider>
                  <ListItemText
                    primary={
                      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <Typography variant="body1">{search.suggestion_text}</Typography>
                        <Box>
                          <Chip 
                            label={`${search.search_count} searches`} 
                            size="small"
                            color="primary"
                            sx={{ mr: 1 }}
                          />
                          {search.is_trending && (
                            <Chip 
                              label="Trending" 
                              size="small"
                              color="secondary"
                              icon={<TrendingUpIcon />}
                            />
                          )}
                        </Box>
                      </Box>
                    }
                    secondary={search.category && `Category: ${search.category}`}
                  />
                </ListItem>
              ))}
            </List>
          </Paper>
        </Grid>

        {/* Search Results Table */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Search Performance
            </Typography>
            <TableContainer sx={{ maxHeight: 400 }}>
              <Table stickyHeader size="small">
                <TableHead>
                  <TableRow>
                    <TableCell>Search Term</TableCell>
                    <TableCell align="right">Count</TableCell>
                    <TableCell align="right">Avg Results</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {trends.slice(0, 10).map((trend, index) => (
                    <TableRow key={index} hover>
                      <TableCell>
                        <Typography variant="body2" sx={{ fontWeight: 500 }}>
                          {trend.search_query}
                        </Typography>
                      </TableCell>
                      <TableCell align="right">
                        <Chip 
                          label={trend.search_count} 
                          size="small"
                          color="primary"
                          variant="outlined"
                        />
                      </TableCell>
                      <TableCell align="right">
                        {Math.round(trend.avg_results || 0)}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default SearchAnalyticsDashboard;
