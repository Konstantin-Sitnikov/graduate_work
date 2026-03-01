import axios from 'axios';




    const session = {
        username: null,
        is_authenticated: false
        }




export const updateSession = async (setUser, setAuthenticated) => {
    try {
        const response = await axios.get('http://localhost:8000/_allauth/browser/v1/auth/session', {
            headers: {
                "accept": "application/json",
                'Content-Type': "application/json",
            },
            withCredentials: true
        });
        
        
        if (response.data.data && response.data.data.user) {

            setUser(response.data.data.user.username)
            setAuthenticated(true)

        }
    } catch (error) {
        console.error("Не авторизован:", error.response || error);

    }
};








export function onLogin() {
    // Сначала получаем CSRF токен (он устанавливается при GET запросе)
    axios.get('http://localhost:8000/csrf/', { withCredentials: true })
        .then(() => {
            // Теперь отправляем логин с CSRF токеном
            return axios.post('http://localhost:8000/_allauth/browser/v1/auth/login', {
                username: "ИПТрудниковС.В.",
                password: "Kot_Terminator_1",
            }, {
                headers: {
                    "accept": "application/json",
                    'Content-Type': "application/json",
                },
                withCredentials: true
            });
        })
        .then(data => {
            console.log("Успешный вход:", data);
            updateSession(); // Обновляем информацию о сессии
        })
        .catch(error => {
            console.error("Ошибка входа:", error.response || error);
        });
}


export function logOut() {
    // Сначала получаем CSRF токен (он устанавливается при GET запросе)
    axios.get('http://localhost:8000/csrf/', { withCredentials: true })
        .then(() => {
            // Теперь отправляем логин с CSRF токеном
            return axios.delete('http://localhost:8000/_allauth/browser/v1/auth/session', {
                headers: {
                    "accept": "application/json",
                    'Content-Type': "application/json",
                },
                withCredentials: true
            });
        })
        .then(data => {
            console.log("Вы вышли из сесии:", data.status);
            updateSession(); // Обновляем информацию о сессии
        })
        .catch(error => {
            console.error("Ошибка входа:", error.response || error);
        });
}

