import { RecentProjects } from "@/components/dashboard/recnt-projects";
import { StatsCard } from "@/components/dashboard/stat-card";
import { StatisticsCharts } from "@/components/dashboard/statistics-charts";
import { Loader } from "@/components/loader";
import { UpcomingTasks } from "@/components/upcoming-tasks";
import { useGetWorkspaceStatsQuery } from "@/hooks/use-workspace";
import type {
  Project,
  ProjectStatusData,
  StatsCardProps,
  Task,
  TaskPriorityData,
  TaskTrendsData,
  WorkspaceProductivityData,
} from "@/types";
import { useSearchParams } from "react-router";

const Dashboard = () => {
  const [searchParams] = useSearchParams();
  const workspaceId = searchParams.get("workspaceId");

  const { data, isPending, isError, error } = useGetWorkspaceStatsQuery(workspaceId!) as {
    data: {
      stats: StatsCardProps;
      taskTrendsData: TaskTrendsData[];
      projectStatusData: ProjectStatusData[];
      taskPriorityData: TaskPriorityData[];
      workspaceProductivityData: WorkspaceProductivityData[];
      upcomingTasks: Task[];
      recentProjects: Project[];
    };
    isPending: boolean;
    isError: boolean;
    error: any;
  };

  if (isPending) {
    return (
      <div>
        <Loader />
      </div>
    );
  }

  // Handle errors or invalid workspaceId
  if (isError || !workspaceId || workspaceId === 'null') {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-4">
        <p className="text-lg font-semibold">No Workspace Found</p>
        <p className="text-muted-foreground">
          {error?.response?.data?.message || "Please create a workspace to get started."}
        </p>
      </div>
    );
  }

  // Defensive guard: handle undefined data or missing stats
  if (!data || !data.stats) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-4">
        <Loader />
        <p className="text-muted-foreground">Setting up your workspace...</p>
      </div>
    );
  }

  return (
    <div className="space-y-8 2xl:space-y-12">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Dashboard</h1>
      </div>

      <StatsCard data={data.stats} />

      <StatisticsCharts
        stats={data.stats}
        taskTrendsData={data?.taskTrendsData ?? []}
        projectStatusData={data?.projectStatusData ?? []}
        taskPriorityData={data?.taskPriorityData ?? []}
        workspaceProductivityData={data?.workspaceProductivityData ?? []}
      />

      <div className="grid gap-6 lg:grid-cols-2">
        <RecentProjects data={data?.recentProjects ?? []} />
        <UpcomingTasks data={data?.upcomingTasks ?? []} />
      </div>
    </div>
  );
};

export default Dashboard;
