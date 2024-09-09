import { useState, useCallback, useEffect } from "react";
import ReactECharts from "echarts-for-react";
import { faker } from "@faker-js/faker";
import {
  ConfigProvider,
  Layout,
  Typography,
  Button,
  Row,
  Col,
  Card,
  Statistic,
  Drawer,
  Table,
  Input,
  Form,
  Select,
  notification,
  Tag,
  DatePicker,
} from "antd";
import {
  BellOutlined,
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import moment from "moment";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const { Header, Content } = Layout;
const { Title } = Typography;
const { Option } = Select;
const { RangePicker } = DatePicker;

// Define a modern dark theme with JetBrains font
const modernTheme = {
  token: {
    colorPrimary: "#0d6efd",
    colorBgBase: "#1e1e1e",
    colorBgContainer: "#121212",
    colorTextBase: "#e0e0e0",
    colorTextSecondary: "#b0b0b0",
    fontFamily: "JetBrains Mono, monospace",
  },
};
const indianCities = [
  { city: "Mumbai", lat: 19.076, lng: 72.8777 },
  { city: "Delhi", lat: 28.7041, lng: 77.1025 },
  { city: "Bengaluru", lat: 12.9716, lng: 77.5946 },
  { city: "Chennai", lat: 13.0827, lng: 80.2707 },
  { city: "Kolkata", lat: 22.5726, lng: 88.3639 },
  { city: "Hyderabad", lat: 17.385, lng: 78.4867 },
  { city: "Pune", lat: 18.5204, lng: 73.8567 },
  { city: "Ahmedabad", lat: 23.0225, lng: 72.5714 },
  { city: "Jaipur", lat: 26.9124, lng: 75.7873 },
  { city: "Surat", lat: 21.1702, lng: 72.8311 },
  // Add more Indian cities as needed
];

// Generate random shipment data
const generateRandomShipmentData = () => {
  const shipments = [];
  for (let i = 0; i < 100; i++) {
    const randomCity =
      indianCities[Math.floor(Math.random() * indianCities.length)];
    shipments.push({
      key: i + 1,
      id: `SHIP${String(i + 1).padStart(3, "0")}`,
      status: faker.helpers.arrayElement(["Pending", "Delivered"]),
      destination: randomCity.city,
      shipmentDate: faker.date.past().toISOString(),
      lat: randomCity.lat,
      lng: randomCity.lng,
    });
  }
  return shipments;
};
// Use a custom hook for data management
const useShipmentData = () => {
  const [shipments, setShipments] = useState(generateRandomShipmentData());
  const [filteredShipments, setFilteredShipments] = useState(shipments);

  const addShipment = (newShipment) => {
    setShipments([...shipments, newShipment]);
    setFilteredShipments([...shipments, newShipment]);
  };

  const updateShipment = (updatedShipment) => {
    const updatedList = shipments.map((shipment) =>
      shipment.key === updatedShipment.key ? updatedShipment : shipment
    );
    setShipments(updatedList);
    setFilteredShipments(updatedList);
  };

  const deleteShipment = (key) => {
    const updatedList = shipments.filter((shipment) => shipment.key !== key);
    setShipments(updatedList);
    setFilteredShipments(updatedList);
  };

  return {
    shipments,
    filteredShipments,
    addShipment,
    updateShipment,
    deleteShipment,
  };
};

// Use a custom hook for notifications
const useNotifications = () => {
  const openNotification = (message, description) => {
    notification.open({
      message,
      description,
      icon: <BellOutlined style={{ color: modernTheme.token.colorPrimary }} />,
    });
  };

  return { openNotification };
};

const ShipperDashboard = () => {
  const {
    shipments,
    filteredShipments,
    addShipment,
    updateShipment,
    deleteShipment,
  } = useShipmentData();
  const [isDrawerVisible, setIsDrawerVisible] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentShipment, setCurrentShipment] = useState(null);
  const [searchText, setSearchText] = useState("");
  const [dateRange, setDateRange] = useState([]);
  const { openNotification } = useNotifications();

  useEffect(() => {
    const fetchNotifications = async () => {
      await new Promise((resolve) => setTimeout(resolve, 7000));
      openNotification("New Shipment", "A new shipment has been added.");
    };
    fetchNotifications();
  }, [openNotification]);

  const openDrawer = useCallback(() => setIsDrawerVisible(true), []);
  const closeDrawer = useCallback(() => {
    setIsDrawerVisible(false);
    setCurrentShipment(null);
    setIsEditing(false);
  }, []);

  const handleAddShipment = () => {
    openDrawer();
  };

  const handleEditShipment = (record) => {
    setIsEditing(true);
    setCurrentShipment(record);
    openDrawer();
  };

  const handleDeleteShipment = (key) => {
    deleteShipment(key);
    notification.success({ message: "Shipment deleted successfully" });
  };

  const handleFormSubmit = (values) => {
    if (isEditing) {
      updateShipment(values);
      notification.success({ message: "Shipment updated successfully" });
    } else {
      addShipment(values);
      notification.success({ message: "Shipment added successfully" });
    }
    closeDrawer();
  };

  const handleSearch = (e) => {
    setSearchText(e.target.value);
  };

  const handleDateRangeChange = (dates) => {
    setDateRange(dates);
  };

  const columns = [
    {
      title: "Shipment ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => (
        <Tag color={status === "Delivered" ? "green" : "volcano"}>
          {status.toUpperCase()}
        </Tag>
      ),
      filters: [
        { text: "Pending", value: "Pending" },
        { text: "Delivered", value: "Delivered" },
      ],
      onFilter: (value, record) => record.status.includes(value),
    },
    {
      title: "Destination",
      dataIndex: "destination",
      key: "destination",
    },
    {
      title: "Shipment Date",
      dataIndex: "shipmentDate",
      key: "shipmentDate",
      sorter: (a, b) => new Date(a.shipmentDate) - new Date(b.shipmentDate),
      render: (date) => moment(date).format("YYYY-MM-DD"),
    },
    {
      title: "Actions",
      key: "actions",
      render: (text, record) => (
        <span>
          <Button
            icon={<EditOutlined />}
            onClick={() => handleEditShipment(record)}
            style={{ marginRight: 8 }}
            type="default"
          >
            Edit
          </Button>
          <Button
            icon={<DeleteOutlined />}
            onClick={() => handleDeleteShipment(record.key)}
            danger
          >
            Delete
          </Button>
        </span>
      ),
    },
  ];

  // ECharts configuration for displaying shipment data
  const chartOptions = {
    tooltip: {
      trigger: "axis",
    },
    legend: {
      data: ["Pending", "Delivered"],
      textStyle: {
        color: "#e0e0e0",
      },
    },
    grid: {
      left: "3%",
      right: "4%",
      bottom: "3%",
      containLabel: true,
    },
    xAxis: {
      type: "category",
      boundaryGap: false,
      data: shipments.map((shipment) =>
        new Date(shipment.shipmentDate).toLocaleDateString()
      ),
      axisLabel: {
        color: "#e0e0e0",
        rotate: 0,
      },
    },
    yAxis: {
      type: "value",
      axisLabel: {
        color: "#e0e0e0",
      },
    },
    series: [
      {
        name: "Pending",
        type: "line",
        data: shipments
          .filter((shipment) => shipment.status === "Pending")
          .map((_, index) => index + 1),
        color: "#f44336",
      },
      {
        name: "Delivered",
        type: "line",
        data: shipments
          .filter((shipment) => shipment.status === "Delivered")
          .map((_, index) => index + 1),
        color: "#00b96b",
      },
    ],
  };

  const filteredData = filteredShipments
    .filter((shipment) =>
      shipment.id.toLowerCase().includes(searchText.toLowerCase())
    )
    .filter((shipment) => {
      if (dateRange.length === 0) return true;
      const shipmentDate = moment(shipment.shipmentDate);
      return shipmentDate.isBetween(dateRange[0], dateRange[1], null, "[]");
    });

  const recentShipments = shipments.slice(-5).map((shipment) => ({
    id: shipment.id,
    status: shipment.status,
    shipmentDate: shipment.shipmentDate,
  }));

  return (
    <ConfigProvider theme={modernTheme}>
      <Layout style={{ minHeight: "100vh" }}>
        <Header
          style={{
            background: modernTheme.token.colorBgContainer,
            padding: "0 20px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            boxShadow: "0 2px 8px rgba(0, 0, 0, 0.2)",
          }}
        >
          <Title level={3} style={{ color: modernTheme.token.colorTextBase }}>
            Shipper Dashboard
          </Title>
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={handleAddShipment}
          >
            Add Shipment
          </Button>
        </Header>
        <Content
          style={{
            padding: "20px",
            background: modernTheme.token.colorBgContainer,
          }}
        >
          <Row gutter={16}>
            <Col span={24} lg={8} xl={6}>
              <Card
                title="Statistics"
                style={{ marginBottom: 20 }}
                bodyStyle={{
                  background: modernTheme.token.colorBgBase,
                }}
              >
                <Statistic
                  title="Total Shipments"
                  value={shipments.length}
                  style={{ marginBottom: 16 }}
                />
                <Statistic
                  title="Pending Shipments"
                  value={
                    shipments.filter(
                      (shipment) => shipment.status === "Pending"
                    ).length
                  }
                  style={{ marginBottom: 16 }}
                />
                <Statistic
                  title="Delivered Shipments"
                  value={
                    shipments.filter(
                      (shipment) => shipment.status === "Delivered"
                    ).length
                  }
                />
              </Card>
              <Card
                title="Recent Shipments"
                style={{ marginBottom: 20 }}
                bodyStyle={{
                  background: modernTheme.token.colorBgBase,
                }}
              >
                {recentShipments.map((shipment) => (
                  <Card.Grid
                    key={shipment.id}
                    style={{ width: "100%", padding: 8 }}
                  >
                    <div style={{ marginBottom: 8 }}>
                      <strong>Shipment ID:</strong> {shipment.id}
                    </div>
                    <div style={{ marginBottom: 8 }}>
                      <strong>Status:</strong>{" "}
                      <Tag
                        color={
                          shipment.status === "Delivered" ? "green" : "volcano"
                        }
                      >
                        {shipment.status}
                      </Tag>
                    </div>
                    <div>
                      <strong>Date:</strong>{" "}
                      {moment(shipment.shipmentDate).format("YYYY-MM-DD")}
                    </div>
                  </Card.Grid>
                ))}
              </Card>
              {/* Interactive Map Card */}
              <Card
  title="Shipment Locations"
  style={{ marginBottom: 20 }}
  bodyStyle={{
    background: modernTheme.token.colorBgBase,
  }}
>
  <MapContainer
    center={[20.5937, 78.9629]} // Center of India
    zoom={5}
    style={{ height: 400, width: "100%" }}
  >
    <TileLayer
      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    />
    {shipments
      .filter((shipment) => shipment.lat && shipment.lng) // Only include shipments with valid coordinates
      .map((shipment) => (
        <Marker
          key={shipment.id}
          position={[shipment.lat, shipment.lng]}
        >
          <Popup>
            <div>
              <strong>ID:</strong> {shipment.id} <br />
              <strong>Status:</strong> {shipment.status} <br />
              <strong>Destination:</strong> {shipment.destination}
            </div>
          </Popup>
        </Marker>
      ))}
  </MapContainer>
</Card>

            </Col>
            <Col span={24} lg={16} xl={18}>
              <Card
                title="Shipments Overview"
                style={{ marginBottom: 20 }}
                bodyStyle={{
                  background: modernTheme.token.colorBgBase,
                }}
              >
                <Input
                  placeholder="Search by Shipment ID"
                  prefix={<SearchOutlined />}
                  onChange={handleSearch}
                  style={{ marginBottom: 16 }}
                />
                <RangePicker
                  style={{ marginBottom: 16, width: "100%" }}
                  onChange={handleDateRangeChange}
                />
                <ReactECharts option={chartOptions} style={{ height: 400 }} />
                <Table
                  columns={columns}
                  dataSource={filteredData}
                  pagination={{ pageSize: 10 }}
                  scroll={{ x: 800 }}
                  style={{ marginTop: 20 }}
                />
              </Card>
            </Col>
          </Row>
          <Drawer
            title={isEditing ? "Edit Shipment" : "Add Shipment"}
            placement="right"
            closable={false}
            onClose={closeDrawer}
            visible={isDrawerVisible}
            width={500}
          >
            <Form
              layout="vertical"
              initialValues={currentShipment}
              onFinish={handleFormSubmit}
            >
              <Form.Item
                name="id"
                label="Shipment ID"
                rules={[
                  { required: true, message: "Please input Shipment ID!" },
                ]}
              >
                <Input disabled={isEditing} />
              </Form.Item>
              <Form.Item
                name="status"
                label="Status"
                rules={[
                  { required: true, message: "Please select the status!" },
                ]}
              >
                <Select>
                  <Option value="Pending">Pending</Option>
                  <Option value="Delivered">Delivered</Option>
                </Select>
              </Form.Item>
              <Form.Item
                name="destination"
                label="Destination"
                rules={[
                  { required: true, message: "Please input destination!" },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                name="shipmentDate"
                label="Shipment Date"
                rules={[
                  {
                    required: true,
                    message: "Please select the shipment date!",
                  },
                ]}
              >
                <DatePicker format="YYYY-MM-DD" style={{ width: "100%" }} />
              </Form.Item>
              <Form.Item>
                <Button type="primary" htmlType="submit">
                  {isEditing ? "Update Shipment" : "Add Shipment"}
                </Button>
                <Button style={{ marginLeft: 8 }} onClick={closeDrawer}>
                  Cancel
                </Button>
              </Form.Item>
            </Form>
          </Drawer>
        </Content>
      </Layout>
    </ConfigProvider>
  );
};

export default ShipperDashboard;

