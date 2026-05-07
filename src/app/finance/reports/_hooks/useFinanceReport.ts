import { useQuery } from "@tanstack/react-query";

export function useFinanceReport(month: number, year: number) {
  // Simulating API call
  return useQuery({
    queryKey: ["finance-report", month, year],
    queryFn: async () => {
      // Simulate delay
      await new Promise((resolve) => setTimeout(resolve, 800));

      return {
        summary: [
          {
            title: "Pemasukan",
            amount: "Rp 45.000.000",
            trendText: "Total Bulan Ini",
            trendType: "primary" as const,
          },
          {
            title: "Pengeluaran",
            amount: "Rp 28.000.000",
            trendText: "Total Bulan Ini",
            trendType: "neutral" as const,
          },
          {
            title: "Saldo Bersih",
            amount: "Rp 17.000.000",
            trendText: "Surplus",
            trendType: "secondary" as const,
          },
        ],
        incomeBreakdown: [
          { label: "Persembahan", percentage: 55, color: "#1a1f36" },
          { label: "Perpuluhan", percentage: 30, color: "#d4a843" },
          { label: "Lain-lain", percentage: 15, color: "#e2e8f0" },
        ],
        expenseBreakdown: [
          { label: "Gaji & Honor", percentage: 45, color: "#1a1f36" },
          { label: "Operasional", percentage: 35, color: "#d4a843" },
          { label: "Pemeliharaan", percentage: 20, color: "#e2e8f0" },
        ],
        cashFlow: [
          { month: "Jan", income: 60, expense: 40 },
          { month: "Feb", income: 55, expense: 45 },
          { month: "Mar", income: 70, expense: 50 },
          { month: "Apr", income: 65, expense: 40 },
          { month: "May", income: 80, expense: 60 },
          { month: "Jun", income: 75, expense: 55 },
          { month: "Jul", income: 85, expense: 50 },
          { month: "Aug", income: 70, expense: 65 },
          { month: "Sep", income: 60, expense: 45 },
          { month: "Oct", income: 75, expense: 55 },
          { month: "Nov", income: 90, expense: 70 },
          { month: "Dec", income: 95, expense: 60 },
        ],
      };
    },
  });
}
