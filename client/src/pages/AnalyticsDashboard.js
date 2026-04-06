import React, { useState, useEffect } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Doughnut, Bar } from 'react-chartjs-2';
import { getCategoryAnalytics, getTopViewed, getPriceDistribution } from '../services/api';

ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement, Title, Tooltip, Legend);

// Chart.js dark theme defaults
ChartJS.defaults.color = '#a5d6a7';
ChartJS.defaults.borderColor = 'rgba(30, 58, 42, 0.5)';

function AnalyticsDashboard() {
  const [categoryData, setCategoryData] = useState(null);
  const [topViewed, setTopViewed] = useState(null);
  const [priceData, setPriceData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const [catRes, topRes, priceRes] = await Promise.all([
          getCategoryAnalytics(),
          getTopViewed(10),
          getPriceDistribution()
        ]);
        setCategoryData(catRes.data);
        setTopViewed(topRes.data);
        setPriceData(priceRes.data);
      } catch (err) {
        console.error('Error loading analytics:', err);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  const categoryChartData = categoryData ? {
    labels: categoryData.map(c => c.category),
    datasets: [{
      data: categoryData.map(c => c.count),
      backgroundColor: [
        'rgba(76, 175, 80, 0.8)',
        'rgba(66, 165, 245, 0.8)',
        'rgba(255, 143, 0, 0.8)',
        'rgba(171, 71, 188, 0.8)',
        'rgba(239, 83, 80, 0.8)',
        'rgba(38, 166, 154, 0.8)',
      ],
      borderColor: [
        '#4CAF50',
        '#42A5F5',
        '#FF8F00',
        '#AB47BC',
        '#EF5350',
        '#26A69A',
      ],
      borderWidth: 2,
      hoverOffset: 8,
    }]
  } : null;

  const topViewedChartData = topViewed ? {
    labels: topViewed.map(p => p.name.length > 20 ? p.name.substring(0, 20) + '...' : p.name),
    datasets: [{
      label: 'Views',
      data: topViewed.map(p => p.views),
      backgroundColor: 'rgba(76, 175, 80, 0.6)',
      borderColor: '#4CAF50',
      borderWidth: 1,
      borderRadius: 6,
      barThickness: 22,
    }]
  } : null;

  const priceChartData = priceData ? {
    labels: priceData.map(p => p.range),
    datasets: [{
      label: 'Products',
      data: priceData.map(p => p.count),
      backgroundColor: [
        'rgba(76, 175, 80, 0.7)',
        'rgba(102, 187, 106, 0.7)',
        'rgba(129, 199, 132, 0.7)',
        'rgba(165, 214, 167, 0.7)',
        'rgba(200, 230, 201, 0.7)',
      ],
      borderColor: '#4CAF50',
      borderWidth: 1,
      borderRadius: 6,
    }]
  } : null;

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        labels: {
          color: '#a5d6a7',
          font: { family: 'Inter', size: 12 },
          padding: 15,
        }
      },
      tooltip: {
        backgroundColor: 'rgba(20, 30, 26, 0.95)',
        titleColor: '#e8f5e9',
        bodyColor: '#a5d6a7',
        borderColor: 'rgba(46, 125, 50, 0.3)',
        borderWidth: 1,
        cornerRadius: 8,
        padding: 12,
        titleFont: { family: 'Inter', weight: '600' },
        bodyFont: { family: 'Inter' },
      }
    }
  };

  const barOptions = {
    ...chartOptions,
    indexAxis: 'y',
    plugins: {
      ...chartOptions.plugins,
      legend: { display: false },
    },
    scales: {
      x: {
        ticks: { color: '#6b8f6f', font: { family: 'Inter', size: 11 } },
        grid: { color: 'rgba(30, 58, 42, 0.3)' },
      },
      y: {
        ticks: { color: '#a5d6a7', font: { family: 'Inter', size: 11 } },
        grid: { display: false },
      }
    }
  };

  const verticalBarOptions = {
    ...chartOptions,
    plugins: {
      ...chartOptions.plugins,
      legend: { display: false },
    },
    scales: {
      x: {
        ticks: { color: '#a5d6a7', font: { family: 'Inter', size: 11 } },
        grid: { display: false },
      },
      y: {
        ticks: { color: '#6b8f6f', font: { family: 'Inter', size: 11 } },
        grid: { color: 'rgba(30, 58, 42, 0.3)' },
      }
    }
  };

  return (
    <div style={{ paddingTop: '76px' }}>
      <div className="page-hero">
        <div className="container">
          <h1>📊 Analytics Dashboard</h1>
          <p>Insights into our product catalog and customer behavior</p>
        </div>
      </div>

      <div className="container">
        {loading ? (
          <div className="row">
            {[1, 2, 3].map(i => (
              <div className="col-lg-6 mb-4" key={i}>
                <div className="skeleton" style={{ height: '350px', borderRadius: 'var(--radius-md)' }}></div>
              </div>
            ))}
          </div>
        ) : (
          <>
            {/* Summary Cards */}
            <div className="row g-4 mb-4">
              {[
                { icon: '📦', label: 'Total Products', value: categoryData ? categoryData.reduce((s, c) => s + c.count, 0) : 0, color: '#4CAF50' },
                { icon: '📁', label: 'Categories', value: categoryData ? categoryData.length : 0, color: '#42A5F5' },
                { icon: '👁️', label: 'Total Views', value: topViewed ? topViewed.reduce((s, p) => s + p.views, 0).toLocaleString() : 0, color: '#FF8F00' },
                { icon: '🏆', label: 'Most Viewed', value: topViewed && topViewed[0] ? topViewed[0].name.split(' ').slice(0, 2).join(' ') : 'N/A', color: '#AB47BC' },
              ].map((stat, i) => (
                <div className="col-6 col-lg-3" key={i}>
                  <div style={{
                    background: 'var(--bg-card)',
                    border: '1px solid var(--border-color)',
                    borderRadius: 'var(--radius-md)',
                    padding: '1.2rem',
                    borderLeft: `3px solid ${stat.color}`,
                  }}>
                    <div style={{ fontSize: '1.5rem', marginBottom: '0.3rem' }}>{stat.icon}</div>
                    <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>{stat.label}</div>
                    <div style={{ fontSize: '1.3rem', fontWeight: 700, color: stat.color }}>{stat.value}</div>
                  </div>
                </div>
              ))}
            </div>

            <div className="row">
              {/* Category Distribution - Doughnut */}
              <div className="col-lg-6 mb-4">
                <div className="chart-card">
                  <h5>🍩 Category Distribution</h5>
                  {categoryChartData && (
                    <div style={{ height: '320px' }}>
                      <Doughnut data={categoryChartData} options={{
                        ...chartOptions,
                        cutout: '55%',
                        plugins: {
                          ...chartOptions.plugins,
                          legend: {
                            position: 'bottom',
                            labels: {
                              color: '#a5d6a7',
                              font: { family: 'Inter', size: 11 },
                              padding: 12,
                              usePointStyle: true,
                              pointStyleWidth: 10,
                            }
                          }
                        }
                      }} />
                    </div>
                  )}
                </div>
              </div>

              {/* Price Distribution - Bar */}
              <div className="col-lg-6 mb-4">
                <div className="chart-card">
                  <h5>💰 Price Range Distribution</h5>
                  {priceChartData && (
                    <div style={{ height: '320px' }}>
                      <Bar data={priceChartData} options={verticalBarOptions} />
                    </div>
                  )}
                </div>
              </div>

              {/* Top Viewed - Horizontal Bar */}
              <div className="col-12 mb-4">
                <div className="chart-card">
                  <h5>🔥 Top Viewed Products</h5>
                  {topViewedChartData && (
                    <div style={{ height: '400px' }}>
                      <Bar data={topViewedChartData} options={barOptions} />
                    </div>
                  )}
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default AnalyticsDashboard;
