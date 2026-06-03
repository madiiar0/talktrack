import { useEffect, useRef, useState } from 'react'

interface Options {
  typeSpeed?: number
  deleteSpeed?: number
  pauseAfterType?: number
  pauseAfterDelete?: number
}

/**
 * Cycles through `words`, typing each one out, holding, deleting, then moving
 * to the next — looping forever. Respects prefers-reduced-motion by showing the
 * first word statically.
 */
export function useTypewriter(words: string[], options: Options = {}): string {
  const {
    typeSpeed = 70,
    deleteSpeed = 40,
    pauseAfterType = 1500,
    pauseAfterDelete = 350,
  } = options

  const [text, setText] = useState('')
  const [index, setIndex] = useState(0)
  const [deleting, setDeleting] = useState(false)
  const reduced = useRef(false)

  useEffect(() => {
    reduced.current =
      window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false
    if (reduced.current) setText(words[0] ?? '')
  }, [words])

  useEffect(() => {
    if (reduced.current || words.length === 0) return
    const current = words[index % words.length]
    let timeout: ReturnType<typeof setTimeout>

    if (!deleting) {
      if (text.length < current.length) {
        timeout = setTimeout(
          () => setText(current.slice(0, text.length + 1)),
          typeSpeed,
        )
      } else {
        timeout = setTimeout(() => setDeleting(true), pauseAfterType)
      }
    } else {
      if (text.length > 0) {
        timeout = setTimeout(
          () => setText(current.slice(0, text.length - 1)),
          deleteSpeed,
        )
      } else {
        timeout = setTimeout(() => {
          setDeleting(false)
          setIndex((i) => (i + 1) % words.length)
        }, pauseAfterDelete)
      }
    }

    return () => clearTimeout(timeout)
  }, [
    text,
    deleting,
    index,
    words,
    typeSpeed,
    deleteSpeed,
    pauseAfterType,
    pauseAfterDelete,
  ])

  return text
}
