import axios from "axios";

const BASE_URL = "https://api.themoviedb.org/3/";
const TMDB_TOKEN = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0ZmVjZjU1NmE0NjAwNTc5NTA1N2JmZjY2Yjk0MzcwMSIsInN1YiI6IjY0Yjk3MTQ0YWI2ODQ5MDBjNWRjNjA3NyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.LNbr74XwqNCVEr3EX-RW9ixHHWHC7Yh975JPiesyDUE';

const headers = {
    Authorization: "bearer " + TMDB_TOKEN,
};

export const fetchDataFromApi = async (url, params) => {
    try {
        const { data } = await axios.get(BASE_URL + url, {
            headers,
            params,
        });
        return data;
    } catch (err) {
        console.log(err);
        return err;
    }
};