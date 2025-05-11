"use client"

import type { UserProfile } from "@/types/profile"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface GitHubFeaturesFormProps {
  profile: UserProfile
  onUpdate: (updatedProfile: Partial<UserProfile>) => void
  onToggleComponent: (component: string) => void
}

export default function GitHubFeaturesForm({ profile, onUpdate, onToggleComponent }: GitHubFeaturesFormProps) {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>GitHub Stats & Features</CardTitle>
          <CardDescription>Customize GitHub-specific elements in your README</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="stats">GitHub Stats</Label>
              <p className="text-sm text-muted-foreground">Show your GitHub activity statistics</p>
            </div>
            <Switch
              id="stats"
              checked={profile.enabledComponents.stats}
              onCheckedChange={() => onToggleComponent("stats")}
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="streak">GitHub Streak</Label>
              <p className="text-sm text-muted-foreground">Display your GitHub contribution streak</p>
            </div>
            <Switch
              id="streak"
              checked={profile.enabledComponents.streak}
              onCheckedChange={() => onToggleComponent("streak")}
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="topLangs">Top Languages</Label>
              <p className="text-sm text-muted-foreground">Show your most used programming languages</p>
            </div>
            <Switch
              id="topLangs"
              checked={profile.enabledComponents.topLangs}
              onCheckedChange={() => onToggleComponent("topLangs")}
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="trophies">GitHub Trophies</Label>
              <p className="text-sm text-muted-foreground">Display your GitHub achievement trophies</p>
            </div>
            <Switch
              id="trophies"
              checked={profile.enabledComponents.trophies}
              onCheckedChange={() => onToggleComponent("trophies")}
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="activity">Activity Graph</Label>
              <p className="text-sm text-muted-foreground">Show your GitHub contribution activity graph</p>
            </div>
            <Switch
              id="activity"
              checked={profile.enabledComponents.activity}
              onCheckedChange={() => onToggleComponent("activity")}
            />
          </div>

          <div className="pt-4">
            <Label htmlFor="statsTheme">Stats Theme</Label>
            <Select
              value={profile.customization.statsTheme}
              onValueChange={(value) =>
                onUpdate({
                  customization: {
                    ...profile.customization,
                    statsTheme: value,
                  },
                })
              }
            >
              <SelectTrigger id="statsTheme" className="mt-1">
                <SelectValue placeholder="Select a theme" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="default">Default</SelectItem>
                <SelectItem value="dark">Dark</SelectItem>
                <SelectItem value="radical">Radical</SelectItem>
                <SelectItem value="merko">Merko</SelectItem>
                <SelectItem value="gruvbox">Gruvbox</SelectItem>
                <SelectItem value="tokyonight">Tokyo Night</SelectItem>
                <SelectItem value="onedark">One Dark</SelectItem>
                <SelectItem value="cobalt">Cobalt</SelectItem>
                <SelectItem value="synthwave">Synthwave</SelectItem>
                <SelectItem value="highcontrast">High Contrast</SelectItem>
                <SelectItem value="dracula">Dracula</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center space-x-2 pt-4">
            <Switch
              id="showGitHubBadge"
              checked={profile.displayOptions.showGitHubBadge}
              onCheckedChange={(checked) =>
                onUpdate({
                  displayOptions: {
                    ...profile.displayOptions,
                    showGitHubBadge: checked,
                  },
                })
              }
            />
            <Label htmlFor="showGitHubBadge">Show GitHub profile badge</Label>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
