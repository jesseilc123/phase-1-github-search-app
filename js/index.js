document.addEventListener("DOMContentLoaded", () => {
    handleForm()
})

function handleForm(){
    let form = document.querySelector("#github-form")
    form.addEventListener("submit", (event) => {
        event.preventDefault()
        const input = document.querySelector("#search").value
        
        fetch(`https://api.github.com/users/${input}`)
        .then(res => res.json())
        .then(data => displayInfo(data))
    })
}

function displayInfo(data){
    if(document.querySelector("#user-list").childNodes.length > 1){
        document.querySelector(".info").remove()
        let info = document.createElement("li")
        info.className = "info"
        info.innerHTML = `
        <img src="${data.avatar_url}">
        <p>Name: ${data.name}</p>
        <p>Login: ${data.login}</p>
        <p>GitHub website:
        <a href="${data.html_url}">${data.html_url}</a>
        </p>
        <p id="repos">Show repos</p>
        `
        document.querySelector("#user-list").append(info)

        if(document.querySelector("#repos-list").childNodes.length > 0){
            document.querySelector(".delete").remove()
        }
        document.querySelector("#repos").addEventListener("click", () => {
            fetch(`${data.repos_url}`)
            .then(res => res.json())
            .then(oldData => handleRepos2(oldData))
        })
    }else{
        let info = document.createElement("li")
        info.className = "info"
        info.innerHTML = `
        <img src="${data.avatar_url}">
        <p>Name: ${data.name}</p>
        <p>Login: ${data.login}</p>
        <p>GitHub website:
        <a href="${data.html_url}">${data.html_url}</a>
        </p>
        <p>ID: 
        <span id="check">${data.id}</span>
        </p>
        <p id="repos">Show repos</p>
        `
        document.querySelector("#user-list").append(info)

        document.querySelector("#repos").addEventListener("click", () => {
            fetch(`${data.repos_url}`)
            .then(res => res.json())
            .then(newData => handleRepos(newData))
        })
    }
}


function handleRepos(newData){
    document.querySelector("#repos").addEventListener("click", () => {
        fetch(`${data.repos_url}`)
        .then(res => res.json())
        .then(newData => handleRepos(newData))
    })
    let reps = document.createElement("li")
    reps.className = "delete"
    newData.forEach((item) =>{
        let reps2 = document.createElement("li")
        reps2.innerHTML = `
        <a href="${item.git_url}">${item.name}</a>
        `
        reps.append(reps2)
    })
    document.querySelector("#repos-list").append(reps)
}

function handleRepos2(oldData){
    document.querySelector("#repos").addEventListener("click", () => {
        fetch(`${data.repos_url}`)
        .then(res => res.json())
        .then(oldData => handleRepos(oldData))
    })
        let reps = document.createElement("li")
        reps.className = "delete"
        oldData.forEach((item) => {
            let reps2 = document.createElement("li")
            reps2.innerHTML = `
            <a href="${item.git_url}">${item.name}</a>
            `
            reps.append(reps2)
        })
        document.querySelector("#repos-list").append(reps)
}


