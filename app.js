const hamburgerMenu = document.querySelector('.hamburger');
const mobileNav = document.querySelector('.mobile-nav');
const input = document.getElementById('shorten');
const shortenBtn = document.querySelector('.shorten-it');
const copyContainer = document.querySelector('.copied');
const copyLink = document.querySelector('.link');
const shortenedLink = document.querySelector('.shortened-link');
const copyBtn = document.querySelector('.copy');
const copiedBtn = document.querySelector('.copied-btn');

hamburgerMenu.addEventListener('click', () => 
{
    mobileNav.classList.toggle('d-none');
});
shortenBtn.addEventListener('click', () => 
{
    const shortenLink = async () => 
    {
        try
        {
            let link = input.value;

            let res = await fetch(`https://api.shrtco.de/v2/shorten?url=${link}`)
            let data = await res.json();
            if(validateUrl(input.value))
            {
                input.classList.remove('red-border')
                copyContainer.classList.remove('d-none');
                copyLink.innerHTML = `${input.value}`;
                shortenedLink.innerHTML = `${data.result.short_link}`;
                copyBtn.classList.remove('d-none');
                copiedBtn.classList.add('d-none');
            }
            else
            {
                input.classList.add('red-border');
            }
            
        }
        catch
        {
            alert('error');
        }

        
    }
    shortenLink();
})

copyBtn.addEventListener('click', () => 
{
    let copyText = document.querySelector(".shortened-link");
    navigator.clipboard.writeText(copyText.textContent);
    copyBtn.classList.add('d-none');
    copiedBtn.classList.remove('d-none');
});

function validateUrl(url) {
    let re = /(?:https?):\/\/(\w+:?\w*)?(\S+)(:\d+)?(\/|\/([\w#!:.?+=&%!\-\/]))?/;
    return re.test(url);
  }
