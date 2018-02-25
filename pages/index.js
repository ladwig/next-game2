import React from 'react'

class Index extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      x: 20,
      y: 20,
      nx: 2,
      ny: 2,
      playerSize: 32
    }
  }

  componentWillMount() {
  if (!global.window) {
    return
  }

  document.body.addEventListener('keydown', this.onKeyDown)
  }

  componentWillUnmount() {
  if (!global.window) {
    return
  }

  document.body.removeEventListener('keydown', this.onKeyDown)
  }

  componentDidMount() {
    this.setState({
      x: this.canvas.width / 2,
      y: this.canvas.height - 30
    })

    setInterval(this.draw, 10)
  }

  draw = () => {
    const context = this.canvas.getContext('2d')

    context.clearRect(0, 0, this.canvas.width, this.canvas.height);

    context.beginPath();
    context.rect(this.state.x, this.state.y, this.state.playerSize, this.state.playerSize);
    context.fillStyle = 'red';
    context.fill();
    context.closePath();
  }

  onKeyDown = event => {
    switch (event.keyCode) {
      case 39:
        this.setState({
          x: this.state.x + 20
        })
        break
      case 37:
        this.setState({
          x: this.state.x - 20
        })
        break
    default:
      return
    }
        event.preventDefault()
  }

  render () {
   return (
     <div>
      <canvas width="500" height="500" ref={element => this.canvas = element}/>

      <style jsx>{`
        canvas {
          background: black;
        }
      `}</style>

     </div>
   )
  }
}

export default Index
