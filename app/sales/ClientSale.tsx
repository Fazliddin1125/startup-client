"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DollarSign, Search, Calendar, Phone, Package, TrendingUp, Filter, Download, Eye, Menu, X } from "lucide-react"

import Link from "next/link"

import { ThemeToggle } from "@/components/theme-toggle"
import { ISale } from "@/types"
import { format } from "date-fns"
import numeral from "numeral";
import { uz } from "date-fns/locale"
import { useRouter, useSearchParams } from "next/navigation"
import { formUrlQuery } from "@/lib/formUrlQuery"
// Mock sales data
interface SaleProps {
  sales: ISale[]
}


export default function SalesPage({ sales }: SaleProps) {

  const [searchTerm, setSearchTerm] = useState("")
  const [typeFilter, setTypeFilter] = useState("all")
  const [paymentFilter, setPaymentFilter] = useState("all")

  const [activeTab, setActiveTab] = useState("all")

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const router = useRouter()
  const searchParams = useSearchParams()
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }








  // Calculate statistics


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
                <DollarSign className="h-6 w-6 sm:h-8 sm:w-8" />
              </Link>
              <h1 className="text-lg sm:text-2xl font-bold text-foreground">Sotuvlar</h1>
            </div>
            <div className="flex items-center space-x-2">
              <ThemeToggle />
              <Button variant="outline" className="hidden sm:flex">
                <Download className="mr-2 h-4 w-4" />
                Export
              </Button>
              <Link href="/sales/new" className="hidden sm:block">
                <Button>Yangi sotuv</Button>
              </Link>
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
              className="block px-3 py-2 text-blue-600 font-medium bg-blue-50 rounded-md"
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
      <nav className="hidden sm:block bg-card shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-8 py-3">
            <Link href="/" className="text-muted-foreground hover:text-foreground pb-2">
              Bosh sahifa
            </Link>
            <Link href="/phones" className="text-muted-foreground hover:text-foreground pb-2">
              Telefonlar
            </Link>
            <Link href="/sales" className="text-blue-600 font-medium border-b-2 border-blue-600 pb-2">
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
        {/* Mobile Action Buttons */}
        <div className="sm:hidden mb-4 flex space-x-2">
          <Button variant="outline" className="flex-1">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
          <Link href="/sales/new" className="flex-1">
            <Button className="w-full">Yangi sotuv</Button>
          </Link>
        </div>
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Jami sotuvlar</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">00</div>
              <p className="text-xs text-muted-foreground">
                00 telefon, 00 aksessuar
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Jami tushuv</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">00 M</div>
              <p className="text-xs text-muted-foreground">UZS</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Jami foyda</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">00 M</div>
              <p className="text-xs text-muted-foreground">00 % margin</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Bugungi foyda</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">00 </div>
              <p className="text-xs text-muted-foreground">00 ta sotuv</p>
            </CardContent>
          </Card>
        </div>

        {/* Payment Type Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <Card>
            <CardHeader>
              <CardTitle>To'lov turlari</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                    <span>Naqd to'lovlar</span>
                  </div>
                  <div className="text-right">
                    <p className="font-bold">00</p>
                    <p className="text-sm text-muted-foreground">
                      00 M
                    </p>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-orange-500 rounded-full mr-2"></div>
                    <span>Nasiya sotuvlar</span>
                  </div>
                  <div className="text-right">
                    <p className="font-bold">00</p>
                    <p className="text-sm text-muted-foreground">
                      00
                      M
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Mahsulot turlari</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <Phone className="w-4 h-4 text-blue-500 mr-2" />
                    <span>Telefonlar</span>
                  </div>
                  <div className="text-right">
                    <p className="font-bold">00 </p>
                    <p className="text-sm text-muted-foreground">
                      00 M
                      foyda
                    </p>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <Package className="w-4 h-4 text-green-500 mr-2" />
                    <span>Aksessuarlar</span>
                  </div>
                  <div className="text-right">
                    <p className="font-bold">00</p>
                    <p className="text-sm text-muted-foreground">
                      00
                      K foyda
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Filter className="mr-2 h-5 w-5" />
              Filtrlar
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Qidirish..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select onValueChange={onFilterChange}>
                <SelectTrigger >
                  <SelectValue placeholder="Vaqt oralig'ini tanlang" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="today">Bugun</SelectItem>
                  <SelectItem value="yesterday">Kecha</SelectItem>
                  <SelectItem value="current-month">Joriy oy</SelectItem>
                  <SelectItem value="last-month">O‘tgan oy</SelectItem>
                  <SelectItem value="last-3-months">So‘nggi 3 oy</SelectItem>
                  <SelectItem value="last-6-months">So‘nggi 6 oy</SelectItem>
                  <SelectItem value="current-year">Joriy yil</SelectItem>
                </SelectContent>
              </Select>
              <Select>
                <SelectTrigger >
                  <SelectValue placeholder="Brend tanlang" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="today">Bugun</SelectItem>
                  <SelectItem value="yesterday">Kecha</SelectItem>
                  <SelectItem value="current-month">Joriy oy</SelectItem>
                  <SelectItem value="last-month">O‘tgan oy</SelectItem>
                  <SelectItem value="last-3-months">So‘nggi 3 oy</SelectItem>
                  <SelectItem value="last-6-months">So‘nggi 6 oy</SelectItem>
                  <SelectItem value="current-year">Joriy yil</SelectItem>
                </SelectContent>
              </Select>
              <Select value={typeFilter} onValueChange={setTypeFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Mahsulot turi" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Barchasi</SelectItem>
                  <SelectItem value="phone">Telefonlar</SelectItem>
                  <SelectItem value="accessory">Aksessuarlar</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Sales Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="all">Barcha sotuvlar 0</TabsTrigger>
            <TabsTrigger value="phone">Telefonlar 0</TabsTrigger>
            <TabsTrigger value="accessory">Aksessuarlar 0</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="space-y-6">
            <SalesTable sales={sales} />
          </TabsContent>

          <TabsContent value="phone" className="space-y-6">
            {/* <SalesTable sales={filteredSales.filter((s) => s.type === "phone")} onViewDetails={handleViewDetails} /> */}
          </TabsContent>

          <TabsContent value="accessory" className="space-y-6">
            {/* <SalesTable sales={filteredSales.filter((s) => s.type === "accessory")} onViewDetails={handleViewDetails} /> */}
          </TabsContent>
        </Tabs>



      </main>
    </div>
  )
}

