'use client'

import React, { useState, useEffect } from 'react'
import { Github, FileText, Info, BookOpen } from "lucide-react"
import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Image from 'next/image'
import favicon from '../public/favicon.ico'
import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

interface AnimatedCardProps {
  children: React.ReactNode;
  delay?: number;
}

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
}

const AnimatedCard: React.FC<AnimatedCardProps> = ({ children, delay = 0 }) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={fadeInUp}
      transition={{ delay }}
    >
      {children}
    </motion.div>
  )
}

export default function SpellChecker() {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1500)
    return () => clearTimeout(timer)
  }, [])

  return (
    <AnimatePresence>
      {isLoading ? (
        <motion.div
          key="loader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed inset-0 flex items-center justify-center bg-zinc-900 z-50"
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            className="w-16 h-16 border-t-4 border-blue-500 border-solid rounded-full"
          />
        </motion.div>
      ) : (
        <motion.div
          key="content"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col min-h-screen bg-zinc-900 text-zinc-100"
        >
          <header className="bg-zinc-800 shadow-md">
            <div className="container mx-auto px-4 py-4 flex justify-between items-center">
              <motion.div
                className="flex items-center space-x-2"
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <Image src={favicon} alt="Favicon" width={32} height={32} />
                <Link href="/" className="text-2xl font-bold text-zinc-100 uppercase">Fumbl-iFy</Link>
              </motion.div>
              <motion.nav
                initial={{ x: 20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <Link
                  href="https://github.com/aravind-manoj/useless-project"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-zinc-100 hover:text-zinc-300 transition-colors flex items-center"
                >
                  <Github className="w-6 h-6 mr-2" />
                  <span>GitHub</span>
                </Link>
              </motion.nav>
            </div>
          </header>

          <main className="flex-grow flex flex-col items-center justify-center p-4 space-y-8">
            <AnimatedCard>
              <Card className="w-full max-w-4xl bg-zinc-800 text-zinc-100 border-zinc-700">
                <CardHeader>
                  <CardTitle className="text-2xl font-bold text-center">What is Fumbl-iFy?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-lg text-center text-zinc-300">
                    The &ldquo;Fumbl-ify&rdquo; project is a satirical Chrome extension that transforms any given topic into a humorous, exaggerated version of itself. Instead of providing straightforward or factual content, it deliberately reinterprets topics in an over-the-top, playful way. This aligns with the theme of &ldquo;Useless Projects&rdquo;, where typically practical tools are reimagined to deliver unexpected, comedic results.
                  </p>
                </CardContent>
              </Card>
            </AnimatedCard>
            <Card className="w-full max-w-4xl bg-zinc-800 border-zinc-700 p-4">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-center text-white">Documentation</CardTitle>
          </CardHeader>
          <CardContent className="mt-4 space-y-4">
            <div className="flex items-center space-x-3 text-zinc-300">
              <FileText className="w-6 h-6 text-sky-500" />
              <p>How to Use: Learn the basics of using Fumbl-iFy effectively.</p>
            </div>
            <div className="flex items-center space-x-3 text-zinc-300">
              <Info className="w-6 h-6 text-yellow-500" />
              <p>Tips & Tricks: Discover advanced features and customization options.</p>
            </div>
            <div className="flex items-center space-x-3 text-zinc-300">
              <BookOpen className="w-6 h-6 text-green-500" />
              <p>Troubleshooting: Get solutions to common issues.</p>
            </div>
          </CardContent>
        </Card>

            <AnimatedCard delay={0.4}>
              <Card className="w-full max-w-4xl bg-zinc-800 border-zinc-700 p-4 mb-12">
                <CardContent className="flex flex-col items-center">
                  <motion.div
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                  >
                    <Image src={favicon} alt="Favicon" width={48} height={48} className="mb-4" />
                  </motion.div>
                  <h1 className='text-3xl text-slate-200 mt-9 mb-6'>Download & Install Extension</h1>
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Button asChild className='mb-12 mt-6'>
                      <a href="/path/to/extension.zip" download="FumblifyExtension.zip">
                        Download Extension
                      </a>
                    </Button>
                  </motion.div>
                </CardContent>
              </Card>
            </AnimatedCard>
          </main>

          <motion.footer
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.5 }}
            className="bg-zinc-800 text-zinc-400 py-4"
          >
            <div className="container mx-auto text-center">
              <h3 className="text-lg font-semibold">Fumbl-iFy</h3>
              <p className="text-sm mt-1">&copy; {new Date().getFullYear()} Fumbl-iFy. All rights reserved.</p>
            </div>
          </motion.footer>
        </motion.div>
      )}
    </AnimatePresence>
  )
}