import { cn } from "@/lib/utils";
import React, { type ComponentProps, forwardRef, useEffect } from "react";
import { motion, useAnimate } from "motion/react";

interface ButtonProps extends ComponentProps<"button"> {
  className?: string;
  children?: React.ReactNode;
  setPaymentStatus: (val: "Processing Payment" | "Completed Payment!!" | "") => void,
}


const loadingSize = "150px";
const tickSize = "150px";


export const StatefulComponent = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, children, ...props }) => {
    const [scope, animate] = useAnimate();

    const animateLoading = async () => {
      await animate(
        ".loader",
        {
          width: loadingSize,
          scale: 1,
          display: "block",
        },
        {
          duration: 0.2,
        },
      );
    };

    const animateSuccess = async () => {
      await animate(
        ".loader",
        {
          width: "0px",
          scale: 0,
          display: "none",
        },
        {
          duration: 0.2,
        },
      );
      await animate(
        ".check",
        {
          width: tickSize,
          scale: 1,
          display: "block",
        },
        {
          duration: 0.2,
        },
      );
    };

    const handleClick = async () => {
      await animateLoading();
      // await props.onClick?.(event);
      await new Promise(resolve => setTimeout(resolve, 2000));
      setPaymentStatus("Completed Payment!!");
      await animateSuccess();
    };

    const {
      onClick,
      onDrag,
      onDragStart,
      onDragEnd,
      onAnimationStart,
      onAnimationEnd,
      setPaymentStatus,
      ...buttonProps
    } = props;

    useEffect( () => {
      handleClick();
    }, [])

    return (
      <motion.button
        layout
        layoutId="button"
        // ref={(node) => {
        //   // Set the scope ref
        //   if (scope && typeof scope === 'object' && 'current' in scope) {
        //     (scope as React.MutableRefObject<HTMLButtonElement | null>).current = node;
        //   }
        //   // Set the forwarded ref
        //   if (typeof forwardedRef === 'function') {
        //     forwardedRef(node);
        //   } else if (forwardedRef) {
        //     forwardedRef.current = node;
        //   }
        // }}
        ref={scope}
        className={cn(
          "flex min-w-[10px] items-center justify-center gap-2  bg-green-500 px-4 py-2 font-medium text-white dark:ring-offset-black",
          className,
        )}
        {...buttonProps}
        // onClick={handleClick}
      >
        <motion.div layout className="flex items-center gap-2">
          <Loader />
          <CheckIcon />
          <motion.span layout>{children}</motion.span>
        </motion.div>
      </motion.button>
    );
  }
);

StatefulComponent.displayName = "StatefulButton";

const Loader = () => {
  return (
    <motion.svg
      animate={{
        rotate: [0, 360],
      }}
      initial={{
        scale: 0,
        width: 0,
        display: "none",
      }}
      style={{
        scale: 0.5,
        display: "none",
      }}
      transition={{
        duration: 0.3,
        repeat: Infinity,
        ease: "linear",
      }}
      xmlns="http://www.w3.org/2000/svg"
      width={loadingSize}
      height={loadingSize}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="loader text-white"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M12 3a9 9 0 1 0 9 9" />
    </motion.svg>
  );
};

const CheckIcon = () => {
  return (
    <motion.svg
      initial={{
        scale: 0,
        width: 0,
        display: "none",
      }}
      style={{
        scale: 0.5,
        display: "none",
      }}
      xmlns="http://www.w3.org/2000/svg"
      width={tickSize}
      height={tickSize}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="check text-white"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" />
      <path d="M9 12l2 2l4 -4" />
    </motion.svg>
  );
};
