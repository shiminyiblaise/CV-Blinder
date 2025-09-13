import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '../components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card'
import { Badge } from '../components/ui/badge'
import { Switch } from '../components/ui/switch'
import { CheckCircle, Shield, ArrowLeft } from 'lucide-react'
import blink from '../blink/client'

export default function Pricing() {
  const navigate = useNavigate()
  const [isAnnual, setIsAnnual] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const plans = [
    {
      name: 'Starter',
      description: 'Perfect for small recruitment agencies',
      price: isAnnual ? 29 : 39,
      originalPrice: isAnnual ? 39 : null,
      cvLimit: 50,
      features: [
        'Up to 50 CVs per month',
        'Basic anonymization rules',
        '2 custom templates',
        'PDF & DOCX output',
        'Email support',
        'Basic branding'
      ],
      popular: false
    },
    {
      name: 'Professional',
      description: 'Most popular for growing agencies',
      price: isAnnual ? 79 : 99,
      originalPrice: isAnnual ? 99 : null,
      cvLimit: 200,
      features: [
        'Up to 200 CVs per month',
        'Advanced anonymization rules',
        'Unlimited custom templates',
        'PDF & DOCX output',
        'Priority support',
        'Full branding customization',
        'Bulk processing',
        'API access'
      ],
      popular: true
    },
    {
      name: 'Enterprise',
      description: 'For large recruitment organizations',
      price: isAnnual ? 199 : 249,
      originalPrice: isAnnual ? 249 : null,
      cvLimit: 1000,
      features: [
        'Up to 1000 CVs per month',
        'Custom anonymization rules',
        'White-label solution',
        'All output formats',
        'Dedicated support',
        'Advanced analytics',
        'Team collaboration',
        'Custom integrations',
        'SLA guarantee'
      ],
      popular: false
    }
  ]

  const handleGetStarted = async (planName: string) => {
    setIsLoading(true)
    try {
      blink.auth.login('/dashboard')
    } catch (error) {
      console.error('Login error:', error)
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm" onClick={() => navigate('/')}>
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Home
              </Button>
              <div className="flex items-center space-x-2">
                <Shield className="h-8 w-8 text-primary" />
                <span className="text-xl font-semibold">CV Blinder</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Header Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold mb-4">Simple, Transparent Pricing</h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Choose the perfect plan for your recruitment agency. All plans include our core anonymization features.
          </p>
          
          {/* Billing Toggle */}
          <div className="flex items-center justify-center space-x-4 mb-8">
            <span className={`text-sm ${!isAnnual ? 'text-foreground' : 'text-muted-foreground'}`}>
              Monthly
            </span>
            <Switch
              checked={isAnnual}
              onCheckedChange={setIsAnnual}
            />
            <span className={`text-sm ${isAnnual ? 'text-foreground' : 'text-muted-foreground'}`}>
              Annual
            </span>
            {isAnnual && (
              <Badge variant="secondary" className="ml-2">
                Save 25%
              </Badge>
            )}
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {plans.map((plan, index) => (
            <Card key={index} className={`relative ${plan.popular ? 'border-primary shadow-lg scale-105' : ''}`}>
              {plan.popular && (
                <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  Most Popular
                </Badge>
              )}
              <CardHeader className="text-center">
                <CardTitle className="text-2xl">{plan.name}</CardTitle>
                <CardDescription className="text-base">{plan.description}</CardDescription>
                <div className="mt-4">
                  <div className="flex items-center justify-center space-x-2">
                    <span className="text-4xl font-bold">${plan.price}</span>
                    <div className="text-left">
                      <div className="text-sm text-muted-foreground">
                        /{isAnnual ? 'month' : 'month'}
                      </div>
                      {plan.originalPrice && (
                        <div className="text-sm text-muted-foreground line-through">
                          ${plan.originalPrice}
                        </div>
                      )}
                    </div>
                  </div>
                  {isAnnual && (
                    <p className="text-sm text-muted-foreground mt-2">
                      Billed annually (${plan.price * 12})
                    </p>
                  )}
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="text-center">
                    <p className="text-lg font-semibold">{plan.cvLimit} CVs/month</p>
                    <p className="text-sm text-muted-foreground">Processing limit</p>
                  </div>
                  
                  <ul className="space-y-3">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center space-x-3">
                        <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <Button 
                    className="w-full mt-6" 
                    variant={plan.popular ? 'default' : 'outline'}
                    onClick={() => handleGetStarted(plan.name)}
                    disabled={isLoading}
                  >
                    {isLoading ? 'Loading...' : 'Get Started'}
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* FAQ Section */}
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-8">Frequently Asked Questions</h2>
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">What happens if I exceed my monthly CV limit?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  You can upgrade your plan at any time or purchase additional CV processing credits. 
                  We'll notify you when you're approaching your limit.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Can I cancel my subscription anytime?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Yes, you can cancel your subscription at any time. You'll continue to have access 
                  to your plan features until the end of your billing period.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Is my data secure?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Absolutely. We use enterprise-grade encryption and have a zero data retention policy. 
                  Your documents are processed securely and deleted immediately after processing.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Do you offer custom enterprise solutions?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Yes, we offer custom solutions for large enterprises including white-label options, 
                  custom integrations, and dedicated support. Contact us to discuss your requirements.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center mt-16 p-8 bg-muted/30 rounded-lg">
          <h3 className="text-2xl font-bold mb-4">Ready to get started?</h3>
          <p className="text-muted-foreground mb-6">
            Join hundreds of recruitment agencies already using CV Blinder
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" onClick={() => handleGetStarted('trial')} disabled={isLoading}>
              {isLoading ? 'Loading...' : 'Start Free Trial'}
            </Button>
            <Button size="lg" variant="outline">
              Schedule Demo
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}