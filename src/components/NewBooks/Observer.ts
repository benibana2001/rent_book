import * as React from 'react'

export default class Observer {
  targetRefs: React.RefObject<HTMLDivElement>[]
  observer: IntersectionObserver

  constructor(
    options: IntersectionObserverInit,
    callback: IntersectionObserverCallback
  ) {
    this.observer = new IntersectionObserver(callback, options)
    this.targetRefs = []
  }

  public createRef = (): React.RefObject<HTMLDivElement> => {
    const targetRef = React.createRef<HTMLDivElement>()
    this.targetRefs.push(targetRef)
    return targetRef
  }

  public existRef = () =>
    this.targetRefs.length > 0 && this.targetRefs[0].current

  public start() {
    this.targetRefs.forEach((target: React.RefObject<HTMLDivElement>) => {
      this.observer.observe(target.current)
    })
  }

  public stop() {
    this.targetRefs.forEach((target: React.RefObject<HTMLDivElement>) => {
      this.observer.unobserve(target.current)
    })
  }
}
