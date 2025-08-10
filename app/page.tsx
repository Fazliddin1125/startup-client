"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Phone, DollarSign, TrendingUp, Package, CreditCard, AlertTriangle, Calendar, Menu, X } from "lucide-react"
import Link from "next/link"
import { ThemeToggle } from "@/components/theme-toggle"

// Mock data
const dashboardStats = {
  totalPhones: 156,
  soldToday: 8,
  onCredit: 23,
  todayProfit: 2450000,
  monthlyProfit: 45600000,
  lowStock: 12,
  creditDue: 5,
}

const recentSales = [
  { id: 1, phone: "iPhone 14 Pro", price: 12500000, buyer: "A***v", time: "10:30" },
  { id: 2, phone: "Samsung Galaxy S23", price: 8900000, buyer: "M***a", time: "11:15" },
  { id: 3, phone: "Xiaomi 13", price: 6200000, buyer: "O***r", time: "14:20" },
]

const alerts = [
  { id: 1, type: "credit", message: "3 ta nasiya to'lovi ertaga tugaydi", urgent: true },
  { id: 2, type: "stock", message: "iPhone 13 qolmadi", urgent: false },
  { id: 3, type: "old", message: "5 ta telefon 60 kundan beri sotilmayapti", urgent: false },
]

export default function Dashboard() {
  const [currentTime, setCurrentTime] = useState(new Date())
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000)
    return () => clearInterval(timer)
  }, [])

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card shadow-sm border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-2 sm:space-x-4">
              <Phone className="h-6 w-6 sm:h-8 sm:w-8 text-primary" />
              <h1 className="text-lg sm:text-2xl font-bold text-foreground">Telefon CRM</h1>
            </div>
            <div className="flex items-center space-x-2">
              <div className="hidden sm:block text-sm text-muted-foreground">{currentTime.toDateString()}</div>
              <ThemeToggle />
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
              className="block px-3 py-2 text-primary font-medium bg-accent rounded-md"
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
              className="block px-3 py-2 text-muted-foreground hover:text-foreground hover:bg-accent rounded-md"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Hisobotlar
            </Link>
          </div>
        </div>
      )}

      {/* Desktop Navigation */}
      <nav className="hidden sm:block bg-card shadow-sm border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-8 py-3">
            <Link href="/" className="text-primary font-medium border-b-2 border-primary pb-2">
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
            <Link href="/reports" className="text-muted-foreground hover:text-foreground pb-2">
              Hisobotlar
            </Link>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8">
        {/* Quick Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6 mb-6 sm:mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-xs sm:text-sm font-medium">Jami telefonlar</CardTitle>
              <Package className="h-3 w-3 sm:h-4 sm:w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-lg sm:text-2xl font-bold">{dashboardStats.totalPhones}</div>
              <p className="text-xs text-muted-foreground">Omborda</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-xs sm:text-sm font-medium">Bugungi sotuvlar</CardTitle>
              <Phone className="h-3 w-3 sm:h-4 sm:w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-lg sm:text-2xl font-bold">{dashboardStats.soldToday}</div>
              <p className="text-xs text-muted-foreground">Sotildi</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-xs sm:text-sm font-medium">Nasiyada</CardTitle>
              <CreditCard className="h-3 w-3 sm:h-4 sm:w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-lg sm:text-2xl font-bold">{dashboardStats.onCredit}</div>
              <p className="text-xs text-muted-foreground">Muddatli</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-xs sm:text-sm font-medium">Bugungi foyda</CardTitle>
              <TrendingUp className="h-3 w-3 sm:h-4 sm:w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-lg sm:text-2xl font-bold">
                {(dashboardStats.todayProfit / 1000).toString()}K
              </div>
              <p className="text-xs text-muted-foreground">UZS</p>
            </CardContent>
          </Card>
        </div>

        {/* Profit Button */}
        <div className="mb-6 sm:mb-8">
          <Button size="lg" className="w-full sm:w-auto bg-green-600 hover:bg-green-700 text-sm sm:text-base">
            <DollarSign className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
            Bugun qancha foyda qildim? 💰
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
          {/* Recent Sales */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="text-lg sm:text-xl">So'nggi sotuvlar</CardTitle>
              <CardDescription>Bugungi eng so'nggi sotuvlar</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 sm:space-y-4">
                {recentSales.map((sale) => (
                  <div key={sale.id} className="flex items-center justify-between p-3 bg-accent rounded-lg">
                    <div className="min-w-0 flex-1">
                      <p className="font-medium text-sm sm:text-base truncate">{sale.phone}</p>
                      <p className="text-xs sm:text-sm text-muted-foreground">Xaridor: {sale.buyer}</p>
                    </div>
                    <div className="text-right ml-4">
                      <p className="font-bold text-green-600 text-sm sm:text-base">
                        {(sale.price / 1000).toString()}K
                      </p>
                      <p className="text-xs sm:text-sm text-muted-foreground">{sale.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Alerts */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center text-lg sm:text-xl">
                <AlertTriangle className="mr-2 h-4 w-4 sm:h-5 sm:w-5 text-orange-500" />
                Ogohlantirishlar
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {alerts.map((alert) => (
                  <div
                    key={alert.id}
                    className={`p-3 rounded-lg ${
                      alert.urgent
                        ? "bg-red-50 dark:bg-red-950 border border-red-200 dark:border-red-800"
                        : "bg-yellow-50 dark:bg-yellow-950 border border-yellow-200 dark:border-yellow-800"
                    }`}
                  >
                    <p
                      className={`text-xs sm:text-sm ${alert.urgent ? "text-red-800 dark:text-red-200" : "text-yellow-800 dark:text-yellow-200"}`}
                    >
                      {alert.message}
                    </p>
                    {alert.urgent && (
                      <Badge variant="destructive" className="mt-2 text-xs">
                        Shoshilinch
                      </Badge>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="mt-6 sm:mt-8">
          <h2 className="text-base sm:text-lg font-semibold mb-4">Tezkor amallar</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
            <Link href="/phones/add">
              <Button variant="outline" className="w-full h-16 sm:h-20 flex flex-col text-xs sm:text-sm">
                <Phone className="h-4 w-4 sm:h-6 sm:w-6 mb-1 sm:mb-2" />
                Telefon qo'shish
              </Button>
            </Link>
            <Link href="/sales/new">
              <Button variant="outline" className="w-full h-16 sm:h-20 flex flex-col text-xs sm:text-sm">
                <DollarSign className="h-4 w-4 sm:h-6 sm:w-6 mb-1 sm:mb-2" />
                Yangi sotuv
              </Button>
            </Link>
            <Link href="/credit/payments">
              <Button variant="outline" className="w-full h-16 sm:h-20 flex flex-col text-xs sm:text-sm">
                <Calendar className="h-4 w-4 sm:h-6 sm:w-6 mb-1 sm:mb-2" />
                To'lovlar
              </Button>
            </Link>
            <Link href="/reports/monthly">
              <Button variant="outline" className="w-full h-16 sm:h-20 flex flex-col text-xs sm:text-sm">
                <TrendingUp className="h-4 w-4 sm:h-6 sm:w-6 mb-1 sm:mb-2" />
                Hisobot
              </Button>
            </Link>
          </div>
        </div>
      </main>
    </div>
  )
}
