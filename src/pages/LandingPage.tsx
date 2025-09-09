import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '../components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card'
import { Badge } from '../components/ui/badge'
import { Shield, FileText, Zap, Download, Users, Lock, CheckCircle, Star } from 'lucide-react'
import blink from '../blink/client'

interface LandingPageProps {
  user: any
}

export default function LandingPage({ user }: LandingPageProps) {
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(false)

  const handleGetStarted = async () => {
    if (user) {
      navigate('/dashboard')
    } else {
      setIsLoading(true)
      try {
        blink.auth.login('/dashboard')
      } catch (error) {
        console.error('Login error:', error)
        setIsLoading(false)
      }
    }
  }

  const features = [
    {
      icon: Shield,
      title: 'AI-Powered PII Detection',
      description: 'Advanced AI automatically identifies and removes all personally identifiable information while preserving professional details.'
    },
    {
      icon: FileText,
      title: 'Multi-Format Support',
      description: 'Upload CVs in PDF, Word, or text format. Our system handles all major document types seamlessly.'
    },
    {
      icon: Zap,
      title: 'Instant Processing',
      description: 'Get anonymized CVs in seconds, not hours. Our AI processes documents faster than any manual review.'
    },
    {
      icon: Download,
      title: 'Professional Output',
      description: 'Download recruiter-branded CVs in PDF and DOCX formats, ready to send to clients immediately.'
    },
    {
      icon: Users,
      title: 'Custom Branding',
      description: 'Add your agency logo, colors, and contact information to create professional, branded documents.'
    },
    {
      icon: Lock,
      title: 'Secure & Private',
      description: 'Zero data retention policy. Your documents are processed securely and deleted immediately after processing.'
    }
  ]

  const testimonials = [
    {
      name: 'Sarah Johnson',
      role: 'Senior Recruiter, TechTalent Solutions',
      content: 'CV Blinder has revolutionized our recruitment process. We can now send anonymized CVs to clients in minutes instead of hours.',
      rating: 5
    },
    {
      name: 'Michael Chen',
      role: 'Recruitment Director, Global Staffing',
      content: 'The AI accuracy is incredible. It removes all PII while keeping the professional content intact. Our clients love the consistency.',
      rating: 5
    },
    {
      name: 'Emma Rodriguez',
      role: 'Talent Acquisition Lead, InnovateCorp',
      content: 'Finally, a solution that understands recruitment needs. The branded output looks professional and saves us countless hours.',
      rating: 5
    }
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <Shield className="h-8 w-8 text-primary" />
              <span className="text-xl font-semibold">CV Blinder</span>
            </div>
            <nav className="hidden md:flex items-center space-x-8">
              <a href="#features" className="text-muted-foreground hover:text-foreground transition-colors">Features</a>
              <a href="#how-it-works" className="text-muted-foreground hover:text-foreground transition-colors">How it Works</a>
              <a href="#testimonials" className="text-muted-foreground hover:text-foreground transition-colors">Testimonials</a>
              <a href="#pricing" className="text-muted-foreground hover:text-foreground transition-colors">Pricing</a>
            </nav>
            <div className="flex items-center space-x-4">
              {user ? (
                <Button onClick={() => navigate('/dashboard')}>
                  Go to Dashboard
                </Button>
              ) : (
                <>
                  <Button variant="ghost" onClick={() => blink.auth.login()}>
                    Sign In
                  </Button>
                  <Button onClick={handleGetStarted} disabled={isLoading}>
                    {isLoading ? 'Loading...' : 'Get Started'}
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <Badge variant="secondary" className="mb-4">
            AI-Powered CV Anonymization
          </Badge>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
            Transform CVs into
            <span className="text-primary"> Anonymous</span>,
            <br />
            <span className="text-accent">Recruiter-Branded</span> Documents
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
            Remove all personally identifiable information from CVs while preserving professional details. 
            Output branded, client-ready documents in seconds with our advanced AI technology.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" onClick={handleGetStarted} disabled={isLoading}>
              {isLoading ? 'Loading...' : 'Start Free Trial'}
            </Button>
            <Button size="lg" variant="outline" onClick={() => navigate('/pricing')}>
              View Pricing
            </Button>
          </div>
          <p className="text-sm text-muted-foreground mt-4">
            No credit card required • Process 5 CVs free • Cancel anytime
          </p>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Powerful Features for Modern Recruitment</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Everything you need to anonymize CVs professionally and efficiently
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="border-0 shadow-sm hover:shadow-md transition-shadow">
                <CardHeader>
                  <feature.icon className="h-12 w-12 text-primary mb-4" />
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How it Works Section */}
      <section id="how-it-works" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">How CV Blinder Works</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Simple, fast, and secure CV anonymization in three easy steps
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-6">
                1
              </div>
              <h3 className="text-xl font-semibold mb-4">Upload CV</h3>
              <p className="text-muted-foreground">
                Drag and drop or upload CVs in PDF, Word, or text format. Our system supports all major document types.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-6">
                2
              </div>
              <h3 className="text-xl font-semibold mb-4">AI Processing</h3>
              <p className="text-muted-foreground">
                Our advanced AI identifies and removes all PII while preserving professional experience, skills, and achievements.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-6">
                3
              </div>
              <h3 className="text-xl font-semibold mb-4">Download Result</h3>
              <p className="text-muted-foreground">
                Get your branded, anonymized CV in PDF and DOCX formats, ready to send to clients immediately.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Trusted by Recruitment Professionals</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              See what recruitment agencies are saying about CV Blinder
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="border-0 shadow-sm">
                <CardContent className="pt-6">
                  <div className="flex mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 text-accent fill-current" />
                    ))}
                  </div>
                  <p className="text-muted-foreground mb-4">"{testimonial.content}"</p>
                  <div>
                    <p className="font-semibold">{testimonial.name}</p>
                    <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-primary text-primary-foreground">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Transform Your Recruitment Process?</h2>
          <p className="text-xl mb-8 opacity-90">
            Join hundreds of recruitment agencies already using CV Blinder to streamline their workflow
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" onClick={handleGetStarted} disabled={isLoading}>
              {isLoading ? 'Loading...' : 'Start Free Trial'}
            </Button>
            <Button size="lg" variant="outline" className="bg-transparent border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary">
              Schedule Demo
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 sm:px-6 lg:px-8 border-t">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <Shield className="h-6 w-6 text-primary" />
              <span className="text-lg font-semibold">CV Blinder</span>
            </div>
            <div className="flex items-center space-x-6 text-sm text-muted-foreground">
              <a href="#" className="hover:text-foreground transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-foreground transition-colors">Terms of Service</a>
              <a href="#" className="hover:text-foreground transition-colors">Contact</a>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t text-center text-sm text-muted-foreground">
            <p>&copy; 2025 CV Blinder. All rights reserved. Secure CV anonymization for recruitment professionals.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}