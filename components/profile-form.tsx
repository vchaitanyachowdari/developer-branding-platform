"use client"

import type { UserProfile } from "@/types/profile"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

interface ProfileFormProps {
  profile: UserProfile
  onUpdate: (updatedProfile: Partial<UserProfile>) => void
  onToggleComponent: (component: string) => void
}

export default function ProfileForm({ profile, onUpdate, onToggleComponent }: ProfileFormProps) {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Basic Information</CardTitle>
          <CardDescription>Add your personal and professional details</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                value={profile.name}
                onChange={(e) => onUpdate({ name: e.target.value })}
                placeholder="John Doe"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="title">Professional Title</Label>
              <Input
                id="title"
                value={profile.title}
                onChange={(e) => onUpdate({ title: e.target.value })}
                placeholder="Full Stack Developer"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="bio">Bio</Label>
            <Textarea
              id="bio"
              value={profile.bio}
              onChange={(e) => onUpdate({ bio: e.target.value })}
              placeholder="A passionate developer focused on creating intuitive user experiences..."
              rows={3}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="location">Location</Label>
            <Input
              id="location"
              value={profile.location}
              onChange={(e) => onUpdate({ location: e.target.value })}
              placeholder="San Francisco, CA"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="portfolio">Portfolio URL</Label>
            <Input
              id="portfolio"
              value={profile.portfolio}
              onChange={(e) => onUpdate({ portfolio: e.target.value })}
              placeholder="https://johndoe.dev"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="skills">Skills (comma-separated)</Label>
            <Textarea
              id="skills"
              value={profile.skills.join(", ")}
              onChange={(e) =>
                onUpdate({
                  skills: e.target.value
                    .split(",")
                    .map((skill) => skill.trim())
                    .filter((skill) => skill !== ""),
                })
              }
              placeholder="javascript, react, node.js, typescript, mongodb"
              rows={2}
            />
          </div>

          <div className="flex items-center space-x-2">
            <Switch
              id="showTitleFirst"
              checked={profile.displayOptions.showTitleFirst}
              onCheckedChange={(checked) =>
                onUpdate({
                  displayOptions: {
                    ...profile.displayOptions,
                    showTitleFirst: checked,
                  },
                })
              }
            />
            <Label htmlFor="showTitleFirst">Show title before name in header</Label>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>README Components</CardTitle>
          <CardDescription>Choose which sections to include in your README</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="header">Header Banner</Label>
              <p className="text-sm text-muted-foreground">Display a welcome header with your name</p>
            </div>
            <Switch
              id="header"
              checked={profile.enabledComponents.header}
              onCheckedChange={() => onToggleComponent("header")}
            />
          </div>
          <Separator />

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="about">About Me</Label>
              <p className="text-sm text-muted-foreground">Show your bio and personal information</p>
            </div>
            <Switch
              id="about"
              checked={profile.enabledComponents.about}
              onCheckedChange={() => onToggleComponent("about")}
            />
          </div>
          <Separator />

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="skills">Skills & Technologies</Label>
              <p className="text-sm text-muted-foreground">Display your technical skills with icons</p>
            </div>
            <Switch
              id="skills"
              checked={profile.enabledComponents.skills}
              onCheckedChange={() => onToggleComponent("skills")}
            />
          </div>
          <Separator />

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="social">Social Links</Label>
              <p className="text-sm text-muted-foreground">Display links to your social media profiles</p>
            </div>
            <Switch
              id="social"
              checked={profile.enabledComponents.social}
              onCheckedChange={() => onToggleComponent("social")}
            />
          </div>
          <Separator />

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="blog">Blog Posts</Label>
              <p className="text-sm text-muted-foreground">Show your latest blog posts from Dev.to or Medium</p>
            </div>
            <Switch
              id="blog"
              checked={profile.enabledComponents.blog}
              onCheckedChange={() => onToggleComponent("blog")}
            />
          </div>
          <Separator />

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="support">Support Section</Label>
              <p className="text-sm text-muted-foreground">Display links for people to support your work</p>
            </div>
            <Switch
              id="support"
              checked={profile.enabledComponents.support}
              onCheckedChange={() => onToggleComponent("support")}
            />
          </div>
          <Separator />

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="visitors">Visitors Counter</Label>
              <p className="text-sm text-muted-foreground">Show a counter for profile visitors</p>
            </div>
            <Switch
              id="visitors"
              checked={profile.enabledComponents.visitors}
              onCheckedChange={() => onToggleComponent("visitors")}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
