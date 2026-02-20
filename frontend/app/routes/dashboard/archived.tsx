import { Loader } from "@/components/loader";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Archive } from "lucide-react";

const Archived = () => {
    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold">Archived Items</h1>
            </div>

            <Tabs defaultValue="projects">
                <TabsList>
                    <TabsTrigger value="projects">Archived Projects</TabsTrigger>
                    <TabsTrigger value="tasks">Archived Tasks</TabsTrigger>
                </TabsList>

                <TabsContent value="projects">
                    <Card>
                        <CardHeader>
                            <CardTitle>Archived Projects</CardTitle>
                            <CardDescription>
                                View and manage your archived projects
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="flex flex-col items-center justify-center py-12 space-y-4">
                                <Archive className="size-12 text-muted-foreground" />
                                <p className="text-muted-foreground">
                                    No archived projects found
                                </p>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="tasks">
                    <Card>
                        <CardHeader>
                            <CardTitle>Archived Tasks</CardTitle>
                            <CardDescription>
                                View and manage your archived tasks
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="flex flex-col items-center justify-center py-12 space-y-4">
                                <Archive className="size-12 text-muted-foreground" />
                                <p className="text-muted-foreground">
                                    No archived tasks found
                                </p>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    );
};

export default Archived;
