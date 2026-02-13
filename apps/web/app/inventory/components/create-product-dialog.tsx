"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { toast } from "sonner"
import type { Product } from "../hooks/use-products"

interface CreateProductDialogProps {
    onCreate: (data: Omit<Product, "id">) => Promise<boolean>
}

export function CreateProductDialog({ onCreate }: CreateProductDialogProps) {
    const [open, setOpen] = useState(false)
    const [isSubmitting, setIsSubmitting] = useState(false)

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        const fd = new FormData(e.currentTarget)

        try {
            setIsSubmitting(true)
            await onCreate({
                name: fd.get("name") as string,
                quantity: Number(fd.get("quantity")),
                price: Number(fd.get("price")),
            })
            setOpen(false)
            toast.success("Product created successfully!")
        } catch (err: any) {
            toast.error(err.message || "Failed to create product")
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant="outline" className="cursor-pointer border border-primary">
                    New Product
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-sm">
                <form onSubmit={handleSubmit}>
                    <DialogHeader>
                        <DialogTitle>Add Product</DialogTitle>
                        <DialogDescription>
                            Enter the product details below.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="grid gap-2">
                            <Label htmlFor="name">Name</Label>
                            <Input id="name" name="name" placeholder="Ex: RTX 4090" maxLength={200} required />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="quantity">Quantity</Label>
                            <Input id="quantity" name="quantity" type="number" min={0} placeholder="0" required />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="price">Price (R$)</Label>
                            <Input id="price" name="price" type="number" min={0} step="0.01" placeholder="0.00" required />
                        </div>
                    </div>
                    <DialogFooter>
                        <DialogClose asChild>
                            <Button variant="outline" type="button">Cancel</Button>
                        </DialogClose>
                        <Button type="submit" disabled={isSubmitting}>
                            {isSubmitting ? "Saving..." : "Save"}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}
