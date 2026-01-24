'use client'

import React from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

/**
 * Cleans up HTML entities and normalizes content
 * Handles both standard HTML entities and PHP-style double-encoded entities
 */
function cleanHtmlEntities(text: string): string {
  return text
    // First handle double-encoded entities (e.g., &nbsp&#59; where &#59; is the semicolon)
    .replace(/&#59;/g, ';')
    // Remove &nbsp; (including any that were double-encoded)
    .replace(/&nbsp;/g, ' ')
    // Standard HTML entities
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&apos;/g, "'")
    // Numeric HTML entities for common characters
    .replace(/&#40;/g, '(')
    .replace(/&#41;/g, ')')
    .replace(/&#34;/g, '"')
    .replace(/&#38;/g, '&')
    .replace(/&#60;/g, '<')
    .replace(/&#62;/g, '>')
    .replace(/&#91;/g, '[')
    .replace(/&#93;/g, ']')
    .replace(/&#123;/g, '{')
    .replace(/&#125;/g, '}')
    .replace(/&#44;/g, ',')
    .replace(/&#45;/g, '-')
    .replace(/&#46;/g, '.')
    .replace(/&#58;/g, ':')
    // Generic numeric entity handler for any remaining entities
    .replace(/&#(\d+);/g, (_, code) => String.fromCharCode(parseInt(code, 10)))
    // Clean up multiple spaces
    .replace(/\s+/g, ' ')
    .trim()
}

/**
 * Parses inline elements (strong, em, a) within text
 */
function parseInlineContent(html: string): React.ReactNode[] {
  const nodes: React.ReactNode[] = []
  let key = 0

  // Pattern to match inline tags
  const inlinePattern = /<(strong|em|b|i|a)([^>]*)>(.*?)<\/\1>/gi

  let lastIndex = 0
  let match

  // Reset regex
  const regex = new RegExp(inlinePattern)
  
  while ((match = regex.exec(html)) !== null) {
    // Add text before this match
    if (match.index > lastIndex) {
      const textBefore = cleanHtmlEntities(html.slice(lastIndex, match.index))
      if (textBefore) {
        nodes.push(textBefore)
      }
    }

    const [, tag, attrs, content] = match
    const cleanContent = cleanHtmlEntities(content)

    switch (tag.toLowerCase()) {
      case 'strong':
      case 'b':
        nodes.push(<strong key={key++} className="font-semibold text-[#101828]">{cleanContent}</strong>)
        break
      case 'em':
      case 'i':
        nodes.push(<em key={key++}>{cleanContent}</em>)
        break
      case 'a': {
        const hrefMatch = attrs.match(/href=["']([^"']*)["']/)
        const href = hrefMatch ? hrefMatch[1] : '#'
        nodes.push(
          <a 
            key={key++} 
            href={href} 
            className="text-[#1DADDF] hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            {cleanContent}
          </a>
        )
        break
      }
    }

    lastIndex = match.index + match[0].length
  }

  // Add remaining text
  if (lastIndex < html.length) {
    const textAfter = cleanHtmlEntities(html.slice(lastIndex))
    if (textAfter) {
      nodes.push(textAfter)
    }
  }

  // If no inline tags were found, just return cleaned text
  if (nodes.length === 0) {
    const cleaned = cleanHtmlEntities(html)
    return cleaned ? [cleaned] : []
  }

  return nodes
}

/**
 * Parses HTML content into React components
 */
export function parseHtmlContent(html: string): React.ReactNode[] {
  if (!html) return []

  const elements: React.ReactNode[] = []
  let key = 0

  // Split by paragraph tags
  const paragraphs = html.split(/<\/?p[^>]*>/gi).filter(Boolean)

  for (const paragraph of paragraphs) {
    const trimmed = paragraph.trim()
    
    // Skip empty paragraphs or those with only whitespace/nbsp
    if (!trimmed || /^(\s|&nbsp;|&nbsp&#59;|&#59;)*$/i.test(trimmed)) {
      continue
    }
    
    // Clean the content first and skip if it becomes empty
    const cleanedTrimmed = cleanHtmlEntities(trimmed)
    if (!cleanedTrimmed) {
      continue
    }

    // Check for line breaks within paragraph
    if (trimmed.includes('<br')) {
      const lines = trimmed.split(/<br\s*\/?>/gi)
      elements.push(
        <p key={key++} className="mb-4 text-[#374151] leading-relaxed">
          {lines.map((line, i) => (
            <React.Fragment key={i}>
              {parseInlineContent(line)}
              {i < lines.length - 1 && <br />}
            </React.Fragment>
          ))}
        </p>
      )
    } else {
      const inlineContent = parseInlineContent(trimmed)
      if (inlineContent.length > 0) {
        elements.push(
          <p key={key++} className="mb-4 text-[#374151] leading-relaxed">
            {inlineContent}
          </p>
        )
      }
    }
  }

  return elements
}

/**
 * Content renderer component
 */
interface ContentRendererProps {
  content: string
  className?: string
}

export function ContentRenderer({ content, className = '' }: ContentRendererProps) {
  const parsedContent = parseHtmlContent(content)

  if (parsedContent.length === 0) {
    return null
  }

  return (
    <div className={`space-y-0 ${className}`}>
      {parsedContent}
    </div>
  )
}

/**
 * Markdown content renderer component
 */
interface MarkdownRendererProps {
  content: string
  className?: string
}

export function MarkdownRenderer({ content, className = '' }: MarkdownRendererProps) {
  if (!content) {
    return null
  }

  return (
    <div className={`prose prose-lg max-w-none ${className}`}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          p: ({ children }) => (
            <p className="mb-4 text-[#374151] leading-relaxed">{children}</p>
          ),
          h1: ({ children }) => (
            <h1 className="text-3xl font-bold text-[#101828] mt-8 mb-4">{children}</h1>
          ),
          h2: ({ children }) => (
            <h2 className="text-2xl font-bold text-[#101828] mt-6 mb-3">{children}</h2>
          ),
          h3: ({ children }) => (
            <h3 className="text-xl font-semibold text-[#101828] mt-5 mb-2">{children}</h3>
          ),
          h4: ({ children }) => (
            <h4 className="text-lg font-semibold text-[#101828] mt-4 mb-2">{children}</h4>
          ),
          strong: ({ children }) => (
            <strong className="font-semibold text-[#101828]">{children}</strong>
          ),
          em: ({ children }) => (
            <em className="italic">{children}</em>
          ),
          a: ({ href, children }) => (
            <a
              href={href}
              className="text-[#1DADDF] hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              {children}
            </a>
          ),
          ul: ({ children }) => (
            <ul className="list-disc list-inside mb-4 text-[#374151] space-y-1">{children}</ul>
          ),
          ol: ({ children }) => (
            <ol className="list-decimal list-inside mb-4 text-[#374151] space-y-1">{children}</ol>
          ),
          li: ({ children }) => (
            <li className="text-[#374151]">{children}</li>
          ),
          blockquote: ({ children }) => (
            <blockquote className="border-l-4 border-[#1DADDF] pl-4 my-4 italic text-[#475467]">
              {children}
            </blockquote>
          ),
          code: ({ children, className }) => {
            const isInline = !className
            if (isInline) {
              return (
                <code className="bg-[#F2F4F7] px-1.5 py-0.5 rounded text-sm font-mono text-[#101828]">
                  {children}
                </code>
              )
            }
            return (
              <code className="block bg-[#F2F4F7] p-4 rounded-lg text-sm font-mono text-[#101828] overflow-x-auto">
                {children}
              </code>
            )
          },
          pre: ({ children }) => (
            <pre className="bg-[#F2F4F7] p-4 rounded-lg overflow-x-auto mb-4">
              {children}
            </pre>
          ),
          img: ({ src, alt }) => (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={src}
              alt={alt || ''}
              className="max-w-full h-auto rounded-lg my-4"
            />
          ),
          hr: () => (
            <hr className="my-8 border-t border-[#EAECF0]" />
          ),
          table: ({ children }) => (
            <div className="overflow-x-auto mb-4">
              <table className="min-w-full border border-[#EAECF0]">{children}</table>
            </div>
          ),
          th: ({ children }) => (
            <th className="border border-[#EAECF0] px-4 py-2 bg-[#F9FAFB] text-left font-semibold text-[#101828]">
              {children}
            </th>
          ),
          td: ({ children }) => (
            <td className="border border-[#EAECF0] px-4 py-2 text-[#374151]">{children}</td>
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  )
}

export default ContentRenderer

