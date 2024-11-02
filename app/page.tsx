"use client";

import React, { useState } from 'react';
import { AlertCircle, Github } from "lucide-react";
import wordss from "an-array-of-english-words";
import Link from 'next/link';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function SpellChecker() {
  const [text, setText] = useState("");
  const [errors, setErrors] = useState<Array<{ 
    word: string; 
    line: number; 
    column: number; 
    suggestions: string[] 
  }>>([]);

  const performSpellCheck = (inputText: string) => {
    const newErrors: Array<{ 
      word: string; 
      line: number; 
      column: number; 
      suggestions: string[] 
    }> = [];

    const lines = inputText.split("\n");

    lines.forEach((line, lineIndex) => {
      const words = line.match(/\b\w+\b/g) || [];
      words.forEach(word => {
        const lowercaseWord = word.toLowerCase();
        if (!wordss.includes(lowercaseWord)) {
          const suggestions = Array.from(wordss)
            .filter(dictWord => 
              dictWord.length >= word.length - 1 && 
              dictWord.length <= word.length + 1
            )
            .slice(0, 3);
          newErrors.push({
            word,
            line: lineIndex + 1,
            column: line.indexOf(word) + 1,
            suggestions
          });
        }
      });
    });
    return newErrors;
  };

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newText = e.target.value;
    setText(newText);
    const spellCheckErrors = performSpellCheck(newText);
    setErrors(spellCheckErrors);
  };

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
