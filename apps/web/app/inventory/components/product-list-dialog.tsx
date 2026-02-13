"use client"

import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { toast } from "sonner"
import type { Produto } from "../hooks/use-products"

interface ProductListDialogProps {
    produtos: Produto[]
    loading: boolean
    onRemover: (id: number) => Promise<void>
}

export function ProductListDialog({ produtos, loading, onRemover }: ProductListDialogProps) {
    async function handleRemover(id: number) {
        try {
            await onRemover(id)
            toast.success("Produto removido!")
        } catch (err) {
            toast.error(err instanceof Error ? err.message : "Erro ao remover")
        }
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="outline" className="cursor-pointer border border-primary">
                    Consultar Produtos
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Produtos Cadastrados</DialogTitle>
                    <DialogDescription>
                        Confira todos os produtos disponíveis abaixo.
                    </DialogDescription>
                </DialogHeader>
                <div className="no-scrollbar -mx-4 max-h-[50vh] overflow-y-auto px-4">
                    {loading ? (
                        <p className="py-8 text-center text-sm text-muted-foreground">
                            Carregando...
                        </p>
                    ) : produtos.length === 0 ? (
                        <p className="py-8 text-center text-sm text-muted-foreground">
                            Nenhum produto cadastrado.
                        </p>
                    ) : (
                        produtos.map((p) => (
                            <div key={p.productID} className="flex items-center justify-between border-b py-2 last:border-b-0">
                                <div className="min-w-0 flex-1">
                                    <p className="truncate font-bold" title={p.nameProduct}>
                                        {p.nameProduct}
                                    </p>
                                    <p className="text-sm text-muted-foreground">
                                        Qtd: {p.qntdProduct} — R${" "}
                                        {p.priceProduct.toFixed(2)}
                                    </p>
                                </div>
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    className="ml-2 shrink-0 cursor-pointer text-destructive hover:text-destructive"
                                    onClick={() => handleRemover(p.productID)}
                                >
                                    Remover
                                </Button>
                            </div>
                        ))
                    )}
                </div>
            </DialogContent>
        </Dialog>
    )
}
