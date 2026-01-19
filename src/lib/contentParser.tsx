import React from 'react'

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

export default ContentRenderer

