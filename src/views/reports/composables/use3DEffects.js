export function use3DEffects() {
  const getCardTransform = (index) => {
    const row = Math.floor(index / 3)
    const col = index % 3
    return {
      transform: `
        perspective(1000px) 
        rotateX(${Math.sin(row) * 5}deg) 
        rotateY(${Math.sin(col) * 5}deg)
        translateZ(0)
      `,
      transition: 'transform 0.5s ease'
    }
  }

  const handleMouseMove = (event) => {
    const rect = event.currentTarget.getBoundingClientRect()
    const x = event.clientX - rect.left
    const y = event.clientY - rect.top
    const centerX = rect.width / 2
    const centerY = rect.height / 2
    const rotateX = (y - centerY) / 10
    const rotateY = (centerX - x) / 10

    event.currentTarget.style.transform = `
      perspective(1000px)
      rotateX(${rotateX}deg)
      rotateY(${rotateY}deg)
      translateZ(10px)
    `
  }

  const handleMouseLeave = (event) => {
    event.currentTarget.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateZ(0)'
  }

  return {
    getCardTransform,
    handleMouseMove,
    handleMouseLeave
  }
}