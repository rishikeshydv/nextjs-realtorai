import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Calendar, MessageSquare, Database } from "lucide-react"

export function ConnectedAppsSection() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Connected Apps</CardTitle>
          <CardDescription>Manage your connected applications and integrations</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="grid gap-6">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="rounded-md bg-[#437A45] p-2">
                        <Calendar className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <h3 className="font-medium">Google Calendar</h3>
                        <p className="text-sm text-muted-foreground">Sync your appointments and meetings</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Switch id="google-calendar" defaultChecked />
                      <Button variant="outline" size="sm">
                        Configure
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="rounded-md bg-[#437A45] p-2">
                        <MessageSquare className="h-6 w-6 text-white " />
                      </div>
                      <div>
                        <h3 className="font-medium">HubSpot</h3>
                        <p className="text-sm text-muted-foreground">Connect your CRM for lead management</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Switch id="hubspot" />
                      <Button variant="outline" size="sm">
                        Connect
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="rounded-md bg-[#437A45] p-2">
                        <Database className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <h3 className="font-medium">Salesforce</h3>
                        <p className="text-sm text-muted-foreground">Sync contacts and opportunities</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Switch id="salesforce" defaultChecked />
                      <Button variant="outline" size="sm">
                        Configure
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="flex justify-center">
              <Button variant="outline" className=" bg-[#437A45] text-white">Connect New App</Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

