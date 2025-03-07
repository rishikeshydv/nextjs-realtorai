"use client"

import { useState } from "react"
import {
  SidebarProvider,
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { ProfileSection } from "@/components/profile-section"
import { SubscriptionSection } from "@/components/subscription-section"
import { ConnectedAppsSection } from "@/components/connected-apps-section"
import { AIPreferencesSection } from "@/components/ai-preferences-section"
import { SecuritySection } from "@/components/security-section"
import { User, CreditCard, Link, Bot, Shield,LogOut } from "lucide-react"
import { Button } from "@/components/ui/button"
import axios from "axios"
import { useRouter } from "next/navigation"


export function ProfileDashboard() {
  const [activeSection, setActiveSection] = useState("profile")
  const router = useRouter()
  const logOut = async() => {
    axios.get("http://localhost:5002/api/v1/logout")
    .then((res) => {
      console.log(res.data);
      router.push("/auth/login");
    }
    )
  }

  const renderSection = () => {
    switch (activeSection) {
      case "profile":
        return <ProfileSection />
      case "subscription":
        return <SubscriptionSection />
      case "connected-apps":
        return <ConnectedAppsSection />
      case "ai-preferences":
        return <AIPreferencesSection />
      case "security":
        return <SecuritySection />
      default:
        return <ProfileSection />
    }
  }

  return (
    <SidebarProvider>
      <div className="flex w-full min-h-screen bg-gray-50 dark:bg-gray-900">
        <Sidebar className="border-r border-gray-200 dark:border-gray-800">
          <SidebarHeader className="flex items-center px-4 py-2">
            <div className="flex items-center space-x-2">
              <div className="h-8 w-8 rounded-full bg-primary"></div>
              <div>
                <h3 className="text-sm font-medium">John Smith</h3>
                <p className="text-xs text-muted-foreground">Real Estate Agent</p>
              </div>
            </div>
          </SidebarHeader>
          <SidebarContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton onClick={() => setActiveSection("profile")} isActive={activeSection === "profile"}>
                  <User size={18} />
                  <span>Profile Information</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton
                  onClick={() => setActiveSection("subscription")}
                  isActive={activeSection === "subscription"}
                >
                  <CreditCard size={18} />
                  <span>Subscription Plan</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton
                  onClick={() => setActiveSection("connected-apps")}
                  isActive={activeSection === "connected-apps"}
                >
                  <Link size={18} />
                  <span>Connected Apps</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton
                  onClick={() => setActiveSection("ai-preferences")}
                  isActive={activeSection === "ai-preferences"}
                >
                  <Bot size={18} />
                  <span>AI Preferences</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton onClick={() => setActiveSection("security")} isActive={activeSection === "security"}>
                  <Shield size={18} />
                  <span>Security Settings</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarContent>
          <SidebarFooter className="border-t border-gray-200 dark:border-gray-800 p-4">
            <Button variant="outline" className="w-full justify-start bg-[#437A45] text-white" onClick={logOut}>
              <LogOut className="mr-2 h-4 w-4" />
              Sign Out
            </Button>
          </SidebarFooter>
        </Sidebar>

        <div className="flex-1 overflow-auto">
          <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-background px-6">
            <SidebarTrigger />
            <h1 className="text-xl font-semibold">User Dashboard</h1>
          </header>
          <main className="flex-1 p-6">{renderSection()}</main>
        </div>
      </div>
    </SidebarProvider>
  )
}

