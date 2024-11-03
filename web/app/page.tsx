"use client"

import { useState, useEffect } from "react"
import { Github, FileText, Info, BookOpen, ChevronDown } from "lucide-react"
import Link from "next/link";
import { redirect } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export default function Component() {
  const [isLoading, setIsLoading] = useState(true)
  const [isReadmeOpen, setIsReadmeOpen] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1500)
    return () => clearTimeout(timer)
  }, [])

  const handleClick = () =>{
    redirect('https://github.com/aravind-manoj/useless-project/releases');
  }
    const decorativeShapes = (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <motion.div
        className="absolute top-20 right-[20%] w-64 h-64 rounded-full bg-purple-500/20 blur-3xl"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute top-40 left-[10%] w-72 h-72 rounded-full bg-emerald-500/20 blur-3xl"
        animate={{
          scale: [1.2, 1, 1.2],
          opacity: [0.5, 0.3, 0.5],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute bottom-20 right-[30%] w-96 h-96 rounded-full bg-yellow-500/20 blur-3xl"
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.3, 0.4, 0.3],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </div>
  )

  return (
    <div className="min-h-screen bg-zinc-900">
      <div className="relative min-h-screen">
        {decorativeShapes}
        <AnimatePresence>
          {isLoading ? (
            <motion.div
              key="loader"
              initial={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 flex items-center justify-center bg-zinc-900 z-50"
            >
              <motion.div
                className="w-16 h-16 border-4 border-primary rounded-full border-t-transparent"
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              />
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="relative"
            >
              <header className="sticky top-0 z-40 backdrop-blur-lg bg-zinc-900/80 border-b border-zinc-800">
                <div className="container mx-auto px-4">
                  <div className="flex items-center justify-between h-16">
                    <motion.div
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      className="flex items-center space-x-4"
                    >
                      <Link href="/" className="flex items-center space-x-2">
                        <span className="text-2xl font-bold bg-gradient-to-r from-red-400 to-purple-600 text-transparent bg-clip-text">
                          Fumbl-iFy
                        </span>
                      </Link>
                    </motion.div>
                    <motion.div
                      initial={{ x: 20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      className="flex items-center space-x-4"
                    >
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="md:hidden">
                            <ChevronDown className="h-5 w-5" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>
                            <Link href="https://github.com/aravind-manoj/useless-project">
                              GitHub
                            </Link>
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                      <Link
                        href="https://github.com/aravind-manoj/useless-project"
                        className="hidden md:flex items-center space-x-2 text-sm font-medium text-zinc-300 hover:text-primary transition-colors"
                      >
                        <Github className="h-5 w-5" />
                        <span>GitHub</span>
                      </Link>
                    </motion.div>
                  </div>
                </div>
              </header>

              <main className="container mx-auto px-4 py-16 relative z-10">
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="max-w-4xl mx-auto text-center mb-16"
                >
                  <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary via-purple-500 to-pink-600 text-transparent bg-clip-text">
                    Transform Your Content
                  </h1>
                  <p className="text-xl text-zinc-400">
                    Turn any topic into a humorous, exaggerated version with our Chrome extension
                  </p>
                </motion.div>

                <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.3 }}
                  >
                    <Card className="relative overflow-hidden group bg-zinc-800 border-zinc-700">
                      <CardHeader>
                        <FileText className="h-8 w-8 text-primary mb-4" />
                        <CardTitle className="text-zinc-100">How to Use</CardTitle>
                      </CardHeader>
                      <CardContent className="text-zinc-400">
                        Learn the basics of using Fumbl-iFy effectively with our comprehensive guide.
                      </CardContent>
                      <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </Card>
                  </motion.div>

                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.4 }}
                  >
                    <Card className="relative overflow-hidden group bg-zinc-800 border-zinc-700">
                      <CardHeader>
                        <Info className="h-8 w-8 text-yellow-500 mb-4" />
                        <CardTitle className="text-zinc-100">Tips & Tricks</CardTitle>
                      </CardHeader>
                      <CardContent className="text-zinc-400">
                        Discover advanced features and customization options to enhance your experience.
                      </CardContent>
                      <div className="absolute inset-0 bg-gradient-to-r from-yellow-500/10 to-orange-500/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </Card>
                  </motion.div>

                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.5 }}
                  >
                    <Card className="relative overflow-hidden group bg-zinc-800 border-zinc-700">
                      <CardHeader>
                        <BookOpen className="h-8 w-8 text-emerald-500 mb-4" />
                        <CardTitle className="text-zinc-100">Troubleshooting</CardTitle>
                      </CardHeader>
                      <CardContent className="text-zinc-400">
                        Get solutions to common issues and expert support when you need it.
                      </CardContent>
                      <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/10 to-green-500/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </Card>
                  </motion.div>
                </div>

                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.6 }}
                  className="mt-16 max-w-4xl mx-auto"
                >
                  <Card className="bg-zinc-800 border-zinc-700">
                    <Collapsible
                      open={isReadmeOpen}
                      onOpenChange={setIsReadmeOpen}
                      className="w-full"
                    >
                      <CardHeader className="flex flex-row items-center justify-between">
                        <CardTitle className="text-2xl font-bold text-zinc-100">ReadMe:  Fumbl-iFy</CardTitle>
                        <CollapsibleTrigger asChild>
                          <Button variant="ghost" size="sm" className="w-9 p-0">
                            <ChevronDown className={`h-4 w-4 text-zinc-400 transition-transform duration-200 ${
                              isReadmeOpen ? "rotate-180" : ""
                            }`} />
                            <span className="sr-only">Toggle README</span>
                          </Button>
                        </CollapsibleTrigger>
                      </CardHeader>
                      <CollapsibleContent>
                        <CardContent className="pt-0">
                          <div className="space-y-4">
                            <div>
                              <h3 className="text-lg font-semibold mb-2 text-zinc-100">How to Use</h3>
                              <ol className="list-decimal list-inside space-y-2 text-zinc-400">
                                <li>Install the Fumbl-iFy Chrome extension</li>
                                <li>Navigate to any webpage</li>
                                <li>Click the Fumbl-iFy icon in your browser</li>
                                <li>Select the level of exaggeration</li>
                                <li>Watch as the content transforms!</li>
                              </ol>
                            </div>
                            <div>
                              <h3 className="text-lg font-semibold mb-2 text-zinc-100">Tips and Tricks</h3>
                              <ul className="list-disc list-inside space-y-2 text-zinc-400">
                                <li>Use keyboard shortcuts for quick access</li>
                                <li>Customize your exaggeration settings</li>
                                <li>Try different modes for various types of content</li>
                                <li>Share your Fumbl-ified content with friends</li>
                              </ul>
                            </div>
                            <div>
                              <h3 className="text-lg font-semibold mb-2 text-zinc-100">Troubleshooting</h3>
                              <ul className="list-disc list-inside space-y-2 text-zinc-400">
                                <li>Ensure your Chrome browser is up to date</li>
                                <li>Check if the extension is enabled</li>
                                <li>Clear your browser cache and cookies</li>
                                <li>Reinstall the extension if issues persist</li>
                                <li>Contact our support team for further assistance</li>
                              </ul>
                            </div>
                          </div>
                        </CardContent>
                      </CollapsibleContent>
                    </Collapsible>
                  </Card>
                </motion.div>

                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.7 }}
                  className="mt-16 text-center"
                >
                  <Button onClick={handleClick} size="lg" className="bg-primary hover:bg-primary/90">
                    Download Extension
                  </Button>
                </motion.div>
              </main>

              <footer className="border-t border-zinc-800 mt-32">
                <div className="container mx-auto px-4 py-8">
                  <div className="text-center text-zinc-400">
                    <p className="text-sm">
                      © {new Date().getFullYear()} Fumbl-iFy. All rights reserved.
                    </p>
                  </div>
                </div>
              </footer>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
