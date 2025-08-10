"use client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { CreditCard, AlertTriangle, CheckCircle, Clock, DollarSign, Menu, X } from "lucide-react"
import Link from "next/link"
import { useState } from "react"
import { ThemeToggle } from "@/components/theme-toggle"

// Mock data
const creditSales = [
  {
    id: 1,
    phone: "iPhone 14 Pro",
    customer: "A***v Sh***v",
    totalAmount: 12500000,
    paidAmount: 5000000,
    remainingAmount: 7500000,
    monthlyPayment: 1250000,
    startDate: "2024-01-15",
    nextPaymentDate: "2024-02-15",
    daysUntilPayment: 3,
    status: "Faol",
    installments: 10,
    paidInstallments: 4,
  },
  {
    id: 2,
    phone: "Samsung Galaxy S23",
    customer: "M***a K***a",
    totalAmount: 8900000,
    paidAmount: 8900000,
    remainingAmount: 0,
    monthlyPayment: 1480000,
    startDate: "2023-12-01",
    nextPaymentDate: "2024-01-01",
    daysUntilPayment: 0,
    status: "To'langan",
    installments: 6,
    paidInstallments: 6,
  },
  {
    id: 3,
    phone: "iPhone 13",
    customer: "O***r N***v",
    totalAmount: 8200000,
    paidAmount: 2460000,
    remainingAmount: 5740000,
    monthlyPayment: 820000,
    startDate: "2023-11-01",
    nextPaymentDate: "2024-02-01",
    daysUntilPayment: -10,
    status: "Kechikkan",
    installments: 10,
    paidInstallments: 3,
  },
]

