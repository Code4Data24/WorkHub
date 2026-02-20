import { Header } from "@/components/layout/header";
import { SidebarComponent } from "@/components/layout/sidebar-component";
import { Loader } from "@/components/loader";
import { CreateWorkspace } from "@/components/workspace/create-workspace";
import { useGetWorkspacesQuery } from "@/hooks/use-workspace";
import { fetchData } from "@/lib/fetch-util";
import { useAuth } from "@/provider/auth-context";
import type { Workspace } from "@/types";
import { useEffect, useState } from "react";
import { Navigate, Outlet, useNavigate, useSearchParams } from "react-router";

export const clientLoader = async () => {
  try {
    const [workspaces] = await Promise.all([fetchData("/workspaces")]);
    return { workspaces };
  } catch (error) {
    console.log(error);
  }
};

const DashboardLayout = () => {
  const { isAuthenticated, isLoading } = useAuth();
  const [isCreatingWorkspace, setIsCreatingWorkspace] = useState(false);
  const [currentWorkspace, setCurrentWorkspace] = useState<Workspace | null>(
    null
  );
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { data: workspaces, isLoading: isLoadingWorkspaces } = useGetWorkspacesQuery() as {
    data: Workspace[];
    isLoading: boolean;
  };

  // Auto-select workspace if missing from URL
  useEffect(() => {
    if (isLoadingWorkspaces || !workspaces) return;

    const workspaceId = searchParams.get("workspaceId");

    // If workspaceId is already present, do nothing
    if (workspaceId) return;

    // If no workspaces exist, let the page handle empty state
    if (workspaces.length === 0) return;

    // Priority 1: Check localStorage for recent workspace
    const lastWorkspaceId = localStorage.getItem("lastWorkspaceId");
    let selectedWorkspaceId: string | null = null;

    if (lastWorkspaceId) {
      // Verify the workspace still exists
      const workspaceExists = workspaces.find((w) => w._id === lastWorkspaceId);
      if (workspaceExists) {
        selectedWorkspaceId = lastWorkspaceId;
      }
    }

    // Priority 2: Default to first workspace if recent not found
    if (!selectedWorkspaceId && workspaces.length > 0) {
      selectedWorkspaceId = workspaces[0]._id;
    }

    // Redirect with workspaceId, using replace: true to prevent back button issues
    if (selectedWorkspaceId) {
      const currentPath = window.location.pathname;
      navigate(`${currentPath}?workspaceId=${selectedWorkspaceId}`, { replace: true });
    }
  }, [workspaces, isLoadingWorkspaces, searchParams, navigate]);

  // Update localStorage when workspace changes
  useEffect(() => {
    const workspaceId = searchParams.get("workspaceId");
    if (workspaceId) {
      localStorage.setItem("lastWorkspaceId", workspaceId);
    }
  }, [searchParams]);

  if (isLoading) {
    return <Loader />;
  }

  if (!isAuthenticated) {
    return <Navigate to="/sign-in" />;
  }

  const handleWorkspaceSelected = (workspace: Workspace) => {
    setCurrentWorkspace(workspace);
  };

  return (
    <div className="flex h-screen w-full">
      <SidebarComponent currentWorkspace={currentWorkspace} />

      <div className="flex flex-1 flex-col h-full">
        <Header
          onWorkspaceSelected={handleWorkspaceSelected}
          selectedWorkspace={currentWorkspace}
          onCreateWorkspace={() => setIsCreatingWorkspace(true)}
        />

        <main className="flex-1 overflow-y-auto h-full w-full">
          <div className="mx-auto container px-2 sm:px-6 lg:px-8 py-0 md:py-8 w-full h-full">
            <Outlet />
          </div>
        </main>
      </div>

      <CreateWorkspace
        isCreatingWorkspace={isCreatingWorkspace}
        setIsCreatingWorkspace={setIsCreatingWorkspace}
      />
    </div>
  );
};

export default DashboardLayout;
