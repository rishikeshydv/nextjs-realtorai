"use client"
import EmailInterface from '@/components/email-interface'
import React from 'react'
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
export default function Email() {
  const navItems = [
    { name: "Home", href: "/" },
    { name: "Dashboard", href: "/dashboard" },
    { name: "Email", href: "/email" },
    { name: "Calendar", href: "/calendar" },
    { name: "Logbook", href: "/logs" },
  ];
  const pathname = usePathname();
    const [isOpen, setIsOpen] = React.useState(false);
  return (
    <div>
                <div className="container flex h-16 items-center">

{/* Desktop navigation */}
<nav className="hidden md:flex md:flex-1 items-center justify-center ml-[10em]">
<ul className="flex flex-wrap items-center gap-3">
{navItems.map((item) => (
<li key={item.name} className="relative">
  <Link
    href={item.href}
    className={cn(
      "relative flex items-center rounded-lg px-4 py-2 text-sm font-medium transition-all duration-200 ease-in-out",
      "hover:bg-gray-100/80 hover:text-gray-900",
      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
      pathname === item.href
        ? "bg-[#437A45]/90 text-white shadow-sm hover:bg-[#437A45]"
        : "bg-gray-50/80 text-gray-700 hover:shadow-sm",
    )}
  >
    {item.name}
    {pathname === item.href && (
      <span className="absolute bottom-0 left-0 right-0 mx-auto h-0.5 w-4/5 rounded-full bg-white/70" />
    )}
  </Link>
</li>
))}
</ul>

</nav>

{/* Desktop login button */}
<div className="absolute right-5 flex items-center hidden md:flex ml-auto">
  <Button
    asChild
    variant="outline"
    size="sm"
    className="bg-[#437A45] text-white"
  >
    <Link href="/auth/login">Login</Link>
  </Button>
</div>

{/* Mobile navigation */}
<Sheet open={isOpen} onOpenChange={setIsOpen}>
  <SheetTrigger asChild className="md:hidden">
    <Button variant="ghost" size="icon" className="ml-auto">
      <Menu className="h-5 w-5" />
      <span className="sr-only">Toggle menu</span>
    </Button>
  </SheetTrigger>
  <SheetContent side="right">
    <nav className="flex flex-col gap-4 mt-8">
      {navItems.map((item) => (
        <Link
          key={item.name}
          href={item.href}
          className={cn(
            "text-sm font-medium transition-colors hover:text-primary",
            pathname === item.href
              ? "text-primary"
              : "text-muted-foreground"
          )}
          onClick={() => setIsOpen(false)}
        >
          {item.name}
        </Link>
      ))}
      <div className="mt-4 pt-4 border-t">
        <Button asChild className="w-full" size="sm">
          <Link href="/login" onClick={() => setIsOpen(false)}>
            Login
          </Link>
        </Button>
      </div>
    </nav>
  </SheetContent>
</Sheet>
</div>
<EmailInterface />
    </div>
  )
}
