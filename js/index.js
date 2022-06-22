document.addEventListener('DOMContentLoaded', () => {
    let NumberList = 19
    const containerMonster = document.querySelector('#monster-container')
    const backButton = document.getElementById('back')
    const forwardButton = document.getElementById('forward')

    const form = document.createElement('form')
    const formCont = document.querySelector('#create-monster')

    form.innerHTML = `
 <label>Name: </label>
 <input type="text" id="monster-name"/>
 <label>Age: </label>
 <input type="text" id="monster-age"/>
 <label>Description: </label>
 <input type="text" id="monster-desc"/>
 <input type="submit" value="Create Monster"/>
 `
    formCont.append(form)

    form.addEventListener('click', (e) => {
        e.preventDefault()
        fetch('http://localhost:3000/monsters', {
                method: "POST",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    name: document.getElementById('monster-name').value,
                    age: document.getElementById('monster-age').value,
                    description: document.getElementById('monster-desc').value
                }),
            })
            .then(resp => resp.json())
            .then(console.log)
    })


    backButton.addEventListener('click', (e) => {
        if (NumberList === 1) {
            window.alert("You are on the 1st page")
        } else {
            NumberList -= 1
            fetch(`http://localhost:3000/monsters/?_limit=50&_page=${NumberList}`)
                .then(resp => resp.json())
                .then((monsters) => {
                    containerMonster.innerHTML = `Page ${NumberList}`
                    monsters.forEach((monster) => {
                        containerMonster.append(renderMonster(monster), document.createElement('hr'))
                    })
                })
        }
    })

    forwardButton.addEventListener('click', (e) => {
        NumberList += 1
        fetch(`http://localhost:3000/monsters/?_limit=50&_page=${NumberList}`)
            .then(resp => resp.json())
            .then((monsters) => {
                console.log(monsters)
                if (monsters.length === 0) {
                    NumberList -= 1
                    window.alert("You are on the final page")
                } else {
                    containerMonster.innerHTML = `Page ${NumberList}`
                    monsters.forEach((monster) => {
                       containerMonster.append(renderMonster(monster), document.createElement('hr'))
                    })
                }

            })
    })

    fetch(`http://localhost:3000/monsters/?_limit=50&_page=${NumberList}`)
        .then(resp => resp.json())
        .then((monsters) => {
           containerMonster.innerHTML = `Page ${NumberList}`
            monsters.forEach((monster) => {
               containerMonster.append(renderMonster(monster), document.createElement('hr'))
            })
        })


    function renderMonster(monster) {
        const monsterSpan = document.createElement('span')
           
        monsterSpan.innerHTML = `
   <h1>${monster.name}</h1>
   <h4>Age: ${monster.age}</h4>
   <p>Description: ${monster.description}</p>
   `
        monsterSpan.dataset.id = monster.id
        monsterSpan.style.color = 'green'
           
        return monsterSpan
    }

})
	
