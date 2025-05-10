const ALERT_SEVERITY = {
  INFO: 'info',
  SUCCESS: 'success',
  WARNING: 'warning',
  ERROR: 'error'
}

const ACI_COLOR = 'rgb(114, 225, 40)'
const GENESIS_COLOR = '#8a8362'
const IXOPAY_COLOR = 'rgb(38, 198, 249)'
const TEXTFIELD_HOVER_COLOR = 'wheat'


const DETAILS_PAGE_WIDTH = 400
const NUMBER_OF_ROWS_FROM_SERVER = 6

const COLORS = {
  providers: {
    ACI: ACI_COLOR,
    GENESIS: GENESIS_COLOR,
    IXOPAY: IXOPAY_COLOR
  },
  brandNames: {
    TP: ACI_COLOR,
    CATALYST: ACI_COLOR,
    EMP: GENESIS_COLOR,
    DIMOCO: IXOPAY_COLOR
  },
  siteType: {
    WORDPRESS: '#8a8362',
    HTML: '#ff4242'
  },
  users: {
    SUPERADMIN: '#4B556E',
    CB911AGENTS: '#6366F1',
    TEMPORARYADMIN: '#10B981',
    CSAGENT: '#F59E0B',
    TEAMWR: '#EF4444',
    CENTUSSUPPORT: '#6B7280'
  },

  status: {
    ACTIVE: 'rgb(114, 225, 40)',
    SUCCESS: 'rgb(114, 225, 40)',
    PENDING: 'rgba(76, 78, 100, 0.87)',
    FAILURE: 'rgb(255, 77, 73)',
    DEACTIVATED: '#5c5858',
    CANCELLED: '#5c5858'
  },
  modes: {
    SKIP: 'rgb(114, 225, 40)',
    PAID: 'rgba(76, 78, 100, 0.87)',
    FAILED: 'rgb(255, 77, 73)'
  },
  paymentMethods: {
    CC: '#5c5858',
    DD: '#5c5858'
  },
  countries: {
    COLOR: '#5c5858'
  },
  tags: {
    COLOR: '#5c5858'
  },
  trafficTypes: {
    COLOR: '#5c5858'
  },
  dashboard: {
    LIGHT: {
      visitsBackground: '#f3f8ff',
      visitsIcon: '#4c6ef5',
      textSecondary: '#6c757d',
      textSuccess: '#28a745',
      registrationsBackground: '#ffecef',
      registrationsIcon: '#ef476f',
      customersBackground: '#e6f4ea',
      customersIcon: '#06d6a0',
      revenueBackground: '#fff5da',
      revenueIcon: '#faa307',
      chartLabel: '#333'
    },
    DARK: {
      visitsBackground: '#232f3e',
      visitsIcon: '#82a6f5',
      textSecondary: '#d1d5db',
      textSuccess: '#81c784',
      registrationsBackground: '#421c38',
      registrationsIcon: '#e299d8',
      customersBackground: '#0c3c36',
      customersIcon: '#8bf5d0',
      revenueBackground: '#3a2d11',
      revenueIcon: '#f8bb62',
      chartLabel: '#e0e0e0'
    }
  }
}

module.exports = {
  ALERT_SEVERITY,
  COLORS,
  DETAILS_PAGE_WIDTH,
  TEXTFIELD_HOVER_COLOR,
  NUMBER_OF_ROWS_FROM_SERVER
}
