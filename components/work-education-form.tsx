"use client"

import type { UserProfile } from "@/types/profile"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface WorkEducationFormProps {
  profile: UserProfile
  onUpdate: (updatedProfile: Partial<UserProfile>) => void
}

export default function WorkEducationForm({ profile, onUpdate }: WorkEducationFormProps) {
  return (
    <div className="space-y-6">
      <Tabs defaultValue="work" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="work">Work Experience</TabsTrigger>
          <TabsTrigger value="education">Education</TabsTrigger>
        </TabsList>
        <TabsContent value="work">
          <Card>
            <CardHeader>
              <CardTitle>Work Experience</CardTitle>
              <CardDescription>Add your current or most recent job</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="company">Company</Label>
                  <Input
                    id="company"
                    value={profile.work.company}
                    onChange={(e) =>
                      onUpdate({
                        work: {
                          ...profile.work,
                          company: e.target.value,
                        },
                      })
                    }
                    placeholder="Acme Inc."
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="position">Position</Label>
                  <Input
                    id="position"
                    value={profile.work.position}
                    onChange={(e) =>
                      onUpdate({
                        work: {
                          ...profile.work,
                          position: e.target.value,
                        },
                      })
                    }
                    placeholder="Senior Developer"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="website">Company Website</Label>
                <Input
                  id="website"
                  value={profile.work.website}
                  onChange={(e) =>
                    onUpdate({
                      work: {
                        ...profile.work,
                        website: e.target.value,
                      },
                    })
                  }
                  placeholder="https://acme.com"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="startDate">Start Date</Label>
                  <Input
                    id="startDate"
                    type="month"
                    value={profile.work.startDate}
                    onChange={(e) =>
                      onUpdate({
                        work: {
                          ...profile.work,
                          startDate: e.target.value,
                        },
                      })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="endDate">End Date</Label>
                  <Input
                    id="endDate"
                    type="month"
                    value={profile.work.endDate}
                    onChange={(e) =>
                      onUpdate({
                        work: {
                          ...profile.work,
                          endDate: e.target.value,
                        },
                      })
                    }
                    disabled={profile.work.current}
                  />
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Switch
                  id="current"
                  checked={profile.work.current}
                  onCheckedChange={(checked) =>
                    onUpdate({
                      work: {
                        ...profile.work,
                        current: checked,
                      },
                    })
                  }
                />
                <Label htmlFor="current">I currently work here</Label>
              </div>

              <div className="flex items-center space-x-2">
                <Switch
                  id="showWorkExperience"
                  checked={profile.displayOptions.showWorkExperience}
                  onCheckedChange={(checked) =>
                    onUpdate({
                      displayOptions: {
                        ...profile.displayOptions,
                        showWorkExperience: checked,
                      },
                    })
                  }
                />
                <Label htmlFor="showWorkExperience">Show work experience in README</Label>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="education">
          <Card>
            <CardHeader>
              <CardTitle>Education</CardTitle>
              <CardDescription>Add your education details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="institution">Institution</Label>
                  <Input
                    id="institution"
                    value={profile.education.institution}
                    onChange={(e) =>
                      onUpdate({
                        education: {
                          ...profile.education,
                          institution: e.target.value,
                        },
                      })
                    }
                    placeholder="University of Technology"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="degree">Degree</Label>
                  <Input
                    id="degree"
                    value={profile.education.degree}
                    onChange={(e) =>
                      onUpdate({
                        education: {
                          ...profile.education,
                          degree: e.target.value,
                        },
                      })
                    }
                    placeholder="Bachelor's"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="field">Field of Study</Label>
                <Input
                  id="field"
                  value={profile.education.field}
                  onChange={(e) =>
                    onUpdate({
                      education: {
                        ...profile.education,
                        field: e.target.value,
                      },
                    })
                  }
                  placeholder="Computer Science"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="eduStartDate">Start Date</Label>
                  <Input
                    id="eduStartDate"
                    type="month"
                    value={profile.education.startDate}
                    onChange={(e) =>
                      onUpdate({
                        education: {
                          ...profile.education,
                          startDate: e.target.value,
                        },
                      })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="eduEndDate">End Date</Label>
                  <Input
                    id="eduEndDate"
                    type="month"
                    value={profile.education.endDate}
                    onChange={(e) =>
                      onUpdate({
                        education: {
                          ...profile.education,
                          endDate: e.target.value,
                        },
                      })
                    }
                    disabled={profile.education.current}
                  />
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Switch
                  id="eduCurrent"
                  checked={profile.education.current}
                  onCheckedChange={(checked) =>
                    onUpdate({
                      education: {
                        ...profile.education,
                        current: checked,
                      },
                    })
                  }
                />
                <Label htmlFor="eduCurrent">I'm currently studying here</Label>
              </div>

              <div className="flex items-center space-x-2">
                <Switch
                  id="showEducation"
                  checked={profile.displayOptions.showEducation}
                  onCheckedChange={(checked) =>
                    onUpdate({
                      displayOptions: {
                        ...profile.displayOptions,
                        showEducation: checked,
                      },
                    })
                  }
                />
                <Label htmlFor="showEducation">Show education in README</Label>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
