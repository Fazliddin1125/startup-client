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
import Image from "next/image"
import Link from "next/link"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { ThemeToggle } from "@/components/theme-toggle"

// Mock sales data
const sales = [
  {
    id: 1,
    type: "phone",
    itemName: "iPhone 14 Pro",
    brand: "Apple",
    color: "Deep Purple",
    storage: "128GB",
    costPrice: 10500000,
    sellPrice: 12500000,
    profit: 2000000,
    customer: "Akmal Usmonov",
    customerPhone: "+998901234567",
    saleDate: "2024-02-15",
    saleTime: "14:30",
    paymentType: "Naqd",
    image: "/placeholder.svg?height=60&width=60",
    quantity: 1,
  },
  {
    id: 2,
    type: "accessory",
    itemName: "iPhone 14 Pro Silikon Chixol",
    brand: "Apple",
    category: "Chixol",
    costPrice: 65000,
    sellPrice: 85000,
    profit: 20000,
    customer: "Malika Karimova",
    customerPhone: "+998901234568",
    saleDate: "2024-02-15",
    saleTime: "15:45",
    paymentType: "Naqd",
    image: "/placeholder.svg?height=60&width=60",
    quantity: 1,
  },
  {
    id: 3,
    type: "phone",
    itemName: "Samsung Galaxy S23",
    brand: "Samsung",
    color: "Phantom Black",
    storage: "256GB",
    costPrice: 7500000,
    sellPrice: 8900000,
    profit: 1400000,
    customer: "Otabek Nazarov",
    customerPhone: "+998901234569",
    saleDate: "2024-02-14",
    saleTime: "11:20",
    paymentType: "Nasiya",
    image: "/placeholder.svg?height=60&width=60",
    quantity: 1,
  },
  {
    id: 4,
    type: "accessory",
    itemName: "Tempered Glass Himoya oynasi",
    brand: "Universal",
    category: "Himoya",
    costPrice: 18000,
    sellPrice: 25000,
    profit: 7000,
    customer: "Dilshod Toshev",
    customerPhone: "+998901234570",
    saleDate: "2024-02-14",
    saleTime: "16:10",
    paymentType: "Naqd",
    image: "/placeholder.svg?height=60&width=60",
    quantity: 2,
  },
  {
    id: 5,
    type: "phone",
    itemName: "Xiaomi 13",
    brand: "Xiaomi",
    color: "White",
    storage: "256GB",
    costPrice: 5200000,
    sellPrice: 6200000,
    profit: 1000000,
    customer: "Sevara Abdullayeva",
    customerPhone: "+998901234571",
    saleDate: "2024-02-13",
    saleTime: "13:15",
    paymentType: "Naqd",
    image: "/placeholder.svg?height=60&width=60",
    quantity: 1,
  },
  {
    id: 6,
    type: "accessory",
    itemName: "Type-C Tez zaryadlash kabeli",
    brand: "Samsung",
    category: "Kabel",
    costPrice: 35000,
    sellPrice: 45000,
    profit: 10000,
    customer: "Jasur Rahimov",
    customerPhone: "+998901234572",
    saleDate: "2024-02-13",
    saleTime: "09:30",
    paymentType: "Naqd",
    image: "/placeholder.svg?height=60&width=60",
    quantity: 1,
  },
  {
    id: 7,
    type: "accessory",
    itemName: "AirPods Pro 2-avlod",
    brand: "Apple",
    category: "Quloqchin",
    costPrice: 2400000,
    sellPrice: 2800000,
    profit: 400000,
    customer: "Nodira Ismoilova",
    customerPhone: "+998901234573",
    saleDate: "2024-02-12",
    saleTime: "17:45",
    paymentType: "Naqd",
    image: "/placeholder.svg?height=60&width=60",
    quantity: 1,
  },
]

