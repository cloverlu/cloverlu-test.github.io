// 端口类型
const portList = [
  { label: "SELECT", value: "" },
  { label: "All services", value: "*" },
  { label: "FTP", value: 21 },
  { label: "HTTP", value: 80 },
  { label: "HTTPS", value: 443 },
  { label: "TELNET", value: 23 },
  { label: "PPTP", value: 1723 },
  { label: "SMTP", value: 25 },
  { label: "SNMP", value: 161 },
  { label: "SNMP-TRAP", value: 162 },
  { label: "SSH", value: 22 },
  { label: "TFTP", value: 69 },
  { label: "ISAKMP", value: 500 },
  { label: "MQTT", value: 1883 },
  { label: "MQTT-TLS", value: 8883 }
];

// 负载方式
const loadModes = [
  { label: "Round Robin", value: "LB_METHOD_ROUND_ROBIN" },
  { label: "Ratio(member)", value: "LB_METHOD_RATIO_MEMBER" },
  {
    label: "Least Connections(member)",
    value: "LB_METHOD_LEAST_CONNECTION_MEMBER"
  },
  { label: "Observed(member)", value: "LB_METHOD_OBSERVED_MEMBER" },
  { label: "Predictive(member)", value: "LB_METHOD_PREDICTIVE_MEMBER" },
  { label: "Ratio(node)", value: "LB_METHOD_RATIO_NODE_ADDRESS" },
  {
    label: "Least Connections(node)",
    value: "LB_METHOD_LEAST_CONNECTION_NODE_ADDRESS"
  },
  { label: "Fastest(node)", value: "LB_METHOD_FASTEST_NODE_ADDRESS" },
  { label: "Observed(node)", value: "LB_METHOD_OBSERVED_NODE_ADDRESS" },
  { label: "Predictive(node)", value: "LB_METHOD_PREDICTIVE_NODE_ADDRESS" },
  { label: "Dynamic Ratio(node)", value: "LB_METHOD_DYNAMIC_RATIO" },
  { label: "Fastest(application)", value: "LB_METHOD_FASTEST_APP_RESPONSE" },
  { label: "Least Sessions", value: "LB_METHOD_LEAST_SESSIONS" },
  { label: "Dynamic Ratio(member)", value: "LB_METHOD_DYNAMIC_RATIO_MEMBER" },
  {
    label: "Weighted Least Connections(member)",
    value: "LB_METHOD_WEIGHTED_LEAST_CONNECTION_MEMBER"
  },
  {
    label: "Weighted Least Connections(node)",
    value: "LB_METHOD_WEIGHTED_LEAST_CONNECTION_NODE_ADDRESS"
  },
  { label: "Ratio(session)", value: "LB_METHOD_RATIO_SESSION" },
  {
    label: "Ratio Least Connections(node)",
    value: "LB_METHOD_RATIO_LEAST_CONNECTION_NODE_ADDRESS"
  },
  {
    label: "Ratio Least Connections(member)",
    value: "LB_METHOD_RATIO_LEAST_CONNECTION_MEMBER"
  }
];

// 健康监控
const healthMonitor = [
  { key: "tcp", label: "tcp" },
  { key: "http", label: "http" },
  { key: "gatewary_icmp", label: "gatewary_icmp" },
  { key: "http_head_f5", label: "http_head_f5" },
  { key: "https", label: "https" },
  { key: "https_443", label: "https_443" },
  { key: "https_head_f5", label: "https_head_f5" },
  { key: "inband", label: "inband" },
  { key: "tcp_half_open", label: "tcp_half_open" },
  { key: "udp", label: "udp" }
];

export { portList, loadModes, healthMonitor };
