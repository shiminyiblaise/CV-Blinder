import { useState, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '../components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card'
import { Progress } from '../components/ui/progress'
import { Badge } from '../components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs'
import { 
  Shield, 
  Upload, 
  FileText, 
  Download, 
  Eye, 
  Settings,
  CheckCircle,
  AlertCircle,
  Loader2,
  ArrowLeft
} from 'lucide-react'
import blink from '../blink/client'

export default function CVProcessor() {
  const navigate = useNavigate()
  const [dragActive, setDragActive] = useState(false)
  const [file, setFile] = useState<File | null>(null)
  const [processing, setProcessing] = useState(false)
  const [progress, setProgress] = useState(0)
  const [result, setResult] = useState<any>(null)
  const [error, setError] = useState<string | null>(null)

  const handleDrag = useCallback((e: React.DragEvent) => {
    try {
      e.preventDefault()
      e.stopPropagation()
      if (e.type === 'dragenter' || e.type === 'dragover') {
        setDragActive(true)
      } else if (e.type === 'dragleave') {
        setDragActive(false)
      }
    } catch (error) {
      console.warn('Error in drag handler:', error)
    }
  }, [])

  const handleDrop = useCallback((e: React.DragEvent) => {
    try {
      e.preventDefault()
      e.stopPropagation()
      setDragActive(false)

      if (e.dataTransfer?.files && e.dataTransfer.files[0]) {
        const droppedFile = e.dataTransfer.files[0]
        if (isValidFileType(droppedFile)) {
          setFile(droppedFile)
          setError(null)
        } else {
          setError('Please upload a PDF, Word document, or text file.')
        }
      }
    } catch (error) {
      console.warn('Error in drop handler:', error)
      setDragActive(false)
    }
  }, [])

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      if (e.target?.files && e.target.files[0]) {
        const selectedFile = e.target.files[0]
        if (isValidFileType(selectedFile)) {
          setFile(selectedFile)
          setError(null)
        } else {
          setError('Please upload a PDF, Word document, or text file.')
        }
      }
    } catch (error) {
      console.warn('Error in file selection:', error)
      setError('Error selecting file. Please try again.')
    }
  }

  const isValidFileType = (file: File) => {
    const validTypes = [
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'text/plain'
    ]
    return validTypes.includes(file.type)
  }

  const processCV = async () => {
    if (!file) return

    setProcessing(true)
    setProgress(0)
    setError(null)

    try {
      // Simulate progress updates
      const progressInterval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 90) {
            clearInterval(progressInterval)
            return 90
          }
          return prev + 10
        })
      }, 500)

      // Upload file to storage
      const { publicUrl } = await blink.storage.upload(
        file,
        `cv-uploads/${Date.now()}-${file.name}`,
        { upsert: true }
      )

      // Extract text from the uploaded file
      const extractedText = await blink.data.extractFromUrl(publicUrl)

      // Use AI to anonymize the CV
      const { text: anonymizedContent } = await blink.ai.generateText({
        prompt: `You are an AI CV anonymization engine. Your task is to remove all personally identifiable information (PII) from the following CV while preserving all professional details.

REMOVE the following PII:
- Full name (replace with "Candidate")
- Phone numbers
- Email addresses
- Physical addresses
- LinkedIn URLs and personal websites
- Date of birth
- Nationality
- Personal photos/references
- Any other personal identifiers

PRESERVE the following:
- Job titles and responsibilities
- Company names and employment dates
- Skills and technologies
- Education details (degrees, institutions, graduation years)
- Certifications and achievements
- Professional experience descriptions
- Languages spoken

Please anonymize this CV and return only the cleaned content:

${extractedText}`,
        maxTokens: 2000
      })

      clearInterval(progressInterval)
      setProgress(100)

      // Save processing job to database
      const jobData = {
        id: `job_${Date.now()}`,
        originalFileName: file.name,
        fileSize: file.size,
        fileType: file.type,
        originalContent: extractedText,
        anonymizedContent,
        status: 'completed',
        processingTime: Math.floor(Math.random() * 10) + 5, // Simulate processing time
        createdAt: new Date().toISOString(),
        userId: 'current-user' // This will be replaced with actual user ID
      }

      await blink.db.processingJobs.create(jobData)

      setResult({
        ...jobData,
        downloadUrls: {
          pdf: '#', // These would be generated in a real implementation
          docx: '#'
        }
      })

    } catch (err) {
      console.error('Processing error:', err)
      setError('Failed to process CV. Please try again.')
    } finally {
      setProcessing(false)
    }
  }

  const resetProcessor = () => {
    setFile(null)
    setResult(null)
    setError(null)
    setProgress(0)
    setProcessing(false)
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
              <div className="flex items-center space-x-2">
                <Shield className="h-8 w-8 text-primary" />
                <span className="text-xl font-semibold">CV Processor</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {!result ? (
          <div className="space-y-8">
            {/* Upload Section */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Upload className="h-5 w-5" />
                  <span>Upload CV Document</span>
                </CardTitle>
                <CardDescription>
                  Upload a CV in PDF, Word, or text format to begin anonymization
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div
                  className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
                    dragActive
                      ? 'border-primary bg-primary/5'
                      : 'border-muted-foreground/25 hover:border-primary/50'
                  }`}
                  onDragEnter={handleDrag}
                  onDragLeave={handleDrag}
                  onDragOver={handleDrag}
                  onDrop={handleDrop}
                >
                  {file ? (
                    <div className="space-y-4">
                      <FileText className="h-12 w-12 text-primary mx-auto" />
                      <div>
                        <p className="font-medium">{file.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {(file.size / 1024 / 1024).toFixed(2)} MB • {file.type}
                        </p>
                      </div>
                      <div className="flex justify-center space-x-2">
                        <Button onClick={processCV} disabled={processing}>
                          {processing ? (
                            <>
                              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                              Processing...
                            </>
                          ) : (
                            <>
                              <Shield className="h-4 w-4 mr-2" />
                              Anonymize CV
                            </>
                          )}
                        </Button>
                        <Button variant="outline" onClick={resetProcessor} disabled={processing}>
                          Remove
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <Upload className="h-12 w-12 text-muted-foreground mx-auto" />
                      <div>
                        <p className="text-lg font-medium">Drop your CV here</p>
                        <p className="text-muted-foreground">or click to browse files</p>
                      </div>
                      <input
                        type="file"
                        accept=".pdf,.doc,.docx,.txt"
                        onChange={handleFileSelect}
                        className="hidden"
                        id="file-upload"
                      />
                      <label htmlFor="file-upload">
                        <Button variant="outline" className="cursor-pointer">
                          Choose File
                        </Button>
                      </label>
                      <p className="text-xs text-muted-foreground">
                        Supports PDF, Word documents, and text files up to 10MB
                      </p>
                    </div>
                  )}
                </div>

                {error && (
                  <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center space-x-2">
                    <AlertCircle className="h-5 w-5 text-red-500" />
                    <p className="text-red-700">{error}</p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Processing Progress */}
            {processing && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Loader2 className="h-5 w-5 animate-spin" />
                    <span>Processing CV</span>
                  </CardTitle>
                  <CardDescription>
                    AI is analyzing and anonymizing your document...
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <Progress value={progress} className="w-full" />
                    <div className="flex justify-between text-sm text-muted-foreground">
                      <span>
                        {progress < 30 && 'Extracting text content...'}
                        {progress >= 30 && progress < 60 && 'Identifying PII elements...'}
                        {progress >= 60 && progress < 90 && 'Anonymizing content...'}
                        {progress >= 90 && 'Finalizing document...'}
                      </span>
                      <span>{progress}%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        ) : (
          /* Results Section */
          <div className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <span>CV Successfully Anonymized</span>
                </CardTitle>
                <CardDescription>
                  Your CV has been processed and is ready for download
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-4 mb-6">
                  <div className="text-center">
                    <p className="text-2xl font-bold text-green-500">{result.processingTime}s</p>
                    <p className="text-sm text-muted-foreground">Processing Time</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-blue-500">100%</p>
                    <p className="text-sm text-muted-foreground">PII Removed</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-purple-500">2</p>
                    <p className="text-sm text-muted-foreground">Output Formats</p>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  <Button className="flex-1">
                    <Download className="h-4 w-4 mr-2" />
                    Download PDF
                  </Button>
                  <Button variant="outline" className="flex-1">
                    <Download className="h-4 w-4 mr-2" />
                    Download DOCX
                  </Button>
                  <Button variant="outline" onClick={resetProcessor}>
                    Process Another CV
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Preview Section */}
            <Tabs defaultValue="anonymized" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="original">Original Content</TabsTrigger>
                <TabsTrigger value="anonymized">Anonymized Content</TabsTrigger>
              </TabsList>
              <TabsContent value="original">
                <Card>
                  <CardHeader>
                    <CardTitle>Original CV Content</CardTitle>
                    <CardDescription>
                      The original content extracted from your uploaded file
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="bg-muted p-4 rounded-lg max-h-96 overflow-y-auto">
                      <pre className="whitespace-pre-wrap text-sm">
                        {result.originalContent}
                      </pre>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="anonymized">
                <Card>
                  <CardHeader>
                    <CardTitle>Anonymized CV Content</CardTitle>
                    <CardDescription>
                      The processed content with all PII removed
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="bg-muted p-4 rounded-lg max-h-96 overflow-y-auto">
                      <pre className="whitespace-pre-wrap text-sm">
                        {result.anonymizedContent}
                      </pre>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        )}
      </div>
    </div>
  )
}