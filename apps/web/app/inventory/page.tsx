"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogClose, DialogFooter, DialogDescription } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { toast, Toaster } from "sonner"
import { useProducts } from "./hooks/use-products"

export default function InventoryPage() {
    const { produtos, loading, criar } = useProducts()
    const [openCriar, setOpenCriar] = useState(false)

    async function handleCriar(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        const fd = new FormData(e.currentTarget)

        try {
            await criar({
                nameProduct: fd.get("nome") as string,
                qntdProduct: Number(fd.get("quantidade")),
                priceProduct: Number(fd.get("preco")),
            })
            setOpenCriar(false)
            toast.success("Produto criado!")
        } catch (err) {
            toast.error(err instanceof Error ? err.message : "Erro ao criar produto")
        }
    }

    return (
        <div className="flex min-h-screen items-center justify-center gap-3 bg-zinc-50 font-sans dark:bg-black">

            {/* listagem */}
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
                                <div key={p.productID} className="border-b py-2 last:border-b-0">
                                    <p className="font-bold">{p.nameProduct}</p>
                                    <p className="text-sm text-muted-foreground">
                                        Qtd: {p.qntdProduct} — R${" "}
                                        {p.priceProduct.toFixed(2)}
                                    </p>
                                </div>
                            ))
                        )}
                    </div>
                </DialogContent>
            </Dialog>

            {/* cadastro */}
            <Dialog open={openCriar} onOpenChange={setOpenCriar}>
                <DialogTrigger asChild>
                    <Button variant="outline" className="cursor-pointer border border-primary">
                        Criar Produto
                    </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-sm">
                    <form onSubmit={handleCriar}>
                        <DialogHeader>
                            <DialogTitle>Novo Produto</DialogTitle>
                            <DialogDescription>
                                Preencha os dados para cadastrar um produto.
                            </DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                            <div className="grid gap-2">
                                <Label htmlFor="nome">Nome do Produto</Label>
                                <Input id="nome" name="nome" placeholder="Ex: Suporte GPU" required />
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

            <Toaster />
        </div>
    )
}
