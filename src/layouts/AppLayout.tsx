/**
 * @copyright 2025 codingczar
 * @license Apache-2.0
 * @description app layout for the app
 */

/**
 * Node Modules
 */
import { Outlet, useNavigation, useLoaderData } from 'react-router';
import { cn } from '@/lib/utils';

/**
 * Components
 */
import { SidebarProvider } from '@/components/ui/sidebar';
import { TooltipProvider } from '@/components/ui/tooltip';
import AppSidebar from '@/components/AppSidebar';
import { Toaster } from '@/components/ui/toaster';
import { ProjectProvider } from '@/contexts/ProjectContext';

/**
 * Types
 */
import { AppLoaderData } from '@/routes/loaders/appLoader';

const AppLayout = () => {
  const navigation = useNavigation();
  const { projects } = useLoaderData<AppLoaderData>();
  console.log(projects);

  const isLoading = navigation.state === 'loading' && !navigation.formData;
  return (
    <>
      <ProjectProvider projects={projects}>
        <SidebarProvider>
          <TooltipProvider
            delayDuration={400}
            disableHoverableContent
          >
            <AppSidebar />

            <main
              className={cn(
                'flex-1',
                isLoading && 'opacity-50 pointer-events-none',
              )}
            >
              <Outlet />
            </main>
          </TooltipProvider>
        </SidebarProvider>

        <Toaster />
      </ProjectProvider>
    </>
  );
};

export default AppLayout;
