"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Wrench, Plus, Search, Clock, MapPin, Star, Menu, X } from "lucide-react"
import Link from "next/link"
import { ThemeToggle } from "@/components/theme-toggle"

// Mock data
const services = [
  {
    id: 1,
    name: "Ekran almashtirish",
    category: "Ta'mirlash",
    price: 350000,
    duration: "1-2 soat",
    description: "iPhone va Android telefonlar uchun ekran almashtirish",
    location: "Buxoro, Mustaqillik ko'chasi",
    rating: 4.8,
    reviews: 156,
    available: true,
    shopName: "TechFix Buxoro",
  },
  {
    id: 2,
    name: "Batareya almashtirish",
    category: "Ta'mirlash",
    price: 180000,
    duration: "30-45 daqiqa",
    description: "Original batareyalar bilan almashtirish",
    location: "Buxoro, Alpomish ko'chasi",
    rating: 4.9,
    reviews: 203,
    available: true,
    shopName: "Mobile Service",
  },
  {
    id: 3,
    name: "Namlangan telefon quritish",
    category: "Tiklash",
    price: 120000,
    duration: "24-48 soat",
    description: "Suvga tushgan telefonlarni professional quritish",
    location: "Buxoro, Navoi ko'chasi",
    rating: 4.6,
    reviews: 89,
    available: true,
    shopName: "RepairPro",
  },
  {
    id: 4,
    name: "Dasturiy ta'mirlash",
    category: "Dastur",
    price: 80000,
    duration: "1-3 soat",
    description: "Firmware yangilash, dasturiy muammolarni hal qilish",
    location: "Buxoro, Mustaqillik ko'chasi",
    rating: 4.7,
    reviews: 124,
    available: false,
    shopName: "TechFix Buxoro",
  },
  {
    id: 5,
    name: "Kamera almashtirish",
    category: "Ta'mirlash",
    price: 250000,
    duration: "1-2 soat",
    description: "Orqa va old kameralar almashtirish",
    location: "Buxoro, Alpomish ko'chasi",
    rating: 4.8,
    reviews: 67,
    available: true,
    shopName: "Mobile Service",
  },
]

const categories = ["Barchasi", "Ta'mirlash", "Tiklash", "Dastur"]

