'use client'
import React, { useEffect } from 'react'
import { TenantSidebar } from "@/components/tenant-sidebar"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Separator } from "@/components/ui/separator"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { useSession } from 'next-auth/react'
import { useRouter, usePathname } from 'next/navigation'

const Layout = ({children}:{children:React.ReactNode}) => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    // If not authenticated, redirect to login
    if (status === 'unauthenticated') {
      router.push('/auth/login');
    }
    
    // If authenticated as admin, redirect to admin dashboard
    if (status === 'authenticated' && session?.user?.role === 'admin') {
      router.push('/');
    }

    // If authenticated as tenant and on the root tenant path, redirect to contract page
    if (status === 'authenticated' && 
        session?.user?.role === 'tenant' && 
        (pathname === '/tenant' || pathname === '/tenant/')) {
      router.push('/tenant/contract');
    }
  }, [status, session, router, pathname]);

  // Show loading state while checking authentication
  if (status === 'loading' || status === 'unauthenticated') {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <div className="loading loading-spinner loading-lg"></div>
          <p className="mt-4 text-muted-foreground">
            {status === 'loading' ? 'Loading your session...' : 'Redirecting...'}
          </p>
        </div>
      </div>
    );
  }

  // Get the current page title for breadcrumb
  const getPageTitle = () => {
    if (pathname.includes('/contract')) return 'My Contract';
    if (pathname.includes('/maintenance')) return 'Maintenance';
    if (pathname.includes('/notifications')) return 'Notifications';
    return 'Tenant Portal';
  };

  return (
    <SidebarProvider>
      <TenantSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbLink href="/tenant/contract">
                    Tenant Portal
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block" />
                <BreadcrumbItem>
                  <BreadcrumbPage>{getPageTitle()}</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>
        <div className='p-4'>
          {children}
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}

export default Layout 