export default function CreditPage() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  const getStatusBadge = (status: string, daysUntil: number) => {
    if (status === "To'langan") {
      return <Badge className="bg-green-100 text-green-800">To'langan</Badge>
    }
    if (status === "Kechikkan" || daysUntil < 0) {
      return <Badge className="bg-red-100 text-red-800">Kechikkan</Badge>
    }
    if (daysUntil <= 3) {
      return <Badge className="bg-orange-100 text-orange-800">Yaqinlashmoqda</Badge>
    }
    return <Badge className="bg-blue-100 text-blue-800">Faol</Badge>
  }

  const getStatusIcon = (status: string, daysUntil: number) => {
    if (status === "To'langan") {
      return <CheckCircle className="h-4 w-4 text-green-600" />
    }
    if (status === "Kechikkan" || daysUntil < 0) {
      return <AlertTriangle className="h-4 w-4 text-red-600" />
    }
    if (daysUntil <= 3) {
      return <Clock className="h-4 w-4 text-orange-600" />
    }
    return <CreditCard className="h-4 w-4 text-blue-600" />
  }

  const totalCredit = creditSales.reduce((sum, sale) => sum + sale.totalAmount, 0)
  const totalPaid = creditSales.reduce((sum, sale) => sum + sale.paidAmount, 0)
  const totalRemaining = creditSales.reduce((sum, sale) => sum + sale.remainingAmount, 0)
  const overdueCount = creditSales.filter((sale) => sale.daysUntilPayment < 0).length
  const upcomingCount = creditSales.filter((sale) => sale.daysUntilPayment >= 0 && sale.daysUntilPayment <= 7).length

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card shadow-sm border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-2 sm:space-x-4">
              <Link href="/" className="text-blue-600 hover:text-blue-800">
                <CreditCard className="h-6 w-6 sm:h-8 sm:w-8" />
              </Link>
              <h1 className="text-lg sm:text-2xl font-bold text-foreground">Nasiya sotuvlar</h1>
            </div>
            <div className="flex items-center space-x-2">
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
              className="block px-3 py-2 text-blue-600 font-medium bg-blue-50 rounded-md"
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
            <Link href="/credit" className="text-blue-600 font-medium border-b-2 border-blue-600 pb-2">
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

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Jami nasiya</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{(totalCredit / 1000000).toFixed(1)}M</div>
              <p className="text-xs text-muted-foreground">UZS</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">To'langan</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">{(totalPaid / 1000000).toFixed(1)}M</div>
              <p className="text-xs text-muted-foreground">UZS</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Qolgan</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">{(totalRemaining / 1000000).toFixed(1)}M</div>
              <p className="text-xs text-muted-foreground">UZS</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Kechikkan</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600">{overdueCount}</div>
              <p className="text-xs text-muted-foreground">To'lovlar</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Yaqin to'lovlar</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-orange-600">{upcomingCount}</div>
              <p className="text-xs text-muted-foreground">7 kun ichida</p>
            </CardContent>
          </Card>
        </div>

        {/* Urgent Alerts */}
        {(overdueCount > 0 || upcomingCount > 0) && (
          <Card className="mb-6 border-orange-200 bg-orange-50">
            <CardHeader>
              <CardTitle className="flex items-center text-orange-800">
                <AlertTriangle className="mr-2 h-5 w-5" />
                Diqqat talab qiladigan to'lovlar
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {overdueCount > 0 && <p className="text-red-700">🚨 {overdueCount} ta to'lov muddati o'tgan</p>}
                {upcomingCount > 0 && <p className="text-orange-700">⏰ {upcomingCount} ta to'lov 7 kun ichida</p>}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Credit Sales Table */}
        <Card>
          <CardHeader>
            <CardTitle>Nasiya sotuvlar ro'yxati</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Telefon</TableHead>
                    <TableHead>Mijoz</TableHead>
                    <TableHead>Jami summa</TableHead>
                    <TableHead>To'langan</TableHead>
                    <TableHead>Qolgan</TableHead>
                    <TableHead>Oylik to'lov</TableHead>
                    <TableHead>Keyingi to'lov</TableHead>
                    <TableHead>Holat</TableHead>
                    <TableHead>Progress</TableHead>
                    <TableHead>Amallar</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {creditSales.map((sale) => (
                    <TableRow key={sale.id}>
                      <TableCell className="font-medium">{sale.phone}</TableCell>
                      <TableCell>{sale.customer}</TableCell>
                      <TableCell className="font-mono">{(sale.totalAmount / 1000).toLocaleString()} ming</TableCell>
                      <TableCell className="font-mono text-green-600">
                        {(sale.paidAmount / 1000).toLocaleString()} ming
                      </TableCell>
                      <TableCell className="font-mono text-blue-600">
                        {(sale.remainingAmount / 1000).toLocaleString()} ming
                      </TableCell>
                      <TableCell className="font-mono">{(sale.monthlyPayment / 1000).toLocaleString()} ming</TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          {getStatusIcon(sale.status, sale.daysUntilPayment)}
                          <div>
                            <p className="text-sm">{sale.nextPaymentDate}</p>
                            <p
                              className={`text-xs ${
                                sale.daysUntilPayment < 0
                                  ? "text-red-600"
                                  : sale.daysUntilPayment <= 3
                                    ? "text-orange-600"
                                    : "text-muted-foreground"
                              }`}
                            >
                              {sale.daysUntilPayment < 0
                                ? `${Math.abs(sale.daysUntilPayment)} kun kechikkan`
                                : sale.daysUntilPayment === 0
                                  ? "Bugun"
                                  : `${sale.daysUntilPayment} kun qoldi`}
                            </p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>{getStatusBadge(sale.status, sale.daysUntilPayment)}</TableCell>
                      <TableCell>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-blue-600 h-2 rounded-full"
                            style={{ width: `${(sale.paidInstallments / sale.installments) * 100}%` }}
                          ></div>
                        </div>
                        <p className="text-xs text-muted-foreground mt-1">
                          {sale.paidInstallments}/{sale.installments}
                        </p>
                      </TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button variant="outline" size="sm">
                            <DollarSign className="h-4 w-4 mr-1" />
                            To'lov
                          </Button>
                          <Button variant="outline" size="sm">
                            Ko'rish
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
