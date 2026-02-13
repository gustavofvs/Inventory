"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { toast } from "sonner"
import type { Produto } from "../hooks/use-products"

interface CreateProductDialogProps {
    onCriar: (data: Omit<Produto, "productID">) => Promise<void>
}

export function CreateProductDialog({ onCriar }: CreateProductDialogProps) {
    const [open, setOpen] = useState(false)

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        const fd = new FormData(e.currentTarget)

        try {
            await onCriar({
                nameProduct: fd.get("nome") as string,
                qntdProduct: Number(fd.get("quantidade")),
                priceProduct: Number(fd.get("preco")),
            })
            setOpen(false)
            toast.success("Produto criado!")
        } catch (err) {
            toast.error(err instanceof Error ? err.message : "Erro ao criar produto")
        }
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant="outline" className="cursor-pointer border border-primary">
                    Criar Produto
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-sm">
                <form onSubmit={handleSubmit}>
                    <DialogHeader>
                        <DialogTitle>Novo Produto</DialogTitle>
                        <DialogDescription>
                            Preencha os dados para cadastrar um produto.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="grid gap-2">
                            <Label htmlFor="nome">Nome do Produto</Label>
                            <Input id="nome" name="nome" placeholder="Ex: Suporte GPU" maxLength={200} required />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="quantidade">Estoque</Label>
                            <Input id="quantidade" name="quantidade" type="number" min={0} placeholder="0" required />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="preco">Valor (R$)</Label>
                            <Input id="preco" name="preco" type="number" min={0} step="0.01" placeholder="0.00" required />
                        </div>
                    </div>
                    <DialogFooter>
                        <DialogClose asChild>
                            <Button variant="outline" type="button">Cancelar</Button>
                        </DialogClose>
                        <Button type="submit">Salvar</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}
