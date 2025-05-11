"use client"

import type { UserProfile } from "@/types/profile"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"

interface SocialLinksFormProps {
  profile: UserProfile
  onUpdate: (updatedProfile: Partial<UserProfile>) => void
}

export default function SocialLinksForm({ profile, onUpdate }: SocialLinksFormProps) {
  return (
    <div className="space-y-6">
      <Tabs defaultValue="social" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="social">Social Media</TabsTrigger>
          <TabsTrigger value="support">Support Links</TabsTrigger>
        </TabsList>
        <TabsContent value="social">
          <Card>
            <CardHeader>
              <CardTitle>Social Media Links</CardTitle>
              <CardDescription>Add your social media usernames</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="github">GitHub</Label>
                  <Input
                    id="github"
                    value={profile.github}
                    onChange={(e) => onUpdate({ github: e.target.value })}
                    placeholder="username"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="twitter">Twitter</Label>
                  <Input
                    id="twitter"
                    value={profile.twitter}
                    onChange={(e) => onUpdate({ twitter: e.target.value })}
                    placeholder="username"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="linkedin">LinkedIn</Label>
                  <Input
                    id="linkedin"
                    value={profile.linkedin}
                    onChange={(e) => onUpdate({ linkedin: e.target.value })}
                    placeholder="username"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="devto">Dev.to</Label>
                  <Input
                    id="devto"
                    value={profile.devto}
                    onChange={(e) => onUpdate({ devto: e.target.value })}
                    placeholder="username"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="medium">Medium</Label>
                  <Input
                    id="medium"
                    value={profile.medium}
                    onChange={(e) => onUpdate({ medium: e.target.value })}
                    placeholder="@username"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="codepen">CodePen</Label>
                  <Input
                    id="codepen"
                    value={profile.socialLinks.codepen}
                    onChange={(e) =>
                      onUpdate({
                        socialLinks: {
                          ...profile.socialLinks,
                          codepen: e.target.value,
                        },
                      })
                    }
                    placeholder="username"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="stackoverflow">Stack Overflow</Label>
                  <Input
                    id="stackoverflow"
                    value={profile.socialLinks.stackoverflow}
                    onChange={(e) =>
                      onUpdate({
                        socialLinks: {
                          ...profile.socialLinks,
                          stackoverflow: e.target.value,
                        },
                      })
                    }
                    placeholder="user ID"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="instagram">Instagram</Label>
                  <Input
                    id="instagram"
                    value={profile.socialLinks.instagram}
                    onChange={(e) =>
                      onUpdate({
                        socialLinks: {
                          ...profile.socialLinks,
                          instagram: e.target.value,
                        },
                      })
                    }
                    placeholder="username"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="dribbble">Dribbble</Label>
                  <Input
                    id="dribbble"
                    value={profile.socialLinks.dribbble}
                    onChange={(e) =>
                      onUpdate({
                        socialLinks: {
                          ...profile.socialLinks,
                          dribbble: e.target.value,
                        },
                      })
                    }
                    placeholder="username"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="behance">Behance</Label>
                  <Input
                    id="behance"
                    value={profile.socialLinks.behance}
                    onChange={(e) =>
                      onUpdate({
                        socialLinks: {
                          ...profile.socialLinks,
                          behance: e.target.value,
                        },
                      })
                    }
                    placeholder="username"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="hashnode">Hashnode</Label>
                  <Input
                    id="hashnode"
                    value={profile.socialLinks.hashnode}
                    onChange={(e) =>
                      onUpdate({
                        socialLinks: {
                          ...profile.socialLinks,
                          hashnode: e.target.value,
                        },
                      })
                    }
                    placeholder="username"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="youtube">YouTube</Label>
                  <Input
                    id="youtube"
                    value={profile.socialLinks.youtube}
                    onChange={(e) =>
                      onUpdate({
                        socialLinks: {
                          ...profile.socialLinks,
                          youtube: e.target.value,
                        },
                      })
                    }
                    placeholder="channel ID"
                  />
                </div>
              </div>

              <div className="mt-6 space-y-2">
                <h3 className="text-sm font-medium">Competitive Programming</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="leetcode">LeetCode</Label>
                    <Input
                      id="leetcode"
                      value={profile.socialLinks.leetcode}
                      onChange={(e) =>
                        onUpdate({
                          socialLinks: {
                            ...profile.socialLinks,
                            leetcode: e.target.value,
                          },
                        })
                      }
                      placeholder="username"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="hackerrank">HackerRank</Label>
                    <Input
                      id="hackerrank"
                      value={profile.socialLinks.hackerrank}
                      onChange={(e) =>
                        onUpdate({
                          socialLinks: {
                            ...profile.socialLinks,
                            hackerrank: e.target.value,
                          },
                        })
                      }
                      placeholder="username"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="codechef">CodeChef</Label>
                    <Input
                      id="codechef"
                      value={profile.socialLinks.codechef}
                      onChange={(e) =>
                        onUpdate({
                          socialLinks: {
                            ...profile.socialLinks,
                            codechef: e.target.value,
                          },
                        })
                      }
                      placeholder="username"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="codeforces">Codeforces</Label>
                    <Input
                      id="codeforces"
                      value={profile.socialLinks.codeforces}
                      onChange={(e) =>
                        onUpdate({
                          socialLinks: {
                            ...profile.socialLinks,
                            codeforces: e.target.value,
                          },
                        })
                      }
                      placeholder="username"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="topcoder">TopCoder</Label>
                    <Input
                      id="topcoder"
                      value={profile.socialLinks.topcoder}
                      onChange={(e) =>
                        onUpdate({
                          socialLinks: {
                            ...profile.socialLinks,
                            topcoder: e.target.value,
                          },
                        })
                      }
                      placeholder="username"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="hackerearth">HackerEarth</Label>
                    <Input
                      id="hackerearth"
                      value={profile.socialLinks.hackerearth}
                      onChange={(e) =>
                        onUpdate({
                          socialLinks: {
                            ...profile.socialLinks,
                            hackerearth: e.target.value,
                          },
                        })
                      }
                      placeholder="username"
                    />
                  </div>
                </div>
              </div>

              <div className="mt-6 flex items-center space-x-2">
                <Switch
                  id="showSocialIcons"
                  checked={profile.displayOptions.showSocialIcons}
                  onCheckedChange={(checked) =>
                    onUpdate({
                      displayOptions: {
                        ...profile.displayOptions,
                        showSocialIcons: checked,
                      },
                    })
                  }
                />
                <Label htmlFor="showSocialIcons">Show social media icons in README</Label>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="support">
          <Card>
            <CardHeader>
              <CardTitle>Support Links</CardTitle>
              <CardDescription>Add ways for people to support your work</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="buymeacoffee">Buy Me A Coffee</Label>
                  <Input
                    id="buymeacoffee"
                    value={profile.supportLinks.buymeacoffee}
                    onChange={(e) =>
                      onUpdate({
                        supportLinks: {
                          ...profile.supportLinks,
                          buymeacoffee: e.target.value,
                        },
                      })
                    }
                    placeholder="username"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="kofi">Ko-fi</Label>
                  <Input
                    id="kofi"
                    value={profile.supportLinks.kofi}
                    onChange={(e) =>
                      onUpdate({
                        supportLinks: {
                          ...profile.supportLinks,
                          kofi: e.target.value,
                        },
                      })
                    }
                    placeholder="username"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="patreon">Patreon</Label>
                  <Input
                    id="patreon"
                    value={profile.supportLinks.patreon}
                    onChange={(e) =>
                      onUpdate({
                        supportLinks: {
                          ...profile.supportLinks,
                          patreon: e.target.value,
                        },
                      })
                    }
                    placeholder="username"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="paypal">PayPal</Label>
                  <Input
                    id="paypal"
                    value={profile.supportLinks.paypal}
                    onChange={(e) =>
                      onUpdate({
                        supportLinks: {
                          ...profile.supportLinks,
                          paypal: e.target.value,
                        },
                      })
                    }
                    placeholder="username"
                  />
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Switch
                  id="showSupportSection"
                  checked={profile.displayOptions.showSupportSection}
                  onCheckedChange={(checked) =>
                    onUpdate({
                      displayOptions: {
                        ...profile.displayOptions,
                        showSupportSection: checked,
                      },
                    })
                  }
                />
                <Label htmlFor="showSupportSection">Show support section in README</Label>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
