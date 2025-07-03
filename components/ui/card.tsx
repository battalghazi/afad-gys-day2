import * as React from "react"

import { cn } from "@/lib/utils"

/**
 * Card Bileşeni
 * 
 * Ana kart konteyner bileşeni. İçerik gruplamak ve görsel hiyerarşi oluşturmak için kullanılır.
 * Varsayılan olarak yuvarlatılmış köşeler, border, arka plan rengi ve gölge ile gelir.
 * 
 * @param className - Ek CSS sınıfları
 * @param ref - React ref nesnesi
 * @param props - Diğer HTML div özellikleri
 */
const Card = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "rounded-lg border bg-card text-card-foreground shadow-sm",
      className
    )}
    {...props}
  />
))
Card.displayName = "Card"

/**
 * CardHeader Bileşeni
 * 
 * Kartın başlık bölümü için kullanılan bileşen.
 * İçerikleri dikey olarak hizalar ve aralarında boşluk bırakır.
 * Varsayılan olarak padding ile gelir.
 * 
 * @param className - Ek CSS sınıfları
 * @param ref - React ref nesnesi
 * @param props - Diğer HTML div özellikleri
 */
const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col space-y-1.5 p-6", className)}
    {...props}
  />
))
CardHeader.displayName = "CardHeader"

/**
 * CardTitle Bileşeni
 * 
 * Kartın başlık metni için kullanılan bileşen.
 * H3 etiketi olarak render edilir ve büyük, yarı kalın fontta görüntülenir.
 * 
 * @param className - Ek CSS sınıfları
 * @param ref - React ref nesnesi
 * @param props - Diğer HTML heading özellikleri
 */
const CardTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn(
      "text-2xl font-semibold leading-none tracking-tight",
      className
    )}
    {...props}
  />
))
CardTitle.displayName = "CardTitle"

/**
 * CardDescription Bileşeni
 * 
 * Kartın açıklama metni için kullanılan bileşen.
 * Başlığın altında daha küçük ve solgun renkte görüntülenir.
 * 
 * @param className - Ek CSS sınıfları
 * @param ref - React ref nesnesi
 * @param props - Diğer HTML paragraph özellikleri
 */
const CardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  />
))
CardDescription.displayName = "CardDescription"

/**
 * CardContent Bileşeni
 * 
 * Kartın ana içerik alanı için kullanılan bileşen.
 * Header ile footer arasındaki ana içeriği barındırır.
 * Varsayılan olarak padding ile gelir, üst kısmında padding yoktur.
 * 
 * @param className - Ek CSS sınıfları
 * @param ref - React ref nesnesi
 * @param props - Diğer HTML div özellikleri
 */
const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("p-3 pt-0", className)} {...props} />
))
CardContent.displayName = "CardContent"

/**
 * CardFooter Bileşeni
 * 
 * Kartın footer (alt) bölümü için kullanılan bileşen.
 * Genellikle butonlar veya ek bilgiler için kullanılır.
 * İçerikleri yatay olarak hizalar ve flexbox kullanır.
 * 
 * @param className - Ek CSS sınıfları
 * @param ref - React ref nesnesi
 * @param props - Diğer HTML div özellikleri
 */
const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex items-center p-6 pt-0", className)}
    {...props}
  />
))
CardFooter.displayName = "CardFooter"

// Tüm kart bileşenlerini dışa aktarma
// Bu bileşenler başka komponentlerde import edilebilir
export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent }
