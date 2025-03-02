import { Building,  Home,  PlusSquare,  Settings } from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

// Menu items.
const items = [
  {
    title: "Dashboard",
    url: "/admin",
    icon: Home,
  },
  {
    title: "Add Tattoo",
    url: "/admin/add-tattoo",
    icon: PlusSquare,
  },
  {
    title: "Tattoos",
    url: "/admin/get-tattoo",
    icon: Building,
  },
]

export function AppSidebar() {
  return (
    <Sidebar className="h-screen bg-zinc-50 border-r border-zinc-200 dark:bg-zinc-900 dark:border-zinc-800">
      <SidebarContent className="p-4">
        <div className="mb-6">
          <h1 className="text-xl font-bold text-zinc-800 dark:text-zinc-100">Tattoo Admin</h1>
          <p className="text-sm text-zinc-500 dark:text-zinc-400">Management Portal</p>
        </div>
        
        <SidebarGroup>
          <SidebarGroupLabel className="text-xs font-medium uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
            Application
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title} className="my-1">
                  <SidebarMenuButton asChild>
                    <a 
                      href={item.url}
                      className="flex items-center p-2 rounded-lg text-zinc-700 hover:bg-zinc-200 hover:text-zinc-900 transition-colors duration-200 dark:text-zinc-300 dark:hover:bg-zinc-800 dark:hover:text-zinc-100"
                    >
                      <item.icon className="h-5 w-5 mr-3 text-zinc-500 dark:text-zinc-400" />
                      <span className="font-medium">{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}