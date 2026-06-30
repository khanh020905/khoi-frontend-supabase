"use client";

import { useState } from "react";
import { Plus, Search, MoreVertical, Edit2, Trash2 } from "lucide-react";

export default function VocabularyManager() {
  const [searchTerm, setSearchTerm] = useState("");
  
  // Mock data for UI demonstration
  const [words] = useState([
    { id: 1, word: "improve", phonetic: "/ɪmˈpruːv/", meaning: "to become better", level: "A2" },
    { id: 2, word: "fluent", phonetic: "/ˈfluː.ənt/", meaning: "Able to speak a language easily", level: "B2" },
    { id: 3, word: "resilience", phonetic: "/rɪˈzɪl.jəns/", meaning: "the ability to be happy, successful, etc. again after something difficult", level: "C1" },
    { id: 4, word: "consistency", phonetic: "/kənˈsɪs.tən.si/", meaning: "the quality of always behaving or performing in a similar way", level: "B2" },
  ]);

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">Vocabulary Manager</h1>
          <p className="text-sm text-muted mt-1">Manage and add new words to the daily learning pool.</p>
        </div>
        <button className="inline-flex items-center gap-2 px-4 py-2.5 text-sm font-medium text-white bg-primary rounded-lg hover:bg-primary-dark transition-colors">
          <Plus className="w-4 h-4" />
          Add Word
        </button>
      </div>

      <div className="bg-white rounded-2xl border border-border shadow-sm overflow-hidden">
        {/* Toolbar */}
        <div className="p-4 border-b border-border flex items-center justify-between bg-surface-secondary/30">
          <div className="relative w-full max-w-xs">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted" />
            <input 
              type="text" 
              placeholder="Search words..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-sm bg-white border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
            />
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="bg-surface-secondary/50 text-muted uppercase text-xs font-semibold tracking-wider">
              <tr>
                <th className="px-6 py-4">Word</th>
                <th className="px-6 py-4">Phonetic</th>
                <th className="px-6 py-4">Meaning</th>
                <th className="px-6 py-4">Level</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {words
                .filter(w => w.word.toLowerCase().includes(searchTerm.toLowerCase()))
                .map((w) => (
                <tr key={w.id} className="hover:bg-surface-secondary/30 transition-colors">
                  <td className="px-6 py-4 font-semibold text-foreground">{w.word}</td>
                  <td className="px-6 py-4 text-muted">{w.phonetic}</td>
                  <td className="px-6 py-4 text-muted truncate max-w-xs" title={w.meaning}>{w.meaning}</td>
                  <td className="px-6 py-4">
                    <span className="px-2.5 py-1 text-xs font-bold rounded-full bg-blue-50 text-primary border border-blue-100">
                      {w.level}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button className="p-1.5 text-muted hover:text-primary hover:bg-blue-50 rounded-md transition-colors" title="Edit">
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button className="p-1.5 text-muted hover:text-red-600 hover:bg-red-50 rounded-md transition-colors" title="Delete">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {/* Pagination mock */}
        <div className="p-4 border-t border-border flex items-center justify-between text-sm text-muted">
          <span>Showing 1 to 4 of 842 words</span>
          <div className="flex items-center gap-2">
            <button className="px-3 py-1 border border-border rounded-md hover:bg-surface-secondary transition-colors disabled:opacity-50" disabled>Previous</button>
            <button className="px-3 py-1 border border-border rounded-md hover:bg-surface-secondary transition-colors">Next</button>
          </div>
        </div>
      </div>
    </div>
  );
}
