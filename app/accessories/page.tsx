"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { ShoppingBag, Plus, Search, Package, TrendingUp, Calendar, Menu, X } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { ThemeToggle } from "@/components/theme-toggle"

// Mock data with cost and sell prices
const accessories = [
  {
    id: 1,
    name: "iPhone 14 Pro Silikon Chixol",
    category: "Chixol",
    brand: "Apple",
    costPrice: 65000,
    sellPrice: 85000,
    stock: 25,
    soldThisWeek: 3,
    soldThisMonth: 12,
    description: "Original Apple silikon chixol, barcha ranglar mavjud",
    image: "/placeholder.svg?height=200&width=200",
    addedDate: "2024-01-15",
  },
  {
    id: 2,
    name: "Tempered Glass Himoya oynasi",
    category: "Himoya",
    brand: "Universal",
    costPrice: 18000,
    sellPrice: 25000,
    stock: 150,
    soldThisWeek: 8,
    soldThisMonth: 35,
    description: "9H qattiqlikdagi himoya oynasi, barcha modellar uchun",
    image: "/placeholder.svg?height=200&width=200",
    addedDate: "2024-01-10",
  },
  {
    id: 3,
    name: "Type-C Tez zaryadlash kabeli",
    category: "Kabel",
    brand: "Samsung",
    costPrice: 35000,
    sellPrice: 45000,
    stock: 80,
    soldThisWeek: 5,
    soldThisMonth: 18,
    description: "Original Samsung 25W tez zaryadlash kabeli",
    image: "/placeholder.svg?height=200&width=200",
    addedDate: "2024-01-08",
  },
  {
    id: 4,
    name: "AirPods Pro 2-avlod",
    category: "Quloqchin",
    brand: "Apple",
    costPrice: 2400000,
    sellPrice: 2800000,
    stock: 5,
    soldThisWeek: 1,
    soldThisMonth: 3,
    description: "Shovqinni bekor qiluvchi original Apple quloqchinlar",
    image: "/placeholder.svg?height=200&width=200",
    addedDate: "2024-01-20",
  },
  {
    id: 5,
    name: "Portativ Power Bank 20000mAh",
    category: "Zaryadlovchi",
    brand: "Xiaomi",
    costPrice: 150000,
    sellPrice: 180000,
    stock: 0,
    soldThisWeek: 0,
    soldThisMonth: 8,
    description: "Tez zaryadlash funksiyasi bilan portativ zaryadlovchi",
    image: "/placeholder.svg?height=200&width=200",
    addedDate: "2024-01-05",
  },
  {
    id: 6,
    name: "Bluetooth Kalonka",
    category: "Kalonka",
    brand: "JBL",
    costPrice: 280000,
    sellPrice: 350000,
    stock: 12,
    soldThisWeek: 2,
    soldThisMonth: 6,
    description: "Suv o'tkazmaydigan portativ Bluetooth kalonka",
    image: "/placeholder.svg?height=200&width=200",
    addedDate: "2024-01-12",
  },
]

const categories = ["Barchasi", "Chixol", "Himoya", "Kabel", "Quloqchin", "Zaryadlovchi", "Kalonka"]
const brands = ["Barchasi", "Apple", "Samsung", "Xiaomi", "JBL", "Universal"]

