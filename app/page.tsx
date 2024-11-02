"use client";

import React from 'react';
import { Github } from "lucide-react";
import Link from 'next/link';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function App() {
  return (
    <>
      <div className="flex flex-col min-h-screen bg-zinc-900 text-zinc-100">
        <header className="bg-zinc-800 shadow-md">
          <div className="container mx-auto px-4 py-4 flex justify-between items-center">
            <Link href="/" className="text-2xl font-bold text-zinc-100 uppercase">fumbl-ify</Link>
            <nav>
              <Link
                href="https://github.com/aravind-manoj/useless-project"
                target="_blank"
                rel="noopener noreferrer"
                className="text-zinc-100 hover:text-zinc-300 transition-colors flex items-center"
              >
                <Github className="w-6 h-6 mr-2" />
                <span>GitHub</span>
              </Link>
            </nav>
          </div>
        </header>

        <main className="flex-grow flex flex-col items-center justify-center p-4">
          <Card className="w-full max-w-4xl bg-zinc-800 text-zinc-100 mb-8 border-zinc-700">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-center">What is Fumbl-iFy?</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-lg text-center text-zinc-300">
                An Ai with
              </p>
            </CardContent>
          </Card>

          <Card className="w-full max-w-4xl bg-zinc-800 border-zinc-700">
            <CardContent className="p-0">
              <div className='flex flex-col mt-12 justify-center items-center text-white '>
                <h1 className='text-3xl text-slate-200'>Download and Install Extension</h1>
                <Button
                  className='mt-12 mb-12'
                  asChild
                >
                  <a href="/path/to/extension.zip" download="GrammerlessExtension.zip">
                    Download Extension
                  </a>
                </Button>
              </div>
            </CardContent>
          </Card>
        </main>
        <footer className="bg-zinc-800 text-zinc-400 py-4">
          <div className="container mx-auto text-center">
            <h3 className="text-lg font-semibold">Fumbl-iFy</h3>
          </div>
        </footer>
      </div>
    </>
  );
}