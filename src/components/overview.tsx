import { useEffect, useState } from "react";
import { formatDistanceToNow } from "date-fns";
import {
  FolderTree,
  LayoutGrid,
  Loader2,
  MessageSquare,
  UserCheck,
  Users,
} from "lucide-react";
import {
  Avatar,
  AvatarFallback,
} from "@/components/ui/avatar";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

type RecentActivityType = {
  author: {
    login: string;
    type: string;
  };
  id: string;
  type: string;
  subject: string;
  post_time: string;
};

type OverviewDataType = {
  count: number;
};

export default function OverviewPage() {
  const [overviewData, setOverviewData] = useState<OverviewDataType[]>([]);
  const [recentActivity, setRecentActivity] = useState<RecentActivityType[]>(
    []
  );
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading state
    const timeout = setTimeout(() => {
      const mockOverviewData: OverviewDataType[] = [
        { count: 1250 },
        { count: 45678 },
        { count: 89 },
        { count: 12 },
        { count: 34 },
      ];

      const mockRecentActivity: RecentActivityType[] = [
        {
          author: { login: "johndoe", type: "user" },
          id: "1",
          type: "post",
          subject: "Posted a new thread in General",
          post_time: new Date().toISOString(),
        },
        {
          author: { login: "janedoe", type: "user" },
          id: "2",
          type: "reply",
          subject: "Replied to 'React vs Vue'",
          post_time: new Date(Date.now() - 3600000).toISOString(),
        },
      ];

      setOverviewData(mockOverviewData);
      setRecentActivity(mockRecentActivity);
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timeout);
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  const metrics = [
    { title: "Total Users", value: overviewData[0]?.count, icon: Users },
    { title: "Total Messages", value: overviewData[1]?.count, icon: MessageSquare },
    { title: "Current Online Users", value: overviewData[2]?.count, icon: UserCheck },
    { title: "Total Categories", value: overviewData[3]?.count, icon: FolderTree },
    { title: "Total Boards", value: overviewData[4]?.count, icon: LayoutGrid },
  ];

  return (
    <div className="space-y-6 mx-5">
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {metrics.map((metric, index) => (
          <Card key={index} className="transition-all hover:shadow-lg">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {metric.title}
              </CardTitle>
              <metric.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {metric.value?.toLocaleString() ?? "N/A"}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
        </CardHeader>

        <CardContent>
          <div className="space-y-8">
            {recentActivity.length > 0 ? (
              recentActivity.map((activity, i) => (
                <div key={activity.id || i} className="flex items-center">
                  <Avatar>
                    <AvatarFallback>
                      {activity.author.login.slice(0, 2).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div className="ml-4 space-y-1">
                    <p className="text-sm font-medium leading-none">
                      {activity.author.login}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {activity.subject}
                    </p>
                  </div>
                  <div className="ml-auto text-sm text-muted-foreground">
                    {formatDistanceToNow(new Date(activity.post_time), {
                      addSuffix: true,
                    })}
                  </div>
                </div>
              ))
            ) : (
              <p className="text-sm text-muted-foreground">
                No recent activity available.
              </p>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
