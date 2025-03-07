import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Mail, MessageSquare, Phone } from "lucide-react"

export function AIPreferencesSection() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>AI Preferences</CardTitle>
          <CardDescription>Customize how the AI assistant communicates with your leads</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-8">
            <div>
              <h3 className="text-lg font-medium mb-4">Preferred Communication Methods</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card className="border-2 border-primary">
                  <CardContent className="p-6">
                    <div className="flex flex-col items-center gap-4 text-center">
                      <div className="rounded-full bg-[#437A45] p-3">
                        <Mail className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <h4 className="font-medium">Email</h4>
                        <p className="text-sm text-muted-foreground">Send follow-ups via email</p>
                      </div>
                      <Switch id="email-enabled" defaultChecked />
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-2 border-primary">
                  <CardContent className="p-6">
                    <div className="flex flex-col items-center gap-4 text-center">
                      <div className="rounded-full  bg-[#437A45] p-3">
                        <MessageSquare className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <h4 className="font-medium">SMS</h4>
                        <p className="text-sm text-muted-foreground">Send follow-ups via text message</p>
                      </div>
                      <Switch id="sms-enabled" defaultChecked />
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-2 border-primary">
                  <CardContent className="p-6">
                    <div className="flex flex-col items-center gap-4 text-center">
                      <div className="rounded-full bg-[#437A45] p-3">
                        <Phone className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <h4 className="font-medium">Phone Call</h4>
                        <p className="text-sm text-muted-foreground">Make automated follow-up calls</p>
                      </div>
                      <Switch id="call-enabled" defaultChecked />
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-medium">Follow-up Frequency</h3>
              <div className="space-y-6">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <Label>Initial Response Time</Label>
                    <span className="text-sm text-muted-foreground">Within 5 minutes</span>
                  </div>
                  <Slider defaultValue={[5]} max={60} step={5} />
                </div>

                <div className="space-y-4">
                  <Label>Follow-up Schedule</Label>
                  <RadioGroup defaultValue="balanced">
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="aggressive" id="aggressive" />
                      <Label htmlFor="aggressive">Aggressive (Daily follow-ups)</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="balanced" id="balanced" />
                      <Label htmlFor="balanced">Balanced (2-3 days between follow-ups)</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="relaxed" id="relaxed" />
                      <Label htmlFor="relaxed">Relaxed (Weekly follow-ups)</Label>
                    </div>
                  </RadioGroup>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="max-attempts">Maximum Follow-up Attempts</Label>
                  <Select defaultValue="5">
                    <SelectTrigger id="max-attempts">
                      <SelectValue placeholder="Select maximum attempts" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="3">3 attempts</SelectItem>
                      <SelectItem value="5">5 attempts</SelectItem>
                      <SelectItem value="7">7 attempts</SelectItem>
                      <SelectItem value="10">10 attempts</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-medium">AI Tone & Style</h3>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="tone">Communication Tone</Label>
                  <Select defaultValue="professional">
                    <SelectTrigger id="tone">
                      <SelectValue placeholder="Select tone" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="professional">Professional</SelectItem>
                      <SelectItem value="friendly">Friendly</SelectItem>
                      <SelectItem value="casual">Casual</SelectItem>
                      <SelectItem value="formal">Formal</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="personalization">Personalization Level</Label>
                    <p className="text-sm text-muted-foreground">
                      How much the AI should personalize messages based on lead data
                    </p>
                  </div>
                  <Switch id="personalization" defaultChecked />
                </div>
              </div>
            </div>

            <Button className="bg-[#437A45]">Save Preferences</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

