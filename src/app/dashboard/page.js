import DashboardClient from "./DashBoardClient";

export const metadata = {
  title: "Dashboard",
  description:
    "View your financial summary including balance, income, expenses, charts and recent transactions.",
};

export default function DashboardPage() {
  return <DashboardClient />;
}