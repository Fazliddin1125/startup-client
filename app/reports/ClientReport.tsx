"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
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
  Cell,
} from "recharts"
import { TrendingUp, Download, Calendar, DollarSign, Phone, CreditCard, FileText, Menu, X } from "lucide-react"
import Link from "next/link"
import { ThemeToggle } from "@/components/theme-toggle"
import { ISale } from "@/types"
import dayjs from "dayjs";
import isSameOrAfter from "dayjs/plugin/isSameOrAfter";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";
import numeral from "numeral"
import { useRouter, useSearchParams } from "next/navigation"
import { formUrlQuery } from "@/lib/formUrlQuery"
dayjs.extend(isSameOrAfter);
dayjs.extend(isSameOrBefore);

const monthlyData = [
  { month: "Yan", sales: 45, profit: 12500000, phones: 23 },
  { month: "Fev", sales: 52, profit: 15200000, phones: 28 },
  { month: "Mar", sales: 48, profit: 13800000, phones: 25 },
  { month: "Apr", sales: 61, profit: 18900000, phones: 32 },
  { month: "May", sales: 55, profit: 16700000, phones: 29 },
  { month: "Iyun", sales: 67, profit: 21300000, phones: 35 },
]

const brandData = [
  { name: "Apple", value: 45, color: "#007AFF" },
  { name: "Samsung", value: 30, color: "#1428A0" },
  { name: "Xiaomi", value: 20, color: "#FF6900" },
  { name: "Boshqalar", value: 5, color: "#8E8E93" },
]

const topPhones = [
  { model: "iPhone 14 Pro", sold: 12, profit: 24000000 },
  { model: "Samsung Galaxy S23", sold: 8, profit: 11200000 },
  { model: "iPhone 13", sold: 7, profit: 9800000 },
  { model: "Xiaomi 13", sold: 6, profit: 6000000 },
  { model: "iPhone 14", sold: 5, profit: 8500000 },
]

const expenses = [
  { category: "Telefon xaridlari", amount: 85000000, percentage: 65 },
  { category: "Ijara haqi", amount: 8000000, percentage: 6 },
  { category: "Kommunal xizmatlar", amount: 2500000, percentage: 2 },
  { category: "Marketing", amount: 5000000, percentage: 4 },
  { category: "Ish haqi", amount: 25000000, percentage: 19 },
  { category: "Boshqa xarajatlar", amount: 5500000, percentage: 4 },
]

interface Props {
  sales: ISale[]
}

