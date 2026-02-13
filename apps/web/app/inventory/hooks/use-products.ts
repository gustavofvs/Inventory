"use client"

import { useState, useEffect, useCallback } from "react"
import { toast } from "sonner"
import { api, ApiError } from "@/lib/api"

export interface Product {
  id: number
  name: string
  quantity: number
  price: number
}

export function useProducts() {
  const [products, setProducts] = useState<Product[]>([])
  const [isLoading, setIsLoading] = useState(true)

  const fetchProducts = useCallback(async () => {
    const controller = new AbortController();

    try {
      setIsLoading(true)
      const data = await api.get<Product[]>("/products", controller.signal)
      setProducts(data)
    } catch (err) {
      if (err instanceof Error && err.name === 'AbortError') return;

      console.error("Fetch error:", err)
      toast.error("Failed to load inventory")
    } finally {
      setIsLoading(false)
    }

    return () => controller.abort();
  }, [])

  const createProduct = useCallback(async (data: Omit<Product, "id">) => {
    try {
      await api.post("/products", data)
      await fetchProducts()
      return true
    } catch (err) {
      const message = err instanceof ApiError ? err.message : "Failed to create product";
      throw new Error(message);
    }
  }, [fetchProducts])

  const deleteProduct = useCallback(async (id: number) => {
    try {
      await api.delete(`/products/${id}`)
      await fetchProducts()
    } catch (err) {
      const message = err instanceof ApiError ? err.message : "Failed to delete product";
      throw new Error(message);
    }
  }, [fetchProducts])

  useEffect(() => {
    const abort = fetchProducts()
    // @ts-ignore
    return () => abort?.()
  }, [fetchProducts])

  return {
    products,
    isLoading,
    fetchProducts,
    createProduct,
    deleteProduct
  }
}
