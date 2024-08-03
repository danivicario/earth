var counter = 0;
​
document.querySelectorAll("._3wpnE").forEach(checkbox => {
    counter++
​
    if (counter<=3) {
        checkbox.click()
    }
})

setTimeout(() => {
	document.querySelector("button[title='Forward messages']").click();
}, 1000)
setTimeout(() => {
	document.querySelector("span[title='Álvaro de Andrés']");
}, 1000)
setTimeout(() => {
	document.querySelector("div[role=button]").click();
}, 1000)