export default function AccessoriesPage() {
  const [selectedAccessory, setSelectedAccessory] = useState<any>(null)
  const [sellPrice, setSellPrice] = useState("")
  const [quantity, setQuantity] = useState("1")
  const [customerName, setCustomerName] = useState("")
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("Barchasi")
  const [brandFilter, setBrandFilter] = useState("Barchasi")
  const [sortBy, setSortBy] = useState("name")

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  const filteredAccessories = accessories
    .filter((item) => {
      const matchesSearch =
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.description.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesCategory = categoryFilter === "Barchasi" || item.category === categoryFilter
      const matchesBrand = brandFilter === "Barchasi" || item.brand === brandFilter

      return matchesSearch && matchesCategory && matchesBrand
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "stock-low":
          return a.stock - b.stock
        case "stock-high":
          return b.stock - a.stock
        case "profit":
          return b.sellPrice - b.costPrice - (a.sellPrice - a.costPrice)
        case "sold":
          return b.soldThisMonth - a.soldThisMonth
        default:
          return a.name.localeCompare(b.name)
      }
    })

  const getCategoryBadge = (category: string) => {
    const colors = {
      Chixol: "bg-blue-100 text-blue-800",
      Himoya: "bg-green-100 text-green-800",
      Kabel: "bg-purple-100 text-purple-800",
      Quloqchin: "bg-pink-100 text-pink-800",
      Zaryadlovchi: "bg-orange-100 text-orange-800",
      Kalonka: "bg-indigo-100 text-indigo-800",
    }
    return <Badge className={colors[category as keyof typeof colors] || "bg-gray-100 text-gray-800"}>{category}</Badge>
  }

  const handleSell = (accessory: any) => {
    setSelectedAccessory(accessory)
    setSellPrice(accessory.sellPrice.toString())
    setIsDialogOpen(true)
  }

  const handleSaleSubmit = () => {
    const saleData = {
      accessory: selectedAccessory,
      price: Number.parseInt(sellPrice),
      quantity: Number.parseInt(quantity),
      customer: customerName,
      profit: (Number.parseInt(sellPrice) - selectedAccessory.costPrice) * Number.parseInt(quantity),
    }

    
    alert(`${selectedAccessory.name} (${quantity} dona) sotildi! Foyda: ${saleData.profit.toLocaleString()} UZS`)

    // Reset form
    setIsDialogOpen(false)
    setCustomerName("")
    setSellPrice("")
    setQuantity("1")
    setSelectedAccessory(null)
  }

  // Calculate statistics
  const totalValue = accessories.reduce((sum, item) => sum + item.costPrice * item.stock, 0)
  const totalItems = accessories.reduce((sum, item) => sum + item.stock, 0)
  const outOfStock = accessories.filter((item) => item.stock === 0).length
  const lowStock = accessories.filter((item) => item.stock > 0 && item.stock <= 5).length

  const weeklyProfit = accessories.reduce((sum, item) => sum + (item.sellPrice - item.costPrice) * item.soldThisWeek, 0)
  const monthlyProfit = accessories.reduce(
    (sum, item) => sum + (item.sellPrice - item.costPrice) * item.soldThisMonth,
    0,
  )
  const weeklySales = accessories.reduce((sum, item) => sum + item.soldThisWeek, 0)
  const monthlySales = accessories.reduce((sum, item) => sum + item.soldThisMonth, 0)

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card shadow-sm border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-2 sm:space-x-4">
              <Link href="/" className="text-blue-600 hover:text-blue-800">
                <ShoppingBag className="h-6 w-6 sm:h-8 sm:w-8" />
              </Link>
              <h1 className="text-lg sm:text-2xl font-bold text-foreground">Aksessuarlar Omborxonasi</h1>
            </div>
            <div className="flex items-center space-x-2">
              <ThemeToggle />
              <Button className="hidden sm:flex">
                <Plus className="mr-2 h-4 w-4" />
                Aksessuar qo'shish
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
              className="block px-3 py-2 text-blue-600 font-medium bg-blue-50 rounded-md"
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
            <Link href="/credit" className="text-muted-foreground hover:text-foreground pb-2">
              Nasiya
            </Link>
            <Link href="/services" className="text-muted-foreground hover:text-foreground pb-2">
              Xizmatlar
            </Link>
            <Link href="/accessories" className="text-blue-600 font-medium border-b-2 border-blue-600 pb-2">
              Aksessuarlar
            </Link>
            <Link href="/reports" className="text-muted-foreground hover:text-foreground pb-2">
              Hisobotlar
            </Link>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8">
        {/* Mobile Add Button */}
        <div className="sm:hidden mb-4">
          <Button className="w-full">
            <Plus className="mr-2 h-4 w-4" />
            Aksessuar qo'shish
          </Button>
        </div>
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="bg-card">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-foreground">Jami qiymat</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">{(totalValue / 1000000).toFixed(1)}M</div>
              <p className="text-xs text-muted-foreground">UZS (ombordagi)</p>
            </CardContent>
          </Card>
          <Card className="bg-card">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-foreground">Jami dona</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">{totalItems}</div>
              <p className="text-xs text-muted-foreground">Omborda</p>
            </CardContent>
          </Card>
          <Card className="bg-card">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-foreground">Tugagan/Kam</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600">
                {outOfStock}/{lowStock}
              </div>
              <p className="text-xs text-muted-foreground">Tugagan/5 dan kam</p>
            </CardContent>
          </Card>
          <Card className="bg-card">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-foreground">Oylik foyda</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">{(monthlyProfit / 1000).toLocaleString()}K</div>
              <p className="text-xs text-muted-foreground">UZS</p>
            </CardContent>
          </Card>
        </div>

        {/* Weekly/Monthly Summary */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <Card className="bg-card">
            <CardHeader>
              <CardTitle className="flex items-center text-foreground">
                <Calendar className="mr-2 h-5 w-5" />
                Haftalik hisobot
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Sotildi:</span>
                  <span className="font-bold text-foreground">{weeklySales} dona</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Foyda:</span>
                  <span className="font-bold text-green-600">{(weeklyProfit / 1000).toLocaleString()} ming UZS</span>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-card">
            <CardHeader>
              <CardTitle className="flex items-center text-foreground">
                <TrendingUp className="mr-2 h-5 w-5" />
                Oylik hisobot
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Sotildi:</span>
                  <span className="font-bold text-foreground">{monthlySales} dona</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Foyda:</span>
                  <span className="font-bold text-green-600">{(monthlyProfit / 1000).toLocaleString()} ming UZS</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card className="mb-6 bg-card">
          <CardHeader>
            <CardTitle className="text-foreground">Qidiruv va filtrlar</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Aksessuar qidirish..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 bg-accent"
                />
              </div>
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger className="bg-accent">
                  <SelectValue placeholder="Kategoriya" />
                </SelectTrigger>
                <SelectContent className="bg-card">
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={brandFilter} onValueChange={setBrandFilter}>
                <SelectTrigger className="bg-accent">
                  <SelectValue placeholder="Brend" />
                </SelectTrigger>
                <SelectContent className="bg-card">
                  {brands.map((brand) => (
                    <SelectItem key={brand} value={brand}>
                      {brand}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="bg-accent">
                  <SelectValue placeholder="Saralash" />
                </SelectTrigger>
                <SelectContent className="bg-card">
                  <SelectItem value="name">Nom bo'yicha</SelectItem>
                  <SelectItem value="stock-low">Kam qolgan</SelectItem>
                  <SelectItem value="stock-high">Ko'p qolgan</SelectItem>
                  <SelectItem value="profit">Foyda bo'yicha</SelectItem>
                  <SelectItem value="sold">Sotilgan bo'yicha</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Accessories Table */}
        <Card className="bg-card">
          <CardHeader>
            <CardTitle className="text-foreground">Aksessuarlar ro'yxati ({filteredAccessories.length})</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="text-foreground">Rasm</TableHead>
                    <TableHead className="text-foreground">Aksessuar</TableHead>
                    <TableHead className="text-foreground">Kategoriya</TableHead>
                    <TableHead className="text-foreground">Ombor</TableHead>
                    <TableHead className="text-foreground">Kirim narxi</TableHead>
                    <TableHead className="text-foreground">Chiqim narxi</TableHead>
                    <TableHead className="text-foreground">Foyda</TableHead>
                    <TableHead className="text-foreground">Haftalik</TableHead>
                    <TableHead className="text-foreground">Oylik</TableHead>
                    <TableHead className="text-foreground">Amallar</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredAccessories.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell>
                        <Image
                          src={item.image || "/placeholder.svg"}
                          alt={item.name}
                          width={50}
                          height={50}
                          className="rounded-lg object-cover"
                        />
                      </TableCell>
                      <TableCell>
                        <div>
                          <p className="font-medium text-foreground">{item.name}</p>
                          <p className="text-sm text-muted-foreground">{item.brand}</p>
                        </div>
                      </TableCell>
                      <TableCell>{getCategoryBadge(item.category)}</TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          <Package className="h-4 w-4 mr-1 text-muted-foreground" />
                          <span
                            className={`font-medium ${
                              item.stock === 0 ? "text-red-600" : item.stock <= 5 ? "text-orange-600" : "text-green-600"
                            }`}
                          >
                            {item.stock}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell className="font-mono text-foreground">
                        {(item.costPrice / 1000).toLocaleString()} ming
                      </TableCell>
                      <TableCell className="font-mono text-foreground">
                        {(item.sellPrice / 1000).toLocaleString()} ming
                      </TableCell>
                      <TableCell className="font-mono text-green-600">
                        +{((item.sellPrice - item.costPrice) / 1000).toLocaleString()} ming
                      </TableCell>
                      <TableCell>
                        <div className="text-center">
                          <p className="font-medium text-foreground">{item.soldThisWeek}</p>
                          <p className="text-xs text-muted-foreground">
                            {(((item.sellPrice - item.costPrice) * item.soldThisWeek) / 1000).toLocaleString()}K
                          </p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="text-center">
                          <p className="font-medium text-foreground">{item.soldThisMonth}</p>
                          <p className="text-xs text-muted-foreground">
                            {(((item.sellPrice - item.costPrice) * item.soldThisMonth) / 1000).toLocaleString()}K
                          </p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          {item.stock > 0 && (
                            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                              <DialogTrigger asChild>
                                <Button
                                  variant="default"
                                  size="sm"
                                  onClick={() => handleSell(item)}
                                  className="bg-green-600 hover:bg-green-700"
                                >
                                  Sotish
                                </Button>
                              </DialogTrigger>
                              <DialogContent className="sm:max-w-[400px] bg-card">
                                <DialogHeader>
                                  <DialogTitle className="text-foreground">Aksessuar sotish</DialogTitle>
                                  <DialogDescription className="text-muted-foreground">
                                    {selectedAccessory?.name} sotish uchun ma'lumotlarni kiriting
                                  </DialogDescription>
                                </DialogHeader>

                                <div className="grid gap-4 py-4">
                                  <div className="space-y-2">
                                    <Label htmlFor="quantity">Miqdori</Label>
                                    <Select value={quantity} onValueChange={setQuantity}>
                                      <SelectTrigger className="bg-accent">
                                        <SelectValue />
                                      </SelectTrigger>
                                      <SelectContent className="bg-card">
                                        {Array.from({ length: Math.min(selectedAccessory?.stock || 1, 10) }, (_, i) => (
                                          <SelectItem key={i + 1} value={(i + 1).toString()}>
                                            {i + 1} dona
                                          </SelectItem>
                                        ))}
                                      </SelectContent>
                                    </Select>
                                  </div>

                                  <div className="space-y-2">
                                    <Label htmlFor="sellPrice">Sotish narxi (dona uchun)</Label>
                                    <Input
                                      id="sellPrice"
                                      type="number"
                                      value={sellPrice}
                                      onChange={(e) => setSellPrice(e.target.value)}
                                      placeholder="Sotish narxi"
                                      className="bg-accent"
                                    />
                                    <p className="text-sm text-muted-foreground">
                                      Tavsiya: {selectedAccessory?.sellPrice.toLocaleString()} UZS
                                    </p>
                                  </div>

                                  <div className="space-y-2">
                                    <Label htmlFor="customerName">Mijoz (ixtiyoriy)</Label>
                                    <Input
                                      id="customerName"
                                      value={customerName}
                                      onChange={(e) => setCustomerName(e.target.value)}
                                      placeholder="Mijoz ismi"
                                      className="bg-accent"
                                    />
                                  </div>

                                  {sellPrice && quantity && (
                                    <div className="p-3 bg-green-50 rounded-lg">
                                      <p className="text-sm font-medium text-green-800">Sotish ma'lumotlari:</p>
                                      <p className="text-sm text-green-600">
                                        Jami summa:{" "}
                                        {(Number.parseInt(sellPrice) * Number.parseInt(quantity)).toLocaleString()} UZS
                                      </p>
                                      <p className="text-sm text-green-600">
                                        Foyda: +
                                        {(
                                          (Number.parseInt(sellPrice) - (selectedAccessory?.costPrice || 0)) *
                                          Number.parseInt(quantity)
                                        ).toLocaleString()}{" "}
                                        UZS
                                      </p>
                                    </div>
                                  )}
                                </div>

                                <DialogFooter>
                                  <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                                    Bekor qilish
                                  </Button>
                                  <Button
                                    onClick={handleSaleSubmit}
                                    disabled={!sellPrice || !quantity}
                                    className="bg-green-600 hover:bg-green-700"
                                  >
                                    Sotish
                                  </Button>
                                </DialogFooter>
                              </DialogContent>
                            </Dialog>
                          )}
                          <Button variant="outline" size="sm">
                            Tahrirlash
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

        {filteredAccessories.length === 0 && (
          <Card className="mt-8 bg-card">
            <CardContent className="text-center py-12">
              <ShoppingBag className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium text-foreground mb-2">Aksessuar topilmadi</h3>
              <p className="text-muted-foreground">
                Qidiruv shartlaringizni o'zgartiring yoki yangi aksessuar qo'shing.
              </p>
            </CardContent>
          </Card>
        )}
      </main>
    </div>
  )
}
