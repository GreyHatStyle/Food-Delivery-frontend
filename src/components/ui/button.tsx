import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive rounded-full hover:cursor-pointer",
  {
    variants: {
      variant: {
        default: "bg-web-theme-green text-primary-foreground hover:bg-primary/90",
        destructive:
          "bg-destructive text-white hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",
        outline:
          "border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        addMenuCart:
          "bg-secondary text-green-600 font-bold hover:bg-secondary/80 rounded-md",
        ghost:
          "hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50",
        link: "text-blue-600 underline-offset-4 hover:underline",
        sideMenu: "hover:bg-web-theme-green hover:text-background rounded-sm "
      },
      size: {
        default: "h-9 px-4 py-2 has-[>svg]:px-3",
        sm: "h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5",
        lg: "h-10 rounded-md px-6 has-[>svg]:px-4",
        icon: "size-9",
        "icon-sm": "size-8",
        "icon-lg": "size-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Button({
  className,
  variant,
  size,
  asChild = false,
  // onClick,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }) {
  const Comp = asChild ? Slot : "button"
  
  // const compRef = React.useRef<HTMLButtonElement | null>(null);
  // const [variantState, setVariantState] = React.useState<
  //   VariantProps<typeof buttonVariants>['variant']
  // >(variant);
  
  //   const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {

  //     // basically, if variant if addMenuCart then only perform this action
  //     if (variant === "addMenuCart"){
  //       console.log("Add menu cart is triggered");
  //       setVariantState("default");
  //     }


  //     // otherwise perform whatever you are told to perform
  //     if (onClick){
  //       onClick(event);
  //     }
  //   }

  return (
    <Comp
      // ref={compRef}
      // onClick={handleClick}
      data-slot="button"
      className={cn(buttonVariants({ variant: variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }
