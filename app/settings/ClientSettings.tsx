"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { ShoppingBag, Plus, Search, Package, TrendingUp, Calendar, Menu, X, PlusIcon } from "lucide-react"
import Link from "next/link"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"

import { ThemeToggle } from "@/components/theme-toggle"
import { IBrend, ICapacity, IColor, ICondition } from "@/types"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import z from "zod"
import { useForm } from "react-hook-form"
import { nameSchema } from "@/lib/validation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useEditBrendStore } from "@/hooks/use-brend"
import { useSettingsSheet } from "@/hooks/use-settingsSheet"
import { createSettings, deleteAll, editBrend, editSettings } from "@/action/phone.action"
import { toast } from "@/hooks/use-toast"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { useSettingModal } from "@/hooks/use-SetModal"
// Mock data with cost and sell prices

const categories = ["Barchasi", "Chixol", "Himoya", "Kabel", "Quloqchin", "Zaryadlovchi", "Kalonka"]
const brands = ["Barchasi", "Apple", "Samsung", "Xiaomi", "JBL", "Universal"]

interface Props {
    colors: IColor[]
    brends: IBrend[]
    capacities: ICapacity[]
    conditions: ICondition[]
}
export default function SettingsPage({ colors, brends, capacities, conditions }: Props) {
    const { setKind, kind, product, setProduct, openModal, setOpenModal } = useSettingModal()
    const { open, setOpen, setKindSheet, kindSheet } = useSettingsSheet()
    const { editingBrend, setEditingBrend } = useEditBrendStore()
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen)
    }

    const form = useForm<z.infer<typeof nameSchema>>({
        resolver: zodResolver(nameSchema),
        defaultValues: {
            name: "",
        },
    })

    async function onSubmit(values: z.infer<typeof nameSchema>) {
        
        if (editingBrend?._id) {
            const res = await editSettings({ ...values, id: editingBrend?._id || " ", kind:kindSheet })
            if (res?.data?.status == 200) {
                toast({ description: "Muvaffaqiyatli o'zgartirildi" })
                setOpen(false)
                setEditingBrend({_id: "", name:""})
            } else {
                toast({ description: "Nimadur xato ketdi, qaytadan urining" })
            }
        } else {
            const res = await createSettings({ ...values, kind:kindSheet })
            if (res?.data?.status == 200) {
                toast({ description: "Muvaffaqiyatli qo'shildi" })
                setOpen(false)
                setEditingBrend({_id: "", name:""})
            } else {
                toast({ description: "Nimadur xato ketdi, qaytadan urining" })
            }
        }


    }

    async function onDelete(kind: string, id: string) {
        const res = await deleteAll({id, kind})
        if (res?.data?.status == 200) {
                toast({ description: "Muvaffaqiyatli o'chirildi" })
                setOpenModal(false)
            } else {
                toast({ description: "Nimadur xato ketdi, qaytadan urining" })

            }
    }



    useEffect(() => {
        if (editingBrend) {
            form.reset({ name: editingBrend.name })
        }
    }, [editingBrend, form])

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





                {/* Accessories Table */}
                <Card className="bg-card">
                    <CardHeader>
                        <CardTitle className="text-foreground flex justify-between items-center">Brendlar ro'yxati <Button onClick={() => { setOpen(true); setKindSheet("brend") }} size={"icon"} ><PlusIcon /></Button> </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="overflow-x-auto">
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead className="text-foreground">Nomi</TableHead>
                                        <TableHead className="text-foreground">Harakat</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {brends.map((brend) => (
                                        <TableRow key={brend._id}>
                                            <TableCell>
                                                <div>
                                                    <p className="font-medium text-foreground">{brend.name}</p>
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                <Button
                                                    onClick={() => {
                                                        setOpenModal(true);
                                                        setKind("brend")
                                                        setProduct(brend)
                                                        
                                                    }}
                                                    variant="default" size="sm" className="bg-red-600 hover:bg-red-700 text-white">O'chirish </Button>
                                                <Button 
                                                onClick={() => { setEditingBrend(brend); setOpen(true); setKindSheet("brend") }} 
                                                variant="default" size="sm" className="bg-yellow-600 hover:bg-yellow-700 text-white mx-2">Tahrirlash </Button>

                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </div>
                    </CardContent>
                </Card>

                <Card className="bg-card mt-4">
                    <CardHeader>
                        <CardTitle className="text-foreground flex justify-between items-center">Xotira ro'yxati <Button onClick={() => { setOpen(true); setKindSheet("capacity") }} size={"icon"} ><PlusIcon /></Button> </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="overflow-x-auto">
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead className="text-foreground">Nomi</TableHead>
                                        <TableHead className="text-foreground">Harakat</TableHead>

                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {capacities.map((brend) => (
                                        <TableRow key={brend._id}>

                                            <TableCell>
                                                <div>
                                                    <p className="font-medium text-foreground">{brend.name}</p>
                                                </div>
                                            </TableCell>

                                          <TableCell>
                                                <Button
                                                    onClick={() => {
                                                        setOpenModal(true);
                                                        setKind("capacity")
                                                        setProduct(brend)
                                                        
                                                    }}
                                                    variant="default" size="sm" className="bg-red-600 hover:bg-red-700 text-white">O'chirish </Button>
                                                <Button 
                                                onClick={() => { setEditingBrend(brend); setOpen(true); setKindSheet("capacity") }} 
                                                variant="default" size="sm" className="bg-yellow-600 hover:bg-yellow-700 text-white mx-2">Tahrirlash </Button>

                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </div>
                    </CardContent>
                </Card>

                <Card className="bg-card mt-4">
                    <CardHeader>
                        <CardTitle className="text-foreground flex justify-between items-center">Ranglar ro'yxati <Button onClick={() => { setOpen(true); setKindSheet("color") }} size={"icon"} ><PlusIcon /></Button> </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="overflow-x-auto">
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead className="text-foreground">Nomi</TableHead>
                                        <TableHead className="text-foreground">Harakat</TableHead>

                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {colors.map((brend) => (
                                        <TableRow key={brend._id}>

                                            <TableCell>
                                                <div>
                                                    <p className="font-medium text-foreground">{brend.name}</p>
                                                </div>
                                            </TableCell>

                                            <TableCell>
                                                <Button
                                                    onClick={() => {
                                                        setOpenModal(true);
                                                        setKind("color")
                                                        setProduct(brend)
                                                        
                                                    }}
                                                    variant="default" size="sm" className="bg-red-600 hover:bg-red-700 text-white">O'chirish </Button>
                                                <Button 
                                                onClick={() => { setEditingBrend(brend); setOpen(true); setKindSheet("color") }} 
                                                variant="default" size="sm" className="bg-yellow-600 hover:bg-yellow-700 text-white mx-2">Tahrirlash </Button>

                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </div>
                    </CardContent>
                </Card>

                <Sheet open={open} onOpenChange={setOpen}>
                    <SheetContent>
                        <SheetHeader>
                            <SheetTitle>{kindSheet}</SheetTitle>
                            <SheetDescription>Field marked with * are required fields and must be filled.</SheetDescription>
                        </SheetHeader>
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                                <FormField
                                    control={form.control}
                                    name="name"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Username</FormLabel>
                                            <FormControl>
                                                <Input placeholder="shadcn" {...field} />
                                            </FormControl>
                                            <FormDescription>
                                                This is your public display name.
                                            </FormDescription>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <Button type="submit">Submit</Button>
                            </form>
                        </Form>

                    </SheetContent>
                </Sheet>

                <Dialog open={openModal} onOpenChange={setOpenModal} >

                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>"{product.name}" o'chirishni hohlaysimi?</DialogTitle>
                            <DialogDescription className="flex justify-between pt-4" >
                                <Button onClick={()=>{setOpenModal(false)}} variant={"default"}>Bekor qilish</Button>
                                <Button onClick={()=>{onDelete(kind, product._id)}} variant={"destructive"} >O'chirish</Button>
                            </DialogDescription>
                        </DialogHeader>
                    </DialogContent>
                </Dialog>

            </main>
        </div>
    )
}
