import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '../components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card'
import { Badge } from '../components/ui/badge'
import { ArrowLeft, Plus, Edit, Eye, Trash2, Upload } from 'lucide-react'

export default function TemplateManager() {
  const navigate = useNavigate()
  const [templates] = useState([
    {
      id: 1,
      name: 'Professional Blue',
      description: 'Clean, professional template with blue accents',
      isDefault: true,
      preview: '/api/placeholder/300/400'
    },
    {
      id: 2,
      name: 'Modern Gray',
      description: 'Minimalist design with gray color scheme',
      isDefault: false,
      preview: '/api/placeholder/300/400'
    }
  ])

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
              <span className="text-xl font-semibold">Template Manager</span>
            </div>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Create Template
            </Button>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">CV Templates</h1>
          <p className="text-muted-foreground">
            Manage your recruiter-branded CV templates and customize the output format.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {templates.map((template) => (
            <Card key={template.id} className="overflow-hidden">
              <div className="aspect-[3/4] bg-muted relative">
                <div className="absolute inset-0 flex items-center justify-center text-muted-foreground">
                  Template Preview
                </div>
                {template.isDefault && (
                  <Badge className="absolute top-2 right-2">Default</Badge>
                )}
              </div>
              <CardHeader>
                <CardTitle className="text-lg">{template.name}</CardTitle>
                <CardDescription>{template.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex space-x-2">
                  <Button size="sm" variant="outline" className="flex-1">
                    <Eye className="h-4 w-4 mr-1" />
                    Preview
                  </Button>
                  <Button size="sm" variant="outline" className="flex-1">
                    <Edit className="h-4 w-4 mr-1" />
                    Edit
                  </Button>
                  {!template.isDefault && (
                    <Button size="sm" variant="outline">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}

          {/* Add New Template Card */}
          <Card className="border-dashed border-2 cursor-pointer hover:border-primary/50 transition-colors">
            <CardContent className="flex flex-col items-center justify-center h-full min-h-[400px] text-center">
              <Upload className="h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold mb-2">Create New Template</h3>
              <p className="text-muted-foreground mb-4">
                Upload your custom template or start from scratch
              </p>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Add Template
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}