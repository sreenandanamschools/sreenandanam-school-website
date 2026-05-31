"use client"

import { useState, useRef } from "react"
import { Upload, FileText, CheckCircle2, AlertCircle, Loader2 } from "lucide-react"
import { cn } from "@/lib/utils"

export function CareerForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    coverLetter: ""
  })
  
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [fileError, setFileError] = useState<string | null>(null)
  
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)
  
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files || files.length === 0) return

    const file = files[0]
    
    // Validate file type (PDF only)
    if (file.type !== "application/pdf" && !file.name.toLowerCase().endsWith(".pdf")) {
      setFileError("Only PDF files are supported.")
      setSelectedFile(null)
      return
    }

    // Validate file size (5MB max)
    if (file.size > 5 * 1024 * 1024) {
      setFileError("File size exceeds 5MB limit.")
      setSelectedFile(null)
      return
    }

    setFileError(null)
    setSelectedFile(file)
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    const files = e.dataTransfer.files
    if (!files || files.length === 0) return

    const file = files[0]
    if (file.type !== "application/pdf" && !file.name.toLowerCase().endsWith(".pdf")) {
      setFileError("Only PDF files are supported.")
      setSelectedFile(null)
      return
    }

    if (file.size > 5 * 1024 * 1024) {
      setFileError("File size exceeds 5MB limit.")
      setSelectedFile(null)
      return
    }

    setFileError(null)
    setSelectedFile(file)
  }

  const triggerFileSelect = () => {
    fileInputRef.current?.click()
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!selectedFile) {
      setFileError("Please upload your resume.")
      return
    }

    setLoading(true)
    setError(null)

    try {
      const data = new FormData()
      data.append("name", formData.name)
      data.append("email", formData.email)
      data.append("phone", formData.phone)
      data.append("coverLetter", formData.coverLetter)
      data.append("resume", selectedFile)

      const response = await fetch("/api/careers", {
        method: "POST",
        body: data
      })

      const result = await response.json()

      if (response.ok && result.success) {
        setSuccess(true)
        setFormData({
          name: "",
          email: "",
          phone: "",
          coverLetter: ""
        })
        setSelectedFile(null)
      } else {
        setError(result.error || "Something went wrong. Please try again.")
      }
    } catch (err) {
      setError("Network error. Please check your connection and try again.")
    } finally {
      setLoading(false)
    }
  }

  if (success) {
    return (
      <div className="bg-card border border-primary/20 rounded-2xl p-8 text-center shadow-md max-w-2xl mx-auto my-12 animate-in fade-in zoom-in duration-300">
        <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle2 className="w-10 h-10 text-primary" />
        </div>
        <h3 className="font-serif text-2xl font-bold text-foreground mb-4">
          Application Submitted!
        </h3>
        <p className="text-muted-foreground mb-8 leading-relaxed">
          Thank you for your interest in Sree Nandanam Public School. We have received your application and resume. 
          Our administration/HR team will review your qualifications and contact you if your profile aligns with our requirements.
        </p>
        <button
          onClick={() => setSuccess(false)}
          className="px-6 py-2 bg-primary text-primary-foreground rounded-full text-sm font-medium hover:bg-primary/90 transition-colors"
        >
          Submit Another Application
        </button>
      </div>
    )
  }

  return (
    <div className="bg-card border border-border rounded-2xl p-6 md:p-10 shadow-sm max-w-2xl mx-auto my-12">
      <div className="mb-8">
        <h3 className="font-serif text-2xl font-bold text-foreground mb-2">
          Apply Now
        </h3>
        <p className="text-muted-foreground text-sm">
          Please fill out the form below and upload your resume (PDF only) to submit your job application.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Full Name */}
          <div className="flex flex-col gap-1.5">
            <label htmlFor="name" className="text-xs font-semibold text-foreground/80">
              Full Name <span className="text-primary">*</span>
            </label>
            <input
              type="text"
              id="name"
              name="name"
              required
              value={formData.name}
              onChange={handleInputChange}
              className="px-4 py-2 border border-border rounded-lg text-sm bg-background focus:outline-none focus:border-primary transition-colors text-foreground"
            />
          </div>

          {/* Email Address */}
          <div className="flex flex-col gap-1.5">
            <label htmlFor="email" className="text-xs font-semibold text-foreground/80">
              Email Address <span className="text-primary">*</span>
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              value={formData.email}
              onChange={handleInputChange}
              className="px-4 py-2 border border-border rounded-lg text-sm bg-background focus:outline-none focus:border-primary transition-colors text-foreground"
            />
          </div>
        </div>

        {/* Phone Number */}
        <div className="flex flex-col gap-1.5">
          <label htmlFor="phone" className="text-xs font-semibold text-foreground/80">
            Phone Number <span className="text-primary">*</span>
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            required
            value={formData.phone}
            onChange={handleInputChange}
            className="px-4 py-2 border border-border rounded-lg text-sm bg-background focus:outline-none focus:border-primary transition-colors text-foreground"
          />
        </div>

        {/* Resume Upload (PDF) */}
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-semibold text-foreground/80">
            Resume / CV (PDF only, max 5MB) <span className="text-primary">*</span>
          </label>
          <div
            onDragOver={handleDragOver}
            onDrop={handleDrop}
            onClick={triggerFileSelect}
            className={cn(
              "border-2 border-dashed border-border rounded-xl p-8 text-center cursor-pointer hover:border-primary hover:bg-primary/5 transition-all flex flex-col items-center justify-center gap-3",
              selectedFile && "border-primary/50 bg-primary/5",
              fileError && "border-destructive/50 bg-destructive/5"
            )}
          >
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              accept=".pdf,application/pdf"
              className="hidden"
            />
            {selectedFile ? (
              <>
                <FileText className="w-10 h-10 text-primary" />
                <div>
                  <p className="text-sm font-semibold text-foreground truncate max-w-md">
                    {selectedFile.name}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {(selectedFile.size / (1024 * 1024)).toFixed(2)} MB
                  </p>
                </div>
              </>
            ) : (
              <>
                <Upload className="w-10 h-10 text-muted-foreground" />
                <div>
                  <p className="text-sm font-semibold text-foreground">
                    Drag and drop your PDF here, or <span className="text-primary hover:underline">browse</span>
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    Only PDF documents are accepted. Maximum file size: 5MB
                  </p>
                </div>
              </>
            )}
          </div>
          {fileError && (
            <p className="text-xs text-destructive flex items-center gap-1 mt-1">
              <AlertCircle className="w-3.5 h-3.5" />
              {fileError}
            </p>
          )}
        </div>

        {/* Cover Letter */}
        <div className="flex flex-col gap-1.5">
          <label htmlFor="coverLetter" className="text-xs font-semibold text-foreground/80">
            Cover Letter / Brief Profile Introduction
          </label>
          <textarea
            id="coverLetter"
            name="coverLetter"
            rows={4}
            value={formData.coverLetter}
            onChange={handleInputChange}
            className="px-4 py-2 border border-border rounded-lg text-sm bg-background focus:outline-none focus:border-primary transition-colors text-foreground resize-none"
          />
        </div>

        {/* General Error Message */}
        {error && (
          <div className="p-3 bg-destructive/10 border border-destructive/20 rounded-lg text-xs text-destructive flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            {error}
          </div>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 bg-primary text-primary-foreground rounded-lg text-sm font-semibold hover:bg-primary/95 transition-all flex items-center justify-center gap-2 shadow-sm disabled:opacity-75 disabled:cursor-not-allowed"
        >
          {loading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Submitting Application...
            </>
          ) : (
            "Submit Application"
          )}
        </button>
      </form>
    </div>
  )
}
