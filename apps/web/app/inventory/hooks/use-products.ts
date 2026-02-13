"use client"

import { useState, useEffect, useCallback } from "react"

export interface Produto {
  productID: number
  nameProduct: string
  qntdProduct: number
  priceProduct: number
}

const API = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3001"

export function useProducts() {
  const [produtos, setProdutos] = useState<Produto[]>([])
  const [loading, setLoading] = useState(true)

  const carregar = useCallback(async () => {
    try {
      setLoading(true)
      const res = await fetch(`${API}/produtos`)
      if (!res.ok) throw new Error(`HTTP ${res.status}`)
      setProdutos(await res.json())
    } catch (err) {
      console.error("falha ao buscar produtos:", err)
    } finally {
      setLoading(false)
    }
  }, [])

  const criar = useCallback(async (data: Omit<Produto, "productID">) => {
    const res = await fetch(`${API}/produtos`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })

    if (!res.ok) {
      const body = await res.json().catch(() => ({}))
      throw new Error(body.error || "falha ao criar produto")
    }

    // recarrega a lista depois de criar
    await carregar()
  }, [carregar])

  const remover = useCallback(async (id: number) => {
    const res = await fetch(`${API}/produtos/${id}`, { method: "DELETE" })

    if (!res.ok) {
      const body = await res.json().catch(() => ({}))
      throw new Error(body.error || "falha ao remover produto")
    }

    await carregar()
  }, [carregar])

  useEffect(() => { carregar() }, [carregar])

  return { produtos, loading, carregar, criar, remover }
}
