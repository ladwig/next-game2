import React from 'react'

class Index extends React.Component {
  constructor(props) {
    super(props)

    const width = 508
    const height = 500
    const playerSize = 32
    const enemySize = 25

    this.state = {
      width: width,
      height: height,
      x: 0,
      y: 0,
      ex: 0,
      ey: 0,
      playerSpeed: 20,
      playerSize: playerSize,
      enemySize: enemySize
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
    //Player spawn position
    this.setState({
      x: this.canvas.width / 2,
      y: this.canvas.height -35,
      ex: (this.canvas.width / 2) + 30,
      ey: this.canvas.height - 55
    })
  }

  componentDidUpdate() {
    this.drawPlayer()
    this.drawEnemy()
    console.log(this.state)
  }

//Draw function for the player
  drawPlayer = () => {
    const context = this.canvas.getContext('2d')

    context.clearRect(0, 0, this.canvas.width, this.canvas.height);

    context.beginPath();
    context.rect(this.state.x, this.state.y, this.state.playerSize, this.state.playerSize);
    context.fillStyle = 'red';
    context.fill();
    context.closePath();
  }

//Draw function for the enemies
  drawEnemy = () => {
    const context = this.canvas.getContext('2d')



    context.beginPath();
    context.rect(this.state.ex, this.state.ey, this.state.enemySize, this.state.enemySize);
    context.fillStyle = '#fff';
    context.fill();
    context.closePath();

  }

//Player walking

  onKeyDown = event => {
    const { x, y, playerSpeed, playerSize, width, height } = this.state

    if (this.state.x !== 0 || this.state.y !== 0) {
      switch (event.keyCode) {
        case 39:
        case 68:
          if ((x + playerSize) > (width - playerSize)) {
            this.setState({
              x: this.state.x + (width - ( x + playerSize))
            })
            return
          }
          this.setState({
            x: x + playerSpeed
          })
          break
        case 37:
        case 65:
          if ((x - playerSize) < 0) {
            this.setState({
              x: 0
            })
            return
          }
          this.setState({
            x: x - playerSpeed
          })
          break
        case 40:
        case 83:
          if ((y + playerSize) > (height - playerSize)) {
            this.setState({
              y: this.state.y + (height - ( y + playerSize))
            })
            return
          }
          this.setState({
            y: y + playerSpeed
          })
          break
        case 38:
        case 87:
          if (false) {
            this.setState({
              y: 0
            })
            return
          }
          this.setState({
            y: y - playerSpeed
          })
          break

      default:
        return
      }
    }

    event.preventDefault()
  }

  render () {
   return (
     <div>
      <canvas width={this.state.width} height={this.state.height} ref={element => this.canvas = element}/>

      <style jsx>{`
        canvas {
          background: black;
          border: 0;
        }
      `}</style>

     </div>
   )
  }
}

export default Index
