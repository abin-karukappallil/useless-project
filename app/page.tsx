"use client";

import React, { useState } from 'react';
import { AlertCircle, Github } from "lucide-react";
import wordss from "an-array-of-english-words";
import Link from 'next/link';
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

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
    <div className="flex flex-col min-h-screen bg-zinc-900 text-zinc-100">
      <header className="bg-zinc-800 shadow-md">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold text-zinc-100">Grammerless</Link>
          <nav>
            <Link 
              href="LOL" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-zinc-100 hover:text-zinc-300 transition-colors"
            >
              <Github className="w-6 h-6" />
              <span className="sr-only">GitHub repository</span>
            </Link>
          </nav>
        </div>
      </header>
      <main className="flex-grow flex flex-col items-center justify-center p-4">
        <Card className="w-full max-w-4xl bg-zinc-800 text-zinc-100 mb-8 border-zinc-700">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-center">What is Grammerless?</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-lg text-center text-zinc-300">A text editor that "fixes" user input but introduces worse grammar mistakes or rephrases sentences nonsensically</p>
          </CardContent>
        </Card>

        <Card className="w-full max-w-4xl bg-zinc-800 border-zinc-700">
          <CardContent className="p-0">
            <div className="grid grid-cols-[1fr,320px] h-[500px] overflow-hidden bg-zinc-900 text-zinc-100">
              <div className="relative border-r border-zinc-700">
                <div className="absolute top-0 left-0 h-full w-[50px] bg-zinc-800 border-r border-zinc-700">
                  <div className='mt-4'>
                    {text.split("\n").map((_, i) => (
                      <div
                        key={i}
                        className="text-sm text-zinc-500 text-right pr-2 py-0.5"
                      >
                        {i + 1}
                      </div>
                    ))}
                  </div>
                </div>
                <textarea
                  className="w-full h-full bg-transparent p-4 pl-[60px] font-mono text-sm resize-none focus:outline-none text-zinc-100"
                  value={text}
                  onChange={handleTextChange}
                  placeholder="Enter your text here for spell checking..."
                  spellCheck={false}
                />
              </div>

              <div className="bg-zinc-800 p-4 overflow-auto" aria-live="polite">
                <h3 className="text-sm font-medium mb-4 text-zinc-300">Spelling Errors</h3>
                {errors.length > 0 ? (
                  <div className="space-y-3">
                    {errors.map((error, index) => (
                      <div key={index} className="flex items-start gap-2 text-sm">
                        <AlertCircle className="h-4 w-4 text-red-400 mt-0.5" />
                        <div>
                          <div className="text-red-400">
                            "{error.word}" might be misspelled
                          </div>
                          <div className="text-zinc-500 text-xs">
                            Line {error.line}, Column {error.column}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-sm text-zinc-400">
                    No spelling errors found
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
      <footer className="bg-zinc-800 text-zinc-400 py-4">
        <div className="container mx-auto text-center">
          <h3 className="text-lg font-semibold">Grammer illa/Grammerless</h3>
        </div>
      </footer>
    </div>
  )
}