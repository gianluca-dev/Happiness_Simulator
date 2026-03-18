let darkmode = localStorage.getItem("darkmode");
const darkmodeToggle = document.getElementById("darkmode-toggle");

const enableDarkmode = () => {
    document.body.classList.add("darkmode");
    localStorage.setItem("darkmode", "enabled");
}

const disableDarkmode = () => {
    document.body.classList.remove("darkmode");
    localStorage.setItem("darkmode", "disabled");
}

if (darkmode === "enabled") {
    enableDarkmode();
} else {
    disableDarkmode();
}

darkmodeToggle.addEventListener("click", () => {
    darkmode = localStorage.getItem("darkmode");
    if (darkmode !== "enabled") {
        enableDarkmode();
        console.log("Dark mode enabled");
    } else {        disableDarkmode();
    }   
});