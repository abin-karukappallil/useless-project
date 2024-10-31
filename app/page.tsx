"use client";

import React, { useState } from 'react';
import { AlertCircle } from "lucide-react";
import wordss from "an-array-of-english-words";
import Link from 'next/link';

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
    console.log(newText);
    const spellCheckErrors = performSpellCheck(newText);
    setErrors(spellCheckErrors);
  };
  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
    <header className="bg-slate-700 text-white shadow-md">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold">Grammerless</Link>
        <nav>
          <ul className="flex space-x-4">
          </ul>
        </nav>
      </div>
    </header>
    <main className="flex-grow">
      <section className="bg-slate-700 text-white py-6">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-xl font-bold mb-4">What is grammerless??</h1>
          <p className="text-4xlm mb-8">A text editor that “fixes” user input but introduces worse grammar mistakes or rephrases sentences nonsensically</p>
        </div>
      </section>

      <section className="py-16 bg-gray-200 flex flex-col items-center justify-center">
      <div className="grid grid-cols-[1fr,320px] w-[70vw] h-[500px]  border rounded-lg overflow-hidden bg-zinc-950 text-white shadow-xl">
        <div className="relative border-r border-zinc-800">
          <div className="absolute  top-0 left-0 h-full w-[50px] bg-zinc-900 border-r border-zinc-800">
            <div className='mt-12'>
            {text.split("\n").map((_, i) => (
              <div
                key={i}
                className="text-md text-zinc-500  text-right pr-2 py-0.5"
              >
                {i + 1}
              </div>
            ))}
            </div>
          </div>
          <textarea
            className="w-full h-full bg-transparent m-12 pr-16 p-2 pl-[50px] font-mono text-md resize-none focus:outline-none"
            value={text}
            onChange={handleTextChange}
            placeholder="Enter your text here for spell checking..."
            spellCheck={false}
          />
        </div>
        <div className="bg-zinc-900 p-4 overflow-auto" aria-live="polite">
          <div className="text-sm font-medium mb-4">Spelling Errors</div>
          {errors.length > 0 ? (
            <div className="space-y-3">
              {errors.map((error, index) => (
                <div key={index} className="flex items-start gap-2 text-sm">
                  <AlertCircle className="h-4 w-4 text-red-500 mt-0.5" />
                  <div>
                    <div className="text-red-500">
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
      </section>
    </main>
    <footer className="bg-gray-800 text-white py-8">
        <h3 className='flex flex-col justify-center items-center'>Grammer illa/Grammerless</h3>
    </footer>
  </div>
  );
}