export default function SalesPage() {
  const [selectedSale, setSelectedSale] = useState<any>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [typeFilter, setTypeFilter] = useState("all")
  const [paymentFilter, setPaymentFilter] = useState("all")
  const [dateFilter, setDateFilter] = useState("all")
  const [activeTab, setActiveTab] = useState("all")

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  const filteredSales = sales.filter((sale) => {
    const matchesSearch =
      sale.itemName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      sale.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      sale.brand.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesType = typeFilter === "all" || sale.type === typeFilter
    const matchesPayment = paymentFilter === "all" || sale.paymentType === paymentFilter
    const matchesTab = activeTab === "all" || sale.type === activeTab

    let matchesDate = true
    if (dateFilter === "today") {
      matchesDate = sale.saleDate === "2024-02-15"
    } else if (dateFilter === "week") {
      matchesDate = ["2024-02-15", "2024-02-14", "2024-02-13", "2024-02-12"].includes(sale.saleDate)
    }

    return matchesSearch && matchesType && matchesPayment && matchesDate && matchesTab
  })

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

  const handleViewDetails = (sale: any) => {
    setSelectedSale(sale)
    setIsDialogOpen(true)
  }

  // Calculate statistics
  const totalSales = filteredSales.length
  const totalRevenue = filteredSales.reduce((sum, sale) => sum + sale.sellPrice * sale.quantity, 0)
  const totalProfit = filteredSales.reduce((sum, sale) => sum + sale.profit * sale.quantity, 0)
  const totalCost = filteredSales.reduce((sum, sale) => sum + sale.costPrice * sale.quantity, 0)

  const phoneSales = filteredSales.filter((sale) => sale.type === "phone")
  const accessorySales = filteredSales.filter((sale) => sale.type === "accessory")
  const cashSales = filteredSales.filter((sale) => sale.paymentType === "Naqd")
  const creditSales = filteredSales.filter((sale) => sale.paymentType === "Nasiya")

  const todaySales = sales.filter((sale) => sale.saleDate === "2024-02-15")
  const todayProfit = todaySales.reduce((sum, sale) => sum + sale.profit * sale.quantity, 0)

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
              <div className="text-2xl font-bold">{totalSales}</div>
              <p className="text-xs text-muted-foreground">
                {phoneSales.length} telefon, {accessorySales.length} aksessuar
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Jami tushuv</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{(totalRevenue / 1000000).toFixed(1)}M</div>
              <p className="text-xs text-muted-foreground">UZS</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Jami foyda</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">{(totalProfit / 1000000).toFixed(1)}M</div>
              <p className="text-xs text-muted-foreground">{((totalProfit / totalRevenue) * 100).toFixed(1)}% margin</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Bugungi foyda</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">{(todayProfit / 1000).toLocaleString()}K</div>
              <p className="text-xs text-muted-foreground">{todaySales.length} ta sotuv</p>
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
                    <p className="font-bold">{cashSales.length}</p>
                    <p className="text-sm text-muted-foreground">
                      {(cashSales.reduce((sum, sale) => sum + sale.sellPrice * sale.quantity, 0) / 1000000).toFixed(1)}M
                    </p>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-orange-500 rounded-full mr-2"></div>
                    <span>Nasiya sotuvlar</span>
                  </div>
                  <div className="text-right">
                    <p className="font-bold">{creditSales.length}</p>
                    <p className="text-sm text-muted-foreground">
                      {(creditSales.reduce((sum, sale) => sum + sale.sellPrice * sale.quantity, 0) / 1000000).toFixed(
                        1,
                      )}
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
                    <p className="font-bold">{phoneSales.length}</p>
                    <p className="text-sm text-muted-foreground">
                      {(phoneSales.reduce((sum, sale) => sum + sale.profit * sale.quantity, 0) / 1000000).toFixed(1)}M
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
                    <p className="font-bold">{accessorySales.length}</p>
                    <p className="text-sm text-muted-foreground">
                      {(
                        accessorySales.reduce((sum, sale) => sum + sale.profit * sale.quantity, 0) / 1000
                      ).toLocaleString()}
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
              <Select value={dateFilter} onValueChange={setDateFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Sana" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Barcha sanalar</SelectItem>
                  <SelectItem value="today">Bugun</SelectItem>
                  <SelectItem value="week">Bu hafta</SelectItem>
                  <SelectItem value="month">Bu oy</SelectItem>
                </SelectContent>
              </Select>
              <Select value={paymentFilter} onValueChange={setPaymentFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="To'lov turi" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Barcha to'lovlar</SelectItem>
                  <SelectItem value="Naqd">Naqd</SelectItem>
                  <SelectItem value="Nasiya">Nasiya</SelectItem>
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
            <TabsTrigger value="all">Barcha sotuvlar ({filteredSales.length})</TabsTrigger>
            <TabsTrigger value="phone">Telefonlar ({phoneSales.length})</TabsTrigger>
            <TabsTrigger value="accessory">Aksessuarlar ({accessorySales.length})</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="space-y-6">
            <SalesTable sales={filteredSales} onViewDetails={handleViewDetails} />
          </TabsContent>

          <TabsContent value="phone" className="space-y-6">
            <SalesTable sales={filteredSales.filter((s) => s.type === "phone")} onViewDetails={handleViewDetails} />
          </TabsContent>

          <TabsContent value="accessory" className="space-y-6">
            <SalesTable sales={filteredSales.filter((s) => s.type === "accessory")} onViewDetails={handleViewDetails} />
          </TabsContent>
        </Tabs>

        {/* Sale Details Modal */}
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Sotuv tafsilotlari</DialogTitle>
              <DialogDescription>
                #{selectedSale?.id} - {selectedSale?.saleDate} {selectedSale?.saleTime}
              </DialogDescription>
            </DialogHeader>

            {selectedSale && (
              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <Image
                    src={selectedSale.image || "/placeholder.svg"}
                    alt={selectedSale.itemName}
                    width={80}
                    height={80}
                    className="rounded-lg object-cover"
                  />
                  <div className="flex-1">
                    <h3 className="font-semibold">{selectedSale.itemName}</h3>
                    <p className="text-sm text-muted-foreground">{selectedSale.brand}</p>
                    {selectedSale.type === "phone" && (
                      <p className="text-sm text-muted-foreground">
                        {selectedSale.color} • {selectedSale.storage}
                      </p>
                    )}
                    {selectedSale.type === "accessory" && (
                      <p className="text-sm text-muted-foreground">{selectedSale.category}</p>
                    )}
                  </div>
                  <div className="text-right">
                    {getTypeBadge(selectedSale.type)}
                    <div className="mt-1">{getPaymentBadge(selectedSale.paymentType)}</div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Mijoz</p>
                    <p className="font-medium">{selectedSale.customer}</p>
                    <p className="text-sm text-muted-foreground">{selectedSale.customerPhone}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Miqdor</p>
                    <p className="font-medium">{selectedSale.quantity} dona</p>
                  </div>
                </div>

                <div className="border-t pt-4">
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Kirim narxi:</span>
                      <span>{(selectedSale.costPrice / 1000).toLocaleString()} ming UZS</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Sotish narxi:</span>
                      <span>{(selectedSale.sellPrice / 1000).toLocaleString()} ming UZS</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Jami summa:</span>
                      <span className="font-bold">
                        {((selectedSale.sellPrice * selectedSale.quantity) / 1000).toLocaleString()} ming UZS
                      </span>
                    </div>
                    <div className="flex justify-between text-green-600">
                      <span>Foyda:</span>
                      <span className="font-bold">
                        +{((selectedSale.profit * selectedSale.quantity) / 1000).toLocaleString()} ming UZS
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </main>
    </div>
  )
}

// Sales Table Component
function SalesTable({ sales, onViewDetails }: { sales: any[]; onViewDetails: (sale: any) => void }) {
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
                <TableHead>Rasm</TableHead>
                <TableHead>Mahsulot</TableHead>
                <TableHead>Turi</TableHead>
                <TableHead>Mijoz</TableHead>
                <TableHead>Sana/Vaqt</TableHead>
                <TableHead>Miqdor</TableHead>
                <TableHead>Narx</TableHead>
                <TableHead>Foyda</TableHead>
                <TableHead>To'lov</TableHead>
                <TableHead>Amallar</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sales.map((sale) => (
                <TableRow key={sale.id}>
                  <TableCell>
                    <Image
                      src={sale.image || "/placeholder.svg"}
                      alt={sale.itemName}
                      width={50}
                      height={50}
                      className="rounded-lg object-cover"
                    />
                  </TableCell>
                  <TableCell>
                    <div>
                      <p className="font-medium">{sale.itemName}</p>
                      <p className="text-sm text-muted-foreground">{sale.brand}</p>
                      {sale.type === "phone" && (
                        <p className="text-xs text-muted-foreground">
                          {sale.color} • {sale.storage}
                        </p>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>{getTypeBadge(sale.type)}</TableCell>
                  <TableCell>
                    <div>
                      <p className="font-medium">{sale.customer}</p>
                      <p className="text-sm text-muted-foreground">{sale.customerPhone}</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div>
                      <p className="font-medium">{sale.saleDate}</p>
                      <p className="text-sm text-muted-foreground">{sale.saleTime}</p>
                    </div>
                  </TableCell>
                  <TableCell className="text-center font-medium">{sale.quantity}</TableCell>
                  <TableCell className="font-mono">
                    {((sale.sellPrice * sale.quantity) / 1000).toLocaleString()} ming
                  </TableCell>
                  <TableCell className="font-mono text-green-600">
                    +{((sale.profit * sale.quantity) / 1000).toLocaleString()} ming
                  </TableCell>
                  <TableCell>{getPaymentBadge(sale.paymentType)}</TableCell>
                  <TableCell>
                    <Button variant="outline" size="sm" onClick={() => onViewDetails(sale)}>
                      <Eye className="h-4 w-4 mr-1" />
                      Ko'rish
                    </Button>
                  </TableCell>
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
