import { useState, useEffect } from 'react'
import axios from 'axios'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'

export function CategoryFilter({ onFilter }: { onFilter: (categories: string[]) => void }) {
  const [categories, setCategories] = useState<Array<{ id: string, name: string }>>([])
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])

  useEffect(() => {
    fetchCategories()
  }, [])

  const fetchCategories = async () => {
    try {
      const response = await axios.get('/api/categories')
      setCategories(response.data)
    } catch (error) {
      console.error('Error fetching categories:', error)
    }
  }

  const handleCategoryChange = (categoryId: string) => {
    setSelectedCategories(prev => 
      prev.includes(categoryId) 
        ? prev.filter(id => id !== categoryId)
        : [...prev, categoryId]
    )
  }

  useEffect(() => {
    onFilter(selectedCategories)
  }, [selectedCategories])

  return (
    <div className="space-y-2">
      {categories.map(category => (
        <div key={category.id} className="flex items-center space-x-2">
          <Checkbox 
            id={category.id} 
            checked={selectedCategories.includes(category.id)}
            onCheckedChange={() => handleCategoryChange(category.id)}
          />
          <Label htmlFor={category.id}>{category.name}</Label>
        </div>
      ))}
    </div>
  )
}