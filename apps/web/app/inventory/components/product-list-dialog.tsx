"use client"

import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { toast } from "sonner"
import type { Product } from "../hooks/use-products"
import { Trash2 } from "lucide-react"

interface ProductListDialogProps {
    products: Product[]
    isLoading: boolean
    onDelete: (id: number) => Promise<void>
}

export function ProductListDialog({ products, isLoading, onDelete }: ProductListDialogProps) {
    async function handleDelete(id: number) {
        try {
            await onDelete(id)
            toast.success("Product deleted successfully")
        } catch (err: any) {
            toast.error(err.message || "Failed to delete product")
        }
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="outline" className="cursor-pointer border border-primary">
                    View Inventory
                </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md">
                <DialogHeader>
                    <DialogTitle>Current Inventory</DialogTitle>
                    <DialogDescription>
                        Manage your products below.
                    </DialogDescription>
                </DialogHeader>
                <div className="no-scrollbar -mx-6 h-[400px] overflow-y-auto px-6">
                    {isLoading ? (
                        <div className="flex h-full items-center justify-center text-sm text-muted-foreground">
                            Loading products...
                        </div>
                    ) : products.length === 0 ? (
                        <div className="flex h-full items-center justify-center text-sm text-muted-foreground">
                            No products found.
                        </div>
                    ) : (
                        <div className="divide-y">
                            {products.map((product) => (
                                <div key={product.id} className="flex items-center justify-between py-4">
                                    <div className="min-w-0 flex-1 pr-4">
                                        <p className="truncate font-medium text-foreground" title={product.name}>
                                            {product.name}
                                        </p>
                                        <p className="text-sm text-muted-foreground">
                                            Qty: {product.quantity} • {new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(product.price)}
                                        </p>
                                    </div>
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        className="h-8 w-8 text-muted-foreground hover:text-destructive"
                                        onClick={() => handleDelete(product.id)}
                                        title="Delete product"
                                    >
                                        <Trash2 className="h-4 w-4" />
                                        <span className="sr-only">Delete</span>
                                    </Button>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </DialogContent>
        </Dialog>
    )
}
