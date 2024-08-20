// app/components/BlogContent.tsx

'use client'

import { useEffect, useRef } from 'react'
import dynamic from 'next/dynamic'
import { OutputData } from '@editorjs/editorjs'

const EditorJS = dynamic(() => import('@editorjs/editorjs'), { ssr: false })

type BlogContentProps = {
  content: OutputData
}

export function BlogContent({ content }: BlogContentProps) {
  const editorRef = useRef<HTMLDivElement>(null)
  const editorInstance = useRef<any>(null)

  useEffect(() => {
    if (!editorRef.current) return

    const initEditor = async () => {
      const EditorJS = (await import('@editorjs/editorjs')).default
      const Header = (await import('@editorjs/header')).default
      const List = (await import('@editorjs/list')).default
      const Paragraph = (await import('@editorjs/paragraph')).default
      const Image = (await import('@editorjs/image')).default

      if (!editorInstance.current) {
        editorInstance.current = new EditorJS({
          holder: editorRef.current,
          readOnly: true,
          data: content,
          tools: {
            header: {
              class: Header,
              config: {
                levels: [2, 3, 4],
                defaultLevel: 3
              }
            },
            list: {
              class: List,
              inlineToolbar: true
            },
            paragraph: {
              class: Paragraph,
              inlineToolbar: true
            },
            image: {
              class: Image,
              config: {
                endpoints: {
                  byFile: '/api/uploadImage',
                  byUrl: '/api/fetchImage'
                }
              }
            }
          }
        })
      }
    }

    initEditor()

    return () => {
      if (editorInstance.current && typeof editorInstance.current.destroy === 'function') {
        editorInstance.current.destroy()
        editorInstance.current = null
      }
    }
  }, [content])

  return <div ref={editorRef} className="prose max-w-none" />
}