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
import axios from 'axios';
import dayjs from 'dayjs';
import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
const { Option } = Select;
const monthFormat = 'MM-YYYY';
const yearFormat = 'YYYY';

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
};

function AdminStats() {
  const initChartData = {
    labels: [],
    datasets: [
      {
        label: 'Đơn hàng',
        data: [],
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      },
    ],
  };
  const [stats, setStats] = useState({
    todayStat: {},
    importantStat: {},
    mostProduct: [],
  });
  const [chartData, setChartData] = useState(initChartData);
  const [isLoading, setIsLoading] = useState(true);
  const [configChart, setConfigChart] = useState({
    type: 'month',
    value: dayjs(),
  });

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

  useEffect(() => {
    const getStats = async () => {
      setIsLoading(true);
      const query = new URLSearchParams({
        ...configChart,
        value: dayjs(configChart.value).format(
          configChart.type === 'month' ? monthFormat : yearFormat
        ),
      }).toString();

      const res = await axios({
        method: 'GET',
        url: `https://agency-app-backend.vercel.app/api/admin/stats?${query}`,
      });
      if (res.status === 200) {
        setStats(res.data.data);
        const resByTime = res.data.data.chartStats;
        setChartData((prev) => ({
          labels: resByTime.labels,
          datasets: [
            {
              ...prev.datasets[0],
              data: resByTime.data.orders,
            },
          ],
        }));
        setIsLoading(false);
      }
    };

    getStats();
  }, [configChart]);

  const handleChangeDateFilterChart = (e) => {
    setConfigChart({ ...configChart, value: e });
  };

  return (
    <div>
      <Row gutter={[16, 16]}>
        <Col span={9}>
          <Card title='Chỉ số trong ngày'>
            <Space size={'small'}>
              <Statistic
                title='Tổng đơn'
                value={stats.todayStat.orderTotal}
                loading={isLoading}
              />
              <Statistic
                title='Người dùng mới'
                value={stats.todayStat.newUser}
                loading={isLoading}
              />
            </Space>
          </Card>
        </Col>
        <Col span={15}>
          <Card title='Chỉ số quan trọng'>
            <Space size={'large'}>
              <Statistic
                title='Đơn hàng'
                value={stats.importantStat.orderTotal}
                loading={isLoading}
              />
              <Statistic
                title='Sản phẩm'
                value={stats.importantStat.productTotal}
                loading={isLoading}
              />
              <Statistic
                title='Khách hàng'
                value={stats.importantStat.customerTotal}
                loading={isLoading}
              />
              <Statistic
                title='Đối tác'
                value={stats.importantStat.partnerTotal}
                loading={isLoading}
              />
            </Space>
          </Card>
        </Col>
        <Col span={9}>
          <Card title='Sản phẩm nổi bật'>
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

export default AdminStats;