export default function ReportsPage({ sales }: Props) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [selectedPeriod, setSelectedPeriod] = useState("current-month")
  const [reportType, setReportType] = useState("summary")
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [totalBenifit, setTotalBenifit] = useState(0);
  const ChangetotalBenifit = (type: string) => {
    const today = dayjs();
    const filterDate = (saleDate: string | Date) => dayjs(saleDate);

    let filteredSales = sales;

    switch (type) {
      case "current-month":
        filteredSales = sales.filter(s =>
          filterDate(s.createdAt).isSame(today, "month")
        );
        break;
      // ... boshqa case-lar
    }

    const total = filteredSales.reduce((sum, sale) => sum + sale.benifit, 0);
    setTotalBenifit(total);
  };

  useEffect(() => {
    ChangetotalBenifit("current-month");
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  const totalProfit = monthlyData.reduce((sum, month) => sum + month.profit, 0)
  const totalExpenses = expenses.reduce((sum, expense) => sum + expense.amount, 0)
  const netProfit = totalProfit - totalExpenses

  const handleExportReport = (format: string) => {
    // Mock export functionality
    alert(`${format.toUpperCase()} hisobot yuklab olinmoqda...`)
  }

  const onFilterChange = (value: string) => {
    const newUrl = formUrlQuery({
      key: 'filter',
      value,
      params: searchParams.toString(),
    })
    router.push(newUrl)
  }
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card shadow-sm border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-2 sm:space-x-4">
              <Link href="/" className="text-blue-600 hover:text-blue-800">
                <TrendingUp className="h-6 w-6 sm:h-8 sm:w-8" />
              </Link>
              <h1 className="text-lg sm:text-2xl font-bold text-foreground">Hisobotlar</h1>
            </div>
            <div className="flex items-center space-x-2">
              <ThemeToggle />
              <Button variant="outline" onClick={() => handleExportReport("pdf")} className="hidden sm:flex">
                <Download className="mr-2 h-4 w-4" />
                PDF
              </Button>
              <Button variant="outline" onClick={() => handleExportReport("xlsx")} className="hidden sm:flex">
                <Download className="mr-2 h-4 w-4" />
                Excel
              </Button>
              <button
                onClick={toggleMobileMenu}
                className="sm:hidden p-2 rounded-md text-muted-foreground hover:text-foreground hover:bg-accent"
              >
                {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <div className="sm:hidden bg-card border-b border-border shadow-sm">
          <div className="px-4 py-2 space-y-1">
            <Link
              href="/"
              className="block px-3 py-2 text-muted-foreground hover:text-foreground hover:bg-accent rounded-md"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Bosh sahifa
            </Link>
            <Link
              href="/phones"
              className="block px-3 py-2 text-muted-foreground hover:text-foreground hover:bg-accent rounded-md"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Telefonlar
            </Link>
            <Link
              href="/sales"
              className="block px-3 py-2 text-muted-foreground hover:text-foreground hover:bg-accent rounded-md"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Sotuvlar
            </Link>
            <Link
              href="/credit"
              className="block px-3 py-2 text-muted-foreground hover:text-foreground hover:bg-accent rounded-md"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Nasiya
            </Link>
            <Link
              href="/services"
              className="block px-3 py-2 text-muted-foreground hover:text-foreground hover:bg-accent rounded-md"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Xizmatlar
            </Link>
            <Link
              href="/accessories"
              className="block px-3 py-2 text-muted-foreground hover:text-foreground hover:bg-accent rounded-md"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Aksessuarlar
            </Link>
            <Link
              href="/reports"
              className="block px-3 py-2 text-blue-600 font-medium bg-blue-50 rounded-md"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Hisobotlar
            </Link>
          </div>
        </div>
      )}

      {/* Desktop Navigation */}
      <nav className="hidden sm:block bg-card shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-8 py-3">
            <Link href="/" className="text-muted-foreground hover:text-foreground pb-2">
              Bosh sahifa
            </Link>
            <Link href="/phones" className="text-muted-foreground hover:text-foreground pb-2">
              Telefonlar
            </Link>
            <Link href="/sales" className="text-muted-foreground hover:text-foreground pb-2">
              Sotuvlar
            </Link>
            <Link href="/credit" className="text-muted-foreground hover:text-foreground pb-2">
              Nasiya
            </Link>
            <Link href="/services" className="text-muted-foreground hover:text-foreground pb-2">
              Xizmatlar
            </Link>
            <Link href="/accessories" className="text-muted-foreground hover:text-foreground pb-2">
              Aksessuarlar
            </Link>
            <Link href="/reports" className="text-blue-600 font-medium border-b-2 border-blue-600 pb-2">
              Hisobotlar
            </Link>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8">
        {/* Mobile Export Buttons */}
        <div className="sm:hidden mb-4 flex space-x-2">
          <Button variant="outline" onClick={() => handleExportReport("pdf")} className="flex-1">
            <Download className="mr-2 h-4 w-4" />
            PDF
          </Button>
          <Button variant="outline" onClick={() => handleExportReport("xlsx")} className="flex-1">
            <Download className="mr-2 h-4 w-4" />
            Excel
          </Button>
        </div>
        {/* Filters */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Calendar className="mr-2 h-5 w-5" />
              Hisobot parametrlari
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Select onValueChange={onFilterChange}>
                <SelectTrigger >
                  <SelectValue placeholder="Vaqt oralig'ini tanlang" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="current-month">Joriy oy</SelectItem>
                  <SelectItem value="last-month">O‘tgan oy</SelectItem>
                  <SelectItem value="last-3-months">So‘nggi 3 oy</SelectItem>
                  <SelectItem value="last-6-months">So‘nggi 6 oy</SelectItem>
                  <SelectItem value="current-year">Joriy yil</SelectItem>
                </SelectContent>
              </Select>
              <Select value={reportType} onValueChange={setReportType}>
                <SelectTrigger>
                  <SelectValue placeholder="Hisobot turi" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="summary">Umumiy hisobot</SelectItem>
                  <SelectItem value="sales">Sotuvlar hisoboti</SelectItem>
                  <SelectItem value="profit">Foyda hisoboti</SelectItem>
                  <SelectItem value="inventory">Ombor hisoboti</SelectItem>
                  <SelectItem value="credit">Nasiya hisoboti</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Jami sotuvlar</CardTitle>
              <Phone className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold"> {numeral(totalBenifit).format("0,0")}{totalBenifit}</div>
              <p className="text-xs text-muted-foreground">So'nggi 6 oyda</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Jami foyda</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">{(totalProfit / 1000000).toFixed(1)}M</div>
              <p className="text-xs text-muted-foreground">UZS</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Jami xarajat</CardTitle>
              <CreditCard className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600">{(totalExpenses / 1000000).toFixed(1)}M</div>
              <p className="text-xs text-muted-foreground">UZS</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Sof foyda</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className={`text-2xl font-bold ${netProfit >= 0 ? "text-green-600" : "text-red-600"}`}>
                {netProfit >= 0 ? "+" : ""}
                {(netProfit / 1000000).toFixed(1)}M
              </div>
              <p className="text-xs text-muted-foreground">UZS</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Monthly Sales Chart */}
          <Card>
            <CardHeader>
              <CardTitle>Oylik sotuvlar dinamikasi</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={monthlyData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="sales" fill="#3B82F6" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Profit Trend */}
          <Card>
            <CardHeader>
              <CardTitle>Foyda tendensiyasi</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={monthlyData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip formatter={(value) => [`${(Number(value) / 1000000).toFixed(1)}M UZS`, "Foyda"]} />
                  <Line type="monotone" dataKey="profit" stroke="#10B981" strokeWidth={3} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Brand Distribution */}
          <Card>
            <CardHeader>
              <CardTitle>Brendlar bo'yicha taqsimot</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={brandData}
                    cx="50%"
                    cy="50%"
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, value }) => `${name}: ${value}%`}
                  >
                    {brandData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Top Selling Phones */}
          <Card>
            <CardHeader>
              <CardTitle>Eng ko'p sotilgan telefonlar</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {topPhones.map((phone, index) => (
                  <div key={phone.model} className="flex items-center justify-between p-3 bg-accent rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="flex items-center justify-center w-8 h-8 bg-blue-100 text-blue-800 rounded-full text-sm font-bold">
                        {index + 1}
                      </div>
                      <div>
                        <p className="font-medium">{phone.model}</p>
                        <p className="text-sm text-muted-foreground">{phone.sold} dona sotildi</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-green-600">{(phone.profit / 1000000).toFixed(1)}M</p>
                      <p className="text-xs text-muted-foreground">UZS</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Expenses Breakdown */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Xarajatlar taqsimoti</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Kategoriya</TableHead>
                    <TableHead>Summa</TableHead>
                    <TableHead>Foiz</TableHead>
                    <TableHead>Vizual</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {expenses.map((expense) => (
                    <TableRow key={expense.category}>
                      <TableCell className="font-medium">{expense.category}</TableCell>
                      <TableCell className="font-mono">{(expense.amount / 1000000).toFixed(1)}M UZS</TableCell>
                      <TableCell>
                        <Badge variant="outline">{expense.percentage}%</Badge>
                      </TableCell>
                      <TableCell>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-blue-600 h-2 rounded-full"
                            style={{ width: `${expense.percentage}%` }}
                          ></div>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <FileText className="mr-2 h-5 w-5" />
              Tezkor hisobotlar
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Button variant="outline" className="h-20 flex flex-col">
                <Phone className="h-6 w-6 mb-2" />
                Bugungi sotuvlar
              </Button>
              <Button variant="outline" className="h-20 flex flex-col">
                <DollarSign className="h-6 w-6 mb-2" />
                Haftalik foyda
              </Button>
              <Button variant="outline" className="h-20 flex flex-col">
                <CreditCard className="h-6 w-6 mb-2" />
                Nasiya holati
              </Button>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
