import React, { useEffect, useState } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  PointElement,
  LineElement,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import axios from 'axios';
import {
  Card,
  Col,
  DatePicker,
  Row,
  Select,
  Space,
  Spin,
  Statistic,
  Table,
} from 'antd';
import { ArrowUpOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';
const { Option } = Select;
const monthFormat = 'MM-YYYY';
const yearFormat = 'YYYY';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  PointElement,
  LineElement
);

const chartOptions = {
  responsive: true,
  interaction: {
    mode: 'index',
    intersect: false,
  },
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: true,
      text: 'Thống kê đơn hàng',
    },
  },
  scales: {
    y: {
      type: 'linear',
      display: true,
      position: 'left',
    },
    y1: {
      type: 'linear',
      display: true,
      position: 'right',

      grid: {
        drawOnChartArea: false,
      },
    },
  },
};

function Stats() {
  const initChartData = {
    labels: [],
    datasets: [
      {
        type: 'line',
        label: 'Doanh thu',
        data: [],
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
        borderColor: 'rgb(255, 99, 132)',
        yAxisID: 'y',
      },
      {
        label: 'Đơn hàng',
        data: [],
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
        yAxisID: 'y1',
      },
    ],
  };
  const [isLoading, setIsLoading] = useState(true);
  const [stats, setStats] = useState({
    todayStat: {},
    orderStats: {},
    mostProduct: [],
  });
  const [chartData, setChartData] = useState(initChartData);
  const [configChart, setConfigChart] = useState({
    type: 'month',
    value: dayjs(),
  });

  useEffect(() => {
    const getOrderStat = async () => {
      setIsLoading(true);
      const shopId = JSON.parse(localStorage.getItem('page'));

      const query = new URLSearchParams({
        ...configChart,
        value: dayjs(configChart.value).format(
          configChart.type === 'month' ? monthFormat : yearFormat
        ),
      }).toString();
      const res = await axios({
        method: 'GET',
        url: `http://localhost:5000/api/shop/${shopId}/order_stats?${query}`,
      });

      setStats(res.data.data);
      const resByTime = res.data.data.chartStats;
      setChartData((prev) => ({
        labels: resByTime.labels,
        datasets: [
          {
            ...prev.datasets[0],
            data: resByTime.data.income,
          },
          {
            ...prev.datasets[1],
            data: resByTime.data.orders,
          },
        ],
      }));
      setIsLoading(false);
    };

    getOrderStat();
  }, [configChart]);

  const handleChangeDateFilterChart = (e) => {
    setConfigChart({ ...configChart, value: e });
  };

  const tableMostProductColumns = [
    {
      title: 'Sản phẩm',
      dataIndex: 'name',
      rowScope: 'name',
    },
    {
      title: 'Lượt mua',
      dataIndex: 'count',
      rowScope: 'count',
      width: 100,
    },
  ];

  return (
    <div>
      <Row gutter={[16, 16]}>
        <Col span={9}>
          <Card title='Đơn hàng hôm nay'>
            <Space size={'small'}>
              <Statistic
                title='Tổng đơn'
                value={stats.todayStat.total}
                loading={isLoading}
              />
              <Statistic
                title='Chưa duyệt'
                value={stats.todayStat.unconfirm}
                loading={isLoading}
              />
              <Statistic
                title='Đang vận chuyển'
                value={stats.todayStat.shipping}
                loading={isLoading}
              />
              <Statistic
                title='Đã giao'
                value={stats.todayStat.shipped}
                loading={isLoading}
              />
            </Space>
          </Card>
        </Col>
        <Col span={15}>
          <Card title='Chỉ số quan trọng'>
            <Space size={'large'}>
              <Statistic
                title='Doanh số'
                value={stats.orderStats.income}
                suffix='đ'
                valueStyle={{
                  color: '#3f8600',
                }}
                prefix={<ArrowUpOutlined />}
                loading={isLoading}
              />
              <Statistic
                title='Tổng đơn'
                value={stats.orderStats.total}
                loading={isLoading}
              />
              <Statistic
                title='Chưa duyệt'
                value={stats.orderStats.unconfirm}
                loading={isLoading}
              />
              <Statistic
                title='Đã xác nhận'
                value={stats.orderStats.confirmed}
                loading={isLoading}
              />
              <Statistic
                title='Đang vận chuyển'
                value={stats.orderStats.shipping}
                loading={isLoading}
              />
              <Statistic
                title='Đã giao'
                value={stats.orderStats.shipped}
                loading={isLoading}
              />
              <Statistic
                title='Đã hủy'
                value={stats.orderStats.canceled}
                loading={isLoading}
              />
            </Space>
          </Card>
        </Col>
        <Col span={9}>
          <Card title='Sản phẩm bán chạy'>
            <Spin spinning={isLoading}>
              <Table
                pagination={false}
                columns={tableMostProductColumns}
                dataSource={stats.mostProduct}
              />
            </Spin>
          </Card>
        </Col>
        <Col span={15}>
          <Card
            title='Biểu đồ đơn hàng trong tháng'
            extra={
              <Space>
                <Select
                  value={configChart.type}
                  onChange={(e) =>
                    setConfigChart({
                      ...configChart,
                      type: e,
                    })
                  }
                >
                  <Option value='month'>Tháng</Option>
                  <Option value='year'>Năm</Option>
                </Select>
                <DatePicker
                  picker={configChart.type}
                  onChange={handleChangeDateFilterChart}
                  value={
                    configChart.value &&
                    dayjs(
                      configChart.value,
                      configChart.type === 'month' ? monthFormat : yearFormat
                    )
                  }
                  showNow={false}
                  format={
                    configChart.type === 'month' ? monthFormat : yearFormat
                  }
                  disabledDate={(current) => current && current > dayjs()}
                />
              </Space>
            }
          >
            <Spin spinning={isLoading}>
              <Bar options={chartOptions} data={chartData} />
            </Spin>
          </Card>
        </Col>
      </Row>
    </div>
  );
}

export default Stats;
