"use client"

import type { UserProfile } from "@/types/profile"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

interface AdditionalInfoFormProps {
  profile: UserProfile
  onUpdate: (updatedProfile: Partial<UserProfile>) => void
}

export default function AdditionalInfoForm({ profile, onUpdate }: AdditionalInfoFormProps) {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Additional Information</CardTitle>
          <CardDescription>Add more details to personalize your README</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="currentLearning">Currently Learning (comma-separated)</Label>
            <Textarea
              id="currentLearning"
              value={profile.additionalInfo.currentLearning.join(", ")}
              onChange={(e) =>
                onUpdate({
                  additionalInfo: {
                    ...profile.additionalInfo,
                    currentLearning: e.target.value
                      .split(",")
                      .map((item) => item.trim())
                      .filter((item) => item !== ""),
                  },
                })
              }
              placeholder="React, TypeScript, GraphQL"
              rows={2}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="collaborateOn">Looking to Collaborate On</Label>
            <Textarea
              id="collaborateOn"
              value={profile.additionalInfo.collaborateOn}
              onChange={(e) =>
                onUpdate({
                  additionalInfo: {
                    ...profile.additionalInfo,
                    collaborateOn: e.target.value,
                  },
                })
              }
              placeholder="Open source projects, Web development, Mobile apps"
              rows={2}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="helpWith">Looking for Help With</Label>
            <Textarea
              id="helpWith"
              value={profile.additionalInfo.helpWith}
              onChange={(e) =>
                onUpdate({
                  additionalInfo: {
                    ...profile.additionalInfo,
                    helpWith: e.target.value,
                  },
                })
              }
              placeholder="Machine Learning, Cloud Architecture"
              rows={2}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="askMeAbout">Ask Me About (comma-separated)</Label>
            <Textarea
              id="askMeAbout"
              value={profile.additionalInfo.askMeAbout.join(", ")}
              onChange={(e) =>
                onUpdate({
                  additionalInfo: {
                    ...profile.additionalInfo,
                    askMeAbout: e.target.value
                      .split(",")
                      .map((item) => item.trim())
                      .filter((item) => item !== ""),
                  },
                })
              }
              placeholder="JavaScript, React, Web Development"
              rows={2}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="funFact">Fun Fact</Label>
              <Input
                id="funFact"
                value={profile.additionalInfo.funFact}
                onChange={(e) =>
                  onUpdate({
                    additionalInfo: {
                      ...profile.additionalInfo,
                      funFact: e.target.value,
                    },
                  })
                }
                placeholder="I can solve a Rubik's cube in under 2 minutes"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="pronouns">Pronouns</Label>
              <Input
                id="pronouns"
                value={profile.additionalInfo.pronouns}
                onChange={(e) =>
                  onUpdate({
                    additionalInfo: {
                      ...profile.additionalInfo,
                      pronouns: e.target.value,
                    },
                  })
                }
                placeholder="He/Him, She/Her, They/Them"
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
