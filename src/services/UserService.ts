const BASE_URL = "https://8j1pzk0j-8000.euw.devtunnels.ms/";
export type Choice = {
    id: number,
    text: string
}

export type Character = {
    player_id : string,
    current_location: {
        name: string,
        description: string,
        image: string,
        choices: Choice[]
    },
    health : number,
    items: []

}

export const postData = async (user_id:string, choice_id:number) => {
    try {
        const res = await fetch(`${BASE_URL}api/choose/`,{
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                player_id: user_id,
                choice_id: choice_id
            })
        })
        return await res.json()
    } catch (error) {
        console.error(error)
        return undefined
    }
}

export const getData = async () => {
    if(localStorage.getItem("player_id") == null){
        try {
            const res = await fetch(`${BASE_URL}api/start`, {
                method: "GET",
            })
                const data = await res.json()
                localStorage.setItem("player_id", data.player_id)
               
                return data
        } catch (error) {
            console.error(error)
            return undefined
        }
    }else{
        try {
            const res = await fetch(`${BASE_URL}api/state/${localStorage.getItem("player_id")}`, {
                method: "GET",
            })
                const data = await res.json()
                return data
        } catch (error) {
            console.error(error)
            return undefined
        }
    }

}