// Utility function to play button click sound
export const playButtonSound = () => {
  if (typeof window !== 'undefined') {
    const audio = new Audio('/sounds/menu-open.mp3')
    audio.volume = 0.3 // Set volume to 30%
    audio.play().catch((error) => {
      // Silently fail if audio can't play (e.g., user hasn't interacted with page)
      console.debug('Audio playback failed:', error)
    })
  }
}

