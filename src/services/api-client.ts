import axios from "axios";

export default axios.create({
    baseURL: "https://api.themoviedb.org/3",
    params:{
        api_key: "00daf7eeceff66a8392a02c0840b6502"
    }
})