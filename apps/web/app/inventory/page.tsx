"use client"

import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogClose, DialogFooter, DialogDescription } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { toast, Toaster } from "sonner"

interface Produto {
    productID: number
    nameProduct: string
    qntdProduct: number
    priceProduct: number
}

const API = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3001"

export default function InventoryPage() {
    const [produtos, setProdutos] = useState<Produto[]>([])
    const [openCriar, setOpenCriar] = useState(false)

    // busca os produtos da api
    async function carregarProdutos() {
        try {
            const res = await fetch(`${API}/produtos`)
            const data = await res.json()
            setProdutos(data)
        } catch (err) {
            console.log("erro ao buscar produtos", err)
        }
    }

    useEffect(() => {
        carregarProdutos()
    }, [])

    // cria produto novo
    async function handleCriar(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        const form = new FormData(e.currentTarget)

        try {
            const res = await fetch(`${API}/produtos`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    nameProduct: form.get("nome"),
                    qntdProduct: Number(form.get("quantidade")),
                    priceProduct: Number(form.get("preco")),
                }),
            })

            if (!res.ok) throw new Error("falhou")

            setOpenCriar(false)
            toast.success("Produto criado!")
            carregarProdutos()
        } catch {
            toast.error("Erro ao criar produto")
        }
    }

    return (
        <div className="flex min-h-screen items-center justify-center gap-3 bg-zinc-50 font-sans dark:bg-black">

            {/* botao pra ver produtos */}
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
                    <div className="max-h-[50vh] overflow-y-auto">
                        {produtos.length === 0 ? (
                            <p className="py-8 text-center text-sm text-muted-foreground">
                                Nenhum produto cadastrado.
                            </p>
                        ) : (
                            produtos.map((p) => (
                                <div key={p.productID} className="border-b py-2 last:border-b-0">
                                    <p className="font-bold">{p.nameProduct}</p>
                                    <p className="text-sm text-muted-foreground">
                                        Qtd: {p.qntdProduct} — R$ {p.priceProduct}
                                    </p>
                                </div>
                            ))
                        )}
                    </div>
                </DialogContent>
            </Dialog>

            {/* botao pra criar produto */}
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
                                <Input id="preco" name="preco" type="number" min={0} placeholder="0" required />
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
