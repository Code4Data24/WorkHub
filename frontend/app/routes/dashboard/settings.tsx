import { Loader } from "@/components/loader";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Settings as SettingsIcon } from "lucide-react";

const Settings = () => {
    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold">Settings</h1>
            </div>

            <Tabs defaultValue="workspace">
                <TabsList>
                    <TabsTrigger value="workspace">Workspace Settings</TabsTrigger>
                    <TabsTrigger value="user">User Settings</TabsTrigger>
                </TabsList>

                <TabsContent value="workspace">
                    <Card>
                        <CardHeader>
                            <CardTitle>Workspace Settings</CardTitle>
                            <CardDescription>
                                Manage your workspace preferences and configurations
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="flex flex-col items-center justify-center py-12 space-y-4">
                                <SettingsIcon className="size-12 text-muted-foreground" />
                                <p className="text-muted-foreground">
                                    Workspace settings coming soon...
                                </p>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="user">
                    <Card>
                        <CardHeader>
                            <CardTitle>User Settings</CardTitle>
                            <CardDescription>
                                Manage your personal account settings
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="flex flex-col items-center justify-center py-12 space-y-4">
                                <SettingsIcon className="size-12 text-muted-foreground" />
                                <p className="text-muted-foreground">
                                    User settings coming soon...
                                </p>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    );
};

export default Settings;
