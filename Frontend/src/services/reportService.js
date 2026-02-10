import api from "../api/axios";

export const reportService = {
  /**
   * Get daily report (admin only)
   */
  getDailyReport: async () => {
    const response = await api.get("/admin/reports/daily");
    return response.data;
  },

  /**
   * Get weekly report (admin only)
   */
  getWeeklyReport: async () => {
    const response = await api.get("/admin/reports/weekly");
    return response.data;
  },

  /**
   * Get monthly report (admin only)
   */
  getMonthlyReport: async () => {
    const response = await api.get("/admin/reports/monthly");
    return response.data;
  },

  /**
   * Get custom report (admin only)
   * @param {Object} data - {startDate, endDate, reportType, locationId}
   */
  getCustomReport: async (data) => {
    const response = await api.post("/admin/reports/custom", data);
    return response.data;
  },

  // ========== Usage Reports (Comprehensive Metrics) ==========

  /**
   * Get daily usage report with peak hours and metrics (admin only)
   */
  getDailyUsageReport: async () => {
    const response = await api.get("/admin/reports/usage/daily");
    return response.data;
  },

  /**
   * Get weekly usage report with peak hours and metrics (admin only)
   */
  getWeeklyUsageReport: async () => {
    const response = await api.get("/admin/reports/usage/weekly");
    return response.data;
  },

  /**
   * Get monthly usage report with peak hours and metrics (admin only)
   */
  getMonthlyUsageReport: async () => {
    const response = await api.get("/admin/reports/usage/monthly");
    return response.data;
  },

  /**
   * Get custom usage report with peak hours and metrics (admin only)
   * @param {Object} data - {startDate, endDate, reportType}
   */
  getCustomUsageReport: async (data) => {
    const response = await api.post("/admin/reports/usage/custom", data);
    return response.data;
  },

  /**
   * Download bookings as CSV with optional filters
   * params: { startDate?: string(ISO), endDate?: string(ISO), slotId?: number, userId?: number }
   */
  exportCsv: async (params = {}) => {
    const response = await api.get("/admin/reports/export/csv", {
      params,
      responseType: "blob",
      headers: { Accept: "text/csv" },
    });
    return response.data; // Blob
  },

  // ========== ADVANCED ANALYTICS METHODS ==========

  /**
   * Get location performance comparison
   */
  getLocationComparison: async (startDate, endDate) => {
    const params = {};
    if (startDate) params.startDate = startDate;
    if (endDate) params.endDate = endDate;
    const response = await api.get("/admin/reports/analytics/locations", { params });
    return response.data;
  },

  /**
   * Get slot utilization analytics
   */
  getSlotUtilization: async (startDate, endDate) => {
    const params = {};
    if (startDate) params.startDate = startDate;
    if (endDate) params.endDate = endDate;
    const response = await api.get("/admin/reports/analytics/slots/utilization", { params });
    return response.data;
  },

  /**
   * Get top utilized slots
   */
  getTopSlots: async (limit = 10, startDate, endDate) => {
    const params = { limit };
    if (startDate) params.startDate = startDate;
    if (endDate) params.endDate = endDate;
    const response = await api.get("/admin/reports/analytics/slots/top", { params });
    return response.data;
  },

  /**
   * Get least utilized slots
   */
  getLeastSlots: async (limit = 10, startDate, endDate) => {
    const params = { limit };
    if (startDate) params.startDate = startDate;
    if (endDate) params.endDate = endDate;
    const response = await api.get("/admin/reports/analytics/slots/least", { params });
    return response.data;
  },

  /**
   * Get revenue analytics
   */
  getRevenueAnalytics: async (startDate, endDate) => {
    const params = {};
    if (startDate) params.startDate = startDate;
    if (endDate) params.endDate = endDate;
    const response = await api.get("/admin/reports/analytics/revenue", { params });
    return response.data;
  },

  /**
   * Get user behavior analytics
   */
  getUserBehaviorAnalytics: async (startDate, endDate) => {
    const params = {};
    if (startDate) params.startDate = startDate;
    if (endDate) params.endDate = endDate;
    const response = await api.get("/admin/reports/analytics/users", { params });
    return response.data;
  },

  /**
   * Get top users
   */
  getTopUsers: async (limit = 10, startDate, endDate) => {
    const params = { limit };
    if (startDate) params.startDate = startDate;
    if (endDate) params.endDate = endDate;
    const response = await api.get("/admin/reports/analytics/users/top", { params });
    return response.data;
  },

  /**
   * Get occupancy heatmap data
   */
  getOccupancyHeatmap: async (startDate, endDate) => {
    const params = {};
    if (startDate) params.startDate = startDate;
    if (endDate) params.endDate = endDate;
    const response = await api.get("/admin/reports/analytics/heatmap", { params });
    return response.data;
  },

  /**
   * Get real-time occupancy status for all locations
   */
  getRealtimeOccupancy: async () => {
    const response = await api.get("/admin/reports/analytics/realtime-occupancy");
    return response.data;
  },
};
