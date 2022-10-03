const budget = 80;

function setStatusMessage(xxx,msg,reset=false) {
   if (!reset) {
     document.getElementById(xxx).innerHTML=msg;
   }
   else {
     document.getElementById(xxx).insertAdjacentHTML("beforeend",msg)
   }
        
 }


class TextInput {
    constructor() {
        this.update();
    }

    update(){

        setStatusMessage("budget", `Budget : ${budget}€`);
        let text = document.getElementById("solde").value;


        let format_content =
            text.split("\n")
                .map(article => article.trim())
                .filter(article => (/^\D+(:\d+){2}$/).test(article))
                .map(article => {

                    let [type, prix, quantite] = article.split(":");

                    return {
                        type,
                        prix: Number(prix),
                        quantite: Number(quantite)
                    };
                })
                .sort((articleA, articleB) => articleB.prix - articleA.prix);


        let total = format_content.reduce((acc, { prix, quantite }) => acc + prix * quantite, 0);
        setStatusMessage("total", `Devis : ${total}€`);
      
      
        let toRemove = format_content.reduce((acc, { type, prix, quantite }) => {

            let toRemove;
            if (total > budget) {
                toRemove = Math.min(Math.ceil((total - budget) / (prix)), quantite);
            }
            else toRemove = 0;

            total -= prix * toRemove;

            if (toRemove > 0) {
                acc.push(`${type}${toRemove > 1 ? 's' : ' '} : -${toRemove} `);
            }
            return acc;
        }, []).join("<br/>");
        setStatusMessage("toRemove",toRemove);
        setStatusMessage("detail", `<p>TOTAL : ${total}€ </p>`);

    }
}

let t = new TextInput();
document.body.addEventListener("click", t.update);
document.body.click();