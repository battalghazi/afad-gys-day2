/**
 * Utility Fonksiyonları
 * 
 * Uygulamada kullanılan yardımcı fonksiyonlar.
 * Tailwind CSS sınıflarını birleştirmek ve çakışmaları çözmek için kullanılır.
 */
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

/**
 * CSS Sınıflarını Birleştirme Fonksiyonu
 * 
 * clsx ve tailwind-merge kütüphanelerini birleştirerek kullanır.
 * 
 * 1. clsx: Koşullu CSS sınıflarını birleştirmek için kullanılır
 *    - String, object, array formatlarını destekler
 *    - Falsy değerleri otomatik olarak filtreler
 * 
 * 2. twMerge: Tailwind CSS sınıflarındaki çakışmaları çözer
 *    - Aynı CSS özelliğini etkileyen sınıfları birleştirir
 *    - Sonraki sınıf öncekini override eder
 * 
 * @example
 * cn("text-red-500", "text-blue-500") // "text-blue-500" (çakışma çözüldü)
 * cn("px-4", "px-6", "py-2") // "px-6 py-2" (px-4 override edildi)
 * cn({ "bg-red-500": isError, "bg-green-500": isSuccess }) // Koşullu sınıflar
 * 
 * @param inputs - Birleştirilecek CSS sınıfları (string, object, array)
 * @returns Birleştirilmiş ve çakışması çözülmüş CSS sınıfları
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
