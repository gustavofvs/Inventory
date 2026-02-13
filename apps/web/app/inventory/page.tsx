"use client"

import { Toaster } from "sonner"
import { useProducts } from "./hooks/use-products"
import { ProductListDialog } from "./components/product-list-dialog"
import { CreateProductDialog } from "./components/create-product-dialog"

export default function InventoryPage() {
    const { products, isLoading, createProduct, deleteProduct } = useProducts()

    return (
        <div className="flex min-h-screen flex-col items-center justify-center gap-6 bg-zinc-50 p-4 font-sans dark:bg-zinc-950">
            <div className="text-center">
                <h1 className="mb-2 text-3xl font-bold tracking-tight text-foreground">Inventory Management</h1>
                <p className="text-muted-foreground">Manage your stock efficiently.</p>
            </div>

            <div className="flex flex-wrap gap-4">
                <ProductListDialog
                    products={products}
                    isLoading={isLoading}
                    onDelete={deleteProduct}
                />
                <CreateProductDialog
                    onCreate={createProduct}
                />
            </div>
            <Toaster position="bottom-center" />
        </div>
    )
}
