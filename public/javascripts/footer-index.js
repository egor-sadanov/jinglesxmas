fetch("./footer-index.html")
  .then(response => {
    return response.text()
  })
  .then(data => {
    document.querySelector("footer").innerHTML = data;
  })
  .then( () => {
    fetch("footerdata.json")
        .then((r) => r.json())
        .then((json) => {
            const { about, address, email, phone } = json

            const replaceText = (id, value, href) => {
                if (value && value.length) {
                    const tag = document.getElementById(id)
                    tag.innerHTML = value;
                    if (href) {
                        tag.href = href;
                    }
                }
            }

            replaceText('footer-company-about', about);
            replaceText('footer-phone', phone, `tel:${phone}`);
            replaceText('footer-email', email, `mailto:${email}`);
            replaceText('footer-address', address);
        }) 
    })
