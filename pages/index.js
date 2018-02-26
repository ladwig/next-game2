import React from 'react'

class Index extends React.Component {
  constructor(props) {
    super(props)

    const width = 508
    const height = 500
    const playerSize = 25
    const enemySize = 25

    this.state = {

      //Game settings
      width: width,
      height: height,

      //Player settings
      x: 0,
      y: 0,
      playerSpeed: 20,
      playerSize: playerSize,

      //Enemy settings
      enemySpeed: 0.5,
      enemySize: enemySize,
      enemyMax: 10,
      enemies: []
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
    })

    setInterval(this.draw, 10)
    const {enemySize, enemySpeed, enemyMax, enemies} = this.state
    let counter = 0

    while(counter < enemyMax) {
      enemies.push({
        ex: Math.floor((Math.random() * (this.state.width-enemySize)) + 1),
        ey: Math.floor((Math.random() * (this.state.height-enemySize)) + 1)
      })
      counter++
    }

  }

  componentDidUpdate() {
    this.draw()
  }

  //Draw everything
  draw = () => {
    this.drawPlayer();

    let i;
    for(i = 0; i < 10; i++) {
    this.drawEnemy(this.state.enemies[i].ex, this.state.enemies[i].ey)
    this.collision(this.state.x, this.state.y, this.state.enemies[i].ex, this.state.enemies[i].ey)
    }
  }

//Draw function for the player
  drawPlayer = () => {
    const context = this.canvas.getContext('2d');

    context.clearRect(0, 0, this.canvas.width, this.canvas.height);

    context.beginPath();
    context.rect(this.state.x, this.state.y, this.state.playerSize, this.state.playerSize);
    context.fillStyle = '#fff';
    context.fill();
    context.closePath();
}



//Draw function for the enemies
  drawEnemy = (ex, ey) => {
    const {enemySize, enemySpeed} = this.state
    const context = this.canvas.getContext('2d')
    context.beginPath();
    context.rect(ex, ey, enemySize, enemySize);
    context.fillStyle = '#ffe066';
    context.fill();
    context.closePath();
  }

//Collision
  collision = (x, y, ex, ey) => {
    if (this.state.collided) {
      return
    }

    if (x < ex + this.state.enemySize && x + this.state.playerSize  > ex &&
		    y < ey + this.state.enemySize && y + this.state.playerSize > ey) {
        this.setState({
          collided: true
        })
    }

  }

//Player walking

  onKeyDown = event => {

    if (this.state.x !== 0 || this.state.y !== 0) {
      switch (event.keyCode) {
        case 39:
        case 68:
          this.movePlayerR()
          break
        case 37:
        case 65:
          this.movePlayerL()
          break
        case 40:
        case 83:
          this.movePlayerU()
          break
        case 38:
        case 87:
          this.movePlayerD()
          break
      default:
        return
      }
    }
    event.preventDefault()
  }

  //Move player right
  movePlayerR = () => {
    const { x, y, playerSpeed, playerSize, width, height } = this.state
    if ((x + playerSize) > (width - playerSize)) {
      this.setState({
        x: this.state.x + (width - ( x + playerSize))
      })
      return
    }
    this.setState({
      x: x + playerSpeed
    })
  }

  //Move player left
  movePlayerL = () => {
    const { x, y, playerSpeed, playerSize, width, height } = this.state
    if ((x - playerSize) < 0) {
      this.setState({
        x: 0
      })
      return
    }
    this.setState({
      x: x - playerSpeed
    })
  }

  //Move player up
  movePlayerU = () => {
    const { x, y, playerSpeed, playerSize, width, height } = this.state
    if ((y + playerSize) > (height - playerSize)) {
      this.setState({
        y: this.state.y + (height - ( y + playerSize))
      })
      return
    }
    this.setState({
      y: y + playerSpeed
    })
  }

  //Move player down
  movePlayerD = () => {
    const { x, y, playerSpeed, playerSize, width, height } = this.state
    if (y < playerSize) {
      this.setState({
        y: y - y
      })
      return
    }
    this.setState({
      y: y - playerSpeed
    })
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
