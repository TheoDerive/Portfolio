import { RefObject } from "react"

export function useOnClickOutside<T extends HTMLElement = HTMLElement>(
    ref: RefObject<T> | RefObject<T>[],
    handler: (event: MouseEvent | TouchEvent | FocusEvent) => void,
  ): void {

    window.addEventListener("mousedown", event => {
        const target = event.target as Node
  
        // Do nothing if the target is not connected element with document
        if (!target || !target.isConnected) {
          return
        }
  
        const isOutside = Array.isArray(ref)
          ? ref
              .filter(r => Boolean(r.current))
              .every(r => r.current && !r.current.contains(target))
          : ref.current && !ref.current.contains(target)
  
        if (isOutside) {
          handler(event)
        }
      },
)
  }