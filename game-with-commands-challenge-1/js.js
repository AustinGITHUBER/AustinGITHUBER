let key = ''
let keyCode = 0
let keyIsDown = false
class Character {
    constructor() {
        this.health = 1
        this.maxHealth = 1
        this.money = 0
        this.attack = 1
        this.defense = 0
        this.spawn = [0,0]
        this.x = this.spawn[0]
        this.y = this.spawn[1]
        this.speed = 1
        this.zone = 1
        this.relationships = {"Carl":0}
    }
}
let player = new Character()
let dialogueNum = 0
let clicking = false
let mouseButton = ''
let mouseX = 0
let mouseY = 0
setInterval(function(){
    if (document.body !== undefined) {
        draw()
    }
},1)
addEventListener('keydown',function(){
    keyDown(this.window.event)
})
addEventListener('keyup',function(){
    keyIsDown = false
})
addEventListener('mousedown',function(){
    if (this.window.event.which === 1) {
        mouseButton = 'left'
    }
    if (this.window.event.which === 2) {
        mouseButton = 'middle'
    }
    if (this.window.event.which === 3) {
        mouseButton = 'right'
    }
    clicking = true
})
addEventListener('mouseup',function(){
    clicking = false
})
addEventListener('mousemove', function(){
    mouseX = this.window.event.clientX
    mouseY = this.window.event.clientY
})
function setup() {
    makeDiv('Carl')
    makeDiv('lever')
}
function draw() {
    if (player.health <= 0) {
        player.x = player.spawn[0]
        player.y = player.spawn[1]
        player.health = 100
    }
    if (key === 'r' && keyIsDown) {
        player.health = 0
    }
    makePerson('Carl','set',100,50,50,player.x+500,player.y,'#ba5100',10,'#fcbb88',1)
    if (makePerson('Carl','get',100,50,50,player.x+500,player.y,'#ba5100',10,'#fcbb88',1) && clicking && mouseButton === 'left' && dialogueNum === 0) {
        let text = document.getElementById('dialogue')
        text.textContent = 'Me: I need to find a lever'
        dialogueNum = 1
    }
    if (makePerson('Carl','get',100,50,50,player.x+500,player.y,'#ba5100',10,'#fcbb88',1) && clicking && mouseButton === 'left' && dialogueNum === 2) {
        let text = document.getElementById('dialogue')
        text.style.color = '#FFFFFF'
        text.textContent = 'Carl: Hi! I can' + "'t how I rebooted but"
        dialogueNum = 3
        clicking = false
    }
    if (dialogueNum === 3 && clicking) {
        let text = document.getElementById('dialogue')
        text.textContent = "Carl: it's time for school"
        dialogueNum = 4
    }
    if (dialogueNum > 0) {
        makePerson('lever','set',50,50,50,player.x+500,player.y+500,'#ff5454',10,'#6e6e6e',1)
    }
    if (makePerson('lever','get',50,50,50,player.x+500,player.y+500,'#ff5454',10,'#6e6e6e',1) && clicking && mouseButton === 'left' && dialogueNum === 1) {
        let text = document.getElementById('dialogue')
        text.style.color = '#70c6ff'
        text.textContent = 'time loop'
        player.spawn[0] = 500
        player.health = 0
        dialogueNum = 2
    }
    if (keyIsDown && (key === 'ArrowDown' || key === 's') && (document.getElementById('input').style.visibility === 'hidden' || document.getElementById('input').style.visibility === '')) {
        let move = function() {
            player.y -= player.speed
        }
        {
            move()
        }
    }
    if (keyIsDown && (key === 'ArrowRight' || key === 'd') && (document.getElementById('input').style.visibility === 'hidden' || document.getElementById('input').style.visibility === '')) {
        let move = function() {
            player.x -= player.speed
        }
        {
            move()
        }
    }
    {
        let input = document.getElementById('input')
        let inputValue = input.value
        let help = false
        if (key === '/' && keyIsDown) {
            input.style.visibility = 'visible'
        }
        if (key === 'Enter' && keyIsDown && input.style.visibility === 'visible') {
            if (inputValue === 'help') {
                help = true
                console.log(' Welcome, / to open the Command Input, Enter to do the command, clear it and close the Command Input')
                console.log('Try to not hold Enter too long')
                console.log('Stuff surrounded by [] means you need to input the values')
                console.log('All commands for now: help, invincibility, super strength, super rich, teleport [x],[y], speed change [speed], spawnpoint change [spawnpoint x],[spawnpoint y], change [player variable]=[value (int/string (no need for quotation marks))]')
                input.value = 'Check Console (Ctrl+Shift+I)'
                keyIsDown = false
            } else if (!help) {
                if (inputValue === 'invincibility') {
                    player.maxHealth = Infinity
                    player.health = Infinity
                    player.defense = Infinity
                }
                if (inputValue === 'super strength') {
                    player.attack = Infinity
                }
                if (inputValue === 'super rich') {
                    player.money = Infinity
                }
                if (inputValue.slice(0,8) === 'teleport') {
                    let newInput = inputValue.slice(8,inputValue.length)
                    let x = player.spawn[0]
                    let y = player.spawn[1]
                    for (let i=0;i<newInput.length;i++) {
                        if (newInput.slice(i,i+1) === ',') {
                            x = parseInt(newInput.slice(0,i)) ? parseInt(newInput.slice(0,i)) : player.x
                            y = parseInt(newInput.slice(i+1,newInput.length)) ? parseInt(newInput.slice(i+1,newInput.length)) : player.y
                        }
                    }
                    player.x = x
                    player.y = y
                }
                if (inputValue.slice(0, 12) === 'speed change') {
                    player.speed = parseInt(inputValue.slice(12, inputValue.length)) ? parseInt(inputValue.slice(12, inputValue.length)) : 10
                }
                if (inputValue.slice(0,17) === 'spawnpoint change') {
                    let newInput = inputValue.slice(17,inputValue.length)
                    let x = player.spawn[0]
                    let y = player.spawn[1]
                    for (let i=0;i<newInput.length;i++) {
                        if (newInput.slice(i,i+1) === ',') {
                            x = parseInt(newInput.slice(0,i)) ? parseInt(newInput.slice(0,i)) : player.spawn[0]
                            y = parseInt(newInput.slice(i+1,newInput.length)) ? parseInt(newInput.slice(i+1,newInput.length)) : player.spawn[1]
                        }
                    }
                    player.spawn = [x,y]
                }
                if (inputValue.slice(0,6) === 'change') {
                    let newInput = inputValue.slice(7,inputValue.length)
                    let x = "default"
                    let y = "default"
                    for (let i=0;i<newInput.length;i++) {
                        if (newInput.slice(i,i+1) === '=') {
                            x = newInput.slice(0,i) ? newInput.slice(0,i) : "default"
                            y = parseInt(newInput.slice(i+1,newInput.length)) ? parseInt(newInput.slice(i+1,newInput.length)) : newInput.slice(i+1,newInput.length)
                        }
                    }
                    player[x] = y
                }
                keyIsDown = false
                input.value = ''
                input.style.visibility = 'hidden'
            }
        }
    }
}
function keyDown(event) {
    key = event.key
    keyCode = event.keyCode
    keyIsDown = true
}
function round() {
    let result
    let value = 0
    value += Math.round(Math.random())
    result = (value === 1) ? true : false
    if (result === undefined) {
        return 'Error'
    } else {
        return {boolean:result,number:value,text:result+''}
    }
}
function makeDiv(className="default") {
    let div = document.createElement('div')
    div.className = className
    let i = 1
    while(document.getElementById(className + i) !== null) {
        i++
    }
    div.id = className + i
    document.body.innerHTML += div.outerHTML
    return div.id
}
function makePerson(name='default',mode='set',range=50,l=50,w=50,x=player.spawn[0],y=player.spawn[1],color='#FFFFFF',textSize=5,textColor='#000000',number=1) {
    if (mode === 'get') {
        for (let i = 0; i<document.getElementsByClassName(name).length;i++) {
            let returnValue = false
            let namePerson = document.getElementsByClassName(name)[i]
            if (x === 'get') {
                x = namePerson.style.left
            }
            if (y === 'get') {
                y = namePerson.style.top
            }
            if (l === 'get') {
                l = namePerson.style.width
            }
            if (w === 'get') {
                w = namePerson.style.height
            }
            let topValue = parseInt(namePerson.style.top)
            let leftValue = parseInt(namePerson.style.left)
            if (0 <= leftValue + l + range && range >= leftValue && 0 <= topValue + w + range && range >= topValue) {
                returnValue = true
            }
            return returnValue
        }
    } else if (mode === 'set') {
        number -= 1
        let person = document.getElementsByClassName(name)[number]
        if (person === undefined) {
            return 'Error: person not found'
        }
        person.style.position = 'absolute'
        person.style.top = y + 'px'
        person.style.left = x + 'px'
        person.style.width = l + 'px'
        person.style.height = w + 'px'
        person.textContent = name
        person.style.backgroundColor = color
        person.style.color = textColor
        person.style.fontSize = textSize + 'px'
        person.style.textAlign = 'center'
        return {name:name,mode:mode,range:range,l:l,w:w,x:x,y:y,color:color,textSize:textSize,textColor:textColor,number:number}
    }
}