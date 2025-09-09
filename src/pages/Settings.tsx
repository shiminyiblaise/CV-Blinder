import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '../components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card'
import { Switch } from '../components/ui/switch'
import { Input } from '../components/ui/input'
import { Label } from '../components/ui/label'
import { Textarea } from '../components/ui/textarea'
import { ArrowLeft, Save } from 'lucide-react'

export default function Settings() {
  const navigate = useNavigate()
  const [settings, setSettings] = useState({
    removeNames: true,
    removeContacts: true,
    removeAddresses: true,
    removePhotos: true,
    preserveCompanyNames: true,
    preserveEducation: true,
    preserveSkills: true,
    agencyName: 'Your Recruitment Agency',
    agencyEmail: 'contact@agency.com',
    agencyPhone: '+1 (555) 123-4567',
    agencyWebsite: 'www.agency.com',
    footerText: 'Confidential - For Client Review Only'
  })

  const handleSave = () => {
    // Save settings logic here
    console.log('Saving settings:', settings)
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm" onClick={() => navigate('/dashboard')}>
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Dashboard
              </Button>
              <span className="text-xl font-semibold">Settings</span>
            </div>
            <Button onClick={handleSave}>
              <Save className="h-4 w-4 mr-2" />
              Save Changes
            </Button>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-8">
          {/* Anonymization Rules */}
          <Card>
            <CardHeader>
              <CardTitle>Anonymization Rules</CardTitle>
              <CardDescription>
                Configure what information should be removed from CVs
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="remove-names">Remove Names</Label>
                  <p className="text-sm text-muted-foreground">Replace candidate names with "Candidate"</p>
                </div>
                <Switch
                  id="remove-names"
                  checked={settings.removeNames}
                  onCheckedChange={(checked) => setSettings({...settings, removeNames: checked})}
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="remove-contacts">Remove Contact Information</Label>
                  <p className="text-sm text-muted-foreground">Remove phone numbers, emails, and addresses</p>
                </div>
                <Switch
                  id="remove-contacts"
                  checked={settings.removeContacts}
                  onCheckedChange={(checked) => setSettings({...settings, removeContacts: checked})}
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="remove-addresses">Remove Addresses</Label>
                  <p className="text-sm text-muted-foreground">Remove physical addresses and location details</p>
                </div>
                <Switch
                  id="remove-addresses"
                  checked={settings.removeAddresses}
                  onCheckedChange={(checked) => setSettings({...settings, removeAddresses: checked})}
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="remove-photos">Remove Photos</Label>
                  <p className="text-sm text-muted-foreground">Remove profile pictures and personal photos</p>
                </div>
                <Switch
                  id="remove-photos"
                  checked={settings.removePhotos}
                  onCheckedChange={(checked) => setSettings({...settings, removePhotos: checked})}
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="preserve-companies">Preserve Company Names</Label>
                  <p className="text-sm text-muted-foreground">Keep employer names visible in work history</p>
                </div>
                <Switch
                  id="preserve-companies"
                  checked={settings.preserveCompanyNames}
                  onCheckedChange={(checked) => setSettings({...settings, preserveCompanyNames: checked})}
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="preserve-education">Preserve Education Details</Label>
                  <p className="text-sm text-muted-foreground">Keep school names and graduation years</p>
                </div>
                <Switch
                  id="preserve-education"
                  checked={settings.preserveEducation}
                  onCheckedChange={(checked) => setSettings({...settings, preserveEducation: checked})}
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="preserve-skills">Preserve Skills & Technologies</Label>
                  <p className="text-sm text-muted-foreground">Keep technical skills and competencies</p>
                </div>
                <Switch
                  id="preserve-skills"
                  checked={settings.preserveSkills}
                  onCheckedChange={(checked) => setSettings({...settings, preserveSkills: checked})}
                />
              </div>
            </CardContent>
          </Card>

          {/* Agency Branding */}
          <Card>
            <CardHeader>
              <CardTitle>Agency Branding</CardTitle>
              <CardDescription>
                Customize how your agency information appears on anonymized CVs
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="agency-name">Agency Name</Label>
                  <Input
                    id="agency-name"
                    value={settings.agencyName}
                    onChange={(e) => setSettings({...settings, agencyName: e.target.value})}
                  />
                </div>
                <div>
                  <Label htmlFor="agency-email">Contact Email</Label>
                  <Input
                    id="agency-email"
                    type="email"
                    value={settings.agencyEmail}
                    onChange={(e) => setSettings({...settings, agencyEmail: e.target.value})}
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="agency-phone">Phone Number</Label>
                  <Input
                    id="agency-phone"
                    value={settings.agencyPhone}
                    onChange={(e) => setSettings({...settings, agencyPhone: e.target.value})}
                  />
                </div>
                <div>
                  <Label htmlFor="agency-website">Website</Label>
                  <Input
                    id="agency-website"
                    value={settings.agencyWebsite}
                    onChange={(e) => setSettings({...settings, agencyWebsite: e.target.value})}
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="footer-text">Footer Text</Label>
                <Textarea
                  id="footer-text"
                  value={settings.footerText}
                  onChange={(e) => setSettings({...settings, footerText: e.target.value})}
                  placeholder="Text to appear at the bottom of anonymized CVs"
                />
              </div>
            </CardContent>
          </Card>

          {/* Logo Upload */}
          <Card>
            <CardHeader>
              <CardTitle>Agency Logo</CardTitle>
              <CardDescription>
                Upload your agency logo to appear on anonymized CVs
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-8 text-center">
                <div className="space-y-4">
                  <div className="w-16 h-16 bg-muted rounded-lg mx-auto flex items-center justify-center">
                    <span className="text-muted-foreground text-xs">LOGO</span>
                  </div>
                  <div>
                    <p className="font-medium">Upload Agency Logo</p>
                    <p className="text-sm text-muted-foreground">PNG, JPG up to 2MB</p>
                  </div>
                  <Button variant="outline">Choose File</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}