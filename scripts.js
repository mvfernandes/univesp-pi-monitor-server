document.addEventListener("DOMContentLoaded", function () {
    const db = indexedDB.open("logins", 1);

    db.onupgradeneeded = function (event) {
        const db = event.target.result;
        db.createObjectStore("logins", { keyPath: "username" });
    }

    db.onsuccess = function (event) {
        const db = event.target.result;
        const transaction = db.transaction("logins", "readwrite");
        const store = transaction.objectStore("logins");

        store.add({ username: "admin", password: "123456" });
    }

    db.onerror = function (event) {
        console.error("Erro ao criar o banco de dados.");
    }
    
    document.getElementById("loginForm").addEventListener("submit", function (event) {
        event.preventDefault();
    
        const username = document.getElementById("username").value;
        const password = document.getElementById("password").value;
    
        const db = indexedDB.open("logins", 1);
    
        db.onsuccess = function (event) {
            const db = event.target.result;
            const transaction = db.transaction("logins", "readwrite");
            const store = transaction.objectStore("logins");
    
            const request = store.get(username);
    
            request.onsuccess = function (event) {
                const user = event.target.result;
    
                if (user && user.password === password) {
                    window.location.href = "dashboard.html";
                } else {
                    alert("Usuário ou senha incorretos.");
                }
            }
        }
    });
});
