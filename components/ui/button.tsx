/**
 * Button Bileşeni
 * 
 * Kullanıcı etkileşimi için kullanılan buton bileşeni.
 * Farklı varyantlar (default, destructive, outline, secondary, ghost, link) ve
 * boyutlar (default, sm, lg, icon) destekler.
 * 
 * Class Variance Authority (cva) kullanarak dinamik CSS sınıfları oluşturur.
 * Radix UI'ın Slot bileşeni ile asChild prop'u destekler.
 * 
 * @example
 * <Button variant="default" size="lg">Tıkla</Button>
 * <Button variant="outline" size="sm">İptal</Button>
 */
import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

/**
 * Button Varyantları
 * 
 * cva (Class Variance Authority) kullanarak buton stillerini tanımlar.
 * Temel stiller, varyantlar ve boyutlar için CSS sınıflarını dinamik olarak oluşturur.
 * 
 * Varyantlar:
 * - default: Ana tema renginde varsayılan buton
 * - destructive: Tehlikeli işlemler için kırmızı renkte buton
 * - outline: Sadece border'ı olan transparan buton
 * - secondary: İkincil işlemler için gri tonlarda buton
 * - ghost: Arka planı olmayan minimal buton
 * - link: Link görünümünde altı çizili buton
 * 
 * Boyutlar:
 * - default: Standart boyut (h-10)
 * - sm: Küçük boyut (h-9)
 * - lg: Büyük boyut (h-11)
 * - icon: Kare ikon butonu (h-10 w-10)
 */
const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline:
          "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

/**
 * ButtonProps Interface
 * 
 * Button bileşeninin aldığı prop'ları tanımlar.
 * HTML button özelliklerini extend eder ve ek özellikler ekler.
 * 
 * @param asChild - True ise, child element'i button yerine render eder (Radix Slot kullanır)
 * @param variant - Butonun görsel varyantı
 * @param size - Butonun boyutu
 */
export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

/**
 * Button Bileşeni Ana Implementasyonu
 * 
 * React.forwardRef kullanarak ref forwarding destekler.
 * asChild prop'u true ise Slot, false ise button element'i render eder.
 * buttonVariants fonksiyonu ile dinamik CSS sınıfları oluşturur.
 * 
 * @param className - Ek CSS sınıfları
 * @param variant - Buton varyantı (buttonVariants'tan)
 * @param size - Buton boyutu (buttonVariants'tan)
 * @param asChild - Child element'i wrapper yerine render etmek için
 * @param ref - React ref nesnesi
 * @param props - Diğer HTML button özellikleri
 */
const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

// Button bileşeni ve varyantlarını dışa aktarma
export { Button, buttonVariants }