export default function ServicesPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("Barchasi")
  const [locationFilter, setLocationFilter] = useState("all")

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  const filteredServices = services.filter((service) => {
    const matchesSearch =
      service.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      service.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = categoryFilter === "Barchasi" || service.category === categoryFilter
    const matchesLocation = locationFilter === "all" || service.location.includes(locationFilter)

    return matchesSearch && matchesCategory && matchesLocation
  })

  const getCategoryBadge = (category: string) => {
    const colors = {
      "Ta'mirlash": "bg-blue-100 text-blue-800",
      Tiklash: "bg-green-100 text-green-800",
      Dastur: "bg-purple-100 text-purple-800",
    }
    return <Badge className={colors[category as keyof typeof colors] || "bg-gray-100 text-gray-800"}>{category}</Badge>
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card shadow-sm border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-2 sm:space-x-4">
              <Link href="/" className="text-blue-600 hover:text-blue-800">
                <Wrench className="h-6 w-6 sm:h-8 sm:w-8" />
              </Link>
              <h1 className="text-lg sm:text-2xl font-bold text-foreground">Xizmatlar</h1>
            </div>
            <div className="flex items-center space-x-2">
              <ThemeToggle />
              <Button className="hidden sm:flex">
                <Plus className="mr-2 h-4 w-4" />
                Xizmat qo'shish
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
              className="block px-3 py-2 text-blue-600 font-medium bg-blue-50 rounded-md"
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
            <Link href="/credit" className="text-muted-foreground hover:text-foreground pb-2">
              Nasiya
            </Link>
            <Link href="/services" className="text-blue-600 font-medium border-b-2 border-blue-600 pb-2">
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
        {/* Mobile Add Button */}
        <div className="sm:hidden mb-4">
          <Button className="w-full">
            <Plus className="mr-2 h-4 w-4" />
            Xizmat qo'shish
          </Button>
        </div>
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Jami xizmatlar</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{services.length}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Mavjud</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">{services.filter((s) => s.available).length}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">O'rtacha narx</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {Math.round(services.reduce((sum, s) => sum + s.price, 0) / services.length / 1000)} ming
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">O'rtacha reyting</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-yellow-600">
                {(services.reduce((sum, s) => sum + s.rating, 0) / services.length).toFixed(1)}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Qidiruv va filtrlar</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Xizmat qidirish..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Kategoriya" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={locationFilter} onValueChange={setLocationFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Joylashuv" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Barcha joylar</SelectItem>
                  <SelectItem value="Mustaqillik">Mustaqillik ko'chasi</SelectItem>
                  <SelectItem value="Alpomish">Alpomish ko'chasi</SelectItem>
                  <SelectItem value="Navoi">Navoi ko'chasi</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {filteredServices.map((service) => (
            <Card key={service.id} className={`${!service.available ? "opacity-60" : ""}`}>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-lg">{service.name}</CardTitle>
                    <p className="text-sm text-muted-foreground mt-1">{service.shopName}</p>
                  </div>
                  {getCategoryBadge(service.category)}
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">{service.description}</p>

                <div className="space-y-2 mb-4">
                  <div className="flex items-center text-sm">
                    <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
                    <span>{service.duration}</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <MapPin className="h-4 w-4 mr-2 text-muted-foreground" />
                    <span>{service.location}</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <Star className="h-4 w-4 mr-2 text-yellow-500 fill-current" />
                    <span>
                      {service.rating} ({service.reviews} sharh)
                    </span>
                  </div>
                </div>

                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-2xl font-bold text-green-600">{(service.price / 1000).toLocaleString()} ming</p>
                    <p className="text-xs text-muted-foreground">UZS</p>
                  </div>
                  <div className="flex space-x-2">
                    {service.available ? (
                      <>
                        <Button size="sm">Buyurtma</Button>
                        <Button variant="outline" size="sm">
                          Batafsil
                        </Button>
                      </>
                    ) : (
                      <Badge variant="secondary">Mavjud emas</Badge>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Services Table */}
        <Card>
          <CardHeader>
            <CardTitle>Xizmatlar jadvali</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Xizmat</TableHead>
                    <TableHead>Do'kon</TableHead>
                    <TableHead>Kategoriya</TableHead>
                    <TableHead>Narx</TableHead>
                    <TableHead>Muddat</TableHead>
                    <TableHead>Reyting</TableHead>
                    <TableHead>Joylashuv</TableHead>
                    <TableHead>Holat</TableHead>
                    <TableHead>Amallar</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredServices.map((service) => (
                    <TableRow key={service.id}>
                      <TableCell>
                        <div>
                          <p className="font-medium">{service.name}</p>
                          <p className="text-sm text-muted-foreground">{service.description}</p>
                        </div>
                      </TableCell>
                      <TableCell>{service.shopName}</TableCell>
                      <TableCell>{getCategoryBadge(service.category)}</TableCell>
                      <TableCell className="font-mono">{(service.price / 1000).toLocaleString()} ming</TableCell>
                      <TableCell>{service.duration}</TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          <Star className="h-4 w-4 text-yellow-500 fill-current mr-1" />
                          {service.rating}
                        </div>
                      </TableCell>
                      <TableCell className="text-sm">{service.location}</TableCell>
                      <TableCell>
                        {service.available ? (
                          <Badge className="bg-green-100 text-green-800">Mavjud</Badge>
                        ) : (
                          <Badge variant="secondary">Mavjud emas</Badge>
                        )}
                      </TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button variant="outline" size="sm">
                            Tahrirlash
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
