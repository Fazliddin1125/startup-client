"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Phone, Search, Filter, Plus, QrCode, Archive, AlertCircle, Menu, X } from "lucide-react"
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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { ThemeToggle } from "@/components/theme-toggle"
import { IBrend, ICapacity, IColor, ICondition, IPhone, IStatus } from "@/types"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"





import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { phoneSchema, priceValidation, saleValidation } from "@/lib/validation"
import { createPhone, createSale } from "@/action/phone.action"
import { toast } from "@/hooks/use-toast"
import { useSaleStore } from "@/hooks/use-sale"
import { format } from "date-fns"
import { uz } from "date-fns/locale"
import numeral from "numeral"
import { useMemo } from "react";
interface Props {
    phones: IPhone[]

    brends: IBrend[]
    capacities: ICapacity[]
    colors: IColor[]
    conditions: ICondition[]
}
export default function PhonesPage({ phones, brends, capacities, colors, conditions }: Props) {

    const [selectedPhone, setSelectedPhone] = useState<IPhone | null>(null)
    const [saleType, setSaleType] = useState("cash")
    const [sellPrice, setSellPrice] = useState("")
    const [customerName, setCustomerName] = useState("")
    const [customerPhone, setCustomerPhone] = useState("")
    const [installmentMonths, setInstallmentMonths] = useState("6")
    const [downPayment, setDownPayment] = useState("")
    const [isDialogOpen, setIsDialogOpen] = useState(false)
    const [searchTerm, setSearchTerm] = useState("")
    const [brandFilter, setBrandFilter] = useState("all")
    const [statusFilter, setStatusFilter] = useState("all")
    const [conditionFilter, setConditionFilter] = useState("all")
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
    const [isAddPhoneDialogOpen, setIsAddPhoneDialogOpen] = useState(false)
    const { salePhone, setOpenSaleModal, setSalePhone, openSaleModal } = useSaleStore()

    const form = useForm<z.infer<typeof phoneSchema>>({
        resolver: zodResolver(phoneSchema),
        defaultValues: {
            name: "",
            capacity: "",
            brend: "",
            color: "",
            condition: "",
            new_price: "",
            price: "",
        },
    })

    const saleForm = useForm<z.infer<typeof saleValidation>>({
        resolver: zodResolver(saleValidation),
        defaultValues: {
            price: "",
            phone: "23432",
            benifit: "53422"
        },
    })

    async function onSubmit(values: z.infer<typeof phoneSchema>) {
        let res
        res = await createPhone(values)
        if (res?.serverError || res?.validationErrors || !res?.data) {
            toast({ description: "Xato", variant: 'destructive' })
        }
        if (res?.data?.failure) {
            toast({ description: "Xato failure", variant: 'destructive' })
        }
        if (res?.data?.status == 200) {
            toast({ description: 'Product updated successfully' })
            // setIsAddPhoneDialogOpen(false)
            form.reset()
        }
        // form.reset()

    }

    async function onSaleSubmit(values: z.infer<typeof saleValidation>) {
        let res
        values.phone = salePhone?._id
        if (salePhone?.price !== undefined) {
            values.benifit = String(Number(values.price) - salePhone.price)
        }
        console.log(values)
        res = await createSale(values)
        if (res?.serverError || res?.validationErrors || !res?.data) {
            toast({ description: "Xato", variant: 'destructive' })
        }
        if (res?.data?.failure) {
            toast({ description: "Xato", variant: 'destructive' })
        }
        if (res?.data?.status == 200) {
            toast({ description: 'Maxsulot sotildi' })
            setOpenSaleModal(false)
            form.reset()
        }
        form.reset()


    }

    //   const filteredPhones = phones.filter((phone) => {
    //     const matchesSearch =
    //       phone.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    //       phone.model.toLowerCase().includes(searchTerm.toLowerCase())
    //     const matchesBrand = brandFilter === "all" || phone.brand === brandFilter
    //     const matchesStatus = statusFilter === "all" || phone.status === statusFilter
    //     const matchesCondition = conditionFilter === "all" || phone.condition === conditionFilter

    //     return matchesSearch && matchesBrand && matchesStatus && matchesCondition
    //   })

    const getStatusBadge = (status: string) => {
        switch (status) {
            case "Sotuvda":
                return <Badge className="bg-green-100 text-green-800 text-xs">Sotuvda</Badge>
            case "Nasiyada":
                return <Badge className="bg-blue-100 text-blue-800 text-xs">Nasiyada</Badge>
            case "Sotilgan":
                return <Badge className="bg-gray-100 text-gray-800 text-xs">Sotilgan</Badge>
            default:
                return <Badge className="text-xs">{status}</Badge>
        }
    }

    const getConditionBadge = (condition: string) => {
        switch (condition) {
            case "Yangi":
                return <Badge className="bg-emerald-100 text-emerald-800 text-xs">Yangi</Badge>
            case "Ishlatilgan":
                return <Badge className="bg-orange-100 text-orange-800 text-xs">Ishlatilgan</Badge>
            default:
                return <Badge className="text-xs">{condition}</Badge>
        }
    }


    const twoMonthsAgo = new Date();
    twoMonthsAgo.setMonth(twoMonthsAgo.getMonth() - 2);

    const filteredPhones = phones.filter((phone) => {
        const createdDate = new Date(phone.createdAt);
        return phone.status === "Sotuvda" && createdDate < twoMonthsAgo;
    });




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
                            <Link href="/" className="text-blue-600 hover:text-blue-800">
                                <Phone className="h-6 w-6 sm:h-8 sm:w-8" />
                            </Link>
                            <h1 className="text-lg sm:text-2xl font-bold text-foreground">Telefonlar</h1>
                        </div>
                        <div className="flex items-center space-x-2">
                            <ThemeToggle />
                            <Button size="sm" onClick={() => setIsAddPhoneDialogOpen(true)}>
                                <Plus className="mr-2 h-4 w-4" />
                                Yangi telefon
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
                            className="block px-3 py-2 text-primary font-medium bg-accent rounded-md"
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
            <nav className="hidden sm:block bg-card shadow-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex space-x-8 py-3">
                        <Link href="/" className="text-muted-foreground hover:text-foreground pb-2">
                            Bosh sahifa
                        </Link>
                        <Link href="/phones" className="text-primary font-medium border-b-2 border-blue-600 pb-2">
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
                        <Link href="/settings" className="text-muted-foreground hover:text-foreground pb-2">
                            Sozlamalar
                        </Link>
                    </div>
                </div>
            </nav>

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8">
                {/* Mobile Add Button */}
                <div className="sm:hidden mb-4">
                    <Button className="w-full" onClick={() => setIsAddPhoneDialogOpen(true)}>
                        <Plus className="mr-2 h-4 w-4" />
                        Yangi telefon qo'shish
                    </Button>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6 mb-6 sm:mb-8">
                    <Card>
                        <CardHeader className="pb-2">
                            <CardTitle className="text-xs sm:text-sm font-medium">Jami telefonlar</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-lg sm:text-2xl font-bold">{phones.filter(phone => phone.status == "Sotuvda").length}</div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="pb-2">
                            <CardTitle className="text-xs sm:text-sm font-medium">Sotuvda</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-lg sm:text-2xl font-bold text-green-600">
                                {phones && phones.filter((p) => p.status === "Sotuvda").length}
                            </div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="pb-2">
                            <CardTitle className="text-xs sm:text-sm font-medium">Nasiyada</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-lg sm:text-2xl font-bold text-blue-600">
                                {phones && phones.filter((p) => p.status === "Nasiyada").length}
                            </div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="pb-2">
                            <CardTitle className="text-xs sm:text-sm font-medium">Eski telefonlar</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-lg sm:text-2xl font-bold text-orange-600">
                                {filteredPhones.length}
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Filters */}
                <Card className="mb-6">
                    <CardHeader>
                        <CardTitle className="flex items-center text-base sm:text-lg">
                            <Filter className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
                            Filtrlar
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
                            <div className="relative">
                                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                <Input
                                    placeholder="Telefon qidirish..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="pl-10"
                                />
                            </div>
                            <Select value={brandFilter} onValueChange={setBrandFilter}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Brend" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">Barcha brendlar</SelectItem>
                                    <SelectItem value="Apple">Apple</SelectItem>
                                    <SelectItem value="Samsung">Samsung</SelectItem>
                                    <SelectItem value="Xiaomi">Xiaomi</SelectItem>
                                </SelectContent>
                            </Select>
                            <Select value={statusFilter} onValueChange={setStatusFilter}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Holat" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">Barcha holatlar</SelectItem>
                                    <SelectItem value="Sotuvda">Sotuvda</SelectItem>
                                    <SelectItem value="Nasiyada">Nasiyada</SelectItem>
                                    <SelectItem value="Sotilgan">Sotilgan</SelectItem>
                                </SelectContent>
                            </Select>
                            <Select value={conditionFilter} onValueChange={setConditionFilter}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Ahvol" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">Barcha ahvollar</SelectItem>
                                    <SelectItem value="Yangi">Yangi</SelectItem>
                                    <SelectItem value="Ishlatilgan">Ishlatilgan</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </CardContent>
                </Card>

                {/* Mobile Cards View */}
                <div className="sm:hidden space-y-4">
                    {phones && phones.map((phone) => (
                        <Card key={phone._id}>
                            <CardContent className="p-4">
                                <div className="flex items-start space-x-3">

                                    <div className="flex-1 min-w-0">
                                        <div className="w-100">
                                            <div className="w-100  flex-1">
                                                <div className="flex justify-between my-2" ><h2 className="">Model:{phone.name}</h2>
                                                {getConditionBadge(phone.condition.name)}</div>
                                                <div className="grid  grid-cols-2" >
                                                    <div className="">
                                                        <p className="text-sm text-muted-foreground">
                                                            Brend:{phone.brend.name}
                                                        </p>
                                                        <p className="text-sm text-muted-foreground">
                                                            Xotira:{phone.capacity.name}
                                                        </p>
                                                    </div>

                                                    <div className="text-end" >
                                                        <p className="text-sm text-muted-foreground">
                                                            Rang:{phone.color.name}
                                                        </p>
                                                        <p className="text-xs text-muted-foreground">
                                                            {phone.color.name} • {phone.capacity.name}
                                                        </p>
                                                    </div>
                                                </div>

                                                <div className="flex items-center space-x-2 mt-1">
                                                    
                                                
                                                </div>
                                            </div>
                                           
                                        </div>
                                        <div className="mt-2 grid grid-cols-2 gap-2 text-xs">
                                            <div>
                                                <span className="text-muted-foreground">Kirim:</span>
                                                <span className="font-mono ml-1">{phone.price}K</span>
                                            </div>
                                            <div>
                                                <span className="text-muted-foreground">Chiqim:</span>
                                                <span className="font-mono ml-1">{phone.new_price}K</span>
                                            </div>
                                            <div>
                                                <span className="text-muted-foreground">Foyda:</span>
                                                <span className="font-mono ml-1 text-green-600">
                                                    +{phone.benifit}K
                                                </span>
                                            </div>
                                            <div>
                                                <span className="text-muted-foreground">Kunlar:</span>
                                                <span
                                                // className={`ml-1 ${phone.daysInStock > 60 ? "text-orange-600 font-medium" : ""}`}
                                                >
                                                    {/* {phone.daysInStock} */} 00
                                                </span>
                                            </div>
                                        </div>
                                        <div className="flex items-center space-x-2 mt-3">
                                            <Button
                                                onClick={() => { setOpenSaleModal(true); setSalePhone(phone) }}
                                                variant="default"
                                                size="sm"

                                                className="bg-green-600 hover:bg-green-700"
                                            >
                                                Sotish
                                            </Button>
                                            <Button variant="outline" size="sm" className="text-xs">
                                                Tahrirlash
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                {/* Desktop Table View */}
                <Card className="hidden sm:block">
                    <CardHeader>
                        <CardTitle>Telefonlar ro'yxati </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="overflow-x-auto">
                            <Table>
                                <TableHeader>
                                    <TableRow>

                                        <TableHead>Telefon</TableHead>
                                        <TableHead>Ahvol</TableHead>
                                        <TableHead>Holat</TableHead>
                                        <TableHead>Tan narxi</TableHead>
                                        <TableHead>Sotish narxi</TableHead>
                                        <TableHead>Sana</TableHead>
                                        <TableHead>Amallar</TableHead>

                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {phones
                                        .map((phone) => (
                                            <TableRow key={phone._id}>

                                                <TableCell>
                                                    <div>
                                                        <p className="font-medium">{phone.name}</p>
                                                        <p className="text-sm text-muted-foreground">
                                                            {phone.color.name} • {phone.capacity.name}
                                                        </p>
                                                        <p className="text-sm text-muted-foreground">
                                                            {phone.brend.name}
                                                        </p>
                                                    </div>
                                                </TableCell>
                                                <TableCell>{getConditionBadge(phone.condition.name)}</TableCell>
                                                <TableCell>
                                                    <div className="flex items-center">
                                                        {getStatusBadge(phone.status)}
                                                        {/* {phone.daysInStock > 60 && <AlertCircle className="ml-2 h-4 w-4 text-orange-500" />} */}
                                                    </div>
                                                </TableCell>


                                                <TableCell className="font-mono">{numeral(phone.price).format("0,0")} so'm</TableCell>
                                                <TableCell className="font-mono">{numeral(phone.new_price).format("0,0")} so'm</TableCell>
                                                <TableCell className="font-mono">{format(new Date(phone.createdAt), "d MMMM yyyy", { locale: uz })}</TableCell>



                                                <TableCell>
                                                    <div className="flex space-x-2">
                                                        {phone.status === "Sotuvda" && (
                                                            <Button
                                                                onClick={() => { setOpenSaleModal(true); setSalePhone(phone) }}
                                                                variant="default"
                                                                size="sm"

                                                                className="bg-green-600 hover:bg-green-700"
                                                            >
                                                                Sotish
                                                            </Button>
                                                        )}
                                                        <Button variant="outline" size="sm">
                                                            Tahrirlash
                                                        </Button>

                                                        {/* {phone.daysInStock > 60 && (
                            <Button variant="outline" size="sm">
                              <Archive className="h-4 w-4" />
                            </Button>
                          )} */}
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

            {/* Add Phone Dialog */}
            <Dialog open={isAddPhoneDialogOpen} onOpenChange={setIsAddPhoneDialogOpen}>
                <DialogContent className="md:max-w-[600px] max-w-[350px] overflow-y-scroll ">
                    <DialogHeader>
                        <DialogTitle>Yangi telefon qo'shish</DialogTitle>
                        <DialogDescription>Yangi telefon ma'lumotlarini kiriting</DialogDescription>
                    </DialogHeader>

                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="grid md:grid-cols-2 gap-2 md:gap-4 space-x-2">
                            <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Nomi</FormLabel>
                                        <FormControl>
                                            <Input placeholder="S22" {...field} />
                                        </FormControl>

                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="brend"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Brend</FormLabel>
                                        <Select
                                            onValueChange={field.onChange}
                                            value={field.value}
                                        >
                                            <SelectTrigger className="">
                                                <SelectValue placeholder="Brendlar" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {brends.map((brend) => (
                                                    <SelectItem
                                                        key={brend._id}
                                                        value={brend._id}
                                                        className="border space-y-1"
                                                    >
                                                        {brend.name}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name={"capacity"}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Xotira</FormLabel>
                                        <Select
                                            onValueChange={field.onChange}
                                            value={field.value}
                                        >
                                            <SelectTrigger className="">
                                                <SelectValue placeholder="Xotirasi" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {capacities.map((capacity) => (
                                                    <SelectItem
                                                        key={capacity._id}
                                                        value={capacity._id}
                                                        className="border space-y-1"
                                                    >
                                                        {capacity.name}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name={"color"}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Rang</FormLabel>
                                        <Select
                                            onValueChange={field.onChange}
                                            value={field.value}
                                        >
                                            <SelectTrigger className="">
                                                <SelectValue placeholder="Ranglar" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {colors.map((brend) => (
                                                    <SelectItem
                                                        key={brend._id}
                                                        value={brend._id}
                                                        className="border space-y-1"
                                                    >
                                                        {brend.name}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name={"condition"}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Xolati</FormLabel>
                                        <Select
                                            onValueChange={field.onChange}
                                            value={field.value}
                                        >
                                            <SelectTrigger className="">
                                                <SelectValue placeholder="Xolati" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {conditions.map((brend) => (
                                                    <SelectItem
                                                        key={brend._id}
                                                        value={brend._id}
                                                        className="border space-y-1"
                                                    >
                                                        {brend.name}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name={"price"}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Narxi</FormLabel>
                                        <FormControl>
                                            <Input placeholder="shadcn" {...field} />
                                        </FormControl>

                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name={"new_price"}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Sotish narxi</FormLabel>
                                        <FormControl>
                                            <Input placeholder="shadcn" {...field} />
                                        </FormControl>

                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <Button className=" mt-4 md:mt-2 md:col-span-2" type="submit">Qo'hsish</Button>
                        </form>
                    </Form>

                </DialogContent>
            </Dialog>


            <Dialog open={openSaleModal} onOpenChange={setOpenSaleModal}>

                <DialogContent className="sm:max-w-[500px]">
                    <DialogHeader>
                        <DialogTitle>Telefon sotish {salePhone?.name} </DialogTitle>
                        <DialogDescription>
                            sotish uchun narx kiriting kiriting
                        </DialogDescription>
                    </DialogHeader>

                    <Form {...saleForm}>
                        <form onSubmit={saleForm.handleSubmit(onSaleSubmit)} className="space-y-8">
                            <FormField
                                control={saleForm.control}
                                name={"price"}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Narx</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="150,000"
                                                value={
                                                    field.value
                                                        ? numeral(field.value).format("0,0")
                                                        : ""
                                                }
                                                onChange={(e) => {
                                                    // Faqat raqamlarni olib qolamiz
                                                    const rawValue = e.target.value.replace(/\D/g, "");
                                                    field.onChange(rawValue);
                                                }}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            {/** 🔹 Foyda hisoblash */}
                            {(() => {
                                const enteredPrice = Number(saleForm.watch("price") || 0);
                                const costPrice = Number(salePhone?.price || 0);
                                const profit = enteredPrice - costPrice;

                                return (
                                    <div>
                                        <div>
                                            Telefon:{" "}
                                            <span className="text-muted-foreground">
                                                {salePhone?.name}
                                            </span>
                                        </div>
                                        <div>
                                            Kirim narx:{" "}
                                            <span className="text-muted-foreground">
                                                {numeral(costPrice).format("0,0")}
                                            </span>
                                        </div>
                                        <div>
                                            Foyda:{" "}
                                            <span className="text-muted-foreground">
                                                {numeral(profit).format("0,0")}
                                            </span>
                                        </div>
                                    </div>
                                );
                            })()}

                            <Button type="submit">Submit</Button>
                        </form>
                    </Form>



                </DialogContent>
            </Dialog>
        </div>
    )
}
