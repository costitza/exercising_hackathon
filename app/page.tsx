'use client'

import { useEffect, useState } from 'react'
import { db } from '../lib/firebase'
import { addDoc, getDocs } from 'firebase/firestore'
import { onSnapshot, collection, query, orderBy } from 'firebase/firestore'

export default function Home() {
  const [ideas, setIdeas] = useState<string[]>([])
  const [newIdea, setNewIdea] = useState('')

  // Load ideas from Firestore
  async function loadIdeas() {
    const snapshot = await getDocs(collection(db, 'ideas'))
    setIdeas(snapshot.docs.map(doc => doc.data().text))
  }

  // Add new idea
  async function addIdea() {
    if (!newIdea.trim()) return
    await addDoc(collection(db, 'ideas'), { text: newIdea })
    setNewIdea('')
    loadIdeas()
  }

useEffect(() => {
  const q = query(collection(db, 'ideas'), orderBy('text'))
  const unsubscribe = onSnapshot(q, (snapshot) => {
    const data = snapshot.docs.map(doc => doc.data().text)
    setIdeas(data)
  })

  // Cleanup listener when component unmounts
  return () => unsubscribe()
}, [])


  return (
    <main className="p-6 max-w-l mx-auto">
      <h1 className="text-2xl font-bold mb-4">💡 Idea Board</h1>

      <div className="flex gap-2 mb-4 flex-direction-row">
        <input
          className="border p-2 grow"
          placeholder="Enter your idea"
          value={newIdea}
          onChange={(e) => setNewIdea(e.target.value)}
        />
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-red-700"
          onClick={addIdea}
        >
          Add your idea
        </button>
      </div>

      <ul className="list-disc pl-6">
        {ideas.map((idea, i) => (
          <li key={i}>{idea}</li>
        ))}
      </ul>
    </main>
  )
}
