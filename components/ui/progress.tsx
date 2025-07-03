/**
 * Progress Bileşeni
 * 
 * İlerleme çubuğu bileşeni. Radix UI Progress primitive'ini kullanır.
 * 0-100 arası değerler alır ve görsel olarak ilerlemeyi gösterir.
 * 
 * Radix UI otomatik olarak erişilebilirlik özelliklerini (ARIA) sağlar:
 * - role="progressbar"
 * - aria-valuenow, aria-valuemin, aria-valuemax
 * 
 * @example
 * <Progress value={75} />
 * <Progress value={progressPercentage} className="h-2" />
 */
import * as React from "react"
import * as ProgressPrimitive from "@radix-ui/react-progress"

import { cn } from "@/lib/utils"

/**
 * Progress Bileşeni Implementasyonu
 * 
 * Radix UI Progress primitive'ini wrap eder ve özel stiller ekler.
 * 
 * Root: İlerleme çubuğunun dış konteyner'i
 * - Sabit yükseklik ve genişlik
 * - Yuvarlatılmış köşeler
 * - Arka plan rengi (secondary)
 * - Overflow hidden (indicator'ın dışarı çıkmaması için)
 * 
 * Indicator: İlerlemeyi gösteren iç çubuk
 * - Dinamik genişlik (value prop'una göre)
 * - CSS transform ile animasyon
 * - Ana tema rengi (primary)
 * - Smooth transition efekti
 * 
 * @param className - Ek CSS sınıfları
 * @param value - İlerleme değeri (0-100)
 * @param ref - React ref nesnesi
 * @param props - Diğer Radix Progress özellikleri
 */
const Progress = React.forwardRef<
  React.ElementRef<typeof ProgressPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root>
>(({ className, value, ...props }, ref) => (
  <ProgressPrimitive.Root
    ref={ref}
    className={cn(
      "relative h-4 w-full overflow-hidden rounded-full bg-secondary",
      className
    )}
    {...props}
  >
    <ProgressPrimitive.Indicator
      className="h-full w-full flex-1 bg-primary transition-all"
      style={{ transform: `translateX(-${100 - (value || 0)}%)` }}
    />
  </ProgressPrimitive.Root>
))
Progress.displayName = ProgressPrimitive.Root.displayName

// Progress bileşenini dışa aktarma
export { Progress }
