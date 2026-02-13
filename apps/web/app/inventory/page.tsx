"use client"

import { Toaster } from "sonner"
import { useProducts } from "./hooks/use-products"
import { ProductListDialog } from "./components/product-list-dialog"
import { CreateProductDialog } from "./components/create-product-dialog"

export default function InventoryPage() {
    const { produtos, loading, criar, remover } = useProducts()

    return (
        <div className="flex min-h-screen items-center justify-center gap-3 bg-zinc-50 font-sans dark:bg-black">
            <ProductListDialog
                produtos={produtos}
                loading={loading}
                onRemover={remover}
            />
            <CreateProductDialog
                onCriar={criar}
            />
            <Toaster />
        </div>
    )
}