// Sales Table Component
function SalesTable({ sales }: { sales: ISale[]; }) {
  const getTypeBadge = (type: string) => {
    return type === "phone" ? (
      <Badge className="bg-blue-100 text-blue-800">
        <Phone className="w-3 h-3 mr-1" />
        Telefon
      </Badge>
    ) : (
      <Badge className="bg-green-100 text-green-800">
        <Package className="w-3 h-3 mr-1" />
        Aksessuar
      </Badge>
    )
  }

  const getPaymentBadge = (paymentType: string) => {
    return paymentType === "Naqd" ? (
      <Badge className="bg-emerald-100 text-emerald-800">Naqd</Badge>
    ) : (
      <Badge className="bg-orange-100 text-orange-800">Nasiya</Badge>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Sotuvlar ro'yxati</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>

                <TableHead>Mahsulot</TableHead>
                <TableHead>Sana/Vaqt</TableHead>

                <TableHead>Narx</TableHead>
                <TableHead>Foyda</TableHead>
                <TableHead>Amallar</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sales.map((sale) => (
                <TableRow key={sale._id}>

                  <TableCell>
                    <div>
                      <p className="font-medium">{sale.phone.name}</p>
                      <p className="text-sm text-muted-foreground">{sale.phone.brend.name}</p>

                      <p className="text-xs text-muted-foreground">
                        {sale.phone.color.name} • {sale.phone.capacity.name}
                      </p>

                    </div>
                  </TableCell>

                  <TableCell>
                    <div>
                      <p className="font-medium">{format(new Date(sale.createdAt), "d MMMM yyyy", { locale: uz })}</p>
                      <p className="text-sm text-muted-foreground">{format(new Date(sale.createdAt), "d MMMM yyyy", { locale: uz })}</p>
                    </div>
                  </TableCell>

                  <TableCell className="font-mono">
                    {numeral(sale.price).format("0,0")} so'm
                  </TableCell>
                  <TableCell className="font-mono text-green-600">
                    {numeral(sale.benifit).format("0,0")} so'm
                  </TableCell>
                  <TableCell>tolov turi</TableCell>

                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {sales.length === 0 && (
          <div className="text-center py-12">
            <DollarSign className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium text-foreground mb-2">Sotuvlar topilmadi</h3>
            <p className="text-muted-foreground">Filtrlarni o'zgartiring yoki yangi sotuv qo'shing.</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
