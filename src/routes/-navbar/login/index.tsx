import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { PasswordInput } from "@/components/ui/password-inp"
import { useState, type ComponentProps } from "react"
import { useLoginQuery } from "./query/login-query"
import { Spinner } from "@/components/ui/spinner"
import { cn } from "@/lib/utils"



export function Login({
  variant,
  className,
  children,
  ...props
}: ComponentProps<typeof Button>) {

  const [username, setUsername] = useState<string>("test1");
  const [password, setPassword] = useState<string>("test1pass");
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);

  const {mutate: loginNow, isPending, errorToDisplay, isSuccess} = useLoginQuery(setDialogOpen);

  return (
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
      <form className={cn("", className)}
      >
        <DialogTrigger asChild>

          <Button 
          {...props}
          variant={variant} className="px-[2rem] flex-1">
            {children}
            Login
            
            </Button>

        </DialogTrigger>
        <DialogContent 
        className="sm:max-w-[425px] z-220">

            <DialogHeader>
              <DialogTitle className="text-2xl">Log In</DialogTitle>
              <DialogDescription>
                You can use following dummy <b>(test1)</b> to Login and access the <b>Cart</b> and <b>Order</b> Functionality
              </DialogDescription>
            </DialogHeader>

          <form 
          onSubmit={(e) => {
            e.preventDefault();
            loginNow({
              username: username,
              password: password,
            });
          }
        
        }
          >
            <div className="grid gap-4">
              <div className="grid gap-3">
                <Label htmlFor="username">Username</Label>
                <Input id="username" name="username" value={username}
                onChange={(e) => setUsername(e.target.value)}
                />
              </div>
              <div className="grid gap-3">
                <Label htmlFor="password">Password</Label>
                <PasswordInput id="password" name="password" value={password}
                onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              {
                !isSuccess &&
                <p
                className="text-sm text-red-500 font-semibold"
                >{errorToDisplay}</p>
                
              }
            </div>

            <DialogFooter className="mt-4">
              <DialogClose  asChild>
                <Button variant="outline">Cancel</Button>
              </DialogClose>


              <Button 
              
              type="submit"
              disabled={isPending}
              >
                {
                  isPending && <Spinner/>
                }
                
                Login</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </form>
    </Dialog>
  )
}
