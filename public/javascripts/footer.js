
fetch("footerdata.json")
    .then((r) => r.json())
    .then((json) => {
        const { about, address, email, phone } = json

        const replaceText = (id, value) => {
            if (value && value.length) {
                const tag = document.getElementById(id)
                tag.innerHTML = value;
            }
        }

        replaceText('footer-company-about', about);
        replaceText('footer-phone', phone);
        replaceText('footer-email', email);
        replaceText('footer-address', address);
    }) 
